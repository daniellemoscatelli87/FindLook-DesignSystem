# Cabeçalho do site e menu do celular

- **Status:** proposta
- **Componente:** `CabecalhoDoSite, MenuDoCelular, useRolagemDoCabecalho` em `src/app/components/ui/cabecalho-do-site.tsx`
- **Data:** 2026-11-27
- **Branch:** `claude/componentes-novos`
- **Documentação:** Moldura do site › Cabeçalho e menu do celular (`site#site-cabecalho`)

## Motivo
O padrão Header e menus só existia como demonstração; o produto copiou o padrão à mão em `site/Cabecalho.tsx`, com sombras em `style`, cores `rgb()`, raios e textos fora da escala.

## Tela de origem
Produto FindLook, `src/components/site/Cabecalho.tsx` (página inicial, página do lojista, termos, privacidade, busca).

## API
`links` ({ rotulo, href, atual }), `acaoSecundaria` e `acaoPrincipal` ({ rotulo, href, icone }), `logoHref`, `comoLink` (Link do Next.js), `superficie` (clara/escura), `transparenteNoTopo`, `iconeAoRolar`, `someAoRolar`, `telaLarga` (lg/xl), `posicao` (sticky/fixed), `raiz`, `containerDoMenu`. `MenuDoCelular` (aberto, onAbertoChange, links, ações) pode ser usado sozinho.

## Variações e estados
Transparente no topo da capa; sólido ao rolar (card a 85% com desfoque, borda e --shadow-sm); logo vira o símbolo; some ao descer e volta ao subir ou com foco do teclado. Link atual no rosa do selecionado; hover cinza. Pílulas de contorno e preenchida (Button). Celular: botão Menu de 44 px e folha inferior (Drawer do DS) com links de 48 px e as duas ações lado a lado.

## Acessibilidade
aria-current no link atual; nav com nome; a folha fecha com Esc, fundo, arrasto e ao escolher um link, e devolve o foco; menos movimento: troca sem transição; alvos de 44 px no celular.

## Testes
`pnpm build` e `pnpm catalogo:check`; checagem de tipos com React 19 (tipos do produto); navegador (Playwright) em 390, 768, 1024 e 1280 px: sem erros no console, sem rolagem lateral; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e a auditoria de alinhamento (`auditoria-ds/auditar.cjs`) sem itens de severidade alta ou média nas páginas novas.

## Capturas
Pasta de capturas da sessão: `novos-shots/` (página inteira em 390, 768, 1024 e 1280 px).
