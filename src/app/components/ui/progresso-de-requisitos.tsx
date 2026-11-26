import * as React from "react";
import { Check, Flag } from "lucide-react";
import { CardComCabecalho, ProgressoRotulado } from "./painel-dados";
import { cn } from "./utils";

/**
 * Progresso de requisitos: quanto falta para cumprir uma lista de metas (por exemplo, para liberar um recurso).
 * CardComCabecalho com um ProgressoRotulado por requisito e a contagem de requisitos cumpridos no canto.
 * As metas e os textos vêm do produto.
 */
export type Requisito = { rotulo: string; atual: number; meta: number; unidade?: string };

export function ProgressoDeRequisitos({ titulo, descricao, itens, icone = <Flag />, rotuloCumprido = "cumprido", className }: {
  titulo: React.ReactNode;
  descricao?: React.ReactNode;
  itens: Requisito[];
  icone?: React.ReactNode;
  rotuloCumprido?: string;
  className?: string;
}) {
  const fmt = (n: number) => n.toLocaleString("pt-BR");
  const cumpridos = itens.filter((r) => r.atual >= r.meta).length;
  return (
    <CardComCabecalho
      icone={icone}
      titulo={titulo}
      descricao={descricao}
      acao={<span className="text-[0.75rem] font-semibold tabular-nums text-muted-foreground">{cumpridos} de {itens.length}</span>}
      nivel={3}
      className={className}
    >
      <div className="space-y-4">
        {itens.map((r) => (
          <ProgressoRotulado
            key={r.rotulo}
            rotulo={r.atual >= r.meta ? `${r.rotulo} · ${rotuloCumprido}` : r.rotulo}
            pct={Math.min(100, (r.atual / r.meta) * 100)}
            texto={`${fmt(r.atual)} de ${fmt(r.meta)}${r.unidade ? ` ${r.unidade}` : ""}`}
          />
        ))}
      </div>
    </CardComCabecalho>
  );
}

/**
 * Lista de requisitos: um requisito por linha, com o estado (círculo com check quando cumprido, vazio quando não), o nome
 * e a meta, a barra de progresso (verde quando cumprido, na cor da marca quando em andamento), a contagem e um selo com o
 * estado escrito. Em telas estreitas, a barra e o selo descem para baixo do nome. Metas e textos vêm do produto.
 */
export type RequisitoDaLista = { rotulo: React.ReactNode; detalhe?: React.ReactNode; atual: number; meta: number; unidade?: string };

export function ListaDeRequisitos({ itens, rotulos = { cumprido: "Cumprido", andamento: "Em andamento" }, className }: {
  itens: RequisitoDaLista[];
  rotulos?: { cumprido: string; andamento: string };
  className?: string;
}) {
  const fmt = (n: number) => n.toLocaleString("pt-BR");
  return (
    <ul data-slot="lista-de-requisitos" className={cn("@container m-0 list-none divide-y divide-border p-0", className)}>
      {itens.map((r, i) => {
        const ok = r.atual >= r.meta;
        const pct = r.meta > 0 ? Math.min(100, (r.atual / r.meta) * 100) : 0;
        return (
          <li key={i} data-cumprido={ok} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-2 py-3 @2xl:grid-cols-[auto_minmax(0,14rem)_minmax(0,1fr)_auto_7.5rem]">
            <span aria-hidden className={cn("flex size-7 items-center justify-center rounded-full", ok ? "bg-success text-white" : "border-2 border-[var(--border-strong,var(--border))]")}>
              {ok && <Check className="size-4" strokeWidth={3} />}
            </span>
            <span className="min-w-0">
              <span className="block text-[0.9375rem] font-bold text-foreground">{r.rotulo}</span>
              {r.detalhe && <span className="block text-[0.8125rem] text-muted-foreground">{r.detalhe}</span>}
            </span>
            <span aria-hidden className="col-span-2 block h-2 overflow-hidden rounded-full bg-muted @2xl:col-span-1">
              <span className={cn("block h-full rounded-full", ok ? "bg-success" : "bg-primary")} style={{ width: `${pct}%` }} />
            </span>
            <span className="col-start-2 text-[0.875rem] tabular-nums text-foreground @2xl:col-start-auto @2xl:text-right">{fmt(r.atual)} de {fmt(r.meta)}{r.unidade ? ` ${r.unidade}` : ""}</span>
            <span className={cn("col-start-2 w-fit rounded-full px-2.5 py-1 text-[0.75rem] font-semibold @2xl:col-start-auto @2xl:justify-self-end", ok ? "bg-[color:color-mix(in_oklab,var(--success)_14%,var(--card))] text-[color:var(--success-text,var(--success))]" : "bg-[var(--primary-muted)] text-[var(--primary-text,var(--primary))]")}>
              {ok ? rotulos.cumprido : rotulos.andamento}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
