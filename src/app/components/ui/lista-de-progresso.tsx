"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "./utils";
import { IconeComBase } from "./painel-dados";

/**
 * Lista de progresso: vários itens comparados lado a lado, cada um com ícone, nome, uma etiqueta curta (peso, meta…),
 * uma barra e o valor. Para mostrar "onde estou melhor e onde focar" sem tabela. Sem valor, a barra fica vazia e o
 * texto explica (ex.: "Sem dados"). Em telas estreitas, a barra desce para baixo do nome. As barras crescem ao aparecer
 * (sem animação com "menos movimento").
 */
export type ItemDeProgresso = {
  id: string;
  icone: React.ReactNode;
  rotulo: string;
  etiqueta?: string;
  /** 0 a 100, ou null quando não há valor. */
  pct: number | null;
  /** Valor em texto (ex.: "83"); some quando pct é null. */
  valor?: React.ReactNode;
  /** Complemento do valor (ex.: "/100"). */
  total?: string;
  semValor?: string;
};

export function ListaDeProgresso({ itens, onSelecionar, tom = "neutro", className }: {
  itens: ItemDeProgresso[];
  /** Base do ícone: neutro (padrão, só identifica o item) ou marca. */
  tom?: "marca" | "neutro";
  /** Torna cada linha clicável (abre o detalhe do item). */
  onSelecionar?: (id: string) => void;
  className?: string;
}) {
  const reduzir = useReducedMotion();
  return (
    <ul data-slot="lista-de-progresso" className={cn("@container m-0 list-none space-y-1 p-0", className)}>
      {itens.map((i, n) => {
        const conteudo = (
          <>
            <IconeComBase tom={tom}>{i.icone}</IconeComBase>
            <div className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 @lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)_4.5rem]">
              <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5">
                <span className="whitespace-nowrap text-[0.9375rem] font-semibold text-foreground">{i.rotulo}</span>
                {i.etiqueta && <span className="rounded-full bg-muted px-2 py-0.5 text-[0.6875rem] font-medium text-muted-foreground">{i.etiqueta}</span>}
              </span>
              <span className="col-span-2 row-start-2 block h-2.5 overflow-hidden rounded-full bg-muted @lg:col-span-1 @lg:col-start-2 @lg:row-start-1" aria-hidden>
                {i.pct != null && (
                  <motion.span
                    className="block h-full rounded-full bg-primary"
                    initial={reduzir ? false : { width: 0 }}
                    animate={{ width: `${Math.max(0, Math.min(100, i.pct))}%` }}
                    transition={{ duration: 0.7, delay: reduzir ? 0 : n * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </span>
              <span className="text-right text-[0.9375rem] tabular-nums @lg:col-start-3 @lg:row-start-1">
                {i.pct != null
                  ? <><strong className="font-bold text-foreground">{i.valor}</strong>{i.total && <span className="text-muted-foreground">{i.total}</span>}</>
                  : <span className="text-[0.8125rem] text-muted-foreground">{i.semValor ?? "Sem dados"}</span>}
              </span>
            </div>
          </>
        );
        return (
          <li key={i.id} data-item={i.id}>
            {onSelecionar ? (
              <button type="button" onClick={() => onSelecionar(i.id)} className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-[var(--primary-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {conteudo}
              </button>
            ) : <div className="flex items-center gap-3 px-2 py-2">{conteudo}</div>}
          </li>
        );
      })}
    </ul>
  );
}
