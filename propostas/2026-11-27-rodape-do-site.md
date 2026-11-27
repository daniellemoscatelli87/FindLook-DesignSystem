# Rodapé do site

- **Status:** proposta
- **Componente:** `RodapeDoSite` em `src/app/components/ui/rodape-do-site.tsx`
- **Data:** 2026-11-27
- **Branch:** `claude/componentes-novos`
- **Documentação:** Moldura do site › Rodapé do site (`site#site-rodape`)

## Motivo
O rodapé do protótipo só existia no produto (`site/Rodape.tsx`), com fundo rosa, textos de 24/20 px soltos e `tracking` arbitrário.

## Tela de origem
Produto FindLook, `src/components/site/Rodape.tsx` (consumidor e lojista).

## API
`marca` ({ slogan, texto, complemento }), `superficie`, `logoHref`, `colunas` ([{ titulo, links }]), `convite` ({ selo, titulo, texto, acao }), `faixa` ({ icone, titulo, texto, link }), `linhaFinal`, `creditos` ({ links, autoria }), `comoLink`.

## Variações e estados
Fundo do card com borda em cima. Colunas de links em duas colunas no celular. Convite em Card só de borda com divisor e botão embaixo à direita. Faixa com IconeComBase marca; o link desce para a coluna do texto no celular. Links sem href viram texto.

## Acessibilidade
Cada coluna é um nav com o nome do grupo; links externos avisam que abrem em nova aba; créditos em linha de texto.

## Testes
`pnpm build` e `pnpm catalogo:check`; checagem de tipos com React 19 (tipos do produto); navegador (Playwright) em 390, 768, 1024 e 1280 px: sem erros no console, sem rolagem lateral; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e a auditoria de alinhamento (`auditoria-ds/auditar.cjs`) sem itens de severidade alta ou média nas páginas novas.

## Capturas
Pasta de capturas da sessão: `novos-shots/` (página inteira em 390, 768, 1024 e 1280 px).
