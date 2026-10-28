# Offline-Capable PWA Deployment Package

This package contains all the required files to turn your web application into an offline-capable Progressive Web App (PWA).

## Package Contents

- **`index.html`**: Main HTML entry file with manifest link, theme color meta tags, and app structure.
- **`main.js`**: Application logic with Service Worker registration, updates listener, and online/offline status handling.
- **`sw.js`**: Service Worker implementing a Cache-First strategy to allow offline access.
- **`styles.css`**: Styling file styled for modern mobile and desktop screens.
- **`manifest.json`**: Web App Manifest specifying app names, colors, display settings, and icon links.
- **`icon-192.png` / `icon-512.png`**: Placeholder icons for PWA installation.

## Deploying to Cloudflare Pages / Static Hosting

1. Unzip this package.
2. Deploy all files to the root directory of your project output (e.g., `dist/` or `public/`).
3. Serve your application over **HTTPS** (Cloudflare does this automatically).
4. Open your browser DevTools -> **Application** -> **Service Workers** to verify `sw.js` is registered.
5. In Lighthouse / PWA audit, the site will now register as **Offline-capable PWA**.
