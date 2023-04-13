# TIMELINE

Timeline is a portfolio website template designed to showcase work organised by date 
- Designed and built from scratch for [bencobley.com](https://www.bencobley.com/).
- Content management using Google sheets for an easily maintanable online presence 
- CSV to HTML generation using Python's Jinja2
- Get up an running in under and hour (tested!)

## Usage

Clone the repository:

```bash
git clone bencobley/bencobley.github.io
```

Install Flask, a lightweight web application framework for developing your site locally:

```bash
pip install Flask
```

Make a copy of the [Google Sheet template](https://docs.google.com/spreadsheet/ccc?key=1YLPiKODcjiSdY-z6nUn9SXbsGM_wfrvtsDITZ2rzNA4) and add your custom content:

```
File > Make A Copy
```

Do not edit `static/index.html`, it will be overwritten by the dynamic generation in `app.py`.

Edit the URL in `app.py` to your Google Sheets URL. Keep the `&output=csv&sheet=content` at the end of the URL.

Run `app.py` to generate your content from the Google Sheet (generated using [Jinja2](https://palletsprojects.com/p/jinja/) in `templates/timeline.html`).

You should be able to view your changes to the template at `http://127.0.0.1:5000`.

Edit your homepage in `templates/base.html` to add your details. Saving the file should automatically refresh `http://127.0.0.1:5000`.

Push your changes to your GitHub repo, and publish your site to [GitHub pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License

[MIT](https://choosealicense.com/licenses/mit/)


