"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "./utils";
import { Selo } from "./selo";
import { withHighlight } from "./heading";
import { useOrientacaoDoCard } from "./grade-de-cards";

/**
 * PartnerCard (card de convite ao parceiro)
 *
 * Card que convida ao cadastro: selo, título com destaque, texto curto, ação principal
 * e link secundário opcional. Vertical ou horizontal; tamanhos p, m e g. Sem orientation, segue a GradeDeCards:
 * horizontal quando a grade virou lista (regra da dona do produto, 27/11/2026).
 * Fundo de card com um brilho suave na cor primária no canto, como o hero do site.
 */
type Size = "p" | "m" | "g";

export type PartnerCardProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "vertical" | "horizontal";
  size?: Size;
  /** Texto do selo (eyebrow). */
  eyebrow?: React.ReactNode;
  /** Título; destaque entre **asteriscos**. */
  title: string;
  description?: React.ReactNode;
  /** Ação principal. */
  cta: { label: string; href?: string; onClick?: () => void };
  /** Link secundário discreto. */
  secondary?: { label: string; href?: string; onClick?: () => void };
  /** Ícone, símbolo ou imagem (ocupa a área visual). */
  visual?: React.ReactNode;
  /** Superfície: card branco, rosa de apoio ou grafite. */
  surface?: "card" | "tint" | "dark";
};

const pad: Record<Size, string> = { p: "p-5", m: "p-6 sm:p-8", g: "p-8 sm:p-12" };
const titleSize: Record<Size, string> = {
  p: "text-body-lg leading-snug tracking-[-0.015em]",
  m: "text-h3 sm:text-h2 leading-tight tracking-[-0.025em]",
  g: "text-h2 sm:text-h1 leading-[1.1] tracking-[-0.03em]",
};
const descSize: Record<Size, string> = { p: "text-body-sm", m: "text-body", g: "text-body-lg" };
const visualBox: Record<Size, string> = { p: "h-12 w-12", m: "h-16 w-16", g: "h-24 w-24" };
const ctaSize: Record<Size, string> = { p: "h-10 px-4 text-button toque:h-11", m: "h-10 px-5 text-button toque:h-11", g: "h-12 px-6 text-body" };

export function PartnerCard({
  orientation: orientacaoFixa, size = "m", eyebrow, title, description, cta, secondary, visual, surface = "card", className, ...props
}: PartnerCardProps) {
  const daGrade = useOrientacaoDoCard();
  const horizontal = (orientacaoFixa ?? daGrade ?? "vertical") === "horizontal";
  const dark = surface === "dark";
  const Cta = cta.href ? "a" : "button";
  const Sec = secondary?.href ? "a" : "button";
  return (
    <div
      data-slot="partner-card"
      className={cn(
        "relative isolate overflow-hidden rounded-xl border transition-shadow duration-200 hover:shadow-[var(--shadow-lg)]",
        surface === "card" && "border-border bg-card text-card-foreground",
        surface === "tint" && "border-primary/15 bg-[var(--surface-tint,var(--primary-muted))] text-foreground",
        dark && "border-white/10 bg-[var(--graphite-950)] text-white shadow-[var(--shadow-md)]",
        pad[size],
        horizontal ? "flex flex-col gap-6 sm:flex-row sm:items-center" : "flex flex-col gap-5",
        className,
      )}
      {...props}
    >
      {/* brilho na cor primária, como o fundo do hero */}
      <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 -z-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />

      {visual && (
        <div className={cn("flex shrink-0 items-center justify-center rounded-lg", dark ? "bg-white/10" : "bg-[var(--primary-muted)]", visualBox[size], horizontal ? "sm:order-last" : "")}>
          <span className={cn("flex items-center justify-center text-primary", size === "p" ? "[&>svg]:h-6 [&>svg]:w-6 [&>img]:h-7" : size === "m" ? "[&>svg]:h-8 [&>svg]:w-8 [&>img]:h-10" : "[&>svg]:h-12 [&>svg]:w-12 [&>img]:h-14")}>{visual}</span>
        </div>
      )}

      <div className={cn("@container/parceiro min-w-0", horizontal ? "flex-1" : "flex flex-1 flex-col")}>
        {eyebrow && (
          <div className="mb-3">
            {dark ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-caption font-semibold uppercase tracking-[0.14em] text-white/85"><span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />{eyebrow}</span>
            ) : (
              <Selo size="sm">{eyebrow}</Selo>
            )}
          </div>
        )}
        <h3 className={cn("font-bold [text-wrap:pretty]", titleSize[size], dark ? "text-white" : "text-foreground")} style={{ fontFamily: "var(--font-sans)" }}>
          {/* Destaque no tom do lenço só em texto grande; o título pequeno (18 px) no fundo claro usa o pink de texto (25/11/2026) */}
          {withHighlight(title, size === "p" && !dark ? "text-primary-text" : "text-primary-destaque")}
        </h3>
        {description && <p className={cn("mt-2 max-w-prose leading-relaxed", descSize[size], dark ? "text-white/70" : surface === "tint" ? "text-[color:color-mix(in_oklab,var(--muted-foreground)_85%,var(--foreground))]" : "text-muted-foreground")}>{description}</p>}
        {/* Ações (27/11/2026): o botão e o link ficam na mesma linha quando o card tem espaço. Em card estreito (menos de
            384 px de texto, como no celular), os dois viram botões da mesma largura, um embaixo do outro: o principal
            cheio e o secundário de contorno. Nunca um link sozinho embaixo do botão; o link tem 44 px de altura no toque. */}
        <div className={cn("mt-auto grid grid-cols-1 gap-3 @sm/parceiro:flex @sm/parceiro:flex-wrap @sm/parceiro:items-center @sm/parceiro:gap-x-5", size === "p" ? "pt-4" : "pt-6")}>
          <Cta
            {...(cta.href ? { href: cta.href } : { type: "button", onClick: cta.onClick })}
            className={cn("group inline-flex items-center justify-center gap-2 rounded-full bg-primary font-semibold text-primary-foreground shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-fast)] hover:-translate-y-0.5 hover:bg-[var(--primary-hover)] hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0", dark && "focus-visible:ring-offset-[var(--graphite-950)]", ctaSize[size])}
          >
            {cta.label}
            <ArrowRight className={cn("transition-transform group-hover:translate-x-0.5", size === "g" ? "h-5 w-5" : "h-4 w-4")} aria-hidden />
          </Cta>
          {secondary && (
            <Sec
              {...(secondary.href ? { href: secondary.href } : { type: "button", onClick: secondary.onClick })}
              className={cn(
                "inline-flex items-center justify-center rounded-full border font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                ctaSize[size],
                dark ? "border-white/30 text-white/90 hover:bg-white/10" : "border-input bg-card text-foreground hover:bg-accent",
                // Card largo: vira link discreto, na linha do botão, com a mesma altura de toque
                "@sm/parceiro:h-auto @sm/parceiro:min-h-11 @sm/parceiro:rounded-sm @sm/parceiro:border-0 @sm/parceiro:bg-transparent @sm/parceiro:px-1 @sm/parceiro:underline-offset-4 @sm/parceiro:hover:bg-transparent @sm/parceiro:hover:underline",
                !dark && "@sm/parceiro:text-[var(--primary-text,var(--primary))]",
              )}
            >
              {secondary.label}
            </Sec>
          )}
        </div>
      </div>
    </div>
  );
}
