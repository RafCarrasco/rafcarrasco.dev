---
title: 'Bag Finder'
slug: 'bag-finder'
featured: false
order: 2
year: 2025
stack: ['FLUTTER', 'DART', 'FIREBASE', 'RFID']
description: 'App mobile multiplataforma para rastrear malas de viagem usando tecnologia RFID.'
links:
  github: 'https://github.com/RafCarrasco/tcc_bag_finder'
---

Bag Finder é um aplicativo mobile de rastreamento de bagagem desenvolvido como Trabalho de Conclusão de Curso em Ciência da Computação no Instituto Mauá de Tecnologia. Ele usa etiquetas RFID para localizar malas em tempo real, trazendo organização e segurança a ambientes como aeroportos, hotéis e eventos.

#### O que faz

O usuário cadastra suas malas, acompanha a localização em tempo real e consulta o histórico de movimentações. A autenticação roda sobre o `Firebase`, e o app conversa com um middleware de leitura RFID para receber os eventos de detecção do hardware.

#### A construção

Feito em `Flutter` e `Dart` para rodar em Android, iOS e web a partir de uma única base de código. A estrutura segue uma arquitetura limpa, com camadas separadas de `app`, `domain` e `env`, suporte a internacionalização (`l10n`) e testes — uma base organizada e pensada para evoluir, e não apenas para entregar a nota.
