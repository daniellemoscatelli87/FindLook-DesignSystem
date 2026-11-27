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
 * LinhaDeInterruptor: uma configuração que liga e desliga ("Só lojas novas", "Avisar por e-mail"). O nome à esquerda
 * (é o rótulo: clicar nele também liga e desliga), a ajuda embaixo do nome e o interruptor à direita, com o desenho
 * do Switch do DS e área de toque de 44 px. O nome lido é o rótulo; a ajuda é a descrição. Hover cinza na linha.
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
      <div className={cn("clear-both mt-3", disposicao === "chips" ? "grid grid-cols-2 gap-2 sm:flex sm:flex-wrap" : "flex flex-col gap-1")}>{children}</div>
      {erro && <MensagemDeErro id={`${id}-erro`} className="mt-2">{erro}</MensagemDeErro>}
    </fieldset>
  );
}

export type LinhaDeInterruptorProps = Omit<React.ComponentProps<typeof SwitchPrimitive.Root>, "children"> & {
  rotulo: string;
  ajuda?: React.ReactNode;
};

export function LinhaDeInterruptor({ rotulo, ajuda, className, disabled, id: idProp, ...props }: LinhaDeInterruptorProps) {
  const autoId = React.useId();
  const id = idProp ?? autoId;
  return (
    <div
      data-slot="linha-de-interruptor"
      data-desabilitada={disabled ? "" : undefined}
      className={cn(
        "-mx-3 flex min-h-11 items-center justify-between gap-4 rounded-md px-3 py-1 transition-colors hover:bg-accent data-[desabilitada]:opacity-50 data-[desabilitada]:hover:bg-transparent",
        className,
      )}
    >
      {/* O nome é o rótulo do interruptor: clicar nele também liga e desliga. */}
      <label htmlFor={id} className={cn("min-w-0 flex-1 py-1.5", disabled ? "cursor-not-allowed" : "cursor-pointer")}>
        <span id={`${id}-rotulo`} className="block text-body-sm font-medium text-foreground">{rotulo}</span>
        {ajuda && <span id={`${id}-ajuda`} className="mt-0.5 block text-label leading-snug text-muted-foreground">{ajuda}</span>}
      </label>
      <SwitchPrimitive.Root
        id={id}
        aria-labelledby={`${id}-rotulo`}
        aria-describedby={ajuda ? `${id}-ajuda` : undefined}
        disabled={disabled}
        className="group/interruptor -mr-1.5 flex h-11 w-14 shrink-0 cursor-pointer items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed"
        {...props}
      >
        {/* Mesmo desenho do Switch do DS (ui/switch); a área de toque tem 44 px. */}
        <span
          aria-hidden
          className="inline-flex h-6 w-11 items-center rounded-full border border-transparent bg-switch-background transition-colors group-data-[state=checked]/interruptor:bg-primary dark:bg-input/80"
        >
          <span className="block size-4.5 translate-x-0.5 rounded-full bg-card shadow-sm transition-transform duration-[var(--duration-fast)] group-data-[state=checked]/interruptor:translate-x-[1.3125rem] dark:group-data-[state=checked]/interruptor:bg-primary-foreground" />
        </span>
      </SwitchPrimitive.Root>
    </div>
  );
}
