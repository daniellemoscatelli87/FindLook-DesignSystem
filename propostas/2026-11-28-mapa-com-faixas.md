# Mapa coroplético com faixas fixas e números

- **Status:** proposta
- **Componente:** `MapaCoropletico` (`faixas`, `etiquetas`, `semDado`, `mostrarLegenda`), `LegendaDoMapa` e `corDoMapa` em `src/app/components/ui/graficos.tsx`
- **Data:** 2026-11-28
- **Branch:** `claude/pecas-findlook`
- **Documentação:** Exibição de dados › Mapa com faixas e números (`data#mapa-com-faixas`)
- **Design systems:** só FindLook

## Motivo
O mapa de bairros da Visão geral era SVG feito à mão: faixas fixas, número de cada bairro, “+N” para conferir, escolhido por cima e cor de fora dos dados. O Dani Moscatelli não tem o MapaCoropletico nem os tokens --mapa-* (só o mapa de calor esquemático), então a peça fica só no FindLook.

## Tela de origem
FindLook, Visão geral › Lojas por bairro. Especificação em `docs/produto/CONFORMIDADE_DS.md` §11.9 do produto FindLook.

## API
`faixas` (`{ ate, rotulo }[]`, até 5, a última com Infinity), `etiquetas` (`(nome, valor) => { texto, extra? } | null`), `semDado` (cor de quem não está em `valores`), `mostrarLegenda` (true), `rotuloDoValor(n, nome)`. `LegendaDoMapa` (`faixas`, `semValor`), `corDoMapa(n, maximo, faixas)`.

## Variações e estados
Faixas nos tokens --mapa-1 a --mapa-5; 0 em --mapa-vazio; pílula no card com borda --border-strong (grafite na escolhida); “+N” na primária; escolhida desenhada por último com --mapa-escolhida; tamanho das pílulas proporcional ao mapa.

## Acessibilidade
Pílulas decorativas (aria-hidden); números na dica de cada região e na lista equivalente; legenda em lista com nome; esmaecer ao aparecer, pronto com “menos movimento”.

## Testes
`pnpm build` e `pnpm catalogo:check`; tipos (tsc com os tipos do React, sem erro em `ui/`); navegador (Playwright) em 390 e 1280 px: teste de interação e axe da seção (`interacao.cjs` do relatório, FindLook 93/93 e Dani Moscatelli 61/61), capturas em 390, 768, 1024 e 1280 px; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e `auditoria-ds/auditar.cjs` nas páginas mudadas; `scripts/comparar-ds.mjs` (102 de 102 iguais).

## Capturas
No relatório do branch `claude/pecas-findlook` (capturas da seção em 390 e 1280 px).
