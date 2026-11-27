import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "./utils";
import { SurgirAoRolar } from "./surgir-ao-rolar";

/**
 * Lista de vantagens: as frases curtas do hero ("Lojas e marcas", "Suas peças encontradas por quem procura na região"),
 * cada uma com o check numa base redonda rosa (--primary-muted com o ícone em --primary-text). Uma lista de verdade
 * (<ul>), com o check escondido dos leitores de tela. Texto em --foreground, seminegrito; quebra embaixo do próprio
 * texto, nunca embaixo do check.
 * `surgir` faz os itens entrarem um depois do outro quando chegam na tela (SurgirAoRolar escalonado).
 */
export type ListaDeVantagensProps = {
  itens: React.ReactNode[];
  surgir?: boolean;
  tamanho?: "md" | "lg";
  className?: string;
};

export function ListaDeVantagens({ itens, surgir = false, tamanho = "md", className }: ListaDeVantagensProps) {
  const lista = itens.map((item, i) => (
    <li key={i} className={cn("relative font-medium text-foreground", tamanho === "lg" ? "pl-10 text-body-lg" : "pl-9 text-body")}>
      {/* O check fica fora do fluxo: o texto (e o que quebrar dele) começa sempre na mesma borda. */}
      <span aria-hidden className={cn("absolute left-0 top-0.5 flex items-center justify-center rounded-full bg-[var(--primary-muted)] text-primary-text", tamanho === "lg" ? "size-7" : "size-6")}>
        <Check className="size-3.5" strokeWidth={2.5} />
      </span>
      {item}
    </li>
  ));
  const classe = cn("m-0 flex list-none flex-col gap-3 p-0", className);
  if (surgir) return <SurgirAoRolar as="ul" escalonar data-slot="lista-de-vantagens" className={classe}>{lista}</SurgirAoRolar>;
  return <ul data-slot="lista-de-vantagens" className={classe}>{lista}</ul>;
}
