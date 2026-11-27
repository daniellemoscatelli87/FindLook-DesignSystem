"use client";

// Carregamento de página ou de seção (pedido da dona do produto, 21/11/2026: "crie um loading melhor para a plataforma").
// O símbolo da FindLook quica como um pin que encontra o lugar, com a sombra e uma onda rosa a cada pouso; embaixo, o que
// está carregando e uma barra indeterminada. Aparece depois de 200 ms (carregamento rápido não pisca na tela). Se passar do
// tempo de demora, avisa e oferece "Tentar de novo". Com "menos movimento", nada se mexe: fica o símbolo e o texto.
// As animações estão em theme.css (fl-carregando-*), com as durações e curvas do DS.

import * as React from "react";
import { RotateCw } from "lucide-react";
import { Button } from "./button";
import { cn } from "./utils";

/** Símbolo da FindLook (pin com cabide), desenhado no próprio componente para não depender de arquivo. Cor do logo: --brand-pink (#FC0256, o lenço do gato). */
export function SimboloFindLook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1130.37 1427.63" className={className} aria-hidden focusable="false">
      <circle cx="565.18" cy="565.18" r="500.18" className="fill-white" />
      <path
        className="fill-[var(--brand-pink)]"
        d="M528.96,1.18c292.08-19.7,550.49,209.55,594.08,492.83,28.09,182.54-25.6,349.34-144.42,487.3-122.39,142.11-250.45,279.97-368.14,426.35-38.47,32.68-73.68,22.56-105.96-10.85-42.61-44.1-84.96-97.57-125.29-144.58-82.33-95.97-168.03-192.06-247.22-290.35C17.76,820.05-25.43,639.51,14.64,460.6,66.96,226.98,285.34,17.61,528.96,1.18ZM552.72,214.82c-61.93,6.36-119.22,54.35-136.71,113.75-16.47,55.95-10.94,82,53.97,75.5,42-4.21,28-29.27,38.92-56.07,22.23-54.56,103.5-53.56,126.1-.85,17.67,41.22-1.59,73.06-35.82,95.36-114.39,74.52-246.54,134.78-359.87,210.18-113.95,75.81-69.41,232.89,60.09,252.03l529.24.11c127.98-12.78,181.22-172.37,72.96-252.17l-231.76-146.06c26.54-21.31,50.32-48.94,60.31-82.14,34.51-114.66-60.68-221.64-177.44-209.64Z"
      />
      <path
        className="fill-[var(--brand-pink)]"
        d="M576.41,562.02c3.15-.8,5.8-.41,8.54,1.28l259.83,163.4c28.33,22.57,20.79,65.72-12.51,78.18-172.69,6.48-346.82.84-520.04,2.85-41.84-3.74-56.49-54.16-22.41-78.67l286.58-167.04Z"
      />
    </svg>
  );
}

export type CarregandoProps = {
  /** O que está carregando, em poucas palavras ("Carregando a área administrativa"). */
  mensagem?: string;
  /** Linha de apoio, opcional. */
  detalhe?: string;
  /** pagina: ocupa a tela inteira, sobre o fundo cinza; secao: dentro de um card ou de uma área da página. */
  variante?: "pagina" | "secao";
  /** Depois deste tempo (ms), avisa que está demorando e oferece "Tentar de novo". 0 desliga. Padrão: 10 s. */
  demoraMs?: number;
  /** Ação de "Tentar de novo". Padrão: recarregar a página. */
  onTentarDeNovo?: () => void;
  className?: string;
};

export function Carregando({ mensagem = "Carregando", detalhe, variante = "pagina", demoraMs = 10_000, onTentarDeNovo, className }: CarregandoProps) {
  const [demorou, setDemorou] = React.useState(false);
  React.useEffect(() => {
    if (!demoraMs) return;
    const t = window.setTimeout(() => setDemorou(true), demoraMs);
    return () => window.clearTimeout(t);
  }, [demoraMs]);

  return (
    <div
      role="status"
      aria-live="polite"
      data-slot="carregando"
      className={cn(
        "flex items-center justify-center px-4",
        variante === "pagina" ? "min-h-dvh bg-muted py-10" : "py-12",
        className,
      )}
    >
      <div className="fl-carregando fl-carregando-entra flex w-full max-w-xs flex-col items-center text-center">
        <div className="relative flex h-24 w-20 items-end justify-center" aria-hidden>
          <span className="fl-carregando-onda absolute bottom-0 h-4 w-14 rounded-[50%] border-2 border-primary/50" />
          <span className="fl-carregando-sombra absolute bottom-0.5 h-2.5 w-10 rounded-[50%] bg-foreground/15" />
          <SimboloFindLook className="fl-carregando-pin relative mb-2 h-14 w-auto drop-shadow-[0_6px_10px_rgb(230_32_64_/_0.18)]" />
        </div>
        <p className="mt-5 text-body leading-6 font-bold text-foreground">
          {mensagem}
          <span className="fl-carregando-reticencias" aria-hidden />
        </p>
        {detalhe && <p className="mt-1 text-body-sm leading-5 text-muted-foreground">{detalhe}</p>}
        <div className="fl-carregando-trilho mt-4 h-1 w-40 overflow-hidden rounded-full bg-primary/15" aria-hidden>
          <span className="fl-carregando-barra block h-full w-2/5 rounded-full bg-primary" />
        </div>
        {demorou && (
          <div className="fl-carregando-entra mt-6 flex flex-col items-center">
            <p className="text-body-sm leading-5 text-muted-foreground">Está levando mais tempo que o normal. Confira sua conexão e tente de novo.</p>
            <Button
              type="button"
              variant="outline"
              className="mt-3 h-11 border-input"
              onClick={() => (onTentarDeNovo ? onTentarDeNovo() : window.location.reload())}
            >
              <RotateCw aria-hidden /> Tentar de novo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
