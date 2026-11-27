# Moldura das telas de conta

- **Status:** proposta
- **Componente:** `MolduraDeConta` em `src/app/components/ui/moldura-de-conta.tsx`
- **Data:** 2026-11-27
- **Branch:** `claude/componentes-novos`
- **Documentação:** Moldura do site › Moldura das telas de conta (`site#site-conta`)

## Motivo
As telas de conta do produto usam `TelaConta` feita à mão (card com sombra sobre cinza); o DS só tinha o template Entrar e criar conta, sem componente.

## Tela de origem
Produto FindLook, `src/components/conta/Formulario.tsx` (TelaConta) e as telas /entrar/, /cadastrar/, /recuperar-acesso/, /redefinir-senha/, /conta/, /admin/entrar/.

## API
`titulo`, `explicacao`, `children`, `rodape`, `lateral` (coluna da marca do 768 px em diante), `logoHref`, `voltar` ({ rotulo, href } ou false), `comoLink`, `altura` (tela/conteudo), `idDoConteudo`.

## Variações e estados
Fundo --muted; logo e Voltar ao início no topo; card só de borda (sem sombra) com h1 de 24 px; entrada suave do card (parada com menos movimento). O template Entrar e criar conta passou a usar este componente.

## Acessibilidade
main com id para o Pular para o conteúdo; h1 único; link de voltar com 44 px no toque.

## Testes
`pnpm build` e `pnpm catalogo:check`; checagem de tipos com React 19 (tipos do produto); navegador (Playwright) em 390, 768, 1024 e 1280 px: sem erros no console, sem rolagem lateral; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e a auditoria de alinhamento (`auditoria-ds/auditar.cjs`) sem itens de severidade alta ou média nas páginas novas.

## Capturas
Pasta de capturas da sessão: `novos-shots/` (página inteira em 390, 768, 1024 e 1280 px).
