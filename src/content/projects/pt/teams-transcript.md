---
title: 'Teams Transcript'
slug: 'teams-transcript'
featured: false
order: 4
year: 2026
stack: ['WHISPER', 'CLAUDE', 'NODE.JS', 'SQLITE']
description: 'Ferramenta local-first que transcreve calls do Microsoft Teams sem bot e sem aparecer na chamada.'
links:
  github: 'https://github.com/RafCarrasco/teams-transcript'
---

Teams Transcript é uma ferramenta que transcreve chamadas do Microsoft Teams de forma silenciosa — sem entrar na call, sem bot e sem aparecer para ninguém. Captura o áudio do sistema e do microfone, transcreve com `Whisper` localmente e gera um resumo com action items via `Claude`.

#### O princípio

O projeto nasce de uma premissa de privacidade: toda a transcrição roda na máquina do usuário e o áudio nunca sai do disco. Só o resumo, opcional, usa a API do Claude. O `Whisper` detecta português e inglês automaticamente, lidando bem com calls mistas, e os transcripts ficam em markdown local com `SQLite` para busca.

#### Estado atual

A arquitetura técnica está documentada e aprovada — incluindo análise legal (LGPD, consentimento, políticas corporativas), roadmap de fases e a pesquisa de bibliotecas avaliadas. É um projeto em estágio de design, pronto para implementação, que mostra como abordo decisões de arquitetura, privacidade e IA aplicada antes de escrever a primeira linha de código.
