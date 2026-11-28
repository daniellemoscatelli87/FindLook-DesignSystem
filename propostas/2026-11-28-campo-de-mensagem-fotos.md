# Campo de mensagem com ref, anexar desligado e fotos

- **Status:** proposta
- **Componente:** `CampoDeMensagem` (forwardRef, `anexarDesativado`, `fotos`, `onRemoverFoto`, `tituloDasFotos`, `descricaoDasFotos`, `rotuloRemoverFoto`) em `src/app/components/ui/conversa.tsx`
- **Data:** 2026-11-28
- **Branch:** `claude/pecas-findlook`
- **Documentação:** Quadro, conversa e tabela › Campo de mensagem com fotos (`painel-e-admin#campo-de-mensagem-fotos`)
- **Design systems:** só FindLook

## Motivo
O simulador devolve o foco ao campo depois de enviar, escolher ou remover foto, desliga o clipe com 3 fotos e mostra a prévia das fotos; o CampoDeMensagem não expunha o campo nem desligava só o anexar, por isso o simulador tinha um campo feito à mão. O CampoDeMensagem existe só no FindLook.

## Tela de origem
FindLook, área administrativa › Simulador do WhatsApp. Especificação em `docs/produto/CONFORMIDADE_DS.md` §11.9 do produto FindLook.

## API
`ref` (o `<input>`), `anexarDesativado`, `fotos` (`{ id, url, nome? }[]`), `onRemoverFoto`, `tituloDasFotos`, `descricaoDasFotos`, `rotuloRemoverFoto(i, total)`. `data-slot="campo-de-mensagem"` passou do formulário para o bloco de fora.

## Variações e estados
Sem fotos; com fotos (faixa acima do campo; enviar livre sem texto); clipe desligado; ocupado.

## Acessibilidade
Remover de 24 px com área de 44 px (::after); nome “Remover foto 2”; ao remover, o foco volta ao campo; faixa e miniaturas animadas só com movimento.

## Testes
`pnpm build` e `pnpm catalogo:check`; tipos (tsc com os tipos do React, sem erro em `ui/`); navegador (Playwright) em 390 e 1280 px: teste de interação e axe da seção (`interacao.cjs` do relatório, FindLook 93/93 e Dani Moscatelli 61/61), capturas em 390, 768, 1024 e 1280 px; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e `auditoria-ds/auditar.cjs` nas páginas mudadas; `scripts/comparar-ds.mjs` (102 de 102 iguais).

## Capturas
No relatório do branch `claude/pecas-findlook` (capturas da seção em 390 e 1280 px).
