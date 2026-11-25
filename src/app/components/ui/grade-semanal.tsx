"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { Check } from "lucide-react";
import { cn } from "./utils";

/**
 * Grade semanal: em quais períodos de cada dia algo acontece (atendimento, entrega, agenda).
 * Cada linha é um dia; cada período é um botão que liga e desliga (aria-pressed), com o rótulo e o detalhe (horário).
 * Em cima, atalhos para ligar ou desligar um período em todos os dias. Os dias, os períodos e os horários vêm do produto.
 * Sem rolagem horizontal: os períodos dividem a largura; em telas estreitas o nome do dia fica em cima.
 */
export type ItemDaGrade = { valor: string; rotulo: string; detalhe?: string };
export type ValorDaGrade = Record<string, string[]>;

const chip = (ligado: boolean) => cn(
  "relative flex min-h-11 w-full min-w-0 flex-col items-center justify-center rounded-md border px-2 py-1.5 text-center outline-none transition-colors",
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  ligado
    ? "border-primary/40 bg-[var(--primary-muted)] text-[var(--primary-text,var(--primary))]"
    : "border-border bg-card text-foreground hover:border-primary/30 hover:bg-[var(--primary-muted)]/50",
);

export function GradeSemanal({ dias, periodos, valor, onChange, rotuloAtalhos = "Em todos os dias", disabled = false, className }: {
  dias: ItemDaGrade[];
  periodos: ItemDaGrade[];
  valor: ValorDaGrade;
  onChange: (v: ValorDaGrade) => void;
  rotuloAtalhos?: string;
  disabled?: boolean;
  className?: string;
}) {
  const id = React.useId().replace(/:/g, "");
  const tem = (d: string, p: string) => (valor[d] ?? []).includes(p);
  const ordenar = (lista: string[]) => periodos.map((p) => p.valor).filter((p) => lista.includes(p));
  const mudar = (d: string, p: string, ligar: boolean) => {
    const atual = valor[d] ?? [];
    onChange({ ...valor, [d]: ordenar(ligar ? [...atual, p] : atual.filter((x) => x !== p)) });
  };
  const emTodos = (p: string) => dias.every((d) => tem(d.valor, p));
  const mudarColuna = (p: string, ligar: boolean) => {
    const novo: ValorDaGrade = { ...valor };
    for (const d of dias) {
      const atual = novo[d.valor] ?? [];
      novo[d.valor] = ordenar(ligar ? Array.from(new Set([...atual, p])) : atual.filter((x) => x !== p));
    }
    onChange(novo);
  };
  const colunas = { gridTemplateColumns: `repeat(${periodos.length}, minmax(0, 1fr))` };

  return (
    <div data-slot="grade-semanal" className={cn("@container space-y-3", className)}>
      <div role="group" aria-labelledby={`${id}-atalhos`} className="grid grid-cols-1 items-center gap-2 rounded-md bg-muted p-2 @md:grid-cols-[7.5rem_minmax(0,1fr)]">
        <span id={`${id}-atalhos`} className="px-1 text-[0.8125rem] font-semibold text-foreground">{rotuloAtalhos}</span>
        <div className="grid gap-2" style={colunas}>
          {periodos.map((p) => {
            const ligado = emTodos(p.valor);
            return (
              <TogglePrimitive.Root key={p.valor} pressed={ligado} onPressedChange={(v) => mudarColuna(p.valor, v)} disabled={disabled}
                aria-label={`${p.rotulo}${p.detalhe ? ` (${p.detalhe})` : ""}, ${rotuloAtalhos.toLowerCase()}`} className={cn(chip(ligado), "min-h-9 py-1")} data-atalho={p.valor}>
                <span className="flex items-center gap-1 text-[0.8125rem] font-semibold">{ligado && <Check aria-hidden className="size-3.5" />}{p.rotulo}</span>
              </TogglePrimitive.Root>
            );
          })}
        </div>
      </div>

      <div className="divide-y divide-border">
        {dias.map((d) => (
          <div key={d.valor} role="group" aria-labelledby={`${id}-${d.valor}`} className="grid grid-cols-1 items-center gap-2 py-2.5 first:pt-0 last:pb-0 @md:grid-cols-[7.5rem_minmax(0,1fr)]" data-dia={d.valor}>
            <span id={`${id}-${d.valor}`} className="text-[0.875rem] font-medium text-foreground">
              {d.rotulo}
              {(valor[d.valor] ?? []).length === 0 && <span className="ml-1.5 text-[0.75rem] font-normal text-muted-foreground">· sem horário</span>}
            </span>
            <div className="grid gap-2" style={colunas}>
              {periodos.map((p) => {
                const ligado = tem(d.valor, p.valor);
                return (
                  <TogglePrimitive.Root key={p.valor} pressed={ligado} onPressedChange={(v) => mudar(d.valor, p.valor, v)} disabled={disabled}
                    aria-label={`${d.rotulo}, ${p.rotulo}${p.detalhe ? ` (${p.detalhe})` : ""}`} className={chip(ligado)} data-periodo={p.valor}>
                    {ligado && <Check aria-hidden className="absolute right-1.5 top-1.5 size-3" />}
                    <span className="text-[0.8125rem] font-semibold leading-tight">{p.rotulo}</span>
                    {p.detalhe && <span className={cn("text-[0.6875rem] leading-tight tabular-nums", ligado ? "" : "text-muted-foreground")}>{p.detalhe}</span>}
                  </TogglePrimitive.Root>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
