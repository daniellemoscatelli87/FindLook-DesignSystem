# Cartão de escolha

- **Status:** proposta
- **Componente:** `CartaoDeEscolha` e `GrupoDeCartoesDeEscolha` em `src/app/components/ui/cartao-de-escolha.tsx`
- **Data:** 2026-11-27
- **Branch:** `claude/correcoes-revisao` (correções da revisão das telas do produto)
- **Documentação:** Controles de formulário › Cartões de escolha (`buttons#cartoes-de-escolha`)

## Motivo
O catálogo não tinha uma escolha única em cartões grandes, com ícone, título e uma frase. O mais próximo era o card selecionável de Cards › Estados (com botão "Selecionar" embaixo, feito para planos e opções com ação) e o Controle segmentado (opções de uma ou duas palavras). Por isso o cadastro do produto montou o cartão à mão, juntando Card, rádio, BrilhoDeSelecionado e IconeComBase.

## Tela de origem
Produto FindLook, página `/cadastrar/`, pergunta "Como você vai usar a FindLook?" (Quero encontrar peças · Tenho uma loja ou brechó), na revisão das telas de 27/11/2026.

## API
- `GrupoDeCartoesDeEscolha`: as props do `RadioGroup` (`value`, `defaultValue`, `onValueChange`, `name`, `required`, `disabled`, `aria-labelledby`…) e `colunas` (1, padrão, um por linha; 2, dois lado a lado quando o grupo tem 448 px ou mais).
- `CartaoDeEscolha`: `valor`, `titulo`, `descricao` (opcional), `icone` (ícone lucide, opcional), `desabilitado`, `id` (do rádio, para levar o foco a ele) e `className`.

```tsx
<p id="pergunta">Como você vai usar a FindLook?</p>
<GrupoDeCartoesDeEscolha aria-labelledby="pergunta" value={perfil} onValueChange={setPerfil}>
  <CartaoDeEscolha valor="consumidor" icone={<Search />} titulo="Quero encontrar peças" descricao="Buscar, salvar e seguir lojas" />
  <CartaoDeEscolha valor="lojista" icone={<Store />} titulo="Tenho uma loja ou brechó" descricao="Mostrar meu catálogo" />
</GrupoDeCartoesDeEscolha>
```

## Variações e estados
- Parado: card branco (`Card`), borda neutra de 2 px, ícone na base cinza (`IconeComBase` tom "neutro"), rádio vazio à direita.
- Hover: a borda escurece (`--border-strong`), como em Cards › Estados.
- Foco (teclado): anel de foco em volta do cartão inteiro.
- Escolhido: borda de 2 px na primária com o `BrilhoDeSelecionado` (parado com "menos movimento"), ícone na base rosa (tom "marca") e rádio marcado. O card continua branco.
- Apertado: encolhe 0,5% (só sem "menos movimento").
- Desabilitado: fundo e texto de desabilitado (`--disabled`, `--disabled-foreground`), ícone na base cinza; a descrição diz por que está indisponível.
- Um por linha (padrão) ou dois lado a lado (`colunas={2}`, número par de opções).
- A borda vem da nova `molduraDoSelecionavel` (ui/shine-border), a mesma de Cards › Estados e do `CardDePreco` selecionado.

## Acessibilidade
- Grupo de rádios de verdade (`RadioGroup` do DS): setas do teclado trocam a opção; Tab entra e sai do grupo.
- O cartão inteiro é o rótulo do rádio (clique em qualquer ponto). O nome lido é só o título (`aria-labelledby`) e a frase é a descrição (`aria-describedby`).
- O grupo recebe o nome da pergunta (`aria-labelledby`).
- A escolha nunca é só cor: borda, ícone e rádio mudam juntos.
- Contraste: título em --foreground (21:1 no branco), descrição em --muted-foreground (5,4:1), ícone rosa --primary-text na base --primary-muted (5,2:1).

## Testes
- `pnpm build` e `pnpm catalogo:check`.
- Navegador (Playwright), 1280 e 390 px: clique no cartão escolhe; seta para baixo leva a escolha à próxima opção; o grupo de duas colunas vira uma coluna no celular; nenhum erro no console; todas as páginas sem rolagem horizontal.

## Capturas
- `correcoes-fl-cartoes-de-escolha-1280.png`, `correcoes-fl-cartoes-de-escolha-390.png`, `correcoes-fl-cartoes-de-escolha-foco-1280.png`, `correcoes-fl-cartoes-de-escolha-foco-390.png` (pasta de capturas da sessão).
