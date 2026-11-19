import * as React from "react";
import { CalendarClock, CalendarX2, Check, GraduationCap, MapPin, MessageCircle, MoreHorizontal, type LucideIcon } from "lucide-react";
import { cn } from "./utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";

/**
 * Agenda da ativação (área administrativa da FindLook)
 *
 * GrupoDaAgenda: um dia ou grupo (Atrasados, Hoje, Amanhã, Próximos dias), com contador e texto de vazio.
 * ItemDaAgenda: um agendamento (Contato, Visita ou Treinamento) com hora, loja, observação, "Feito" e o menu
 * Remarcar / Cancelar agendamento (ou Reabrir, quando já foi feito ou cancelado).
 * - Atrasado: ícone em base laranja clara e a etiqueta "Atrasado" (texto, não só cor).
 * - Feito ou cancelado: título riscado e o estado escrito abaixo.
 */

const foco = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

type TipoDeAgendamento = "contato" | "visita" | "treinamento";
type StatusDoAgendamento = "agendado" | "feito" | "cancelado";

const TIPOS_DE_AGENDAMENTO: Record<TipoDeAgendamento, { rotulo: string; Icone: LucideIcon }> = {
  contato: { rotulo: "Contato", Icone: MessageCircle },
  visita: { rotulo: "Visita", Icone: MapPin },
  treinamento: { rotulo: "Treinamento", Icone: GraduationCap },
};
const STATUS_DO_AGENDAMENTO: Record<StatusDoAgendamento, string> = { agendado: "Agendado", feito: "Feito", cancelado: "Cancelado" };

type ItemDaAgendaProps = {
  tipo: TipoDeAgendamento;
  /** Hora ("14:30") ou dia e hora ("qui, 20/11 · 14:30"). */
  quando: string;
  status?: StatusDoAgendamento;
  atrasado?: boolean;
  /** Loja do agendamento. `parceira` mostra "Loja parceira" no lugar do bairro. */
  loja?: { nome: string; bairro?: string; parceira?: boolean; href?: string; onClick?: () => void };
  observacao?: string;
  onFeito?: () => void;
  onRemarcar?: () => void;
  onCancelar?: () => void;
  onReabrir?: () => void;
};

function ItemDaAgenda({ tipo, quando, status = "agendado", atrasado = false, loja, observacao, onFeito, onRemarcar, onCancelar, onReabrir }: ItemDaAgendaProps) {
  const { rotulo, Icone } = TIPOS_DE_AGENDAMENTO[tipo];
  const aberto = status === "agendado";
  const emAtraso = aberto && atrasado;
  const sobre = `${rotulo} com ${loja?.nome ?? "a loja"}`;
  const temMenu = aberto ? !!(onRemarcar || onCancelar) : !!onReabrir;
  return (
    <li data-slot="item-da-agenda" className="flex items-start gap-3 py-3">
      <span aria-hidden className={cn("flex size-9 shrink-0 items-center justify-center rounded-full", emAtraso ? "bg-warning-muted text-warning" : aberto ? "bg-primary-muted text-primary-text" : "bg-muted text-muted-foreground")}>
        <Icone className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.875rem] font-semibold text-foreground">
          <span className={cn(!aberto && "text-muted-foreground line-through")}>{quando} · {rotulo}</span>
          {emAtraso && <span className="ml-1.5 inline-flex rounded-full border border-warning/40 bg-warning-muted px-1.5 py-0.5 text-[0.6875rem] font-semibold text-foreground">Atrasado</span>}
          {!aberto && <span className="sr-only"> ({STATUS_DO_AGENDAMENTO[status]})</span>}
        </p>
        {loja && (
          loja.href || loja.onClick ? (
            <a href={loja.href ?? "#"} onClick={loja.onClick} className={cn("block truncate rounded-sm text-[0.8125rem] text-foreground hover:underline", foco)}>
              {loja.nome} <span className={loja.parceira ? "text-primary-text" : "text-muted-foreground"}>· {loja.parceira ? "Loja parceira" : loja.bairro}</span>
            </a>
          ) : (
            <p className="truncate text-[0.8125rem] text-foreground">
              {loja.nome} <span className={loja.parceira ? "text-primary-text" : "text-muted-foreground"}>· {loja.parceira ? "Loja parceira" : loja.bairro}</span>
            </p>
          )
        )}
        {observacao && <p className="mt-0.5 text-[0.75rem] text-muted-foreground">{observacao}</p>}
        {!aberto && <p aria-hidden className="mt-0.5 text-[0.75rem] font-medium text-muted-foreground">{STATUS_DO_AGENDAMENTO[status]}</p>}
      </div>
      {aberto && onFeito && (
        <button type="button" onClick={onFeito} aria-label={`Marcar como feito: ${sobre}`} className={cn("inline-flex h-9 shrink-0 items-center gap-1 rounded-sm border border-[var(--border-strong)] bg-card px-2.5 text-[0.8125rem] font-medium text-foreground hover:bg-muted", foco)}>
          <Check aria-hidden className="size-4 text-success" /> Feito
        </button>
      )}
      {temMenu && (
        <DropdownMenu>
          <DropdownMenuTrigger aria-label={`Mais ações: ${sobre}`} className={cn("flex size-9 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground", foco)}>
            <MoreHorizontal aria-hidden className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {aberto ? (
              <>
                {onRemarcar && <DropdownMenuItem onSelect={onRemarcar}><CalendarClock /> Remarcar</DropdownMenuItem>}
                {onRemarcar && onCancelar && <DropdownMenuSeparator />}
                {onCancelar && <DropdownMenuItem onSelect={onCancelar}><CalendarX2 /> Cancelar agendamento</DropdownMenuItem>}
              </>
            ) : (
              <DropdownMenuItem onSelect={onReabrir}><CalendarClock /> Reabrir</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </li>
  );
}

type GrupoDaAgendaProps = {
  titulo: string;
  quantidade: number;
  /** Texto quando não há agendamentos no grupo (sem ele, o grupo vazio não aparece). */
  vazio?: string;
  children?: React.ReactNode;
  className?: string;
};

function GrupoDaAgenda({ titulo, quantidade, vazio, children, className }: GrupoDaAgendaProps) {
  const id = React.useId();
  if (quantidade === 0 && !vazio) return null;
  return (
    <section data-slot="grupo-da-agenda" aria-labelledby={id} className={className}>
      <h3 id={id} className="flex items-center gap-2 text-[0.8125rem] font-bold text-foreground">
        {titulo}
        <span className="rounded-full bg-muted px-2 py-0.5 text-[0.6875rem] font-semibold tabular-nums">{quantidade}</span>
      </h3>
      {quantidade === 0 ? <p className="py-2 text-[0.8125rem] text-muted-foreground">{vazio}</p> : <ul className="divide-y divide-border">{children}</ul>}
    </section>
  );
}

export { ItemDaAgenda, GrupoDaAgenda, TIPOS_DE_AGENDAMENTO, STATUS_DO_AGENDAMENTO };
export type { ItemDaAgendaProps, GrupoDaAgendaProps, TipoDeAgendamento, StatusDoAgendamento };
