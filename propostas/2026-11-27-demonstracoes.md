# Entrada ao rolar, número animado, cursor e miniatura do painel

- **Status:** proposta
- **Componente:** `SurgirAoRolar, TituloQueSurge, NumeroAnimado, CursorDeDemonstracao (moverCursor, clicarCursor), MiniaturaDoPainel (IndicadoresDaMiniatura, GraficoDaMiniatura, TabelaDaMiniatura) e os tokens de movimento em JS (movimento.ts)` em `src/app/components/ui/surgir-ao-rolar.tsx, numero-animado.tsx, cursor-de-demonstracao.tsx, miniatura-do-painel.tsx, movimento.ts`
- **Data:** 2026-11-27
- **Branch:** `claude/componentes-novos`
- **Documentação:** Demonstrações animadas (`demonstracoes`)

## Motivo
O produto copia os tokens de movimento em JS (`landing/Movimento.tsx`), tem dois contadores, o cursor com `rgb()` e o mockup do painel com 18 textos e 12 raios fora da escala. O DS Dani Moscatelli já tinha o SurgirAoRolar: mesma API.

## Tela de origem
Produto FindLook: `landing/Movimento.tsx`, `parceiros/MockupPainel.tsx`, `parceiros/Secoes.tsx`, `parceiros/SecoesPrototipo.tsx`.

## API
Ver a documentação de cada um.

## Variações e estados
Tokens --duration-* e --ease-snappy; miniatura com textos de 11 px ou mais.

## Acessibilidade
Menos movimento: tudo aparece pronto; números lidos pelo valor final; ilustrações fora da leitura com o aviso lido.

## Testes
`pnpm build` e `pnpm catalogo:check`; checagem de tipos com React 19 (tipos do produto); navegador (Playwright) em 390, 768, 1024 e 1280 px: sem erros no console, sem rolagem lateral; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e a auditoria de alinhamento (`auditoria-ds/auditar.cjs`) sem itens de severidade alta ou média nas páginas novas.

## Capturas
Pasta de capturas da sessão: `novos-shots/` (página inteira em 390, 768, 1024 e 1280 px).
