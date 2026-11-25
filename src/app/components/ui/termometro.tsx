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
export function BadgeDeFaixa({ faixa, semFaixa = "Em avaliação", className }: { faixa?: FaixaDoTermometro | null; semFaixa?: string; className?: string }) {
  return (
    <Badge variant="outline" data-slot="badge-de-faixa" className={cn("rounded-full px-2.5 font-semibold", className)}>
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
      role="meter"
      aria-label={rotulo}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={v == null ? undefined : valorExibido(v)}
      aria-valuetext={v == null ? `${rotulo}: sem pontuação` : `${rotulo}: ${valorExibido(v)} de 100${faixa ? `, ${faixa.nome}` : ""}`}
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
