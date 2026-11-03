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
