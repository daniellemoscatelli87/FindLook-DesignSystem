# Seletor de quantidade

- **Status:** proposta
- **Componente:** `SeletorDeQuantidade` em `src/app/components/ui/seletor-de-quantidade.tsx`
- **Data:** 2026-11-27
- **Branch:** `claude/componentes-novos`
- **Documentação:** Campos e formulários › Seletor de quantidade (`campos#seletor-de-quantidade`)

## Motivo
Feito à mão no painel do lojista (raios de 11/12 px).

## Tela de origem
Produto FindLook, `src/components/painel/Pecas.tsx`.

## API
`valor`, `onValorChange`, `rotulo`, `min`, `max`, `passo`, `desabilitado`.

## Variações e estados
Menos desabilitado no mínimo e mais no máximo; número pulsa de leve.

## Acessibilidade
Grupo com nome; botões "Diminuir/Aumentar a quantidade…"; número anunciado; 44 px no toque.

## Testes
`pnpm build` e `pnpm catalogo:check`; checagem de tipos com React 19 (tipos do produto); navegador (Playwright) em 390, 768, 1024 e 1280 px: sem erros no console, sem rolagem lateral; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e a auditoria de alinhamento (`auditoria-ds/auditar.cjs`) sem itens de severidade alta ou média nas páginas novas.

## Capturas
Pasta de capturas da sessão: `novos-shots/` (página inteira em 390, 768, 1024 e 1280 px).
