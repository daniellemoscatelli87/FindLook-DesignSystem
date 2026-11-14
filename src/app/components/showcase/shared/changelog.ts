import type { Bi } from "../../../i18n";

export type ChangeKind = "New" | "Updated" | "Removed";

export type ChangeEntry = {
  date: string;
  kind: ChangeKind;
  title: Bi;
  desc: Bi;
  page?: string;
  anchor?: string;
};

// Mais recente primeiro. O design system é só em português: `en` repete o texto em português.
// Toda inclusão, mudança ou remoção entra no TOPO desta lista.
const pt = (text: string): Bi => ({ en: text, pt: text });

export const changelog: ChangeEntry[] = [
  {
    date: "Nov 2026", kind: "New", title: pt("Voltar ao topo"),
    desc: pt("Novo componente: botão redondo vermelho com seta para cima, fixo no canto inferior direito, que aparece quando a pessoa chega ao fim da página e a leva de volta ao topo. Com menos movimento, a volta é instantânea; ao voltar, o foco vai para o conteúdo principal. Entrou no template da landing page."),
    page: "templates", anchor: "template-landing",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Shine Border mais ligeiro"),
    desc: pt("A volta do brilho ficou cerca de 40% mais rápida: padrão do componente de 14 s para 8 s; exemplos lento, padrão e rápido em 11, 8 e 5 s; card de destaque e combinações de cor em 7 s."),
    page: "cards", anchor: "card-shine",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Shine Border: a luz agora dá a volta pela borda inteira"),
    desc: pt("Antes, um gradiente radial ia e voltava na diagonal: a borda só mudava de tom e o brilho não percorria os cantos. Agora um feixe (gradiente cônico) gira em volta do card a cada duration e passa por todos os cantos. Cores, presets, duração e movimento reduzido continuam iguais."),
    page: "cards", anchor: "card-shine",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Página Cards reorganizada: tudo sobre cards num só lugar"),
    desc: pt("A página Cards foi reorganizada e passou a concentrar tudo sobre cards. Começa por “Como escolher” (o fundo define card, borda, sombra e raio) e segue em partes: 1) Card sólido: anatomia, por fundo (branco, cinza claro e escuro no modo claro: card branco sem borda e com sombra forte), borda, sombra e raio, vertical e horizontal, com e sem foto e botão, botões, arquitetura de informação (com os cards de KPI e o indicador do painel), estados (incluindo carregando), animação e onde aplicar (elevação no hover, Wobble, Canvas Reveal), Shine Border, aninhados e componentes prontos (convite, peça, plano, dica e faixa de benefícios); 2) Card de vidro: só combinações aprovadas no contraste, por fundo (claro, escuro e foto), com conteúdo e no tema escuro (painel); o acabamento “Padrão” passou a se chamar “Vidro”; 3) Testar o vidro: a bancada de teste, separada; 4) O que evitar: todos os “não faça” num só lugar. Wobble Card, Shine Border, Canvas Reveal os cards de KPI e o indicador do painel saíram de Motion, Backgrounds e Exibição de dados; lá ficou um link “Ver em Cards”."),
    page: "cards", anchor: "card-escolher",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Cards de vidro: fundo de teste"),
    desc: pt("O seletor de acabamentos ganhou o controle “Fundo de teste”: padrão, textura fechada, textura aberta, textura escura, clara e discreta e cor sólida (cinza claro, cinza médio, grafite ou primária). A conferência de contraste de cada card usa o fundo escolhido (pior caso entre o fundo e um traço da textura). O vidro padrão passou a aparecer também na galeria de acabamentos."),
    page: "cards", anchor: "card-glass",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Vidro no tema escuro: acabamento painel e Luzes difusas"),
    desc: pt("O card padrão das páginas escuras passa a ser o vidro do painel conceitual da página de lojistas: GlassCard com o novo acabamento finish=\"painel\" (grafite-950 a 55%, desfoque de 8 px, borda clara e sombra grande), sobre o novo componente Luzes difusas (focos de luz nas cores da marca, que param com menos movimento e podem se dissolver na base). Caixas dentro do vidro são vazadas: só borda clara, sem preenchimento cinza."),
    page: "cards", anchor: "card-glass-escuro",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Header e menus: modelo padrão do site do estúdio"),
    desc: pt("O padrão agora segue o header atual do site do estúdio Dani Moscatelli: pílula clara flutuando no desktop, faixa que fica grafite no celular e menu em folha inferior. A rolagem virou três chaves independentes (transparente no topo, logo vira ícone ao rolar, some ao descer e volta ao subir). A versão do logo completo é escolhida pelo que está atrás dele (claro, escuro ou foto). O menu fica em um lugar só: header ou barra inferior."),
    page: "header", anchor: "header-demo",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Header e menus"),
    desc: pt("Nova seção com o padrão de header de site, com os links da landing “Para lojas”. Demonstração em uma janela com rolagem própria: três comportamentos de rolagem (transparente → sólido, some e volta, compacto ao rolar), três menus no celular (gaveta lateral, tela cheia e barra inferior com os itens do painel da loja) e quatro fundos por trás do header (fundo da página, foto escura com véu, gradiente da marca e modo escuro). Inclui checklist de acessibilidade, uso e tokens."),
    page: "header", anchor: "header-demo",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Cards de preço: recursos recolhíveis e “Para quem” opcional"),
    desc: pt("Em “Planos e assinatura”, a lista de recursos começa recolhida, com o botão “Ver recursos do plano” e a contagem (por exemplo, 5 de 10). Abrir ou fechar vale para todos os cards, que ficam sempre alinhados; o botão usa aria-expanded. O bloco “Para quem” é opcional: plano sem esse texto não mostra o bloco, e um interruptor acima do protótipo mostra o card com e sem ele."),
    page: "templates", anchor: "template-dashboard",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Cards de preço no estilo do card com wobble"),
    desc: pt("Os cards de “Planos e assinatura” passaram a usar o visual do card com wobble: cantos mais arredondados, ícone em círculo, selo “Recomendado” com estrela, nome do plano em destaque, checks em círculo colorido e rodapé com preço e ação. Continuam o seletor Mensal/Anual, o bloco “Para quem”, os recursos incluídos e não incluídos e o estado selecionado. Sobre a página branca, só borda, sem sombra. Dentro do protótipo, as colunas seguem a largura da janela, e o bloco “Para quem” cresce em vez de vazar quando o card fica estreito demais."),
    page: "templates", anchor: "template-dashboard",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Etapas (Stepper): visual do protótipo"),
    desc: pt("O Stepper passou a usar o visual do protótipo do produto (v8.87): abas numeradas (01, 02…), atual em círculo na primária com sublinhado de 3 px, concluídas em grafite escuro e futuras em cinza claro. No celular continua compacto, com “Etapa X de N”."),
    page: "stepper", anchor: "stepper-anatomy",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Etapas (Stepper)"),
    desc: pt("Novo componente para formulários em várias telas, como o cadastro do lojista: marcador numerado por etapa, atual em rosa claro com aria-current, concluídas com check e reabríveis, futuras bloqueadas. No celular mostra “Etapa X de N” e o nome da etapa atual."),
    page: "stepper", anchor: "stepper-demo",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Cards on white: border, no shadow", pt: "Card sobre fundo branco: borda, sem sombra" },
    desc: { en: "New rule in Cards: on a white background, a card has no shadow and uses a light gray border (--border); shadows are for hover and overlays. All resting cards on the white page now follow it.", pt: "Nova regra em Cards: sobre fundo branco, o card não tem sombra e usa borda cinza clara (--border); a sombra fica para o hover e para sobreposições. Todos os cards parados sobre a página branca passaram a seguir a regra." },
    page: "cards", anchor: "card-guidelines",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Real version number", pt: "Número de versão real" },
    desc: { en: "Pages now show the published version and year (for example “Version 37 · 2026”), updated on every publication, instead of the fixed “Version 1.0 · 2024” left over from the template.", pt: "As páginas passaram a mostrar a versão publicada e o ano (por exemplo, “Versão 37 · 2026”), atualizados a cada publicação, no lugar do texto fixo “Versão 1.0 · 2024” que veio do modelo." },
    page: "overview",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Header shimmer visible in light mode", pt: "Brilho do cabeçalho visível no modo claro" },
    desc: { en: "In light mode, the shimmer on “Design System” in the header now sweeps in the primary colour over graphite text, so the animation can be seen. Dark mode is unchanged.", pt: "No modo claro, o brilho que passa por “Design System” no cabeçalho agora corre na cor primária sobre o texto grafite, e a animação fica visível. O modo escuro não mudou." },
    page: "overview",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Menu: “Comece aqui” group", pt: "Menu: grupo “Comece aqui”" },
    desc: { en: "In Portuguese, the first menu group is now called “Comece aqui”, so it no longer repeats the name of its first item, “Início”.", pt: "O primeiro grupo do menu passou a se chamar “Comece aqui”, para não repetir o nome do primeiro item, “Início”." },
    page: "overview",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Complete Lucide library", pt: "Biblioteca Lucide completa" },
    desc: { en: "Icons › Library now shows the whole Lucide library (lucide-react 1.70.0, 2,029 icons in Lucide's official categories, searchable). The 18 brand icons Lucide removed in 1.x (Figma, Github, Instagram, Linkedin, Youtube…) are kept in the DS in their own group. No icon was removed.", pt: "Ícones › Biblioteca agora mostra a Lucide inteira (lucide-react 1.70.0, 2.029 ícones nas categorias oficiais da Lucide, com busca). Os 18 ícones de marca que a Lucide tirou na versão 1.x (Figma, Github, Instagram, Linkedin, Youtube…) continuam no DS, num grupo próprio. Nenhum ícone foi removido." },
    page: "icons", anchor: "icon-library",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Panel components aligned with the DS", pt: "Componentes do painel alinhados ao DS" },
    desc: { en: "Panel components now follow existing DS components and documentation.", pt: "Os componentes do painel passaram a seguir os que já existiam: indicador com a anatomia do Card de KPI, tabela de produtos no desenho da Tabela de dados (com o checkbox do DS), abas com contador iguais às Abas, status no chip dos Estados de informação, botão dividido e seletor de período nas medidas do botão e do select, legenda do gráfico em pontos. O anel de pontuação virou Gráfico de anel, em Gráficos. A documentação das seções novas segue o padrão do DS: título, descrição e exemplos." },
    page: "data", anchor: "grafico-anel",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Opens in light mode", pt: "DS abre no modo claro" },
    desc: { en: "Light mode is FindLook's official theme.", pt: "O modo claro é o oficial da FindLook: o design system agora abre no claro. O modo escuro continua disponível no botão Escuro." },
    page: "overview",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Store panel components in their sections", pt: "Componentes do painel nas seções do DS" },
    desc: { en: "Panel components documented in existing sections.", pt: "A aba Painel da loja saiu. Cada componente do painel agora está na seção onde se encaixa, no mesmo padrão das demais: Exibição de dados (indicador, gráfico de desempenho, tabela de produtos, pontuação e checklist), Estados (status de publicação), Botões (botão dividido, seletor de período), Navegação (menu do painel, barra superior, cabeçalho da página), Feedback (abas com contador, banner promocional), Rótulos (listas de atividade e ações) e Cards (card de plano, card de dica, faixa de benefícios)." },
    page: "data", anchor: "kpi-painel",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Store panel: single navigable prototype", pt: "Painel da loja: protótipo navegável em uma janela só" },
    desc: { en: "Panel templates merged into one prototype.", pt: "Os templates do painel viraram um protótipo só, com altura fixa e rolagem própria: o menu lateral troca de página (Início, Produtos, Importar, Buscas, Inteligência de vendas, Perfil, Equipe, Planos, Configurações, Ajuda e Notificações), com busca que leva às páginas, menu do sino e da conta. O menu tem rolagem própria e vira gaveta dentro da janela em telas estreitas. Logo sem distorção. Entrar e criar conta e a landing page continuam separadas." },
    page: "templates", anchor: "template-dashboard",
  },
  {
    date: "Nov 2026", kind: "New", title: { en: "Store panel", pt: "Painel da loja" },
    desc: { en: "New store panel components and templates.", pt: "Nova seção Componentes › Painel da loja, com menu lateral (seletor de loja, item com contador, card de plano e de ajuda), barra superior (busca, notificações, conta), cabeçalho da página (seletor de período, botão dividido, banner fechável), indicadores, gráfico com legenda que liga e desliga séries, listas (atividade, insights, tendências, checklist e anel de pontuação), tabela de produtos (abas com contagem, seleção e ações em lote, status com motivo, medidor de desempenho) e dicas. Templates novos: Início do painel da loja (no lugar do Dashboard genérico) e Produtos." },
    page: "templates", anchor: "template-dashboard",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Templates adapted to FindLook", pt: "Templates adaptados ao FindLook" },
    desc: { en: "Generic templates adapted to FindLook.", pt: "Configurações, Entrar e criar conta, Equipe, Notificações, Suporte e Landing page agora falam da loja parceira FindLook, em português. Nomes do menu traduzidos." },
    page: "templates", anchor: "template-dashboard",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Pricing template: new texts and calmer dark mode", pt: "Template de preços: textos novos e modo escuro mais sóbrio" },
    desc: { en: "New \"Who it's for\" texts; the box now has a fixed height of four lines. In dark mode, plan name, price, icon and the \"Who it's for\" box are neutral (only the lightbulb stays yellow); the primary colour remains on the Recommended tag, checks, highlighted border and button.", pt: "Textos novos em \"Para quem\"; a caixa agora tem altura fixa de quatro linhas. No modo escuro, nome, preço, ícone e a caixa \"Para quem\" ficaram neutros (só a lâmpada continua amarela); a cor primária fica na etiqueta Recomendado, nos checks, na borda do destaque e no botão." },
    page: "templates", anchor: "template-dashboard",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Pricing template: \"Who it's for\" box", pt: "Template de preços: caixa \"Para quem\"" },
    desc: { en: "The \"Who it's for\" box is now light yellow (warning-muted) with a lightbulb icon, has a fixed height of three lines in every card and no ellipsis: the text must fit in three lines. Three columns from 1280 px; one column below.", pt: "A caixa \"Para quem\" ficou amarelo-clara (warning-muted), com ícone de lâmpada, altura fixa de três linhas em todos os cards e sem reticências: o texto deve caber em até três linhas. Três colunas a partir de 1280 px; uma coluna abaixo disso." },
    page: "templates", anchor: "template-dashboard",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Pricing template: plan names and selected state", pt: "Template de preços: nomes dos planos e estado selecionado" },
    desc: { en: "Plans are now named after what each tag meant (Visibility, Performance, Opportunities) and the tag was removed. The button reads \"Select Plan\" and, once clicked, fills with the primary colour, shows a check and \"Plan selected\"; the chosen card gets the primary border. Under Templates › Pricing.", pt: "Os planos passaram a se chamar pelo que cada tag dizia (Visibilidade, Desempenho, Oportunidades) e a tag saiu do card. O botão agora diz \"Selecionar Plano\" e, ao ser clicado, fica preenchido na primária, com check e \"Plano selecionado\"; o card escolhido ganha a borda na primária. Em Templates › Preços." },
    page: "templates", anchor: "template-dashboard",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Pricing template", pt: "Template de preços" },
    desc: { en: "Plan cards now have a section seal above the name, name and price in the primary colour with \"/ month\", a \"Who it's for\" box limited to two lines, a description, a divider, included items with a check and not-included items with a dash, a \"Recommended\" tag on the highlighted plan and an outlined \"Select\" button. Equal heights; one column on phones. Under Templates › Pricing.", pt: "Os cards de plano ganharam selo de seção acima do nome, nome e preço na cor primária com \"/ mês\", caixa \"Para quem\" com no máximo duas linhas, descrição, divisor, itens incluídos com check e não incluídos com traço, etiqueta \"Recomendado\" no plano em destaque e botão \"Selecionar\" em contorno. Mesma altura; uma coluna no celular. Em Templates › Preços." },
    page: "templates", anchor: "template-dashboard",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Campo de senha com confirmação"),
    desc: pt("Senha e confirmação com exibir/ocultar, força da senha em quatro barras com rótulo, dicas de preenchimento que ganham check verde conforme os requisitos são atendidos e aviso de coincidência. Em Componentes › Botões › Senha."),
    page: "buttons", anchor: "password",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Selo de seção"),
    desc: pt("Pílula colorida das seções do site (tom claro da primária, borda na primária, texto na primária em caixa alta com espaçamento largo), para nomear o assunto acima do título de cada seção. Ao lado do selo do hero, em Componentes › Rótulos."),
    page: "badges", anchor: "selo-secao",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Card de peça: sem bairro, estoque acima do divisor, botões com ícone"),
    desc: pt("Bairro removido; quantidade e atualização ficam acima do divisor e só a ação abaixo; preço antigo riscado na primária acima do atual, com o percentual ao lado; \"Ver peça\" com chevron; \"Avise-me\" como botão de contorno pink; exemplo compacto vertical removido."),
    page: "cards", anchor: "card-produto",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Linha do tempo (Timeline)"),
    desc: pt("Portada da seção \"Como funciona\" do site do estúdio: etapas com marcador redondo e card, linha à esquerda no celular e no centro com cards alternados a partir de 768 px, e a animação Step Indicator na rolagem (etapa atual cresce, feitas preenchem a linha, cards entram uma vez). Respeita movimento reduzido. Em Componentes."),
    page: "timeline", anchor: "timeline-demo",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Card de peça: versão horizontal, desconto e regras fixas"),
    desc: pt("Nova orientação horizontal (imagem à esquerda) para listas; variação com desconto (preço antigo riscado, atual e -N%); bairro e \"Atualizado há …\" sempre presentes; bairro à esquerda acima do nome; nome em até duas linhas com reticências; favorito mantém a cor no card esgotado; \"Avise-me\" com sino."),
    page: "cards", anchor: "card-produto",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Card de peça: escassez na primária, Novo sobre a imagem, esgotada em preto e branco"),
    desc: pt("Tag de escassez e contagem em pink com texto branco (o âmbar não é cor da grade principal); Selo Novo sobre a imagem no canto inferior esquerdo; peça esgotada em preto e branco com só o botão colorido e rótulo \"Avise-me\"."),
    page: "cards", anchor: "card-produto",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Card de peça: estoque, escassez e última atualização"),
    desc: pt("No lugar de \"A confirmar\" e \"Confirmado há…\", o card mostra a quantidade disponível, a tag âmbar de escassez quando restam até 3 peças (\"Só N restantes\" / \"Última peça\"), \"Esgotada\" com zero, e \"Estoque atualizado há…\"."),
    page: "cards", anchor: "card-produto",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Card de peça (ProductCard)"),
    desc: pt("Card de produto para busca, favoritos e vitrine da loja, montado com a anatomia do Card, o Button padrão, o Selo e os ícones de moda: imagem com favorito acessível, tag Novo, bairro, nome, loja · estilo, preço em reais, ação \"Ver peça\" e confirmação com ícone + texto. Densidade compacta para listas estreitas. Em Componentes › Cards."),
    page: "cards", anchor: "card-produto",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Mascote e cenas de volta em PNG e WebP"),
    desc: pt("Os SVGs vetorizados não ficaram bons: a folha mestre da Nyx, seus painéis e a cena \"Nenhuma loja por perto\" voltam a ser entregues em WebP (origem) e PNG (fallback), a partir dos arquivos raster enviados pela dona da marca."),
    page: "ilustracoes", anchor: "mascote-ativos",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Ilustração: nenhuma loja por perto (SVG)"),
    desc: pt("Quinta cena da biblioteca, a primeira em vetor: Nyx surpresa, de braços abertos, numa rua sem lojas, para a busca e o mapa quando não há lojas cadastradas na região. SVG como origem e PNG como fallback; texto alternativo e regras de uso."),
    page: "ilustracoes", anchor: "ilustracao-sem-lojas-locais",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Mascote: arquivo mestre em SVG e cabeçalho padrão"),
    desc: pt("A folha canônica da Nyx passa a ser o vetor mestre (nyx-mestre.svg, fundo transparente), com os painéis de personagem, turnaround, expressões, elementos e paleta recortados do mesmo vetor. Página com o cabeçalho padrão das demais (eyebrow, título com destaque, descrição)."),
    page: "ilustracoes", anchor: "mascote-personagem",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Mascote & Ilustrações: hierarquia completa e folha canônica da Nyx"),
    desc: pt("Seção reorganizada em Personagem (folha de referência com turnaround, elementos e paleta), Expressões e poses (cinco expressões permitidas), Estilo de ilustração, Estados vazios, Estados de erro, Diretrizes de uso (princípios, aplicação e governança) e Ativos e nomenclatura."),
    page: "ilustracoes", anchor: "mascote-personagem",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Ilustrações: identidade da marca e a mascote Nyx"),
    desc: pt("Seção reconstruída: as ilustrações são parte da identidade da marca, protagonizadas pela Nyx, a gata preta (quem ela é, marca registrada, mundo, estilo, onde aparece e onde não). Títulos das peças revisados e estrutura simples por peça: nome, imagem, visão web, visão mobile, onde/quando usar e como não usar."),
    page: "ilustracoes", anchor: "ilustracoes-estilo",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Ilustração: contatos com lojas vazios"),
    desc: pt("Quarta peça da seção Ilustrações: gato com celular na pata imaginando um vestido, para a tela \"Seus contatos com lojas\" da área logada do consumidor quando nenhum contato foi feito. WebP e PNG, texto alternativo e regras de uso."),
    page: "ilustracoes", anchor: "ilustracao-contatos-vazio",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Ilustração: lojas seguidas vazias"),
    desc: pt("Terceira peça da seção Ilustrações: gato pensativo diante de três vitrines com o botão \"+ Seguir\", para a página de Lojas seguidas da área logada do consumidor quando ainda não há lojas seguidas. WebP e PNG, texto alternativo e regras de uso."),
    page: "ilustracoes", anchor: "ilustracao-lojas-seguidas-vazio",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Ilustração: favoritos vazios"),
    desc: pt("Segunda peça da seção Ilustrações: gato surpreso abrindo um guarda-roupa pink vazio, para a página de Favoritos da área logada do consumidor quando ainda não há favoritos. WebP e PNG, texto alternativo e regras de uso."),
    page: "ilustracoes", anchor: "ilustracao-favoritos-vazio",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Seção Ilustrações: página 404"),
    desc: pt("Nova seção, só no FindLook: estilo das ilustrações, catálogo e a primeira peça, a ilustração da página 404 (gato de óculos escuros na sacola, pin com cabide no lugar do zero), com WebP e PNG para download, texto alternativo e regras de uso."),
    page: "ilustracoes", anchor: "ilustracao-404",
    date: "Nov 2026", kind: "New", title: pt("Ícones de moda (IconeModa)"),
    desc: pt("Componente IconeModa com ícones de traço no estilo Lucide para peças que o Lucide não tem: camiseta, camisa, cropped, jaqueta, vestido, calça, shorts, saia, biquíni, meia, tênis, sandália, bota, salto, boné, chapéu, óculos de sol, bolsa, clutch, cinto, gravata, colar, brinco, anel, pulseira e cabide. Mesmos desenhos da textura doodle. Pedido da dona do produto para as listas de produtos da FindLook."),
    page: "icons", anchor: "icon-sizes",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Textura doodle só com peças de moda"),
    desc: pt("Decisão da dona do produto: a textura passa a ter exatamente oito peças (vestido, calça, saia, boné, óculos de sol, sandália, tênis e camiseta), sem outros elementos nem enfeites soltos, para ler como moda à primeira vista. Boné, sandália e saia redesenhados; SVG e PNG regerados."),
    page: "backgrounds", anchor: "doodle-bg",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Cards glassmorphism: área de teste com alerta de contraste"),
    desc: pt("Exemplos sobre a textura do sistema em ícones pequenos; cada card de teste mede o contraste de título e subtítulo contra a superfície efetiva do vidro (WCAG AA) e alerta quando a acessibilidade fica comprometida. Helper glassTextContrast e utilitários de contraste exportados."),
    page: "cards", anchor: "card-glass",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Escala de grafite rebalanceada no fim escuro"),
    desc: pt("Decisão da dona do produto: grafite-800 #2C2C33, grafite-900 #19191C e grafite-950 #000000 (700 segue #3E3E46), com passos regulares de claridade entre o cinza escuro e o preto. Fundo, cards e bordas do tema escuro acompanham; o vetor do logo mantém #060608."),
    page: "colors", anchor: "colors",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Card de vidro com controle livre de opacidade e desfoque"),
    desc: pt("Props numéricas opacity (0–100 %) e blur (0–80 px) sobrepõem o acabamento; sliders no seletor da seção Cards glassmorphism mostram o resultado e o código na hora."),
    page: "cards", anchor: "card-glass",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Cards glassmorphism com acabamentos"),
    desc: pt("Nova prop finish com graus de transparência: translúcido, fosco, foco de luz e cristal, combináveis com tom e opacidade. Seletor interativo na seção de cards glassmorphism; tokens dos acabamentos."),
    page: "cards", anchor: "card-glass",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Textura doodle"),
    desc: pt("Padrão sem emenda com 48 ícones de traço do universo da moda (vestido, calça, saia, cropped, salto, anel, colar, óculos…). Traço em cor sólida: grafite-200 no claro, grafite-800 no escuro, ou qualquer token via máscara. Download em SVG e PNG. Em Backgrounds."),
    page: "backgrounds", anchor: "doodle-bg",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Cards glassmorphism"),
    desc: pt("Nova subcategoria em Cards: componente GlassCard com vidro claro e escuro, três intensidades, tingimento na primária, versão interativa e fallback sólido com transparência reduzida; regras de fundo, contraste e quantidade."),
    page: "cards", anchor: "card-glass",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Controle segmentado"),
    desc: pt("Opções acopladas que se tocam como botões, sempre com uma selecionada: variantes suave e sólida, três tamanhos, ícones, largura total e opção desabilitada. Em Componentes › Botões › Controle segmentado."),
    page: "buttons", anchor: "segmented",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Shine Border com combinações de cores"),
    desc: pt("Nova prop preset com cinco combinações só de tokens (primária, dourada, primária-dourada, ouro, contraste); o dourado é o token --warning. shineColor segue aceitando uma lista de cores. Documentado em Motion › Shine Border."),
    page: "motion", anchor: "shine-border",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Avatar Circles"),
    desc: pt("Círculos de avatares sobrepostos com “+N”, portado do Magic UI e adaptado aos tokens (bordas seguem o fundo, três tamanhos, “+N” clicável só com destino). Em Componentes › Badges › Avatar."),
    page: "badges", anchor: "avatar-circles",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Card de convite ao parceiro"),
    desc: pt("Card que convida o lojista a cadastrar a loja: selo, título com destaque, benefício, ação principal e link secundário. Vertical e horizontal, tamanhos P, M e G, superfícies card, apoio e grafite. Em Componentes › Cards."),
    page: "cards", anchor: "card-partner",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Títulos com destaque na cor primária"),
    desc: pt("Padrão do hero do site aplicado aos títulos: a expressão-chave fica em pink (componente Heading, destaque entre asteriscos). Títulos de página do design system atualizados e regra documentada em Fundamentos › Tipografia."),
    page: "colors", anchor: "typography",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Componentes de upload"),
    desc: pt("Área de arrastar e soltar (com câmera no celular), lista de arquivos com progresso e estados, imagem única com prévia (logo da loja, capa) e galeria de fotos da peça com capa. Validação de tipo, tamanho e quantidade, mensagens em português, checklist de acessibilidade, uso e tokens."),
    page: "upload", anchor: "upload-dropzone",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Selo (tag do hero)"),
    desc: pt("A pílula do topo da página Experience Intelligence do site do estúdio virou componente: fundo de card, borda fina, caixa alta com espaçamento largo e ponto ou ícone na cor primária. Em Rótulos › Selo, com regras de uso e tokens."),
    page: "badges", anchor: "selo",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Cabide sempre branco nos logos"),
    desc: pt("Os vetores oficiais traziam o cabide como recorte, e ele ficava grafite no fundo escuro. Agora o cabide é branco em qualquer fundo, no símbolo e nas assinaturas horizontal e vertical. SVGs, PNGs e favicon regenerados."),
    page: "brand", anchor: "brand-simbolo",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Assinatura horizontal com mais respiro entre símbolo e logotipo"),
    desc: pt("O espaço entre o símbolo e o logotipo passou de 0,13 F para 0,3 F (F = altura do “F”), nas versões sobre claro e sobre grafite. Proporção do símbolo mantida (2,25 F). SVGs e PNGs de download atualizados."),
    page: "brand", anchor: "brand-assinatura",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Painel lateral (gaveta)"),
    desc: pt("Componente e documentação do painel que desliza da direita: anatomia (cabeçalho, corpo rolável, barra de ação fixa, rodapé), comportamento, exemplo de formulário em painel (“Cadastrar minha loja”, demonstração), checklist de acessibilidade, uso e tokens. Padrão herdado do formulário de contato do site do estúdio."),
    page: "sidepanel", anchor: "sidepanel-anatomy",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Tokens unificados com as cores do logo oficial"),
    desc: pt("Pink FindLook passa de #F4144B para #E62040 e o Preto Grafite de #111014 para #060608, as cores do arquivo vetorial da marca. Escalas de 50 a 950 e contrastes recalculados: branco sobre pink agora atinge 4,5:1."),
    page: "colors", anchor: "colors",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Logos oficiais em vetor"),
    desc: pt("Os logos gerados na v1 foram substituídos pelos arquivos vetoriais oficiais da marca: assinaturas horizontal e vertical (fundo claro e escuro), símbolo com cabide vazado, wordmark recortado da assinatura e versões monocromáticas do símbolo. Download em SVG e PNG."),
    page: "brand", anchor: "brand-assinatura",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Estados de informação"),
    desc: pt("Cinco estados padronizados (confirmado pela loja, a confirmar, esgotado, sugerido por IA e desatualizado), sempre com ícone e texto, nunca só cor."),
    page: "states",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Tom de voz e mensagens"),
    desc: pt("Simplicidade, proximidade e ação, com exemplos do que dizer e do que evitar, e a arquitetura de mensagens por público."),
    page: "voice",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("FindLook Design System v1.0"),
    desc: pt("Primeira versão: marca, paleta Pink + Grafite, tipografia Plus Jakarta Sans, princípios de design e logos em SVG e PNG, sobre a estrutura de componentes, usabilidade, acessibilidade e motion do Dani Moscatelli Design System v2."),
    page: "overview",
  },
];
