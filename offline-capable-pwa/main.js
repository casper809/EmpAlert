// Main Application Script (main.js)

/**
 * Registers the Service Worker to enable offline caching and PWA functionality.
 */
function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Workers are not supported by this browser.');
    const statusEl = document.getElementById('sw-status');
    if (statusEl) statusEl.textContent = 'Service Workers not supported by this browser.';
    return;
  }

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      console.log('ServiceWorker registration successful with scope:', registration.scope);
      const statusEl = document.getElementById('sw-status');
      if (statusEl) statusEl.textContent = 'Service Worker registered and active.';

      // Check for updates to the Service Worker script
      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;
        if (!installingWorker) return;

        installingWorker.addEventListener('statechange', () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('New version available! Please refresh the page.');
              if (statusEl) statusEl.textContent = 'New update available! Reload to update.';
            } else {
              console.log('Content is cached and available for offline use.');
              if (statusEl) statusEl.textContent = 'Content cached for offline use.';
            }
          }
        });
      });
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
      const statusEl = document.getElementById('sw-status');
      if (statusEl) statusEl.textContent = 'Service Worker registration failed.';
    }
  });
}

// Online/Offline Status Detector
function setupNetworkStatusListeners() {
  const badge = document.getElementById('status-badge');
  if (!badge) return;

  function updateStatus() {
    if (navigator.onLine) {
      badge.textContent = 'Online';
      badge.className = 'badge online';
    } else {
      badge.textContent = 'Offline Mode';
      badge.className = 'badge offline';
    }
  }

  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
  updateStatus();
}

// Manual update check button
function setupUI() {
  const btn = document.getElementById('check-update-btn');
  if (btn) {
    btn.addEventListener('click', async () => {
      if ('serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.ready;
        await reg.update();
        alert('Checked for Service Worker updates.');
      }
    });
  }
}

// Initialize Application
registerServiceWorker();
document.addEventListener('DOMContentLoaded', () => {
  setupNetworkStatusListeners();
  setupUI();
  console.log('App initialized successfully.');
});
