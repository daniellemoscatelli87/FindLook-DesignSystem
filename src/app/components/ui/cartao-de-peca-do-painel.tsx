"use client";

import * as React from "react";
import { Shirt } from "lucide-react";
import { cn } from "./utils";

/**
 * Cartão de peça do painel (28/11/2026): a peça como a loja a vê no painel (Peças do lojista, ficha da loja parceira na
 * área administrativa). O ProductCard é da vitrine (favorito, "Ver peça", estoque para quem compra); este é de quem
 * cuida da peça:
 * - foto 4:5 (ou o ícone, sem foto) com a situação por cima (um ChipDeEstado do DS, numa base branca para ficar legível
 *   sobre qualquer foto);
 * - nome em até 2 linhas; preço (com promoção: o antigo riscado e o novo no rosa do texto, "em promoção" para leitores
 *   de tela; sem preço, o texto `semPreco`); linha de detalhes (os tamanhos), em 1 linha;
 * - rodapé opcional com indicadores (ícone + número); o texto completo de cada um ("3 pessoas pediram contato") vai no
 *   nome do cartão, para leitores de tela (o nome é o próprio conteúdo, na ordem em que aparece: "Editar <nome>, situação,
 *   preço, tamanhos. 3 pessoas pediram contato");
 * - com `onAbrir` ou `href`, o cartão inteiro é um botão ou um link (o nome começa por "Editar"), com
 *   hover de borda mais forte, sombra pequena e subida de 2 px; sem, é só de leitura (a ficha da parceira);
 * - `destaque` = sucesso depois de salvar: borda verde e anel verde por um momento (quem usa limpa a prop);
 * - `vendida`: a foto fica esmaecida e meio cinza (a situação "Vendida" continua no chip, em texto).
 * Toque: o cartão inteiro é o alvo (bem maior que 44 px). Movimento: hover e toque com transições curtas dos tokens;
 * com "menos movimento", sem subir nem encolher.
 */

export type IndicadorDaPeca = {
  icone: React.ReactNode;
  valor: number;
  /** Texto completo, lido por leitores de tela ("3 pessoas pediram contato"). */
  rotulo: string;
};

export type CartaoDePecaDoPainelProps = {
  titulo: string;
  foto?: string | null;
  /** Situação da peça: um ChipDeEstado do DS ("Publicada", "Pausada", "Vendida"). */
  situacao?: React.ReactNode;
  /** Preço já escrito ("R$ 89,90"). */
  preco?: string | null;
  /** Preço com desconto, quando a promoção está valendo: o `preco` aparece riscado. */
  precoPromocional?: string | null;
  /** Texto quando não há preço (padrão "Sem preço"). */
  semPreco?: string;
  /** Linha de detalhes, como os tamanhos ("P, M, G"). */
  detalhes?: string;
  indicadores?: IndicadorDaPeca[];
  vendida?: boolean;
  /** Destaque de sucesso (acabou de salvar). */
  destaque?: boolean;
  /** Abre a peça (o cartão vira botão). */
  onAbrir?: () => void;
  /** Ou leva à peça (o cartão vira link). */
  href?: string;
  comoLink?: React.ElementType;
  /** Começo do nome do cartão quando é botão ou link (padrão "Editar"). */
  acao?: string;
  /** Ícone sem foto (padrão: camiseta). */
  iconeSemFoto?: React.ReactNode;
  className?: string;
};

export function CartaoDePecaDoPainel({
  titulo, foto, situacao, preco, precoPromocional, semPreco = "Sem preço", detalhes, indicadores = [], vendida = false, destaque = false,
  onAbrir, href, comoLink, acao = "Editar", iconeSemFoto, className,
}: CartaoDePecaDoPainelProps) {
  const comNumero = indicadores.filter((i) => i.valor > 0);
  const interativo = !!(onAbrir || href);
  const corpo = (
    <>
      <span className="flex flex-1 flex-col gap-0.5 p-3">
        <span className="line-clamp-2 text-body-sm font-semibold leading-snug text-foreground">{interativo && <span className="sr-only">{acao} </span>}{titulo}</span>
        {preco && precoPromocional ? (
          <span className="flex flex-wrap items-baseline gap-x-1.5" data-preco-em-promocao>
            <s className="text-label text-muted-foreground">{preco}</s>
            <span className="text-body font-bold text-primary-text">{precoPromocional}</span>
            <span className="sr-only">em promoção</span>
          </span>
        ) : (
          <span className={cn("text-body font-bold", preco ? "text-foreground" : "text-muted-foreground")}>{preco || semPreco}</span>
        )}
        {detalhes && <span className="line-clamp-1 text-label text-muted-foreground">{detalhes}</span>}
        {comNumero.length > 0 && (
          <span aria-hidden className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-1.5 text-label font-medium tabular-nums text-muted-foreground" data-indicadores-da-peca>
            {comNumero.map((i) => (
              <span key={i.rotulo} title={i.rotulo} className="inline-flex items-center gap-1 [&_svg]:size-3.5 [&_svg]:shrink-0">
                {i.icone} {i.valor}
              </span>
            ))}
          </span>
        )}
        {comNumero.length > 0 && <span className="sr-only">. {comNumero.map((i) => i.rotulo).join(" · ")}</span>}
      </span>
      {/* A foto vem depois do texto no HTML (o nome do cartão começa por "Editar <nome>") e aparece em cima (order-first). */}
      <span className="relative order-first block aspect-[4/5] w-full bg-muted">
        {foto ? (
          <img src={foto} alt="" loading="lazy" className={cn("size-full object-cover transition-[opacity,filter] duration-[var(--duration-normal)]", vendida && "opacity-70 grayscale-[40%]")} />
        ) : (
          <span className="flex size-full items-center justify-center text-muted-foreground [&_svg]:size-8">{iconeSemFoto ?? <Shirt aria-hidden />}</span>
        )}
        {situacao && <span className="absolute left-2 top-2 rounded-full bg-card shadow-[var(--shadow-xs)]">{situacao}</span>}
      </span>
    </>
  );
  const caixa = cn(
    "flex h-full w-full flex-col overflow-hidden rounded-lg border bg-card text-left transition-[border-color,box-shadow,transform] duration-[var(--duration-fast)]",
    destaque ? "border-success ring-2 ring-success/40" : "border-border",
    interativo && "cursor-pointer hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-sm)] motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    className,
  );
  if (href) {
    const Link = comoLink ?? "a";
    return <Link href={href} data-slot="cartao-de-peca-do-painel" data-vendida={vendida || undefined} className={caixa}>{corpo}</Link>;
  }
  if (onAbrir) {
    return <button type="button" onClick={onAbrir} data-slot="cartao-de-peca-do-painel" data-vendida={vendida || undefined} className={cn(caixa, "font-normal")}>{corpo}</button>;
  }
  return <article aria-label={titulo} data-slot="cartao-de-peca-do-painel" data-vendida={vendida || undefined} className={caixa}>{corpo}</article>;
}
