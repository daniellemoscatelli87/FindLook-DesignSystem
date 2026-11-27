import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "./utils";
import { buttonVariants } from "./button";
import { Card, CardFooter, CardHeader } from "./card";
import { Logo } from "./logo";
import { IconeComBase } from "./painel-dados";

/**
 * Rodapé do site (páginas públicas), do protótipo do produto (v8.87) com as regras do DS. Partes, todas opcionais
 * menos a marca:
 * - marca: logo, slogan (20 px, negrito), texto curto e um complemento (por exemplo, o Instagram).
 * - colunas: grupos de links, cada um com título (um <nav> com o nome do grupo). No celular, duas colunas lado a lado.
 * - convite: card só de borda com selo, título, texto e a ação (divisor e botão no canto inferior direito).
 * - faixa: linha de destaque com ícone na base rosa (por exemplo, "Suas escolhas, seus dados."), texto e um link;
 *   no celular o link desce para a coluna do texto.
 * - linhaFinal: duas frases curtas (direitos, cidade e site).
 * - creditos: links pequenos (Privacidade, Termos de uso, Área administrativa) e a autoria.
 * Fundo do card (branco no tema claro), borda em cima. Links em --muted-foreground, hover em --foreground sublinhado.
 * `comoLink`: o link do produto (Next.js). Links sem href viram texto (por exemplo, "www.findlook.com.br").
 */

export type LinkDoRodape = { rotulo: string; href?: string };
export type ColunaDoRodape = { titulo: string; links: LinkDoRodape[] };

export type RodapeDoSiteProps = {
  marca: { slogan?: string; texto?: string; complemento?: React.ReactNode };
  superficie?: "clara" | "escura";
  inicioHref?: string;
  colunas?: ColunaDoRodape[];
  convite?: { selo?: string; titulo: string; texto?: string; acao: LinkDoRodape & { href: string } };
  faixa?: { icone: React.ReactNode; titulo: string; texto?: string; link?: LinkDoRodape & { href: string } };
  linhaFinal?: React.ReactNode[];
  creditos?: { links?: LinkDoRodape[]; autoria?: string };
  comoLink?: React.ElementType;
  className?: string;
};

const foco = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const classeDoLink = cn("rounded-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline", foco);

function LinkOuTexto({ link, comoLink, className }: { link: LinkDoRodape; comoLink?: React.ElementType; className?: string }) {
  if (!link.href) return <span className={cn("text-muted-foreground", className)}>{link.rotulo}</span>;
  const externo = /^https?:/.test(link.href);
  const Comp = externo ? "a" : comoLink ?? "a";
  return (
    <Comp href={link.href} className={cn(classeDoLink, className)} {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {link.rotulo}
      {externo && <span className="sr-only"> (abre em nova aba)</span>}
    </Comp>
  );
}

export function RodapeDoSite({ marca, superficie = "clara", inicioHref = "/", colunas = [], convite, faixa, linhaFinal, creditos, comoLink, className }: RodapeDoSiteProps) {
  const Link = comoLink ?? "a";
  const grade = convite ? "lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.2fr]" : colunas.length >= 2 ? "lg:grid-cols-[1.6fr_1fr_1fr]" : "lg:grid-cols-[1.6fr_1fr]";
  return (
    <footer data-slot="rodape-do-site" className={cn("border-t border-border bg-card", className)}>
      <div className="mx-auto w-full max-w-[var(--content-default)] px-4 pb-6 pt-14 sm:px-6">
        <div className={cn("grid gap-10", grade)}>
          <div className="min-w-0">
            <Logo href={inicioHref} comoLink={comoLink} superficie={superficie} className="h-10" />
            {marca.slogan && <p className="m-0 mt-6 text-h4 font-bold leading-tight tracking-[-0.015em] text-foreground">{marca.slogan}</p>}
            {marca.texto && <p className="m-0 mt-3 max-w-xs text-body-sm leading-relaxed text-muted-foreground">{marca.texto}</p>}
            {marca.complemento && <div className="mt-5 text-body-sm font-semibold text-primary-text [&_svg]:size-4">{marca.complemento}</div>}
          </div>

          {colunas.length > 0 && (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:contents">
              {colunas.map((c) => (
                <nav key={c.titulo} aria-label={c.titulo} className="min-w-0">
                  <p className="m-0 text-body-sm font-bold text-foreground">{c.titulo}</p>
                  <ul className="m-0 mt-4 flex list-none flex-col gap-3 p-0 text-body-sm">
                    {c.links.map((l) => (
                      <li key={l.rotulo} className="[overflow-wrap:anywhere]"><LinkOuTexto link={l} comoLink={comoLink} /></li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          )}

          {convite && (
            <Card className="gap-4 self-start">
              <CardHeader className="gap-2">
                {convite.selo && <p className="m-0 text-label font-bold uppercase tracking-[0.08em] text-primary-text">{convite.selo}</p>}
                <p className="m-0 text-h4 font-bold leading-snug tracking-[-0.015em] text-foreground">{convite.titulo}</p>
                {convite.texto && <p className="m-0 text-body-sm leading-relaxed text-muted-foreground">{convite.texto}</p>}
              </CardHeader>
              <CardFooter className="justify-end border-t pt-4 [.border-t]:pt-4">
                <Link href={convite.acao.href} className={cn(buttonVariants({ variant: "outline" }), "h-auto min-h-10 min-w-0 max-w-full shrink whitespace-normal py-2 text-left toque:min-h-11")}>
                  {convite.acao.rotulo} <ArrowUpRight aria-hidden />
                </Link>
              </CardFooter>
            </Card>
          )}
        </div>

        {faixa && (
          <div className="mt-12 grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 gap-y-3 border-t border-border py-6 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center">
            <IconeComBase tom="marca" tamanho="lg">{faixa.icone}</IconeComBase>
            <div className="min-w-0">
              <p className="m-0 text-body-sm font-bold text-foreground">{faixa.titulo}</p>
              {faixa.texto && <p className="m-0 mt-1 text-body-sm text-muted-foreground">{faixa.texto}</p>}
            </div>
            {faixa.link && (
              <Link href={faixa.link.href} className={cn("col-start-2 inline-flex min-h-10 w-fit items-center gap-1 rounded-sm text-body-sm font-semibold text-primary-text underline-offset-4 hover:underline sm:col-start-3 toque:min-h-11", foco)}>
                {faixa.link.rotulo} <ArrowUpRight aria-hidden className="size-4" />
              </Link>
            )}
          </div>
        )}

        {linhaFinal && linhaFinal.length > 0 && (
          <div className={cn("flex flex-col gap-1 border-t border-border pt-5 text-label text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-4", !faixa && "mt-12")}>
            {linhaFinal.map((t, i) => <p key={i} className="m-0">{t}</p>)}
          </div>
        )}

        {creditos && (
          <div className={cn("flex flex-col gap-2 pt-4 text-label text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-4", !linhaFinal?.length && !faixa && "mt-12 border-t border-border pt-5")}>
            {creditos.links && creditos.links.length > 0 && (
              <p className="m-0 leading-loose">
                {creditos.links.map((l, i) => (
                  <React.Fragment key={l.rotulo}>
                    {i > 0 && <span aria-hidden className="mx-2">·</span>}
                    <LinkOuTexto link={l} comoLink={comoLink} />
                  </React.Fragment>
                ))}
              </p>
            )}
            {creditos.autoria && <p className="m-0">{creditos.autoria}</p>}
          </div>
        )}
      </div>
    </footer>
  );
}
