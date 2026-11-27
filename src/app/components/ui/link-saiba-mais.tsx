import * as React from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "./utils";

/**
 * LinkSaibaMais (alça "Saiba mais" do hero): mesma API do LinkSaibaMais do design system Dani Moscatelli.
 * O link que convida a rolar até a próxima seção, centralizado na base do hero (página do lojista): texto e a seta
 * num círculo de 32 px com borda, que desce 4 px e volta devagar. Com `direcao="direita"`, vira um link de
 * continuação no fim de um bloco ("Saiba mais →"). Sem borda nem fundo; 44 px de altura de toque.
 * `sobreEscuro`: texto e círculo em branco (capa escura). Hover: texto em --primary-text e o círculo no cinza claro.
 * Movimento parado com "menos movimento". A mais no FindLook: `comoLink` (o Link do Next.js no lugar do <a>).
 */
export type LinkSaibaMaisProps = Omit<React.ComponentProps<"a">, "children"> & {
  children?: React.ReactNode;
  direcao?: "baixo" | "direita";
  sobreEscuro?: boolean;
  comoLink?: React.ElementType;
};

function LinkSaibaMais({ children = "Saiba mais", direcao = "baixo", sobreEscuro = false, comoLink, className, ...props }: LinkSaibaMaisProps) {
  const Seta = direcao === "baixo" ? ArrowDown : ArrowRight;
  const Comp = comoLink ?? "a";
  return (
    <Comp
      data-slot="link-saiba-mais"
      className={cn(
        "group/alca inline-flex min-h-11 items-center gap-3 rounded-full text-body-sm font-semibold transition-colors duration-[var(--duration-fast)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        direcao === "baixo" && "flex-col gap-2",
        sobreEscuro ? "text-[var(--brand-white)]" : "text-foreground hover:text-primary-text",
        className,
      )}
      {...props}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "flex size-8 items-center justify-center rounded-full border transition-[translate,background-color] duration-[var(--duration-normal)]",
          sobreEscuro ? "border-[var(--brand-white)]/60" : "border-[var(--border-strong)] group-hover/alca:bg-accent",
          direcao === "baixo" ? "fl-saiba-mais-seta" : "group-hover/alca:translate-x-1 motion-reduce:transition-none",
        )}
      >
        <Seta className="size-4" />
      </span>
    </Comp>
  );
}

export { LinkSaibaMais };
