# Grupo de opções e linha com interruptor

- **Status:** proposta
- **Componente:** `GrupoDeOpcoes, LinhaDeInterruptor` em `src/app/components/ui/grupo-de-opcoes.tsx`
- **Data:** 2026-11-27
- **Branch:** `claude/componentes-novos`
- **Documentação:** Campos e formulários › Grupo de opções (`campos#grupo-de-opcoes`)

## Motivo
fieldsets e linhas com Switch montados à mão no produto.

## Tela de origem
Produto FindLook: ListaDeLojas (filtros), FichaDaLoja (classificação), ConferenciaDaLoja.

## API
GrupoDeOpcoes: `titulo`, `ajuda`, `erro`, `disposicao` (lista/chips), `separado`. LinhaDeInterruptor: `rotulo`, `ajuda` e as props do Switch (checked, onCheckedChange, disabled).

## Variações e estados
Chips em duas colunas no celular. Interruptor com o desenho do Switch e área de 44 px; o nome também liga e desliga; hover cinza na linha, sem cantos.

## Acessibilidade
fieldset/legend; switch com nome (rótulo) e descrição (ajuda).

## Testes
`pnpm build` e `pnpm catalogo:check`; checagem de tipos com React 19 (tipos do produto); navegador (Playwright) em 390, 768, 1024 e 1280 px: sem erros no console, sem rolagem lateral; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e a auditoria de alinhamento (`auditoria-ds/auditar.cjs`) sem itens de severidade alta ou média nas páginas novas.

## Capturas
Pasta de capturas da sessão: `novos-shots/` (página inteira em 390, 768, 1024 e 1280 px).
