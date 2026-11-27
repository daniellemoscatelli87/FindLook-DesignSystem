import * as React from "react";
import { cn } from "./utils";

/**
 * Estado vazio: o que aparece quando uma lista, uma busca ou uma área ainda não tem nada. Diz o que está vazio, por quê
 * (quando ajuda) e o próximo passo. Centralizado, com uma das três mídias:
 * - ilustracao: imagem do mascote (Mascote & Ilustrações › Estados vazios), 160 px; o texto alternativo fica vazio,
 *   porque o título já diz tudo;
 * - icone: ícone lucide numa base de 56 px (cinza, ou rosa com tom="marca" quando o vazio convida a criar algo);
 * - nada: só o texto (dentro de colunas de quadro e listas pequenas).
 * Variantes: "tracejado" (borda tracejada, para o lugar de uma lista dentro de um card), "card" (card só de borda,
 * sozinho na página) e "simples" (sem borda, dentro de um card que já tem borda).
 * Tamanhos: "md" (padrão) e "sm" (colunas estreitas, 14 px).
 * Ação: um botão (contorno, ou o principal se for a única ação da área) e, se precisar, um link; lado a lado,
 * centralizados, quebrando só se não couberem. Entrada suave (parada com "menos movimento").
 * Texto: título curto no que a pessoa vê ("Nenhuma loja com esses filtros"), sem "Ops" nem culpa; o texto diz o
 * que fazer. Nunca invente números ou motivos.
 */
export type EstadoVazioProps = {
  titulo: string;
  texto?: React.ReactNode;
  ilustracao?: string;
  icone?: React.ReactNode;
  tom?: "neutro" | "marca";
  acao?: React.ReactNode;
  variante?: "tracejado" | "card" | "simples";
  tamanho?: "sm" | "md";
  /** Nível do título (padrão: um parágrafo em negrito; use 2 ou 3 quando o vazio for o conteúdo principal da página). */
  nivel?: 2 | 3 | 4;
  className?: string;
};

export function EstadoVazio({ titulo, texto, ilustracao, icone, tom = "neutro", acao, variante = "tracejado", tamanho = "md", nivel, className }: EstadoVazioProps) {
  const Titulo = (nivel ? `h${nivel}` : "p") as React.ElementType;
  const sm = tamanho === "sm";
  return (
    <div
      data-slot="estado-vazio"
      data-variante={variante}
      className={cn(
        "flex flex-col items-center text-center motion-safe:animate-in motion-safe:fade-in motion-safe:duration-[var(--duration-slow)]",
        sm ? "gap-2 px-4 py-6" : "gap-4 px-6 py-10",
        variante === "tracejado" && "rounded-lg border border-dashed border-[var(--border-strong)]",
        variante === "card" && "rounded-xl border border-border bg-card",
        className,
      )}
    >
      {ilustracao ? (
        <img src={ilustracao} alt="" className={cn("h-auto object-contain", sm ? "w-24" : "w-40")} />
      ) : icone ? (
        <span aria-hidden className={cn("flex items-center justify-center rounded-lg", sm ? "size-10 [&>svg]:size-5" : "size-14 [&>svg]:size-6", tom === "marca" ? "bg-[var(--primary-muted)] text-primary-text" : "bg-muted text-muted-foreground")}>
          {icone}
        </span>
      ) : null}
      <div className="max-w-sm">
        <Titulo className={cn("m-0 font-bold text-foreground [text-wrap:balance]", sm ? "text-body-sm" : "text-body")}>{titulo}</Titulo>
        {texto && <p className={cn("m-0 mt-1 text-muted-foreground [text-wrap:pretty]", sm ? "text-label" : "text-body-sm")}>{texto}</p>}
      </div>
      {acao && <div className={cn("flex flex-wrap items-center justify-center gap-2", sm ? "mt-1" : "mt-1")}>{acao}</div>}
    </div>
  );
}
