# Vince Le — Personal Portfolio

A responsive, static portfolio based on the CV in this repository. The reference repository is a Markdown CV rather than a web application, so this page keeps its concise, experience-first structure and uses plain HTML, CSS, and JavaScript for easy deployment.

## Project structure

```text
About/
├── index.html
├── styles.css
├── script.js
├── avatar.jpg
├── README.md
└── .gitignore
```

## Run locally

No package installation or build step is required. From this folder, run:

```powershell
py -m http.server 4173
```

Open `http://localhost:4173`. You can also open `index.html` directly, though a local server better matches deployment behavior.

## Update content

Edit the `experience`, `projects`, and `skills` arrays near the top of `script.js`. The timeline and project grid adjust automatically to the number of entries. Replace `avatar.jpg` to update the profile portrait. The original `DSC00720.jpg` is excluded from Git; only the optimized web copy is published.

The original CV remains local and is excluded from Git because it contains personal contact details. Its small contact text and some employer/project names were not reliably readable during transcription, so only verified information is shown. Add verified email, phone, or social links to the contact section if you choose to publish them.

## Deploy

### GitHub Pages

Push this folder to a GitHub repository, then open **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save. The site uses relative asset and CV paths, so it works from a repository subpath.

### Vercel

Import the repository into Vercel. Select **Other** as the framework preset, leave the build command empty, and use `.` as the output directory.

Google Fonts are loaded remotely; the page falls back to system serif/sans fonts if they are unavailable.