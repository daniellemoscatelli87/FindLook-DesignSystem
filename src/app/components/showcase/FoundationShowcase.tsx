import React from "react";
import { TokenTable, type TokenGroup } from "./shared/TokenTable";
import { Heading } from "@/app/components/ui/heading";
import { Check, X } from "lucide-react";
import { useI18n } from "../../i18n";

const graphiteScale = [
  { name: "50",  var: "--graphite-50",  hex: "#F6F6F7" },
  { name: "100", var: "--graphite-100", hex: "#E9E9EC" },
  { name: "200", var: "--graphite-200", hex: "#D4D4D9" },
  { name: "300", var: "--graphite-300", hex: "#B3B3BC" },
  { name: "400", var: "--graphite-400", hex: "#888896" },
  { name: "500", var: "--graphite-500", hex: "#696977" },
  { name: "600", var: "--graphite-600", hex: "#51515C" },
  { name: "700", var: "--graphite-700", hex: "#3E3E46" },
  { name: "800", var: "--graphite-800", hex: "#2B2B31" },
  { name: "900", var: "--graphite-900", hex: "#1D1D20" },
  { name: "950", var: "--graphite-950", hex: "#060608" },
];

const pinkScale = [
  { name: "50",  hex: "#FEF2F4" },
  { name: "100", hex: "#FCE0E4" },
  { name: "200", hex: "#F8BCC6" },
  { name: "300", hex: "#F290A0" },
  { name: "400", hex: "#EC5A72" },
  { name: "500", hex: "#E62040" },
  { name: "600", hex: "#B91B35" },
  { name: "700", hex: "#91162B" },
  { name: "800", hex: "#6B1221" },
  { name: "900", hex: "#490E19" },
  { name: "950", hex: "#2A0A11" },
];

const semanticColors = [
  { name: "Background", pt: "Fundo",       token: "--background",        swatch: "bg-background",       text: "text-foreground", light: "#FFFFFF", dark: "#060608" },
  { name: "Surface (Card)", pt: "Superfície (Card)",   token: "--card",              swatch: "bg-card",             text: "text-card-foreground", light: "#FFFFFF", dark: "rgba(29,29,32,.75)" },
  { name: "Foreground", pt: "Texto (foreground)",       token: "--foreground",        swatch: "bg-foreground",       text: "text-background", light: "#060608", dark: "#F6F6F7" },
  { name: "Muted", pt: "Suave (muted)",            token: "--muted-foreground",  swatch: "bg-muted-foreground", text: "text-background", light: "#696977", dark: "#B3B3BC" },
  { name: "Primary", pt: "Primária",          token: "--primary",           swatch: "bg-primary",          text: "text-primary-foreground", light: "#E62040", dark: "#E62040" },
  { name: "Border", pt: "Borda",           token: "--border",            swatch: "bg-border",           text: "text-foreground", light: "rgba(6,6,8,.10)", dark: "rgba(255,255,255,.07)" },
  { name: "Success", pt: "Sucesso",          token: "--success",           swatch: "bg-success",          text: "text-white", light: "#4FB57B", dark: "#22C55E" },
  { name: "Warning", pt: "Aviso",          token: "--warning",           swatch: "bg-warning",          text: "text-white", light: "#E5A94E", dark: "#F5B320" },
  { name: "Error", pt: "Erro",            token: "--error",             swatch: "bg-error",            text: "text-white", light: "#E62040", dark: "#E62040" },
  { name: "Info", pt: "Informação",             token: "--info",              swatch: "bg-info",             text: "text-white", light: "#448ABC", dark: "#3B82F6" },
];

const typeScaleItems = [
  { label: "H1",          size: "text-[2.5rem]",   weight: "font-bold",     tracking: "tracking-[-0.02em]",  sample: "Heading One", ptLabel: "H1", ptSample: "Título Um" },
  { label: "H2",          size: "text-[2rem]",     weight: "font-bold",     tracking: "tracking-[-0.015em]", sample: "Heading Two", ptLabel: "H2", ptSample: "Título Dois" },
  { label: "H3",          size: "text-[1.5rem]",   weight: "font-semibold", tracking: "tracking-[-0.01em]",  sample: "Heading Three", ptLabel: "H3", ptSample: "Título Três" },
  { label: "H4",          size: "text-[1.25rem]",  weight: "font-semibold", tracking: "",                    sample: "Heading Four", ptLabel: "H4", ptSample: "Título Quatro" },
  { label: "Subtitle L",  size: "text-[1.25rem]",  weight: "font-medium",   tracking: "",                    sample: "Section subtitle large — contextual emphasis", ptLabel: "Subtítulo G", ptSample: "Subtítulo de seção grande — ênfase contextual" },
  { label: "Subtitle",    size: "text-[1.125rem]", weight: "font-medium",   tracking: "",                    sample: "Section subtitle — contextual emphasis", ptLabel: "Subtítulo", ptSample: "Subtítulo de seção — ênfase contextual" },
  { label: "Body Large",  size: "text-[1.125rem]", weight: "font-normal",   tracking: "",                    sample: "Large body — introductions, institutional pages and strategic copy.", ptLabel: "Corpo grande", ptSample: "Corpo grande — introduções, páginas institucionais e textos estratégicos." },
  { label: "Body",        size: "text-[1rem]",     weight: "font-normal",   tracking: "",                    sample: "Standard body text used for most content and descriptions.", ptLabel: "Corpo", ptSample: "Texto padrão usado na maior parte do conteúdo e das descrições." },
  { label: "Body Small",  size: "text-[0.875rem]", weight: "font-normal",   tracking: "",                    sample: "Small body — secondary info, cards and component copy.", ptLabel: "Corpo pequeno", ptSample: "Corpo pequeno — informações secundárias, cards e textos de componentes." },
  { label: "Label",       size: "text-[0.75rem]",  weight: "font-semibold", tracking: "tracking-[0.08em]",   sample: "DISCOVERY · STRATEGY · EXPERIENCE", ptLabel: "Rótulo", ptSample: "DESCOBERTA · ESTRATÉGIA · EXPERIÊNCIA" },
  { label: "Caption",     size: "text-[0.6875rem]",weight: "font-medium",   tracking: "tracking-[0.10em]",   sample: "CATEGORIES · DATES · METADATA · OVERLINE", ptLabel: "Legenda", ptSample: "CATEGORIAS · DATAS · METADADOS · OVERLINE" },
  { label: "Button",      size: "text-[0.875rem]", weight: "font-semibold", tracking: "tracking-[-0.01em]",  sample: "Button Label", ptLabel: "Botão", ptSample: "Rótulo do Botão" },
];

const displayScaleItems = [
  { label: "Display XL", size: "4rem",   weight: "700", tracking: "-0.03em",  sample: "DESIGN WHAT'S NEXT.", ptLabel: "Display XL", ptSample: "PROJETE O QUE VEM A SEGUIR." },
  { label: "Display L",  size: "3rem",   weight: "700", tracking: "-0.025em", sample: "MAKE EXPERIENCE MATTER.", ptLabel: "Display G", ptSample: "FAÇA A EXPERIÊNCIA IMPORTAR." },
  { label: "Display M",  size: "2.25rem",weight: "600", tracking: "-0.02em",  sample: "Build for change.", ptLabel: "Display M", ptSample: "Construa para a mudança." },
  { label: "Statement",  size: "1.5rem", weight: "500", tracking: "-0.01em",  sample: "Innovation · Technology · Energy", ptLabel: "Declaração", ptSample: "Inovação · Tecnologia · Energia" },
];

const radiusScale = [
  { name: "XS — 6px",   value: "6px",   cls: "rounded-[6px]" },
  { name: "SM — 8px",   value: "8px",   cls: "rounded-[8px]" },
  { name: "MD — 12px",  value: "12px",  cls: "rounded-[12px]" },
  { name: "LG — 16px",  value: "16px",  cls: "rounded-[16px]" },
  { name: "XL — 24px",  value: "24px",  cls: "rounded-[24px]" },
  { name: "2XL — 32px", value: "32px",  cls: "rounded-[32px]" },
  { name: "Full",       value: "9999px",cls: "rounded-full" },
];

const spacingScale = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96];

const shadowTokens = [
  { name: "shadow-xs",  label: "Subtle", pt: "Sutil",    css: "0 1px 2px rgba(6,6,8,0.05)" },
  { name: "shadow-sm",  label: "Small", pt: "Pequena",     css: "0 1px 3px rgba(6,6,8,0.07), 0 2px 6px rgba(6,6,8,0.05)" },
  { name: "shadow",     label: "Default", pt: "Padrão",   css: "0 2px 6px rgba(6,6,8,0.07), 0 6px 20px rgba(6,6,8,0.05)" },
  { name: "shadow-md",  label: "Medium", pt: "Média",    css: "0 4px 12px rgba(6,6,8,0.08), 0 12px 36px rgba(6,6,8,0.06)" },
  { name: "shadow-lg",  label: "Large", pt: "Grande",     css: "0 8px 24px rgba(6,6,8,0.09), 0 24px 64px rgba(6,6,8,0.07)" },
  { name: "shadow-xl",  label: "XL", pt: "XL",        css: "0 16px 48px rgba(6,6,8,0.10), 0 40px 96px rgba(6,6,8,0.08)" },
];

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-[1.5rem] font-semibold tracking-[-0.02em] text-foreground mb-1">{title}</h2>
      {description && <p className="text-[0.9375rem] text-muted-foreground leading-relaxed">{description}</p>}
    </div>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-4">{title}</h3>
      {children}
    </div>
  );
}

export function FoundationShowcase() {
  const { t, bi } = useI18n();
  const foundationTokenGroups = getFoundationTokenGroups(t);
  return (
    <div className="space-y-16">

      {/* ── COLORS ── */}
      <section id="colors">
        <SectionHeader title={t("Color Palette", "Paleta de cores")} description={t("Grafite neutro derivado do Preto Grafite #060608 e Pink FindLook #E62040 como cor de ação. Rosa Claro #FFF2F5 para superfícies de apoio.", "Grafite neutro derivado do Preto Grafite #060608 e Pink FindLook #E62040 como cor de ação. Rosa Claro #FFF2F5 para superfícies de apoio.")} />

        <SubSection title={t("Escala Grafite", "Escala Grafite")}>
          <div className="grid grid-cols-11 gap-1.5">
            {graphiteScale.map((c) => (
              <div key={c.name} className="flex flex-col gap-1.5">
                <div
                  className="h-14 rounded-[8px] border border-border/40"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-[0.6875rem] font-medium text-muted-foreground text-center">{c.name}</span>
                <span className="text-[0.625rem] text-muted-foreground/70 text-center font-mono">{c.hex}</span>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={t("Pink Scale", "Escala Pink")}>
          <div className="grid grid-cols-11 gap-1.5">
            {pinkScale.map((c) => (
              <div key={c.name} className="flex flex-col gap-1.5">
                <div
                  className="h-14 rounded-[8px] border border-border/40"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-[0.6875rem] font-medium text-muted-foreground text-center">{c.name}</span>
                <span className="text-[0.625rem] text-muted-foreground/70 text-center font-mono">{c.hex}</span>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={t("Semantic Tokens", "Tokens semânticos")}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {semanticColors.map((c) => (
              <div key={c.name} className="flex flex-col gap-2">
                <div className={`h-12 rounded-[10px] border border-border/40 ${c.swatch}`} />
                <div>
                  <div className="text-[0.8125rem] font-medium text-foreground">{bi({ en: c.name, pt: c.pt })}</div>
                  <div className="text-[0.6875rem] text-muted-foreground font-mono">{c.token}</div>
                  <div className="mt-1.5 space-y-0.5 font-mono text-[0.625rem]">
                    <div className="flex items-center justify-between gap-2 text-muted-foreground">
                      <span className="uppercase tracking-[0.08em] opacity-70">{t("Light", "Claro")}</span>
                      <span className="text-foreground/80">{c.light}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-muted-foreground">
                      <span className="uppercase tracking-[0.08em] opacity-70">{t("Dark", "Escuro")}</span>
                      <span className="text-foreground/80">{c.dark}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SubSection>
      </section>

      {/* ── TYPOGRAPHY ── */}
      <section id="typography" className="space-y-10">
        <SectionHeader title={t("Typography", "Tipografia")} description={t("Three-family system with complementary roles: clarity, impact and emotion.", "Sistema de três famílias com papéis complementares: clareza, impacto e emoção.")} />

        <SubSection title={t("Headline with highlight (hero pattern)", "Título com destaque (padrão do hero)")}>
          <div className="bg-card rounded-[16px] border border-border p-6 sm:p-8 space-y-6" style={{ boxShadow: "var(--shadow-xs)" }}>
            <Heading level={2} size="hero">Uma cidade. **Muitos estilos.**</Heading>
            <div className="h-px bg-border" />
            <div className="grid gap-6 md:grid-cols-2">
              <div><p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-2">{t("Page title", "Título de página")}</p><Heading level={3} size="page">Princípios de **design**</Heading></div>
              <div><p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-2">{t("Section / card", "Seção / card")}</p><Heading level={3} size="section">Seja encontrado por quem já **procura o que você vende**.</Heading></div>
            </div>
            <ul className="grid gap-1.5 text-[0.8125rem] text-muted-foreground sm:grid-cols-2">
              <li>• {t("One highlight per title, one to three words, in the primary color; never the whole title.", "Um destaque por título, de uma a três palavras, na cor primária; nunca o título inteiro.")}</li>
              <li>• {t("Highlight the expression that carries the value (“ativo estratégico”), not a connector.", "Destaque a expressão que carrega o valor (“ativo estratégico”), não um conectivo.")}</li>
              <li>• {t("Plus Jakarta Sans Bold (700), as on the site hero. Hero: tracking -0.03em, line height 1.1. Page: -0.035em. Section: -0.02em.", "Plus Jakarta Sans Bold (700), como no hero do site. Hero: tracking -0,03em, entrelinha 1,1. Página: -0,035em. Seção: -0,02em.")}</li>
              <li>• {t("Large text, so the primary color passes contrast on light and dark backgrounds.", "Texto grande, então a cor primária passa no contraste nos fundos claro e escuro.")}</li>
            </ul>
            <pre className="overflow-x-auto rounded-[10px] bg-muted/60 p-3 text-[0.75rem] text-muted-foreground"><code>{`import { Heading } from "@/app/components/ui/heading";
<Heading level={1} size="hero">Uma cidade. **Muitos estilos.**</Heading>`}</code></pre>
          </div>
        </SubSection>

        {/* ── Role overview ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              role: "PRIMARY", roleLabel: t("TEXTO", "TEXTO"),
              family: "Plus Jakarta Sans",
              token: "--font-sans",
              proportion: "Regular 400 · Medium 500",
              pillColor: "bg-primary/10 text-primary border-primary/20",
              barColor: "bg-primary",
              traits: [t("Human", "Humano"), t("Functional", "Funcional"), t("Clear", "Claro"), t("System", "Sistema")],
              uses: t("Corpo · UI · Navegação · Formulários · Legendas", "Corpo · UI · Navegação · Formulários · Legendas"),
              weights: "400 · 500",
              specimen: t("Textos claros e objetivos.", "Textos claros e objetivos."),
              specimenStyle: { fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1.5rem", letterSpacing: "-0.01em" },
            },
            {
              role: "DISPLAY", roleLabel: t("TÍTULOS", "TÍTULOS"),
              family: "Plus Jakarta Sans",
              token: "--font-display",
              proportion: "ExtraBold 800 · Bold 700",
              pillColor: "bg-primary/10 text-primary-text border-primary/20",
              barColor: "bg-primary",
              traits: [t("Forte", "Forte"), t("Urbana", "Urbana"), t("Confiante", "Confiante"), t("Vibrante", "Vibrante")],
              uses: t("Títulos de página e seção · Números · Declarações · Campanhas", "Títulos de página e seção · Números · Declarações · Campanhas"),
              weights: "700 · 800",
              specimen: t("Uma cidade. Muitos estilos.", "Uma cidade. Muitos estilos."),
              specimenStyle: { fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.03em" },
            },
            {
              role: "ACCENT", roleLabel: t("DESTAQUES", "DESTAQUES"),
              family: "Plus Jakarta Sans",
              token: "--font-accent",
              proportion: "Medium 500 · SemiBold 600",
              pillColor: "bg-muted text-foreground border-border",
              barColor: "bg-graphite-400",
              traits: [t("Próxima", "Próxima"), t("Prática", "Prática"), t("Direta", "Direta"), t("Legível", "Legível")],
              uses: t("Slogan · Subtítulos · Rótulos curtos · Botões", "Slogan · Subtítulos · Rótulos curtos · Botões"),
              weights: "500 · 600",
              specimen: t("Seu estilo por perto.", "Seu estilo por perto."),
              specimenStyle: { fontFamily: "var(--font-accent)", fontWeight: 500, fontSize: "1.5rem", letterSpacing: "-0.01em" },
            },
          ].map(f => (
            <div key={f.role} className="rounded-[16px] border border-border bg-card p-5 flex flex-col gap-4" style={{ boxShadow: "var(--shadow-xs)" }}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className={`inline-block px-2 py-0.5 rounded-[5px] border text-[0.5625rem] font-bold tracking-[0.08em] ${f.pillColor}`}>{f.roleLabel}</span>
                  <p className="mt-1.5 text-[0.9375rem] font-bold text-foreground leading-tight">{f.family}</p>
                  <p className="text-[0.625rem] font-mono text-muted-foreground mt-0.5">{f.token}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[1.5rem] font-black text-foreground leading-none">{f.proportion}</p>
                  <p className="text-[0.5625rem] text-muted-foreground mt-0.5">{t("of usage", "de uso")}</p>
                </div>
              </div>

              {/* Proportion bar */}
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${f.barColor}`} style={{ width: f.proportion }} />
              </div>

              {/* Traits */}
              <div className="flex flex-wrap gap-1">
                {f.traits.map((tr, ti) => (
                  <span key={ti} className="px-2 py-0.5 rounded-[5px] bg-muted text-[0.5625rem] font-semibold text-muted-foreground">{tr}</span>
                ))}
              </div>

              {/* Specimen */}
              <div className="rounded-[10px] bg-muted/40 border border-border/60 px-4 py-3 min-h-[52px] flex items-center">
                <span style={f.specimenStyle} className="text-foreground leading-tight">{f.specimen}</span>
              </div>

              {/* Meta */}
              <div className="space-y-1.5 text-[0.6875rem]">
                <p className="text-muted-foreground leading-relaxed"><span className="font-semibold text-foreground/70">{t("Use in:", "Usar em:")}</span> {f.uses}</p>
                <p className="text-muted-foreground"><span className="font-semibold text-foreground/70">{t("Weights:", "Pesos:")}</span> {f.weights}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Plus Jakarta Sans — escala ── */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h3 className="text-[0.8125rem] font-bold text-foreground uppercase tracking-[0.07em]">Plus Jakarta Sans — {t("Type scale", "Escala tipográfica")}</h3>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="bg-card rounded-[16px] border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-xs)" }}>
            {typeScaleItems.map((item, i) => (
              <div
                key={item.label}
                className={`flex items-baseline gap-6 px-6 py-4 ${i < typeScaleItems.length - 1 ? "border-b border-border/60" : ""}`}
              >
                <div className="w-24 shrink-0">
                  <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{t(item.label, item.ptLabel)}</span>
                </div>
                <div className={`${item.size} ${item.weight} ${item.tracking} text-foreground leading-tight flex-1 min-w-0`}
                  style={{ fontFamily: "var(--font-sans)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {t(item.sample, item.ptSample)}
                </div>
                <div className="shrink-0 hidden md:flex gap-3 text-[0.6875rem] text-muted-foreground/70 font-mono">
                  <span>{item.size.replace("text-[", "").replace("]", "")}</span>
                  <span>{item.weight.replace("font-", "")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Plus Jakarta Sans ExtraBold — escala de títulos ── */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h3 className="text-[0.8125rem] font-bold text-foreground uppercase tracking-[0.07em]">Plus Jakarta Sans ExtraBold — {t("Escala de títulos", "Escala de títulos")}</h3>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="bg-card rounded-[16px] border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-xs)" }}>
            {displayScaleItems.map((item, i) => (
              <div
                key={item.label}
                className={`flex items-baseline gap-6 px-6 py-4 ${i < displayScaleItems.length - 1 ? "border-b border-border/60" : ""}`}
              >
                <div className="w-24 shrink-0">
                  <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{t(item.label, item.ptLabel)}</span>
                </div>
                <div
                  className="text-foreground leading-tight flex-1 min-w-0"
                  style={{ fontFamily: "var(--font-display)", fontWeight: item.weight, fontSize: item.size, letterSpacing: item.tracking, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {t(item.sample, item.ptSample)}
                </div>
                <div className="shrink-0 hidden md:flex gap-3 text-[0.6875rem] text-muted-foreground/70 font-mono">
                  <span>{item.size}</span>
                  <span>{item.weight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Plus Jakarta Sans — pesos em contraste ── */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h3 className="text-[0.8125rem] font-bold text-foreground uppercase tracking-[0.07em]">Plus Jakarta Sans — {t("Pesos em contraste", "Pesos em contraste")}</h3>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Specimen cards */}
            <div className="bg-card rounded-[16px] border border-border p-6 space-y-5" style={{ boxShadow: "var(--shadow-xs)" }}>
              <span className="text-[0.5625rem] font-bold uppercase tracking-[0.10em] text-muted-foreground" style={{ fontFamily: "var(--font-sans)" }}>{t("Título e destaque", "Título e destaque")}</span>
              <p className="text-foreground leading-snug" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "2rem", letterSpacing: "-0.025em" }}>
                {t("Busque. Encontre.", "Busque. Encontre.")}{" "}
                <span style={{ fontFamily: "var(--font-accent)", fontWeight: 500, color: "var(--primary)" }}>{t("Conecte.", "Conecte.")}</span>
              </p>
              <p className="text-[0.75rem] text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-sans)" }}>
                {t("ExtraBold cria impacto. Medium em pink destaca a palavra da ação, sem mudar de família.", "ExtraBold cria impacto. Medium em pink destaca a palavra da ação, sem mudar de família.")}
              </p>
            </div>

            <div className="bg-card rounded-[16px] border border-border p-6 space-y-5" style={{ boxShadow: "var(--shadow-xs)" }}>
              <span className="text-[0.5625rem] font-bold uppercase tracking-[0.10em] text-muted-foreground" style={{ fontFamily: "var(--font-sans)" }}>{t("Editorial statement", "Declaração editorial")}</span>
              <div className="space-y-1">
                <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-primary" style={{ fontFamily: "var(--font-sans)" }}>{t("MODA LOCAL", "MODA LOCAL")}</p>
                <p className="text-foreground leading-none" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.75rem", letterSpacing: "-0.02em" }}>{t("Já deu um Find?", "Já deu um Find?")}</p>
                <p className="text-foreground" style={{ fontFamily: "var(--font-accent)", fontWeight: 500, fontSize: "1.25rem" }}>{t("Seu estilo por perto.", "Seu estilo por perto.")}</p>
                <p className="text-[0.8125rem] text-muted-foreground leading-relaxed pt-1" style={{ fontFamily: "var(--font-sans)" }}>
                  {t("Conectamos quem procura roupas e acessórios às lojas e brechós da cidade. Não vendemos produtos. Geramos encontros.", "Conectamos quem procura roupas e acessórios às lojas e brechós da cidade. Não vendemos produtos. Geramos encontros.")}
                </p>
              </div>
            </div>

            {/* Rules */}
            {/* Usage rules — 4 detailed cards */}
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3">

              {/* ✓ Use as an accent */}
              <div className="rounded-[14px] border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-xs)" }}>
                <div className="px-4 pt-4 pb-3 border-b border-border" style={{ background: "var(--success-muted)" }}>
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "color-mix(in srgb, var(--success) 18%, transparent)" }}>
                      <Check style={{ height: 11, width: 11, color: "var(--success)" }} />
                    </div>
                    <p className="text-[0.6875rem] font-bold" style={{ color: "var(--success)" }}>{t("Use os destaques em", "Use os destaques em")}</p>
                  </div>
                </div>
                <ul className="px-4 py-3 space-y-2.5">
                  {[t("Slogan e assinaturas", "Slogan e assinaturas"), t("Subtítulos e palavras de ação", "Subtítulos e palavras de ação"), t("Rótulos curtos e botões", "Rótulos curtos e botões")].map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full shrink-0 bg-success opacity-70" />
                      <span className="text-[0.6875rem] text-muted-foreground leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ✕ Evitar */}
              <div className="rounded-[14px] border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-xs)" }}>
                <div className="px-4 pt-4 pb-3 border-b border-border" style={{ background: "rgba(230,32,64,0.06)" }}>
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(230,32,64,0.15)" }}>
                      <X style={{ height: 11, width: 11, color: "#E62040" }} />
                    </div>
                    <p className="text-[0.6875rem] font-bold" style={{ color: "#E62040" }}>{t("Avoid", "Evitar")}</p>
                  </div>
                </div>
                <ul className="px-4 py-3 space-y-2.5">
                  {[t("Fontes decorativas ou de outra família", "Fontes decorativas ou de outra família"), t("Excesso de pesos na mesma tela", "Excesso de pesos na mesma tela"), t("Texto em caixa alta contínua", "Texto em caixa alta contínua")].map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#E62040", opacity: 0.6 }} />
                      <span className="text-[0.6875rem] text-muted-foreground leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Peso preferencial */}
              <div className="rounded-[14px] border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-xs)" }}>
                <div className="px-4 pt-4 pb-3 border-b border-border bg-muted/20">
                  <p className="text-[0.6875rem] font-bold text-foreground">{t("Pesos", "Pesos")}</p>
                </div>
                <div className="px-4 py-3 space-y-3">
                  {[
                    { label: "Regular 400", specimen: "Aa", italic: false, allowed: true },
                    { label: "Medium 500",  specimen: "Aa", italic: false, allowed: true },
                    { label: "Bold 700",    specimen: "Aa", italic: false, allowed: true },
                    { label: "Light 300",   specimen: "Aa", italic: false, allowed: false },
                  ].map(w => (
                    <div key={w.label} className="flex items-center gap-2.5">
                      <div className={`h-7 w-7 rounded-[7px] flex items-center justify-center shrink-0 ${w.allowed ? "bg-muted/50" : "bg-muted/20"}`}>
                        <span style={{
                          fontFamily: "var(--font-accent)",
                          fontStyle: w.italic ? "italic" : "normal",
                          fontWeight: w.label.includes("Bold") ? 700 : w.label.includes("Medium") ? 500 : w.label.includes("Light") ? 300 : 400,
                          fontSize: "0.9375rem",
                          color: w.allowed ? "var(--foreground)" : "var(--muted-foreground)",
                          opacity: w.allowed ? 1 : 0.4,
                        }}>{w.specimen}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-[0.625rem] font-semibold leading-none ${w.allowed ? "text-foreground" : "text-muted-foreground line-through"}`}>{w.label}</p>
                        <p className="text-[0.5625rem] text-muted-foreground mt-0.5">{w.allowed ? t("recommended", "recomendado") : t("do not use", "não use")}</p>
                      </div>
                      <span className={`text-[0.5625rem] font-bold ${w.allowed ? "text-success" : "text-destructive/60"}`}>{w.allowed ? "✓" : "✕"}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended proportion */}
              <div className="rounded-[14px] border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-xs)" }}>
                <div className="px-4 pt-4 pb-3 border-b border-border bg-muted/20">
                  <p className="text-[0.6875rem] font-bold text-foreground">{t("Proportion in layout", "Proporção no layout")}</p>
                </div>
                <div className="px-4 py-3 space-y-3">
                  {/* Stacked bar */}
                  <div className="space-y-1.5">
                    <p className="text-[0.5625rem] font-semibold text-muted-foreground uppercase tracking-[0.07em]">{t("Ideal composition", "Composição ideal")}</p>
                    <div className="flex h-4 w-full rounded-full overflow-hidden gap-px">
                      <div className="h-full rounded-l-full" style={{ width: "70%", background: "var(--graphite-400)" }} />
                      <div className="h-full" style={{ width: "20%", background: "var(--primary)" }} />
                      <div className="h-full rounded-r-full" style={{ width: "10%", background: "var(--graphite-700)" }} />
                    </div>
                    <div className="flex items-center justify-between text-[0.5rem] font-mono text-muted-foreground">
                      <span>70%</span><span>20%</span><span>10%</span>
                    </div>
                  </div>
                  {/* Legend */}
                  <div className="space-y-2">
                    {[
                      { color: "var(--graphite-400)", label: "Regular / Medium — textos", pct: "70%" },
                      { color: "var(--primary)",      label: "ExtraBold / Bold — títulos", pct: "20%" },
                      { color: "var(--graphite-700)", label: "SemiBold — rótulos e botões", pct: "10%" },
                    ].map(l => (
                      <div key={l.label} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full shrink-0" style={{ background: l.color }} />
                        <span className="text-[0.5625rem] text-muted-foreground flex-1 leading-none">{l.label}</span>
                        <span className="text-[0.5625rem] font-bold text-foreground">{l.pct}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[0.5625rem] text-muted-foreground/60 leading-relaxed border-t border-border pt-2">
                    {t("Uma só família. Evitar excesso de pesos e texto em caixa alta contínua.", "Uma só família. Evitar excesso de pesos e texto em caixa alta contínua.")}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── SPACING ── */}
      <section id="spacing">
        <SectionHeader title={t("Spacing Scale", "Escala de espaçamento")} description={t("8-point grid system with 4px base unit. Consistent spacing creates rhythm and visual harmony.", "Sistema de grid de 8 pontos com unidade base de 4px. Espaçamento consistente cria ritmo e harmonia visual.")} />

        <div className="space-y-3">
          {spacingScale.map((sp) => (
            <div key={sp} className="flex items-center gap-4">
              <span className="w-12 text-right text-[0.8125rem] font-mono text-muted-foreground shrink-0">{sp}px</span>
              <div
                className="bg-primary/80 rounded-[4px] h-5"
                style={{ width: `${sp * 2}px`, minWidth: "4px" }}
              />
              <span className="text-[0.75rem] text-muted-foreground/70">--space-{sp / 4}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── RADIUS ── */}
      <section id="radius">
        <SectionHeader title={t("Border Radius", "Raio de borda")} description={t("Modern rounded corners. Larger radii for cards and dialogs; smaller for inline elements.", "Cantos arredondados modernos. Raios maiores para cards e diálogos; menores para elementos inline.")} />

        <div className="flex flex-wrap gap-6">
          {radiusScale.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-3">
              <div
                className={`w-20 h-20 border-2 border-primary/60 bg-primary/10 ${r.cls}`}
              />
              <div className="text-center">
                <div className="text-[0.8125rem] font-medium text-foreground">{r.name.split(" — ")[0] === "Full" ? t("Full", "Total") : r.name.split(" — ")[0]}</div>
                <div className="text-[0.6875rem] text-muted-foreground font-mono">{r.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SHADOWS ── */}
      <section id="shadows">
        <SectionHeader title={t("Shadow System", "Sistema de sombras")} description={t("Diffused floating shadows for light mode. Ambient depth shadows for dark mode.", "Sombras flutuantes difusas para o modo claro. Sombras de profundidade ambiente para o modo escuro.")} />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {shadowTokens.map((s) => (
            <div key={s.name} className="flex flex-col gap-3">
              <div
                className="h-20 bg-card rounded-[12px]"
                style={{ boxShadow: s.css }}
              />
              <div>
                <div className="text-[0.875rem] font-medium text-foreground">{t(s.label, s.pt)}</div>
                <div className="text-[0.75rem] text-muted-foreground font-mono">--{s.name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tokens Reference ── */}
      <section id="colors-tokens" className="space-y-5">
        <SectionHeader title={t("Tokens", "Tokens")} description={t("All semantic CSS custom properties. Copy any token name and use it in var(--token-name).", "Todas as propriedades CSS semânticas. Copie o nome de qualquer token e use em var(--token-name).")} />
        <TokenTable groups={foundationTokenGroups} />
      </section>
    </div>
  );
}

function getFoundationTokenGroups(t: (en: string, pt: string) => string): TokenGroup[] {
  return [
  {
    group: t("Brand", "Marca"),
    tokens: [
      { name: "--primary",            description: t("Brand accent — pink", "Acento da marca — pink"),          light: "#E62040", dark: "#E62040", isColor: true },
      { name: "--primary-foreground", description: t("Text on primary", "Texto sobre primária"),                 light: "#FFFFFF", dark: "#FFFFFF", isColor: true },
      { name: "--primary-muted",      description: t("Tinted primary background", "Fundo com tom da primária"),       light: "rgba(230,32,64,0.10)", dark: "rgba(230,32,64,0.15)", isColor: true },
    ],
  },
  {
    group: t("Background & Surface", "Fundo e superfície"),
    tokens: [
      { name: "--background",      description: t("Page background", "Fundo da página"),           light: "#F6F6F7",              dark: "#060608",              isColor: true },
      { name: "--foreground",      description: t("Primary text", "Texto principal"),              light: "#1D1D20",              dark: "#F6F6F7",              isColor: true },
      { name: "--muted-foreground",description: t("Secondary / label text", "Texto secundário / rótulos"),    light: "#888896",              dark: "#B3B3BC",              isColor: true },
      { name: "--card",            description: t("Card surface", "Superfície do card"),              light: "#FFFFFF",              dark: "rgba(29,29,32,0.75)",  isColor: true },
      { name: "--card-foreground", description: t("Text on card", "Texto sobre o card"),              light: "#1D1D20",              dark: "#F6F6F7",              isColor: true },
      { name: "--popover",         description: t("Popover / tooltip surface", "Superfície de popover / tooltip"), light: "#FFFFFF",              dark: "rgba(29,29,32,0.95)",  isColor: true },
      { name: "--muted",           description: t("Subtle background", "Fundo sutil"),        light: "#E9E9EC",              dark: "rgba(43,43,49,0.60)", isColor: true },
      { name: "--accent",          description: t("Hover background", "Fundo de hover"),         light: "#E9E9EC",              dark: "rgba(43,43,49,0.60)", isColor: true },
      { name: "--secondary",       description: t("Secondary button surface", "Superfície do botão secundário"), light: "#F6F6F7",              dark: "rgba(43,43,49,0.80)", isColor: true },
    ],
  },
  {
    group: t("Semantic Colors", "Cores semânticas"),
    tokens: [
      { name: "--success",         description: t("Positive / confirmed", "Positivo / confirmado"),     light: "#4fb57b", dark: "#22C55E", isColor: true },
      { name: "--warning",         description: t("Caution / pending", "Atenção / pendente"),        light: "#e5a94e", dark: "#f5b320", isColor: true },
      { name: "--error",           description: t("Error / danger", "Erro / perigo"),           light: "#E62040", dark: "#E62040", isColor: true },
      { name: "--info",            description: t("Informational", "Informativo"),            light: "#448abc", dark: "#3B82F6", isColor: true },
      { name: "--destructive",     description: t("Destructive action", "Ação destrutiva"),       light: "#E62040", dark: "#E62040", isColor: true },
      { name: "--violet",          description: t("Accent purple", "Roxo de destaque"),            light: "#ba69dc", dark: "#eb6cff", isColor: true },
      { name: "--orange",          description: t("Accent orange", "Laranja de destaque"),            light: "#fa9852", dark: "#ff8833", isColor: true },
    ],
  },
  {
    group: t("Border & Ring", "Borda e anel"),
    tokens: [
      { name: "--border",       description: t("Default border", "Borda padrão"),          light: "rgba(29,29,32,0.09)",  dark: "rgba(255,255,255,0.07)", isColor: true },
      { name: "--border-strong",description: t("Emphasized border", "Borda enfatizada"),       light: "rgba(29,29,32,0.16)",  dark: "rgba(255,255,255,0.12)", isColor: true },
      { name: "--ring",         description: t("Focus ring / outline", "Anel de foco / contorno"),    light: "rgba(230,32,64,0.35)", dark: "rgba(230,32,64,0.40)",   isColor: true },
    ],
  },
  {
    group: t("Charts", "Gráficos"),
    tokens: [
      { name: "--chart-1", description: t("Series 1 — pink", "Série 1 — pink"),  light: "#E62040", dark: "#E62040", isColor: true },
      { name: "--chart-2", description: t("Series 2 — graphite", "Série 2 — grafite"), light: "#696977", dark: "#888896", isColor: true },
      { name: "--chart-3", description: t("Series 3", "Série 3"),            light: "#B3B3BC", dark: "#696977", isColor: true },
      { name: "--chart-4", description: t("Series 4", "Série 4"),            light: "#D4D4D9", dark: "#51515C", isColor: true },
      { name: "--chart-5", description: t("Series 5", "Série 5"),            light: "#E9E9EC", dark: "#3E3E46", isColor: true },
    ],
  },
  {
    group: t("Shape", "Forma"),
    tokens: [
      { name: "--radius",    description: t("Base border radius", "Raio de borda base"),    light: "0.75rem",                   dark: undefined },
      { name: "--radius-sm", description: t("Small radius (card)", "Raio pequeno (card)"),   light: "calc(0.75rem - 4px)",        dark: undefined },
      { name: "--radius-md", description: t("Medium radius", "Raio médio"),         light: "0.75rem",                   dark: undefined },
      { name: "--radius-lg", description: t("Large radius (dialog)", "Raio grande (diálogo)"), light: "calc(0.75rem + 4px)",        dark: undefined },
      { name: "--radius-xl", description: t("XL radius (hero card)", "Raio XL (card hero)"), light: "calc(0.75rem + 12px)",       dark: undefined },
    ],
  },
  {
    group: t("Elevation", "Elevação"),
    tokens: [
      { name: "--shadow-xs", description: t("Surface lift (inputs)", "Elevação de superfície (inputs)"),  light: "0 1px 2px …",             dark: "0 1px 2px (darker)" },
      { name: "--shadow-sm", description: t("Cards, dropdowns", "Cards, dropdowns"),       light: "0 1px 3px …",             dark: "0 1px 3px (darker)" },
      { name: "--shadow",    description: t("Default elevation", "Elevação padrão"),      light: "0 2px 6px …",             dark: "0 2px 8px (darker)" },
      { name: "--shadow-md", description: t("Popover, modals", "Popover, modais"),       light: "0 4px 12px …",            dark: "0 4px 16px (darker)" },
      { name: "--shadow-lg", description: t("Large panel", "Painel grande"),           light: "0 8px 24px …",            dark: "0 8px 32px (darker)" },
      { name: "--shadow-xl", description: t("Full-page overlays", "Overlays de página inteira"),    light: "0 16px 48px …",           dark: "0 16px 64px (darker)" },
    ],
  },
  {
    group: t("Typography — Font Families", "Tipografia — Famílias de fonte"),
    tokens: [
      { name: "--font-sans",    description: t("TEXTO — Plus Jakarta Sans Regular/Medium", "TEXTO — Plus Jakarta Sans Regular/Medium"),   light: "Plus Jakarta Sans" },
      { name: "--font-display", description: t("TÍTULOS — Plus Jakarta Sans ExtraBold/Bold", "TÍTULOS — Plus Jakarta Sans ExtraBold/Bold"),       light: "Plus Jakarta Sans" },
      { name: "--font-accent",  description: t("DESTAQUES — Plus Jakarta Sans Medium/SemiBold", "DESTAQUES — Plus Jakarta Sans Medium/SemiBold"),     light: "Plus Jakarta Sans" },
      { name: "--font-mono",    description: t("Code — JetBrains Mono", "Código — JetBrains Mono"),               light: "JetBrains Mono" },
    ],
  },
  {
    group: t("Typography — Weights", "Tipografia — Pesos"),
    tokens: [
      { name: "--font-weight-normal",   description: t("Regular — body text", "Regular — texto de corpo"),           light: "400" },
      { name: "--font-weight-medium",   description: t("Medium — subtitles, controls", "Medium — subtítulos, controles"),  light: "500" },
      { name: "--font-weight-semibold", description: t("SemiBold — headings, nav", "SemiBold — títulos, navegação"),      light: "600" },
      { name: "--font-weight-bold",     description: t("Bold — titles, impact", "Bold — títulos, impacto"),         light: "700" },
      { name: "800",                    description: t("ExtraBold — display (Jakarta)", "ExtraBold — display (Jakarta)"),  light: "800" },
    ],
  },
];
}
