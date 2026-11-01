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
