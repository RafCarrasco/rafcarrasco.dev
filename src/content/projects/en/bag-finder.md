---
title: 'Bag Finder'
slug: 'bag-finder'
featured: false
order: 2
year: 2025
stack: ['FLUTTER', 'DART', 'FIREBASE', 'RFID']
description: 'Cross-platform mobile app for tracking travel bags using RFID technology.'
links:
  github: 'https://github.com/RafCarrasco/tcc_bag_finder'
---

Bag Finder is a baggage-tracking mobile app built as a final-year capstone (TCC) for the Computer Science degree at Instituto Mauá de Tecnologia. It uses RFID tags to locate bags in real time, bringing order and security to environments like airports, hotels, and events.

#### What it does

Users register their bags, follow their location in real time, and review a movement history. Authentication runs on `Firebase`, and the app talks to an RFID-reading middleware to receive detection events from the hardware.

#### How it's built

Written in `Flutter` and `Dart` to run on Android, iOS, and web from a single codebase. The structure follows a clean architecture, with separate `app`, `domain`, and `env` layers, internationalization support (`l10n`), and tests — an organized foundation built to evolve, not just to pass the course.
