# Prova social

- **Status:** proposta
- **Componente:** `ProvaSocial` em `src/app/components/ui/prova-social.tsx`
- **Data:** 2026-11-27
- **Branch:** `claude/componentes-novos`
- **Documentação:** Moldura do site › Vantagens e prova social (`site#site-hero`)

## Motivo
O produto monta AvatarCircles e a frase à mão no hero (texto de 13 px fora da escala).

## Tela de origem
Produto FindLook, `src/components/landing/Secoes.tsx` (ProvaSocialHero).

## API
`avatares`, `maisPessoas`, `destaque`, `texto`, `tamanho` (sm/md/lg, padrão lg: os avatares são links e precisam de 44 px).

## Variações e estados
Na mesma linha quando cabe; no celular a frase desce, alinhada à mesma borda. Destaque em --primary-text.

## Acessibilidade
Texto alternativo de cada avatar; número sempre real (zerado no lançamento).

## Testes
`pnpm build` e `pnpm catalogo:check`; checagem de tipos com React 19 (tipos do produto); navegador (Playwright) em 390, 768, 1024 e 1280 px: sem erros no console, sem rolagem lateral; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e a auditoria de alinhamento (`auditoria-ds/auditar.cjs`) sem itens de severidade alta ou média nas páginas novas.

## Capturas
Pasta de capturas da sessão: `novos-shots/` (página inteira em 390, 768, 1024 e 1280 px).
