import * as React from "react";
import { CheckCircle2, Clock, Ban, Sparkles, AlertTriangle, type LucideIcon } from "lucide-react";

import { cn } from "./utils";

/* Estados de informação da FindLook: de onde vem cada dado de peça e de loja.
   Regra: nunca usar apenas cor para comunicar um estado; sempre texto e ícone juntos.
   Documentação: Diretrizes > Estados de informação. */

export type InfoState = "confirmado" | "a-confirmar" | "esgotado" | "sugerido-ia" | "desatualizado";

export type EstadoVisual = {
  id: InfoState;
  label: string;
  icon: LucideIcon;
  color: string; // cor do ícone e do texto
  bg: string; // fundo suave
  border: string;
};

export const estadosDeInformacao: EstadoVisual[] = [
  { id: "confirmado", label: "Confirmado pela loja", icon: CheckCircle2, color: "text-success", bg: "bg-success/10", border: "border-success/30" },
  { id: "a-confirmar", label: "A confirmar", icon: Clock, color: "text-primary-text", bg: "bg-primary/10", border: "border-primary/30" },
  { id: "esgotado", label: "Esgotado", icon: Ban, color: "text-foreground", bg: "bg-muted", border: "border-border" },
  { id: "sugerido-ia", label: "Sugerido por IA", icon: Sparkles, color: "text-primary-text", bg: "bg-[var(--surface-tint)]", border: "border-primary/30" },
  { id: "desatualizado", label: "Desatualizado", icon: AlertTriangle, color: "text-warning-text", bg: "bg-warning/10", border: "border-warning/40" },
];

/** Selo de estado de informação: ícone + texto, sempre juntos. */
export function StatusChip({ state, size = "md", className }: { state: InfoState; size?: "sm" | "md"; className?: string }) {
  const s = estadosDeInformacao.find(x => x.id === state)!;
  const Icon = s.icon;
  const pad = size === "sm" ? "h-6 px-2 text-[0.6875rem] gap-1" : "h-7 px-2.5 text-[0.75rem] gap-1.5";
  return (
    <span data-slot="status-chip" className={cn("inline-flex items-center rounded-full border font-semibold", pad, s.bg, s.border, s.color, className)}>
      <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} aria-hidden />
      <span>{s.label}</span>
    </span>
  );
}
