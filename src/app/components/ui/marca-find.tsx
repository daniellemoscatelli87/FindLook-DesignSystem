import * as React from "react";
import { cn } from "./utils";

/**
 * MarcaFind: nomes da família FindLook escritos com a mesma estética do logo: "Find" em preto (foreground) e a segunda
 * palavra no rosa da marca (tom de texto --primary-text, que passa no contraste em qualquer tamanho), Plus Jakarta Sans ExtraBold e espaçamento fechado, como no wordmark oficial. O produto usa
 * este componente sempre que um nome "Find + palavra" aparecer na interface, nunca o texto solto.
 * O tamanho vem do contexto (font-size do pai ou className).
 */
export function MarcaFind({ palavra, className }: { palavra: string; className?: string }) {
  return (
    <span
      data-slot="marca-find"
      className={cn("whitespace-nowrap font-[family-name:var(--font-display,var(--font-sans))] font-extrabold tracking-[-0.035em] text-foreground", className)}
    >
      Find<span className="text-[var(--primary-text,var(--primary))]">{palavra}</span>
    </span>
  );
}

/**
 * Troca, dentro de um texto, os nomes "Find + palavra" informados pelo MarcaFind.
 * Ex.: textoComMarcas("Conheça a FindLook", ["Look"]).
 */
export function textoComMarcas(texto: string, palavras: string[] = ["Look"]): React.ReactNode {
  if (palavras.length === 0) return texto;
  const padrao = new RegExp(`(Find(?:${palavras.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")}))`);
  const partes = texto.split(padrao);
  if (partes.length === 1) return texto;
  return partes.map((p, i) => (padrao.test(p) && p.startsWith("Find") ? <MarcaFind key={i} palavra={p.slice(4)} /> : <React.Fragment key={i}>{p}</React.Fragment>));
}
