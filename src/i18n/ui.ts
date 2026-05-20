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
    'about.title.line1': 'Engenharia de',
    'about.title.line2': 'com olhar de',
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
    'about.title.line1': 'Software',
    'about.title.line2': 'with an',
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
