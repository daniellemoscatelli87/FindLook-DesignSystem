# Título de grupo

- **Status:** proposta
- **Componente:** `TituloDeGrupo` em `src/app/components/ui/titulo-de-grupo.tsx`
- **Data:** 2026-11-27
- **Branch:** `claude/componentes-novos`
- **Documentação:** Chips e estados › Título de grupo (`chips-e-estados#avaliacao-e-grupos`)

## Motivo
Três cópias no produto (Agenda, Kanbans, Inteligência).

## Tela de origem
Produto FindLook: `admin/Agenda.tsx`, `Kanbans.tsx`, `InteligenciaLojas.tsx`.

## API
`titulo`, `quantidade`, `icone`, `item`/`itens`, `nivel`, `acao`.

## Variações e estados
Contador em pílula cinza; ação logo depois do contador.

## Acessibilidade
Título de verdade; contagem lida com o nome do item.

## Testes
`pnpm build` e `pnpm catalogo:check`; checagem de tipos com React 19 (tipos do produto); navegador (Playwright) em 390, 768, 1024 e 1280 px: sem erros no console, sem rolagem lateral; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e a auditoria de alinhamento (`auditoria-ds/auditar.cjs`) sem itens de severidade alta ou média nas páginas novas.

## Capturas
Pasta de capturas da sessão: `novos-shots/` (página inteira em 390, 768, 1024 e 1280 px).
