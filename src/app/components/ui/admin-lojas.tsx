import * as React from "react";
import { ArrowLeft, Globe, MessageCircle, Phone, Star } from "lucide-react";
import { cn } from "./utils";
import { Checkbox } from "./checkbox";
import { CabecalhoDaPagina } from "./painel-cabecalho";
import { Instagram } from "./icones-preservados";
import { ChipDeEtapa, type EtapaDaLoja } from "./admin-ativacao";

/**
 * Lojas da área administrativa (FindLook)
 *
 * LinhaDeLoja: uma loja da lista "Lojas mapeadas". No celular, em bloco (nome, tipo · bairro, etapa, etiquetas,
 * contatos e nota); de 48rem em diante, numa linha só. Seleção por caixa de marcar, ações à direita (slot).
 * CabecalhoDaFicha: topo da ficha da loja: voltar, nome, tipo · bairro (regional) · shopping, ações, etapa e etiquetas.
 * EtiquetaDaLoja, ContatosDaLoja e NotaNoGoogle: peças pequenas usadas nas duas.
 */

const foco = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/* ── Etiqueta ────────────────────────────────────────────────────── */
type TomDaEtiqueta = "neutro" | "primario" | "atencao" | "erro";
const TONS: Record<TomDaEtiqueta, string> = {
  neutro: "border-border bg-muted/40 text-foreground",
  primario: "border-primary/30 bg-primary-muted text-primary-text",
  atencao: "border-warning/40 bg-warning-muted text-foreground",
  erro: "border-error/30 bg-error-muted text-foreground",
};

function EtiquetaDaLoja({ tom = "neutro", icone, children, titulo }: { tom?: TomDaEtiqueta; icone?: React.ReactNode; children: React.ReactNode; titulo?: string }) {
  return (
    <span data-slot="etiqueta-da-loja" title={titulo} className={cn("inline-flex items-center gap-1 whitespace-nowrap rounded-sm border px-1.5 py-0.5 text-[0.6875rem] font-semibold [&>svg]:size-3", TONS[tom])}>
      {icone}
      {children}
    </span>
  );
}

/* ── Contatos e nota ─────────────────────────────────────────────── */
type ContatosDaLojaProps = { whatsapp?: string; telefone?: string; instagram?: string; site?: string; semContato?: string };

function ContatosDaLoja({ whatsapp, telefone, instagram, site, semContato = "Sem contato" }: ContatosDaLojaProps) {
  const itens = [
    whatsapp && { href: `https://wa.me/${whatsapp.replace(/\D/g, "").replace(/^(?!55)/, "55")}`, rotulo: `WhatsApp ${whatsapp}`, Icone: MessageCircle },
    telefone && { href: `tel:${telefone.replace(/[^\d+]/g, "")}`, rotulo: `Telefone ${telefone}`, Icone: Phone },
    instagram && { href: `https://www.instagram.com/${instagram.replace(/^@/, "")}/`, rotulo: `Instagram ${instagram}`, Icone: Instagram },
    site && { href: /^https?:\/\//i.test(site) ? site : `https://${site}`, rotulo: `Site ${site}`, Icone: Globe },
  ].filter(Boolean) as { href: string; rotulo: string; Icone: React.ElementType }[];
  if (itens.length === 0) return <span className="text-[0.75rem] text-muted-foreground">{semContato}</span>;
  return (
    <span data-slot="contatos-da-loja" className="flex items-center gap-0.5">
      {itens.map(({ href, rotulo, Icone }) => (
        <a
          key={rotulo}
          href={href}
          target={href.startsWith("tel:") ? undefined : "_blank"}
          rel="noopener noreferrer"
          title={rotulo}
          aria-label={href.startsWith("tel:") ? rotulo : `${rotulo} (abre em nova aba)`}
          className={cn("flex size-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary-text", foco)}
        >
          <Icone aria-hidden className="size-4" />
        </a>
      ))}
    </span>
  );
}

function NotaNoGoogle({ nota, avaliacoes, semNota = "Sem nota" }: { nota?: number | null; avaliacoes?: number | null; semNota?: string }) {
  if (nota === null || nota === undefined) return <span className="text-[0.75rem] text-muted-foreground">{semNota}</span>;
  return (
    <span data-slot="nota-no-google" className="inline-flex items-center gap-1 whitespace-nowrap text-[0.8125rem] text-foreground">
      <Star aria-hidden className="size-3.5 fill-warning text-warning" />
      <span className="font-semibold">{nota.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span>
      {avaliacoes !== null && avaliacoes !== undefined && <span className="text-muted-foreground">({avaliacoes.toLocaleString("pt-BR")})</span>}
      <span className="sr-only"> no Google</span>
    </span>
  );
}

/* ── Linha da lista ──────────────────────────────────────────────── */
type LinhaDeLojaProps = {
  nome: string;
  /** "Brechó · Batel · Shopping Exemplo" */
  detalhe?: string;
  href?: string;
  onAbrir?: () => void;
  etapa: EtapaDaLoja;
  /** Troca o chip de etapa por um seletor (por exemplo, um menu para mudar a etapa). */
  seletorDeEtapa?: React.ReactNode;
  etiquetas?: React.ReactNode;
  contatos?: ContatosDaLojaProps;
  nota?: number | null;
  avaliacoes?: number | null;
  selecionada?: boolean;
  onSelecionar?: (marcada: boolean) => void;
  /** Ações à direita (por exemplo, o menu da loja). */
  acoes?: React.ReactNode;
  arquivada?: boolean;
  className?: string;
};

function LinhaDeLoja({ nome, detalhe, href, onAbrir, etapa, seletorDeEtapa, etiquetas, contatos, nota, avaliacoes, selecionada = false, onSelecionar, acoes, arquivada = false, className }: LinhaDeLojaProps) {
  const nomeLink = cn("rounded-sm text-[0.9375rem] font-semibold text-foreground hover:text-primary-text hover:underline", foco);
  return (
    <li data-slot="linha-de-loja" className={cn("@container px-4 py-3 transition-colors", selecionada && "bg-primary-muted", arquivada && "text-muted-foreground", className)}>
      <div className="flex items-start gap-3 @min-[48rem]:items-center">
        {onSelecionar && <Checkbox aria-label={`Selecionar ${nome}`} checked={selecionada} onCheckedChange={(v) => onSelecionar(v === true)} className="mt-1 @min-[48rem]:mt-0" />}
        <div className="grid min-w-0 flex-1 gap-2 @min-[48rem]:grid-cols-[minmax(0,1.6fr)_auto_minmax(0,1fr)_auto] @min-[48rem]:items-center @min-[48rem]:gap-4">
          <div className="min-w-0">
            {href || onAbrir ? (
              <a href={href ?? "#"} onClick={onAbrir} className={nomeLink}>{nome}</a>
            ) : (
              <p className="text-[0.9375rem] font-semibold text-foreground">{nome}</p>
            )}
            {detalhe && <p className="truncate text-[0.8125rem] text-muted-foreground">{detalhe}</p>}
            {etiquetas && <div className="mt-1 flex flex-wrap gap-1 empty:hidden">{etiquetas}</div>}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 @min-[48rem]:contents">
            <div className="flex flex-wrap items-center gap-1.5">{seletorDeEtapa ?? <ChipDeEtapa etapa={etapa} />}</div>
            {contatos && <div className="min-w-0"><ContatosDaLoja {...contatos} /></div>}
            <div><NotaNoGoogle nota={nota} avaliacoes={avaliacoes} /></div>
          </div>
        </div>
        {acoes && <div className="shrink-0">{acoes}</div>}
      </div>
    </li>
  );
}

/* ── Cabeçalho da ficha ──────────────────────────────────────────── */
type CabecalhoDaFichaProps = {
  nome: string;
  /** "Brechó · Batel (Regional Matriz) · Shopping Exemplo" */
  descricao?: string;
  voltar?: { rotulo: string; href?: string; onClick?: () => void };
  etapa?: EtapaDaLoja;
  etiquetas?: React.ReactNode;
  acoes?: React.ReactNode;
  /** Avisos logo abaixo (por exemplo, loja arquivada ou tipo a conferir). */
  avisos?: React.ReactNode;
  nivel?: 1 | 2 | 3;
  className?: string;
};

function CabecalhoDaFicha({ nome, descricao, voltar, etapa, etiquetas, acoes, avisos, nivel = 1, className }: CabecalhoDaFichaProps) {
  return (
    <div data-slot="cabecalho-da-ficha" className={cn("@container min-w-0 space-y-4", className)}>
      {voltar && (
        <a href={voltar.href ?? "#"} onClick={voltar.onClick} className={cn("inline-flex items-center gap-1.5 rounded-sm text-[0.875rem] font-semibold text-foreground hover:underline", foco)}>
          <ArrowLeft aria-hidden className="size-4" /> {voltar.rotulo}
        </a>
      )}
      <CabecalhoDaPagina titulo={nome} descricao={descricao} acoes={acoes} nivel={nivel} />
      {(etapa || etiquetas) && (
        <div className="flex flex-wrap items-center gap-1.5">
          {etapa && <ChipDeEtapa etapa={etapa} />}
          {etiquetas}
        </div>
      )}
      {avisos}
    </div>
  );
}

export { LinhaDeLoja, CabecalhoDaFicha, EtiquetaDaLoja, ContatosDaLoja, NotaNoGoogle };
export type { LinhaDeLojaProps, CabecalhoDaFichaProps, ContatosDaLojaProps, TomDaEtiqueta };
