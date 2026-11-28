# Cartão de peça do painel

- **Status:** proposta
- **Componente:** `CartaoDePecaDoPainel` em `src/app/components/ui/cartao-de-peca-do-painel.tsx`
- **Data:** 2026-11-28
- **Branch:** `claude/pecas-findlook`
- **Documentação:** Quadro, conversa e tabela › Cartão de peça do painel (`painel-e-admin#cartao-de-peca-do-painel`)
- **Design systems:** só FindLook

## Motivo
O ProductCard é da vitrine (favorito, “Ver peça”, estoque); o painel da loja e a ficha da parceira tinham um cartão feito à mão.

## Tela de origem
FindLook, painel do lojista › Peças; área administrativa › Lojas parceiras › ficha (só leitura). Especificação em `docs/produto/CONFORMIDADE_DS.md` §11.9 do produto FindLook.

## API
`titulo`, `foto`, `situacao` (um ChipDeEstado), `preco`, `precoPromocional`, `semPreco` (“Sem preço”), `detalhes`, `indicadores` (`{ icone, valor, rotulo }[]`), `vendida`, `destaque`, `onAbrir` ou `href` + `comoLink`, `acao` (“Editar”), `iconeSemFoto`.

## Variações e estados
Botão, link ou só leitura (`article`); hover com borda --border-strong, sombra pequena e subida de 2 px; destaque de sucesso (borda e anel verdes); vendida (foto esmaecida); sem foto; sem preço; promoção.

## Acessibilidade
O nome é o próprio conteúdo, começando por “Editar” (escondido na tela) e com o interesse por extenso; a foto vem depois no HTML (order-first na tela); números do rodapé aria-hidden; sem subida nem escala com “menos movimento”.

## Testes
`pnpm build` e `pnpm catalogo:check`; tipos (tsc com os tipos do React, sem erro em `ui/`); navegador (Playwright) em 390 e 1280 px: teste de interação e axe da seção (`interacao.cjs` do relatório, FindLook 93/93 e Dani Moscatelli 61/61), capturas em 390, 768, 1024 e 1280 px; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e `auditoria-ds/auditar.cjs` nas páginas mudadas; `scripts/comparar-ds.mjs` (102 de 102 iguais).

## Capturas
No relatório do branch `claude/pecas-findlook` (capturas da seção em 390 e 1280 px).
