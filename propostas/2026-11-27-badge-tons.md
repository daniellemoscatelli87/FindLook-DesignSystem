# Tons do Badge e do IconeComBase

- **Status:** proposta
- **Componente:** `Badge (variantes marca, neutro, sucesso, aviso, erro, info) e IconeComBase (tons sucesso, aviso, erro, info)` em `src/app/components/ui/badge.tsx e painel-dados.tsx`
- **Data:** 2026-11-27
- **Branch:** `claude/componentes-novos`
- **Documentação:** Chips e estados › Etiquetas e bases por tom (`chips-e-estados#etiquetas-tons`)

## Motivo
O produto monta a Etiqueta à mão (raio de 6 px, 11 px); o IconeComBase só tinha marca e neutro.

## Tela de origem
Produto FindLook, `admin/comum.tsx` (Etiqueta, EtiquetasDaLoja).

## API
Badge `variant`; IconeComBase `tom`.

## Variações e estados
Etiqueta retangular para atributos (diferente do chip, que diz o estado).

## Acessibilidade
Mesmos contrastes do ChipDeEstado.

## Testes
`pnpm build` e `pnpm catalogo:check`; checagem de tipos com React 19 (tipos do produto); navegador (Playwright) em 390, 768, 1024 e 1280 px: sem erros no console, sem rolagem lateral; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e a auditoria de alinhamento (`auditoria-ds/auditar.cjs`) sem itens de severidade alta ou média nas páginas novas.

## Capturas
Pasta de capturas da sessão: `novos-shots/` (página inteira em 390, 768, 1024 e 1280 px).
