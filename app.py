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
    with open("content.csv", "w", encoding="latin1") as f:
        f.write(response.text)

    content = [*DictReader(open('content.csv'))]

    articles_by_theme = {}

    # Where d is a dict of each row in the csv:
    for d in content:

        # Remove empty keys and values
        d = {key: val for key, val in d.items() if val}

        # Remove trailing spaces and new lines
        d = {key: val.strip().strip("\n") for key, val in d.items()}

        # Make markup safe
        d.update((key, Markup(val)) for key, val in d.items())

        # Split new lines into lists if \n in dict value
        # d.update((key, val.strip("\n").split("\n"))
        #          for key, val in d.items() if "\n" in val)

        # Create article dict and article ID
        article = {}
        article_ID = d["hash"]

        # Filter columns for template fields
        standard_content = ["theme", "hash", "title", "shorttitle", "date",
                            "subtitle", "duration", "location", "thanks",
                            "text1", "text2", "text3", "text4", "text5"]
        article.update((item, d[item].strip("\n"))
                       for item in standard_content if item in d.keys())

        # Create theme subdict
        theme = str(d["theme"])
        if theme not in articles_by_theme.keys():
            articles_by_theme[theme] = {}

        # Filter columns for template fields to be converted to lists using \n new lines
        line_separated_content = [
            "highlights", "media1", "media2", "media3", "media4", "media5"]
        article.update((item, d[item].strip("\n").split("\n"))
                       for item in line_separated_content if item in d.keys())

        # Filter columns for media and text
        media = [val for key, val in article.items() if "media" in key]
        text = [val for key, val in article.items() if "text" in key]
        article["body"] = list(zip(media, text))

        # Add the above to article dict
        articles_by_theme[theme][article_ID] = article

    # Write to json file for debugging
    with open("debug.json", "w") as write_file:
        dump(articles_by_theme, write_file, indent=4)

    # Render template
    rendered_output = render_template(
        "timeline.html", articles_by_theme=articles_by_theme)

    # Write to html file for static hosting
    with open("index.html", "w") as write_file:
        write_file.write(rendered_output)

    # Return rendered template for local hosting
    return rendered_output


if __name__ == "__main__":
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(debug=True)
