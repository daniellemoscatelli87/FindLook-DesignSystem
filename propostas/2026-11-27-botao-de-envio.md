# Botão de envio

- **Status:** proposta
- **Componente:** `BotaoDeEnvio, useEstadoDoEnvio` em `src/app/components/ui/botao-de-envio.tsx`
- **Data:** 2026-11-27
- **Branch:** `claude/componentes-novos`
- **Documentação:** Campos e formulários › Botão de envio (`campos#botao-de-envio`)

## Motivo
O produto repete à mão o ciclo carregando → check → volta (por exemplo, "Salvar porta aberta" na ficha da loja). Mesmo nome e API do BotaoDeEnvio do DS Dani Moscatelli; feito sobre o Button, sem mexer nele.

## Tela de origem
Produto FindLook, `admin/ConferenciaDaLoja.tsx` e regra de interação da dona do produto (17/11/2026).

## API
Props do Button mais `estado` (parado/enviando/feito/erro), `textos` ({ enviando, feito, erro }), `icone`, `voltarApos` (2400 ms) e `onVoltar`. A mais no FindLook: `useEstadoDoEnvio(acao)` → { estado, enviar, voltar }.

## Variações e estados
Largura fixa entre os estados; ocupado enviando; feito no verde de sucesso com o check; erro vira Tentar de novo.

## Acessibilidade
aria-busy; mudança anunciada; giro parado com menos movimento.

## Testes
`pnpm build` e `pnpm catalogo:check`; checagem de tipos com React 19 (tipos do produto); navegador (Playwright) em 390, 768, 1024 e 1280 px: sem erros no console, sem rolagem lateral; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e a auditoria de alinhamento (`auditoria-ds/auditar.cjs`) sem itens de severidade alta ou média nas páginas novas.

## Capturas
Pasta de capturas da sessão: `novos-shots/` (página inteira em 390, 768, 1024 e 1280 px).
