import React from "react";
import {
  ArrowRight, BookOpen, Compass, Palette, Code2, Fingerprint, Layers, Coins,
  Component, Type, PenTool, SunMoon, Braces, ArrowLeftRight, FileCode2,
  Image, LayoutTemplate, Link as LinkIcon, Check,
} from "lucide-react";
import { useI18n, type Bi } from "../../i18n";

export type Navigate = (id: string, anchor?: string) => void;

export type Target = { page?: string; anchor?: string; scroll?: string };

export type CardItem = {
  icon: React.ElementType;
  title: string | Bi;
  desc: string | Bi;
  target: Target;
};

const display = "font-[family-name:var(--font-display)]";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-3">
      {children}
    </p>
  );
}

export function NavCard({
  item, onGo, compact = false,
}: { item: CardItem; onGo: (t: Target) => void; compact?: boolean }) {
  const Icon = item.icon;
  const { bi } = useI18n();
  const txt = (v: string | Bi) => (typeof v === "string" ? v : bi(v));
  return (
    <button
      type="button"
      onClick={() => onGo(item.target)}
      className={`group flex flex-col text-left h-full bg-card border border-border rounded-[var(--radius)] shadow-[var(--shadow-sm)] transition-all duration-150 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        compact ? "p-4" : "p-5"
      }`}
    >
      <Icon className="h-5 w-5 text-primary mb-4 shrink-0" strokeWidth={1.75} />
      <h3 className={`${display} text-[0.9375rem] font-semibold tracking-[-0.01em] text-foreground mb-1.5`}>
        {txt(item.title)}
      </h3>
      <p className="text-[0.8125rem] leading-relaxed text-muted-foreground mb-5">{txt(item.desc)}</p>
      <ArrowRight
        className="mt-auto self-end h-4 w-4 text-muted-foreground transition-all duration-150 group-hover:text-primary group-hover:translate-x-0.5"
        aria-hidden
      />
    </button>
  );
}

export function CardGrid({
  items, onGo, cols = "lg:grid-cols-3", compact,
}: { items: CardItem[]; onGo: (t: Target) => void; cols?: string; compact?: boolean }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${cols} gap-3`}>
      {items.map((i, n) => (
        <NavCard key={n} item={i} onGo={onGo} compact={compact} />
      ))}
    </div>
  );
}

export function PageHeader({
  eyebrow, title, description,
}: { eyebrow: string; title: string; description: string }) {
  return (
    <header>
      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-primary mb-3">{eyebrow}</p>
      <h1 className={`${display} text-[2.5rem] tracking-[-0.035em] leading-none text-foreground mb-4`}>{title}</h1>
      <p className="text-[1.0625rem] text-muted-foreground max-w-2xl leading-relaxed">{description}</p>
    </header>
  );
}

export function CopyLinkButton({ id }: { id: string }) {
  const { t } = useI18n();
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <span className="relative inline-flex group/link">
      <button
        type="button"
        onClick={copy}
        aria-label={t("Copy link", "Copiar link")}
        className="h-7 w-7 rounded-[var(--radius)] inline-flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <LinkIcon className="h-3.5 w-3.5" />}
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap rounded-[6px] bg-foreground px-2 py-1 text-[0.6875rem] font-medium text-background opacity-0 group-hover/link:opacity-100 group-focus-within/link:opacity-100 transition-opacity z-10"
      >
        {copied ? t("Copied", "Copiado") : t("Copy link", "Copiar link")}
      </span>
    </span>
  );
}

export function PageSection({
  id, label, title, children, intro,
}: { id: string; label: string; title: string; intro: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32">
      <SectionLabel>{label}</SectionLabel>
      <div className="flex items-center gap-2 mb-3">
        <h2 className={`${display} text-[1.5rem] tracking-[-0.02em] text-foreground`}>{title}</h2>
        <CopyLinkButton id={id} />
      </div>
      <div className="space-y-3 max-w-2xl mb-6 text-[0.9375rem] leading-relaxed text-muted-foreground">{intro}</div>
      {children}
    </section>
  );
}

const quickLinks: CardItem[] = [
  { icon: BookOpen, title: { en: "What's this design system?", pt: "O que é este design system?" }, desc: { en: "Learn what the system is and who it is for.", pt: "Entenda o que é o sistema e para quem ele é." }, target: { scroll: "gs-overview" } },
  { icon: Compass, title: { en: "Using the system", pt: "Usando o sistema" }, desc: { en: "Get to know how the system is organized.", pt: "Conheça como o sistema está organizado." }, target: { scroll: "gs-structure" } },
  { icon: Palette, title: { en: "Design", pt: "Design" }, desc: { en: "Start applying color, type, tokens and templates.", pt: "Comece a aplicar cor, tipografia, tokens e templates." }, target: { scroll: "gs-design" } },
  { icon: Code2, title: { en: "Develop", pt: "Desenvolvimento" }, desc: { en: "Implement the system with React, Tailwind CSS and design tokens.", pt: "Implemente o sistema com React, Tailwind CSS e design tokens." }, target: { page: "develop" } },
  { icon: Fingerprint, title: { en: "Brand Identity", pt: "Identidade de Marca" }, desc: { en: "Logo versions, symbol, palette and usage rules.", pt: "Versões do logo, símbolo, paleta e regras de uso." }, target: { page: "brand" } },
];

const overview: CardItem[] = [
  { icon: Layers, title: { en: "Foundations", pt: "Fundamentos" }, desc: { en: "Color, typography, spacing, radius and shadows: the raw material of every screen.", pt: "Cor, tipografia, espaçamento, raio e sombras: a matéria-prima de toda tela." }, target: { page: "colors" } },
  { icon: Coins, title: { en: "Design tokens", pt: "Design tokens" }, desc: { en: "Three layers — primitives, semantics and component — that keep Figma and CSS aligned.", pt: "Três camadas — primitivos, semânticos e de componente — que mantêm Figma e CSS alinhados." }, target: { page: "tokens" } },
  { icon: Component, title: { en: "Components", pt: "Componentes" }, desc: { en: "Buttons, data display, feedback, labels, icons and overlays, ready to use.", pt: "Botões, exibição de dados, feedback, labels, ícones e overlays, prontos para usar." }, target: { page: "buttons" } },
];

const structure: CardItem[] = [
  { icon: Fingerprint, title: { en: "Brand", pt: "Marca" }, desc: { en: "Assinatura, símbolo, paleta oficial, tipografia e regras de uso, com download em SVG e PNG.", pt: "Assinatura, símbolo, paleta oficial, tipografia e regras de uso, com download em SVG e PNG." }, target: { page: "brand" } },
  { icon: Layers, title: { en: "Foundation", pt: "Fundação" }, desc: { en: "Color Palette, Typography, Spacing, Radius, Shadows and Tokens.", pt: "Paleta de cores, tipografia, espaçamento, raio, sombras e tokens." }, target: { page: "colors" } },
  { icon: Coins, title: { en: "Concepts", pt: "Conceitos" }, desc: { en: "What tokens are, the three layers, the guide for designers, AI and tokens, and the Design ↔ Dev mapping.", pt: "O que são tokens, as três camadas, o guia para designers, IA e tokens, e o mapeamento Design ↔ Dev." }, target: { page: "tokens" } },
  { icon: Compass, title: { en: "Diretrizes", pt: "Diretrizes" }, desc: { en: "Usabilidade, acessibilidade, tom de voz e estados de informação.", pt: "Usabilidade, acessibilidade, tom de voz e estados de informação." }, target: { page: "usability" } },
  { icon: Image, title: { en: "Styles", pt: "Estilos" }, desc: { en: "Backgrounds and Motion Design to bring surfaces and interactions to life.", pt: "Backgrounds e Motion Design para dar vida a superfícies e interações." }, target: { page: "backgrounds" } },
  { icon: LayoutTemplate, title: { en: "Components & Templates", pt: "Componentes e Templates" }, desc: { en: "Buttons, Data Display, Feedback, Labels, Icons, Overlays and ready-made templates.", pt: "Botões, exibição de dados, feedback, labels, ícones, overlays e templates prontos." }, target: { page: "templates" } },
];

const design: CardItem[] = [
  { icon: Type, title: { en: "Color & typography", pt: "Cor e tipografia" }, desc: { en: "Escalas Pink e Grafite e Plus Jakarta Sans, a única família da marca.", pt: "Escalas Pink e Grafite e Plus Jakarta Sans, a única família da marca." }, target: { page: "colors", anchor: "colors" } },
  { icon: PenTool, title: { en: "Guide for designers", pt: "Guia para designers" }, desc: { en: "Step by step to create Figma Variables that translate directly to code.", pt: "Passo a passo para criar Figma Variables que viram código diretamente." }, target: { page: "tokens", anchor: "tokens-design" } },
  { icon: SunMoon, title: { en: "Light & dark mode", pt: "Modo claro e escuro" }, desc: { en: "Each theme is just a different set of values for the same token names.", pt: "Cada tema é só um conjunto diferente de valores para os mesmos nomes de token." }, target: { page: "colors", anchor: "colors-tokens" } },
];

const develop: CardItem[] = [
  { icon: Braces, title: { en: "Web — React + Tailwind CSS", pt: "Web — React + Tailwind CSS" }, desc: { en: "Semantic Tailwind classes connected to the token files.", pt: "Classes semânticas do Tailwind conectadas aos arquivos de tokens." }, target: { page: "develop" } },
  { icon: ArrowLeftRight, title: { en: "Design ↔ Dev Mapping", pt: "Mapeamento Design ↔ Dev" }, desc: { en: "Intent, Figma name, CSS property and Tailwind class for every token.", pt: "Intenção, nome no Figma, propriedade CSS e classe Tailwind para cada token." }, target: { page: "tokens", anchor: "tokens-bridge" } },
  { icon: FileCode2, title: { en: "Implementation in code", pt: "Implementação em código" }, desc: { en: "Anatomy of theme.css and index.css in this design system.", pt: "Anatomia do theme.css e do index.css neste design system." }, target: { page: "tokens", anchor: "tokens-definition" } },
];

export function useGo(onNavigate: Navigate) {
  return (t: Target) => {
    if (t.scroll) {
      document.getElementById(t.scroll)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (t.page) {
      onNavigate(t.page, t.anchor);
    }
  };
}

export function GetStartedShowcase({ onNavigate }: { onNavigate: Navigate }) {
  const go = useGo(onNavigate);
  const { t } = useI18n();

  return (
    <div className="space-y-14">
      <PageHeader
        eyebrow={t("Start", "Início")}
        title={t("Get Started", "Primeiros passos")}
        description={t(
          "Conheça o FindLook Design System: da marca e dos fundamentos aos componentes reutilizáveis, às diretrizes de conteúdo e aos tokens que conectam design e código.",
          "Conheça o FindLook Design System: da marca e dos fundamentos aos componentes reutilizáveis, às diretrizes de conteúdo e aos tokens que conectam design e código."
        )}
      />

      <CardGrid items={quickLinks} onGo={go} cols="lg:grid-cols-5" compact />

      <PageSection
        id="gs-overview"
        label={t("Overview", "Visão geral")}
        title={t("O que é o FindLook Design System?", "O que é o FindLook Design System?")}
        intro={
          <>
            <p>
              A FindLook é uma plataforma web de descoberta de moda local. Ela conecta quem procura roupas e acessórios às lojas e brechós da cidade, por meio de uma busca inteligente por foto, descrição ou ambas. A plataforma não vende: ela gera encontros. A compra acontece diretamente entre consumidor e loja.
            </p>
            <p>
              Este design system reúne os fundamentos, componentes e padrões que dão forma à experiência da FindLook. Ele existe para que cada tela, em qualquer jornada, seja consistente, acessível e fácil de evoluir. Serve a designers, desenvolvedores e a todo o time que cria, mantém ou comunica a FindLook.
            </p>
          </>
        }
      >
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            ["Consistência entre dois públicos", "Consumidores e lojistas usam a mesma plataforma com objetivos diferentes. As duas experiências falam a mesma língua visual e verbal."],
            ["Experiência intuitiva, didática e condutiva", "Os padrões orientam em cada etapa: o que fazer, por que fazer, o que acontece depois e como corrigir."],
            ["Transparência da informação", "Componentes e estados mostram quando um dado está confirmado pela loja, a confirmar, esgotado, sugerido por IA ou desatualizado."],
            ["Acessibilidade desde a base", "Meta WCAG 2.2 AA: contraste, navegação por teclado, rótulos, foco visível e feedback que não depende só de cor."],
            ["Mobile-first", "Os componentes são pensados primeiro para o celular, onde a busca acontece."],
            ["Agilidade e escala", "Design e desenvolvimento partem dos mesmos componentes, o que acelera o MVP e facilita as próximas fases."],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-[var(--radius)] border border-border bg-card p-4">
              <p className="text-[0.875rem] font-semibold text-foreground mb-1">{title}</p>
              <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
        <CardGrid items={overview} onGo={go} />
      </PageSection>

      <PageSection
        id="gs-structure"
        label={t("Structure", "Estrutura")}
        title={t("Using the system", "Usando o sistema")}
        intro={
          <p>
            {t(
              "O design system é organizado em seis partes principais. Cada uma inclui orientações, regras e os tokens que a sustentam.",
              "O design system é organizado em seis partes principais. Cada uma inclui orientações, regras e os tokens que a sustentam."
            )}
          </p>
        }
      >
        <CardGrid items={structure} onGo={go} />
      </PageSection>

      <PageSection
        id="gs-design"
        label={t("Design", "Design")}
        title={t("Design", "Design")}
        intro={
          <p>{t("Guidance, rules and tools to go from Figma to finished product without ambiguity or rework.", "Orientações, regras e ferramentas para ir do Figma ao produto final sem ambiguidade nem retrabalho.")}</p>
        }
      >
        <CardGrid items={design} onGo={go} />
      </PageSection>

      <PageSection
        id="gs-develop"
        label={t("Develop", "Desenvolvimento")}
        title={t("Develop", "Desenvolvimento")}
        intro={<p>{t("Implementation resources: token files, Tailwind mapping and the Design ↔ Dev reference.", "Recursos de implementação: arquivos de tokens, mapeamento do Tailwind e a referência Design ↔ Dev.")}</p>}
      >
        <CardGrid items={develop} onGo={go} />
      </PageSection>

      <p className="pt-6 border-t border-border text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {t("Version", "Versão")} 1.0 · 2026
      </p>
    </div>
  );
}

