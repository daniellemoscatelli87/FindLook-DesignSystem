import React from "react";
import { TokenTable, type TokenGroup } from "./shared/TokenTable";
import { valorDoToken } from "./shared/temaTokens";
import { Heading } from "@/app/components/ui/heading";
import { Check, X } from "lucide-react";
import { useI18n } from "../../i18n";
import { VejaEm } from "./shared/VejaEm";
import { SectionHeader } from "./shared/SectionHeader";
import { GradeDeCards } from "../ui/grade-de-cards";

const graphiteScale = [
  { name: "50",  var: "--graphite-50",  hex: "#F6F6F7" },
  { name: "100", var: "--graphite-100", hex: "#E9E9EC" },
  { name: "200", var: "--graphite-200", hex: "#D4D4D9" },
  { name: "300", var: "--graphite-300", hex: "#B3B3BC" },
  { name: "400", var: "--graphite-400", hex: "#888896" },
  { name: "500", var: "--graphite-500", hex: "#696977" },
  { name: "600", var: "--graphite-600", hex: "#51515C" },
  { name: "700", var: "--graphite-700", hex: "#3E3E46" },
  { name: "800", var: "--graphite-800", hex: "#2C2C33" },
  { name: "900", var: "--graphite-900", hex: "#19191C" },
  { name: "950", var: "--graphite-950", hex: "#000000" },
];

const pinkScale = [
  { name: "50",  hex: "#FFF2F5" },
  { name: "100", hex: "#FEDFE6" },
  { name: "200", hex: "#FBBACB" },
  { name: "300", hex: "#F78BA7" },
  { name: "400", hex: "#F34E7C" },
  { name: "500", hex: "#FC0256" },
  { name: "600", hex: "#BC0A41" },
  { name: "700", hex: "#950333" },
  { name: "800", hex: "#6F0427" },
  { name: "900", hex: "#4C071D" },
  { name: "950", hex: "#2B0813" },
];

/* Papéis do pink (decisão da dona do produto, 25/11/2026): contrastes medidos sobre o branco */
const papeisDoPink = [
  { papel: "Botão principal (texto branco)", token: "--primary", passo: "pink-550", hex: "#E8004E", fundo: "var(--pink-550)", cor: "#FFFFFF", amostra: "Encontrar peças", amostraCls: "text-[0.9375rem] font-semibold", uso: "Fundo de botões e áreas cheias com texto branco; hover em pink-575 (#D20648, 5,4:1).", contraste: "Texto branco: 4,6:1 (AA)" },
  { papel: "Texto colorido grande", token: "--primary-destaque", passo: "pink-500", hex: "#FC0256", fundo: "#FFFFFF", cor: "var(--pink-500)", amostra: "descoberta", amostraCls: "text-[1.75rem] font-bold tracking-[-0.02em]", uso: "Só texto grande (24 px ou mais, ou negrito de 18,66 px ou mais): destaques de títulos e do hero.", contraste: "Sobre o branco: 3,98:1 (AA para texto grande)" },
  { papel: "Texto colorido pequeno", token: "--primary-text", passo: "pink-600", hex: "#BC0A41", fundo: "#FFFFFF", cor: "var(--pink-600)", amostra: "Ver todas as lojas", amostraCls: "text-[0.875rem] font-semibold underline underline-offset-4", uso: "Links, item ativo do menu, chips, rótulos pequenos e texto de erro.", contraste: "Sobre o branco: 6,4:1 · sobre --primary-muted: 5,2:1" },
];

/* Três rosas claros (decisão da dona do produto, 27/11/2026): fundos de estados selecionados, sempre com texto em
   --primary-text. Só a ação principal da etapa é preenchida (Opção A). Contrastes do pink-600 (#BC0A41) sobre cada um. */
const rosasClaros = [
  { nivel: "1", token: "--primary-sutil", hex: "#FFF5F8", papel: "Selecionado", uso: "Estado selecionado: item ativo do menu, botão “✓ Selecionado”, segmento ativo, chip ativo e linha selecionada. O card selecionado continua branco.", contraste: "6,0:1", amostra: "card" as const },
  { nivel: "2", token: "--primary-suave", hex: "#FFECF0", papel: "Hover e selos", uso: "Hover dos itens rosados (menu, chips, botão “Selecionar”), um pouco mais escuro que o selecionado; e selos como “Recomendado”.", contraste: "5,7:1", amostra: "chip" as const },
  { nivel: "3", token: "--primary-muted", hex: "#FEDFE6", papel: "Bases e destaques", uso: "Base dos ícones na cor da marca e destaques (por exemplo, o plano destacado numa tabela).", contraste: "5,2:1", amostra: "botao" as const },
];

const semanticColors = [
  { name: "Background", pt: "Fundo",       token: "--background",        swatch: "bg-background",       text: "text-foreground", light: "#FFFFFF", dark: "#000000" },
  { name: "Surface (Card)", pt: "Superfície (Card)",   token: "--card",              swatch: "bg-card",             text: "text-card-foreground", light: "#FFFFFF", dark: "rgba(25,25,28,.75)" },
  { name: "Foreground", pt: "Texto (foreground)",       token: "--foreground",        swatch: "bg-foreground",       text: "text-background", light: "#000000", dark: "#F6F6F7" },
  { name: "Muted", pt: "Suave (muted)",            token: "--muted-foreground",  swatch: "bg-muted-foreground", text: "text-background", light: "#696977", dark: "#B3B3BC" },
  { name: "Primary", pt: "Primária",          token: "--primary",           swatch: "bg-primary",          text: "text-primary-foreground", light: "#E8004E", dark: "#E8004E" },
  { name: "Border", pt: "Borda",           token: "--border",            swatch: "bg-border",           text: "text-foreground", light: "rgba(0,0,0,.10)", dark: "rgba(255,255,255,.07)" },
  { name: "Success", pt: "Sucesso",          token: "--success",           swatch: "bg-success",          text: "text-success-foreground", light: "#31835D", dark: "#41B47F" },
  { name: "Warning", pt: "Aviso",          token: "--warning",           swatch: "bg-warning",          text: "text-warning-foreground", light: "#F0B135", dark: "#F0B135" },
  { name: "Error", pt: "Erro",            token: "--error",             swatch: "bg-error",            text: "text-graphite-950", light: "#FC0256", dark: "#FC0256" },
  { name: "Info", pt: "Informação",             token: "--info",              swatch: "bg-info",             text: "text-info-foreground", light: "#347BA9", dark: "#59A8DC" },
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
  { name: "XS — 6px",   value: "6px",   cls: "rounded-sm" },
  { name: "SM — 8px",   value: "8px",   cls: "rounded-sm" },
  { name: "MD — 12px",  value: "12px",  cls: "rounded-md" },
  { name: "LG — 16px",  value: "16px",  cls: "rounded-lg" },
  { name: "XL — 24px",  value: "24px",  cls: "rounded-xl" },
  { name: "2XL — 32px", value: "32px",  cls: "rounded-[32px]" },
  { name: "Full",       value: "9999px",cls: "rounded-full" },
];

const spacingScale = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96];

const shadowTokens = [
  { name: "shadow-xs",  label: "Subtle", pt: "Sutil",    css: "0 1px 2px rgba(0,0,0,0.05)" },
  { name: "shadow-sm",  label: "Small", pt: "Pequena",     css: "0 1px 3px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.05)" },
  { name: "shadow",     label: "Default", pt: "Padrão",   css: "0 2px 6px rgba(0,0,0,0.07), 0 6px 20px rgba(0,0,0,0.05)" },
  { name: "shadow-md",  label: "Medium", pt: "Média",    css: "0 4px 12px rgba(0,0,0,0.08), 0 12px 36px rgba(0,0,0,0.06)" },
  { name: "shadow-lg",  label: "Large", pt: "Grande",     css: "0 8px 24px rgba(0,0,0,0.09), 0 24px 64px rgba(0,0,0,0.07)" },
  { name: "shadow-xl",  label: "XL", pt: "XL",        css: "0 16px 48px rgba(0,0,0,0.10), 0 40px 96px rgba(0,0,0,0.08)" },
];


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
        <SectionHeader title={t("Color Palette", "Paleta de cores")} description={t("Grafite neutro derivado do Preto Grafite #000000 e Pink FindLook #FC0256, o rosa-cereja do lenço do gato, como cor da marca. Rosa Claro #FFF2F5 para superfícies de apoio.", "Grafite neutro derivado do Preto Grafite #000000 e Pink FindLook #FC0256, o rosa-cereja do lenço do gato, como cor da marca. Rosa Claro #FFF2F5 para superfícies de apoio.")} />

        <SubSection title={t("Escala Grafite", "Escala Grafite")}>
          <div className="grid grid-cols-11 gap-1.5">
            {graphiteScale.map((c) => (
              <div key={c.name} className="flex flex-col gap-1.5">
                <div
                  className="h-14 rounded-sm border border-border/40"
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
                  className="h-14 rounded-sm border border-border/40"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-[0.6875rem] font-medium text-muted-foreground text-center">{c.name}</span>
                <span className="text-[0.625rem] text-muted-foreground/70 text-center font-mono">{c.hex}</span>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={t("Pink roles", "Papéis do pink")}>
          <p className="mb-4 max-w-3xl text-[0.875rem] leading-relaxed text-muted-foreground">
            A escala nasce do lenço do gato, <span className="font-mono text-foreground">#FC0256</span> (rosa-cereja; decisão da dona do produto, 25/11/2026). Cada passo foi calculado em OKLCH com a mesma luminosidade da escala anterior, o matiz do lenço e o croma ajustado. O tom do lenço com texto branco fica em 3,98:1, por isso cada uso tem o seu tom.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {papeisDoPink.map((p) => (
              <div key={p.token} className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="flex h-20 items-center justify-center px-3" style={{ background: p.fundo }}>
                  <span className={p.amostraCls} style={{ color: p.cor }}>{p.amostra}</span>
                </div>
                <div className="space-y-1 p-3.5">
                  <div className="text-[0.875rem] font-semibold text-foreground">{p.papel}</div>
                  <div className="font-mono text-[0.75rem] text-muted-foreground">{p.token} · {p.passo} · {p.hex}</div>
                  <div className="text-[0.8125rem] text-muted-foreground">{p.uso}</div>
                  <div className="text-[0.8125rem] font-semibold text-foreground">{p.contraste}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[0.8125rem] text-muted-foreground">Nunca texto branco sobre o <span className="font-mono">#FC0256</span>. No tema escuro, o texto pequeno usa o pink-300 (#F78BA7): 9,2:1 sobre o fundo grafite.</p>
        </SubSection>

        <div id="rosas-claros" className="scroll-mt-32" />
        <SubSection title="Três rosas claros">
          <p className="mb-4 max-w-3xl text-[0.875rem] leading-relaxed text-muted-foreground">
            Decisão da dona do produto (27/11/2026): só a ação principal de cada área é um botão preenchido. Estados selecionados e ativos usam um destes três fundos, do mais leve ao mais forte, sempre com o texto em <span className="font-mono text-foreground">--primary-text</span>. No tema escuro, os três são o pink-500 a 8%, 12% e 16% sobre o grafite, com o texto em pink-300 (6,9:1 ou mais).
          </p>
          <div className="grid gap-3 sm:grid-cols-3" data-rosas-claros>
            {rosasClaros.map((r) => (
              <div key={r.token} className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="flex h-24 items-center justify-center px-3" style={{ background: `var(${r.token})` }}>
                  {r.amostra === "card" && <span className="rounded-sm px-3 py-2 text-[0.875rem] font-medium text-foreground">Item do menu (hover)</span>}
                  {r.amostra === "chip" && <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-[var(--primary-suave)] px-3 py-1.5 text-[0.8125rem] font-medium text-primary-text"><span aria-hidden>✓</span> Feminino</span>}
                  {r.amostra === "botao" && <span className="inline-flex h-10 items-center gap-1.5 rounded-md border-2 border-primary bg-[var(--primary-muted)] px-4 text-[0.8125rem] font-semibold text-primary-text"><span aria-hidden>✓</span> Selecionado</span>}
                </div>
                <div className="space-y-1 p-3.5">
                  <div className="text-[0.875rem] font-semibold text-foreground">Nível {r.nivel} · {r.papel}</div>
                  <div className="font-mono text-[0.75rem] text-muted-foreground">{r.token} · {r.hex}</div>
                  <div className="text-[0.8125rem] text-muted-foreground">{r.uso}</div>
                  <div className="text-[0.8125rem] font-semibold text-foreground">Texto --primary-text: {r.contraste}</div>
                </div>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={t("Semantic Tokens", "Tokens semânticos")}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {semanticColors.map((c) => (
              <div key={c.name} className="flex flex-col gap-2">
                <div className={`h-12 rounded-md border border-border/40 ${c.swatch}`} />
                <div>
                  <div className="text-[0.8125rem] font-medium text-foreground">{bi({ en: c.name, pt: c.pt })}</div>
                  <div className="text-[0.6875rem] text-muted-foreground font-mono">{c.token}</div>
                  <div className="mt-1.5 space-y-0.5 font-mono text-[0.625rem]">
                    <div className="flex items-center justify-between gap-2 text-muted-foreground">
                      <span className="uppercase tracking-[0.08em] opacity-70">{t("Light", "Claro")}</span>
                      <span className="text-foreground/80">{valorDoToken(c.token)?.claro ?? c.light}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-muted-foreground">
                      <span className="uppercase tracking-[0.08em] opacity-70">{t("Dark", "Escuro")}</span>
                      <span className="text-foreground/80">{valorDoToken(c.token)?.escuro ?? c.dark}</span>
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
          <div className="bg-card rounded-lg border border-border p-6 sm:p-8 space-y-6" style={{ boxShadow: "var(--shadow-xs)" }}>
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
            <pre className="overflow-x-auto rounded-md bg-muted/60 p-3 text-[0.75rem] text-muted-foreground"><code>{`import { Heading } from "@/app/components/ui/heading";
<Heading level={1} size="hero">Uma cidade. **Muitos estilos.**</Heading>`}</code></pre>
          </div>
        </SubSection>

        {/* ── Role overview ── */}
        <GradeDeCards className="md:grid-cols-3 gap-4">
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
            <div key={f.role} className="rounded-lg border border-border bg-card p-5 flex flex-col gap-4" style={{ boxShadow: "var(--shadow-xs)" }}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className={`inline-block px-2 py-0.5 rounded-sm border text-[0.5625rem] font-bold tracking-[0.08em] ${f.pillColor}`}>{f.roleLabel}</span>
                  <p className="mt-1.5 text-[0.9375rem] font-bold text-foreground leading-tight break-words">{f.family}</p>
                  <p className="text-[0.625rem] font-mono text-muted-foreground mt-0.5">{f.token}</p>
                  {/* Os pesos de cada papel (uma fonte só: o que muda é o peso) */}
                  <p className="mt-2 text-[0.8125rem] font-semibold text-foreground">{f.proportion}</p>
                </div>

              </div>

              {/* Proportion bar */}
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div className={`h-full w-full rounded-full ${f.barColor}`} />
              </div>

              {/* Traits */}
              <div className="flex flex-wrap gap-1">
                {f.traits.map((tr, ti) => (
                  <span key={ti} className="px-2 py-0.5 rounded-sm bg-muted text-[0.5625rem] font-semibold text-muted-foreground">{tr}</span>
                ))}
              </div>

              {/* Specimen */}
              <div className="rounded-md bg-muted/40 border border-border/60 px-4 py-3 min-h-[52px] flex items-center">
                <span style={f.specimenStyle} className="text-foreground leading-tight">{f.specimen}</span>
              </div>

              {/* Meta */}
              <div className="space-y-1.5 text-[0.6875rem]">
                <p className="text-muted-foreground leading-relaxed"><span className="font-semibold text-foreground/70">{t("Use in:", "Usar em:")}</span> {f.uses}</p>
                <p className="text-muted-foreground"><span className="font-semibold text-foreground/70">{t("Weights:", "Pesos:")}</span> {f.weights}</p>
              </div>
            </div>
          ))}
        </GradeDeCards>

        {/* ── Plus Jakarta Sans — escala ── */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h3 className="text-[0.8125rem] font-bold text-foreground uppercase tracking-[0.07em]">Plus Jakarta Sans — {t("Type scale", "Escala tipográfica")}</h3>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="bg-card rounded-lg border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-xs)" }}>
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
          <div className="bg-card rounded-lg border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-xs)" }}>
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
            <div className="bg-card rounded-lg border border-border p-6 space-y-5" style={{ boxShadow: "var(--shadow-xs)" }}>
              <span className="text-[0.5625rem] font-bold uppercase tracking-[0.10em] text-muted-foreground" style={{ fontFamily: "var(--font-sans)" }}>{t("Título e destaque", "Título e destaque")}</span>
              <p className="text-foreground leading-snug" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "2rem", letterSpacing: "-0.025em" }}>
                {t("Busque. Encontre.", "Busque. Encontre.")}{" "}
                <span style={{ fontFamily: "var(--font-accent)", fontWeight: 500, color: "var(--primary)" }}>{t("Conecte.", "Conecte.")}</span>
              </p>
              <p className="text-[0.75rem] text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-sans)" }}>
                {t("ExtraBold cria impacto. Medium em pink destaca a palavra da ação, sem mudar de família.", "ExtraBold cria impacto. Medium em pink destaca a palavra da ação, sem mudar de família.")}
              </p>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 space-y-5" style={{ boxShadow: "var(--shadow-xs)" }}>
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
            <GradeDeCards className="md:col-span-2 grid-cols-2 md:grid-cols-4 gap-3">

              {/* ✓ Use as an accent */}
              <div className="rounded-lg border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-xs)" }}>
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
              <div className="rounded-lg border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-xs)" }}>
                <div className="px-4 pt-4 pb-3 border-b border-border" style={{ background: "rgba(252,2,86,0.06)" }}>
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(252,2,86,0.15)" }}>
                      <X style={{ height: 11, width: 11, color: "#FC0256" }} />
                    </div>
                    <p className="text-[0.6875rem] font-bold" style={{ color: "#FC0256" }}>{t("Avoid", "Evitar")}</p>
                  </div>
                </div>
                <ul className="px-4 py-3 space-y-2.5">
                  {[t("Fontes decorativas ou de outra família", "Fontes decorativas ou de outra família"), t("Excesso de pesos na mesma tela", "Excesso de pesos na mesma tela"), t("Texto em caixa alta contínua", "Texto em caixa alta contínua")].map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#FC0256", opacity: 0.6 }} />
                      <span className="text-[0.6875rem] text-muted-foreground leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Peso preferencial */}
              <div className="rounded-lg border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-xs)" }}>
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
                      <div className={`h-7 w-7 rounded-sm flex items-center justify-center shrink-0 ${w.allowed ? "bg-muted/50" : "bg-muted/20"}`}>
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
              <div className="rounded-lg border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-xs)" }}>
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

            </GradeDeCards>
          </div>
        </div>
      </section>

      {/* ── SPACING ── */}
      <section id="spacing">
        <VejaEm secao="grid" ancora="grid-escala" rotuloBotao={t("See Grid and spacing", "Ver Grid e espaçamento")} titulo={t("Spacing now lives in Grid and spacing", "O espaçamento agora fica em Grid e espaçamento")} texto={t("The 4 px scale, the column grid, maximum widths and the rhythm between sections are on one page, with tokens and how to use them.", "A escala de 4 px, o grid de colunas, as larguras máximas e o ritmo entre seções ficam numa página só, com tokens e como usar.")} />
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
                className="h-20 bg-card rounded-md"
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
      { name: "--primary",            description: t("Brand accent — pink", "Acento da marca — pink"),          light: "#E8004E", dark: "#E8004E", isColor: true },
      { name: "--primary-foreground", description: t("Text on primary", "Texto sobre primária"),                 light: "#FFFFFF", dark: "#FFFFFF", isColor: true },
      { name: "--primary-sutil",      description: t("Light pink level 1: selected state (active menu item, selected button, active segment and chip, selected row)", "Rosa claro nível 1: estado selecionado (item ativo do menu, botão selecionado, segmento e chip ativos, linha selecionada)"), light: "#FFF5F8", dark: "rgba(252,2,86,0.08)", isColor: true },
      { name: "--primary-suave",      description: t("Light pink level 2: hover of pink items, badges", "Rosa claro nível 2: hover dos itens rosados e selos"), light: "#FFECF0", dark: "rgba(252,2,86,0.12)", isColor: true },
      { name: "--primary-muted",      description: t("Light pink level 3: icon bases and highlights", "Rosa claro nível 3: base de ícones e destaques"), light: "#FEDFE6", dark: "rgba(252,2,86,0.16)", isColor: true },
    ],
  },
  {
    group: t("Background & Surface", "Fundo e superfície"),
    tokens: [
      { name: "--background",      description: t("Page background", "Fundo da página"),           light: "#F6F6F7",              dark: "#000000",              isColor: true },
      { name: "--foreground",      description: t("Primary text", "Texto principal"),              light: "#19191C",              dark: "#F6F6F7",              isColor: true },
      { name: "--muted-foreground",description: t("Secondary / label text", "Texto secundário / rótulos"),    light: "#888896",              dark: "#B3B3BC",              isColor: true },
      { name: "--card",            description: t("Card surface", "Superfície do card"),              light: "#FFFFFF",              dark: "rgba(25,25,28,0.75)",  isColor: true },
      { name: "--card-foreground", description: t("Text on card", "Texto sobre o card"),              light: "#19191C",              dark: "#F6F6F7",              isColor: true },
      { name: "--popover",         description: t("Popover / tooltip surface", "Superfície de popover / tooltip"), light: "#FFFFFF",              dark: "rgba(25,25,28,0.95)",  isColor: true },
      { name: "--muted",           description: t("Subtle background", "Fundo sutil"),        light: "#E9E9EC",              dark: "rgba(44,44,51,0.60)", isColor: true },
      { name: "--accent",          description: t("Hover background", "Fundo de hover"),         light: "#E9E9EC",              dark: "rgba(44,44,51,0.60)", isColor: true },
      { name: "--secondary",       description: t("Secondary button surface", "Superfície do botão secundário"), light: "#F6F6F7",              dark: "rgba(44,44,51,0.80)", isColor: true },
    ],
  },
  {
    group: t("Semantic Colors", "Cores semânticas"),
    tokens: [
      { name: "--success",         description: t("Positive / confirmed", "Positivo / confirmado"),     light: "#31835D", dark: "#41B47F", isColor: true },
      { name: "--warning",         description: t("Caution / pending", "Atenção / pendente"),        light: "#F0B135", dark: "#F0B135", isColor: true },
      { name: "--error",           description: t("Error / danger", "Erro / perigo"),           light: "#FC0256", dark: "#FC0256", isColor: true },
      { name: "--info",            description: t("Informational", "Informativo"),            light: "#347BA9", dark: "#59A8DC", isColor: true },
      { name: "--success-text",    description: "Sucesso como texto ou ícone sobre fundo claro (Alerta com ação): 5,1:1",   light: "#2B7553", dark: "#41B47F", isColor: true },
      { name: "--info-text",       description: "Info como texto ou ícone sobre fundo claro (Alerta com ação): 5,1:1",      light: "#2E6E98", dark: "#59A8DC", isColor: true },
      { name: "--warning-text",    description: "Aviso como texto ou ícone sobre fundo claro: 4,5:1 no fundo do alerta",  light: "#A66200", dark: "#F0B135", isColor: true },
      { name: "--error-text",      description: "Erro como texto ou ícone (= --primary-text): 5,8:1 no fundo do alerta",  light: "#BC0A41", dark: "#F78BA7", isColor: true },
      { name: "--destructive",     description: t("Destructive action", "Ação destrutiva"),       light: "#E8004E", dark: "#E8004E", isColor: true },
      { name: "--violet",          description: t("Accent purple", "Roxo de destaque"),            light: "#ba69dc", dark: "#eb6cff", isColor: true },
      { name: "--orange",          description: t("Accent orange", "Laranja de destaque"),            light: "#fa9852", dark: "#ff8833", isColor: true },
    ],
  },
  {
    group: t("Border & Ring", "Borda e anel"),
    tokens: [
      { name: "--border",       description: t("Default border", "Borda padrão"),          light: "rgba(25,25,28,0.09)",  dark: "rgba(255,255,255,0.07)", isColor: true },
      { name: "--border-strong",description: t("Emphasized border", "Borda enfatizada"),       light: "rgba(25,25,28,0.16)",  dark: "rgba(255,255,255,0.12)", isColor: true },
      { name: "--ring",         description: t("Focus ring / outline", "Anel de foco / contorno"),    light: "rgba(252,2,86,0.40)", dark: "rgba(252,2,86,0.45)",   isColor: true },
    ],
  },
  {
    group: t("Charts", "Gráficos"),
    tokens: [
      { name: "--chart-1", description: t("Tone 1 of the FindLook chart palette — highlight: the main data point", "Tom 1 da paleta de gráficos da FindLook — destaque: o dado principal"), light: "#FC0256", dark: "#FC0256", isColor: true },
      { name: "--chart-2", description: t("Tone 2 of the FindLook chart palette — highlight", "Tom 2 da paleta de gráficos da FindLook — destaque"), light: "#FF6F95", dark: "#FF6F95", isColor: true },
      { name: "--chart-3", description: t("Tone 3 of the FindLook chart palette — support and transition", "Tom 3 da paleta de gráficos da FindLook — apoio e transição"), light: "#F9B5BF", dark: "#F9B5BF", isColor: true },
      { name: "--chart-4", description: t("Tone 4 of the FindLook chart palette — support and transition", "Tom 4 da paleta de gráficos da FindLook — apoio e transição"), light: "#E2919E", dark: "#E2919E", isColor: true },
      { name: "--chart-5", description: t("Tone 5 of the FindLook chart palette — support and transition", "Tom 5 da paleta de gráficos da FindLook — apoio e transição"), light: "#C29AA0", dark: "#C29AA0", isColor: true },
      { name: "--chart-6", description: t("Tone 6 of the FindLook chart palette — context", "Tom 6 da paleta de gráficos da FindLook — contexto"), light: "#D4D4D4", dark: "#D4D4D4", isColor: true },
      { name: "--chart-7", description: t("Tone 7 of the FindLook chart palette — context; same as --chart-neutral", "Tom 7 da paleta de gráficos da FindLook — contexto; igual a --chart-neutral"), light: "#EBEBEB", dark: "#EBEBEB", isColor: true },
      { name: "--chart-neutral", description: t("Other and information with no highlight (tone 7)", "Outros e informação sem destaque (tom 7)"), light: "#EBEBEB", dark: "#EBEBEB", isColor: true },
      { name: "--chart-grid", description: t("Chart grid lines", "Linhas de grade dos gráficos"), light: "#E9E9EC", dark: "#2C2C33", isColor: true },
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
