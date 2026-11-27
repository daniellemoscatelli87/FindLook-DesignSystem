"use client";

import * as React from "react";
import { cn } from "./utils";

/**
 * Campo de valor em reais: o valor entra e sai em centavos (número inteiro) e aparece com "R$" e vírgula.
 * Aceita "12", "12,5", "12,50" e "1.200,00"; ao sair do campo, formata ("12,50"). Vazio vira null.
 * Rótulo, ajuda e erro ficam ligados ao campo (aria-describedby, aria-invalid).
 */
export function centavosParaTexto(c: number | null | undefined): string {
  if (c == null) return "";
  return (c / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function textoParaCentavos(t: string): number | null {
  const limpo = t.replace(/[^\d,.]/g, "");
  if (!limpo) return null;
  const [inteiro, decimal = ""] = limpo.replace(/\./g, "").split(",");
  const n = Number(`${inteiro || "0"}.${decimal.slice(0, 2).padEnd(2, "0")}`);
  return Number.isFinite(n) ? Math.round(n * 100) : null;
}

export function CampoDeValor({ rotulo, valor, onChange, ajuda, erro, opcional = false, disabled = false, placeholder = "0,00", className, id: idProp }: {
  rotulo: React.ReactNode;
  /** Em centavos. */
  valor: number | null;
  onChange: (centavos: number | null) => void;
  ajuda?: React.ReactNode;
  erro?: React.ReactNode;
  opcional?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  id?: string;
}) {
  const auto = React.useId().replace(/:/g, "");
  const id = idProp ?? `valor-${auto}`;
  const [texto, setTexto] = React.useState(() => centavosParaTexto(valor));
  const editando = React.useRef(false);
  React.useEffect(() => { if (!editando.current) setTexto(centavosParaTexto(valor)); }, [valor]);
  const descricao = erro ? `${id}-erro` : ajuda ? `${id}-ajuda` : undefined;

  return (
    <div data-slot="campo-de-valor" className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className="block text-sm font-semibold text-foreground">
        {rotulo} {opcional && <span className="font-normal text-muted-foreground">(opcional)</span>}
      </label>
      <div className="relative">
        <span aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[0.9375rem] font-medium text-muted-foreground">R$</span>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={texto}
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={erro ? true : undefined}
          aria-describedby={descricao}
          onFocus={() => { editando.current = true; }}
          onChange={(e) => {
            const t = e.target.value.replace(/[^\d,.]/g, "");
            setTexto(t);
            onChange(textoParaCentavos(t));
          }}
          onBlur={() => { editando.current = false; setTexto(centavosParaTexto(textoParaCentavos(texto))); }}
          className={cn(
            "h-11 w-full rounded-md border border-input bg-input-background pl-10 pr-3 text-[0.9375rem] tabular-nums text-foreground outline-none transition-[color,box-shadow] placeholder:text-muted-foreground",
            "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
          )}
        />
      </div>
      {erro ? (
        <p id={`${id}-erro`} className="m-0 text-sm font-medium text-[var(--error-text,var(--destructive))]">{erro}</p>
      ) : ajuda ? (
        <p id={`${id}-ajuda`} className="m-0 text-sm text-muted-foreground">{ajuda}</p>
      ) : null}
    </div>
  );
}
