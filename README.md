# FindLook - Design System

Design system da FindLook, plataforma web de descoberta de moda local. Só em português.

Construído sobre a estrutura do Dani Moscatelli Design System v2 (componentes shadcn/ui + Radix, Tailwind CSS v4, usabilidade, acessibilidade e motion), com marca, paleta Pink + Grafite, tipografia Plus Jakarta Sans, princípios, tom de voz e estados de informação do Brand Book FindLook v1.0.

## Rodar

`pnpm install` e `pnpm dev`. Build com `pnpm build` (publicado no GitHub Pages com `base: '/FindLook-DesignSystem/'`).

## Estrutura

- `src/styles/theme.css`: tokens (escalas pink e grafite, semânticos claro e escuro, sombras, raio).
- `src/app/components/ui/`: componentes.
- `src/app/components/showcase/`: páginas do design system.
- `src/imports/findlook/` e `src/imports/svg/`: logos em PNG e SVG.
