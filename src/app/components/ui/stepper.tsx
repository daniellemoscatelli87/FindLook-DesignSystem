import * as React from "react";
import { cn } from "./utils";

/**
 * Stepper (indicador de etapas) — progresso de um formulário em várias telas, como o cadastro do lojista.
 *
 * Visual do protótipo do produto (v8.87): etapas em abas numeradas ("01", "02"…), lado a lado sobre uma linha.
 * - Atual: número em círculo preenchido na primária, nome em negrito escuro e sublinhado de 3 px na primária
 *   (aria-current="step").
 * - Concluída: número em círculo preenchido em grafite escuro (--foreground); pode ser reaberta quando `onIrPara`
 *   é informado (voltar sem perder dados).
 * - Futura: número em círculo cinza claro (--secondary); não pode ser aberta antes da hora.
 *
 * Abaixo de 640 px (o protótipo é só de computador; versão do design system): aparecem "Etapa X de N", o nome da
 * etapa atual e os números, sem os nomes das outras etapas (continuam para leitores de tela). O estado nunca
 * depende só da cor: preenchimento escuro, primária ou claro, sublinhado na atual e o estado em texto para leitores
 * de tela.
 */
export type StepperEtapa = {
  titulo: string;
  /** Texto curto opcional; não aparece no visual de abas (fica para leitores de tela). */
  descricao?: string;
};

export type StepperProps = {
  etapas: StepperEtapa[];
  /** Índice da etapa atual (começa em 0). */
  atual: number;
  /** Índices das etapas concluídas. Padrão: todas as anteriores à atual. */
  concluidas?: number[];
  /** Abre uma etapa concluída (voltar sem perder dados). Sem esta função, as etapas não são clicáveis. */
  onIrPara?: (indice: number) => void;
  /** Nome da navegação para leitores de tela (padrão: "Etapas"). */
  rotulo?: string;
  /** Textos da interface. */
  textos?: { etapa?: string; de?: string; concluida?: string; atualTexto?: string; pendente?: string; voltarPara?: string };
  className?: string;
};

const numero = (i: number) => String(i + 1).padStart(2, "0");

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
      <ol className="flex items-stretch gap-2 border-b border-border sm:gap-0">
        {etapas.map((e, i) => {
          const ehAtual = i === atual;
          const feita = feitas.has(i) && !ehAtual;
          const clicavel = Boolean(onIrPara) && feita;
          const estado = ehAtual ? tx.atualTexto : feita ? tx.concluida : tx.pendente;
          const conteudo = (
            <>
              <span
                aria-hidden
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.8125rem] font-extrabold tabular-nums transition-colors duration-200 sm:h-[38px] sm:w-[38px] sm:text-[0.9375rem]",
                  ehAtual && "bg-primary text-primary-foreground",
                  feita && "bg-foreground text-background",
                  !feita && !ehAtual && "bg-secondary text-[var(--graphite-600)]",
                )}
              >
                {numero(i)}
              </span>
              <span aria-hidden className={cn("hidden truncate text-[0.9375rem] font-bold leading-tight sm:inline lg:text-[1.0625rem]", ehAtual ? "text-foreground" : "text-muted-foreground")}>
                {e.titulo}
              </span>
              {/* Sublinhado da etapa atual. */}
              {ehAtual && <span aria-hidden className="absolute inset-x-0 -bottom-px h-[3px] rounded-full bg-primary" />}
              <span className="sr-only">{`${clicavel ? `${tx.voltarPara} ${tx.etapa.toLowerCase()}` : tx.etapa} ${i + 1} ${tx.de} ${total}, ${e.titulo} (${estado})`}</span>
            </>
          );
          const classe = "relative flex w-full min-w-0 items-center justify-center gap-2.5 px-1.5 pb-4 pt-1 sm:pb-[19px] sm:pt-[18px]";
          return (
            <li key={i} className="flex min-w-0 flex-1" aria-current={ehAtual ? "step" : undefined}>
              {clicavel ? (
                <button
                  type="button"
                  onClick={() => onIrPara!(i)}
                  className={cn(classe, "rounded-t-[10px] outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background")}
                >
                  {conteudo}
                </button>
              ) : (
                <span className={classe}>{conteudo}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
