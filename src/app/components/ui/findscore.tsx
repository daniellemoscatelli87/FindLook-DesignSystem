"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, Clock, Info } from "lucide-react";
import { cn } from "./utils";
import { Explicacao } from "./painel-dados";

/*
 * FindScore e FindStar (especificação da dona do produto, 24/11/2026).
 *
 * FindScore: indicador de desempenho da loja (0 a 100), em 5 faixas de amplitudes diferentes. O termômetro desenha as
 * faixas proporcionais à pontuação (não 5 partes iguais) e marca a posição real da loja. As cores vêm da rampa
 * --findscore-1..5 (um só tom, verde); o nome da faixa sempre aparece escrito, porque a cor nunca é a única pista.
 * A tela mostra o número arredondado para baixo, para nunca mostrar 95 a quem ainda não chegou a Excelência.
 *
 * FindStar: reconhecimento máximo, conquistado só por mérito. O selo combina uma estrela com cantos arredondados (rosa da
 * marca) dentro de um anel fino (grafite), sem brilhos nem efeitos metálicos, para continuar legível em tamanho pequeno.
 *
 * Os componentes só apresentam: o cálculo oficial, a elegibilidade e a revisão mensal ficam no backend do produto.
 */

const display = "font-[family-name:var(--font-display,var(--font-sans))]";

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

const limitar = (v: number) => Math.min(100, Math.max(0, v));

/** Faixa pela pontuação real (com casas decimais). 100 fica em Excelência. */
export function faixaDoFindScore(valor: number): FaixaFindScore {
  const v = limitar(valor);
  return FAIXAS_FINDSCORE.find((f) => v >= f.min && (v < f.max || f.max === 100))!;
}

/** Número mostrado na tela: arredondado para baixo, coerente com a faixa (94,6 aparece 94, em Destaque). */
export const pontosExibidos = (valor: number) => Math.floor(limitar(valor));

const corDaFaixa = (tom: number) => `var(--findscore-${tom})`;

/* ── Badge de classificação ─────────────────────────────────── */
export function BadgeDeClassificacao({ valor, emAvaliacao = false, className }: { valor?: number | null; emAvaliacao?: boolean; className?: string }) {
  const faixa = !emAvaliacao && valor != null ? faixaDoFindScore(valor) : null;
  return (
    <span
      data-slot="badge-de-classificacao"
      className={cn("inline-flex h-6 items-center gap-1.5 rounded-full border border-border bg-card px-2.5 text-[0.75rem] font-semibold text-foreground", className)}
    >
      {faixa ? (
        <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: corDaFaixa(faixa.tom) }} />
      ) : (
        <Clock aria-hidden className="h-3 w-3 text-muted-foreground" />
      )}
      {faixa ? faixa.nome : EM_AVALIACAO.nome}
    </span>
  );
}

/* ── Termômetro ─────────────────────────────────────────────── */
export function TermometroFindScore({ valor, compacto = false, className }: { valor: number | null; compacto?: boolean; className?: string }) {
  const reduzir = useReducedMotion();
  const v = valor == null ? null : limitar(valor);
  const faixa = v == null ? null : faixaDoFindScore(v);
  const texto = v == null ? `FindScore: ${EM_AVALIACAO.nome}` : `FindScore ${pontosExibidos(v)} de 100, ${faixa!.nome}`;
  return (
    <div
      data-slot="termometro-findscore"
      role="meter"
      aria-label="FindScore"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={v == null ? undefined : pontosExibidos(v)}
      aria-valuetext={texto}
      className={cn("w-full", className)}
    >
      <div className={cn("relative", compacto ? "py-1" : "py-1.5")}>
        <div className={cn("flex w-full gap-0.5", compacto ? "h-1.5" : "h-2")}>
          {FAIXAS_FINDSCORE.map((f, i) => {
            const ativa = faixa?.id === f.id;
            return (
              <span
                key={f.id}
                aria-hidden
                className={cn("h-full transition-opacity", i === 0 && "rounded-l-full", i === FAIXAS_FINDSCORE.length - 1 && "rounded-r-full")}
                style={{
                  flexBasis: `${f.max - f.min}%`,
                  background: v == null ? "var(--muted)" : corDaFaixa(f.tom),
                  opacity: v == null || ativa ? 1 : 0.32,
                }}
              />
            );
          })}
        </div>
        {v != null && (
          <motion.span
            aria-hidden
            className={cn(
              "absolute top-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card shadow-[var(--shadow-sm)]",
              compacto ? "h-3 w-3" : "h-4 w-4",
            )}
            style={{ background: corDaFaixa(faixa!.tom) }}
            initial={reduzir ? false : { left: "0%" }}
            animate={{ left: `${v}%` }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </div>
      {!compacto && (
        <div aria-hidden className="relative mt-1 h-4 text-[0.625rem] tabular-nums text-muted-foreground">
          {/* Marcas no começo de cada faixa; "100" fica implícito no fim, para não encostar no 95. */}
          {[0, 40, 60, 80, 95].map((n) => (
            <span key={n} className={cn("absolute whitespace-nowrap", n === 0 ? "" : n === 95 ? "-translate-x-full" : "-translate-x-1/2")} style={{ left: n === 95 ? "100%" : `${n}%` }}>
              {n === 95 ? "95–100" : n}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Resumo do FindScore (cards, vitrine, peça, FindBox) ──────── */
type ResumoProps = {
  /** Pontuação real (0 a 100, com casas decimais). null = Em avaliação. */
  valor: number | null;
  /** "compacto": uma linha para cards; "completo": número, faixa, descrição e termômetro. */
  variante?: "compacto" | "completo";
  /** Período e data da atualização ("Últimos 90 dias", "Atualizado em 24/11/2026"). */
  periodo?: string;
  atualizadoEm?: string;
  /** Link "Entenda o FindScore". */
  hrefEntender?: string;
  className?: string;
};

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

/** Marca "FindScore" na grafia da FindLook: "Find" em grafite e "Score" em rosa, em negrito. */
export function MarcaFindScore({ className }: { className?: string }) {
  return (
    <span className={cn("font-bold", className)}>
      Find<span className="text-[var(--primary-text,var(--primary))]">Score</span>
    </span>
  );
}

export function FindScoreResumo({ valor, variante = "compacto", periodo, atualizadoEm, hrefEntender, className }: ResumoProps) {
  const faixa = valor == null ? null : faixaDoFindScore(valor);
  if (variante === "compacto") {
    return (
      <div data-slot="findscore-resumo" data-variante="compacto" className={cn("inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem]", className)}>
        <MarcaFindScore className="text-foreground" />
        {valor == null ? (
          <span className="text-muted-foreground">{EM_AVALIACAO.nome}</span>
        ) : (
          <span className="font-semibold tabular-nums text-foreground">
            {pontosExibidos(valor)}<span className="font-normal text-muted-foreground">/100</span>
          </span>
        )}
        {faixa && <BadgeDeClassificacao valor={valor} />}
        <Ajuda hrefEntender={hrefEntender} />
      </div>
    );
  }
  return (
    <section data-slot="findscore-resumo" data-variante="completo" aria-label="FindScore da loja" className={cn("rounded-lg border border-border bg-card p-4 sm:p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="m-0 flex items-center gap-1 text-[0.875rem] text-foreground">
            <MarcaFindScore /> <Ajuda hrefEntender={hrefEntender} />
          </p>
          {valor == null ? (
            <p className={`${display} m-0 mt-1 text-[1.375rem] font-extrabold text-foreground`}>{EM_AVALIACAO.nome}</p>
          ) : (
            <p className={`${display} m-0 mt-1 text-[2rem] font-extrabold leading-none tabular-nums text-foreground`}>
              {pontosExibidos(valor)}
              <span className="ml-0.5 text-[1rem] font-semibold text-muted-foreground">/100</span>
            </p>
          )}
        </div>
        {faixa && <BadgeDeClassificacao valor={valor} className="mt-1 shrink-0" />}
      </div>
      <p className="m-0 mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
        {faixa ? faixa.descricao : EM_AVALIACAO.descricaoPublica}
      </p>
      <TermometroFindScore valor={valor} className="mt-3" />
      {(periodo || atualizadoEm) && (
        <p className="m-0 mt-2 text-[0.75rem] text-muted-foreground">{[periodo, atualizadoEm].filter(Boolean).join(" · ")}</p>
      )}
    </section>
  );
}

/* ── FindStar ───────────────────────────────────────────────── */
/** Marca do FindStar: estrela de cantos arredondados (rosa) dentro de um anel fino (grafite). */
export function MarcaFindStar({ tamanho = 24, monocromatico = false, className }: { tamanho?: number; monocromatico?: boolean; className?: string }) {
  // Estrela de 5 pontas centrada em (24, 24), raio externo 11 e interno 4,6.
  const pontos = Array.from({ length: 10 }, (_, i) => {
    const r = i % 2 === 0 ? 11 : 4.6;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    return `${(24 + r * Math.cos(a)).toFixed(2)},${(24 + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
  const anel = monocromatico ? "currentColor" : "var(--foreground)";
  const estrela = monocromatico ? "currentColor" : "var(--primary)";
  return (
    <svg data-slot="marca-findstar" width={tamanho} height={tamanho} viewBox="0 0 48 48" aria-hidden className={cn("shrink-0", className)}>
      <circle cx="24" cy="24" r="21.5" fill="none" stroke={anel} strokeWidth="2.5" />
      <circle cx="24" cy="24" r="17" fill="none" stroke={anel} strokeWidth="1" opacity="0.35" />
      <polygon points={pontos} fill={estrela} stroke={estrela} strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  );
}

/** Marca "FindStar" na grafia da FindLook: "Find" em grafite e "Star" em rosa, em negrito. */
export function MarcaTextoFindStar({ monocromatico = false, className }: { monocromatico?: boolean; className?: string }) {
  return (
    <span className={cn("font-bold", className)}>
      Find<span className={monocromatico ? undefined : "text-[var(--primary-text,var(--primary))]"}>Star</span>
    </span>
  );
}

type SeloProps = {
  /** "compacto": cards e resultados de busca · "horizontal" e "vertical": perfil público e vitrine. */
  variante?: "compacto" | "horizontal" | "vertical";
  /** Uma cor só (currentColor), para impressão e aplicações sobre fotos. */
  monocromatico?: boolean;
  /** Validade do reconhecimento ("Válido até 31/12/2026"), quando a aplicação pedir. */
  validade?: string;
  className?: string;
};

export function SeloFindStar({ variante = "horizontal", monocromatico = false, validade, className }: SeloProps) {
  const rotulo = `FindStar: Excelência no atendimento. Reconhecimento FindLook${validade ? `. ${validade}` : ""}`;
  if (variante === "compacto") {
    return (
      <span
        data-slot="selo-findstar"
        data-variante="compacto"
        role="img"
        aria-label="FindStar"
        className={cn("inline-flex h-6 items-center gap-1 rounded-full border border-border bg-card pl-1 pr-2.5 text-[0.75rem] text-foreground", className)}
      >
        <MarcaFindStar tamanho={16} monocromatico={monocromatico} />
        <MarcaTextoFindStar monocromatico={monocromatico} />
      </span>
    );
  }
  const vertical = variante === "vertical";
  return (
    <div
      data-slot="selo-findstar"
      data-variante={variante}
      role="img"
      aria-label={rotulo}
      className={cn(
        "inline-flex rounded-xl border border-border bg-card text-foreground",
        vertical ? "flex-col items-center px-5 py-4 text-center" : "items-center gap-3 py-3 pl-3 pr-5",
        className,
      )}
    >
      <MarcaFindStar tamanho={vertical ? 56 : 44} monocromatico={monocromatico} />
      <span className={cn("flex flex-col", vertical && "mt-2 items-center")}>
        <MarcaTextoFindStar monocromatico={monocromatico} className={`${display} text-[1.125rem] leading-tight`} />
        <span className="text-[0.8125rem] font-medium">Excelência no atendimento</span>
        <span className="mt-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Reconhecimento FindLook</span>
        {validade && <span className="mt-1 text-[0.6875rem] text-muted-foreground">{validade}</span>}
      </span>
    </div>
  );
}

export const TEXTO_FINDSTAR = "Esta loja conquistou o reconhecimento FindStar por atender aos critérios de excelência estabelecidos pela FindLook.";

/* ── Progresso de elegibilidade ─────────────────────────────── */
export type RequisitoDeElegibilidade = { rotulo: string; atual: number; meta: number; unidade?: string };

export function ProgressoDeElegibilidade({ titulo, itens, rodape, className }: { titulo: React.ReactNode; itens: RequisitoDeElegibilidade[]; rodape?: React.ReactNode; className?: string }) {
  const cumpridos = itens.filter((r) => r.atual >= r.meta).length;
  return (
    <section data-slot="progresso-de-elegibilidade" className={cn("rounded-lg border border-border bg-card p-4 sm:p-5", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className={`${display} m-0 text-[1rem] font-bold text-foreground`}>{titulo}</h3>
        <span className="shrink-0 text-[0.75rem] font-semibold tabular-nums text-muted-foreground">{cumpridos} de {itens.length} requisitos</span>
      </div>
      <ul className="m-0 mt-3 list-none space-y-3 p-0">
        {itens.map((r) => {
          const ok = r.atual >= r.meta;
          const pct = Math.min(100, (r.atual / r.meta) * 100);
          return (
            <li key={r.rotulo}>
              <div className="flex items-center justify-between gap-3 text-[0.8125rem]">
                <span className="flex min-w-0 items-center gap-1.5 text-foreground">
                  {ok ? <Check aria-hidden className="h-3.5 w-3.5 shrink-0 text-success" /> : <span aria-hidden className="h-3.5 w-3.5 shrink-0 rounded-full border border-border" />}
                  {r.rotulo}
                  <span className="sr-only">{ok ? "(cumprido)" : "(pendente)"}</span>
                </span>
                <span className="shrink-0 tabular-nums text-muted-foreground">
                  <span className="font-semibold text-foreground">{r.atual.toLocaleString("pt-BR")}</span> de {r.meta.toLocaleString("pt-BR")}{r.unidade ? ` ${r.unidade}` : ""}
                </span>
              </div>
              <div aria-hidden className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className={cn("h-full rounded-full", ok ? "bg-success" : "bg-foreground/45")} style={{ width: `${pct}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
      {rodape && <div className="mt-3 text-[0.8125rem] text-muted-foreground">{rodape}</div>}
    </section>
  );
}

/* ── Card de critério ───────────────────────────────────────── */
export type EstadoDoCriterio = "avaliado" | "nao_aplicavel" | "dados_insuficientes" | "em_analise";

const TEXTO_DO_ESTADO: Record<Exclude<EstadoDoCriterio, "avaliado">, { rotulo: string; texto: string }> = {
  nao_aplicavel: { rotulo: "Não aplicável", texto: "Este critério não se aplica à operação da sua loja no período. O peso dele foi distribuído entre os outros critérios." },
  dados_insuficientes: { rotulo: "Dados insuficientes", texto: "Ainda não há registros suficientes neste critério. Ele entra no cálculo assim que houver histórico." },
  em_analise: { rotulo: "Em análise", texto: "Há registros deste critério em análise pela FindLook. A nota é atualizada quando a análise terminar." },
};

export function CardDeCriterio({ nome, peso, nota, estado = "avaliado", registros, explicacao, className }: {
  nome: string;
  /** Peso do critério na metodologia vigente (0 a 1). */
  peso: number;
  nota?: number | null;
  estado?: EstadoDoCriterio;
  /** Quantidade de registros considerados. */
  registros?: number;
  explicacao?: React.ReactNode;
  className?: string;
}) {
  const avaliado = estado === "avaliado" && nota != null;
  const pesoPct = Math.round(peso * 100);
  return (
    <article data-slot="card-de-criterio" data-estado={estado} className={cn("flex h-full flex-col rounded-lg border border-border bg-card p-4", className)}>
      <div className="flex items-start justify-between gap-2">
        <h4 className="m-0 text-[0.9375rem] font-semibold text-foreground">{nome}</h4>
        <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[0.6875rem] font-semibold text-muted-foreground">Peso {pesoPct}%</span>
      </div>
      {avaliado ? (
        <>
          <p className={`${display} m-0 mt-2 text-[1.5rem] font-extrabold leading-none tabular-nums text-foreground`}>
            {pontosExibidos(nota!)}<span className="ml-0.5 text-[0.875rem] font-semibold text-muted-foreground">/100</span>
          </p>
          <div aria-hidden className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full" style={{ width: `${limitar(nota!)}%`, background: corDaFaixa(faixaDoFindScore(nota!).tom) }} />
          </div>
          <p className="m-0 mt-2 text-[0.75rem] text-muted-foreground">
            Contribui com {(limitar(nota!) * peso).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} pontos
            {registros != null ? ` · ${registros.toLocaleString("pt-BR")} ${registros === 1 ? "registro" : "registros"}` : ""}
          </p>
        </>
      ) : (
        <div className="mt-2 flex items-start gap-1.5 rounded-md bg-muted/60 p-2.5 text-[0.75rem] text-muted-foreground">
          <Info aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span><span className="font-semibold text-foreground">{TEXTO_DO_ESTADO[estado as Exclude<EstadoDoCriterio, "avaliado">].rotulo}.</span> {TEXTO_DO_ESTADO[estado as Exclude<EstadoDoCriterio, "avaliado">].texto}</span>
        </div>
      )}
      {explicacao && <div className="mt-auto pt-3 text-[0.75rem] leading-relaxed text-muted-foreground">{explicacao}</div>}
    </article>
  );
}
