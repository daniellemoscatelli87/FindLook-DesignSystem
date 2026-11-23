import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Clock, Instagram, MapPin, MessageCircle, X } from "lucide-react";
import { cn } from "./utils";

/**
 * Vitrine da loja (FindLook, 23/11/2026): a página pública da loja, com link próprio para a loja divulgar.
 *
 * CabecalhoDaVitrine: capa (foto da loja ou, sem ela, o degradê da marca), logo sobre a capa (ou as iniciais),
 * nome, descrição, etiquetas e as informações da loja: bairro ou endereço (o endereço só quando a loja escolhe mostrar),
 * horário e Instagram. Ícone sempre com texto.
 * BarraDeSelecao: quando a pessoa marca peças da mesma loja (ProductCard com selecao), a barra sobe da base da tela com
 * quantas foram marcadas, "Limpar" e a ação principal ("Tenho interesse"). Respeita a área segura e "menos movimento".
 */

const foco = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export type CabecalhoDaVitrineProps = {
  nome: string;
  descricao?: string | null;
  /** Foto de capa (paisagem). Sem ela, o degradê da marca. */
  capa?: string | null;
  logo?: string | null;
  etiquetas?: string[];
  bairro?: string | null;
  /** Endereço comercial: só quando a loja escolhe mostrar. */
  endereco?: string | null;
  horario?: string | null;
  /** Nome do perfil, sem @. */
  instagram?: string | null;
  /** Ações à direita do nome (por exemplo, um selo de prévia). */
  acoes?: React.ReactNode;
  /** Nível do título com o nome da loja: 1 na página da vitrine; 2 ou 3 quando o cabeçalho é uma prévia dentro de outra página. */
  nivel?: 1 | 2 | 3;
  className?: string;
};

const iniciais = (nome: string) =>
  nome.trim().split(/\s+/).filter((p) => p.length > 2 || /^[A-ZÀ-Ú]/.test(p)).slice(0, 2).map((p) => p[0]!.toUpperCase()).join("") || nome.slice(0, 1).toUpperCase();

export function CabecalhoDaVitrine({ nome, descricao, capa, logo, etiquetas = [], bairro, endereco, horario, instagram, acoes, nivel = 1, className }: CabecalhoDaVitrineProps) {
  const Titulo = `h${nivel}` as "h1" | "h2" | "h3";
  const onde = endereco ? [endereco, bairro].filter(Boolean).join(" · ") : bairro;
  return (
    <header data-slot="cabecalho-da-vitrine" className={cn("overflow-hidden rounded-lg border border-border bg-card", className)}>
      <div className="relative aspect-[3/1] min-h-28 w-full bg-[linear-gradient(120deg,var(--pink-100,var(--primary-muted)),var(--pink-300,var(--primary))_55%,var(--pink-500,var(--primary)))] sm:aspect-[4/1] lg:aspect-[5/1]">
        {capa && <img src={capa} alt="" className="absolute inset-0 h-full w-full object-cover" />}
      </div>
      <div className="px-4 pb-5 sm:px-6 sm:pb-6">
        <div className="-mt-10 flex flex-wrap items-end justify-between gap-3 sm:-mt-12">
          <span className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-card bg-[var(--primary-muted)] shadow-[var(--shadow-sm)] sm:h-24 sm:w-24">
            {logo ? (
              <img src={logo} alt={`Logo de ${nome}`} className="h-full w-full object-cover" />
            ) : (
              <span aria-hidden className="text-[1.5rem] font-extrabold text-[var(--primary-text,var(--primary))]" style={{ fontFamily: "var(--font-display, var(--font-sans))" }}>{iniciais(nome)}</span>
            )}
          </span>
          {acoes && <div className="flex flex-wrap items-center gap-2 pb-1">{acoes}</div>}
        </div>
        <Titulo className="mt-3 text-[1.5rem] font-extrabold leading-tight tracking-[-0.02em] text-foreground sm:text-[1.875rem]" style={{ fontFamily: "var(--font-display, var(--font-sans))" }}>{nome}</Titulo>
        {descricao && <p className="mt-1.5 max-w-2xl text-[0.9375rem] leading-relaxed text-muted-foreground">{descricao}</p>}
        {etiquetas.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Sobre a loja">
            {etiquetas.map((e) => (
              <li key={e} className="inline-flex h-7 items-center rounded-full bg-muted px-3 text-[0.75rem] font-semibold text-foreground">{e}</li>
            ))}
          </ul>
        )}
        {(onde || horario || instagram) && (
          <ul className="mt-4 flex flex-col gap-2 text-[0.875rem] text-foreground sm:flex-row sm:flex-wrap sm:gap-x-5">
            {onde && <li className="flex items-start gap-1.5"><MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary-text,var(--primary))]" /><span><span className="sr-only">Onde: </span>{onde}</span></li>}
            {horario && <li className="flex items-start gap-1.5"><Clock aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" /><span><span className="sr-only">Horário: </span>{horario}</span></li>}
            {instagram && (
              <li className="flex items-start gap-1.5">
                <Instagram aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" className={cn("rounded-[4px] font-semibold text-foreground underline-offset-2 hover:underline", foco)}>
                  @{instagram}<span className="sr-only"> (abre o Instagram em outra aba)</span>
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
    </header>
  );
}

export type BarraDeSelecaoProps = {
  quantidade: number;
  /** "1 peça marcada" / "3 peças marcadas". */
  rotulo?: (n: number) => string;
  acao: { rotulo: string; onClick: () => void; icone?: React.ReactNode; carregando?: boolean };
  onLimpar: () => void;
  className?: string;
};

export function BarraDeSelecao({ quantidade, rotulo = (n) => (n === 1 ? "1 peça marcada" : `${n} peças marcadas`), acao, onLimpar, className }: BarraDeSelecaoProps) {
  const reduzir = useReducedMotion();
  return (
    <AnimatePresence>
      {quantidade > 0 && (
        <motion.div
          key="barra-de-selecao"
          data-slot="barra-de-selecao"
          role="region"
          aria-label="Peças marcadas"
          initial={reduzir ? false : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduzir ? { opacity: 0 } : { y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={cn("fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3", className)}
        >
          <div className="mx-auto flex max-w-2xl items-center gap-2 rounded-full border border-border bg-card p-2 pl-4 shadow-[var(--shadow-lg)]">
            <p className="min-w-0 flex-1 text-[0.8125rem] font-semibold leading-tight text-foreground sm:text-[0.875rem]" aria-live="polite">{rotulo(quantidade)}</p>
            {/* No celular, "Limpar" fica só com o ícone (o nome continua para leitores de tela), para a contagem caber inteira. */}
            <button type="button" onClick={onLimpar} className={cn("inline-flex h-10 min-w-10 shrink-0 items-center justify-center gap-1 rounded-full px-2.5 text-[0.8125rem] font-semibold text-muted-foreground hover:bg-muted hover:text-foreground sm:px-3", foco)}>
              <X aria-hidden className="h-4 w-4" /> <span className="sr-only sm:not-sr-only">Limpar</span>
            </button>
            <button
              type="button"
              onClick={acao.onClick}
              disabled={acao.carregando}
              aria-busy={acao.carregando || undefined}
              className={cn("inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-primary px-4 text-[0.9375rem] font-semibold text-primary-foreground transition-colors hover:bg-[var(--primary-hover)] disabled:opacity-70 sm:px-5", foco)}
            >
              {acao.icone ?? <MessageCircle aria-hidden className="h-4 w-4" />} {acao.rotulo}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
