"use client";

import * as React from "react";
import { cn } from "./utils";
import { GraficoDeRosca } from "./graficos-inteligencia";

/**
 * Gráficos de participação e comparação (FindLook)
 *
 * Rosca: partes de um todo (até 5 partes), com o total ou o número de partes no centro e legenda com a porcentagem.
 * BarrasHorizontais: compara grupos numa medida; cada linha pode ter uma parte (barra simples) ou várias (barra empilhada).
 * MapaCoropletico: regiões de um mapa (bairros, por exemplo) pintadas por um valor, em 5 faixas com tokens próprios
 * (--mapa-1 a --mapa-5 = tons 7, 6, 4, 2 e 1 da paleta, do cinza ao rosa; sem valor, --mapa-vazio; borda --mapa-borda;
 * escolhida, contorno --mapa-escolhida de 7 unidades), com legenda, marcadores opcionais e escolha de uma região por
 * clique ou toque. As formas vêm de quem usa. faixaDoMapa(n, maximo) diz a faixa de um valor (para a lista ao lado).
 * Desde 28/11/2026: `faixas` fixas (0–25, 26–75…) com a legenda em lista (LegendaDoMapa, também avulsa), `etiquetas`
 * (o número de cada região numa pílula e o "+N" no vermelho da marca), `semDado` (cor de quem está fora dos dados) e a
 * escolhida desenhada por último. corDoMapa(n, maximo, faixas) dá a cor de um valor. BarrasHorizontais: `href` ou
 * `onClick` por linha (a linha inteira vira link ou botão).
 *
 * Regras (método de dataviz do DS): cor por token da paleta da FindLook (--chart-1 a --chart-7; decisão da dona do
 * produto, 21/11/2026), fixa por categoria e em ordem de importância: o principal no tom 1, as outras séries pelos tons
 * de coresPorImportancia (graficos-paleta.ts: em sequência), contexto (referência, comparação secundária) nos tons 6 e 7 e
 * "Outros" em --chart-neutral; nunca mais de 2 tons intensos (1 e 2) no mesmo gráfico;
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
   anel fino, tons por importância (coresPorImportancia) da maior para a menor parte, "Outros" em cinza
   e por último, percentual escrito junto de cada parte. Esta função mantém a mesma assinatura para quem
   já usa <Rosca> (a Central de Inteligência do produto); a cor de cada parte vem da paleta, não de `cor`. */
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
  /**
   * Uma parte = barra simples; várias = barra empilhada. `cor` é um token da paleta: as partes em ordem de importância
   * (var(--chart-N) pelos tons de coresPorImportancia), "Outros" em var(--chart-neutral) e por último.
   */
  partes: ParteDoGrafico[];
  /** Valor escrito no fim da linha (por exemplo, "14 lojas" ou "88%"). */
  texto: string;
  /** A linha inteira leva a outra tela (28/11/2026): vira link, com o nome "rótulo, texto". */
  href?: string;
  /** Ou faz uma ação nesta tela: a linha inteira vira botão. */
  onClick?: () => void;
};

function BarrasHorizontais({
  linhas,
  maximo,
  legenda,
  rotulo,
  comoLink,
  className,
}: {
  linhas: LinhaDeBarra[];
  /** Valor da barra mais longa (padrão: o maior total das linhas). Use 100 para porcentagens. */
  maximo?: number;
  /** Legenda das cores, para barras empilhadas. */
  legenda?: { rotulo: string; cor: string }[];
  /** Nome do gráfico, lido por leitores de tela. */
  rotulo: string;
  /** Componente de link do produto (por exemplo, o Link do Next) para as linhas com href. */
  comoLink?: React.ElementType;
  className?: string;
}) {
  const montado = useMontado();
  const total = (l: LinhaDeBarra) => l.partes.reduce((s, p) => s + p.valor, 0);
  const max = maximo ?? Math.max(1, ...linhas.map(total));
  const comLinks = linhas.some((l) => l.href || l.onClick);
  const Link = comoLink ?? "a";
  const grade = "grid grid-cols-[minmax(4.5rem,8.5rem)_minmax(0,1fr)_auto] items-center gap-3";
  const conteudo = (l: LinhaDeBarra, i: number) => {
    const t = total(l);
    return (
      <>
        <span className={cn("min-w-0 break-words text-body-sm font-semibold leading-snug text-foreground", comLinks && "group-hover:underline")}>
          {l.rotulo}
        </span>
        <span className="h-3.5 min-w-0 rounded-full bg-muted" aria-hidden={comLinks || undefined}>
          <span
            role={comLinks ? undefined : "img"}
            aria-label={comLinks ? undefined : `${l.rotulo}: ${l.partes.map((p) => `${p.rotulo} ${fmt.format(p.valor)}`).join(", ")}`}
            className="flex h-full gap-0 overflow-hidden rounded-full motion-safe:transition-[width] motion-safe:duration-700 motion-safe:ease-out"
            style={{ width: montado ? `${Math.max(t > 0 ? 3 : 0, (t / max) * 100)}%` : "0%", transitionDelay: `${i * 60}ms` }}
          >
            {l.partes.filter((p) => p.valor > 0).map((p) => (
              <span key={p.rotulo} className="h-full" style={{ background: p.cor, flexGrow: p.valor, flexBasis: 0 }} title={`${l.rotulo} · ${p.rotulo}: ${fmt.format(p.valor)}${l.partes.length > 1 ? ` (${pct(p.valor, t)}%)` : ""}`} />
            ))}
          </span>
        </span>
        <span className="shrink-0 text-right text-body-sm tabular-nums text-muted-foreground">{l.texto}</span>
      </>
    );
  };
  const alvo = cn(grade, "group w-full rounded-none px-3 py-1.5 text-left font-normal transition-colors hover:bg-row-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring toque:min-h-11");
  return (
    <figure data-slot="barras-horizontais" className={cn("m-0", className)}>
      {comLinks ? (
        <ol aria-label={rotulo} className="m-0 -mx-3 list-none space-y-1 p-0">
          {linhas.map((l, i) => (
            <li key={l.rotulo} className="min-w-0">
              {l.href ? <Link href={l.href} className={alvo}>{conteudo(l, i)}</Link>
                : l.onClick ? <button type="button" onClick={l.onClick} className={alvo}>{conteudo(l, i)}</button>
                : <div className={cn(grade, "px-3 py-1.5")}>{conteudo(l, i)}</div>}
            </li>
          ))}
        </ol>
      ) : (
        <ul aria-label={rotulo} className="m-0 list-none space-y-3 p-0">
          {linhas.map((l, i) => <li key={l.rotulo} className={grade}>{conteudo(l, i)}</li>)}
        </ul>
      )}
      {legenda && legenda.length > 0 && (
        <figcaption>
          <ul aria-label="Legenda" className="m-0 mt-4 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 text-body-sm text-foreground">
            {legenda.map((p) => (
              <li key={p.rotulo} className="flex items-center gap-1">
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

/** Faixa fixa do mapa (28/11/2026): até quanto vai e o texto da legenda ("26 – 75 lojas"). Use Infinity na última. */
type FaixaDoMapa = { ate: number; rotulo: string };

/** O número escrito sobre uma região: a pílula com o valor e, opcional, o "+N" no vermelho da marca ao lado. */
type EtiquetaDaRegiao = { texto: string; extra?: string };

/** As 5 faixas do mapa (tokens --mapa-1 a --mapa-5, do cinza ao rosa conforme o valor sobe), sem valor em --mapa-vazio. */
const ESCALA_DO_MAPA = ["var(--mapa-1)", "var(--mapa-2)", "var(--mapa-3)", "var(--mapa-4)", "var(--mapa-5)"];
/** Faixa (0 a 4) de um valor: divide de 0 ao máximo em 5 partes iguais; -1 quando não há valor. */
export const faixaDoMapa = (n: number, maximo: number) => (n <= 0 ? -1 : Math.min(ESCALA_DO_MAPA.length - 1, Math.floor((n / Math.max(1, maximo)) * ESCALA_DO_MAPA.length)));
/**
 * Cor de um valor (28/11/2026): com `faixas`, a primeira faixa em que o valor cabe (a 1ª faixa no --mapa-1, a 5ª no
 * --mapa-5; até 5 faixas); sem, as 5 partes iguais de 0 ao máximo. Sem valor (0), --mapa-vazio. Serve também para o
 * ponto de cor de uma lista ao lado do mapa.
 */
export function corDoMapa(n: number, maximo: number, faixas?: FaixaDoMapa[]) {
  if (n <= 0) return "var(--mapa-vazio)";
  if (faixas?.length) {
    const i = faixas.findIndex((f) => n <= f.ate);
    return ESCALA_DO_MAPA[Math.min(ESCALA_DO_MAPA.length - 1, i < 0 ? faixas.length - 1 : i)]!;
  }
  return ESCALA_DO_MAPA[faixaDoMapa(n, maximo)]!;
}

/** Legenda em lista das faixas fixas: um quadrado da cor e o texto de cada faixa. Use dentro ou fora do mapa. */
function LegendaDoMapa({ faixas, semValor, rotulo = "Legenda do mapa", className }: { faixas: FaixaDoMapa[]; /** Item a mais, para a cor de quem não tem valor ("Sem lojas"). */ semValor?: string; rotulo?: string; className?: string }) {
  return (
    <ul aria-label={rotulo} data-slot="legenda-do-mapa" className={cn("m-0 list-none space-y-1.5 p-0", className)}>
      {faixas.slice(0, ESCALA_DO_MAPA.length).map((f, i) => (
        <li key={f.rotulo} className="flex items-center gap-2.5 text-body-sm text-foreground">
          <span aria-hidden className="h-4 w-6 shrink-0 rounded-sm" style={{ background: ESCALA_DO_MAPA[i] }} />
          {f.rotulo}
        </li>
      ))}
      {semValor && (
        <li className="flex items-center gap-2.5 text-body-sm text-foreground">
          <span aria-hidden className="h-4 w-6 shrink-0 rounded-sm border border-[var(--mapa-borda)]" style={{ background: "var(--mapa-vazio)" }} />
          {semValor}
        </li>
      )}
    </ul>
  );
}

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
  faixas,
  mostrarLegenda = true,
  etiquetas,
  semDado,
  className,
}: {
  viewBox: string;
  regioes: RegiaoDoMapa[];
  /** Valor de cada região, pelo nome. Regiões com 0 ficam em --mapa-vazio. */
  valores: Map<string, number>;
  /** Descrição do mapa para leitores de tela (diga também onde estão os mesmos números em texto). */
  rotulo: string;
  /** Texto da dica de cada região ("12 lojas"); recebe também o nome, para dicas mais completas. */
  rotuloDoValor: (n: number, nome: string) => string;
  /** Região escolhida (borda forte, desenhada por cima das vizinhas). Sem onEscolher, o mapa é só para ler. */
  escolhida?: string | null;
  onEscolher?: (nome: string | null) => void;
  /** Regiões marcadas com um ponto e o nome (usam cx e cy). */
  marcadores?: string[];
  /** Nome curto no marcador, para nomes longos. */
  nomesCurtos?: Record<string, string>;
  /** Textos das pontas da legenda contínua (sem `faixas`). */
  legenda?: [string, string];
  /** Faixas fixas (28/11/2026), da menor para a maior, até 5: a cor segue a faixa e a legenda vira lista. */
  faixas?: FaixaDoMapa[];
  /** Mostra a legenda embaixo do mapa (padrão: sim). Use false para pôr a LegendaDoMapa em outro lugar. */
  mostrarLegenda?: boolean;
  /**
   * Número escrito sobre cada região (28/11/2026; usam cx e cy): a pílula com o valor e o "+N" opcional ao lado, no
   * vermelho da marca. Devolva null para não escrever nada na região. Na escolhida, a pílula fica grafite.
   */
  etiquetas?: (nome: string, valor: number) => EtiquetaDaRegiao | null | undefined;
  /** Cor das regiões que não estão em `valores` (fora dos dados), por exemplo var(--accent). Padrão: --mapa-vazio. */
  semDado?: string;
  className?: string;
}) {
  const montado = useMontado();
  const maximo = Math.max(1, ...valores.values());
  // O marcador (ponto e etiqueta) foi desenhado para o mapa de Curitiba (1027 de largura); em mapas menores, encolhe na
  // mesma proporção, para a etiqueta nunca ficar maior que a região (27/11/2026).
  const larguraDoMapa = Number(viewBox.trim().split(/[\s,]+/)[2]) || 1027;
  const k = Math.min(1, larguraDoMapa / 1027);
  // A escolhida é desenhada por último, para o contorno ficar por cima das vizinhas (28/11/2026).
  const emOrdem = escolhida ? [...regioes.filter((r) => r.nome !== escolhida), ...regioes.filter((r) => r.nome === escolhida)] : regioes;
  const cor = (nome: string) => (!valores.has(nome) && semDado ? semDado : corDoMapa(valores.get(nome) ?? 0, maximo, faixas));
  return (
    <figure data-slot="mapa-coropletico" className={cn("m-0", className)}>
      <svg viewBox={viewBox} role="img" aria-label={rotulo} className={cn("mx-auto h-auto w-full motion-safe:transition-opacity motion-safe:duration-500", montado ? "opacity-100" : "opacity-0 motion-reduce:opacity-100")}>
        {emOrdem.map((r) => {
          const n = valores.get(r.nome) ?? 0;
          const ativa = escolhida === r.nome;
          return (
            <path
              key={r.nome}
              d={r.d}
              fill={cor(r.nome)}
              stroke={ativa ? "var(--mapa-escolhida)" : "var(--mapa-borda)"}
              strokeWidth={ativa ? 7 : 2}
              strokeLinejoin="round"
              data-escolhida={ativa || undefined}
              className={cn("transition-[fill,stroke-width] duration-200", onEscolher ? "cursor-pointer hover:opacity-85" : "cursor-default")}
              onClick={onEscolher ? () => onEscolher(ativa ? null : r.nome) : undefined}
            >
              <title>{`${r.nome}: ${rotuloDoValor(n, r.nome)}`}</title>
            </path>
          );
        })}
        {etiquetas && (
          <g aria-hidden pointerEvents="none" fontFamily="var(--font-display)" fontWeight={700} textAnchor="middle" dominantBaseline="central">
            {emOrdem.map((r) => {
              if (r.cx === undefined || r.cy === undefined) return null;
              const e = etiquetas(r.nome, valores.get(r.nome) ?? 0);
              if (!e) return null;
              const ativa = escolhida === r.nome;
              const largura = (e.texto.length * 19 + 22) * k;
              const larguraExtra = e.extra ? (e.extra.length * 17 + 20) * k : 0;
              const x0 = r.cx - (largura + (larguraExtra ? larguraExtra + 4 * k : 0)) / 2;
              return (
                <g key={`e-${r.nome}`} data-etiqueta={r.nome} data-extra={e.extra || undefined}>
                  <rect x={x0} y={r.cy - 20 * k} width={largura} height={40 * k} rx={20 * k} fill={ativa ? "var(--foreground)" : "var(--card)"} stroke={ativa ? "var(--card)" : "var(--border-strong)"} strokeWidth={2 * k} />
                  <text x={x0 + largura / 2} y={r.cy + k} fontSize={30 * k} fill={ativa ? "var(--background)" : "var(--foreground)"}>{e.texto}</text>
                  {e.extra && (
                    <>
                      <rect x={x0 + largura + 4 * k} y={r.cy - 18 * k} width={larguraExtra} height={36 * k} rx={18 * k} fill="var(--primary)" stroke="var(--card)" strokeWidth={2 * k} />
                      <text x={x0 + largura + 4 * k + larguraExtra / 2} y={r.cy + k} fontSize={26 * k} fill="var(--primary-foreground)">{e.extra}</text>
                    </>
                  )}
                </g>
              );
            })}
          </g>
        )}
        {marcadores.map((nome) => {
          const r = regioes.find((x) => x.nome === nome);
          if (!r || r.cx === undefined || r.cy === undefined) return null;
          const texto = nomesCurtos[nome] ?? nome;
          return (
            <g key={nome} className="pointer-events-none">
              <circle cx={r.cx} cy={r.cy} r={24 * k} fill="var(--primary)" stroke="var(--card)" strokeWidth={7 * k} />
              <rect x={r.cx + 32 * k} y={r.cy - 38 * k} width={(texto.length * 24 + 44) * k} height={76 * k} rx={38 * k} fill="var(--card)" stroke="var(--border-strong)" strokeWidth={2 * k} />
              {/* Tamanho em unidades do mapa (proporcional ao desenho), não em pixels da tela */}
              <text x={r.cx + 54 * k} y={r.cy + 13 * k} fontSize={40 * k} className="fill-foreground font-semibold">{texto}</text>
            </g>
          );
        })}
      </svg>
      {mostrarLegenda && (
        faixas?.length ? (
          <figcaption className="mt-3"><LegendaDoMapa faixas={faixas} /></figcaption>
        ) : (
          <figcaption className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-label text-muted-foreground">
            <span className="whitespace-nowrap">{legenda[0]}</span>
            <span aria-hidden className="flex gap-1">
              {ESCALA_DO_MAPA.map((c) => <span key={c} className="h-2 w-6 rounded-full" style={{ background: c }} />)}
            </span>
            <span className="whitespace-nowrap">{legenda[1]}</span>
          </figcaption>
        )
      )}
    </figure>
  );
}

export { Rosca, BarrasHorizontais, MapaCoropletico, LegendaDoMapa };
export type { LinhaDeBarra, RegiaoDoMapa, FaixaDoMapa, EtiquetaDaRegiao };
