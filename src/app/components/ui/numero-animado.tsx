"use client";

import * as React from "react";
import { animate, useInView } from "motion/react";
import { CURVA_SNAPPY, useMenosMovimento } from "./movimento";

/**
 * Número animado: sobe de 0 até o valor quando aparece na tela e, depois, acompanha as mudanças do valor (por exemplo,
 * as visualizações de uma demonstração "ao vivo"). Formato pt-BR (1.284) por padrão.
 * Leitores de tela ouvem só o valor final (o número que corre fica oculto para eles). Com "menos movimento", o valor
 * aparece direto. Números tabulares, para a largura não pular enquanto conta.
 */
export type NumeroAnimadoProps = {
  valor: number;
  /** Atraso antes da primeira contagem, em segundos. */
  atraso?: number;
  /** Duração da primeira contagem, em segundos (padrão 1,1 s); as mudanças seguintes levam 0,6 s. */
  duracao?: number;
  /** Como escrever o número (padrão: pt-BR sem casas decimais). */
  formatar?: (n: number) => string;
  className?: string;
};

const fmt = new Intl.NumberFormat("pt-BR");

export function NumeroAnimado({ valor, atraso = 0, duracao = 1.1, formatar = (n) => fmt.format(n), className }: NumeroAnimadoProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const visivel = useInView(ref, { once: true, margin: "-40px" });
  const menos = useMenosMovimento();
  const [atual, setAtual] = React.useState(0);
  const anterior = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (menos) { setAtual(valor); anterior.current = valor; return; }
    if (!visivel) return;
    const de = anterior.current ?? 0;
    anterior.current = valor;
    const controle = animate(de, valor, {
      delay: de === 0 ? atraso : 0,
      duration: de === 0 ? duracao : 0.6,
      ease: CURVA_SNAPPY as unknown as [number, number, number, number],
      onUpdate: (v) => setAtual(Math.round(v)),
    });
    return () => controle.stop();
  }, [visivel, menos, valor, atraso, duracao]);

  return (
    <span ref={ref} data-slot="numero-animado" className={className}>
      <span aria-hidden className="tabular-nums">{formatar(atual)}</span>
      <span className="sr-only">{formatar(valor)}</span>
    </span>
  );
}
