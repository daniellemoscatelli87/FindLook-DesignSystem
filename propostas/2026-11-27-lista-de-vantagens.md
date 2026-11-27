# Lista de vantagens

- **Status:** proposta
- **Componente:** `ListaDeVantagens` em `src/app/components/ui/lista-de-vantagens.tsx`
- **Data:** 2026-11-27
- **Branch:** `claude/componentes-novos`
- **Documentação:** Moldura do site › Vantagens e prova social (`site#site-hero`)

## Motivo
Duas cópias no produto (página inicial e página do lojista).

## Tela de origem
Produto FindLook, `landing/Secoes.tsx` e `parceiros/Secoes.tsx`.

## API
`itens`, `surgir` (entrada escalonada ao rolar), `tamanho` (md/lg).

## Variações e estados
Check na base redonda rosa fora do fluxo: o texto e suas quebras começam sempre na mesma borda.

## Acessibilidade
Lista de verdade (ul/li); check escondido dos leitores de tela.

## Testes
`pnpm build` e `pnpm catalogo:check`; checagem de tipos com React 19 (tipos do produto); navegador (Playwright) em 390, 768, 1024 e 1280 px: sem erros no console, sem rolagem lateral; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e a auditoria de alinhamento (`auditoria-ds/auditar.cjs`) sem itens de severidade alta ou média nas páginas novas.

## Capturas
Pasta de capturas da sessão: `novos-shots/` (página inteira em 390, 768, 1024 e 1280 px).
