import { Building2, Package, Zap } from "lucide-react";

/* Planos de exemplo do template "Planos e assinatura" (Templates › Pricing), em um lugar só: o template e o cadastro
   em etapas (Padrões do produto) mostram os mesmos nomes, descrições, "Para quem" e recursos. Preços são exemplos. */
type L = { en: string; pt: string };

export const pricingFeatures = [
  { en: "Searchable public storefront", pt: "Vitrine pública pesquisável" },
  { en: "Product, variant and stock management", pt: "Gestão de produtos, variantes e estoque" },
  { en: "Catalog import and updates", pt: "Importação e atualização do catálogo" },
  { en: "Promotions and contact requests", pt: "Promoções e solicitações de contato" },
  { en: "Findability tasks", pt: "Tarefas de encontrabilidade" },
  { en: "Interest indicators per product", pt: "Indicadores de interesse por produto" },
  { en: "Store discovery funnel", pt: "Funil de descoberta da loja" },
  { en: "Performance-based recommendations", pt: "Recomendações baseadas no desempenho" },
  { en: "Searches with no results and regional gaps", pt: "Buscas sem resultado e lacunas regionais" },
  { en: "Market trends and comparisons", pt: "Tendências e comparativos de mercado" },
];

// "Para quem" (forWhom) é opcional: plano sem esse texto não mostra o bloco.
export type Plano = { id: string; name: L; price: number; forWhom?: L; desc: L; included: number; highlight: boolean; icon: typeof Package };

export const plans: Plano[] = [
  {
    id: "basico",
    name: { en: "Visibility", pt: "Visibilidade" },
    price: 79,
    forWhom: { en: "Stores and brands that want to showcase their products and win more customers in their area.", pt: "Lojas e marcas que querem destacar seus produtos e conquistar mais clientes na região." },
    desc: { en: "Your searchable storefront, organized products and more ways to be contacted.", pt: "Sua vitrine pesquisável, produtos organizados e mais possibilidades de contato." },
    included: 5,
    highlight: false,
    icon: Package,
  },
  {
    id: "intermediario",
    name: { en: "Performance", pt: "Desempenho" },
    price: 149,
    forWhom: { en: "Businesses that want to understand consumer interest and improve their results.", pt: "Negócios que desejam entender o interesse dos consumidores e melhorar seus resultados." },
    desc: { en: "Everything in the Visibility plan, plus interest and performance analysis and recommendations for your store.", pt: "Todos os recursos do plano Visibilidade, com análise de interesse, desempenho e recomendações para a sua loja." },
    included: 8,
    highlight: true,
    icon: Zap,
  },
  {
    id: "premium",
    name: { en: "Opportunities", pt: "Oportunidades" },
    price: 299,
    forWhom: { en: "Brands that want to identify market demand and discover growth opportunities.", pt: "Marcas que querem identificar demandas do mercado e descobrir oportunidades de crescimento." },
    desc: { en: "All the store's intelligence, with an aggregated view of searches and of offer gaps in the local market.", pt: "Toda a inteligência da loja, com visão agregada das buscas e das lacunas de oferta do mercado local." },
    included: 10,
    highlight: false,
    icon: Building2,
  },
];
