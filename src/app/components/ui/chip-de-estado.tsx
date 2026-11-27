import * as React from "react";
import { cn } from "./utils";

/**
 * Chip de estado: o estado de um item (etapa da loja, situação da peça, cadastro) sempre em texto, com ícone opcional e
 * o fundo do tom. Mesma API do ChipDeEstado do design system Dani Moscatelli. Regra: estado nunca só por cor ou forma;
 * o texto é obrigatório. Vai na coluna do fim de uma LinhaDeLista (tags e ações), que no celular desce para uma linha
 * própria embaixo do texto. Para os cinco estados de informação fixos (confirmado, a confirmar…), use o StatusChip.
 * Tons (texto do tom sobre a tinta do tom; todos com 4,5:1 ou mais sobre o card):
 * marca (rosa de destaque com --primary-text: pede ação, novo), neutro (cinza com --foreground: resolvido, registro),
 * sucesso, info, aviso e erro (tinta -muted do tom com o texto -text do tom). Use poucos tons por lista e o mesmo tom
 * para o mesmo sentido em toda a tela.
 */

type TomDoChip = "marca" | "neutro" | "sucesso" | "info" | "aviso" | "erro";

const TONS: Record<TomDoChip, string> = {
  marca: "border-primary/25 bg-[var(--primary-muted)] text-primary-text",
  neutro: "border-border bg-muted text-foreground",
  sucesso: "border-success/30 bg-success-muted text-success-text",
  info: "border-info/30 bg-info-muted text-info-text",
  // aviso: o --warning-text sobre a tinta de aviso fica em 4,4:1; com 15% de --foreground passa de 4,5:1 (5,6:1).
  aviso: "border-warning/40 bg-warning-muted text-[color:color-mix(in_oklab,var(--warning-text)_85%,var(--foreground))]",
  erro: "border-error/30 bg-error-muted text-error-text",
};

type ChipDeEstadoProps = Omit<React.ComponentProps<"span">, "children"> & {
  tom?: TomDoChip;
  /** Ícone lucide opcional (14 px). Dispense quando a linha já mostra o mesmo ícone no início. */
  icone?: React.ReactNode;
  /** Tamanho: "sm" (24 px de altura, padrão em listas) ou "md" (28 px). */
  tamanho?: "sm" | "md";
  children: React.ReactNode;
};

function ChipDeEstado({ tom = "neutro", icone, tamanho = "sm", className, children, ...props }: ChipDeEstadoProps) {
  return (
    <span
      data-slot="chip-de-estado"
      data-tom={tom}
      className={cn(
        "inline-flex shrink-0 items-center whitespace-nowrap rounded-full border font-semibold leading-none [&>svg]:shrink-0",
        tamanho === "sm" ? "h-6 gap-1 px-2.5 text-label" : "h-7 gap-1.5 px-3 text-body-sm",
        TONS[tom],
        className,
      )}
      {...props}
    >
      {icone && <span aria-hidden className={cn("inline-flex", tamanho === "sm" ? "[&>svg]:size-3.5" : "[&>svg]:size-4")}>{icone}</span>}
      {children}
    </span>
  );
}

export { ChipDeEstado };
export type { TomDoChip, ChipDeEstadoProps };
