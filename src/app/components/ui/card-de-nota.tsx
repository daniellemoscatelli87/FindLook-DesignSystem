"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "./utils";
import { Explicacao, superficieDoCard } from "./painel-dados";

/**
 * Card de nota: a nota de agora em destaque (número grande sobre um total, com a classificação embaixo) e, ao lado,
 * uma mensagem curta sobre o próximo passo, com uma barra de progresso. Sem nota, mostra o traço e o texto de estado.
 * A mensagem, a classificação e o progresso vêm do produto. No celular, a mensagem desce para baixo da nota.
 * `detalheProgresso` (opcional) aparece embaixo da barra, à direita (ex.: "8 de 10").
 */
export function CardDeNota({ rotulo, explicacao, valor, total = 100, selo, titulo, texto, progresso, rotuloProgresso, detalheProgresso, className }: {
  rotulo: string;
  /** Texto do "i" ao lado do rótulo. */
  explicacao?: React.ReactNode;
  /** Nota (número inteiro) ou null sem nota. */
  valor: number | null;
  total?: number;
  /** Classificação (ex.: um BadgeDeFaixa). */
  selo?: React.ReactNode;
  titulo: React.ReactNode;
  texto?: React.ReactNode;
  /** 0 a 100. Sem valor, a barra não aparece. */
  progresso?: number | null;
  /** O que a barra mede, para leitores de tela. */
  rotuloProgresso?: string;
  detalheProgresso?: React.ReactNode;
  className?: string;
}) {
  const reduzir = useReducedMotion();
  return (
    <div className={cn("@container flex", className)}>
    <section data-slot="card-de-nota" aria-label={rotulo} className={cn("flex w-full items-center rounded-lg p-5 @xl:px-6", superficieDoCard)}>
      <div className="flex w-full flex-col gap-5 @xl:flex-row @xl:items-center @xl:gap-8">
        <div className="shrink-0">
          <p className="m-0 flex items-center gap-1 text-[0.9375rem] font-semibold text-foreground">
            {rotulo}{explicacao && <Explicacao termo={rotulo}>{explicacao}</Explicacao>}
          </p>
          <p className="m-0 mt-1 flex items-baseline gap-1.5">
            <span className="font-[family-name:var(--font-display)] text-[3.25rem] font-extrabold leading-none tracking-[-0.04em] text-foreground tabular-nums">{valor ?? "—"}</span>
            <span className="text-[1.25rem] font-semibold text-muted-foreground">/{total}</span>
          </p>
          {selo && <div className="mt-2.5">{selo}</div>}
        </div>
        <span aria-hidden className="hidden w-px self-stretch bg-border @xl:block" />
        <div className="min-w-0 flex-1">
          <p className="m-0 text-[1.0625rem] font-bold leading-snug text-foreground">{titulo}</p>
          {texto && <p className="m-0 mt-1 max-w-[46ch] text-[0.875rem] leading-relaxed text-muted-foreground">{texto}</p>}
          {progresso != null && (
            <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-muted" role="progressbar" aria-label={rotuloProgresso ?? "Progresso"} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progresso)}>
              <motion.span
                className="block h-full rounded-full bg-primary"
                initial={reduzir ? false : { width: 0 }}
                animate={{ width: `${Math.max(0, Math.min(100, progresso))}%` }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          )}
          {progresso != null && detalheProgresso && <p className="m-0 mt-1.5 text-right text-[0.875rem] font-medium text-muted-foreground tabular-nums">{detalheProgresso}</p>}
        </div>
      </div>
    </section>
    </div>
  );
}
