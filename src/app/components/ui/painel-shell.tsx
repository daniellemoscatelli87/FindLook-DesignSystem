import * as React from "react";
import { BadgeCheck, Bell, ChevronDown, ChevronsUpDown, ExternalLink, HelpCircle, Search, ArrowRight, Crown } from "lucide-react";
import { cn } from "./utils";

/**
 * Estrutura do painel da loja (FindLook)
 *
 * Peças do menu lateral e da barra superior do painel: seletor de loja, item de menu (com contador),
 * grupo do menu, card de plano, card de ajuda, campo de busca que abre a busca global (Ctrl + K),
 * botão de notificações e gatilho do menu da conta. Todas usam só tokens do DS.
 */

/* ── Iniciais para avatar sem foto ───────────────────────────── */
function iniciais(nome: string) {
  return nome.split(/\s+/).filter(Boolean).slice(0, 2).map(p => p[0]!.toUpperCase()).join("");
}

function AvatarPainel({ nome, foto, className }: { nome: string; foto?: string; className?: string }) {
  return foto ? (
    <img src={foto} alt="" className={cn("h-9 w-9 shrink-0 rounded-full object-cover", className)} />
  ) : (
    <span aria-hidden className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--primary-muted)] text-[0.75rem] font-bold text-[var(--primary-text,var(--primary))]", className)}>
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
  return (
    <button
      type="button"
      data-slot="seletor-de-loja"
      aria-label={`Loja atual: ${loja}${verificada ? ", verificada" : ""}. Trocar de loja`}
      className={cn(
        "flex w-full items-center gap-3 rounded-[12px] border border-border bg-card px-3 py-2.5 text-left shadow-[var(--shadow-xs)] transition-colors hover:bg-muted/60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      <AvatarPainel nome={loja} foto={foto} className="h-10 w-10" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.875rem] font-bold text-foreground">{loja}</span>
        {verificada && (
          <span className="mt-0.5 flex items-center gap-1 text-[0.75rem] text-muted-foreground">
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
  return (
    <a
      ref={ref}
      data-slot="item-do-menu"
      aria-current={ativo ? "page" : undefined}
      className={cn(
        "group relative flex min-h-10 items-center gap-3 rounded-[10px] px-3 py-2 text-[0.875rem] font-medium transition-[background-color,color] duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        ativo
          ? "bg-[var(--primary-muted)] font-semibold text-[var(--primary-text,var(--primary))]"
          : "text-foreground hover:bg-muted",
        className,
      )}
      {...props}
    >
      {ativo && <span aria-hidden className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-primary" />}
      <span aria-hidden className={cn("flex h-5 w-5 shrink-0 items-center justify-center [&>svg]:h-[18px] [&>svg]:w-[18px]", !ativo && "text-muted-foreground group-hover:text-foreground")}>{icone}</span>
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {!!contador && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[0.6875rem] font-bold text-primary-foreground">
          {contador}<span className="sr-only"> {rotuloContador}</span>
        </span>
      )}
    </a>
  );
});

function GrupoDoMenu({ titulo, children, className }: { titulo?: string; children: React.ReactNode; className?: string }) {
  const id = React.useId();
  return (
    <div data-slot="grupo-do-menu" className={cn("space-y-0.5", className)} role="group" aria-labelledby={titulo ? id : undefined}>
      {titulo && <p id={id} className="px-3 pb-1 pt-3 text-[0.75rem] font-semibold text-muted-foreground">{titulo}</p>}
      {children}
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
  if (compacto) {
    return (
      <div data-slot="card-de-plano" className={cn("relative overflow-hidden rounded-[14px] bg-primary p-3 text-primary-foreground shadow-[var(--shadow-sm)]", className)}>
        <div aria-hidden className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10" />
        <div className="flex items-center gap-2.5">
          <Crown aria-hidden className="h-5 w-5 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[0.6875rem] font-medium leading-none">Seu plano</p>
            <p className="mt-1 truncate text-[0.875rem] font-bold leading-tight">{plano}</p>
            {preco && <p className="text-[0.75rem] font-medium leading-tight">{preco} / mês</p>}
          </div>
        </div>
        <button type="button" onClick={onAcao} className="mt-2.5 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-[9px] bg-primary-foreground text-[0.75rem] font-semibold text-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary">
          {acao} <ArrowRight aria-hidden className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }
  return (
    <div data-slot="card-de-plano" className={cn("relative overflow-hidden rounded-[14px] bg-primary p-4 text-primary-foreground shadow-[var(--shadow-md)]", className)}>
      <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
      <Crown aria-hidden className="mb-2 h-6 w-6" />
      <p className="text-[0.75rem] font-medium">Seu plano</p>
      <p className="text-[1.0625rem] font-bold leading-tight">{plano}</p>
      {preco && <p className="mt-1 text-[1.375rem] font-extrabold leading-none">{preco}<span className="text-[0.8125rem] font-medium"> / mês</span></p>}
      {descricao && <p className="mt-2 text-[0.75rem] leading-snug">{descricao}</p>}
      <button
        type="button"
        onClick={onAcao}
        className="mt-3 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-[10px] bg-primary-foreground text-[0.8125rem] font-semibold text-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
      >
        {acao} <ArrowRight aria-hidden className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ── Card de ajuda (rodapé do menu) ──────────────────────────── */
function CardDeAjuda({ titulo = "Precisa de ajuda?", texto = "Acesse a central de suporte", href = "#", className }: { titulo?: string; texto?: string; href?: string; className?: string }) {
  return (
    <a
      data-slot="card-de-ajuda"
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "flex items-center gap-3 rounded-[12px] border border-border bg-card p-3 shadow-[var(--shadow-xs)] transition-colors hover:bg-muted/60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <HelpCircle aria-hidden className="h-6 w-6 shrink-0 text-muted-foreground" />
      <span className="min-w-0 flex-1">
        <span className="block text-[0.8125rem] font-bold text-foreground">{titulo}</span>
        <span className="block text-[0.75rem] text-muted-foreground">{texto}</span>
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
        "flex h-10 w-full items-center gap-3 rounded-[12px] border border-border bg-card px-3 text-left text-[0.8125rem] text-muted-foreground shadow-[var(--shadow-xs)] transition-colors hover:bg-muted/60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <Search aria-hidden className="h-4 w-4 shrink-0" />
      <span className="min-w-0 flex-1 truncate">{placeholder}</span>
      {atalho && <kbd className="hidden shrink-0 rounded-[6px] border border-border bg-muted px-1.5 py-0.5 font-sans text-[0.6875rem] font-medium sm:inline">{atalho}</kbd>}
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
        "flex items-center gap-2.5 rounded-[12px] px-2 py-1.5 text-left transition-colors hover:bg-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
      data-slot="gatilho-da-conta"
    >
      <AvatarPainel nome={nome} foto={foto} />
      <span className="hidden min-w-0 sm:block">
        <span className="block truncate text-[0.8125rem] font-bold text-foreground">{nome}</span>
        {papel && <span className="block truncate text-[0.75rem] text-muted-foreground">{papel}</span>}
      </span>
      <ChevronDown aria-hidden className="h-4 w-4 shrink-0 text-muted-foreground" />
    </button>
  );
});

export { AvatarPainel, SeletorDeLoja, ItemDoMenu, GrupoDoMenu, CardDePlano, CardDeAjuda, CampoDeBuscaGlobal, BotaoDeNotificacoes, GatilhoDaConta, iniciais };
