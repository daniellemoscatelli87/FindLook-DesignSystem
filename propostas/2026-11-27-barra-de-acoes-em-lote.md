# Textos da barra de ações em lote e card de indicador clicável

- **Status:** proposta
- **Componente:** `BarraDeAcoesEmLote (itemNoSingular, itemNoPlural, selecionadaNoFeminino, textoDaContagem, rotuloDaRegiao, rotuloLimpar, children) e CardIndicador (href, onClick, comoLink)` em `src/app/components/ui/painel-produtos.tsx e painel-dados.tsx`
- **Data:** 2026-11-27
- **Branch:** `claude/componentes-novos`
- **Documentação:** Quadro, conversa e tabela › Tabela adaptável e Card de indicador clicável (`painel-e-admin#card-indicador-link`)

## Motivo
A barra dizia sempre "produtos" e o produto fez uma cópia para lojas; o card de indicador não levava a lugar nenhum.

## Tela de origem
Produto FindLook: `admin/comum.tsx` (BarraDeAcoesEmLote) e Visão geral do mapeamento.

## API
Ver Componente.

## Variações e estados
Barra: no celular, contagem e X em cima e as ações numa linha embaixo, alinhadas à esquerda (44 px). Card: hover cinza, borda mais forte e seta.

## Acessibilidade
Nome da região com o item certo; card-link sem nada clicável dentro.

## Testes
`pnpm build` e `pnpm catalogo:check`; checagem de tipos com React 19 (tipos do produto); navegador (Playwright) em 390, 768, 1024 e 1280 px: sem erros no console, sem rolagem lateral; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e a auditoria de alinhamento (`auditoria-ds/auditar.cjs`) sem itens de severidade alta ou média nas páginas novas.

## Capturas
Pasta de capturas da sessão: `novos-shots/` (página inteira em 390, 768, 1024 e 1280 px).
