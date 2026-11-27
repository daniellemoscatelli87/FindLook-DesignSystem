"use client";

import * as React from "react";
import { ChevronRight, Menu } from "lucide-react";
import { cn } from "./utils";
import { Button, buttonVariants } from "./button";
import { Logo } from "./logo";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerTitle } from "./drawer";

/**
 * Cabeçalho do site (páginas públicas): o padrão "Header e menus", modelo Faixa inteira, como componente.
 * Comportamento (o mesmo do produto desde 14/11/2026):
 * - transparenteNoTopo: transparente sobre a capa até a página rolar 8 px; depois, a faixa ganha o fundo do card a 85%
 *   com desfoque, a borda e a sombra --shadow-sm.
 * - iconeAoRolar: o logo completo vira o símbolo quando a página rola.
 * - someAoRolar: some ao descer (mais de 6 px de uma vez) e volta ao subir; volta também quando algo dentro dele recebe
 *   o foco do teclado.
 * - Computador: logo à esquerda, links no meio, ação secundária (pílula de contorno) e ação principal (pílula
 *   preenchida) à direita. Celular (abaixo de `telaLarga`): logo e o botão Menu (44 px), que abre o MenuDoCelular.
 * Estados dos links: hover cinza claro (--accent); página ou seção atual no rosa do selecionado (--primary-suave) com o
 * texto em --primary-text e aria-current.
 * Movimento: --duration-slow com --ease-snappy; com "menos movimento", troca sem transição.
 * `raiz`: contêiner com rolagem própria (demonstrações); sem ela, a janela. `comoLink`: o link do produto (Next.js).
 * Tema: as cores vêm dos tokens; na página do lojista (tema escuro) use `superficie="escura"` para o logo da versão
 * sobre grafite.
 */

export type LinkDoCabecalho = { rotulo: string; href: string; atual?: boolean };
export type AcaoDoCabecalho = { rotulo: string; href: string; icone?: React.ReactNode };

const ROLADO_APOS = 8;
const SENSIBILIDADE = 6;

const foco = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** Rolagem do cabeçalho: se a página já rolou e se ele deve estar escondido (desceu) ou à mostra (subiu). */
export function useRolagemDoCabecalho(raiz?: React.RefObject<HTMLElement | null>, altura = 64) {
  const [rolado, setRolado] = React.useState(false);
  const [escondido, setEscondido] = React.useState(false);
  const ultimo = React.useRef(0);
  React.useEffect(() => {
    const alvo: HTMLElement | Window = raiz?.current ?? window;
    const posicao = () => (alvo instanceof Window ? alvo.scrollY : alvo.scrollTop);
    const aoRolar = () => {
      const y = posicao();
      const delta = y - ultimo.current;
      if (y < altura) setEscondido(false);
      else if (delta > SENSIBILIDADE) setEscondido(true);
      else if (delta < -SENSIBILIDADE) setEscondido(false);
      if (Math.abs(delta) > SENSIBILIDADE || y < altura) ultimo.current = y;
      setRolado(y > ROLADO_APOS);
    };
    aoRolar();
    alvo.addEventListener("scroll", aoRolar, { passive: true });
    return () => alvo.removeEventListener("scroll", aoRolar);
  }, [raiz, altura]);
  return { rolado, escondido, mostrar: () => setEscondido(false) };
}

/* ── Menu do celular ── */

export type MenuDoCelularProps = {
  aberto: boolean;
  onAbertoChange: (aberto: boolean) => void;
  links: LinkDoCabecalho[];
  acaoSecundaria?: AcaoDoCabecalho;
  acaoPrincipal?: AcaoDoCabecalho;
  comoLink?: React.ElementType;
  /** Nome do menu para leitores de tela. */
  titulo?: string;
  /** Onde a folha é montada (padrão: body). Demonstrações dentro de uma moldura de celular. */
  container?: HTMLElement | null;
};

/**
 * Menu do celular em folha inferior (padrão do DS): os links um por linha, com 48 px de altura e a seta à direita, e
 * as duas ações lado a lado embaixo. Fecha com Esc, com o fundo, arrastando para baixo e ao escolher um link; o foco
 * volta para o botão Menu.
 */
export function MenuDoCelular({ aberto, onAbertoChange, links, acaoSecundaria, acaoPrincipal, comoLink, titulo = "Menu", container }: MenuDoCelularProps) {
  const Link = comoLink ?? "a";
  return (
    <Drawer open={aberto} onOpenChange={onAbertoChange}>
      <DrawerContent container={container} className="max-h-[85%] px-4 pb-[max(1rem,env(safe-area-inset-bottom))]" data-slot="menu-do-celular">
        <DrawerTitle className="sr-only">{titulo}</DrawerTitle>
        <DrawerDescription className="sr-only">Links do site e acesso à sua conta.</DrawerDescription>
        <nav aria-label="Principal" className="mt-3 overflow-y-auto">
          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {links.map((l) => (
              <li key={l.rotulo}>
                <DrawerClose asChild>
                  <Link
                    href={l.href}
                    aria-current={l.atual ? "page" : undefined}
                    className={cn(
                      "flex min-h-12 items-center justify-between gap-3 rounded-md px-4 text-body font-semibold text-foreground transition-colors hover:bg-accent",
                      "aria-[current=page]:bg-[var(--primary-suave)] aria-[current=page]:text-primary-text",
                      foco,
                    )}
                  >
                    {l.rotulo}
                    <ChevronRight aria-hidden className="size-4 shrink-0 text-muted-foreground" />
                  </Link>
                </DrawerClose>
              </li>
            ))}
          </ul>
        </nav>
        {(acaoSecundaria || acaoPrincipal) && (
          <div className={cn("mt-4 grid gap-2 border-t border-border pt-4", acaoSecundaria && acaoPrincipal && "grid-cols-2")}>
            {acaoSecundaria && (
              <DrawerClose asChild>
                <Link href={acaoSecundaria.href} className={cn(buttonVariants({ variant: "outline" }), "h-12 w-full rounded-full")}>
                  {acaoSecundaria.icone}
                  {acaoSecundaria.rotulo}
                </Link>
              </DrawerClose>
            )}
            {acaoPrincipal && (
              <DrawerClose asChild>
                <Link href={acaoPrincipal.href} className={cn(buttonVariants(), "h-12 w-full rounded-full")}>
                  {acaoPrincipal.icone}
                  {acaoPrincipal.rotulo}
                </Link>
              </DrawerClose>
            )}
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}

/* ── Cabeçalho ── */

export type CabecalhoDoSiteProps = {
  links: LinkDoCabecalho[];
  acaoSecundaria?: AcaoDoCabecalho;
  acaoPrincipal?: AcaoDoCabecalho;
  /** Destino do logo (padrão "/"). */
  logoHref?: string;
  comoLink?: React.ElementType;
  superficie?: "clara" | "escura";
  transparenteNoTopo?: boolean;
  iconeAoRolar?: boolean;
  someAoRolar?: boolean;
  /** A partir de qual largura os links aparecem na faixa: "lg" (1024 px, padrão) ou "xl" (1280 px, menus com mais itens). */
  telaLarga?: "lg" | "xl";
  /** "sticky" (padrão, ocupa o espaço no topo) ou "fixed" (por cima da capa: a capa começa embaixo dele). */
  posicao?: "sticky" | "fixed";
  raiz?: React.RefObject<HTMLElement | null>;
  /** Onde a folha do menu do celular é montada (demonstrações). */
  containerDoMenu?: HTMLElement | null;
  className?: string;
};

export function CabecalhoDoSite({
  links,
  acaoSecundaria,
  acaoPrincipal,
  logoHref = "/",
  comoLink,
  superficie = "clara",
  transparenteNoTopo = false,
  iconeAoRolar = true,
  someAoRolar = true,
  telaLarga = "lg",
  posicao = "sticky",
  raiz,
  containerDoMenu,
  className,
}: CabecalhoDoSiteProps) {
  const Link = comoLink ?? "a";
  const { rolado, escondido, mostrar } = useRolagemDoCabecalho(raiz);
  const [aberto, setAberto] = React.useState(false);
  const transparente = transparenteNoTopo && !rolado && !aberto;
  const some = someAoRolar && escondido && !aberto;
  const soIcone = iconeAoRolar && rolado;
  const naTela = telaLarga === "xl" ? "hidden xl:flex" : "hidden lg:flex";
  const noCelular = telaLarga === "xl" ? "xl:hidden" : "lg:hidden";

  return (
    <header
      data-slot="cabecalho-do-site"
      data-estado={transparente ? "transparente" : "solido"}
      data-escondido={some ? "sim" : "nao"}
      onFocusCapture={mostrar}
      className={cn(
        posicao === "fixed" ? "fixed inset-x-0" : "sticky",
        "top-0 z-30 border-b transition-[translate,background-color,box-shadow,border-color] duration-[var(--duration-slow)] ease-[var(--ease-snappy)] motion-reduce:transition-none",
        some ? "-translate-y-full" : "translate-y-0",
        transparente ? "border-transparent bg-transparent shadow-none" : "border-border bg-card/85 shadow-[var(--shadow-sm)] backdrop-blur-xl",
        className,
      )}
    >
      <div className={cn("mx-auto flex h-16 w-full max-w-[var(--content-wide)] items-center justify-between gap-3 px-4", telaLarga === "xl" ? "xl:h-18 xl:px-6" : "lg:h-18 lg:px-6")}>
        <Logo
          href={logoHref}
          comoLink={comoLink}
          variante={soIcone ? "simbolo" : "horizontal"}
          superficie={superficie}
          className={cn(soIcone ? "h-10 motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95" : cn("h-9", telaLarga === "xl" ? "xl:h-11" : "lg:h-11"))}
        />

        <nav aria-label="Principal" className={cn(naTela, "min-w-0 items-center gap-1")}>
          {links.map((l) => (
            <Link
              key={l.rotulo}
              href={l.href}
              aria-current={l.atual ? "page" : undefined}
              className={cn(
                "inline-flex h-10 items-center whitespace-nowrap rounded-full px-3 text-body-sm font-semibold text-foreground transition-colors hover:bg-accent",
                "aria-[current=page]:bg-[var(--primary-suave)] aria-[current=page]:text-primary-text",
                foco,
              )}
            >
              {l.rotulo}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {acaoSecundaria && (
            <Link href={acaoSecundaria.href} data-acao="secundaria" className={cn(buttonVariants({ variant: "outline" }), "rounded-full px-5", naTela)}>
              {acaoSecundaria.icone}
              {acaoSecundaria.rotulo}
            </Link>
          )}
          {acaoPrincipal && (
            <Link href={acaoPrincipal.href} data-acao="principal" className={cn(buttonVariants(), "rounded-full px-5", naTela)}>
              {acaoPrincipal.icone}
              {acaoPrincipal.rotulo}
            </Link>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-expanded={aberto}
            aria-label="Abrir menu"
            onClick={() => setAberto(true)}
            className={cn("-mr-1.5 size-11 rounded-full text-foreground [&_svg:not([class*='size-'])]:size-6", noCelular)}
          >
            <Menu aria-hidden />
          </Button>
        </div>
      </div>
      <MenuDoCelular
        aberto={aberto}
        onAbertoChange={setAberto}
        links={links}
        acaoSecundaria={acaoSecundaria}
        acaoPrincipal={acaoPrincipal}
        comoLink={comoLink}
        container={containerDoMenu}
      />
    </header>
  );
}
