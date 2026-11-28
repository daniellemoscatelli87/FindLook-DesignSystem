import React from "react";
import { ChartColumnBig, ChartLine, ChartPie, ChartScatter, ChartSpline, MapPinned, Check, X, MessageSquareText, ChartColumn, ChevronDown, AlertCircle } from "lucide-react";
import { SectionHeader } from "./shared/SectionHeader";
import { VejaEm } from "./shared/VejaEm";
import { Callout, DoDont } from "./shared/Guidance";
import {
  DescobertaVisual, GraficoDeRosca, BarrasOrdenadas, MapaDeCalorPorRegiao, GraficoDeHalteres, GraficoDeLinhas,
  GraficoDeInclinacao, Mosaico, BarrasEmpilhadas100, GraficoDeBolhas, MapaDeCalorMatricial, GraficoDeRanking, Funil,
  formatarNumero, TabelaDeDados, TONS_DA_ESCALA, type RegiaoDoMapa, type DadosDaTabela,
} from "../ui/graficos-inteligencia";
import {
  BarrasAgrupadas, BarrasEmpilhadas, Pirulito, AreaEmpilhada, Streamgraph, LinhaDoTempo, CalendarioDeCalor, GraficoDeVelas,
  Pizza, Waffle, Piramide, Dispersao, MatrizDeCorrelacao, Radar, CoordenadasParalelas, Sankey, RedeDeConexoes,
  Histograma, BoxPlot, Violino, Densidade, MapaDePontos, MapaDeBolhas, resumoDaDistribuicao,
} from "../ui/graficos-catalogo";
import { TabelaAdaptavel, type ColunaDaTabela } from "../ui/tabela-adaptavel";
import { GradeDeCards } from "../ui/grade-de-cards";
import { SecaoBarrasEFunil } from "./shared/LacunasDocs";

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
          <text x="60" y="58" textAnchor="middle" className="fill-foreground text-h3 font-bold">8</text>
          <text x="60" y="74" textAnchor="middle" className="fill-muted-foreground text-caption">tipos de loja</text>
        </g>
      </svg>
      <ul className="m-0 min-w-[10rem] flex-1 list-none space-y-2 p-0 text-body-sm">
        {partes.map(p => (
          <li key={p.rotulo} className="flex items-start gap-2">
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
  { icone: ChartColumnBig, nome: "Comparação", quando: "Comparar valores entre itens: o que é maior, o que mudou de lugar, qual a distância entre duas medidas.", tipos: ["Barras verticais e horizontais", "Agrupadas", "Empilhadas e 100%", "Lollipop", "Dumbbell (halteres)", "Slope (inclinação)"], ds: "BarrasOrdenadas, GraficoDeHalteres, GraficoDeInclinacao, BarrasEmpilhadas100; no catálogo: BarrasAgrupadas, BarrasEmpilhadas, Pirulito" },
  { icone: ChartLine, nome: "Tempo", quando: "Mostrar como algo evolui: tendência, sazonalidade, antes e depois.", tipos: ["Linhas", "Múltiplas linhas", "Área e área empilhada", "Streamgraph", "Linha do tempo", "Calendário de calor", "Candlestick"], ds: "GraficoDeLinhas, GraficoDeRanking; no catálogo: AreaEmpilhada, Streamgraph, LinhaDoTempo, CalendarioDeCalor, GraficoDeVelas" },
  { icone: ChartPie, nome: "Composição", quando: "Mostrar as partes de um todo: participação, etapas que se reduzem, contribuição de cada parte.", tipos: ["Pizza e rosca", "Treemap (mosaico)", "Waffle", "Funil", "Pirâmide"], ds: "GraficoDeRosca, Mosaico, BarrasEmpilhadas100, Funil; no catálogo: Pizza, Waffle, Piramide" },
  { icone: ChartScatter, nome: "Relações", quando: "Ver como duas ou mais medidas andam juntas, ou como as coisas se conectam.", tipos: ["Dispersão", "Bolhas", "Mapa de calor", "Matriz de correlação", "Radar", "Coordenadas paralelas", "Sankey", "Rede"], ds: "GraficoDeBolhas, MapaDeCalorMatricial; no catálogo: Dispersao, MatrizDeCorrelacao, Radar, CoordenadasParalelas, Sankey, RedeDeConexoes" },
  { icone: ChartSpline, nome: "Distribuição", quando: "Ver como os valores se espalham: onde se concentram, o que foge do padrão.", tipos: ["Histograma", "Box plot", "Violino", "Densidade"], ds: "No catálogo: Histograma, BoxPlot, Violino, Densidade" },
  { icone: MapPinned, nome: "Geografia", quando: "Quando o lugar faz parte da resposta: onde há mais procura, onde há menos lojas.", tipos: ["Coroplético", "Pontos", "Bolhas no mapa", "Calor geográfico"], ds: "MapaDeCalorPorRegiao (esquemático); no catálogo: MapaDePontos, MapaDeBolhas (esquemáticos)" },
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

/** Paleta da FindLook (decisão da dona do produto, 21/11/2026), em ordem de importância. */
const PALETA = ["#FC0256", "#FF6F95", "#F9B5BF", "#E2919E", "#C29AA0", "#D4D4D4", "#EBEBEB"];

const FAIXAS_DA_PALETA = [
  { tons: [1, 2], nome: "Destaque", d: "O dado principal ou o ponto de atenção." },
  { tons: [3, 4, 5], nome: "Apoio e transição", d: "Séries de apoio, na ordem de importância." },
  { tons: [6, 7], nome: "Contexto", d: "Referências, histórico, metas, comparações secundárias e Outros." },
];

const REGRAS_DE_COR = [
  { t: "1 gráfico = 1 foco", d: "Use o tom 1, forte, para o dado principal ou o ponto de atenção." },
  { t: "Importância em ordem", d: "Ordene as séries da mais importante (pink) para a mais contextual (cinza)." },
  { t: "Contexto em cinza", d: "Benchmarks, histórico, metas e comparações secundárias usam os tons finais (6 e 7)." },
  { t: "Evite excesso de destaque", d: "Nunca use mais de 2 tons intensos (1 e 2) no mesmo gráfico." },
  { t: "Escalas contínuas", d: "Mapas de calor, degradês e intensidades começam no cinza e vão ao pink conforme o valor aumenta." },
];

const EX_BARRAS = [
  { rotulo: "A", valor: 82 }, { rotulo: "B", valor: 64 }, { rotulo: "C", valor: 51 }, { rotulo: "D", valor: 38 }, { rotulo: "E", valor: 24 },
];
const EX_MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
const EX_LINHAS = [
  { rotulo: "Principal", valores: [42, 48, 55, 61, 70, 78], destaque: true },
  { rotulo: "Secundária", valores: [36, 38, 41, 40, 44, 47], tom: 2 },
  { rotulo: "Benchmark", valores: [50, 50, 50, 50, 50, 50], neutro: true, tom: 6 },
];
const EX_ROSCA = [
  { rotulo: "Principal", valor: 140 },
  { rotulo: "Apoio", valor: 50 },
  { rotulo: "Secundária", valor: 35 },
  { rotulo: "Contexto", valor: 25, neutro: true },
];
const EX_ESCALA = {
  linhas: ["Manhã", "Tarde", "Noite"],
  colunas: ["Seg", "Ter", "Qua", "Qui", "Sex"],
  valores: [[12, 18, 22, 30, 41], [20, 26, 35, 44, 58], [8, 14, 19, 27, 36]],
};

/** Área "Cores dos gráficos": paleta de 7 tons, faixas, as 5 regras e exemplos aplicados com os componentes reais. */
function SecaoCores() {
  return (
    <section id="graficos-cores" className="scroll-mt-32">
      <SectionHeader
        title="Cores dos gráficos"
        description="Paleta da FindLook: 7 tons em ordem de importância, do pink da marca ao cinza, os mesmos no tema claro e no escuro. Quanto mais à esquerda, mais ênfase visual; quanto mais à direita, mais neutro e contextual. Decisão da dona do produto, 21/11/2026."
      />
      <Cartao>
        <Rotulo>Paleta em ordem de importância</Rotulo>
        <ol className="m-0 grid list-none grid-cols-4 gap-x-2 gap-y-4 p-0 sm:grid-cols-7">
          {PALETA.map((hex, i) => (
            <li key={hex} className="min-w-0">
              <span aria-hidden className="block h-14 rounded-md border border-border" style={{ background: `var(--chart-${i + 1})` }} />
              <p className="mt-1 text-body-sm font-bold tabular-nums text-foreground">{i + 1}</p>
              <p className="font-mono text-caption text-muted-foreground [overflow-wrap:anywhere]">{hex}</p>
              <p className="font-mono text-caption text-muted-foreground [overflow-wrap:anywhere]">--chart-{i + 1}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-label font-semibold text-muted-foreground">
          <span>← Mais ênfase visual</span>
          <span>Mais neutro e contextual →</span>
        </p>
        <ul className="m-0 mt-5 grid list-none grid-cols-1 gap-3 border-t border-border p-0 pt-5 sm:grid-cols-3">
          {FAIXAS_DA_PALETA.map(f => (
            <li key={f.nome} className="min-w-0 rounded-md border border-border p-3">
              <span aria-hidden className="mb-2 flex h-2.5 gap-0 overflow-hidden rounded-sm">
                {f.tons.map(t => <span key={t} className="flex-1" style={{ background: `var(--chart-${t})` }} />)}
              </span>
              <p className="text-body-sm font-bold text-foreground">{f.nome} <span className="font-semibold tabular-nums text-muted-foreground">· tons {f.tons[0]}–{f.tons[f.tons.length - 1]}</span></p>
              <p className="mt-1 text-body-sm leading-relaxed text-muted-foreground">{f.d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-label leading-relaxed text-muted-foreground">As séries usam os tons em sequência, com <span className="font-mono">coresPorImportancia(n)</span>: 1 série → 1 · 2 → 1, 2 · 3 → 1, 2, 3 · … · 7 → 1 a 7 (um mosaico de 7 partes usa os 7 tons, na ordem). <span className="font-mono">--chart-neutral</span> é o tom 7: "Outros" e informação sem destaque, sempre por último. "Outros" fica no tom 6 quando as partes param antes dele (pizza com 2 partes e Outros: 1, 2 e 6) e no tom 7 nos demais casos. <span className="font-mono">--chart-grid</span>: linhas de grade. Os dois cinzas são próximos entre si (1,24:1) e o tom 7 quase some sobre o branco (1,2:1): por isso todo gráfico escreve rótulos e valores, e a cor nunca é a única pista.</p>
      </Cartao>

      <div className="mt-6">
        <Rotulo>Regras de uso</Rotulo>
        <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 xl:grid-cols-5">
          {REGRAS_DE_COR.map((r, i) => (
            <li key={r.t} className="flex min-w-0 gap-3 rounded-lg border border-border bg-card p-4 xl:flex-col">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary-muted)] text-label font-bold text-[var(--primary-text)]">{i + 1}</span>
              <div className="min-w-0">
                <p className="text-body-sm font-semibold leading-snug text-foreground">{r.t}</p>
                <p className="mt-1 text-body-sm leading-relaxed text-muted-foreground">{r.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-6">
        <Rotulo>Exemplos aplicados</Rotulo>
        <GradeDeCards className="gap-4 md:grid-cols-2">
          <Cartao>
            <p className="text-body-sm font-semibold text-foreground">Barras por importância</p>
            <p className="mb-4 text-label text-muted-foreground">A a E nos tons 1, 2, 3, 4 e 5, em sequência (dados de exemplo).</p>
            <BarrasOrdenadas rotulo="Barras por importância (dados de exemplo)" itens={EX_BARRAS} destaques={1} posicao={false} cores="importancia" />
          </Cartao>
          <Cartao>
            <p className="text-body-sm font-semibold text-foreground">Linhas: principal, secundária e benchmark</p>
            <p className="mb-4 text-label text-muted-foreground">Principal no tom 1, secundária no 2 e benchmark no cinza de contexto (tom 6), tracejado (dados de exemplo).</p>
            <GraficoDeLinhas rotulo="Linhas principal, secundária e benchmark (dados de exemplo)" series={EX_LINHAS} rotulosX={EX_MESES} altura={200} zero={false} />
          </Cartao>
          <Cartao>
            <p className="text-body-sm font-semibold text-foreground">Rosca com um foco</p>
            <p className="mb-4 text-label text-muted-foreground">Principal no tom 1 (56%), apoio no 2, secundária no 3 e contexto no 6 (dados de exemplo).</p>
            <GraficoDeRosca rotulo="Rosca com um foco (dados de exemplo)" partes={EX_ROSCA} centro={{ valor: "250", rotulo: "respostas" }} tamanho={180} />
          </Cartao>
          <Cartao>
            <p className="text-body-sm font-semibold text-foreground">Escala contínua</p>
            <p className="mb-4 text-label text-muted-foreground">Do cinza (valor baixo) ao rosa (valor alto), nos tons 6, 4, 2 e 1 (dados de exemplo).</p>
            <MapaDeCalorMatricial rotulo="Escala contínua (dados de exemplo)" {...EX_ESCALA} rotuloLinhas="Período" rotulos={{ menos: "Baixo", mais: "Alto" }} />
          </Cartao>
        </GradeDeCards>
      </div>

      <Cartao className="mt-6">
        <Rotulo>Escala de calor (do menor para o maior)</Rotulo>
        <ul className="m-0 grid list-none grid-cols-4 gap-1 p-0">
          {TONS_DA_ESCALA.map((tom, i) => [`--chart-seq-${i + 1}`, tom] as const).map(([tk, tom]) => (
            <li key={tk} className="min-w-0">
              <span aria-hidden className="block h-10 rounded-sm" style={{ background: `var(${tk})` }} />
              <span className="mt-1 block font-mono text-caption text-foreground [overflow-wrap:anywhere]">{tk}</span>
              <span className="block text-caption text-muted-foreground">tom {tom}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-label leading-relaxed text-muted-foreground">Do cinza (tom 6) ao rosa (tom 1), passando pelos tons 4 e 2. As células de calor não levam número: a cor mostra a faixa, a célula em destaque é contornada e dita numa frase abaixo, e os números ficam na dica e em Ver dados. Tons vizinhos ficam parecidos para quem tem daltonismo: por isso o destaque também vai escrito.</p>
        <div className="mt-6 border-t border-border pt-5">
          <Rotulo>Texto nos gráficos</Rotulo>
          <p className="text-body font-semibold leading-snug text-foreground">Nenhum texto sobre a cor do gráfico: valores e rótulos ficam fora da marca, sempre na mesma cor de texto.</p>
          <p className="mt-2 text-body-sm leading-relaxed text-muted-foreground">Nenhuma cor de texto passa de 4,5:1 sobre todos os tons da paleta, e trocar a cor do texto de uma parte para outra confunde a leitura. Por isso barras, fatias, células, blocos e bolhas não levam número nem nome. Valores e nomes em --foreground; --muted-foreground só no texto secundário, como os eixos. Quando o valor precisa ser ligado a uma parte (barras empilhadas, mosaico, rosca), ele vem depois de um ponto na cor dela, na mesma ordem das partes. Decisão da dona do produto, 19/11/2026.</p>
          <p className="mt-2 text-body-sm leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground">Áreas:</span> linha fina na cor da série e preenchimento em degradê transparente.</p>
        </div>
      </Cartao>
      <GradeDeCards className="mt-4 gap-4 md:grid-cols-2">
        <Cartao>
          <p className="mb-3 flex items-center gap-1 text-body-sm font-semibold text-foreground"><Check aria-hidden className="h-4 w-4 text-success" />Assim: importância em ordem, Outros em cinza</p>
          <BarrasEmpilhadas100 rotulo="Exemplo correto" categorias={[{ rotulo: "Vestidos" }, { rotulo: "Calças" }, { rotulo: "Camisas" }, { rotulo: "Outras", neutro: true }]} linhas={[{ rotulo: "Peças buscadas", valores: [34, 26, 16, 24] }]} />
        </Cartao>
        <Cartao>
          <p className="mb-3 flex items-center gap-1 text-body-sm font-semibold text-foreground"><X aria-hidden className="h-4 w-4 text-error-text" />Não assim: destaque em todas as partes</p>
          <div aria-hidden className="flex h-3 gap-0 overflow-hidden rounded-sm">
            <span style={{ flex: "34 1 0", background: "var(--chart-1)" }} />
            <span style={{ flex: "26 1 0", background: "var(--chart-2)" }} />
            <span style={{ flex: "16 1 0", background: "var(--chart-1)" }} />
            <span style={{ flex: "24 1 0", background: "var(--chart-2)" }} />
          </div>
          <p className="mt-3 text-body-sm leading-relaxed text-muted-foreground">Com tons intensos em todas as partes, nada se destaca e o olho não sabe por onde começar; "Outros" parece tão importante quanto o resto. Sem rótulos, a cor carrega o significado sozinha.</p>
        </Cartao>
      </GradeDeCards>
      <div className="mt-4">
        <DoDont
          dos={[
            "Tom 1 só no dado principal ou no ponto de atenção.",
            "Séries em ordem de importância, do pink ao cinza (coresPorImportancia).",
            "Referências, histórico e metas nos tons 6 e 7; Outros em --chart-neutral, por último.",
            "Valores e nomes fora das marcas, sempre na mesma cor de texto, com um ponto na cor da parte quando for preciso ligá-los a ela.",
          ]}
          donts={[
            "Usar mais de 2 tons intensos (1 e 2) no mesmo gráfico.",
            "Criar cores fora da paleta (verde, azul, laranja) para separar séries.",
            "Começar uma escala contínua pelo pink ou embaralhar a ordem dos tons.",
            "Escrever número ou nome sobre uma barra, fatia, célula, bloco ou bolha, ou depender só da legenda para dizer o que é cada cor.",
          ]}
        />
      </div>
    </section>
  );
}

/** Tabela que vira lista no celular (card nunca rola na horizontal): a TabelaAdaptavel do DS (27/11/2026). */
function TabelaQueQuebra({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  const colunas: ColunaDaTabela<{ i: number; c: React.ReactNode[] }>[] = head.map((h, j) => ({
    id: String(j), titulo: h, principal: j === 0, largura: 180, prioridade: j, celula: (l) => l.c[j],
  }));
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <TabelaAdaptavel legenda={head.join(", ")} colunas={colunas} linhas={rows.map((c, i) => ({ i, c }))} chave={(l) => String(l.i)} />
    </div>
  );
}

function Cartao({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`min-w-0 rounded-lg border border-border bg-card p-5 sm:p-6 ${className}`}>{children}</div>;
}

function Rotulo({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-label font-semibold uppercase tracking-[0.08em] text-muted-foreground">{children}</p>;
}

/* ── Catálogo completo: dados de exemplo (fictícios; gerados por sementes fixas, sempre iguais) ── */

/** Números pseudoaleatórios com semente fixa (mulberry32): o exemplo não muda a cada carga. */
function sorteador(semente: number) {
  let a = semente >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/** Amostra aproximadamente normal (soma de uniformes), arredondada e com piso. */
function amostra(semente: number, quantos: number, media: number, dp: number, piso = 0) {
  const r = sorteador(semente);
  return Array.from({ length: quantos }, () => Math.max(piso, Math.round(media + (r() + r() + r() + r() - 2) * dp * 1.73)));
}

const CAT_GRUPOS = [
  { rotulo: "Vestidos", valores: [128, 74] },
  { rotulo: "Calças", valores: [96, 61] },
  { rotulo: "Camisas", valores: [70, 52] },
  { rotulo: "Calçados", valores: [64, 23] },
];
const CAT_SERIES = ["Novas", "Segunda mão"];

const EMPILHADAS = {
  categorias: [{ rotulo: "Vestidos" }, { rotulo: "Calças" }, { rotulo: "Camisas" }, { rotulo: "Outras", neutro: true }],
  linhas: [
    { rotulo: "Região Norte", valores: [120, 84, 52, 60] },
    { rotulo: "Centro", valores: [96, 132, 58, 74] },
    { rotulo: "Região Sul", valores: [70, 48, 40, 32] },
  ],
};

const FAVORITADAS = [
  { rotulo: "Blazer de linho", valor: 182 },
  { rotulo: "Vestido midi floral", valor: 164 },
  { rotulo: "Tênis branco", valor: 151 },
  { rotulo: "Calça wide leg", valor: 138 },
  { rotulo: "Jaqueta jeans", valor: 120 },
  { rotulo: "Bolsa de palha", valor: 96 },
  { rotulo: "Camisa listrada", valor: 88 },
];
const MEDIA_FAVORITOS = Math.round(FAVORITADAS.reduce((s, f) => s + f.valor, 0) / FAVORITADAS.length);

const SEMANAS_8 = ["Sem. 1", "Sem. 2", "Sem. 3", "Sem. 4", "Sem. 5", "Sem. 6", "Sem. 7", "Sem. 8"];
const POR_CONDICAO = [
  { rotulo: "Novas", valores: [420, 440, 455, 470, 468, 490, 512, 530] },
  { rotulo: "Segunda mão", valores: [180, 196, 210, 236, 250, 268, 290, 318] },
  { rotulo: "Tanto faz", valores: [120, 118, 126, 124, 130, 128, 134, 140] },
];

const SEMANAS_12 = Array.from({ length: 12 }, (_, i) => `S${i + 1}`);
const POR_ESTILO = [
  { rotulo: "Alfaiataria", valores: [60, 66, 72, 85, 98, 116, 132, 150, 168, 180, 196, 210] },
  { rotulo: "Jeans", valores: [150, 148, 152, 146, 150, 144, 140, 146, 142, 138, 140, 136] },
  { rotulo: "Vestidos", valores: [120, 132, 146, 158, 150, 136, 124, 116, 110, 104, 100, 96] },
  { rotulo: "Outros", valores: [90, 92, 88, 94, 96, 92, 90, 94, 92, 96, 94, 92], neutro: true },
];

const MARCOS = [
  { quando: 34, data: "03 fev", rotulo: "Loja entrou na FindLook" },
  { quando: 49, data: "18 fev", rotulo: "40 peças publicadas" },
  { quando: 69, data: "10 mar", rotulo: "Fotos refeitas", destaque: true },
  { quando: 92, data: "02 abr", rotulo: "Coleção de outono" },
  { quando: 115, data: "25 abr", rotulo: "Bazar de brechó" },
  { quando: 140, data: "20 mai", rotulo: "Peças de inverno" },
];
const MARCOS_MESES = [{ quando: 32, rotulo: "fev" }, { quando: 60, rotulo: "mar" }, { quando: 91, rotulo: "abr" }, { quando: 121, rotulo: "mai" }];

const DIAS_DA_SEMANA = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
const CALENDARIO = (() => {
  const r = sorteador(7);
  const peso = [0, -4, 2, 6, 18, 34, 12]; // segunda a domingo
  return Array.from({ length: 91 }, (_, i) => {
    const d = new Date(Date.UTC(2026, 7, 3 + i));
    const valor = Math.max(4, Math.round(52 + peso[i % 7]! + 14 * Math.sin(i / 10) + (r() - 0.5) * 22 + (i === 47 ? 40 : 0)));
    return { data: d.toISOString().slice(0, 10), valor };
  });
})();
const CALENDARIO_MEDIAS = DIAS_DA_SEMANA.map((d, k) => {
  const vs = CALENDARIO.filter((_, i) => i % 7 === k).map(x => x.valor);
  return [d, formatarNumero(vs.reduce((s, v) => s + v, 0) / vs.length)];
});

const VELAS = [
  { rotulo: "Sem. 1", abertura: 249, maxima: 279, minima: 229, fechamento: 259 },
  { rotulo: "Sem. 2", abertura: 259, maxima: 289, minima: 239, fechamento: 239 },
  { rotulo: "Sem. 3", abertura: 239, maxima: 259, minima: 199, fechamento: 219 },
  { rotulo: "Sem. 4", abertura: 219, maxima: 249, minima: 209, fechamento: 245 },
  { rotulo: "Sem. 5", abertura: 245, maxima: 279, minima: 239, fechamento: 269 },
  { rotulo: "Sem. 6", abertura: 269, maxima: 299, minima: 259, fechamento: 289 },
  { rotulo: "Sem. 7", abertura: 289, maxima: 309, minima: 259, fechamento: 265 },
  { rotulo: "Sem. 8", abertura: 265, maxima: 285, minima: 249, fechamento: 279 },
];

const POR_CONDICAO_PIZZA = [
  { rotulo: "Novas", valor: 58 },
  { rotulo: "Segunda mão", valor: 34 },
  { rotulo: "Sem condição informada", valor: 8, neutro: true },
];

const TIPOS_DE_LOJA = [
  { rotulo: "Lojas multimarcas", valor: 41 },
  { rotulo: "Brechós", valor: 27 },
  { rotulo: "Lojas de marca própria", valor: 19 },
  { rotulo: "Outros formatos", valor: 13, neutro: true },
];

const FAIXAS_PRECO = ["R$ 300 ou mais", "R$ 200–299", "R$ 100–199", "R$ 50–99", "Até R$ 49"];
const PIRAMIDE = { esquerda: { rotulo: "Novas", valores: [64, 118, 186, 142, 40] }, direita: { rotulo: "Segunda mão", valores: [12, 38, 96, 170, 124] } };

const DISPERSAO = (() => {
  const r = sorteador(11);
  const pts = Array.from({ length: 28 }, (_, i) => {
    const x = Math.round(40 + r() * 340);
    return { x, y: Math.max(4, Math.round(22 + x * 0.17 + (r() - 0.5) * 34)), rotulo: `Peça ${String(i + 1).padStart(2, "0")}` };
  });
  return [...pts, { x: 90, y: 118, rotulo: "Vestido de linho", destaque: true }, { x: 360, y: 40, rotulo: "Jaqueta de couro", destaque: true }];
})();

const CORRELACAO = {
  variaveis: ["Preço", "Fotos por peça", "Visitas", "Favoritos", "Contatos"],
  valores: [
    [1, 0.12, -0.18, -0.24, -0.31],
    [0.12, 1, 0.58, 0.52, 0.44],
    [-0.18, 0.58, 1, 0.81, 0.63],
    [-0.24, 0.52, 0.81, 1, 0.72],
    [-0.31, 0.44, 0.63, 0.72, 1],
  ],
};

const RADAR = {
  eixos: ["Fotos", "Descrição", "Preço informado", "Tamanhos", "Resposta a contatos", "Peças novas no mês"],
  series: [
    { rotulo: "Loja de exemplo", valores: [92, 64, 100, 58, 80, 70], destaque: true },
    { rotulo: "Média do bairro", valores: [70, 72, 85, 75, 62, 55] },
  ],
};

const PARALELAS = {
  eixos: [{ rotulo: "Peças publicadas" }, { rotulo: "Preço médio", formatar: reais }, { rotulo: "Favoritos por semana" }, { rotulo: "Contatos por semana" }],
  itens: [
    { rotulo: "Loja A", valores: [320, 180, 140, 22] },
    { rotulo: "Loja B", valores: [140, 260, 60, 9] },
    { rotulo: "Loja C", valores: [90, 120, 150, 31], destaque: true },
    { rotulo: "Loja D", valores: [410, 210, 120, 18] },
    { rotulo: "Loja E", valores: [220, 95, 80, 14] },
    { rotulo: "Loja F", valores: [380, 310, 40, 6], destaque: true },
    { rotulo: "Loja G", valores: [160, 150, 100, 16] },
    { rotulo: "Loja H", valores: [260, 130, 90, 12] },
  ],
};

const SANKEY = {
  nos: [
    { id: "busca", rotulo: "Busca", coluna: 0 },
    { id: "mapa", rotulo: "Mapa", coluna: 0 },
    { id: "perfil", rotulo: "Página da loja", coluna: 0 },
    { id: "fav", rotulo: "Favoritou", coluna: 1 },
    { id: "contato", rotulo: "Entrou em contato", coluna: 1 },
    { id: "saiu", rotulo: "Saiu sem ação", coluna: 1, neutro: true },
  ],
  ligacoes: [
    { de: "busca", para: "fav", valor: 150 }, { de: "busca", para: "contato", valor: 90 }, { de: "busca", para: "saiu", valor: 380 },
    { de: "mapa", para: "fav", valor: 50 }, { de: "mapa", para: "contato", valor: 60, destaque: true }, { de: "mapa", para: "saiu", valor: 130 },
    { de: "perfil", para: "fav", valor: 40 }, { de: "perfil", para: "contato", valor: 45 }, { de: "perfil", para: "saiu", valor: 55 },
  ],
};

const REDE = {
  nos: [
    { id: "blazer", rotulo: "Blazer", valor: 9, destaque: true },
    { id: "calca", rotulo: "Calça de alfaiataria", valor: 7 },
    { id: "camisa", rotulo: "Camisa de linho", valor: 6 },
    { id: "mocassim", rotulo: "Mocassim", valor: 4 },
    { id: "vestido", rotulo: "Vestido midi", valor: 8 },
    { id: "sandalia", rotulo: "Sandália", valor: 5 },
    { id: "bolsa", rotulo: "Bolsa de palha", valor: 5 },
  ],
  ligacoes: [
    { de: "blazer", para: "calca", valor: 64 }, { de: "blazer", para: "camisa", valor: 42 }, { de: "blazer", para: "mocassim", valor: 26 },
    { de: "calca", para: "camisa", valor: 30 }, { de: "calca", para: "mocassim", valor: 18 }, { de: "vestido", para: "sandalia", valor: 48 },
    { de: "vestido", para: "bolsa", valor: 40 }, { de: "sandalia", para: "bolsa", valor: 28 }, { de: "blazer", para: "vestido", valor: 14 },
  ],
};

const PRECOS_USADAS = [...amostra(21, 110, 82, 30, 15), 240, 265, 310];
const PRECOS_NOVAS = amostra(22, 110, 190, 55, 40);
const MEDIANA_USADAS = resumoDaDistribuicao(PRECOS_USADAS).mediana;
const PRECO_POR_CATEGORIA = [
  { rotulo: "Vestidos", valores: [...amostra(31, 18, 95, 18, 30), ...amostra(32, 18, 230, 26, 30)] },
  { rotulo: "Calças", valores: amostra(33, 34, 140, 30, 30) },
  { rotulo: "Blazers", valores: [...amostra(34, 32, 250, 45, 60), 520], destaque: true },
  { rotulo: "Tênis", valores: [...amostra(35, 32, 230, 32, 60), 480, 30] },
];

const REGIOES_ESQ = REGIOES.map(r => ({ id: r.id, rotulo: r.rotulo, coluna: r.coluna, linha: r.linha }));
const PONTOS_LOJAS = (() => {
  const r = sorteador(41);
  const centros: [number, number, number][] = [[2.5, 1.62, 6], [1.5, 1.62, 4], [2.5, 0.65, 3], [2.4, 2.62, 3], [0.6, 2.6, 2], [1.4, 0.62, 2]];
  let k = 0;
  return centros.flatMap(([cx, cy, n]) => Array.from({ length: n }, () => {
    k++;
    return { rotulo: k % 3 === 0 ? `Brechó ${k}` : `Loja ${k}`, x: cx + (r() - 0.5) * 0.7, y: cy + (r() - 0.5) * 0.45, tipo: k % 3 === 0 ? 1 : 0 };
  })).map((p, i) => (i === 0 ? { ...p, rotulo: "Loja de exemplo", destaque: true } : p));
})();
const BOLHAS_MAPA = REGIOES.map(r => ({ rotulo: r.rotulo, x: r.coluna - 0.5, y: r.linha - 0.56, valor: r.valor, destaque: r.id === "l" }));

const resumoDist = (vs: number[], f: (v: number) => string) => {
  const s = resumoDaDistribuicao(vs);
  return [["Mínimo", f(s.minimo)], ["1º quartil", f(s.q1)], ["Mediana", f(s.mediana)], ["3º quartil", f(s.q3)], ["Máximo", f(s.maximo)], ["Quantidade", n(vs.length)]];
};

/** Card do catálogo: nome, componente, quando usar, o gráfico, o cuidado de leitura e Ver dados. */
function CartaoDoCatalogo({ nome, componente, quando, cuidado, dados, children }: { nome: string; componente: string; quando: string; cuidado?: string; dados: DadosDaTabela; children: React.ReactNode }) {
  const [aberto, setAberto] = React.useState(false);
  const id = React.useId();
  return (
    <article className="flex min-w-0 flex-col rounded-lg border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h4 className="text-body font-bold leading-snug text-foreground">{nome}</h4>
          <p className="font-mono text-label text-muted-foreground">{componente}</p>
        </div>
        <span className="inline-flex h-6 shrink-0 items-center rounded-sm border border-border px-2 text-caption font-medium text-muted-foreground">{SELO}</span>
      </div>
      <p className="mt-2 text-body-sm leading-relaxed text-foreground"><span className="font-semibold">Quando usar: </span>{quando}</p>
      <div className="mt-5 min-w-0 flex-1">{children}</div>
      {cuidado && (
        <p className="mt-4 flex gap-2 rounded-md bg-[var(--warning-muted)] px-3 py-2 text-body-sm leading-relaxed text-foreground">
          <AlertCircle aria-hidden className="mt-1 h-4 w-4 shrink-0 text-warning-text" />
          <span><span className="font-semibold">Cuidado: </span>{cuidado}</span>
        </p>
      )}
      <div className="mt-4">
        <button type="button" aria-expanded={aberto} aria-controls={id} onClick={() => setAberto(v => !v)}
          className="inline-flex items-center gap-1 rounded-sm text-body-sm font-semibold text-[var(--primary-text,var(--primary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          {aberto ? "Ocultar dados" : "Ver dados"}
          <ChevronDown aria-hidden className={`h-4 w-4 transition-transform motion-reduce:transition-none ${aberto ? "rotate-180" : ""}`} />
        </button>
        <div id={id} hidden={!aberto} className="mt-2 max-h-80 overflow-y-auto rounded-md bg-muted/50 px-3 py-1">
          <TabelaDeDados dados={dados} legenda={nome} />
        </div>
      </div>
    </article>
  );
}

function Familia({ id, icone: Icone, nome, descricao, children }: { id: string; icone: React.ElementType; nome: string; descricao: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-32">
      <div className="mb-4 flex items-start gap-3">
        <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-[var(--primary-text)]"><Icone className="h-[18px] w-[18px]" /></span>
        <div>
          <h3 className="text-subtitle font-bold text-foreground">{nome}</h3>
          <p className="text-body-sm leading-relaxed text-muted-foreground">{descricao}</p>
        </div>
      </div>
      <GradeDeCards className="gap-4 lg:grid-cols-2">{children}</GradeDeCards>
    </div>
  );
}

function SecaoCatalogo() {
  return (
    <section id="graficos-catalogo" className="scroll-mt-32">
      <SectionHeader
        title="Catálogo completo"
        description="Os outros 25 modelos do catálogo de referência, prontos como componentes, organizados pelas 6 famílias. Use primeiro os recomendados; recorra a estes quando a pergunta pedir. Cada card diz quando usar, mostra o gráfico com dados de exemplo (fictícios) e avisa onde a leitura costuma enganar."
      />
      <div className="space-y-12">
        <Familia id="graficos-catalogo-comparacao" icone={ChartColumnBig} nome="Comparação" descricao="Comparar valores entre itens e grupos.">
          <CartaoDoCatalogo nome="Barras agrupadas" componente="BarrasAgrupadas" quando="Para comparar duas ou três medidas lado a lado dentro de cada grupo."
            cuidado="Com mais de 3 séries a leitura fica lenta: divida em gráficos menores."
            dados={{ colunas: ["Categoria", ...CAT_SERIES], linhas: CAT_GRUPOS.map(g => [g.rotulo, ...g.valores.map(n)]) }}>
            <BarrasAgrupadas rotulo="Peças publicadas por categoria e condição (dados de exemplo)" grupos={CAT_GRUPOS} series={CAT_SERIES} />
          </CartaoDoCatalogo>
          <CartaoDoCatalogo nome="Barras empilhadas" componente="BarrasEmpilhadas" quando="Quando o total importa e você também quer mostrar do que ele é feito."
            cuidado="Só a primeira parte começa do zero; as outras são difíceis de comparar entre as barras. Para comparar as partes, use barras agrupadas."
            dados={{ colunas: ["Região", ...EMPILHADAS.categorias.map(c => c.rotulo), "Total"], linhas: EMPILHADAS.linhas.map(l => [l.rotulo, ...l.valores.map(n), n(l.valores.reduce((s, v) => s + v, 0))]) }}>
            <BarrasEmpilhadas rotulo="Peças publicadas por região e categoria (dados de exemplo)" {...EMPILHADAS} />
          </CartaoDoCatalogo>
          <CartaoDoCatalogo nome="Pirulito (lollipop)" componente="Pirulito" quando="Para um ranking com muitos itens, quando barras cheias pesariam demais; aceita uma linha de referência."
            dados={{ colunas: ["Peça", "Favoritos"], linhas: [...FAVORITADAS.map(f => [f.rotulo, n(f.valor)]), ["Média", n(MEDIA_FAVORITOS)]] }}>
            <Pirulito rotulo="Peças mais favoritadas na semana (dados de exemplo)" itens={FAVORITADAS} destaques={1} referencia={{ valor: MEDIA_FAVORITOS, rotulo: "Média" }} />
          </CartaoDoCatalogo>
        </Familia>

        <Familia id="graficos-catalogo-tempo" icone={ChartLine} nome="Tempo" descricao="Mostrar como algo evolui e quando as coisas acontecem.">
          <CartaoDoCatalogo nome="Área empilhada" componente="AreaEmpilhada" quando="Para ver o total ao longo do tempo e quanto cada parte contribui para ele."
            cuidado="Só a camada de baixo tem a base reta; as de cima são difíceis de comparar entre si. Com 3 ou mais séries, confira os números em Ver dados."
            dados={{ colunas: ["Semana", ...POR_CONDICAO.map(s => s.rotulo)], linhas: SEMANAS_8.map((s, i) => [s, ...POR_CONDICAO.map(x => n(x.valores[i]!))]) }}>
            <AreaEmpilhada rotulo="Buscas por semana, por condição da peça (dados de exemplo)" series={POR_CONDICAO} rotulosX={SEMANAS_8} />
          </CartaoDoCatalogo>
          <CartaoDoCatalogo nome="Streamgraph" componente="Streamgraph" quando="Para mostrar a mistura mudando ao longo de muitos períodos, quando o movimento importa mais que o número."
            cuidado="Não serve para ler valores: as camadas não têm base comum. Use para dar a ideia geral e deixe os números na tabela."
            dados={{ colunas: ["Semana", ...POR_ESTILO.map(s => s.rotulo)], linhas: SEMANAS_12.map((s, i) => [s, ...POR_ESTILO.map(x => n(x.valores[i]!))]) }}>
            <Streamgraph rotulo="Buscas por estilo em 12 semanas (dados de exemplo)" series={POR_ESTILO} rotulosX={SEMANAS_12} />
          </CartaoDoCatalogo>
          <CartaoDoCatalogo nome="Linha do tempo" componente="LinhaDoTempo" quando="Para situar acontecimentos no tempo e mostrar os intervalos entre eles."
            dados={{ colunas: ["Data", "Acontecimento"], linhas: MARCOS.map(m => [m.data, m.rotulo]) }}>
            <LinhaDoTempo rotulo="Marcos da vitrine de uma loja de exemplo" eventos={MARCOS} marcas={MARCOS_MESES} inicio={30} fim={146} />
          </CartaoDoCatalogo>
          <CartaoDoCatalogo nome="Calendário de calor" componente="CalendarioDeCalor" quando="Para achar padrões por dia da semana e datas fora da curva ao longo de semanas ou meses."
            cuidado="Tons vizinhos são difíceis de comparar: o dia de maior valor vai escrito e os números ficam em Ver dados."
            dados={{ colunas: ["Dia da semana", "Média de buscas"], linhas: CALENDARIO_MEDIAS }}>
            <CalendarioDeCalor rotulo="Buscas por dia em 13 semanas (dados de exemplo)" dias={CALENDARIO} />
          </CartaoDoCatalogo>
          <CartaoDoCatalogo nome="Velas (candlestick)" componente="GraficoDeVelas" quando="Para mostrar, em cada período, o primeiro e o último valor e a variação entre o menor e o maior, como preços."
            cuidado="Pouco conhecido fora do mercado financeiro: explique o corpo e o traço junto do gráfico, ou prefira uma linha."
            dados={{ colunas: ["Semana", "Primeiro", "Maior", "Menor", "Último"], linhas: VELAS.map(v => [v.rotulo, reais(v.abertura), reais(v.maxima), reais(v.minima), reais(v.fechamento)]) }}>
            <GraficoDeVelas rotulo="Preço anunciado do tênis branco por semana (dados de exemplo)" velas={VELAS} formatar={reais}
              rotulos={{ subiu: "Terminou a semana mais caro", caiu: "Terminou a semana mais barato", abertura: "primeiro preço", maxima: "maior", minima: "menor", fechamento: "último preço" }} />
          </CartaoDoCatalogo>
        </Familia>

        <Familia id="graficos-catalogo-composicao" icone={ChartPie} nome="Composição" descricao="Mostrar as partes de um todo e como ele se forma.">
          <CartaoDoCatalogo nome="Pizza" componente="Pizza" quando="Para 2 a 4 partes de um todo, quando uma delas é claramente maior."
            cuidado="Ângulos são difíceis de comparar: com mais de 4 partes, ou partes de tamanho parecido, use barras ou a rosca."
            dados={{ colunas: ["Condição", "Fatia"], linhas: POR_CONDICAO_PIZZA.map(p => [p.rotulo, pct(p.valor)]) }}>
            <Pizza rotulo="Peças publicadas por condição (dados de exemplo)" partes={POR_CONDICAO_PIZZA} />
          </CartaoDoCatalogo>
          <CartaoDoCatalogo nome="Waffle" componente="Waffle" quando="Para mostrar uma proporção de um jeito concreto, como 27 em cada 100."
            dados={{ colunas: ["Tipo", "Fatia"], linhas: TIPOS_DE_LOJA.map(p => [p.rotulo, pct(p.valor)]) }}>
            <Waffle rotulo="Lojas participantes por tipo (dados de exemplo)" partes={TIPOS_DE_LOJA} />
          </CartaoDoCatalogo>
          <CartaoDoCatalogo nome="Pirâmide" componente="Piramide" quando="Para comparar como dois grupos se distribuem pelas mesmas faixas, lado a lado."
            dados={{ colunas: ["Faixa de preço", PIRAMIDE.esquerda.rotulo, PIRAMIDE.direita.rotulo], linhas: FAIXAS_PRECO.map((f, i) => [f, n(PIRAMIDE.esquerda.valores[i]!), n(PIRAMIDE.direita.valores[i]!)]) }}>
            <Piramide rotulo="Peças publicadas por faixa de preço e condição (dados de exemplo)" faixas={FAIXAS_PRECO} {...PIRAMIDE} />
          </CartaoDoCatalogo>
        </Familia>

        <Familia id="graficos-catalogo-relacoes" icone={ChartScatter} nome="Relações" descricao="Ver como medidas andam juntas e como as coisas se conectam.">
          <CartaoDoCatalogo nome="Dispersão" componente="Dispersao" quando="Para ver se duas medidas andam juntas e encontrar os itens fora da curva."
            cuidado="Andar junto não é causa: a linha de tendência mostra a direção, não o porquê."
            dados={{ colunas: ["Peça", "Preço", "Favoritos"], linhas: [...DISPERSAO].sort((a, b) => a.x - b.x).map(p => [p.rotulo, reais(p.x), n(p.y)]) }}>
            <Dispersao rotulo="Preço e favoritos por peça (dados de exemplo)" pontos={DISPERSAO} tendencia
              eixoX={{ rotulo: "Preço", formatar: reais }} eixoY={{ rotulo: "Favoritos" }} />
          </CartaoDoCatalogo>
          <CartaoDoCatalogo nome="Matriz de correlação" componente="MatrizDeCorrelacao" quando="Para ter uma visão geral de quais medidas andam juntas antes de investigar um par."
            cuidado="Correlação não é causa. Um valor perto de zero só diz que não há relação em linha reta, não que não há relação nenhuma."
            dados={{ colunas: ["Medida", ...CORRELACAO.variaveis], linhas: CORRELACAO.variaveis.map((v, i) => [v, ...CORRELACAO.valores[i]!.map(x => x.toLocaleString("pt-BR", { minimumFractionDigits: 2 }))]) }}>
            <MatrizDeCorrelacao rotulo="Correlação entre medidas das peças (dados de exemplo)" {...CORRELACAO} destaque={[3, 2]} />
          </CartaoDoCatalogo>
          <CartaoDoCatalogo nome="Radar" componente="Radar" quando="Para comparar o perfil de 1 a 3 itens em várias medidas na mesma escala."
            cuidado="A área muda com a ordem dos eixos e exagera diferenças; com mais de 3 séries vira um emaranhado. Para comparar números, use barras."
            dados={{ colunas: ["Medida", ...RADAR.series.map(s => s.rotulo)], linhas: RADAR.eixos.map((e, i) => [e, ...RADAR.series.map(s => n(s.valores[i]!))]) }}>
            <Radar rotulo="Qualidade da vitrine, de 0 a 100 (dados de exemplo)" {...RADAR} maximo={100} />
          </CartaoDoCatalogo>
          <CartaoDoCatalogo nome="Coordenadas paralelas" componente="CoordenadasParalelas" quando="Para comparar muitos itens em várias medidas de escalas diferentes e achar perfis parecidos."
            cuidado="Com muitos itens vira um emaranhado: destaque poucos e deixe o resto em cinza. A ordem dos eixos muda o desenho."
            dados={{ colunas: ["Loja", ...PARALELAS.eixos.map(e => e.rotulo)], linhas: PARALELAS.itens.map(i => [i.rotulo, n(i.valores[0]!), reais(i.valores[1]!), n(i.valores[2]!), n(i.valores[3]!)]) }}>
            <CoordenadasParalelas rotulo="Lojas em quatro medidas (dados de exemplo)" {...PARALELAS} />
          </CartaoDoCatalogo>
          <CartaoDoCatalogo nome="Sankey" componente="Sankey" quando="Para mostrar de onde vem e para onde vai um fluxo, e quanto passa por cada caminho."
            cuidado="Com muitas ligações cruzadas fica ilegível: junte as pequenas em Outros e use no máximo 3 colunas."
            dados={{ colunas: ["De", "Para", "Visitas"], linhas: SANKEY.ligacoes.map(l => [SANKEY.nos.find(x => x.id === l.de)!.rotulo, SANKEY.nos.find(x => x.id === l.para)!.rotulo, n(l.valor)]) }}>
            <Sankey rotulo="Visitas às peças, da origem ao que aconteceu depois (dados de exemplo)" {...SANKEY} />
          </CartaoDoCatalogo>
          <CartaoDoCatalogo nome="Rede de conexões" componente="RedeDeConexoes" quando="Para ver o que se conecta com o quê e o que fica no centro das conexões."
            cuidado="A posição no círculo não significa nada: leia as ligações e a espessura delas."
            dados={{ colunas: ["Peça", "Buscada junto com", "Visitas"], linhas: REDE.ligacoes.map(l => [REDE.nos.find(x => x.id === l.de)!.rotulo, REDE.nos.find(x => x.id === l.para)!.rotulo, n(l.valor)]) }}>
            <RedeDeConexoes rotulo="Peças buscadas na mesma visita (dados de exemplo)" {...REDE} />
          </CartaoDoCatalogo>
        </Familia>

        <Familia id="graficos-catalogo-distribuicao" icone={ChartSpline} nome="Distribuição" descricao="Ver como os valores se espalham: onde se concentram e o que foge do padrão.">
          <CartaoDoCatalogo nome="Histograma" componente="Histograma" quando="Para ver como uma medida se espalha: onde se concentra e onde rareia."
            cuidado="A largura das faixas muda a forma do desenho: use faixas iguais e com números redondos."
            dados={{ colunas: ["Medida", "Preço"], linhas: resumoDist(PRECOS_USADAS, reais) }}>
            <Histograma rotulo="Preço das peças de segunda mão (dados de exemplo)" valores={PRECOS_USADAS} faixas={8} destaque={[50, 100]}
              referencia={{ valor: MEDIANA_USADAS, rotulo: "Mediana" }} eixoX={{ rotulo: "Preço", formatar: reais }} />
          </CartaoDoCatalogo>
          <CartaoDoCatalogo nome="Box plot" componente="BoxPlot" quando="Para comparar a distribuição de vários grupos de forma compacta: mediana, faixa do meio e valores fora do padrão."
            cuidado="Esconde a forma: os vestidos têm dois picos de preço (veja o violino), e a caixa não mostra isso."
            dados={{ colunas: ["Categoria", "Mediana", "1º quartil", "3º quartil"], linhas: PRECO_POR_CATEGORIA.map(g => { const s = resumoDaDistribuicao(g.valores); return [g.rotulo, reais(s.mediana), reais(s.q1), reais(s.q3)]; }) }}>
            <BoxPlot rotulo="Preço por categoria (dados de exemplo)" grupos={PRECO_POR_CATEGORIA} formatar={reais} eixo="Preço" />
          </CartaoDoCatalogo>
          <CartaoDoCatalogo nome="Violino" componente="Violino" quando="Como o box plot, mas mostrando a forma da distribuição, por exemplo quando há dois picos."
            cuidado="Com poucos valores (menos de 20 por grupo) a forma inventa detalhes: prefira o box plot."
            dados={{ colunas: ["Categoria", "Mediana", "1º quartil", "3º quartil"], linhas: PRECO_POR_CATEGORIA.map(g => { const s = resumoDaDistribuicao(g.valores); return [g.rotulo, reais(s.mediana), reais(s.q1), reais(s.q3)]; }) }}>
            <Violino rotulo="Preço por categoria (dados de exemplo)" grupos={PRECO_POR_CATEGORIA} formatar={reais} eixo="Preço" />
          </CartaoDoCatalogo>
          <CartaoDoCatalogo nome="Densidade" componente="Densidade" quando="Para comparar a forma de 2 ou 3 distribuições na mesma escala."
            cuidado="A curva é uma estimativa suavizada: pode sugerir valores onde não há nenhuma peça."
            dados={{ colunas: ["Medida", "Novas", "Segunda mão"], linhas: resumoDist(PRECOS_NOVAS, reais).map((l, i) => [l[0]!, l[1]!, resumoDist(PRECOS_USADAS, reais)[i]![1]!]) }}>
            <Densidade rotulo="Preço das peças novas e de segunda mão (dados de exemplo)" eixoX={{ rotulo: "Preço", formatar: reais }}
              series={[{ rotulo: "Segunda mão", valores: PRECOS_USADAS, destaque: true }, { rotulo: "Novas", valores: PRECOS_NOVAS }]} />
          </CartaoDoCatalogo>
        </Familia>

        <Familia id="graficos-catalogo-geografia" icone={MapPinned} nome="Geografia" descricao="Quando o lugar faz parte da resposta. Mapas esquemáticos: posições por props, sem escala e sem dados geográficos reais.">
          <CartaoDoCatalogo nome="Mapa de pontos" componente="MapaDePontos" quando="Para mostrar onde as coisas estão e onde se concentram, quando o lugar importa."
            cuidado="Pontos muito próximos se sobrepõem; e o mapa é esquemático: as posições são aproximadas."
            dados={{ colunas: ["Região", "Lojas", "Brechós"], linhas: REGIOES_ESQ.map(rg => { const dentro = PONTOS_LOJAS.filter(p => Math.ceil(p.x) === rg.coluna && Math.ceil(p.y) === rg.linha); return [rg.rotulo, n(dentro.filter(p => p.tipo === 0).length), n(dentro.filter(p => p.tipo === 1).length)]; }) }}>
            <MapaDePontos rotulo="Lojas participantes por região (dados de exemplo)" regioes={REGIOES_ESQ} colunas={3} linhas={3} pontos={PONTOS_LOJAS} tipos={["Loja", "Brechó"]} />
          </CartaoDoCatalogo>
          <CartaoDoCatalogo nome="Mapa de bolhas" componente="MapaDeBolhas" quando="Para comparar quantidades por lugar sem pintar regiões inteiras."
            cuidado="Áreas são difíceis de comparar com precisão: por isso o valor vai escrito junto de cada bolha."
            dados={{ colunas: ["Região", "Buscas"], linhas: [...BOLHAS_MAPA].sort((a, b) => b.valor - a.valor).map(b => [b.rotulo, n(b.valor)]) }}>
            <MapaDeBolhas rotulo="Buscas por região (dados de exemplo)" regioes={REGIOES_ESQ} colunas={3} linhas={3} bolhas={BOLHAS_MAPA} nomesDasRegioes={false} rotuloTamanho="Tamanho da bolha: buscas nas últimas 4 semanas" />
          </CartaoDoCatalogo>
        </Familia>
      </div>
    </section>
  );
}

function GraficosShowcaseBase() {
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
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary-muted)] text-label font-bold text-[var(--primary-text)]">{i + 1}</span>
              <div>
                <p className="text-body-sm font-semibold text-foreground">{p.t}</p>
                <p className="text-body-sm leading-relaxed text-muted-foreground">{p.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <GradeDeCards className="gap-4 md:grid-cols-2 xl:grid-cols-3">
          {FAMILIAS.map(f => (
            <Cartao key={f.nome}>
              <div className="mb-3 flex items-center gap-3">
                <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-[var(--primary-text)]"><f.icone className="h-[18px] w-[18px]" /></span>
                <h3 className="text-body font-bold text-foreground">{f.nome}</h3>
              </div>
              <p className="text-body-sm leading-relaxed text-foreground">{f.quando}</p>
              <ul className="mt-3 flex flex-wrap gap-1">
                {f.tipos.map(tp => <li key={tp} className="rounded-sm border border-border px-2 py-1 text-label text-muted-foreground">{tp}</li>)}
              </ul>
              <p className="mt-3 text-label text-muted-foreground"><span className="font-semibold text-foreground">No DS:</span> {f.ds}</p>
            </Cartao>
          ))}
        </GradeDeCards>
        <div className="mt-8">
          <Rotulo>Recomendados para a FindLook</Rotulo>
          <TabelaQueQuebra head={["Pergunta", "Gráfico", "Componente"]} rows={RECOMENDACOES} />
        </div>
      </section>

      {/* ── CORES ── */}
      <SecaoCores />

      {/* ── ROSCA ── */}
      <section id="graficos-rosca" className="scroll-mt-32">
        <SectionHeader
          title="Rosca"
          description="A rosca continua, redesenhada no traço do DS: anel fino, partes nos tons por importância da maior para a menor (a maior no tom 1), Outros em cinza no fim, percentual escrito junto de cada parte e o total no centro. Exemplo com os mesmos números da Composição do comércio de moda do admin (dados de exemplo)."
        />
        <GradeDeCards className="gap-4 lg:grid-cols-2">
          <Cartao>
            <Rotulo>Antes</Rotulo>
            <h3 className="mb-4 text-body font-bold text-foreground">Composição do comércio de moda</h3>
            <RoscaAntiga />
            <p className="mt-3 text-label text-muted-foreground">123 lojas de moda no bairro (dados de exemplo).</p>
            <ul className="mt-5 space-y-1 border-t border-border pt-4 text-body-sm text-muted-foreground">
              {[
                "Anel grosso, com trilho cinza por trás: pesa mais que a informação.",
                "O centro mostra 8 tipos, mas a legenda tem 4 linhas: o número não se explica.",
                "Grafite escuro como série par do rosa: o Brechó parece desativado.",
                "Outros (51%) tem a mesma força visual das partes em destaque.",
                "Percentuais só na legenda, longe das partes.",
              ].map(p => <li key={p} className="flex gap-2"><X aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0 text-error-text" />{p}</li>)}
            </ul>
          </Cartao>
          <Cartao>
            <Rotulo>Depois</Rotulo>
            <h3 className="text-body font-bold text-foreground">Lojas multimarcas são o formato mais comum no bairro</h3>
            <p className="mb-4 mt-1 text-body-sm text-muted-foreground">Um quarto das lojas de moda; os outros 5 tipos somam metade.</p>
            <GraficoDeRosca
              rotulo="Composição do comércio de moda no bairro (dados de exemplo)"
              partes={COMPOSICAO}
              centro={{ valor: "123", rotulo: "lojas de moda" }}
              formatarQuantidade={v => `${v} lojas`}
            />
            <ul className="mt-5 space-y-1 border-t border-border pt-4 text-body-sm text-muted-foreground">
              {[
                "Anel fino (10 px), sem trilho, com 2 px de respiro entre as partes.",
                "Centro com o total (quantidade de lojas); ao passar o cursor na lista, mostra a parte.",
                "Tons por importância da maior para a menor; Outros em cinza de contexto e por último.",
                "Percentual escrito junto de cada parte; a lista traz quantidade e percentual.",
                "Título diz a descoberta, em linguagem natural.",
              ].map(p => <li key={p} className="flex gap-2"><Check aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0 text-success" />{p}</li>)}
            </ul>
          </Cartao>
        </GradeDeCards>
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
        <GradeDeCards className="gap-4 xl:grid-cols-2">
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
        </GradeDeCards>
      </section>

      {/* ── CATÁLOGO COMPLETO ── */}
      <SecaoCatalogo />

      {/* ── DESIGN DE INTELIGÊNCIA ── */}
      <section id="graficos-inteligencia" className="scroll-mt-32">
        <SectionHeader
          title="Design de inteligência, não apenas um dashboard"
          description="Cada gráfico responde a uma pergunta e chega junto com a conclusão. A IA apresenta descobertas em linguagem natural e destaca o que mudou; estatísticas técnicas ficam numa camada secundária, em Ver dados."
        />
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {PASSOS_INTELIGENCIA.map(p => (
            <li key={p.n} className="rounded-lg border border-border bg-card p-4">
              <span className="text-h4 font-bold tabular-nums text-[var(--primary-text)]">{p.n}</span>
              <p className="mt-1 text-body font-semibold text-foreground">{p.t}</p>
              <p className="mt-1 text-body-sm leading-relaxed text-muted-foreground">{p.d}</p>
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
              <p className="mb-2 flex items-center gap-2 text-body font-semibold text-foreground"><MessageSquareText aria-hidden className="h-4 w-4 text-[var(--primary-text)]" />Princípio editorial</p>
              <ul className="space-y-2 text-body-sm leading-relaxed text-foreground">
                <li>A IA apresenta descobertas em linguagem natural, como uma pessoa que entende do mercado diria.</li>
                <li>Destaque o que mudou: subiu, caiu, passou à frente, ficou acima da cidade.</li>
                <li>Estatística técnica (amostra, desvio, correlação, método) fica no detalhamento, nunca no título.</li>
                <li>Hipótese tem cara de hipótese: "pode indicar", e nunca uma causa que o dado não mostra.</li>
              </ul>
            </Cartao>
            <Cartao>
              <p className="mb-2 flex items-center gap-2 text-body font-semibold text-foreground"><ChartColumn aria-hidden className="h-4 w-4 text-[var(--primary-text)]" />Título de gráfico</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="rounded-md bg-muted/60 p-3">
                  <p className="mb-1 flex items-center gap-1 text-label font-semibold text-muted-foreground"><X aria-hidden className="h-3.5 w-3.5 text-error-text" />Evitar</p>
                  <p className="text-body-sm text-foreground">Distribuição percentual de buscas por categoria (n = 4.812)</p>
                </div>
                <div className="rounded-md bg-[var(--success-muted)] p-3">
                  <p className="mb-1 flex items-center gap-1 text-label font-semibold text-foreground"><Check aria-hidden className="h-3.5 w-3.5 text-success" />Preferir</p>
                  <p className="text-body-sm text-foreground">Vestidos e calças são metade das peças buscadas</p>
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
        <SectionHeader title="Componentes e props" description="Os recomendados ficam em ui/graficos-inteligencia.tsx e os do catálogo completo em ui/graficos-catalogo.tsx. São de apresentação: recebem os dados prontos por props e não buscam nada. Cada um aceita rotulo (nome acessível), formatar (como escrever os valores) e className." />
        <TabelaQueQuebra
          head={["Componente", "Para quê", "Props principais"]}
          rows={[
            ["coresPorImportancia", "Tons das séries por importância", "n (número de séries): devolve os tons de 1 a 7 em sequência, do mais importante ao mais contextual; com coresDasSeries, coresDeFoco e coresDeContexto"],
            ["DescobertaVisual", "Card com os 4 passos e Ver dados", "tema, conclusao, contexto, porQueImporta, acao, dados, selo, numerar"],
            ["GraficoDeRosca", "Participação de até 5 partes", "partes (rotulo, valor, neutro), centro, formatarQuantidade, tamanho"],
            ["BarrasOrdenadas", "Ranking de valores", "itens, destaques, ordenar, posicao, cores (\"foco\" ou \"importancia\")"],
            ["MapaDeCalorPorRegiao", "Calor por região (esquemático)", "regioes (id, rotulo, valor, coluna, linha), colunas, linhas, destaque"],
            ["GraficoDeHalteres", "Duas medidas por item", "itens (rotulo, a, b), series, maximo, formatarDiferenca"],
            ["GraficoDeLinhas", "Tendência no tempo", "series (rotulo, valores, destaque, neutro, tom), rotulosX, area, altura, zero"],
            ["GraficoDeInclinacao", "Antes e depois", "itens (rotulo, inicio, fim), periodos, destaques"],
            ["Mosaico", "Participação de muitas partes", "itens (rotulo, valor, neutro), altura"],
            ["BarrasEmpilhadas100", "Proporções entre grupos", "categorias, linhas (rotulo, valores), minimoParaRotulo"],
            ["GraficoDeBolhas", "Três medidas ao mesmo tempo", "itens (rotulo, x, y, tamanho, destaque), eixoX, eixoY, rotuloTamanho"],
            ["MapaDeCalorMatricial", "Comparar linhas e colunas", "linhas, colunas, valores, rotuloLinhas, destaque"],
            ["GraficoDeRanking", "Mudança de posição", "series (rotulo, posicoes, destaque), periodos"],
            ["Funil", "Etapas que se reduzem", "etapas (rotulo, valor), destacarMaiorPerda"],
            ["BarrasAgrupadas", "Duas a quatro medidas por grupo", "grupos (rotulo, valores), series, maximo"],
            ["BarrasEmpilhadas", "Total e as partes dele", "categorias (rotulo, neutro), linhas (rotulo, valores)"],
            ["Pirulito", "Ranking leve, com referência", "itens, destaques, ordenar, referencia (valor, rotulo), maximo"],
            ["AreaEmpilhada", "Total no tempo e as partes", "series (rotulo, valores, neutro), rotulosX, altura"],
            ["Streamgraph", "Mistura mudando no tempo", "series (rotulo, valores, neutro), rotulosX, altura"],
            ["LinhaDoTempo", "Eventos no tempo", "eventos (quando, data, rotulo, destaque), marcas, inicio, fim"],
            ["CalendarioDeCalor", "Valor por dia", "dias (data AAAA-MM-DD, valor), rotulosDias, rotulosMeses, formatarData"],
            ["GraficoDeVelas", "Abertura, máxima, mínima, fechamento", "velas (rotulo, abertura, maxima, minima, fechamento), rotulos"],
            ["Pizza", "Até 4 partes de um todo", "partes (rotulo, valor, neutro), formatarQuantidade, tamanho"],
            ["Waffle", "Proporção em 100 quadrados", "partes (rotulo, valor, neutro), nota"],
            ["Piramide", "Dois grupos por faixa", "faixas, esquerda (rotulo, valores), direita, maximo"],
            ["Dispersao", "Duas medidas por item", "pontos (x, y, rotulo, destaque), eixoX, eixoY, tendencia"],
            ["MatrizDeCorrelacao", "Quais medidas andam juntas", "variaveis, valores (−1 a 1), destaque"],
            ["Radar", "Perfil em várias medidas", "eixos, series (rotulo, valores, destaque), maximo, niveis"],
            ["CoordenadasParalelas", "Muitos itens, várias escalas", "eixos (rotulo, formatar, min, max), itens (rotulo, valores, destaque)"],
            ["Sankey", "Fluxos entre etapas", "nos (id, rotulo, coluna, neutro), ligacoes (de, para, valor, destaque)"],
            ["RedeDeConexoes", "O que se liga com o quê", "nos (id, rotulo, valor, destaque), ligacoes (de, para, valor)"],
            ["Histograma", "Como uma medida se espalha", "valores, faixas, destaque, referencia, eixoX"],
            ["BoxPlot", "Distribuição por grupo, compacta", "grupos (rotulo, valores, destaque), eixo, rotulos"],
            ["Violino", "Distribuição por grupo, com a forma", "grupos (rotulo, valores, destaque), eixo, rotulos"],
            ["Densidade", "Forma de 2 ou 3 distribuições", "series (rotulo, valores, destaque), eixoX"],
            ["MapaDePontos", "Onde as coisas estão (esquemático)", "regioes, colunas, linhas, pontos (rotulo, x, y, tipo, destaque), tipos"],
            ["MapaDeBolhas", "Quantidade por lugar (esquemático)", "regioes, colunas, linhas, bolhas (rotulo, x, y, valor, destaque), rotuloTamanho"],
          ].map(l => [<code key="c" className="font-mono text-body-sm">{l[0]}</code>, l[1], l[2]])}
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
        <GradeDeCards className="gap-4 lg:grid-cols-2">
          <Callout title="Checklist">
            <ul className="list-disc space-y-1 pl-5">
              <li>Todo gráfico tem título com a conclusão e um nome acessível (role="img" com aria-label que resume os dados). O mapa de calor em matriz é uma tabela de verdade.</li>
              <li>Ver dados abre uma tabela com os números: é o detalhamento e a alternativa para leitores de tela.</li>
              <li>Valores e nomes escritos junto das marcas; a legenda é apoio, nunca a única forma de leitura.</li>
              <li>Destaque também pela espessura, pelo peso do texto ou por um contorno, não só pela cor.</li>
              <li>Nenhum texto sobre a cor do gráfico: valores e rótulos ficam fora da marca, sempre na mesma cor de texto. Nos mapas de calor, o destaque vai contornado e dito numa frase.</li>
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
        </GradeDeCards>
      </section>
    </div>
  );
}

/* Peças de 28/11/2026 (shared/LacunasDocs): a mesma documentação nos dois design systems. */
export function GraficosShowcase() {
  return (
    <>
      <GraficosShowcaseBase />
      {(
        <div className="mt-20 space-y-20">
        <SecaoBarrasEFunil />
        </div>
      )}
    </>
  );
}
