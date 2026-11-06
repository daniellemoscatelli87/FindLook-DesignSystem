import * as React from "react";
import { Area, AreaChart, CartesianGrid, ReferenceDot, ResponsiveContainer, Tooltip as ReTooltip, XAxis, YAxis } from "recharts";
import { ArrowDown, ArrowRight, ArrowUp, CheckCircle2, ChevronLeft, ChevronRight, ChevronRight as Seta, Info, TriangleAlert, X } from "lucide-react";
import { cn } from "./utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

/**
 * Dados do painel da loja (FindLook)
 *
 * Formatação pt-BR, card de indicador (KPI), gráfico de desempenho com legenda que liga e desliga
 * séries, item de atividade, item de ação (insight / próxima ação), lista de tendências,
 * item de checklist, anel de pontuação, carrossel de dicas e faixa de benefícios.
 */

const display = "font-[family-name:var(--font-display)]";
const foco = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

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
function Variacao({ valor, comparacao, pilula, className }: { valor: number; comparacao?: string; pilula?: boolean; className?: string }) {
  const sobe = valor >= 0;
  const Icone = sobe ? ArrowUp : ArrowDown;
  const leitura = `${sobe ? "Alta" : "Queda"} de ${formatarVariacao(Math.abs(valor)).replace("+", "")}${comparacao ? ` ${comparacao}` : ""}`;
  return (
    <span className={cn("inline-flex items-center gap-1 text-[0.75rem] font-semibold", pilula && "rounded-full border px-2 py-0.5", pilula && (sobe ? "border-success/30 bg-success/10" : "border-error/30 bg-error/10"), className)}>
      <Icone aria-hidden className={cn("h-3.5 w-3.5", sobe ? "text-success" : "text-error")} />
      <span aria-hidden className="text-foreground">{formatarVariacao(valor)}</span>
      {comparacao && <span aria-hidden className="font-normal text-muted-foreground">{comparacao}</span>}
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
  rotulo: string;
  variacao?: number;
  comparacao?: string;
  explicacao?: React.ReactNode;
  /** "linha": variação abaixo do rótulo; "pilula": variação no canto superior. */
  estilo?: "linha" | "pilula";
  className?: string;
};

function CardIndicador({ icone, valor, rotulo, variacao, comparacao, explicacao, estilo = "linha", className }: CardIndicadorProps) {
  return (
    <div data-slot="card-indicador" className={cn("relative flex gap-3 rounded-[16px] border border-border bg-card p-4 shadow-[var(--shadow-xs)]", estilo === "pilula" ? "flex-col" : "items-start", className)}>
      <div className="flex items-start justify-between gap-2">
        <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary-muted)] text-[var(--primary-text,var(--primary))] [&>svg]:h-5 [&>svg]:w-5">{icone}</span>
        {estilo === "pilula" && variacao !== undefined && <Variacao valor={variacao} pilula />}
      </div>
      <div className="min-w-0">
        <p className={`${display} text-[1.625rem] font-extrabold leading-none tracking-[-0.02em] text-foreground`}>{formatarNumero(valor)}</p>
        <p className="mt-1 text-[0.8125rem] leading-snug text-muted-foreground">
          {rotulo}
          {explicacao && <span className="ml-0.5 inline-flex align-middle"><Explicacao termo={rotulo}>{explicacao}</Explicacao></span>}
        </p>
        {estilo === "linha" && variacao !== undefined && <Variacao valor={variacao} comparacao={comparacao} className="mt-1.5" />}
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
        <fieldset className="mb-3 flex flex-wrap gap-x-4 gap-y-2">
          <legend className="sr-only">Séries exibidas no gráfico</legend>
          {series.map(s => {
            const ativa = visiveis.includes(s.chave);
            return (
              <label key={s.chave} className="inline-flex cursor-pointer items-center gap-2 text-[0.8125rem] text-foreground">
                <input type="checkbox" checked={ativa} onChange={() => alternar(s.chave)} className="peer sr-only" />
                <span aria-hidden className={cn("flex h-4 w-4 items-center justify-center rounded-[4px] border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background", ativa ? "border-foreground bg-foreground text-background" : "border-muted-foreground bg-card")}>
                  {ativa && <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M2.5 6.5l2.2 2.2 4.8-5" /></svg>}
                </span>
                <span aria-hidden className="h-[3px] w-4 rounded-full" style={{ background: s.cor }} />
                {s.rotulo}
              </label>
            );
          })}
        </fieldset>
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
function ItemDeAtividade({ icone, titulo, detalhe, quando, className }: { icone: React.ReactNode; titulo: string; detalhe?: string; quando: string; className?: string }) {
  return (
    <li data-slot="item-de-atividade" className={cn("flex items-start gap-3 py-3", className)}>
      <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--primary-muted)] text-[var(--primary-text,var(--primary))] [&>svg]:h-4 [&>svg]:w-4">{icone}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.8125rem] font-semibold text-foreground">{titulo}</p>
        {detalhe && <p className="truncate text-[0.75rem] text-muted-foreground">{detalhe}</p>}
      </div>
      <span className="shrink-0 text-[0.75rem] text-muted-foreground">{quando}</span>
    </li>
  );
}

/* ── Item de ação (insight / próxima ação) ───────────────────── */
function ItemDeAcao({ midia, titulo, descricao, href = "#", onClick, className }: { midia: React.ReactNode; titulo: string; descricao?: string; href?: string; onClick?: React.MouseEventHandler<HTMLAnchorElement>; className?: string }) {
  return (
    <a
      data-slot="item-de-acao"
      href={href}
      onClick={onClick}
      className={cn("group flex items-center gap-3 rounded-[12px] border border-border bg-card p-3 transition-[background-color,border-color,box-shadow] duration-150 hover:border-primary/30 hover:bg-[var(--primary-muted)] hover:shadow-[var(--shadow-xs)] active:scale-[0.995]", foco, className)}
    >
      <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-muted text-[var(--primary-text,var(--primary))] [&>svg]:h-5 [&>svg]:w-5">{midia}</span>
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
    <ol data-slot="lista-de-tendencias" className={cn("divide-y divide-border rounded-[12px] border border-border", className)}>
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
      <a data-slot="item-de-checklist" href={href} className={cn("flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 transition-colors hover:bg-muted", foco, className)}>
        {ok ? <CheckCircle2 aria-hidden className="h-4 w-4 shrink-0 text-success" /> : <TriangleAlert aria-hidden className="h-4 w-4 shrink-0 text-warning" />}
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
type Dica = { titulo: string; texto: string; acao: string; midia?: React.ReactNode };

function CarrosselDeDicas({ dicas, onFechar, className }: { dicas: Dica[]; onFechar?: () => void; className?: string }) {
  const [i, setI] = React.useState(0);
  const dica = dicas[i]!;
  const btn = cn("flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted disabled:opacity-40 disabled:pointer-events-none", foco);
  return (
    <div data-slot="carrossel-de-dicas" role="region" aria-roledescription="carrossel" aria-label="Dicas para vender mais" className={cn("min-w-0", className)}>
      <div className="mb-3 flex items-center justify-end gap-2">
        <button type="button" className={btn} onClick={() => setI(v => v - 1)} disabled={i === 0} aria-label="Dica anterior"><ChevronLeft aria-hidden className="h-4 w-4" /></button>
        <span className="min-w-12 text-center text-[0.75rem] font-medium text-muted-foreground" aria-live="polite">{i + 1} de {dicas.length}</span>
        <button type="button" className={btn} onClick={() => setI(v => v + 1)} disabled={i === dicas.length - 1} aria-label="Próxima dica"><ChevronRight aria-hidden className="h-4 w-4" /></button>
        {onFechar && <button type="button" className={cn(btn, "border-transparent")} onClick={onFechar} aria-label="Fechar dicas"><X aria-hidden className="h-4 w-4" /></button>}
      </div>
      <div role="group" aria-roledescription="dica" aria-label={`${i + 1} de ${dicas.length}`} className="flex gap-4 rounded-[14px] border border-border bg-card p-3">
        {dica.midia && <div aria-hidden className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[10px] bg-[var(--primary-muted)] text-[var(--primary-text,var(--primary))]">{dica.midia}</div>}
        <div className="min-w-0 flex-1">
          <p className="text-[0.9375rem] font-bold text-foreground">{dica.titulo}</p>
          <p className="mt-1 text-[0.8125rem] leading-snug text-muted-foreground">{dica.texto}</p>
          <a href="#" className={cn("mt-2 inline-flex h-8 items-center rounded-[8px] border border-primary px-3 text-[0.8125rem] font-semibold text-[var(--primary-text,var(--primary))] transition-colors hover:bg-[var(--primary-muted)]", foco)}>{dica.acao}</a>
        </div>
      </div>
    </div>
  );
}

/* ── Faixa de benefícios ─────────────────────────────────────── */
function FaixaDeBeneficios({ icone, titulo, texto, beneficios, className }: { icone?: React.ReactNode; titulo: string; texto: string; beneficios: { icone: React.ReactNode; rotulo: string }[]; className?: string }) {
  return (
    <section data-slot="faixa-de-beneficios" aria-label={titulo} className={cn("flex flex-col gap-4 rounded-[16px] border border-primary/15 bg-[var(--primary-muted)] p-5 @5xl:flex-row @5xl:items-center", className)}>
      <div className="flex min-w-0 gap-3 @5xl:w-80 @5xl:shrink-0">
        {icone && <span aria-hidden className="mt-0.5 text-[var(--primary-text,var(--primary))] [&>svg]:h-7 [&>svg]:w-7">{icone}</span>}
        <div className="min-w-0">
          <p className={`${display} text-[1.0625rem] font-bold text-foreground`}>{titulo}</p>
          <p className="mt-0.5 text-[0.8125rem] leading-snug text-muted-foreground">{texto}</p>
        </div>
      </div>
      <ul className="grid min-w-0 flex-1 grid-cols-1 gap-2 @md:grid-cols-2 @2xl:grid-cols-4">
        {beneficios.map(b => (
          <li key={b.rotulo} className="flex items-center gap-2.5 rounded-[12px] bg-card px-3 py-2.5 text-[0.8125rem] font-medium leading-tight text-foreground shadow-[var(--shadow-xs)]">
            <span aria-hidden className="shrink-0 text-[var(--primary-text,var(--primary))] [&>svg]:h-5 [&>svg]:w-5">{b.icone}</span>
            {b.rotulo}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── Card de seção do painel (título, descrição, ação) ───────── */
function CardDoPainel({ icone, titulo, descricao, acao, children, className, id }: { icone?: React.ReactNode; titulo: string; descricao?: string; acao?: React.ReactNode; children: React.ReactNode; className?: string; id?: string }) {
  const tid = React.useId();
  return (
    <section id={id} aria-labelledby={tid} data-slot="card-do-painel" className={cn("min-w-0 rounded-[18px] border border-border bg-card p-4 shadow-[var(--shadow-xs)] @xl:p-5", className)}>
      <div className="mb-4 flex items-start gap-3">
        {icone && <span aria-hidden className="mt-0.5 text-[var(--primary-text,var(--primary))] [&>svg]:h-5 [&>svg]:w-5">{icone}</span>}
        <div className="min-w-0 flex-1">
          <h2 id={tid} className={`${display} text-[1.0625rem] font-bold tracking-[-0.01em] text-foreground`}>{titulo}</h2>
          {descricao && <p className="mt-0.5 text-[0.8125rem] text-muted-foreground">{descricao}</p>}
        </div>
        {acao}
      </div>
      {children}
    </section>
  );
}

function LinkVerTudo({ children = "Ver tudo", href = "#", rotulo, onClick }: { children?: React.ReactNode; href?: string; rotulo?: string; onClick?: React.MouseEventHandler<HTMLAnchorElement> }) {
  return (
    <a href={href} aria-label={rotulo} onClick={onClick} className={cn("inline-flex shrink-0 items-center gap-1 rounded-[6px] text-[0.8125rem] font-semibold text-[var(--primary-text,var(--primary))] hover:underline", foco)}>
      {children} <ArrowRight aria-hidden className="h-3.5 w-3.5" />
    </a>
  );
}

export {
  formatarNumero, formatarPreco, formatarVariacao, Variacao, Explicacao, CardIndicador, GraficoDeDesempenho,
  ItemDeAtividade, ItemDeAcao, ListaDeTendencias, ItemDeChecklist, AnelDePontuacao, faixaDaPontuacao,
  CarrosselDeDicas, FaixaDeBeneficios, CardDoPainel, LinkVerTudo,
};
export type { Serie, Dica };
