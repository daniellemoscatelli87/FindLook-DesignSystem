"use client";

import * as React from "react";
import { Bell } from "lucide-react";
import { cn } from "./utils";
import { NumeroAnimado } from "./numero-animado";
import { useMenosMovimento } from "./movimento";

/**
 * Miniatura do painel: uma ilustração conceitual do painel da loja para páginas de venda (hero da página do lojista),
 * montada com as mesmas formas do painel de verdade, em escala reduzida. É uma ilustração: fica fora da leitura de
 * tela e o aviso embaixo ("Ilustração conceitual com dados fictícios") é lido.
 * - MiniaturaDoPainel: a janela (três pontos, logo, sino com aviso pulsando e a foto), o menu lateral fechado (só
 *   ícones, o ativo no rosa do selecionado), o título e o conteúdo. `moldura="nenhuma"` tira a borda e o fundo para
 *   pôr a miniatura dentro de outra superfície (por exemplo, o GlassCard "painel" na página escura).
 * - IndicadoresDaMiniatura: os cards de resumo, número ao lado do ícone (o número sobe ao aparecer: NumeroAnimado);
 *   `sinal` "check" (feito) ou "alta" (seta verde de crescimento, sem porcentagem).
 * - GraficoDaMiniatura: área com a linha que se desenha da esquerda para a direita e o ponto final pulsando.
 * - TabelaDaMiniatura: peça, quantidade, preço e situação (ChipDeEstado ou o que vier em `situacao`).
 * Textos de no mínimo 11 px (a legenda da escala). Com "menos movimento", tudo aparece pronto e parado.
 * Regra de conteúdo: dados de exemplo identificados no aviso; trocados pelos reais antes do lançamento.
 */

export type ItemDoMenuDaMiniatura = { rotulo: string; icone: React.ReactNode };

export type MiniaturaDoPainelProps = {
  titulo: string;
  menu: ItemDoMenuDaMiniatura[];
  ativo?: number;
  logo?: React.ReactNode;
  avatar?: string;
  aviso?: string;
  moldura?: "card" | "nenhuma";
  className?: string;
  children?: React.ReactNode;
};

export function MiniaturaDoPainel({ titulo, menu, ativo = 0, logo, avatar, aviso = "Ilustração conceitual com dados fictícios", moldura = "card", className, children }: MiniaturaDoPainelProps) {
  const menos = useMenosMovimento();
  return (
    <figure data-slot="miniatura-do-painel" className={cn("m-0 min-w-0", className)}>
      <div aria-hidden className={cn("overflow-hidden", moldura === "card" && "rounded-xl border border-border bg-card shadow-[var(--shadow-lg)]")}>
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          {[0, 1, 2].map((i) => <span key={i} className="size-2.5 rounded-full bg-muted-foreground/30" />)}
          {logo && <span className="ml-3 flex h-6 items-center sm:h-7 [&_[data-slot=logo]]:h-full">{logo}</span>}
          <span className="ml-auto flex items-center gap-3">
            <span className="relative flex size-7 items-center justify-center text-foreground">
              <Bell className="size-4" />
              <span className="absolute right-1 top-0.5 size-1.5 rounded-full bg-primary" />
              {!menos && <span className="absolute right-1 top-0.5 size-1.5 animate-ping rounded-full bg-primary" />}
            </span>
            {avatar ? <img src={avatar} alt="" className="size-8 rounded-full object-cover ring-1 ring-border" /> : <span className="size-8 rounded-full bg-muted" />}
          </span>
        </div>
        <div className="flex">
          <div className="flex w-12 shrink-0 flex-col items-center gap-2 border-r border-border py-4 sm:w-14">
            {menu.map((m, i) => (
              <span key={m.rotulo} title={m.rotulo} className={cn("flex size-8 items-center justify-center rounded-md [&>svg]:size-4", i === ativo ? "bg-[var(--primary-suave)] text-primary-text" : "text-muted-foreground")}>
                {m.icone}
              </span>
            ))}
          </div>
          <div className="min-w-0 flex-1 space-y-3 p-4">
            <p className="m-0 text-body font-bold text-foreground">{titulo}</p>
            {children}
          </div>
        </div>
      </div>
      {aviso && <figcaption className="mt-3 text-center text-label text-muted-foreground">{aviso}</figcaption>}
    </figure>
  );
}

export type IndicadorDaMiniatura = { icone: React.ReactNode; valor: number; rotulo: string; sinal?: "check" | "alta"; tom?: "marca" | "neutro" };

export function IndicadoresDaMiniatura({ itens, className }: { itens: IndicadorDaMiniatura[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-2 @container", className)}>
      {itens.map((it, i) => (
        <div key={it.rotulo} className="relative min-w-0 rounded-md border border-border bg-card p-2.5">
          <div className="flex items-center gap-2">
            <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-sm [&>svg]:size-3.5", it.tom === "neutro" ? "bg-muted text-muted-foreground" : "bg-[var(--primary-muted)] text-primary-text")}>{it.icone}</span>
            <NumeroAnimado valor={it.valor} atraso={0.2 + i * 0.1} className="text-body-lg font-bold leading-none text-foreground" />
          </div>
          <p className="m-0 mt-1.5 truncate text-caption text-muted-foreground">{it.rotulo}</p>
          {it.sinal === "check" && <span className="absolute right-2 top-2 text-success-text"><svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={3}><path d="m5 12 5 5L20 7" /></svg></span>}
          {it.sinal === "alta" && <span className="absolute right-2 top-2 text-success-text"><svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M7 17 17 7M9 7h8v8" /></svg></span>}
        </div>
      ))}
    </div>
  );
}

/** Curva suave (Catmull-Rom) que passa por todos os pontos, em coordenadas 0–100. */
function curva(pts: [number, number][]) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [p0, p1, p2, p3] = [pts[i - 1] ?? pts[i], pts[i], pts[i + 1], pts[i + 2] ?? pts[i + 1]];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  return d;
}

export function GraficoDaMiniatura({ titulo, valores, eixoX, className }: { titulo: string; valores: number[]; eixoX?: string[]; className?: string }) {
  const id = React.useId().replace(/:/g, "");
  const menos = useMenosMovimento();
  const max = Math.max(...valores) * 1.1;
  const pts = valores.map((v, i) => [(i / (valores.length - 1)) * 100, 100 - (v / max) * 100] as [number, number]);
  const linha = curva(pts);
  const fim = pts[pts.length - 1];
  return (
    <div className={cn("rounded-md border border-border bg-card p-3", className)}>
      <p className="m-0 text-label font-semibold text-foreground">{titulo}</p>
      <div className="relative mt-2 h-20 border-b border-l border-border">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
          <defs>
            <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
            <clipPath id={`${id}-revela`}>
              <rect x={-5} y={-10} height={120} width={110} className={menos ? undefined : "fl-miniatura-revela"} />
            </clipPath>
          </defs>
          <g clipPath={`url(#${id}-revela)`}>
            <path d={`${linha} L100,100 L0,100 Z`} fill={`url(#${id}-area)`} />
            <path d={linha} fill="none" stroke="var(--primary)" strokeWidth={2} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </g>
        </svg>
        <span className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-card" style={{ left: `${fim[0]}%`, top: `${fim[1]}%` }} />
        {!menos && <span className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-primary/60" style={{ left: `${fim[0]}%`, top: `${fim[1]}%` }} />}
      </div>
      {eixoX && (
        <div className="mt-1.5 flex justify-between text-caption leading-none text-muted-foreground">
          {eixoX.map((d) => <span key={d}>{d}</span>)}
        </div>
      )}
    </div>
  );
}

export type LinhaDaMiniatura = { nome: string; detalhe?: string; foto?: string; quantidade: number; preco: string; situacao: React.ReactNode };

export function TabelaDaMiniatura({ colunas = ["Peça", "Qtd.", "Preço", "Situação"], linhas, className }: { colunas?: [string, string, string, string]; linhas: LinhaDaMiniatura[]; className?: string }) {
  return (
    <div className={cn("rounded-md border border-border bg-card", className)}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-3 border-b border-border px-3 py-2 text-caption font-semibold uppercase tracking-[0.06em] text-muted-foreground sm:grid-cols-[minmax(0,1fr)_2.5rem_4.5rem_auto]">
        <span>{colunas[0]}</span><span className="hidden sm:block">{colunas[1]}</span><span>{colunas[2]}</span><span>{colunas[3]}</span>
      </div>
      {linhas.map((l) => (
        <div key={l.nome} className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 border-b border-border px-3 py-2 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_2.5rem_4.5rem_auto]">
          <span className="flex min-w-0 items-center gap-2">
            {l.foto ? <img src={l.foto} alt="" className="size-8 shrink-0 rounded-sm object-cover" /> : <span className="size-8 shrink-0 rounded-sm bg-muted" />}
            <span className="min-w-0">
              <span className="block truncate text-label font-semibold text-foreground">{l.nome}</span>
              {l.detalhe && <span className="block truncate text-caption text-muted-foreground">{l.detalhe}</span>}
            </span>
          </span>
          <span className="hidden text-label tabular-nums text-foreground sm:block">{l.quantidade}</span>
          <span className="text-label tabular-nums text-foreground">{l.preco}</span>
          <span>{l.situacao}</span>
        </div>
      ))}
    </div>
  );
}
