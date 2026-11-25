"use client";

import * as React from "react";
import { cn } from "./utils";
import { Switch } from "./switch";
import { IconeComBase } from "./painel-dados";

/**
 * Linha com interruptor: um ajuste que liga e desliga, com título, descrição e ícone opcional.
 * É a linha das configurações (template Configurações): várias linhas seguidas, separadas por divide-y,
 * dentro de um CardComCabecalho. A descrição pode mudar com o estado ("Ligado, …" / "Desligado, …").
 * Conteúdo extra (por exemplo, os campos que o ajuste libera) entra em `children` e aparece só com o interruptor ligado.
 */
export function LinhaComInterruptor({
  titulo, descricao, icone, checked, onCheckedChange, disabled = false, children, className, id: idProp,
}: {
  titulo: React.ReactNode;
  descricao?: React.ReactNode;
  /** Ícone em base cinza (só identifica o ajuste). */
  icone?: React.ReactNode;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  disabled?: boolean;
  /** Mostrado embaixo, só com o interruptor ligado. */
  children?: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const auto = React.useId();
  const id = idProp ?? `linha-${auto.replace(/:/g, "")}`;
  return (
    <div data-slot="linha-com-interruptor" data-ligado={checked || undefined} className={cn("py-3 first:pt-0 last:pb-0", className)}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2.5">
          {icone && <IconeComBase tom="informativo" tamanho="sm">{icone}</IconeComBase>}
          <div className="min-w-0">
            <label htmlFor={id} className={cn("block text-[0.875rem] font-medium text-foreground", disabled ? "cursor-not-allowed" : "cursor-pointer")}>{titulo}</label>
            {descricao && <p id={`${id}-desc`} className="m-0 text-[0.8125rem] leading-snug text-muted-foreground">{descricao}</p>}
          </div>
        </div>
        <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} aria-describedby={descricao ? `${id}-desc` : undefined} />
      </div>
      {checked && children && <div className="mt-3" data-slot="linha-com-interruptor-conteudo">{children}</div>}
    </div>
  );
}
