# Portfolio Site Setup

The portfolio is a responsive static website built with HTML and CSS. All page content is written directly in `index.html`; `script.js` updates the copyright year, adds scroll-triggered reveal/count-up effects, and opens the browser's native print dialog for PDF export. Choose **Save as PDF** in the print dialog.

## Project structure

```text
About/
├── index.html
├── styles.css
├── script.js
├── avatar.jpg
├── README.md
└── SITE-SETUP.md
```

## Run locally

No package installation or build step is required. From this folder, run:

```powershell
py -m http.server 4173
```

Open `http://localhost:4173`. You can also open `index.html` directly, though a local server better matches deployment behavior.

## Update site content

Edit the experience entries, project cards, skill groups, and other page copy directly in `index.html`. Add or remove the corresponding HTML blocks to change their count. Replace `avatar.jpg` to update the profile portrait. The original `DSC00720.jpg` is excluded from Git; only the optimized web copy is published.

The original CV remains local and is excluded from Git because it contains personal contact details. Only verified contact information is published; phone remains private while the verified email and social links appear in the contact section.

## Deploy

### GitHub Pages

Open repository **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save. The site uses relative asset paths, so it works from a repository subpath.

### Vercel

Import the repository into Vercel. Select **Other** as the framework preset, leave the build command empty, and use `.` as the output directory.

Google Fonts are loaded remotely; the page falls back to system serif/sans fonts if they are unavailable.