"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Clock, Flag, Gauge, Star } from "lucide-react";
import { cn } from "./utils";
import { Badge } from "./badge";
import { Selo } from "./selo";
import { CardComCabecalho, Explicacao, IconeComBase, ProgressoRotulado, superficieDoCard } from "./painel-dados";
import { MarcaFind } from "./marca-find";

/*
 * FindScore e FindStar (especificação da dona do produto, 24/11/2026), montados com os componentes do DS:
 * CardComCabecalho, CardIndicador (critérios), IconeComBase, ProgressoRotulado, Badge, Selo e MarcaFind.
 *
 * FindScore: desempenho da loja de 0 a 100, em 5 faixas de amplitudes diferentes. O termômetro (único elemento novo)
 * desenha as faixas proporcionais à pontuação: rosa (A melhorar), laranja (Regular), amarelo (Bom), azul (Destaque) e
 * verde (Excelência), pelos tokens --findscore-1..5. Só a faixa atual fica em cor cheia e o nome dela vem sempre escrito.
 * A tela mostra o número arredondado para baixo, para nunca mostrar 95 a quem ainda não chegou a Excelência.
 *
 * FindStar: reconhecimento máximo, só por mérito. O selo usa o padrão de ícone com base rosa (foco) e o Selo do DS.
 * Os componentes só apresentam: o cálculo oficial, a elegibilidade e a revisão mensal ficam no backend do produto.
 */

/* ── Faixas ─────────────────────────────────────────────────── */
export const FAIXAS_FINDSCORE = [
  { id: "a_melhorar", nome: "A melhorar", min: 0, max: 40, tom: 1, descricao: "O desempenho da loja apresenta oportunidades importantes de melhoria." },
  { id: "regular", nome: "Regular", min: 40, max: 60, tom: 2, descricao: "O desempenho da loja apresenta inconsistências nos critérios avaliados." },
  { id: "bom", nome: "Bom", min: 60, max: 80, tom: 3, descricao: "A loja apresenta desempenho satisfatório nos critérios avaliados." },
  { id: "destaque", nome: "Destaque", min: 80, max: 95, tom: 4, descricao: "A loja apresenta desempenho elevado e consistência no atendimento aos consumidores." },
  { id: "excelencia", nome: "Excelência", min: 95, max: 100, tom: 5, descricao: "A loja apresenta desempenho excepcional nos critérios avaliados pela FindLook." },
] as const;

export type FaixaFindScore = (typeof FAIXAS_FINDSCORE)[number];

export const EM_AVALIACAO = {
  nome: "Em avaliação",
  descricao: "A loja ainda está construindo seu histórico de desempenho na FindLook.",
  descricaoPublica: "Esta loja ainda está construindo seu histórico de desempenho na FindLook.",
} as const;

export const TEXTO_FINDSCORE =
  "O FindScore considera o desempenho recente da loja no atendimento, na confirmação das peças e no cumprimento dos compromissos assumidos com os consumidores.";
export const TEXTO_FINDSTAR =
  "Esta loja conquistou o reconhecimento FindStar por atender aos critérios de excelência estabelecidos pela FindLook.";

const limitar = (v: number) => Math.min(100, Math.max(0, v));

/** Faixa pela pontuação real (com casas decimais). 100 fica em Excelência. */
export function faixaDoFindScore(valor: number): FaixaFindScore {
  const v = limitar(valor);
  return FAIXAS_FINDSCORE.find((f) => v >= f.min && (v < f.max || f.max === 100))!;
}

/** Número mostrado na tela: arredondado para baixo, coerente com a faixa (94,7 aparece 94, em Destaque). */
export const pontosExibidos = (valor: number) => Math.floor(limitar(valor));

const corDaFaixa = (tom: number) => `var(--findscore-${tom})`;

/* ── Classificação (Badge do DS com o ponto da faixa) ─────────── */
export function BadgeDeClassificacao({ valor, className }: { valor: number | null; className?: string }) {
  const faixa = valor == null ? null : faixaDoFindScore(valor);
  return (
    <Badge variant="outline" data-slot="badge-de-classificacao" className={cn("rounded-full px-2.5 font-semibold", className)}>
      {faixa ? <span aria-hidden className="size-2 rounded-full" style={{ background: corDaFaixa(faixa.tom) }} /> : <Clock aria-hidden />}
      {faixa ? faixa.nome : EM_AVALIACAO.nome}
    </Badge>
  );
}

/* ── Termômetro ─────────────────────────────────────────────── */
export function TermometroFindScore({ valor, compacto = false, className }: { valor: number | null; compacto?: boolean; className?: string }) {
  const reduzir = useReducedMotion();
  const v = valor == null ? null : limitar(valor);
  const faixa = v == null ? null : faixaDoFindScore(v);
  return (
    <div
      data-slot="termometro-findscore"
      role="meter"
      aria-label="FindScore"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={v == null ? undefined : pontosExibidos(v)}
      aria-valuetext={v == null ? `FindScore: ${EM_AVALIACAO.nome}` : `FindScore ${pontosExibidos(v)} de 100, ${faixa!.nome}`}
      className={cn("w-full", className)}
    >
      <div className="relative py-1">
        <div className={cn("flex w-full gap-[3px]", compacto ? "h-1.5" : "h-2")}>
          {FAIXAS_FINDSCORE.map((f) => (
            <span
              key={f.id}
              aria-hidden
              className="h-full rounded-full transition-opacity duration-[var(--duration-normal,250ms)]"
              style={{
                flexBasis: `${f.max - f.min}%`,
                background: v == null ? "var(--muted)" : corDaFaixa(f.tom),
                opacity: v == null || faixa?.id === f.id ? 1 : 0.22,
              }}
            />
          ))}
        </div>
        {v != null && (
          <motion.span
            aria-hidden
            className={cn("absolute top-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card shadow-[var(--shadow-sm)]", compacto ? "size-3" : "size-4")}
            style={{ background: corDaFaixa(faixa!.tom) }}
            initial={reduzir ? false : { left: "0%" }}
            animate={{ left: `${v}%` }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </div>
    </div>
  );
}

/* ── Resumo do FindScore ────────────────────────────────────── */
function Ajuda({ hrefEntender }: { hrefEntender?: string }) {
  return (
    <Explicacao termo="o FindScore">
      <p className="m-0">{TEXTO_FINDSCORE}</p>
      {hrefEntender && (
        <a href={hrefEntender} className="mt-2 inline-block font-semibold text-[var(--primary-text,var(--primary))] underline-offset-2 hover:underline">
          Entenda o FindScore
        </a>
      )}
    </Explicacao>
  );
}

type ResumoProps = {
  /** Pontuação real (0 a 100, com casas decimais). null = Em avaliação. */
  valor: number | null;
  /** "compacto": uma linha (cards, busca, peça, FindBox) · "completo": card do perfil e da vitrine da loja. */
  variante?: "compacto" | "completo";
  /** Período e data da atualização ("Últimos 90 dias · Atualizado em 24/11/2026"). */
  rodape?: string;
  hrefEntender?: string;
  className?: string;
};

export function FindScoreResumo({ valor, variante = "compacto", rodape, hrefEntender, className }: ResumoProps) {
  const faixa = valor == null ? null : faixaDoFindScore(valor);
  if (variante === "compacto") {
    return (
      <div data-slot="findscore-resumo" data-variante="compacto" className={cn("inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.875rem]", className)}>
        <MarcaFind sufixo="Score" />
        {valor == null ? null : (
          <span className="font-bold tabular-nums text-foreground">
            {pontosExibidos(valor)} <span className="font-medium text-muted-foreground">de 100</span>
          </span>
        )}
        <BadgeDeClassificacao valor={valor} />
        <Ajuda hrefEntender={hrefEntender} />
      </div>
    );
  }
  return (
    <CardComCabecalho
      icone={<Gauge />}
      titulo={<MarcaFind sufixo="Score" />}
      descricao={faixa ? faixa.descricao : EM_AVALIACAO.descricaoPublica}
      acao={<Ajuda hrefEntender={hrefEntender} />}
      cabecalho="simples"
      nivel={3}
      className={className}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="m-0 text-[1.625rem] font-bold leading-none tracking-[-0.025em] tabular-nums text-foreground">
          {valor == null ? <span className="text-[1.125rem]">{EM_AVALIACAO.nome}</span> : pontosExibidos(valor)}
          {valor != null && <span className="ml-1.5 text-[0.9375rem] font-semibold tracking-normal text-muted-foreground">de 100</span>}
        </p>
        {valor != null && <BadgeDeClassificacao valor={valor} />}
      </div>
      <TermometroFindScore valor={valor} className="mt-3" />
      {rodape && <p className="mt-2 text-[0.75rem] text-muted-foreground">{rodape}</p>}
    </CardComCabecalho>
  );
}

/* ── FindStar ───────────────────────────────────────────────── */
type SeloProps = {
  /** "compacto": cards e resultados de busca · "horizontal" e "vertical": perfil público e vitrine. */
  variante?: "compacto" | "horizontal" | "vertical";
  /** Validade do reconhecimento ("Válido até 31/12/2026"), quando a aplicação pedir. */
  validade?: string;
  className?: string;
};

export function SeloFindStar({ variante = "horizontal", validade, className }: SeloProps) {
  if (variante === "compacto") {
    return (
      <Badge variant="outline" data-slot="selo-findstar" data-variante="compacto" className={cn("h-6 rounded-full pl-1.5 pr-2.5 text-[0.8125rem]", className)} aria-label="FindStar">
        <Star aria-hidden className="!size-3.5 fill-primary text-primary" />
        <MarcaFind sufixo="Star" />
      </Badge>
    );
  }
  const vertical = variante === "vertical";
  return (
    <div
      data-slot="selo-findstar"
      data-variante={variante}
      role="img"
      aria-label={`FindStar: Excelência no atendimento. Reconhecimento FindLook${validade ? `. ${validade}` : ""}`}
      className={cn("inline-flex rounded-lg p-4", superficieDoCard, vertical ? "flex-col items-center gap-3 text-center" : "items-center gap-3.5", className)}
    >
      <IconeComBase tom="marca" tamanho="lg" redonda>
        <Star className="fill-current" />
      </IconeComBase>
      <div className={cn("flex min-w-0 flex-col gap-1", vertical && "items-center")}>
        <MarcaFind sufixo="Star" className="text-[1.25rem] leading-none" />
        <span className="text-[0.875rem] font-medium text-foreground">Excelência no atendimento</span>
        <Selo size="sm" className="mt-1">Reconhecimento FindLook</Selo>
        {validade && <span className="text-[0.75rem] text-muted-foreground">{validade}</span>}
      </div>
    </div>
  );
}

/* ── Progresso de elegibilidade (CardComCabecalho + ProgressoRotulado) ── */
export type RequisitoDeElegibilidade = { rotulo: string; atual: number; meta: number; unidade?: string };

export function ProgressoDeElegibilidade({ titulo, descricao, itens, icone = <Flag />, className }: {
  titulo: React.ReactNode;
  descricao?: React.ReactNode;
  itens: RequisitoDeElegibilidade[];
  icone?: React.ReactNode;
  className?: string;
}) {
  const cumpridos = itens.filter((r) => r.atual >= r.meta).length;
  return (
    <CardComCabecalho
      icone={icone}
      titulo={titulo}
      descricao={descricao}
      acao={<span className="text-[0.75rem] font-semibold tabular-nums text-muted-foreground">{cumpridos} de {itens.length} requisitos</span>}
      nivel={3}
      className={className}
    >
      <div className="space-y-4">
        {itens.map((r) => {
          const ok = r.atual >= r.meta;
          const fmt = (n: number) => n.toLocaleString("pt-BR");
          return (
            <ProgressoRotulado
              key={r.rotulo}
              rotulo={ok ? `${r.rotulo} · cumprido` : r.rotulo}
              pct={Math.min(100, (r.atual / r.meta) * 100)}
              texto={`${fmt(r.atual)} de ${fmt(r.meta)}${r.unidade ? ` ${r.unidade}` : ""}`}
            />
          );
        })}
      </div>
    </CardComCabecalho>
  );
}
