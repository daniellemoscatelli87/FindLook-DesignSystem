"use client";

import * as React from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { cn } from "./utils";
import { Input } from "./input";
import { Label } from "./label";

/**
 * Campo: o campo padrão de formulário do DS (decisão de 27/11/2026: um campo só). Rótulo visível em cima, o campo,
 * a ajuda embaixo e, com erro, a mensagem de erro no lugar da ajuda (ícone + texto, nunca só a cor). Tudo ligado por
 * aria-describedby; com erro, aria-invalid. O CampoDoCadastro (cadastro-lojista) é este mesmo componente.
 * - opcional: "(opcional)" ao lado do rótulo. Marque o que é opcional, não o obrigatório.
 * - icone: ícone de 16 px à esquerda, dentro do campo.
 * - type="password": botão de mostrar e ocultar a senha (44 px no celular), com o nome lido trocando junto.
 * - acaoDoRotulo: um link curto à direita do rótulo ("Esqueci minha senha").
 * - depois: conteúdo logo abaixo do campo, antes da ajuda (por exemplo, uma caixa "Não tenho CNPJ").
 * - inteiro: dentro da GradeDeCampos, ocupa a linha inteira.
 * Altura: 44 px no celular e 40 px do 640 px em diante, como os botões. Fundo do card (branco).
 */
export type CampoProps = React.ComponentProps<typeof Input> & {
  rotulo: string;
  ajuda?: React.ReactNode;
  erro?: string | null;
  opcional?: boolean;
  icone?: React.ReactNode;
  acaoDoRotulo?: React.ReactNode;
  depois?: React.ReactNode;
  inteiro?: boolean;
  classeDoBloco?: string;
  /** Textos do botão da senha. */
  textosDaSenha?: { mostrar: string; ocultar: string };
};

/** Texto de erro de um campo ou grupo: ícone + texto na cor de texto do erro (nunca só a cor). */
export function MensagemDeErro({ id, children, className }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <p id={id} data-slot="mensagem-de-erro" className={cn("flex items-start gap-1.5 text-body-sm font-medium text-error-text", className)}>
      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden /> <span className="min-w-0">{children}</span>
    </p>
  );
}

export function Campo({
  rotulo,
  ajuda,
  erro,
  opcional,
  icone,
  acaoDoRotulo,
  depois,
  inteiro,
  classeDoBloco,
  textosDaSenha = { mostrar: "Mostrar senha", ocultar: "Ocultar senha" },
  type,
  className,
  id: idProp,
  ...props
}: CampoProps) {
  const autoId = React.useId();
  const id = idProp ?? autoId;
  const [visivel, setVisivel] = React.useState(false);
  const senha = type === "password";
  const mostrarAjuda = Boolean(ajuda) && !erro;
  const descritores = [mostrarAjuda ? `${id}-ajuda` : null, erro ? `${id}-erro` : null, props["aria-describedby"]].filter(Boolean).join(" ") || undefined;
  return (
    <div data-slot="campo" className={cn("min-w-0 space-y-2", inteiro && "col-span-full", classeDoBloco)}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <Label htmlFor={id} className="inline text-body-sm font-semibold leading-snug">
          {rotulo}
          {opcional && <span className="ml-1 font-normal text-muted-foreground">(opcional)</span>}
        </Label>
        {acaoDoRotulo && <span className="text-body-sm">{acaoDoRotulo}</span>}
      </div>
      <div className="relative">
        {icone && <span aria-hidden className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 text-muted-foreground [&>svg]:size-4">{icone}</span>}
        <Input
          id={id}
          type={senha && visivel ? "text" : type}
          aria-invalid={erro ? true : undefined}
          {...props}
          aria-describedby={descritores}
          className={cn("h-10 bg-card toque:h-11", icone && "pl-10", senha && "pr-12", className)}
        />
        {senha && (
          <button
            type="button"
            onClick={() => setVisivel((v) => !v)}
            aria-pressed={visivel}
            aria-label={visivel ? textosDaSenha.ocultar : textosDaSenha.mostrar}
            aria-controls={id}
            className="absolute right-0 top-0 flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring toque:size-11"
          >
            {visivel ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
          </button>
        )}
      </div>
      {depois}
      {mostrarAjuda && <p id={`${id}-ajuda`} className="m-0 text-body-sm text-muted-foreground">{ajuda}</p>}
      {erro && <MensagemDeErro id={`${id}-erro`}>{erro}</MensagemDeErro>}
    </div>
  );
}
