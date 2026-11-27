import * as React from "react";
import { cn } from "./utils";
import { Logo } from "./logo";
import { LinkDeVoltar } from "./links";

/**
 * Moldura das telas de conta (Entrar, Criar conta, Recuperar acesso, Redefinir senha, Minha conta, Área
 * administrativa): o template Entrar e criar conta como componente. Fundo cinza da página, no topo o logo e "Voltar ao
 * início", e no meio um card só de borda (sem sombra sobre o cinza) com o título da tela (h1, 24 px), a explicação e
 * o conteúdo (formulário com Campo, Alert e Button). Embaixo do card, uma linha opcional ("Ainda não tem conta?").
 * `lateral`: a coluna da marca à esquerda do formulário (do 768 px em diante; no celular ela some e fica só o
 * formulário), por exemplo com ListaDeVantagens. `altura="conteudo"` para mostrar a moldura dentro de outra página
 * (demonstrações); o padrão ocupa a tela inteira. `comoLink`: o link do produto (Next.js).
 */
export type MolduraDeContaProps = {
  titulo: string;
  explicacao?: React.ReactNode;
  rodape?: React.ReactNode;
  lateral?: React.ReactNode;
  logoHref?: string;
  voltar?: { rotulo: string; href: string } | false;
  comoLink?: React.ElementType;
  altura?: "tela" | "conteudo";
  /** id do <main> (o destino do "Pular para o conteúdo"). */
  idDoConteudo?: string;
  className?: string;
  children: React.ReactNode;
};

export function MolduraDeConta({
  titulo,
  explicacao,
  rodape,
  lateral,
  logoHref = "/",
  voltar = { rotulo: "Voltar ao início", href: "/" },
  comoLink,
  altura = "tela",
  idDoConteudo = "conteudo",
  className,
  children,
}: MolduraDeContaProps) {
  const largura = lateral ? "max-w-4xl" : "max-w-md";
  return (
    <div data-slot="moldura-de-conta" className={cn("flex flex-col bg-muted", altura === "tela" ? "min-h-dvh" : "min-h-full", className)}>
      <header className={cn("mx-auto flex w-full items-center justify-between gap-4 px-4 py-4 sm:py-6", largura)}>
        <Logo href={logoHref} comoLink={comoLink} className="h-8" />
        {voltar && <LinkDeVoltar href={voltar.href} comoLink={comoLink} className="-mr-2 ml-0">{voltar.rotulo}</LinkDeVoltar>}
      </header>
      <main id={idDoConteudo} className={cn("mx-auto w-full flex-1 px-4 pb-12", largura)}>
        <div className={cn("overflow-hidden rounded-xl border border-border bg-card motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-[var(--duration-slow)]", lateral && "md:grid md:grid-cols-[0.9fr_1.1fr]")}>
          {lateral && <div className="hidden border-r border-border bg-[var(--brand-rose)] p-8 md:flex md:flex-col md:justify-center">{lateral}</div>}
          <div className="p-6 sm:p-8">
            <h1 className="m-0 text-h3 font-extrabold leading-tight tracking-[-0.02em] text-foreground [text-wrap:balance]">{titulo}</h1>
            {explicacao && <div className="mt-2 text-body text-muted-foreground">{explicacao}</div>}
            <div className="mt-6">{children}</div>
          </div>
        </div>
        {rodape && <div className="mt-6 text-center text-body-sm text-foreground">{rodape}</div>}
      </main>
    </div>
  );
}
