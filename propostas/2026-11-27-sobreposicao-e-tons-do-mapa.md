# Tokens --sobreposicao e --mapa-*

- **Status:** proposta
- **Tokens:** `--sobreposicao`; `--mapa-vazio`, `--mapa-1` a `--mapa-5`, `--mapa-borda`, `--mapa-escolhida` em `src/styles/theme.css`
- **Data:** 2026-11-27
- **Branch:** `claude/consistencia-final`

## Motivo
- `--sobreposicao`: cada janela tinha o seu véu (preto a 50%, grafite a 40% com desfoque, a 30%). O DS Dani Moscatelli já tinha o token com este nome; o FindLook passa a ter o mesmo, com o mesmo valor (grafite 950 a 50%, igual no tema escuro), para as duas marcas terem o mesmo véu.
- `--mapa-*`: o produto pintava o mapa de bairros com `--pink-700`, `--pink-400` e `--graphite-300`, fora da paleta de gráficos. O MapaCoropletico passa a ter 5 faixas e o estado escolhido como tokens.

## Valores (nenhuma cor nova)
`--mapa-vazio` = `--card`; `--mapa-1..5` = `--chart-7`, `--chart-6`, `--chart-4`, `--chart-2`, `--chart-1` (do cinza ao rosa); `--mapa-borda` = `--border-strong`; `--mapa-escolhida` = `--foreground` (contorno de 7 unidades). `faixaDoMapa(n, maximo)` diz a faixa de um valor, para a lista ao lado do mapa usar o mesmo sinal.

## Acessibilidade
A cor nunca é a única pista: cada região tem o número na dica e na lista ao lado; a escolhida tem contorno grosso em --foreground.

## Testes
`pnpm build`, `pnpm catalogo:check`, páginas de gráficos e sobreposições no navegador (390 e 1280 px) sem erro.
