# Avaliação

- **Status:** proposta
- **Componente:** `Avaliacao` em `src/app/components/ui/avaliacao.tsx`
- **Data:** 2026-11-27
- **Branch:** `claude/componentes-novos`
- **Documentação:** Chips e estados › Avaliação (`chips-e-estados#avaliacao-e-grupos`)

## Motivo
Só no produto (`ListaDeLojas.tsx`, Google).

## Tela de origem
Produto FindLook, `admin/ListaDeLojas.tsx`.

## API
`nota`, `total`, `fonte`, `tamanho`.

## Variações e estados
Sem nota: "Sem nota" (nunca zero).

## Acessibilidade
Leitura "Nota 4,6 de 5, 128 avaliações"; estrela com contorno em --warning-text.

## Testes
`pnpm build` e `pnpm catalogo:check`; checagem de tipos com React 19 (tipos do produto); navegador (Playwright) em 390, 768, 1024 e 1280 px: sem erros no console, sem rolagem lateral; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e a auditoria de alinhamento (`auditoria-ds/auditar.cjs`) sem itens de severidade alta ou média nas páginas novas.

## Capturas
Pasta de capturas da sessão: `novos-shots/` (página inteira em 390, 768, 1024 e 1280 px).
