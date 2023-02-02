from flask import Flask, render_template
from csv import DictReader
from markupsafe import Markup
from json import dump


app = Flask(__name__)


@app.route("/")
def home():

    content = [*DictReader(open('content.csv'))]
    timeline = {}
    counter = 0

    for d in content:
        counter += 1

        # Remove empty keys and values
        d = {key: val for key, val in d.items() if val}

        # Remove trailing spaces and new lines
        d = {key: val.strip().strip("\n") for key, val in d.items()}

        # Make markup safe
        d.update((key, Markup(val)) for key, val in d.items())

        # Split new lines into lists if \n in dict value
        d.update((key, val.strip("\n").split("\n"))
                 for key, val in d.items())  # if "\n" in val

        # List of values for dictionary items with key *media*
        media = [val for key, val in d.items() if "media" in key]

        # List of values for dictionary items with key *text*
        text = [val for key, val in d.items() if "text" in key]

        # Zip media and text
        d["body"] = list(zip(media, text))

        d["test"] = "test"

        timeline[str(counter)] = d

    with open("timeline.json", "w") as write_file:
        dump(timeline, write_file, indent=4)

    return render_template("base.html", **timeline)


if __name__ == "__main__":
    app.run(debug=True)
# print
