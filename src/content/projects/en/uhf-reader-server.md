---
title: 'UHF RFID Reader Server'
slug: 'uhf-reader-server'
featured: false
order: 3
year: 2025
stack: ['NODE.JS', 'EXPRESS', 'MYSQL', 'WEBSOCKET', 'TCP']
description: 'Node.js TCP server bridging UHF RFID readers to an API and MySQL database.'
links:
  github: 'https://github.com/RafCarrasco/uhf-reader-script_bag_finder'
---

This is the hardware backend behind the Bag Finder project: a Node.js server that talks directly to ViaOnda UHF RFID readers over TCP, issuing read commands and capturing tag detections in real time.

#### A bridge between hardware and application

The service opens a TCP socket to the physical reader, parses its communication protocol, and turns each detection event into structured data. That data is persisted to `MySQL` and exposed through an `Express API`, while a `WebSocket` channel pushes live readings to connected clients.

#### The engineering

Written as a modern ES Modules project, with a `src` folder split into clear modules — `api`, `config`, `db`, `reader`, and `services` — and three run modes (`api`, `reader`, or both together). It's the infrastructure piece that makes real hardware integration work reliably behind the mobile app.
