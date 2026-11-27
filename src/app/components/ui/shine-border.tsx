import * as React from "react";

import { cn } from "./utils";

/**
 * Combinações de cores prontas, só com tokens do design system.
 * O dourado é o token `--warning` (âmbar), que fica mais vivo no tema escuro.
 */
export const shinePresets = {
  /** Primária com o azul de apoio (chart-2). */
  primaria: ["var(--primary)", "var(--chart-2)", "var(--primary)"],
  /** Dourado com a primária: premium, recomendado, destaque de plano. */
  dourada: ["var(--warning)", "var(--primary)", "var(--warning)"],
  /** Primária com um toque dourado. */
  "primaria-dourada": ["var(--primary)", "var(--warning)", "var(--primary)"],
  /** Só dourado: selo, conquista, edição especial. */
  ouro: ["var(--warning)", "var(--warning-foreground)", "var(--warning)"],
  /** Primária com o texto: mais contraste, menos cor. */
  contraste: ["var(--primary)", "var(--foreground)", "var(--primary)"],
} as const;

export type ShinePreset = keyof typeof shinePresets;

export type ShineBorderProps = React.HTMLAttributes<HTMLDivElement> & {
  borderWidth?: number;
  duration?: number;
  /** Uma cor ou uma lista de cores (tokens CSS). Tem prioridade sobre `preset`. */
  shineColor?: string | string[];
  /** Combinação pronta de cores do design system. */
  preset?: ShinePreset;
};

export function ShineBorder({
  borderWidth = 1,
  duration = 8,
  shineColor,
  preset,
  className,
  style,
  ...props
}: ShineBorderProps) {
  const colors = shineColor ?? (preset ? shinePresets[preset] : "var(--primary)");
  // Feixe de luz: as cores ocupam um arco de ~30% da volta; o resto é transparente.
  // O ângulo (--shine-angle) gira de 0 a 360°, então o brilho percorre a borda inteira, cantos incluídos.
  const lista = Array.isArray(colors) ? colors : [colors];
  const paradas = lista.map((c, i) => `${c} ${Math.round(6 + (i * 18) / Math.max(1, lista.length - 1))}%`).join(", ");
  return (
    <div
      aria-hidden
      style={
        {
          "--border-width": `${borderWidth}px`,
          "--duration": `${duration}s`,
          backgroundImage: `conic-gradient(from var(--shine-angle, 0deg), transparent 0%, ${paradas}, transparent 30%, transparent 100%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "var(--border-width)",
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 size-full rounded-[inherit] motion-safe:animate-shine",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Borda do card selecionado (decisão da dona do produto, 27/11/2026): o estado selecionado padrão de cards
 * selecionáveis (CardDePreco, cartões de Cards › Estados) é a borda de 2 px na primária com o brilho do ShineBorder
 * (preset "primaria": o --chart-2, #FF6F95, corre por cima da borda).
 * - O card continua com `border-2 border-primary` (a borda parada); este brilho fica exatamente em cima dela
 *   (-inset de 2 px), então o card não pode ter overflow-hidden.
 * - Com "menos movimento", o brilho some e fica só a borda parada de 2 px.
 * - É decorativo (aria-hidden, sem eventos de ponteiro): o anel de foco e o texto "✓ Selecionado" continuam valendo.
 */
export function BrilhoDeSelecionado({ className, ...props }: Omit<ShineBorderProps, "borderWidth" | "preset" | "shineColor">) {
  return <ShineBorder preset="primaria" borderWidth={2} duration={6} data-slot="brilho-de-selecionado" className={cn("-inset-[2px] size-auto motion-reduce:hidden", className)} {...props} />;
}

/**
 * Moldura do card selecionável (27/11/2026): a borda que acompanha o BrilhoDeSelecionado, igual em todos os cards que
 * se escolhem (CartaoDeEscolha, cartões de Cards › Estados e, quando selecionado, CardDePreco).
 * Selecionado: borda de 2 px na primária (ponha o BrilhoDeSelecionado dentro do card). Não selecionado: borda neutra
 * de 2 px (a mesma espessura, para nada pular ao selecionar) que escurece no hover.
 */
export function molduraDoSelecionavel(selecionado: boolean) {
  return selecionado ? "border-2 border-primary" : "border-2 border-border hover:border-[var(--border-strong)]";
}
