import * as React from "react";
import { CalendarClock, CheckCircle2, Clock, Loader2, PauseCircle, type LucideIcon } from "lucide-react";
import { cn } from "./utils";
import { Progress } from "./progress";

/**
 * Busca de lojas ao vivo (área administrativa da FindLook)
 *
 * ChipDaBusca: estado da busca (Pedida, Em andamento, Pausada, Concluída), com ícone e texto.
 * SeloAoVivo: "Ao vivo" (ponto que pulsa; parado com "menos movimento") ou "Pausada".
 * AndamentoDaBusca: estado, quando começou, aviso de pausa, a barra "Andamento da busca" (%) e o resumo.
 *
 * As lojas que a busca vai encontrando usam o CardDoPainel com o ItemDeAtividade (ui/painel-dados) e o
 * SeloAoVivo na ação do card. Só apresentação: o produto lê o andamento e as lojas e passa por props.
 */

type EstadoDaBusca = "pedida" | "em_andamento" | "pausada" | "concluida";

const ESTADOS: Record<EstadoDaBusca, { rotulo: string; Icone: LucideIcon; classe: string; cor: string }> = {
  pedida: { rotulo: "Pedida", Icone: Clock, classe: "bg-muted border-border", cor: "text-foreground" },
  em_andamento: { rotulo: "Em andamento", Icone: Loader2, classe: "bg-warning-muted border-warning/40", cor: "text-warning" },
  pausada: { rotulo: "Pausada", Icone: PauseCircle, classe: "bg-muted border-border", cor: "text-muted-foreground" },
  concluida: { rotulo: "Concluída", Icone: CheckCircle2, classe: "bg-success-muted border-success/30", cor: "text-success" },
};

function ChipDaBusca({ estado, className }: { estado: EstadoDaBusca; className?: string }) {
  const { rotulo, Icone, classe, cor } = ESTADOS[estado];
  return (
    <span data-slot="chip-da-busca" data-estado={estado} className={cn("inline-flex h-6 shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2 text-[0.6875rem] font-semibold text-foreground", classe, className)}>
      <Icone aria-hidden className={cn("size-3", cor, estado === "em_andamento" && "motion-safe:animate-spin")} />
      {rotulo}
    </span>
  );
}

function SeloAoVivo({ pausada = false, className }: { pausada?: boolean; className?: string }) {
  if (pausada) {
    return (
      <span data-slot="selo-ao-vivo" className={cn("inline-flex h-6 shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-border bg-muted px-2 text-[0.6875rem] font-semibold text-foreground", className)}>
        <PauseCircle aria-hidden className="size-3 text-muted-foreground" /> Pausada
      </span>
    );
  }
  return (
    <span data-slot="selo-ao-vivo" className={cn("inline-flex h-6 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-success/30 bg-success-muted px-2 text-[0.6875rem] font-semibold text-foreground", className)}>
      <span aria-hidden className="size-1.5 rounded-full bg-success motion-safe:animate-pulse" /> Ao vivo
    </span>
  );
}

const pctBr = (n: number) => `${String(Math.round(n * 10) / 10).replace(".", ",")}%`;

type AndamentoDaBuscaProps = {
  estado: EstadoDaBusca;
  /** "Manual · começou em 19/11/2026 09:12" */
  descricao?: string;
  /** Porcentagem (0 a 100); null enquanto calcula. Não aparece com a busca pedida. */
  pct?: number | null;
  /** Aviso de pausa (por exemplo, quando a busca continua sozinha). */
  aviso?: React.ReactNode;
  /** Linha de resumo abaixo da barra. */
  resumo?: React.ReactNode;
  rotuloBarra?: string;
  /** Ações no pé (por exemplo, "Ver detalhes"). */
  children?: React.ReactNode;
  className?: string;
};

function AndamentoDaBusca({ estado, descricao, pct = null, aviso, resumo, rotuloBarra = "Andamento da busca", children, className }: AndamentoDaBuscaProps) {
  const comBarra = estado !== "pedida";
  return (
    <div data-slot="andamento-da-busca" className={cn("min-w-0 rounded-md border border-border p-4", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <ChipDaBusca estado={estado} />
        {descricao && <span className="text-[0.875rem] text-foreground">{descricao}</span>}
      </div>
      {aviso && (
        <p className="mt-3 flex items-start gap-2 rounded-sm border border-border bg-muted/50 px-3 py-2 text-[0.8125rem] text-foreground">
          <CalendarClock aria-hidden className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <span>{aviso}</span>
        </p>
      )}
      {comBarra && (
        <div className="mt-3">
          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-[0.8125rem]">
            <span className="font-medium text-foreground">{rotuloBarra}</span>
            <span className="font-semibold tabular-nums text-foreground">{pct === null ? "—" : pctBr(pct)}</span>
          </div>
          <Progress value={pct ?? 0} aria-label={pct === null ? `${rotuloBarra}: calculando` : `${rotuloBarra}: ${pctBr(pct)}`} className="h-2" />
        </div>
      )}
      {resumo && <p className="mt-2 text-[0.8125rem] text-muted-foreground">{resumo}</p>}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}

export { ChipDaBusca, SeloAoVivo, AndamentoDaBusca };
export type { EstadoDaBusca, AndamentoDaBuscaProps };
