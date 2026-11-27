import * as React from "react";
import { cn } from "./utils";

/**
 * Título de grupo com contador: separa os grupos de uma lista ("Atrasados 2", "Hoje 5", "Esta semana 12") e o topo das
 * colunas de um quadro. Título em 14 px negrito e, ao lado, a quantidade numa pílula cinza (números tabulares). Os
 * leitores de tela ouvem "Hoje, 5 itens" (o nome do item muda com `item`/`itens`). `icone` opcional à esquerda, em cinza.
 * `acao` fica na mesma linha, logo depois do contador (nunca empurrada para a ponta direita).
 */
export type TituloDeGrupoProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, "children"> & {
  titulo: string;
  quantidade?: number;
  icone?: React.ReactNode;
  item?: string;
  itens?: string;
  nivel?: 2 | 3 | 4;
  acao?: React.ReactNode;
};

export function TituloDeGrupo({ titulo, quantidade, icone, item = "item", itens = "itens", nivel = 3, acao, className, ...props }: TituloDeGrupoProps) {
  const Tag = `h${nivel}` as React.ElementType;
  return (
    <div data-slot="titulo-de-grupo" className={cn("flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1", className)}>
      <Tag className="m-0 flex min-w-0 items-center gap-2 text-body-sm font-bold text-foreground" {...props}>
        {icone && <span aria-hidden className="inline-flex shrink-0 text-muted-foreground [&>svg]:size-4">{icone}</span>}
        <span className="min-w-0">{titulo}</span>
        {quantidade !== undefined && (
          <>
            <span aria-hidden className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-2 text-label font-semibold tabular-nums text-foreground">{quantidade}</span>
            <span className="sr-only">, {quantidade} {quantidade === 1 ? item : itens}</span>
          </>
        )}
      </Tag>
      {acao}
    </div>
  );
}
