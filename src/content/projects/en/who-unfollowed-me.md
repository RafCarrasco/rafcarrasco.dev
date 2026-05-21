---
title: 'Who Unfollowed Me'
slug: 'who-unfollowed-me'
featured: false
order: 5
year: 2026
stack: ['JAVASCRIPT', 'CHROME EXTENSION', 'MANIFEST V3']
description: 'Browser extension that identifies who unfollowed you on Instagram.'
links:
  github: 'https://github.com/RafCarrasco/who-unfollowed-me'
---

Who Unfollowed Me is a browser extension (Chrome, Manifest V3) that shows who unfollowed you on Instagram — and who you follow without being followed back.

#### How it works

The extension takes snapshots of your followers and following lists and compares two captures to detect changes. It reads the active Instagram session from browser cookies, walks the internal API with full pagination, and keeps the latest snapshots in local `chrome.storage`. It includes a real-time search filter and result export.

#### How it's built

Written in plain JavaScript, no frameworks, on top of `Manifest V3` — service worker, `chrome.storage`, `chrome.cookies`, and `chrome.tabs`. All processing runs locally: no data ever leaves the browser. A small, focused project centered on API integration, pagination handling, and error states.
