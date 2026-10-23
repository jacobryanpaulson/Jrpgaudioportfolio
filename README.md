# JRPGAudio Portfolio

A static React portfolio built with Vite. Portfolio content is maintained in
`src/data/sampleContent.js`; files placed in `public/` can be referenced by URL
from that content (for example, `/media/reel.mp4`).

## Run locally

```powershell
npm install
npm run dev
```

Vite prints the local URL. No backend or account setup is required.

## Build and preview

```powershell
npm run build
npm run preview
```

Deploy the generated `dist/` directory to any static web host. Configure the
host to serve `index.html` for unknown routes so client-side routes continue to
work.

## Deploy to GitHub Pages

The included GitHub Actions workflow builds and deploys the site when changes
are pushed to `main` or `master`. In the repository settings, open **Pages**
and set the build and deployment source to **GitHub Actions**. The workflow
automatically uses the repository subpath for project sites and the root path
for `owner.github.io` sites or repositories with a `CNAME` custom domain.

## Update the portfolio

Edit the profile, videos, audio clips, and mixer stems in
`src/data/sampleContent.js`. Add media files under `public/media/` and use
root-relative URLs such as `/media/track.mp3`. Run a new build and redeploy
`dist/` after making changes.

To show a portrait in the About section behind its waveform, add the image to
`public/media/` and set `about_photo_url` in `sampleProfile`, for example
`'/media/portrait.jpg'`.

The former Studio, account, and upload features used a hosted backend and are
not part of this standalone version.
