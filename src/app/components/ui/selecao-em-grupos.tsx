"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Search, X } from "lucide-react";
import { cn } from "./utils";
import { Checkbox } from "./checkbox";

/**
 * Seleção em grupos: escolher vários itens de uma lista longa organizada em grupos (por exemplo, bairros por região).
 * Busca por nome (sem acento), caixa de seleção do grupo inteiro (marcada, parcial ou vazia), contagem e o resumo do que
 * já foi escolhido, com botão para tirar cada item. Os grupos começam fechados; a busca abre os que têm resultado.
 * Os grupos e os itens vêm do produto.
 */
export type GrupoDeSelecao = { valor: string; rotulo: string; itens: { valor: string; rotulo: string }[] };

const TEXTOS = {
  buscar: "Buscar",
  nenhum: "Nada encontrado com esse nome.",
  selecionados: (n: number, total: number) => `${n} de ${total} escolhidos`,
  nenhumSelecionado: "Nenhum escolhido ainda.",
  limpar: "Limpar",
  tirar: (rotulo: string) => `Tirar ${rotulo}`,
  doGrupo: (n: number, total: number) => `${n} de ${total}`,
  todosDoGrupo: (rotulo: string) => `Todos de ${rotulo}`,
  mais: (n: number) => `+${n}`,
};

const semAcento = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function SelecaoEmGrupos({ grupos, valor, onChange, rotulo, maxResumo = 8, textos, disabled = false, className }: {
  grupos: GrupoDeSelecao[];
  valor: string[];
  onChange: (v: string[]) => void;
  /** Nome do conjunto, para leitores de tela e para o campo de busca (ex.: "bairros"). */
  rotulo: string;
  /** Quantos itens escolhidos aparecem no resumo antes do "+N". */
  maxResumo?: number;
  textos?: Partial<typeof TEXTOS>;
  disabled?: boolean;
  className?: string;
}) {
  const t = { ...TEXTOS, ...textos };
  const id = React.useId().replace(/:/g, "");
  const reduzir = useReducedMotion();
  const [busca, setBusca] = React.useState("");
  const [abertos, setAbertos] = React.useState<Set<string>>(new Set());
  const [verTodos, setVerTodos] = React.useState(false);
  const escolhidos = new Set(valor);
  const todos = grupos.flatMap((g) => g.itens);
  const nome = new Map(todos.map((i) => [i.valor, i.rotulo]));
  const termo = semAcento(busca.trim());
  const visiveis = grupos
    .map((g) => ({ ...g, itens: termo ? g.itens.filter((i) => semAcento(i.rotulo).includes(termo) || semAcento(g.rotulo).includes(termo)) : g.itens }))
    .filter((g) => g.itens.length > 0);
  const ordem = todos.map((i) => i.valor);
  const definir = (s: Set<string>) => onChange(ordem.filter((v) => s.has(v)));
  const alternar = (v: string, ligar: boolean) => { const s = new Set(escolhidos); if (ligar) s.add(v); else s.delete(v); definir(s); };
  const alternarGrupo = (g: GrupoDeSelecao, ligar: boolean) => { const s = new Set(escolhidos); for (const i of g.itens) { if (ligar) s.add(i.valor); else s.delete(i.valor); } definir(s); };
  const abrir = (g: string) => setAbertos((a) => { const n = new Set(a); if (n.has(g)) n.delete(g); else n.add(g); return n; });
  const resumo = verTodos ? valor : valor.slice(0, maxResumo);

  return (
    <div data-slot="selecao-em-grupos" className={cn("@container space-y-3", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p role="status" className="m-0 text-[0.8125rem] font-medium text-foreground" data-contagem>{t.selecionados(valor.length, todos.length)}</p>
        {valor.length > 0 && (
          <button type="button" disabled={disabled} onClick={() => onChange([])} className="rounded-sm text-[0.8125rem] font-medium text-[var(--primary-text,var(--primary))] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            {t.limpar}
          </button>
        )}
      </div>

      {valor.length > 0 ? (
        <ul aria-label={`${rotulo} escolhidos`} className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          <AnimatePresence initial={false}>
            {resumo.map((v) => (
              <motion.li key={v} layout={!reduzir} initial={reduzir ? false : { opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={reduzir ? undefined : { opacity: 0, scale: 0.9 }} transition={{ duration: 0.15 }}>
                <span className="inline-flex h-8 items-center gap-1 rounded-full border border-primary/30 bg-[var(--primary-muted)] pl-3 pr-1 text-[0.8125rem] font-medium text-[var(--primary-text,var(--primary))]">
                  {nome.get(v) ?? v}
                  <button type="button" disabled={disabled} onClick={() => alternar(v, false)} aria-label={t.tirar(nome.get(v) ?? v)} className="flex size-6 items-center justify-center rounded-full hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <X aria-hidden className="size-3.5" />
                  </button>
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
          {valor.length > maxResumo && (
            <li>
              <button type="button" onClick={() => setVerTodos((x) => !x)} aria-expanded={verTodos} className="inline-flex h-8 items-center rounded-full border border-border bg-card px-3 text-[0.8125rem] font-medium text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {verTodos ? "Mostrar menos" : t.mais(valor.length - maxResumo)}
              </button>
            </li>
          )}
        </ul>
      ) : (
        <p className="m-0 text-[0.8125rem] text-muted-foreground">{t.nenhumSelecionado}</p>
      )}

      <div className="relative">
        <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <label htmlFor={`${id}-busca`} className="sr-only">{`${t.buscar} ${rotulo}`}</label>
        <input id={`${id}-busca`} type="search" value={busca} disabled={disabled} onChange={(e) => setBusca(e.target.value)} placeholder={`${t.buscar} ${rotulo}`}
          className="h-11 w-full rounded-md border border-input bg-input-background pl-9 pr-3 text-[0.9375rem] text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
      </div>

      <div className="overflow-hidden rounded-md border border-border">
        {visiveis.length === 0 && <p className="m-0 p-4 text-[0.875rem] text-muted-foreground">{t.nenhum}</p>}
        {visiveis.map((g) => {
          const original = grupos.find((x) => x.valor === g.valor)!;
          const n = original.itens.filter((i) => escolhidos.has(i.valor)).length;
          const estado: boolean | "indeterminate" = n === 0 ? false : n === original.itens.length ? true : "indeterminate";
          const aberto = !!termo || abertos.has(g.valor);
          return (
            <div key={g.valor} className="border-b border-border last:border-b-0" data-grupo={g.valor}>
              <div className="flex items-center gap-3 bg-card px-3 py-2">
                <Checkbox checked={estado} disabled={disabled} onCheckedChange={(v) => alternarGrupo(original, v === true)} aria-label={t.todosDoGrupo(g.rotulo)} />
                <button type="button" onClick={() => abrir(g.valor)} aria-expanded={aberto} aria-controls={`${id}-${g.valor}`} disabled={!!termo}
                  className="flex min-h-9 min-w-0 flex-1 items-center justify-between gap-2 rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default">
                  <span className="min-w-0 truncate text-[0.875rem] font-semibold text-foreground">{g.rotulo}</span>
                  <span className="flex shrink-0 items-center gap-1.5 text-[0.75rem] tabular-nums text-muted-foreground">
                    {t.doGrupo(n, original.itens.length)}
                    {!termo && <ChevronDown aria-hidden className={cn("size-4 transition-transform", aberto && "rotate-180")} />}
                  </span>
                </button>
              </div>
              <AnimatePresence initial={false}>
                {aberto && (
                  <motion.div id={`${id}-${g.valor}`} key="itens" initial={reduzir ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduzir ? undefined : { height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <ul className="m-0 grid list-none grid-cols-1 gap-x-3 gap-y-0.5 bg-background px-3 py-2 @sm:grid-cols-2 @2xl:grid-cols-3">
                      {g.itens.map((i) => (
                        <li key={i.valor}>
                          <label className={cn("flex min-h-10 items-center gap-2.5 rounded-sm px-1 text-[0.875rem] text-foreground", disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-accent")}>
                            <Checkbox checked={escolhidos.has(i.valor)} disabled={disabled} onCheckedChange={(v) => alternar(i.valor, v === true)} />
                            <span className="min-w-0">{i.rotulo}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
