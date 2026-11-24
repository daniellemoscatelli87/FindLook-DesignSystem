import * as React from "react";
import { cn } from "./utils";

/**
 * MarcaFind: o nome da FindLook e das marcas da família (FindScore, FindStar, FindBox, FindCloset) escrito com a
 * mesma estética do logo (decisão da dona do produto, 24/11/2026): "Find" em preto (foreground) e a segunda palavra
 * no rosa da marca, Plus Jakarta Sans ExtraBold e espaçamento fechado, como no wordmark oficial. Onde qualquer uma
 * dessas marcas aparecer, usar este componente, nunca o texto solto.
 * O tamanho vem do contexto (font-size do pai ou className). Leitores de tela leem o nome inteiro.
 */
export type SufixoDaMarca = "Look" | "Score" | "Star" | "Box" | "Closet";

export function MarcaFind({ sufixo, className }: { sufixo: SufixoDaMarca; className?: string }) {
  return (
    <span
      data-slot="marca-find"
      className={cn("whitespace-nowrap font-[family-name:var(--font-display,var(--font-sans))] font-extrabold tracking-[-0.035em] text-foreground", className)}
    >
      Find<span className="text-primary">{sufixo}</span>
    </span>
  );
}

const PADRAO_DAS_MARCAS = /(FindLook|FindScore|FindStar|FindBox|FindCloset)/;

/** Troca os nomes das marcas dentro de um texto pelo MarcaFind (para títulos e frases que citam FindScore, FindStar…). */
export function textoComMarcas(texto: string): React.ReactNode {
  const partes = texto.split(PADRAO_DAS_MARCAS);
  if (partes.length === 1) return texto;
  return partes.map((p, i) => (PADRAO_DAS_MARCAS.test(p) ? <MarcaFind key={i} sufixo={p.slice(4) as SufixoDaMarca} /> : <React.Fragment key={i}>{p}</React.Fragment>));
}
