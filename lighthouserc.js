// lighthouserc.js
// Lighthouse CI configuration for automated accessibility and performance audits.
//
// Research: Lighthouse CLI cannot audit file:// URLs (immediate abort:
// "Can only audit pages on HTTP or HTTPS"). A local HTTP server is mandatory.
//
// SEO and PWA categories produce false positives for offline single-file tools
// (missing robots.txt, no manifest.json, no service worker). Only audit
// performance, accessibility, and best-practices.
//
// SETUP:
//   npm install -g @lhci/cli
//
// RUN LOCALLY:
//   lhci autorun
//
// The startServerCommand uses python3's built-in HTTP server (no Node deps).

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'python3 -m http.server 3000 --directory dist',
      url: ['http://localhost:3000/prompt-composer.html'],
      numberOfRuns: 3, // Average over 3 runs to reduce flakiness
      settings: {
        formFactor: 'desktop',
        screenEmulation: { disabled: true },
        // Only audit relevant categories — skip SEO (false positives for local tools)
        // and PWA (tool is natively offline, no service worker needed)
        onlyCategories: ['performance', 'accessibility', 'best-practices']
      }
    },
    assert: {
      assertions: {
        // HARD FAIL: Accessibility below 90% blocks the build.
        // Catches missing ARIA labels, bad contrast, focus issues.
        'categories:accessibility': ['error', { minScore: 0.9 }],

        // WARNING: Performance below 95% (no hard fail — inline JS
        // parse time varies by CI runner CPU).
        'categories:performance': ['warn', { minScore: 0.95 }],

        // Disable HTTP/HTTPS false positives for localhost testing
        'is-on-https': 'off',
        'uses-http2': 'off',
        'uses-long-cache-ttl': 'off'
      }
    },
    upload: {
      // Temporary public storage for CI report review (auto-expires)
      target: 'temporary-public-storage'
    }
  }
};
