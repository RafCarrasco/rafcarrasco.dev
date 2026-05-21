---
title: 'Nexia'
slug: 'nexia'
featured: true
order: 1
year: 2026
stack: ['NEXT.JS', 'TYPESCRIPT', 'SUPABASE', 'POSTGRES', 'TAILWIND']
description: 'SaaS multi-tenant de aprovação de pagamentos para back-offices de investidores estrangeiros.'
links:
  github: 'https://github.com/RafCarrasco/Nexia'
---

Nexia é um SaaS de workflow de aprovação de pagamentos para firmas de back-office que operam contas a pagar de investidores estrangeiros no Brasil. Substitui o trio planilha mestre + email + OneDrive por um sistema único com rastreabilidade completa, do pedido à execução bancária.

#### O problema

A equipe interna cria um pedido com vários itens de pagamento; o sistema dispara um email com `magic link` para o cliente estrangeiro, que acessa sem login e aprova, questiona ou rejeita item por item. Cada decisão notifica a equipe e empurra o processo adiante — sem perder histórico no caminho.

#### A arquitetura

Construído em `Next.js 15` (App Router, React 19) com front-end e back-end no mesmo projeto, tipado de ponta a ponta em TypeScript. O `Supabase` cobre Postgres, Auth, Storage e magic link, com **isolamento multi-tenant garantido por Row Level Security** — cada firma só enxerga seus dados no nível do banco. Email transacional via Resend, com fallback que exibe o link na tela quando a API não está configurada. O destaque é o portal do cliente sem autenticação: seguro por token, expira em 14 dias e equilibra compliance (LGPD, dados na região de São Paulo) com zero fricção.
