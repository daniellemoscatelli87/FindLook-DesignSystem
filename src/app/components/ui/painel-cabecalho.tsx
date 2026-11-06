import * as React from "react";
import { CalendarDays, ChevronDown, X, ArrowRight } from "lucide-react";
import { cn } from "./utils";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
} from "./dropdown-menu";

/**
 * Cabeçalho da página do painel (FindLook)
 *
 * CabecalhoDaPagina: saudação (selo opcional), título com a palavra da marca em destaque,
 * descrição e área de ações. SeletorDePeriodo: períodos prontos. BotaoDividido: ação principal
 * com menu de ações relacionadas. BannerPromocional: aviso fechável com imagem e botão.
 */

const display = "font-[family-name:var(--font-display)]";

/** Destaca em primária o trecho entre ** **, como no Heading do DS. */
function destacar(texto: string) {
  return texto.split(/(\*\*[^*]+\*\*)/g).map((parte, i) =>
    parte.startsWith("**") ? <span key={i} className="text-[var(--primary-text,var(--primary))]">{parte.slice(2, -2)}</span> : parte,
  );
}

type CabecalhoDaPaginaProps = {
  saudacao?: string;
  titulo: string;
  descricao?: string;
  acoes?: React.ReactNode;
  /** Nível do título (padrão h1; use 2 ou 3 quando já houver um h1 na página). */
  nivel?: 1 | 2 | 3;
  className?: string;
};

function CabecalhoDaPagina({ saudacao, titulo, descricao, acoes, nivel = 1, className }: CabecalhoDaPaginaProps) {
  const Titulo = `h${nivel}` as "h1" | "h2" | "h3";
  return (
    <header data-slot="cabecalho-da-pagina" className={cn("flex flex-col gap-4 @4xl:flex-row @4xl:items-end @4xl:justify-between @4xl:gap-8", className)}>
      <div className="min-w-0 max-w-2xl">
        {saudacao && <p className="mb-1 text-[0.9375rem] font-bold text-[var(--primary-text,var(--primary))]">{saudacao}</p>}
        <Titulo className={`${display} text-[1.625rem] @xl:text-[2rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-foreground`}>{destacar(titulo)}</Titulo>
        {descricao && <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{descricao}</p>}
      </div>
      {acoes && <div className="flex shrink-0 flex-wrap items-center gap-2 @4xl:flex-nowrap">{acoes}</div>}
    </header>
  );
}

/* ── Seletor de período ──────────────────────────────────────── */
const periodosPadrao = [
  { valor: "7", rotulo: "Últimos 7 dias" },
  { valor: "30", rotulo: "Últimos 30 dias" },
  { valor: "90", rotulo: "Últimos 90 dias" },
  { valor: "12m", rotulo: "Últimos 12 meses" },
];

function SeletorDePeriodo({ valor, onChange, periodos = periodosPadrao, className }: { valor: string; onChange: (v: string) => void; periodos?: { valor: string; rotulo: string }[]; className?: string }) {
  const atual = periodos.find(p => p.valor === valor) ?? periodos[0]!;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Período: ${atual.rotulo}. Trocar período`}
        className={cn(
          "inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-[10px] border border-border bg-card px-3 text-[0.9375rem] text-foreground transition-colors hover:bg-accent",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className,
        )}
      >
        <CalendarDays aria-hidden className="h-4 w-4 text-muted-foreground" />
        {atual.rotulo}
        <ChevronDown aria-hidden className="h-4 w-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        <DropdownMenuLabel>Período</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={valor} onValueChange={onChange}>
          {periodos.map(p => <DropdownMenuRadioItem key={p.valor} value={p.valor}>{p.rotulo}</DropdownMenuRadioItem>)}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ── Botão dividido ──────────────────────────────────────────── */
type AcaoDoMenu = { rotulo: string; icone?: React.ReactNode; onSelect?: () => void };

function BotaoDividido({ rotulo, icone, onClick, acoes, rotuloMenu = "Mais opções", className }: { rotulo: string; icone?: React.ReactNode; onClick?: () => void; acoes: AcaoDoMenu[]; rotuloMenu?: string; className?: string }) {
  const foco = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  return (
    <div data-slot="botao-dividido" className={cn("inline-flex h-10 rounded-[12px] bg-primary text-primary-foreground shadow-sm", className)}>
      <button type="button" onClick={onClick} className={cn("inline-flex items-center gap-2 whitespace-nowrap rounded-l-[12px] pl-3.5 pr-4 text-[0.9375rem] font-medium transition-colors hover:bg-[var(--primary-hover)]", foco)}>
        {icone && <span aria-hidden className="[&>svg]:h-4 [&>svg]:w-4">{icone}</span>}
        {rotulo}
      </button>
      <span aria-hidden className="my-2 w-px bg-primary-foreground/40" />
      <DropdownMenu>
        <DropdownMenuTrigger aria-label={`${rotuloMenu}: ${rotulo}`} className={cn("inline-flex w-10 items-center justify-center rounded-r-[12px] transition-colors hover:bg-[var(--primary-hover)]", foco)}>
          <ChevronDown aria-hidden className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-52">
          {acoes.map((a, i) => (
            <React.Fragment key={a.rotulo}>
              {i > 0 && i === acoes.length - 1 && acoes.length > 2 && <DropdownMenuSeparator />}
              <DropdownMenuItem onSelect={a.onSelect}>{a.icone}{a.rotulo}</DropdownMenuItem>
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/* ── Banner promocional fechável ─────────────────────────────── */
type BannerPromocionalProps = {
  titulo: string;
  texto: string;
  acao: string;
  onAcao?: () => void;
  onFechar?: () => void;
  /** Ilustração ou foto à esquerda (decorativa). */
  imagem?: React.ReactNode;
  className?: string;
};

function BannerPromocional({ titulo, texto, acao, onAcao, onFechar, imagem, className }: BannerPromocionalProps) {
  return (
    <aside data-slot="banner-promocional" aria-label={titulo} className={cn("relative flex items-stretch overflow-hidden rounded-[16px] border border-primary/20 bg-[var(--primary-muted)]", className)}>
      {imagem && <div aria-hidden className="hidden w-28 shrink-0 items-center justify-center bg-primary/10 text-[var(--primary-text,var(--primary))] @md:flex">{imagem}</div>}
      <div className="min-w-0 flex-1 p-4 pr-12">
        <p className="text-[0.9375rem] font-bold text-foreground">{titulo}</p>
        <p className="mt-0.5 text-[0.8125rem] leading-snug text-muted-foreground">{texto}</p>
        <button
          type="button"
          onClick={onAcao}
          className="mt-3 inline-flex h-10 items-center gap-1.5 rounded-[12px] bg-primary px-4 text-[0.9375rem] font-medium text-primary-foreground shadow-sm transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {acao} <ArrowRight aria-hidden className="h-4 w-4" />
        </button>
      </div>
      {onFechar && (
        <button
          type="button"
          onClick={onFechar}
          aria-label={`Fechar aviso: ${titulo}`}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-card hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X aria-hidden className="h-4 w-4" />
        </button>
      )}
    </aside>
  );
}

export { CabecalhoDaPagina, SeletorDePeriodo, BotaoDividido, BannerPromocional, periodosPadrao, destacar };
