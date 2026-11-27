"use client";

import * as React from "react";
import { BadgeCheck, Bell, ChevronDown, ChevronRight, ChevronsUpDown, ExternalLink, HelpCircle, Menu, Search, ArrowRight, Crown } from "lucide-react";
import { cn } from "./utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

/**
 * Estrutura do painel da loja (FindLook)
 *
 * Peças do menu lateral e da barra superior do painel: seletor de loja, item de menu (com contador),
 * grupo do menu, card de plano, card de ajuda, campo de busca que abre a busca global (Ctrl + K),
 * botão de notificações e gatilho do menu da conta. Todas usam só tokens do DS.
 *
 * Moldura igual à do site do design system (decisão da dona do produto, 23/11/2026): BarraSuperiorDoPainel branca de
 * ponta a ponta no alto (logo à esquerda; busca, notificações e perfil à direita) e, embaixo dela, o menu lateral branco
 * com linha à direita. No topo do menu, o botão "≡ Menu" (BotaoRecolherMenu, dentro de TopoDoMenu) recolhe e expande:
 * expandido (ícone + nome, 240 px) ou recolhido (só ícones, 64 px, com tooltip), a partir de 1024 px. Itens no estilo do
 * site do DS; grupos que abrem e fecham (GrupoDoMenu expansivel) com os itens numa linha-guia. MenuLateralProvider
 * guarda a escolha (localStorage, uma chave por painel). Fora do MenuLateral (gaveta do celular), tudo aparece expandido.
 * O perfil fica sempre no cabeçalho, à direita.
 */

/* ── Menu lateral recolhível ─────────────────────────────────── */
// Mesmas larguras do menu do site do design system (w-60 / w-16), pedido da dona do produto em 23/11/2026.
const LARGURA_EXPANDIDO = 240;
const LARGURA_RECOLHIDO = 64;
const MIDIA_RECOLHIVEL = "(min-width: 1024px)";

const useLayoutSeguro = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

type MenuLateralContexto = {
  /** Escolha da pessoa (vale só a partir de 1024 px). */
  recolhido: boolean;
  setRecolhido: (v: boolean) => void;
  alternar: () => void;
  /** Id do <nav> do menu lateral, para o aria-controls do botão. */
  idDoMenu: string;
  /** true depois de ler a escolha guardada: só então a largura passa a animar (não anima ao abrir a página). */
  restaurado: boolean;
};

const ContextoDoMenuLateral = React.createContext<MenuLateralContexto | null>(null);
/** Dentro de um MenuLateral: se ele está recolhido agora (escolha da pessoa + tela larga). */
const ContextoDoRecolhido = React.createContext<{ recolhido: boolean; dentro: boolean; podeRecolher: boolean }>({ recolhido: false, dentro: false, podeRecolher: false });

function lerEscolha(chave?: string): boolean | null {
  if (!chave) return null;
  try {
    const v = window.localStorage.getItem(chave);
    return v === "1" ? true : v === "0" ? false : null;
  } catch {
    return null;
  }
}

function guardarEscolha(chave: string | undefined, v: boolean) {
  if (!chave) return;
  try {
    window.localStorage.setItem(chave, v ? "1" : "0");
  } catch {
    /* sem armazenamento (janela privada, bloqueio): a escolha vale só nesta visita */
  }
}

type MenuLateralProviderProps = {
  children: React.ReactNode;
  /** Chave no localStorage, uma por painel (ex.: "findlook:admin:menu-recolhido"). Sem chave, não guarda. */
  chave?: string;
  /** Estado inicial quando não há escolha guardada. */
  padrao?: boolean;
  /** Para controlar de fora (opcional). */
  recolhido?: boolean;
  onRecolhidoChange?: (v: boolean) => void;
};

function MenuLateralProvider({ children, chave, padrao = false, recolhido: controlado, onRecolhidoChange }: MenuLateralProviderProps) {
  const [interno, setInterno] = React.useState(padrao);
  const [restaurado, setRestaurado] = React.useState(false);
  const idDoMenu = `menu-lateral-${React.useId().replace(/:/g, "")}`;
  const recolhido = controlado ?? interno;

  // Lê a escolha guardada antes de a tela ser pintada (sem piscar) e só depois liga a animação da largura.
  useLayoutSeguro(() => {
    const salvo = lerEscolha(chave);
    if (salvo !== null && controlado === undefined) setInterno(salvo);
    const id = window.requestAnimationFrame(() => setRestaurado(true));
    return () => window.cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chave]);

  const setRecolhido = React.useCallback(
    (v: boolean) => {
      if (controlado === undefined) setInterno(v);
      guardarEscolha(chave, v);
      onRecolhidoChange?.(v);
    },
    [chave, controlado, onRecolhidoChange],
  );
  const alternar = React.useCallback(() => setRecolhido(!recolhido), [recolhido, setRecolhido]);

  const valor = React.useMemo(() => ({ recolhido, setRecolhido, alternar, idDoMenu, restaurado }), [recolhido, setRecolhido, alternar, idDoMenu, restaurado]);
  return <ContextoDoMenuLateral.Provider value={valor}>{children}</ContextoDoMenuLateral.Provider>;
}

/** Estado do menu lateral (fora de um MenuLateralProvider, devolve sempre expandido). */
function useMenuLateral(): MenuLateralContexto {
  return (
    React.useContext(ContextoDoMenuLateral) ?? { recolhido: false, setRecolhido: () => {}, alternar: () => {}, idDoMenu: "", restaurado: true }
  );
}

/** Se o componente está dentro de um MenuLateral recolhido agora. Use para trocar o logo pelo símbolo, por exemplo. */
function useMenuRecolhido() {
  return React.useContext(ContextoDoRecolhido).recolhido;
}

function useTelaLarga(midia: string) {
  const [larga, setLarga] = React.useState(false);
  useLayoutSeguro(() => {
    if (typeof window.matchMedia !== "function") { setLarga(true); return; }
    const mq = window.matchMedia(midia);
    const mudar = () => setLarga(mq.matches);
    mudar();
    mq.addEventListener("change", mudar);
    return () => mq.removeEventListener("change", mudar);
  }, [midia]);
  return larga;
}

type MenuLateralProps = React.ComponentProps<"aside"> & {
  /** A partir de qual largura de tela o menu pode recolher (padrão: 1024 px). Abaixo dela, fica sempre expandido. */
  midia?: string;
};

/**
 * Coluna do menu lateral fixo (telas largas). Muda de largura entre 256 px e 72 px com os tokens de movimento;
 * com "menos movimento", a troca é instantânea. Use dentro de um MenuLateralProvider. Esconder em telas
 * estreitas (onde o menu vira gaveta) continua por conta da página, com a mesma classe de hoje.
 */
const MenuLateral = React.forwardRef<HTMLElement, MenuLateralProps>(function MenuLateral({ midia = MIDIA_RECOLHIVEL, className, style, children, ...props }, ref) {
  const { recolhido: escolha, restaurado } = useMenuLateral();
  const larga = useTelaLarga(midia);
  const recolhido = escolha && larga;
  // A largura só anima depois que o menu já apareceu uma vez com a escolha guardada (nada de animação ao abrir a página).
  const [montado, setMontado] = React.useState(false);
  React.useEffect(() => {
    const id = window.requestAnimationFrame(() => setMontado(true));
    return () => window.cancelAnimationFrame(id);
  }, []);
  const valor = React.useMemo(() => ({ recolhido, dentro: true, podeRecolher: larga }), [recolhido, larga]);
  return (
    <aside
      ref={ref}
      aria-label="Menu lateral"
      data-slot="menu-lateral"
      data-recolhido={recolhido ? "" : undefined}
      className={cn(
        "h-full shrink-0 overflow-hidden border-r border-border bg-card",
        restaurado && montado && "transition-[width] duration-[var(--duration-normal)] ease-[var(--ease-in-out)] motion-reduce:transition-none",
        className,
      )}
      style={{ width: recolhido ? LARGURA_RECOLHIDO : LARGURA_EXPANDIDO, ...style }}
      {...props}
    >
      <ContextoDoRecolhido.Provider value={valor}>{children}</ContextoDoRecolhido.Provider>
    </aside>
  );
});

/** <nav> do menu lateral, com o id que o BotaoRecolherMenu controla e a rolagem própria. */
const NavDoMenu = React.forwardRef<HTMLElement, React.ComponentProps<"nav">>(function NavDoMenu({ className, ...props }, ref) {
  const { idDoMenu } = useMenuLateral();
  const { dentro, recolhido } = React.useContext(ContextoDoRecolhido);
  return (
    <nav
      ref={ref}
      id={dentro && idDoMenu ? idDoMenu : undefined}
      data-slot="nav-do-menu"
      className={cn("min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain py-2 [scrollbar-width:thin]", recolhido ? "px-2" : "px-3", className)}
      {...props}
    />
  );
});

/** Linha fina entre grupos do menu. */
function DivisorDoMenu({ className }: { className?: string }) {
  return <div aria-hidden data-slot="divisor-do-menu" className={cn("my-2 border-t border-border", className)} />;
}

/**
 * Dica ao lado de um elemento do menu recolhido (mouse e foco do teclado). Fica sempre na árvore e só abre quando
 * `ativa`: assim o elemento não é recriado ao recolher ou expandir, e o foco do teclado não se perde.
 */
function DicaDoMenu({ texto, ativa = true, children }: { texto: React.ReactNode; ativa?: boolean; children: React.ReactElement }) {
  const [aberta, setAberta] = React.useState(false);
  return (
    <Tooltip open={ativa && aberta} onOpenChange={setAberta}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right" sideOffset={10}>{texto}</TooltipContent>
    </Tooltip>
  );
}

/**
 * Botão "≡ Menu" do topo do menu lateral, no estilo do site do design system: recolhe e expande o menu.
 * Só aparece dentro do MenuLateral e em tela larga; na gaveta do celular, não aparece.
 * O nome acessível diz a ação ("Recolher menu" / "Expandir menu") e contém o texto visível "Menu".
 */
const BotaoRecolherMenu = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(function BotaoRecolherMenu({ className, onClick, ...props }, ref) {
  const { recolhido: escolha, alternar, idDoMenu } = useMenuLateral();
  const { recolhido, dentro, podeRecolher } = React.useContext(ContextoDoRecolhido);
  if (!dentro || !podeRecolher) return null;
  const rotulo = escolha ? "Expandir menu" : "Recolher menu";
  const botao = (
    <button
      ref={ref}
      type="button"
      data-slot="botao-recolher-menu"
      aria-expanded={!escolha}
      aria-controls={idDoMenu || undefined}
      aria-label={rotulo}
      onClick={(e) => { onClick?.(e); if (!e.defaultPrevented) alternar(); }}
      className={cn(
        "flex h-9 items-center gap-2 rounded-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        recolhido ? "w-9 justify-center" : "w-full pr-2",
        className,
      )}
      {...props}
    >
      <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center"><Menu className="h-[18px] w-[18px]" /></span>
      {!recolhido && <span aria-hidden className="text-label leading-4 font-medium uppercase tracking-wider">Menu</span>}
    </button>
  );
  return <DicaDoMenu texto={rotulo} ativa={recolhido}>{botao}</DicaDoMenu>;
});

/** Topo do menu lateral (como no site do DS): o botão "≡ Menu", centralizado quando recolhido. */
function TopoDoMenu({ className, children }: { className?: string; children?: React.ReactNode }) {
  const { recolhido, dentro, podeRecolher } = React.useContext(ContextoDoRecolhido);
  if (!dentro || !podeRecolher) return children ? <div className={className}>{children}</div> : null;
  return (
    <div data-slot="topo-do-menu" className={cn("flex h-12 shrink-0 items-center", recolhido ? "justify-center px-2" : "px-3", className)}>
      <BotaoRecolherMenu />
      {children}
    </div>
  );
}

/* ── Barra superior do painel (como a do site do design system) ── */
/**
 * Faixa branca de ponta a ponta no alto do painel, acima do menu lateral, com linha fina embaixo. O logo fica à
 * esquerda; busca e notificações à direita; o perfil (GatilhoDaConta) sempre na ponta direita.
 */
function BarraSuperiorDoPainel({ className, children, ...props }: React.ComponentProps<"header">) {
  return (
    <header data-slot="barra-superior-do-painel" className={cn("flex h-16 shrink-0 items-center gap-2 border-b border-border bg-card px-3 @xl:gap-3 @xl:px-4", className)} {...props}>
      {children}
    </header>
  );
}

/* ── Iniciais para avatar sem foto ───────────────────────────── */
function iniciais(nome: string) {
  return nome.split(/\s+/).filter(Boolean).slice(0, 2).map(p => p[0]!.toUpperCase()).join("");
}

function AvatarPainel({ nome, foto, className }: { nome: string; foto?: string; className?: string }) {
  return foto ? (
    <img src={foto} alt="" className={cn("h-9 w-9 shrink-0 rounded-full object-cover", className)} />
  ) : (
    <span aria-hidden className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--primary-muted)] text-label font-bold text-[var(--primary-text,var(--primary))]", className)}>
      {iniciais(nome)}
    </span>
  );
}

/* ── Seletor de loja ─────────────────────────────────────────── */
type SeletorDeLojaProps = React.ComponentProps<"button"> & {
  loja: string;
  foto?: string;
  verificada?: boolean;
};

function SeletorDeLoja({ loja, foto, verificada = true, className, ...props }: SeletorDeLojaProps) {
  const recolhido = useMenuRecolhido();
  if (recolhido) {
    return (
      <DicaDoMenu texto={loja}>
        <button
          type="button"
          data-slot="seletor-de-loja"
          aria-label={`Loja atual: ${loja}${verificada ? ", verificada" : ""}. Trocar de loja`}
          className={cn(
            "mx-auto flex h-10 w-10 items-center justify-center rounded-full transition-shadow hover:ring-2 hover:ring-border",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            className,
          )}
          {...props}
        >
          <AvatarPainel nome={loja} foto={foto} className="h-10 w-10" />
        </button>
      </DicaDoMenu>
    );
  }
  return (
    <button
      type="button"
      data-slot="seletor-de-loja"
      aria-label={`Loja atual: ${loja}${verificada ? ", verificada" : ""}. Trocar de loja`}
      className={cn(
        "flex w-full items-center gap-3 rounded-md border border-border bg-card px-3 py-2 text-left transition-colors hover:bg-muted/60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      <AvatarPainel nome={loja} foto={foto} className="h-10 w-10" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-body-sm font-bold text-foreground">{loja}</span>
        {verificada && (
          <span className="mt-1 flex items-center gap-1 text-label text-muted-foreground">
            <BadgeCheck aria-hidden className="h-3.5 w-3.5 text-success" /> Loja verificada
          </span>
        )}
      </span>
      <ChevronsUpDown aria-hidden className="h-4 w-4 shrink-0 text-muted-foreground" />
    </button>
  );
}

/* ── Item e grupo do menu ────────────────────────────────────── */
type ItemDoMenuProps = React.ComponentProps<"a"> & {
  icone: React.ReactNode;
  ativo?: boolean;
  /** Número de novidades (pedidos, reservas…). 0 ou vazio não mostra. */
  contador?: number;
  /** Como o contador é lido ("novos", "pendentes"…). */
  rotuloContador?: string;
};

const ItemDoMenu = React.forwardRef<HTMLAnchorElement, ItemDoMenuProps>(function ItemDoMenu({ icone, ativo, contador, rotuloContador = "novos", className, children, ...props }, ref) {
  const { recolhido, dentro } = React.useContext(ContextoDoRecolhido);
  // Visual do menu do site do design system (23/11/2026): ícone de 16 px, nome, cantos de 8 px. Regra dos rosas claros
  // (dona do produto, 27/11/2026): o ativo fica no rosa do selecionado (--primary-suave) com texto --primary-text e
  // continua rosa com o mouse em cima; o hover dos outros itens é cinza claro (--accent), nunca rosa.
  const item = (
    <a
      ref={ref}
      data-slot="item-do-menu"
      aria-current={ativo ? "page" : undefined}
      className={cn(
        "group relative flex min-h-9 items-center gap-2 rounded-sm px-3 py-2 text-body-sm font-medium transition-[background-color,color] duration-150 toque:min-h-11",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        ativo
          ? "bg-[var(--primary-suave)] text-[var(--primary-text,var(--primary))]"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
        recolhido && "justify-center px-0",
        className,
      )}
      {...props}
    >
      <span aria-hidden className="relative flex h-4 w-4 shrink-0 items-center justify-center [&>svg]:h-4 [&>svg]:w-4">
        {icone}
        {recolhido && !!contador && <span data-slot="ponto-do-contador" className="absolute -right-1.5 -top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-card" />}
      </span>
      {recolhido ? (
        <span className="sr-only">{children}{!!contador && `, ${contador} ${rotuloContador}`}</span>
      ) : (
        <>
          <span className="min-w-0 flex-1 truncate animate-in fade-in-0 duration-[var(--duration-normal)] motion-reduce:animate-none">{children}</span>
          {!!contador && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-caption font-bold text-primary-foreground">
              {contador}<span className="sr-only"> {rotuloContador}</span>
            </span>
          )}
        </>
      )}
    </a>
  );
  // Fora de um MenuLateral (gaveta do celular, exemplos), o item nunca recolhe: não precisa de tooltip.
  if (!dentro) return item;
  return <DicaDoMenu texto={<>{children}{!!contador && `, ${contador} ${rotuloContador}`}</>} ativa={recolhido}>{item}</DicaDoMenu>;
});

type GrupoDoMenuProps = {
  titulo?: string;
  children: React.ReactNode;
  className?: string;
  /**
   * Grupo que abre e fecha, como no site do design system (23/11/2026): ícone, nome e seta; os itens ficam embaixo,
   * numa linha-guia à esquerda. Recolhido, mostra só o ícone (com tooltip); um clique expande o menu e abre o grupo.
   * Quando fechado (ou com o menu recolhido) e um item de dentro está ativo, o grupo aparece ativo.
   */
  expansivel?: boolean;
  icone?: React.ReactNode;
  padraoAberto?: boolean;
  aberto?: boolean;
  onAbertoChange?: (v: boolean) => void;
};

function GrupoDoMenu({ titulo, children, className, expansivel, icone, padraoAberto = false, aberto: abertoControlado, onAbertoChange }: GrupoDoMenuProps) {
  const id = React.useId();
  const { recolhido, dentro } = React.useContext(ContextoDoRecolhido);
  const { setRecolhido } = useMenuLateral();
  const [abertoInterno, setAbertoInterno] = React.useState(padraoAberto);
  if (!expansivel) {
    return (
      <div data-slot="grupo-do-menu" className={cn("space-y-1", className)} role="group" aria-labelledby={titulo ? id : undefined}>
        {titulo && <p id={id} className={recolhido ? "sr-only" : "px-3 pb-1 pt-3 text-label font-semibold text-muted-foreground"}>{titulo}</p>}
        {/* Recolhido: o título vira uma linha fina (que some se já houver um divisor logo antes do grupo). */}
        {titulo && recolhido && <div aria-hidden data-slot="divisor-do-grupo" className="my-2 border-t border-border [.border-t+[data-slot=grupo-do-menu]_&]:hidden" />}
        {children}
      </div>
    );
  }
  const aberto = abertoControlado ?? abertoInterno;
  const mudar = (v: boolean) => { if (abertoControlado === undefined) setAbertoInterno(v); onAbertoChange?.(v); };
  const filhoAtivo = React.Children.toArray(children).some(c => React.isValidElement<{ ativo?: boolean }>(c) && !!c.props.ativo);
  const mostrarFilhos = aberto && !recolhido;
  const destacado = filhoAtivo && !mostrarFilhos;
  const idFilhos = `${id}-itens`;
  const botao = (
    <button
      type="button"
      id={id}
      data-slot="grupo-do-menu-gatilho"
      aria-expanded={mostrarFilhos}
      aria-controls={idFilhos}
      onClick={() => { if (recolhido) { setRecolhido(false); mudar(true); } else mudar(!aberto); }}
      className={cn(
        "flex min-h-9 w-full items-center gap-2 rounded-sm px-3 py-2 toque:min-h-11 text-left text-body-sm font-medium transition-[background-color,color] duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        destacado ? "bg-[var(--primary-suave)] text-[var(--primary-text,var(--primary))]" : "text-muted-foreground hover:bg-accent hover:text-foreground",
        recolhido && "justify-center px-0",
      )}
    >
      {icone && <span aria-hidden className="flex h-4 w-4 shrink-0 items-center justify-center [&>svg]:h-4 [&>svg]:w-4">{icone}</span>}
      {recolhido ? <span className="sr-only">{titulo}</span> : <span className="min-w-0 flex-1 truncate">{titulo}</span>}
      {!recolhido && <ChevronRight aria-hidden className={cn("h-3.5 w-3.5 shrink-0 transition-transform duration-150 motion-reduce:transition-none", aberto && "rotate-90")} />}
    </button>
  );
  return (
    <div data-slot="grupo-do-menu" data-expansivel="" className={cn("space-y-1", className)}>
      {dentro ? <DicaDoMenu texto={titulo} ativa={recolhido}>{botao}</DicaDoMenu> : botao}
      {mostrarFilhos && (
        <div id={idFilhos} role="group" aria-labelledby={id} className="ml-3 space-y-1 border-l border-border pl-2">
          {children}
        </div>
      )}
    </div>
  );
}

/* ── Card de plano (rodapé do menu) ──────────────────────────── */
type CardDePlanoProps = {
  /** Versão baixa, para o rodapé do menu. */
  compacto?: boolean;
  plano: string;
  preco?: string;
  descricao?: string;
  acao?: string;
  onAcao?: () => void;
  className?: string;
};

function CardDePlano({ compacto, plano, preco, descricao, acao = "Gerenciar plano", onAcao, className }: CardDePlanoProps) {
  const recolhido = useMenuRecolhido();
  if (recolhido) {
    return (
      <DicaDoMenu texto={`Seu plano: ${plano}${preco ? `, ${preco} / mês` : ""}`}>
        <button
          type="button"
          data-slot="card-de-plano"
          onClick={onAcao}
          aria-label={`Seu plano: ${plano}${preco ? `, ${preco} por mês` : ""}. ${acao}`}
          className={cn(
            "mx-auto flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground transition-opacity hover:opacity-90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            className,
          )}
        >
          <Crown aria-hidden className="h-5 w-5" />
        </button>
      </DicaDoMenu>
    );
  }
  if (compacto) {
    return (
      <div data-slot="card-de-plano" className={cn("relative overflow-hidden rounded-lg bg-primary p-3 text-primary-foreground", className)}>
        <div aria-hidden className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10" />
        <div className="flex items-center gap-2">
          <Crown aria-hidden className="h-5 w-5 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-caption font-medium leading-none">Seu plano</p>
            <p className="mt-1 truncate text-body-sm font-bold leading-tight">{plano}</p>
            {preco && <p className="text-label font-medium leading-tight">{preco} / mês</p>}
          </div>
        </div>
        <button type="button" onClick={onAcao} className="mt-2 inline-flex h-8 w-full items-center justify-center gap-1 rounded-sm bg-primary-foreground text-label font-semibold text-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary">
          {acao} <ArrowRight aria-hidden className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }
  return (
    <div data-slot="card-de-plano" className={cn("relative overflow-hidden rounded-lg bg-primary p-4 text-primary-foreground shadow-[var(--shadow-md)]", className)}>
      <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
      <Crown aria-hidden className="mb-2 h-6 w-6" />
      <p className="text-label font-medium">Seu plano</p>
      <p className="text-subtitle font-bold leading-tight">{plano}</p>
      {preco && <p className="mt-1 text-h3 font-extrabold leading-none">{preco}<span className="text-body-sm font-medium"> / mês</span></p>}
      {descricao && <p className="mt-2 text-label leading-snug">{descricao}</p>}
      <button
        type="button"
        onClick={onAcao}
        className="mt-3 inline-flex h-9 w-full items-center justify-center gap-1 rounded-md bg-primary-foreground text-body-sm font-semibold text-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
      >
        {acao} <ArrowRight aria-hidden className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ── Card de ajuda (rodapé do menu) ──────────────────────────── */
function CardDeAjuda({ titulo = "Precisa de ajuda?", texto = "Acesse a central de suporte", href = "#", className }: { titulo?: string; texto?: string; href?: string; className?: string }) {
  const recolhido = useMenuRecolhido();
  if (recolhido) {
    return (
      <DicaDoMenu texto={`${titulo} ${texto}`}>
        <a
          data-slot="card-de-ajuda"
          href={href}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "mx-auto flex h-10 w-10 items-center justify-center rounded-md border border-input bg-card text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            className,
          )}
        >
          <HelpCircle aria-hidden className="h-5 w-5" />
          <span className="sr-only">{titulo} {texto} (abre em nova aba)</span>
        </a>
      </DicaDoMenu>
    );
  }
  return (
    <a
      data-slot="card-de-ajuda"
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "flex items-center gap-3 rounded-md border border-border bg-card p-3 transition-colors hover:bg-muted/60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <HelpCircle aria-hidden className="h-6 w-6 shrink-0 text-muted-foreground" />
      <span className="min-w-0 flex-1">
        <span className="block text-body-sm font-bold text-foreground">{titulo}</span>
        <span className="block text-label text-muted-foreground">{texto}</span>
      </span>
      <ExternalLink aria-hidden className="h-4 w-4 shrink-0 text-muted-foreground" />
      <span className="sr-only">(abre em nova aba)</span>
    </a>
  );
}

/* ── Barra superior ──────────────────────────────────────────── */
function CampoDeBuscaGlobal({ placeholder = "Buscar no painel (produtos, pedidos, relatórios…)", atalho = "Ctrl + K", onAbrir, className }: { placeholder?: string; atalho?: string; onAbrir?: () => void; className?: string }) {
  return (
    <button
      type="button"
      data-slot="busca-global"
      onClick={onAbrir}
      aria-keyshortcuts={atalho === "Ctrl + K" ? "Control+K" : undefined}
      className={cn(
        "flex h-10 w-full items-center gap-3 rounded-md border border-input bg-card px-3 text-left text-body-sm text-muted-foreground transition-colors hover:bg-muted/60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <Search aria-hidden className="h-4 w-4 shrink-0" />
      <span className="min-w-0 flex-1 truncate">{placeholder}</span>
      {atalho && <kbd className="hidden shrink-0 rounded-sm border border-border bg-muted px-1 py-1 font-sans text-caption font-medium sm:inline">{atalho}</kbd>}
    </button>
  );
}

const BotaoDeNotificacoes = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button"> & { naoLidas?: number }>(function BotaoDeNotificacoes({ naoLidas = 0, className, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={naoLidas ? `Notificações: ${naoLidas} não lidas` : "Notificações"}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
      data-slot="notificacoes"
    >
      <Bell aria-hidden className="h-5 w-5" />
      {naoLidas > 0 && <span aria-hidden className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />}
    </button>
  );
});

const GatilhoDaConta = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button"> & { nome: string; papel?: string; foto?: string }>(function GatilhoDaConta({ nome, papel, foto, className, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={`Conta de ${nome}${papel ? `, ${papel}` : ""}. Abrir menu da conta`}
      className={cn(
        "flex items-center gap-2 rounded-md px-2 py-1 text-left transition-colors hover:bg-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
      data-slot="gatilho-da-conta"
    >
      <AvatarPainel nome={nome} foto={foto} />
      <span className="hidden min-w-0 sm:block">
        <span className="block truncate text-body-sm font-bold text-foreground">{nome}</span>
        {papel && <span className="block truncate text-label text-muted-foreground">{papel}</span>}
      </span>
      <ChevronDown aria-hidden className="h-4 w-4 shrink-0 text-muted-foreground" />
    </button>
  );
});

export {
  AvatarPainel, SeletorDeLoja, ItemDoMenu, GrupoDoMenu, CardDePlano, CardDeAjuda, CampoDeBuscaGlobal, BotaoDeNotificacoes, GatilhoDaConta, iniciais,
  MenuLateralProvider, MenuLateral, NavDoMenu, DivisorDoMenu, BotaoRecolherMenu, TopoDoMenu, BarraSuperiorDoPainel, useMenuLateral, useMenuRecolhido,
  LARGURA_EXPANDIDO, LARGURA_RECOLHIDO,
};
