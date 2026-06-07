---
title: 'Who Unfollowed Me'
slug: 'who-unfollowed-me'
featured: false
order: 5
year: 2026
stack: ['JAVASCRIPT', 'CHROME EXTENSION', 'MANIFEST V3']
description: 'Extensão de navegador que identifica quem deixou de te seguir no Instagram.'
links:
  github: 'https://github.com/RafCarrasco/who-unfollowed-me'
---

Who Unfollowed Me é uma extensão de navegador (Chrome, Manifest V3) que mostra quem deixou de te seguir no Instagram — e também quem você segue sem ser seguido de volta.

#### Como funciona

A extensão tira "snapshots" das listas de seguidores e seguindo e compara duas capturas para detectar mudanças. Lê a sessão ativa do Instagram pelos cookies do navegador, percorre a API interna com paginação completa e guarda os últimos snapshots no `chrome.storage` local. Inclui filtro de busca em tempo real e exportação dos resultados.

#### A construção

Feita em JavaScript puro, sem frameworks, sobre o `Manifest V3` — service worker, `chrome.storage`, `chrome.cookies` e `chrome.tabs`. Todo o processamento roda localmente: nenhum dado sai do navegador. Um projeto pequeno e direto, focado em integração de API, tratamento de paginação e estados de erro.
