"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "./utils";
import { MensagemDeErro } from "./campo";

/**
 * GrupoDeOpcoes: um conjunto de escolhas com um nome só (Tipo de estabelecimento, Categorias, Público). É um <fieldset>
 * com <legend> visível (16 px, negrito), uma ajuda opcional embaixo e as opções. `disposicao`:
 * "lista" (uma por linha: rádios, LinhaDeInterruptor, CartaoDeEscolha) ou "chips" (ChipFiltravel lado a lado, quebrando
 * de linha). Com erro, a mensagem aparece embaixo das opções e o grupo fica ligado a ela.
 * `separado` põe uma linha fina em cima (grupos seguidos dentro de um painel de filtros).
 *
 * LinhaDeInterruptor: uma configuração que liga e desliga ("Só lojas novas", "Avisar por e-mail"). A linha inteira é o
 * interruptor (role="switch", 44 px de altura ou mais): o nome à esquerda, a ajuda embaixo do nome e o interruptor à
 * direita, com o desenho do Switch do DS. O nome lido é o rótulo; a ajuda é a descrição. Hover cinza na linha inteira.
 */

export type GrupoDeOpcoesProps = Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, "title"> & {
  titulo: string;
  ajuda?: React.ReactNode;
  erro?: string | null;
  disposicao?: "lista" | "chips";
  separado?: boolean;
};

export function GrupoDeOpcoes({ titulo, ajuda, erro, disposicao = "lista", separado = false, className, children, ...props }: GrupoDeOpcoesProps) {
  const id = React.useId();
  return (
    <fieldset
      data-slot="grupo-de-opcoes"
      aria-describedby={[ajuda ? `${id}-ajuda` : null, erro ? `${id}-erro` : null].filter(Boolean).join(" ") || undefined}
      aria-invalid={erro ? true : undefined}
      className={cn("m-0 min-w-0 border-0 p-0", separado && "border-t border-border pt-5", className)}
      {...props}
    >
      <legend className="float-left mb-1 w-full p-0 text-body font-bold leading-snug text-foreground">{titulo}</legend>
      {ajuda && <p id={`${id}-ajuda`} className="clear-both m-0 text-body-sm text-muted-foreground">{ajuda}</p>}
      <div className={cn("clear-both mt-3", disposicao === "chips" ? "flex flex-wrap gap-2" : "flex flex-col gap-1")}>{children}</div>
      {erro && <MensagemDeErro id={`${id}-erro`} className="mt-2">{erro}</MensagemDeErro>}
    </fieldset>
  );
}

export type LinhaDeInterruptorProps = Omit<React.ComponentProps<typeof SwitchPrimitive.Root>, "children"> & {
  rotulo: string;
  ajuda?: React.ReactNode;
};

export function LinhaDeInterruptor({ rotulo, ajuda, className, disabled, ...props }: LinhaDeInterruptorProps) {
  const id = React.useId();
  return (
    <SwitchPrimitive.Root
      data-slot="linha-de-interruptor"
      aria-labelledby={`${id}-rotulo`}
      aria-describedby={ajuda ? `${id}-ajuda` : undefined}
      disabled={disabled}
      className={cn(
        "group/linha -mx-3 flex min-h-11 w-[calc(100%+1.5rem)] cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2.5 text-left transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
        className,
      )}
      {...props}
    >
      <span className="min-w-0">
        <span id={`${id}-rotulo`} className="block text-body-sm font-medium text-foreground">{rotulo}</span>
        {ajuda && <span id={`${id}-ajuda`} className="mt-0.5 block text-label leading-snug text-muted-foreground">{ajuda}</span>}
      </span>
      {/* Mesmo desenho do Switch do DS (ui/switch) */}
      <span
        aria-hidden
        className="inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-transparent bg-switch-background transition-colors group-data-[state=checked]/linha:bg-primary dark:bg-input/80"
      >
        <span className="block size-4.5 translate-x-0.5 rounded-full bg-card shadow-sm transition-transform duration-[var(--duration-fast)] group-data-[state=checked]/linha:translate-x-[1.3125rem] dark:group-data-[state=checked]/linha:bg-primary-foreground" />
      </span>
    </SwitchPrimitive.Root>
  );
}
