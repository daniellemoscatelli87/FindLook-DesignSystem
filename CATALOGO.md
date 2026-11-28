# Catálogo do FindLook Design System

> Gerado automaticamente por `scripts/gerar-catalogo.mjs` a cada `pnpm build`. **Não edite à mão**: mude o código e rode o build (ou `node scripts/gerar-catalogo.mjs`). `node scripts/gerar-catalogo.mjs --check` falha se este arquivo estiver desatualizado. Versão para programas: [`catalogo.json`](catalogo.json).

**A regra:** antes de criar ou alterar qualquer elemento visual (inclusive páginas de demonstração e templates), consulte este catálogo e use o componente, template ou padrão que já existe; não recrie à mão. Peça nova nasce em `src/app/components/ui/` pelo processo de `propostas/README.md`.

**Resumo:** 125 arquivos de componentes em `src/app/components/ui/` com 461 componentes exportados · 88 templates e padrões ainda só em demonstração · 50 seções com marcação feita à mão · 179 tokens · 37 páginas e 270 âncoras no site (https://designsystem.findlook.com.br) · 37 propostas de componente.

Como procurar: use a busca do editor (Ctrl+F) pelo que a tela precisa (por exemplo "plano", "preço", "card", "alerta", "tabela", "chip"). "Onde ver" leva à página do site e à âncora da seção (`página#âncora`); no site, abra a página pelo menu e a seção pelo submenu.

## Sumário

1. [Componentes importáveis](#1-componentes-importáveis)
2. [Padrões ainda só em demonstração (não importáveis)](#2-padrões-ainda-só-em-demonstração-não-importáveis)
3. [Tokens](#3-tokens)
4. [Regras de uso](#4-regras-de-uso)
5. [Propostas de componente](#5-propostas-de-componente)
6. [Páginas e âncoras do site](#6-páginas-e-âncoras-do-site)

## 1. Componentes importáveis

Tudo o que está em `src/app/components/ui/`. Dentro do design system, importe de `../ui/<arquivo>` (ou `@/app/components/ui/<arquivo>`). No produto, use a cópia que chega pela sincronização do design system (`design-system/arquivos.txt` do produto), nunca uma cópia feita à mão.

### accordion

- **Arquivo:** [src/app/components/ui/accordion.tsx](src/app/components/ui/accordion.tsx)
- **Quando usar:** Seções que abrem e fecham pelo título; uma ou várias abertas ao mesmo tempo.
- **Componentes:**
  - `Accordion`
  - `AccordionItem` (props: `className`)
  - `AccordionTrigger` (props: `className`, `children`, `semIcone`)
  - `AccordionContent` (props: `className`, `classeDaRegiao`, `manterNoHtml`, `children`): AccordionContent (a resposta que abre e fecha) - `className` vai para o bloco de dentro (o texto, com o respiro de baixo pb-4): é onde você muda respiro, cor e tamanho do texto.
- **Onde ver:** Sobreposições (overlays) › Sanfona (accordion) (`overlays#accordion`) · Templates › Landing page para lojistas (`templates#template-landing`)

### alert

- **Arquivo:** [src/app/components/ui/alert.tsx](src/app/components/ui/alert.tsx)
- **Quando usar:** Alerta (padrão de todos os alertas, decisão da dona do produto de 23/11/2026): Mesma aparência do Alerta com ação (ui/alerta-com-acao): cantos de 16 px, respiro de 20 × 22 px, borda na cor do estado a 22%, fundo do card com a cor do estado a 7% (9% no aviso), o svg filho vira o ícone com base (caixa de 44 px, cantos --radius-md, base na cor do estado a 18% ou 30% no aviso, ícone de 20 px na cor de ícone do estado), …
- **Componentes:**
  - `Alert` (props: `className`, `variant`, `tom`, `icone`, `children`)
  - `AlertTitle` (props: `className`)
  - `AlertDescription` (props: `className`)
- **Variantes:** `variant` = `destructive` · `success` · `info` · `warning` · `error`
- **Onde ver:** Feedback › Alertas (`feedback#alerts`) · Feedback › Alerta só com descrição (`feedback#alerta-sem-titulo`) · Chips e estados › Alerta com tom (`chips-e-estados#alerta-tom`) · e mais 2 seções (ver `catalogo.json`)

### alert-dialog

- **Arquivo:** [src/app/components/ui/alert-dialog.tsx](src/app/components/ui/alert-dialog.tsx)
- **Quando usar:** Diálogo de confirmação para ações importantes ou destrutivas; exige uma resposta.
- **Componentes:**
  - `AlertDialog`
  - `AlertDialogTrigger`
  - `AlertDialogPortal`
  - `AlertDialogOverlay` (props: `className`)
  - `AlertDialogContent` (props: `className`)
  - `AlertDialogHeader` (props: `className`)
  - `AlertDialogFooter` (props: `className`)
  - `AlertDialogTitle` (props: `className`)
  - `AlertDialogDescription` (props: `className`)
  - `AlertDialogAction` (props: `className`)
  - `AlertDialogCancel` (props: `className`)
- **Onde ver:** Sobreposições (overlays) (`overlays`, fora das seções)

### alerta-com-acao

- **Arquivo:** [src/app/components/ui/alerta-com-acao.tsx](src/app/components/ui/alerta-com-acao.tsx)
- **Quando usar:** Alerta com ação (aprovado pela dona do produto em 23/11/2026): Aviso que pede uma ação de quem lê: ícone com base, título, descrição (com nota opcional) e, embaixo do texto, uma ação principal de contorno (BotaoDoAlerta) e, se precisar, uma secundária em forma de link (LinkDoAlerta). Regras: - as ações ficam sempre embaixo do texto, nunca ao lado; - uma só ação principal, de contorno (sem preenchimento);
- **Componentes:**
  - `AlertaComAcao` (props: `tom`, `titulo`, `icone`, `acoes`, `onFechar`, `rotuloFechar`, `className`, `children`)
  - `BotaoDoAlerta` (props: `tom`, `asChild`, `className`): Ação principal do alerta: só contorno, na cor do estado; texto e ícone na cor de texto do estado.
  - `LinkDoAlerta` (props: `asChild`, `className`): Ação secundária do alerta: botão com cara de link, sublinhado, em --foreground.
- **Funções e constantes:** `variaveisDoAlerta`
- **Variantes:** `tom` = `info` · `sucesso` · `aviso` · `erro`
- **Onde ver:** Feedback › Alerta com ação (`feedback#alerta-com-acao`) · Rótulos (`badges`, fora das seções)

### aspect-ratio

- **Arquivo:** [src/app/components/ui/aspect-ratio.tsx](src/app/components/ui/aspect-ratio.tsx)
- **Quando usar:** Mantém imagem ou vídeo numa proporção fixa (por exemplo 4:5).
- **Componentes:**
  - `AspectRatio`
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### avaliacao

- **Arquivo:** [src/app/components/ui/avaliacao.tsx](src/app/components/ui/avaliacao.tsx)
- **Quando usar:** Avaliação: a nota de uma loja com a estrela e, ao lado, o número de avaliações entre parênteses ("★ 4,6 (128)"). Nota com uma casa decimal e vírgula; número de avaliações no formato pt-BR. Sem nota, mostra "Sem nota" em cinza (nunca um zero). A estrela é decorativa; os leitores de tela ouvem "Nota 4,6 de 5, 128 avaliações" e, com `fonte`, de onde veio a nota ("informada na ficha").
- **Componentes:**
  - `Avaliacao` (props: `nota`, `total`, `fonte`, `tamanho`, `className`)
- **Onde ver:** Chips e estados › Avaliação e título de grupo (`chips-e-estados#avaliacao-e-grupos`) · Quadro, conversa e tabela › Quadro (kanban) (`painel-e-admin#quadro`)

### avatar

- **Arquivo:** [src/app/components/ui/avatar.tsx](src/app/components/ui/avatar.tsx)
- **Quando usar:** Foto ou iniciais de uma pessoa ou loja.
- **Componentes:**
  - `Avatar` (props: `className`)
  - `AvatarImage` (props: `className`)
  - `AvatarFallback` (props: `className`)
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### avatar-circles

- **Arquivo:** [src/app/components/ui/avatar-circles.tsx](src/app/components/ui/avatar-circles.tsx)
- **Quando usar:** AvatarCircles — portado do Magic UI (magicui.design/docs/components/avatar-circles).
- **Componentes:**
  - `AvatarCircles` (props: `numPeople`, `className`, `avatarUrls`, `moreHref`, `size`, `decorativo`)
- **Onde ver:** Rótulos › Círculos de avatares (`badges#avatar-circles`) · Cards › Vidro com conteúdo (`cards#card-glass-conteudo`) · Feedback › Avatares de enfeite (`feedback#avatar-decorativo`)

### badge

- **Arquivo:** [src/app/components/ui/badge.tsx](src/app/components/ui/badge.tsx)
- **Quando usar:** Rótulo curto de status ou categoria.
- **Componentes:**
  - `Badge` (props: `className`, `variant`, `asChild`): forwardRef (28/11/2026): funciona como filho de um Radix com asChild (TooltipTrigger, PopoverTrigger).
- **Funções e constantes:** `badgeVariants`
- **Variantes:** `variant` = `default` · `secondary` · `destructive` · `outline` · `neutro` · `sucesso` · `aviso` · `erro` · `info`
- **Onde ver:** Chips e estados › Etiquetas e bases por tom (`chips-e-estados#etiquetas-tons`) · Fundos › Gradiente animado (`backgrounds#gradient-anim-bg`) · Cards › Mesma altura ou um por linha (`cards#card-mesma-altura`) · e mais 1 seções (ver `catalogo.json`)

### barra-fixa-celular

- **Arquivo:** [src/app/components/ui/barra-fixa-celular.tsx](src/app/components/ui/barra-fixa-celular.tsx)
- **Quando usar:** Barra de ação fixa do celular (FindLook): Botão em pílula, 56 px, preso na base da tela, sobre um degradê do fundo, que abre uma gaveta (por exemplo, "Encontrar peças" na página inicial e "Cadastrar minha loja" na página do lojista). - Só aparece abaixo de 768 px (somenteCelular); some enquanto a gaveta está aberta (oculta).
- **Componentes:**
  - `EspacoDaBarraFixa` (props: `somenteCelular`, `className`): Espaço no fim da página para a barra fixa (e o Voltar ao topo) não cobrirem o conteúdo. A BarraFixaDoCelular já o coloca sozinha; use este só quando a barra estiver com reservarEspaco={false}.
  - `BarraFixaDoCelular` (props: `icone`, `oculta`, `somenteCelular`, `reservarEspaco`, `classeDaFaixa`, `className`, `children`)
- **Onde ver:** Templates › Botões flutuantes (`templates#template-flutuantes`) · Padrões do produto › Cadastro do lojista (`produto#produto-cadastro`)

### botao-de-envio

- **Arquivo:** [src/app/components/ui/botao-de-envio.tsx](src/app/components/ui/botao-de-envio.tsx)
- **Quando usar:** BotaoDeEnvio (botão com os estados de envio): mesma API do BotaoDeEnvio do design system Dani Moscatelli. O Button do DS com o retorno de cada envio, sem mudar de tamanho: parado → "Enviando…" (girando) → "Enviado" com check → volta sozinho ao estado parado; ou "Tentar de novo" quando falha.
- **Componentes:**
  - `BotaoDeEnvio` (props: `estado`, `children`, `textos`, `icone`, `voltarApos`, `onVoltar`, `className`, `disabled`, `variant`)
- **Funções e constantes:** `useEstadoDoEnvio`
- **Onde ver:** Campos e formulários › Botão de envio (`campos#botao-de-envio`)

### breadcrumb

- **Arquivo:** [src/app/components/ui/breadcrumb.tsx](src/app/components/ui/breadcrumb.tsx)
- **Quando usar:** Trilha que mostra onde a página está na hierarquia.
- **Componentes:**
  - `Breadcrumb`
  - `BreadcrumbList` (props: `className`)
  - `BreadcrumbItem` (props: `className`)
  - `BreadcrumbLink` (props: `asChild`, `className`)
  - `BreadcrumbPage` (props: `className`)
  - `BreadcrumbSeparator` (props: `children`, `className`)
  - `BreadcrumbEllipsis` (props: `className`)
- **Onde ver:** Sobreposições (overlays) › Trilha de navegação (breadcrumb) (`overlays#breadcrumb`)

### busca-pecas

- **Arquivo:** [src/app/components/ui/busca-pecas.tsx](src/app/components/ui/busca-pecas.tsx)
- **Quando usar:** Busca de peças (FindLook): a caixa "O que você quer encontrar?" do hero da página inicial.
- **Componentes:**
  - `BuscaDePecas` (props: `variante`, `idTitulo`, `onBuscar`, `validar`, `condicaoInicial`, `maxCaracteres`, `tiposDeFoto`, `tamanhoMaximoFoto`, `elevada`, `textos`, `className`)
  - `BuscaNoCelular` (props: `aberta`, `onAbertaChange`, `somenteCelular`, `container`, `textos`, `onBuscar`): Barra fixa "Encontrar peças" que abre a busca numa gaveta inferior (celular).
- **Funções e constantes:** `textosPadraoBusca`
- **Onde ver:** Padrões do produto › Busca do hero (`produto#produto-busca`)

### button

- **Arquivo:** [src/app/components/ui/button.tsx](src/app/components/ui/button.tsx)
- **Quando usar:** Padrão único (decisão de 16/11/2026): botão de 40 px, mesma altura do campo de texto. Forma: pílula (28/11/2026). Texto no token do botão (14 px, seminegrito; escala tipográfica de 27/11/2026). No toque (celular ou tela de dedo), todo botão tem 44 px de altura (decisão de 27/11/2026); no computador com mouse, 40 px (sm: 32 px).
- **Componentes:**
  - `Button` (props: `className`, `variant`, `size`, `forma`, `quebra`, `asChild`): forwardRef (27/11/2026): com React 18, sem ele a ref do Radix (asChild em PopoverTrigger, TooltipTrigger, DropdownMenuTrigger…) se perdia no Button e o Popover ficava fora da tela (translate(0, -200%)), por exemplo o seletor de data dentro …
- **Funções e constantes:** `buttonVariants`
- **Variantes:** `variant` = `default` · `destructive` · `outline` · `ghost` · `link`; `size` = `default` · `sm` · `lg` · `icon-lg`; `forma` = `pilula` · `quadrado` · `padrao`; `quebra` = `celular` · `nunca` · `sempre`
- **Onde ver:** Botões › Variantes de botão (`buttons#buttons`) · Desenvolvimento › Consulte o catálogo antes de montar qualquer peça (`develop#dev-catalogo`) · Movimento › Presets de entrada e saída (`motion#enter-presets`) · e mais 44 seções (ver `catalogo.json`)

### cabecalho-do-site

- **Arquivo:** [src/app/components/ui/cabecalho-do-site.tsx](src/app/components/ui/cabecalho-do-site.tsx)
- **Quando usar:** CabecalhoDoSite (cabeçalho das páginas públicas + menu do celular): mesma API do CabecalhoDoSite do design system Dani Moscatelli, no modelo Faixa inteira do padrão "Header e menus" (o modelo escolhido pela dona do produto para o FindLook; a pílula flutuante do DS Dani Moscatelli não é usada aqui).
- **Componentes:**
  - `MenuDoCelular` (props: `aberto`, `onAbertoChange`, `itens`, `atual`, `acao`, `acaoSecundaria`, `comoLink`, `textos`, `container`, `retornarFocoPara`): Menu do celular em folha inferior: os itens um por linha (48 px, seta à direita; o atual no rosa do selecionado) e as ações lado a lado embaixo. Fecha com Esc, com o fundo, arrastando para baixo e ao escolher um item.
  - `CabecalhoDoSite` (props: `itens`, `atual`, `acao`, `superficie`, `esconderAoRolar`, `inicioHref`, `rotuloInicio`, `logo`, `raiz`, `posicao`, `tela`, `textos`, `className`, `acaoSecundaria`, `transparenteNoTopo`, `iconeAoRolar`, `telaLarga`, `comoLink`, `containerDoMenu`)
- **Funções e constantes:** `useRolagemDoCabecalho`
- **Onde ver:** Moldura do site › Cabeçalho e menu do celular (`site#site-cabecalho`) · Grid e espaçamento › Espaço abaixo do cabeçalho (`grid#grid-cabecalho`) · Moldura do site › Página de erro (404) (`site#site-erro`)

### cadastro-lojista

- **Arquivo:** [src/app/components/ui/cadastro-lojista.tsx](src/app/components/ui/cadastro-lojista.tsx)
- **Quando usar:** Cadastro do lojista (FindLook): 1º passo, na gaveta "Vamos apresentar sua loja?" (página do lojista): - FormularioApresentarLoja: nome da loja e e-mail, botão Continuar e "Sem fidelidade: cancele quando quiser." - GavetaApresentarLoja: a gaveta inferior com o formulário (tom escuro na página do lojista).
- **Componentes:**
  - `FormularioApresentarLoja` (props: `variante`, `idTitulo`, `valoresIniciais`, `onContinuar`, `validar`, `hrefEntrar`, `textos`, `className`)
  - `GavetaApresentarLoja` (props: `aberta`, `onAbertaChange`, `tom`, `container`, `textos`)
  - `MolduraDoCadastro` (props: `etapas`, `atual`, `concluidas`, `onIrPara`, `rotulo`, `children`, `className`)
  - `EtapaDoCadastro` (props: `titulo`, `explicacao`, `tituloRef`, `obrigatorios`, `erro`, `resumoDeErros`, `lateral`, `barra`, `onSubmit`, `children`)
  - `BarraDaEtapa` (props: `onVoltar`, `rotuloVoltar`, `rotuloContinuar`, `carregando`, `textoCarregando`, `desativado`, `descricaoDoContinuar`, `children`, `className`)
  - `LateralDaEtapa` (props: `icone`, `titulo`, `paragrafos`, `destaque`, `tom`, `iconeDestaque`, `className`)
  - `ListaDeRevisao` (props: `children`, `valoresAbertos`, `className`): Revisão
  - `BlocoDeRevisao` (props: `valor`, `titulo`, `nomeEtapa`, `resumo`, `onEditar`, `rotuloEditar`, `depois`, `children`)
  - `LinhaDeDado` (props: `rotulo`, `valor`, `vazio`, `className`)
  - `GradeDeCampos`
  - `MensagemDeErro`
  - `ResumoDeErros`
- **Funções e constantes:** `CampoDoCadastro`, `textosPadraoApresentar`, `validarApresentar`
- **Onde ver:** Padrões do produto › Cadastro do lojista (`produto#produto-cadastro`) · Campos e formulários › Campo (o campo padrão) (`campos#campo-padrao`)

### caixa-de-codigo

- **Arquivo:** [src/app/components/ui/caixa-de-codigo.tsx](src/app/components/ui/caixa-de-codigo.tsx)
- **Quando usar:** Caixa de código: um código ou mensagem curta que a pessoa precisa copiar ou enviar (o código de vínculo do WhatsApp da loja: "FINDLOOK 4821"). O código fica grande, em fonte mono e espaçado, sobre o rosa de destaque (--primary-muted, 21:1 com o texto); em cima, a instrução; embaixo, a validade (relógio + texto) e as ações, numa linha, alinhadas à borda esquerda do texto.
- **Componentes:**
  - `CaixaDeCodigo` (props: `codigo`, `instrucao`, `validade`, `copiar`, `acoes`, `className`)
- **Onde ver:** Campos e formulários › Caixa de código (`campos#caixa-de-codigo`)

### caixa-de-consentimento

- **Arquivo:** [src/app/components/ui/caixa-de-consentimento.tsx](src/app/components/ui/caixa-de-consentimento.tsx)
- **Quando usar:** CaixaDeConsentimento (28/11/2026, aprovada pela dona do produto; mesma API nos dois DS)
- **Componentes:**
  - `CaixaDeConsentimento` (props: `titulo`, `children`, `paragrafos`, `erro`, `onCheckedChange`, `onChange`, `className`, `id`, `disabled`)
- **Onde ver:** Campos e formulários › Caixa de consentimento (`campos#caixa-de-consentimento`)

### calendar

- **Arquivo:** [src/app/components/ui/calendar.tsx](src/app/components/ui/calendar.tsx)
- **Quando usar:** Calendar (seletor de data de um campo; para ver o mês com compromissos, use a AgendaDoMes)
- **Componentes:**
  - `Calendar` (props: `className`, `classNames`, `showOutsideDays`)
- **Onde ver:** Campos e formulários › Seletor de data (Calendar) (`campos#calendario`) · Sobreposições (overlays) › Diálogos (`overlays#dialogs`)

### campo

- **Arquivo:** [src/app/components/ui/campo.tsx](src/app/components/ui/campo.tsx)
- **Quando usar:** Campo (o campo padrão do formulário): rótulo, controle, ajuda e erro sempre na mesma ordem e com os mesmos vínculos de acessibilidade. Mesma API do Campo do design system Dani Moscatelli (decisão de 27/11/2026: um campo só); o CampoDoCadastro do cadastro do lojista é este mesmo componente.
- **Componentes:**
  - `Campo` (props: `rotulo`, `ajuda`, `erro`, `icone`, `obrigatorio`, `inteiro`, `depois`, `classeDoBloco`, `className`, `id`, `children`, `required`, `opcional`, `acaoDoRotulo`, `textosDaSenha`, `manterAjudaNoErro`, `type`)
  - `MensagemDeErro` (props: `id`, `children`, `className`): Texto de erro de um campo ou grupo: ícone + texto na cor de texto do erro (nunca só a cor).
  - `GradeDeCampos` (props: `children`, `className`): Grade dos campos: um por linha; dois por linha só a partir de 31rem (cada campo com 240 px ou mais).
  - `ResumoDeErros` (props: `erros`, `titulo`, `onIrPara`, `className`): Resumo dos erros (use com 2 erros ou mais): Alerta de erro com um link para cada campo.
  - `CampoDeTelefone` (props: `valor`, `onValorChange`, `placeholder`): Telefone com DDD; teclado numérico no celular.
  - `CampoDeCnpj` (props: `valor`, `onValorChange`, `placeholder`): CNPJ com a máscara; teclado numérico no celular. A validação (cnpjValido) fica a cargo do formulário.
- **Funções e constantes:** `mascaraTelefone`, `mascaraCnpj`, `cnpjValido`
- **Onde ver:** Campos e formulários › Campo (o campo padrão) (`campos#campo-padrao`) · Campos e formulários › Campo de busca (`campos#campo-de-busca`) · Campos e formulários › Texto longo com contador (`campos#campo-texto-longo`) · e mais 7 seções (ver `catalogo.json`)

### campo-de-busca

- **Arquivo:** [src/app/components/ui/campo-de-busca.tsx](src/app/components/ui/campo-de-busca.tsx)
- **Quando usar:** CampoDeBusca (buscar numa lista): mesma API nos dois DS (FindLook e Dani Moscatelli, 27/11/2026). O campo de busca das listas do painel e da administração (lojas, peças, agenda): lupa à esquerda, o texto e o botão Limpar (×) quando há texto, que devolve o foco ao campo. Enter não envia formulário; Esc limpa. Para buscar no site inteiro, use a BuscaDePecas; para os comandos do painel, o CampoDeBuscaGlobal.
- **Componentes:**
  - `CampoDeBusca` (props: `valor`, `onValorChange`, `onBusca`, `atraso`, `rotulo`, `resultados`, `textos`, `rotuloVisivel`, `placeholder`, `className`, `id`)
- **Onde ver:** Campos e formulários › Campo de busca (`campos#campo-de-busca`) · Quadro, conversa e tabela › Tabela adaptável (`painel-e-admin#tabela-adaptavel`)

### campo-de-endereco

- **Arquivo:** [src/app/components/ui/campo-de-endereco.tsx](src/app/components/ui/campo-de-endereco.tsx)
- **Quando usar:** CampoDeEndereco (endereço com sugestões): O campo de endereço que sugere enquanto a pessoa digita, como o "Presencial" do agendamento de reuniões da área restrita (que sugeria endereços do OpenStreetMap e se perdeu na versão em React). Mesmo arquivo e mesma API nos dois DS (27/11/2026).
- **Componentes:**
  - `CampoDeEndereco` (props: `valor`, `onValorChange`, `buscar`, `onEscolher`, `atraso`, `minimo`, `textos`, `icone`, `id`, `className`, `placeholder`, `disabled`, `name`, `maxLength`, `autoFocus`)
- **Funções e constantes:** `textoDaSugestao`, `enderecoDoPhoton`, `buscaNoPhoton`
- **Onde ver:** Campos e formulários › Endereço com sugestões (CampoDeEndereco) (`campos#campo-de-endereco`)

### card

- **Arquivo:** [src/app/components/ui/card.tsx](src/app/components/ui/card.tsx)
- **Quando usar:** Card vertical (padrão) ou horizontal (27/11/2026). Dentro de uma GradeDeCards que virou lista, o Card fica horizontal sozinho; a prop orientacao fixa a orientação. Horizontal: mídia ou ícone (CardMidia) à esquerda, cabeçalho e conteúdo ocupando o resto da largura e, embaixo, numa linha de largura inteira, o rodapé com o divisor do card (DivisorDoCard) e as ações no canto inferior direito ("Card com ação: divisor e …
- **Componentes:**
  - `Card` (props: `className`, `orientacao`, `children`): forwardRef (28/11/2026): o card pode ser o filho de um Radix com asChild (HoverCardTrigger, CollapsibleTrigger).
  - `CardMidia` (props: `className`, `tipo`): Mídia do card: foto (tipo="imagem", de ponta a ponta) ou ícone (tipo="icone", com o respiro do card; um ícone svg direto ganha a base rosa clara com o ícone na cor de texto da primária, o padrão dos templates do painel). Vertical: no topo.
  - `CardHeader` (props: `className`)
  - `CardTitle` (props: `className`)
  - `CardDescription` (props: `className`)
  - `CardAction` (props: `className`)
  - `CardContent` (props: `className`)
  - `CardFooter` (props: `className`, `children`): Rodapé do card. No Card horizontal, ganha o divisor do card em cima e as ações vão para o canto inferior direito.
- **Onde ver:** Cards › Como escolher (`cards#card-escolher`) · Cards › Card sólido (`cards#card-solido`) · Cards › Anatomia do card (`cards#card-anatomy`) · e mais 30 seções (ver `catalogo.json`)

### card-de-preco

- **Arquivo:** [src/app/components/ui/card-de-preco.tsx](src/app/components/ui/card-de-preco.tsx)
- **Quando usar:** Card de preço (CardDePreco), o card do template "Planos e assinatura" (Templates › Pricing), agora reaproveitável (extraído em 27/11/2026, sem mudar o visual do template).
- **Componentes:**
  - `ListaDeRecursos` (props: `recursos`, `textos`, `className`): ListaDeRecursos: a lista de recursos de um plano (incluído com check na base rosa de destaque; não incluído com traço na base cinza e o texto em cinza), a mesma do CardDePreco.
  - `CardDePreco` (props: `valor`, `nome`, `descricao`, `icone`, `destaque`, `paraQuem`, `recursos`, `recursosAbertos`, `onRecursosAbertosChange`, `preco`, `periodo`, `selecao`, `selecionado`, `onSelecionar`, `idDaAcao`, `textos`, `className`)
- **Onde ver:** Templates › Painel da loja (protótipo) (`templates#template-dashboard`) · Padrões do produto › Cadastro do lojista (`produto#produto-cadastro`)

### card-loja

- **Arquivo:** [src/app/components/ui/card-loja.tsx](src/app/components/ui/card-loja.tsx)
- **Quando usar:** Card de loja (FindLook): o cartão que abre ao tocar num pino do mapa e o item da lista "Lojas no mapa".
- **Componentes:**
  - `CardDeLoja` (props: `nome`, `estilo`, `bairro`, `exemplo`, `rotuloExemplo`, `acao`, `nivel`, `className`)
  - `ItemDeLoja` (props: `nome`, `estilo`, `bairro`, `selecionada`, `onSelecionar`, `className`)
- **Onde ver:** Padrões do produto › Card de loja e mapa (`produto#produto-loja-mapa`)

### carousel

- **Arquivo:** [src/app/components/ui/carousel.tsx](src/app/components/ui/carousel.tsx)
- **Quando usar:** Lista horizontal que desliza, com botões de anterior e próximo.
- **Componentes:**
  - `Carousel` (props: `orientation`, `opts`, `setApi`, `plugins`, `className`, `children`)
  - `CarouselContent` (props: `className`)
  - `CarouselItem` (props: `className`)
  - `CarouselPrevious` (props: `className`, `variant`, `size`)
  - `CarouselNext` (props: `className`, `variant`, `size`)
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### carregando

- **Arquivo:** [src/app/components/ui/carregando.tsx](src/app/components/ui/carregando.tsx)
- **Quando usar:** Símbolo da FindLook (pin com cabide), desenhado no próprio componente para não depender de arquivo. Cor do logo: --brand-pink (#FC0256, o lenço do gato).
- **Componentes:**
  - `SimboloFindLook` (props: `className`)
  - `Carregando` (props: `mensagem`, `detalhe`, `variante`, `demoraMs`, `onTentarDeNovo`, `className`)
- **Onde ver:** Quadro, conversa e tabela › Conversa e celular (`painel-e-admin#conversa`) · Movimento › Loaders e progresso (`motion#loaders`)

### cartao-de-escolha

- **Arquivo:** [src/app/components/ui/cartao-de-escolha.tsx](src/app/components/ui/cartao-de-escolha.tsx)
- **Quando usar:** Cartão de escolha (CartaoDeEscolha, dentro de um GrupoDeCartoesDeEscolha): escolha única entre poucas opções grandes, com ícone, título e uma linha de explicação, como "Como você vai usar a FindLook?" no cadastro (proposta de 27/11/2026, tirada do cadastro do produto, que montava o cartão à mão).
- **Componentes:**
  - `GrupoDeCartoesDeEscolha` (props: `value`, `defaultValue`, `onValueChange`, `colunas`, `className`)
  - `CartaoDeEscolha` (props: `valor`, `titulo`, `descricao`, `icone`, `desabilitado`, `id`, `className`)
- **Onde ver:** Botões › Cartões de escolha (`buttons#cartoes-de-escolha`) · Templates › Painel da loja (protótipo) (`templates#template-dashboard`) · Padrões do produto › Cadastro do lojista (`produto#produto-cadastro`)

### chart

- **Arquivo:** [src/app/components/ui/chart.tsx](src/app/components/ui/chart.tsx)
- **Quando usar:** Format: { THEME_NAME: CSS_SELECTOR }
- **Componentes:**
  - `ChartContainer` (props: `id`, `className`, `children`, `config`)
  - `ChartStyle` (props: `id`, `config`)
  - `ChartTooltipContent` (props: `active`, `payload`, `className`, `indicator`, `hideLabel`, `hideIndicator`, `label`, `labelFormatter`, `labelClassName`, `formatter`, `color`, `nameKey`, `labelKey`)
  - `ChartLegendContent` (props: `className`, `hideIcon`, `payload`, `verticalAlign`, `nameKey`)
- **Funções e constantes:** `ChartTooltip`, `ChartLegend`
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### checkbox

- **Arquivo:** [src/app/components/ui/checkbox.tsx](src/app/components/ui/checkbox.tsx)
- **Quando usar:** Caixa de seleção. O desenho tem 20 px, QUADRADO, com cantos de 6 px (--radius-xs, 28/11/2026: com 8 px parecia redonda e se confundia com o rádio); no toque (celular ou tela de dedo, 27/11/2026) a área clicável cresce para 44 × 44 px em volta dele, com margem negativa, sem mudar o tamanho do desenho nem o espaço que ele ocupa.
- **Componentes:**
  - `Checkbox` (props: `className`)
- **Onde ver:** Botões › Senha (`buttons#password`) · Campos e formulários › Prefixo, sufixo e desabilitado (`campos#campo-com-prefixo`) · Templates › Painel da loja (protótipo) (`templates#template-dashboard`) · e mais 4 seções (ver `catalogo.json`)

### chip-de-estado

- **Arquivo:** [src/app/components/ui/chip-de-estado.tsx](src/app/components/ui/chip-de-estado.tsx)
- **Quando usar:** Chip de estado: o estado de um item (etapa da loja, situação da peça, cadastro) sempre em texto, com ícone opcional e o fundo do tom. Mesma API do ChipDeEstado do design system Dani Moscatelli. Regra: estado nunca só por cor ou forma; o texto é obrigatório. Vai na coluna do fim de uma LinhaDeLista (tags e ações), que no celular desce para uma linha própria embaixo do texto.
- **Componentes:**
  - `ChipDeEstado` (props: `tom`, `icone`, `tamanho`, `className`, `children`)
- **Onde ver:** Chips e estados › Chip de estado (`chips-e-estados#chip-de-estado`) · Demonstrações animadas › Miniatura do painel (`demonstracoes#miniatura-do-painel`)

### chip-filtravel

- **Arquivo:** [src/app/components/ui/chip-filtravel.tsx](src/app/components/ui/chip-filtravel.tsx)
- **Quando usar:** Chips de filtro (Rótulos › Chips filtráveis, como componente). ChipFiltravel e GrupoDeChipsFiltraveis têm a mesma API do design system Dani Moscatelli; GrupoDeChips, ChipDeFiltro e ListaDeFiltrosAtivos são do FindLook. - ChipFiltravel: liga e desliga um filtro ou uma classificação (aria-pressed).
- **Componentes:**
  - `ChipFiltravel` (props: `ativo`, `onAtivoChange`, `contagem`, `icone`, `className`, `children`, `onClick`)
  - `GrupoDeChipsFiltraveis` (props: `opcoes`, `valor`, `onValorChange`, `multiplo`, `rotulo`, `className`)
  - `GrupoDeChips` (props: `rotulo`, `className`, `children`)
  - `ChipDeFiltro` (props: `rotulo`, `onRemover`, `className`)
  - `ListaDeFiltrosAtivos` (props: `children`, `onLimparTudo`, `rotuloLimpar`, `className`): Filtros aplicados, em linha, com "Limpar filtros" no fim (mesma linha, quebrando junto).
- **Onde ver:** Rótulos › Badges e tags (`badges#badges`) · Campos e formulários › Grupo de opções e interruptor (`campos#grupo-de-opcoes`) · Chips e estados › Chips de filtro (`chips-e-estados#chips-filtro`) · e mais 2 seções (ver `catalogo.json`)

### collapsible

- **Arquivo:** [src/app/components/ui/collapsible.tsx](src/app/components/ui/collapsible.tsx)
- **Quando usar:** Mostra e esconde um bloco de conteúdo.
- **Componentes:**
  - `Collapsible`
  - `CollapsibleTrigger`
  - `CollapsibleContent`
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### command

- **Arquivo:** [src/app/components/ui/command.tsx](src/app/components/ui/command.tsx)
- **Quando usar:** Paleta de comandos com busca (Ctrl+K).
- **Componentes:**
  - `Command` (props: `className`)
  - `CommandDialog` (props: `title`, `description`, `children`)
  - `CommandInput` (props: `className`)
  - `CommandList` (props: `className`)
  - `CommandEmpty`
  - `CommandGroup` (props: `className`)
  - `CommandSeparator` (props: `className`)
  - `CommandItem` (props: `className`)
  - `CommandShortcut` (props: `className`)
- **Onde ver:** Templates › Painel da loja (protótipo) (`templates#template-dashboard`)

### confete

- **Arquivo:** [src/app/components/ui/confete.tsx](src/app/components/ui/confete.tsx)
- **Quando usar:** Confete (comemoração de um envio que deu certo): Veio da tela final do cadastro da Rede de Parceiros em HTML (rede-parceiros/cadastro, função confetti): papeizinhos que caem do topo da tela balançando, por cerca de 3 s, e somem aos poucos no 4º segundo. Desenhado num canvas por cima da página, que não recebe clique nem toque e é retirado no fim.
- **Componentes:**
  - `Confete` (props: `ativo`, `quantidade`, `duracao`, `cores`): Componente: dispara o confete quando `ativo` passa a true. Não desenha nada no lugar onde está.
- **Funções e constantes:** `CORES_DO_CONFETE`, `dispararConfete`
- **Onde ver:** Feedback › Confete na conquista (`feedback#confete`) · Rótulos (`badges`, fora das seções)

### context-menu

- **Arquivo:** [src/app/components/ui/context-menu.tsx](src/app/components/ui/context-menu.tsx)
- **Quando usar:** Menu aberto com o botão direito.
- **Componentes:**
  - `ContextMenu`
  - `ContextMenuTrigger`
  - `ContextMenuGroup`
  - `ContextMenuPortal`
  - `ContextMenuSub`
  - `ContextMenuRadioGroup`
  - `ContextMenuSubTrigger` (props: `className`, `inset`, `children`)
  - `ContextMenuSubContent` (props: `className`)
  - `ContextMenuContent` (props: `className`)
  - `ContextMenuItem` (props: `className`, `inset`, `variant`)
  - `ContextMenuCheckboxItem` (props: `className`, `children`, `checked`)
  - `ContextMenuRadioItem` (props: `className`, `children`)
  - `ContextMenuLabel` (props: `className`, `inset`)
  - `ContextMenuSeparator` (props: `className`)
  - `ContextMenuShortcut` (props: `className`)
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### contrast

- **Arquivo:** [src/app/components/ui/contrast.ts](src/app/components/ui/contrast.ts)
- **Quando usar:** Utilitários de contraste (WCAG 2.x) para avaliar texto sobre vidro.
- **Funções e constantes:** `parseColor`, `resolveCssColor`, `over`, `luminance`, `contrastRatio`, `AA`, `formatRatio`
- **Onde ver:** Cards › Card de vidro (`cards#card-vidro`) · Cards › Vidro: acabamentos (`cards#card-glass`) · Cards › Vidro por fundo (`cards#card-glass-fundos`) · e mais 1 seções (ver `catalogo.json`)

### conversa

- **Arquivo:** [src/app/components/ui/conversa.tsx](src/app/components/ui/conversa.tsx)
- **Quando usar:** Conversa (WhatsApp da loja e simulador do robô). Conversa, BalaoDaConversa, SeparadorDaConversa e IndicadorDeDigitacao têm a mesma API do design system Dani Moscatelli: - Conversa: a lista (role="log"). alinhamento "esquerda" (padrão: todas na mesma borda, como um histórico) ou "lados" (as suas à direita, como num chat: use no WhatsApp).
- **Componentes:**
  - `MolduraDeCelular` (props: `className`, `children`, `rotulo`): Moldura
  - `CabecalhoDaConversa` (props: `nome`, `status`, `digitando`, `foto`, `simbolo`, `acoes`, `className`): Cabeçalho
  - `Conversa` (props: `className`, `children`, `rotulo`, `alinhamento`, `rolagem`)
  - `BalaoDaConversa` (props: `autor`, `nome`, `quando`, `avatar`, `estado`, `textoDoEstado`, `naoLida`, `depois`, `citacao`, `imagem`, `children`, `className`)
  - `SeparadorDaConversa` (props: `children`, `className`): Separador
  - `IndicadorDeDigitacao` (props: `autor`, `avatar`, `rotulo`, `texto`, `icone`, `className`): Digitando
  - `BotaoDeResposta` (props: `className`, `icone`, `children`): Resposta rápida
  - `CampoDeMensagem` (props: `valor`, `onValorChange`, `onEnviar`, `onAnexar`, `ocupado`, `placeholder`, `rotulo`, `rotuloAnexar`, `rotuloEnviar`, `podeEnviarSemTexto`, `className`)
  - `FolhaDeOpcoes` (props: `titulo`, `opcoes`, `aberta`, `onFechar`, `onEscolher`)
- **Onde ver:** Quadro, conversa e tabela › Conversa e celular (`painel-e-admin#conversa`) · Movimento › Loaders e progresso (`motion#loaders`)

### cursor-de-demonstracao

- **Arquivo:** [src/app/components/ui/cursor-de-demonstracao.tsx](src/app/components/ui/cursor-de-demonstracao.tsx)
- **Quando usar:** Cursor de demonstração: a seta grande que "conta a história" de uma demonstração em etapas (entra, clica no campo, digita, aperta o botão), como na seção "Do outro lado da busca" da página do lojista. - CursorDeDemonstracao: a seta (branca, contorno grafite: visível sobre fundo claro e escuro), posicionada de forma absoluta dentro do palco (o contêiner com position: relative).
- **Componentes:**
  - `CursorDeDemonstracao` (props: `visivel`, `className`)
- **Funções e constantes:** `moverCursor`, `clicarCursor`
- **Onde ver:** Demonstrações animadas › Cursor de demonstração (`demonstracoes#cursor-de-demonstracao`)

### dialog

- **Arquivo:** [src/app/components/ui/dialog.tsx](src/app/components/ui/dialog.tsx)
- **Quando usar:** Janela modal para tarefas que pedem foco.
- **Componentes:**
  - `Dialog`
  - `DialogTrigger`
  - `DialogPortal`
  - `DialogClose`
  - `DialogOverlay` (props: `className`)
  - `DialogContent` (props: `className`, `children`)
  - `DialogHeader` (props: `className`)
  - `DialogFooter` (props: `className`)
  - `DialogTitle` (props: `className`)
  - `DialogDescription` (props: `className`)
- **Onde ver:** Sobreposições (overlays) › Diálogos (`overlays#dialogs`)

### divisor-do-card

- **Arquivo:** [src/app/components/ui/divisor-do-card.tsx](src/app/components/ui/divisor-do-card.tsx)
- **Quando usar:** Divisor do rodapé do card (27/11/2026): o mesmo divisor que separa o cabeçalho do conteúdo nos cards do painel (DivisorSuave, que some nas laterais). O Card horizontal mostra este divisor acima das ações ("Card com ação: divisor e botão no canto inferior direito", dona do produto). Cada design system aponta para o próprio divisor.
- **Componentes:**
  - `DivisorDoCard` (props: `className`)
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### doodle-texture

- **Arquivo:** [src/app/components/ui/doodle-texture.tsx](src/app/components/ui/doodle-texture.tsx)
- **Quando usar:** DoodleTexture (textura doodle): Padrão de ícones de traço, sem emenda, no universo da marca: só peças de moda: vestido, calça, saia, boné, óculos de sol, sandália, tênis e camiseta. O desenho vem de `public/texturas/doodle-moda-traco.svg` e é aplicado como máscara, então a cor do traço é qualquer token (sólida, sem transparência) e segue o tema.
- **Componentes:**
  - `DoodleTexture` (props: `scale`, `color`, `position`, `className`, `style`)
- **Funções e constantes:** `doodleTextureFiles`
- **Onde ver:** Fundos › Textura doodle (`backgrounds#doodle-bg`) · Cards › Vidro: acabamentos (`cards#card-glass`) · Cards › Vidro por fundo (`cards#card-glass-fundos`) · e mais 2 seções (ver `catalogo.json`)

### drawer

- **Arquivo:** [src/app/components/ui/drawer.tsx](src/app/components/ui/drawer.tsx)
- **Quando usar:** Painel que sobe da parte de baixo da tela (celular).
- **Componentes:**
  - `Drawer`
  - `DrawerTrigger`
  - `DrawerPortal`
  - `DrawerClose`
  - `DrawerOverlay` (props: `className`)
  - `DrawerContent` (props: `className`, `children`, `container`)
  - `DrawerHeader` (props: `className`)
  - `DrawerFooter` (props: `className`)
  - `DrawerTitle` (props: `className`)
  - `DrawerDescription` (props: `className`)
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### dropdown-menu

- **Arquivo:** [src/app/components/ui/dropdown-menu.tsx](src/app/components/ui/dropdown-menu.tsx)
- **Quando usar:** Menu de ações aberto por um botão.
- **Componentes:**
  - `DropdownMenu`
  - `DropdownMenuPortal`
  - `DropdownMenuTrigger`
  - `DropdownMenuContent` (props: `className`, `sideOffset`)
  - `DropdownMenuGroup`
  - `DropdownMenuItem` (props: `className`, `inset`, `variant`)
  - `DropdownMenuCheckboxItem` (props: `className`, `children`, `checked`)
  - `DropdownMenuRadioGroup`
  - `DropdownMenuRadioItem` (props: `className`, `children`)
  - `DropdownMenuLabel` (props: `className`, `inset`)
  - `DropdownMenuSeparator` (props: `className`)
  - `DropdownMenuShortcut` (props: `className`)
  - `DropdownMenuSub`
  - `DropdownMenuSubTrigger` (props: `className`, `inset`, `children`)
  - `DropdownMenuSubContent` (props: `className`)
- **Onde ver:** Sobreposições (overlays) › Barra superior (`overlays#barra-superior`) · Sobreposições (overlays) › Menu suspenso (dropdown) (`overlays#dropdown`) · Templates › Painel da loja (protótipo) (`templates#template-dashboard`)

### escala-de-notas

- **Arquivo:** [src/app/components/ui/escala-de-notas.tsx](src/app/components/ui/escala-de-notas.tsx)
- **Quando usar:** EscalaDeNotas e GrupoDeEscalas (uma nota numa escala numerada): Veio da pesquisa Moda em Curitiba (pergunta 4: Qualidade, Estética e Variedade, de 1 a 10). Serve a qualquer nota curta: 1 a 10, 0 a 10 (NPS), 1 a 5. GrupoDeEscalas junta várias escalas num só card, separadas por divisor.
- **Componentes:**
  - `EscalaDeNotas` (props: `rotulo`, `descricao`, `minimo`, `maximo`, `valor`, `onValorChange`, `rotuloMinimo`, `rotuloMaximo`, `erro`, `desabilitado`, `name`, `obrigatorio`, `className`)
  - `GrupoDeEscalas` (props: `children`, `className`): Várias escalas num só card, separadas por divisor (como os três aspectos da pesquisa).
- **Onde ver:** Campos e formulários › Escala de notas (`campos#escala-de-notas`)

### escolha-ordenada

- **Arquivo:** [src/app/components/ui/escolha-ordenada.tsx](src/app/components/ui/escolha-ordenada.tsx)
- **Quando usar:** EscolhaOrdenada (escolher até N opções, na ordem dos toques): Veio da pesquisa Moda em Curitiba (perguntas 2 e 5: "Escolha até 3, na ordem"). Classifica sem arrastar: o primeiro toque é o 1º lugar, o próximo toque fica com o próximo lugar livre; tocar de novo numa escolhida tira-a, e as que vinham depois sobem uma posição. Com o máximo atingido, as outras ficam travadas (a exclusiva continua livre).
- **Componentes:**
  - `EscolhaOrdenada` (props: `opcoes`, `valor`, `onValorChange`, `maximo`, `rotulo`, `erro`, `desabilitado`, `somenteLeitura`, `name`, `textos`, `className`)
- **Funções e constantes:** `proximaOrdem`
- **Onde ver:** Campos e formulários › Escolha ordenada (`campos#escolha-ordenada`)

### estado-vazio

- **Arquivo:** [src/app/components/ui/estado-vazio.tsx](src/app/components/ui/estado-vazio.tsx)
- **Quando usar:** EstadoVazio, EstadoFinal e PaginaDeErro: as três telas "sem conteúdo" do DS. Mesma API nos dois DS (FindLook e Dani Moscatelli, 27/11/2026).
- **Componentes:**
  - `EstadoVazio` (props: `icone`, `titulo`, `descricao`, `acoes`, `tom`, `tamanho`, `variante`, `nivel`, `ilustracao`, `moldura`, `className`)
  - `EstadoFinal` (props: `tom`, `icone`, `titulo`, `descricao`, `acoes`, `nivel`, `focarAoAparecer`, `comemorar`, `children`, `className`)
  - `PaginaDeErro` (props: `codigo`, `ilustracao`, `titulo`, `descricao`, `acoes`, `telaCheia`, `moldura`, `selo`, `abaixoDoCabecalho`, `elemento`, `className`)
- **Onde ver:** Moldura do site › Página de erro (404) (`site#site-erro`) · Chips e estados › Estado vazio (`chips-e-estados#estado-vazio`) · Feedback › Confete na conquista (`feedback#confete`) · e mais 6 seções (ver `catalogo.json`)

### faixa-parceiros

- **Arquivo:** [src/app/components/ui/faixa-parceiros.tsx](src/app/components/ui/faixa-parceiros.tsx)
- **Quando usar:** Faixa de parceiros (FindLook): só os logos das lojas e marcas parceiras, rolando devagar. Sem parceiros, os espaços mostram o convite "Sua loja aqui".
- **Componentes:**
  - `FaixaDeParceiros` (props: `parceiros`, `espacos`, `titulo`, `convite`, `tom`, `duracao`, `botaoPausar`, `className`)
- **Onde ver:** Padrões do produto › Card de loja e mapa (`produto#produto-loja-mapa`)

### fashion-icons

- **Arquivo:** [src/app/components/ui/fashion-icons.tsx](src/app/components/ui/fashion-icons.tsx)
- **Quando usar:** Ícones de moda (IconeModa): Ícones de traço no estilo Lucide (viewBox 24, traço 2, pontas e junções arredondadas), desenhados para o universo da FindLook: peças de roupa, calçados e acessórios. São os mesmos desenhos da textura doodle (scripts/gerar-texturas.mjs); a camiseta é o ícone "shirt" do Lucide. Use quando o Lucide não tiver a peça (calça, vestido, saia, tênis…), por exemplo em listas de produtos.
- **Componentes:**
  - `IconeModa` (props: `nome`, `size`, `strokeWidth`, `titulo`, `className`)
- **Funções e constantes:** `iconesModa`, `nomesIconesModa`
- **Onde ver:** Cards › Card de peça (`cards#card-produto`) · Rótulos › Listas de atividade e ações (`badges#listas-painel`) · Ícones › Tamanhos e cores (`icons#icon-sizes`) · e mais 3 seções (ver `catalogo.json`)

### form

- **Arquivo:** [src/app/components/ui/form.tsx](src/app/components/ui/form.tsx)
- **Quando usar:** Base de formulário (react-hook-form) com rótulo, mensagem e erros.
- **Componentes:**
  - `FormField`
  - `FormItem` (props: `className`)
  - `FormLabel` (props: `className`)
  - `FormControl`
  - `FormDescription` (props: `className`)
  - `FormMessage` (props: `className`)
- **Funções e constantes:** `Form`, `useFormField`
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### glass-card

- **Arquivo:** [src/app/components/ui/glass-card.tsx](src/app/components/ui/glass-card.tsx)
- **Quando usar:** GlassCard (card glassmorphism): Superfície translúcida com desfoque do fundo, borda clara e um fio de luz no topo. Só funciona sobre um fundo com cor, gradiente ou imagem; sobre fundo liso vira um card comum. Use para poucos elementos em destaque (hero, resumo, chamada); não para listas longas nem para leitura extensa. Com prefers-reduced-transparency o card vira sólido.
- **Componentes:**
  - `GlassCard` (props: `finish`, `intensity`, `tone`, `tint`, `interactive`, `opacity`, `blur`, `className`, `style`, `children`)
  - `GlassScene` (props: `dark`, `className`, `children`)
- **Funções e constantes:** `glassSceneTexture`, `glassOpacityTable`, `glassTextContrast`
- **Onde ver:** Cards › Vidro com conteúdo (`cards#card-glass-conteudo`) · Cards › Vidro no tema escuro (`cards#card-glass-escuro`) · Cards › O que evitar (`cards#card-guidelines`) · e mais 3 seções (ver `catalogo.json`)

### grade-de-cards

- **Arquivo:** [src/app/components/ui/grade-de-cards.tsx](src/app/components/ui/grade-de-cards.tsx)
- **Quando usar:** No servidor (renderização no servidor) não existe layout: useEffect lá, useLayoutEffect no navegador (27/11/2026).
- **Componentes:**
  - `SemOrientacaoHerdada` (props: `children`): Zera a orientação herdada: um card dentro de outro card não herda a orientação da grade de fora.
  - `GradeDeCards` (props: `colunas`, `larguraMinima`, `limiteDeDiferenca`, `layout`, `onLayoutChange`, `className`, `style`, `children`)
  - `ItemDaGrade` (props: `className`): ItemDaGrade: item com um rótulo em cima do card. Estica o último filho (o card) até a base da linha, para os cards da linha terem a mesma altura.
- **Funções e constantes:** `LIMITE_DE_DIFERENCA`, `FATOR_DE_VOLTA`, `passaDoLimite`, `useOrientacaoDoCard`
- **Onde ver:** Mascote & Ilustrações › Personagem (Nyx) (`ilustracoes#mascote-personagem`) · Mascote & Ilustrações › Diretrizes de uso (`ilustracoes#mascote-diretrizes`) · Fundamentos › Tipografia (`colors#typography`) · e mais 89 seções (ver `catalogo.json`)

### graficos

- **Arquivo:** [src/app/components/ui/graficos.tsx](src/app/components/ui/graficos.tsx)
- **Quando usar:** Gráficos de participação e comparação (FindLook): Rosca: partes de um todo (até 5 partes), com o total ou o número de partes no centro e legenda com a porcentagem. BarrasHorizontais: compara grupos numa medida; cada linha pode ter uma parte (barra simples) ou várias (barra empilhada).
- **Componentes:**
  - `Rosca` (props: `partes`, `centro`, `rotuloCentro`, `rotulo`, `className`): Rosca Desde 19/11/2026 a rosca do DS é a redesenhada (GraficoDeRosca, em graficos-inteligencia.tsx): anel fino, tons por importância (coresPorImportancia) da maior para a menor parte, "Outros" em cinza e por último, percentual escrito …
  - `BarrasHorizontais` (props: `linhas`, `maximo`, `legenda`, `rotulo`, `className`)
  - `MapaCoropletico` (props: `viewBox`, `regioes`, `valores`, `rotulo`, `rotuloDoValor`, `escolhida`, `onEscolher`, `marcadores`, `nomesCurtos`, `legenda`, `className`)
- **Funções e constantes:** `faixaDoMapa`
- **Onde ver:** Exibição de dados › Rosca, barras e mapa (`data#grafico-participacao`)

### graficos-catalogo

- **Arquivo:** [src/app/components/ui/graficos-catalogo.tsx](src/app/components/ui/graficos-catalogo.tsx)
- **Quando usar:** Catálogo completo de gráficos (19/11/2026): os modelos do catálogo de referência que não estão entre os recomendados. Mesmas regras de graficos-inteligencia.tsx: componentes de apresentação (dados por props), só os tokens de gráfico (--chart-1 a --chart-N, --chart-neutral, --chart-grid, --chart-seq-*;
- **Componentes:**
  - `BarrasAgrupadas` (props: `grupos`, `series`, `maximo`, `rotulo`, `formatar`, `className`): Barras agrupadas, deitadas: em cada grupo, uma barra por série com o valor escrito no fim. O nome de cada série aparece em cima das barras do primeiro grupo (e na legenda).
  - `BarrasEmpilhadas` (props: `categorias`, `linhas`, `rotulo`, `formatar`, `className`): Barras empilhadas com o total escrito no fim. As partes não levam texto: embaixo de cada barra, uma linha com o valor de cada parte, na mesma ordem e com um ponto na cor dela.
  - `Pirulito` (props: `itens`, `destaques`, `ordenar`, `referencia`, `maximo`, `rotulo`, `formatar`, `className`): Pirulito: haste fina e um ponto no valor, escrito ao lado. Mais leve que barras quando há muitos itens.
  - `AreaEmpilhada` (props: `series`, `rotulosX`, `altura`, `rotulo`, `formatar`, `rotulos`, `className`): Área empilhada: o topo é o total; cada camada é a parte de uma série. Nome e último valor no fim de cada camada.
  - `Streamgraph` (props: `series`, `rotulosX`, `altura`, `rotulo`, `formatar`, `className`): Streamgraph: camadas empilhadas em torno de um eixo central, em curvas suaves. Mostra o volume e a mistura mudando no tempo; não serve para ler valores exatos (estão no fim de cada camada e na tabela).
  - `LinhaDoTempo` (props: `eventos`, `inicio`, `fim`, `marcas`, `rotulo`, `className`): Linha do tempo com espaçamento proporcional: cada evento é um ponto no eixo, com data e nome em faixas abaixo (as faixas se multiplicam quando os nomes não cabem lado a lado). Diferente do componente Timeline (lista de etapas).
  - `CalendarioDeCalor` (props: `dias`, `rotulo`, `formatar`, `className`, `rotulosDias`, `rotulosMeses`, `formatarData`): Calendário de calor: uma coluna por semana, uma linha por dia da semana, cor pela escala sequencial. O dia de maior valor fica contornado e escrito abaixo; o valor de cada dia aparece ao passar o cursor e na tabela.
  - `GraficoDeVelas` (props: `velas`, `altura`, `rotulo`, `formatar`, `rotulos`, `className`): Velas: em cada período, o traço vai da mínima à máxima e o corpo da abertura ao fechamento. Corpo cheio quando fechou acima da abertura, vazado quando fechou abaixo (a forma diz a direção, não só a cor).
  - `Pizza` (props: `partes`, `rotulo`, `formatarQuantidade`, `localidade`, `tamanho`, `className`): Pizza: mesmas regras da rosca (partes do maior para o menor, "Outros" em grafite no fim, percentual junto de cada fatia).
  - `Waffle` (props: `partes`, `rotulo`, `localidade`, `formatarQuantidade`, `nota`, `className`): Waffle: 100 quadrados, cada um é 1% do total; as partes se preenchem em ordem, da maior para a menor.
  - `Piramide` (props: `faixas`, `esquerda`, `direita`, `maximo`, `rotulo`, `formatar`, `className`): Pirâmide: dois grupos de costas um para o outro, faixa a faixa, com o valor escrito na ponta de cada barra.
  - `Dispersao` (props: `pontos`, `eixoX`, `eixoY`, `tendencia`, `altura`, `rotulo`, `rotulos`, `className`): Dispersão: um ponto por item em dois eixos. Os destaques ficam na cor primária e com o nome escrito.
  - `MatrizDeCorrelacao` (props: `variaveis`, `valores`, `destaque`, `localidade`, `rotulo`, `rotulos`, `className`): Matriz de correlação (metade de baixo, numa tabela de verdade): a cor mostra a força da relação, pela escala sequencial, e as listras mostram a direção (com listras: quando uma sobe, a outra desce).
  - `Radar` (props: `eixos`, `series`, `maximo`, `niveis`, `rotulo`, `formatar`, `className`): Radar: cada eixo é uma medida na mesma escala. A série em destaque é preenchida e tem os valores escritos junto do nome de cada eixo, fora da área; as outras são só contorno (tracejado), para não depender só da cor.
  - `CoordenadasParalelas` (props: `eixos`, `itens`, `altura`, `rotulo`, `className`): Coordenadas paralelas: compara itens em várias medidas de escalas diferentes; cada eixo mostra o próprio mínimo e máximo.
  - `Sankey` (props: `nos`, `ligacoes`, `altura`, `rotulo`, `formatar`, `className`): Sankey: fluxos entre etapas; a espessura de cada faixa é a quantidade. O nome e o valor de cada nó ficam escritos ao lado dele; a faixa em destaque fica no tom 1 e as outras no cinza de contexto (tom 6).
  - `RedeDeConexoes` (props: `nos`, `ligacoes`, `rotulo`, `formatar`, `className`): Rede de conexões em círculo: cada nó num ponto do círculo, ligações curvas por dentro, com espessura pela força. As ligações do nó em destaque ficam na cor primária; passar o cursor num nó realça as ligações dele.
  - `Histograma` (props: `valores`, `faixas`, `destaque`, `referencia`, `eixoX`, `altura`, `rotulo`, `formatar`, `className`): Histograma: quantos valores caem em cada faixa. A contagem fica escrita em cima de cada barra quando cabe.
  - `BoxPlot` (props: `grupos`, `eixo`, `rotulo`, `formatar`, `rotulos`, `className`): Box plot: a caixa vai do 1º ao 3º quartil (a metade do meio), o traço é a mediana, os bigodes vão até 1,5 × a caixa e os pontos vazados são valores fora do padrão. A mediana fica escrita ao lado de cada grupo.
  - `Violino` (props: `grupos`, `eixo`, `rotulo`, `formatar`, `rotulos`, `className`): Violino: o contorno mostra onde os valores se concentram em cada grupo (densidade estimada, espelhada). Dentro, a barra escura é a metade do meio e o ponto é a mediana, escrita ao lado do nome.
  - `Densidade` (props: `series`, `eixoX`, `altura`, `rotulo`, `rotulos`, `className`): Curvas de densidade: a forma de cada distribuição, suavizada, para comparar onde cada grupo se concentra. O nome de cada série fica escrito no pico da curva; o eixo vertical não tem unidade (só a forma importa).
  - `MapaDePontos` (props: `regioes`, `colunas`, `linhas`, `pontos`, `tipos`, `altura`, `nomesDasRegioes`, `rotulo`, `rotulos`, `className`): Mapa de pontos esquemático: cada ponto é um lugar (loja, unidade…) na posição aproximada que o produto informar. Os tipos mudam a forma e o tom; os destaques têm o nome escrito. Não é mapa em escala e não usa dados geográficos.
  - `MapaDeBolhas` (props: `regioes`, `colunas`, `linhas`, `bolhas`, `rotuloTamanho`, `formatar`, `altura`, `nomesDasRegioes`, `rotulo`, `rotulos`, `className`): Mapa de bolhas esquemático: uma bolha por lugar, com a área proporcional ao valor. Nome e valor ficam escritos embaixo da bolha, fora dela. Não é mapa em escala e não usa dados geográficos.
- **Funções e constantes:** `CORES_SERIES`, `quebrarTexto`, `resumoDaDistribuicao`
- **Onde ver:** Gráficos › (`graficos#graficos-catalogo-comparacao`) · Gráficos › (`graficos#graficos-catalogo-tempo`) · Gráficos › (`graficos#graficos-catalogo-composicao`) · e mais 4 seções (ver `catalogo.json`)

### graficos-inteligencia

- **Arquivo:** [src/app/components/ui/graficos-inteligencia.tsx](src/app/components/ui/graficos-inteligencia.tsx)
- **Quando usar:** No servidor (renderização no servidor) não existe layout: useEffect lá, useLayoutEffect no navegador (27/11/2026).
- **Componentes:**
  - `DegradeDaArea` (props: `id`, `cor`, `topo`, `base`, `espelhado`)
  - `PontoDaCor` (props: `cor`, `className`): Ponto na cor da marca, antes de um valor escrito fora dela (liga o número à parte).
  - `TabelaDeDados` (props: `dados`, `legenda`, `className`): Tabela de dados (alternativa acessível ao gráfico e detalhamento para quem quer conferir).
  - `DescobertaVisual` (props: `tema`, `conclusao`, `contexto`, `children`, `porQueImporta`, `acao`, `dados`, `selo`, `numerar`, `rotulos`, `className`): Card de descoberta: conclusão, gráfico, por que importa, próximo passo e dados (recolhidos).
  - `LegendaDoGrafico` (props: `itens`, `className`): Legenda compacta (sempre junto de rótulos diretos, nunca sozinha)
  - `GraficoDeRosca` (props: `partes`, `centro`, `rotulo`, `formatarQuantidade`, `localidade`, `tamanho`, `className`): Rosca de participação, no traço fino do DS: as partes nos tons por importância (da maior para a menor; a maior no tom 1), "Outros" em cinza de contexto no fim, percentuais escritos junto de cada parte e lista com nome, quantidade e …
  - `BarrasOrdenadas` (props: `itens`, `destaques`, `destaque`, `ordenar`, `posicao`, `cores`, `rotulo`, `formatar`, `className`): Barras horizontais ordenadas, com o nome em cima e o valor escrito no fim de cada barra.
  - `LegendaSequencial` (props: `menos`, `mais`)
  - `MapaDeCalorPorRegiao` (props: `regioes`, `colunas`, `linhas`, `destaque`, `rotulo`, `formatar`, `rotulos`, `className`): Mapa de calor esquemático: cada região é um bloco numa grade, na posição aproximada (não é mapa em escala). As posições vêm por props; nada de dados geográficos é buscado. O nome fica escrito acima de cada bloco, fora da cor;
  - `GraficoDeHalteres` (props: `itens`, `series`, `maximo`, `rotulo`, `formatar`, `formatarDiferenca`, `className`): Halteres: para cada item, um ponto para cada medida ligados por uma linha; os valores ficam escritos nos pontos.
  - `GraficoDeLinhas` (props: `series`, `rotulosX`, `area`, `altura`, `zero`, `rotulo`, `formatar`, `className`): Linhas finas com o nome e o último valor escritos no fim de cada linha; passe o cursor para ler cada ponto. Cores: com uma série em `destaque`, ela fica no tom 1 e as outras no contexto (do tom 6 em diante);
  - `GraficoDeInclinacao` (props: `itens`, `periodos`, `destaques`, `altura`, `rotulo`, `formatar`, `className`): Duas colunas (antes e agora) ligadas por linhas: o destaque no tom 1 (um 2º no tom 2), o restante no cinza de contexto.
  - `Mosaico` (props: `itens`, `altura`, `rotulo`, `localidade`, `className`): Mosaico (treemap): a área de cada bloco é a fatia do total. Tons por importância, do maior bloco (tom 1) ao menor; "Outros" em cinza de contexto.
  - `BarrasEmpilhadas100` (props: `categorias`, `linhas`, `minimoParaRotulo`, `rotulo`, `localidade`, `className`): Barras 100%: cada linha soma 100%; o percentual de cada parte fica escrito logo acima dela. Categorias em ordem de importância.
  - `GraficoDeBolhas` (props: `itens`, `eixoX`, `eixoY`, `rotuloTamanho`, `formatarTamanho`, `altura`, `rotulo`, `className`): Bolhas: posição em dois eixos e tamanho como terceira medida. O destaque no tom 1; o restante no cinza de contexto.
  - `MapaDeCalorMatricial` (props: `linhas`, `colunas`, `valores`, `rotuloLinhas`, `destaque`, `rotulo`, `formatar`, `rotulos`, `className`): Matriz com a cor de cada célula pela escala sequencial. É uma tabela de verdade: as células não mostram o número (ele fica para leitores de tela, na dica ao passar o cursor e em Ver dados);
  - `GraficoDeRanking` (props: `series`, `periodos`, `rotulo`, `formatarPosicao`): Bump chart: como a posição de cada item muda ao longo dos períodos. O destaque no tom 1 (um 2º no tom 2), o restante no cinza de contexto.
  - `Funil` (props: `etapas`, `destacarMaiorPerda`, `rotulo`, `formatar`, `localidade`, `rotulos`, `className`): Funil: etapas da jornada com o valor escrito e, entre elas, quanto seguiu para a próxima. A maior perda fica marcada: a etapa logo depois dela é o ponto de atenção (tom 1) e as outras ficam no cinza de contexto. Sem a marca, todas no tom 1.
- **Funções e constantes:** `CORES_GRAFICO`, `COR_NEUTRA`, `corDoTom`, `coresPorImportancia`, `coresDasSeries`, `coresDeFoco`, `coresDeContexto`, `COR_GRADE`, `TRACO_DA_GRADE`, `LINHA_DA_AREA`, `useIdDoSvg`, `curvaMonotona`, `ESCALA_SEQUENCIAL`, `formatarNumero`, `formatarPercentual`, `soma`, `useLargura`, `marcasDoEixo`, `afastar`, `larguraTexto`, `fmtPadrao`, `arco`, `faixa`, `TOM_NEUTRO`, `TONS_DA_ESCALA`, `TOTAL_DE_TONS`
- **Onde ver:** Gráficos › Design de inteligência (`graficos#graficos-inteligencia`) · Gráficos › Escala em ordem e funil (`graficos#barras-destaque-e-funil`) · Gráficos › Cores dos gráficos (`graficos#graficos-cores`) · e mais 9 seções (ver `catalogo.json`)

### graficos-paleta

- **Arquivo:** [src/app/components/ui/graficos-paleta.ts](src/app/components/ui/graficos-paleta.ts)
- **Quando usar:** Paleta dos gráficos deste design system (FindLook): quantos tons existem e como os componentes os escolhem. É o único arquivo de gráficos que muda entre os design systems: graficos-inteligencia.tsx e graficos-catalogo.tsx são iguais nos dois e leem daqui. As cores ficam no theme.css (--chart-1 a --chart-7, --chart-neutral, --chart-seq-*).
- **Funções e constantes:** `TOTAL_DE_TONS`, `TOM_NEUTRO`, `tonsPorImportancia`, `tomDosOutros`, `tonsDeContexto`, `TONS_DA_ESCALA`
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### grupo-de-opcoes

- **Arquivo:** [src/app/components/ui/grupo-de-opcoes.tsx](src/app/components/ui/grupo-de-opcoes.tsx)
- **Quando usar:** GrupoDeOpcoes: um conjunto de escolhas com um nome só (Tipo de estabelecimento, Categorias, Público). É um <fieldset> com <legend> visível (16 px, negrito), uma ajuda opcional embaixo e as opções. `disposicao`: "lista" (uma por linha: rádios, LinhaDeInterruptor, CartaoDeEscolha) ou "chips" (ChipFiltravel lado a lado, quebrando de linha). Com erro, a mensagem aparece embaixo das opções e o grupo fica ligado a ela.
- **Componentes:**
  - `GrupoDeOpcoes` (props: `titulo`, `ajuda`, `erro`, `disposicao`, `separado`, `className`, `children`)
  - `LinhaDeInterruptor` (props: `rotulo`, `ajuda`, `className`, `disabled`, `id`)
- **Onde ver:** Campos e formulários › Grupo de opções e interruptor (`campos#grupo-de-opcoes`)

### heading

- **Arquivo:** [src/app/components/ui/heading.tsx](src/app/components/ui/heading.tsx)
- **Quando usar:** Heading com destaque: Padrão do hero do site do estúdio: Plus Jakarta Sans 700, tracking apertado, entrelinha 1,1 e a expressão-chave no tom forte do lenço (--primary-destaque, pink-500 #FC0256: só texto grande, 3,98:1 sobre branco; decisão de 25/11/2026).
- **Componentes:**
  - `Heading` (props: `level`, `size`, `tone`, `className`, `children`)
  - `Destaque` (props: `children`, `className`): Só o destaque, para usar dentro de um título já existente (texto grande: 24 px, ou negrito de 18,66 px ou mais).
- **Funções e constantes:** `withHighlight`
- **Onde ver:** Fundamentos › Tipografia (`colors#typography`) · Moldura do site › Cabeçalho e menu do celular (`site#site-cabecalho`) · Padrões do produto › Cadastro do lojista (`produto#produto-cadastro`) · e mais 10 seções (ver `catalogo.json`)

### hover-card

- **Arquivo:** [src/app/components/ui/hover-card.tsx](src/app/components/ui/hover-card.tsx)
- **Quando usar:** Card de prévia que abre ao passar o mouse num link.
- **Componentes:**
  - `HoverCard`
  - `HoverCardTrigger`
  - `HoverCardContent` (props: `className`, `align`, `sideOffset`)
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### icones-preservados

- **Arquivo:** [src/app/components/ui/icones-preservados.tsx](src/app/components/ui/icones-preservados.tsx)
- **Quando usar:** Ícones de marcas guardados como arquivo (por exemplo redes sociais).
- **Funções e constantes:** `Chrome`, `Codepen`, `Codesandbox`, `Dribbble`, `Facebook`, `Figma`, `Framer`, `Github`, `Gitlab`, `Instagram`, `Linkedin`, `Pocket`, `RailSymbol`, `Slack`, `Trello`, `Twitch`, `Twitter`, `Youtube`, `nomesIconesPreservados`
- **Onde ver:** Integração (`integration`, fora das seções)

### input

- **Arquivo:** [src/app/components/ui/input.tsx](src/app/components/ui/input.tsx)
- **Quando usar:** Input (campo de digitar). Repassa a ref (forwardRef, 28/11/2026), como o Button: funciona dentro de um Radix com asChild (PopoverTrigger, FormControl) e com react-hook-form.
- **Componentes:**
  - `Input` (props: `className`, `type`, `prefixo`, `sufixo`)
- **Onde ver:** Botões › Controles de formulário (`buttons#inputs`) · Catálogo de componentes › Todos os componentes (`catalogo#catalogo-lista`) · Demonstrações animadas › Cursor de demonstração (`demonstracoes#cursor-de-demonstracao`) · e mais 1 seções (ver `catalogo.json`)

### input-otp

- **Arquivo:** [src/app/components/ui/input-otp.tsx](src/app/components/ui/input-otp.tsx)
- **Quando usar:** Campo de código de verificação, uma caixa por dígito.
- **Componentes:**
  - `InputOTP` (props: `className`, `containerClassName`)
  - `InputOTPGroup` (props: `className`)
  - `InputOTPSlot` (props: `index`, `className`)
  - `InputOTPSeparator`
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### label

- **Arquivo:** [src/app/components/ui/label.tsx](src/app/components/ui/label.tsx)
- **Quando usar:** Label. `obrigatorio` (28/11/2026) põe o asterisco logo depois do texto, na mesma linha e quebrando junto com ele: o Label é flex (para a caixa de marcar ao lado do texto), e um asterisco solto virava outro item e ia para a ponta direita num rótulo longo. O asterisco é só visual (aria-hidden); o campo leva required ou aria-required.
- **Componentes:**
  - `Label` (props: `className`, `obrigatorio`, `children`)
- **Onde ver:** Campos e formulários › Prefixo, sufixo e desabilitado (`campos#campo-com-prefixo`) · Padrões do produto › Cadastro do lojista (`produto#produto-cadastro`) · Cards › Mesma altura ou um por linha (`cards#card-mesma-altura`)

### linha-de-lista

- **Arquivo:** [src/app/components/ui/linha-de-lista.tsx](src/app/components/ui/linha-de-lista.tsx)
- **Quando usar:** Linha de lista: início (caixa de seleção, avatar, ícone), conteúdo (título e descrição) e fim (tags, status, ações).
- **Componentes:**
  - `LinhaDeLista` (props: `as`, `inicio`, `titulo`, `descricao`, `fim`, `quebraAcoes`, `alinharAcoesAbaixo`, `alinhar`, `interativa`, `selecionada`, `className`, `children`)
- **Onde ver:** Cards › Borda, sombra e raio (`cards#card-layout`) · Exibição de dados › Linhas com tags e ações (`data#linhas-colunas`)

### link-saiba-mais

- **Arquivo:** [src/app/components/ui/link-saiba-mais.tsx](src/app/components/ui/link-saiba-mais.tsx)
- **Quando usar:** LinkSaibaMais (alça "Saiba mais" do hero): mesma API do LinkSaibaMais do design system Dani Moscatelli. O link que convida a rolar até a próxima seção, centralizado na base do hero (página do lojista): texto e a seta num círculo de 32 px com borda, que desce 4 px e volta devagar. Com `direcao="direita"`, vira um link de continuação no fim de um bloco ("Saiba mais →"). Sem borda nem fundo; 44 px de altura de toque.
- **Componentes:**
  - `LinkSaibaMais` (props: `children`, `direcao`, `sobreEscuro`, `comoLink`, `className`)
- **Onde ver:** Moldura do site › Vantagens e prova social (`site#site-hero`)

### links

- **Arquivo:** [src/app/components/ui/links.tsx](src/app/components/ui/links.tsx)
- **Quando usar:** Links de texto do site e do painel (um sinal = um sentido: o mesmo desenho para o mesmo tipo de link). - LinkDeTexto: link dentro de uma frase ou numa linha de dados (site, e-mail, Instagram). --primary-text, sublinhado, seminegrito. `externo` abre em outra aba, mostra o ícone de saída e avisa os leitores de tela.
- **Componentes:**
  - `LinkDeTexto` (props: `href`, `comoLink`, `externo`, `forte`, `className`, `children`)
  - `LinkDeVoltar` (props: `href`, `comoLink`, `className`, `children`)
  - `LinkPularConteudo` (props: `href`, `children`, `className`)
- **Onde ver:** Moldura do site › Links de texto (`site#site-links`) · Moldura do site › Moldura das telas de conta (`site#site-conta`) · Templates › Entrar e criar conta (`templates#template-auth`)

### lista-de-vantagens

- **Arquivo:** [src/app/components/ui/lista-de-vantagens.tsx](src/app/components/ui/lista-de-vantagens.tsx)
- **Quando usar:** Lista de vantagens: as frases curtas do hero ("Lojas e marcas", "Suas peças encontradas por quem procura na região"), cada uma com o check numa base redonda rosa (--primary-muted com o ícone em --primary-text). Uma lista de verdade (<ul>), com o check escondido dos leitores de tela. Texto em --foreground, seminegrito; quebra embaixo do próprio texto, nunca embaixo do check.
- **Componentes:**
  - `ListaDeVantagens` (props: `itens`, `surgir`, `tamanho`, `className`)
- **Onde ver:** Moldura do site › Moldura das telas de conta (`site#site-conta`) · Moldura do site › Vantagens e prova social (`site#site-hero`) · Templates › Entrar e criar conta (`templates#template-auth`)

### logo

- **Arquivo:** [src/app/components/ui/logo.tsx](src/app/components/ui/logo.tsx)
- **Quando usar:** Logo da FindLook: mesma API do Logo do design system Dani Moscatelli. É o desenho oficial (os mesmos traços dos arquivos de src/imports/svg/, conferidos caminho a caminho) em SVG dentro do código: chega ao produto pela sincronização, sem arquivo nem <img> com caminho próprio.
- **Componentes:**
  - `Logo` (props: `variante`, `superficie`, `rotulo`, `corDoSimbolo`, `href`, `comoLink`, `className`)
- **Onde ver:** Moldura do site › Logo (`site#site-logo`) · Demonstrações animadas › Miniatura do painel (`demonstracoes#miniatura-do-painel`)

### lucide-catalogo

- **Arquivo:** [src/app/components/ui/lucide-catalogo.ts](src/app/components/ui/lucide-catalogo.ts)
- **Quando usar:** Catálogo da biblioteca Lucide (lucide-react 1.70.0): 2029 ícones nas categorias oficiais da Lucide (lucide.dev). Cada ícone aparece na sua primeira categoria. Gerado a partir de lucide.dev/api/categories.
- **Funções e constantes:** `versaoLucide`, `categoriasLucide`
- **Onde ver:** Ícones › Biblioteca (`icons#icon-library`)

### luzes-difusas

- **Arquivo:** [src/app/components/ui/luzes-difusas.tsx](src/app/components/ui/luzes-difusas.tsx)
- **Quando usar:** Luzes difusas (tema escuro): Áreas de luz desfocadas, nas cores da marca, que ficam atrás de uma seção escura e dão ao vidro do painel (GlassCard finish="painel") o que mostrar através dele. Movem-se devagar e param com "menos movimento". Ficam atrás do conteúdo (-z-10): a seção precisa de `relative isolate`.
- **Componentes:**
  - `LuzesDifusas` (props: `variante`, `dissolver`, `className`)
- **Onde ver:** Cards › Vidro no tema escuro (`cards#card-glass-escuro`)

### mapa-lojas

- **Arquivo:** [src/app/components/ui/mapa-lojas.tsx](src/app/components/ui/mapa-lojas.tsx)
- **Quando usar:** Mapa de lojas (FindLook): o bloco "Lojas e brechós no mapa", com o mapa, a lista "Lojas no mapa" e o convite "Sua loja não está no mapa?".
- **Componentes:**
  - `MapaDeLojas` (props: `mapa`, `lojas`, `selecionada`, `onSelecionar`, `rotuloLista`, `aviso`, `convite`, `className`)
  - `MapaIlustrativo` (props: `pinos`, `selecionada`, `onSelecionar`, `rotulo`, `selo`, `detalhe`, `onFecharDetalhe`, `className`)
  - `ConviteAoMapa` (props: `titulo`, `texto`, `link`, `className`)
- **Onde ver:** Padrões do produto › Card de loja e mapa (`produto#produto-loja-mapa`)

### menubar

- **Arquivo:** [src/app/components/ui/menubar.tsx](src/app/components/ui/menubar.tsx)
- **Quando usar:** Barra de menus horizontal, como em programas de computador.
- **Componentes:**
  - `Menubar` (props: `className`)
  - `MenubarMenu`
  - `MenubarGroup`
  - `MenubarPortal`
  - `MenubarRadioGroup`
  - `MenubarTrigger` (props: `className`)
  - `MenubarContent` (props: `className`, `align`, `alignOffset`, `sideOffset`)
  - `MenubarItem` (props: `className`, `inset`, `variant`)
  - `MenubarCheckboxItem` (props: `className`, `children`, `checked`)
  - `MenubarRadioItem` (props: `className`, `children`)
  - `MenubarLabel` (props: `className`, `inset`)
  - `MenubarSeparator` (props: `className`)
  - `MenubarShortcut` (props: `className`)
  - `MenubarSub`
  - `MenubarSubTrigger` (props: `className`, `inset`, `children`)
  - `MenubarSubContent` (props: `className`)
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### miniatura-do-painel

- **Arquivo:** [src/app/components/ui/miniatura-do-painel.tsx](src/app/components/ui/miniatura-do-painel.tsx)
- **Quando usar:** Miniatura do painel: uma ilustração conceitual do painel da loja para páginas de venda (hero da página do lojista), montada com as mesmas formas do painel de verdade, em escala reduzida. É uma ilustração: fica fora da leitura de tela e o aviso embaixo ("Ilustração conceitual com dados fictícios") é lido.
- **Componentes:**
  - `MiniaturaDoPainel` (props: `titulo`, `menu`, `ativo`, `logo`, `avatar`, `aviso`, `moldura`, `className`, `children`)
  - `IndicadoresDaMiniatura` (props: `itens`, `className`)
  - `GraficoDaMiniatura` (props: `titulo`, `valores`, `eixoX`, `className`)
  - `TabelaDaMiniatura` (props: `colunas`, `linhas`, `className`)
- **Onde ver:** Demonstrações animadas › Miniatura do painel (`demonstracoes#miniatura-do-painel`)

### moldura-de-conta

- **Arquivo:** [src/app/components/ui/moldura-de-conta.tsx](src/app/components/ui/moldura-de-conta.tsx)
- **Quando usar:** MolduraDeConta (telas de conta): mesma API da MolduraDeConta do design system Dani Moscatelli. A moldura de Entrar, Criar conta, Recuperar acesso, Redefinir senha, Minha conta e Área administrativa: página inteira no cinza da página (--muted), com um card só de borda (sem sombra sobre o cinza) centralizado: logo (link para o início), selo opcional ("Área administrativa"), título (h1, 24 px), uma frase de apoio, o …
- **Componentes:**
  - `MolduraDeConta` (props: `titulo`, `descricao`, `selo`, `logo`, `inicioHref`, `rotuloInicio`, `rodape`, `telaCheia`, `lateral`, `comoLink`, `children`, `className`)
- **Onde ver:** Moldura do site › Moldura das telas de conta (`site#site-conta`) · Templates › Entrar e criar conta (`templates#template-auth`)

### movimento

- **Arquivo:** [src/app/components/ui/movimento.ts](src/app/components/ui/movimento.ts)
- **Quando usar:** Tokens de movimento em JavaScript: os mesmos valores de --duration-* e --ease-* (theme.css, documentados em Movimento › Tokens), para animações feitas com a biblioteca motion ou com a Web Animations API. Use estes nomes em vez de copiar números no produto; se o token mudar no tema, mude aqui também.
- **Funções e constantes:** `DURACAO`, `DURACAO_MS`, `CURVA`, `CURVA_SNAPPY`, `curvaCss`, `useMenosMovimento`
- **Onde ver:** Demonstrações animadas › Miniatura do painel (`demonstracoes#miniatura-do-painel`) · Demonstrações animadas › Cursor de demonstração (`demonstracoes#cursor-de-demonstracao`)

### navigation-menu

- **Arquivo:** [src/app/components/ui/navigation-menu.tsx](src/app/components/ui/navigation-menu.tsx)
- **Quando usar:** Navegação de site com submenus.
- **Componentes:**
  - `NavigationMenu` (props: `className`, `children`, `viewport`)
  - `NavigationMenuList` (props: `className`)
  - `NavigationMenuItem` (props: `className`)
  - `NavigationMenuTrigger` (props: `className`, `children`)
  - `NavigationMenuContent` (props: `className`)
  - `NavigationMenuViewport` (props: `className`)
  - `NavigationMenuLink` (props: `className`)
  - `NavigationMenuIndicator` (props: `className`)
- **Funções e constantes:** `navigationMenuTriggerStyle`
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### numero-animado

- **Arquivo:** [src/app/components/ui/numero-animado.tsx](src/app/components/ui/numero-animado.tsx)
- **Quando usar:** Número animado: sobe de 0 até o valor quando aparece na tela e, depois, acompanha as mudanças do valor (por exemplo, as visualizações de uma demonstração "ao vivo"). Formato pt-BR (1.284) por padrão. Leitores de tela ouvem só o valor final (o número que corre fica oculto para eles). Com "menos movimento", o valor aparece direto. Números tabulares, para a largura não pular enquanto conta.
- **Componentes:**
  - `NumeroAnimado` (props: `valor`, `atraso`, `duracao`, `formatar`)
- **Onde ver:** Demonstrações animadas › Número animado (`demonstracoes#numero-animado`)

### pagination

- **Arquivo:** [src/app/components/ui/pagination.tsx](src/app/components/ui/pagination.tsx)
- **Quando usar:** Navegação entre páginas, com a ativa na cor primária.
- **Componentes:**
  - `Pagination` (props: `className`)
  - `PaginationContent` (props: `className`)
  - `PaginationItem`
  - `PaginationLink` (props: `className`, `isActive`, `size`)
  - `PaginationPrevious` (props: `className`)
  - `PaginationNext` (props: `className`)
  - `PaginationEllipsis` (props: `className`)
  - `PaginationStatus` (props: `atual`, `total`, `className`): Resumo da posição ("Página 4 de 12"), para o celular, entre as setas, no lugar dos números (27/11/2026).
- **Onde ver:** Sobreposições (overlays) › Paginação (`overlays#pagination`)

### painel-cabecalho

- **Arquivo:** [src/app/components/ui/painel-cabecalho.tsx](src/app/components/ui/painel-cabecalho.tsx)
- **Quando usar:** Cabeçalho da página do painel (FindLook): CabecalhoDaPagina: saudação (selo opcional), título com a palavra da marca em destaque, descrição e área de ações. SeletorDePeriodo: períodos prontos. BotaoDividido: ação principal com menu de ações relacionadas. BannerPromocional: aviso fechável com imagem e botão.
- **Componentes:**
  - `CabecalhoDaPagina` (props: `saudacao`, `titulo`, `descricao`, `acoes`, `abas`, `nivel`, `idDoTitulo`, `className`): Cabeçalho da página fora do card (Opção A): título, descrição, ações e, opcionalmente, as abas da página. O conteúdo vem embaixo, em cards com cabeçalho de ícone (CardComCabecalho).
  - `SeletorDePeriodo` (props: `valor`, `onChange`, `periodos`, `className`)
  - `BotaoDividido` (props: `rotulo`, `icone`, `onClick`, `acoes`, `rotuloMenu`, `className`)
  - `BannerPromocional` (props: `titulo`, `texto`, `acao`, `onAcao`, `onFechar`, `imagem`, `className`)
- **Funções e constantes:** `destacar`, `periodosPadrao`
- **Onde ver:** Botões › Botão dividido (`buttons#botao-dividido`) · Botões › Seletor de período (`buttons#seletor-periodo`) · Feedback › Banner promocional (`feedback#banner-promocional`) · e mais 3 seções (ver `catalogo.json`)

### painel-dados

- **Arquivo:** [src/app/components/ui/painel-dados.tsx](src/app/components/ui/painel-dados.tsx)
- **Quando usar:** Dados do painel da loja (FindLook): Formatação pt-BR, card de indicador (KPI), gráfico de desempenho com legenda que liga e desliga séries, item de atividade, item de ação (insight / próxima ação), lista de tendências, item de checklist, anel de pontuação, carrossel de dicas, faixa de benefícios, uso com limite (PainelDeUso, o destaque do topo, e CardDeUso, um card por tipo de uso) e andamento de uma tarefa …
- **Componentes:**
  - `IconeComBase` (props: `tom`, `tamanho`, `redonda`, `children`, `className`)
  - `Variacao` (props: `valor`, `comparacao`, `className`): Variação (seta + texto; nunca só cor)
  - `Explicacao` (props: `termo`, `children`): Explicação acessível (toque, teclado e mouse)
  - `CardIndicador` (props: `icone`, `valor`, `total`, `rotulo`, `formato`, `formatar`, `variacao`, `comparacao`, `explicacao`, `grafico`, `href`, `onClick`, `comoLink`, `className`): Mesma anatomia dos Cards de KPI do DS: rótulo, número, ícone em quadrado neutro à direita e variação embaixo. Diagramação (21/11/2026 e 27/11/2026, pedidos da dona do produto): o ícone de explicação fica sempre colado à última palavra do …
  - `GraficoDeDesempenho` (props: `dados`, `chaveX`, `series`, `visiveisIniciais`, `altura`, `destacarUltimo`, `className`)
  - `ItemDeAtividade` (props: `icone`, `iniciaisDe`, `titulo`, `detalhe`, `quando`, `className`): Item de atividade. icone: o ícone do tipo de evento; ou iniciais (o nome de quem aparece na lista), quando o título do card já diz o tipo e o ícone repetido não ajuda a diferenciar os itens (pedido da dona do produto, 20/11/2026).
  - `ItemDeAcao` (props: `midia`, `titulo`, `descricao`, `href`, `onClick`, `tom`, `className`): tom: "marca" (padrão) para o que convida a agir ou está ativo; "neutro" para o que está pausado, encerrado ou é só registro.
  - `ListaDeTendencias` (props: `itens`, `className`): Lista de tendências
  - `ItemDeChecklist` (props: `estado`, `texto`, `href`, `className`): Item de checklist
  - `AnelDePontuacao` (props: `valor`, `tamanho`, `rotulo`, `className`)
  - `CarrosselDeDicas` (props: `dicas`, `onFechar`, `className`): Carrossel de dicas (27/11/2026): a dica num card; embaixo dela, alinhados à esquerda com a borda do card da dica, os controles (anterior, "1 de 3", próxima).
  - `FaixaDeBeneficios` (props: `icone`, `titulo`, `texto`, `beneficios`, `className`): Faixa de benefícios
  - `CardDoPainel` (props: `icone`, `titulo`, `descricao`, `acao`, `children`, `className`, `id`, `nivel`): Card de seção do painel (título, descrição, ação)
  - `DivisorSuave` (props: `className`): Linha de 1 px que some nas laterais: degradê transparente → --border-strong → transparente, com o esmaecimento nos últimos ~18% de cada lado. Separa partes de um card sem fechar uma caixa (pedido da dona do produto, 23/11/2026).
  - `CardComCabecalho` (props: `icone`, `titulo`, `descricao`, `acao`, `tom`, `cabecalho`, `children`, `className`, `id`, `nivel`, `sangria`, `idDoTitulo`)
  - `ConteudoRecolhivel` (props: `children`, `titulo`, `descricao`, `altura`, `preencher`, `aberto`, `onAbertoChange`, `onMostrarMais`, `rotuloMais`, `className`): Conteúdo de card sem rolagem própria (pedido da dona do produto, 21/11/2026: cards com rolagem por dentro prendiam a roda do mouse e dificultavam rolar a página). O que não cabe fica escondido sob um degradê.
  - `LinkVerTudo` (props: `children`, `href`, `rotulo`, `onClick`, `tom`, `icone`, `as`): Link "ver tudo" com seta. tom="marca" (padrão) para o principal; tom="neutro" (cinza) para o secundário, quando há dois lado a lado e um não pode competir com o outro. Sem href, vira botão (abre painel lateral, por exemplo).
  - `FaixaDeEstado` (props: `estado`, `titulo`, `texto`, `complemento`, `tom`, `className`): Faixa de estado: o chip do estado (ícone + texto, nunca só cor), uma divisória e, ao lado, o que está acontecendo e o que vem depois.
  - `ProgressoRotulado` (props: `rotulo`, `pct`, `texto`, `className`): Progresso com rótulo: o nome à esquerda, a porcentagem à direita e a barra fina (trilho cinza, preenchimento na primária).
  - `ResumoEmLinha` (props: `itens`, `className`): Resumo em linha: poucos números (2 a 4) lado a lado, cada um com o ícone em base cinza (só identifica), o valor e o rótulo embaixo, separados por divisórias. Em telas estreitas, um embaixo do outro. Para números soltos dentro de um card;
  - `PainelDeUso` (props: `icone`, `sobretitulo`, `titulo`, `descricao`, `usado`, `limite`, `unidade`, `selo`, `className`): Destaque do uso do mês, no padrão clean dos templates: card branco, ícone de marca (base rosa, é o foco da página), a porcentagem grande com a barra e o estado do limite numa linha discreta (neutra) ou em alerta.
  - `CardDeUso` (props: `icone`, `rotulo`, `usado`, `limite`, `semLimite`, `className`): Um tipo de uso do mês, no formato do CardIndicador: rótulo, número e ícone em base cinza; embaixo, a barra e a porcentagem do limite.
- **Funções e constantes:** `superficieDoCard`, `formatarNumero`, `formatarPreco`, `formatarVariacao`, `iniciais`, `faixaDaPontuacao`
- **Onde ver:** Cards › Faixa de benefícios (`cards#faixa-beneficios`) · Exibição de dados › Gráfico de desempenho (`data#grafico-desempenho`) · Quadro, conversa e tabela › Card de indicador clicável (`painel-e-admin#card-indicador-link`) · e mais 14 seções (ver `catalogo.json`)

### painel-produtos

- **Arquivo:** [src/app/components/ui/painel-produtos.tsx](src/app/components/ui/painel-produtos.tsx)
- **Quando usar:** No servidor (renderização no servidor) não existe layout: useEffect lá, useLayoutEffect no navegador (27/11/2026).
- **Componentes:**
  - `AbasComContador` (props: `abas`, `valor`, `onChange`, `estilo`, `rotulo`, `idBase`, `className`): estilo "pagina" (Opção A, 23/11/2026): abas da página, logo abaixo do título, sem linha de base de ponta a ponta; só a aba ativa tem o sublinhado. "sublinhado" mantém a linha de base (abas dentro de um card, como na tabela).
  - `CelulaDeProduto` (props: `nome`, `detalhes`, `icone`, `foto`, `className`)
  - `MedidorDeDesempenho` (props: `nivel`, `visualizacoes`, `favoritos`, `className`): nivel de 0 a 5. Sempre acompanhado do número em texto.
  - `StatusDePublicacao` (props: `status`, `motivo`, `className`)
  - `BarraDeAcoesEmLote` (props: `selecionados`, `onLimpar`, `acoes`, `className`, `itemNoSingular`, `itemNoPlural`, `selecionadaNoFeminino`, `textoDaContagem`, `rotuloDaRegiao`, `rotuloLimpar`, `children`)
  - `TabelaDeProdutos` (props: `produtos`, `titulo`, `descricao`, `total`, `limite`, `selecionavel`, `estiloAbas`, `contagens`, `onVerTodos`, `className`)
- **Funções e constantes:** `statusInfo`
- **Onde ver:** Estados de informação › Status de publicação (`states#states-publicacao`) · Exibição de dados › Tabela de produtos (`data#tabela-produtos`) · Feedback › Abas com contador (`feedback#abas-contador`) · e mais 4 seções (ver `catalogo.json`)

### painel-shell

- **Arquivo:** [src/app/components/ui/painel-shell.tsx](src/app/components/ui/painel-shell.tsx)
- **Quando usar:** Estrutura do painel da loja (FindLook): Peças do menu lateral e da barra superior do painel: seletor de loja, item de menu (com contador), grupo do menu, card de plano, card de ajuda, campo de busca que abre a busca global (Ctrl + K), botão de notificações e gatilho do menu da conta. Todas usam só tokens do DS.
- **Componentes:**
  - `MenuLateralProvider` (props: `children`, `chave`, `padrao`, `recolhido`, `onRecolhidoChange`)
  - `MenuLateral` (props: `midia`, `grudarAbaixoDe`, `className`, `style`, `children`): Coluna do menu lateral fixo (telas largas). Muda de largura entre 256 px e 72 px com os tokens de movimento; com "menos movimento", a troca é instantânea. Use dentro de um MenuLateralProvider.
  - `NavDoMenu` (props: `className`): <nav> do menu lateral, com o id que o BotaoRecolherMenu controla e a rolagem própria.
  - `DivisorDoMenu` (props: `className`): Linha fina entre grupos do menu.
  - `BotaoRecolherMenu` (props: `className`, `onClick`, `rotulo`, `rotuloRecolher`, `rotuloExpandir`)
  - `TopoDoMenu` (props: `className`, `children`): Topo do menu lateral (como no site do DS): o botão "≡ Menu", centralizado quando recolhido.
  - `BarraSuperiorDoPainel` (props: `className`, `children`): Faixa branca de ponta a ponta no alto do painel, acima do menu lateral, com linha fina embaixo. O logo fica à esquerda; busca e notificações à direita; o perfil (GatilhoDaConta) sempre na ponta direita.
  - `AvatarPainel` (props: `nome`, `foto`, `className`)
  - `SeletorDeLoja` (props: `loja`, `foto`, `verificada`, `className`)
  - `ItemDoMenu` (props: `icone`, `ativo`, `contador`, `rotuloContador`, `as`, `className`, `children`)
  - `GrupoDoMenu` (props: `titulo`, `children`, `className`, `expansivel`, `icone`, `padraoAberto`, `aberto`, `onAbertoChange`, `contador`, `rotuloContador`, `ativo`)
  - `CardDePlano` (props: `compacto`, `plano`, `preco`, `descricao`, `acao`, `onAcao`, `className`)
  - `CardDeAjuda` (props: `titulo`, `texto`, `href`, `className`): Card de ajuda (rodapé do menu)
  - `CampoDeBuscaGlobal` (props: `placeholder`, `atalho`, `onAbrir`, `className`): Barra superior
  - `BotaoDeNotificacoes` (props: `naoLidas`, `indicador`, `className`): indicador: "ponto" (padrão aqui) ou "numero" (a quantidade num círculo). Mesmas props do DS Dani Moscatelli.
  - `GatilhoDaConta` (props: `nome`, `papel`, `foto`, `className`)
- **Funções e constantes:** `LARGURA_EXPANDIDO`, `LARGURA_RECOLHIDO`, `useMenuLateral`, `useMenuRecolhido`, `iniciais`
- **Onde ver:** Cards › Card de plano (`cards#card-plano`) · Sobreposições (overlays) › Menu do painel (`overlays#menu-painel`) · Sobreposições (overlays) › Barra superior (`overlays#barra-superior`) · e mais 1 seções (ver `catalogo.json`)

### partner-card

- **Arquivo:** [src/app/components/ui/partner-card.tsx](src/app/components/ui/partner-card.tsx)
- **Quando usar:** PartnerCard (card de convite ao parceiro): Card que convida ao cadastro: selo, título com destaque, texto curto, ação principal e link secundário opcional. Vertical ou horizontal; tamanhos p, m e g. Sem orientation, segue a GradeDeCards: horizontal quando a grade virou lista (regra da dona do produto, 27/11/2026). Fundo de card com um brilho suave na cor primária no canto, como o hero do site.
- **Componentes:**
  - `PartnerCard` (props: `orientation`, `size`, `eyebrow`, `title`, `description`, `cta`, `secondary`, `visual`, `surface`, `className`)
- **Onde ver:** Cards › Arquitetura de informação (`cards#card-ia`) · Cards › Card de convite ao parceiro (`cards#card-partner`)

### password-field

- **Arquivo:** [src/app/components/ui/password-field.tsx](src/app/components/ui/password-field.tsx)
- **Quando usar:** Campo de senha com confirmação (PasswordField / PasswordConfirm): - Exibir/ocultar senha em cada campo (botão com aria-pressed e rótulo). - Força da senha em 4 barras + rótulo em texto (Fraca, Razoável, Boa, Forte), calculada pelos requisitos atendidos. - Dica de preenchimento: requisito ainda não atendido tem um ponto neutro (como o de uma lista) e texto cinza;
- **Componentes:**
  - `PasswordInput` (props: `label`, `value`, `onValueChange`, `textos`, `invalido`, `describedBy`, `id`, `className`): Um campo de senha com o botão de exibir/ocultar.
  - `PasswordConfirm` (props: `senha`, `confirmacao`, `onSenhaChange`, `onConfirmacaoChange`, `regras`, `textos`, `semConfirmacao`, `erroSenha`, `erroConfirmacao`, `idSenha`, `idConfirmacao`, `disabled`, `className`): Senha + confirmação, com força da senha, dicas com check e verificação de coincidência.
- **Funções e constantes:** `regrasPadrao`, `textosPadrao`, `forcaDaSenha`
- **Onde ver:** Botões › Senha (`buttons#password`) · Padrões do produto › Cadastro do lojista (`produto#produto-cadastro`)

### popover

- **Arquivo:** [src/app/components/ui/popover.tsx](src/app/components/ui/popover.tsx)
- **Quando usar:** Painel flutuante preso a um botão.
- **Componentes:**
  - `Popover`
  - `PopoverTrigger`
  - `PopoverContent` (props: `className`, `align`, `sideOffset`, `collisionPadding`)
  - `PopoverAnchor`
- **Onde ver:** Sobreposições (overlays) › Diálogos (`overlays#dialogs`)

### product-card

- **Arquivo:** [src/app/components/ui/product-card.tsx](src/app/components/ui/product-card.tsx)
- **Quando usar:** ProductCard (card de peça): Card de uma peça na busca, nos favoritos ou na vitrine da loja. Segue a anatomia do Card do sistema: superfície `--card`, borda `--border`, raio `--radius`, sombra `--shadow-sm`; imagem em superfície de apoio (`--surface-tint`); ação principal com o Button padrão; favorito como botão de alternância com estado acessível (aria-pressed); estoque sempre com ícone + texto, nunca só cor.
- **Componentes:**
  - `ProductCard` (props: `nome`, `loja`, `estilo`, `preco`, `precoAntigo`, `novo`, `imagem`, `icone`, `favorito`, `onFavoritar`, `estoque`, `cta`, `compacto`, `orientation`, `className`)
- **Onde ver:** Cards › Card de peça (`cards#card-produto`)

### progress

- **Arquivo:** [src/app/components/ui/progress.tsx](src/app/components/ui/progress.tsx)
- **Quando usar:** Barra de progresso.
- **Componentes:**
  - `Progress` (props: `className`, `value`)
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### prosa

- **Arquivo:** [src/app/components/ui/prosa.tsx](src/app/components/ui/prosa.tsx)
- **Quando usar:** Prosa (texto longo: Termos de uso, Política de privacidade, páginas de ajuda): mesma API nos dois DS (FindLook e Dani Moscatelli, 27/11/2026). Aplica a tipografia do DS a um texto corrido em HTML simples (h1, h2, h3, p, ul, ol, a, strong, blockquote, table, hr), sem classes em cada elemento.
- **Componentes:**
  - `Prosa` (props: `tamanho`, `html`, `className`, `children`)
- **Onde ver:** Moldura do site › Prosa (textos longos) (`site#site-prosa`)

### prova-social

- **Arquivo:** [src/app/components/ui/prova-social.tsx](src/app/components/ui/prova-social.tsx)
- **Quando usar:** Prova social do hero: círculos de avatares (AvatarCircles) e uma frase curta ao lado, com o número em destaque ("800 pessoas já encontraram seus looks"). O destaque fica em --primary-text e o resto em --muted-foreground. Na mesma linha quando cabe; no celular, a frase desce para baixo dos avatares, alinhada à mesma borda esquerda. Regra de conteúdo: número real (ou zerado no lançamento); nunca invente.
- **Componentes:**
  - `ProvaSocial` (props: `avatares`, `maisPessoas`, `destaque`, `texto`, `tamanho`, `className`)
- **Onde ver:** Moldura do site › Vantagens e prova social (`site#site-hero`)

### quadro

- **Arquivo:** [src/app/components/ui/quadro.tsx](src/app/components/ui/quadro.tsx)
- **Quando usar:** Quadro (colunas de etapas com cartões, estilo kanban). O mesmo arquivo nos dois DS (FindLook e Dani Moscatelli, 27/11/2026), com dois jeitos de usar e as mesmas props:
- **Componentes:**
  - `Quadro` (props: `colunas`, `rotulo`, `textos`, `className`, `itens`, `chave`)
- **Onde ver:** Quadro, conversa e tabela › Quadro (kanban) (`painel-e-admin#quadro`)

### radio-group

- **Arquivo:** [src/app/components/ui/radio-group.tsx](src/app/components/ui/radio-group.tsx)
- **Quando usar:** Escolha única entre poucas opções.
- **Componentes:**
  - `RadioGroup` (props: `className`)
  - `RadioGroupItem` (props: `className`): Opção de rádio: desenho de 20 px; no toque, área clicável de 44 × 44 px em volta, sem mudar o desenho (27/11/2026).
- **Onde ver:** Botões › Senha (`buttons#password`) · Padrões do produto › Cadastro do lojista (`produto#produto-cadastro`)

### recorte-de-foto

- **Arquivo:** [src/app/components/ui/recorte-de-foto.tsx](src/app/components/ui/recorte-de-foto.tsx)
- **Quando usar:** RecorteDeFoto (enviar uma foto e enquadrar: quadrado ou redondo): Veio da página de autorização da galeria da Rede de Parceiros (rede-parceiros/galeria/autorizar, em HTML): a pessoa escolhe a foto, arrasta para enquadrar o rosto, ajusta o zoom, vê a prévia e usa a foto.
- **Componentes:**
  - `RecorteDeFoto` (props: `onRecortar`, `onCancelar`, `forma`, `tamanhoDeSaida`, `tipo`, `qualidade`, `tamanhoMaximoMb`, `minimoPx`, `formatos`, `zoomMaximo`, `textos`, `className`)
- **Onde ver:** Upload › Recorte de foto (`upload#recorte-de-foto`) · Upload › Área de soltar (`upload#upload-dropzone`)

### resizable

- **Arquivo:** [src/app/components/ui/resizable.tsx](src/app/components/ui/resizable.tsx)
- **Quando usar:** Painéis com alça para redimensionar.
- **Componentes:**
  - `ResizablePanelGroup` (props: `className`)
  - `ResizablePanel`
  - `ResizableHandle` (props: `withHandle`, `className`)
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### rodape-do-site

- **Arquivo:** [src/app/components/ui/rodape-do-site.tsx](src/app/components/ui/rodape-do-site.tsx)
- **Quando usar:** Rodapé do site (páginas públicas), do protótipo do produto (v8.87) com as regras do DS. Partes, todas opcionais menos a marca: - marca: logo, slogan (20 px, negrito), texto curto e um complemento (por exemplo, o Instagram). - colunas: grupos de links, cada um com título (um <nav> com o nome do grupo). No celular, duas colunas lado a lado.
- **Componentes:**
  - `RodapeDoSite` (props: `marca`, `superficie`, `inicioHref`, `colunas`, `convite`, `faixa`, `linhaFinal`, `creditos`, `comoLink`, `className`)
- **Onde ver:** Moldura do site › Rodapé do site (`site#site-rodape`)

### scroll-area

- **Arquivo:** [src/app/components/ui/scroll-area.tsx](src/app/components/ui/scroll-area.tsx)
- **Quando usar:** Área com barra de rolagem estilizada.
- **Componentes:**
  - `ScrollArea` (props: `className`, `children`)
  - `ScrollBar` (props: `className`, `orientation`)
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### segmented-control

- **Arquivo:** [src/app/components/ui/segmented-control.tsx](src/app/components/ui/segmented-control.tsx)
- **Quando usar:** SegmentedControl (controle segmentado): Opções acopladas, uma selecionada por vez, que se tocam como botões. Use para escolhas curtas e exclusivas (2 a 5 opções, rótulos de uma ou duas palavras): filtro, condição, período, modo de exibição. Sempre há uma opção selecionada. Teclado: setas movem a seleção; Tab entra e sai do grupo.
- **Componentes:**
  - `SegmentedControl` (props: `options`, `value`, `defaultValue`, `onValueChange`, `variant`, `size`, `fullWidth`, `className`)
- **Onde ver:** Botões › Cartões de escolha (`buttons#cartoes-de-escolha`) · Linha do tempo › Demonstração (`timeline#timeline-demo`) · Upload › Recorte de foto (`upload#recorte-de-foto`) · e mais 10 seções (ver `catalogo.json`)

### select

- **Arquivo:** [src/app/components/ui/select.tsx](src/app/components/ui/select.tsx)
- **Quando usar:** Lista de seleção em campo de 40 px.
- **Componentes:**
  - `Select`
  - `SelectGroup`
  - `SelectValue`
  - `SelectTrigger` (props: `className`, `size`, `children`)
  - `SelectContent` (props: `className`, `children`, `position`)
  - `SelectLabel` (props: `className`)
  - `SelectItem` (props: `className`, `children`)
  - `SelectSeparator` (props: `className`)
  - `SelectScrollUpButton` (props: `className`)
  - `SelectScrollDownButton` (props: `className`)
- **Onde ver:** Botões › Senha (`buttons#password`) · Cards › Estados (`cards#card-states`) · Cards › Testar o vidro (`cards#card-glass-teste`) · e mais 1 seções (ver `catalogo.json`)

### seletor-de-quantidade

- **Arquivo:** [src/app/components/ui/seletor-de-quantidade.tsx](src/app/components/ui/seletor-de-quantidade.tsx)
- **Quando usar:** Seletor de quantidade (estoque por tamanho, quantidade de peças): menos, o número e mais, numa caixa só de borda. Botões de 44 px no celular e 40 px no computador; o menos fica desabilitado no mínimo e o mais no máximo. O número pulsa de leve a cada mudança (parado com "menos movimento") e é anunciado aos leitores de tela.
- **Componentes:**
  - `SeletorDeQuantidade` (props: `valor`, `onValorChange`, `rotulo`, `min`, `max`, `passo`, `desabilitado`, `className`)
- **Onde ver:** Campos e formulários › Seletor de quantidade (`campos#seletor-de-quantidade`)

### selo

- **Arquivo:** [src/app/components/ui/selo.tsx](src/app/components/ui/selo.tsx)
- **Quando usar:** Selo (tag do hero): Padrão da página Experience Intelligence do site do estúdio (`.selo`): pílula com fundo de card, borda fina, texto em caixa alta pequena com espaçamento largo e um ponto na cor primária. Serve para situar a pessoa no topo de uma página ou seção (nome do produto, contexto, local), nunca para status ou contagem.
- **Componentes:**
  - `Selo` (props: `className`, `dot`, `icon`, `tone`, `size`, `children`)
- **Onde ver:** Rótulos › Selo (tag do hero) (`badges#selo`) · Rótulos › Selo de seção (`badges#selo-secao`) · Feedback (`feedback`, fora das seções)

### selo-secao

- **Arquivo:** [src/app/components/ui/selo-secao.tsx](src/app/components/ui/selo-secao.tsx)
- **Quando usar:** SeloSecao (selo de seção): Padrão das seções da página Experience Intelligence 2 do site do estúdio ("Cenário Atual", "O Desafio", "Método"…): pílula preenchida com o tom claro da primária, borda fina na primária, texto na cor primária de texto, em caixa alta com espaçamento largo (0,2em), sem ponto. Fica centralizada acima do título da seção.
- **Componentes:**
  - `SeloSecao` (props: `className`, `icon`, `size`, `children`)
- **Onde ver:** Rótulos › Selo de seção (`badges#selo-secao`) · Feedback (`feedback`, fora das seções)

### separator

- **Arquivo:** [src/app/components/ui/separator.tsx](src/app/components/ui/separator.tsx)
- **Quando usar:** Linha divisória horizontal ou vertical.
- **Componentes:**
  - `Separator` (props: `className`, `orientation`, `decorative`)
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### sheet

- **Arquivo:** [src/app/components/ui/sheet.tsx](src/app/components/ui/sheet.tsx)
- **Quando usar:** Painel lateral sobre o conteúdo; prende o foco e fecha com Esc.
- **Componentes:**
  - `Sheet`
  - `SheetTrigger`
  - `SheetClose`
  - `SheetContent` (props: `className`, `children`, `side`)
  - `SheetHeader` (props: `className`)
  - `SheetFooter` (props: `className`)
  - `SheetTitle` (props: `className`)
  - `SheetDescription` (props: `className`)
- **Onde ver:** Sobreposições (overlays) (`overlays`, fora das seções)

### shine-border

- **Arquivo:** [src/app/components/ui/shine-border.tsx](src/app/components/ui/shine-border.tsx)
- **Quando usar:** Combinações de cores prontas, só com tokens do design system. O dourado é o token `--warning` (âmbar), que fica mais vivo no tema escuro.
- **Componentes:**
  - `ShineBorder` (props: `borderWidth`, `duration`, `shineColor`, `preset`, `className`, `style`)
  - `BrilhoDeSelecionado` (props: `className`): Borda do card selecionado (decisão da dona do produto, 27/11/2026): o estado selecionado padrão de cards selecionáveis (CardDePreco, cartões de Cards › Estados) é a borda de 2 px na primária com o brilho do ShineBorder (preset "primaria": …
- **Funções e constantes:** `shinePresets`, `molduraDoSelecionavel`
- **Onde ver:** Cards › Borda brilhante (shine border) (`cards#card-shine`) · Cards › Estados (`cards#card-states`)

### side-panel

- **Arquivo:** [src/app/components/ui/side-panel.tsx](src/app/components/ui/side-panel.tsx)
- **Quando usar:** SidePanel (painel lateral / gaveta): Padrão do formulário de contato do site do estúdio, generalizado: - abre pela direita; largura total no celular, 500 px no tablet e 540 px no desktop; - fundo escurecido com desfoque; cantos arredondados à esquerda a partir do tablet; - três zonas: cabeçalho fixo, corpo rolável e barra de ação fixa (mais um rodapé opcional); - fecha por Esc, clique fora ou botão;
- **Componentes:**
  - `SidePanel`
  - `SidePanelTrigger`
  - `SidePanelClose`
  - `SidePanelContent` (props: `className`, `children`, `width`, `side`, `closeLabel`): Contêiner do painel: overlay + caixa deslizante com as três zonas em `children`.
  - `SidePanelHeader` (props: `eyebrow`, `title`, `description`, `className`): Cabeçalho fixo: rótulo pequeno (eyebrow), título e texto de apoio.
  - `SidePanelBody` (props: `className`): Corpo rolável.
  - `SidePanelActions` (props: `className`): Barra de ação fixa na base (botão principal).
  - `SidePanelFooter` (props: `className`): Rodapé discreto abaixo da barra de ação (nota de segurança, assinatura).
- **Onde ver:** Painel lateral › Comportamento (`sidepanel#sidepanel-behavior`) · Painel lateral › Formulário em painel (`sidepanel#sidepanel-store`)

### sidebar

- **Arquivo:** [src/app/components/ui/sidebar.tsx](src/app/components/ui/sidebar.tsx)
- **Quando usar:** Navegação lateral recolhível para aplicativos.
- **Componentes:**
  - `SidebarProvider` (props: `defaultOpen`, `open`, `onOpenChange`, `className`, `style`, `children`)
  - `Sidebar` (props: `side`, `variant`, `collapsible`, `className`, `children`)
  - `SidebarTrigger` (props: `className`, `onClick`)
  - `SidebarRail` (props: `className`)
  - `SidebarInset` (props: `className`)
  - `SidebarInput` (props: `className`)
  - `SidebarHeader` (props: `className`)
  - `SidebarFooter` (props: `className`)
  - `SidebarSeparator` (props: `className`)
  - `SidebarContent` (props: `className`)
  - `SidebarGroup` (props: `className`)
  - `SidebarGroupLabel` (props: `className`, `asChild`)
  - `SidebarGroupAction` (props: `className`, `asChild`)
  - `SidebarGroupContent` (props: `className`)
  - `SidebarMenu` (props: `className`)
  - `SidebarMenuItem` (props: `className`)
  - `SidebarMenuButton` (props: `asChild`, `isActive`, `variant`, `size`, `tooltip`, `className`)
  - `SidebarMenuAction` (props: `className`, `asChild`, `showOnHover`)
  - `SidebarMenuBadge` (props: `className`)
  - `SidebarMenuSkeleton` (props: `className`, `showIcon`)
  - `SidebarMenuSub` (props: `className`)
  - `SidebarMenuSubItem` (props: `className`)
  - `SidebarMenuSubButton` (props: `asChild`, `size`, `isActive`, `className`)
- **Funções e constantes:** `useSidebar`
- **Variantes:** `variant` = `default` · `outline`; `size` = `default` · `sm` · `lg`
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### skeleton

- **Arquivo:** [src/app/components/ui/skeleton.tsx](src/app/components/ui/skeleton.tsx)
- **Quando usar:** Espaço de carregamento no formato do conteúdo.
- **Componentes:**
  - `Skeleton` (props: `className`)
- **Onde ver:** Feedback › Carregamento (skeleton) (`feedback#skeleton`) · Cards › Estados (`cards#card-states`) · Rótulos (`badges`, fora das seções)

### slider

- **Arquivo:** [src/app/components/ui/slider.tsx](src/app/components/ui/slider.tsx)
- **Quando usar:** Controle deslizante para escolher um valor ou intervalo.
- **Componentes:**
  - `Slider` (props: `className`, `defaultValue`, `value`, `min`, `max`)
- **Onde ver:** Cards › Testar o vidro (`cards#card-glass-teste`)

### sonner

- **Arquivo:** [src/app/components/ui/sonner.tsx](src/app/components/ui/sonner.tsx)
- **Quando usar:** Tema atual: segue a classe .dark do documento (sem depender de next-themes).
- **Componentes:**
  - `Toaster`: Notificações temporárias (toast). Monte <Toaster /> uma vez na raiz do app e chame toast(), toast.success(), toast.error(), toast.warning(), toast.info() ou toast.loading() de "sonner". Ícone e texto sempre juntos.
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### status-chip

- **Arquivo:** [src/app/components/ui/status-chip.tsx](src/app/components/ui/status-chip.tsx)
- **Quando usar:** Estados de informação da FindLook: de onde vem cada dado de peça e de loja. Regra: nunca usar apenas cor para comunicar um estado; sempre texto e ícone juntos. Documentação: Diretrizes > Estados de informação.
- **Componentes:**
  - `StatusChip` (props: `state`, `size`, `className`): Selo de estado de informação: ícone + texto, sempre juntos.
- **Funções e constantes:** `estadosDeInformacao`
- **Onde ver:** Estados de informação › Os cinco estados (`states#states-lista`) · Estados de informação › Chip de status (`states#states-componente`)

### stepper

- **Arquivo:** [src/app/components/ui/stepper.tsx](src/app/components/ui/stepper.tsx)
- **Quando usar:** Stepper (indicador de etapas) — progresso de um formulário em várias telas, como o cadastro do lojista.
- **Componentes:**
  - `Stepper` (props: `etapas`, `atual`, `concluidas`, `onIrPara`, `rotulo`, `textos`, `className`)
- **Onde ver:** Etapas (Stepper) › Demonstração (`stepper#stepper-demo`) · Etapas (Stepper) › Uso (`stepper#stepper-usage`)

### surgir-ao-rolar

- **Arquivo:** [src/app/components/ui/surgir-ao-rolar.tsx](src/app/components/ui/surgir-ao-rolar.tsx)
- **Quando usar:** SurgirAoRolar e TituloQueSurge (entrada ao rolar): Os blocos entram quando chegam na tela. Mesma API do SurgirAoRolar do design system Dani Moscatelli, com os tokens de movimento da FindLook (Movimento › Tokens): subir — sobe 24 px e aparece em --duration-xslow (600 ms), curva --ease-snappy (o "Revelar" das landings). desfoque — sobe 24 px saindo de um desfoque de 6 px, no mesmo tempo.
- **Componentes:**
  - `SurgirAoRolar` (props: `as`, `efeito`, `escalonar`, `passo`, `atraso`, `raiz`, `limiar`, `margem`, `repetir`, `duracao`, `className`, `style`, `children`)
  - `TituloQueSurge` (props: `as`, `children`, `passo`, `atraso`, `destaque`, `raiz`, `limiar`, `margem`, `repetir`, `duracao`, `className`, `style`)
- **Funções e constantes:** `useSurgirAoRolar`
- **Onde ver:** Demonstrações animadas › Entrada ao rolar (`demonstracoes#surgir-ao-rolar`)

### switch

- **Arquivo:** [src/app/components/ui/switch.tsx](src/app/components/ui/switch.tsx)
- **Quando usar:** Interruptor: trilho de 44 × 24 px; no toque, a área clicável tem 44 px de altura, sem mudar o desenho (27/11/2026).
- **Componentes:**
  - `Switch` (props: `className`)
- **Onde ver:** Botões › Seletor de período (`buttons#seletor-periodo`) · Templates › Painel da loja (protótipo) (`templates#template-dashboard`) · Cards › Mesma altura ou um por linha (`cards#card-mesma-altura`) · e mais 2 seções (ver `catalogo.json`)

### tabela-adaptavel

- **Arquivo:** [src/app/components/ui/tabela-adaptavel.tsx](src/app/components/ui/tabela-adaptavel.tsx)
- **Quando usar:** Tabela adaptável: o mesmo componente nos dois DS (FindLook e Dani Moscatelli, 27/11/2026): seleção, ordem controlada (ordem + onOrdenar) ou da própria tabela, e as colunas que cabem pela medida da largura (`largura`). A tabela das listas do painel (lojas, peças, agendamentos) que nunca rola para o lado (regra da dona do produto, 18/11/2026).
- **Componentes:**
  - `TabelaAdaptavel` (props: `colunas`, `linhas`, `chave`, `legenda`, `mostrarLegenda`, `ordemInicial`, `textos`, `rotuloDaLinha`, `selecionadas`, `onSelecionadasChange`, `acoes`, `larguraDasAcoes`, `ordem`, `onOrdenar`, `moldura`, `larguraDaLista`, `vazio`, `className`)
  - `BarraDeFerramentasDaTabela` (props: `busca`, `children`, `filtrosAtivos`, `className`): Barra de ferramentas
- **Onde ver:** Quadro, conversa e tabela › Tabela adaptável (`painel-e-admin#tabela-adaptavel`) · Gráficos › Como escolher (`graficos#graficos-escolher`) · Gráficos › Componentes e props (`graficos#graficos-componentes`)

### table

- **Arquivo:** [src/app/components/ui/table.tsx](src/app/components/ui/table.tsx)
- **Quando usar:** Tabela de dados com cabeçalho e linhas.
- **Componentes:**
  - `Table` (props: `className`)
  - `TableHeader` (props: `className`)
  - `TableBody` (props: `className`)
  - `TableFooter` (props: `className`)
  - `TableRow` (props: `className`)
  - `TableHead` (props: `className`)
  - `TableCell` (props: `className`)
  - `TableCaption` (props: `className`)
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### tabs

- **Arquivo:** [src/app/components/ui/tabs.tsx](src/app/components/ui/tabs.tsx)
- **Quando usar:** Abas que trocam o conteúdo no mesmo lugar.
- **Componentes:**
  - `Tabs` (props: `className`)
  - `TabsList` (props: `className`)
  - `TabsTrigger` (props: `className`)
  - `TabsContent` (props: `className`)
- **Onde ver:** Feedback › Abas (`feedback#tabs`) · Rótulos (`badges`, fora das seções)

### textarea

- **Arquivo:** [src/app/components/ui/textarea.tsx](src/app/components/ui/textarea.tsx)
- **Quando usar:** Textarea. `contador` (com maxLength) mostra "120 de 500" embaixo, alinhado à borda esquerda do campo: cinza enquanto há folga, no tom de aviso quando faltam 10% ou menos e no tom de erro no limite. Para leitores de tela, o aviso só fala quando faltam 20 caracteres ou menos ("Restam 12 caracteres"), para não anunciar cada letra.
- **Componentes:**
  - `Textarea` (props: `className`, `contador`, `maxLength`, `onChange`): forwardRef (28/11/2026): a ref chega ao <textarea> (Radix asChild, react-hook-form), como no Button e no Input.
- **Onde ver:** Botões › Senha (`buttons#password`) · Campos e formulários › Campo (o campo padrão) (`campos#campo-padrao`) · Campos e formulários › Texto longo com contador (`campos#campo-texto-longo`) · e mais 2 seções (ver `catalogo.json`)

### timeline

- **Arquivo:** [src/app/components/ui/timeline.tsx](src/app/components/ui/timeline.tsx)
- **Quando usar:** Timeline (linha do tempo) — portada da seção "Como funciona" do site do estúdio.
- **Componentes:**
  - `Timeline` (props: `etapas`, `alternar`, `limite`, `checkNasFeitas`, `animar`, `className`)
- **Onde ver:** Linha do tempo › Demonstração (`timeline#timeline-demo`) · Linha do tempo › Uso (`timeline#timeline-usage`) · Templates › Landing page para lojistas (`templates#template-landing`)

### titulo-de-grupo

- **Arquivo:** [src/app/components/ui/titulo-de-grupo.tsx](src/app/components/ui/titulo-de-grupo.tsx)
- **Quando usar:** Título de grupo com contador: separa os grupos de uma lista ("Atrasados 2", "Hoje 5", "Esta semana 12") e o topo das colunas de um quadro. Título em 14 px negrito e, ao lado, a quantidade numa pílula cinza (números tabulares). Os leitores de tela ouvem "Hoje, 5 itens" (o nome do item muda com `item`/`itens`). `icone` opcional à esquerda, em cinza.
- **Componentes:**
  - `TituloDeGrupo` (props: `titulo`, `quantidade`, `icone`, `item`, `itens`, `nivel`, `acao`, `className`)
- **Onde ver:** Chips e estados › Avaliação e título de grupo (`chips-e-estados#avaliacao-e-grupos`)

### toggle

- **Arquivo:** [src/app/components/ui/toggle.tsx](src/app/components/ui/toggle.tsx)
- **Quando usar:** Botão que fica pressionado (liga/desliga).
- **Componentes:**
  - `Toggle` (props: `className`, `variant`, `size`)
- **Funções e constantes:** `toggleVariants`
- **Variantes:** `variant` = `default` · `outline`; `size` = `default` · `sm` · `lg`
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### toggle-group

- **Arquivo:** [src/app/components/ui/toggle-group.tsx](src/app/components/ui/toggle-group.tsx)
- **Quando usar:** Grupo de botões que ligam e desligam.
- **Componentes:**
  - `ToggleGroup` (props: `className`, `variant`, `size`, `children`)
  - `ToggleGroupItem` (props: `className`, `children`, `variant`, `size`)
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### tooltip

- **Arquivo:** [src/app/components/ui/tooltip.tsx](src/app/components/ui/tooltip.tsx)
- **Quando usar:** Dica curta ao passar o mouse ou focar.
- **Componentes:**
  - `TooltipProvider` (props: `delayDuration`)
  - `Tooltip`
  - `TooltipTrigger`
  - `TooltipContent` (props: `className`, `sideOffset`, `children`)
- **Onde ver:** Sobreposições (overlays) › Dica de contexto (tooltip) (`overlays#tooltips`)

### upload

- **Arquivo:** [src/app/components/ui/upload.tsx](src/app/components/ui/upload.tsx)
- **Quando usar:** Upload Área de arrastar e soltar, lista de arquivos com progresso e estados, imagem única com prévia e galeria de imagens. Os componentes não enviam nada: recebem arquivos, validam e expõem callbacks. O envio é responsabilidade do produto.
- **Componentes:**
  - `UploadDropzone` (props: `onFiles`, `accept`, `maxSize`, `maxFiles`, `multiple`, `disabled`, `capture`, `title`, `description`, `actionLabel`, `error`, `onError`, `size`, `className`, `icon`)
  - `UploadItem` (props: `item`, `onRemove`, `onRetry`, `className`): Item e lista
  - `UploadList` (props: `items`, `onRemove`, `onRetry`, `className`)
  - `ImageUpload` (props: `value`, `onChange`, `shape`, `size`, `label`, `accept`, `maxSize`, `onError`, `className`, `capture`): Imagem única com prévia
  - `ImageGrid` (props: `images`, `onAdd`, `onRemove`, `onSetCover`, `coverId`, `max`, `accept`, `maxSize`, `onError`, `className`, `addLabel`)
- **Funções e constantes:** `formatBytes`, `fileKind`, `validateFiles`
- **Onde ver:** Upload › Área de soltar (`upload#upload-dropzone`) · Templates › Painel da loja (protótipo) (`templates#template-dashboard`) · Padrões do produto › Cadastro do lojista (`produto#produto-cadastro`)

### use-mobile

- **Arquivo:** [src/app/components/ui/use-mobile.ts](src/app/components/ui/use-mobile.ts)
- **Quando usar:** Hook que diz se a tela tem tamanho de celular.
- **Funções e constantes:** `useIsMobile`
- **Onde ver:** nenhuma página do site importa este componente (sem demonstração).

### utils

- **Arquivo:** [src/app/components/ui/utils.ts](src/app/components/ui/utils.ts)
- **Quando usar:** O tailwind-merge precisa conhecer os tokens de tamanho de texto do DS (text-body, text-caption etc.); sem isso, ele os confundiria com cores (text-primary) e jogaria um deles fora ao juntar as classes.
- **Funções e constantes:** `cn`
- **Onde ver:** Grid e espaçamento › Grid de colunas (`grid#grid-colunas`) · Grid e espaçamento › Ritmo vertical (`grid#grid-ritmo`) · Cards › Borda, sombra e raio (`cards#card-layout`) · e mais 8 seções (ver `catalogo.json`)

### voltar-ao-topo

- **Arquivo:** [src/app/components/ui/voltar-ao-topo.tsx](src/app/components/ui/voltar-ao-topo.tsx)
- **Quando usar:** Voltar ao topo: Botão redondo de 48 px, secundário (superfície branca, borda, seta na cor de texto da marca e a sombra dos elementos que flutuam, --shadow-lg), que aparece quando a pessoa chega ao fim da página e a leva de volta ao topo. É secundário de propósito (27/11/2026): ao lado da barra de ação do celular, que é preenchida, só a ação principal fica cheia. Fica fixo no canto inferior direito.
- **Componentes:**
  - `VoltarAoTopo` (props: `rolagem`, `limiar`, `rotulo`, `focoEm`, `comBarraFixa`, `className`)
- **Onde ver:** Templates › Botões flutuantes (`templates#template-flutuantes`) · Templates › Landing page para lojistas (`templates#template-landing`)

## 2. Padrões ainda só em demonstração (não importáveis)

Templates e padrões que existem **só dentro das páginas de demonstração** (`src/app/components/showcase/`) e não são exportados de `ui/`. **Use exatamente este visual; se precisar no produto, peça para promover a componente.** Esta lista é o backlog de promoção a componente (seguindo o processo de `propostas/README.md`).

Como a lista é feita: componentes locais das páginas de demonstração (`function X(` ou `const X = (...) =>` que devolvem JSX) com elementos de estilo visual feito à mão (borda, fundo, raio ou sombra no `className`), mais todos os templates. Ficam de fora as peças da própria documentação (títulos, rótulos, molduras e tabelas de especificação: `Bullets`, `Callout`, `CardGrid`, `CodeBlock`, `ConteudoFalso`, `CopyBtn`, `CopyLinkButton`, `CustomTooltip`, `DataTable`, `DoDont`, `DownloadButton`, `Linhas`, `Moldura`, `MolduraCelular`, `Mono`, `NavCard`, `PageHeader`, `PageSection`, `PaginaFalsa`, `Panel`, `Parte`, `Pill`, `RegraDasLinhas`, `Rotulo`, `RotuloVariante`, `SectionBlock`, `SectionHeader`, `SectionLabel`, `ShowcaseCard`, `SpecCard`, `StepBadge`, `SubSection`, `SubTitle`, `Swatch`, `TemplateFrame`, `TemplateLabel`, `TextLink`, `Token`, `TokenRowItem`, `TokenTable`, `VejaEm`) e os componentes que só montam componentes do DS sem estilo próprio. "Marcação à mão" é o número de elementos com estilo visual próprio.

### 2.1 Templates (7)

Telas inteiras montadas nas páginas de demonstração. Para uma tela parecida no produto, parta do template (mesma estrutura e as mesmas peças).

| Padrão | Onde ver | Arquivo | Usa do DS | Marcação à mão |
|---|---|---|---|---|
| `SettingsTemplate` | Templates › Painel da loja (protótipo) (`templates#template-dashboard`) | [src/app/components/showcase/TemplatesShowcase.tsx:128](src/app/components/showcase/TemplatesShowcase.tsx#L128) | `AbasComContador`, `CabecalhoDaPagina`, `CardComCabecalho`, `CartaoDeEscolha`, `GrupoDeCartoesDeEscolha`, `Switch` | 11 |
| `AuthTemplate`<br>3. Entrar e criar conta (loja parceira) | Templates › Entrar e criar conta (`templates#template-auth`) | [src/app/components/showcase/TemplatesShowcase.tsx:353](src/app/components/showcase/TemplatesShowcase.tsx#L353) | `Button`, `Campo`, `Checkbox`, `EstadoFinal`, `LinkDeTexto`, `ListaDeVantagens`, `MolduraDeConta` | 0 |
| `TeamTemplate` | Templates › Painel da loja (protótipo) (`templates#template-dashboard`) | [src/app/components/showcase/TemplatesShowcase.tsx:465](src/app/components/showcase/TemplatesShowcase.tsx#L465) | `CabecalhoDaPagina`, `CardComCabecalho`, `SegmentedControl` | 17 |
| `InboxTemplate` | Templates › Painel da loja (protótipo) (`templates#template-dashboard`) | [src/app/components/showcase/TemplatesShowcase.tsx:731](src/app/components/showcase/TemplatesShowcase.tsx#L731) | `AbasComContador`, `CabecalhoDaPagina`, `CardComCabecalho` | 12 |
| `PricingTemplate` | Templates › Painel da loja (protótipo) (`templates#template-dashboard`) | [src/app/components/showcase/TemplatesShowcase.tsx:918](src/app/components/showcase/TemplatesShowcase.tsx#L918) | `CabecalhoDaPagina`, `CardDePreco`, `GradeDeCards`, `SegmentedControl` | 4 |
| `ContactTemplate` | Templates › Painel da loja (protótipo) (`templates#template-dashboard`) | [src/app/components/showcase/TemplatesShowcase.tsx:1015](src/app/components/showcase/TemplatesShowcase.tsx#L1015) | `CabecalhoDaPagina`, `CardComCabecalho`, `Checkbox` | 6 |
| `LandingTemplate` | Templates › Landing page para lojistas (`templates#template-landing`) | [src/app/components/showcase/TemplatesShowcase.tsx:1407](src/app/components/showcase/TemplatesShowcase.tsx#L1407) | `Accordion`, `AccordionContent`, `AccordionItem`, `AccordionTrigger`, `Campo`, `Checkbox`, `GradeDeCards`, `IconeModa` +2 | 77 |

### 2.2 Padrões nas páginas de componentes (45)

Peças de interface (cards, painéis, menus, controles) desenhadas à mão dentro das páginas de componentes. São as primeiras candidatas a virar componente.

| Padrão | Onde ver | Arquivo | Usa do DS | Marcação à mão |
|---|---|---|---|---|
| `MolduraDoPainel`<br>Moldura (janela) do protótipo | Templates › Painel da loja (protótipo) (`templates#template-dashboard`) | [src/app/components/showcase/PainelTemplates.tsx:97](src/app/components/showcase/PainelTemplates.tsx#L97) |  | 6 |
| `ConteudoDoMenu` | Templates › Painel da loja (protótipo) (`templates#template-dashboard`) | [src/app/components/showcase/PainelTemplates.tsx:127](src/app/components/showcase/PainelTemplates.tsx#L127) | `CardDePlano`, `GrupoDoMenu`, `ItemDoMenu`, `NavDoMenu`, `SeletorDeLoja`, `TopoDoMenu` | 1 |
| `MenuDeNotificacoes` | Templates › Painel da loja (protótipo) (`templates#template-dashboard`) | [src/app/components/showcase/PainelTemplates.tsx:169](src/app/components/showcase/PainelTemplates.tsx#L169) | `BotaoDeNotificacoes`, `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuTrigger` | 6 |
| `PrototipoDoPainel` | Templates › Painel da loja (protótipo) (`templates#template-dashboard`) | [src/app/components/showcase/PainelTemplates.tsx:263](src/app/components/showcase/PainelTemplates.tsx#L263) | `AnelDePontuacao`, `BannerPromocional`, `BarraSuperiorDoPainel`, `BotaoDeNotificacoes`, `BotaoDividido`, `CabecalhoDaPagina`, `CampoDeBuscaGlobal`, `CardDePlano` +37 | 7 |
| `BotaoContorno`<br>Páginas | Templates › Painel da loja (protótipo) (`templates#template-dashboard`) | [src/app/components/showcase/PainelTemplates.tsx:374](src/app/components/showcase/PainelTemplates.tsx#L374) |  | 1 |
| `PaginaInicio` | Templates › Painel da loja (protótipo) (`templates#template-dashboard`) | [src/app/components/showcase/PainelTemplates.tsx:382](src/app/components/showcase/PainelTemplates.tsx#L382) | `AnelDePontuacao`, `BannerPromocional`, `BotaoDividido`, `CabecalhoDaPagina`, `CardDoPainel`, `CardIndicador`, `CarrosselDeDicas`, `FaixaDeBeneficios` +11 | 1 |
| `PaginaEmBreve` | Templates › Painel da loja (protótipo) (`templates#template-dashboard`) | [src/app/components/showcase/PainelTemplates.tsx:591](src/app/components/showcase/PainelTemplates.tsx#L591) | `CabecalhoDaPagina` | 3 |
| `DemoBotoesFlutuantes`<br>Botões flutuantes no celular: página rolada até o fim, com a barra de ação e o Voltar ao topo (27/11/2026). | Templates › Botões flutuantes (`templates#template-flutuantes`) | [src/app/components/showcase/TemplatesShowcase.tsx:1179](src/app/components/showcase/TemplatesShowcase.tsx#L1179) | `BarraFixaDoCelular`, `VoltarAoTopo` | 1 |
| `CadastroEmEtapasDemo`<br>Demonstração | Padrões do produto › Cadastro do lojista (`produto#produto-cadastro`) | [src/app/components/showcase/CadastroEmEtapasDemo.tsx:179](src/app/components/showcase/CadastroEmEtapasDemo.tsx#L179) | `Alert`, `AlertDescription`, `AlertTitle`, `BarraDaEtapa`, `BlocoDeRevisao`, `Button`, `CardDePreco`, `CartaoDeEscolha` +17 | 2 |
| `CombinacoesDoCadastro` | Padrões do produto › Cadastro do lojista (`produto#produto-cadastro`) | [src/app/components/showcase/CadastroEmEtapasDemo.tsx:750](src/app/components/showcase/CadastroEmEtapasDemo.tsx#L750) | `GradeDeCards` | 4 |
| `CanvasRevealCard`<br>Cards com revelação em canvas (usado na página Cards › Animação). | Cards › Animação (`cards#card-animacao`) | [src/app/components/showcase/BackgroundsShowcase.tsx:491](src/app/components/showcase/BackgroundsShowcase.tsx#L491) | `SegmentedControl` | 4 |
| `EscolhaEmLista`<br>Escolha com mais de 3 opções nas demonstrações: rótulo em cima e a lista de seleção do DS (Select). | Cards › Testar o vidro (`cards#card-glass-teste`) | [src/app/components/showcase/CardShowcase.tsx:51](src/app/components/showcase/CardShowcase.tsx#L51) | `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue` | 1 |
| `CenaDoVidro`<br>Cena do seletor: usa o fundo escolhido; fora do seletor, é a cena padrão (GlassScene). | Cards › Vidro: acabamentos (`cards#card-glass`) (+3) | [src/app/components/showcase/CardShowcase.tsx:138](src/app/components/showcase/CardShowcase.tsx#L138) | `DoodleTexture`, `GlassScene` | 2 |
| `GlassTestCard`<br>Card de teste: título e subtítulo reais sobre o vidro, com avaliação de contraste (WCAG AA) e alerta dentro do card quando a configuração compromete a acessibilidade. | Cards › Vidro: acabamentos (`cards#card-glass`) (+2) | [src/app/components/showcase/CardShowcase.tsx:200](src/app/components/showcase/CardShowcase.tsx#L200) | `GlassCard` | 1 |
| `GlassFinishPicker` | Cards › Testar o vidro (`cards#card-glass-teste`) | [src/app/components/showcase/CardShowcase.tsx:238](src/app/components/showcase/CardShowcase.tsx#L238) | `Button`, `DoodleTexture`, `GlassCard`, `GlassScene`, `GradeDeCards`, `SegmentedControl`, `Select`, `SelectContent` +4 | 2 |
| `DemoCarrosselDeDicas` | Cards › Card de dica (`cards#card-dica`) | [src/app/components/showcase/CardShowcase.tsx:347](src/app/components/showcase/CardShowcase.tsx#L347) | `Button`, `CardDoPainel`, `CarrosselDeDicas` | 1 |
| `CardPorFundo` | Cards › Por fundo (`cards#card-fundos`) | [src/app/components/showcase/CardShowcase.tsx:390](src/app/components/showcase/CardShowcase.tsx#L390) | `Button`, `Card` | 2 |
| `DemoMesmaAltura`<br>Dois cards lado a lado; o interruptor põe muito conteúdo no segundo e a GradeDeCards troca para um por linha. | Cards › Mesma altura ou um por linha (`cards#card-mesma-altura`) | [src/app/components/showcase/CardShowcase.tsx:415](src/app/components/showcase/CardShowcase.tsx#L415) | `Badge`, `Button`, `Card`, `CardContent`, `CardDescription`, `CardFooter`, `CardHeader`, `CardMidia` +4 | 2 |
| `CardDeExemplo`<br>Card pequeno dos exemplos certo e errado. | Cards › Mesma altura ou um por linha (`cards#card-mesma-altura`) | [src/app/components/showcase/CardShowcase.tsx:487](src/app/components/showcase/CardShowcase.tsx#L487) | `Button`, `Card`, `CardDescription`, `CardFooter`, `CardHeader`, `CardTitle` | 1 |
| `AndamentoDeTarefa`<br>Andamento de uma tarefa longa (FaixaDeEstado + ProgressoRotulado + ResumoEmLinha), usado na página Cards. Números de exemplo. | Cards › Andamento de tarefa (`cards#card-andamento`) | [src/app/components/showcase/DataShowcase.tsx:658](src/app/components/showcase/DataShowcase.tsx#L658) | `Button`, `CardDoPainel`, `FaixaDeEstado`, `LinkVerTudo`, `ProgressoRotulado`, `ResumoEmLinha` | 3 |
| `WobbleCardConteudo`<br>Card com wobble: demonstração com controles (usada na página Cards). | Cards › Animação (`cards#card-animacao`) | [src/app/components/showcase/MotionShowcase.tsx:1931](src/app/components/showcase/MotionShowcase.tsx#L1931) |  | 5 |
| `ShineBorderConteudo`<br>Shine Border: velocidades, combinações de cor, tokens e acessibilidade (usado na página Cards). | Cards › Borda brilhante (shine border) (`cards#card-shine`) | [src/app/components/showcase/MotionShowcase.tsx:2035](src/app/components/showcase/MotionShowcase.tsx#L2035) | `ShineBorder` | 5 |
| `RoscaAntiga`<br>Reprodução da rosca atual do admin, só para comparação (traço grosso, centro com o número de tipos, grafite como série). | Gráficos › Rosca (`graficos#graficos-rosca`) | [src/app/components/showcase/GraficosShowcase.tsx:37](src/app/components/showcase/GraficosShowcase.tsx#L37) |  | 1 |
| `TabelaQueQuebra`<br>Tabela que vira lista no celular (card nunca rola na horizontal): a TabelaAdaptavel do DS (27/11/2026). | Gráficos › Como escolher (`graficos#graficos-escolher`) (+1) | [src/app/components/showcase/GraficosShowcase.tsx:387](src/app/components/showcase/GraficosShowcase.tsx#L387) | `TabelaAdaptavel` | 1 |
| `Cartao` | Gráficos › Cores dos gráficos (`graficos#graficos-cores`) (+3) | [src/app/components/showcase/GraficosShowcase.tsx:398](src/app/components/showcase/GraficosShowcase.tsx#L398) |  | 1 |
| `CartaoDoCatalogo`<br>Card do catálogo: nome, componente, quando usar, o gráfico, o cuidado de leitura e Ver dados. | Gráficos › (`graficos#graficos-catalogo-comparacao`) (+5) | [src/app/components/showcase/GraficosShowcase.tsx:623](src/app/components/showcase/GraficosShowcase.tsx#L623) | `TabelaDeDados` | 5 |
| `Familia` | Gráficos › (`graficos#graficos-catalogo-comparacao`) (+5) | [src/app/components/showcase/GraficosShowcase.tsx:657](src/app/components/showcase/GraficosShowcase.tsx#L657) | `GradeDeCards` | 1 |
| `Tag` | Exibição de dados › Linhas com tags e ações (`data#linhas-colunas`) | [src/app/components/showcase/shared/RegraDasLinhas.tsx:44](src/app/components/showcase/shared/RegraDasLinhas.tsx#L44) | `Badge` | 1 |
| `Celular`<br>Moldura com a largura de um celular (360 px), para mostrar a linha como ela fica no telefone. | Exibição de dados › Linhas com tags e ações (`data#linhas-colunas`) | [src/app/components/showcase/shared/RegraDasLinhas.tsx:53](src/app/components/showcase/shared/RegraDasLinhas.tsx#L53) |  | 3 |
| `ListaCerta`<br>Exemplo certo, com LinhaDeLista: no celular, as tags e ações numa linha própria abaixo de todo o texto (padrão, decisão da dona do produto de 27/11/2026), hover e seleção na linha inteira, sem cantos. | Exibição de dados › Linhas com tags e ações (`data#linhas-colunas`) | [src/app/components/showcase/shared/RegraDasLinhas.tsx:81](src/app/components/showcase/shared/RegraDasLinhas.tsx#L81) | `Badge`, `Checkbox`, `LinhaDeLista` | 2 |
| `ListaErrada`<br>Exemplo errado (o erro que originou a regra): áreas de grid "l1 sit" / "res res" no celular. A segunda linha do texto passa por baixo da tag e da lixeira, e o hover é uma caixa cinza arredondada só no bloco do texto. | Exibição de dados › Linhas com tags e ações (`data#linhas-colunas`) | [src/app/components/showcase/shared/RegraDasLinhas.tsx:126](src/app/components/showcase/shared/RegraDasLinhas.tsx#L126) | `Badge` | 2 |
| `DemoInfoFechavel` | Feedback › Alerta com ação (`feedback#alerta-com-acao`) | [src/app/components/showcase/AlertaComAcaoShowcase.tsx:65](src/app/components/showcase/AlertaComAcaoShowcase.tsx#L65) | `AlertaComAcao`, `BotaoDoAlerta`, `LinkDoAlerta` | 1 |
| `AlertaComAcaoDoc` | Feedback › Alerta com ação (`feedback#alerta-com-acao`) | [src/app/components/showcase/AlertaComAcaoShowcase.tsx:125](src/app/components/showcase/AlertaComAcaoShowcase.tsx#L125) | `AlertaComAcao`, `BotaoDoAlerta`, `GradeDeCards`, `LinkDoAlerta` | 1 |
| `Alert` | Feedback › Alertas (`feedback#alerts`) | [src/app/components/showcase/FeedbackShowcase.tsx:86](src/app/components/showcase/FeedbackShowcase.tsx#L86) | `Alert`, `AlertDescription`, `AlertTitle` | 1 |
| `DemoAbasComContador` | Feedback › Abas com contador (`feedback#abas-contador`) | [src/app/components/showcase/FeedbackShowcase.tsx:141](src/app/components/showcase/FeedbackShowcase.tsx#L141) | `AbasComContador` | 1 |
| `DemoBannerPromocional`<br>Banner promocional | Feedback › Banner promocional (`feedback#banner-promocional`) | [src/app/components/showcase/FeedbackShowcase.tsx:158](src/app/components/showcase/FeedbackShowcase.tsx#L158) | `BannerPromocional`, `IconeModa` | 2 |
| `DrawerDemo`<br>Drawer | Sobreposições (overlays) | [src/app/components/showcase/OverlaysShowcase.tsx:147](src/app/components/showcase/OverlaysShowcase.tsx#L147) | `Button`, `Sheet`, `SheetContent`, `SheetDescription`, `SheetFooter`, `SheetHeader`, `SheetTitle` | 3 |
| `ExemploMenuRecolhivel`<br>Exemplo da moldura do painel, igual à do site do design system (23/11/2026): barra superior branca de ponta a ponta (logo à esquerda, perfil à direita); embaixo, o menu lateral com o botão "≡ Menu" no topo, que recolhe e expande. | Sobreposições (overlays) › Menu do painel (`overlays#menu-painel`) | [src/app/components/showcase/OverlaysShowcase.tsx:201](src/app/components/showcase/OverlaysShowcase.tsx#L201) | `BarraSuperiorDoPainel`, `GatilhoDaConta`, `GrupoDoMenu`, `ItemDoMenu`, `MenuLateral`, `MenuLateralProvider`, `NavDoMenu`, `TopoDoMenu` | 4 |
| `ExemploOpcaoA`<br>Opção A (decisão da dona do produto, 23/11/2026): cabeçalho da página fora do card (título, descrição e abas); conteúdo em cards com cabeçalho de ícone, um card por assunto. Sem linhas desnecessárias. | Sobreposições (overlays) › Cabeçalho da página (`overlays#cabecalho-pagina`) | [src/app/components/showcase/OverlaysShowcase.tsx:250](src/app/components/showcase/OverlaysShowcase.tsx#L250) | `AbasComContador`, `CabecalhoDaPagina`, `CardComCabecalho`, `Switch` | 1 |
| `Segmentado`<br>Controles da demonstração com os componentes do DS (27/11/2026): até 3 opções, Controle segmentado; mais que isso, lista de seleção (Select), que cabe em qualquer largura. O interruptor é o Switch. | Header e menus › Demonstração (`header#header-demo`) | [src/app/components/showcase/HeaderShowcase.tsx:102](src/app/components/showcase/HeaderShowcase.tsx#L102) | `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue` | 1 |
| `Capa`<br>Fundos por trás do header | Header e menus › Demonstração (`header#header-demo`) | [src/app/components/showcase/HeaderShowcase.tsx:149](src/app/components/showcase/HeaderShowcase.tsx#L149) |  | 4 |
| `DemoHeader`<br>Demonstração: janela com rolagem própria | Header e menus › Demonstração (`header#header-demo`) | [src/app/components/showcase/HeaderShowcase.tsx:173](src/app/components/showcase/HeaderShowcase.tsx#L173) |  | 39 |
| `CardOpcao`<br>Cards de explicação, com atalho para a demonstração | Header e menus › Modelos (`header#header-models`) (+3) | [src/app/components/showcase/HeaderShowcase.tsx:559](src/app/components/showcase/HeaderShowcase.tsx#L559) |  | 3 |
| `StorePanelDemo`<br>Variante: formulário "Cadastrar minha loja" (demonstração) | Painel lateral › Comportamento (`sidepanel#sidepanel-behavior`) (+1) | [src/app/components/showcase/SidePanelShowcase.tsx:37](src/app/components/showcase/SidePanelShowcase.tsx#L37) | `SidePanel`, `SidePanelActions`, `SidePanelBody`, `SidePanelContent`, `SidePanelFooter`, `SidePanelHeader`, `SidePanelTrigger` | 6 |
| `DemoDoCursor` | Demonstrações animadas › Cursor de demonstração (`demonstracoes#cursor-de-demonstracao`) | [src/app/components/showcase/DemonstracoesShowcase.tsx:21](src/app/components/showcase/DemonstracoesShowcase.tsx#L21) | `Button`, `CursorDeDemonstracao`, `Input` | 2 |

### 2.3 Demonstrações nas páginas de fundamentos e diretrizes (36)

Exemplos que ilustram uma regra (usabilidade, acessibilidade, movimento, marca, tokens). Normalmente não vão para o produto como estão; servem de referência de comportamento.

| Padrão | Onde ver | Arquivo | Usa do DS | Marcação à mão |
|---|---|---|---|---|
| `PrincipleCard` | Princípios de design | [src/app/components/showcase/PrinciplesShowcase.tsx:87](src/app/components/showcase/PrinciplesShowcase.tsx#L87) |  | 3 |
| `LogoCard`<br>Card de logo | Marca › Assinatura horizontal (`brand#brand-assinatura`) (+3) | [src/app/components/showcase/BrandShowcase.tsx:89](src/app/components/showcase/BrandShowcase.tsx#L89) |  | 3 |
| `ColorChip`<br>Amostra de cor | Marca › Identidade cromática (`brand#brand-paleta`) | [src/app/components/showcase/BrandShowcase.tsx:121](src/app/components/showcase/BrandShowcase.tsx#L121) |  | 2 |
| `RuleCard`<br>Certo / Errado | Marca › Regras para crescer (`brand#brand-regras`) | [src/app/components/showcase/BrandShowcase.tsx:150](src/app/components/showcase/BrandShowcase.tsx#L150) |  | 2 |
| `EmptyStateMock`<br>Esqueleto de estado vazio (web e mobile) com a ilustração no lugar: textos são marcadores, não copy do produto. | Mascote & Ilustrações › Estados vazios (`ilustracoes#mascote-estados-vazios`) (+1) | [src/app/components/showcase/IllustrationsShowcase.tsx:157](src/app/components/showcase/IllustrationsShowcase.tsx#L157) | `Button`, `EstadoVazio` | 5 |
| `IllustrationCard` | Mascote & Ilustrações › Estados vazios (`ilustracoes#mascote-estados-vazios`) (+1) | [src/app/components/showcase/IllustrationsShowcase.tsx:175](src/app/components/showcase/IllustrationsShowcase.tsx#L175) | `Button`, `EstadoVazio`, `GradeDeCards`, `ItemDaGrade` | 1 |
| `DemoDoGrid`<br>Demonstração do grid: as colunas, a margem e a calha da tela escolhida, em escala dentro da página. | Grid e espaçamento › Grid de colunas (`grid#grid-colunas`) | [src/app/components/showcase/GridShowcase.tsx:32](src/app/components/showcase/GridShowcase.tsx#L32) |  | 3 |
| `Bloco`<br>Exemplo de composição sobre o grid: blocos com span por tela. | Grid e espaçamento › Como usar (`grid#grid-uso`) | [src/app/components/showcase/GridShowcase.tsx:56](src/app/components/showcase/GridShowcase.tsx#L56) |  | 1 |
| `PaginaAbaixoDoCabecalho` | Grid e espaçamento › Espaço abaixo do cabeçalho (`grid#grid-cabecalho`) (+1) | [src/app/components/showcase/shared/PaginaAbaixoDoCabecalho.tsx:25](src/app/components/showcase/shared/PaginaAbaixoDoCabecalho.tsx#L25) | `Button`, `CabecalhoDoSite`, `PaginaDeErro`, `SegmentedControl` | 2 |
| `TargetDemo`<br>Touch targets | Usabilidade › Tamanho de alvo (`usability#ux-targets`) | [src/app/components/showcase/UsabilityShowcase.tsx:17](src/app/components/showcase/UsabilityShowcase.tsx#L17) |  | 1 |
| `FeedbackDemo`<br>System status | Usabilidade › Status do sistema (`usability#ux-feedback`) | [src/app/components/showcase/UsabilityShowcase.tsx:47](src/app/components/showcase/UsabilityShowcase.tsx#L47) |  | 1 |
| `UndoDemo` | Usabilidade › Ações destrutivas (`usability#ux-destructive`) | [src/app/components/showcase/UsabilityShowcase.tsx:84](src/app/components/showcase/UsabilityShowcase.tsx#L84) |  | 6 |
| `StatesDemo` | Usabilidade › Estados de conteúdo (`usability#ux-states`) | [src/app/components/showcase/UsabilityShowcase.tsx:148](src/app/components/showcase/UsabilityShowcase.tsx#L148) | `Button`, `EstadoVazio` | 4 |
| `HierarchyDemo`<br>Button hierarchy | Usabilidade › Hierarquia de ações (`usability#ux-hierarchy`) | [src/app/components/showcase/UsabilityShowcase.tsx:219](src/app/components/showcase/UsabilityShowcase.tsx#L219) | `Button` | 1 |
| `ContrastTable` | Acessibilidade › Contraste (`accessibility#a11y-contrast`) | [src/app/components/showcase/AccessibilityShowcase.tsx:70](src/app/components/showcase/AccessibilityShowcase.tsx#L70) |  | 3 |
| `ContrastChecker` | Acessibilidade › Contraste (`accessibility#a11y-contrast`) | [src/app/components/showcase/AccessibilityShowcase.tsx:124](src/app/components/showcase/AccessibilityShowcase.tsx#L124) |  | 1 |
| `FocusDemo`<br>Focus | Acessibilidade › Foco (`accessibility#a11y-focus`) | [src/app/components/showcase/AccessibilityShowcase.tsx:187](src/app/components/showcase/AccessibilityShowcase.tsx#L187) |  | 3 |
| `TabsDemo`<br>Keyboard: roving tablist | Acessibilidade › Teclado (`accessibility#a11y-keyboard`) | [src/app/components/showcase/AccessibilityShowcase.tsx:215](src/app/components/showcase/AccessibilityShowcase.tsx#L215) |  | 2 |
| `FormDemo`<br>Forms | Acessibilidade › Formulários e rótulos (`accessibility#a11y-forms`) | [src/app/components/showcase/AccessibilityShowcase.tsx:271](src/app/components/showcase/AccessibilityShowcase.tsx#L271) |  | 1 |
| `MotionDemo`<br>Motion | Acessibilidade › Movimento (`accessibility#a11y-motion`) | [src/app/components/showcase/AccessibilityShowcase.tsx:334](src/app/components/showcase/AccessibilityShowcase.tsx#L334) |  | 2 |
| `Checklist` | Acessibilidade › Lista de verificação (checklist) (`accessibility#a11y-checklist`) | [src/app/components/showcase/AccessibilityShowcase.tsx:385](src/app/components/showcase/AccessibilityShowcase.tsx#L385) |  | 2 |
| `Descoberta` | Tom de voz | [src/app/components/showcase/EscritaDeInteligencia.tsx:32](src/app/components/showcase/EscritaDeInteligencia.tsx#L32) |  | 4 |
| `EscritaDeInteligencia` | Tom de voz | [src/app/components/showcase/EscritaDeInteligencia.tsx:75](src/app/components/showcase/EscritaDeInteligencia.tsx#L75) | `GradeDeCards` | 8 |
| `GradientControls`<br>Inline control panel — lives inside the card, outside the preview | Fundos › Gradiente animado (`backgrounds#gradient-anim-bg`) | [src/app/components/showcase/BackgroundsShowcase.tsx:151](src/app/components/showcase/BackgroundsShowcase.tsx#L151) | `Badge` | 1 |
| `GradientAnimCard`<br>Dedicated card for Gradient Animation — combines preview + controls + docs | Fundos › Gradiente animado (`backgrounds#gradient-anim-bg`) | [src/app/components/showcase/BackgroundsShowcase.tsx:197](src/app/components/showcase/BackgroundsShowcase.tsx#L197) | `Badge`, `Button`, `SegmentedControl` | 3 |
| `BigBangCard`<br>BIG BANG CARD — previews with controls | Fundos › Vórtice (`backgrounds#vortex-bg`) | [src/app/components/showcase/BackgroundsShowcase.tsx:1101](src/app/components/showcase/BackgroundsShowcase.tsx#L1101) | `SegmentedControl` | 3 |
| `BgLinesCard`<br>BG LINES CARD — previews with controls | Fundos › Linhas de fundo (`backgrounds#bg-lines-bg`) | [src/app/components/showcase/BackgroundsShowcase.tsx:1168](src/app/components/showcase/BackgroundsShowcase.tsx#L1168) | `SegmentedControl` | 3 |
| `EffectCard` | Fundos | [src/app/components/showcase/BackgroundsShowcase.tsx:1381](src/app/components/showcase/BackgroundsShowcase.tsx#L1381) | `SegmentedControl` | 3 |
| `DoodleTextureCard`<br>DOODLE TEXTURE — textura de ícones de traço | Fundos › Textura doodle (`backgrounds#doodle-bg`) | [src/app/components/showcase/BackgroundsShowcase.tsx:1524](src/app/components/showcase/BackgroundsShowcase.tsx#L1524) | `Button`, `DoodleTexture`, `SegmentedControl` | 7 |
| `SpringPlayground` | Movimento › Física de mola (`motion#spring`) | [src/app/components/showcase/MotionShowcase.tsx:309](src/app/components/showcase/MotionShowcase.tsx#L309) |  | 3 |
| `MagneticButton` | Movimento › Interações de hover (`motion#hover`) | [src/app/components/showcase/MotionShowcase.tsx:608](src/app/components/showcase/MotionShowcase.tsx#L608) |  | 1 |
| `DemoCarregando`<br>Carregamento de página (componente Carregando, 21/11/2026): como aparece e o aviso de demora, sem esperar 10 s. | Movimento › Loaders e progresso (`motion#loaders`) | [src/app/components/showcase/MotionShowcase.tsx:943](src/app/components/showcase/MotionShowcase.tsx#L943) | `Button`, `Carregando` | 2 |
| `StepIndicator` | Movimento › Loaders e progresso (`motion#loaders`) | [src/app/components/showcase/MotionShowcase.tsx:966](src/app/components/showcase/MotionShowcase.tsx#L966) |  | 3 |
| `DurationBars` | Movimento › Tokens de movimento (`motion#motion-tokens`) | [src/app/components/showcase/MotionShowcase.tsx:1131](src/app/components/showcase/MotionShowcase.tsx#L1131) |  | 1 |
| `OrbitCanvas` | Movimento › Círculos orbitais (`motion#orbiting-circles`) | [src/app/components/showcase/MotionShowcase.tsx:1478](src/app/components/showcase/MotionShowcase.tsx#L1478) |  | 1 |
| `AvatarOrbitCanvas` | Movimento › Círculos orbitais (`motion#orbiting-circles`) | [src/app/components/showcase/MotionShowcase.tsx:1626](src/app/components/showcase/MotionShowcase.tsx#L1626) |  | 3 |

### 2.4 Seções com marcação feita à mão no próprio corpo (50)

Seções que montam peças direto na página, sem componente local, com 3 ou mais elementos de estilo próprio. Antes de copiar uma delas, confira se a peça já existe na seção 1.

| Seção | Arquivo | Usa do DS | Marcação à mão |
|---|---|---|---|
| Início › Novidades (`overview#whats-new`) | [src/app/components/showcase/HomeShowcase.tsx:127](src/app/components/showcase/HomeShowcase.tsx#L127) |  | 3 |
| Desenvolvimento › Plataformas (`develop#dev-platforms`) | [src/app/components/showcase/DevelopShowcase.tsx:228](src/app/components/showcase/DevelopShowcase.tsx#L228) |  | 3 |
| Marca › Quando usar o símbolo (`brand#brand-uso-simbolo`) | [src/app/components/showcase/BrandShowcase.tsx:326](src/app/components/showcase/BrandShowcase.tsx#L326) |  | 5 |
| Marca › Escala e legibilidade (`brand#brand-responsivo`) | [src/app/components/showcase/BrandShowcase.tsx:384](src/app/components/showcase/BrandShowcase.tsx#L384) |  | 7 |
| Marca › Área de proteção (`brand#brand-respiro`) | [src/app/components/showcase/BrandShowcase.tsx:550](src/app/components/showcase/BrandShowcase.tsx#L550) |  | 6 |
| Fundamentos › Paleta de cores (`colors#colors`) | [src/app/components/showcase/FoundationShowcase.tsx:127](src/app/components/showcase/FoundationShowcase.tsx#L127) |  | 8 |
| Fundamentos › Tipografia (`colors#typography`) | [src/app/components/showcase/FoundationShowcase.tsx:232](src/app/components/showcase/FoundationShowcase.tsx#L232) | `GradeDeCards`, `Heading` | 35 |
| Grid e espaçamento › Ritmo vertical (`grid#grid-ritmo`) | [src/app/components/showcase/GridShowcase.tsx:185](src/app/components/showcase/GridShowcase.tsx#L185) | `GradeDeCards` | 3 |
| Grid e espaçamento › Como usar (`grid#grid-uso`) | [src/app/components/showcase/GridShowcase.tsx:242](src/app/components/showcase/GridShowcase.tsx#L242) |  | 3 |
| Tokens de design › O que são tokens (`tokens#tokens-intro`) | [src/app/components/showcase/TokensShowcase.tsx:115](src/app/components/showcase/TokensShowcase.tsx#L115) | `GradeDeCards`, `ItemDaGrade` | 8 |
| Tokens de design › As três camadas (`tokens#tokens-hierarchy`) | [src/app/components/showcase/TokensShowcase.tsx:205](src/app/components/showcase/TokensShowcase.tsx#L205) |  | 21 |
| Tokens de design › Guia para designers (`tokens#tokens-design`) | [src/app/components/showcase/TokensShowcase.tsx:336](src/app/components/showcase/TokensShowcase.tsx#L336) |  | 3 |
| Tokens de design › IA e tokens (`tokens#tokens-ia`) | [src/app/components/showcase/TokensShowcase.tsx:415](src/app/components/showcase/TokensShowcase.tsx#L415) |  | 8 |
| Tokens de design › Implementação em código (`tokens#tokens-definition`) | [src/app/components/showcase/TokensShowcase.tsx:621](src/app/components/showcase/TokensShowcase.tsx#L621) |  | 12 |
| Tom de voz › Microcopy (`voice#voice-microcopy`) | [src/app/components/showcase/VoiceShowcase.tsx:154](src/app/components/showcase/VoiceShowcase.tsx#L154) |  | 3 |
| Estados de informação › Chip de status (`states#states-componente`) | [src/app/components/showcase/StatesShowcase.tsx:105](src/app/components/showcase/StatesShowcase.tsx#L105) | `StatusChip` | 4 |
| Estados de informação › Tokens (`states#states-tokens`) | [src/app/components/showcase/StatesShowcase.tsx:184](src/app/components/showcase/StatesShowcase.tsx#L184) |  | 3 |
| Fundos › Guia de composição (`backgrounds#section-backgrounds`) | [src/app/components/showcase/BackgroundsShowcase.tsx:1669](src/app/components/showcase/BackgroundsShowcase.tsx#L1669) |  | 8 |
| Movimento › Física de mola (`motion#spring`) | [src/app/components/showcase/MotionShowcase.tsx:270](src/app/components/showcase/MotionShowcase.tsx#L270) | `Button` | 3 |
| Movimento › Stagger e sequências (`motion#stagger`) | [src/app/components/showcase/MotionShowcase.tsx:407](src/app/components/showcase/MotionShowcase.tsx#L407) |  | 3 |
| Movimento › Interações de hover (`motion#hover`) | [src/app/components/showcase/MotionShowcase.tsx:467](src/app/components/showcase/MotionShowcase.tsx#L467) |  | 8 |
| Movimento › Microinterações (`motion#micro`) | [src/app/components/showcase/MotionShowcase.tsx:655](src/app/components/showcase/MotionShowcase.tsx#L655) | `Button` | 6 |
| Movimento › Loaders e progresso (`motion#loaders`) | [src/app/components/showcase/MotionShowcase.tsx:814](src/app/components/showcase/MotionShowcase.tsx#L814) | `BalaoDaConversa`, `Conversa`, `GradeDeCards`, `IndicadorDeDigitacao` | 11 |
| Movimento › Transições de layout (`motion#layout`) | [src/app/components/showcase/MotionShowcase.tsx:1038](src/app/components/showcase/MotionShowcase.tsx#L1038) |  | 6 |
| Movimento › Lista animada (`motion#animated-list`) | [src/app/components/showcase/MotionShowcase.tsx:1322](src/app/components/showcase/MotionShowcase.tsx#L1322) |  | 7 |
| Movimento › Círculos orbitais (`motion#orbiting-circles`) | [src/app/components/showcase/MotionShowcase.tsx:1708](src/app/components/showcase/MotionShowcase.tsx#L1708) |  | 6 |
| Catálogo de componentes › Todos os componentes (`catalogo#catalogo-lista`) | [src/app/components/showcase/CatalogoShowcase.tsx:142](src/app/components/showcase/CatalogoShowcase.tsx#L142) | `Input` | 5 |
| Botões › Um botão principal (`buttons#botao-principal`) | [src/app/components/showcase/FormShowcase.tsx:202](src/app/components/showcase/FormShowcase.tsx#L202) |  | 5 |
| Cards › Borda, sombra e raio (`cards#card-layout`) | [src/app/components/showcase/CardShowcase.tsx:669](src/app/components/showcase/CardShowcase.tsx#L669) | `Card`, `DivisorSuave`, `GradeDeCards` | 3 |
| Cards › Estados (`cards#card-states`) | [src/app/components/showcase/CardShowcase.tsx:1025](src/app/components/showcase/CardShowcase.tsx#L1025) | `BrilhoDeSelecionado`, `Button`, `Card`, `CardDescription`, `CardFooter`, `CardHeader`, `CardTitle`, `GradeDeCards` +3 | 3 |
| Cards › Cards aninhados (`cards#card-nested`) | [src/app/components/showcase/CardShowcase.tsx:1179](src/app/components/showcase/CardShowcase.tsx#L1179) | `Card`, `CardDescription`, `CardTitle`, `GradeDeCards` | 5 |
| Cards › Vidro no tema escuro (`cards#card-glass-escuro`) | [src/app/components/showcase/CardShowcase.tsx:1505](src/app/components/showcase/CardShowcase.tsx#L1505) | `Card`, `GlassCard`, `GradeDeCards`, `LuzesDifusas` | 6 |
| Gráficos › Cores dos gráficos (`graficos#graficos-cores`) | [src/app/components/showcase/GraficosShowcase.tsx:255](src/app/components/showcase/GraficosShowcase.tsx#L255) | `BarrasEmpilhadas100`, `BarrasOrdenadas`, `GradeDeCards`, `GraficoDeLinhas`, `GraficoDeRosca`, `MapaDeCalorMatricial` | 9 |
| Gráficos › Como escolher (`graficos#graficos-escolher`) | [src/app/components/showcase/GraficosShowcase.tsx:821](src/app/components/showcase/GraficosShowcase.tsx#L821) | `GradeDeCards` | 4 |
| Gráficos › Design de inteligência (`graficos#graficos-inteligencia`) | [src/app/components/showcase/GraficosShowcase.tsx:1069](src/app/components/showcase/GraficosShowcase.tsx#L1069) | `BarrasOrdenadas`, `DescobertaVisual` | 3 |
| Exibição de dados › Gráficos (`data#charts`) | [src/app/components/showcase/DataShowcase.tsx:224](src/app/components/showcase/DataShowcase.tsx#L224) |  | 3 |
| Exibição de dados › Tabela (`data#table`) | [src/app/components/showcase/DataShowcase.tsx:407](src/app/components/showcase/DataShowcase.tsx#L407) |  | 10 |
| Feedback › Progresso (`feedback#progress`) | [src/app/components/showcase/FeedbackShowcase.tsx:397](src/app/components/showcase/FeedbackShowcase.tsx#L397) |  | 4 |
| Feedback › Carregamento (skeleton) (`feedback#skeleton`) | [src/app/components/showcase/FeedbackShowcase.tsx:440](src/app/components/showcase/FeedbackShowcase.tsx#L440) | `Skeleton` | 7 |
| Rótulos › Badges e tags (`badges#badges`) | [src/app/components/showcase/FeedbackShowcase.tsx:488](src/app/components/showcase/FeedbackShowcase.tsx#L488) | `ChipFiltravel`, `GrupoDeChips` | 5 |
| Rótulos › Selo (tag do hero) (`badges#selo`) | [src/app/components/showcase/FeedbackShowcase.tsx:539](src/app/components/showcase/FeedbackShowcase.tsx#L539) | `Selo` | 3 |
| Rótulos › Avatar (`badges#avatar`) | [src/app/components/showcase/FeedbackShowcase.tsx:613](src/app/components/showcase/FeedbackShowcase.tsx#L613) |  | 4 |
| Ícones › Tamanhos e cores (`icons#icon-sizes`) | [src/app/components/showcase/IconsShowcase.tsx:124](src/app/components/showcase/IconsShowcase.tsx#L124) |  | 8 |
| Sobreposições (overlays) › Barra superior (`overlays#barra-superior`) | [src/app/components/showcase/OverlaysShowcase.tsx:459](src/app/components/showcase/OverlaysShowcase.tsx#L459) | `BotaoDeNotificacoes`, `CampoDeBuscaGlobal`, `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuTrigger` +1 | 4 |
| Sobreposições (overlays) › Dica de contexto (tooltip) (`overlays#tooltips`) | [src/app/components/showcase/OverlaysShowcase.tsx:547](src/app/components/showcase/OverlaysShowcase.tsx#L547) | `Tooltip` | 3 |
| Sobreposições (overlays) › Menu suspenso (dropdown) (`overlays#dropdown`) | [src/app/components/showcase/OverlaysShowcase.tsx:562](src/app/components/showcase/OverlaysShowcase.tsx#L562) | `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator`, `DropdownMenuTrigger` | 4 |
| Sobreposições (overlays) › Diálogos (`overlays#dialogs`) | [src/app/components/showcase/OverlaysShowcase.tsx:610](src/app/components/showcase/OverlaysShowcase.tsx#L610) | `Calendar`, `Dialog`, `Popover` | 3 |
| Sobreposições (overlays) › Sanfona (accordion) (`overlays#accordion`) | [src/app/components/showcase/OverlaysShowcase.tsx:697](src/app/components/showcase/OverlaysShowcase.tsx#L697) | `Accordion`, `AccordionContent`, `AccordionItem`, `AccordionTrigger` | 8 |
| Painel lateral › Anatomia (`sidepanel#sidepanel-anatomy`) | [src/app/components/showcase/SidePanelShowcase.tsx:158](src/app/components/showcase/SidePanelShowcase.tsx#L158) |  | 3 |
| Etapas (Stepper) › Demonstração (`stepper#stepper-demo`) | [src/app/components/showcase/StepperShowcase.tsx:26](src/app/components/showcase/StepperShowcase.tsx#L26) | `Button`, `Stepper` | 3 |

## 3. Tokens

Todos em [src/styles/theme.css](src/styles/theme.css). No código, use sempre o token (classe do Tailwind ou `var(--token)`), nunca o valor solto. 

**Cor principal: qual token usar** (claro → escuro)

- `--primary`: `--pink-550 (#E8004E)` — botão principal: texto branco 4,6:1 (AA para texto normal; decisão de 25/11/2026)
- `--primary-hover`: `--pink-575 (#D20648)` — texto branco 5,4:1
- `--primary-foreground`: `#FFFFFF`
- `--primary-destaque`: `--pink-500 (#FC0256)` — texto grande: 5,3:1 sobre grafite-950
- `--primary-text`: `--pink-600 (#BC0A41)` → `--pink-300 (#F78BA7)` — texto colorido pequeno: links, item ativo, chips, rótulos
- `--primary-muted`: `--pink-100 (#FEDFE6)` → `rgba(252, 2, 86, 0.16)` — #FEDFE6 (antes #FFE6EE, 10% de pink-500 sobre branco)
- `--primary-muted-foreground`: `--pink-600 (#BC0A41)` → `--pink-300 (#F78BA7)` — pink para texto corrido: 6,4:1 sobre branco, 5,2:1 sobre --primary-muted
- `--ring`: `rgba(252, 2, 86, 0.40)` → `rgba(252, 2, 86, 0.45)`

### 3.1 Escalas de cor (primitivas)

Primitivas: servem de base para os tokens semânticos. Em componentes, prefira os semânticos (3.2).

- **graphite:** 50 `#F6F6F7` · 100 `#E9E9EC` · 200 `#D4D4D9` · 300 `#B3B3BC` · 400 `#888896` · 500 `#696977` · 600 `#51515C` · 700 `#3E3E46` · 800 `#2C2C33` · 900 `#19191C` · 950 `#000000`
- **pink:** 50 `#FFF2F5` · 100 `#FEDFE6` · 200 `#FBBACB` · 300 `#F78BA7` · 400 `#F34E7C` · 500 `#FC0256` · 550 `#E8004E` · 575 `#D20648` · 600 `#BC0A41` · 700 `#950333` · 800 `#6F0427` · 900 `#4C071D` · 950 `#2B0813`
  - `--pink-500`: rosa-cereja do lenço do gato: cor principal; texto branco só 3,98:1, então nunca leva texto branco
  - `--pink-550`: botão principal: texto branco 4,6:1 (decisão de 25/11/2026)
  - `--pink-575`: hover do botão principal: entre 550 e 600, ainda cereja; texto branco 5,4:1
  - `--pink-600`: texto colorido pequeno (links, item ativo, chips): 6,4:1 sobre branco

### 3.2 Cores semânticas (use estas no código)

| Token | Claro | Escuro | Papel |
|---|---|---|---|
| `--background` | `#FFFFFF` | `--graphite-950 (#000000)` |  |
| `--foreground` | `--graphite-950 (#000000)` | `#F6F6F7` |  |
| `--foreground-muted` | `--graphite-500 (#696977)` | `--graphite-300 (#B3B3BC)` |  |
| `--foreground-subtle` | `--graphite-400 (#888896)` | igual |  |
| `--primary` | `--pink-550 (#E8004E)` | igual | botão principal: texto branco 4,6:1 (AA para texto normal; decisão de 25/11/2026) |
| `--primary-hover` | `--pink-575 (#D20648)` | igual | texto branco 5,4:1 |
| `--primary-foreground` | `#FFFFFF` | igual |  |
| `--primary-sutil` | `#FFF5F8` | `rgba(252, 2, 86, 0.08)` |  |
| `--primary-suave` | `#FFECF0` | `rgba(252, 2, 86, 0.12)` |  |
| `--primary-muted` | `--pink-100 (#FEDFE6)` | `rgba(252, 2, 86, 0.16)` | #FEDFE6 (antes #FFE6EE, 10% de pink-500 sobre branco) |
| `--primary-muted-foreground` | `--pink-600 (#BC0A41)` | `--pink-300 (#F78BA7)` | pink para texto corrido: 6,4:1 sobre branco, 5,2:1 sobre --primary-muted |
| `--primary-text` | `--pink-600 (#BC0A41)` | `--pink-300 (#F78BA7)` | texto colorido pequeno: links, item ativo, chips, rótulos |
| `--primary-destaque` | `--pink-500 (#FC0256)` | igual | texto grande: 5,3:1 sobre grafite-950 |
| `--surface-tint` | `--brand-rose (#FFF2F5)` | `rgba(252, 2, 86, 0.08)` | Rosa Claro: cards e faixas de apoio |
| `--secondary` | `--graphite-100 (#E9E9EC)` | `rgba(44, 44, 51, 0.85)` |  |
| `--secondary-hover` | `--graphite-200 (#D4D4D9)` | `rgba(44, 44, 51, 1)` |  |
| `--secondary-foreground` | `--graphite-950 (#000000)` | `#F6F6F7` |  |
| `--disabled` | `--graphite-100 (#E9E9EC)` | `color-mix(in srgb, var(--graphite-700) 60%, var(--graphite-800))` |  |
| `--disabled-foreground` | `color-mix(in srgb, var(--graphite-500) 55%, var(--graphite-400))` | `color-mix(in srgb, var(--graphite-300) 60%, var(--graphite-400))` |  |
| `--muted` | `--graphite-50 (#F6F6F7)` | `rgba(44, 44, 51, 0.6)` |  |
| `--row-hover` | `--graphite-50 (#F6F6F7)` | `rgba(255, 255, 255, 0.04)` |  |
| `--muted-foreground` | `--graphite-500 (#696977)` | `--graphite-300 (#B3B3BC)` |  |
| `--accent` | `--graphite-100 (#E9E9EC)` | `rgba(44, 44, 51, 0.6)` |  |
| `--accent-foreground` | `--graphite-950 (#000000)` | `#F6F6F7` |  |
| `--border` | `rgba(0, 0, 0, 0.10)` | `rgba(255, 255, 255, 0.07)` |  |
| `--border-strong` | `rgba(0, 0, 0, 0.18)` | `rgba(255, 255, 255, 0.12)` |  |
| `--success` | `#31835D` | `#41B47F` | texto branco 4,6:1 |
| `--success-foreground` | `#FFFFFF` | `#000000` |  |
| `--success-muted` | `rgba(49, 131, 93, 0.1)` | `rgba(65, 180, 127, 0.14)` |  |
| `--success-text` | `#2B7553` | `--success (#41B47F)` | verde escuro só para texto e ícone sobre fundo claro: 5,1:1 no fundo do Alerta com ação (decisão de 23/11/2026) |
| `--warning` | `#F0B135` | igual | âmbar de sinalização: texto grafite 11:1 (nenhum âmbar aceita texto branco) |
| `--warning-foreground` | `--graphite-900 (#19191C)` | `#000000` |  |
| `--warning-muted` | `rgba(240, 177, 53, 0.14)` | igual |  |
| `--warning-text` | `#A66200` | `--warning (#F0B135)` | âmbar escuro só para texto e ícone sobre fundo claro: 4,8:1 no branco, 4,5:1 no warning-muted |
| `--error` | `--pink-500 (#FC0256)` | igual | erro em pink cereja, como a marca (decisão de 16/11/2026) |
| `--error-foreground` | `#FFFFFF` | `#000000` | só para ícone ou texto grande sobre --error (3,98:1); botão cheio de erro usa --destructive |
| `--error-muted` | `rgba(252, 2, 86, 0.1)` | `rgba(252, 2, 86, 0.15)` |  |
| `--error-text` | `--primary-text (#BC0A41)` | igual | erro como texto e ícone sobre fundo claro (pink-600): 5,8:1 no fundo do Alerta com ação |
| `--info` | `#347BA9` | `#59A8DC` | texto branco 4,6:1 |
| `--info-foreground` | `#FFFFFF` | `#000000` |  |
| `--info-muted` | `rgba(52, 123, 169, 0.1)` | `rgba(89, 168, 220, 0.14)` |  |
| `--info-text` | `#2E6E98` | `--info (#59A8DC)` | azul escuro só para texto e ícone sobre fundo claro: 5,1:1 no fundo do Alerta com ação (decisão de 23/11/2026) |
| `--violet` | `#ba69dc` | `#eb6cff` |  |
| `--violet-foreground` | `#FFFFFF` | igual |  |
| `--violet-muted` | `rgba(186, 105, 220, 0.1)` | `rgba(235, 108, 255, 0.12)` |  |
| `--orange` | `#fa9852` | `#ff8833` |  |
| `--orange-foreground` | `#FFFFFF` | igual |  |
| `--orange-muted` | `rgba(250, 152, 82, 0.1)` | `rgba(255, 136, 51, 0.12)` |  |
| `--card` | `#FFFFFF` | `rgba(25, 25, 28, 0.80)` |  |
| `--card-foreground` | `--graphite-950 (#000000)` | `#F6F6F7` |  |
| `--popover` | `#FFFFFF` | `rgba(25, 25, 28, 0.97)` |  |
| `--popover-foreground` | `--graphite-950 (#000000)` | `#F6F6F7` |  |
| `--input` | `--graphite-400 (#888896)` | `--graphite-500 (#696977)` |  |
| `--input-background` | `#FFFFFF` | `rgba(25, 25, 28, 0.6)` |  |
| `--input-fundo` | `#FFFFFF` | `rgba(25, 25, 28, 0.6)` |  |
| `--switch-background` | `--graphite-400 (#888896)` | `--graphite-500 (#696977)` | interruptor desligado: trilho 3,49:1 no branco; bolinha branca 3,49:1 no trilho |
| `--ring` | `rgba(252, 2, 86, 0.40)` | `rgba(252, 2, 86, 0.45)` |  |
| `--mapa-vazio` | `--card (#FFFFFF)` | igual |  |
| `--mapa-1` | `--chart-7 (#EBEBEB)` | igual |  |
| `--mapa-2` | `--chart-6 (#D4D4D4)` | igual |  |
| `--mapa-3` | `--chart-4 (#E2919E)` | igual |  |
| `--mapa-4` | `--chart-2 (#FF6F95)` | igual |  |
| `--mapa-5` | `--chart-1 (#FC0256)` | igual |  |
| `--mapa-borda` | `--border-strong (rgba(0, 0, 0, 0.18))` | igual |  |
| `--mapa-escolhida` | `--foreground (#000000)` | igual |  |
| `--destructive` | `--pink-550 (#E8004E)` | igual | texto branco 4,6:1, como o botão principal |
| `--destructive-foreground` | `#FFFFFF` | `#000000` |  |
| `--sobreposicao` | `color-mix(in srgb, var(--graphite-950) 50%, transparent)` | igual |  |
| `--espaco-abaixo-do-cabecalho` | `--space-8 (32px)` | igual |  |

### 3.3 Cores da marca (atalhos)

- `--brand-pink`: `--pink-500 (#FC0256)`
- `--brand-graphite`: `--graphite-950 (#000000)`
- `--brand-white`: `#FFFFFF`
- `--brand-rose`: `#FFF2F5` — Rosa Claro: apoio / superfícies

### 3.4 Gráficos

- `--chart-1`: `#FC0256`
- `--chart-2`: `#FF6F95`
- `--chart-3`: `#F9B5BF`
- `--chart-4`: `#E2919E`
- `--chart-5`: `#C29AA0`
- `--chart-6`: `#D4D4D4`
- `--chart-7`: `#EBEBEB`
- `--chart-8`: `--chart-7 (#EBEBEB)`
- `--chart-neutral`: `--chart-7 (#EBEBEB)`
- `--chart-grid`: `--graphite-100 (#E9E9EC)` (escuro: `--graphite-800 (#2C2C33)`)
- `--chart-seq-1`: `--chart-6 (#D4D4D4)`
- `--chart-seq-1-texto`: `--foreground (#000000)` (escuro: `--background (#000000)`)
- `--chart-seq-2`: `--chart-4 (#E2919E)`
- `--chart-seq-2-texto`: `--foreground (#000000)` (escuro: `--background (#000000)`)
- `--chart-seq-3`: `--chart-2 (#FF6F95)`
- `--chart-seq-3-texto`: `--foreground (#000000)` (escuro: `--background (#000000)`)
- `--chart-seq-4`: `--chart-1 (#FC0256)`
- `--chart-seq-4-texto`: `--foreground (#000000)` (escuro: `--background (#000000)`)
- `--chart-1-texto`: `--foreground (#000000)` (escuro: `--background (#000000)`)
- `--chart-2-texto`: `--foreground (#000000)` (escuro: `--background (#000000)`)
- `--chart-4-texto`: `--foreground (#000000)` (escuro: `--background (#000000)`)
- `--chart-5-texto`: `--foreground (#000000)` (escuro: `--background (#000000)`)

### 3.5 Menu lateral (sidebar)

- `--sidebar`: `#FFFFFF` (escuro: `rgba(0, 0, 0, 0.97)`)
- `--sidebar-foreground`: `--graphite-950 (#000000)` (escuro: `#F6F6F7`)
- `--sidebar-primary`: `--pink-550 (#E8004E)`
- `--sidebar-primary-foreground`: `#FFFFFF`
- `--sidebar-accent`: `--graphite-50 (#F6F6F7)` (escuro: `rgba(44, 44, 51, 0.6)`)
- `--sidebar-accent-foreground`: `--graphite-950 (#000000)` (escuro: `#F6F6F7`)
- `--sidebar-border`: `rgba(0, 0, 0, 0.10)` (escuro: `rgba(255, 255, 255, 0.07)`)
- `--sidebar-ring`: `rgba(252, 2, 86, 0.40)` (escuro: `rgba(252, 2, 86, 0.45)`)

### 3.6 Tipografia

- `--font-sans`: `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- `--font-display`: `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- `--font-accent`: `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- `--font-mono`: `'JetBrains Mono', 'Fira Code', monospace`
- `--font-size`: `16px`
- `--font-weight-normal`: `400`
- `--font-weight-medium`: `500`
- `--font-weight-semibold`: `600`
- `--font-weight-bold`: `700`
- `--font-weight-extrabold`: `800`

### 3.7 Raio

- `--radius`: `0.75rem`
- `--radius-xs`: `calc(var(--radius) - 6px)` — classe rounded-xs
- `--radius-sm`: `calc(var(--radius) - 4px)` — classe rounded-sm
- `--radius-md`: `--radius (0.75rem)` — classe rounded-md
- `--radius-lg`: `calc(var(--radius) + 4px)` — classe rounded-lg
- `--radius-xl`: `calc(var(--radius) + 12px)` — classe rounded-xl

### 3.8 Sombras

- `--shadow-xs`: `0 1px 2px rgba(0, 0, 0, 0.05)` (escuro: `0 1px 2px rgba(0, 0, 0, 0.4)`)
- `--shadow-sm`: `0 1px 3px rgba(0, 0, 0, 0.07), 0 2px 6px rgba(0, 0, 0, 0.05)` (escuro: `0 1px 3px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25)`)
- `--shadow`: `0 2px 6px rgba(0, 0, 0, 0.07), 0 6px 20px rgba(0, 0, 0, 0.05)` (escuro: `0 2px 8px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.25)`)
- `--shadow-md`: `0 4px 12px rgba(0, 0, 0, 0.08), 0 12px 36px rgba(0, 0, 0, 0.06)` (escuro: `0 4px 16px rgba(0, 0, 0, 0.45), 0 16px 48px rgba(0, 0, 0, 0.30)`)
- `--shadow-lg`: `0 8px 24px rgba(0, 0, 0, 0.09), 0 24px 64px rgba(0, 0, 0, 0.07)` (escuro: `0 8px 32px rgba(0, 0, 0, 0.50), 0 32px 80px rgba(0, 0, 0, 0.35)`)
- `--shadow-xl`: `0 16px 48px rgba(0, 0, 0, 0.10), 0 40px 96px rgba(0, 0, 0, 0.08)` (escuro: `0 16px 64px rgba(0, 0, 0, 0.55), 0 48px 100px rgba(0, 0, 0, 0.40)`)

### 3.9 Espaçamento, grid e larguras

- `--space-1`: `4px`
- `--space-2`: `8px`
- `--space-3`: `12px`
- `--space-4`: `16px`
- `--space-5`: `20px`
- `--space-6`: `24px`
- `--space-8`: `32px`
- `--space-10`: `40px`
- `--space-12`: `48px`
- `--space-16`: `64px`
- `--space-20`: `80px`
- `--space-24`: `96px`
- `--grid-columns`: `4`
- `--grid-margin`: `16px`
- `--grid-gutter`: `16px`
- `--content-reading`: `768px`
- `--content-default`: `1152px`
- `--content-wide`: `1280px`
- `--section-space`: `64px`
- `--section-space-hero`: `96px`

### 3.10 Movimento

- `--duration-instant`: `80ms`
- `--duration-fast`: `150ms`
- `--duration-normal`: `250ms`
- `--duration-slow`: `400ms`
- `--duration-xslow`: `600ms`
- `--ease-out`: `cubic-bezier(0, 0, 0.58, 1)`
- `--ease-in`: `cubic-bezier(0.42, 0, 1, 1)`
- `--ease-in-out`: `cubic-bezier(0.42, 0, 0.58, 1)`
- `--ease-snappy`: `cubic-bezier(0.16, 1, 0.3, 1)`
- `--ease-back`: `cubic-bezier(0.34, 1.56, 0.64, 1)`

### 3.11 Escala tipográfica (estilos base)

| Elemento | Tamanho | Peso | Altura da linha |
|---|---|---|---|
| `html` | var(--font-size) | — | — |
| `h1` | var(--text-h1) | var(--font-weight-extrabold) | 1.15 |
| `h2` | var(--text-h2) | var(--font-weight-extrabold) | 1.2 |
| `h3` | var(--text-h3) | var(--font-weight-semibold) | 1.3 |
| `h4` | var(--text-h4) | var(--font-weight-semibold) | 1.4 |
| `h5` | var(--text-subtitle) | var(--font-weight-semibold) | 1.4 |
| `h6` | var(--text-body) | var(--font-weight-semibold) | 1.5 |
| `label` | var(--text-body-sm) | var(--font-weight-medium) | 1.5 |
| `button` | — | var(--font-weight-semibold) | 1.5 |
| `input, textarea, select` | var(--text-body) | var(--font-weight-normal) | — |

## 4. Regras de uso

Regras documentadas no site. Antes de montar uma tela, leia as que valem para ela.

- **Um só botão principal (cheio) por área; o resto em contorno, ghost ou link** — Botões › Um botão principal (`buttons#botao-principal`) · [src/app/components/showcase/FormShowcase.tsx:202](src/app/components/showcase/FormShowcase.tsx#L202)
- **Hierarquia de ações: principal, secundária e terciária** — Usabilidade › Hierarquia de ações (`usability#ux-hierarchy`) · [src/app/components/showcase/UsabilityShowcase.tsx:285](src/app/components/showcase/UsabilityShowcase.tsx#L285)
- **Como escolher o card: pelo fundo, com borda ou com sombra** — Cards › Como escolher (`cards#card-escolher`) · [src/app/components/showcase/CardShowcase.tsx:586](src/app/components/showcase/CardShowcase.tsx#L586)
- **Card: borda, sombra e raio** — Cards › Borda, sombra e raio (`cards#card-layout`) · [src/app/components/showcase/CardShowcase.tsx:669](src/app/components/showcase/CardShowcase.tsx#L669)
- **Card: o que evitar** — Cards › O que evitar (`cards#card-guidelines`) · [src/app/components/showcase/CardShowcase.tsx:1567](src/app/components/showcase/CardShowcase.tsx#L1567)
- **Alertas: tipos e quando usar cada um** — Feedback › Alertas (`feedback#alerts`) · [src/app/components/showcase/FeedbackShowcase.tsx:302](src/app/components/showcase/FeedbackShowcase.tsx#L302)
- **Alerta com ação: ações sempre embaixo do texto** — Feedback › Alerta com ação (`feedback#alerta-com-acao`) · [src/app/components/showcase/FeedbackShowcase.tsx:338](src/app/components/showcase/FeedbackShowcase.tsx#L338)
- **Grid de colunas: 4, 8 e 12 colunas por tela** — Grid e espaçamento › Grid de colunas (`grid#grid-colunas`) · [src/app/components/showcase/GridShowcase.tsx:141](src/app/components/showcase/GridShowcase.tsx#L141)
- **Grid e espaçamento: como usar** — Grid e espaçamento › Como usar (`grid#grid-uso`) · [src/app/components/showcase/GridShowcase.tsx:242](src/app/components/showcase/GridShowcase.tsx#L242)
- **Grid e espaçamento: o que evitar** — Grid e espaçamento › O que evitar (`grid#grid-evitar`) · [src/app/components/showcase/GridShowcase.tsx:305](src/app/components/showcase/GridShowcase.tsx#L305)
- **Estado nunca só por cor: ícone e texto juntos** — Estados de informação › Nunca só cor (`states#states-regras`) · [src/app/components/showcase/StatesShowcase.tsx:161](src/app/components/showcase/StatesShowcase.tsx#L161)
- **Contraste mínimo (WCAG 2.2 AA)** — Acessibilidade › Contraste (`accessibility#a11y-contrast`) · [src/app/components/showcase/AccessibilityShowcase.tsx:447](src/app/components/showcase/AccessibilityShowcase.tsx#L447)
- **Respeitar a preferência por menos movimento** — Acessibilidade › Movimento (`accessibility#a11y-motion`) · [src/app/components/showcase/AccessibilityShowcase.tsx:549](src/app/components/showcase/AccessibilityShowcase.tsx#L549)
- **Durações e curvas oficiais de movimento** — Movimento › Tokens de movimento (`motion#motion-tokens`) · [src/app/components/showcase/MotionShowcase.tsx:1102](src/app/components/showcase/MotionShowcase.tsx#L1102)
- **Ações destrutivas: confirmação e desfazer** — Usabilidade › Ações destrutivas (`usability#ux-destructive`) · [src/app/components/showcase/UsabilityShowcase.tsx:371](src/app/components/showcase/UsabilityShowcase.tsx#L371)
- **Microcopy: textos de botões, erros e estados** — Tom de voz › Microcopy (`voice#voice-microcopy`) · [src/app/components/showcase/VoiceShowcase.tsx:154](src/app/components/showcase/VoiceShowcase.tsx#L154)
- **Gráficos: como escolher** — Gráficos › Como escolher (`graficos#graficos-escolher`) · [src/app/components/showcase/GraficosShowcase.tsx:821](src/app/components/showcase/GraficosShowcase.tsx#L821)
- **Gráficos: cores e ordem dos tons** — Gráficos › Cores dos gráficos (`graficos#graficos-cores`) · [src/app/components/showcase/GraficosShowcase.tsx:255](src/app/components/showcase/GraficosShowcase.tsx#L255)
- **Cabeçalho: uso** — Header e menus › Uso (`header#header-usage`) · [src/app/components/showcase/HeaderShowcase.tsx:803](src/app/components/showcase/HeaderShowcase.tsx#L803)

Regras de trabalho do repositório: [`CLAUDE.md`](CLAUDE.md), [`guidelines/Guidelines.md`](guidelines/Guidelines.md), [`propostas/README.md`](propostas/README.md).

Outras seções de uso, cuidados e checklists:

- Marca › Quando usar o símbolo (`brand#brand-uso-simbolo`)
- Marca › Regras para crescer (`brand#brand-regras`)
- Tokens de design › As três camadas (`tokens#tokens-hierarchy`)
- Usabilidade › Revisão rápida (`usability#ux-checklist`)
- Acessibilidade › Lista de verificação (checklist) (`accessibility#a11y-checklist`)
- Cards › Uso com limite (`cards#card-uso`)
- Cards › O que evitar (`cards#card-evitar`)
- Painel lateral › Uso (`sidepanel#sidepanel-usage`)
- Linha do tempo › Uso (`timeline#timeline-usage`)
- Etapas (Stepper) › Uso (`stepper#stepper-usage`)

## 5. Propostas de componente

Peças novas pedidas por um produto, no processo de [`propostas/README.md`](propostas/README.md).

| Proposta | Componente | Status |
|---|---|---|
| [Alert com tom](propostas/2026-11-27-alert-tom.md) | `Alert (props tom e icone) em src/app/components/ui/alert.tsx` | proposta |
| [Avaliação](propostas/2026-11-27-avaliacao.md) | `Avaliacao em src/app/components/ui/avaliacao.tsx` | proposta |
| [Tons do Badge e do IconeComBase](propostas/2026-11-27-badge-tons.md) | `Badge (variantes marca, neutro, sucesso, aviso, erro, info) e IconeComBase (tons sucesso, aviso, erro, info) em src/app/components/ui/badge.tsx e painel-dados.tsx` | proposta |
| [Textos da barra de ações em lote e card de indicador clicável](propostas/2026-11-27-barra-de-acoes-em-lote.md) | `BarraDeAcoesEmLote (itemNoSingular, itemNoPlural, selecionadaNoFeminino, textoDaContagem, rotuloDaRegiao, rotuloLimpar, children) e CardIndicador (href, onClick, comoLink) em src/app/components/ui/painel-produtos.tsx e painel-dados.tsx` | proposta |
| [Botão de envio](propostas/2026-11-27-botao-de-envio.md) | `BotaoDeEnvio, useEstadoDoEnvio em src/app/components/ui/botao-de-envio.tsx` | proposta |
| [Cabeçalho do site e menu do celular](propostas/2026-11-27-cabecalho-do-site.md) | `CabecalhoDoSite, MenuDoCelular, useRolagemDoCabecalho em src/app/components/ui/cabecalho-do-site.tsx` | proposta |
| [Caixa de código](propostas/2026-11-27-caixa-de-codigo.md) | `CaixaDeCodigo em src/app/components/ui/caixa-de-codigo.tsx` | proposta |
| [Campo de busca](propostas/2026-11-27-campo-de-busca.md) | `CampoDeBusca em src/app/components/ui/campo-de-busca.tsx` | proposta |
| [CampoDeEndereco (endereço com sugestões)](propostas/2026-11-27-campo-de-endereco.md) | `CampoDeEndereco, buscaNoPhoton, enderecoDoPhoton, textoDaSugestao em src/app/components/ui/campo-de-endereco.tsx (mesmo arquivo nos dois DS)` | proposta |
| [Campo (o campo padrão)](propostas/2026-11-27-campo.md) | `Campo, MensagemDeErro (CampoDoCadastro é o mesmo componente) em src/app/components/ui/campo.tsx` | proposta |
| [Cartão de escolha](propostas/2026-11-27-cartao-de-escolha.md) | `CartaoDeEscolha e GrupoDeCartoesDeEscolha em src/app/components/ui/cartao-de-escolha.tsx` | proposta |
| [Chip de estado](propostas/2026-11-27-chip-de-estado.md) | `ChipDeEstado em src/app/components/ui/chip-de-estado.tsx` | proposta |
| [Chips de filtro](propostas/2026-11-27-chip-filtravel.md) | `ChipFiltravel, GrupoDeChipsFiltraveis, GrupoDeChips, ChipDeFiltro, ListaDeFiltrosAtivos em src/app/components/ui/chip-filtravel.tsx` | proposta |
| [Consistência entre os dois design systems](propostas/2026-11-27-consistencia-entre-ds.md) | — | proposta |
| [Conversa e moldura de celular](propostas/2026-11-27-conversa.md) | `Conversa, BalaoDaConversa, SeparadorDaConversa, IndicadorDeDigitacao, MolduraDeCelular, CabecalhoDaConversa, BotaoDeResposta, CampoDeMensagem, FolhaDeOpcoes em src/app/components/ui/conversa.tsx` | proposta |
| [Entrada ao rolar, número animado, cursor e miniatura do painel](propostas/2026-11-27-demonstracoes.md) | `SurgirAoRolar, TituloQueSurge, NumeroAnimado, CursorDeDemonstracao (moverCursor, clicarCursor), MiniaturaDoPainel (IndicadoresDaMiniatura, GraficoDaMiniatura, TabelaDaMiniatura) e os tokens de movimento em JS (movimento.ts) em src/app/components/ui/surgir-ao-rolar.tsx, numero-animado.tsx, cursor-de-demonstracao.tsx, miniatura-do-painel.tsx, movimento.ts` | proposta |
| [Estado vazio, estado final e página de erro](propostas/2026-11-27-estado-vazio.md) | `EstadoVazio, EstadoFinal, PaginaDeErro em src/app/components/ui/estado-vazio.tsx` | proposta |
| [Grupo de opções e linha com interruptor](propostas/2026-11-27-grupo-de-opcoes.md) | `GrupoDeOpcoes, LinhaDeInterruptor em src/app/components/ui/grupo-de-opcoes.tsx` | proposta |
| [Links de texto e alça Saiba mais](propostas/2026-11-27-links.md) | `LinkDeTexto, LinkDeVoltar, LinkPularConteudo (ui/links) e LinkSaibaMais (ui/link-saiba-mais) em src/app/components/ui/links.tsx e link-saiba-mais.tsx` | proposta |
| [Lista de vantagens](propostas/2026-11-27-lista-de-vantagens.md) | `ListaDeVantagens em src/app/components/ui/lista-de-vantagens.tsx` | proposta |
| [Logo](propostas/2026-11-27-logo.md) | `Logo em src/app/components/ui/logo.tsx` | proposta |
| [Moldura das telas de conta](propostas/2026-11-27-moldura-de-conta.md) | `MolduraDeConta em src/app/components/ui/moldura-de-conta.tsx` | proposta |
| [Prosa (textos longos)](propostas/2026-11-27-prosa.md) | `Prosa em src/app/components/ui/prosa.tsx` | proposta |
| [Prova social](propostas/2026-11-27-prova-social.md) | `ProvaSocial em src/app/components/ui/prova-social.tsx` | proposta |
| [Quadro (kanban)](propostas/2026-11-27-quadro.md) | `Quadro em src/app/components/ui/quadro.tsx` | proposta |
| [Rodapé do site](propostas/2026-11-27-rodape-do-site.md) | `RodapeDoSite em src/app/components/ui/rodape-do-site.tsx` | proposta |
| [Seletor de quantidade](propostas/2026-11-27-seletor-de-quantidade.md) | `SeletorDeQuantidade em src/app/components/ui/seletor-de-quantidade.tsx` | proposta |
| [Tokens --sobreposicao e --mapa-*](propostas/2026-11-27-sobreposicao-e-tons-do-mapa.md) | — | proposta |
| [Tabela adaptável e barra de ferramentas](propostas/2026-11-27-tabela-adaptavel.md) | `TabelaAdaptavel, BarraDeFerramentasDaTabela em src/app/components/ui/tabela-adaptavel.tsx` | proposta |
| [Contador de caracteres no Textarea](propostas/2026-11-27-textarea-contador.md) | `Textarea (prop contador) em src/app/components/ui/textarea.tsx` | proposta |
| [Título de grupo](propostas/2026-11-27-titulo-de-grupo.md) | `TituloDeGrupo em src/app/components/ui/titulo-de-grupo.tsx` | proposta |
| [Caixa de consentimento](propostas/2026-11-28-caixa-de-consentimento.md) | `CaixaDeConsentimento em src/app/components/ui/caixa-de-consentimento.tsx (mesmo arquivo e API no DS Dani Moscatelli)` | aprovada (dona do produto, 28/11/2026; publicação com o "sim" dela) |
| [Confete](propostas/2026-11-28-confete.md) | `Confete, dispararConfete e EstadoFinal comemorar em src/app/components/ui/confete.tsx` | proposta |
| [Escala de notas](propostas/2026-11-28-escala-de-notas.md) | `EscalaDeNotas e GrupoDeEscalas em src/app/components/ui/escala-de-notas.tsx` | proposta |
| [Escolha ordenada](propostas/2026-11-28-escolha-ordenada.md) | `EscolhaOrdenada (e proximaOrdem) em src/app/components/ui/escolha-ordenada.tsx` | proposta |
| [Página 404 padrão e espaço abaixo do cabeçalho](propostas/2026-11-28-pagina-404-padrao.md) | `PaginaDeErro (nova prop abaixoDoCabecalho; a variante moldura="card" é o modelo do Dani Moscatelli) em src/app/components/ui/estado-vazio.tsx; token --espaco-abaixo-do-cabecalho e classe .ds-abaixo-do-cabecalho em src/styles/theme.css` | aprovada (decisões da dona do produto de 28/11/2026; publicação com o "sim" dela) |
| [Recorte de foto](propostas/2026-11-28-recorte-de-foto.md) | `RecorteDeFoto em src/app/components/ui/recorte-de-foto.tsx` | proposta |

## 6. Páginas e âncoras do site

- **Início** (`overview`): `home-publicos` · `whats-new` Novidades · `home-explore` Tudo no sistema
- **Primeiros passos** (`get-started`): `gs-overview` O que é o FindLook Design System? · `gs-structure` Usando o sistema · `gs-design` Design · `gs-develop` Desenvolvimento
- **Princípios de design** (`principles`)
- **Desenvolvimento** (`develop`): `dev-catalogo` Consulte o catálogo antes de montar qualquer peça · `dev-announcements` As últimas do desenvolvimento · `dev-platforms` Plataformas · `dev-setup` Como os tokens são definidos no código · `dev-reference` Referência de tokens · `dev-workflow` Mantendo design e código em sincronia · `dev-ai` Construindo com IA
- **Marca** (`brand`): `brand` · `brand-assinatura` Assinatura horizontal · `brand-vertical` Assinatura vertical · `brand-simbolo` Símbolo · `brand-wordmark` Wordmark · `brand-slogan` Assinatura com slogan · `brand-uso-simbolo` Quando usar o símbolo · `brand-responsivo` Escala e legibilidade · `brand-fundos` Fundo e contraste · `brand-paleta` Identidade cromática · `brand-tipografia` Tipografia · `brand-regras` Regras para crescer · `brand-respiro` Área de proteção
- **Mascote & Ilustrações** (`ilustracoes`): `mascote-personagem` Personagem (Nyx) · `mascote-expressoes` Expressões e poses · `mascote-estilo` Estilo de ilustração · `mascote-estados-vazios` Estados vazios · `mascote-estados-erro` Estados de erro · `mascote-diretrizes` Diretrizes de uso · `mascote-ativos` Ativos e nomenclatura
- **Fundamentos** (`colors`): `colors` Paleta de cores · `typography` Tipografia · `spacing` · `radius` Raio · `shadows` Sombras · `colors-tokens` Tokens
- **Grid e espaçamento** (`grid`): `grid-visao` Visão geral · `grid-escala` Escala de espaçamento · `grid-colunas` Grid de colunas · `grid-larguras` Larguras máximas · `grid-ritmo` Ritmo vertical · `grid-cabecalho` Espaço abaixo do cabeçalho · `grid-uso` Como usar · `grid-celular` Celular: alinhamento e toque · `grid-evitar` O que evitar · `grid-tokens` Tokens
- **Tokens de design** (`tokens`): `tokens-intro` O que são tokens · `tokens-hierarchy` As três camadas · `tokens-design` Guia para designers · `tokens-ia` IA e tokens · `tokens-bridge` Mapeamento Design ↔ Dev · `tokens-definition` Implementação em código
- **Integração** (`integration`)
- **Usabilidade** (`usability`): `ux-principles` Princípios · `ux-hierarchy` Hierarquia de ações · `ux-targets` Tamanho de alvo · `ux-feedback` Status do sistema · `ux-states` Estados de conteúdo · `ux-errors` Erros e microcopy · `ux-destructive` Ações destrutivas · `ux-checklist` Revisão rápida
- **Acessibilidade** (`accessibility`): `a11y-principles` Princípios · `a11y-contrast` Contraste · `a11y-focus` Foco · `a11y-keyboard` Teclado · `a11y-forms` Formulários e rótulos · `a11y-structure` Estrutura e ARIA · `a11y-motion` Movimento · `a11y-checklist` Lista de verificação (checklist)
- **Tom de voz** (`voice`): `voice-principios` Três pilares · `voice-mensagens` Arquitetura de mensagens · `voice-microcopy` Microcopy
- **Estados de informação** (`states`): `states-lista` Os cinco estados · `states-componente` Chip de status · `states-publicacao` Status de publicação · `states-regras` Nunca só cor · `states-tokens` Tokens
- **Fundos** (`backgrounds`): `gradient-anim-bg` Gradiente animado · `canvas-reveal-bg` · `vortex-bg` Vórtice · `bg-lines-bg` Linhas de fundo · `doodle-bg` Textura doodle · `section-backgrounds` Guia de composição · `backgrounds-tokens` Tokens
- **Movimento** (`motion`): `enter-presets` Presets de entrada e saída · `easing` Referência de easing · `spring` Física de mola · `stagger` Stagger e sequências · `hover` Interações de hover · `micro` Microinterações · `loaders` Loaders e progresso · `layout` Transições de layout · `motion-tokens` Tokens de movimento · `marquee` Faixa rolante (marquee) · `animated-list` Lista animada · `orbiting-circles` Círculos orbitais · `wobble-card` Card com wobble · `shine-border` Shine Border
- **Templates** (`templates`): `template-dashboard` Painel da loja (protótipo) · `template-auth` Entrar e criar conta · `template-landing` Landing page para lojistas · `template-flutuantes` Botões flutuantes · `templates-tokens` Tokens
- **Catálogo de componentes** (`catalogo`): `catalogo-lista` Todos os componentes
- **Padrões do produto** (`produto`): `produto-busca` Busca do hero · `produto-loja-mapa` Card de loja e mapa · `produto-cadastro` Cadastro do lojista
- **Botões** (`buttons`): `buttons` Variantes de botão · `botao-principal` Um botão principal · `inputs` Controles de formulário · `password` Senha · `cartoes-de-escolha` Cartões de escolha · `botao-dividido` Botão dividido · `seletor-periodo` Seletor de período · `buttons-tokens` Tokens · `botao-quebra` Texto longo no botão
- **Cards** (`cards`): `card-escolher` Como escolher · `card-solido` Card sólido · `card-anatomy` Anatomia do card · `card-fundos` Por fundo · `card-layout` Borda, sombra e raio · `card-orientacao` Vertical e horizontal · `card-mesma-altura` Mesma altura ou um por linha · `card-actions` Botões em cards · `card-ia` Arquitetura de informação · `card-uso` Uso com limite · `card-andamento` Andamento de tarefa · `card-states` Estados · `card-animacao` Animação · `card-shine` Borda brilhante (shine border) · `card-nested` Cards aninhados · `card-partner` Card de convite ao parceiro · `card-produto` Card de peça · `card-plano` Card de plano · `card-dica` Card de dica · `card-mostrar-mais` Card com Mostrar mais · `faixa-beneficios` Faixa de benefícios · `card-vidro` Card de vidro · `card-glass` Vidro: acabamentos · `card-glass-fundos` Vidro por fundo · `card-glass-conteudo` Vidro com conteúdo · `card-glass-escuro` Vidro no tema escuro · `card-testar` Testar o vidro · `card-glass-teste` Testar o vidro · `card-evitar` O que evitar · `card-guidelines` O que evitar · `card-accessibility` Acessibilidade do card · `card-tokens` Tokens de card
- **Gráficos** (`graficos`): `graficos-cores` Cores dos gráficos · `graficos-catalogo` Catálogo completo · `graficos-catalogo-comparacao` · `graficos-catalogo-tempo` · `graficos-catalogo-composicao` · `graficos-catalogo-relacoes` · `graficos-catalogo-distribuicao` · `graficos-catalogo-geografia` · `graficos-escolher` Como escolher · `graficos-rosca` Rosca · `graficos-recomendados` Gráficos recomendados · `graficos-inteligencia` Design de inteligência · `graficos-componentes` Componentes e props · `graficos-acessibilidade` Acessibilidade dos gráficos · `barras-destaque-e-funil` Escala em ordem e funil
- **Exibição de dados** (`data`): `kpi-cards` Cards de KPI · `kpi-painel` Indicador do painel · `charts` Gráficos · `grafico-desempenho` Gráfico de desempenho · `grafico-participacao` Rosca, barras e mapa · `grafico-anel` Gráfico de anel · `table` Tabela · `linhas-colunas` Linhas com tags e ações · `tabela-produtos` Tabela de produtos · `data-tokens` Tokens
- **Feedback** (`feedback`): `tabs` Abas · `abas-contador` Abas com contador · `alerts` Alertas · `alerta-sem-titulo` Alerta só com descrição · `alerta-com-acao` Alerta com ação · `banner-promocional` Banner promocional · `toasts` Notificações (toast) · `progress` Progresso · `skeleton` Carregamento (skeleton) · `feedback-tokens` Tokens · `confete` Confete na conquista · `avatar-decorativo` Avatares de enfeite
- **Rótulos** (`badges`): `badges` Badges e tags · `selo` Selo (tag do hero) · `selo-secao` Selo de seção · `rotulos-timeline` · `avatar` Avatar · `avatar-circles` Círculos de avatares · `empty-states` Estados vazios · `listas-painel` Listas de atividade e ações · `badges-tokens` Tokens
- **Ícones** (`icons`): `icon-sizes` Tamanhos e cores · `icon-base` Base do ícone · `icon-library` Biblioteca · `icons-tokens` Tokens
- **Sobreposições (overlays)** (`overlays`): `breadcrumb` Trilha de navegação (breadcrumb) · `pagination` Paginação · `menu-painel` Menu do painel · `barra-superior` Barra superior · `cabecalho-pagina` Cabeçalho da página · `tooltips` Dica de contexto (tooltip) · `dropdown` Menu suspenso (dropdown) · `dialogs` Diálogos · `accordion` Sanfona (accordion) · `overlays-tokens` Tokens
- **Header e menus** (`header`): `header-demo` Demonstração · `header-models` Modelos · `header-scroll` Comportamentos de rolagem · `header-mobile` Menus no celular · `header-backgrounds` Fundos por trás do header · `header-a11y` Checklist de acessibilidade · `header-usage` Uso · `header-tokens` Tokens
- **Painel lateral** (`sidepanel`): `sidepanel-anatomy` Anatomia · `sidepanel-behavior` Comportamento · `sidepanel-store` Formulário em painel · `sidepanel-a11y` Checklist de acessibilidade · `sidepanel-usage` Uso · `sidepanel-tokens` Tokens
- **Linha do tempo** (`timeline`): `timeline-demo` Demonstração · `timeline-anatomy` Anatomia · `timeline-motion` Movimento: indicador de etapas · `timeline-usage` Uso
- **Etapas (Stepper)** (`stepper`): `stepper-demo` Demonstração · `stepper-anatomy` Anatomia e estados · `stepper-a11y` Acessibilidade · `stepper-usage` Uso
- **Upload** (`upload`): `upload-dropzone` Área de soltar · `recorte-de-foto` Recorte de foto
- **Moldura do site** (`site`): `site-cabecalho` Cabeçalho e menu do celular · `site-rodape` Rodapé do site · `site-conta` Moldura das telas de conta · `site-erro` Página de erro (404) · `site-hero` Vantagens e prova social · `site-logo` Logo · `site-links` Links de texto · `site-prosa` Prosa (textos longos)
- **Campos e formulários** (`campos`): `campo-padrao` Campo (o campo padrão) · `campo-de-busca` Campo de busca · `campo-texto-longo` Texto longo com contador · `grupo-de-opcoes` Grupo de opções e interruptor · `seletor-de-quantidade` Seletor de quantidade · `caixa-de-codigo` Caixa de código · `botao-de-envio` Botão de envio · `calendario` Seletor de data (Calendar) · `campo-de-endereco` Endereço com sugestões (CampoDeEndereco) · `campo-com-prefixo` Prefixo, sufixo e desabilitado · `escolha-ordenada` Escolha ordenada · `escala-de-notas` Escala de notas · `caixa-de-consentimento` Caixa de consentimento
- **Chips e estados** (`chips-e-estados`): `chip-de-estado` Chip de estado · `chips-filtro` Chips de filtro · `etiquetas-tons` Etiquetas e bases por tom · `alerta-tom` Alerta com tom · `estado-vazio` Estado vazio · `avaliacao-e-grupos` Avaliação e título de grupo
- **Quadro, conversa e tabela** (`painel-e-admin`): `quadro` Quadro (kanban) · `conversa` Conversa e celular · `tabela-adaptavel` Tabela adaptável · `card-indicador-link` Card de indicador clicável
- **Demonstrações animadas** (`demonstracoes`): `surgir-ao-rolar` Entrada ao rolar · `numero-animado` Número animado · `cursor-de-demonstracao` Cursor de demonstração · `miniatura-do-painel` Miniatura do painel
