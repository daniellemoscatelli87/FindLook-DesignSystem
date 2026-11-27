"use client";

import * as React from "react";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";

/**
 * Botão com retorno: o botão de uma ação que leva um tempo (Salvar, Enviar, Conferir) mostra o que está acontecendo
 * no próprio botão: carregando (girando, texto "Salvando…"), depois sucesso (check, "Salvo") e volta sozinho ao estado
 * inicial; com erro, mostra o erro por um instante e volta. Mesmas variantes e tamanhos do Button.
 * - estado: "parado" | "carregando" | "sucesso" | "erro" (controlado).
 * - useRetornoDoBotao(acao): cuida dos estados e dos tempos (sucesso 2 s, erro 2,5 s).
 * O botão fica desabilitado enquanto carrega (sem clique duplo) e a largura não pula (o texto mais longo reserva o
 * espaço). A mudança é anunciada aos leitores de tela. O check entra com um pulo curto (parado com "menos movimento").
 */
export type EstadoDoBotao = "parado" | "carregando" | "sucesso" | "erro";

export type BotaoComRetornoProps = React.ComponentProps<typeof Button> & {
  estado: EstadoDoBotao;
  icone?: React.ReactNode;
  textoCarregando?: string;
  textoSucesso?: string;
  textoErro?: string;
};

export function BotaoComRetorno({ estado, icone, textoCarregando = "Salvando…", textoSucesso = "Salvo", textoErro = "Não deu certo", children, className, disabled, ...props }: BotaoComRetornoProps) {
  const conteudo: Record<EstadoDoBotao, React.ReactNode> = {
    parado: <>{icone}{children}</>,
    carregando: <><Loader2 aria-hidden className="animate-spin motion-reduce:animate-none" />{textoCarregando}</>,
    sucesso: <><Check aria-hidden className="motion-safe:animate-in motion-safe:zoom-in-50 motion-safe:duration-[var(--duration-normal)]" />{textoSucesso}</>,
    erro: <><AlertCircle aria-hidden />{textoErro}</>,
  };
  return (
    <>
    <Button
      data-slot="botao-com-retorno"
      data-estado={estado}
      aria-disabled={estado === "carregando" || undefined}
      disabled={disabled || estado === "carregando"}
      className={cn("grid [grid-template-areas:'a'] place-items-center", className)}
      {...props}
    >
      {/* Os quatro textos ocupam a mesma célula: a largura do botão é a do mais longo e não pula entre os estados. */}
      {(Object.keys(conteudo) as EstadoDoBotao[]).map((e) => (
        <span key={e} aria-hidden={e !== estado} className={cn("inline-flex items-center gap-2 [grid-area:a] [&_svg]:size-4 [&_svg]:shrink-0", e !== estado && "invisible")}>
          {conteudo[e]}
        </span>
      ))}
    </Button>
    <span className="sr-only" aria-live="polite">{estado === "carregando" ? textoCarregando : estado === "sucesso" ? textoSucesso : estado === "erro" ? textoErro : ""}</span>
    </>
  );
}

/** Cuida do ciclo do botão: carregando → sucesso (2 s) → parado; ou carregando → erro (2,5 s) → parado. */
export function useRetornoDoBotao(acao: () => Promise<unknown> | unknown) {
  const [estado, setEstado] = React.useState<EstadoDoBotao>("parado");
  const tempo = React.useRef<number | undefined>(undefined);
  React.useEffect(() => () => window.clearTimeout(tempo.current), []);
  const executar = React.useCallback(async () => {
    if (estado === "carregando") return;
    window.clearTimeout(tempo.current);
    setEstado("carregando");
    try {
      await acao();
      setEstado("sucesso");
      tempo.current = window.setTimeout(() => setEstado("parado"), 2000);
    } catch {
      setEstado("erro");
      tempo.current = window.setTimeout(() => setEstado("parado"), 2500);
    }
  }, [acao, estado]);
  return { estado, executar };
}
