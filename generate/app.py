# app.py

from flask import Flask, render_template
from generate import Generate

app = Flask(__name__)


@app.route("/")
def home():
    content = Generate('content.csv')
    return render_template("base.html", **context)


@app.route("/results")
def results():
    context = {
        # "title": "Results",
        # "students": students,
        # "test_name": test_name,
        # "max_score": max_score,
    }
    return render_template("results.html", **context)


if __name__ == "__main__":
    app.run(debug=True)
