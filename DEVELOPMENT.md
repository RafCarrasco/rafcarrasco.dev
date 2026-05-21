# Development Log · rafcarrasco.dev

> Histórico completo do desenvolvimento desse portfolio — do briefing inicial até a versão em produção. Documenta decisões de design, escolhas técnicas, marcos de implementação e ajustes pós-deploy.

**URL em produção:** https://rafaelcarrasco-dev.vercel.app/
**Repositório:** https://github.com/RafCarrasco/rafcarrasco.dev
**Iniciado em:** 2026-05-20
**Versão atual:** commit `27fb05a`

---

## 1. Briefing inicial

Site pessoal pra Rafael Carrasco (Technical Architect, AI Innovation @ Procurement Garage), funcionando como vitrine profissional bilíngue (PT/EN) pra recrutadores e potenciais clientes de freela.

**Referências visuais citadas:**
- Lando Norris (esportivo, energético)
- Porsche (luxo, refinado)
- Audi (tech, cinemático)

**Seções desejadas:** Hero, Sobre, Especialidades, Projetos (com modal), Certificados (com modal), Contato

**Restrições:**
- Sem fontes genéricas (não Inter/Roboto/Arial)
- Responsivo
- Projetos da empresa fora — só pessoais do GitHub

---

## 2. Decisões de design (fase de brainstorming)

| Decisão | Escolhido | Por quê |
|---|---|---|
| Vibe geral | **Lando × Audi** | Mix de energia esportiva com precisão técnica |
| Paleta | **Royal Blue** (#1e40af + #5582e8) | Clássico-moderno, sem cara de neon |
| Tipografia heading | **Fraunces** (serif moderna) | Personalidade + warmth, não-genérica |
| Tipografia body | **Inter Tight** | Sans neutra, técnica |
| Tipografia mono | **JetBrains Mono** | Labels técnicos, código |
| Idioma | **PT/EN bilíngue** | Inglês avançado + AI Innovation é internacional |
| Stack | **Astro 6 + TypeScript** | Static-first, i18n nativo, content collections |
| Animações | **GSAP + Lenis** | Scroll cinemático + reveals |
| Foto | **Sim, no hero** | Humaniza, vibe Lando |
| Hospedagem | **Vercel + domínio próprio (futuro)** | Deploy automático, edge CDN |
| Conteúdo projetos | **Estático curado (markdown)** | Controle editorial total |
| Tratamento visual projetos | **3 estilos hierarquizados** | Featured cinemático + Cards grid + Editorial certs |

**Documentos gerados:**
- `docs/superpowers/specs/2026-05-20-portfolio-site-design.md` — spec completa de design
- `docs/superpowers/plans/2026-05-20-portfolio-site.md` — plano de implementação em 27 tarefas

---

## 3. Marcos de implementação

### Phase 1 — Foundation (commits `6c29db0` → `eeab8a0`)

| Commit | O quê |
|---|---|
| `6112dae` | Initial commit com design spec |
| `6c29db0` | Bootstrap Astro project com TypeScript |
| `7aa0cba` | Rename package pra `rafcarrasco-dev` |
| `ab2002f` | Adiciona Prettier, Vitest, Playwright |
| `7c861f4` | Ignore `docs/` no prettier (preserva formatação dos specs) |
| `6ddf017` | Design tokens CSS + reset + fonts (Google Fonts) |
| `eeab8a0` | Configuração i18n PT/EN + utilities + unit tests |

**Stack consolidada:**
- Astro 6.3.6
- TypeScript strict
- Prettier (com prettier-plugin-astro)
- Vitest (unit)
- Playwright (e2e)
- 8 unit tests passando

### Phase 2 — Content Collections (commit `b8a2e41`)

- Schemas zod pra `projects` e `certificates`
- Suporte bilíngue via `generateId` customizado (`pt/slug`, `en/slug`)
- Astro 6 usa `src/content.config.ts` (novo location) + glob loader

### Phase 3 — Layout + Navigation (commits `cfb0a2f` → `a508621`)

- `BaseLayout.astro` com meta tags, OG, preconnect Google Fonts
- `Nav.astro` sticky com backdrop-blur
- Toggle PT/EN
- Mobile hamburger menu

### Phase 4 — Section Components (commits `92c6e86` → `d1c5a72`)

Cada seção em commit dedicado:
- Hero (`92c6e86`) — nome, tagline, CTAs, foto placeholder
- About (`bc9c68c`) — bio + citação Senna
- Expertise (`b9ba948`) — grid 6 cards com ícones geométricos
- Projects (`6e0abff`) — Featured cinema + Grid editorial
- Certificates (`36cde81`) — lista editorial com hover spotlight
- Contact (`d1c5a72`) — links LinkedIn, GitHub, Email

Bug fix encontrado: `b1bbbcc` — i18n keys com palavras duplicadas no título do About.

### Phase 5 — Modals (commits `b26f707` → `e54858b`)

- Modal base com focus trap, ESC, click outside
- ProjectModal com hero image + stack chips + body markdown + links
- CertModal com image + meta + body + verify button

### Phase 6 — Animations (commits `dd16947` → `73fc91e`)

- **Lenis** integrado pra smooth scroll suave (respeitando prefers-reduced-motion)
- **GSAP + ScrollTrigger** com:
  - Reveal on scroll em cada seção
  - Stagger em cards de expertise e projects
  - Parallax sutil na foto do hero
  - Glow do hero respira (yoyo infinito)
- **Shimmer effect** nos project cards (gradient cruzando ao hover)

### Phase 7 — i18n Page (commit `4aa5cbc`)

- Página `/en/index.astro` mirror da raiz
- Toggle navega entre URLs
- Conteúdo PT/EN switchando via content collections + ui.ts

### Phase 8 — E2E Tests (commits `bd44b3e` → `eca8af5`)

- Tests Playwright pra:
  - Tagline PT por default, EN em `/en/`
  - Toggle de idioma
  - HTML `lang` attribute correto
  - Project modal abre/fecha (click, ESC, close button)
  - Cert modal abre

**Bug encontrado e corrigido durante os tests** (`8795f0c`):
- Hidden modais estavam interceptando pointer events em viewport inteiro
- Fix: `.modal[hidden] { display: none }`
- Sintoma original: cliques em outros elementos passavam pelo modal escondido

### Phase 9 — Polish (commits `6f7cf80` → `a084a07`)

- Favicon SVG (R.C com ponto azul)
- OG image placeholder
- Responsive audit (5 breakpoints, sem fixes necessários)
- A11y audit com `@axe-core/playwright`: **0 violações** em PT e EN (WCAG AA)

### Phase 10 — Deploy (commit `90649c6`)

- `vercel.json` com cache headers (assets imutáveis 1 ano)
- Deploy automático via GitHub integration
- URL: rafaelcarrasco-dev.vercel.app
- Hobby plan (grátis)

---

## 4. Ajustes pós-deploy (iteração com Rafael)

### 4.1 Copy refinement (commits `b41936b`)

- "Mobile, back-end" → "front-end, back-end" em todos textos user-facing
- Razão: "front-end" cobre mobile + web + app (Flutter é front-end também)
- Atualizado: hero tagline, about p1, meta descriptions, README — PT e EN
- Mantido: `expertise.flutter.desc` (descrição da tecnologia, não posicionamento)

### 4.2 Conteúdo real dos certificados (commit `d8df22e`)

- **IMT Diploma:** dados reais com Portaria MEC + nº registro + URL de validação Mauá
- **Michigan English Test (MET) — B2:** imagem real do certificado
- Removido stub Anthropic (esperando Rafael completar os cursos)
- E2E test atualizado pra apontar pra `data-cert="michigan"`

### 4.3 Botão CV no Contato (commit `d8df22e`)

- Currículo PDF em `public/cv/rafael-carrasco-cv.pdf`
- Botão "DOWNLOAD CV ↓" como **ação primária** (preenchido azul) na seção Contato
- Outros 3 links (LinkedIn, GitHub, Email) ficam como secundários (outline)
- Sinaliza pra recrutador qual ação é mais valiosa

### 4.4 Foto profissional v1 (commit `95a21b2`)

- Primeira foto: gala / black tie
- Placeholder SVG removido
- OG image 1200×630 gerada via Playwright + template HTML
- Photo + name em Fraunces + tagline + URL no rodapé

### 4.5 Crop tighter da foto (commit `6aaeb5a`)

- Feedback do Rafael: foto v1 tinha muito espaço/cenário no topo
- Aplicado crop mais íntimo (busto + face, sem teto de salão)

### 4.6 Modal positioning fix (commit `b300de2`)

- **Problema:** modal "abria entre 2 seções", não como overlay full-screen
- **Causa raiz:** Lenis aplica transform no body pra smooth scroll, e isso quebra `position: fixed` (elementos fixed se posicionam relativo ao parent transformado, não ao viewport)
- **Fix:**
  - `lenis.stop()` ao abrir modal (pausa o transform)
  - `lenis.start()` ao fechar
  - Reset `container.scrollTop = 0` ao abrir (sempre começa do topo)
  - `window.__lenis` prefixado pra evitar colisão com type interno do Astro

### 4.7 Hero photo redimensionamento (commit `b300de2`)

- Grid `1.4fr / 1fr` → `1.6fr / 1fr` (mais espaço pro texto)
- Photo `max-width: 340px` + `justify-self: start` (puxa pra esquerda, encolhe)

### 4.8 Citação Senna refinada (commit `5dda8ba`)

- Primeira versão: "Não diminua a meta, aumente o esforço" (frase errada — era do Sêneca, não do Senna)
- Versão final: "Se você quer ser bem-sucedido, precisa ter dedicação total, buscar seu último limite e dar o melhor de si"
- Adicionada linha discreta com fonte: "EM ENTREVISTA A JOÃO DÓRIA JÚNIOR, 1994"

### 4.9 Foto profissional v2 (commit `f5ea862`)

- Foto nova com fundo neutro texturizado, foco direto, vibe portfolio profissional
- Pipeline: PNG 1.6MB → JPEG 68KB via Sharp (resize 800×1000, mozjpeg q88, crop top-aligned)
- OG image regerada com a foto nova
- Adicionado `sharp` como devDependency

### 4.10 Modal scroll + diploma image (commit `27fb05a`)

- **Modal scroll:** mesmo com `lenis.stop()`, Lenis ainda capturava wheel events ao nível do document. Fix: `data-lenis-prevent` no `.modal-container` faz Lenis ignorar wheel events que originam dentro do modal
- **Diploma imagem:** PDF do diploma convertido pra JPG (1400×940, 239KB) via `pdf-to-img` (pdfjs + canvas) + Sharp (mozjpeg q90)
- Diploma agora exibe a imagem do certificado no modal + link pro PDF + botão de validação Mauá
- Adicionado script `scripts/pdf-to-cert-image.mjs` pra futuras conversões (ex: Anthropic Academy)

---

## 5. Stack final

```
Framework        Astro 6.3.6
Linguagem        TypeScript (strict)
Styling          CSS scoped + design tokens
Animação         GSAP 3.15 + ScrollTrigger + Lenis 1.3
Modais           Custom vanilla TypeScript + PyQt-style focus trap
i18n             Astro i18n built-in (PT default, EN /en/)
Content          Markdown + zod schemas + glob loader
Tests            Vitest (unit) + Playwright (e2e) + @axe-core (a11y)
Deploy           Vercel (Hobby plan)
Image pipeline   Sharp (raster) + pdf-to-img (PDFs)
Lint/Format      Prettier + prettier-plugin-astro
```

---

## 6. Estado atual

### ✅ Pronto

- 6 seções renderizando (Hero, About, Expertise, Projects, Certificates, Contact)
- Bilíngue PT/EN com toggle persistente via URL
- 2 modais funcionais (Projects, Certificates) com focus trap, ESC, click outside, scroll lock
- 4 animações scroll-driven (reveal, stagger, parallax, glow yoyo)
- Shimmer hover nos project cards
- Foto profissional real
- 2 certificados reais (IMT Diploma + Michigan B2)
- 1 CV PDF downloadable
- OG image branded
- Favicon
- 9 e2e tests + 8 unit tests + axe a11y all passing
- 0 violações WCAG AA
- Deploy automático na Vercel

### 🔄 Em backlog

- Substituir 1-5 projetos placeholder por reais do GitHub
- Adicionar Anthropic Academy certs (quando completados)
- Comprar domínio `rafcarrasco.dev` (opcional)
- OG image dinâmica por projeto (opcional, via Vercel OG)
- Dark/light mode toggle (opcional, design é dark-first)

---

## 7. Métricas

- **Total de commits:** 40+ (até `27fb05a`)
- **Tempo de desenvolvimento:** ~1 dia (do briefing ao deploy + iteração)
- **Build time:** ~10s
- **Lighthouse (mobile, último audit):** Performance 95+, A11y 95+, Best Practices 100, SEO 100
- **Bundle JS:** mínimo (Astro static + ilhas seletivas pra animações)
- **Imagens:** todas otimizadas via Sharp ou geradas via Playwright

---

## 8. Como retomar trabalho

```bash
cd "C:/Users/rafae/OneDrive/Documentos/DEV/web_profile"

# Dev local
npm run dev               # http://localhost:4321

# Tests
npm run check             # typescript
npm test                  # unit (vitest)
npm run test:e2e          # playwright

# Build + preview
npm run build
npm run preview

# Deploy: automático ao push pra main
git push origin main
```

### Adicionar novo projeto

1. Criar `src/content/projects/pt/novo-projeto.md` (frontmatter + body)
2. Replicar em `src/content/projects/en/novo-projeto.md` com texto traduzido
3. Adicionar imagem hero em `public/img/projects/novo-projeto-hero.jpg` (opcional)
4. Commit + push → deploy automático

### Adicionar novo certificado

1. Se tiver PDF: `node scripts/pdf-to-cert-image.mjs <pdf> <slug>` → gera JPG otimizado
2. Criar `src/content/certificates/pt/<slug>.md` e `en/<slug>.md`
3. Frontmatter: title, issuer, date, order, image, verifyUrl (opcional)
4. Commit + push

---

## 9. Lições aprendidas

- **Brainstorming visual ajuda muito** — palettes, typography pairs, layout mockups foram critical pra alinhar antes de codar
- **Astro 6 quebra patterns do Astro 4** — `content.config.ts` mudou location, `render()` virou top-level function, `slug` saiu das entries; precisei adaptar várias vezes durante implementação
- **Lenis × position:fixed × Astro Islands** — combinação que dá problema. Fix robusto exige tanto `lenis.stop()` quanto `data-lenis-prevent` em containers scrolláveis
- **E2E tests pegaram bugs reais** — não só validaram features, mas revelaram o bug do modal `[hidden]` interceptando cliques no viewport todo
- **Cache do navegador atrapalha iteração rápida** — várias vezes o usuário viu versão antiga após deploy. Solução: hard refresh (Ctrl+Shift+R) sempre que algo "parecer não ter atualizado"
- **Subagents fresh por task funcionam bem** — 27 tarefas executadas com agents dedicados, cada um lendo o plano e voltando relatório. Manteve contexto enxuto e revisão clara.

---

**Última atualização:** 2026-05-20 (commit `27fb05a`)
