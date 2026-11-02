import React from "react";
import { ChevronRight, Sparkles, Fingerprint, Layers, Coins, Compass, Accessibility, Image, Wind, LayoutTemplate, Component, Plug, Rocket, Lightbulb, Code2, MessageCircle, BadgeCheck, Search, Store } from "lucide-react";
import logoSimbolo from "../../../imports/findlook/findlook-simbolo.png";
import { SectionLabel, CardGrid, useGo, type Navigate, type CardItem } from "./GetStartedShowcase";
import { changelog, type ChangeKind } from "./shared/changelog";
import { withHighlight } from "@/app/components/ui/heading";

const display = "font-[family-name:var(--font-display)]";

const kindStyle: Record<ChangeKind, string> = {
  New: "bg-primary/12 text-primary-text border-primary/25",
  Updated: "bg-muted text-foreground border-border",
  Removed: "bg-transparent text-muted-foreground border-border border-dashed",
};
const kindPt: Record<ChangeKind, string> = { New: "Novo", Updated: "Atualizado", Removed: "Removido" };

const explore: { label: string; items: CardItem[] }[] = [
  {
    label: "Início",
    items: [
      { icon: Rocket, title: "Primeiros passos", desc: "O que é o sistema, para quem ele é, como está organizado e por onde começar.", target: { page: "get-started" } },
      { icon: Lightbulb, title: "Princípios de design", desc: "Intuitiva, didática, transparente, inclusiva, mobile-first e escalável.", target: { page: "principles" } },
      { icon: Code2, title: "Desenvolvimento", desc: "React, Tailwind v4 e os arquivos de tokens, prontos para o time e para ferramentas de IA.", target: { page: "develop" } },
    ],
  },
  {
    label: "Identidade e fundamentos",
    items: [
      { icon: Fingerprint, title: "Marca", desc: "Assinatura, símbolo, paleta oficial, tipografia e regras, com download em SVG e PNG.", target: { page: "brand" } },
      { icon: Layers, title: "Fundamentos", desc: "Escalas Pink e Grafite, Plus Jakarta Sans, espaçamento, raio e sombras nos dois modos.", target: { page: "colors" } },
      { icon: Coins, title: "Design Tokens", desc: "Primitivos, semânticos e de componente, e como design, código e IA leem o mesmo nome.", target: { page: "tokens" } },
      { icon: Plug, title: "Integração", desc: "Como ligar o sistema a um projeto React e às ferramentas de IA.", target: { page: "integration" } },
    ],
  },
  {
    label: "Diretrizes",
    items: [
      { icon: Compass, title: "Usabilidade", desc: "Hierarquia de ações, tamanho de alvo, estados de conteúdo e microcopy.", target: { page: "usability" } },
      { icon: Accessibility, title: "Acessibilidade", desc: "Meta WCAG 2.2 AA: contraste, foco, teclado e rótulos, com checklist.", target: { page: "accessibility" } },
      { icon: MessageCircle, title: "Tom de voz", desc: "Simplicidade, proximidade e ação. O que dizer e o que evitar, por público.", target: { page: "voice" } },
      { icon: BadgeCheck, title: "Estados de informação", desc: "Confirmado pela loja, a confirmar, esgotado, sugerido por IA e desatualizado.", target: { page: "states" } },
    ],
  },
  {
    label: "Estilos, componentes e templates",
    items: [
      { icon: Image, title: "Backgrounds", desc: "Superfícies animadas: gradientes, canvas reveal, vortex e linhas.", target: { page: "backgrounds" } },
      { icon: Wind, title: "Motion", desc: "Presets, easing, física de spring e tokens de movimento.", target: { page: "motion" } },
      { icon: Component, title: "Componentes", desc: "Botões, cards, exibição de dados, feedback, rótulos, ícones e overlays.", target: { page: "buttons" } },
      { icon: LayoutTemplate, title: "Templates", desc: "Dashboard, autenticação, configurações, lista e landing page.", target: { page: "templates" } },
    ],
  },
];

const graphite = ["#F6F6F7","#E9E9EC","#D4D4D9","#B3B3BC","#888896","#696977","#51515C","#3E3E46","#2C2C33","#19191C","#000000"];
const pink = ["#FEF2F4","#FCE0E4","#F8BCC6","#F290A0","#EC5A72","#E62040","#B91B35","#91162B","#6B1221","#490E19","#2A0A11"];

export function HomeShowcase({ onNavigate }: { onNavigate: Navigate }) {
  const go = useGo(onNavigate);
  const latest = changelog[0];

  return (
    <div className="space-y-14">
      <div className="relative overflow-hidden rounded-[24px] border border-border p-6 sm:p-10 bg-card shadow-[var(--shadow-lg)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="relative flex items-start gap-8">
          <img src={logoSimbolo} alt="" className="hidden sm:block h-24 w-auto object-contain shrink-0" />
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/12 text-primary-text border border-primary/25 text-[0.75rem] font-semibold uppercase tracking-[0.08em]">
                Design System
              </span>
              <span className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">v1.0</span>
            </div>
            <h1 className={`${display} text-[2rem] sm:text-[2.5rem] font-extrabold tracking-[-0.035em] text-foreground mb-3 leading-none`}>
              Find<span className="text-primary">Look</span>
            </h1>
            <p className={`${display} text-[1.25rem] font-bold tracking-[-0.02em] text-foreground mb-3`}>{withHighlight("Uma experiência, **dois públicos**.")}</p>
            <p className="text-[1.0625rem] text-muted-foreground max-w-xl leading-relaxed mb-6">
              Os fundamentos, componentes e padrões que dão forma à experiência da FindLook, a plataforma web de descoberta de moda local. Para que cada tela, em qualquer jornada, seja consistente, acessível e fácil de evoluir.
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <button
                onClick={() => onNavigate("get-started")}
                className="group inline-flex items-center gap-2 h-10 px-5 rounded-full bg-primary text-primary-foreground text-[0.875rem] font-semibold hover:bg-[var(--primary-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                Começar
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => go({ scroll: "whats-new" })}
                className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-border text-[0.875rem] font-medium text-foreground hover:border-[var(--border-strong)] hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Sparkles className="h-4 w-4 text-primary" />
                Novidades
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Mobile-first", "Meta WCAG 2.2 AA", "Tokens Tailwind v4", "Modo claro e escuro", "Só português"].map((tag, i) => (
                <span key={tag} className={`inline-flex items-center px-3 py-1 rounded-full text-[0.8125rem] font-medium ${i === 0 ? "bg-primary/12 text-primary-text" : "bg-muted text-foreground"}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section id="home-publicos" className="scroll-mt-32">
        <SectionLabel>Duas jornadas, uma conexão</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-[var(--radius)] border border-border bg-[var(--surface-tint)] p-6">
            <div className="flex items-center gap-2 mb-3"><Search className="h-4 w-4 text-primary-text" aria-hidden /><p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-primary-text">Para quem procura</p></div>
            <p className={`${display} text-[1.25rem] font-bold tracking-[-0.02em] text-foreground mb-2`}>Encontre peças alinhadas ao seu estilo, tamanho e região.</p>
            <p className="text-[0.875rem] text-muted-foreground">Busca por foto, descrição ou ambas. Sem pesquisar loja por loja.</p>
          </div>
          <div className="rounded-[var(--radius)] border border-border bg-muted p-6">
            <div className="flex items-center gap-2 mb-3"><Store className="h-4 w-4 text-primary-text" aria-hidden /><p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-primary-text">Para quem vende</p></div>
            <p className={`${display} text-[1.25rem] font-bold tracking-[-0.02em] text-foreground mb-2`}>Sua vitrine pesquisável para quem já tem intenção de compra.</p>
            <p className="text-[0.875rem] text-muted-foreground">Visibilidade para lojas e brechós. Contato direto com o cliente.</p>
          </div>
        </div>
        <p className="mt-3 text-[0.8125rem] text-muted-foreground">A plataforma não vende: ela gera encontros. A compra acontece diretamente entre consumidor e loja. O design system garante que as duas experiências falem a mesma língua visual e verbal.</p>
      </section>

      <section id="whats-new" className="scroll-mt-32">
        <SectionLabel>Histórico de mudanças</SectionLabel>
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
          <h2 className={`${display} text-[1.5rem] font-extrabold tracking-[-0.02em] text-foreground`}>Novidades</h2>
          <p className="text-[0.8125rem] text-muted-foreground">Mais recente: {latest.title.pt} · {latest.date}</p>
        </div>
        <p className="max-w-2xl mb-6 text-[0.9375rem] leading-relaxed text-muted-foreground">
          Toda adição, mudança e remoção no design system, da mais recente para a mais antiga.
        </p>
        <ol className="relative border-l border-border ml-1.5 space-y-3">
          {changelog.map((e, i) => {
            const Tag = e.page ? "button" : "div";
            return (
              <li key={e.title.pt} className="relative pl-6">
                <span aria-hidden className={`absolute -left-[5px] top-5 h-2.5 w-2.5 rounded-full border-2 border-background ${i === 0 ? "bg-primary" : "bg-border"}`} />
                <Tag
                  {...(e.page ? { type: "button" as const, onClick: () => onNavigate(e.page!, e.anchor) } : {})}
                  className={`group w-full text-left flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-4 rounded-[var(--radius)] bg-card border border-border shadow-[var(--shadow-xs)] ${
                    e.page ? "transition-all hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" : ""
                  }`}
                >
                  <span className={`shrink-0 self-start inline-flex items-center px-2 py-0.5 rounded-full border text-[0.6875rem] font-semibold uppercase tracking-[0.06em] sm:mt-0.5 ${kindStyle[e.kind]}`}>
                    {kindPt[e.kind]}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className={`${display} block text-[0.9375rem] font-semibold tracking-[-0.01em] text-foreground mb-0.5`}>{e.title.pt}</span>
                    <span className="block text-[0.8125rem] leading-relaxed text-muted-foreground">{e.desc.pt}</span>
                  </span>
                  <span className="shrink-0 text-[0.75rem] text-muted-foreground sm:mt-0.5">{e.date}</span>
                </Tag>
              </li>
            );
          })}
        </ol>
      </section>

      <section id="home-explore" className="scroll-mt-32 space-y-8">
        <div>
          <SectionLabel>Explorar</SectionLabel>
          <h2 className={`${display} text-[1.5rem] font-extrabold tracking-[-0.02em] text-foreground`}>Tudo no sistema</h2>
        </div>
        {explore.map(g => (
          <div key={g.label}>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-3">{g.label}</p>
            <CardGrid items={g.items} onGo={go} cols={g.items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} compact />
          </div>
        ))}
      </section>

      <section>
        <SectionLabel>Prévia da paleta</SectionLabel>
        <div className="flex rounded-[16px] overflow-hidden h-16 border border-border/40 shadow-[var(--shadow-sm)]" role="img" aria-label="Escalas Grafite e Pink, de 50 a 950">
          {graphite.map(c => <div key={c} className="flex-1" style={{ backgroundColor: c }} />)}
          <div className="w-px bg-background/20" />
          {pink.map(c => <div key={c} className="flex-1" style={{ backgroundColor: c }} />)}
        </div>
        <div className="flex justify-between text-[0.6875rem] text-muted-foreground mt-2 px-1">
          <span>Escala Grafite, de 50 a 950</span>
          <span>Escala Pink, de 50 a 950</span>
        </div>
      </section>
    </div>
  );
}
