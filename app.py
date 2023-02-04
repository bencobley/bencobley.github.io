from flask import Flask, render_template
from csv import DictReader
from markupsafe import Markup
from json import dump
from requests import get

CONTENT_URL = "https://docs.google.com/spreadsheet/ccc?key=1YLPiKODcjiSdY-z6nUn9SXbsGM_wfrvtsDITZ2rzNA4&output=csv&sheet=content"


app = Flask(__name__)


@app.route("/")
def home():
    response = get(CONTENT_URL)
    with open("content.csv", "w") as f:
        f.write(response.text)

    input = [*DictReader(open('content.csv'))]

    timelines = {}

    for d in input:

        # Remove empty keys and values
        d = {key: val for key, val in d.items() if val}

        # Remove trailing spaces and new lines
        d = {key: val.strip().strip("\n") for key, val in d.items()}

        # Make markup safe
        d.update((key, Markup(val)) for key, val in d.items())

        # Split new lines into lists if \n in dict value
        # d.update((key, val.strip("\n").split("\n"))
        #          for key, val in d.items() if "\n" in val)

        identifier = d["tag"]
        output = {}

        # Filter columns for template fields
        standard_content = ["theme", "tag", "title", "shorttitle",
                            "date", "subtitle", "duration", "location", "thanks", "text1", "text2", "text3", "text4", "text5"]
        output.update((item, d[item].strip("\n"))
                      for item in standard_content if item in d.keys())

        # Filter columns for template fields to be converted to lists using \n new lines
        line_separated_content = [
            "highlights", "media1", "media2", "media3", "media4", "media5"]
        output.update((item, d[item].strip("\n").split("\n"))
                      for item in line_separated_content if item in d.keys())

        # Filter columns for media and text
        media = [val for key, val in output.items() if "media" in key]
        text = [val for key, val in output.items() if "text" in key]
        output["body"] = list(zip(media, text))

        timelines[identifier] = output

    with open("debug.json", "w") as write_file:
        dump(timelines, write_file, indent=4)

    rendered_output = render_template("timeline.html", timelines=timelines)

    with open("index.html", "w") as write_file:
        write_file.write(rendered_output)

    return rendered_output


if __name__ == "__main__":
    app.run(debug=True)
