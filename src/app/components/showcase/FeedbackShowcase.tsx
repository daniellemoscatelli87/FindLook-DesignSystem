import React, { useState } from "react";
import { TokenTable, type TokenGroup } from "./shared/TokenTable";
import { Selo } from "@/app/components/ui/selo";
import { SeloSecao } from "@/app/components/ui/selo-secao";
import { AvatarCircles } from "@/app/components/ui/avatar-circles";
import { MapPin, Sparkles } from "lucide-react";
import {
  CheckCircle, CheckCircle2, AlertCircle, AlertTriangle, TriangleAlert, Info, X,
  Loader2, Clock, Check,
} from "lucide-react";
import { Search, Heart, CalendarCheck, MessageCircle, Camera, Ruler, TrendingUp } from "lucide-react";
import { useI18n } from "../../i18n";
import { Alert as UiAlert, AlertTitle, AlertDescription } from "../ui/alert";
import { AbasComContador } from "@/app/components/ui/painel-produtos";
import { BannerPromocional } from "@/app/components/ui/painel-cabecalho";
import { ItemDeAtividade, ItemDeAcao, ListaDeTendencias } from "@/app/components/ui/painel-dados";
import { IconeModa } from "@/app/components/ui/fashion-icons";
import { SectionHeader } from "./shared/SectionHeader";
import { AlertaComAcaoDoc } from "./AlertaComAcaoShowcase";
import { VejaEm } from "./shared/VejaEm";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { GradeDeCards } from "../ui/grade-de-cards";

type Bi = { en: string; pt: string };
type TFn = (en: string, pt: string) => string;

const DEMO_AVATARS = ["Ana", "Bruno", "Carla", "Diego", "Elisa", "Fábio"].map((name, i) => ({
  imageUrl: `${import.meta.env.BASE_URL}avatares/avatar-${i + 1}.svg`,
  profileUrl: "#avatar-circles",
  name,
}));

function ShowcaseCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      {children}
    </div>
  );
}


function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-5">{title}</h3>
      {children}
    </div>
  );
}

/* ── Alert component ── */
type AlertKind = "success" | "error" | "warning" | "info";
const alertConfig: Record<AlertKind, { icon: React.ElementType; title: Bi; msg: Bi; bg: string; border: string; iconColor: string; titleColor: string }> = {
  success: {
    icon: CheckCircle2, title: { en: "Changes saved", pt: "Alterações salvas" },
    msg: { en: "Your configuration has been updated successfully.", pt: "Sua configuração foi atualizada com sucesso." },
    bg: "bg-[var(--success-muted,rgba(21,128,61,0.07))]",
    border: "border-success/20", iconColor: "text-success", titleColor: "text-foreground",
  },
  info: {
    icon: Info, title: { en: "New features available", pt: "Novos recursos disponíveis" },
    msg: { en: "We've shipped several improvements to the dashboard.", pt: "Lançamos várias melhorias no painel." },
    bg: "bg-[var(--info-muted,rgba(29,78,216,0.07))]",
    border: "border-info/20", iconColor: "text-info", titleColor: "text-foreground",
  },
  warning: {
    icon: AlertCircle, title: { en: "Subscription expiring", pt: "Assinatura prestes a expirar" },
    msg: { en: "Your plan renews in 3 days. Update billing to avoid interruptions.", pt: "Seu plano renova em 3 dias. Atualize o pagamento para evitar interrupções." },
    bg: "bg-[var(--warning-muted,rgba(180,83,9,0.07))]",
    border: "border-warning/20", iconColor: "text-warning-text", titleColor: "text-foreground",
  },
  error: {
    icon: TriangleAlert, title: { en: "Photo not sent", pt: "Não foi possível enviar a foto" },
    msg: { en: "Check your connection and try again.", pt: "Verifique sua conexão e tente de novo." },
    bg: "bg-[var(--error-muted,rgba(140,27,27,0.07))]",
    border: "border-primary/20", iconColor: "text-primary", titleColor: "text-foreground",
  },
};

function Alert({ kind, dismissible = false }: { kind: AlertKind; dismissible?: boolean }) {
  const { t, bi } = useI18n();
  const [visible, setVisible] = useState(true);
  const cfg = alertConfig[kind];
  const Icon = cfg.icon;
  if (!visible) return null;
  // Componente real (ui/alert), o mesmo que o produto copia
  return (
    <UiAlert variant={kind} className={dismissible ? "pr-[52px]" : ""}>
      <Icon aria-hidden />
      <AlertTitle>{bi(cfg.title)}</AlertTitle>
      <AlertDescription>{bi(cfg.msg)}</AlertDescription>
      {dismissible && (
        <button aria-label={t("Dismiss", "Dispensar")} onClick={() => setVisible(false)} className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-sm text-muted-foreground transition-colors duration-[var(--duration-fast)] hover:bg-[color:color-mix(in_oklab,var(--alerta-cor)_10%,transparent)] hover:text-foreground motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <X className="h-4 w-4" aria-hidden />
        </button>
      )}
    </UiAlert>
  );
}

/* ── Toast ── */
const toastTypes = [
  { label: { en: "Success", pt: "Sucesso" }, tipo: "success", icon: CheckCircle, color: "text-success", bg: "bg-card", msg: { en: "Item saved.", pt: "Peça salva." } },
  { label: { en: "Error", pt: "Erro" },      tipo: "error",   icon: AlertCircle, color: "text-error-text",   bg: "bg-card", msg: { en: "Could not save the item. Try again.", pt: "Não foi possível salvar a peça. Tente de novo." } },
  { label: { en: "Warning", pt: "Aviso" },   tipo: "warning", icon: AlertTriangle, color: "text-warning-text", bg: "bg-card", msg: { en: "2 items without size.", pt: "2 peças sem tamanho." } },
  { label: "Loading",                         tipo: "loading", icon: Loader2,     color: "text-info",    bg: "bg-card", msg: { en: "Sending photos…", pt: "Enviando fotos…" } },
];

/* ── Skeleton ── */
function SkeletonPulse({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-muted rounded-sm ${className}`} />;
}

/* ── Progress ── */
const progressItems = [
  { label: { en: "Storage", pt: "Armazenamento" },    value: 65, color: "var(--chart-1)" },
  { label: { en: "Bandwidth", pt: "Largura de banda" },  value: 32, color: "var(--chart-2)" },
  { label: { en: "API Calls", pt: "Chamadas de API" },  value: 88, color: "var(--warning)" },
  { label: { en: "Seats", pt: "Assentos" },      value: 20, color: "var(--success)" },
];

/* ── Tabs ── */
const tabItems = [
  { id: "overview",  label: { en: "Overview", pt: "Visão geral" } },
  { id: "analytics", label: { en: "Analytics", pt: "Análises" } },
  { id: "reports",   label: { en: "Reports", pt: "Relatórios" } },
  { id: "settings",  label: { en: "Settings", pt: "Configurações" } },
];

/* ── Abas com contador ── */
const abasContador = [
  { valor: "todos",      rotulo: "Todos",      quantidade: 137, leitura: "137 produtos no total" },
  { valor: "publicados", rotulo: "Publicados", quantidade: 128, leitura: "128 produtos publicados" },
  { valor: "pendentes",  rotulo: "Pendentes",  quantidade: 6,   leitura: "6 produtos pendentes de revisão" },
  { valor: "esgotados",  rotulo: "Esgotados",  quantidade: 3,   leitura: "3 produtos esgotados" },
];

function DemoAbasComContador({ estilo }: { estilo: "pilula" | "sublinhado" }) {
  const [aba, setAba] = useState("todos");
  const atual = abasContador.find(a => a.valor === aba)!;
  return (
    <div className="min-w-0">
      <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {estilo === "pilula" ? "Pílula" : "Sublinhado"} <span className="font-mono normal-case tracking-normal">· estilo="{estilo}"</span>
      </p>
      <AbasComContador abas={abasContador} valor={aba} onChange={setAba} estilo={estilo} rotulo={`Filtrar produtos por status (${estilo === "pilula" ? "pílula" : "sublinhado"})`} />
      <div role="tabpanel" aria-label={atual.rotulo} className="mt-4 rounded-md bg-muted/30 border border-border p-4 text-[0.875rem] text-muted-foreground">
        Mostrando <strong className="text-foreground">{atual.leitura}</strong>.
      </div>
    </div>
  );
}

/* ── Banner promocional ── */
function DemoBannerPromocional() {
  const [aberto, setAberto] = useState(true);
  const area = React.useRef<HTMLDivElement>(null);
  const primeiraVez = React.useRef(true);
  // Leva o foco para o próximo controle visível ao fechar e ao reabrir (o botão clicado some da tela)
  React.useEffect(() => {
    if (primeiraVez.current) { primeiraVez.current = false; return; }
    const alvo = area.current?.querySelector<HTMLButtonElement>(aberto ? 'button[aria-label^="Fechar"]' : "button");
    alvo?.focus();
  }, [aberto]);
  return (
    <div ref={area} className="@container">
      {aberto ? (
        <BannerPromocional
          titulo="Destaque sua coleção"
          texto="Fotos com boa luz e fundo neutro deixam a sua vitrine mais atrativa."
          acao="Ver dicas de foto"
          imagem={<IconeModa nome="cabide" size={44} />}
          onAcao={() => {}}
          onFechar={() => setAberto(false)}
        />
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-dashed border-border px-4 py-3.5">
          <p className="text-[0.875rem] text-muted-foreground">Você fechou o banner.</p>
          <button type="button" onClick={() => setAberto(true)} className="inline-flex items-center gap-2 h-9 px-4 text-[0.875rem] font-semibold rounded-md border border-border bg-card hover:bg-accent text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            Mostrar de novo
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Listas do painel ── */
const evitarSalto = (e: React.MouseEvent) => e.preventDefault();

function TituloDaLista({ titulo, componente }: { titulo: string; componente: string }) {
  return (
    <div className="mb-4">
      <h4 className="text-[0.9375rem] font-semibold text-foreground">{titulo}</h4>
      <p className="mt-0.5 font-mono text-[0.75rem] text-muted-foreground">{componente}</p>
    </div>
  );
}

/* ── Badges ── */
const badgeVariants = [
  { label: { en: "Default", pt: "Padrão" },  cls: "bg-muted text-foreground border-border" },
  { label: { en: "Primary", pt: "Primário" },  cls: "bg-[var(--primary-suave)] text-primary-text border-primary/20" },
  { label: { en: "Success", pt: "Sucesso" },  cls: "bg-success/10 text-success border-success/20" },
  { label: { en: "Warning", pt: "Aviso" },  cls: "bg-warning/10 text-warning-text border-warning/20" },
  { label: { en: "Error", pt: "Erro" },    cls: "bg-[var(--error-muted)] text-error-text border-error/20" },
  { label: { en: "Info", pt: "Info" },     cls: "bg-info/10 text-info border-info/20" },
];

const chipVariants = [
  { label: "Design", pt: "Design", active: true },
  { label: "Development", pt: "Desenvolvimento", active: false },
  { label: "Marketing", pt: "Marketing", active: false },
  { label: "Finance", pt: "Finanças", active: true },
  { label: "Operations", pt: "Operações", active: false },
];

const tagVariants = [
  { label: "react", color: "bg-info/10 text-info border-info/20 dark:text-info" },
  { label: "typescript", color: "bg-violet/10 text-violet border-violet/20 dark:text-violet" },
  { label: "ui-design", color: "bg-[var(--primary-suave)] text-primary-text border-primary/20" },
  { label: "performance", color: "bg-success/10 text-success border-success/20" },
  { label: "api", color: "bg-muted text-muted-foreground border-border" },
];

/* ── Timeline ── */
const timelineItems = [
  { icon: Check,         color: "bg-success text-success-foreground",   title: { en: "Item published", pt: "Peça publicada" },    desc: { en: "The floral midi dress is now visible.", pt: "O vestido midi floral já está visível na loja." },    time: { en: "Just now", pt: "Agora mesmo" } },
  { icon: Loader2,       color: "bg-info text-info-foreground",      title: { en: "Uploading photos", pt: "Enviando fotos" },           desc: { en: "3 of 5 photos sent.", pt: "3 de 5 fotos enviadas." },                time: { en: "2 min ago", pt: "há 2 min" } },
  { icon: Clock,         color: "bg-muted text-muted-foreground", title: { en: "Item in review", pt: "Peça em revisão" },  desc: { en: "Waiting for you to confirm the size.", pt: "Aguardando você confirmar o tamanho." },                  time: { en: "5 min ago", pt: "há 5 min" } },
  { icon: AlertCircle,   color: "bg-warning text-warning-foreground",   title: { en: "Item without size", pt: "Atenção: peça sem tamanho" },    desc: { en: "Add the size of the item.", pt: "Informe o tamanho da peça." },         time: { en: "12 min ago", pt: "há 12 min" } },
  { icon: CheckCircle,   color: "bg-success text-success-foreground",   title: { en: "Store updated", pt: "Loja atualizada" },          desc: { en: "Opening hours changed.", pt: "Horário de funcionamento alterado." },            time: { en: "1 hr ago", pt: "há 1 h" } },
];

export function FeedbackShowcase({ parte = "feedback" }: { parte?: "feedback" | "rotulos" }) {
  const { t, bi, lang } = useI18n();
  const [defaultTab,   setDefaultTab]   = useState("overview");
  const [underlineTab, setUnderlineTab] = useState("overview");
  const [chipActive, setChipActive] = useState<string[]>(["Design", "Finance"]);

  return (
    <div className="space-y-16">

      {/* ── TABS ── */}
      {parte === "feedback" && (
      <section id="tabs">
        <SectionHeader title={t("Tabs", "Abas")} description={t("Clean tab navigation for switching between content panels.", "Navegação limpa por abas para alternar entre painéis de conteúdo.")} />
        <SubSection title={t("Default Tabs", "Abas padrão")}>
          <ShowcaseCard>
            <Tabs value={defaultTab} onValueChange={setDefaultTab}>
              <TabsList className="mb-5">
                {tabItems.map(tab => (
                  <TabsTrigger key={tab.id} value={tab.id}>{bi(tab.label)}</TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value={defaultTab}>
                <div className="rounded-md bg-muted/30 border border-border p-4 text-[0.875rem] text-muted-foreground">
                  {t("Content for", "Conteúdo da aba")} <strong className="text-foreground">{bi(tabItems.find(x => x.id === defaultTab)!.label)}</strong>{lang === "en" ? " tab." : "."}
                </div>
              </TabsContent>
            </Tabs>
          </ShowcaseCard>
        </SubSection>

        <SubSection title={t("Underline Tabs", "Abas sublinhadas")}>
          <ShowcaseCard>
            <div className="flex flex-wrap items-center border-b border-border gap-1 mb-5 max-w-full">
              {tabItems.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setUnderlineTab(tab.id)}
                  className={`whitespace-nowrap px-4 py-2.5 text-[0.875rem] font-medium transition-all duration-150 border-b-2 -mb-px outline-none
                    ${underlineTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`}
                >
                  {bi(tab.label)}
                </button>
              ))}
            </div>
            <div className="text-[0.875rem] text-muted-foreground">
              {t("Viewing:", "Visualizando:")} <strong className="text-foreground">{bi(tabItems.find(x => x.id === underlineTab)!.label)}</strong>
            </div>
          </ShowcaseCard>
        </SubSection>

        <div id="abas-contador" className="scroll-mt-32" />
        <SubSection title="Abas com contador">
          <ShowcaseCard>
            <div className="space-y-6">
              <DemoAbasComContador estilo="pilula" />
              <DemoAbasComContador estilo="sublinhado" />
            </div>
          </ShowcaseCard>
        </SubSection>
      </section>
      )}

      {/* ── ALERTS ── */}
      {parte === "feedback" && (
      <section id="alerts">
        <SectionHeader title={t("Alerts", "Alertas")} description="Mensagens de status para feedback, avisos e erros. Todos os alertas seguem o mesmo padrão: ícone com base, título de 15 px, texto de 14 px e fundo com a cor do estado. Sem ação, use o Alerta simples; quando a pessoa precisa agir, use o Alerta com ação." />
        <SubSection title={t("Alert Variants", "Variantes de alerta")}>
          <ShowcaseCard>
            <div className="space-y-3">
              {(Object.keys(alertConfig) as AlertKind[]).map(k => (
                <Alert key={k} kind={k} />
              ))}
            </div>
          </ShowcaseCard>
        </SubSection>

        <SubSection title={t("Dismissible Alerts", "Alertas dispensáveis")}>
          <ShowcaseCard>
            <div className="space-y-3">
              {(["success", "warning"] as AlertKind[]).map(k => (
                <Alert key={k} kind={k} dismissible />
              ))}
            </div>
          </ShowcaseCard>
        </SubSection>

        <SubSection title="Alerta só com descrição">
          <div id="alerta-sem-titulo" className="scroll-mt-32" />
          <ShowcaseCard>
            <p className="mb-4 max-w-3xl text-[0.8125rem] leading-relaxed text-muted-foreground">
              Quando a mensagem cabe numa frase, use o Alert sem AlertTitle. A frase passa a ser a informação principal: fica na cor do texto principal, centralizada na altura do ícone e com a quebra de linha equilibrada. É automático: basta não usar o título.
            </p>
            <div className="space-y-3">
              <UiAlert variant="error"><TriangleAlert aria-hidden /><AlertDescription>E-mail ou senha incorretos. Confira e tente de novo.</AlertDescription></UiAlert>
              <UiAlert variant="success"><CheckCircle2 aria-hidden /><AlertDescription>Alterações salvas.</AlertDescription></UiAlert>
              <UiAlert variant="info"><Info aria-hidden /><AlertDescription>A disponibilidade das peças deve ser confirmada com a loja.</AlertDescription></UiAlert>
            </div>
          </ShowcaseCard>
        </SubSection>

        <div id="alerta-com-acao" className="scroll-mt-32 mb-12">
          <AlertaComAcaoDoc />
        </div>

        <div id="banner-promocional" className="scroll-mt-32" />
        <SubSection title="Banner promocional">
          <ShowcaseCard>
            <DemoBannerPromocional />
          </ShowcaseCard>
        </SubSection>
      </section>
      )}

      {/* ── TOASTS ── */}
      {parte === "feedback" && (
      <section id="toasts">
        <SectionHeader title={t("Toasts", "Toasts")} description={t("Floating notification toasts for transient feedback messages.", "Notificações flutuantes (toasts) para mensagens de feedback temporárias.")} />
        <SubSection title={t("Try it", "Experimente")}>
          <ShowcaseCard>
            <p className="mb-3 text-[0.875rem] text-muted-foreground">{t("Each button shows a real notification in the corner of the screen (ui/sonner).", "Cada botão mostra uma notificação de verdade no canto da tela (ui/sonner).")}</p>
            <div className="flex flex-wrap gap-2">
              {toastTypes.map(tt => (
                <Button key={tt.tipo} variant="outline" onClick={() => {
                  const msg = bi(tt.msg);
                  if (tt.tipo === "success") toast.success(msg);
                  else if (tt.tipo === "error") toast.error(msg);
                  else if (tt.tipo === "warning") toast.warning(msg);
                  else { const id = toast.loading(msg); setTimeout(() => toast.success(t("Done.", "Pronto."), { id }), 1800); }
                }}>
                  {typeof tt.label === "string" ? t("Loading", "Carregando") : bi(tt.label)}
                </Button>
              ))}
            </div>
          </ShowcaseCard>
        </SubSection>
        <SubSection title={t("Toast Variants", "Variantes de toast")}>
          <ShowcaseCard>
            <div className="space-y-2 max-w-sm">
              {toastTypes.map(toast => {
                const Icon = toast.icon;
                return (
                  <div key={toast.label} className="flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3" style={{ boxShadow: "var(--shadow-md)" }}>
                    <Icon className={`h-4.5 w-4.5 shrink-0 ${toast.color} ${toast.label === "Loading" ? "animate-spin" : ""}`} style={{ height: "18px", width: "18px" }} />
                    <span className="text-[0.875rem] font-medium text-foreground flex-1">{bi(toast.msg)}</span>
                    <button aria-label={t("Close", "Fechar")} className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </ShowcaseCard>
        </SubSection>
      </section>
      )}

      {/* ── PROGRESS ── */}
      {parte === "feedback" && (
      <section id="progress">
        <SectionHeader title={t("Progress Bars", "Barras de progresso")} description={t("Visual feedback for task completion and resource utilization.", "Feedback visual para conclusão de tarefas e uso de recursos.")} />
        <SubSection title={t("Progress Variants", "Variantes de progresso")}>
          <ShowcaseCard>
            <div className="space-y-5">
              {progressItems.map(p => (
                <div key={p.label.en}>
                  <div className="flex justify-between text-[0.8125rem] mb-1.5">
                    <span className="font-medium text-foreground">{bi(p.label)}</span>
                    <span className="text-muted-foreground font-mono">{p.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${p.value}%`, backgroundColor: p.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ShowcaseCard>
        </SubSection>

        <SubSection title={t("Indeterminate / Loading", "Indeterminado / Carregando")}>
          <ShowcaseCard>
            <div className="space-y-4">
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-primary rounded-full animate-[progress-indeterminate_1.5s_ease-in-out_infinite]"
                  style={{ animation: "indeterminate 1.5s ease-in-out infinite" }}
                />
              </div>
              <div className="flex items-center gap-2 text-[0.875rem] text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                {t("Processing your request...", "Processando sua solicitação...")}
              </div>
            </div>
          </ShowcaseCard>
        </SubSection>
      </section>
      )}

      {/* ── SKELETON ── */}
      {parte === "feedback" && (
      <section id="skeleton">
        <SectionHeader title={t("Skeleton Loading", "Skeleton loading")} description={t("Placeholder content while data loads. Matches the shape of the actual content.", "Conteúdo provisório enquanto os dados carregam. Segue a forma do conteúdo real.")} />
        <SubSection title={t("Skeleton States", "Estados de skeleton")}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card skeleton */}
            <ShowcaseCard>
              <div className="flex items-start gap-3 mb-4">
                <SkeletonPulse className="h-10 w-10 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <SkeletonPulse className="h-4 w-32" />
                  <SkeletonPulse className="h-3 w-24" />
                </div>
              </div>
              <div className="space-y-2">
                <SkeletonPulse className="h-3.5 w-full" />
                <SkeletonPulse className="h-3.5 w-5/6" />
                <SkeletonPulse className="h-3.5 w-4/6" />
              </div>
              <div className="mt-4 flex gap-2">
                <SkeletonPulse className="h-8 w-20 rounded-sm" />
                <SkeletonPulse className="h-8 w-16 rounded-sm" />
              </div>
            </ShowcaseCard>

            {/* Table skeleton */}
            <ShowcaseCard className="p-0 overflow-hidden">
              <div className="px-5 py-3.5 border-b border-border">
                <SkeletonPulse className="h-4 w-28" />
              </div>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center gap-3 px-5 py-3.5 border-b border-border/50">
                  <SkeletonPulse className="h-8 w-8 rounded-full shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <SkeletonPulse className="h-3.5 w-36" />
                    <SkeletonPulse className="h-3 w-24" />
                  </div>
                  <SkeletonPulse className="h-6 w-16 rounded-sm" />
                  <SkeletonPulse className="h-3.5 w-16" />
                </div>
              ))}
            </ShowcaseCard>
          </div>
        </SubSection>
      </section>
      )}

      {/* ── BADGES CHIPS TAGS ── */}
      {parte === "rotulos" && (
      <section id="badges">
        <SectionHeader title={t("Badges, Chips & Tags", "Badges, chips e tags")} description={t("Compact informational labels for categorization and status indication.", "Rótulos informativos compactos para categorização e indicação de status.")} />

        <SubSection title={t("Badges", "Badges")}>
          <ShowcaseCard>
            <div className="flex flex-wrap gap-2">
              {badgeVariants.map(b => (
                <span key={b.label.en} className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-[0.75rem] font-semibold border ${b.cls}`}>
                  {bi(b.label)}
                </span>
              ))}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-[0.75rem] font-semibold border bg-[var(--primary-suave)] text-primary-text border-primary/20">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {t("Live", "Ao vivo")}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[0.6875rem] font-bold bg-primary text-primary-foreground">
                42
              </span>
            </div>
          </ShowcaseCard>
        </SubSection>

        <SubSection title={t("Chips (Filterable)", "Chips (filtráveis)")}>
          <ShowcaseCard>
            <p className="mb-4 max-w-3xl text-[0.8125rem] leading-relaxed text-muted-foreground">Chip ativo (regra dos rosas claros da dona do produto, 27/11/2026): fundo no rosa do selecionado (--primary-suave), texto --primary-text (5,7:1), borda rosa sutil e o check, e continua rosa com o mouse em cima; chip não ativo com o mouse em cima: cinza claro (--accent), nunca rosa; nunca preenchido de pink, porque só a ação principal da área é preenchida. aria-pressed diz se está marcado.</p>
            <div className="flex flex-wrap gap-2">
              {chipVariants.map(c => {
                const active = chipActive.includes(c.label);
                return (
                  <button
                    key={c.label}
                    onClick={() => setChipActive(prev => active ? prev.filter(x => x !== c.label) : [...prev, c.label])}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.8125rem] font-medium border transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                      ${active ? "bg-[var(--primary-suave)] text-primary-text border-primary/30" : "bg-card text-foreground border-border hover:bg-accent hover:border-[var(--border-strong)]"}`}
                  >
                    {active && <Check className="h-3.5 w-3.5" />}
                    {lang === "en" ? c.label : c.pt}
                  </button>
                );
              })}
            </div>
          </ShowcaseCard>
        </SubSection>

        <SubSection title={t("Tags", "Tags")}>
          <ShowcaseCard>
            <div className="flex flex-wrap gap-2">
              {tagVariants.map(tag => (
                <span key={tag.label} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-[0.75rem] font-medium border ${tag.color}`}>
                  <span className="opacity-60">#</span>{tag.label}
                </span>
              ))}
            </div>
          </ShowcaseCard>
        </SubSection>

        <div id="selo" className="scroll-mt-32" />
        <SubSection title={t("Hero tag (selo)", "Selo (tag do hero)")}>
          <ShowcaseCard>
            <p className="mb-4 text-[0.8125rem] leading-relaxed text-muted-foreground">
              {t(
                "The pill used at the top of the Experience Intelligence page on the studio site: card background, thin border, small uppercase text with wide tracking and a primary dot. Use it to set the context at the top of a page or section (product name, place, theme), never for status or counts.",
                "A pílula usada no topo da página Experience Intelligence do site do estúdio: fundo de card, borda fina, texto pequeno em caixa alta com espaçamento largo e um ponto na cor primária. Use para situar a pessoa no topo de uma página ou seção (nome do produto, lugar, tema), nunca para status ou contagem.",
              )}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Selo>Moda local em Curitiba</Selo>
              <Selo icon={<MapPin />}>{t("Local fashion in Curitiba", "Moda local em Curitiba")}</Selo>
              <Selo tone="primary" icon={<Sparkles />}>{t("New", "Novidade")}</Selo>
              <Selo size="sm">{t("Section", "Seção")}</Selo>
              <Selo dot={false}>{t("No dot", "Sem ponto")}</Selo>
            </div>
            <div className="mt-4 rounded-md bg-foreground p-5">
              <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-background/60">{t("On a dark surface", "Sobre superfície escura")}</p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-white/85"><span aria-hidden className="h-2 w-2 rounded-full bg-primary" />{t("Inverted", "Invertido")}</span>
              </div>
            </div>
            <ul className="mt-4 grid gap-1.5 text-[0.8125rem] text-muted-foreground sm:grid-cols-2">
              <li>• {t("One hero tag per page or section; it comes right above the title.", "Um selo por página ou seção; ele vem logo acima do título.")}</li>
              <li>• {t("Short text (two to four words), uppercase by the component, never a sentence.", "Texto curto (duas a quatro palavras), caixa alta pelo componente, nunca uma frase.")}</li>
              <li>• {t("Dot or one icon in the primary color, never both.", "Ponto ou um ícone na cor primária, nunca os dois.")}</li>
              <li>• {t("It is not interactive. For filters use chips; for status use badges or the status chip.", "Não é interativo. Para filtros use chips; para status use badges ou o chip de status.")}</li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-muted/60 p-3 text-[0.75rem] text-muted-foreground"><code>{`import { Selo } from "@/app/components/ui/selo";
<Selo>Moda local em Curitiba</Selo>
<Selo icon={<MapPin />}>Moda local em Curitiba</Selo>`}</code></pre>
          </ShowcaseCard>
        </SubSection>

        <SubSection title={t("Section seal", "Selo de seção")}>
          <div id="selo-secao" className="scroll-mt-32" />
          <ShowcaseCard>
            <p className="mb-5 text-[0.8125rem] leading-relaxed text-muted-foreground">
              {t("From the sections of the studio site's Experience Intelligence 2 page (\"Cenário Atual\", \"O Desafio\", \"Método\"): a filled pill in the light primary tint with a thin primary border and the primary text color, uppercase with wide tracking, no dot. It sits centred above a section title and names the subject of the section. The hero tag stays neutral (card surface, dot); this one is coloured.", "Das seções da página Experience Intelligence 2 do site do estúdio (\"Cenário Atual\", \"O Desafio\", \"Método\"): pílula preenchida com o tom claro da primária, borda fina na primária e texto na cor primária de texto, em caixa alta com espaçamento largo, sem ponto. Fica centralizada acima do título da seção e nomeia o assunto dela. O selo do hero continua neutro (fundo de card, ponto); este é colorido.")}
            </p>
            <div className="rounded-lg border border-border bg-background px-6 py-10 text-center">
              <SeloSecao className="mb-4">{"Para quem procura"}</SeloSecao>
              <h3 className="mx-auto max-w-[32ch] text-[1.5rem] font-bold leading-tight tracking-[-0.02em] text-foreground" style={{ fontFamily: "var(--font-sans)" }}>{"Encontre peças alinhadas ao seu estilo, tamanho e região."}</h3>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <SeloSecao>{"Para quem vende"}</SeloSecao>
              <SeloSecao>{"Como funciona"}</SeloSecao>
              <SeloSecao size="sm">{t("Compact", "Compacto")} · sm</SeloSecao>
              <SeloSecao icon={<Sparkles />}>{t("With icon", "Com ícone")}</SeloSecao>
            </div>
            <pre className="mt-4 overflow-x-auto rounded-md bg-muted/60 p-3 text-[0.75rem] text-muted-foreground"><code>{`import { SeloSecao } from "@/app/components/ui/selo-secao";

<SeloSecao>Cenário atual</SeloSecao>
<h2>…</h2>`}</code></pre>
            <ul className="mt-4 grid gap-1.5 text-[0.8125rem] text-muted-foreground sm:grid-cols-2">
              <li>• {t("One per section, above the title, centred when the title is centred.", "Um por seção, acima do título, centralizado quando o título é centralizado.")}</li>
              <li>• {t("One to three words naming the subject; never status, count or action.", "De uma a três palavras nomeando o assunto; nunca status, contagem ou ação.")}</li>
              <li>• {t("Tokens: --primary-muted (fill), primary at 25 % (border), --primary-text (text), --shadow-xs.", "Tokens: --primary-muted (fundo), primária a 25 % (borda), --primary-text (texto), --shadow-xs.")}</li>
              <li>• {t("Hero of a page: use the hero tag (Selo); sections inside the page: this one.", "Hero de uma página: use o selo do hero (Selo); seções dentro da página: este.")}</li>
            </ul>
          </ShowcaseCard>
        </SubSection>
      </section>
      )}

      {/* ── TIMELINE ── */}
      {parte === "rotulos" && (
      <section id="rotulos-timeline">
        <VejaEm secao="timeline" titulo={t("The timeline has its own page", "A linha do tempo tem página própria")} texto={t("Steps, states and accessibility of the timeline are in Components > Timeline.", "Etapas, estados e acessibilidade da linha do tempo ficam em Componentes > Linha do tempo.")} rotuloBotao={t("See Timeline", "Ver Linha do tempo")} />
      </section>
      )}

      {/* ── AVATAR ── */}
      {parte === "rotulos" && (
      <section id="avatar">
        <SectionHeader title={t("Avatar", "Avatar")} description={t("User identity representation in various sizes with presence indicators.", "Representação da identidade do usuário em vários tamanhos, com indicadores de presença.")} />
        <SubSection title={t("Avatar Sizes & States", "Tamanhos e estados de avatar")}>
          <ShowcaseCard>
            <div className="flex flex-wrap items-end gap-6">
              {[
                { size: "h-6 w-6 text-[0.5rem]",  label: "XS" },
                { size: "h-8 w-8 text-[0.625rem]", label: "SM" },
                { size: "h-10 w-10 text-[0.75rem]",label: "MD" },
                { size: "h-12 w-12 text-[0.875rem]",label: "LG" },
                { size: "h-14 w-14 text-[1rem]",   label: "XL" },
              ].map(({ size, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="relative">
                    <div className={`${size} rounded-full bg-primary/15 text-primary font-semibold flex items-center justify-center border-2 border-background`}>
                      AN
                    </div>
                    {label === "MD" && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success border-2 border-background" />
                    )}
                  </div>
                  <span className="text-[0.6875rem] text-muted-foreground">{label}</span>
                </div>
              ))}
              {/* Avatar group */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex -space-x-2">
                  {["AN", "SL", "YT", "LO"].map((init, i) => (
                    <div
                      key={init}
                      className="h-10 w-10 rounded-full flex items-center justify-center text-[0.75rem] font-semibold border-2 border-background"
                      style={{ backgroundColor: `hsl(${i * 60}, 40%, ${35 + i * 8}%)`, color: "white", zIndex: 4 - i }}
                    >
                      {init}
                    </div>
                  ))}
                  <div className="h-10 w-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[0.75rem] font-semibold text-muted-foreground z-0">
                    +5
                  </div>
                </div>
                <span className="text-[0.6875rem] text-muted-foreground">{t("Group", "Grupo")}</span>
              </div>
            </div>
          </ShowcaseCard>
        </SubSection>

        <SubSection title="Avatar Circles">
          <div id="avatar-circles" className="scroll-mt-32" />
          <ShowcaseCard>
            <p className="text-[0.8125rem] leading-relaxed text-muted-foreground mb-5">
              {t("Overlapping avatar circles with a final “+N” circle, ported from Magic UI and adapted to the system tokens: borders follow the background, so it works on light and dark themes, and the “+N” only becomes a link when a destination is given. Use it as social proof next to a call to action. ", "Círculos de avatares sobrepostos com um último círculo “+N”, portado do Magic UI e adaptado aos tokens do sistema: as bordas seguem o fundo, então funciona nos temas claro e escuro, e o “+N” só vira link quando há um destino. Use como prova social ao lado de uma chamada para ação. ")}
              {t('Stores already registered in the city, people who saved an item or followers of a store.', 'Lojas já cadastradas na cidade, pessoas que salvaram uma peça ou seguidores de uma loja.')}
            </p>
            <div className="flex flex-col gap-6">
              {([["sm", "SM · 32 px"], ["md", "MD · 40 px"], ["lg", "LG · 48 px"]] as const).map(([size, label]) => (
                <div key={size} className="flex flex-wrap items-center gap-4">
                  <AvatarCircles size={size} numPeople={99} moreHref="#avatar-circles" avatarUrls={DEMO_AVATARS} />
                  <span className="text-[0.6875rem] text-muted-foreground">{label}</span>
                </div>
              ))}
              <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-muted/40 p-4">
                <AvatarCircles numPeople={120} avatarUrls={DEMO_AVATARS.slice(0, 4)} />
                <p className="text-[0.8125rem] text-foreground">
                  <span className="font-semibold">{t("124 stores", "124 lojas")}</span>{" "}
                  <span className="text-muted-foreground">{t("already found by people nearby.", "já são encontradas por quem está perto.")}</span>
                </p>
              </div>
            </div>
            <pre className="mt-4 overflow-x-auto rounded-md bg-muted/60 p-3 text-[0.75rem] text-muted-foreground"><code>{`import { AvatarCircles } from "@/app/components/ui/avatar-circles";

<AvatarCircles
  numPeople={99}
  moreHref="/pessoas"
  avatarUrls={[
    { imageUrl: "/avatares/avatar-1.svg", profileUrl: "/perfil/ana", name: "Ana" },
    { imageUrl: "/avatares/avatar-2.svg", profileUrl: "/perfil/bruno", name: "Bruno" },
  ]}
/>`}</code></pre>
            <ul className="mt-4 grid gap-1.5 text-[0.8125rem] text-muted-foreground sm:grid-cols-2">
              <li>• {t("Props: avatarUrls (imageUrl, profileUrl, name), numPeople, moreHref, size sm | md | lg, className.", "Props: avatarUrls (imageUrl, profileUrl, name), numPeople, moreHref, size sm | md | lg, className.")}</li>
              <li>• {t("Three to six avatars; beyond that, the “+N” carries the rest.", "De três a seis avatares; acima disso, o “+N” resume o restante.")}</li>
              <li>• {t("Always pass name: it becomes the image alt text and the tooltip.", "Sempre informe name: vira o texto alternativo da imagem e o tooltip.")}</li>
              <li>• {t("Only show real people with consent; otherwise use initials avatars.", "Só mostre pessoas reais com consentimento; senão, use avatares de iniciais.")}</li>
            </ul>
          </ShowcaseCard>
        </SubSection>
      </section>
      )}

      {/* ── EMPTY STATE ── */}
      {parte === "rotulos" && (
      <section id="empty-states">
        <SectionHeader title={t("Empty States", "Estados vazios")} description={t("Clear, actionable empty states that guide users forward.", "Estados vazios claros e acionáveis que orientam o usuário.")} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ShowcaseCard>
            <div className="flex flex-col items-center text-center py-8 gap-4">
              <div className="h-16 w-16 rounded-[20px] bg-muted flex items-center justify-center">
                <svg className="h-8 w-8 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3h9L21 7.5v9L16.5 21h-9L3 16.5v-9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
                </svg>
              </div>
              <div>
                <h4 className="text-[1rem] font-semibold text-foreground mb-1">{t("No results found", "Nenhum resultado encontrado")}</h4>
                <p className="text-[0.875rem] text-muted-foreground max-w-[220px]">{t("Try adjusting your search or filters to find what you're looking for.", "Tente ajustar sua busca ou os filtros para encontrar o que procura.")}</p>
              </div>
              <button className="inline-flex items-center gap-2 h-9 px-4 text-[0.875rem] font-semibold rounded-md border border-border bg-card hover:bg-accent text-foreground transition-colors">
                {t("Clear filters", "Limpar filtros")}
              </button>
            </div>
          </ShowcaseCard>

          <ShowcaseCard>
            <div className="flex flex-col items-center text-center py-8 gap-4">
              <div className="h-16 w-16 rounded-[20px] bg-primary/10 flex items-center justify-center">
                <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h4 className="text-[1rem] font-semibold text-foreground mb-1">{t("Create your first project", "Crie seu primeiro projeto")}</h4>
                <p className="text-[0.875rem] text-muted-foreground max-w-[220px]">{t("Projects help you organize your work and collaborate with your team.", "Projetos ajudam você a organizar seu trabalho e colaborar com sua equipe.")}</p>
              </div>
              <button className="inline-flex items-center gap-2 h-9 px-4 text-[0.875rem] font-semibold rounded-md bg-primary text-primary-foreground hover:bg-[var(--primary-hover)] transition-colors">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                {t("New Project", "Novo projeto")}
              </button>
            </div>
          </ShowcaseCard>
        </div>
      </section>
      )}

      {/* ── LISTAS DO PAINEL ── */}
      {parte === "rotulos" && (
      <section id="listas-painel">
        <SectionHeader title="Listas de atividade e ações" description="Três listas do painel da loja: o que aconteceu, o que fazer agora e o que está em alta nas buscas." />
        <SubSection title="Atividade, ações e tendências">
          <GradeDeCards className="lg:grid-cols-3 gap-4">
            <ShowcaseCard>
              <TituloDaLista titulo="Atividade recente" componente="ItemDeAtividade" />
              <ul className="-my-3 divide-y divide-border" aria-label="Atividade recente">
                <ItemDeAtividade icone={<Search />} titulo="Sua peça apareceu em buscas" detalhe="“vestido midi de linho”" quando="há 12 min" />
                <ItemDeAtividade icone={<Heart />} titulo="Peça favoritada" detalhe="Vestido midi · R$ 249,90" quando="há 26 min" />
                <ItemDeAtividade icone={<CalendarCheck />} titulo="Reserva solicitada" detalhe="Vestido midi · Tam. P" quando="há 1 h" />
                <ItemDeAtividade icone={<MessageCircle />} titulo="Contato de interesse" detalhe="Dúvida sobre uma peça" quando="há 2 h" />
              </ul>
            </ShowcaseCard>
            <ShowcaseCard>
              <TituloDaLista titulo="Insight e próxima ação" componente="ItemDeAcao" />
              <div className="space-y-2">
                <ItemDeAcao onClick={evitarSalto} midia={<IconeModa nome="calca" size={24} />} titulo="Calças wide leg em alta" descricao="8 buscas combinam com suas peças." />
                <ItemDeAcao onClick={evitarSalto} midia={<Camera />} titulo="Melhore 3 fotos" descricao="Fotos nítidas ajudam a peça a ser escolhida." />
                <ItemDeAcao onClick={evitarSalto} midia={<Ruler />} titulo="Cadastre os tamanhos" descricao="3 peças estão sem tamanho." />
              </div>
            </ShowcaseCard>
            <ShowcaseCard>
              <TituloDaLista titulo="Buscas em alta na região" componente="ListaDeTendencias" />
              <ListaDeTendencias itens={[{ termo: "Vestido midi", variacao: 62 }, { termo: "Calça wide leg", variacao: 48 }, { termo: "Blazer feminino", variacao: 37 }, { termo: "Saia de linho", variacao: 29 }, { termo: "Bolsa de palha", variacao: 21 }, { termo: "Tênis branco", variacao: -8 }]} />
            </ShowcaseCard>
          </GradeDeCards>
          <ShowcaseCard className="mt-4">
          </ShowcaseCard>
        </SubSection>
        <SubSection title="Atividade com iniciais">
          <p className="mb-3 max-w-2xl text-[0.8125rem] text-muted-foreground">
            Quando o título do card já diz o tipo (por exemplo, "Lojas encontradas até agora"), o mesmo ícone em todos os itens não ajuda a diferenciar.
            Use iniciaisDe: o avatar mostra até duas iniciais do nome, na mesma base rosa.
          </p>
          <div className="max-w-md">
            <ShowcaseCard>
              <TituloDaLista titulo="Lojas encontradas até agora" componente="ItemDeAtividade (iniciaisDe)" />
              <ul className="-my-3 divide-y divide-border" aria-label="Lojas encontradas até agora">
                <ItemDeAtividade iniciaisDe="Outlet São Braz" titulo="Outlet São Braz" detalhe="São Braz · Outlet" quando="há 8 dias" />
                <ItemDeAtividade iniciaisDe="Moda Ortiz Fashion" titulo="Moda Ortiz Fashion" detalhe="CIC · Loja multimarcas" quando="há 8 dias" />
                <ItemDeAtividade iniciaisDe="Clube da Biju" titulo="Clube da Biju" detalhe="Campo Comprido · Loja de acessórios" quando="há 8 dias" />
              </ul>
            </ShowcaseCard>
          </div>
        </SubSection>
      </section>
      )}

      {/* ── Feedback Tokens ── */}
      {parte === "feedback" && (
      <section id="feedback-tokens" className="space-y-5">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-[1.5rem] font-semibold tracking-[-0.02em] text-foreground">{t("Tokens — Feedback", "Tokens — Feedback")}</h2>
          <p className="text-[0.8125rem] text-muted-foreground mt-0.5">{t("CSS custom properties used by alerts, toasts, and status components.", "Propriedades CSS customizadas usadas por alertas, toasts e componentes de status.")}</p>
        </div>
        <TokenTable groups={feedbackTokenGroups(t)} />
      </section>
      )}

      {/* ── Labels / Badges Tokens ── */}
      {parte === "rotulos" && (
      <section id="badges-tokens" className="space-y-5">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-[1.5rem] font-semibold tracking-[-0.02em] text-foreground">{t("Tokens — Labels & Badges", "Tokens — Rótulos e badges")}</h2>
          <p className="text-[0.8125rem] text-muted-foreground mt-0.5">{t("CSS custom properties used by badges, tags, avatars, and status pills.", "Propriedades CSS customizadas usadas por badges, tags, avatares e pílulas de status.")}</p>
        </div>
        <TokenTable groups={badgesTokenGroups(t)} />
      </section>
      )}
    </div>
  );
}

const feedbackTokenGroups = (t: TFn): TokenGroup[] => [
  {
    group: t("Status Colors", "Cores de status"),
    tokens: [
      { name: "--success",              description: t("Positive / confirmed action", "Ação positiva / confirmada"),    light: "#31835D", dark: "#41B47F", isColor: true },
      { name: "--success-foreground",   description: t("Text on success", "Texto sobre sucesso"),               light: "#FFFFFF", dark: "#FFFFFF", isColor: true },
      { name: "--success-muted",        description: t("Success tinted background", "Fundo com tom de sucesso"),      light: "rgba(79,181,123,0.10)", dark: "rgba(34,197,94,0.12)", isColor: true },
      { name: "--success-text",         description: "Texto e ícone de sucesso sobre fundo claro (botão do Alerta com ação)", light: "#2B7553", dark: "#41B47F", isColor: true },
      { name: "--warning",              description: t("Caution / pending action", "Atenção / ação pendente"),       light: "#F0B135", dark: "#F0B135", isColor: true },
      { name: "--warning-foreground",   description: t("Text on warning", "Texto sobre aviso"),               light: "#FFFFFF", dark: "#FFFFFF", isColor: true },
      { name: "--warning-muted",        description: t("Warning tinted background", "Fundo com tom de aviso"),      light: "rgba(229,169,78,0.10)", dark: "rgba(245,179,32,0.12)", isColor: true },
      { name: "--warning-text",         description: "Texto e ícone de aviso sobre fundo claro (ícone e botão dos alertas)", light: "#A66200", dark: "#F0B135", isColor: true },
      { name: "--error",                description: t("Error / failure state", "Estado de erro / falha"),          light: "#FC0256", dark: "#FC0256", isColor: true },
      { name: "--error-foreground",     description: t("Icon or large text on error (3.98:1); filled error buttons use --destructive", "Ícone ou texto grande sobre o erro (3,98:1); botão cheio de erro usa --destructive"), light: "#FFFFFF", dark: "#000000", isColor: true },
      { name: "--error-muted",          description: t("Error tinted background", "Fundo com tom de erro"),        light: "rgba(252,2,86,0.10)",  dark: "rgba(252,2,86,0.15)",  isColor: true },
      { name: "--error-text",           description: "Texto e ícone de erro (= --primary-text; ícone e botão dos alertas)", light: "#BC0A41", dark: "#F78BA7", isColor: true },
      { name: "--info",                 description: t("Informational notice", "Aviso informativo"),           light: "#347BA9", dark: "#59A8DC", isColor: true },
      { name: "--info-foreground",      description: t("Text on info", "Texto sobre info"),                  light: "#FFFFFF", dark: "#FFFFFF", isColor: true },
      { name: "--info-muted",           description: t("Info tinted background", "Fundo com tom de info"),         light: "rgba(68,138,188,0.10)", dark: "rgba(59,130,246,0.12)", isColor: true },
      { name: "--info-text",            description: "Texto e ícone de info sobre fundo claro (botão do Alerta com ação)", light: "#2E6E98", dark: "#59A8DC", isColor: true },
      { name: "--destructive",          description: t("Destructive / irreversible", "Destrutivo / irreversível"),     light: "#E8004E", dark: "#E8004E", isColor: true },
      { name: "--destructive-foreground",description: t("Text on destructive", "Texto sobre destrutivo"),           light: "#FFFFFF", dark: "#FFFFFF", isColor: true },
    ],
  },
  {
    group: t("Toast / Notification Surface", "Superfície de toast / notificação"),
    tokens: [
      { name: "--popover",           description: t("Toast background", "Fundo do toast"),       light: "#FFFFFF",             dark: "rgba(25,25,28,0.95)", isColor: true },
      { name: "--popover-foreground",description: t("Toast text", "Texto do toast"),             light: "#19191C",             dark: "#F6F6F7",             isColor: true },
      { name: "--border",            description: t("Toast border", "Borda do toast"),           light: "rgba(25,25,28,0.09)", dark: "rgba(255,255,255,0.07)", isColor: true },
      { name: "--shadow-md",         description: t("Toast elevation", "Elevação do toast"),       light: "0 4px 12px …" },
    ],
  },
];

const badgesTokenGroups = (t: TFn): TokenGroup[] => [
  {
    group: t("Badge / Tag Colors", "Cores de badge / tag"),
    tokens: [
      { name: "--primary",      description: t("Primary badge fill", "Preenchimento do badge primário"),   light: "#E8004E", dark: "#E8004E", isColor: true },
      { name: "--primary-muted",description: t("Primary badge tinted", "Badge primário com tom"), light: "rgba(252,2,86,0.10)", dark: "rgba(252,2,86,0.15)", isColor: true },
      { name: "--success",      description: t("Success badge", "Badge de sucesso"),        light: "#31835D", dark: "#41B47F", isColor: true },
      { name: "--success-muted",description: t("Success badge tinted", "Badge de sucesso com tom"), light: "rgba(79,181,123,0.10)", dark: "rgba(34,197,94,0.12)", isColor: true },
      { name: "--warning",      description: t("Warning badge", "Badge de aviso"),        light: "#F0B135", dark: "#F0B135", isColor: true },
      { name: "--warning-muted",description: t("Warning badge tinted", "Badge de aviso com tom"), light: "rgba(229,169,78,0.10)", dark: "rgba(245,179,32,0.12)", isColor: true },
      { name: "--info",         description: t("Info badge", "Badge de info"),           light: "#347BA9", dark: "#59A8DC", isColor: true },
      { name: "--info-muted",   description: t("Info badge tinted", "Badge de info com tom"),    light: "rgba(68,138,188,0.10)", dark: "rgba(59,130,246,0.12)", isColor: true },
      { name: "--violet",       description: t("Violet accent badge", "Badge de destaque violeta"),  light: "#ba69dc", dark: "#eb6cff", isColor: true },
      { name: "--violet-muted", description: t("Violet badge tinted", "Badge violeta com tom"),  light: "rgba(186,105,220,0.10)", dark: "rgba(235,108,255,0.12)", isColor: true },
      { name: "--orange",       description: t("Orange accent badge", "Badge de destaque laranja"),  light: "#fa9852", dark: "#ff8833", isColor: true },
      { name: "--orange-muted", description: t("Orange badge tinted", "Badge laranja com tom"),  light: "rgba(250,152,82,0.10)", dark: "rgba(255,136,51,0.12)", isColor: true },
      { name: "--card / --border", description: t("Hero tag (selo) surface and border", "Superfície e borda do selo (tag do hero)"), light: "#FFFFFF", dark: "card", isColor: false },
      { name: "--graphite-700", description: t("Hero tag text (graphite-300 in dark)", "Texto do selo (graphite-300 no escuro)"), light: "graphite-700", dark: "graphite-300", isColor: false },
      { name: "--muted",        description: t("Neutral / default badge", "Badge neutro / padrão"),light: "#E9E9EC", dark: "rgba(44,44,51,0.60)", isColor: true },
    ],
  },
  {
    group: t("Avatar", "Avatar"),
    tokens: [
      { name: "--border",        description: t("Avatar ring border", "Borda do anel do avatar"),      light: "rgba(25,25,28,0.09)", dark: "rgba(255,255,255,0.07)", isColor: true },
      { name: "--muted",         description: t("Avatar fallback bg", "Fundo de fallback do avatar"),     light: "#E9E9EC",             dark: "rgba(44,44,51,0.60)",    isColor: true },
      { name: "--muted-foreground",description: t("Avatar initials text", "Texto das iniciais do avatar"), light: "#888896",             dark: "#B3B3BC",                isColor: true },
      { name: "--primary",       description: t("Avatar active ring", "Anel ativo do avatar"),     light: "#E8004E",             dark: "#E8004E",                isColor: true },
    ],
  },
];
