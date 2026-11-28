"use client";

import * as React from "react";
import { ChevronRight, Menu } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";
import { Logo } from "./logo";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerTitle } from "./drawer";

/**
 * CabecalhoDoSite (cabeçalho das páginas públicas + menu do celular): mesma API do CabecalhoDoSite do design system
 * Dani Moscatelli, no modelo Faixa inteira do padrão "Header e menus" (o modelo escolhido pela dona do produto para o
 * FindLook; a pílula flutuante do DS Dani Moscatelli não é usada aqui).
 * Comportamento (o mesmo do produto desde 14/11/2026):
 * - transparenteNoTopo (FindLook): transparente sobre a capa até a página rolar 8 px; depois, fundo do card a 85% com
 *   desfoque, borda e --shadow-sm.
 * - iconeAoRolar (FindLook): o logo completo vira o símbolo quando a página rola.
 * - esconderAoRolar: some ao descer (mais de 6 px) e volta ao subir ou quando algo dentro dele recebe o foco.
 * - Computador: logo, links (`itens`; o `atual` no rosa do selecionado, com aria-current; hover cinza), a ação
 *   secundária (FindLook: pílula de contorno) e a `acao` principal (pílula preenchida). Celular (abaixo de `telaLarga`,
 *   ou `tela="celular"`): logo e o botão Menu (44 px), que abre o MenuDoCelular em folha inferior.
 * - superficie "escura": logo da versão sobre grafite (página do lojista, tema escuro).
 * Props em comum com o DS Dani Moscatelli (27/11/2026; lá, com o modelo pílula ou faixa): acaoSecundaria, transparenteNoTopo, iconeAoRolar, telaLarga ("lg" 1024 px ou "xl"
 * 1280 px), comoLink (o Link do Next.js) e containerDoMenu (demonstrações).
 * Movimento: --duration-slow com --ease-snappy; com "menos movimento", troca sem transição.
 */

export type ItemDoCabecalho = { id: string; rotulo: string; href: string };
export type AcaoDoCabecalho = { rotulo: string; href?: string; onClick?: () => void; icone?: React.ReactNode };

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

/**
 * Uma ação como link (href) ou botão (onClick), desenhada pelo Button do DS em pílula (forma="pilula", 28/11/2026;
 * antes as pílulas tinham classes próprias). `variant`: "default" (cheia) ou "outline" (contorno).
 */
function Acao({ acao, variant = "default", className, comoLink, envolver }: { acao: AcaoDoCabecalho; variant?: "default" | "outline"; className?: string; comoLink?: React.ElementType; envolver?: (el: React.ReactElement) => React.ReactElement }) {
  const Link = comoLink ?? "a";
  const el = acao.href
    ? <Button asChild variant={variant} forma="pilula" quebra="nunca" className={className}><Link href={acao.href} onClick={acao.onClick}>{acao.icone}{acao.rotulo}</Link></Button>
    : <Button type="button" variant={variant} forma="pilula" quebra="nunca" onClick={acao.onClick} className={className}>{acao.icone}{acao.rotulo}</Button>;
  return envolver ? envolver(el) : el;
}

/* ── Menu do celular ── */

export type MenuDoCelularProps = {
  aberto: boolean;
  onAbertoChange: (aberto: boolean) => void;
  itens: ItemDoCabecalho[];
  atual?: string;
  acao?: AcaoDoCabecalho;
  acaoSecundaria?: AcaoDoCabecalho;
  comoLink?: React.ElementType;
  textos?: { principal?: string; menu?: string };
  /** Onde a folha é montada (padrão: body). Demonstrações dentro de uma moldura. */
  container?: HTMLElement | null;
  /** O botão que abriu o menu: o foco volta para ele ao fechar (28/11/2026). */
  retornarFocoPara?: React.RefObject<HTMLElement | null>;
};

/**
 * Menu do celular em folha inferior: os itens um por linha (48 px, seta à direita; o atual no rosa do selecionado)
 * e as ações lado a lado embaixo. Fecha com Esc, com o fundo, arrastando para baixo e ao escolher um item.
 * Foco (28/11/2026): ao abrir, vai para o item da página atual (ou o primeiro item) e fica preso na folha enquanto ela
 * está aberta; ao fechar, volta ao botão Menu (`retornarFocoPara`). Antes ficava no botão Menu, atrás da folha.
 */
export function MenuDoCelular({ aberto, onAbertoChange, itens, atual, acao, acaoSecundaria, comoLink, textos, container, retornarFocoPara }: MenuDoCelularProps) {
  const Link = comoLink ?? "a";
  const fechar = (el: React.ReactElement) => <DrawerClose asChild>{el}</DrawerClose>;
  return (
    <Drawer open={aberto} onOpenChange={onAbertoChange} autoFocus>
      <DrawerContent
        container={container}
        className="max-h-[85%] px-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
        data-slot="menu-do-celular"
        onOpenAutoFocus={(e) => {
          // O evento nasce na própria folha (FocusScope do Radix).
          const folha = e.target as HTMLElement | null;
          const alvo = folha?.querySelector<HTMLElement>('nav [aria-current="page"]') ?? folha?.querySelector<HTMLElement>("nav a, nav button");
          if (alvo) { e.preventDefault(); alvo.focus(); }
        }}
        onCloseAutoFocus={(e) => {
          if (!retornarFocoPara?.current) return;
          e.preventDefault();
          retornarFocoPara.current.focus();
        }}
      >
        <DrawerTitle className="sr-only">{textos?.menu ?? "Menu"}</DrawerTitle>
        <DrawerDescription className="sr-only">Links do site e acesso à sua conta.</DrawerDescription>
        <nav aria-label={textos?.principal ?? "Principal"} className="mt-3 overflow-y-auto">
          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {itens.map((l) => (
              <li key={l.id}>
                <DrawerClose asChild>
                  <Link
                    href={l.href}
                    aria-current={l.id === atual ? "page" : undefined}
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
        {(acaoSecundaria || acao) && (
          <div className={cn("mt-4 grid gap-2 border-t border-border pt-4", acaoSecundaria && acao && "grid-cols-2")}>
            {acaoSecundaria && <Acao acao={acaoSecundaria} variant="outline" comoLink={comoLink} envolver={fechar} className="h-12 w-full" />}
            {acao && <Acao acao={acao} comoLink={comoLink} envolver={fechar} className="h-12 w-full" />}
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}

/* ── Cabeçalho ── */

export type CabecalhoDoSiteProps = {
  itens: ItemDoCabecalho[];
  /** id do item da página (ou seção) atual. */
  atual?: string;
  /** A ação principal (pílula preenchida: "Entrar"). */
  acao?: AcaoDoCabecalho;
  /** O que fica atrás do cabeçalho: "clara" (padrão) ou "escura" (tema escuro da página do lojista). */
  superficie?: "clara" | "escura";
  esconderAoRolar?: boolean;
  inicioHref?: string;
  rotuloInicio?: string;
  /** Logo próprio (padrão: o Logo do DS). */
  logo?: { completo: React.ReactNode; simbolo: React.ReactNode };
  /** Elemento com rolagem própria (demonstrações). Padrão: a janela. */
  raiz?: React.RefObject<HTMLElement | null>;
  posicao?: "sticky" | "fixed" | "absolute";
  /** Força a largura de celular ou de computador (demonstrações). Padrão: pela tela. */
  tela?: "auto" | "celular" | "computador";
  textos?: { principal?: string; menu?: string; abrirMenu?: string; fecharMenu?: string };
  className?: string;
  /** FindLook: a ação secundária (pílula de contorno: "Sou Lojista"). */
  acaoSecundaria?: AcaoDoCabecalho;
  /** FindLook: transparente sobre a capa até rolar. */
  transparenteNoTopo?: boolean;
  /** FindLook: o logo vira o símbolo ao rolar (padrão: sim). */
  iconeAoRolar?: boolean;
  /** A partir de qual largura os itens aparecem na faixa ("md", "lg", padrão, ou "xl"). */
  telaLarga?: "md" | "lg" | "xl";
  /**
   * Modelo do cabeçalho no computador. Prop em comum com o DS Dani Moscatelli (27/11/2026), que tem a pílula e a faixa;
   * o FindLook tem só a faixa (o modelo da marca), então qualquer valor mostra a faixa.
   */
  modelo?: "faixa" | "pilula";
  /** FindLook: o link do produto (Next.js) no lugar do <a>. */
  comoLink?: React.ElementType;
  /** FindLook: onde a folha do menu é montada (demonstrações). */
  containerDoMenu?: HTMLElement | null;
};

export function CabecalhoDoSite({
  itens,
  atual,
  acao,
  superficie = "clara",
  esconderAoRolar = true,
  inicioHref = "/",
  rotuloInicio = "FindLook, página inicial",
  logo,
  raiz,
  posicao = "sticky",
  tela = "auto",
  textos,
  className,
  acaoSecundaria,
  transparenteNoTopo = false,
  iconeAoRolar = true,
  telaLarga = "lg",
  comoLink,
  containerDoMenu,
}: CabecalhoDoSiteProps) {
  const Link = comoLink ?? "a";
  const { rolado, escondido, mostrar } = useRolagemDoCabecalho(raiz);
  const [aberto, setAberto] = React.useState(false);
  const transparente = transparenteNoTopo && !rolado && !aberto;
  const some = esconderAoRolar && escondido && !aberto;
  const soIcone = iconeAoRolar && rolado;
  const naTela = tela === "computador" ? "flex" : tela === "celular" ? "hidden" : telaLarga === "xl" ? "hidden xl:flex" : telaLarga === "md" ? "hidden md:flex" : "hidden lg:flex";
  const noCelular = tela === "computador" ? "hidden" : tela === "celular" ? "flex" : telaLarga === "xl" ? "flex xl:hidden" : telaLarga === "md" ? "flex md:hidden" : "flex lg:hidden";
  const alto = tela === "computador" ? "h-18 px-6" : tela === "celular" ? "" : telaLarga === "xl" ? "xl:h-18 xl:px-6" : telaLarga === "md" ? "md:h-18 md:px-6" : "lg:h-18 lg:px-6";
  const botaoDoMenu = React.useRef<HTMLButtonElement>(null);

  return (
    <header
      data-slot="cabecalho-do-site"
      data-estado={transparente ? "transparente" : "solido"}
      data-escondido={some ? "sim" : "nao"}
      onFocusCapture={mostrar}
      className={cn(
        posicao === "sticky" ? "sticky" : posicao === "fixed" ? "fixed inset-x-0" : "absolute inset-x-0",
        "top-0 z-30 border-b transition-[translate,background-color,box-shadow,border-color] duration-[var(--duration-slow)] ease-[var(--ease-snappy)] motion-reduce:transition-none",
        some ? "-translate-y-full" : "translate-y-0",
        transparente ? "border-transparent bg-transparent shadow-none" : "border-border bg-card/85 shadow-[var(--shadow-sm)] backdrop-blur-xl",
        className,
      )}
    >
      <div className={cn("mx-auto flex h-16 w-full max-w-[var(--content-wide)] items-center justify-between gap-3 px-4", alto)}>
        <Link href={inicioHref} aria-label={rotuloInicio} className={cn("inline-flex min-h-11 min-w-11 shrink-0 items-center rounded-sm", foco)}>
          {soIcone
            ? (logo?.simbolo ?? <Logo variante="simbolo" className="h-10 motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95" />)
            : (logo?.completo ?? <Logo superficie={superficie} className={cn("h-9", tela === "computador" ? "h-11" : tela === "celular" ? "" : telaLarga === "xl" ? "xl:h-11" : telaLarga === "md" ? "md:h-11" : "lg:h-11")} />)}
        </Link>

        <nav aria-label={textos?.principal ?? "Principal"} className={cn(naTela, "min-w-0 items-center gap-1")}>
          {itens.map((l) => (
            <Link
              key={l.id}
              href={l.href}
              aria-current={l.id === atual ? "page" : undefined}
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
          {acaoSecundaria && <Acao acao={acaoSecundaria} variant="outline" comoLink={comoLink} className={cn("px-5", naTela)} />}
          {acao && <Acao acao={acao} comoLink={comoLink} className={cn("px-5", naTela)} />}
          <Button
            ref={botaoDoMenu}
            type="button"
            variant="ghost"
            size="icon"
            aria-expanded={aberto}
            aria-label={textos?.abrirMenu ?? "Abrir menu"}
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
        itens={itens}
        atual={atual}
        acao={acao}
        acaoSecundaria={acaoSecundaria}
        comoLink={comoLink}
        textos={textos}
        container={containerDoMenu}
        retornarFocoPara={botaoDoMenu}
      />
    </header>
  );
}
