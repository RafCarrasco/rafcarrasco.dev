---
title: 'Servidor de Leitor RFID UHF'
slug: 'uhf-reader-server'
featured: false
order: 3
year: 2025
stack: ['NODE.JS', 'EXPRESS', 'MYSQL', 'WEBSOCKET', 'TCP']
description: 'Servidor TCP em Node.js que integra leitores RFID UHF a uma API e banco MySQL.'
links:
  github: 'https://github.com/RafCarrasco/uhf-reader-script_bag_finder'
---

Este é o backend de hardware do projeto Bag Finder: um servidor em Node.js que conversa diretamente com leitores RFID UHF da ViaOnda via TCP, enviando comandos de leitura e capturando as detecções de etiquetas em tempo real.

#### Ponte entre hardware e aplicação

O serviço abre um socket TCP com o leitor físico, interpreta o protocolo de comunicação e transforma cada evento de detecção em dados estruturados. Esses dados são persistidos em `MySQL` e expostos por uma `API Express`, enquanto um canal `WebSocket` empurra as leituras ao vivo para os clientes conectados.

#### A engenharia

Escrito como projeto ES Modules moderno, com `src` dividido em módulos claros — `api`, `config`, `db`, `reader` e `services` — e três modos de execução (`api`, `reader` ou ambos juntos). É a peça de infraestrutura que faz a integração com hardware real funcionar de forma confiável por trás do app mobile.
