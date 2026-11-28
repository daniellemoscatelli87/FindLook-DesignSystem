import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-1 text-label leading-4 font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        // Tons de etiqueta (27/11/2026): atributos de um item (Nova, Revisar tipo, Editada à mão, Fechada). Retângulo
        // de cantos suaves, diferente do ChipDeEstado (pílula), que diz o estado. Texto do tom sobre a tinta do tom.
        marca: "border-primary/25 bg-[var(--primary-muted)] text-primary-text",
        neutro: "border-border bg-muted text-foreground",
        sucesso: "border-success/30 bg-success-muted text-success-text",
        aviso: "border-warning/40 bg-warning-muted text-[color:color-mix(in_oklab,var(--warning-text)_85%,var(--foreground))]",
        erro: "border-error/30 bg-error-muted text-error-text",
        info: "border-info/30 bg-info-muted text-info-text",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// forwardRef (28/11/2026): funciona como filho de um Radix com asChild (TooltipTrigger, PopoverTrigger).
const Badge = React.forwardRef<HTMLSpanElement, React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }>(function Badge({ className, variant, asChild = false, ...props }, ref) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      ref={ref}
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
});

export { Badge, badgeVariants };
