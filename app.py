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

    # Where row is a dict of the csv row:
    for row in content:

        # Remove empty keys and values in row
        row = {key: val for key, val in row.items() if val}

        # Remove trailing spaces and new lines in row
        row = {key: val.strip().strip("\n") for key, val in row.items()}

        # Create article dict and article ID
        article = {}
        article_ID = row["hash"]

        # Filter column for template fields
        standard_content = ["theme", "hash", "title", "shorttitle", "date",
                            "subtitle", "duration", "location", "thanks",
                            "text1", "text2", "text3", "text4", "text5"]
        article.update((field, row[field].strip("\n"))
                       for field in standard_content if field in row.keys())

        # Create theme subdict
        theme = str(row["theme"])
        if theme not in articles_by_theme.keys():
            articles_by_theme[theme] = {}

        # Filter column for template fields to be converted to lists using \n new lines
        line_separated_content = [
            "highlights", "media1", "media2", "media3", "media4", "media5"]

        for field in line_separated_content:
            if field in row.keys():
                list_of_strings = row[field].strip("\n").split("\n")

                # Format media strings
                for i in range(len(list_of_strings)):
                    s = list_of_strings[i]

                    # Populate <img> tags
                    if s.endswith((".png", ".jpg", ".gif")):
                        prefix = "<li class='splide__slide'><img data-splide-lazy='static/img/"
                        suffix = "'/></li>"
                        s = prefix + s + suffix

                    # Populate <video> tags
                    if s.endswith((".mp4", ".mov")):
                        preview = s.strip(".mp4").strip(".mov") + ".png"
                        prefix = "<li class='splide__slide' data-splide-html-video='static/img/"
                        suffix = "'><img src='static/img/" + preview + "'></li>"
                        s = prefix + s + suffix

                    # Populate YouTube elements
                    if s.startswith("https://www.youtube.com/watch?v="):
                        preview = s.strip(
                            "https://www.youtube.com/watch?v=") + ".png"
                        prefix = "<li class='splide__slide' data-splide-youtube='"
                        suffix = "'><img src='static/img/" + preview + "'></li>"
                        s = prefix + s + suffix

                    # Populate Vimeo elements
                    if s.startswith("https://www.vimeo.com/"):
                        preview = s.strip(
                            "https://www.vimeo.com/") + ".png"
                        prefix = "<li class='splide__slide' data-splide-vimeo='"
                        suffix = "'><img src='static/img/" + preview + "'></li>"
                        s = prefix + s + suffix

                    # Make media markup safe
                    list_of_strings[i] = Markup(s)
                article[field] = list_of_strings

        # Filter column for media and text
        media = [val for key, val in article.items() if "media" in key]
        # Make text markup safe
        text = [Markup(val) for key, val in article.items() if "text" in key]
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
    # app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(debug=True)
