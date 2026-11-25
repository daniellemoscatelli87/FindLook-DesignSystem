import * as React from "react";
import { Area, AreaChart, CartesianGrid, ReferenceDot, ResponsiveContainer, Tooltip as ReTooltip, XAxis, YAxis } from "recharts";
import { ArrowDownRight, ArrowRight, ArrowUpRight, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, ChevronRight as Seta, Info, TriangleAlert, X } from "lucide-react";
import { cn } from "./utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Progress } from "./progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";

/**
 * Dados do painel da loja (FindLook)
 *
 * Formatação pt-BR, card de indicador (KPI), gráfico de desempenho com legenda que liga e desliga
 * séries, item de atividade, item de ação (insight / próxima ação), lista de tendências,
 * item de checklist, anel de pontuação, carrossel de dicas, faixa de benefícios, uso com limite
 * (PainelDeUso, o destaque do topo, e CardDeUso, um card por tipo de uso) e andamento de uma tarefa
 * (FaixaDeEstado, ProgressoRotulado e ResumoEmLinha).
 */

const display = "font-[family-name:var(--font-display)]";
const foco = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/* ── Ícone com base (regra do DS, 20/11/2026: Ícones › Base do ícone) ── */
/**
 * marca: base rosa + ícone vermelho. O ícone principal do que é foco ou convida a agir (destaque do topo, insight,
 *        próxima ação, atividade, algo ativo ou em andamento).
 * neutro: base cinza + ícone cinza. O ícone só identifica o tipo de informação (cards de indicador e de uso, itens
 *        pausados, encerrados ou inativos, metadados). É o padrão em grades de cards iguais.
 * Ícone sem base (inline, ao lado do texto) não usa este componente.
 */
type TomDoIcone = "marca" | "neutro";
const TAMANHO_DA_BASE = { sm: "h-8 w-8 [&>svg]:h-4 [&>svg]:w-4", md: "h-9 w-9 [&>svg]:h-[18px] [&>svg]:w-[18px]", lg: "h-11 w-11 [&>svg]:h-5 [&>svg]:w-5" };
function IconeComBase({ tom, tamanho = "md", redonda = false, children, className }: { tom: TomDoIcone; tamanho?: keyof typeof TAMANHO_DA_BASE; redonda?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <span
      aria-hidden
      data-slot="icone-com-base"
      data-tom={tom}
      className={cn(
        "flex shrink-0 items-center justify-center",
        redonda ? "rounded-full" : "rounded-md",
        tom === "marca" ? "bg-[var(--primary-muted)] text-[var(--primary-text,var(--primary))]" : "bg-muted text-muted-foreground",
        TAMANHO_DA_BASE[tamanho],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ── Superfície dos cards ──
   Padrão "Só borda" do DS (card parado): borda de 1 px (border-border), fundo branco e nenhuma sombra em repouso.
   A dona do produto voltou a este padrão em 23/11/2026; sombra fica só no que abre por cima da tela. */
const superficieDoCard = "border border-border bg-card";

/* ── Formatação pt-BR ────────────────────────────────────────── */
const fmtNumero = new Intl.NumberFormat("pt-BR");
const fmtPreco = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
function formatarNumero(n: number) { return fmtNumero.format(n); }
function formatarPreco(n: number) { return fmtPreco.format(n).replace(/ /g, " "); }
/** +18,6% / −4% (sinal sempre visível; vírgula decimal). */
function formatarVariacao(n: number) {
  const abs = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(Math.abs(n));
  return `${n > 0 ? "+" : n < 0 ? "−" : ""}${abs}%`;
}

/* ── Variação (seta + texto; nunca só cor) ───────────────────── */
function Variacao({ valor, comparacao, className }: { valor: number; comparacao?: string; pilula?: boolean; className?: string }) {
  const sobe = valor >= 0;
  const Icone = sobe ? ArrowUpRight : ArrowDownRight;
  const leitura = `${sobe ? "Alta" : "Queda"} de ${formatarVariacao(Math.abs(valor)).replace("+", "")}${comparacao ? ` ${comparacao}` : ""}`;
  // Mesmo desenho da variação dos Cards de KPI: seta + número na cor da tendência, comparação em texto suave.
  return (
    <span className={cn("inline-flex items-center gap-1 text-[0.8125rem] font-semibold", sobe ? "text-success" : "text-primary-text", className)}>
      <Icone aria-hidden className="h-3.5 w-3.5" />
      <span aria-hidden>{formatarVariacao(valor)}</span>
      {comparacao && <span aria-hidden className="ml-1 font-normal text-muted-foreground">{comparacao}</span>}
      <span className="sr-only">{leitura}</span>
    </span>
  );
}

/* ── Explicação acessível (toque, teclado e mouse) ───────────── */
function Explicacao({ termo, children }: { termo: string; children: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger aria-label={`O que é ${termo}?`} className={cn("inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", foco)}>
        <Info aria-hidden className="h-3.5 w-3.5" />
      </PopoverTrigger>
      <PopoverContent className="w-64 text-[0.8125rem] leading-relaxed">{children}</PopoverContent>
    </Popover>
  );
}

/* ── Card de indicador (KPI) ─────────────────────────────────── */
type CardIndicadorProps = {
  icone: React.ReactNode;
  valor: number;
  /** Total de que o valor faz parte (por exemplo, 48 de 75 bairros): aparece "de 75", menor, ao lado do número. */
  total?: number;
  rotulo: string;
  variacao?: number;
  comparacao?: string;
  explicacao?: React.ReactNode;
  /** "linha": variação abaixo do rótulo; "pilula": variação no canto superior. */
  estilo?: "linha" | "pilula";
  className?: string;
};

/**
 * Mesma anatomia dos Cards de KPI do DS: rótulo, número, ícone em quadrado neutro à direita e variação embaixo.
 * Diagramação (21/11/2026, pedido da dona do produto): o ícone de explicação fica sempre colado à última palavra do rótulo
 * (não quebra sozinho para outra linha) e o número vai para a base do card, então numa linha de cards os números ficam
 * alinhados mesmo quando um rótulo ocupa duas linhas.
 */
function CardIndicador({ icone, valor, total, rotulo, variacao, comparacao, explicacao, className }: CardIndicadorProps) {
  const palavras = rotulo.split(" ");
  const ultima = palavras.pop() ?? "";
  return (
    <div data-slot="card-indicador" className={cn("flex flex-col gap-3 rounded-lg p-5", superficieDoCard, className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 pt-0.5 text-[0.8125rem] font-medium leading-snug text-muted-foreground">
          {palavras.length > 0 && `${palavras.join(" ")} `}
          <span className="whitespace-nowrap">
            {ultima}
            {explicacao && <span className="ml-0.5 inline-flex align-middle"><Explicacao termo={rotulo}>{explicacao}</Explicacao></span>}
          </span>
        </p>
        <IconeComBase tom="neutro">{icone}</IconeComBase>
      </div>
      <div className="mt-auto">
        <p className="text-[1.625rem] font-bold leading-none tracking-[-0.025em] text-foreground">
          {formatarNumero(valor)}
          {total !== undefined && <span className="ml-1.5 text-[0.9375rem] font-semibold tracking-normal text-muted-foreground">de {formatarNumero(total)}</span>}
        </p>
        {variacao !== undefined && <div className="mt-3"><Variacao valor={variacao} comparacao={comparacao} /></div>}
      </div>
    </div>
  );
}

/* ── Gráfico de desempenho ───────────────────────────────────── */
type Serie = { chave: string; rotulo: string; cor: string };

type GraficoDeDesempenhoProps = {
  dados: Record<string, string | number>[];
  chaveX: string;
  series: Serie[];
  /** Séries visíveis no início (padrão: todas). */
  visiveisIniciais?: string[];
  altura?: number;
  /** Destaca o último valor da primeira série visível. */
  destacarUltimo?: boolean;
  className?: string;
};

function GraficoDeDesempenho({ dados, chaveX, series, visiveisIniciais, altura = 220, destacarUltimo = true, className }: GraficoDeDesempenhoProps) {
  const [visiveis, setVisiveis] = React.useState<string[]>(visiveisIniciais ?? series.map(s => s.chave));
  const idBase = React.useId().replace(/:/g, "");
  const alternar = (chave: string) => setVisiveis(v => v.includes(chave) ? (v.length > 1 ? v.filter(c => c !== chave) : v) : [...v, chave]);
  const principal = series.find(s => visiveis.includes(s.chave));
  const ultimo = dados[dados.length - 1];
  const resumo = series.filter(s => visiveis.includes(s.chave)).map(s => `${s.rotulo}: ${formatarNumero(Number(ultimo?.[s.chave] ?? 0))}`).join("; ");

  return (
    <div data-slot="grafico-de-desempenho" className={cn("min-w-0", className)}>
      {series.length > 1 && (
        <div role="group" aria-label="Séries exibidas no gráfico" className="mb-3 flex flex-wrap gap-x-4 gap-y-1.5">
          {series.map(s => {
            const ativa = visiveis.includes(s.chave);
            return (
              <button key={s.chave} type="button" aria-pressed={ativa} onClick={() => alternar(s.chave)} className={cn("inline-flex items-center gap-1.5 rounded-sm py-0.5 text-[0.75rem] transition-opacity", ativa ? "text-foreground" : "text-muted-foreground opacity-60 hover:opacity-100", foco)}>
                <span aria-hidden className="inline-block h-2 w-2 rounded-full" style={{ background: s.cor }} />
                {s.rotulo}
              </button>
            );
          })}
        </div>
      )}
      <div role="img" aria-label={`Gráfico de área. Último dia, ${ultimo?.[chaveX]}: ${resumo}.`} style={{ height: altura }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dados} margin={{ top: 28, right: 12, left: -12, bottom: 0 }}>
            <defs>
              {series.map(s => (
                <linearGradient key={s.chave} id={`${idBase}-${s.chave}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={s.cor} stopOpacity={0.28} />
                  <stop offset="100%" stopColor={s.cor} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis dataKey={chaveX} tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} interval="preserveStartEnd" minTickGap={24} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickFormatter={(v: number) => formatarNumero(v)} width={52} domain={[0, (max: number) => Math.max(1, Math.ceil(max * 1.18))]} allowDecimals={false} />
            <ReTooltip
              cursor={{ stroke: "var(--border)" }}
              contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12, color: "var(--popover-foreground)" }}
              formatter={(v: number, nome: string) => [formatarNumero(v), series.find(s => s.chave === nome)?.rotulo ?? nome]}
            />
            {series.filter(s => visiveis.includes(s.chave)).map(s => (
              <Area key={s.chave} type="monotone" dataKey={s.chave} stroke={s.cor} strokeWidth={2.5} fill={`url(#${idBase}-${s.chave})`} isAnimationActive={false} />
            ))}
            {destacarUltimo && principal && ultimo && (
              <ReferenceDot
                x={ultimo[chaveX] as string}
                y={Number(ultimo[principal.chave])}
                r={5}
                fill="var(--card)"
                stroke={principal.cor}
                strokeWidth={2.5}
                label={({ viewBox }: { viewBox: { x: number; y: number } }) => {
                  const texto = formatarNumero(Number(ultimo[principal.chave]));
                  const w = texto.length * 7.5 + 16;
                  return (
                    <g>
                      <rect x={viewBox.x - w / 2} y={viewBox.y - 30} width={w} height={20} rx={6} fill={principal.cor} />
                      <text x={viewBox.x} y={viewBox.y - 16} textAnchor="middle" fill="var(--primary-foreground)" fontSize={12} fontWeight={700}>{texto}</text>
                    </g>
                  );
                }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ── Item de atividade ───────────────────────────────────────── */
/** Até duas iniciais do nome, sem palavras de ligação ("Loja da Ana" → "LA"; "Brechó" → "BR"). */
function iniciais(nome: string): string {
  const palavras = nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\p{L}\p{N} ]/gu, " ").split(/\s+/)
    .filter((p) => p && !/^(d[aeo]s?|e|&)$/i.test(p));
  if (palavras.length === 0) return "?";
  if (palavras.length === 1) return palavras[0]!.slice(0, 2).toUpperCase();
  return (palavras[0]![0]! + palavras[1]![0]!).toUpperCase();
}

/**
 * Item de atividade. icone: o ícone do tipo de evento; ou iniciais (o nome de quem aparece na lista), quando o título do
 * card já diz o tipo e o ícone repetido não ajuda a diferenciar os itens (pedido da dona do produto, 20/11/2026).
 */
function ItemDeAtividade({ icone, iniciaisDe, titulo, detalhe, quando, className }: { icone?: React.ReactNode; iniciaisDe?: string; titulo: string; detalhe?: string; quando: string; className?: string }) {
  return (
    <li data-slot="item-de-atividade" className={cn("flex items-start gap-3 py-3", className)}>
      <IconeComBase tom="marca" redonda className="[&>svg]:h-4 [&>svg]:w-4">
        {iniciaisDe !== undefined ? <span className={`${display} text-[0.75rem] font-bold leading-none tracking-[0.02em]`}>{iniciais(iniciaisDe)}</span> : icone}
      </IconeComBase>
      <div className="min-w-0 flex-1">
        <p className="text-[0.8125rem] font-semibold text-foreground">{titulo}</p>
        {detalhe && <p className="truncate text-[0.75rem] text-muted-foreground">{detalhe}</p>}
      </div>
      <span className="shrink-0 text-[0.75rem] text-muted-foreground">{quando}</span>
    </li>
  );
}

/* ── Item de ação (insight / próxima ação) ───────────────────── */
/** tom: "marca" (padrão) para o que convida a agir ou está ativo; "neutro" para o que está pausado, encerrado ou é só registro. */
function ItemDeAcao({ midia, titulo, descricao, href = "#", onClick, tom = "marca", className }: { midia: React.ReactNode; titulo: string; descricao?: string; href?: string; onClick?: React.MouseEventHandler<HTMLAnchorElement>; tom?: TomDoIcone; className?: string }) {
  return (
    <a
      data-slot="item-de-acao"
      href={href}
      onClick={onClick}
      className={cn("group flex items-center gap-3 rounded-md border border-border bg-card p-3 transition-[background-color,border-color,box-shadow] duration-150 hover:border-primary/30 hover:bg-[var(--primary-muted)] hover:shadow-[var(--shadow-xs)] active:scale-[0.995]", foco, className)}
    >
      <IconeComBase tom={tom} tamanho="lg">{midia}</IconeComBase>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.875rem] font-semibold text-foreground">{titulo}</span>
        {descricao && <span className="block text-[0.8125rem] text-muted-foreground">{descricao}</span>}
      </span>
      <Seta aria-hidden className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

/* ── Lista de tendências ─────────────────────────────────────── */
function ListaDeTendencias({ itens, className }: { itens: { termo: string; variacao: number }[]; className?: string }) {
  return (
    <ol data-slot="lista-de-tendencias" className={cn("divide-y divide-border rounded-md border border-border", className)}>
      {itens.map((it, i) => (
        <li key={it.termo} className="flex items-center gap-3 px-3 py-2.5">
          <span aria-hidden className="w-5 shrink-0 text-[0.75rem] font-bold text-muted-foreground">{i + 1}</span>
          <span className="min-w-0 flex-1 truncate text-[0.875rem] text-foreground">{it.termo}</span>
          <Variacao valor={it.variacao} pilula />
        </li>
      ))}
    </ol>
  );
}

/* ── Item de checklist ───────────────────────────────────────── */
function ItemDeChecklist({ estado, texto, href = "#", className }: { estado: "ok" | "atencao"; texto: string; href?: string; className?: string }) {
  const ok = estado === "ok";
  return (
    <li>
      <a data-slot="item-de-checklist" href={href} className={cn("flex items-center gap-2.5 rounded-md px-3 py-2.5 transition-colors hover:bg-row-hover", foco, className)}>
        {ok ? <CheckCircle2 aria-hidden className="h-4 w-4 shrink-0 text-success" /> : <TriangleAlert aria-hidden className="h-4 w-4 shrink-0 text-warning-text" />}
        <span className="sr-only">{ok ? "Em dia:" : "Precisa de atenção:"}</span>
        <span className="min-w-0 flex-1 text-[0.8125rem] text-foreground">{texto}</span>
        <ChevronRight aria-hidden className="h-4 w-4 shrink-0 text-muted-foreground" />
      </a>
    </li>
  );
}

/* ── Anel de pontuação ───────────────────────────────────────── */
function faixaDaPontuacao(v: number) {
  if (v >= 80) return { rotulo: "Bom", cor: "var(--success)" };
  if (v >= 50) return { rotulo: "Regular", cor: "var(--warning)" };
  return { rotulo: "Precisa melhorar", cor: "var(--error)" };
}

function AnelDePontuacao({ valor, tamanho = 112, rotulo, className }: { valor: number; tamanho?: number; rotulo?: string; className?: string }) {
  const faixa = faixaDaPontuacao(valor);
  const r = 42, c = 2 * Math.PI * r;
  return (
    <div
      data-slot="anel-de-pontuacao"
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={valor}
      aria-valuetext={`${valor}%, ${rotulo ?? faixa.rotulo}`}
      aria-label="Pontuação"
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: tamanho, height: tamanho }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--muted)" strokeWidth="9" />
        <circle cx="50" cy="50" r={r} fill="none" stroke={faixa.cor} strokeWidth="9" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - valor / 100)} />
      </svg>
      <span aria-hidden className="absolute flex max-w-[64%] flex-col items-center text-center">
        <span className={`${display} block font-extrabold leading-none text-foreground`} style={{ fontSize: Math.round(tamanho * 0.2) }}>{valor}%</span>
        <span className="mt-0.5 block text-[0.6875rem] font-semibold leading-tight text-muted-foreground">{rotulo ?? faixa.rotulo}</span>
      </span>
    </div>
  );
}

/* ── Carrossel de dicas ──────────────────────────────────────── */
type Dica = { titulo: string; texto: string; acao: string; midia?: React.ReactNode; href?: string; onAcao?: React.MouseEventHandler<HTMLAnchorElement> };

function CarrosselDeDicas({ dicas, onFechar, className }: { dicas: Dica[]; onFechar?: () => void; className?: string }) {
  const [i, setI] = React.useState(0);
  const dica = dicas[i]!;
  const btn = cn("flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted aria-disabled:opacity-40 aria-disabled:cursor-not-allowed", foco);
  return (
    <div data-slot="carrossel-de-dicas" role="region" aria-roledescription="carrossel" aria-label="Dicas para vender mais" className={cn("min-w-0", className)}>
      <div className="mb-3 flex items-center justify-end gap-2">
        <button type="button" className={btn} onClick={() => setI(v => Math.max(0, v - 1))} aria-disabled={i === 0} aria-label="Dica anterior"><ChevronLeft aria-hidden className="h-4 w-4" /></button>
        <span className="min-w-12 text-center text-[0.75rem] font-medium text-muted-foreground" aria-live="polite">{i + 1} de {dicas.length}</span>
        <button type="button" className={btn} onClick={() => setI(v => Math.min(dicas.length - 1, v + 1))} aria-disabled={i === dicas.length - 1} aria-label="Próxima dica"><ChevronRight aria-hidden className="h-4 w-4" /></button>
        {onFechar && <button type="button" className={cn(btn, "border-transparent")} onClick={onFechar} aria-label="Fechar dicas"><X aria-hidden className="h-4 w-4" /></button>}
      </div>
      <div role="group" aria-roledescription="dica" aria-label={`${i + 1} de ${dicas.length}`} className="flex gap-4 rounded-lg border border-border bg-card p-3">
        {dica.midia && <div aria-hidden className="flex h-24 w-24 shrink-0 items-center justify-center rounded-md bg-[var(--primary-muted)] text-[var(--primary-text,var(--primary))]">{dica.midia}</div>}
        <div className="min-w-0 flex-1">
          <p className="text-[0.9375rem] font-bold text-foreground">{dica.titulo}</p>
          <p className="mt-1 text-[0.8125rem] leading-snug text-muted-foreground">{dica.texto}</p>
          <a href={dica.href ?? "#"} onClick={dica.onAcao} className={cn("mt-2 inline-flex h-8 items-center rounded-sm border border-primary px-3 text-[0.8125rem] font-semibold text-[var(--primary-text,var(--primary))] transition-colors hover:bg-[var(--primary-muted)]", foco)}>{dica.acao}</a>
        </div>
      </div>
    </div>
  );
}

/* ── Faixa de benefícios ─────────────────────────────────────── */
function FaixaDeBeneficios({ icone, titulo, texto, beneficios, className }: { icone?: React.ReactNode; titulo: string; texto: string; beneficios: { icone: React.ReactNode; rotulo: string }[]; className?: string }) {
  return (
    <section data-slot="faixa-de-beneficios" aria-label={titulo} className={cn("flex flex-col gap-4 rounded-lg border border-primary/15 bg-[var(--primary-muted)] p-5 @5xl:flex-row @5xl:items-center", className)}>
      <div className="flex min-w-0 gap-3 @5xl:w-80 @5xl:shrink-0">
        {icone && <span aria-hidden className="mt-0.5 text-[var(--primary-text,var(--primary))] [&>svg]:h-7 [&>svg]:w-7">{icone}</span>}
        <div className="min-w-0">
          <p className={`${display} text-[1.0625rem] font-bold text-foreground`}>{titulo}</p>
          <p className="mt-0.5 text-[0.8125rem] leading-snug text-muted-foreground">{texto}</p>
        </div>
      </div>
      <ul className="grid min-w-0 flex-1 grid-cols-1 gap-2 @md:grid-cols-2 @2xl:grid-cols-4">
        {beneficios.map(b => (
          <li key={b.rotulo} className="flex items-center gap-2.5 rounded-md bg-card px-3 py-2.5 text-[0.8125rem] font-medium leading-tight text-foreground shadow-[var(--shadow-xs)]">
            <span aria-hidden className="shrink-0 text-[var(--primary-text,var(--primary))] [&>svg]:h-5 [&>svg]:w-5">{b.icone}</span>
            {b.rotulo}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── Card de seção do painel (título, descrição, ação) ───────── */
function CardDoPainel({ icone, titulo, descricao, acao, children, className, id, nivel = 2 }: { icone?: React.ReactNode; titulo: string; descricao?: string; acao?: React.ReactNode; children: React.ReactNode; className?: string; id?: string; nivel?: 2 | 3 | 4 }) {
  const tid = React.useId();
  const Titulo = `h${nivel}` as "h2" | "h3" | "h4";
  return (
    <section id={id} aria-labelledby={tid} data-slot="card-do-painel" className={cn("min-w-0 rounded-lg p-4 @xl:p-5", superficieDoCard, className)}>
      <div className="mb-4 flex items-start gap-3">
        {icone && <span aria-hidden className="mt-0.5 text-[var(--primary-text,var(--primary))] [&>svg]:h-5 [&>svg]:w-5">{icone}</span>}
        <div className="min-w-0 flex-1">
          <Titulo id={tid} className={`${display} text-[1.0625rem] font-bold tracking-[-0.01em] text-foreground`}>{titulo}</Titulo>
          {descricao && <p className="mt-0.5 text-[0.8125rem] text-muted-foreground">{descricao}</p>}
        </div>
        {acao}
      </div>
      {children}
    </section>
  );
}

/* ── Divisor suave (23/11/2026) ──────────────────────────────── */
/**
 * Linha de 1 px que some nas laterais: degradê transparente → --border-strong → transparente, com o esmaecimento nos
 * últimos ~18% de cada lado. Separa partes de um card sem fechar uma caixa (pedido da dona do produto, 23/11/2026).
 */
function DivisorSuave({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      data-slot="divisor-suave"
      className={cn("h-px w-full bg-[linear-gradient(to_right,transparent,var(--border-strong)_18%,var(--border-strong)_82%,transparent)]", className)}
    />
  );
}

/* ── Card com cabeçalho de ícone (Opção A, 23/11/2026) ──────── */
/**
 * Card branco das páginas do painel (padrão "Só borda": 1 px, sem sombra): ícone na base rosa clara (a mesma do
 * CardIndicador), título e uma linha opcional de descrição; ação opcional à direita, no alto; depois, o conteúdo.
 * Fica embaixo do cabeçalho da página (título, descrição e abas, fora de qualquer card). Um card por assunto.
 * tom="neutro" (base cinza + ícone cinza) para o que está pausado ou é só registro.
 *
 * cabecalho: "divisor" (padrão, decisão da dona do produto de 23/11/2026): o cabeçalho é separado do conteúdo por um
 * DivisorSuave, que desaparece nas laterais. "simples": sem divisor, só o espaçamento. (As faixas de cor saíram.)
 */
type EstiloDoCabecalhoDoCard = "divisor" | "simples";
function CardComCabecalho({ icone, titulo, descricao, acao, tom = "marca", cabecalho = "divisor", children, className, id, nivel = 2 }: { icone: React.ReactNode; titulo: string; descricao?: React.ReactNode; acao?: React.ReactNode; tom?: TomDoIcone; cabecalho?: EstiloDoCabecalhoDoCard; children?: React.ReactNode; className?: string; id?: string; nivel?: 2 | 3 | 4 }) {
  const tid = React.useId();
  const Titulo = `h${nivel}` as "h2" | "h3" | "h4";
  const temConteudo = children !== undefined && children !== null && children !== false;
  return (
    <section id={id} aria-labelledby={tid} data-slot="card-com-cabecalho" data-cabecalho={cabecalho} className={cn("@container min-w-0 rounded-lg p-4 @xl:p-5", superficieDoCard, className)}>
      <div data-slot="cabecalho-do-card" className={cn("flex flex-wrap items-start gap-x-3 gap-y-3", temConteudo && cabecalho === "simples" && "mb-5")}>
        {/* Mesma base de ícone do CardIndicador ("Produtos publicados"): IconeComBase no tamanho padrão. */}
        <IconeComBase tom={tom}>{icone}</IconeComBase>
        <div className="min-w-[12rem] flex-1 self-center">
          <Titulo id={tid} className={`${display} text-[1.0625rem] font-bold leading-snug tracking-[-0.01em] text-foreground`}>{titulo}</Titulo>
          {descricao && <p className="mt-0.5 text-[0.8125rem] leading-snug text-muted-foreground">{descricao}</p>}
        </div>
        {acao && <div className="flex shrink-0 flex-wrap items-center gap-2">{acao}</div>}
      </div>
      {temConteudo && cabecalho === "divisor" && <DivisorSuave className="my-4 @xl:my-5" />}
      {children}
    </section>
  );
}

/* ── Conteúdo com limite de altura ("Mostrar mais") ──────────── */
/**
 * Conteúdo de card sem rolagem própria (pedido da dona do produto, 21/11/2026: cards com rolagem por dentro prendiam a
 * roda do mouse e dificultavam rolar a página). O que não cabe fica escondido sob um degradê. "Mostrar mais" não estica o
 * card (decisão da dona do produto, 21/11/2026): abre uma janela (modal) com tudo, rolando dentro dela; ou, com
 * onMostrarMais, leva para outra tela quando o conteúdo é muito grande. O botão só aparece quando sobra conteúdo.
 * Se o conteúdo cresce enquanto a pessoa age dentro do card (um formulário que mostra o resultado), o card cresce junto
 * (aberto), para o que ela acabou de pedir não ficar escondido.
 * altura: altura máxima (classe). preencher: dentro de um card de altura fixa (flex coluna), ocupa o espaço que sobra.
 * titulo: título da janela. aberto/onAbertoChange: o card cresce junto (perde a altura fixa).
 */
function ConteudoRecolhivel({
  children, titulo = "Detalhes", descricao, altura = "max-h-[20rem]", preencher = false, aberto: abertoControlado, onAbertoChange,
  onMostrarMais, rotuloMais = "Mostrar mais", className,
}: {
  children: React.ReactNode; titulo?: string; descricao?: string; altura?: string; preencher?: boolean; aberto?: boolean;
  onAbertoChange?: (aberto: boolean) => void; onMostrarMais?: () => void; rotuloMais?: string; className?: string;
}) {
  const [abertoInterno, setAbertoInterno] = React.useState(false);
  const aberto = abertoControlado ?? abertoInterno;
  const mudar = (v: boolean) => {
    onAbertoChange?.(v);
    if (abertoControlado === undefined) setAbertoInterno(v);
  };
  const mudarRef = React.useRef(mudar);
  mudarRef.current = mudar;
  const area = React.useRef<HTMLDivElement>(null);
  const conteudo = React.useRef<HTMLDivElement>(null);
  const [sobra, setSobra] = React.useState(false);
  const [janela, setJanela] = React.useState(false);
  const ultimaAcao = React.useRef(0);

  // Mede se o conteúdo passa da área visível.
  React.useEffect(() => {
    const el = area.current, dentro = conteudo.current;
    if (!el || !dentro || aberto) return;
    const medir = () => {
      const passa = el.scrollHeight > el.clientHeight + 1;
      setSobra(passa);
      // Cresceu logo depois de um toque ou tecla dentro do card (até 15 s, o tempo de uma consulta): o card cresce junto.
      if (passa && Date.now() - ultimaAcao.current < 15_000) mudarRef.current(true);
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    ro.observe(dentro);
    return () => ro.disconnect();
  }, [aberto]);

  return (
    <div data-slot="conteudo-recolhivel" className={cn("flex min-h-0 flex-col", preencher && !aberto && "flex-1", className)}>
      <div
        ref={area}
        onPointerDownCapture={() => { ultimaAcao.current = Date.now(); }}
        onKeyDownCapture={() => { ultimaAcao.current = Date.now(); }}
        className={cn("relative min-h-0", !aberto && "overflow-hidden", !aberto && (preencher ? "flex-1" : altura))}>
        {/* Altura mínima total: um filho com h-full (por exemplo, um gráfico centralizado com justify-center) ocupa o card. */}
        <div ref={conteudo} className="flex min-h-full flex-col [&>.h-full]:h-auto [&>.h-full]:flex-1">{children}</div>
        {!aberto && sobra && <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-card via-card/80 to-transparent" />}
      </div>
      {!aberto && sobra && (
        <button
          type="button"
          aria-haspopup={onMostrarMais ? undefined : "dialog"}
          onClick={() => (onMostrarMais ? onMostrarMais() : setJanela(true))}
          className="mt-2 inline-flex min-h-9 items-center gap-1 self-start rounded-[4px] text-[0.8125rem] font-semibold text-[var(--primary-text,var(--primary))] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {rotuloMais}
          {onMostrarMais ? <ArrowRight aria-hidden className="h-4 w-4" /> : <ChevronRight aria-hidden className="h-4 w-4" />}
        </button>
      )}
      {!onMostrarMais && (
        <Dialog open={janela} onOpenChange={setJanela}>
          <DialogContent className="flex max-h-[85dvh] flex-col gap-0 p-0 sm:max-w-2xl">
            <DialogHeader className="border-b border-border px-5 py-4 pr-12 text-left">
              <DialogTitle className={`${display} text-[1.0625rem] font-bold tracking-[-0.01em]`}>{titulo}</DialogTitle>
              {descricao ? <DialogDescription>{descricao}</DialogDescription> : <DialogDescription className="sr-only">Tudo o que não coube no card.</DialogDescription>}
            </DialogHeader>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 [scrollbar-width:thin]">{janela && children}</div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

/**
 * Link "ver tudo" com seta. tom="marca" (padrão) para o principal; tom="neutro" (cinza) para o secundário, quando há dois
 * lado a lado e um não pode competir com o outro. Sem href, vira botão (abre painel lateral, por exemplo). icone: ícone
 * pequeno antes do texto (inline, sem base).
 */
function LinkVerTudo({ children = "Ver tudo", href, rotulo, onClick, tom = "marca", icone }: { children?: React.ReactNode; href?: string; rotulo?: string; onClick?: React.MouseEventHandler<HTMLElement>; tom?: TomDoIcone; icone?: React.ReactNode }) {
  const classe = cn(
    "group inline-flex shrink-0 items-center gap-1 rounded-sm text-[0.8125rem] font-semibold hover:underline [&>svg]:h-3.5 [&>svg]:w-3.5",
    tom === "marca" ? "text-[var(--primary-text,var(--primary))]" : "text-muted-foreground hover:text-foreground",
    foco,
  );
  const conteudo = (
    <>
      {icone && <span aria-hidden className="mr-0.5 inline-flex [&>svg]:h-3.5 [&>svg]:w-3.5">{icone}</span>}
      {children} <ArrowRight aria-hidden className="transition-transform motion-safe:group-hover:translate-x-0.5" />
    </>
  );
  if (href === undefined && onClick) {
    return <button type="button" aria-label={rotulo} onClick={onClick} className={classe}>{conteudo}</button>;
  }
  return <a href={href ?? "#"} aria-label={rotulo} onClick={onClick} className={classe}>{conteudo}</a>;
}

/* ── Andamento de uma tarefa (20/11/2026): estado → progresso → números → ações ── */

/**
 * Faixa de estado: o chip do estado (ícone + texto, nunca só cor), uma divisória e, ao lado, o que está acontecendo e o
 * que vem depois. tom="marca" (padrão, rosa claro: o estado é o foco do card, pedido da dona do produto em 20/11/2026) ou
 * tom="neutro" (cinza, quando o estado é só registro). No celular, o texto desce para baixo do chip.
 */
function FaixaDeEstado({ estado, titulo, texto, complemento, tom = "marca", className, ...props }: { estado: React.ReactNode; titulo: string; texto?: React.ReactNode; /** À direita (embaixo, em telas estreitas): progresso, botão ou link. Uso: cabeçalho de uma tarefa longa (21/11/2026). */ complemento?: React.ReactNode; tom?: TomDoIcone; className?: string } & Omit<React.HTMLAttributes<HTMLDivElement>, "title">) {
  return (
    <div data-slot="faixa-de-estado" data-tom={tom} className={cn("@container rounded-lg border p-4", tom === "marca" ? "border-primary/20 bg-[var(--primary-muted)]" : "border-border bg-muted/40", className)} {...props}>
      <div className="flex flex-col gap-3 @3xl:flex-row @3xl:items-center @3xl:gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-3 @md:flex-row @md:items-center @md:gap-4">
          <div className="shrink-0">{estado}</div>
          <span aria-hidden className={cn("hidden h-10 w-px shrink-0 @md:block", tom === "marca" ? "bg-primary/20" : "bg-border")} />
          <div className="min-w-0">
            <p className={`${display} text-[0.9375rem] font-bold leading-snug text-foreground`}>{titulo}</p>
            {texto && <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-muted-foreground">{texto}</p>}
          </div>
        </div>
        {complemento && <div className="flex shrink-0 flex-wrap items-center gap-3 @3xl:max-w-[50%]">{complemento}</div>}
      </div>
    </div>
  );
}

/** Progresso com rótulo: o nome à esquerda, a porcentagem à direita e a barra fina (trilho cinza, preenchimento na primária). */
function ProgressoRotulado({ rotulo, pct, texto, className }: { rotulo: string; pct: number | null; texto?: string; className?: string }) {
  const valor = pct === null ? "—" : texto ?? `${String(Math.round(pct * 10) / 10).replace(".", ",")}%`;
  return (
    <div data-slot="progresso-rotulado" className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-[0.875rem] font-semibold text-foreground">{rotulo}</span>
        <span className={`${display} text-[1.0625rem] font-bold tabular-nums text-foreground`}>{valor}</span>
      </div>
      <BarraDeUso pct={pct ?? 0} rotulo={pct === null ? `${rotulo}: calculando` : `${rotulo}: ${valor}`} className="h-2" />
    </div>
  );
}

type ItemDoResumo = { icone: React.ReactNode; valor: React.ReactNode; rotulo: string };

/**
 * Resumo em linha: poucos números (2 a 4) lado a lado, cada um com o ícone em base cinza (só identifica), o valor e o
 * rótulo embaixo, separados por divisórias. Em telas estreitas, um embaixo do outro. Para números soltos dentro de um card;
 * números que são o foco da página usam CardIndicador.
 */
function ResumoEmLinha({ itens, className }: { itens: ItemDoResumo[]; className?: string }) {
  const colunas = { 2: "@lg:grid-cols-2", 3: "@lg:grid-cols-3", 4: "@lg:grid-cols-2 @3xl:grid-cols-4" }[Math.min(4, Math.max(2, itens.length)) as 2 | 3 | 4];
  return (
    <div className={cn("@container", className)}>
      <ul data-slot="resumo-em-linha" className={cn("m-0 grid list-none grid-cols-1 divide-y divide-border p-0 @lg:divide-x @lg:divide-y-0", colunas)}>
        {itens.map((i) => (
          <li key={i.rotulo} className="flex min-w-0 items-center gap-3 py-3 @lg:gap-2.5 @lg:px-3 @lg:py-1 @lg:first:pl-0">
            <IconeComBase tom="neutro">{i.icone}</IconeComBase>
            <p className="m-0 min-w-0">
              <span className={`${display} block text-[1.25rem] font-bold leading-tight tabular-nums tracking-[-0.02em] text-foreground`}>{i.valor}</span>
              <span className="block text-[0.8125rem] text-muted-foreground">{i.rotulo}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Uso com limite ──────────────────────────────────────────── */
/** Porcentagem inteira do uso (0 a 100), ou null sem limite. */
const pctDoUso = (usado: number, limite?: number | null) => (limite ? Math.min(100, Math.round((usado / limite) * 100)) : null);
const pctTexto = (pct: number) => `${pct}%`;

type SeloDoUso = { titulo: string; texto?: string; icone?: React.ReactNode; tom?: "neutro" | "alerta" };

type PainelDeUsoProps = {
  icone: React.ReactNode;
  /** Linha pequena em caixa alta acima do título (ex.: o serviço medido). */
  sobretitulo?: string;
  titulo: string;
  descricao?: string;
  usado: number;
  limite: number;
  /** Unidade no plural, para "7.153 de 10.000 consultas". */
  unidade: string;
  /** Caixa à direita com o estado do limite (ex.: dentro do limite gratuito ou passou dele). */
  selo?: SeloDoUso;
  className?: string;
};

/** Barra do uso: trilho cinza e preenchimento na cor primária. */
function BarraDeUso({ pct, rotulo, className }: { pct: number; rotulo: string; className?: string }) {
  return <Progress value={pct} aria-label={rotulo} className={cn("h-1.5 bg-muted", className)} />;
}

/** Destaque do uso do mês, no padrão clean dos templates: card branco, ícone de marca (base rosa, é o foco da página), a porcentagem grande com a
 *  barra e o estado do limite numa linha discreta (neutra) ou em alerta. */
function PainelDeUso({ icone, sobretitulo, titulo, descricao, usado, limite, unidade, selo, className }: PainelDeUsoProps) {
  const pct = pctDoUso(usado, limite) ?? 0;
  const alerta = selo?.tom === "alerta";
  return (
    <section
      data-slot="painel-de-uso"
      aria-label={`${titulo}: ${pctTexto(pct)} do limite`}
      className={cn("grid gap-5 rounded-lg p-5", superficieDoCard, "@3xl:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] @3xl:items-center @3xl:gap-8", className)}
    >
      <div className="flex min-w-0 items-start gap-3.5">
        <IconeComBase tom="marca" tamanho="lg">{icone}</IconeComBase>
        <div className="min-w-0">
          {sobretitulo && <p className="text-[0.75rem] font-medium text-muted-foreground">{sobretitulo}</p>}
          <p className={`${display} text-[1.0625rem] font-bold leading-snug tracking-[-0.01em] text-foreground`}>{titulo}</p>
          {descricao && <p className="mt-0.5 text-[0.8125rem] text-muted-foreground">{descricao}</p>}
        </div>
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
          <p className="tabular-nums">
            <span className="text-[1.625rem] font-bold leading-none tracking-[-0.025em] text-foreground">{pctTexto(pct)}</span>
            <span className="ml-2 text-[0.875rem] text-muted-foreground">{formatarNumero(usado)} de {formatarNumero(limite)} {unidade}</span>
          </p>
          {selo && (
            <p data-tom={alerta ? "alerta" : "neutro"} className={cn("inline-flex items-center gap-1.5 text-[0.8125rem]", alerta ? "font-semibold text-destructive" : "text-muted-foreground")}>
              <span aria-hidden className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{selo.icone ?? (alerta ? <TriangleAlert /> : <CheckCircle2 className="text-success" />)}</span>
              <span><span className={alerta ? "" : "font-medium text-foreground"}>{selo.titulo}</span>{selo.texto ? ` · ${selo.texto}` : ""}</span>
            </p>
          )}
        </div>
        <BarraDeUso pct={pct} rotulo={`${titulo}: ${formatarNumero(usado)} de ${formatarNumero(limite)} ${unidade}`} className="mt-3 h-2" />
      </div>
    </section>
  );
}

type CardDeUsoProps = {
  icone: React.ReactNode;
  rotulo: string;
  usado: number;
  /** Sem limite (null), o card mostra só o número e o texto de semLimite. */
  limite?: number | null;
  semLimite?: string;
  className?: string;
};

/** Um tipo de uso do mês, no formato do CardIndicador: rótulo, número e ícone em base cinza; embaixo, a barra e a
 *  porcentagem do limite. */
function CardDeUso({ icone, rotulo, usado, limite, semLimite = "Sem limite", className }: CardDeUsoProps) {
  const pct = pctDoUso(usado, limite);
  return (
    <div data-slot="card-de-uso" className={cn("flex h-full min-w-0 flex-col gap-4 rounded-lg p-5", superficieDoCard, className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="mb-1 text-[0.8125rem] font-medium leading-snug text-muted-foreground">{rotulo}</p>
          <p className="tabular-nums">
            <span className="text-[1.625rem] font-bold leading-none tracking-[-0.025em] text-foreground">{formatarNumero(usado)}</span>
            {limite ? <span className="ml-1.5 text-[0.9375rem] font-semibold text-muted-foreground">de {formatarNumero(limite)}</span> : null}
          </p>
        </div>
        <IconeComBase tom="neutro">{icone}</IconeComBase>
      </div>
      {pct !== null ? (
        <div className="mt-auto">
          <BarraDeUso pct={pct} rotulo={`${rotulo}: ${formatarNumero(usado)} de ${formatarNumero(limite!)}`} />
          <p className="mt-1.5 text-[0.75rem] tabular-nums text-muted-foreground">{pctTexto(pct)} do limite</p>
        </div>
      ) : (
        <p className="mt-auto text-[0.75rem] text-muted-foreground">{semLimite}</p>
      )}
    </div>
  );
}

export {
  formatarNumero, formatarPreco, formatarVariacao, Variacao, Explicacao, CardIndicador, GraficoDeDesempenho,
  ItemDeAtividade, ItemDeAcao, ListaDeTendencias, ItemDeChecklist, AnelDePontuacao, faixaDaPontuacao,
  CarrosselDeDicas, FaixaDeBeneficios, CardDoPainel, CardComCabecalho, DivisorSuave, ConteudoRecolhivel, LinkVerTudo, PainelDeUso, CardDeUso, IconeComBase,
  FaixaDeEstado, ProgressoRotulado, ResumoEmLinha, iniciais,
};
export type { TomDoIcone, EstiloDoCabecalhoDoCard };
export { superficieDoCard };
export type { Serie, Dica };
