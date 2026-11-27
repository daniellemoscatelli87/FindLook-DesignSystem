"use client";

import * as React from "react";
import { cn } from "./utils";
import { DURACAO_MS, curvaCss } from "./movimento";

/**
 * Cursor de demonstração: a seta grande que "conta a história" de uma demonstração em etapas (entra, clica no campo,
 * digita, aperta o botão), como na seção "Do outro lado da busca" da página do lojista.
 * - CursorDeDemonstracao: a seta (branca, contorno grafite: visível sobre fundo claro e escuro), posicionada de forma
 *   absoluta dentro do palco (o contêiner com position: relative). Fica fora da leitura de tela e não recebe cliques.
 * - moverCursor(cursor, palco, alvo): leva a seta até o centro do alvo, com --ease-snappy; devolve uma promessa.
 * - clicarCursor(cursor): o "clique" (encolhe e volta, em --duration-fast).
 * Com "menos movimento", não use o cursor: mostre a demonstração já no estado final.
 * Regra de uso: se a pessoa clicar antes, o cursor sai e a demonstração segue pelos cliques dela.
 */
export const CursorDeDemonstracao = React.forwardRef<HTMLDivElement, { visivel?: boolean; className?: string }>(
  function CursorDeDemonstracao({ visivel = false, className }, ref) {
    return (
      <div
        ref={ref}
        aria-hidden
        data-slot="cursor-de-demonstracao"
        data-visivel={visivel ? "" : undefined}
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-20 opacity-0 transition-opacity duration-[var(--duration-normal)] data-[visivel]:opacity-100 motion-reduce:hidden",
          className,
        )}
      >
        <svg viewBox="0 0 28 28" className="size-11 fill-[var(--brand-white)] stroke-[var(--graphite-950)]" strokeWidth={1.6} strokeLinejoin="round">
          <path d="M3 2 4 23 10.5 17 15.5 26 20 23.5 15 15.5 24 13Z" />
        </svg>
      </div>
    );
  },
);

/** Leva a ponta da seta até o centro do alvo (coordenadas relativas ao palco). */
export function moverCursor(cursor: HTMLElement, palco: HTMLElement, alvo: HTMLElement, duracaoMs: number = DURACAO_MS.extraLenta * 1.5): Promise<void> {
  const p = palco.getBoundingClientRect();
  const a = alvo.getBoundingClientRect();
  const x = a.left - p.left + a.width / 2 - 4;
  const y = a.top - p.top + a.height / 2 - 2;
  const de = cursor.style.transform || "translate(0px, 0px)";
  const para = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
  cursor.style.transform = para;
  if (!cursor.animate) return Promise.resolve();
  const anim = cursor.animate([{ transform: de }, { transform: para }], { duration: duracaoMs, easing: curvaCss("snappy") });
  return anim.finished.then(() => undefined, () => undefined);
}

/** O clique: a seta encolhe e volta. */
export function clicarCursor(cursor: HTMLElement): Promise<void> {
  const svg = cursor.firstElementChild as HTMLElement | null;
  if (!svg?.animate) return Promise.resolve();
  const anim = svg.animate([{ transform: "scale(1)" }, { transform: "scale(0.82)" }, { transform: "scale(1)" }], { duration: DURACAO_MS.normal, easing: curvaCss("saida") });
  return anim.finished.then(() => undefined, () => undefined);
}
