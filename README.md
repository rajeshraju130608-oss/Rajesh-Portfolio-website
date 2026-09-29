# R. Rajesh — Portfolio Website

A self-contained, dependency-free portfolio (HTML5 + CSS3 + vanilla JS). No build step, no backend.

## Files
- `index.html` — all page content and structure
- `style.css` — the black + white + gold design system
- `script.js` — navigation, scroll reveals, animated stats, the Services dialog, the certificate lightbox, and the custom cursor
- `assets/` — your photo, project screenshots and certificate

## Opening the site
Just double-click `index.html` to open it in a browser. For the smoothest experience (and to avoid any browser
restrictions on local files), you can also serve it from the folder with:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Publishing it
Drag the whole folder into Netlify Drop, or push it to a GitHub repo and enable GitHub Pages — no build
configuration is needed since everything is plain HTML/CSS/JS.

## Replacing images later
Everything lives in `assets/` with clear names — drop in a new file with the *same name* to replace it, or update
the `src` path in `index.html` if you rename it:

| File | Used for |
|---|---|
| `assets/profile.jpg` | Hero portrait |
| `assets/project-svarsh.jpg` | Svarsh Technology project card |
| `assets/project-ecommerce.jpg` | Svarsh Technology E-Commerce project card |
| `assets/project-axiom.jpg` | Axiom Publication project card |
| `assets/project-emergency.jpg` | AI-Powered Emergency Response project card |
| `assets/project-voxapp.jpg` | VoxApp AI project card |
| `assets/certificate-rfid.jpg` | Achievement certificate + lightbox |

## Notes
- Icons load from Font Awesome and Devicon via CDN, and fonts (Space Grotesk / Inter) from Google Fonts — an
  internet connection is needed the first time a browser loads the page.
- Animations respect `prefers-reduced-motion`, and the custom cursor only appears on desktop pointers.
- All 5 projects, all 16 technologies, all 4 stats and all 12 services from the brief are included.
