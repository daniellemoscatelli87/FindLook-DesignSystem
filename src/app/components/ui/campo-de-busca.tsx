"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "./utils";
import { Input } from "./input";

/**
 * Campo de busca das listas (lojas, peças, agenda): lupa à esquerda, o texto e, quando há texto, o botão Limpar à
 * direita (44 px no celular), que devolve o foco ao campo. Esc também limpa. O rótulo existe sempre: escondido por
 * padrão (a lupa e o texto de exemplo bastam para quem vê), visível com `rotuloVisivel`.
 * Mesma altura dos botões: 44 px no celular, 40 px do 640 px em diante. Para buscar o site inteiro, use a
 * BuscaDePecas; para os comandos do painel, o CampoDeBuscaGlobal.
 */
export type CampoDeBuscaProps = Omit<React.ComponentProps<typeof Input>, "type" | "value" | "onChange"> & {
  rotulo: string;
  rotuloVisivel?: boolean;
  valor: string;
  onValorChange: (v: string) => void;
  rotuloLimpar?: string;
  classeDoBloco?: string;
};

export function CampoDeBusca({ rotulo, rotuloVisivel = false, valor, onValorChange, rotuloLimpar = "Limpar busca", classeDoBloco, className, id: idProp, onKeyDown, ...props }: CampoDeBuscaProps) {
  const autoId = React.useId();
  const id = idProp ?? autoId;
  return (
    <div data-slot="campo-de-busca" className={cn("min-w-0", rotuloVisivel && "space-y-2", classeDoBloco)}>
      <label htmlFor={id} className={rotuloVisivel ? "block text-body-sm font-semibold text-foreground" : "sr-only"}>{rotulo}</label>
      <div className="relative">
        <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={id}
          type="search"
          value={valor}
          onChange={(e) => onValorChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape" && valor) { e.preventDefault(); onValorChange(""); }
            onKeyDown?.(e);
          }}
          autoComplete="off"
          className={cn("h-10 bg-card pl-9 toque:h-11 [&::-webkit-search-cancel-button]:hidden", valor && "pr-11", className)}
          {...props}
        />
        {valor && (
          <button
            type="button"
            onClick={() => { onValorChange(""); document.getElementById(id)?.focus(); }}
            aria-label={rotuloLimpar}
            className="absolute right-0 top-0 flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-75 toque:size-11"
          >
            <X aria-hidden className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
