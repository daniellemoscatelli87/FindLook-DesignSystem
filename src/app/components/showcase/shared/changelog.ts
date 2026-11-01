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
