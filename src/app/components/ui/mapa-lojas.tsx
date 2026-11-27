"use client";

import * as React from "react";
import { ArrowRight, Info, MapPin, Store, X } from "lucide-react";
import { cn } from "./utils";
import { ItemDeLoja } from "./card-loja";

/**
 * Mapa de lojas (FindLook): o bloco "Lojas e brechós no mapa", com o mapa, a lista "Lojas no mapa" e o convite
 * "Sua loja não está no mapa?".
 *
 * MapaDeLojas: moldura e lista. O mapa entra por `mapa` (slot): no produto, o mapa interativo (Leaflet com
 * OpenStreetMap, carregado só no navegador); no design system, o MapaIlustrativo. O design system não traz
 * biblioteca de mapas.
 * MapaIlustrativo: desenho estático com ruas e pinos, só para demonstração; sempre com o selo "Mapa ilustrativo".
 * Os pinos são botões (teclado e leitor de tela) e selecionam a loja.
 * ConviteAoMapa: chamada discreta para lojistas que ainda não estão no mapa.
 */

const foco = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

type LojaNoMapa = { id: string; nome: string; estilo?: string; bairro?: string };

type MapaDeLojasProps = {
  /** O mapa: um componente de mapa interativo ou o MapaIlustrativo. */
  mapa: React.ReactNode;
  lojas: LojaNoMapa[];
  selecionada?: string | null;
  onSelecionar?: (id: string) => void;
  rotuloLista?: string;
  /** Aviso acima do bloco (por exemplo, quando as lojas são de exemplo). */
  aviso?: React.ReactNode;
  /** Abaixo da lista: normalmente o ConviteAoMapa. */
  convite?: React.ReactNode;
  className?: string;
};

function MapaDeLojas({ mapa, lojas, selecionada = null, onSelecionar, rotuloLista = "Lojas no mapa", aviso, convite, className }: MapaDeLojasProps) {
  const id = React.useId();
  return (
    <div data-slot="mapa-de-lojas" className={cn("min-w-0", className)}>
      {aviso && (
        <p className="mb-4 flex items-start gap-2 rounded-md border border-warning/30 bg-warning-muted px-3 py-2 text-body-sm text-foreground">
          <Info className="mt-1 size-4 shrink-0 text-warning-text" aria-hidden />
          <span>{aviso}</span>
        </p>
      )}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="isolate min-w-0 overflow-hidden rounded-xl border border-border bg-card">
          <div className="h-[22rem] sm:h-[28rem] lg:h-full lg:min-h-[28rem]">{mapa}</div>
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <div className="rounded-xl border border-border bg-card p-3">
            <p id={`${id}-lista`} className="px-2 pt-1 pb-2 text-label leading-4 font-semibold uppercase tracking-[0.12em] text-muted-foreground">{rotuloLista}</p>
            <ul aria-labelledby={`${id}-lista`} className="max-h-[15rem] space-y-1 overflow-y-auto overscroll-contain lg:max-h-[17rem]">
              {lojas.map((l) => (
                <li key={l.id}>
                  <ItemDeLoja nome={l.nome} estilo={l.estilo} bairro={l.bairro} selecionada={selecionada === l.id} onSelecionar={() => onSelecionar?.(l.id)} />
                </li>
              ))}
            </ul>
          </div>
          {convite}
        </div>
      </div>
    </div>
  );
}

type PinoIlustrativo = LojaNoMapa & {
  /** Posição no desenho, em % da largura (x) e da altura (y). */
  x: number;
  y: number;
};

type MapaIlustrativoProps = {
  pinos: PinoIlustrativo[];
  selecionada?: string | null;
  onSelecionar?: (id: string) => void;
  /** Nome da região do mapa para leitores de tela. */
  rotulo?: string;
  selo?: string;
  /** Conteúdo mostrado junto ao pino selecionado (por exemplo, um CardDeLoja). */
  detalhe?: React.ReactNode;
  /** Mostra o botão de fechar o cartão (no celular, o cartão cobre parte do mapa). */
  onFecharDetalhe?: () => void;
  className?: string;
};

function MapaIlustrativo({ pinos, selecionada = null, onSelecionar, rotulo = "Mapa ilustrativo com as lojas de exemplo", selo = "Mapa ilustrativo", detalhe, onFecharDetalhe, className }: MapaIlustrativoProps) {
  const atual = pinos.find((p) => p.id === selecionada);
  return (
    <div data-slot="mapa-ilustrativo" role="region" aria-label={rotulo} className={cn("relative h-full w-full overflow-hidden bg-muted", className)}>
      <svg aria-hidden className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g fill="none" stroke="var(--card)" strokeLinecap="round">
          <path d="M-5 30 C 20 26, 40 38, 105 32" strokeWidth="2.4" />
          <path d="M-5 70 C 30 62, 55 78, 105 66" strokeWidth="2.4" />
          <path d="M28 -5 C 32 30, 22 60, 30 105" strokeWidth="2.4" />
          <path d="M70 -5 C 64 35, 78 62, 68 105" strokeWidth="2.4" />
          <path d="M-5 50 L 105 46" strokeWidth="1.2" />
          <path d="M48 -5 L 52 105" strokeWidth="1.2" />
          <path d="M10 -5 L 90 105" strokeWidth="0.8" />
        </g>
        <ellipse cx="82" cy="20" rx="10" ry="7" fill="var(--success-muted)" />
        <ellipse cx="16" cy="84" rx="9" ry="6" fill="var(--success-muted)" />
      </svg>
      <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-1 text-caption font-semibold text-foreground">
        <Info className="size-3 text-muted-foreground" aria-hidden /> {selo}
      </span>
      <ul className="absolute inset-0">
        {pinos.map((p) => {
          const ativo = p.id === selecionada;
          return (
            <li key={p.id} className="absolute" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
              <button
                type="button"
                onClick={() => onSelecionar?.(p.id)}
                aria-pressed={ativo}
                aria-label={[p.nome, p.estilo, p.bairro].filter(Boolean).join(", ")}
                className={cn(
                  "-translate-x-1/2 -translate-y-full rounded-full p-1 text-primary transition-transform duration-200 hover:scale-110 motion-reduce:transition-none",
                  ativo && "scale-125",
                  foco,
                )}
              >
                <MapPin className={cn("size-7 drop-shadow-sm", ativo ? "fill-primary text-primary-foreground" : "fill-card")} strokeWidth={ativo ? 2 : 2.25} aria-hidden />
              </button>
            </li>
          );
        })}
      </ul>
      {atual && detalhe && (
        <div className="absolute inset-x-3 bottom-3 z-10 sm:left-auto sm:w-72">
          {detalhe}
          {onFecharDetalhe && (
            <button
              type="button"
              onClick={onFecharDetalhe}
              aria-label={`Fechar o cartão de ${atual.nome}`}
              className={cn("absolute top-2 right-2 flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground", foco)}
            >
              <X className="size-4" aria-hidden />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

type ConviteAoMapaProps = {
  titulo?: string;
  texto?: string;
  link?: { rotulo: string; href?: string; onClick?: () => void };
  className?: string;
};

function ConviteAoMapa({
  titulo = "Sua loja não está no mapa?",
  texto = "Faça parte da rede de parceiros e apareça para quem procura o que você vende.",
  link = { rotulo: "Conhecer a FindLook para lojistas", href: "#" },
  className,
}: ConviteAoMapaProps) {
  return (
    <div data-slot="convite-ao-mapa" className={cn("rounded-xl border border-dashed border-primary/30 bg-card p-4", className)}>
      <p className="flex items-center gap-2 text-body-sm leading-5 font-bold text-foreground">
        <Store className="size-4 shrink-0 text-primary-text" aria-hidden /> {titulo}
      </p>
      <p className="mt-1 text-body-sm leading-5 text-muted-foreground">{texto}</p>
      {link && (
        <a href={link.href ?? "#"} onClick={link.onClick} className={cn("mt-2 inline-flex items-center gap-1 rounded-sm toque:min-h-11 text-body-sm leading-5 font-semibold text-primary-text underline-offset-4 hover:underline", foco)}>
          {link.rotulo} <ArrowRight className="size-4" aria-hidden />
        </a>
      )}
    </div>
  );
}

export { MapaDeLojas, MapaIlustrativo, ConviteAoMapa };
export type { MapaDeLojasProps, MapaIlustrativoProps, ConviteAoMapaProps, LojaNoMapa, PinoIlustrativo };
