import React, { useState } from "react";
import { TokenTable, type TokenGroup } from "./shared/TokenTable";
import { useI18n } from "../../i18n";
import { VejaEm } from "./shared/VejaEm";
import {
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  Store, Shirt, ChevronUp, ChevronDown,
  ChevronsUpDown, ExternalLink, MoreHorizontal, Filter, Download,
  Eye, Heart, MessageCircle, Search, Send, Ban, Trash2, ScanSearch, MapPinned, FileText, PhoneCall, Sparkle,
  PauseCircle, RefreshCw, MapPin, CircleDashed, ListTree,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { CardIndicador, GraficoDeDesempenho, AnelDePontuacao, ItemDeChecklist, PainelDeUso, CardDeUso, CardDoPainel, FaixaDeEstado, LinkVerTudo, ProgressoRotulado, ResumoEmLinha } from "../ui/painel-dados";
import { Rosca, BarrasHorizontais, MapaCoropletico } from "../ui/graficos";
import { TabelaDeProdutos, CelulaDeProduto, MedidorDeDesempenho, BarraDeAcoesEmLote } from "../ui/painel-produtos";
import { produtosExemplo, dadosDesempenho, contagensExemplo } from "./PainelTemplates";
import { SectionHeader } from "./shared/SectionHeader";
import { RegraDasLinhas } from "./shared/RegraDasLinhas";
import { GradeDeCards } from "../ui/grade-de-cards";

function ShowcaseCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      {children}
    </div>
  );
}


function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h3 className="text-label font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-5">{title}</h3>
      {children}
    </div>
  );
}

/* ── Metric data ── */
const kpis = [
  {
    label: "Total Revenue", pt: "Buscas no mês",
    value: "12.480",
    delta: "+18,2%",
    trend: "up",
    icon: Search,
    sparkData: [42, 55, 48, 70, 63, 88, 75, 92, 110, 98, 125, 140],
  },
  {
    label: "Active Users", pt: "Lojas participantes",
    value: "86",
    delta: "+12,5%",
    trend: "up",
    icon: Store,
    sparkData: [30, 45, 38, 50, 55, 48, 62, 58, 72, 68, 80, 85],
  },
  {
    label: "Conversion Rate", pt: "Peças publicadas",
    value: "3.870",
    delta: "-0,4%",
    trend: "down",
    icon: Shirt,
    sparkData: [5, 4.2, 4.8, 4.5, 3.9, 4.1, 3.8, 4.0, 3.6, 3.8, 3.9, 3.87],
  },
  {
    label: "Avg. Order Value", pt: "Visualizações de peças",
    value: "42.850",
    delta: "+6,1%",
    trend: "up",
    icon: Eye,
    sparkData: [240, 255, 260, 248, 270, 265, 280, 272, 290, 285, 295, 298],
  },
];

const areaMonthsPt = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const barDaysPt = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const areaDataBase = [
  { month: "Jan", revenue: 42000, users: 2400 },
  { month: "Feb", revenue: 55000, users: 3200 },
  { month: "Mar", revenue: 48000, users: 2900 },
  { month: "Apr", revenue: 70000, users: 4100 },
  { month: "May", revenue: 63000, users: 3800 },
  { month: "Jun", revenue: 88000, users: 5200 },
  { month: "Jul", revenue: 75000, users: 4500 },
  { month: "Aug", revenue: 92000, users: 5600 },
  { month: "Sep", revenue: 110000, users: 6800 },
  { month: "Oct", revenue: 98000, users: 6100 },
  { month: "Nov", revenue: 125000, users: 7800 },
  { month: "Dec", revenue: 140000, users: 8900 },
];

const barDataBase = [
  { name: "Mon", value: 400 }, { name: "Tue", value: 640 }, { name: "Wed", value: 520 },
  { name: "Thu", value: 780 }, { name: "Fri", value: 890 }, { name: "Sat", value: 320 },
  { name: "Sun", value: 210 },
];

const pieData = [
  { name: "Organic", pt: "Orgânico", value: 42 },
  { name: "Paid", pt: "Pago", value: 28 },
  { name: "Social", pt: "Social", value: 18 },
  { name: "Email", pt: "E-mail", value: 12 },
];

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"];

/* ── Table data ── */
/* Dados de exemplo (lojas fictícias) */
const tableData = [
  { id: "LOJ-001", name: "Brechó Aurora",  email: "contato@aurora.exemplo.com.br",    plan: "Brechó", status: "Active",   mrr: "214", joined: "12 jan 2026", joinedPt: "12 jan 2026" },
  { id: "LOJ-002", name: "Ateliê Lume",    email: "ola@lume.exemplo.com.br",          plan: "Ateliê", status: "Active",   mrr: "58",  joined: "3 mar 2026",  joinedPt: "3 mar 2026" },
  { id: "LOJ-003", name: "Casa Trama",     email: "atendimento@trama.exemplo.com.br", plan: "Loja",   status: "Inactive", mrr: "0",   joined: "18 fev 2026", joinedPt: "18 fev 2026" },
  { id: "LOJ-004", name: "Garimpo Sol",    email: "garimpo@sol.exemplo.com.br",       plan: "Brechó", status: "Active",   mrr: "391", joined: "5 dez 2025",  joinedPt: "5 dez 2025" },
  { id: "LOJ-005", name: "Marca Vértice",  email: "loja@vertice.exemplo.com.br",      plan: "Marca",  status: "Trial",    mrr: "12",  joined: "22 abr 2026", joinedPt: "22 abr 2026" },
];

const statusStyles: Record<string, string> = {
  Active:   "bg-success/10 text-success border-success/20",
  Inactive: "bg-muted text-muted-foreground border-border",
  Trial:    "bg-[var(--warning-muted)] text-warning-text border-warning/20",
};

const planStyles: Record<string, string> = {
  "Brechó": "bg-primary/10 text-[var(--primary-text)] border-primary/20",
  "Ateliê": "bg-info/10 text-info border-info/20",
  "Loja":   "bg-muted text-foreground border-border",
  "Marca":  "bg-muted text-muted-foreground border-border",
};

type SortDir = "asc" | "desc" | null;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-md px-3 py-2 text-body-sm shadow-lg">
        <p className="font-medium text-foreground mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="font-medium">
            {p.name}: {typeof p.value === "number" ? p.value.toLocaleString("pt-BR") : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/* ── Rótulo de variante, código e regras de uso (componentes do painel) ── */
function DemoLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-label font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-3">{children}</p>;
}


const seriesDesempenho = [
  { chave: "visualizacoes", rotulo: "Visualizações", cor: "var(--chart-1)" },
  { chave: "favoritos", rotulo: "Favoritos", cor: "var(--chart-2)" },
  { chave: "contatos", rotulo: "Contatos", cor: "var(--chart-3)" },
];






const itensChecklist: { estado: "ok" | "atencao"; texto: string }[] = [
  { estado: "ok", texto: "Fotos com boa qualidade" },
  { estado: "ok", texto: "Endereço e horário da loja preenchidos" },
  { estado: "atencao", texto: "2 peças sem tamanho informado" },
  { estado: "atencao", texto: "Responder mensagens em até 24 horas" },
  { estado: "ok", texto: "Preços revisados neste mês" },
];

export function DataShowcase() {
  const { t } = useI18n();
  const dataTokenGroups = getDataTokenGroups(t);
  const areaData = areaDataBase.map((d, i) => ({ ...d, month: t(d.month, areaMonthsPt[i]) }));
  const barData = barDataBase.map((d, i) => ({ ...d, name: t(d.name, barDaysPt[i]) }));
  const statusPt: Record<string, string> = { Active: "Ativa", Inactive: "Inativa", Trial: "Em cadastro" };
  const planPt: Record<string, string> = { "Brechó": "Brechó", "Ateliê": "Ateliê", "Loja": "Loja", "Marca": "Marca" };
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [selecaoExemplo, setSelecaoExemplo] = useState(2);

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortDir(d => d === "asc" ? "desc" : d === "desc" ? null : "asc");
      if (sortDir === "desc") setSortCol(null);
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ col }: { col: string }) => {
    if (sortCol !== col) return <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground/40" />;
    return sortDir === "asc"
      ? <ChevronUp className="h-3.5 w-3.5 text-primary" />
      : <ChevronDown className="h-3.5 w-3.5 text-primary" />;
  };

  return (
    <div className="space-y-16">

      {/* ── KPI CARDS ── */}
      <section id="kpi-cards">
        <SectionHeader title={t("KPI Cards", "Cards de KPI")} description={t("Key performance indicators with trend indicators and sparkline charts.", "Indicadores-chave de desempenho com indicadores de tendência e gráficos sparkline.")} />
        <VejaEm secao="cards" ancora="card-ia" titulo={t("KPI cards moved to Cards", "Os cards de KPI agora ficam em Cards")} texto={t("They are a card pattern (metric with chart): see them in Cards › Information architecture.", "São um padrão de card (métrica com gráfico): veja em Cards › Arquitetura de informação.")} />
      </section>


      {/* ── INDICADOR DO PAINEL ── */}
      <section id="kpi-painel">
        <SectionHeader title="Indicador do painel" description="Card de KPI do painel da loja: mesma anatomia dos Cards de KPI, sem o gráfico, com explicação opcional do termo." />
        <VejaEm secao="cards" ancora="card-ia" titulo="O indicador do painel agora fica em Cards" texto="É um padrão de card (métrica com explicação): veja em Cards › Arquitetura de informação." />
      </section>

      {/* ── CHARTS ── */}
      <section id="charts">
        <SectionHeader title={t("Charts", "Gráficos")} description={t("Minimal analytics charts using thin strokes and tones of the primary pink.", "Gráficos de analytics minimalistas, com traços finos e tons do pink primário.")} />
        <div className="mb-4">
          <VejaEm secao="graficos" titulo="Mais gráficos, cores e o card de descoberta" texto="A rosca redesenhada, os 10 gráficos recomendados para a inteligência e a regra de cor ficam em Gráficos e visualizações." rotuloBotao="Ver em Gráficos" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Area Chart */}
          <ShowcaseCard className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-body font-semibold text-foreground">{t("Search overview", "Visão geral das buscas")}</h3>
                <p className="text-body-sm text-muted-foreground">{t("Monthly item views and searches (example data)", "Visualizações de peças e buscas por mês (dados de exemplo)")}</p>
              </div>
              <div className="flex items-center gap-4 text-label text-muted-foreground">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-chart-1 inline-block" />{t("Views", "Visualizações")}</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-chart-6 inline-block" />{t("Searches", "Buscas")}</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-6)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--chart-6)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000} mil`} />
                <RechartTooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="var(--chart-1)" strokeWidth={1.5} fill="url(#gradRevenue)" name={t("Views", "Visualizações")} />
                <Area type="monotone" dataKey="users" stroke="var(--chart-6)" strokeWidth={1.5} fill="url(#gradUsers)" name={t("Searches", "Buscas")} />
              </AreaChart>
            </ResponsiveContainer>
          </ShowcaseCard>

          {/* Pie Chart */}
          <ShowcaseCard>
            <div className="mb-4">
              <h3 className="text-body font-semibold text-foreground">{t("How people arrive", "Como as pessoas chegam")}</h3>
              <p className="text-body-sm text-muted-foreground">{t("Share by source", "Participação por origem")}</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={72} dataKey="value" strokeWidth={0}>
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="w-full space-y-2">
                {pieData.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between text-body-sm">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full inline-block" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-foreground">{t(item.name, item.pt)}</span>
                    </span>
                    <span className="font-semibold text-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </ShowcaseCard>
        </div>

        {/* Bar Chart */}
        <ShowcaseCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-body font-semibold text-foreground">{t("Searches by weekday", "Buscas por dia da semana")}</h3>
              <p className="text-body-sm text-muted-foreground">{t("Average searches per day (example data)", "Média de buscas por dia (dados de exemplo)")}</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={barData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <RechartTooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted)", radius: 4 }} />
              <Bar dataKey="value" fill="var(--chart-1)" radius={[4, 4, 0, 0]} name={t("Searches", "Buscas")} />
            </BarChart>
          </ResponsiveContainer>
        </ShowcaseCard>
      </section>


      {/* ── GRÁFICO DE DESEMPENHO ── */}
      <section id="grafico-desempenho">
        <SectionHeader title="Gráfico de desempenho" description="Gráfico de área do painel da loja, com legenda que liga e desliga cada série e destaque do valor mais recente." />
        <ShowcaseCard>
          <div className="mb-4">
            <h3 className="text-body font-semibold text-foreground">Desempenho da descoberta</h3>
            <p className="text-body-sm text-muted-foreground">Visualizações, favoritos e contatos nos últimos 30 dias</p>
          </div>
          <GraficoDeDesempenho dados={dadosDesempenho} chaveX="dia" series={seriesDesempenho} visiveisIniciais={["visualizacoes"]} altura={240} />
        </ShowcaseCard>
      </section>

      {/* ── PARTICIPAÇÃO E COMPARAÇÃO (19/11/2026) ── */}
      <section id="grafico-participacao">
        <SectionHeader title="Rosca, barras horizontais e mapa" description="Rosca para as partes de um todo; barras horizontais para comparar grupos, simples ou empilhadas. Cor pela paleta de gráficos (--chart-1 a --chart-7), fixa por categoria e em ordem de importância (o principal no tom 1, Outros em --chart-neutral); valor sempre escrito; 2 px entre as partes; dica ao passar o mouse; os rótulos quebram de linha, sem rolagem para o lado. Com menos movimento, aparecem prontas. Dados de exemplo." />
        <GradeDeCards className="gap-4 lg:grid-cols-2">
          <ShowcaseCard>
            <h3 className="mb-1 text-body font-semibold text-foreground">Rosca</h3>
            <p className="mb-4 text-body-sm text-muted-foreground">Tipos de loja de um bairro (exemplo)</p>
            <Rosca
              rotulo="Tipos de loja (exemplo)"
              centro="3"
              rotuloCentro="tipos de loja"
              partes={[
                { rotulo: "Loja multimarcas", valor: 54, cor: "var(--chart-1)" },
                { rotulo: "Brechó", valor: 27, cor: "var(--chart-2)" },
                { rotulo: "Ateliê", valor: 17, cor: "var(--chart-3)" },
                { rotulo: "Outros", valor: 2, cor: "var(--chart-neutral)" },
              ]}
            />
          </ShowcaseCard>
          <ShowcaseCard>
            <h3 className="mb-1 text-body font-semibold text-foreground">Barras simples</h3>
            <p className="mb-4 text-body-sm text-muted-foreground">Comparação de uma medida (exemplo); use maximo=100 para porcentagens</p>
            <BarrasHorizontais
              rotulo="Parte das lojas com a característica (exemplo)"
              maximo={100}
              linhas={[
                { rotulo: "Na região", texto: "88%", partes: [{ rotulo: "Na região", valor: 88, cor: "var(--chart-1)" }] },
                { rotulo: "Na cidade", texto: "18%", partes: [{ rotulo: "Na cidade", valor: 18, cor: "var(--chart-6)" }] },
              ]}
            />
          </ShowcaseCard>
        </GradeDeCards>
        <ShowcaseCard className="mt-4">
          <h3 className="mb-1 text-body font-semibold text-foreground">Barras empilhadas</h3>
          <p className="mb-4 text-body-sm text-muted-foreground">Tipos de loja por região (exemplo), com legenda</p>
          <BarrasHorizontais
            rotulo="Tipos de loja por região (exemplo)"
            legenda={[{ rotulo: "Loja multimarcas", cor: "var(--chart-1)" }, { rotulo: "Brechó", cor: "var(--chart-2)" }, { rotulo: "Outros", cor: "var(--chart-6)" }]}
            linhas={[
              { rotulo: "Região A", texto: "14 lojas", partes: [{ rotulo: "Loja multimarcas", valor: 12, cor: "var(--chart-1)" }, { rotulo: "Brechó", valor: 2, cor: "var(--chart-2)" }] },
              { rotulo: "Região B", texto: "12 lojas", partes: [{ rotulo: "Loja multimarcas", valor: 3, cor: "var(--chart-1)" }, { rotulo: "Brechó", valor: 9, cor: "var(--chart-2)" }] },
              { rotulo: "Região C", texto: "8 lojas", partes: [{ rotulo: "Loja multimarcas", valor: 1, cor: "var(--chart-1)" }, { rotulo: "Outros", valor: 7, cor: "var(--chart-6)" }] },
            ]}
          />
        </ShowcaseCard>
        <ShowcaseCard className="mt-4">
          <h3 className="mb-1 text-body font-semibold text-foreground">Mapa coroplético</h3>
          <p className="mb-4 text-body-sm text-muted-foreground">Regiões pintadas por um valor, do claro ao escuro; toque numa região para escolher. As formas vêm do produto (no FindLook, os bairros de Curitiba). Formas e números de exemplo.</p>
          <MapaDeExemplo />
        </ShowcaseCard>
      </section>

      {/* ── GRÁFICO DE ANEL ── */}
      <section id="grafico-anel">
        <SectionHeader title="Gráfico de anel" description="Pontuação de 0 a 100 em anel, com o número e a faixa escritos no centro: Bom, Regular ou Precisa melhorar." />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-4">
          {[{ v: 85, faixa: "80 a 100" }, { v: 62, faixa: "50 a 79" }, { v: 34, faixa: "Abaixo de 50" }].map(x => (
            <ShowcaseCard key={x.v} className="flex flex-col items-center gap-3 text-center">
              <AnelDePontuacao valor={x.v} tamanho={128} />
              <p className="text-body-sm text-muted-foreground">{x.faixa}</p>
            </ShowcaseCard>
          ))}
        </div>
        <ShowcaseCard>
          <div className="mb-4">
            <h3 className="text-body font-semibold text-foreground">Saúde do catálogo</h3>
            <p className="text-body-sm text-muted-foreground">Em uso: o anel ao lado da lista do que falta melhorar</p>
          </div>
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <AnelDePontuacao valor={85} tamanho={128} />
            <ul className="w-full min-w-0 flex-1 space-y-1">
              {itensChecklist.map(i => <ItemDeChecklist key={i.texto} estado={i.estado} texto={i.texto} />)}
            </ul>
          </div>
        </ShowcaseCard>
      </section>

      {/* ── TABLE ── */}
      <section id="table">
        <SectionHeader title={t("Data Table", "Tabela de dados")} description={t("Clean, sortable data table with status badges and action menus.", "Tabela de dados limpa e ordenável, com badges de status e menus de ações.")} />
        <ShowcaseCard className="p-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div>
              <h3 className="text-body font-semibold text-foreground">{t("Stores", "Lojas")}</h3>
              <p className="text-body-sm text-muted-foreground">{tableData.length} {t("stores in total (example data)", "lojas no total (dados de exemplo)")}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1 h-9 px-3 text-body-sm font-medium text-muted-foreground rounded-sm border border-border bg-card hover:bg-accent transition-colors">
                <Filter className="h-4 w-4" /> {t("Filter", "Filtrar")}
              </button>
              <button className="inline-flex items-center gap-1 h-9 px-3 text-body-sm font-medium text-muted-foreground rounded-sm border border-border bg-card hover:bg-accent transition-colors">
                <Download className="h-4 w-4" /> {t("Export", "Exportar")}
              </button>
            </div>
          </div>
          {/* Sem rolagem horizontal: as colunas menos importantes somem quando falta espaço. */}
          <div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {[
                    { key: "name",   label: t("Store", "Loja"), classe: "" },
                    { key: "plan",   label: t("Type", "Tipo"), classe: "hidden md:table-cell" },
                    { key: "status", label: t("Status", "Situação"), classe: "" },
                    { key: "mrr",    label: t("Items", "Peças"), classe: "hidden sm:table-cell" },
                    { key: "joined", label: t("Since", "Desde"), classe: "hidden lg:table-cell" },
                  ].map(col => (
                    <th
                      key={col.key}
                      className={`${col.classe} px-3 sm:px-6 py-3 text-left text-label font-semibold uppercase tracking-[0.06em] text-muted-foreground cursor-pointer select-none`}
                      onClick={() => handleSort(col.key)}
                    >
                      <span className="inline-flex items-center gap-1">
                        {col.label}
                        <SortIcon col={col.key} />
                      </span>
                    </th>
                  ))}
                  <th className="px-3 sm:px-6 py-3 w-12" />
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`border-b border-border/50 hover:bg-row-hover transition-colors ${i === tableData.length - 1 ? "border-b-0" : ""}`}
                  >
                    <td className="w-full max-w-0 px-3 sm:px-6 py-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-label font-semibold text-foreground shrink-0">
                          {row.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-body-sm font-medium text-foreground">{row.name}</div>
                          <div className="truncate text-label text-muted-foreground">{row.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-3 sm:px-6 py-4">
                      <span className={`inline-flex items-center whitespace-nowrap px-2 py-1 rounded-sm text-label font-medium border ${planStyles[row.plan]}`}>
                        {planPt[row.plan] && t(row.plan, planPt[row.plan])}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <span className={`inline-flex items-center whitespace-nowrap px-2 py-1 rounded-sm text-label font-medium border ${statusStyles[row.status]}`}>
                        <span className={`h-1.5 w-1.5 rounded-full mr-1 ${row.status === "Active" ? "bg-success" : row.status === "Trial" ? "bg-warning" : "bg-muted-foreground"}`} />
                        {t(row.status, statusPt[row.status])}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell px-3 sm:px-6 py-4 text-body-sm font-semibold text-foreground">{row.mrr}</td>
                    <td className="hidden lg:table-cell whitespace-nowrap px-3 sm:px-6 py-4 text-body-sm text-muted-foreground">{t(row.joined, row.joinedPt)}</td>
                    <td className="px-3 sm:px-6 py-4">
                      <button className="h-8 w-8 rounded-sm flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/10">
            <span className="text-body-sm text-muted-foreground">{t("Showing", "Exibindo")} 1–{tableData.length} {t("of", "de")} {tableData.length}</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map(p => (
                <button key={p} className={`h-8 w-8 rounded-sm text-body-sm font-medium transition-colors ${p === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </ShowcaseCard>
      </section>


      {/* ── LINHAS COM TAGS E AÇÕES (regras da dona do produto, 24/11/2026) ── */}
      <section id="linhas-colunas" className="scroll-mt-32">
        <SectionHeader
          title={t("Rows with tags and actions", "Linhas com tags e ações")}
          description={t(
            "Lists, tables, grids and card lists: the text never goes past the tags or actions column, and the row hover covers the whole row, square.",
            "Listas, tabelas, grades e listas de cards: o texto nunca ultrapassa a coluna de tags ou ações, e o hover cobre a linha inteira, sem cantos.",
          )}
        />
        <RegraDasLinhas />
      </section>

      {/* ── TABELA DE PRODUTOS ── */}
      <section id="tabela-produtos">
        <SectionHeader title="Tabela de produtos" description="Tabela do painel da loja, no mesmo desenho da Tabela de dados, com abas por status, busca, seleção com ações em lote e menu por linha." />
        <TabelaDeProdutos titulo="Produtos" produtos={produtosExemplo} total={137} contagens={contagensExemplo} limite={5} />
      </section>

      {/* ── Tokens ── */}
      <section id="data-tokens" className="space-y-5">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-h3 font-semibold tracking-[-0.02em] text-foreground">Tokens</h2>
          <p className="text-body-sm text-muted-foreground mt-1">{t("CSS custom properties used by data display components.", "CSS custom properties usadas por componentes de exibição de dados.")}</p>
        </div>
        <TokenTable groups={dataTokenGroups} />
      </section>
    </div>
  );
}

function getDataTokenGroups(t: (en: string, pt: string) => string): TokenGroup[] {
  return [
  {
    group: t("Chart Palette", "Paleta de gráficos"),
    tokens: [
      { name: "--chart-1", description: t("Tone 1 of the FindLook chart palette — highlight: the main data point", "Tom 1 da paleta de gráficos da FindLook — destaque: o dado principal"), light: "#FC0256", dark: "#FC0256", isColor: true },
      { name: "--chart-2", description: t("Tone 2 of the FindLook chart palette — highlight", "Tom 2 da paleta de gráficos da FindLook — destaque"), light: "#FF6F95", dark: "#FF6F95", isColor: true },
      { name: "--chart-3", description: t("Tone 3 of the FindLook chart palette — support and transition", "Tom 3 da paleta de gráficos da FindLook — apoio e transição"), light: "#F9B5BF", dark: "#F9B5BF", isColor: true },
      { name: "--chart-4", description: t("Tone 4 of the FindLook chart palette — support and transition", "Tom 4 da paleta de gráficos da FindLook — apoio e transição"), light: "#E2919E", dark: "#E2919E", isColor: true },
      { name: "--chart-5", description: t("Tone 5 of the FindLook chart palette — support and transition", "Tom 5 da paleta de gráficos da FindLook — apoio e transição"), light: "#C29AA0", dark: "#C29AA0", isColor: true },
      { name: "--chart-6", description: t("Tone 6 of the FindLook chart palette — context", "Tom 6 da paleta de gráficos da FindLook — contexto"), light: "#D4D4D4", dark: "#D4D4D4", isColor: true },
      { name: "--chart-7", description: t("Tone 7 of the FindLook chart palette — context; same as --chart-neutral", "Tom 7 da paleta de gráficos da FindLook — contexto; igual a --chart-neutral"), light: "#EBEBEB", dark: "#EBEBEB", isColor: true },
      { name: "--chart-neutral", description: t("Other and information with no highlight (tone 7)", "Outros e informação sem destaque (tom 7)"), light: "#EBEBEB", dark: "#EBEBEB", isColor: true },
      { name: "--chart-grid", description: t("Chart grid lines", "Linhas de grade dos gráficos"), light: "#E9E9EC", dark: "#2C2C33", isColor: true },
    ],
  },
  {
    group: t("Card & Table Surface", "Superfície de card e tabela"),
    tokens: [
      { name: "--card",             description: t("Card / table background", "Fundo de card / tabela"),    light: "#FFFFFF",              dark: "rgba(25,25,28,0.75)", isColor: true },
      { name: "--card-foreground",  description: t("Primary text on card", "Texto principal no card"),       light: "#19191C",              dark: "#F6F6F7",             isColor: true },
      { name: "--muted",            description: t("Row hover / stripe", "Hover / zebra de linha"),         light: "#E9E9EC",              dark: "rgba(44,44,51,0.60)", isColor: true },
      { name: "--muted-foreground", description: t("Secondary cell text", "Texto secundário da célula"),        light: "#888896",              dark: "#B3B3BC",             isColor: true },
      { name: "--border",           description: t("Table dividers", "Divisores da tabela"),             light: "rgba(25,25,28,0.09)",  dark: "rgba(255,255,255,0.07)", isColor: true },
    ],
  },
  {
    group: t("KPI Semantic", "Semântica de KPI"),
    tokens: [
      { name: "--success",  description: t("Positive delta / up trend", "Variação positiva / tendência de alta"),  light: "#31835D", dark: "#41B47F", isColor: true },
      { name: "--error",    description: t("Negative delta / down trend", "Variação negativa / tendência de queda"), light: "#FC0256", dark: "#FC0256", isColor: true },
      { name: "--warning",  description: t("Caution / neutral trend", "Atenção / tendência neutra"),    light: "#F0B135", dark: "#F0B135", isColor: true },
      { name: "--primary",  description: t("Highlighted KPI accent", "Acento de KPI em destaque"),     light: "#E8004E", dark: "#E8004E", isColor: true },
    ],
  },
  {
    group: t("Elevation", "Elevação"),
    tokens: [
      { name: "--shadow-xs", description: t("Card micro-shadow", "Microssombra do card"),    light: "0 1px 2px …" },
      { name: "--shadow-sm", description: t("Table elevation", "Elevação da tabela"),      light: "0 1px 3px …" },
      { name: "--shadow",    description: t("Chart container lift", "Elevação do container de gráfico"), light: "0 2px 6px …" },
    ],
  },
];
}

/** Cards de KPI: métrica, ícone, minigráfico e tendência (usados na página Cards). */
export function CardsDeKpi() {
  const { t } = useI18n();
  // CardIndicador do DS com o minigráfico (antes, montado à mão)
  const numero = (v: string) => Number(v.replace(/\./g, "").replace(",", "."));
  return (
    <GradeDeCards className="sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <CardIndicador
            key={kpi.label}
            icone={<Icon />}
            valor={numero(kpi.value)}
            rotulo={t(kpi.label, kpi.pt)}
            variacao={numero(kpi.delta.replace("%", "").replace("+", ""))}
            comparacao={t("vs last month", "vs. mês passado")}
            grafico={
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={kpi.sparkData.map((v, i) => ({ v, i }))}>
                  <Line type="monotone" dataKey="v" stroke={kpi.trend === "up" ? "var(--chart-1)" : "var(--chart-6)"} strokeWidth={1.5} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            }
          />
        );
      })}
    </GradeDeCards>
  );
}

/** Indicadores do painel da loja (CardIndicador), usados na página Cards. */
export function IndicadoresDoPainel() {
  return (
    <GradeDeCards className="sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <CardIndicador icone={<Eye />} valor={1284} rotulo="Visualizações" variacao={18.6} comparacao="vs. 30 dias" />
      <CardIndicador icone={<Heart />} valor={24} rotulo="Favoritos" variacao={33.3} comparacao="vs. 30 dias" />
      <CardIndicador icone={<ScanSearch />} valor={8} rotulo="Buscas compatíveis" explicacao="Buscas feitas por pessoas da sua região que combinam com peças da sua loja." />
      <CardIndicador icone={<MapPinned />} valor={48} total={75} rotulo="Bairros pesquisados" explicacao="Bairros de Curitiba que a busca de lojas já pesquisou. Com a propriedade total, o número aparece com o total de que faz parte." />
      <CardIndicador icone={<MessageCircle />} valor={6} rotulo="Contatos e reservas" variacao={-4} comparacao="vs. 30 dias" />
    </GradeDeCards>
  );
}

/** Uso com limite (PainelDeUso + CardDeUso), usado na página Cards. Números de exemplo. */
export function UsoComLimite() {
  return (
    <div className="@container space-y-4">
      <PainelDeUso
        icone={<MapPinned />}
        sobretitulo="Uso da API do Google Places"
        titulo="Consulta de lugares"
        descricao="Limites mensais do plano atual."
        usado={7153}
        limite={10000}
        unidade="consultas"
        selo={{ titulo: "Limite gratuito", texto: "Incluído no plano atual" }}
      />
      <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2 @6xl:grid-cols-4">
        <CardDeUso icone={<MapPinned />} rotulo="Endereço e localização" usado={7153} limite={10000} />
        <CardDeUso icone={<FileText />} rotulo="Nome e situação do lugar" usado={4726} limite={5000} />
        <CardDeUso icone={<PhoneCall />} rotulo="Nota, telefone, site e horário" usado={939} limite={1000} />
        <CardDeUso icone={<Sparkle />} rotulo="Classificação pela IA" usado={1014} limite={3000} />
      </div>
      <PainelDeUso
        icone={<MapPinned />}
        sobretitulo="Uso da API do Google Places"
        titulo="Consulta de lugares"
        usado={10000}
        limite={10000}
        unidade="consultas"
        selo={{ titulo: "Passou do limite gratuito", texto: "Pode haver cobrança neste mês.", tom: "alerta" }}
      />
    </div>
  );
}

/** Andamento de uma tarefa longa (FaixaDeEstado + ProgressoRotulado + ResumoEmLinha), usado na página Cards. Números de exemplo. */
export function AndamentoDeTarefa() {
  return (
    <div className="@container max-w-3xl">
      <CardDoPainel
        icone={<Search />}
        titulo="Busca de lojas"
        descricao="Coleta de lojas no Google por todos os bairros."
        acao={<Button size="sm" disabled><RefreshCw aria-hidden /> Buscar lojas agora</Button>}
      >
        <div className="space-y-5">
          <FaixaDeEstado
            estado={
              <span className="inline-flex h-7 items-center gap-1 rounded-full border border-border bg-muted px-2 text-label font-semibold text-foreground">
                <PauseCircle aria-hidden className="h-3.5 w-3.5 text-muted-foreground" /> Pausada
              </span>
            }
            titulo="Pausa por limite do Google"
            texto="A busca continua sozinha em 01/12/2026, de onde parou."
          />
          <ProgressoRotulado rotulo="Progresso da busca" pct={41.7} />
          <ResumoEmLinha
            itens={[
              { icone: <MapPin />, valor: "48 de 75", rotulo: "bairros pesquisados" },
              { icone: <Store />, valor: "3.329", rotulo: "lojas encontradas" },
              { icone: <CircleDashed />, valor: "27", rotulo: "bairros restantes" },
            ]}
          />
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border pt-4">
            <LinkVerTudo icone={<ListTree />} onClick={() => {}}>Ver resultados por bairro</LinkVerTudo>
            <LinkVerTudo tom="neutro" href="#card-andamento" className="ml-auto">Ver todas as buscas</LinkVerTudo>
          </div>
        </div>
      </CardDoPainel>
    </div>
  );
}

/** Exemplo do MapaCoropletico com uma grade de 3 x 3 regiões fictícias. */
function MapaDeExemplo() {
  const [escolhida, setEscolhida] = useState<string | null>(null);
  const regioes = Array.from({ length: 9 }, (_, i) => {
    const x = (i % 3) * 200, y = Math.floor(i / 3) * 140;
    return { nome: `Região ${i + 1}`, d: `M${x + 6} ${y + 6}h188v128h-188z`, cx: x + 40, cy: y + 70 };
  });
  const valores = new Map(regioes.map((r, i) => [r.nome, [0, 3, 8, 14, 22, 5, 1, 11, 30][i]!]));
  return (
    <div className="mx-auto max-w-md">
      <MapaCoropletico
        viewBox="0 0 600 420"
        regioes={regioes}
        valores={valores}
        rotulo="Mapa de exemplo com 9 regiões: quanto mais escuro, maior o valor."
        rotuloDoValor={(n) => `${n} lojas`}
        escolhida={escolhida}
        onEscolher={setEscolhida}
        marcadores={["Região 9"]}
        legenda={["Menos lojas", "Mais lojas"]}
      />
      <p aria-live="polite" className="mt-2 min-h-5 text-center text-body-sm text-muted-foreground">{escolhida ? `${escolhida}: ${valores.get(escolhida)} lojas` : "Toque numa região."}</p>
    </div>
  );
}
