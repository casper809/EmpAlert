// Main Application Script (main.js / index.js)

/**
 * Registers the Service Worker to enable offline caching and PWA functionality.
 */
function registerServiceWorker() {
  // Check if Service Workers are supported by the browser
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Workers are not supported by this browser.');
    return;
  }

  window.addEventListener('load', async () => {
    try {
      // Register the service worker script located at the root directory
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      console.log('ServiceWorker registration successful with scope:', registration.scope);

      // Check for updates to the Service Worker script
      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;
        if (!installingWorker) return;

        installingWorker.addEventListener('statechange', () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // New content is available; notify user or prompt for reload
              console.log('New version available! Please refresh the page.');
            } else {
              // Content is cached for offline use
              console.log('Content is cached and available for offline use.');
            }
          }
        });
      });
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
    }
  });
}

// Execute Service Worker registration
registerServiceWorker();

// --- Application Initialization Logic ---
document.addEventListener('DOMContentLoaded', () => {
  console.log('App initialized successfully.');
  // Add your primary application startup logic here
});