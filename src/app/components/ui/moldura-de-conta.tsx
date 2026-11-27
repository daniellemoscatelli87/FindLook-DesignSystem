import * as React from "react";
import { cn } from "./utils";
import { Logo } from "./logo";
import { Selo } from "./selo";

/**
 * MolduraDeConta (telas de conta): mesma API da MolduraDeConta do design system Dani Moscatelli.
 * A moldura de Entrar, Criar conta, Recuperar acesso, Redefinir senha, Minha conta e Área administrativa: página
 * inteira no cinza da página (--muted), com um card só de borda (sem sombra sobre o cinza) centralizado: logo (link
 * para o início), selo opcional ("Área administrativa"), título (h1, 24 px), uma frase de apoio, o formulário
 * (children: Campo, Alert, Button) e um rodapé opcional, separado por um divisor ("Ainda não tem conta? Cadastre-se").
 * Alinhamento: logo, selo, título, texto, formulário e rodapé na mesma borda esquerda; no celular o card ocupa a
 * largura toda com 16 px de margem.
 * A mais no FindLook: `lateral` (a coluna da marca à esquerda do formulário, do 768 px em diante; no celular ela
 * some) e `comoLink` (o Link do Next.js no logo). O template Entrar e criar conta usa esta moldura.
 */
export type MolduraDeContaProps = Omit<React.ComponentProps<"main">, "title"> & {
  titulo: React.ReactNode;
  descricao?: React.ReactNode;
  /** Selo acima do título, por exemplo "Área administrativa". */
  selo?: React.ReactNode;
  /** Logo próprio (padrão: o Logo horizontal do DS). */
  logo?: React.ReactNode;
  inicioHref?: string;
  rotuloInicio?: string;
  /** Links depois do formulário. */
  rodape?: React.ReactNode;
  /** Ocupa a altura da tela (padrão) ou só o conteúdo (demonstrações). */
  telaCheia?: boolean;
  /** FindLook: coluna da marca ao lado do formulário (768 px ou mais). */
  lateral?: React.ReactNode;
  /** FindLook: o link do produto no logo. */
  comoLink?: React.ElementType;
};

function MolduraDeConta({
  titulo,
  descricao,
  selo,
  logo,
  inicioHref = "/",
  rotuloInicio = "FindLook, página inicial",
  rodape,
  telaCheia = true,
  lateral,
  comoLink,
  children,
  className,
  ...props
}: MolduraDeContaProps) {
  const Link = comoLink ?? "a";
  return (
    <main
      data-slot="moldura-de-conta"
      className={cn("flex w-full items-center justify-center bg-muted px-4 py-12", telaCheia && "min-h-svh", className)}
      {...props}
    >
      <div className={cn(
        "w-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-[var(--duration-slow)]",
        lateral ? "max-w-4xl md:grid md:grid-cols-[0.9fr_1.1fr]" : "max-w-md",
      )}>
        {lateral && <div className="hidden border-r border-border bg-[var(--brand-rose)] p-8 md:flex md:flex-col md:justify-center">{lateral}</div>}
        <div className="p-6 sm:p-8">
          <Link
            href={inicioHref}
            aria-label={rotuloInicio}
            className="mb-8 inline-flex min-h-11 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {logo ?? <Logo variante="horizontal" superficie="auto" className="h-9" />}
          </Link>
          {selo && <div className="mb-3">{typeof selo === "string" ? <Selo size="sm">{selo}</Selo> : selo}</div>}
          <h1 className="m-0 text-h3 font-extrabold leading-tight tracking-[-0.02em] text-foreground text-balance">{titulo}</h1>
          {descricao && <p className="m-0 mt-2 text-pretty text-body-sm leading-relaxed text-muted-foreground sm:text-body">{descricao}</p>}
          <div className="mt-6">{children}</div>
          {rodape && (
            <div data-slot="moldura-de-conta-rodape" className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-4 text-body-sm">
              {rodape}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export { MolduraDeConta };
