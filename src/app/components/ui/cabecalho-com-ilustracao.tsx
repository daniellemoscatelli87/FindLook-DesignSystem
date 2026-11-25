import * as React from "react";
import { cn } from "./utils";

/**
 * Cabeçalho com ilustração: a abertura de uma página do painel que precisa acolher e explicar antes dos números
 * (reconhecimento, programa, conquista). Título grande, uma frase de apoio em destaque, uma descrição curta e, à direita,
 * uma ilustração sobre um degradê suave da marca. No celular, a ilustração fica menor, acima do texto.
 * As abas da página (opcional) ficam logo abaixo, como no CabecalhoDaPagina.
 * fundo "pagina": o degradê rosa se espalha pela largura toda da área de conteúdo e desce por trás dos primeiros cards,
 * como uma abertura de página. Precisa de um contêiner com `isolate` (contexto de empilhamento) e `overflow-x: hidden`
 * na área de rolagem, para o degradê ficar atrás dos cards e não criar rolagem lateral.
 */
export function CabecalhoComIlustracao({ titulo, subtitulo, descricao, ilustracao, abas, nivel = 1, fundo = "suave", className }: {
  titulo: React.ReactNode;
  /** Frase de apoio; use <strong> para destacar um trecho. */
  subtitulo?: React.ReactNode;
  descricao?: React.ReactNode;
  ilustracao?: React.ReactNode;
  abas?: React.ReactNode;
  nivel?: 1 | 2;
  fundo?: "suave" | "pagina";
  className?: string;
}) {
  const Titulo = `h${nivel}` as "h1" | "h2";
  return (
    <div data-slot="cabecalho-com-ilustracao" data-fundo={fundo} className={cn("@container relative space-y-4", className)}>
      {fundo === "pagina" && (
        <span
          aria-hidden
          data-slot="degrade-da-pagina"
          className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-[calc(100%+14rem)] w-[100vw] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(42% 70% at 78% 28%, var(--pink-100) 0%, color-mix(in srgb, var(--pink-100) 45%, transparent) 45%, transparent 75%), linear-gradient(180deg, color-mix(in srgb, var(--pink-50) 92%, transparent) 0%, color-mix(in srgb, var(--pink-50) 55%, transparent) 55%, transparent 100%)",
          }}
        />
      )}
      <header className={cn("relative rounded-xl px-1 py-2 @3xl:py-3", fundo === "suave" && "isolate overflow-hidden")}>
        {/* Degradê suave da marca, à direita, atrás da ilustração */}
        {fundo === "suave" && <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full bg-[radial-gradient(ellipse_at_82%_40%,var(--pink-100)_0%,var(--primary-muted)_32%,transparent_68%)] @3xl:w-3/4" />}
        <div className="flex flex-col-reverse gap-4 @3xl:flex-row @3xl:items-center @3xl:justify-between @3xl:gap-8">
          <div className="min-w-0 max-w-2xl">
            <Titulo className="font-[family-name:var(--font-display)] text-[2rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground @xl:text-[2.75rem]">{titulo}</Titulo>
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
