"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "./utils";

/**
 * Chips de filtro (Rótulos › Chips filtráveis, como componente). ChipFiltravel e GrupoDeChipsFiltraveis têm a mesma
 * API do design system Dani Moscatelli; GrupoDeChips, ChipDeFiltro e ListaDeFiltrosAtivos são do FindLook.
 * - ChipFiltravel: liga e desliga um filtro ou uma classificação (aria-pressed). Ligado: fundo no rosa do selecionado
 *   (--primary-suave), texto --primary-text, borda rosa e o check, e continua rosa com o mouse em cima; desligado com o
 *   mouse em cima: cinza claro (--accent), nunca rosa. Nunca preenchido de pink. `contagem` mostra quantos itens o
 *   filtro traz (lida junto: "Brechó, 12").
 * - GrupoDeChipsFiltraveis: o grupo pronto a partir das opções ({ valor, rotulo, contagem, desabilitado }), com
 *   `valor` (lista dos ligados), `onValorChange`, `multiplo` (padrão; false = só um) e `rotulo` do grupo.
 * - GrupoDeChips: os chips lado a lado, quebrando de linha (nunca rolando para o lado), com um nome para o grupo. No
 *   celular, em duas colunas de mesma largura (bordas alinhadas, nada solto); prefira um número par de opções.
 *   Quem escolhe uma opção só usa o SegmentedControl ou o RadioGroup, não chips.
 * - ChipDeFiltro: um filtro já aplicado, que se remove com um toque ("Bairro: Batel ×"). O nome lido é "Remover filtro:
 *   …". Com `onLimparTudo`, a ListaDeFiltrosAtivos mostra "Limpar filtros" no fim, na mesma linha.
 * Altura: 44 px no celular (alvo de toque) e 36 px do 640 px em diante.
 */

const foco = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export type ChipFiltravelProps = Omit<React.ComponentProps<"button">, "onChange"> & {
  ativo: boolean;
  onAtivoChange?: (ativo: boolean) => void;
  contagem?: number;
  icone?: React.ReactNode;
};

export function ChipFiltravel({ ativo, onAtivoChange, contagem, icone, className, children, onClick, ...props }: ChipFiltravelProps) {
  return (
    <button
      type="button"
      data-slot="chip-filtravel"
      aria-pressed={ativo}
      onClick={(e) => { onAtivoChange?.(!ativo); onClick?.(e); }}
      className={cn(
        "group inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full border px-3.5 text-body-sm font-medium transition-colors duration-[var(--duration-fast)] toque:min-h-11 sm:px-3",
        "disabled:pointer-events-none disabled:border-transparent disabled:bg-disabled disabled:text-disabled-foreground",
        ativo
          ? "border-primary/30 bg-[var(--primary-suave)] text-primary-text"
          : "border-input bg-card text-foreground hover:bg-accent",
        foco,
        className,
      )}
      {...props}
    >
      {ativo ? (
        <Check aria-hidden className="size-3.5 shrink-0 motion-safe:animate-in motion-safe:zoom-in-50 motion-safe:duration-[var(--duration-fast)]" />
      ) : (
        icone && <span aria-hidden className="inline-flex text-muted-foreground [&>svg]:size-3.5">{icone}</span>
      )}
      {children}
      {contagem !== undefined && (
        <span className={cn("text-label tabular-nums", ativo ? "text-primary-text" : "text-muted-foreground group-hover:text-foreground")}>
          <span className="sr-only">, </span>{contagem}
        </span>
      )}
    </button>
  );
}

export type OpcaoDoChip = { valor: string; rotulo: React.ReactNode; contagem?: number; desabilitado?: boolean };

export type GrupoDeChipsFiltraveisProps = {
  opcoes: OpcaoDoChip[];
  valor: string[];
  onValorChange: (valor: string[]) => void;
  /** Várias ao mesmo tempo (padrão) ou só uma. */
  multiplo?: boolean;
  /** Nome do grupo para leitores de tela ("Filtrar por tipo"). */
  rotulo: string;
  className?: string;
};

export function GrupoDeChipsFiltraveis({ opcoes, valor, onValorChange, multiplo = true, rotulo, className }: GrupoDeChipsFiltraveisProps) {
  return (
    <GrupoDeChips rotulo={rotulo} className={className}>
      {opcoes.map((o) => {
        const ativo = valor.includes(o.valor);
        return (
          <ChipFiltravel
            key={o.valor}
            ativo={ativo}
            contagem={o.contagem}
            disabled={o.desabilitado}
            onAtivoChange={(liga) => onValorChange(multiplo ? (liga ? [...valor, o.valor] : valor.filter((v) => v !== o.valor)) : liga ? [o.valor] : [])}
          >
            {o.rotulo}
          </ChipFiltravel>
        );
      })}
    </GrupoDeChips>
  );
}

export function GrupoDeChips({ rotulo, className, children }: { rotulo: string; className?: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-label={rotulo} data-slot="grupo-filtravel" className={cn("grid grid-cols-2 gap-2 sm:flex sm:flex-wrap", className)}>
      {children}
    </div>
  );
}

export type ChipDeFiltroProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  rotulo: string;
  onRemover: () => void;
};

export function ChipDeFiltro({ rotulo, onRemover, className, ...props }: ChipDeFiltroProps) {
  return (
    <button
      type="button"
      data-slot="chip-de-filtro"
      onClick={onRemover}
      aria-label={`Remover filtro: ${rotulo}`}
      className={cn(
        "inline-flex min-h-8 max-w-full items-center gap-1 rounded-full border border-primary/30 bg-[var(--primary-suave)] pl-3.5 pr-2.5 text-body-sm font-medium text-primary-text transition-colors duration-[var(--duration-fast)] hover:border-primary/60 toque:min-h-11 sm:pl-3 sm:pr-2 sm:text-label",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95",
        foco,
        className,
      )}
      {...props}
    >
      <span className="min-w-0 truncate">{rotulo}</span>
      <X aria-hidden className="size-3.5 shrink-0" />
    </button>
  );
}

/** Filtros aplicados, em linha, com "Limpar filtros" no fim (mesma linha, quebrando junto). */
export function ListaDeFiltrosAtivos({ children, onLimparTudo, rotuloLimpar = "Limpar filtros", className }: { children: React.ReactNode; onLimparTudo?: () => void; rotuloLimpar?: string; className?: string }) {
  return (
    <div role="group" aria-label="Filtros aplicados" data-slot="lista-de-filtros-ativos" className={cn("flex flex-wrap items-center gap-2", className)}>
      {children}
      {onLimparTudo && (
        <button type="button" onClick={onLimparTudo} className={cn("inline-flex min-h-8 items-center rounded-sm px-1 text-body-sm font-semibold text-foreground underline underline-offset-4 hover:decoration-2 toque:min-h-11 sm:text-label", foco)}>
          {rotuloLimpar}
        </button>
      )}
    </div>
  );
}
