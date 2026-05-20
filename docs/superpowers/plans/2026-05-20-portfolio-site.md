# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir o portfolio bilíngue (PT/EN) do Rafael Carrasco com Astro, animações GSAP/Lenis, modais customizados, deploy na Vercel.

**Architecture:** Site Astro estático com 3 camadas: (1) layout + componentes `.astro` por seção, (2) ilhas TypeScript para interatividade (modais, animações, toggle i18n), (3) content collections markdown para projetos/certificados com schemas zod. Estilo via CSS scoped + variáveis globais. Sem framework UI (React/Vue) — apenas Astro + JS vanilla nas ilhas.

**Tech Stack:** Astro 4+, TypeScript strict, GSAP + ScrollTrigger, Lenis, Playwright (testes), Vercel (deploy).

**Spec de referência:** [`docs/superpowers/specs/2026-05-20-portfolio-site-design.md`](../specs/2026-05-20-portfolio-site-design.md)

**Convenção de commits:** Conventional Commits (`feat:`, `chore:`, `fix:`, `test:`, `style:`, `refactor:`). **Sem co-author do Claude** — preferência do Rafael.

**Estratégia de testes:** TDD aplicado de forma pragmática:

- **Schemas e helpers TypeScript** → testes unitários (Vitest)
- **Comportamento interativo crítico** (modais, toggle i18n, navegação mobile) → testes Playwright e2e
- **Renderização visual** → `astro check` (typecheck) + smoke manual no dev server, comparando com mockup v3 em `.superpowers/brainstorm/`

---

## Mapa de arquivos

Estrutura final esperada (do spec, seção 8):

```
.
├── public/
│   ├── img/
│   │   ├── photo.jpg                            # placeholder até foto final
│   │   ├── projects/                            # heros dos projetos
│   │   └── certs/                               # imagens dos certificados
│   ├── favicon.svg
│   └── og-image.png
├── src/
│   ├── components/
│   │   ├── Nav.astro                            # nav sticky + toggle PT/EN
│   │   ├── Hero.astro                           # nome, tagline, foto, CTAs
│   │   ├── About.astro                          # sobre + citação Senna
│   │   ├── Expertise.astro                      # grid 6 cards
│   │   ├── Projects.astro                       # featured + grid
│   │   ├── FeaturedProject.astro
│   │   ├── ProjectCard.astro
│   │   ├── Certificates.astro
│   │   ├── CertRow.astro
│   │   ├── Contact.astro
│   │   ├── Modal.astro                          # base reutilizável
│   │   ├── ProjectModal.astro
│   │   └── CertModal.astro
│   ├── content/
│   │   ├── config.ts                            # schemas zod
│   │   ├── projects/{pt,en}/*.md
│   │   ├── certificates/{pt,en}/*.md
│   │   └── site/{pt,en}.json                    # UI strings
│   ├── i18n/
│   │   ├── ui.ts                                # tipos + tradução
│   │   └── utils.ts                             # getLangFromUrl, useTranslations
│   ├── layouts/
│   │   └── BaseLayout.astro                     # head, meta, OG, fontes
│   ├── pages/
│   │   ├── index.astro                          # PT (default)
│   │   └── en/index.astro                       # EN
│   ├── scripts/
│   │   ├── lenis.ts
│   │   ├── animations.ts
│   │   └── modal.ts
│   └── styles/
│       ├── tokens.css                           # variáveis CSS globais
│       ├── reset.css
│       └── fonts.css                            # imports Google Fonts
├── tests/
│   ├── unit/
│   │   └── i18n.test.ts                         # vitest
│   └── e2e/
│       ├── nav.spec.ts                          # playwright
│       ├── modal.spec.ts
│       └── i18n.spec.ts
├── astro.config.mjs
├── tsconfig.json
├── playwright.config.ts
├── vitest.config.ts
├── vercel.json
├── package.json
└── README.md
```

---

## Phase 1 — Foundation (Tarefas 1-4)

### Task 1: Inicializar projeto Astro com TypeScript

**Files:**

- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/env.d.ts`, `src/pages/index.astro` (gerado)

- [ ] **Step 1: Rodar o create-astro no diretório atual**

O diretório já contém `README.md`, `.gitignore` e `docs/`. Usar `--no-git` pra não recriar o repo e `.` pra instalar no diretório atual.

```bash
cd "C:/Users/rafae/OneDrive/Documentos/DEV/web_profile"
npm create astro@latest . -- --template minimal --typescript strict --install --no-git
```

Quando perguntar sobre arquivos existentes, **aceitar overwrite só do `README.md` se necessário** (depois restauramos). Astro vai criar `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/`, `public/`.

- [ ] **Step 2: Restaurar o README customizado se foi sobrescrito**

```bash
git checkout README.md
```

Se o `package.json` gerado não tem campo `"type": "module"`, adicionar manualmente.

- [ ] **Step 3: Validar que o dev server sobe**

```bash
npm run dev
```

Expected: servidor em `http://localhost:4321` com a página padrão do Astro.

Interromper com Ctrl+C.

- [ ] **Step 4: Validar typecheck**

```bash
npx astro check
```

Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: bootstrap astro project with typescript"
```

---

### Task 2: Adicionar dev tooling (Prettier, Vitest, Playwright)

**Files:**

- Create: `.prettierrc`, `.prettierignore`, `vitest.config.ts`, `playwright.config.ts`
- Modify: `package.json` (scripts + devDependencies)

- [ ] **Step 1: Instalar dependências de dev**

```bash
npm install -D prettier prettier-plugin-astro vitest @playwright/test
npx playwright install chromium
```

- [ ] **Step 2: Criar `.prettierrc`**

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-astro"],
  "overrides": [{ "files": "*.astro", "options": { "parser": "astro" } }]
}
```

- [ ] **Step 3: Criar `.prettierignore`**

```
node_modules
dist
.astro
.vercel
.superpowers
playwright-report
test-results
```

- [ ] **Step 4: Criar `vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
});
```

- [ ] **Step 5: Criar `playwright.config.ts`**

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
```

- [ ] **Step 6: Adicionar scripts ao `package.json`**

No bloco `"scripts"`, adicionar (preservando os existentes):

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "check": "astro check",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

- [ ] **Step 7: Verificar que tudo roda**

```bash
npm run check
npm run format:check
```

Expected: ambos passam (format pode reportar diffs nos arquivos gerados pelo Astro — rodar `npm run format` pra normalizar).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: add prettier, vitest, playwright tooling"
```

---

### Task 3: Configurar design tokens, reset e fontes

**Files:**

- Create: `src/styles/tokens.css`, `src/styles/reset.css`, `src/styles/fonts.css`

- [ ] **Step 1: Criar `src/styles/tokens.css`**

```css
:root {
  /* Paleta — Royal Blue dark theme */
  --bg-primary: #08080d;
  --bg-secondary: #0d0d14;
  --bg-tertiary: #14141c;
  --border: #1a1a22;
  --border-strong: #2a2a35;
  --accent: #1e40af;
  --accent-bright: #5582e8;
  --accent-glow: rgba(30, 64, 175, 0.2);
  --text-primary: #ffffff;
  --text-secondary: #bbbbbb;
  --text-muted: #888888;
  --text-dim: #555555;

  /* Tipografia */
  --font-serif: 'Fraunces', Georgia, serif;
  --font-sans: 'Inter Tight', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Espaçamentos */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-20: 80px;
  --space-24: 100px;

  /* Layout */
  --container-max: 1280px;
  --section-padding: var(--space-20) var(--space-12);

  /* Animação */
  --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
  --duration-fast: 200ms;
  --duration-base: 400ms;
  --duration-slow: 800ms;
}

@media (max-width: 1024px) {
  :root {
    --section-padding: var(--space-12) var(--space-8);
  }
}

@media (max-width: 768px) {
  :root {
    --section-padding: var(--space-12) var(--space-6);
  }
}
```

- [ ] **Step 2: Criar `src/styles/reset.css`**

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-sans);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

img,
picture,
video,
svg {
  display: block;
  max-width: 100%;
}

button {
  font: inherit;
  cursor: pointer;
  background: none;
  border: none;
  color: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

ul,
ol {
  list-style: none;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 3: Criar `src/styles/fonts.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,700&family=Inter+Tight:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(styles): add design tokens, reset, and font imports"
```

---

### Task 4: Configurar i18n no Astro

**Files:**

- Modify: `astro.config.mjs`
- Create: `src/i18n/ui.ts`, `src/i18n/utils.ts`
- Create: `tests/unit/i18n.test.ts`

- [ ] **Step 1: Atualizar `astro.config.mjs`**

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://rafcarrasco.dev',
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
```

- [ ] **Step 2: Criar `src/i18n/ui.ts` com tipos e traduções de UI**

```typescript
export const languages = {
  pt: 'Português',
  en: 'English',
} as const;

export const defaultLang = 'pt';

export type Lang = keyof typeof languages;

export const ui = {
  pt: {
    'nav.about': 'SOBRE',
    'nav.expertise': 'EXPERTISE',
    'nav.projects': 'PROJETOS',
    'nav.certificates': 'CERTIFICADOS',
    'nav.contact': 'CONTATO',
    'hero.eyebrow': 'TECHNICAL ARCHITECT — AI INNOVATION',
    'hero.tagline':
      'Engenheiro de software com olhar de arquiteto — entre mobile, back-end e a nova fronteira da inteligência artificial.',
    'hero.cta.projects': 'VER PROJETOS →',
    'hero.cta.contact': 'FALAR COMIGO',
    'sec.01': '01 — SOBRE',
    'sec.02': '02 — EXPERTISE',
    'sec.03': '03 — PROJETOS',
    'sec.04': '04 — CERTIFICADOS',
    'sec.05': '05 — CONTATO',
    'about.title.line1': 'Engenharia de software',
    'about.title.line2': 'com olhar de arquiteto.',
    'about.p1':
      'Engenheiro de software formado em Ciência da Computação pelo Instituto Mauá de Tecnologia. Trabalho na interseção entre mobile, web, app, back-end e inteligência artificial — do código que escala às decisões de arquitetura que orientam o produto.',
    'about.p2':
      'Meu dia a dia mistura fullstack, com grande maioria em Flutter, Node.js, Firebase, REST APIs e o desenho de sistemas baseados em LLMs, MCP Servers e Agents, sempre buscando equilíbrio entre engenharia sólida e impacto real.',
    'about.quote': 'Não diminua a meta, aumente o esforço.',
    'about.quote.author': '— AYRTON SENNA',
    'expertise.title': 'Stack técnico.',
    'projects.title': 'Trabalho em destaque.',
    'projects.hint': '// CLIQUE EM QUALQUER PROJETO PARA ABRIR DETALHES',
    'projects.featured': 'FEATURED PROJECT',
    'certs.title': 'Formação contínua.',
    'certs.hint': '// CLIQUE PARA VER CERTIFICADO COMPLETO',
    'contact.title': 'Vamos conversar.',
    'contact.subtitle':
      'Aberto a oportunidades em AI Innovation, consultorias técnicas e projetos com agents/LLMs.',
    'modal.close': 'Fechar',
    'modal.github': '→ GITHUB REPO',
    'modal.demo': '→ LIVE DEMO',
    'modal.article': '→ ARTIGO',
    'modal.verify': '→ VERIFICAR AUTENTICIDADE',
  },
  en: {
    'nav.about': 'ABOUT',
    'nav.expertise': 'EXPERTISE',
    'nav.projects': 'PROJECTS',
    'nav.certificates': 'CERTIFICATES',
    'nav.contact': 'CONTACT',
    'hero.eyebrow': 'TECHNICAL ARCHITECT — AI INNOVATION',
    'hero.tagline':
      'Software engineer with an architect mindset — across mobile, back-end and the new frontier of artificial intelligence.',
    'hero.cta.projects': 'SEE PROJECTS →',
    'hero.cta.contact': 'GET IN TOUCH',
    'sec.01': '01 — ABOUT',
    'sec.02': '02 — EXPERTISE',
    'sec.03': '03 — PROJECTS',
    'sec.04': '04 — CERTIFICATES',
    'sec.05': '05 — CONTACT',
    'about.title.line1': 'Software engineering',
    'about.title.line2': 'with an architect mindset.',
    'about.p1':
      'Software engineer with a Computer Science degree from Instituto Mauá de Tecnologia. I work at the intersection of mobile, web, app, back-end and artificial intelligence — from code that scales to the architecture decisions that shape the product.',
    'about.p2':
      'My day-to-day blends fullstack work — mostly Flutter, Node.js, Firebase, REST APIs — with designing systems built on LLMs, MCP Servers and Agents, always seeking the balance between solid engineering and real impact.',
    'about.quote': "Don't lower the goal, raise the effort.",
    'about.quote.author': '— AYRTON SENNA',
    'expertise.title': 'Technical stack.',
    'projects.title': 'Featured work.',
    'projects.hint': '// CLICK ANY PROJECT TO OPEN DETAILS',
    'projects.featured': 'FEATURED PROJECT',
    'certs.title': 'Continuous learning.',
    'certs.hint': '// CLICK TO SEE FULL CERTIFICATE',
    'contact.title': "Let's talk.",
    'contact.subtitle':
      'Open to AI Innovation roles, technical consulting and freelance projects involving agents/LLMs.',
    'modal.close': 'Close',
    'modal.github': '→ GITHUB REPO',
    'modal.demo': '→ LIVE DEMO',
    'modal.article': '→ ARTICLE',
    'modal.verify': '→ VERIFY AUTHENTICITY',
  },
} as const;

export type UIKey = keyof (typeof ui)['pt'];
```

- [ ] **Step 3: Criar `src/i18n/utils.ts`**

```typescript
import { ui, defaultLang, type Lang, type UIKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function pathForLang(lang: Lang, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  if (lang === defaultLang) return `/${clean}`;
  return `/${lang}/${clean}`;
}
```

- [ ] **Step 4: Criar `tests/unit/i18n.test.ts` (failing test)**

```typescript
import { describe, it, expect } from 'vitest';
import { getLangFromUrl, useTranslations, pathForLang } from '../../src/i18n/utils';

describe('getLangFromUrl', () => {
  it('returns "pt" for /', () => {
    expect(getLangFromUrl(new URL('http://localhost/'))).toBe('pt');
  });

  it('returns "pt" for /about (default locale, no prefix)', () => {
    expect(getLangFromUrl(new URL('http://localhost/about'))).toBe('pt');
  });

  it('returns "en" for /en', () => {
    expect(getLangFromUrl(new URL('http://localhost/en'))).toBe('en');
  });

  it('returns "en" for /en/projects', () => {
    expect(getLangFromUrl(new URL('http://localhost/en/projects'))).toBe('en');
  });
});

describe('useTranslations', () => {
  it('returns Portuguese strings for "pt"', () => {
    const t = useTranslations('pt');
    expect(t('nav.about')).toBe('SOBRE');
  });

  it('returns English strings for "en"', () => {
    const t = useTranslations('en');
    expect(t('nav.about')).toBe('ABOUT');
  });
});

describe('pathForLang', () => {
  it('returns root path for default lang', () => {
    expect(pathForLang('pt', '')).toBe('/');
    expect(pathForLang('pt', 'projects')).toBe('/projects');
  });

  it('prefixes /en/ for English', () => {
    expect(pathForLang('en', '')).toBe('/en/');
    expect(pathForLang('en', 'projects')).toBe('/en/projects');
  });
});
```

- [ ] **Step 5: Rodar testes — devem passar**

```bash
npm test
```

Expected: 9 testes passando.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(i18n): configure pt/en routing with utils and unit tests"
```

---

## Phase 2 — Content Collections (Tarefa 5)

### Task 5: Definir schemas de content collections

**Files:**

- Create: `src/content/config.ts`
- Create: `src/content/projects/pt/.gitkeep`, `src/content/projects/en/.gitkeep`
- Create: `src/content/certificates/pt/.gitkeep`, `src/content/certificates/en/.gitkeep`

- [ ] **Step 1: Criar `src/content/config.ts`**

```typescript
import { defineCollection, z } from 'astro:content';

const projectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  featured: z.boolean().default(false),
  order: z.number(),
  year: z.number(),
  stack: z.array(z.string()),
  description: z.string(),
  heroImage: z.string().optional(),
  links: z
    .object({
      github: z.string().url().optional(),
      demo: z.string().url().optional(),
      article: z.string().url().optional(),
    })
    .default({}),
});

const certificateSchema = z.object({
  title: z.string(),
  issuer: z.string(),
  date: z.string(), // YYYY-MM ou '—'
  order: z.number(),
  image: z.string().optional(),
  verifyUrl: z.string().url().optional(),
});

const projects = defineCollection({
  type: 'content',
  schema: projectSchema,
});

const certificates = defineCollection({
  type: 'content',
  schema: certificateSchema,
});

export const collections = { projects, certificates };
export type Project = z.infer<typeof projectSchema>;
export type Certificate = z.infer<typeof certificateSchema>;
```

- [ ] **Step 2: Criar diretórios vazios para conteúdo**

```bash
mkdir -p src/content/projects/pt src/content/projects/en
mkdir -p src/content/certificates/pt src/content/certificates/en
touch src/content/projects/pt/.gitkeep src/content/projects/en/.gitkeep
touch src/content/certificates/pt/.gitkeep src/content/certificates/en/.gitkeep
```

- [ ] **Step 3: Validar schemas com astro check**

```bash
npm run check
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(content): define project and certificate collection schemas"
```

---

## Phase 3 — Layout + Navigation (Tarefas 6-7)

### Task 6: BaseLayout com head, meta, OG, fontes

**Files:**

- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Criar `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/fonts.css';
import '../styles/tokens.css';
import '../styles/reset.css';
import { getLangFromUrl, useTranslations } from '../i18n/utils';

export interface Props {
  title: string;
  description: string;
  image?: string;
}

const { title, description, image = '/og-image.png' } = Astro.props;
const lang = getLangFromUrl(Astro.url);
const canonicalURL = new URL(Astro.url.pathname, Astro.site).toString();
---

<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="generator" content={Astro.generator} />

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="canonical" href={canonicalURL} />

    <title>{title}</title>
    <meta name="description" content={description} />

    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL(image, Astro.site).toString()} />
    <meta property="og:url" content={canonicalURL} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  </head>
  <body>
    <slot />
  </body>
</html>

<style is:global>
  /* Tipografia base */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-serif);
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.5px;
  }

  ::selection {
    background: var(--accent);
    color: var(--text-primary);
  }

  /* Foco visível para acessibilidade */
  :focus-visible {
    outline: 2px solid var(--accent-bright);
    outline-offset: 2px;
  }
</style>
```

- [ ] **Step 2: Atualizar `src/pages/index.astro` com smoke teste do BaseLayout**

Substituir conteúdo por:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Rafael Carrasco · Technical Architect"
  description="Engenheiro de software entre mobile, back-end e IA aplicada."
>
  <main style="padding: 80px; font-family: var(--font-serif); font-size: 48px;">
    Hello — BaseLayout funciona.
  </main>
</BaseLayout>
```

- [ ] **Step 3: Subir dev server e validar visualmente**

```bash
npm run dev
```

Abrir `http://localhost:4321`. Validar:

- Background é dark (`#08080d`)
- Texto branco em Fraunces
- Title aparece na aba do navegador
- Lang attribute do `<html>` é `pt`

Interromper com Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(layout): add BaseLayout with meta, OG, fonts and design tokens"
```

---

### Task 7: Componente Nav com sticky, links e toggle PT/EN

**Files:**

- Create: `src/components/Nav.astro`
- Modify: `src/pages/index.astro` (incluir Nav para validar)

- [ ] **Step 1: Criar `src/components/Nav.astro`**

```astro
---
import { getLangFromUrl, useTranslations, pathForLang } from '../i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
const otherLang = lang === 'pt' ? 'en' : 'pt';
const otherLangPath = pathForLang(otherLang);
---

<nav class="nav" aria-label="Primary">
  <a href={pathForLang(lang)} class="logo" aria-label="Home">R<em>.</em>C</a>

  <ul class="nav-links">
    <li><a href="#about">{t('nav.about')}</a></li>
    <li><a href="#expertise">{t('nav.expertise')}</a></li>
    <li><a href="#projects">{t('nav.projects')}</a></li>
    <li><a href="#certificates">{t('nav.certificates')}</a></li>
    <li><a href="#contact">{t('nav.contact')}</a></li>
  </ul>

  <a href={otherLangPath} class="lang-toggle" aria-label={`Switch language to ${otherLang}`}>
    PT / EN
  </a>

  <button
    class="nav-burger"
    aria-label="Open menu"
    aria-expanded="false"
    aria-controls="mobile-menu"
  >
    <span></span><span></span><span></span>
  </button>
</nav>

<div id="mobile-menu" class="mobile-menu" hidden>
  <ul>
    <li><a href="#about">{t('nav.about')}</a></li>
    <li><a href="#expertise">{t('nav.expertise')}</a></li>
    <li><a href="#projects">{t('nav.projects')}</a></li>
    <li><a href="#certificates">{t('nav.certificates')}</a></li>
    <li><a href="#contact">{t('nav.contact')}</a></li>
    <li><a href={otherLangPath}>PT / EN</a></li>
  </ul>
</div>

<style>
  .nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(8, 8, 13, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding: var(--space-4) var(--space-8);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border);
  }

  .logo {
    font-family: var(--font-serif);
    font-size: 18px;
    letter-spacing: -0.5px;
  }
  .logo em {
    color: var(--accent-bright);
    font-style: normal;
  }

  .nav-links {
    display: flex;
    gap: var(--space-6);
  }
  .nav-links a {
    color: var(--text-secondary);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 1.5px;
    transition: color var(--duration-fast);
  }
  .nav-links a:hover {
    color: var(--accent-bright);
  }

  .lang-toggle {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 1.5px;
    color: var(--accent-bright);
    border: 1px solid var(--accent);
    padding: var(--space-1) var(--space-3);
    border-radius: 2px;
    transition:
      background var(--duration-fast),
      color var(--duration-fast);
  }
  .lang-toggle:hover {
    background: var(--accent);
    color: var(--text-primary);
  }

  .nav-burger {
    display: none;
    flex-direction: column;
    gap: 4px;
    padding: 8px;
  }
  .nav-burger span {
    width: 24px;
    height: 2px;
    background: var(--text-primary);
    transition: transform var(--duration-base);
  }

  .mobile-menu {
    position: fixed;
    inset: 0;
    background: var(--bg-primary);
    z-index: 99;
    padding: 80px var(--space-8) var(--space-8);
  }
  .mobile-menu ul {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }
  .mobile-menu a {
    font-family: var(--font-mono);
    font-size: 14px;
    letter-spacing: 2px;
    color: var(--text-primary);
  }

  @media (max-width: 768px) {
    .nav-links,
    .lang-toggle {
      display: none;
    }
    .nav-burger {
      display: flex;
    }
  }
</style>

<script>
  const burger = document.querySelector('.nav-burger') as HTMLButtonElement | null;
  const menu = document.getElementById('mobile-menu');

  if (burger && menu) {
    burger.addEventListener('click', () => {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
      menu.hidden = expanded;
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        burger.setAttribute('aria-expanded', 'false');
        menu.hidden = true;
      });
    });
  }
</script>
```

- [ ] **Step 2: Adicionar Nav ao index temporariamente**

Modificar `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
---

<BaseLayout
  title="Rafael Carrasco · Technical Architect"
  description="Engenheiro de software entre mobile, back-end e IA aplicada."
>
  <Nav />
  <main style="padding: 80px; min-height: 200vh;">
    <h1 style="font-family: var(--font-serif); font-size: 64px;">Sticky nav teste</h1>
    <p style="color: var(--text-secondary); margin-top: 24px;">
      Faça scroll para validar que o nav fica fixo no topo com blur.
    </p>
  </main>
</BaseLayout>
```

- [ ] **Step 3: Validar visualmente**

```bash
npm run dev
```

Em `http://localhost:4321`:

- Nav aparece no topo com blur ao fazer scroll
- Logo `R.C` com ponto azul à esquerda
- Links em mono no centro
- Toggle `PT / EN` à direita
- Click no toggle leva para `/en/` (vai dar 404 — esperado, criamos a página EN depois)
- Reduzir janela para <768px: links e toggle desaparecem, burger aparece, clique abre overlay full-screen

Interromper.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(nav): add sticky navigation with language toggle and mobile menu"
```

---

## Phase 4 — Section Components (Tarefas 8-13)

### Task 8: Componente Hero

**Files:**

- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro` (usar Hero)
- Create: `public/img/photo-placeholder.svg`

- [ ] **Step 1: Criar `public/img/photo-placeholder.svg`**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#14141c"/>
      <stop offset="100%" stop-color="#1e40af"/>
    </linearGradient>
  </defs>
  <rect width="400" height="500" fill="url(#g)"/>
  <text x="200" y="260" font-family="monospace" font-size="14" fill="#5582e8" text-anchor="middle" letter-spacing="2">[ PHOTO PLACEHOLDER ]</text>
</svg>
```

- [ ] **Step 2: Criar `src/components/Hero.astro`**

```astro
---
import { getLangFromUrl, useTranslations } from '../i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<section class="hero" id="hero">
  <div class="glow"></div>

  <div class="hero-content">
    <div class="eyebrow">{t('hero.eyebrow')}</div>
    <h1>
      Rafael<br />Carrasco<em>.</em>
    </h1>
    <p
      class="tagline"
      set:html={t('hero.tagline').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}
    />
    <div class="ctas">
      <a href="#projects" class="cta primary">{t('hero.cta.projects')}</a>
      <a href="#contact" class="cta secondary">{t('hero.cta.contact')}</a>
    </div>
  </div>

  <div class="hero-photo">
    <img src="/img/photo-placeholder.svg" alt="Rafael Carrasco" width="400" height="500" />
    <span class="photo-label">RAFAEL CARRASCO</span>
  </div>
</section>

<style>
  .hero {
    padding: var(--space-20) var(--space-12);
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: var(--space-12);
    align-items: center;
    min-height: 600px;
    position: relative;
  }

  .glow {
    position: absolute;
    top: 20%;
    right: 30%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
    filter: blur(60px);
    pointer-events: none;
    z-index: 0;
  }

  .hero-content {
    position: relative;
    z-index: 1;
  }

  .eyebrow {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent-bright);
    letter-spacing: 3px;
    margin-bottom: var(--space-6);
  }

  h1 {
    font-family: var(--font-serif);
    font-weight: 500;
    font-size: 72px;
    line-height: 0.95;
    letter-spacing: -2px;
    margin-bottom: var(--space-6);
  }
  h1 em {
    color: var(--accent-bright);
    font-style: normal;
    font-weight: 700;
  }

  .tagline {
    font-size: 18px;
    color: var(--text-secondary);
    line-height: 1.5;
    margin-bottom: var(--space-8);
    max-width: 480px;
  }
  .tagline :global(strong) {
    color: var(--text-primary);
  }

  .ctas {
    display: flex;
    gap: var(--space-3);
  }

  .cta {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 2px;
    padding: 14px 24px;
    text-transform: uppercase;
    transition:
      background var(--duration-fast),
      border-color var(--duration-fast),
      color var(--duration-fast);
  }
  .cta.primary {
    background: var(--accent);
    color: var(--text-primary);
    border: 1px solid var(--accent);
  }
  .cta.primary:hover {
    background: #2e5cff;
  }
  .cta.secondary {
    background: transparent;
    color: var(--text-secondary);
    border: 1px solid var(--border-strong);
  }
  .cta.secondary:hover {
    border-color: var(--accent-bright);
    color: var(--accent-bright);
  }

  .hero-photo {
    aspect-ratio: 4/5;
    background: linear-gradient(135deg, var(--bg-tertiary), var(--accent));
    border: 1px solid var(--accent);
    position: relative;
    overflow: hidden;
  }
  .hero-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .hero-photo::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 60%, rgba(30, 64, 175, 0.3));
    pointer-events: none;
  }
  .photo-label {
    position: absolute;
    bottom: var(--space-4);
    left: var(--space-4);
    z-index: 1;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent-bright);
    letter-spacing: 2px;
  }

  @media (max-width: 768px) {
    .hero {
      grid-template-columns: 1fr;
      gap: var(--space-8);
      padding: var(--space-12) var(--space-6);
    }
    h1 {
      font-size: 44px;
    }
    .hero-photo {
      order: -1;
      max-width: 280px;
    }
  }
</style>
```

- [ ] **Step 3: Atualizar `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
---

<BaseLayout
  title="Rafael Carrasco · Technical Architect"
  description="Engenheiro de software entre mobile, back-end e IA aplicada."
>
  <Nav />
  <Hero />
</BaseLayout>
```

- [ ] **Step 4: Validar visualmente**

```bash
npm run dev
```

Comparar com o mockup v3 em `.superpowers/brainstorm/690-*/content/full-mockup-v2.html` (apesar do nome v2, contém a v3). Validar:

- Nome em Fraunces grande à esquerda, ponto azul
- Tagline com palavras destacadas
- Botões funcionando (primário azul, secundário outline)
- Foto placeholder à direita com label
- Glow azul difuso atrás
- Mobile: empilhado, foto em cima reduzida

Interromper.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(hero): add hero section with name, tagline, ctas and photo placeholder"
```

---

### Task 9: Componente About com citação Senna

**Files:**

- Create: `src/components/About.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Criar `src/components/About.astro`**

```astro
---
import { getLangFromUrl, useTranslations } from '../i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<section class="about" id="about">
  <div class="sec-num">{t('sec.01')}</div>
  <h2 class="sec-title">
    {t('about.title.line1')}
    <em>{lang === 'pt' ? 'software' : 'engineering'}</em>
    <br />
    {lang === 'pt' ? 'com olhar de' : 'with an'}
    <em>{lang === 'pt' ? 'arquiteto' : 'architect'}</em>{lang === 'en' ? ' mindset' : ''}.
  </h2>

  <div class="about-grid">
    <div class="about-text">
      <p>{t('about.p1')}</p>
      <p>{t('about.p2')}</p>
    </div>
    <div class="quote-block">
      <p class="quote">&ldquo;{t('about.quote')}&rdquo;</p>
      <div class="quote-author">{t('about.quote.author')}</div>
    </div>
  </div>
</section>

<style>
  .about {
    padding: var(--section-padding);
    border-top: 1px solid var(--border);
  }

  .sec-num {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent-bright);
    letter-spacing: 2px;
    margin-bottom: var(--space-4);
  }

  .sec-title {
    font-family: var(--font-serif);
    font-size: 40px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: -1px;
    margin-bottom: var(--space-12);
  }
  .sec-title em {
    color: var(--accent-bright);
    font-style: normal;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: var(--space-12);
  }

  .about-text p {
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: var(--space-4);
  }

  .quote-block {
    border-left: 2px solid var(--accent);
    padding-left: var(--space-6);
  }
  .quote {
    font-family: var(--font-serif);
    font-size: 26px;
    color: var(--text-primary);
    line-height: 1.4;
    font-weight: 300;
    letter-spacing: -0.5px;
    font-style: italic;
    margin-bottom: var(--space-3);
  }
  .quote-author {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--accent-bright);
    letter-spacing: 2px;
  }

  @media (max-width: 1024px) {
    .about-grid {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }
    .sec-title {
      font-size: 32px;
    }
  }
  @media (max-width: 768px) {
    .sec-title {
      font-size: 28px;
    }
    .quote {
      font-size: 22px;
    }
  }
</style>
```

- [ ] **Step 2: Adicionar About no index**

Em `src/pages/index.astro`, importar e renderizar após `<Hero />`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
---

<BaseLayout
  title="Rafael Carrasco · Technical Architect"
  description="Engenheiro de software entre mobile, back-end e IA aplicada."
>
  <Nav />
  <Hero />
  <About />
</BaseLayout>
```

- [ ] **Step 3: Validar visualmente (`npm run dev`)**

Conferir contra mockup v3 — textos exatos do usuário, citação Senna com barra azul à direita.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(about): add about section with bio and ayrton senna quote"
```

---

### Task 10: Componente Expertise (grid 6 cards)

**Files:**

- Create: `src/components/Expertise.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/i18n/ui.ts` (adicionar chaves para os cards)

- [ ] **Step 1: Adicionar chaves de tradução em `src/i18n/ui.ts`**

Dentro do objeto `pt`, adicionar:

```typescript
'expertise.ai.title': 'AI Agents',
'expertise.ai.desc': 'Sistemas autônomos com tool-use, planning e long-running tasks',
'expertise.mcp.title': 'MCP Servers',
'expertise.mcp.desc': 'Model Context Protocol — integrações ricas para LLMs',
'expertise.llm.title': 'LLMs aplicados',
'expertise.llm.desc': 'RAG, fine-tuning, evals — IA que vai pra produção',
'expertise.flutter.title': 'Flutter',
'expertise.flutter.desc': 'Mobile cross-platform com performance nativa',
'expertise.node.title': 'Node.js',
'expertise.node.desc': 'APIs escaláveis, serviços backend, integrações',
'expertise.firebase.title': 'Firebase',
'expertise.firebase.desc': 'Realtime, auth, functions — infra serverless',
```

Dentro do objeto `en`, adicionar equivalente:

```typescript
'expertise.ai.title': 'AI Agents',
'expertise.ai.desc': 'Autonomous systems with tool-use, planning and long-running tasks',
'expertise.mcp.title': 'MCP Servers',
'expertise.mcp.desc': 'Model Context Protocol — rich integrations for LLMs',
'expertise.llm.title': 'Applied LLMs',
'expertise.llm.desc': 'RAG, fine-tuning, evals — AI ready for production',
'expertise.flutter.title': 'Flutter',
'expertise.flutter.desc': 'Cross-platform mobile with native performance',
'expertise.node.title': 'Node.js',
'expertise.node.desc': 'Scalable APIs, backend services, integrations',
'expertise.firebase.title': 'Firebase',
'expertise.firebase.desc': 'Realtime, auth, functions — serverless infrastructure',
```

- [ ] **Step 2: Criar `src/components/Expertise.astro`**

```astro
---
import { getLangFromUrl, useTranslations } from '../i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);

const items = [
  { icon: '⊕', key: 'ai' },
  { icon: '▣', key: 'mcp' },
  { icon: '◐', key: 'llm' },
  { icon: '◇', key: 'flutter' },
  { icon: '◈', key: 'node' },
  { icon: '▲', key: 'firebase' },
] as const;
---

<section class="expertise" id="expertise">
  <div class="sec-num">{t('sec.02')}</div>
  <h2 class="sec-title">{t('expertise.title')}</h2>

  <div class="grid">
    {
      items.map((item) => (
        <article class="card">
          <div class="icon" aria-hidden="true">
            {item.icon}
          </div>
          <h3>{t(`expertise.${item.key}.title` as any)}</h3>
          <p>{t(`expertise.${item.key}.desc` as any)}</p>
        </article>
      ))
    }
  </div>
</section>

<style>
  .expertise {
    padding: var(--section-padding);
    border-top: 1px solid var(--border);
  }
  .sec-num {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent-bright);
    letter-spacing: 2px;
    margin-bottom: var(--space-4);
  }
  .sec-title {
    font-family: var(--font-serif);
    font-size: 40px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: -1px;
    margin-bottom: var(--space-12);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
  }

  .card {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    padding: var(--space-8);
    transition:
      border-color var(--duration-base),
      transform var(--duration-base);
  }
  .card:hover {
    border-color: var(--accent);
    transform: translateY(-4px);
  }

  .icon {
    width: 32px;
    height: 32px;
    border: 1px solid var(--accent);
    color: var(--accent-bright);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-mono);
    font-size: 14px;
    margin-bottom: var(--space-4);
  }

  h3 {
    font-family: var(--font-serif);
    font-size: 20px;
    font-weight: 500;
    margin-bottom: var(--space-2);
  }

  p {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.5;
  }

  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
    .sec-title {
      font-size: 28px;
    }
  }
</style>
```

- [ ] **Step 3: Adicionar no index e validar (`npm run dev`)**

```astro
import Expertise from '../components/Expertise.astro'; ...
<Expertise />
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(expertise): add expertise grid with 6 cards and i18n keys"
```

---

### Task 11: Componente Projects (Featured + Grid)

**Files:**

- Create: `src/components/FeaturedProject.astro`
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/Projects.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Criar `src/components/FeaturedProject.astro`**

```astro
---
import type { CollectionEntry } from 'astro:content';
import { getLangFromUrl, useTranslations } from '../i18n/utils';

interface Props {
  project: CollectionEntry<'projects'>;
}

const { project } = Astro.props;
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
const { title, year, stack } = project.data;
---

<button class="featured" data-project={project.slug}>
  <span class="pulse" aria-hidden="true"></span>
  <div class="overlay">
    <div class="tag">{t('projects.featured')} · {year}</div>
    <div class="info">
      <div class="name">{title}<em>.</em></div>
      <div class="meta">{stack.join(' · ')}</div>
    </div>
  </div>
</button>

<style>
  .featured {
    width: 100%;
    height: 360px;
    background: linear-gradient(135deg, var(--accent) 0%, var(--bg-secondary) 70%);
    position: relative;
    overflow: hidden;
    margin-bottom: var(--space-6);
    cursor: pointer;
    transition: transform var(--duration-slow);
    text-align: left;
  }
  .featured:hover {
    transform: scale(1.01);
  }

  .pulse {
    position: absolute;
    top: var(--space-6);
    right: var(--space-6);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--accent-bright);
    animation: pulse 2s infinite;
    z-index: 1;
  }
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(85, 130, 232, 0.7);
    }
    70% {
      box-shadow: 0 0 0 8px rgba(85, 130, 232, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(85, 130, 232, 0);
    }
  }

  .overlay {
    position: absolute;
    inset: 0;
    padding: var(--space-12);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .tag {
    font-family: var(--font-mono);
    font-size: 10px;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 2px;
  }
  .name {
    font-family: var(--font-serif);
    font-size: 56px;
    line-height: 0.95;
    font-weight: 500;
    letter-spacing: -1px;
    max-width: 600px;
  }
  .name em {
    color: var(--accent-bright);
    font-style: normal;
  }
  .meta {
    font-family: var(--font-mono);
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 1.5px;
    margin-top: var(--space-3);
  }

  @media (max-width: 768px) {
    .featured {
      height: 240px;
    }
    .overlay {
      padding: var(--space-6);
    }
    .name {
      font-size: 32px;
    }
  }
</style>
```

- [ ] **Step 2: Criar `src/components/ProjectCard.astro`**

```astro
---
import type { CollectionEntry } from 'astro:content';

interface Props {
  project: CollectionEntry<'projects'>;
  index: number;
}

const { project, index } = Astro.props;
const { title, description, stack } = project.data;
const num = String(index).padStart(2, '0');
---

<button class="card" data-project={project.slug}>
  <span class="pulse" aria-hidden="true"></span>
  <div>
    <div class="num">// {num}</div>
    <div class="name">{title}</div>
    <p class="desc">{description}</p>
  </div>
  <div class="stack">
    {stack.map((chip) => <span class="chip">{chip}</span>)}
  </div>
</button>

<style>
  .card {
    background: linear-gradient(180deg, var(--bg-tertiary), var(--bg-secondary));
    border: 1px solid var(--border);
    padding: var(--space-6);
    cursor: pointer;
    transition:
      transform var(--duration-base) var(--ease-out),
      border-color var(--duration-base),
      box-shadow var(--duration-base);
    min-height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    text-align: left;
    width: 100%;
  }
  .card:hover {
    transform: translateY(-6px);
    border-color: var(--accent);
    box-shadow: 0 20px 40px rgba(30, 64, 175, 0.2);
  }

  .pulse {
    position: absolute;
    top: var(--space-3);
    right: var(--space-3);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--accent-bright);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(85, 130, 232, 0.7);
    }
    70% {
      box-shadow: 0 0 0 8px rgba(85, 130, 232, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(85, 130, 232, 0);
    }
  }

  .num {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--accent-bright);
    letter-spacing: 1.5px;
  }
  .name {
    font-family: var(--font-serif);
    font-size: 22px;
    font-weight: 500;
    margin: var(--space-3) 0 var(--space-2);
    line-height: 1.1;
  }
  .desc {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.5;
  }
  .stack {
    display: flex;
    gap: 6px;
    margin-top: var(--space-3);
    flex-wrap: wrap;
  }
  .chip {
    font-family: var(--font-mono);
    font-size: 9px;
    color: var(--text-muted);
    border: 1px solid var(--border-strong);
    padding: 3px 8px;
    border-radius: 2px;
    letter-spacing: 1px;
  }
</style>
```

- [ ] **Step 3: Criar `src/components/Projects.astro`**

```astro
---
import { getCollection } from 'astro:content';
import { getLangFromUrl, useTranslations } from '../i18n/utils';
import FeaturedProject from './FeaturedProject.astro';
import ProjectCard from './ProjectCard.astro';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);

const all = await getCollection('projects', ({ id }) => id.startsWith(`${lang}/`));
const sorted = all.sort((a, b) => a.data.order - b.data.order);
const featured = sorted.find((p) => p.data.featured);
const others = sorted.filter((p) => !p.data.featured);
---

<section class="projects" id="projects">
  <div class="sec-num">{t('sec.03')}</div>
  <h2 class="sec-title">{t('projects.title')}</h2>
  <p class="hint">{t('projects.hint')}</p>

  {featured && <FeaturedProject project={featured} />}

  {
    others.length > 0 && (
      <div class="grid">
        {others.map((project, i) => (
          <ProjectCard project={project} index={i + 2} />
        ))}
      </div>
    )
  }
</section>

<style>
  .projects {
    padding: var(--section-padding);
    border-top: 1px solid var(--border);
  }
  .sec-num {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent-bright);
    letter-spacing: 2px;
    margin-bottom: var(--space-4);
  }
  .sec-title {
    font-family: var(--font-serif);
    font-size: 40px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: -1px;
    margin-bottom: var(--space-4);
  }
  .hint {
    color: var(--text-dim);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 1.5px;
    margin-bottom: var(--space-8);
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
  }
  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
    .sec-title {
      font-size: 28px;
    }
  }
</style>
```

- [ ] **Step 4: Adicionar 1 projeto stub PT e EN para validar**

Criar `src/content/projects/pt/exemplo-featured.md`:

```markdown
---
title: 'Exemplo Featured'
slug: 'exemplo-featured'
featured: true
order: 1
year: 2025
stack: ['MCP', 'Node.js', 'TypeScript']
description: 'Descrição editorial curta do projeto featured.'
---

Conteúdo do modal vai aqui — esse markdown é renderizado no popup quando o usuário clica.
```

Criar `src/content/projects/pt/exemplo-grid.md`:

```markdown
---
title: 'Exemplo Grid'
slug: 'exemplo-grid'
order: 2
year: 2024
stack: ['FLUTTER', 'FIREBASE']
description: 'Descrição editorial curta do projeto do grid.'
---

Conteúdo do modal.
```

Replicar em EN (`src/content/projects/en/exemplo-featured.md` e `exemplo-grid.md`) com textos traduzidos.

- [ ] **Step 5: Adicionar `<Projects />` no index e validar**

```astro
import Projects from '../components/Projects.astro'; ...
<Projects />
```

`npm run dev` — conferir featured + grid renderizando corretamente.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(projects): add featured + grid project components with sample content"
```

---

### Task 12: Componente Certificates (lista editorial)

**Files:**

- Create: `src/components/CertRow.astro`
- Create: `src/components/Certificates.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Criar `src/components/CertRow.astro`**

```astro
---
import type { CollectionEntry } from 'astro:content';

interface Props {
  cert: CollectionEntry<'certificates'>;
  index: number;
}

const { cert, index } = Astro.props;
const { title, issuer, date } = cert.data;
const num = String(index).padStart(2, '0');
---

<button class="row" data-cert={cert.slug}>
  <div class="num">{num}</div>
  <div class="title">{title}</div>
  <div class="issuer">{issuer}</div>
  <div class="date">{date}</div>
  <div class="icon" aria-hidden="true">↗</div>
</button>

<style>
  .row {
    display: grid;
    grid-template-columns: 40px 1fr 200px 100px 20px;
    align-items: center;
    padding: 18px 0;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    position: relative;
    transition: padding var(--duration-base) var(--ease-out);
    width: 100%;
    text-align: left;
  }
  .row::before {
    content: '';
    position: absolute;
    left: calc(-1 * var(--space-12));
    right: calc(-1 * var(--space-12));
    top: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(30, 64, 175, 0.06), transparent);
    opacity: 0;
    transition: opacity var(--duration-base);
  }
  .row:hover::before {
    opacity: 1;
  }
  .row:hover {
    padding-left: 12px;
  }
  .row:hover .icon {
    color: var(--accent-bright);
  }

  .num {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--accent-bright);
    letter-spacing: 1px;
  }
  .title {
    font-family: var(--font-serif);
    font-size: 19px;
    font-weight: 500;
  }
  .issuer {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 1.5px;
  }
  .date {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--accent-bright);
    letter-spacing: 1.5px;
    text-align: right;
  }
  .icon {
    color: var(--text-dim);
    text-align: right;
    font-size: 14px;
    transition: color var(--duration-fast);
  }

  @media (max-width: 768px) {
    .row {
      grid-template-columns: 30px 1fr 60px 20px;
      gap: var(--space-2);
    }
    .issuer {
      display: none;
    }
    .title {
      font-size: 16px;
    }
  }
</style>
```

- [ ] **Step 2: Criar `src/components/Certificates.astro`**

```astro
---
import { getCollection } from 'astro:content';
import { getLangFromUrl, useTranslations } from '../i18n/utils';
import CertRow from './CertRow.astro';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);

const all = await getCollection('certificates', ({ id }) => id.startsWith(`${lang}/`));
const sorted = all.sort((a, b) => a.data.order - b.data.order);
---

<section class="certs" id="certificates">
  <div class="sec-num">{t('sec.04')}</div>
  <h2 class="sec-title">{t('certs.title')}</h2>
  <p class="hint">{t('certs.hint')}</p>

  <div>
    {sorted.map((cert, i) => <CertRow cert={cert} index={i + 1} />)}
  </div>
</section>

<style>
  .certs {
    padding: var(--section-padding);
    border-top: 1px solid var(--border);
  }
  .sec-num {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent-bright);
    letter-spacing: 2px;
    margin-bottom: var(--space-4);
  }
  .sec-title {
    font-family: var(--font-serif);
    font-size: 40px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: -1px;
    margin-bottom: var(--space-4);
  }
  .hint {
    color: var(--text-dim);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 1.5px;
    margin-bottom: var(--space-4);
  }
  @media (max-width: 768px) {
    .sec-title {
      font-size: 28px;
    }
  }
</style>
```

- [ ] **Step 3: Adicionar 2 certs stub PT e EN**

`src/content/certificates/pt/anthropic-claude.md`:

```markdown
---
title: 'Building with Claude'
issuer: 'Anthropic Academy'
date: '2025'
order: 1
---

Curso oficial da Anthropic sobre construção de aplicações com LLMs.
```

`src/content/certificates/pt/imt.md`:

```markdown
---
title: 'Ciência da Computação (Bacharel)'
issuer: 'Instituto Mauá de Tecnologia'
date: '2023'
order: 2
---

Bacharelado em Ciência da Computação.
```

Replicar em EN com `src/content/certificates/en/`.

- [ ] **Step 4: Adicionar `<Certificates />` no index e validar**

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(certs): add certificates section with editorial rows and sample content"
```

---

### Task 13: Componente Contact

**Files:**

- Create: `src/components/Contact.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Criar `src/components/Contact.astro`**

```astro
---
import { getLangFromUrl, useTranslations } from '../i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
const title = t('contact.title');
const [titleStart, titleEnd] = title.split(/\s+(?=\S+\.?$)/);
---

<section class="contact" id="contact">
  <div class="sec-num">{t('sec.05')}</div>
  <h2 class="title">
    {titleStart}
    <em>{titleEnd.replace('.', '')}</em>.
  </h2>
  <p class="subtitle">{t('contact.subtitle')}</p>
  <div class="links">
    <a
      class="link"
      href="https://linkedin.com/in/rafael-alves-carrasco"
      target="_blank"
      rel="noopener noreferrer"
    >
      LINKEDIN ↗
    </a>
    <a class="link" href="https://github.com/RafCarrasco" target="_blank" rel="noopener noreferrer">
      GITHUB ↗
    </a>
    <a class="link" href="mailto:rafaelcarrasco304@gmail.com"> EMAIL ↗ </a>
  </div>
</section>

<style>
  .contact {
    padding: var(--space-24) var(--space-12);
    text-align: center;
    border-top: 1px solid var(--border);
  }
  .sec-num {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent-bright);
    letter-spacing: 2px;
    margin-bottom: var(--space-4);
  }
  .title {
    font-family: var(--font-serif);
    font-size: 64px;
    font-weight: 500;
    letter-spacing: -2px;
    line-height: 1;
    margin-bottom: var(--space-8);
  }
  .title em {
    color: var(--accent-bright);
    font-style: normal;
  }
  .subtitle {
    color: var(--text-muted);
    max-width: 500px;
    margin: 0 auto var(--space-8);
    font-size: 15px;
    line-height: 1.6;
  }
  .links {
    display: flex;
    justify-content: center;
    gap: var(--space-4);
    flex-wrap: wrap;
  }
  .link {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 2px;
    padding: 12px 20px;
    border: 1px solid var(--accent);
    color: var(--accent-bright);
    transition:
      background var(--duration-fast),
      color var(--duration-fast);
  }
  .link:hover {
    background: var(--accent);
    color: var(--text-primary);
  }

  @media (max-width: 768px) {
    .title {
      font-size: 40px;
    }
    .contact {
      padding: var(--space-12) var(--space-6);
    }
  }
</style>
```

- [ ] **Step 2: Adicionar `<Contact />` no index e validar**

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(contact): add contact section with linkedin, github and email links"
```

---

## Phase 5 — Modais (Tarefas 14-16)

### Task 14: Modal base reutilizável

**Files:**

- Create: `src/components/Modal.astro`
- Create: `src/scripts/modal.ts`
- Modify: `src/layouts/BaseLayout.astro` (importar script de modal)

- [ ] **Step 1: Criar `src/scripts/modal.ts`**

```typescript
type ModalElements = {
  modal: HTMLElement;
  backdrop: HTMLElement;
  closeBtn: HTMLButtonElement;
};

let activeModal: ModalElements | null = null;
let lastFocused: HTMLElement | null = null;

function trapFocus(modal: HTMLElement, event: KeyboardEvent) {
  const focusable = modal.querySelectorAll<HTMLElement>(
    'button, a, input, [tabindex]:not([tabindex="-1"])'
  );
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function onKeyDown(event: KeyboardEvent) {
  if (!activeModal) return;
  if (event.key === 'Escape') {
    closeActiveModal();
  } else if (event.key === 'Tab') {
    trapFocus(activeModal.modal, event);
  }
}

export function openModal(id: string) {
  const modal = document.getElementById(id);
  if (!modal) return;
  const backdrop = modal.querySelector<HTMLElement>('.modal-backdrop');
  const closeBtn = modal.querySelector<HTMLButtonElement>('.modal-close');
  if (!backdrop || !closeBtn) return;

  lastFocused = document.activeElement as HTMLElement;
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => modal.classList.add('open'));

  activeModal = { modal, backdrop, closeBtn };
  closeBtn.focus();

  document.addEventListener('keydown', onKeyDown);
  backdrop.addEventListener('click', closeActiveModal, { once: true });
  closeBtn.addEventListener('click', closeActiveModal, { once: true });
}

export function closeActiveModal() {
  if (!activeModal) return;
  const { modal } = activeModal;
  modal.classList.remove('open');
  setTimeout(() => {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }, 200);
  document.removeEventListener('keydown', onKeyDown);
  activeModal = null;
}

export function initModalTriggers() {
  document.querySelectorAll<HTMLButtonElement>('[data-project]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const slug = btn.getAttribute('data-project');
      if (slug) openModal(`project-${slug}`);
    });
  });
  document.querySelectorAll<HTMLButtonElement>('[data-cert]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const slug = btn.getAttribute('data-cert');
      if (slug) openModal(`cert-${slug}`);
    });
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModalTriggers);
  } else {
    initModalTriggers();
  }
}
```

- [ ] **Step 2: Criar `src/components/Modal.astro`**

```astro
---
interface Props {
  id: string;
  title: string;
  closeLabel: string;
}

const { id, title, closeLabel } = Astro.props;
---

<div id={id} class="modal" role="dialog" aria-modal="true" aria-label={title} hidden>
  <div class="modal-backdrop"></div>
  <div class="modal-container">
    <button class="modal-close" aria-label={closeLabel}>×</button>
    <div class="modal-content">
      <slot />
    </div>
  </div>
</div>

<style>
  .modal {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-6);
  }
  .modal-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    opacity: 0;
    transition: opacity var(--duration-fast);
  }
  .modal-container {
    position: relative;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    transform: scale(0.96) translateY(20px);
    opacity: 0;
    transition:
      transform var(--duration-base) var(--ease-out),
      opacity var(--duration-base);
  }
  .modal.open .modal-backdrop {
    opacity: 1;
  }
  .modal.open .modal-container {
    transform: scale(1) translateY(0);
    opacity: 1;
  }

  .modal-close {
    position: absolute;
    top: var(--space-4);
    right: var(--space-4);
    width: 32px;
    height: 32px;
    color: var(--text-secondary);
    font-size: 24px;
    line-height: 1;
    border: 1px solid var(--border-strong);
    border-radius: 2px;
    transition:
      color var(--duration-fast),
      border-color var(--duration-fast);
    z-index: 1;
  }
  .modal-close:hover {
    color: var(--accent-bright);
    border-color: var(--accent);
  }

  .modal-content {
    padding: var(--space-8);
  }
</style>
```

- [ ] **Step 3: Importar script de modal no BaseLayout**

Em `src/layouts/BaseLayout.astro`, antes do `</body>` (após o `<slot />`), adicionar:

```astro
<script>
  import '../scripts/modal';
</script>
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(modal): add base modal component with focus trap, esc and backdrop close"
```

---

### Task 15: ProjectModal

**Files:**

- Create: `src/components/ProjectModal.astro`
- Modify: `src/components/Projects.astro` (renderizar 1 modal por projeto)

- [ ] **Step 1: Criar `src/components/ProjectModal.astro`**

```astro
---
import type { CollectionEntry } from 'astro:content';
import { getLangFromUrl, useTranslations } from '../i18n/utils';
import Modal from './Modal.astro';

interface Props {
  project: CollectionEntry<'projects'>;
}

const { project } = Astro.props;
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
const { title, year, stack, heroImage, links } = project.data;
const { Content } = await project.render();
---

<Modal id={`project-${project.slug}`} title={title} closeLabel={t('modal.close')}>
  {
    heroImage && (
      <div class="hero-img">
        <img src={heroImage} alt={title} loading="lazy" />
      </div>
    )
  }
  <header class="header">
    <h3>{title}</h3>
    <span class="year">{year}</span>
  </header>
  <div class="stack">
    {stack.map((chip) => <span class="chip">{chip}</span>)}
  </div>
  <div class="body">
    <Content />
  </div>
  <footer class="footer">
    {
      links.github && (
        <a class="link" href={links.github} target="_blank" rel="noopener noreferrer">
          {t('modal.github')}
        </a>
      )
    }
    {
      links.demo && (
        <a class="link" href={links.demo} target="_blank" rel="noopener noreferrer">
          {t('modal.demo')}
        </a>
      )
    }
    {
      links.article && (
        <a class="link" href={links.article} target="_blank" rel="noopener noreferrer">
          {t('modal.article')}
        </a>
      )
    }
  </footer>
</Modal>

<style>
  .hero-img {
    margin: calc(-1 * var(--space-8)) calc(-1 * var(--space-8)) var(--space-6);
    aspect-ratio: 16/9;
    overflow: hidden;
    background: var(--bg-tertiary);
  }
  .hero-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: var(--space-3);
    gap: var(--space-4);
  }
  .header h3 {
    font-family: var(--font-serif);
    font-size: 32px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.5px;
  }
  .year {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent-bright);
    letter-spacing: 2px;
  }
  .stack {
    display: flex;
    gap: 6px;
    margin-bottom: var(--space-6);
    flex-wrap: wrap;
  }
  .chip {
    font-family: var(--font-mono);
    font-size: 9px;
    color: var(--text-muted);
    border: 1px solid var(--border-strong);
    padding: 3px 8px;
    border-radius: 2px;
    letter-spacing: 1px;
  }
  .body :global(p) {
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: var(--space-4);
  }
  .body :global(h4) {
    font-family: var(--font-serif);
    font-size: 18px;
    margin-top: var(--space-6);
    margin-bottom: var(--space-3);
  }
  .body :global(code) {
    font-family: var(--font-mono);
    background: var(--bg-tertiary);
    padding: 2px 6px;
    border-radius: 2px;
    font-size: 12px;
  }
  .footer {
    display: flex;
    gap: var(--space-3);
    margin-top: var(--space-8);
    flex-wrap: wrap;
  }
  .link {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent-bright);
    border: 1px solid var(--accent);
    padding: 10px 16px;
    letter-spacing: 1.5px;
    transition:
      background var(--duration-fast),
      color var(--duration-fast);
  }
  .link:hover {
    background: var(--accent);
    color: var(--text-primary);
  }
</style>
```

- [ ] **Step 2: Renderizar ProjectModals em `src/components/Projects.astro`**

No final do template, antes do `</section>`, ou logo após — adicionar:

```astro
{sorted.map((project) => <ProjectModal project={project} />)}
```

E adicionar import no frontmatter:

```typescript
import ProjectModal from './ProjectModal.astro';
```

- [ ] **Step 3: Validar visualmente (`npm run dev`)**

Clicar em um project card. Deve abrir modal com:

- Backdrop com blur
- Container central com border azul
- Conteúdo do markdown renderizado
- Botão X funciona
- ESC fecha
- Click no backdrop fecha
- Focus está no botão close ao abrir

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(modal): add project modal with hero image, stack, body and links"
```

---

### Task 16: CertModal

**Files:**

- Create: `src/components/CertModal.astro`
- Modify: `src/components/Certificates.astro`

- [ ] **Step 1: Criar `src/components/CertModal.astro`**

```astro
---
import type { CollectionEntry } from 'astro:content';
import { getLangFromUrl, useTranslations } from '../i18n/utils';
import Modal from './Modal.astro';

interface Props {
  cert: CollectionEntry<'certificates'>;
}

const { cert } = Astro.props;
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
const { title, issuer, date, image, verifyUrl } = cert.data;
const { Content } = await cert.render();
---

<Modal id={`cert-${cert.slug}`} title={title} closeLabel={t('modal.close')}>
  {
    image && (
      <div class="cert-img">
        <img src={image} alt={title} loading="lazy" />
      </div>
    )
  }
  <h3>{title}</h3>
  <div class="meta">
    <span>{issuer}</span> · <span>{date}</span>
  </div>
  <div class="body">
    <Content />
  </div>
  {
    verifyUrl && (
      <a class="verify" href={verifyUrl} target="_blank" rel="noopener noreferrer">
        {t('modal.verify')}
      </a>
    )
  }
</Modal>

<style>
  .cert-img {
    margin: calc(-1 * var(--space-8)) calc(-1 * var(--space-8)) var(--space-6);
    background: var(--bg-tertiary);
    border-bottom: 1px solid var(--border);
  }
  .cert-img img {
    width: 100%;
    max-height: 480px;
    object-fit: contain;
  }
  h3 {
    font-family: var(--font-serif);
    font-size: 28px;
    margin-bottom: var(--space-2);
    line-height: 1.1;
  }
  .meta {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent-bright);
    letter-spacing: 1.5px;
    margin-bottom: var(--space-6);
  }
  .body :global(p) {
    color: var(--text-secondary);
    line-height: 1.7;
  }
  .verify {
    display: inline-block;
    margin-top: var(--space-6);
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent-bright);
    border: 1px solid var(--accent);
    padding: 10px 16px;
    letter-spacing: 1.5px;
    transition:
      background var(--duration-fast),
      color var(--duration-fast);
  }
  .verify:hover {
    background: var(--accent);
    color: var(--text-primary);
  }
</style>
```

- [ ] **Step 2: Renderizar CertModals em `src/components/Certificates.astro`**

Adicionar import e renderizar após a lista de rows:

```typescript
import CertModal from './CertModal.astro';
```

```astro
{sorted.map((cert) => <CertModal cert={cert} />)}
```

- [ ] **Step 3: Validar visualmente**

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(modal): add certificate modal with image, meta and verify link"
```

---

## Phase 6 — Animações (Tarefas 17-19)

### Task 17: Smooth scroll com Lenis

**Files:**

- Install: `lenis`
- Create: `src/scripts/lenis.ts`
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Instalar Lenis**

```bash
npm install lenis
```

- [ ] **Step 2: Criar `src/scripts/lenis.ts`**

```typescript
import Lenis from 'lenis';

export function initLenis() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return null;

  const lenis = new Lenis({
    duration: 1.0,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return lenis;
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initLenis());
  } else {
    initLenis();
  }
}
```

- [ ] **Step 3: Importar no BaseLayout**

No `src/layouts/BaseLayout.astro`, adicionar script:

```astro
<script>
  import '../scripts/lenis';
  import '../scripts/modal';
</script>
```

- [ ] **Step 4: Validar**

`npm run dev` — scroll deve ficar visivelmente mais suave. Anchor links (#about, #expertise, etc) navegam com inércia.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(animations): integrate lenis for smooth scroll with reduced-motion support"
```

---

### Task 18: Reveal animations com GSAP + ScrollTrigger

**Files:**

- Install: `gsap`
- Create: `src/scripts/animations.ts`
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Instalar GSAP**

```bash
npm install gsap
```

- [ ] **Step 2: Criar `src/scripts/animations.ts`**

```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Reveal de seções
  document.querySelectorAll<HTMLElement>('section').forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 24,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Stagger de cards
  document.querySelectorAll<HTMLElement>('.expertise .grid, .projects .grid').forEach((grid) => {
    const cards = grid.children;
    gsap.from(cards, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Parallax sutil na foto do hero
  const heroPhoto = document.querySelector<HTMLElement>('.hero-photo');
  if (heroPhoto) {
    gsap.to(heroPhoto, {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  // Glow do hero respira
  const glow = document.querySelector<HTMLElement>('.glow');
  if (glow) {
    gsap.to(glow, {
      opacity: 0.55,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
}
```

- [ ] **Step 3: Importar no BaseLayout**

```astro
<script>
  import '../scripts/lenis';
  import '../scripts/modal';
  import '../scripts/animations';
</script>
```

- [ ] **Step 4: Validar visualmente**

`npm run dev` — fazer scroll lento e observar:

- Cada seção entra com fade + slide-up
- Cards de expertise/projects entram em cascata
- Foto do hero faz parallax sutil
- Glow do hero pulsa

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(animations): add scroll reveal, stagger, parallax and glow with gsap"
```

---

### Task 19: Animação shimmer nos project cards

**Files:**

- Modify: `src/components/ProjectCard.astro` (adicionar pseudo `::after` com shimmer)

- [ ] **Step 1: Adicionar shimmer effect no ProjectCard**

No `<style>` do `ProjectCard.astro`, adicionar dentro de `.card`:

```css
.card {
  /* ... estilos existentes ... */
  isolation: isolate;
}
.card::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(85, 130, 232, 0.1), transparent);
  transition: left 0.6s var(--ease-out);
  pointer-events: none;
  z-index: -1;
}
.card:hover::after {
  left: 100%;
}
```

- [ ] **Step 2: Validar visualmente — hover deve mostrar uma faixa azul cruzando o card**

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "style(project-card): add shimmer effect on hover"
```

---

## Phase 7 — Pages e i18n (Tarefas 20-21)

### Task 20: Página EN

**Files:**

- Create: `src/pages/en/index.astro`

- [ ] **Step 1: Criar `src/pages/en/index.astro`**

Copiar exatamente o conteúdo de `src/pages/index.astro` — o sistema i18n já detecta a URL e troca os textos.

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Hero from '../../components/Hero.astro';
import About from '../../components/About.astro';
import Expertise from '../../components/Expertise.astro';
import Projects from '../../components/Projects.astro';
import Certificates from '../../components/Certificates.astro';
import Contact from '../../components/Contact.astro';
---

<BaseLayout
  title="Rafael Carrasco · Technical Architect"
  description="Software engineer at the intersection of mobile, back-end and applied AI."
>
  <Nav />
  <Hero />
  <About />
  <Expertise />
  <Projects />
  <Certificates />
  <Contact />
</BaseLayout>
```

- [ ] **Step 2: Validar**

`npm run dev` — navegar para `http://localhost:4321/en/` e conferir tudo em inglês.

Clicar no toggle PT/EN para confirmar troca de URL.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(i18n): add english page at /en/"
```

---

### Task 21: Test e2e do toggle de idioma

**Files:**

- Create: `tests/e2e/i18n.spec.ts`

- [ ] **Step 1: Criar `tests/e2e/i18n.spec.ts`**

```typescript
import { test, expect } from '@playwright/test';

test('hero shows portuguese tagline by default', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Engenheiro de software com olhar de arquiteto')).toBeVisible();
});

test('language toggle navigates to /en/ and shows english content', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /switch language to en/i }).click();
  await expect(page).toHaveURL(/\/en\/?$/);
  await expect(page.getByText('Software engineer with an architect mindset')).toBeVisible();
});

test('html lang attribute switches with language', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt');
  await page.goto('/en/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});
```

- [ ] **Step 2: Rodar testes**

```bash
npm run test:e2e
```

Expected: 3 testes passando.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "test(i18n): add e2e tests for language toggle and html lang"
```

---

### Task 22: Test e2e dos modais

**Files:**

- Create: `tests/e2e/modal.spec.ts`

- [ ] **Step 1: Criar `tests/e2e/modal.spec.ts`**

```typescript
import { test, expect } from '@playwright/test';

test('clicking a project card opens its modal', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-project="exemplo-featured"]').click();
  await expect(page.locator('#project-exemplo-featured')).toBeVisible();
});

test('ESC closes the modal', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-project="exemplo-featured"]').click();
  await expect(page.locator('#project-exemplo-featured')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#project-exemplo-featured')).toBeHidden();
});

test('clicking close button closes the modal', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-project="exemplo-featured"]').click();
  await page.locator('#project-exemplo-featured .modal-close').click();
  await expect(page.locator('#project-exemplo-featured')).toBeHidden();
});

test('certificate row opens cert modal', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-cert="anthropic-claude"]').click();
  await expect(page.locator('#cert-anthropic-claude')).toBeVisible();
});
```

- [ ] **Step 2: Rodar testes**

```bash
npm run test:e2e
```

Expected: 4 testes novos passando, total 7.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "test(modal): add e2e tests for project and cert modal interactions"
```

---

## Phase 8 — Polish (Tarefas 23-25)

### Task 23: Favicon + OG image

**Files:**

- Create: `public/favicon.svg`
- Create: `public/og-image.png` (placeholder texto)

- [ ] **Step 1: Criar `public/favicon.svg`**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#08080d"/>
  <text x="16" y="22" font-family="Georgia, serif" font-size="18" font-weight="500" fill="#ffffff" text-anchor="middle">R<tspan fill="#5582e8">.</tspan>C</text>
</svg>
```

- [ ] **Step 2: Criar OG image placeholder**

Por ora, copiar o favicon redimensionado ou criar um SVG/PNG simples 1200x630. **Recomendado:** gerar com qualquer ferramenta (Figma, Canva, ou um script Node com `sharp`). Por ora, placeholder:

```bash
# Se tiver ImageMagick:
magick -size 1200x630 -background "#08080d" -fill "#ffffff" -font Georgia -pointsize 80 -gravity center label:"Rafael Carrasco" public/og-image.png
```

Se não, criar manualmente e colocar em `public/og-image.png`.

- [ ] **Step 3: Validar com `npm run dev`**

Aba mostra favicon. Conferir meta og:image via inspector de elementos.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: add favicon and og image"
```

---

### Task 24: Audit de responsividade

**Files:**

- Modify: vários componentes conforme bugs encontrados

- [ ] **Step 1: Rodar dev server e testar breakpoints**

```bash
npm run dev
```

No DevTools, alternar entre:

- 1440px (desktop padrão)
- 1024px (tablet large)
- 768px (tablet)
- 414px (mobile)
- 375px (mobile pequeno)

Validar para cada um:

- Nav não vaza
- Hero empilha em <768px
- Grids reduzem colunas
- Featured project não fica grande demais
- Cert rows mantêm legibilidade

- [ ] **Step 2: Aplicar fixes inline conforme necessário**

(Tarefa de inspeção — qualquer ajuste pontual é feito por edit.)

- [ ] **Step 3: Commit (se houver mudanças)**

```bash
git add -A
git commit -m "fix(responsive): adjust breakpoints for mobile and tablet"
```

---

### Task 25: Audit de acessibilidade

**Files:**

- Modify: componentes conforme issues encontradas

- [ ] **Step 1: Rodar Lighthouse**

```bash
npm run build
npm run preview
```

Em outra aba, abrir `http://localhost:4321` no Chrome e rodar Lighthouse (DevTools → Lighthouse → Mobile + Desktop).

Validar:

- Performance ≥ 95
- Accessibility ≥ 95
- Best Practices = 100
- SEO = 100

- [ ] **Step 2: Aplicar fixes**

Issues comuns:

- Faltam `alt` em imagens → adicionar
- Contraste insuficiente → ajustar tokens
- Heading hierarchy fora de ordem → reordenar tags `h2/h3`
- Botões sem `aria-label` quando só têm ícone → adicionar

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "fix(a11y): address lighthouse accessibility issues"
```

---

## Phase 9 — Deploy (Tarefas 26-27)

### Task 26: Configurar Vercel

**Files:**

- Create: `vercel.json`

- [ ] **Step 1: Criar `vercel.json`**

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro",
  "headers": [
    {
      "source": "/_astro/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/img/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "chore(deploy): add vercel configuration with cache headers"
```

- [ ] **Step 3: Push e conectar Vercel via dashboard**

Pedir ao Rafael para:

1. Abrir https://vercel.com/new
2. Importar o repositório `rafcarrasco.dev`
3. Manter defaults (Astro é detectado automaticamente)
4. Deploy
5. URL preview: `rafcarrasco-dev-<hash>.vercel.app`

---

### Task 27: Apontar domínio (instruções)

**Esta tarefa é manual — passo a passo pro Rafael:**

- [ ] **Step 1: Comprar `rafcarrasco.dev`** (Google Domains, Namecheap, Cloudflare Registrar — qualquer um)

- [ ] **Step 2: No dashboard Vercel → Project → Settings → Domains, adicionar `rafcarrasco.dev` e `www.rafcarrasco.dev`**

- [ ] **Step 3: No registrar, adicionar DNS records conforme Vercel instruir** (geralmente um CNAME `www → cname.vercel-dns.com` e um A record para o apex)

- [ ] **Step 4: Aguardar propagação (5-60 min) e validar HTTPS**

- [ ] **Step 5: Atualizar `site` em `astro.config.mjs` se necessário (já está `https://rafcarrasco.dev`)**

---

## Resumo

**Tarefas totais:** 27
**Commits estimados:** ~30 (alguns steps comitam separadamente em fixes)
**Tempo total estimado:** 8–14h de execução focada
**Resultado:** Portfolio bilíngue funcionando em produção em `https://rafcarrasco.dev`

**Próximos passos pós-launch (fora deste plano):**

- Curadoria final de 4–6 projetos reais do GitHub do Rafael (substituir os stubs)
- Adicionar últimos certificados do LinkedIn
- Foto profissional final substituindo placeholder
- OG image gerada caprichada
- Eventual blog/notes em fase 2
