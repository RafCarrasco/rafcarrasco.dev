# Portfolio Site — Rafael Carrasco

**Status:** Design aprovado · pronto para implementação
**Data:** 2026-05-20
**Autor:** Rafael Carrasco

---

## 1. Visão geral

Landing page profissional bilíngue (PT/EN) para Rafael Carrasco — Technical Architect com foco em AI Innovation. Funciona como vitrine para recrutadores e potenciais clientes de freela, complementando LinkedIn e GitHub.

**Posicionamento:** engenheiro de software com olhar de arquiteto, atuando na interseção entre mobile, web, back-end e IA.

**Audiência primária:**

- Recrutadores técnicos (mercado nacional e internacional)
- Potenciais clientes de consultoria/freela em AI
- Pares da indústria (networking)

**Critérios de sucesso:**

- Comunica seniority e identidade técnica em menos de 10 segundos no hero
- Carrega em < 1.5s (Lighthouse Performance 95+)
- Acessível em PT-BR e EN com toggle visível
- Mobile-first responsivo, sem regressão visual em desktop
- Custo de manutenção: adicionar projeto novo = criar 1 markdown

---

## 2. Identidade visual

### Paleta (Royal Blue, modo escuro)

| Token            | Hex       | Uso                              |
| ---------------- | --------- | -------------------------------- |
| `bg-primary`     | `#08080d` | Fundo principal                  |
| `bg-secondary`   | `#0d0d14` | Cards, seções alternadas         |
| `bg-tertiary`    | `#14141c` | Cards elevados, gradientes       |
| `border`         | `#1a1a22` | Divisores, bordas sutis          |
| `border-strong`  | `#2a2a35` | Bordas de chips, inputs          |
| `accent`         | `#1e40af` | Royal Blue — bordas ativas, CTAs |
| `accent-bright`  | `#5582e8` | Texto azul, ícones, hover states |
| `text-primary`   | `#ffffff` | Headings, conteúdo principal     |
| `text-secondary` | `#bbbbbb` | Body, parágrafos                 |
| `text-muted`     | `#888888` | Labels, metadata                 |
| `text-dim`       | `#555555` | Numeração, hints                 |

Fundo do hero usa **glow radial azul difuso** (`radial-gradient(circle, rgba(30,64,175,0.2) 0%, transparent 70%)` + `blur(60px)`) atrás do conteúdo, criando profundidade atmosférica.

### Tipografia

| Família                                     | Uso                                               | Fonte        |
| ------------------------------------------- | ------------------------------------------------- | ------------ |
| **Fraunces** (serif, weights 300/500/700)   | Headings, nomes, citações                         | Google Fonts |
| **Inter Tight** (sans, weights 400/500/700) | Body, parágrafos, navegação                       | Google Fonts |
| **JetBrains Mono** (mono, weights 400/500)  | Labels técnicos, números de seção, eyebrow, chips | Google Fonts |

**Escala (desktop):**

- H1 hero: 72px / line-height 0.95 / letter-spacing -2px
- H2 seção: 40px / line-height 1 / letter-spacing -1px
- H3 cards: 22px / weight 500
- Body: 16px / line-height 1.7
- Body small: 13px
- Labels: 10–11px / letter-spacing 1.5–3px / uppercase

**Escala (mobile):** divisão proporcional — H1 cai pra ~44px, demais pra ~75%.

### Linguagem visual

- Vibe **Lando Norris × Audi** — esportivo+energético combinado com tech+cinemático
- Dark base + accent azul royal + acentos claros
- Bordas finas (1px), nunca grossas
- Cantos retos ou raios mínimos (≤4px)
- Espaço respira: padding generoso, hierarquia clara
- Tipografia faz o trabalho pesado — sem ornamento

---

## 3. Estrutura da página

Single page, scroll vertical, 6 seções na ordem:

### 3.0 Navegação (sticky)

- Fixa no topo com `backdrop-filter: blur(12px)` sobre `rgba(8,8,13,0.85)`
- Logo à esquerda: `R.C` em Fraunces com o ponto em azul
- Menu central: SOBRE · EXPERTISE · PROJETOS · CERTIFICADOS · CONTATO (JetBrains Mono, 11px, uppercase)
- Toggle `PT / EN` à direita com borda azul (estado ativo destacado)
- Em mobile: vira hambúrguer com overlay full-screen

### 3.1 Hero

- Grid 1.4fr / 1fr (texto / foto) no desktop; empilhado no mobile
- **Eyebrow** mono: `TECHNICAL ARCHITECT — AI INNOVATION`
- **H1 serif**: `Rafael\nCarrasco.` (ponto azul, weight 700 no nome — o resto 500)
- **Tagline**: "Engenheiro de software com olhar de arquiteto — entre **mobile**, **back-end** e a nova fronteira da **inteligência artificial**."
- **CTAs**: `VER PROJETOS →` (primário, fundo azul) e `FALAR COMIGO` (secundário, outline)
- **Foto**: aspect ratio 4:5, gradiente azul nos cantos, overlay sutil de gradiente vertical, label `RAFAEL CARRASCO` em mono no canto inferior

### 3.2 Sobre

- Numerada `01 — SOBRE`
- Título: `Engenharia de software com olhar de arquiteto.`
- Grid 1fr / 1.4fr: texto à esquerda, citação à direita
- **Texto (PT-BR):**

  > Engenheiro de software formado em Ciência da Computação pelo Instituto Mauá de Tecnologia. Trabalho na interseção entre mobile, web, app, back-end e inteligência artificial — do código que escala às decisões de arquitetura que orientam o produto.
  >
  > Meu dia a dia mistura fullstack, com grande maioria em Flutter, Node.js, Firebase, REST APIs e o desenho de sistemas baseados em LLMs, MCP Servers e Agents, sempre buscando equilíbrio entre engenharia sólida e impacto real.

- **Citação Senna** (bloco com border-left azul de 2px):
  > "Não diminua a meta, aumente o esforço."
  > — AYRTON SENNA

### 3.3 Expertise

- Numerada `02 — EXPERTISE`
- Título: `Stack técnico.`
- Grid 3 colunas (2 colunas em tablet, 1 em mobile), 6 cards:

| #   | Título         | Descrição                                                      |
| --- | -------------- | -------------------------------------------------------------- |
| 1   | AI Agents      | Sistemas autônomos com tool-use, planning e long-running tasks |
| 2   | MCP Servers    | Model Context Protocol — integrações ricas para LLMs           |
| 3   | LLMs aplicados | RAG, fine-tuning, evals — IA que vai pra produção              |
| 4   | Flutter        | Mobile cross-platform com performance nativa                   |
| 5   | Node.js        | APIs escaláveis, serviços backend, integrações                 |
| 6   | Firebase       | Realtime, auth, functions — infra serverless                   |

Cada card: ícone símbolo geométrico em borda azul (32×32), título em Fraunces, descrição em Inter Tight. Hover: `transform: translateY(-4px)` + borda azul.

### 3.4 Projetos

- Numerada `03 — PROJETOS`
- Título: `Trabalho em destaque.`
- Hint mono: `// CLIQUE EM QUALQUER PROJETO PARA ABRIR DETALHES`

#### 3.4.1 Featured Project (Cinema)

- Bloco grande (altura 360px desktop, 240px mobile)
- Gradiente diagonal `#1e40af` → `#0d0d14`
- Conteúdo posicionado: tag `FEATURED PROJECT` no topo, nome em Fraunces 56px na base
- Indicador pulsante azul no canto superior direito (sinal de clicável)
- Hover: `scale(1.01)` suave
- Click: abre modal de projeto (ver seção 4.2)

#### 3.4.2 Grid de projetos

- 2 colunas no desktop, 1 no mobile
- 4–6 cards (conteúdo curado pelo Rafael)
- Cada card:
  - `// 0N` em mono azul
  - Nome em Fraunces 22px
  - Descrição editorial curta (~2 linhas)
  - Chips de stack em mono 9px com borda
  - Indicador pulsante azul no canto
- Hover: `translateY(-6px)` + borda azul + sombra `0 20px 40px rgba(30,64,175,0.2)`
- Shimmer effect: gradiente claro cruzando o card no hover (duração 600ms)

**Conteúdo dos projetos:** TBD — Rafael vai escolher quais do GitHub destacar. Estrutura preparada pra 1 featured + 4 grid (total 5). Reduzir/aumentar é trivial.

### 3.5 Certificados

- Numerada `04 — CERTIFICADOS`
- Título: `Formação contínua.`
- Hint mono: `// CLIQUE PARA VER CERTIFICADO COMPLETO`
- Layout editorial: grid 40px / 1fr / 200px / 100px / 20px (num / título / emissor / data / ícone↗)
- Cada linha: padding 18px, border-bottom 1px
- Hover: padding-left 12px (desliza pra direita) + spotlight azul sutil
- Click: abre modal com imagem do certificado + descrição + link de verificação se houver

**Conteúdo:** placeholder por enquanto. Rafael vai puxar últimos certificados do LinkedIn (provavelmente Anthropic Academy + Mauá + Vancouver/Inglês + outros).

### 3.6 Contato

- Numerada `05 — CONTATO`
- Centralizado
- Título grande em Fraunces 64px: `Vamos conversar.` (palavra "conversar" em azul)
- Subtexto: "Aberto a oportunidades em AI Innovation, consultorias técnicas e projetos com agents/LLMs."
- 3 botões outline azul: `LINKEDIN ↗` `GITHUB ↗` `EMAIL ↗`
- Links:
  - LinkedIn: `linkedin.com/in/rafael-alves-carrasco`
  - GitHub: `github.com/RafCarrasco`
  - Email: `rafaelcarrasco304@gmail.com` (com mailto:)

---

## 4. Comportamento interativo

### 4.1 Animações de scroll (GSAP + ScrollTrigger + Lenis)

- **Lenis** ativo globalmente para scroll suave (lerp 0.1)
- **Reveal on scroll** em cada seção: opacidade 0→1 + translateY 24→0, duração 800ms, ease `power3.out`, trigger quando 70% da seção entra no viewport
- **Stagger** nos cards de expertise e projetos: cada card entra com delay incremental de 80ms
- **Parallax sutil** na foto do hero: translate Y proporcional ao scroll (intensidade -30px no máximo)
- **Glow radial do hero**: respira em loop infinito (opacidade 0.2 ↔ 0.35 a cada 4s)

### 4.2 Modais de projeto

Aberto via click em featured ou grid card. Animação de entrada: backdrop fade 200ms + modal scale(0.96 → 1) translateY(20 → 0) em 400ms ease-out.

**Estrutura do modal de projeto:**

- Backdrop com `rgba(0,0,0,0.85)` + blur(8px)
- Container central, max-width 800px, max-height 90vh, scroll interno
- Imagem hero do projeto no topo (aspect 16:9)
- Header: nome em Fraunces + tag de ano
- Stack chips
- Descrição completa (markdown renderizado: parágrafos, listas, code blocks)
- Seções opcionais: "Problema", "Solução", "Aprendizados"
- Links de saída: `→ GITHUB REPO`, `→ LIVE DEMO` (se houver), `→ ARTIGO` (se houver)
- Botão fechar (X) no canto superior + tecla ESC + click no backdrop

### 4.3 Modais de certificado

Mesmo padrão, mais simples:

- Imagem do certificado (PDF embed ou PNG)
- Nome do curso/certificação
- Emissor
- Data de obtenção
- Descrição curta
- Link de verificação se houver (`→ VERIFICAR AUTENTICIDADE`)

### 4.4 Toggle PT / EN

- Click no toggle troca todo conteúdo via i18n do Astro
- Estado persiste em `localStorage` com chave `lang`
- Sem refresh — usa View Transitions API do Astro para transição suave
- URL reflete a língua: `/` (PT default) e `/en/` (EN)

### 4.5 Estados de hover globais

- Links de texto: cor muda para `accent-bright`, transição 200ms
- Botões primários: background `accent` → `#2e5cff`
- Cards: lift + border accent (já descrito por seção)
- Cursor sobre elementos clicáveis: pointer

---

## 5. Stack técnica

| Camada       | Escolha                                                                                   | Razão                                                              |
| ------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Framework    | **Astro 4.x**                                                                             | Static-first, i18n nativo, content collections, JS mínimo          |
| Linguagem    | **TypeScript**                                                                            | Tipagem nas content collections e props                            |
| Estilização  | **CSS scoped** em arquivos `.astro` + variáveis globais em `src/styles/tokens.css`        | Sem framework CSS — controle total, bundle mínimo                  |
| Animação     | **GSAP** + **ScrollTrigger** + **Lenis**                                                  | Scroll cinemático fluido, padrão indústria para sites desse perfil |
| Modais       | Custom (vanilla JS em ilha Astro)                                                         | Sem dep extra; reusa estilos do tema                               |
| Fontes       | Google Fonts (Fraunces, Inter Tight, JetBrains Mono) servidas via `<link>` com preconnect | Cacheável, free, sem download local                                |
| Ícones       | Símbolos Unicode + SVG inline                                                             | Sem biblioteca de ícones, máxima leveza                            |
| i18n         | Astro i18n built-in com pastas `/src/content/[lang]/`                                     | Type-safe, sem libs                                                |
| Build/deploy | **Vercel** com GitHub integration                                                         | Preview deploys, edge CDN, domínio customizado fácil               |

**Dependências planejadas (package.json mínimo):**

- `astro`
- `@astrojs/check`
- `typescript`
- `gsap`
- `lenis`

---

## 6. Conteúdo bilíngue (i18n)

### Estrutura de arquivos de conteúdo

```
src/content/
├── config.ts                    # schema das collections
├── projects/
│   ├── pt/
│   │   ├── projeto-01.md
│   │   ├── projeto-02.md
│   │   └── ...
│   └── en/
│       ├── project-01.md
│       └── ...
├── certificates/
│   ├── pt/
│   └── en/
└── site/
    ├── pt.json                  # textos do hero, sobre, expertise
    └── en.json
```

### Schema de projeto (frontmatter)

```yaml
---
title: 'Nome do Projeto'
slug: 'agent-orchestrator'
featured: true # apenas um projeto pode ter true
order: 1 # ordem no grid
year: 2025
stack: ['MCP', 'Node.js', 'TypeScript']
description: 'Linha curta para o card'
heroImage: '/img/projects/agent-orchestrator-hero.jpg'
links:
  github: 'https://github.com/RafCarrasco/...'
  demo: 'https://...' # opcional
  article: 'https://...' # opcional
---
# Markdown body com a descrição completa do projeto
...
```

### Schema de certificado (frontmatter)

```yaml
---
title: 'Building with Claude'
issuer: 'Anthropic Academy'
date: '2025-08'
order: 1
image: '/img/certs/anthropic-claude.png' # ou pdf
verifyUrl: 'https://...' # opcional
---
# Descrição curta opcional do que foi aprendido
```

### Textos UI (pt.json / en.json)

Contém: nav labels, hero eyebrow/tagline, CTAs, sec-num labels, títulos de seção, contact subtext, alt-texts.

---

## 7. Hospedagem & deploy

- **Plataforma:** Vercel (free tier suficiente)
- **Domínio:** customizado — `.dev` ou `.ai` preferencial (a comprar)
- **Build command:** `astro build`
- **Output:** `dist/` estático
- **CI/CD:** push em `main` → deploy de produção; PR → preview deploy
- **Headers:** cache de assets imutáveis (`/img/*`, `/_astro/*`) com max-age 1 ano
- **Analytics (opcional):** Vercel Analytics ou Plausible — decisão pós-launch

---

## 8. Estrutura de arquivos

```
.
├── public/
│   ├── img/
│   │   ├── photo.jpg            # foto profissional do Rafael
│   │   ├── projects/
│   │   └── certs/
│   ├── favicon.svg
│   └── og-image.png             # para compartilhamento social
├── src/
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Expertise.astro
│   │   ├── Projects.astro
│   │   ├── FeaturedProject.astro
│   │   ├── ProjectCard.astro
│   │   ├── Certificates.astro
│   │   ├── CertRow.astro
│   │   ├── Contact.astro
│   │   ├── Modal.astro
│   │   ├── ProjectModal.astro
│   │   └── CertModal.astro
│   ├── content/
│   │   ├── config.ts
│   │   ├── projects/
│   │   ├── certificates/
│   │   └── site/
│   ├── i18n/
│   │   ├── ui.ts
│   │   └── utils.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro          # PT (default)
│   │   └── en/
│   │       └── index.astro      # EN
│   ├── scripts/
│   │   ├── animations.ts        # GSAP + ScrollTrigger setup
│   │   ├── lenis.ts             # smooth scroll
│   │   └── modal.ts             # gestão de modais
│   └── styles/
│       ├── tokens.css           # variáveis CSS globais
│       ├── reset.css
│       └── fonts.css
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-05-20-portfolio-site-design.md   ← este arquivo
├── astro.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## 9. Responsividade

Breakpoints:

- `desktop` ≥ 1024px (design primário)
- `tablet` 768–1023px (grids viram 2 colunas, fontes reduzem ~10%)
- `mobile` < 768px (tudo empilha, fontes reduzem ~25%, nav vira hambúrguer)

Mobile-specific:

- Hero: foto em cima, texto embaixo
- Featured project: altura reduzida pra 240px
- Modais: fullscreen com padding mínimo
- Toggle PT/EN: dentro do menu hambúrguer
- Animações scroll-driven mantidas (Lenis funciona em touch)

---

## 10. Acessibilidade

- Contraste mínimo WCAG AA (texto azul `#5582e8` sobre fundo escuro `#08080d` passa AAA)
- Foco visível em todos os elementos interativos (outline azul 2px)
- Modais com `role="dialog"`, `aria-modal="true"`, trap de foco, escape fecha
- Imagens com `alt` descritivo
- Nav semântico (`<nav>`, `<ul>`, `<li>`)
- Movimento respeita `prefers-reduced-motion` (animações ficam instantâneas)
- Toggle PT/EN com `aria-pressed` no estado ativo

---

## 11. Critérios de aceitação

Implementação está "pronta" quando:

- [ ] Página renderiza corretamente em Chrome, Firefox, Safari, Edge (últimas duas versões)
- [ ] Mobile responsivo testado em 375px, 414px, 768px, 1024px, 1440px
- [ ] Lighthouse: Performance ≥ 95, Accessibility ≥ 95, Best Practices = 100, SEO = 100
- [ ] Toggle PT/EN funcional, sem flash de conteúdo errado
- [ ] Modais abrem/fecham via click, ESC e backdrop
- [ ] Pelo menos 1 projeto featured + 3 projetos grid + 3 certificados publicados
- [ ] Foto profissional no hero
- [ ] Meta tags OG configuradas (título, descrição, imagem)
- [ ] Deploy na Vercel funcional + domínio apontando
- [ ] Repo público no GitHub (nome a definir, p.ex. `rafcarrasco-portfolio` ou `rafael-carrasco-site`)

---

## 12. Fora de escopo (não fazer)

- Sistema de blog (pode entrar depois como expansão)
- Formulário de contato com backend (botão email mailto: basta)
- Dark/light mode toggle (site é dark-only por design)
- CMS (markdown direto no repo)
- Projetos da Procurement Garage (só pessoais do GitHub)
- Animações 3D / WebGL (overkill)
- Comentários, reactions, ou qualquer interatividade social

---

## 13. Riscos e mitigações

| Risco                                               | Mitigação                                                                   |
| --------------------------------------------------- | --------------------------------------------------------------------------- |
| Animações em mobile pesado (low-end) podem janquear | Usar `prefers-reduced-motion` + simplificar animações em viewports pequenos |
| Fontes do Google atrasam first paint                | Preload + `font-display: swap`                                              |
| Modais quebram em mobile                            | Testar com keyboard virtual e safe areas                                    |
| Conteúdo bilíngue desincronizado                    | CI check que valida paridade de arquivos PT/EN                              |
| Domínio `.dev`/`.ai` indisponível                   | Fallback: `rafaelcarrasco.com.br` ou `rafcarrasco.dev`                      |

---

## 14. Próximos passos

1. Spec aprovado pelo Rafael (este passo)
2. Plano de implementação detalhado via skill `writing-plans`
3. Criação do repositório GitHub
4. Setup inicial do projeto Astro
5. Implementação iterativa por seção
6. Curadoria de projetos e certificados (conteúdo)
7. Foto profissional
8. Compra de domínio
9. Deploy na Vercel
