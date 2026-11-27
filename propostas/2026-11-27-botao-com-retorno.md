# Botão com retorno

- **Status:** proposta
- **Componente:** `BotaoComRetorno, useRetornoDoBotao` em `src/app/components/ui/botao-com-retorno.tsx`
- **Data:** 2026-11-27
- **Branch:** `claude/componentes-novos`
- **Documentação:** Campos e formulários › Botão com retorno (`campos#botao-com-retorno`)

## Motivo
O produto repete à mão o ciclo carregando → check → volta (por exemplo, "Salvar porta aberta" na ficha da loja). Feito como componente à parte, sobre o Button, para não mexer no Button.

## Tela de origem
Produto FindLook, `admin/ConferenciaDaLoja.tsx` e regra de interação da dona do produto (17/11/2026).

## API
Props do Button mais `estado` (parado/carregando/sucesso/erro), `icone`, `textoCarregando`, `textoSucesso`, `textoErro`. Hook `useRetornoDoBotao(acao)` → { estado, executar }.

## Variações e estados
Largura fixa entre os estados; desabilitado carregando; sucesso 2 s, erro 2,5 s.

## Acessibilidade
Mudança anunciada (região viva fora do botão); spinner parado com menos movimento.

## Testes
`pnpm build` e `pnpm catalogo:check`; checagem de tipos com React 19 (tipos do produto); navegador (Playwright) em 390, 768, 1024 e 1280 px: sem erros no console, sem rolagem lateral; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e a auditoria de alinhamento (`auditoria-ds/auditar.cjs`) sem itens de severidade alta ou média nas páginas novas.

## Capturas
Pasta de capturas da sessão: `novos-shots/` (página inteira em 390, 768, 1024 e 1280 px).
