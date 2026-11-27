# Tabela adaptável e barra de ferramentas

- **Status:** proposta
- **Componente:** `TabelaAdaptavel, BarraDeFerramentasDaTabela` em `src/app/components/ui/tabela-adaptavel.tsx`
- **Data:** 2026-11-27
- **Branch:** `claude/componentes-novos`
- **Documentação:** Quadro, conversa e tabela › Tabela adaptável (`painel-e-admin#tabela-adaptavel`)

## Motivo
A tabela que vira lista só existia como demonstração (TabelaQueQuebra) e o produto mede colunas à mão em `ListaDeLojas.tsx`.

## Tela de origem
Produto FindLook, `admin/ListaDeLojas.tsx`; DS: Gráficos (TabelaQueQuebra, agora usa o componente).

## API
Mesmos nomes do DS Dani Moscatelli: `colunas` (ColunaDaTabela: id, titulo, celula, prioridade, alinhar, principal, ordenavel, valorParaOrdenar), `linhas`, `chave`, `legenda`, `mostrarLegenda`, `acoes`, `vazio`, `ordemInicial`, `textos`. A mais no FindLook: `largura` por coluna (a tabela mede o espaço), `selecionadas`/`onSelecionadasChange`, `ordem`/`onOrdenar` (controlada) e `larguraDaLista`.

## Variações e estados
Colunas que cabem por prioridade com aviso das que ficaram de fora; lista abaixo de 600 px; seleção no --primary-suave; hover --row-hover de ponta a ponta.

## Acessibilidade
caption; aria-sort; caixa de seleção de 44 px no toque; sem rolagem lateral.

## Testes
`pnpm build` e `pnpm catalogo:check`; checagem de tipos com React 19 (tipos do produto); navegador (Playwright) em 390, 768, 1024 e 1280 px: sem erros no console, sem rolagem lateral; `todas-paginas.js`, `quebras-paginas.js`, `grid-colunas-check.cjs`, `cards-altura-check.cjs` e a auditoria de alinhamento (`auditoria-ds/auditar.cjs`) sem itens de severidade alta ou média nas páginas novas.

## Capturas
Pasta de capturas da sessão: `novos-shots/` (página inteira em 390, 768, 1024 e 1280 px).
