import React from "react";
import { CheckCircle2, Clock, Ban, Sparkles, AlertTriangle, type LucideIcon } from "lucide-react";
import { PageHeader, PageSection, SectionLabel } from "./GetStartedShowcase";
import { StatusDePublicacao, type StatusProduto } from "../ui/painel-produtos";

const display = "font-[family-name:var(--font-display)]";

/* Fonte: Brand Book FindLook v1.0 — 18 Conteúdo e estados: "Dizer exatamente o que se sabe."
   Regra: nunca usar apenas cor para comunicar um estado; sempre texto e ícone. */

export type InfoState = "confirmado" | "a-confirmar" | "esgotado" | "sugerido-ia" | "desatualizado";

type StateSpec = {
  id: InfoState;
  label: string;
  icon: LucideIcon;
  quando: string;
  oQueDizer: string;
  acao: string;
  color: string;        // token de cor do ícone e do texto
  bg: string;           // token de fundo suave
  border: string;
};

export const states: StateSpec[] = [
  {
    id: "confirmado", label: "Confirmado pela loja", icon: CheckCircle2,
    quando: "A loja validou a informação (preço, tamanho, disponibilidade) no painel do lojista.",
    oQueDizer: "Informação validada pelo lojista, com data da confirmação quando houver.",
    acao: "Nenhuma: o consumidor pode seguir para o contato com a loja.",
    color: "text-success", bg: "bg-success/10", border: "border-success/30",
  },
  {
    id: "a-confirmar", label: "A confirmar", icon: Clock,
    quando: "O dado existe no cadastro, mas a loja ainda não o confirmou ou ele tem mais de um prazo definido pela operação.",
    oQueDizer: "Convide a confirmar a disponibilidade com a loja antes de se deslocar.",
    acao: "Botão ou link para falar com a loja.",
    color: "text-primary-text", bg: "bg-primary/10", border: "border-primary/30",
  },
  {
    id: "esgotado", label: "Esgotado", icon: Ban,
    quando: "A loja marcou a peça como indisponível.",
    oQueDizer: "Indique que a peça não está disponível. Mantenha o card visível para peças semelhantes.",
    acao: "Sugerir peças parecidas na mesma região.",
    color: "text-foreground", bg: "bg-muted", border: "border-border",
  },
  {
    id: "sugerido-ia", label: "Sugerido por IA", icon: Sparkles,
    quando: "Um atributo (cor, categoria, estilo, tamanho estimado) foi inferido a partir da foto ou da descrição, não cadastrado pela loja.",
    oQueDizer: "Diferencie a inferência de um dado cadastrado. Diga que é uma sugestão e o que ela se baseia.",
    acao: "Permitir que o lojista confirme ou corrija; para o consumidor, indicar que pode variar.",
    color: "text-primary-text", bg: "bg-[var(--surface-tint)]", border: "border-primary/30",
  },
  {
    id: "desatualizado", label: "Desatualizado", icon: AlertTriangle,
    quando: "A informação passou do prazo de revisão definido pela operação ou a loja não atualiza há tempo.",
    oQueDizer: "Mostre quando a informação precisa de revisão e a data da última atualização.",
    acao: "Lojista: pedido de revisão. Consumidor: confirmar com a loja.",
    color: "text-warning", bg: "bg-warning/10", border: "border-warning/40",
  },
];

/* ── Componente de status: ícone + texto, sempre juntos ── */
export function StatusChip({ state, size = "md" }: { state: InfoState; size?: "sm" | "md" }) {
  const s = states.find(x => x.id === state)!;
  const Icon = s.icon;
  const pad = size === "sm" ? "h-6 px-2 text-[0.6875rem] gap-1" : "h-7 px-2.5 text-[0.75rem] gap-1.5";
  return (
    <span className={`inline-flex items-center rounded-full border font-semibold ${pad} ${s.bg} ${s.border} ${s.color}`}>
      <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} aria-hidden />
      <span>{s.label}</span>
    </span>
  );
}

/* ── Status de publicação do produto (painel da loja) ── */
const statusPublicacao: { status: StatusProduto; motivo?: string; quando: string }[] = [
  { status: "publicado", quando: "A peça está na vitrine e aparece nas buscas." },
  { status: "pendente", motivo: "Foto em baixa qualidade", quando: "Falta algo para publicar. Mostre sempre o motivo, logo abaixo do status." },
  { status: "esgotado", quando: "A loja marcou a peça como indisponível. Ela sai da busca, mas continua no painel." },
  { status: "reservado", quando: "A peça está separada para uma pessoa e volta para a vitrine se a reserva acabar." },
  { status: "rascunho", quando: "O cadastro foi começado e ainda não foi enviado para publicação." },
];

export function StatesShowcase() {
  return (
    <div className="space-y-14 min-w-0">
      <PageHeader
        eyebrow="Diretrizes"
        title="Estados de **informação**"
        description="Dizer exatamente o que se sabe. Cinco estados padronizados mostram, com clareza, de onde vem cada dado de peça e de loja, e o que a pessoa pode fazer a respeito."
      />

      <PageSection
        id="states-lista"
        label="Os cinco estados"
        title="Quando usar cada um"
        intro={<p>Todo dado que depende da loja carrega um destes estados. Eles valem para o consumidor e para o lojista, com a mesma aparência e os mesmos nomes.</p>}
      >
        <div className="space-y-3">
          {states.map(s => {
            const Icon = s.icon;
            return (
              <article key={s.id} id={`state-${s.id}`} className={`scroll-mt-32 grid grid-cols-1 lg:grid-cols-[14rem_minmax(0,1fr)] gap-4 rounded-[var(--radius)] border ${s.border} ${s.bg} p-5`}>
                <div className="flex items-start gap-3">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-card border ${s.border} ${s.color}`}><Icon className="h-4 w-4" aria-hidden /></span>
                  <div>
                    <p className={`${display} text-[1rem] font-bold tracking-[-0.01em] text-foreground`}>{s.label}</p>
                    <StatusChip state={s.id} size="sm" />
                  </div>
                </div>
                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[0.8125rem]">
                  <div><dt className="font-semibold uppercase tracking-[0.08em] text-[0.6875rem] text-muted-foreground mb-1">Quando</dt><dd className="text-foreground leading-relaxed">{s.quando}</dd></div>
                  <div><dt className="font-semibold uppercase tracking-[0.08em] text-[0.6875rem] text-muted-foreground mb-1">O que dizer</dt><dd className="text-foreground leading-relaxed">{s.oQueDizer}</dd></div>
                  <div><dt className="font-semibold uppercase tracking-[0.08em] text-[0.6875rem] text-muted-foreground mb-1">Ação oferecida</dt><dd className="text-foreground leading-relaxed">{s.acao}</dd></div>
                </dl>
              </article>
            );
          })}
        </div>
      </PageSection>

      <PageSection
        id="states-componente"
        label="Componente"
        title="Chip de status"
        intro={<p>O chip combina ícone, texto e cor. Os três aparecem sempre juntos, por isso o estado continua legível em preto e branco, para quem não distingue cores e para leitores de tela.</p>}
      >
        <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-6">
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-3">Tamanho padrão</p>
            <div className="flex flex-wrap gap-2">{states.map(s => <StatusChip key={s.id} state={s.id} />)}</div>
          </div>
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-3">Compacto, para cards de peça</p>
            <div className="flex flex-wrap gap-2">{states.map(s => <StatusChip key={s.id} state={s.id} size="sm" />)}</div>
          </div>
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-3">No card de produto</p>
            <div className="max-w-sm rounded-[var(--radius)] border border-border bg-background p-4 flex gap-4">
              <div className="h-20 w-20 shrink-0 rounded-[10px] bg-muted" aria-hidden />
              <div className="min-w-0">
                <p className={`${display} text-[1rem] font-bold tracking-[-0.01em] text-foreground`}>Jaqueta preta</p>
                <p className="text-[0.8125rem] text-muted-foreground mb-2">Loja no Centro · Tam. M</p>
                <StatusChip state="a-confirmar" size="sm" />
                <p className="mt-2 text-[0.8125rem] font-semibold text-primary-text">Ver na loja →</p>
              </div>
            </div>
          </div>
          <div className="rounded-[10px] bg-muted/60 border border-border p-4 text-[0.8125rem] text-muted-foreground font-mono leading-relaxed overflow-x-auto">
            {'<StatusChip state="confirmado" />  // confirmado | a-confirmar | esgotado | sugerido-ia | desatualizado'}
          </div>
        </div>
      </PageSection>

      <PageSection
        id="states-publicacao"
        label="Componente do painel"
        title="Status de publicação do produto"
        intro={<p>Mostra ao lojista em que etapa cada peça está no painel. Como o chip, junta ícone, texto e cor; quando a peça está pendente, traz o motivo logo abaixo.</p>}
      >
        <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-6">
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-3">Os cinco status</p>
            <div className="flex flex-wrap gap-2">{statusPublicacao.map(s => <StatusDePublicacao key={s.status} status={s.status} />)}</div>
          </div>
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-3">Quando usar cada um</p>
            <div className="rounded-[var(--radius)] border border-border bg-background overflow-hidden">
              {statusPublicacao.map((s, i, arr) => (
                <div key={s.status} className={`grid grid-cols-1 sm:grid-cols-[12rem_minmax(0,1fr)] gap-2 sm:gap-4 px-4 py-3 ${i < arr.length - 1 ? "border-b border-border" : ""}`}>
                  <StatusDePublicacao status={s.status} motivo={s.motivo} />
                  <p className="text-[0.8125rem] text-foreground leading-relaxed sm:pt-0.5">{s.quando}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[10px] bg-muted/60 border border-border p-4 text-[0.8125rem] text-muted-foreground font-mono leading-relaxed overflow-x-auto whitespace-pre">
            {'<StatusDePublicacao status="pendente" motivo="Foto em baixa qualidade" />\n// publicado | pendente | esgotado | reservado | rascunho'}
          </div>
        </div>
        <ul className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            ["Estado de informação ≠ status de publicação", "O estado de informação diz o quanto um dado é confiável (confirmado, a confirmar, sugerido por IA). O status de publicação diz em que etapa a peça está no painel da loja."],
            ["Quem vê cada um", "Estados de informação aparecem para o consumidor e para o lojista. O status de publicação é do painel da loja; na vitrine, o consumidor só vê o resultado."],
            ["Esgotado nos dois", "É o mesmo nome e o mesmo ícone: no painel, o lojista muda o status; na vitrine, o consumidor vê o chip “Esgotado”."],
          ].map(([t, d]) => (
            <li key={t} className="rounded-[var(--radius)] border border-border bg-card p-4">
              <p className="text-[0.875rem] font-semibold text-foreground mb-1">{t}</p>
              <p className="text-[0.8125rem] text-muted-foreground leading-relaxed">{d}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        id="states-regras"
        label="Regras"
        title="Nunca só cor"
        intro={<p>Regras que valem para qualquer representação de estado, dentro ou fora do chip.</p>}
      >
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            ["Texto e ícone sempre juntos", "A cor reforça; o ícone e o rótulo comunicam. Sem eles, o estado não existe."],
            ["Mesmo nome em todo lugar", "“A confirmar” é “A confirmar” no card, no filtro, no painel do lojista e na notificação."],
            ["Um estado por dado", "Uma peça pode ter o preço confirmado e o tamanho sugerido por IA. Marque cada dado, não a peça inteira."],
            ["Data quando houver", "Confirmado e desatualizado ganham a data da última ação da loja, no formato dd/mm/aaaa."],
            ["Ação ao lado do estado", "Todo estado que depende da loja oferece o próximo passo: confirmar, corrigir, falar com a loja."],
            ["Acessível por leitor de tela", "O chip tem o rótulo em texto; o ícone é decorativo (aria-hidden)."],
          ].map(([t, d]) => (
            <li key={t} className="rounded-[var(--radius)] border border-border bg-card p-4">
              <p className="text-[0.875rem] font-semibold text-foreground mb-1">{t}</p>
              <p className="text-[0.8125rem] text-muted-foreground leading-relaxed">{d}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <section id="states-tokens" className="scroll-mt-32">
        <SectionLabel>Tokens usados</SectionLabel>
        <div className="rounded-[var(--radius)] border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-3 text-[0.75rem] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3 border-b border-border bg-muted/20">
            <span>Estado</span><span>Cor do ícone e texto</span><span>Fundo</span>
          </div>
          {[
            ["Confirmado pela loja", "--success", "--success-muted"],
            ["A confirmar", "--primary-text", "--primary-muted"],
            ["Esgotado", "--foreground", "--muted"],
            ["Sugerido por IA", "--primary-text", "--surface-tint"],
            ["Desatualizado", "--warning", "--warning-muted"],
          ].map(([s, c, b], i, arr) => (
            <div key={s} className={`grid grid-cols-3 px-5 py-3 text-[0.8125rem] ${i < arr.length - 1 ? "border-b border-border" : ""}`}>
              <span className="font-medium text-foreground">{s}</span>
              <span className="font-mono text-muted-foreground">{c}</span>
              <span className="font-mono text-muted-foreground">{b}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
