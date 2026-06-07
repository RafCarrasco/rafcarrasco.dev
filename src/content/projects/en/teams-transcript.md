---
title: 'Teams Transcript'
slug: 'teams-transcript'
featured: false
order: 4
year: 2026
stack: ['WHISPER', 'CLAUDE', 'NODE.JS', 'SQLITE']
description: 'Local-first tool that transcribes Microsoft Teams calls with no bot and no presence in the call.'
links:
  github: 'https://github.com/RafCarrasco/teams-transcript'
---

Teams Transcript is a tool that silently transcribes Microsoft Teams calls — without joining the call, without a bot, and without showing up to anyone. It captures both system and microphone audio, transcribes it locally with `Whisper`, and generates an action-item summary via `Claude`.

#### The principle

The project starts from a privacy premise: all transcription runs on the user's machine and audio never leaves the disk. Only the optional summary uses the Claude API. `Whisper` auto-detects Portuguese and English, handling mixed-language calls gracefully, and transcripts are stored as local markdown with `SQLite` for search.

#### Current status

The technical architecture is documented and approved — including legal analysis (LGPD, consent, corporate policy), a phased roadmap, and research into evaluated libraries. It's a design-stage project, ready for implementation, that shows how I approach architecture, privacy, and applied-AI decisions before writing the first line of code.
