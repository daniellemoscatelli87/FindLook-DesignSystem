import React from "react";
import { ChartColumnBig, ChartLine, ChartPie, ChartScatter, ChartSpline, MapPinned, Check, X, MessageSquareText, ChartColumn } from "lucide-react";
import { SectionHeader } from "./shared/SectionHeader";
import { VejaEm } from "./shared/VejaEm";
import { Callout, DoDont } from "./shared/Guidance";
import {
  DescobertaVisual, GraficoDeRosca, BarrasOrdenadas, MapaDeCalorPorRegiao, GraficoDeHalteres, GraficoDeLinhas,
  GraficoDeInclinacao, Mosaico, BarrasEmpilhadas100, GraficoDeBolhas, MapaDeCalorMatricial, GraficoDeRanking, Funil,
  formatarNumero, type RegiaoDoMapa,
} from "../ui/graficos";

/* Gráficos e visualizações (19/11/2026). Todos os números desta página são dados de exemplo, fictícios:
   nenhum descreve lojas, bairros ou buscas reais. */

const SELO = "Dados de exemplo";
const n = (v: number) => formatarNumero(v);
const pct = (v: number) => `${formatarNumero(v)}%`;
const reais = (v: number) => `R$ ${formatarNumero(v)}`;

/* ── Rosca: os mesmos números do exemplo do admin (Composição do comércio de moda) ── */
const COMPOSICAO = [
  { rotulo: "Loja multimarcas", valor: 31 },
  { rotulo: "Brechó", valor: 15 },
  { rotulo: "Loja de calçados", valor: 14 },
  { rotulo: "Outros formatos (5 tipos)", valor: 63, neutro: true },
];

/** Reprodução da rosca atual do admin, só para comparação (traço grosso, centro com o número de tipos, grafite como série). */
function RoscaAntiga() {
  const partes = [
    { rotulo: "Loja multimarcas", valor: 31, cor: "var(--pink-500)" },
    { rotulo: "Brechó", valor: 15, cor: "var(--graphite-700)" },
    { rotulo: "Loja de calçados", valor: 14, cor: "var(--pink-200)" },
    { rotulo: "Outros formatos", valor: 63, cor: "var(--graphite-400)" },
  ];
  const total = partes.reduce((s, p) => s + p.valor, 0);
  const r = 42, c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="flex flex-wrap items-center gap-5">
      <svg viewBox="0 0 120 120" className="h-36 w-36 shrink-0 -rotate-90" role="img" aria-label="Versão anterior da rosca, para comparação">
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--muted)" strokeWidth="16" />
        {partes.map(p => {
          const tam = (p.valor / total) * c;
          const ini = acc;
          acc += tam;
          return <circle key={p.rotulo} cx="60" cy="60" r={r} fill="none" stroke={p.cor} strokeWidth="16" strokeDasharray={`${Math.max(0, tam - 2)} ${c}`} strokeDashoffset={-ini} />;
        })}
        <g className="rotate-90" style={{ transformOrigin: "60px 60px" }}>
          <text x="60" y="58" textAnchor="middle" className="fill-foreground text-[22px] font-bold">8</text>
          <text x="60" y="74" textAnchor="middle" className="fill-muted-foreground text-[9px]">tipos de loja</text>
        </g>
      </svg>
      <ul className="m-0 min-w-[10rem] flex-1 list-none space-y-2 p-0 text-[0.875rem]">
        {partes.map(p => (
          <li key={p.rotulo} className="flex items-start gap-2.5">
            <span aria-hidden className="mt-1 h-3 w-3 shrink-0 rounded-full" style={{ background: p.cor }} />
            <span className="min-w-0 flex-1 leading-snug text-foreground">{p.rotulo}</span>
            <span className="shrink-0 font-semibold tabular-nums text-foreground">{Math.round((p.valor / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Dados de exemplo dos 10 gráficos recomendados ── */
const BUSCAS = [
  { rotulo: "Vestido midi", valor: 1240 },
  { rotulo: "Calça jeans wide leg", valor: 980 },
  { rotulo: "Blazer de alfaiataria", valor: 860 },
  { rotulo: "Tênis branco", valor: 720 },
  { rotulo: "Camisa de linho", valor: 540 },
  { rotulo: "Saia plissada", valor: 410 },
  { rotulo: "Jaqueta jeans", valor: 350 },
];

const REGIOES: RegiaoDoMapa[] = [
  { id: "no", rotulo: "Noroeste", valor: 410, coluna: 1, linha: 1 },
  { id: "n", rotulo: "Norte", valor: 620, coluna: 2, linha: 1 },
  { id: "ne", rotulo: "Nordeste", valor: 540, coluna: 3, linha: 1 },
  { id: "o", rotulo: "Oeste", valor: 380, coluna: 1, linha: 2 },
  { id: "c", rotulo: "Centro", valor: 890, coluna: 2, linha: 2 },
  { id: "l", rotulo: "Leste", valor: 1180, coluna: 3, linha: 2 },
  { id: "so", rotulo: "Sudoeste", valor: 260, coluna: 1, linha: 3 },
  { id: "s", rotulo: "Sul", valor: 320, coluna: 2, linha: 3 },
  { id: "se", rotulo: "Sudeste", valor: 700, coluna: 3, linha: 3 },
];

const OFERTA_PROCURA = [
  { rotulo: "Vestidos", a: 18, b: 28 },
  { rotulo: "Alfaiataria", a: 8, b: 17 },
  { rotulo: "Calças", a: 24, b: 22 },
  { rotulo: "Tênis e calçados", a: 15, b: 14 },
  { rotulo: "Camisas", a: 20, b: 10 },
];

const SEMANAS = ["Sem. 1", "Sem. 2", "Sem. 3", "Sem. 4", "Sem. 5", "Sem. 6", "Sem. 7", "Sem. 8"];
const TENDENCIA = [
  { rotulo: "Alfaiataria", valores: [120, 135, 150, 170, 190, 215, 240, 262], destaque: true },
  { rotulo: "Jeans", valores: [300, 310, 295, 305, 298, 312, 300, 306] },
  { rotulo: "Vestidos", valores: [260, 250, 255, 240, 236, 230, 228, 224] },
];

const ESTILOS = [
  { rotulo: "Couro", inicio: 70, fim: 118 },
  { rotulo: "Linho", inicio: 90, fim: 150 },
  { rotulo: "Alfaiataria", inicio: 180, fim: 262 },
  { rotulo: "Jeans", inicio: 300, fim: 306 },
  { rotulo: "Vestido midi", inicio: 250, fim: 224 },
  { rotulo: "Moletom", inicio: 210, fim: 140 },
];

const CATEGORIAS = [
  { rotulo: "Vestidos", valor: 28 },
  { rotulo: "Calças", valor: 22 },
  { rotulo: "Camisas", valor: 14 },
  { rotulo: "Tênis e calçados", valor: 12 },
  { rotulo: "Alfaiataria", valor: 9 },
  { rotulo: "Acessórios", valor: 8 },
  { rotulo: "Outras", valor: 7, neutro: true },
];

const CAT_REGIOES = {
  categorias: [{ rotulo: "Vestidos" }, { rotulo: "Calças" }, { rotulo: "Camisas" }, { rotulo: "Outras", neutro: true }],
  linhas: [
    { rotulo: "Região Norte", valores: [34, 20, 16, 30] },
    { rotulo: "Centro", valores: [24, 36, 14, 26] },
    { rotulo: "Região Sul", valores: [30, 22, 18, 30] },
  ],
};

const BOLHAS = [
  { rotulo: "Blazer", x: 280, y: 180, tamanho: 6, destaque: true },
  { rotulo: "Vestido midi", x: 190, y: 240, tamanho: 18 },
  { rotulo: "Calça jeans", x: 160, y: 205, tamanho: 25 },
  { rotulo: "Camisa de linho", x: 150, y: 115, tamanho: 9 },
  { rotulo: "Tênis branco", x: 330, y: 150, tamanho: 14 },
  { rotulo: "Jaqueta de couro", x: 420, y: 90, tamanho: 4 },
];

const MATRIZ = {
  linhas: ["Vestidos", "Calças", "Alfaiataria", "Tênis"],
  colunas: ["Bairro A", "Bairro B", "Bairro C", "Bairro D"],
  valores: [
    [320, 280, 240, 300],
    [260, 310, 220, 250],
    [90, 110, 380, 120],
    [180, 150, 160, 210],
  ],
};

const RANKING = [
  { rotulo: "Alfaiataria", posicoes: [5, 4, 4, 3, 2, 1], destaque: true },
  { rotulo: "Calças", posicoes: [2, 2, 1, 1, 1, 2] },
  { rotulo: "Vestidos", posicoes: [1, 1, 2, 2, 3, 3] },
  { rotulo: "Tênis", posicoes: [3, 3, 3, 4, 4, 4] },
  { rotulo: "Camisas", posicoes: [4, 5, 5, 5, 5, 5] },
];

const JORNADA = [
  { rotulo: "Fizeram uma busca", valor: 4800 },
  { rotulo: "Viram a lista de peças", valor: 4100 },
  { rotulo: "Abriram uma peça", valor: 1500 },
  { rotulo: "Viram a página da loja", valor: 720 },
  { rotulo: "Entraram em contato", valor: 300 },
];

/* ── Famílias do catálogo de referência ── */
const FAMILIAS = [
  { icone: ChartColumnBig, nome: "Comparação", quando: "Comparar valores entre itens: o que é maior, o que mudou de lugar, qual a distância entre duas medidas.", tipos: ["Barras verticais e horizontais", "Agrupadas", "Empilhadas e 100%", "Lollipop", "Dumbbell (halteres)", "Slope (inclinação)"], ds: "BarrasOrdenadas, GraficoDeHalteres, GraficoDeInclinacao, BarrasEmpilhadas100" },
  { icone: ChartLine, nome: "Tempo", quando: "Mostrar como algo evolui: tendência, sazonalidade, antes e depois.", tipos: ["Linhas", "Múltiplas linhas", "Área e área empilhada", "Streamgraph", "Linha do tempo", "Calendário de calor", "Candlestick"], ds: "GraficoDeLinhas, GraficoDeRanking" },
  { icone: ChartPie, nome: "Composição", quando: "Mostrar as partes de um todo: participação, etapas que se reduzem, contribuição de cada parte.", tipos: ["Pizza e rosca", "Treemap (mosaico)", "Sunburst", "Waffle", "Funil", "Pirâmide", "Waterfall"], ds: "GraficoDeRosca, Mosaico, BarrasEmpilhadas100, Funil" },
  { icone: ChartScatter, nome: "Relações", quando: "Ver como duas ou mais medidas andam juntas, ou como as coisas se conectam.", tipos: ["Dispersão", "Bolhas", "Mapa de calor", "Matriz de correlação", "Radar", "Coordenadas paralelas", "Sankey", "Rede"], ds: "GraficoDeBolhas, MapaDeCalorMatricial" },
  { icone: ChartSpline, nome: "Distribuição", quando: "Ver como os valores se espalham: onde se concentram, o que foge do padrão.", tipos: ["Histograma", "Box plot", "Violino", "Densidade"], ds: "Ainda sem componente: use barras para faixas de valor" },
  { icone: MapPinned, nome: "Geografia", quando: "Quando o lugar faz parte da resposta: onde há mais procura, onde há menos lojas.", tipos: ["Coroplético", "Pontos", "Bolhas no mapa", "Calor geográfico"], ds: "MapaDeCalorPorRegiao (esquemático)" },
];

const RECOMENDACOES: React.ReactNode[][] = [
  ["O que os consumidores mais procuram?", "Barras horizontais ordenadas", "BarrasOrdenadas"],
  ["Em que bairros há oportunidades?", "Mapa de calor geográfico", "MapaDeCalorPorRegiao"],
  ["A oferta acompanha a procura?", "Dumbbell (halteres)", "GraficoDeHalteres"],
  ["Como as buscas evoluem?", "Linhas ou área", "GraficoDeLinhas"],
  ["Que estilos estão crescendo?", "Slope (inclinação)", "GraficoDeInclinacao"],
  ["Qual a participação de cada categoria?", "Treemap ou barras 100%", "Mosaico, BarrasEmpilhadas100"],
  ["Como preço, interesse e concorrência se relacionam?", "Bolhas", "GraficoDeBolhas"],
  ["Como os bairros se comparam?", "Mapa de calor em matriz", "MapaDeCalorMatricial"],
  ["Quem subiu ou caiu de posição?", "Bump chart", "GraficoDeRanking"],
  ["Onde a jornada da busca até o contato perde gente?", "Funil", "Funil"],
];

const PASSOS_CATALOGO = [
  { t: "Identifique a pergunta", d: "O que a pessoa precisa saber para decidir?" },
  { t: "Escolha a família visual", d: "Comparação, tempo, composição, relação, distribuição ou geografia." },
  { t: "Priorize a leitura rápida", d: "A descoberta precisa aparecer em poucos segundos." },
  { t: "Detalhe só quando ajuda", d: "Números exatos e método ficam em \"Ver dados\"." },
];

const PASSOS_INTELIGENCIA = [
  { n: "01", t: "Conclusão em linguagem natural", d: "Comece pelo que foi descoberto, em termos claros. O título diz a descoberta; o gráfico vem para mostrar." },
  { n: "02", t: "Visualização adequada", d: "Mapa, tendência, comparação ou distribuição, conforme a pergunta. Um gráfico por ideia." },
  { n: "03", t: "Explicação da oportunidade", d: "Por que isso importa para o lojista, com o contexto: comparado com o quê e em qual período." },
  { n: "04", t: "Ação recomendada", d: "Um próximo passo concreto, ao alcance da pessoa, sem prometer resultado." },
];

const TOKENS_COR = [
  { token: "--chart-1", passo: "pink-500", uso: "Destaque: a série principal (é a primária)" },
  { token: "--chart-2", passo: "pink-700", uso: "Segunda série; topo da escala de calor" },
  { token: "--chart-3", passo: "pink-400", uso: "Terceira série (sem texto por cima)" },
  { token: "--chart-4", passo: "pink-300", uso: "Quarta série; itens fora do destaque" },
  { token: "--chart-5", passo: "pink-200", uso: "Quinta série; começo da escala de calor" },
  { token: "--chart-neutral", passo: "graphite-300", uso: "Sem destaque: \"Outros\", contexto, desativado" },
  { token: "--chart-grid", passo: "graphite-100", uso: "Linhas de grade" },
];

/** Tabela que vira lista no celular (card nunca rola na horizontal). */
function TabelaQueQuebra({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="hidden grid-cols-[1.2fr_1fr_1.3fr] gap-4 border-b border-border bg-muted/50 px-4 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground md:grid">
        {head.map(h => <span key={h}>{h}</span>)}
      </div>
      <ul className="m-0 list-none p-0">
        {rows.map((r, i) => (
          <li key={i} className="grid grid-cols-1 gap-1 border-b border-border px-4 py-3 text-[0.8125rem] last:border-0 md:grid-cols-[1.2fr_1fr_1.3fr] md:gap-4">
            {r.map((c, j) => (
              <span key={j} className={j === 0 ? "font-semibold text-foreground" : "text-muted-foreground [overflow-wrap:anywhere]"}>
                <span className="mr-1 font-medium text-foreground md:hidden">{j > 0 ? `${head[j]}:` : ""}</span>{c}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Cartao({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`min-w-0 rounded-lg border border-border bg-card p-5 sm:p-6 ${className}`}>{children}</div>;
}

function Rotulo({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{children}</p>;
}

export function GraficosShowcase() {
  return (
    <div className="space-y-16 pb-16">
      {/* ── COMO ESCOLHER ── */}
      <section id="graficos-escolher" className="scroll-mt-32">
        <SectionHeader
          title="Gráficos e visualizações"
          description="Gráficos para mostrar descobertas, não só números. Comece pela pergunta, escolha a família visual e deixe a descoberta legível em poucos segundos. Todos os exemplos desta página usam dados de exemplo, fictícios."
        />
        <ol className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PASSOS_CATALOGO.map((p, i) => (
            <li key={p.t} className="flex gap-3 rounded-lg border border-border bg-card p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary-muted)] text-[0.75rem] font-bold text-[var(--primary-text)]">{i + 1}</span>
              <div>
                <p className="text-[0.875rem] font-semibold text-foreground">{p.t}</p>
                <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">{p.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {FAMILIAS.map(f => (
            <Cartao key={f.nome}>
              <div className="mb-3 flex items-center gap-3">
                <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--primary-muted)] text-[var(--primary-text)]"><f.icone className="h-[18px] w-[18px]" /></span>
                <h3 className="text-[1rem] font-bold text-foreground">{f.nome}</h3>
              </div>
              <p className="text-[0.875rem] leading-relaxed text-foreground">{f.quando}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {f.tipos.map(tp => <li key={tp} className="rounded-sm border border-border px-2 py-0.5 text-[0.75rem] text-muted-foreground">{tp}</li>)}
              </ul>
              <p className="mt-3 text-[0.75rem] text-muted-foreground"><span className="font-semibold text-foreground">No DS:</span> {f.ds}</p>
            </Cartao>
          ))}
        </div>
        <div className="mt-8">
          <Rotulo>Recomendados para a FindLook</Rotulo>
          <TabelaQueQuebra head={["Pergunta", "Gráfico", "Componente"]} rows={RECOMENDACOES} />
        </div>
      </section>

      {/* ── CORES ── */}
      <section id="graficos-cores" className="scroll-mt-32">
        <SectionHeader
          title="Cores dos gráficos"
          description="Gráficos usam só a cor primária e variações tonais dela. O grafite aparece apenas no que não está em destaque (Outros, contexto, linha de base, desativado), nunca como série par da primária. Decisão da dona do produto, 19/11/2026."
        />
        <Cartao>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {TOKENS_COR.map(c => (
              <li key={c.token} className="min-w-0">
                <span aria-hidden className="mb-2 block h-14 rounded-md border border-border" style={{ background: `var(${c.token})` }} />
                <p className="font-mono text-[0.75rem] font-semibold text-foreground [overflow-wrap:anywhere]">{c.token}</p>
                <p className="text-[0.75rem] text-muted-foreground">{c.passo}</p>
                <p className="mt-1 text-[0.75rem] leading-snug text-muted-foreground">{c.uso}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-border pt-5">
            <Rotulo>Escala de calor (do menor para o maior)</Rotulo>
            <div className="flex gap-1">
              {[["--chart-5", "var(--foreground)"], ["--chart-4", "var(--foreground)"], ["--chart-1", "var(--background)"], ["--chart-2", "var(--background)"]].map(([tk, tx]) => (
                <span key={tk} className="flex h-10 flex-1 items-center justify-center rounded-sm text-[0.75rem] font-semibold" style={{ background: `var(${tk})`, color: tx }}>{tk}</span>
              ))}
            </div>
            <p className="mt-2 text-[0.75rem] text-muted-foreground">Texto escuro nos dois tons claros e texto claro nos dois escuros: todos passam de 4,5:1. O chart-3 fica fora da escala de calor porque nenhuma cor de texto atinge 4,5:1 sobre ele nos dois DS.</p>
          </div>
        </Cartao>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Cartao>
            <p className="mb-3 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground"><Check aria-hidden className="h-4 w-4 text-success" />Assim: tons da primária, Outros em grafite</p>
            <BarrasEmpilhadas100 rotulo="Exemplo correto" categorias={[{ rotulo: "Vestidos" }, { rotulo: "Calças" }, { rotulo: "Camisas" }, { rotulo: "Outras", neutro: true }]} linhas={[{ rotulo: "Peças buscadas", valores: [34, 26, 16, 24] }]} />
          </Cartao>
          <Cartao>
            <p className="mb-3 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground"><X aria-hidden className="h-4 w-4 text-error" />Não assim: grafite como série par da primária</p>
            <div aria-hidden className="flex h-3 gap-[2px] overflow-hidden rounded-sm">
              <span style={{ flex: "34 1 0", background: "var(--pink-500)" }} />
              <span style={{ flex: "26 1 0", background: "var(--graphite-700)" }} />
              <span style={{ flex: "16 1 0", background: "var(--graphite-400)" }} />
              <span style={{ flex: "24 1 0", background: "var(--graphite-200)" }} />
            </div>
            <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted-foreground">Com grafite ao lado da primária, a leitura sugere que só o rosa importa e o cinza parece desativado. Sem rótulos, a cor carrega o significado sozinha.</p>
          </Cartao>
        </div>
        <div className="mt-4">
          <DoDont
            dos={[
              "Destaque na --chart-1; outras séries em --chart-2 a --chart-5.",
              "Escreva valores e nomes junto das marcas; a legenda é só apoio.",
              "Texto sobre uma cor só nos tons que passam de 4,5:1 (escala de calor e mosaico já fazem isso).",
              "Grafite (--chart-neutral) para Outros, contexto e linha de base.",
            ]}
            donts={[
              "Usar grafite e primária como duas séries de mesmo peso.",
              "Criar cores fora da escala (verde, azul, laranja) para separar séries.",
              "Depender só da legenda para dizer o que é cada cor.",
              "Escrever texto pequeno sobre o chart-3 ou sobre o --chart-neutral escuro.",
            ]}
          />
        </div>
      </section>

      {/* ── ROSCA ── */}
      <section id="graficos-rosca" className="scroll-mt-32">
        <SectionHeader
          title="Rosca"
          description="A rosca continua, redesenhada no traço do DS: anel fino, partes em tons da primária da maior para a menor, Outros em grafite no fim, percentual escrito junto de cada parte e o total no centro. Exemplo com os mesmos números da Composição do comércio de moda do admin (dados de exemplo)."
        />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Cartao>
            <Rotulo>Antes</Rotulo>
            <h3 className="mb-4 text-[0.9375rem] font-bold text-foreground">Composição do comércio de moda</h3>
            <RoscaAntiga />
            <p className="mt-3 text-[0.75rem] text-muted-foreground">123 lojas de moda no bairro (dados de exemplo).</p>
            <ul className="mt-5 space-y-1.5 border-t border-border pt-4 text-[0.8125rem] text-muted-foreground">
              {[
                "Anel grosso, com trilho cinza por trás: pesa mais que a informação.",
                "O centro mostra 8 tipos, mas a legenda tem 4 linhas: o número não se explica.",
                "Grafite escuro como série par do rosa: o Brechó parece desativado.",
                "Outros (51%) tem a mesma força visual das partes em destaque.",
                "Percentuais só na legenda, longe das partes.",
              ].map(p => <li key={p} className="flex gap-2"><X aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-error" />{p}</li>)}
            </ul>
          </Cartao>
          <Cartao>
            <Rotulo>Depois</Rotulo>
            <h3 className="text-[0.9375rem] font-bold text-foreground">Lojas multimarcas são o formato mais comum no bairro</h3>
            <p className="mb-4 mt-1 text-[0.8125rem] text-muted-foreground">Um quarto das lojas de moda; os outros 5 tipos somam metade.</p>
            <GraficoDeRosca
              rotulo="Composição do comércio de moda no bairro (dados de exemplo)"
              partes={COMPOSICAO}
              centro={{ valor: "123", rotulo: "lojas de moda" }}
              formatarQuantidade={v => `${v} lojas`}
            />
            <ul className="mt-5 space-y-1.5 border-t border-border pt-4 text-[0.8125rem] text-muted-foreground">
              {[
                "Anel fino (10 px), sem trilho, com 2 px de respiro entre as partes.",
                "Centro com o total (quantidade de lojas); ao passar o cursor na lista, mostra a parte.",
                "Tons da primária da maior para a menor; Outros em grafite e por último.",
                "Percentual escrito junto de cada parte; a lista traz quantidade e percentual.",
                "Título diz a descoberta, em linguagem natural.",
              ].map(p => <li key={p} className="flex gap-2"><Check aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />{p}</li>)}
            </ul>
          </Cartao>
        </div>
        <div className="mt-4">
          <Callout title="Quando usar a rosca">
            <p>Para mostrar a participação de poucas partes (até 5) num todo, quando uma delas é a descoberta. Para comparar muitas partes ou várias regiões, prefira barras 100% ou o mosaico. Proporção não é quantidade: diga fatia, parte ou participação.</p>
          </Callout>
        </div>
      </section>

      {/* ── 10 RECOMENDADOS ── */}
      <section id="graficos-recomendados" className="scroll-mt-32">
        <SectionHeader
          title="Gráficos recomendados"
          description="Os 10 gráficos recomendados para a inteligência da FindLook, cada um dentro do card de descoberta: conclusão, gráfico, por que importa e próximo passo. Textos, lojas, bairros e números são dados de exemplo."
        />
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div id="graficos-barras" className="min-w-0 scroll-mt-32">
            <DescobertaVisual
              tema="O que mais procuram" selo={SELO}
              conclusao="Vestido midi lidera as buscas da região"
              contexto="Peças mais buscadas nas últimas 4 semanas, na região da loja."
              porQueImporta="As três primeiras somam quase metade das buscas da lista: é o que as pessoas por perto já estão procurando."
              acao="Confira se essas peças estão cadastradas com fotos, tamanhos e preço."
              dados={{ colunas: ["Peça", "Buscas"], linhas: BUSCAS.map(b => [b.rotulo, n(b.valor)]) }}
            >
              <BarrasOrdenadas rotulo="Peças mais buscadas (dados de exemplo)" itens={BUSCAS} destaques={3} />
            </DescobertaVisual>
          </div>

          <div id="graficos-mapa" className="min-w-0 scroll-mt-32">
            <DescobertaVisual
              tema="Onde procuram" selo={SELO}
              conclusao="A região Leste concentra mais buscas por moda"
              contexto="Buscas por peças de moda nas últimas 4 semanas, por região da cidade."
              porQueImporta="Saber onde as pessoas procuram ajuda a decidir onde divulgar a loja e quais peças destacar."
              acao="Compare o que é buscado na região Leste com as peças que sua loja já mostra."
              dados={{ colunas: ["Região", "Buscas"], linhas: [...REGIOES].sort((a, b) => b.valor - a.valor).map(r => [r.rotulo, n(r.valor)]) }}
            >
              <MapaDeCalorPorRegiao rotulo="Buscas por região (dados de exemplo)" regioes={REGIOES} colunas={3} linhas={3} destaque="l" />
            </DescobertaVisual>
          </div>

          <div id="graficos-halteres" className="min-w-0 scroll-mt-32">
            <DescobertaVisual
              tema="Oferta e procura" selo={SELO}
              conclusao="Alfaiataria aparece mais nas buscas do que nas vitrines"
              contexto="Fatia de cada categoria nas buscas e nas peças cadastradas, últimas 4 semanas."
              porQueImporta="Quando a fatia nas buscas é maior que a fatia nas peças, quem procura encontra menos opções."
              acao="Veja se há peças de alfaiataria em estoque que ainda não foram cadastradas."
              dados={{ colunas: ["Categoria", "Peças", "Buscas"], linhas: OFERTA_PROCURA.map(o => [o.rotulo, pct(o.a), pct(o.b)]) }}
            >
              <GraficoDeHalteres rotulo="Fatia nas peças e nas buscas (dados de exemplo)" itens={OFERTA_PROCURA} series={["Fatia nas peças", "Fatia nas buscas"]} formatar={pct}
                formatarDiferenca={d => (d === 0 ? "igual" : `${Math.abs(d)} ${Math.abs(d) === 1 ? "ponto" : "pontos"} ${d > 0 ? "a mais nas buscas" : "a menos"}`)} />
            </DescobertaVisual>
          </div>

          <div id="graficos-linhas" className="min-w-0 scroll-mt-32">
            <DescobertaVisual
              tema="Tendências" selo={SELO}
              conclusao="As buscas por alfaiataria crescem há sete semanas"
              contexto="Buscas por semana nas últimas 8 semanas, em comparação com jeans e vestidos."
              porQueImporta="Uma subida contínua é mais confiável que um pico de uma semana só."
              acao="Acompanhe por mais duas semanas antes de decidir uma compra maior."
              dados={{ colunas: ["Semana", ...TENDENCIA.map(s => s.rotulo)], linhas: SEMANAS.map((s, i) => [s, ...TENDENCIA.map(x => n(x.valores[i]!))]) }}
            >
              <GraficoDeLinhas rotulo="Buscas por semana (dados de exemplo)" series={TENDENCIA} rotulosX={SEMANAS} area />
            </DescobertaVisual>
          </div>

          <div id="graficos-inclinacao" className="min-w-0 scroll-mt-32">
            <DescobertaVisual
              tema="Estilos" selo={SELO}
              conclusao="Couro e linho são os estilos que mais cresceram"
              contexto="Buscas por estilo há 3 meses e agora, na região da loja."
              porQueImporta="Os dois partem de uma base pequena: cresceram em proporção, mas ainda têm menos buscas que jeans."
              acao="Teste destacar peças de couro e linho na vitrine da loja na FindLook."
              dados={{ colunas: ["Estilo", "Há 3 meses", "Agora"], linhas: ESTILOS.map(e => [e.rotulo, n(e.inicio), n(e.fim)]) }}
            >
              <GraficoDeInclinacao rotulo="Buscas por estilo, antes e agora (dados de exemplo)" itens={ESTILOS} periodos={["Há 3 meses", "Agora"]} destaques={["Couro", "Linho"]} />
            </DescobertaVisual>
          </div>

          <div id="graficos-participacao" className="min-w-0 scroll-mt-32">
            <DescobertaVisual
              tema="Participação" selo={SELO}
              conclusao="Vestidos e calças são metade das peças buscadas"
              contexto="Fatia de cada categoria no total de buscas das últimas 4 semanas."
              porQueImporta="Mostra onde está o grosso da procura; categorias pequenas não somem, aparecem em blocos menores."
              acao="Use essa divisão para conferir se o catálogo da loja acompanha a procura."
              dados={{ colunas: ["Categoria", "Fatia"], linhas: CATEGORIAS.map(c => [c.rotulo, pct(c.valor)]) }}
            >
              <Mosaico rotulo="Fatia das categorias nas buscas (dados de exemplo)" itens={CATEGORIAS} altura={240} />
            </DescobertaVisual>
          </div>

          <div className="min-w-0">
            <DescobertaVisual
              tema="Participação por região" selo={SELO}
              conclusao="No Centro, calças têm uma fatia maior que nas outras regiões"
              contexto="Fatia de cada categoria nas buscas de cada região, últimas 4 semanas."
              porQueImporta="Barras 100% comparam proporções entre lugares com totais diferentes."
              acao="Lojas no Centro podem conferir se as calças estão bem representadas no catálogo."
              dados={{ colunas: ["Região", ...CAT_REGIOES.categorias.map(c => c.rotulo)], linhas: CAT_REGIOES.linhas.map(l => [l.rotulo, ...l.valores.map(pct)]) }}
            >
              <BarrasEmpilhadas100 rotulo="Fatia das categorias por região (dados de exemplo)" categorias={CAT_REGIOES.categorias} linhas={CAT_REGIOES.linhas} />
            </DescobertaVisual>
          </div>

          <div id="graficos-bolhas" className="min-w-0 scroll-mt-32">
            <DescobertaVisual
              tema="Preço, interesse e concorrência" selo={SELO}
              conclusao="O blazer tem bastante interesse e poucas lojas oferecendo"
              contexto="Preço médio, buscas por semana e número de lojas que oferecem cada peça."
              porQueImporta="Interesse alto com poucas lojas significa menos opções para quem procura. Não indica, sozinho, que vai vender."
              acao="Se a loja trabalha com blazer, confira se ele aparece nas buscas com foto e preço."
              dados={{ colunas: ["Peça", "Preço médio", "Buscas/semana", "Lojas"], linhas: BOLHAS.map(b => [b.rotulo, reais(b.x), n(b.y), n(b.tamanho)]) }}
            >
              <GraficoDeBolhas rotulo="Preço, interesse e concorrência (dados de exemplo)" itens={BOLHAS}
                eixoX={{ rotulo: "Preço médio", formatar: reais }} eixoY={{ rotulo: "Buscas por semana" }} rotuloTamanho="Tamanho do círculo: lojas que oferecem a peça" />
            </DescobertaVisual>
          </div>

          <div id="graficos-matriz" className="min-w-0 scroll-mt-32">
            <DescobertaVisual
              tema="Comparação entre bairros" selo={SELO}
              conclusao="Alfaiataria se destaca no Bairro C"
              contexto="Buscas por categoria em quatro bairros, últimas 4 semanas."
              porQueImporta="Nos outros bairros, alfaiataria é a categoria com menos buscas; no Bairro C, é a com mais."
              acao="Lojas do Bairro C podem destacar alfaiataria; nos outros, vestidos e calças."
              dados={{ colunas: ["Categoria", ...MATRIZ.colunas], linhas: MATRIZ.linhas.map((l, i) => [l, ...MATRIZ.valores[i]!.map(n)]) }}
            >
              <MapaDeCalorMatricial rotulo="Buscas por categoria e bairro (dados de exemplo)" {...MATRIZ} rotuloLinhas="Categoria" destaque={[2, 2]} />
            </DescobertaVisual>
          </div>

          <div id="graficos-ranking" className="min-w-0 scroll-mt-32">
            <DescobertaVisual
              tema="Mudanças de posição" selo={SELO}
              conclusao="Alfaiataria subiu do 5º para o 1º lugar nas buscas"
              contexto="Posição de cada categoria nas buscas, semana a semana, nas últimas 6 semanas."
              porQueImporta="A posição mostra o que passou a ser mais procurado, mesmo quando o total de buscas muda."
              acao="Revise as peças de alfaiataria da loja: fotos, tamanhos e preço."
              dados={{ colunas: ["Categoria", "Sem. 1", "Sem. 6"], linhas: RANKING.map(r => [r.rotulo, `${r.posicoes[0]}º`, `${r.posicoes[5]}º`]) }}
            >
              <GraficoDeRanking rotulo="Posição das categorias nas buscas (dados de exemplo)" series={RANKING} periodos={["Sem. 1", "Sem. 2", "Sem. 3", "Sem. 4", "Sem. 5", "Sem. 6"]} />
            </DescobertaVisual>
          </div>

          <div id="graficos-funil" className="min-w-0 scroll-mt-32">
            <DescobertaVisual
              tema="Da busca ao contato" selo={SELO}
              conclusao="A maior perda está entre ver a lista e abrir uma peça"
              contexto="Pessoas em cada etapa nas últimas 4 semanas, da busca ao contato com a loja."
              porQueImporta="Quem não abre a peça não chega à loja: é a etapa que mais pesa no caminho."
              acao="Revise a primeira foto e o preço das peças que aparecem na lista."
              dados={{ colunas: ["Etapa", "Pessoas"], linhas: JORNADA.map(j => [j.rotulo, n(j.valor)]) }}
            >
              <Funil rotulo="Jornada da busca até o contato (dados de exemplo)" etapas={JORNADA} />
            </DescobertaVisual>
          </div>
        </div>
      </section>

      {/* ── DESIGN DE INTELIGÊNCIA ── */}
      <section id="graficos-inteligencia" className="scroll-mt-32">
        <SectionHeader
          title="Design de inteligência, não apenas um dashboard"
          description="Cada gráfico responde a uma pergunta e chega junto com a conclusão. A IA apresenta descobertas em linguagem natural e destaca o que mudou; estatísticas técnicas ficam numa camada secundária, em Ver dados."
        />
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {PASSOS_INTELIGENCIA.map(p => (
            <li key={p.n} className="rounded-lg border border-border bg-card p-4">
              <span className="text-[1.25rem] font-bold tabular-nums text-[var(--primary-text)]">{p.n}</span>
              <p className="mt-1 text-[0.9375rem] font-semibold text-foreground">{p.t}</p>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">{p.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="min-w-0">
            <Rotulo>Os quatro passos no card (dados de exemplo)</Rotulo>
            <DescobertaVisual
              numerar tema="O que mais procuram" selo={SELO}
              conclusao="Vestido midi lidera as buscas da região"
              contexto="Peças mais buscadas nas últimas 4 semanas."
              porQueImporta="É o que as pessoas por perto já estão procurando."
              acao="Confira se essas peças estão cadastradas com fotos e tamanhos."
              dados={{ colunas: ["Peça", "Buscas"], linhas: BUSCAS.slice(0, 4).map(b => [b.rotulo, n(b.valor)]) }}
            >
              <BarrasOrdenadas rotulo="Peças mais buscadas (dados de exemplo)" itens={BUSCAS.slice(0, 4)} destaques={1} />
            </DescobertaVisual>
          </div>
          <div className="min-w-0 space-y-4">
            <Cartao>
              <p className="mb-2 flex items-center gap-2 text-[0.9375rem] font-semibold text-foreground"><MessageSquareText aria-hidden className="h-4 w-4 text-[var(--primary-text)]" />Princípio editorial</p>
              <ul className="space-y-2 text-[0.875rem] leading-relaxed text-foreground">
                <li>A IA apresenta descobertas em linguagem natural, como uma pessoa que entende do mercado diria.</li>
                <li>Destaque o que mudou: subiu, caiu, passou à frente, ficou acima da cidade.</li>
                <li>Estatística técnica (amostra, desvio, correlação, método) fica no detalhamento, nunca no título.</li>
                <li>Hipótese tem cara de hipótese: "pode indicar", e nunca uma causa que o dado não mostra.</li>
              </ul>
            </Cartao>
            <Cartao>
              <p className="mb-2 flex items-center gap-2 text-[0.9375rem] font-semibold text-foreground"><ChartColumn aria-hidden className="h-4 w-4 text-[var(--primary-text)]" />Título de gráfico</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="rounded-md bg-muted/60 p-3">
                  <p className="mb-1 flex items-center gap-1 text-[0.75rem] font-semibold text-muted-foreground"><X aria-hidden className="h-3.5 w-3.5 text-error" />Evitar</p>
                  <p className="text-[0.875rem] text-foreground">Distribuição percentual de buscas por categoria (n = 4.812)</p>
                </div>
                <div className="rounded-md bg-[var(--success-muted)] p-3">
                  <p className="mb-1 flex items-center gap-1 text-[0.75rem] font-semibold text-foreground"><Check aria-hidden className="h-3.5 w-3.5 text-success" />Preferir</p>
                  <p className="text-[0.875rem] text-foreground">Vestidos e calças são metade das peças buscadas</p>
                </div>
              </div>
            </Cartao>
          </div>
        </div>
        <div className="mt-4">
          <VejaEm
            secao="voice" ancora="voice-inteligencia"
            titulo="Como escrever a conclusão, o contexto e o próximo passo"
            texto="As regras de escrita das descobertas ficam em Tom de voz › Uma conversa, não um relatório."
            rotuloBotao="Ver em Tom de voz"
          />
        </div>
      </section>

      {/* ── COMPONENTES ── */}
      <section id="graficos-componentes" className="scroll-mt-32">
        <SectionHeader title="Componentes e props" description="Todos em ui/graficos.tsx. São de apresentação: recebem os dados prontos por props e não buscam nada. Cada um aceita rotulo (nome acessível), formatar (como escrever os valores) e className." />
        <TabelaQueQuebra
          head={["Componente", "Para quê", "Props principais"]}
          rows={[
            ["DescobertaVisual", "Card com os 4 passos e Ver dados", "tema, conclusao, contexto, porQueImporta, acao, dados, selo, numerar"],
            ["GraficoDeRosca", "Participação de até 5 partes", "partes (rotulo, valor, neutro), centro, formatarQuantidade, tamanho"],
            ["BarrasOrdenadas", "Ranking de valores", "itens, destaques, ordenar, posicao"],
            ["MapaDeCalorPorRegiao", "Calor por região (esquemático)", "regioes (id, rotulo, valor, coluna, linha), colunas, linhas, destaque"],
            ["GraficoDeHalteres", "Duas medidas por item", "itens (rotulo, a, b), series, maximo, formatarDiferenca"],
            ["GraficoDeLinhas", "Tendência no tempo", "series (rotulo, valores, destaque), rotulosX, area, altura, zero"],
            ["GraficoDeInclinacao", "Antes e depois", "itens (rotulo, inicio, fim), periodos, destaques"],
            ["Mosaico", "Participação de muitas partes", "itens (rotulo, valor, neutro), altura"],
            ["BarrasEmpilhadas100", "Proporções entre grupos", "categorias, linhas (rotulo, valores), minimoParaRotulo"],
            ["GraficoDeBolhas", "Três medidas ao mesmo tempo", "itens (rotulo, x, y, tamanho, destaque), eixoX, eixoY, rotuloTamanho"],
            ["MapaDeCalorMatricial", "Comparar linhas e colunas", "linhas, colunas, valores, rotuloLinhas, destaque"],
            ["GraficoDeRanking", "Mudança de posição", "series (rotulo, posicoes, destaque), periodos"],
            ["Funil", "Etapas que se reduzem", "etapas (rotulo, valor), destacarMaiorPerda"],
          ].map(l => [<code key="c" className="font-mono text-[0.8125rem]">{l[0]}</code>, l[1], l[2]])}
        />
        <div className="mt-4">
          <Callout title="Mapa de calor geográfico">
            <p>O DS não traz contornos de bairros. O MapaDeCalorPorRegiao desenha um mapa esquemático: cada região é um bloco numa grade, na posição aproximada que o produto informar (coluna, linha e tamanho). A nota "sem escala" aparece sempre. Para um mapa com contornos reais, o produto passa os próprios dados geográficos; o DS não busca nada.</p>
          </Callout>
        </div>
      </section>

      {/* ── ACESSIBILIDADE ── */}
      <section id="graficos-acessibilidade" className="scroll-mt-32">
        <SectionHeader title="Acessibilidade" description="O gráfico precisa ser entendido sem a cor, sem o mouse e sem enxergar a tela." />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Callout title="Checklist">
            <ul className="list-disc space-y-1 pl-5">
              <li>Todo gráfico tem título com a conclusão e um nome acessível (role="img" com aria-label que resume os dados). O mapa de calor em matriz é uma tabela de verdade.</li>
              <li>Ver dados abre uma tabela com os números: é o detalhamento e a alternativa para leitores de tela.</li>
              <li>Valores e nomes escritos junto das marcas; a legenda é apoio, nunca a única forma de leitura.</li>
              <li>Destaque também pela espessura, pelo peso do texto ou por um contorno, não só pela cor.</li>
              <li>Texto sobre cor só em tons com 4,5:1 ou mais; os demais rótulos ficam fora das marcas.</li>
            </ul>
          </Callout>
          <Callout title="Movimento e tamanho">
            <ul className="list-disc space-y-1 pl-5">
              <li>Entradas curtas (até 0,9 s) e uma vez só; com "menos movimento", nada anima.</li>
              <li>Os gráficos medem a largura do card e se redesenham: o texto não encolhe no celular e nada rola na horizontal.</li>
              <li>Texto de eixo com 11 px no mínimo; valores com 12 px.</li>
              <li>Realce ao passar o cursor é extra: a mesma informação está escrita no gráfico ou na tabela.</li>
            </ul>
          </Callout>
        </div>
      </section>
    </div>
  );
}
