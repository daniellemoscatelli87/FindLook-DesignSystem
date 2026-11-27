"use client";

import * as React from "react";
import { ChevronDown, MoveRight } from "lucide-react";
import { cn } from "./utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./dropdown-menu";

/**
 * Quadro (kanban): itens em colunas por etapa (A contatar → Contato → Visita → Cadastro). Card nunca rola para o lado
 * (regra da dona do produto, 18/11/2026): quando o próprio quadro tem 56rem (896 px) ou mais, as colunas ficam lado a
 * lado, dividindo a largura; antes disso, uma embaixo da outra, e o título de cada coluna abre e fecha a lista (as
 * que têm itens começam abertas). A largura é a do quadro, não a da tela.
 * Mover um item: arrastar com o mouse (a coluna que aceita fica tracejada e, embaixo do item, no rosa de destaque) ou
 * o botão "Mover para" de cada cartão (teclado, toque e leitores de tela), que lista só as colunas permitidas.
 * Cartões: card só de borda, hover com a borda mais forte; o conteúdo vem de `cartao` (use LinhaDeLista, ChipDeEstado,
 * LinkDeTexto). Coluna vazia: o texto de `vazio`, tracejado. `rodape` da coluna: "Ver todas as 32", por exemplo.
 * `limitarAltura`: cada coluna mostra até 24rem e rola por dentro (só na vertical); por padrão a coluna cresce.
 */

export type ColunaDoQuadro<K extends string> = {
  id: K;
  titulo: string;
  quantidade?: number;
  icone?: React.ReactNode;
  /** Linha curta embaixo do título ("62% avançaram da etapa anterior"). */
  subtitulo?: React.ReactNode;
  vazio: string;
  rodape?: React.ReactNode;
};

export type QuadroProps<K extends string, T> = {
  colunas: ColunaDoQuadro<K>[];
  itens: T[];
  chave: (item: T) => string;
  coluna: (item: T) => K;
  cartao: (item: T) => React.ReactNode;
  onMover?: (item: T, para: K) => void;
  podeMover?: (item: T, para: K) => boolean;
  /** Nome do quadro para leitores de tela ("Ativação das lojas"). */
  rotulo: string;
  /** Nome do item no botão "Mover <nome>". */
  rotuloItem: (item: T) => string;
  limitarAltura?: boolean;
  className?: string;
};

const foco = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Quadro<K extends string, T>({ colunas, itens, chave, coluna, cartao, onMover, podeMover = () => true, rotulo, rotuloItem, limitarAltura = false, className }: QuadroProps<K, T>) {
  const [arrastando, setArrastando] = React.useState<string | null>(null);
  const [alvo, setAlvo] = React.useState<K | null>(null);
  const quantas = (c: ColunaDoQuadro<K>) => c.quantidade ?? itens.filter((t) => coluna(t) === c.id).length;
  const [fechadas, setFechadas] = React.useState<Set<K>>(() => new Set(colunas.filter((c) => quantas(c) === 0).map((c) => c.id)));
  const alternar = (id: K) => setFechadas((f) => { const n = new Set(f); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const item = arrastando ? itens.find((t) => chave(t) === arrastando) : undefined;
  const idBase = React.useId();

  const soltar = (e: React.DragEvent, para: K) => {
    e.preventDefault();
    setAlvo(null);
    setArrastando(null);
    if (item && coluna(item) !== para && podeMover(item, para)) onMover?.(item, para);
  };

  return (
    <div data-slot="quadro" className={cn("@container min-w-0", className)}>
      <div
        role="group"
        aria-label={rotulo}
        // As colunas são raias de um quadro, não cards lado a lado: têm a mesma altura (a da maior) e o vazio embaixo é
        // o lugar de soltar um item; a regra "cards da mesma altura ou um por linha" não se aplica a elas.
        data-cards-ignorar=""
        className="grid grid-cols-1 gap-3 @min-[56rem]:[grid-template-columns:repeat(var(--colunas),minmax(0,1fr))]"
        style={{ "--colunas": colunas.length } as React.CSSProperties}
      >
        {colunas.map((c) => {
          const daColuna = itens.filter((t) => coluna(t) === c.id);
          const n = quantas(c);
          const aceita = item ? coluna(item) !== c.id && podeMover(item, c.id) : false;
          const fechada = fechadas.has(c.id);
          const idLista = `${idBase}-${c.id}`;
          const cabecalho = (
            <>
              {c.icone && <span aria-hidden className="inline-flex shrink-0 text-muted-foreground [&>svg]:size-4">{c.icone}</span>}
              <span className="min-w-0 flex-1 text-left text-body-sm font-bold text-foreground">{c.titulo}</span>
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-card px-2 text-label font-semibold tabular-nums text-foreground">{n}</span>
            </>
          );
          return (
            <section
              key={c.id}
              aria-label={`${c.titulo}: ${n}`}
              data-coluna={c.id}
              onDragOver={(e) => { if (aceita) { e.preventDefault(); setAlvo(c.id); } }}
              onDragLeave={() => setAlvo((a) => (a === c.id ? null : a))}
              onDrop={(e) => soltar(e, c.id)}
              className={cn(
                "flex min-w-0 flex-col rounded-lg border p-2 transition-colors duration-[var(--duration-fast)]",
                alvo === c.id ? "border-primary bg-[var(--primary-muted)]" : aceita ? "border-dashed border-primary/50 bg-muted" : "border-border bg-muted",
              )}
            >
              {/* Quadro estreito: o título abre e fecha a coluna. */}
              <button
                type="button"
                onClick={() => alternar(c.id)}
                aria-expanded={!fechada}
                aria-controls={idLista}
                className={cn("flex min-h-11 items-center gap-2 px-2 hover:bg-accent @min-[56rem]:hidden", foco)}
              >
                {cabecalho}
                <ChevronDown aria-hidden className={cn("size-4 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-normal)] motion-reduce:transition-none", !fechada && "rotate-180")} />
              </button>
              {/* Quadro largo: todas as colunas abertas. */}
              <h3 className="m-0 mb-2 hidden min-h-8 items-center gap-2 px-2 @min-[56rem]:flex">{cabecalho}</h3>
              <div id={idLista} className={cn("mt-2 flex-col @min-[56rem]:mt-0 @min-[56rem]:flex", fechada ? "hidden" : "flex")}>
                {c.subtitulo && <p className="m-0 mb-2 px-2 text-label leading-snug text-muted-foreground">{c.subtitulo}</p>}
                <ul className={cn("m-0 flex min-h-16 list-none flex-col gap-2 p-0", limitarAltura && "max-h-96 overflow-y-auto overscroll-contain p-0.5 [scrollbar-width:thin]")}>
                  {daColuna.length === 0 && (
                    <li className="rounded-md border border-dashed border-[var(--border-strong)] px-3 py-4 text-center text-label text-muted-foreground">{c.vazio}</li>
                  )}
                  {daColuna.map((t) => {
                    const destinos = onMover ? colunas.filter((d) => d.id !== c.id && podeMover(t, d.id)) : [];
                    return (
                      <li
                        key={chave(t)}
                        draggable={destinos.length > 0}
                        onDragStart={(e) => {
                          e.dataTransfer.effectAllowed = "move";
                          e.dataTransfer.setData("text/plain", chave(t));
                          setArrastando(chave(t));
                        }}
                        onDragEnd={() => { setArrastando(null); setAlvo(null); }}
                        className={cn(
                          "flex min-w-0 items-start gap-1 rounded-md border border-border bg-card p-3 transition-[border-color,opacity] duration-[var(--duration-fast)] hover:border-[var(--border-strong)] motion-safe:animate-in motion-safe:fade-in",
                          destinos.length > 0 && "cursor-grab active:cursor-grabbing",
                          arrastando === chave(t) && "opacity-50",
                        )}
                      >
                        <div className="min-w-0 flex-1">{cartao(t)}</div>
                        {destinos.length > 0 && (
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              aria-label={`Mover ${rotuloItem(t)}`}
                              className={cn("-mr-1 -mt-1 flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground toque:size-11", foco)}
                            >
                              <MoveRight aria-hidden className="size-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Mover para</DropdownMenuLabel>
                              {destinos.map((d) => (
                                <DropdownMenuItem key={d.id} onSelect={() => onMover?.(t, d.id)}>{d.titulo}</DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </li>
                    );
                  })}
                </ul>
                {c.rodape && <div className="mt-2 px-2">{c.rodape}</div>}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
