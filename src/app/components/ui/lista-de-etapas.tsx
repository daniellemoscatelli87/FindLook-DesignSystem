import * as React from "react";
import { cn } from "./utils";
import { IconeComBase } from "./painel-dados";

/**
 * Lista de etapas: como um processo acontece, passo a passo, para explicar regras e prazos dentro de um card.
 * Lista ordenada (o leitor de tela anuncia a ordem), cada etapa com ícone em base rosa, título, quando acontece (prazo)
 * e a descrição inteira, sem cortar. Uma linha fina liga os ícones. Diferente do ItemDeAtividade (feed do que já
 * aconteceu, com a descrição cortada em uma linha). As etapas e os prazos vêm do produto.
 */
export type Etapa = { icone: React.ReactNode; titulo: React.ReactNode; quando?: React.ReactNode; descricao?: React.ReactNode };

export function ListaDeEtapas({ etapas, className }: { etapas: Etapa[]; className?: string }) {
  return (
    <ol data-slot="lista-de-etapas" className={cn("m-0 list-none p-0", className)}>
      {etapas.map((e, i) => (
        <li key={i} className="relative flex gap-3 pb-4 last:pb-0">
          {i < etapas.length - 1 && <span aria-hidden className="absolute bottom-0 left-[1.125rem] top-10 w-px -translate-x-1/2 bg-border" />}
          <IconeComBase tom="marca" redonda className="[&>svg]:h-4 [&>svg]:w-4">{e.icone}</IconeComBase>
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <p className="m-0 text-[0.875rem] font-semibold text-foreground">{e.titulo}</p>
              {e.quando && <span className="shrink-0 text-[0.75rem] font-medium text-[var(--primary-text,var(--primary))]">{e.quando}</span>}
            </div>
            {e.descricao && <p className="m-0 mt-0.5 text-[0.8125rem] leading-snug text-muted-foreground">{e.descricao}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
