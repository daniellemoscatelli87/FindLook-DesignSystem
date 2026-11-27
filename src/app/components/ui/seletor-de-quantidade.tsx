"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";

/**
 * Seletor de quantidade (estoque por tamanho, quantidade de peças): menos, o número e mais, numa caixa só de borda.
 * Botões de 44 px no celular e 40 px no computador; o menos fica desabilitado no mínimo e o mais no máximo. O número
 * pulsa de leve a cada mudança (parado com "menos movimento") e é anunciado aos leitores de tela.
 * `rotulo` dá nome ao grupo e aos botões: "Quantidade do tamanho M" vira "Diminuir a quantidade do tamanho M".
 */
export type SeletorDeQuantidadeProps = {
  valor: number;
  onValorChange: (v: number) => void;
  rotulo: string;
  min?: number;
  max?: number;
  passo?: number;
  desabilitado?: boolean;
  className?: string;
};

export function SeletorDeQuantidade({ valor, onValorChange, rotulo, min = 0, max = 999, passo = 1, desabilitado = false, className }: SeletorDeQuantidadeProps) {
  const nome = rotulo.charAt(0).toLowerCase() + rotulo.slice(1);
  const botao = "size-10 rounded-md toque:size-11";
  return (
    <div role="group" aria-label={rotulo} data-slot="seletor-de-quantidade" className={cn("inline-flex items-center rounded-md border border-[var(--border-strong)] bg-card", desabilitado && "opacity-50", className)}>
      <Button type="button" variant="ghost" size="icon" className={botao} aria-label={`Diminuir a ${nome}`} disabled={desabilitado || valor - passo < min} onClick={() => onValorChange(Math.max(min, valor - passo))}>
        <Minus aria-hidden />
      </Button>
      <span
        key={valor}
        aria-live="polite"
        className="min-w-9 text-center text-body font-bold tabular-nums text-foreground motion-safe:animate-in motion-safe:zoom-in-75 motion-safe:fade-in-50 motion-safe:duration-[var(--duration-normal)]"
      >
        {valor}
      </span>
      <Button type="button" variant="ghost" size="icon" className={botao} aria-label={`Aumentar a ${nome}`} disabled={desabilitado || valor + passo > max} onClick={() => onValorChange(Math.min(max, valor + passo))}>
        <Plus aria-hidden />
      </Button>
    </div>
  );
}
