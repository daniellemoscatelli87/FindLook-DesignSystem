import * as React from "react";
import { cn } from "./utils";

/**
 * Cabeçalho com ilustração: a abertura de uma página do painel que precisa acolher e explicar antes dos números
 * (reconhecimento, programa, conquista). Título grande, uma frase de apoio em destaque, uma descrição curta e, à direita,
 * uma ilustração sobre um degradê suave da marca. No celular, a ilustração fica menor, acima do texto.
 * As abas da página (opcional) ficam logo abaixo, como no CabecalhoDaPagina.
 */
export function CabecalhoComIlustracao({ titulo, subtitulo, descricao, ilustracao, abas, nivel = 1, className }: {
  titulo: React.ReactNode;
  /** Frase de apoio; use <strong> para destacar um trecho. */
  subtitulo?: React.ReactNode;
  descricao?: React.ReactNode;
  ilustracao?: React.ReactNode;
  abas?: React.ReactNode;
  nivel?: 1 | 2;
  className?: string;
}) {
  const Titulo = `h${nivel}` as "h1" | "h2";
  return (
    <div data-slot="cabecalho-com-ilustracao" className={cn("@container space-y-4", className)}>
      <header className="relative isolate overflow-hidden rounded-xl px-1 py-2 @3xl:py-3">
        {/* Degradê suave da marca, à direita, atrás da ilustração */}
        <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full bg-[radial-gradient(ellipse_at_85%_45%,var(--primary-muted)_0%,transparent_62%)] @3xl:w-3/5" />
        <div className="flex flex-col-reverse gap-4 @3xl:flex-row @3xl:items-center @3xl:justify-between @3xl:gap-8">
          <div className="min-w-0 max-w-2xl">
            <Titulo className="font-[family-name:var(--font-display)] text-[1.875rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground @xl:text-[2.5rem]">{titulo}</Titulo>
            {subtitulo && <p className="m-0 mt-2 text-[1.0625rem] leading-snug text-foreground @xl:text-[1.25rem] [&_strong]:font-bold">{subtitulo}</p>}
            {descricao && <p className="m-0 mt-2 max-w-[60ch] text-[0.9375rem] leading-relaxed text-muted-foreground">{descricao}</p>}
          </div>
          {ilustracao && <div className="flex shrink-0 justify-end @3xl:justify-center">{ilustracao}</div>}
        </div>
      </header>
      {abas}
    </div>
  );
}
