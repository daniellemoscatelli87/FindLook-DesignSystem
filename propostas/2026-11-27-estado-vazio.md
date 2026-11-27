# Estado vazio

- **Status:** proposta
- **Componente:** `EstadoVazio` em `src/app/components/ui/estado-vazio.tsx`
- **Data:** 2026-11-27
- **Branch:** `claude/componentes-novos`
- **Documentação:** Chips e estados › Estado vazio (`chips-e-estados#estado-vazio`)

## Motivo
Só existia em demonstrações (Rótulos › Estados vazios, Usabilidade, Ilustrações); o produto tem `Vazio` e 12 cópias tracejadas.

## Tela de origem
Produto FindLook, `admin/comum.tsx` (Vazio) e listas do painel.

## API
`titulo`, `texto`, `ilustracao`, `icone`, `tom`, `acao`, `variante` (tracejado/card/simples), `tamanho` (sm/md), `nivel`.

## Variações e estados
Centralizado, entrada suave; as demonstrações de Rótulos, Usabilidade e Ilustrações passaram a usá-lo.

## Acessibilidade
Ilustração decorativa (alt vazio); título como parágrafo ou título de verdade.

## Testes
`pnpm build` e `pnpm catalogo:check`; checagem de tipos com React 19 (tipos do produto); navegador (Playwright) em 390, 768, 1024 e 1280 px: sem erros no console, sem rolagem lateral; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e a auditoria de alinhamento (`auditoria-ds/auditar.cjs`) sem itens de severidade alta ou média nas páginas novas.

## Capturas
Pasta de capturas da sessão: `novos-shots/` (página inteira em 390, 768, 1024 e 1280 px).
