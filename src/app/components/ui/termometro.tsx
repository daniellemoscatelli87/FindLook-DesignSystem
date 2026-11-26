"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Clock } from "lucide-react";
import { cn } from "./utils";
import { Badge } from "./badge";

/**
 * Termômetro: uma pontuação de 0 a 100 numa escala de até 5 faixas, da mais crítica à mais favorável (tokens
 * --termometro-1..5). As faixas recebidas do produto podem ter tamanhos diferentes: o termômetro desenha cada uma
 * proporcional ao intervalo de pontos e marca a posição real. Só a faixa atual fica em cor cheia, e o nome dela vem
 * sempre escrito (BadgeDeFaixa), para a cor nunca ser a única pista.
 * O DS não define faixas, nomes, limites nem regras: tudo isso vem do produto.
 */
export type FaixaDoTermometro = {
  id: string;
  nome: string;
  /** Início da faixa (inclusivo), de 0 a 100. */
  inicio: number;
  /** Fim da faixa (exclusivo; a última faixa inclui 100). */
  fim: number;
  /** Tom da escala, de 1 (mais crítico) a 5 (mais favorável). */
  tom: 1 | 2 | 3 | 4 | 5;
};

const limitar = (v: number) => Math.min(100, Math.max(0, v));

export function faixaDoValor(faixas: readonly FaixaDoTermometro[], valor: number): FaixaDoTermometro | undefined {
  const v = limitar(valor);
  return faixas.find((f, i) => v >= f.inicio && (v < f.fim || i === faixas.length - 1));
}

/** Número para a tela, arredondado para baixo (nunca mostra a pontuação de uma faixa que ainda não foi alcançada). */
export const valorExibido = (valor: number) => Math.floor(limitar(valor));

export const corDoTom = (tom: number) => `var(--termometro-${tom})`;

/* ── Badge da faixa (Badge do DS com o ponto do tom) ─────────── */
/** `preenchida`: fundo claro no tom da faixa, maior, para o destaque da nota (o nome continua escrito). */
export function BadgeDeFaixa({ faixa, semFaixa = "Em avaliação", preenchida = false, className }: { faixa?: FaixaDoTermometro | null; semFaixa?: string; preenchida?: boolean; className?: string }) {
  return (
    <Badge
      variant="outline"
      data-slot="badge-de-faixa"
      className={cn("rounded-full px-2.5 font-semibold", preenchida && "gap-2 border-transparent px-3.5 py-1 text-[0.875rem] text-foreground", className)}
      style={preenchida ? { background: faixa ? `color-mix(in srgb, ${corDoTom(faixa.tom)} 18%, var(--card))` : "var(--muted)" } : undefined}
    >
      {faixa ? <span aria-hidden className="size-2 rounded-full" style={{ background: corDoTom(faixa.tom) }} /> : <Clock aria-hidden />}
      {faixa ? faixa.nome : semFaixa}
    </Badge>
  );
}

/* ── Termômetro ─────────────────────────────────────────────── */
export function Termometro({ faixas, valor, rotulo, compacto = false, className }: {
  faixas: readonly FaixaDoTermometro[];
  /** Pontuação de 0 a 100, ou null quando ainda não há pontuação. */
  valor: number | null;
  /** Nome do que está sendo medido, para leitores de tela. */
  rotulo: string;
  compacto?: boolean;
  className?: string;
}) {
  const reduzir = useReducedMotion();
  const v = valor == null ? null : limitar(valor);
  const faixa = v == null ? undefined : faixaDoValor(faixas, v);
  return (
    <div
      data-slot="termometro"
      // Sem pontuação, não é um medidor (não há valor): vira uma imagem com a descrição em texto.
      {...(v == null
        ? { role: "img", "aria-label": `${rotulo}: sem pontuação` }
        : { role: "meter", "aria-label": rotulo, "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": valorExibido(v),
            "aria-valuetext": `${rotulo}: ${valorExibido(v)} de 100${faixa ? `, ${faixa.nome}` : ""}` })}
      className={cn("w-full", className)}
    >
      <div className="relative py-1">
        <div className={cn("flex w-full gap-[3px]", compacto ? "h-1.5" : "h-2")}>
          {faixas.map((f) => (
            <span
              key={f.id}
              aria-hidden
              className="h-full rounded-full transition-opacity duration-[var(--duration-normal,250ms)]"
              style={{
                flexBasis: `${f.fim - f.inicio}%`,
                background: v == null ? "var(--muted)" : corDoTom(f.tom),
                opacity: v == null || faixa?.id === f.id ? 1 : 0.22,
              }}
            />
          ))}
        </div>
        {v != null && faixa && (
          <motion.span
            aria-hidden
            className={cn("absolute top-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card shadow-[var(--shadow-sm)]", compacto ? "size-3" : "size-4")}
            style={{ background: corDoTom(faixa.tom) }}
            initial={reduzir ? false : { left: "0%" }}
            animate={{ left: `${v}%` }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </div>
    </div>
  );
}

/* ── Escala de faixas ───────────────────────────────────────── */
/**
 * Escala de faixas: todas as faixas de uma pontuação, uma por linha, no tom de cada faixa. À esquerda, o ícone num quadrado
 * cheio no tom; depois o nome em destaque e o intervalo numa pílula; à direita, a explicação. O nome está sempre escrito (a
 * cor nunca é a única pista) e o ícone é decorativo. Faixas, ícones, intervalos e textos vêm do produto. Em telas
 * estreitas, a explicação desce para baixo do nome.
 */
export function EscalaDeFaixas({ faixas, intervalo, descricao, icone, atual, className }: {
  faixas: readonly FaixaDoTermometro[];
  /** Texto do intervalo de cada faixa (ex.: "80 a 94 pontos"). */
  intervalo: (f: FaixaDoTermometro, i: number) => React.ReactNode;
  descricao?: (f: FaixaDoTermometro) => React.ReactNode;
  /** Ícone de cada faixa (decorativo). Sem ícone, aparece o ponto no tom. */
  icone?: (f: FaixaDoTermometro, i: number) => React.ReactNode;
  /** id da faixa atual, informada aos leitores de tela. */
  atual?: string;
  className?: string;
}) {
  const tinta = (f: FaixaDoTermometro, pct: number) => `color-mix(in srgb, ${corDoTom(f.tom)} ${pct}%, var(--card))`;
  return (
    <ul data-slot="escala-de-faixas" className={cn("@container m-0 list-none space-y-3 p-0", className)}>
      {faixas.map((f, i) => (
        <li key={f.id} data-faixa={f.id} aria-current={atual === f.id ? "true" : undefined}
          className="flex flex-col gap-3 rounded-lg border px-4 py-3.5 @2xl:flex-row @2xl:items-center @2xl:gap-5"
          style={{ background: `linear-gradient(90deg, ${tinta(f, 12)}, ${tinta(f, 3)})`, borderColor: tinta(f, 22) }}>
          <div className="flex min-w-0 items-center gap-4 @2xl:w-[22rem] @2xl:shrink-0">
            <span aria-hidden className="flex size-12 shrink-0 items-center justify-center rounded-md text-white [&>svg]:size-6" style={{ background: corDoTom(f.tom) }}>
              {icone ? icone(f, i) : <span className="size-3 rounded-full bg-white" />}
            </span>
            <span aria-hidden className="h-9 w-px shrink-0" style={{ background: tinta(f, 35) }} />
            <span className="min-w-0 flex-1 font-[family-name:var(--font-display,var(--font-sans))] text-[1.25rem] font-extrabold leading-tight tracking-[-0.01em] text-foreground">
              {f.nome}{atual === f.id && <span className="sr-only"> (sua faixa atual)</span>}
            </span>
            <span className="shrink-0 rounded-full px-3 py-1 text-[0.875rem] font-medium text-foreground" style={{ background: tinta(f, 24) }}>{intervalo(f, i)}</span>
          </div>
          {descricao && (
            <p className="m-0 min-w-0 flex-1 text-[0.875rem] leading-snug text-foreground/80 @2xl:border-l @2xl:pl-5" style={{ borderColor: tinta(f, 35) }}>{descricao(f)}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
