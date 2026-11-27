# Caixa de código

- **Status:** proposta
- **Componente:** `CaixaDeCodigo` em `src/app/components/ui/caixa-de-codigo.tsx`
- **Data:** 2026-11-27
- **Branch:** `claude/componentes-novos`
- **Documentação:** Campos e formulários › Caixa de código (`campos#caixa-de-codigo`)

## Motivo
Duas cópias no produto, com textos de 24/22 px e tracking soltos.

## Tela de origem
Produto FindLook: `painel/WhatsappDaLoja.tsx` e `admin/SimuladorWhatsapp.tsx`.

## API
`codigo`, `instrucao`, `validade`, `copiar` (true ou textos), `acoes`.

## Variações e estados
Código grande sobre --primary-muted; Copiar vira Copiado por 2 s; entrada suave.

## Acessibilidade
Cópia anunciada; ações numa linha alinhadas ao texto.

## Testes
`pnpm build` e `pnpm catalogo:check`; checagem de tipos com React 19 (tipos do produto); navegador (Playwright) em 390, 768, 1024 e 1280 px: sem erros no console, sem rolagem lateral; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e a auditoria de alinhamento (`auditoria-ds/auditar.cjs`) sem itens de severidade alta ou média nas páginas novas.

## Capturas
Pasta de capturas da sessão: `novos-shots/` (página inteira em 390, 768, 1024 e 1280 px).
