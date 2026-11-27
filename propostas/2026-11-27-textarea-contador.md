# Contador de caracteres no Textarea

- **Status:** proposta
- **Componente:** `Textarea (prop contador)` em `src/app/components/ui/textarea.tsx`
- **Data:** 2026-11-27
- **Branch:** `claude/componentes-novos`
- **Documentação:** Campos e formulários › Texto longo com contador (`campos#campo-texto-longo`)

## Motivo
Pedido do inventário do produto (descrições de peças e mensagens).

## Tela de origem
Produto FindLook (painel do lojista › Peças).

## API
`contador` com `maxLength`.

## Variações e estados
"53 de 120" embaixo, alinhado à borda do campo; aviso com 10% restantes; erro no limite.

## Acessibilidade
Aviso para leitores de tela só com 20 caracteres ou menos; limite descrito por aria-describedby.

## Testes
`pnpm build` e `pnpm catalogo:check`; checagem de tipos com React 19 (tipos do produto); navegador (Playwright) em 390, 768, 1024 e 1280 px: sem erros no console, sem rolagem lateral; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e a auditoria de alinhamento (`auditoria-ds/auditar.cjs`) sem itens de severidade alta ou média nas páginas novas.

## Capturas
Pasta de capturas da sessão: `novos-shots/` (página inteira em 390, 768, 1024 e 1280 px).
