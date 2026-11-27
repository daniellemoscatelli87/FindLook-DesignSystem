import * as React from "react";
import { Check, Info, MapPin } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";

/**
 * Card de loja (FindLook): o cartão que abre ao tocar num pino do mapa e o item da lista "Lojas no mapa".
 *
 * CardDeLoja: nome, estilo · bairro, selo "Exemplo fictício" (quando a loja é de exemplo) e a ação "Ver perfil".
 * A ação pode estar indisponível: o motivo aparece em texto, ligado ao botão por aria-describedby.
 * ItemDeLoja: linha da lista ao lado do mapa; tocar seleciona a loja (aria-pressed) e leva o mapa até ela.
 * A loja selecionada ganha fundo rosa claro e um check (o estado não depende só da cor).
 * Numa GradeDeCards, o CardDeLoja estica até a altura da linha e a ação desce para a base (27/11/2026).
 */

const foco = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

type AcaoDaLoja = {
  rotulo: string;
  href?: string;
  onClick?: () => void;
  /** Motivo de a ação ainda não estar disponível (por exemplo, "Perfil disponível quando a loja entrar na rede"). */
  indisponivel?: string;
};

type CardDeLojaProps = {
  nome: string;
  estilo?: string;
  bairro?: string;
  /** Mostra o selo "Exemplo fictício": use em toda loja que não é real. */
  exemplo?: boolean;
  rotuloExemplo?: string;
  acao?: AcaoDaLoja;
  /** Nível do título (padrão h3). */
  nivel?: 2 | 3 | 4;
  className?: string;
};

function CardDeLoja({ nome, estilo, bairro, exemplo = false, rotuloExemplo = "Exemplo fictício", acao, nivel = 3, className }: CardDeLojaProps) {
  const id = React.useId();
  const Titulo = `h${nivel}` as "h2" | "h3" | "h4";
  const detalhe = [estilo, bairro].filter(Boolean).join(" · ");
  return (
    <article data-slot="card-de-loja" aria-labelledby={`${id}-nome`} className={cn("flex w-full min-w-0 flex-col items-start rounded-lg border border-border bg-card p-4", className)}>
      <Titulo id={`${id}-nome`} className="text-[0.9375rem] font-bold text-foreground">{nome}</Titulo>
      {detalhe && (
        <p className="mt-0.5 flex items-start gap-1 text-[0.8125rem] text-muted-foreground">
          <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary-text" aria-hidden />
          {detalhe}
        </p>
      )}
      {exemplo && (
        <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-warning/40 bg-warning-muted px-2 py-0.5 text-[0.6875rem] font-semibold text-foreground">
          <Info className="size-3 text-warning-text" aria-hidden /> {rotuloExemplo}
        </span>
      )}
      {acao && (
        <div className="mt-auto self-stretch pt-3">
          {acao.indisponivel ? (
            <>
              <Button type="button" aria-disabled="true" aria-describedby={`${id}-motivo`} className="w-full cursor-not-allowed opacity-60" onClick={(e) => e.preventDefault()}>
                {acao.rotulo}
              </Button>
              <p id={`${id}-motivo`} className="mt-1.5 text-[0.75rem] text-muted-foreground">{acao.indisponivel}</p>
            </>
          ) : acao.href ? (
            <Button asChild className="w-full">
              <a href={acao.href} onClick={acao.onClick}>{acao.rotulo}</a>
            </Button>
          ) : (
            <Button type="button" className="w-full" onClick={acao.onClick}>{acao.rotulo}</Button>
          )}
        </div>
      )}
    </article>
  );
}

type ItemDeLojaProps = {
  nome: string;
  estilo?: string;
  bairro?: string;
  selecionada?: boolean;
  onSelecionar?: () => void;
  className?: string;
};

function ItemDeLoja({ nome, estilo, bairro, selecionada = false, onSelecionar, className }: ItemDeLojaProps) {
  const detalhe = [estilo, bairro].filter(Boolean).join(" · ");
  return (
    <button
      type="button"
      data-slot="item-de-loja"
      onClick={onSelecionar}
      aria-pressed={selecionada}
      className={cn(
        "flex w-full min-w-0 items-center gap-3 rounded-sm px-2 py-2 text-left transition-colors hover:bg-muted aria-pressed:bg-primary-muted",
        foco,
        className,
      )}
    >
      <MapPin className={cn("size-4 shrink-0 text-primary-text", selecionada && "fill-primary-muted")} aria-hidden />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-foreground">{nome}</span>
        {detalhe && <span className="block truncate text-xs text-muted-foreground">{detalhe}</span>}
      </span>
      {selecionada && <Check className="size-4 shrink-0 text-primary-text" aria-hidden />}
    </button>
  );
}

export { CardDeLoja, ItemDeLoja };
export type { CardDeLojaProps, ItemDeLojaProps, AcaoDaLoja };
