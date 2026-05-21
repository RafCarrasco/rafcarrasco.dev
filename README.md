# Portfolio · Rafael Carrasco

Site pessoal — engenheiro de software com foco em front-end, back-end e inteligência artificial aplicada.

Construído com [Astro](https://astro.build), bilíngue (PT/EN), animações com GSAP + Lenis, hospedado na Vercel.

## Design

O design completo está documentado em [`docs/superpowers/specs/2026-05-20-portfolio-site-design.md`](docs/superpowers/specs/2026-05-20-portfolio-site-design.md).

## Stack

- **Framework:** Astro 6 + TypeScript (strict)
- **Animação:** GSAP + ScrollTrigger + Lenis
- **Estilo:** CSS scoped + variáveis de design tokens
- **i18n:** Astro i18n nativo (PT default, EN em `/en/`)
- **Conteúdo:** content collections (markdown + zod) para projetos e certificados
- **Testes:** Vitest (unit) + Playwright (e2e) + @axe-core (a11y)
- **Deploy:** Vercel

## Scripts

```bash
npm run dev        # servidor local — http://localhost:4321
npm run build      # build de produção em dist/
npm run preview    # preview do build
npm run check      # diagnóstico TypeScript/Astro
npm test           # testes unitários (vitest)
npm run test:e2e   # testes end-to-end (playwright)
```

## Links

- [LinkedIn](https://linkedin.com/in/rafael-alves-carrasco)
- [GitHub](https://github.com/RafCarrasco)
