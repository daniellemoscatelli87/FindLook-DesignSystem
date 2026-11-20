"use client";

import * as React from "react";
import { cn } from "./utils";
import { GraficoDeRosca } from "./graficos-inteligencia";

/**
 * Gráficos de participação e comparação (FindLook)
 *
 * Rosca: partes de um todo (até 5 partes), com o total ou o número de partes no centro e legenda com a porcentagem.
 * BarrasHorizontais: compara grupos numa medida; cada linha pode ter uma parte (barra simples) ou várias (barra empilhada).
 * MapaCoropletico: regiões de um mapa (bairros, por exemplo) pintadas por um valor, na escala de calor da paleta de
 * gráficos (--chart-seq-1 a 4), com legenda, marcadores opcionais e escolha de uma região por clique ou toque. As formas vêm de quem usa.
 *
 * Regras (método de dataviz do DS): cor por token (--chart-1 a --chart-5), fixa por categoria e nunca pela posição;
 * 2 px de espaço entre as partes; valor sempre escrito (legenda ou fim da barra), então a cor nunca é a única pista;
 * dica com o valor ao passar o mouse; nunca rolagem para o lado (o rótulo quebra de linha).
 * Movimento: as barras crescem e a rosca aparece ao montar; com "menos movimento", aparecem prontas.
 */

export type ParteDoGrafico = { rotulo: string; valor: number; cor: string };

const pct = (parte: number, todo: number) => (todo ? Math.round((parte / todo) * 100) : 0);
const fmt = new Intl.NumberFormat("pt-BR");

/** Marca que o componente já apareceu, para a transição de entrada (a CSS desliga com "menos movimento"). */
function useMontado() {
  const [montado, setMontado] = React.useState(false);
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setMontado(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return montado;
}

/* ── Rosca ───────────────────────────────────────────────────────
   Desde 19/11/2026 a rosca do DS é a redesenhada (GraficoDeRosca, em graficos-inteligencia.tsx):
   anel fino, tons da paleta de gráficos da maior para a menor parte, "Outros" em cinza e por último,
   percentual escrito junto de cada parte. Esta função mantém a mesma assinatura para quem já usa
   <Rosca> (a Central de Inteligência do produto); a cor de cada parte agora vem da paleta. */
function Rosca({
  partes,
  centro,
  rotuloCentro,
  rotulo,
  className,
}: {
  partes: ParteDoGrafico[];
  /** Texto grande no centro (por exemplo, o total). */
  centro: string;
  /** Texto pequeno abaixo do centro. */
  rotuloCentro?: string;
  /** Nome do gráfico, lido por leitores de tela junto com os valores. */
  rotulo: string;
  className?: string;
}) {
  return (
    <GraficoDeRosca
      rotulo={rotulo}
      className={className}
      centro={{ valor: centro, rotulo: rotuloCentro ?? "" }}
      partes={partes.map(p => ({ rotulo: p.rotulo, valor: p.valor, neutro: /^outr/i.test(p.rotulo.trim()) }))}
      tamanho={180}
    />
  );
}

/* ── Barras horizontais ──────────────────────────────────────── */
type LinhaDeBarra = {
  rotulo: string;
  /** Uma parte = barra simples; várias = barra empilhada. */
  partes: ParteDoGrafico[];
  /** Valor escrito no fim da linha (por exemplo, "14 lojas" ou "88%"). */
  texto: string;
};

function BarrasHorizontais({
  linhas,
  maximo,
  legenda,
  rotulo,
  className,
}: {
  linhas: LinhaDeBarra[];
  /** Valor da barra mais longa (padrão: o maior total das linhas). Use 100 para porcentagens. */
  maximo?: number;
  /** Legenda das cores, para barras empilhadas. */
  legenda?: { rotulo: string; cor: string }[];
  /** Nome do gráfico, lido por leitores de tela. */
  rotulo: string;
  className?: string;
}) {
  const montado = useMontado();
  const total = (l: LinhaDeBarra) => l.partes.reduce((s, p) => s + p.valor, 0);
  const max = maximo ?? Math.max(1, ...linhas.map(total));
  return (
    <figure data-slot="barras-horizontais" className={cn("m-0", className)}>
      <ul aria-label={rotulo} className="m-0 list-none space-y-3 p-0">
        {linhas.map((l, i) => {
          const t = total(l);
          return (
            <li key={l.rotulo} className="grid grid-cols-[minmax(4.5rem,8.5rem)_minmax(0,1fr)_auto] items-center gap-3">
              <span className="min-w-0 break-words text-[0.875rem] font-semibold leading-snug text-foreground">{l.rotulo}</span>
              <span className="h-3.5 min-w-0 rounded-full bg-muted">
                <span
                  role="img"
                  aria-label={`${l.rotulo}: ${l.partes.map((p) => `${p.rotulo} ${fmt.format(p.valor)}`).join(", ")}`}
                  className="flex h-full gap-[2px] overflow-hidden rounded-full motion-safe:transition-[width] motion-safe:duration-700 motion-safe:ease-out"
                  style={{ width: montado ? `${Math.max(t > 0 ? 3 : 0, (t / max) * 100)}%` : "0%", transitionDelay: `${i * 60}ms` }}
                >
                  {l.partes.filter((p) => p.valor > 0).map((p) => (
                    <span key={p.rotulo} className="h-full" style={{ background: p.cor, flexGrow: p.valor, flexBasis: 0 }} title={`${l.rotulo} · ${p.rotulo}: ${fmt.format(p.valor)}${l.partes.length > 1 ? ` (${pct(p.valor, t)}%)` : ""}`} />
                  ))}
                </span>
              </span>
              <span className="shrink-0 text-right text-[0.8125rem] tabular-nums text-muted-foreground">{l.texto}</span>
            </li>
          );
        })}
      </ul>
      {legenda && legenda.length > 0 && (
        <figcaption>
          <ul aria-label="Legenda" className="m-0 mt-4 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 text-[0.8125rem] text-foreground">
            {legenda.map((p) => (
              <li key={p.rotulo} className="flex items-center gap-1.5">
                <span aria-hidden className="h-3 w-3 rounded-full" style={{ background: p.cor }} />
                {p.rotulo}
              </li>
            ))}
          </ul>
        </figcaption>
      )}
    </figure>
  );
}

/* ── Mapa coroplético ────────────────────────────────────────── */
type RegiaoDoMapa = { nome: string; d: string; cx?: number; cy?: number };

/** Escala de calor da paleta de gráficos (--chart-seq-1 a 4, do menor para o maior; a mesma do MapaDeCalorPorRegiao). */
const ESCALA_DO_MAPA = ["var(--chart-seq-1)", "var(--chart-seq-2)", "var(--chart-seq-3)", "var(--chart-seq-4)"];
const corDoMapa = (n: number, maximo: number) =>
  n <= 0 ? "var(--card)" : ESCALA_DO_MAPA[Math.min(ESCALA_DO_MAPA.length - 1, Math.floor((n / Math.max(1, maximo)) * ESCALA_DO_MAPA.length))]!;

function MapaCoropletico({
  viewBox,
  regioes,
  valores,
  rotulo,
  rotuloDoValor,
  escolhida,
  onEscolher,
  marcadores = [],
  nomesCurtos = {},
  legenda = ["Menos", "Mais"],
  className,
}: {
  viewBox: string;
  regioes: RegiaoDoMapa[];
  /** Valor de cada região, pelo nome. Regiões sem valor ficam na cor do card. */
  valores: Map<string, number>;
  /** Descrição do mapa para leitores de tela (diga também onde estão os mesmos números em texto). */
  rotulo: string;
  /** Texto da dica de cada região ("12 lojas"). */
  rotuloDoValor: (n: number) => string;
  /** Região escolhida (borda forte). Sem onEscolher, o mapa é só para ler. */
  escolhida?: string | null;
  onEscolher?: (nome: string | null) => void;
  /** Regiões marcadas com um ponto e o nome (usam cx e cy). */
  marcadores?: string[];
  /** Nome curto no marcador, para nomes longos. */
  nomesCurtos?: Record<string, string>;
  /** Textos das pontas da legenda. */
  legenda?: [string, string];
  className?: string;
}) {
  const montado = useMontado();
  const maximo = Math.max(1, ...valores.values());
  return (
    <figure data-slot="mapa-coropletico" className={cn("m-0", className)}>
      <svg viewBox={viewBox} role="img" aria-label={rotulo} className={cn("mx-auto h-auto w-full motion-safe:transition-opacity motion-safe:duration-500", montado ? "opacity-100" : "opacity-0 motion-reduce:opacity-100")}>
        {regioes.map((r) => {
          const n = valores.get(r.nome) ?? 0;
          const ativa = escolhida === r.nome;
          return (
            <path
              key={r.nome}
              d={r.d}
              fill={corDoMapa(n, maximo)}
              stroke={ativa ? "var(--foreground)" : "var(--border-strong)"}
              strokeWidth={ativa ? 7 : 2}
              className={cn("transition-[fill,stroke-width] duration-200", onEscolher ? "cursor-pointer hover:opacity-85" : "cursor-default")}
              onClick={onEscolher ? () => onEscolher(ativa ? null : r.nome) : undefined}
            >
              <title>{`${r.nome}: ${rotuloDoValor(n)}`}</title>
            </path>
          );
        })}
        {marcadores.map((nome) => {
          const r = regioes.find((x) => x.nome === nome);
          if (!r || r.cx === undefined || r.cy === undefined) return null;
          const texto = nomesCurtos[nome] ?? nome;
          return (
            <g key={nome} className="pointer-events-none">
              <circle cx={r.cx} cy={r.cy} r="24" fill="var(--primary)" stroke="var(--card)" strokeWidth="7" />
              <rect x={r.cx + 32} y={r.cy - 38} width={texto.length * 24 + 44} height="76" rx="38" fill="var(--card)" stroke="var(--border-strong)" strokeWidth="2" />
              <text x={r.cx + 54} y={r.cy + 13} className="fill-foreground text-[40px] font-semibold">{texto}</text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 flex flex-wrap items-center justify-end gap-x-2 gap-y-1 text-[0.75rem] text-muted-foreground">
        <span className="whitespace-nowrap">{legenda[0]}</span>
        <span aria-hidden className="flex gap-0.5">
          {ESCALA_DO_MAPA.map((c) => <span key={c} className="h-2.5 w-6 rounded-[3px]" style={{ background: c }} />)}
        </span>
        <span className="whitespace-nowrap">{legenda[1]}</span>
      </figcaption>
    </figure>
  );
}

export { Rosca, BarrasHorizontais, MapaCoropletico };
export type { LinhaDeBarra, RegiaoDoMapa };
