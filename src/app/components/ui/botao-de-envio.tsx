"use client";

import * as React from "react";
import { Check, LoaderCircle, RotateCcw } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";

/**
 * BotaoDeEnvio (botão com os estados de envio): mesma API do BotaoDeEnvio do design system Dani Moscatelli.
 * O Button do DS com o retorno de cada envio, sem mudar de tamanho: parado → "Enviando…" (girando) → "Enviado" com
 * check → volta sozinho ao estado parado; ou "Tentar de novo" quando falha. Veio dos botões Salvar e Conferir do
 * produto, que pintavam os estados à mão (regra de interação da dona do produto, 17/11/2026).
 *
 * estado: "parado" | "enviando" | "feito" | "erro". Em "enviando" o botão fica ocupado (aria-busy, desativado, na
 * cor de sempre, com o cursor de espera); em "feito" fica no verde de sucesso (--success, texto branco 4,6:1) com o
 * check; `voltarApos` (ms, padrão 2400) chama onVoltar para o produto trocar o estado para "parado". Em "erro", o
 * texto vira `textos.erro` e o clique tenta de novo. A largura fica fixa na maior das quatro mensagens.
 * A mais no FindLook: useEstadoDoEnvio(acao) cuida do ciclo inteiro ({ estado, enviar, voltar }).
 * O anúncio para leitores de tela sai numa região aria-live dentro do botão. Menos movimento: sem giro nem entrada.
 */
export type EstadoDoEnvio = "parado" | "enviando" | "feito" | "erro";

export type BotaoDeEnvioProps = Omit<React.ComponentProps<typeof Button>, "children"> & {
  estado?: EstadoDoEnvio;
  children: React.ReactNode;
  textos?: { enviando?: string; feito?: string; erro?: string };
  /** Ícone do estado parado (por exemplo, Save). */
  icone?: React.ReactNode;
  voltarApos?: number;
  onVoltar?: () => void;
};

function BotaoDeEnvio({ estado = "parado", children, textos, icone, voltarApos = 2400, onVoltar, className, disabled, variant, ...props }: BotaoDeEnvioProps) {
  const tx = { enviando: "Enviando…", feito: "Enviado", erro: "Tentar de novo", ...textos };
  React.useEffect(() => {
    if (estado !== "feito" || !onVoltar) return;
    const t = window.setTimeout(onVoltar, voltarApos);
    return () => window.clearTimeout(t);
  }, [estado, onVoltar, voltarApos]);
  const conteudo: Record<EstadoDoEnvio, React.ReactNode> = {
    parado: <>{icone}{children}</>,
    enviando: <><LoaderCircle aria-hidden className="motion-safe:animate-spin" />{tx.enviando}</>,
    feito: <><Check aria-hidden />{tx.feito}</>,
    erro: <><RotateCcw aria-hidden />{tx.erro}</>,
  };
  const anuncio = estado === "enviando" ? tx.enviando : estado === "feito" ? tx.feito : estado === "erro" ? tx.erro : "";
  const cheio = !variant || variant === "default";
  return (
    <Button
      data-slot="botao-de-envio"
      data-estado={estado}
      aria-busy={estado === "enviando" || undefined}
      disabled={disabled || estado === "enviando"}
      variant={variant}
      className={cn(
        "relative grid place-items-center [grid-template-areas:'x'] *:[grid-area:x]",
        estado === "enviando" && "disabled:cursor-wait",
        estado === "enviando" && cheio && "disabled:bg-primary disabled:text-primary-foreground disabled:hover:bg-primary disabled:hover:text-primary-foreground",
        estado === "enviando" && !cheio && "disabled:border-input disabled:bg-background disabled:text-foreground",
        estado === "feito" && "border-transparent bg-success text-success-foreground hover:bg-success hover:text-success-foreground",
        className,
      )}
      {...props}
    >
      {/* Medidas invisíveis: a largura do botão é a da maior mensagem */}
      {(Object.keys(conteudo) as EstadoDoEnvio[]).map((k) => (
        <span key={k} aria-hidden className="invisible inline-flex items-center gap-2">{conteudo[k]}</span>
      ))}
      <span key={estado} className="inline-flex items-center gap-2 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-[var(--duration-fast)]">
        {conteudo[estado]}
      </span>
      <span className="sr-only" aria-live="polite">{anuncio}</span>
    </Button>
  );
}

/** FindLook: cuida do ciclo do botão (enviando → feito ou erro). `voltar` vai no onVoltar do botão. */
function useEstadoDoEnvio(acao: () => Promise<unknown> | unknown) {
  const [estado, setEstado] = React.useState<EstadoDoEnvio>("parado");
  const enviar = React.useCallback(async () => {
    if (estado === "enviando") return;
    setEstado("enviando");
    try {
      await acao();
      setEstado("feito");
    } catch {
      setEstado("erro");
    }
  }, [acao, estado]);
  const voltar = React.useCallback(() => setEstado("parado"), []);
  return { estado, enviar, voltar };
}

export { BotaoDeEnvio, useEstadoDoEnvio };
