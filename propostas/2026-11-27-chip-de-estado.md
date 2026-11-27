# Chip de estado

- **Status:** proposta
- **Componente:** `ChipDeEstado` em `src/app/components/ui/chip-de-estado.tsx`
- **Data:** 2026-11-27
- **Branch:** `claude/componentes-novos`
- **Documentação:** Chips e estados › Chip de estado (`chips-e-estados#chip-de-estado`)

## Motivo
Seis cópias no produto (situação, etapa, peça, cadastro). O DS Dani Moscatelli já tinha o componente: mesma API.

## Tela de origem
Produto FindLook: `admin/comum.tsx`, `LojasParceiras.tsx`, `painel/ChipDaPeca.tsx`.

## API
`tom` (marca/neutro/sucesso/info/aviso/erro), `icone`, `tamanho` (sm/md), `children` (texto obrigatório).

## Variações e estados
Pílula com a tinta do tom.

## Acessibilidade
Contraste de 4,9:1 a 19:1 (aviso com 15% de --foreground: 5,6:1); estado nunca só por cor.

## Testes
`pnpm build` e `pnpm catalogo:check`; checagem de tipos com React 19 (tipos do produto); navegador (Playwright) em 390, 768, 1024 e 1280 px: sem erros no console, sem rolagem lateral; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e a auditoria de alinhamento (`auditoria-ds/auditar.cjs`) sem itens de severidade alta ou média nas páginas novas.

## Capturas
Pasta de capturas da sessão: `novos-shots/` (página inteira em 390, 768, 1024 e 1280 px).
