---
title: 'Nexia'
slug: 'nexia'
featured: true
order: 1
year: 2026
stack: ['NEXT.JS', 'TYPESCRIPT', 'SUPABASE', 'POSTGRES', 'TAILWIND']
description: 'Multi-tenant payment-approval SaaS for back-offices handling foreign investors.'
links:
  github: 'https://github.com/RafCarrasco/Nexia'
---

Nexia is a payment-approval workflow SaaS for back-office firms managing accounts payable for foreign investors in Brazil. It replaces the master-spreadsheet + email + OneDrive trio with a single system that offers full traceability, from request creation to bank execution.

#### The problem

An internal team creates a request with multiple payment items; the system fires an email with a `magic link` to the foreign client, who accesses it without logging in and approves, questions, or rejects each item individually. Every decision notifies the team and pushes the process forward — with no history lost along the way.

#### The architecture

Built on `Next.js 15` (App Router, React 19), keeping front-end and back-end in one project, fully typed end-to-end in TypeScript. `Supabase` covers Postgres, Auth, Storage, and magic link, with **multi-tenant isolation enforced by Row Level Security** — each firm sees only its own data at the database level. Transactional email runs through Resend, with a fallback that shows the link on screen when the API isn't configured. The highlight is the login-free client portal: token-secured, expiring after 14 days, balancing compliance (LGPD, data hosted in the São Paulo region) with zero friction.
