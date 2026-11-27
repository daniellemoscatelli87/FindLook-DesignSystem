# Campo de busca

- **Status:** proposta
- **Componente:** `CampoDeBusca` em `src/app/components/ui/campo-de-busca.tsx`
- **Data:** 2026-11-27
- **Branch:** `claude/componentes-novos`
- **Documentação:** Campos e formulários › Campo de busca (`campos#campo-de-busca`)

## Motivo
Seis cópias no produto, com raios de 9/10 px e alturas de 40/44 px.

## Tela de origem
Produto FindLook: ListaDeLojas, LojasParceiras, Pecas, FichaDaLoja, Agenda.

## API
`rotulo`, `rotuloVisivel`, `valor`, `onValorChange`, `rotuloLimpar`, `classeDoBloco` e as props do Input.

## Variações e estados
Lupa à esquerda; Limpar aparece com texto (entrada suave); Esc limpa.

## Acessibilidade
Rótulo sempre presente (escondido por padrão); Limpar com nome e 44 px; foco volta ao campo.

## Testes
`pnpm build` e `pnpm catalogo:check`; checagem de tipos com React 19 (tipos do produto); navegador (Playwright) em 390, 768, 1024 e 1280 px: sem erros no console, sem rolagem lateral; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e a auditoria de alinhamento (`auditoria-ds/auditar.cjs`) sem itens de severidade alta ou média nas páginas novas.

## Capturas
Pasta de capturas da sessão: `novos-shots/` (página inteira em 390, 768, 1024 e 1280 px).
