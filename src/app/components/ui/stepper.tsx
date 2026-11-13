import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "./utils";

/**
 * Stepper (indicador de etapas) — progresso de um formulário em várias telas, como o cadastro do lojista.
 *
 * Mostra todas as etapas em ordem, com um marcador numerado por etapa e o nome dela. A etapa atual fica destacada
 * (borda e fundo rosa claro, aria-current="step"); as concluídas ficam preenchidas na primária, com check; as
 * futuras ficam em grafite e não podem ser abertas antes da hora. Etapas concluídas podem ser reabertas quando
 * `onIrPara` é informado (voltar sem perder dados).
 *
 * No celular, os nomes das outras etapas saem da tela (continuam para leitores de tela) e aparecem "Etapa X de N" e
 * o nome da etapa atual; a partir de 640 px, os nomes aparecem embaixo de cada marcador. O estado nunca depende só
 * da cor: concluída tem check, a atual tem borda e nome em negrito, e cada marcador tem o estado em texto para
 * leitores de tela.
 */
export type StepperEtapa = {
  titulo: string;
  /** Texto curto opcional, mostrado só a partir de 640 px. */
  descricao?: string;
};

export type StepperProps = {
  etapas: StepperEtapa[];
  /** Índice da etapa atual (começa em 0). */
  atual: number;
  /** Índices das etapas concluídas. Padrão: todas as anteriores à atual. */
  concluidas?: number[];
  /** Abre uma etapa concluída (voltar sem perder dados). Sem esta função, os marcadores não são clicáveis. */
  onIrPara?: (indice: number) => void;
  /** Nome da navegação para leitores de tela (padrão: "Etapas"). */
  rotulo?: string;
  /** Textos da interface. */
  textos?: { etapa?: string; de?: string; concluida?: string; atualTexto?: string; pendente?: string; voltarPara?: string };
  className?: string;
};

export function Stepper({ etapas, atual, concluidas, onIrPara, rotulo = "Etapas", textos, className }: StepperProps) {
  const tx = {
    etapa: "Etapa",
    de: "de",
    concluida: "concluída",
    atualTexto: "etapa atual",
    pendente: "pendente",
    voltarPara: "Voltar para",
    ...textos,
  };
  const feitas = new Set(concluidas ?? etapas.map((_, i) => i).filter((i) => i < atual));
  const total = etapas.length;
  const corrente = etapas[atual];

  return (
    <nav aria-label={rotulo} data-slot="stepper" className={cn("w-full", className)}>
      {/* Celular: "Etapa X de N" e o nome da etapa atual. */}
      <p className="mb-3 text-[0.8125rem] text-muted-foreground sm:hidden" aria-hidden>
        {tx.etapa} {atual + 1} {tx.de} {total}
        {corrente && <> · <span className="font-semibold text-foreground">{corrente.titulo}</span></>}
      </p>
      <ol className="flex items-start">
        {etapas.map((e, i) => {
          const feita = feitas.has(i) && i !== atual;
          const ehAtual = i === atual;
          const clicavel = Boolean(onIrPara) && feita;
          const estado = ehAtual ? tx.atualTexto : feita ? tx.concluida : tx.pendente;
          const marcador = (
            <span
              aria-hidden
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-[0.8125rem] font-bold tabular-nums transition-colors duration-200",
                feita && "border-primary bg-primary text-primary-foreground",
                ehAtual && "border-primary bg-[var(--primary-muted)] text-[var(--primary-text)]",
                !feita && !ehAtual && "border-[var(--border-strong)] bg-card text-muted-foreground",
              )}
            >
              {feita ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
            </span>
          );
          const nome = (
            <span className="mt-2 hidden max-w-[9rem] text-center sm:block">
              <span className={cn("block text-[0.8125rem] leading-tight", ehAtual ? "font-bold text-foreground" : "font-medium text-muted-foreground")}>{e.titulo}</span>
              {e.descricao && <span className="mt-0.5 block text-[0.75rem] font-normal leading-snug text-muted-foreground">{e.descricao}</span>}
            </span>
          );
          return (
            <li key={i} className="relative flex flex-1 flex-col items-center" aria-current={ehAtual ? "step" : undefined}>
              {/* Ligação com a etapa anterior: preenchida quando a anterior está concluída. */}
              {i > 0 && (
                <span
                  aria-hidden
                  className={cn("absolute right-1/2 top-4 h-0.5 w-full -translate-y-1/2", feitas.has(i - 1) ? "bg-primary" : "bg-[var(--border-strong)]")}
                  style={{ marginRight: "1rem", width: "calc(100% - 2rem)" }}
                />
              )}
              {clicavel ? (
                <button
                  type="button"
                  onClick={() => onIrPara!(i)}
                  className="relative z-[1] flex flex-col items-center rounded-[10px] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {marcador}
                  {nome}
                  <span className="sr-only">{`${tx.voltarPara} ${tx.etapa.toLowerCase()} ${i + 1}, ${e.titulo} (${estado})`}</span>
                </button>
              ) : (
                <span className="relative z-[1] flex flex-col items-center">
                  {marcador}
                  {nome}
                  <span className="sr-only">{`${tx.etapa} ${i + 1} ${tx.de} ${total}, ${e.titulo} (${estado})`}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
