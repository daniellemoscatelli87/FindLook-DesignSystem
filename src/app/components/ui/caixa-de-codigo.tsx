"use client";

import * as React from "react";
import { Check, Clock, Copy } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";

/**
 * Caixa de código: um código ou mensagem curta que a pessoa precisa copiar ou enviar (o código de vínculo do WhatsApp
 * da loja: "FINDLOOK 4821"). O código fica grande, em fonte mono e espaçado, sobre o rosa de destaque
 * (--primary-muted, 21:1 com o texto); em cima, a instrução; embaixo, a validade (relógio + texto) e as ações, numa
 * linha, alinhadas à borda esquerda do texto.
 * `copiar` põe o botão Copiar, que vira "Copiado" com o check por 2 s e avisa os leitores de tela. `acoes` recebe
 * outros botões (por exemplo, "Abrir no WhatsApp" e "Já mandei"). Uma ação principal só por caixa.
 * Entrada suave quando aparece (parada com "menos movimento").
 */
export type CaixaDeCodigoProps = {
  codigo: string;
  instrucao?: React.ReactNode;
  validade?: React.ReactNode;
  copiar?: boolean | { rotulo?: string; rotuloCopiado?: string };
  acoes?: React.ReactNode;
  className?: string;
};

export function CaixaDeCodigo({ codigo, instrucao, validade, copiar = true, acoes, className }: CaixaDeCodigoProps) {
  const [copiado, setCopiado] = React.useState(false);
  const textos = typeof copiar === "object" ? copiar : {};
  React.useEffect(() => {
    if (!copiado) return;
    const t = window.setTimeout(() => setCopiado(false), 2000);
    return () => window.clearTimeout(t);
  }, [copiado]);
  const copiarAgora = async () => {
    try { await navigator.clipboard?.writeText(codigo); } catch { /* sem área de transferência: segue sem copiar */ }
    setCopiado(true);
  };
  return (
    <div data-slot="caixa-de-codigo" className={cn("rounded-lg border border-border bg-card p-4 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-[var(--duration-slow)] sm:p-5", className)}>
      {instrucao && <p className="m-0 text-body-sm text-muted-foreground">{instrucao}</p>}
      <p className={cn("m-0 rounded-md bg-[var(--primary-muted)] px-4 py-3 font-mono text-h3 font-bold tracking-[0.1em] text-foreground [overflow-wrap:anywhere]", instrucao && "mt-2")}>{codigo}</p>
      {validade && (
        <p className="m-0 mt-2 flex items-center gap-1.5 text-label text-muted-foreground">
          <Clock aria-hidden className="size-3.5 shrink-0" /> {validade}
        </p>
      )}
      {(copiar || acoes) && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {acoes}
          {copiar && (
            <Button type="button" variant="outline" onClick={() => void copiarAgora()} className="h-10 toque:h-11">
              {copiado ? <Check aria-hidden className="text-success-text" /> : <Copy aria-hidden />}
              {copiado ? (textos.rotuloCopiado ?? "Copiado") : (textos.rotulo ?? "Copiar")}
            </Button>
          )}
          <span className="sr-only" aria-live="polite">{copiado ? "Código copiado." : ""}</span>
        </div>
      )}
    </div>
  );
}
