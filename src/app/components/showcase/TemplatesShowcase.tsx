import React, { useState, useEffect, useId } from "react";
import { TokenTable, type TokenGroup } from "./shared/TokenTable";
import {
  LayoutDashboard, Settings, LogIn, Bell, Users,
  TrendingUp, TrendingDown, DollarSign, ShoppingCart, Activity,
  ArrowUpRight, MoreHorizontal, Search, Filter, Plus, Check,
  ChevronRight, X, Mail, Lock, Eye, EyeOff, User,
  Home, BarChart2, Inbox, FileText, HelpCircle,
  CheckCircle, AlertCircle, Clock, Info,
  CreditCard, Zap, Building2, Star,
  Edit2, Trash2, UserPlus, Download,
  Moon, Sun, ChevronDown, Package,
  Phone, MapPin, MessageSquare, Send, AtSign,
  Globe, Sparkles, Layers, ArrowRight, PlayCircle,
  ShieldCheck, Rocket, BarChart, Layout, Minus, Lightbulb,
  Store, Heart, MessageCircle, FileSpreadsheet, CalendarCheck,
  Smartphone, Shirt, LogOut, CheckCheck, MailOpen, LifeBuoy, BookOpen,
} from "lucide-react";
import {
  AreaChart, Area, BarChart as ReBarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip as ReTooltip,
} from "recharts";
import { useI18n } from "../../i18n";
import { PrototipoDoPainel, PainelEmbutido } from "./PainelTemplates";
import { Switch } from "../ui/switch";
import { IconeModa, type NomeIconeModa } from "../ui/fashion-icons";
import logoSimbolo from "../../../imports/findlook/findlook-simbolo.png";

type L = { en: string; pt: string };

/* ─────────────────────────────────────────────
   Shared helpers
───────────────────────────────────────────── */
function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-[1.5rem] font-semibold tracking-[-0.02em] text-foreground mb-1">{title}</h2>
      {description && <p className="text-[0.9375rem] text-muted-foreground">{description}</p>}
    </div>
  );
}

function TemplateLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="h-7 w-7 rounded-[8px] bg-muted flex items-center justify-center">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.07em] text-muted-foreground">{label}</span>
    </div>
  );
}

/* Wraps each template in a browser-chrome frame */
function TemplateFrame({ children, className = "", url = "Painel da loja · FindLook" }: { children: React.ReactNode; className?: string; url?: string }) {
  const embutido = React.useContext(PainelEmbutido);
  if (embutido) return <div className={`overflow-hidden rounded-[16px] border border-border bg-background ${className}`} style={{ boxShadow: "var(--shadow-xs)" }}>{children}</div>;
  return (
    <div className={`rounded-[16px] border border-border overflow-hidden ${className}`} style={{ boxShadow: "var(--shadow-lg)" }}>
      {/* Browser chrome */}
      <div className="h-9 bg-muted/60 border-b border-border flex items-center px-4 gap-2 shrink-0">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-primary/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-warning/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-success/50" />
        </div>
        <div className="flex-1 mx-4">
          <div className="h-5 bg-background/70 rounded-[6px] max-w-[280px] mx-auto flex items-center px-3">
            <span className="text-[0.625rem] text-muted-foreground/60 truncate">{url}</span>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Helpers dos templates FindLook
───────────────────────────────────────────── */
const foco = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const campo = "w-full bg-background border border-border rounded-[8px] px-3 py-2 text-[0.8125rem] text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all";
const textoMarca = "text-[var(--primary-text,var(--primary))]";

/* Símbolo + wordmark FindLook, com legenda opcional (ex.: nome da loja) */
function MarcaFindLook({ legenda, tamanho = "sm" }: { legenda?: string; tamanho?: "sm" | "md" }) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <img src={logoSimbolo} alt="" className={`${tamanho === "md" ? "h-8" : "h-6"} w-auto object-contain shrink-0`} />
      <div className="min-w-0 leading-tight">
        <span className={`${tamanho === "md" ? "text-[1rem]" : "text-[0.8125rem]"} font-extrabold tracking-[-0.03em] text-foreground whitespace-nowrap`}>
          Find<span className="text-primary">Look</span>
        </span>
        {legenda && <span className="block text-[0.625rem] text-muted-foreground truncate">{legenda}</span>}
      </div>
    </div>
  );
}

/* Navegação por setas entre abas (padrão ARIA de tabs) */
function moverAba(e: React.KeyboardEvent, ids: string[], atual: string, definir: (id: string) => void, prefixo: string) {
  const i = ids.indexOf(atual);
  let proximo = -1;
  if (e.key === "ArrowRight") proximo = (i + 1) % ids.length;
  if (e.key === "ArrowLeft") proximo = (i - 1 + ids.length) % ids.length;
  if (e.key === "Home") proximo = 0;
  if (e.key === "End") proximo = ids.length - 1;
  if (proximo < 0) return;
  e.preventDefault();
  definir(ids[proximo]);
  document.getElementById(`${prefixo}-aba-${ids[proximo]}`)?.focus();
}

/* ─────────────────────────────────────────────
   2. Configurações da loja
───────────────────────────────────────────── */
const avisosLoja = [
  { chave: "favoritos", icon: Heart,         titulo: "Peça favoritada",      desc: "Quando alguém salva uma peça da sua loja nos favoritos." },
  { chave: "reservas",  icon: CalendarCheck, titulo: "Pedido de reserva",    desc: "Quando alguém pede para a loja separar uma peça." },
  { chave: "contatos",  icon: MessageCircle, titulo: "Contato de interesse", desc: "Quando alguém toca em “Falar com a loja”." },
  { chave: "buscas",    icon: Search,        titulo: "Busca compatível",     desc: "Quando alguém da sua região procura uma peça parecida com as suas." },
] as const;
type ChaveAviso = typeof avisosLoja[number]["chave"];

function SettingsTemplate({ abaInicial = "perfil" }: { abaInicial?: string }) {
  const embutido = React.useContext(PainelEmbutido);
  const uid = useId();
  const [activeTab, setActiveTab] = useState(abaInicial);
  const [salvo, setSalvo] = useState(false);
  const [avisos, setAvisos] = useState<Record<ChaveAviso, boolean>>({ favoritos: true, reservas: true, contatos: true, buscas: false });
  const [canais, setCanais] = useState({ email: true, whatsapp: false });
  const [privacidade, setPrivacidade] = useState({ whatsapp: true, endereco: false });
  const [vitrinePausada, setVitrinePausada] = useState(false);
  const [darkToggle, setDarkToggle] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setDarkToggle(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const tabs = [
    { id: "perfil",       label: "Perfil da loja" },
    { id: "notificacoes", label: "Notificações" },
    { id: "aparencia",    label: "Aparência" },
    { id: "conta",        label: "Conta e privacidade" },
  ];
  const ids = tabs.map(tb => tb.id);
  const pre = `cfg${uid.replace(/:/g, "")}`;

  const linhaSwitch = (id: string, titulo: string, desc: string, marcado: boolean, mudar: (v: boolean) => void, Icon?: React.ElementType, desativado = false) => (
    <div key={id} className="flex items-center justify-between gap-3 p-3 rounded-[10px] border border-border bg-card">
      <div className="flex items-start gap-2.5 min-w-0">
        {Icon && (
          <span className="h-7 w-7 rounded-[8px] bg-muted flex items-center justify-center shrink-0">
            <Icon aria-hidden className="h-3.5 w-3.5 text-muted-foreground" />
          </span>
        )}
        <div className="min-w-0">
          <label htmlFor={`${pre}-${id}`} className="block text-[0.8125rem] font-medium text-foreground cursor-pointer">{titulo}</label>
          <p id={`${pre}-${id}-desc`} className="text-[0.6875rem] text-muted-foreground leading-snug">{desc}</p>
        </div>
      </div>
      <Switch id={`${pre}-${id}`} checked={marcado} onCheckedChange={mudar} disabled={desativado} aria-describedby={`${pre}-${id}-desc`} />
    </div>
  );

  return (
    <TemplateFrame url="Painel da loja · Configurações">
      <div className={`flex bg-background overflow-hidden ${embutido ? "" : "h-[560px]"}`}>
        {/* Menu do painel */}
        {!embutido && <aside className="hidden md:block w-[196px] shrink-0 border-r border-border bg-card/50 py-3 px-2.5" aria-label="Menu do painel da loja">
          <div className="px-2 mb-5">
            <MarcaFindLook legenda="Ateliê Aurora" />
          </div>
          <nav>
            {[
              { icon: Home,       label: "Início",        active: false },
              { icon: Shirt,      label: "Peças",         active: false },
              { icon: Bell,       label: "Notificações",  active: false },
              { icon: Users,      label: "Equipe",        active: false },
              { icon: Settings,   label: "Configurações", active: true  },
              { icon: HelpCircle, label: "Ajuda",         active: false },
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  aria-current={item.active ? "page" : undefined}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-[7px] text-[0.75rem] font-medium mb-0.5 w-full text-left transition-colors ${foco} ${item.active ? `bg-[var(--primary-muted)] ${textoMarca}` : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
                >
                  <Icon aria-hidden className="h-3.5 w-3.5 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>}

        {/* Conteúdo */}
        <div className="flex-1 min-w-0 overflow-y-auto">
          <div className="border-b border-border px-4 sm:px-6 py-3">
            <h1 className="text-[0.9375rem] font-bold text-foreground">Configurações da loja</h1>
            <p className="text-[0.6875rem] text-muted-foreground">Essas informações aparecem na vitrine da sua loja na FindLook.</p>
          </div>

          {/* Abas */}
          <div role="tablist" aria-label="Seções das configurações" className="flex border-b border-border px-4 sm:px-6 overflow-x-auto">
            {tabs.map(tb => (
              <button
                key={tb.id}
                id={`${pre}-aba-${tb.id}`}
                type="button"
                role="tab"
                aria-selected={activeTab === tb.id}
                aria-controls={`${pre}-painel`}
                tabIndex={activeTab === tb.id ? 0 : -1}
                onClick={() => setActiveTab(tb.id)}
                onKeyDown={e => moverAba(e, ids, activeTab, setActiveTab, pre)}
                className={`px-3 py-2.5 text-[0.75rem] font-medium border-b-2 transition-colors -mb-px whitespace-nowrap ${foco}
                  ${activeTab === tb.id
                    ? `border-primary ${textoMarca}`
                    : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
              >
                {tb.label}
              </button>
            ))}
          </div>

          <div id={`${pre}-painel`} role="tabpanel" aria-labelledby={`${pre}-aba-${activeTab}`} className="p-4 sm:p-6">
            {activeTab === "perfil" && (
              <form onSubmit={e => { e.preventDefault(); setSalvo(true); }} className="space-y-4 max-w-lg">
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-14 w-14 rounded-full bg-[var(--primary-muted)] flex items-center justify-center shrink-0">
                    <Store aria-hidden className={`h-7 w-7 ${textoMarca}`} />
                  </div>
                  <div>
                    <div className="text-[0.875rem] font-semibold text-foreground">Ateliê Aurora</div>
                    <div className="text-[0.75rem] text-muted-foreground">Loja parceira desde mar. de 2026</div>
                    <button type="button" className={`mt-1 text-[0.6875rem] font-medium hover:underline rounded-[4px] ${textoMarca} ${foco}`}>Trocar logo da loja</button>
                  </div>
                </div>

                <div>
                  <label htmlFor={`${pre}-nome`} className="block text-[0.75rem] font-medium text-foreground mb-1">Nome da loja</label>
                  <input id={`${pre}-nome`} type="text" autoComplete="organization" defaultValue="Ateliê Aurora" onChange={() => setSalvo(false)} className={campo} />
                </div>
                <div>
                  <label htmlFor={`${pre}-desc`} className="block text-[0.75rem] font-medium text-foreground mb-1">Descrição</label>
                  <textarea
                    id={`${pre}-desc`}
                    rows={3}
                    aria-describedby={`${pre}-desc-dica`}
                    onChange={() => setSalvo(false)}
                    defaultValue="Moda feminina autoral e peças de brechó selecionadas. Tamanhos do PP ao GG."
                    className={`${campo} resize-none`}
                  />
                  <p id={`${pre}-desc-dica`} className="mt-1 text-[0.6875rem] text-muted-foreground">Conte em poucas palavras o que a sua loja vende e para quem.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={`${pre}-endereco`} className="block text-[0.75rem] font-medium text-foreground mb-1">Endereço</label>
                    <input id={`${pre}-endereco`} type="text" autoComplete="street-address" defaultValue="Rua dos Pinheiros, 820" onChange={() => setSalvo(false)} className={campo} />
                  </div>
                  <div>
                    <label htmlFor={`${pre}-bairro`} className="block text-[0.75rem] font-medium text-foreground mb-1">Bairro e cidade</label>
                    <input id={`${pre}-bairro`} type="text" autoComplete="address-level2" defaultValue="Pinheiros, São Paulo – SP" onChange={() => setSalvo(false)} className={campo} />
                  </div>
                  <div>
                    <label htmlFor={`${pre}-horario`} className="block text-[0.75rem] font-medium text-foreground mb-1">Horário de funcionamento</label>
                    <input id={`${pre}-horario`} type="text" defaultValue="Seg. a sáb., das 10h às 19h" onChange={() => setSalvo(false)} className={campo} />
                  </div>
                  <div>
                    <label htmlFor={`${pre}-whats`} className="block text-[0.75rem] font-medium text-foreground mb-1">WhatsApp da loja</label>
                    <input id={`${pre}-whats`} type="tel" autoComplete="tel" defaultValue="(11) 98765-4321" onChange={() => setSalvo(false)} className={campo} />
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
                  <p role="status" className="text-[0.6875rem] text-muted-foreground flex items-center gap-1.5">
                    {salvo && <><CheckCircle aria-hidden className="h-3.5 w-3.5 text-success" /> Alterações salvas. A vitrine já mostra as novas informações.</>}
                  </p>
                  <button type="submit" className={`h-8 px-4 rounded-[8px] bg-primary text-primary-foreground text-[0.75rem] font-semibold hover:opacity-90 transition-opacity ${foco}`}>
                    Salvar alterações
                  </button>
                </div>
              </form>
            )}

            {activeTab === "notificacoes" && (
              <div className="space-y-5 max-w-lg">
                <section aria-labelledby={`${pre}-t-avisos`} className="space-y-2.5">
                  <div>
                    <h2 id={`${pre}-t-avisos`} className="text-[0.8125rem] font-semibold text-foreground">O que avisar</h2>
                    <p className="text-[0.6875rem] text-muted-foreground">Escolha quais movimentos da sua vitrine geram aviso.</p>
                  </div>
                  {avisosLoja.map(a =>
                    linhaSwitch(a.chave, a.titulo, a.desc, avisos[a.chave], v => setAvisos(prev => ({ ...prev, [a.chave]: v })), a.icon)
                  )}
                </section>
                <section aria-labelledby={`${pre}-t-canais`} className="space-y-2.5">
                  <h2 id={`${pre}-t-canais`} className="text-[0.8125rem] font-semibold text-foreground">Onde avisar</h2>
                  {linhaSwitch("painel", "No painel da loja", "Sempre ativo. Os avisos ficam em Notificações.", true, () => {}, Bell, true)}
                  {linhaSwitch("email", "Por e-mail", "ana@atelieaurora.com.br", canais.email, v => setCanais(p => ({ ...p, email: v })), Mail)}
                  {linhaSwitch("whatsapp", "Pelo WhatsApp", "(11) 98765-4321", canais.whatsapp, v => setCanais(p => ({ ...p, whatsapp: v })), Smartphone)}
                </section>
              </div>
            )}

            {activeTab === "aparencia" && (
              <div className="space-y-3 max-w-md">
                <h2 className="text-[0.8125rem] font-medium text-foreground">Tema do painel</h2>
                <p className="text-[0.6875rem] text-muted-foreground -mt-2">Escolha como o painel aparece para você.</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "light", label: "Modo claro",  icon: Sun,  active: !darkToggle },
                    { id: "dark",  label: "Modo escuro", icon: Moon, active: darkToggle },
                  ].map(th => {
                    const Icon = th.icon;
                    return (
                      <button
                        key={th.id}
                        type="button"
                        aria-pressed={th.active}
                        onClick={() => {
                          const newDark = th.id === "dark";
                          document.documentElement.classList.toggle("dark", newDark);
                        }}
                        className={`p-3 rounded-[10px] border-2 flex flex-col items-center gap-2 transition-all ${foco}
                          ${th.active ? "border-primary bg-[var(--primary-muted)]" : "border-border bg-card"}`}
                      >
                        <Icon aria-hidden className={`h-5 w-5 ${th.active ? textoMarca : "text-muted-foreground"}`} />
                        <span className={`text-[0.75rem] font-medium ${th.active ? textoMarca : "text-muted-foreground"}`}>{th.label}</span>
                        {th.active && <span className={`flex items-center gap-1 text-[0.625rem] font-semibold ${textoMarca}`}><Check aria-hidden className="h-3 w-3" /> Em uso</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "conta" && (
              <div className="space-y-5 max-w-lg">
                <section aria-labelledby={`${pre}-t-plano`} className="space-y-2.5">
                  <h2 id={`${pre}-t-plano`} className="text-[0.8125rem] font-semibold text-foreground">Plano</h2>
                  <div className="p-3 rounded-[10px] border border-primary/30 bg-[var(--primary-muted)] flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[0.8125rem] font-semibold text-foreground flex items-center gap-1.5">
                        <Zap aria-hidden className={`h-3.5 w-3.5 ${textoMarca}`} /> Plano Desempenho
                      </div>
                      <div className="text-[0.6875rem] text-muted-foreground">R$ 149,00 por mês · renova em 1º de dez. de 2026</div>
                    </div>
                    <button type="button" className={`h-7 px-3 rounded-[7px] border border-border bg-card text-[0.6875rem] font-medium text-foreground hover:bg-accent shrink-0 ${foco}`}>Ver planos</button>
                  </div>
                </section>

                <section aria-labelledby={`${pre}-t-priv`} className="space-y-2.5">
                  <h2 id={`${pre}-t-priv`} className="text-[0.8125rem] font-semibold text-foreground">Privacidade da vitrine</h2>
                  {linhaSwitch("mostrar-whats", "Mostrar o WhatsApp na vitrine", "Quem encontra suas peças pode chamar a loja direto.", privacidade.whatsapp, v => setPrivacidade(p => ({ ...p, whatsapp: v })), MessageCircle)}
                  {linhaSwitch("mostrar-end", "Mostrar o endereço completo", "Desligado, a vitrine mostra só o bairro.", privacidade.endereco, v => setPrivacidade(p => ({ ...p, endereco: v })), MapPin)}
                  <div className="flex items-start gap-2.5 p-3 rounded-[10px] bg-muted">
                    <ShieldCheck aria-hidden className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <p className="text-[0.6875rem] text-muted-foreground leading-snug">
                      Os avisos mostram o que as pessoas fizeram, sem nome nem contato. Você só recebe os dados de alguém quando a pessoa escolhe falar com a loja.
                    </p>
                  </div>
                </section>

                <section aria-labelledby={`${pre}-t-vitrine`} className="space-y-2.5">
                  <h2 id={`${pre}-t-vitrine`} className="text-[0.8125rem] font-semibold text-foreground">Vitrine e acesso</h2>
                  <div className="p-3 rounded-[10px] border border-border bg-card flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[0.8125rem] font-medium text-foreground">{vitrinePausada ? "Vitrine pausada" : "Vitrine no ar"}</div>
                      <p role="status" className="text-[0.6875rem] text-muted-foreground">
                        {vitrinePausada ? "Sua loja não aparece nas buscas até você reativar." : "Sua loja aparece nas buscas da região."}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setVitrinePausada(v => !v)}
                      className={`h-7 px-3 rounded-[7px] border border-border bg-card text-[0.6875rem] font-medium text-foreground hover:bg-accent shrink-0 ${foco}`}
                    >
                      {vitrinePausada ? "Reativar vitrine" : "Pausar vitrine"}
                    </button>
                  </div>
                  <button type="button" className={`inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-muted-foreground hover:text-foreground rounded-[4px] ${foco}`}>
                    <LogOut aria-hidden className="h-3.5 w-3.5" /> Sair da conta
                  </button>
                </section>
              </div>
            )}
          </div>
        </div>
      </div>
    </TemplateFrame>
  );
}

/* ─────────────────────────────────────────────
   3. Entrar e criar conta (loja parceira)
───────────────────────────────────────────── */
function AuthTemplate() {
  const uid = useId();
  const pre = `auth${uid.replace(/:/g, "")}`;
  const [showPass, setShowPass] = useState(false);
  const [tab, setTab] = useState<"entrar" | "criar">("entrar");
  const [enviado, setEnviado] = useState(false);
  const entrar = tab === "entrar";

  const trocar = (novo: "entrar" | "criar") => { setTab(novo); setEnviado(false); };

  return (
    <TemplateFrame url="FindLook · Entrar">
      <div className="bg-background flex min-h-[540px] overflow-hidden">
        {/* Painel da marca */}
        <div className="hidden md:flex w-[44%] bg-card border-r border-border flex-col items-center justify-center p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-info/6 blur-3xl" />
          <div className="relative z-10 max-w-[240px]">
            <div className="mb-5"><MarcaFindLook tamanho="md" legenda="Painel da loja" /></div>
            <h2 className="text-[1.125rem] font-bold text-foreground leading-snug mb-2">
              Sua loja encontrada por quem já procura o que você vende.
            </h2>
            <p className="text-[0.8125rem] text-muted-foreground leading-relaxed">
              Publique suas peças e receba contatos de pessoas da sua região.
            </p>
            <ul className="mt-6 space-y-2">
              {["Vitrine pesquisável por foto e descrição", "Contato direto pelo WhatsApp", "Veja quais peças despertam interesse"].map(f => (
                <li key={f} className="flex items-start gap-2 text-[0.75rem] text-muted-foreground">
                  <Check aria-hidden className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Formulário */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
          <div className="w-full max-w-[300px]">
            <div className="md:hidden mb-5"><MarcaFindLook legenda="Painel da loja" /></div>
            <div className="flex rounded-[10px] border border-border bg-muted/40 p-0.5 mb-6" role="group" aria-label="Escolha uma opção">
              {(["entrar", "criar"] as const).map(tb => (
                <button
                  key={tb}
                  type="button"
                  aria-pressed={tab === tb}
                  onClick={() => trocar(tb)}
                  className={`flex-1 py-1.5 rounded-[8px] text-[0.75rem] font-semibold transition-all ${foco}
                    ${tab === tb ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  {tb === "entrar" ? "Entrar" : "Criar conta"}
                </button>
              ))}
            </div>

            {enviado ? (
              <div role="status" className="text-center py-6">
                <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle aria-hidden className="h-6 w-6 text-success" />
                </div>
                <p className="text-[0.9375rem] font-bold text-foreground mb-1">{entrar ? "Tudo certo!" : "Conta criada!"}</p>
                <p className="text-[0.75rem] text-muted-foreground leading-relaxed mb-5">
                  {entrar
                    ? "Abrindo o painel do Ateliê Aurora."
                    : "Enviamos um e-mail para confirmar o endereço. Depois é só cadastrar as primeiras peças."}
                </p>
                <button type="button" onClick={() => setEnviado(false)} className={`h-8 px-4 rounded-[8px] border border-border bg-card text-[0.75rem] font-medium text-foreground hover:bg-accent ${foco}`}>
                  Voltar
                </button>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setEnviado(true); }}>
                <div className="mb-5">
                  <h1 className="text-[1.125rem] font-bold text-foreground">
                    {entrar ? "Que bom ter você de volta" : "Cadastre sua loja"}
                  </h1>
                  <p className="text-[0.75rem] text-muted-foreground mt-0.5">
                    {entrar ? "Entre no painel da sua loja." : "Leva poucos minutos. Você revisa tudo antes de publicar."}
                  </p>
                </div>

                <div className="space-y-3">
                  {!entrar && (
                    <>
                      <div>
                        <label htmlFor={`${pre}-nome`} className="block text-[0.75rem] font-medium text-foreground mb-1">Seu nome</label>
                        <div className="relative">
                          <User aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                          <input id={`${pre}-nome`} required type="text" autoComplete="name" placeholder="Ana Oliveira" className={`${campo} pl-8`} />
                        </div>
                      </div>
                      <div>
                        <label htmlFor={`${pre}-loja`} className="block text-[0.75rem] font-medium text-foreground mb-1">Nome da loja</label>
                        <div className="relative">
                          <Store aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                          <input id={`${pre}-loja`} required type="text" autoComplete="organization" placeholder="Ateliê Aurora" className={`${campo} pl-8`} />
                        </div>
                      </div>
                    </>
                  )}
                  <div>
                    <label htmlFor={`${pre}-email`} className="block text-[0.75rem] font-medium text-foreground mb-1">E-mail</label>
                    <div className="relative">
                      <Mail aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                      <input id={`${pre}-email`} required type="email" autoComplete="email" placeholder="ana@atelieaurora.com.br" className={`${campo} pl-8`} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor={`${pre}-senha`} className="text-[0.75rem] font-medium text-foreground">Senha</label>
                      {entrar && <button type="button" className={`text-[0.6875rem] hover:underline rounded-[4px] ${textoMarca} ${foco}`}>Esqueci minha senha</button>}
                    </div>
                    <div className="relative">
                      <Lock aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                      <input
                        id={`${pre}-senha`}
                        required
                        minLength={entrar ? undefined : 8}
                        type={showPass ? "text" : "password"}
                        autoComplete={entrar ? "current-password" : "new-password"}
                        aria-describedby={entrar ? undefined : `${pre}-senha-dica`}
                        placeholder="••••••••"
                        className={`${campo} pl-8 pr-9`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(v => !v)}
                        aria-label={showPass ? "Ocultar senha" : "Mostrar senha"}
                        aria-pressed={showPass}
                        className={`absolute right-1.5 top-1/2 -translate-y-1/2 h-6 w-6 rounded-[6px] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors ${foco}`}
                      >
                        {showPass ? <EyeOff aria-hidden className="h-3.5 w-3.5" /> : <Eye aria-hidden className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                    {!entrar && <p id={`${pre}-senha-dica`} className="mt-1 text-[0.6875rem] text-muted-foreground">Use pelo menos 8 caracteres.</p>}
                  </div>

                  {!entrar && (
                    <div className="flex items-start gap-2">
                      <input id={`${pre}-termos`} type="checkbox" required className="mt-0.5 h-3.5 w-3.5 rounded accent-[var(--primary)] shrink-0" />
                      <label htmlFor={`${pre}-termos`} className="text-[0.6875rem] text-muted-foreground leading-snug cursor-pointer">
                        Li e aceito os <span className={`underline underline-offset-2 ${textoMarca}`}>Termos de uso</span> e a <span className={`underline underline-offset-2 ${textoMarca}`}>Política de privacidade</span>.
                      </label>
                    </div>
                  )}

                  <button type="submit" className={`w-full h-9 rounded-[8px] bg-primary text-primary-foreground text-[0.8125rem] font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 mt-1 ${foco}`}>
                    {entrar ? <LogIn aria-hidden className="h-3.5 w-3.5" /> : <Store aria-hidden className="h-3.5 w-3.5" />}
                    {entrar ? "Entrar" : "Cadastrar minha loja"}
                  </button>

                  <p className="text-center text-[0.6875rem] text-muted-foreground pt-1">
                    {entrar ? "Sua loja ainda não está na FindLook? " : "Já tem conta? "}
                    <button type="button" onClick={() => trocar(entrar ? "criar" : "entrar")} className={`font-semibold hover:underline rounded-[4px] ${textoMarca} ${foco}`}>
                      {entrar ? "Cadastre sua loja" : "Entrar"}
                    </button>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </TemplateFrame>
  );
}

/* ─────────────────────────────────────────────
   4. Equipe da loja
───────────────────────────────────────────── */
type Papel = "responsavel" | "atendente" | "estoquista";
type Situacao = "ativo" | "pendente" | "pausado";
type Pessoa = { nome: string; email: string; papel: Papel; situacao: Situacao; iniciais: string; acesso: string };

const papeis: Record<Papel, { rotulo: string; desc: string; cor: string }> = {
  responsavel: { rotulo: "Responsável", desc: "Cuida do plano, da equipe e de todos os dados da loja.", cor: `bg-[var(--primary-muted)] ${textoMarca} border-primary/20` },
  atendente:   { rotulo: "Atendente",   desc: "Responde contatos e pedidos de reserva.",                cor: "bg-[var(--info-muted)] text-foreground border-info/30" },
  estoquista:  { rotulo: "Estoquista",  desc: "Cadastra peças, fotos, tamanhos e estoque.",             cor: "bg-muted text-foreground border-border" },
};

const situacoes: Record<Situacao, { rotulo: string; ponto: string }> = {
  ativo:    { rotulo: "Ativo",            ponto: "bg-success" },
  pendente: { rotulo: "Convite pendente", ponto: "bg-warning" },
  pausado:  { rotulo: "Acesso pausado",   ponto: "bg-muted-foreground" },
};

const equipeInicial: Pessoa[] = [
  { nome: "Ana Oliveira", email: "ana@atelieaurora.com.br",   papel: "responsavel", situacao: "ativo",    iniciais: "AO", acesso: "Agora" },
  { nome: "Bruno Sato",   email: "bruno@atelieaurora.com.br", papel: "atendente",   situacao: "ativo",    iniciais: "BS", acesso: "Hoje, 10h12" },
  { nome: "Carla Mendes", email: "carla@atelieaurora.com.br", papel: "estoquista",  situacao: "ativo",    iniciais: "CM", acesso: "Ontem" },
  { nome: "Rafa Lima",    email: "rafa@atelieaurora.com.br",  papel: "atendente",   situacao: "pendente", iniciais: "RL", acesso: "Ainda não acessou" },
  { nome: "Jô Martins",   email: "jo@atelieaurora.com.br",    papel: "estoquista",  situacao: "pausado",  iniciais: "JM", acesso: "Há 3 semanas" },
];

function TeamTemplate() {
  const embutido = React.useContext(PainelEmbutido);
  const uid = useId();
  const pre = `eq${uid.replace(/:/g, "")}`;
  const [pessoas, setPessoas] = useState<Pessoa[]>(equipeInicial);
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState<Papel | "todos">("todos");
  const [convidando, setConvidando] = useState(false);
  const [emailConvite, setEmailConvite] = useState("");
  const [papelConvite, setPapelConvite] = useState<Papel>("atendente");
  const [editando, setEditando] = useState<string | null>(null);
  const [removendo, setRemovendo] = useState<string | null>(null);
  const [aviso, setAviso] = useState("");

  const termo = search.trim().toLowerCase();
  const filtered = pessoas.filter(m =>
    (filtro === "todos" || m.papel === filtro) &&
    (m.nome.toLowerCase().includes(termo) || m.email.toLowerCase().includes(termo))
  );

  const enviarConvite = (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailConvite.trim();
    if (!email) return;
    setPessoas(prev => [...prev, { nome: email, email, papel: papelConvite, situacao: "pendente", iniciais: email.slice(0, 2).toUpperCase(), acesso: "Ainda não acessou" }]);
    setAviso(`Convite enviado para ${email}.`);
    setEmailConvite("");
    setConvidando(false);
  };

  return (
    <TemplateFrame url="Painel da loja · Equipe">
      <div className={`bg-background overflow-hidden flex flex-col ${embutido ? "" : "h-[560px]"}`}>
        {/* Cabeçalho */}
        <div className="border-b border-border px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div>
            <h1 className="text-[0.9375rem] font-bold text-foreground">Equipe da loja</h1>
            <p className="text-[0.6875rem] text-muted-foreground">{pessoas.length} pessoas com acesso ao painel do Ateliê Aurora</p>
          </div>
          <button
            type="button"
            aria-expanded={convidando}
            aria-controls={`${pre}-convite`}
            onClick={() => setConvidando(v => !v)}
            className={`h-8 px-3 rounded-[8px] bg-primary text-primary-foreground text-[0.75rem] font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity ${foco}`}
          >
            <UserPlus aria-hidden className="h-3.5 w-3.5" /> Convidar pessoa
          </button>
        </div>

        {/* Convite */}
        {convidando && (
          <form id={`${pre}-convite`} onSubmit={enviarConvite} className="border-b border-border bg-muted/40 px-4 sm:px-6 py-4 space-y-3 shrink-0">
            <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-3 items-end">
              <div>
                <label htmlFor={`${pre}-email`} className="block text-[0.75rem] font-medium text-foreground mb-1">E-mail da pessoa</label>
                <input id={`${pre}-email`} type="email" required autoComplete="off" value={emailConvite} onChange={e => setEmailConvite(e.target.value)} placeholder="nome@email.com" className={campo} />
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setConvidando(false)} className={`h-9 px-3 rounded-[8px] border border-border bg-card text-[0.75rem] font-medium text-foreground hover:bg-accent ${foco}`}>Cancelar</button>
                <button type="submit" className={`h-9 px-3 rounded-[8px] bg-primary text-primary-foreground text-[0.75rem] font-semibold hover:opacity-90 flex items-center gap-1.5 ${foco}`}>
                  <Send aria-hidden className="h-3.5 w-3.5" /> Enviar convite
                </button>
              </div>
            </div>
            <fieldset>
              <legend className="text-[0.75rem] font-medium text-foreground mb-1.5">O que essa pessoa pode fazer</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(["atendente", "estoquista"] as const).map(p => (
                  <label key={p} className={`flex items-start gap-2 p-2.5 rounded-[10px] border cursor-pointer bg-card transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring ${papelConvite === p ? "border-primary" : "border-border"}`}>
                    <input type="radio" name={`${pre}-papel`} value={p} checked={papelConvite === p} onChange={() => setPapelConvite(p)} className="mt-0.5 accent-[var(--primary)]" />
                    <span>
                      <span className="block text-[0.75rem] font-semibold text-foreground">{papeis[p].rotulo}</span>
                      <span className="block text-[0.6875rem] text-muted-foreground leading-snug">{papeis[p].desc}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </form>
        )}

        {/* Busca e filtros */}
        <div className="px-4 sm:px-6 py-3 flex flex-wrap items-center gap-3 border-b border-border shrink-0">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar pessoa…"
              aria-label="Buscar pessoa por nome ou e-mail"
              className={`${campo} pl-8 py-1.5 text-[0.75rem]`}
            />
          </div>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrar por papel">
            {(["todos", "responsavel", "atendente", "estoquista"] as const).map(f => (
              <button
                key={f}
                type="button"
                aria-pressed={filtro === f}
                onClick={() => setFiltro(f)}
                className={`h-7 px-2.5 rounded-full border text-[0.6875rem] font-medium transition-colors ${foco} ${filtro === f ? `border-primary bg-[var(--primary-muted)] ${textoMarca}` : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"}`}
              >
                {f === "todos" ? "Todos" : papeis[f].rotulo}
              </button>
            ))}
          </div>
        </div>

        <p role="status" className="sr-only">{aviso}</p>
        {aviso && (
          <div className="mx-4 sm:mx-6 mt-3 flex items-center justify-between gap-2 rounded-[10px] border border-success/30 bg-[var(--success-muted)] px-3 py-2 text-[0.75rem] text-foreground shrink-0">
            <span className="flex items-center gap-2"><CheckCircle aria-hidden className="h-3.5 w-3.5 text-success" /> {aviso}</span>
            <button type="button" onClick={() => setAviso("")} aria-label="Fechar aviso" className={`h-6 w-6 rounded-[6px] flex items-center justify-center text-muted-foreground hover:bg-accent ${foco}`}><X aria-hidden className="h-3.5 w-3.5" /></button>
          </div>
        )}

        {/* Tabela */}
        <div className="flex-1 overflow-auto">
          <table className="w-full min-w-[640px]">
            <caption className="sr-only">Pessoas com acesso ao painel da loja</caption>
            <thead className="sticky top-0 bg-muted/40 border-b border-border">
              <tr>
                {["Pessoa", "Papel", "Situação", "Último acesso"].map(h => (
                  <th key={h} scope="col" className="text-left px-4 sm:px-6 py-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground">{h}</th>
                ))}
                <th scope="col" className="px-4 sm:px-6 py-2.5"><span className="sr-only">Ações</span></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => {
                const dono = m.papel === "responsavel";
                return (
                  <tr key={m.email} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 sm:px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 rounded-full bg-[var(--primary-muted)] flex items-center justify-center shrink-0" aria-hidden>
                          <span className={`text-[0.5625rem] font-bold ${textoMarca}`}>{m.iniciais}</span>
                        </div>
                        <div className="min-w-0">
                          <div className="text-[0.8125rem] font-medium text-foreground truncate">{m.nome}</div>
                          <div className="text-[0.6875rem] text-muted-foreground truncate">{m.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3">
                      {editando === m.email ? (
                        <select
                          autoFocus
                          aria-label={`Papel de ${m.nome}`}
                          value={m.papel}
                          onChange={e => setPessoas(prev => prev.map(p => p.email === m.email ? { ...p, papel: e.target.value as Papel } : p))}
                          className={`${campo} py-1 text-[0.75rem] w-auto`}
                        >
                          <option value="atendente">Atendente</option>
                          <option value="estoquista">Estoquista</option>
                        </select>
                      ) : (
                        <span title={papeis[m.papel].desc} className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[0.625rem] font-semibold ${papeis[m.papel].cor}`}>
                          {papeis[m.papel].rotulo}
                        </span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[0.625rem] font-medium border border-border bg-card text-foreground">
                        <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${situacoes[m.situacao].ponto}`} />
                        {situacoes[m.situacao].rotulo}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-[0.75rem] text-muted-foreground whitespace-nowrap">{m.acesso}</td>
                    <td className="px-4 sm:px-6 py-3">
                      {dono ? (
                        <span className="block text-right text-[0.6875rem] text-muted-foreground">Você</span>
                      ) : removendo === m.email ? (
                        <div className="flex items-center gap-1.5 justify-end">
                          <span className="text-[0.6875rem] text-foreground whitespace-nowrap">Remover acesso?</span>
                          <button type="button" autoFocus onClick={() => setRemovendo(null)} className={`h-6 px-2 rounded-[6px] border border-border bg-card text-[0.6875rem] text-foreground hover:bg-accent ${foco}`}>Cancelar</button>
                          <button
                            type="button"
                            onClick={() => { setPessoas(prev => prev.filter(p => p.email !== m.email)); setRemovendo(null); setAviso(`${m.nome} não tem mais acesso ao painel.`); }}
                            className={`h-6 px-2 rounded-[6px] bg-error text-[var(--error-foreground)] text-[0.6875rem] font-semibold hover:opacity-90 ${foco}`}
                          >
                            Remover
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 justify-end">
                          <button
                            type="button"
                            onClick={() => setEditando(editando === m.email ? null : m.email)}
                            aria-label={editando === m.email ? `Concluir edição do papel de ${m.nome}` : `Mudar papel de ${m.nome}`}
                            className={`h-6 w-6 rounded-[6px] flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground transition-colors ${foco}`}
                          >
                            {editando === m.email ? <Check aria-hidden className="h-3 w-3" /> : <Edit2 aria-hidden className="h-3 w-3" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => setRemovendo(m.email)}
                            aria-label={`Remover acesso de ${m.nome}`}
                            className={`h-6 w-6 rounded-[6px] flex items-center justify-center text-muted-foreground hover:bg-[var(--error-muted)] hover:text-error transition-colors ${foco}`}
                          >
                            <Trash2 aria-hidden className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground px-6 text-center">
              <Search aria-hidden className="h-6 w-6 mb-2 opacity-30" />
              <p className="text-[0.8125rem]">
                {termo ? <>Ninguém da equipe encontrado para “<strong className="text-foreground">{search}</strong>”.</> : "Ninguém da equipe com esse papel."}
              </p>
            </div>
          )}
        </div>

        {/* Rodapé */}
        <div className="border-t border-border px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 shrink-0 bg-background">
          <span className="text-[0.6875rem] text-muted-foreground">Mostrando {filtered.length} de {pessoas.length} pessoas</span>
          <span className="text-[0.6875rem] text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck aria-hidden className="h-3 w-3" /> Só a pessoa responsável muda plano e equipe.
          </span>
        </div>
      </div>
    </TemplateFrame>
  );
}

/* ─────────────────────────────────────────────
   5. Notificações da loja
───────────────────────────────────────────── */
type TipoAviso = "favorito" | "busca" | "reserva" | "contato" | "planilha";
const tiposAviso: Record<TipoAviso, { icon: React.ElementType; cor: string; rotulo: string }> = {
  favorito: { icon: Heart,           cor: `bg-[var(--primary-muted)] ${textoMarca}`,  rotulo: "Favorito" },
  busca:    { icon: Search,          cor: "bg-[var(--info-muted)] text-info",          rotulo: "Busca" },
  reserva:  { icon: CalendarCheck,   cor: "bg-[var(--warning-muted)] text-warning",    rotulo: "Reserva" },
  contato:  { icon: MessageCircle,   cor: "bg-[var(--success-muted)] text-success",    rotulo: "Contato" },
  planilha: { icon: FileSpreadsheet, cor: "bg-muted text-muted-foreground",            rotulo: "Planilha" },
};

const avisosIniciais: { tipo: TipoAviso; titulo: string; texto: string; quando: string; acao: string; lida: boolean }[] = [
  { tipo: "favorito", titulo: "Peça favoritada",     texto: "3 pessoas salvaram o Vestido midi de linho verde nas últimas 24 horas.",                                               quando: "Agora mesmo", acao: "Ver peça",                 lida: false },
  { tipo: "busca",    titulo: "Busca compatível",    texto: "Alguém em Pinheiros procurou “jaqueta jeans oversized”. Você tem 2 peças parecidas publicadas.",                     quando: "Há 12 min",   acao: "Ver peças parecidas",      lida: false },
  { tipo: "reserva",  titulo: "Reserva solicitada",  texto: "Pedido para separar a Bolsa de couro caramelo até sábado. Combine a retirada pelo WhatsApp.",                        quando: "Há 40 min",   acao: "Responder pelo WhatsApp",  lida: false },
  { tipo: "contato",  titulo: "Contato de interesse", texto: "Uma pessoa tocou em “Falar com a loja” na Camisa de seda off-white.",                                                quando: "Há 2 h",      acao: "Abrir conversa",           lida: true  },
  { tipo: "planilha", titulo: "Planilha importada",  texto: "48 peças foram importadas de estoque-novembro.xlsx. 3 ficaram sem foto e ainda não aparecem nas buscas.",           quando: "Ontem",       acao: "Completar fotos",          lida: true  },
  { tipo: "busca",    titulo: "Busca compatível",    texto: "“Tênis branco 37” foi procurado 14 vezes perto da sua loja esta semana. Você tem 1 peça parecida.",                  quando: "Há 2 dias",   acao: "Ver peça",                 lida: true  },
  { tipo: "favorito", titulo: "Peça favoritada",     texto: "A Saia plissada preta entrou nos favoritos de 5 pessoas esta semana.",                                               quando: "Há 3 dias",   acao: "Ver peça",                 lida: true  },
];

function InboxTemplate() {
  const [items, setItems] = useState(avisosIniciais.map((n, i) => ({ ...n, id: i })));
  const [selected, setSelected] = useState<number | null>(3);
  const [soNaoLidas, setSoNaoLidas] = useState(false);
  const [detalheMobile, setDetalheMobile] = useState(false);

  const marcar = (id: number, lida: boolean) => setItems(prev => prev.map(n => n.id === id ? { ...n, lida } : n));
  const unread = items.filter(n => !n.lida).length;
  const lista = soNaoLidas ? items.filter(n => !n.lida || n.id === selected) : items;
  const atual = items.find(i => i.id === selected) ?? null;

  return (
    <TemplateFrame url="Painel da loja · Notificações">
      <div className="flex h-[560px] bg-background overflow-hidden">
        {/* Lista */}
        <div className={`${detalheMobile ? "hidden sm:flex" : "flex"} w-full sm:w-[290px] shrink-0 border-r border-border flex-col`}>
          <div className="px-4 pt-3 pb-2 border-b border-border shrink-0 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h1 className="text-[0.875rem] font-bold text-foreground flex items-center gap-2">
                Notificações
                {unread > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[0.5625rem] font-bold">
                    {unread}<span className="sr-only"> não lidas</span>
                  </span>
                )}
              </h1>
              <button
                type="button"
                disabled={unread === 0}
                onClick={() => setItems(prev => prev.map(n => ({ ...n, lida: true })))}
                aria-label="Marcar todas como lidas"
                className={`h-6 px-2 rounded-[6px] flex items-center gap-1 whitespace-nowrap text-[0.625rem] font-medium text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:pointer-events-none ${foco}`}
              >
                <CheckCheck aria-hidden className="h-3 w-3" /> Marcar todas
              </button>
            </div>
            <div className="flex gap-1" role="group" aria-label="Mostrar">
              {[{ v: false, l: "Todas" }, { v: true, l: "Não lidas" }].map(f => (
                <button
                  key={f.l}
                  type="button"
                  aria-pressed={soNaoLidas === f.v}
                  onClick={() => setSoNaoLidas(f.v)}
                  className={`h-6 px-2.5 rounded-full text-[0.625rem] font-medium border transition-colors ${foco} ${soNaoLidas === f.v ? `border-primary bg-[var(--primary-muted)] ${textoMarca}` : "border-border text-muted-foreground hover:bg-accent"}`}
                >
                  {f.l}
                </button>
              ))}
            </div>
          </div>
          <ul className="flex-1 overflow-y-auto">
            {lista.map(n => {
              const tipo = tiposAviso[n.tipo];
              const Icon = tipo.icon;
              return (
                <li key={n.id}>
                  <button
                    type="button"
                    aria-current={selected === n.id ? "true" : undefined}
                    onClick={() => { setSelected(n.id); marcar(n.id, true); setDetalheMobile(true); }}
                    className={`w-full text-left px-4 py-3 border-b border-border transition-colors flex gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring
                      ${selected === n.id ? "bg-[var(--primary-muted)] border-l-2 border-l-primary" : "hover:bg-muted/40 border-l-2 border-l-transparent"}`}
                  >
                    <div className={`h-7 w-7 rounded-[8px] flex items-center justify-center shrink-0 mt-0.5 ${tipo.cor}`}>
                      <Icon aria-hidden className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-1 mb-0.5">
                        <span className={`text-[0.75rem] leading-tight truncate ${!n.lida ? "font-bold text-foreground" : "font-medium text-muted-foreground"}`}>
                          {!n.lida && <span className="sr-only">Não lida: </span>}
                          {n.titulo}
                        </span>
                        {!n.lida && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1" />}
                      </div>
                      <p className="text-[0.625rem] text-muted-foreground leading-tight line-clamp-2">{n.texto}</p>
                      <span className="text-[0.5625rem] text-muted-foreground">{n.quando}</span>
                    </div>
                  </button>
                </li>
              );
            })}
            {lista.length === 0 && (
              <li className="flex flex-col items-center justify-center text-center py-12 px-6 text-muted-foreground">
                <CheckCheck aria-hidden className="h-6 w-6 mb-2 opacity-40" />
                <p className="text-[0.75rem]">Tudo em dia. Nenhuma notificação não lida.</p>
              </li>
            )}
          </ul>
        </div>

        {/* Detalhe */}
        <div className={`${detalheMobile ? "block" : "hidden sm:block"} flex-1 min-w-0 overflow-y-auto`}>
          {atual ? (() => {
            const tipo = tiposAviso[atual.tipo];
            const Icon = tipo.icon;
            return (
              <div className="p-5 sm:p-6">
                <button
                  type="button"
                  onClick={() => setDetalheMobile(false)}
                  className={`sm:hidden mb-4 inline-flex items-center gap-1 text-[0.75rem] font-medium text-muted-foreground hover:text-foreground rounded-[4px] ${foco}`}
                >
                  <ChevronRight aria-hidden className="h-3.5 w-3.5 rotate-180" /> Voltar para a lista
                </button>
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`h-10 w-10 rounded-[12px] flex items-center justify-center shrink-0 ${tipo.cor}`}>
                      <Icon aria-hidden className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-[0.9375rem] font-semibold text-foreground">{atual.titulo}</h2>
                      <span className="text-[0.75rem] text-muted-foreground">{tipo.rotulo} · {atual.quando}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setSelected(null); setDetalheMobile(false); }}
                    aria-label="Fechar notificação"
                    className={`h-7 w-7 rounded-[8px] flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors shrink-0 ${foco}`}
                  >
                    <X aria-hidden className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-[0.875rem] text-foreground leading-relaxed mb-3">{atual.texto}</p>
                <p className="text-[0.75rem] text-muted-foreground leading-relaxed mb-6 flex items-start gap-1.5">
                  <ShieldCheck aria-hidden className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  A FindLook mostra o que aconteceu sem nome nem contato de quem fez a busca ou salvou a peça.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button type="button" className={`h-8 px-4 rounded-[8px] bg-primary text-primary-foreground text-[0.75rem] font-semibold hover:opacity-90 transition-opacity ${foco}`}>
                    {atual.acao}
                  </button>
                  <button
                    type="button"
                    onClick={() => marcar(atual.id, !atual.lida)}
                    className={`h-8 px-4 rounded-[8px] border border-border bg-card text-[0.75rem] font-medium text-foreground hover:bg-accent transition-colors inline-flex items-center gap-1.5 ${foco}`}
                  >
                    {atual.lida ? <><Mail aria-hidden className="h-3.5 w-3.5" /> Marcar como não lida</> : <><MailOpen aria-hidden className="h-3.5 w-3.5" /> Marcar como lida</>}
                  </button>
                </div>
              </div>
            );
          })() : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground px-6 text-center">
              <Inbox aria-hidden className="h-8 w-8 mb-2 opacity-30" />
              <p className="text-[0.875rem]">Escolha uma notificação para ver os detalhes.</p>
            </div>
          )}
        </div>
      </div>
    </TemplateFrame>
  );
}


/* ─────────────────────────────────────────────
   6. Pricing / Plans Template
───────────────────────────────────────────── */
const pricingFeatures = [
  { en: "Searchable public storefront", pt: "Vitrine pública pesquisável" },
  { en: "Product, variant and stock management", pt: "Gestão de produtos, variantes e estoque" },
  { en: "Catalog import and updates", pt: "Importação e atualização do catálogo" },
  { en: "Promotions and contact requests", pt: "Promoções e solicitações de contato" },
  { en: "Findability tasks", pt: "Tarefas de encontrabilidade" },
  { en: "Interest indicators per product", pt: "Indicadores de interesse por produto" },
  { en: "Store discovery funnel", pt: "Funil de descoberta da loja" },
  { en: "Performance-based recommendations", pt: "Recomendações baseadas no desempenho" },
  { en: "Searches with no results and regional gaps", pt: "Buscas sem resultado e lacunas regionais" },
  { en: "Market trends and comparisons", pt: "Tendências e comparativos de mercado" },
];

const plans = [
  {
    id: "basico",
    name: { en: "Visibility", pt: "Visibilidade" },
    price: 79,
    forWhom: { en: "Stores and brands that want to showcase their products and win more customers in their area.", pt: "Lojas e marcas que querem destacar seus produtos e conquistar mais clientes na região." },
    desc: { en: "Your searchable storefront, organized products and more ways to be contacted.", pt: "Sua vitrine pesquisável, produtos organizados e mais possibilidades de contato." },
    included: 5,
    highlight: false,
    icon: Package,
  },
  {
    id: "intermediario",
    name: { en: "Performance", pt: "Desempenho" },
    price: 149,
    forWhom: { en: "Businesses that want to understand consumer interest and improve their results.", pt: "Negócios que desejam entender o interesse dos consumidores e melhorar seus resultados." },
    desc: { en: "Everything in the Visibility plan, plus interest and performance analysis and recommendations for your store.", pt: "Todos os recursos do plano Visibilidade, com análise de interesse, desempenho e recomendações para a sua loja." },
    included: 8,
    highlight: true,
    icon: Zap,
  },
  {
    id: "premium",
    name: { en: "Opportunities", pt: "Oportunidades" },
    price: 299,
    forWhom: { en: "Brands that want to identify market demand and discover growth opportunities.", pt: "Marcas que querem identificar demandas do mercado e descobrir oportunidades de crescimento." },
    desc: { en: "All the store's intelligence, with an aggregated view of searches and of offer gaps in the local market.", pt: "Toda a inteligência da loja, com visão agregada das buscas e das lacunas de oferta do mercado local." },
    included: 10,
    highlight: false,
    icon: Building2,
  },
];

function PricingTemplate() {
  const { t, bi } = useI18n();
  const [annual, setAnnual] = useState(false);
  const [selecionado, setSelecionado] = useState<string | null>(null);

  return (
    <TemplateFrame>
      <div className="bg-background min-h-[480px] p-4 sm:p-6">
        <div className="text-center mb-8">
          <h2 className="text-[1.25rem] font-bold text-foreground mb-1">{t("Plans & Pricing", "Planos e preços")}</h2>
          <p className="text-[0.8125rem] text-muted-foreground mb-4">{t("Choose the plan that fits your store. Change whenever you need.", "Escolha o plano que combina com a sua loja. Troque quando precisar.")}</p>
          {/* Toggle */}
          <div className="inline-flex items-center gap-3">
            <span className={`text-[0.75rem] font-medium ${!annual ? "text-foreground" : "text-muted-foreground"}`}>{t("Monthly", "Mensal")}</span>
            <button
              type="button"
              role="switch"
              aria-checked={annual}
              aria-label={t("Yearly billing", "Cobrança anual")}
              onClick={() => setAnnual(v => !v)}
              className={`w-10 rounded-full transition-colors relative flex items-center ${annual ? "bg-primary" : "bg-muted-foreground/30"}`}
              style={{ height: "22px" }}
            >
              <span className={`absolute h-4 w-4 rounded-full bg-white transition-all ${annual ? "left-[22px]" : "left-0.5"}`} />
            </button>
            <span className={`text-[0.75rem] font-medium ${annual ? "text-foreground" : "text-muted-foreground"}`}>
              {t("Yearly", "Anual")}
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-success/10 text-success text-[0.5625rem] font-bold">-20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map(plan => {
            const Icon = plan.icon;
            const valor = annual ? Math.round(plan.price * 0.8) : plan.price;
            const forWhom = bi(plan.forWhom);
            const ativo = selecionado === plan.id;
            return (
              <div
                key={plan.id}
                className={`relative rounded-[16px] bg-card p-4 sm:p-5 flex flex-col transition-shadow
                  ${plan.highlight || ativo ? "border-2 border-primary" : "border border-border"}
                  ${ativo ? "ring-4 ring-primary/20" : ""}`}
                style={{ boxShadow: plan.highlight ? "var(--shadow-md)" : "var(--shadow-xs)" }}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-sm bg-primary text-primary-foreground text-[0.6875rem] font-bold whitespace-nowrap">
                    {t("Recommended", "Recomendado")}
                  </div>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-[9px] flex items-center justify-center bg-[var(--primary-muted)] dark:bg-muted shrink-0">
                    <Icon aria-hidden className="h-4 w-4 text-[var(--primary-text,var(--primary))] dark:text-muted-foreground" />
                  </div>
                  <h3 className="text-[1.375rem] font-bold leading-tight text-[var(--primary-text,var(--primary))] dark:text-foreground">{bi(plan.name)}</h3>
                </div>

                <div className="mb-4 flex items-baseline gap-1">
                  <span className="text-[1.875rem] font-extrabold leading-none text-[var(--primary-text,var(--primary))] dark:text-foreground">R$ {valor}</span>
                  <span className="text-[0.8125rem] text-muted-foreground">{t("/ month", "/ mês")}</span>
                </div>

                {/* "Para quem": no máximo 4 linhas, sem reticências; altura fixa de 4 linhas em todos os cards. No escuro, caixa neutra e só a lâmpada em amarelo */}
                <div className="mb-4 flex gap-2 sm:gap-2.5 rounded-[12px] border border-warning/30 bg-[var(--warning-muted)] dark:border-border dark:bg-muted px-2.5 sm:px-3 py-2.5">
                  <Lightbulb aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                  <p className="h-[5.5em] text-[0.8125rem] leading-snug text-foreground">
                    <strong className="font-bold">{t("Who it's for:", "Para quem:")}</strong> {forWhom}
                  </p>
                </div>

                <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">{bi(plan.desc)}</p>

                <div className="my-4 border-t border-border" />

                <ul className="space-y-2.5 flex-1 mb-5">
                  {pricingFeatures.map((f, i) => {
                    const inclui = i < plan.included;
                    return (
                      <li key={f.en} className={`flex items-start gap-2.5 text-[0.8125rem] leading-snug ${inclui ? "text-foreground" : "text-muted-foreground"}`}>
                        {inclui
                          ? <Check aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--primary-text,var(--primary))]" />
                          : <Minus aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
                        <span>
                          <span className="sr-only">{inclui ? t("Included: ", "Incluído: ") : t("Not included: ", "Não incluído: ")}</span>
                          {bi(f)}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <button
                  type="button"
                  aria-pressed={ativo}
                  aria-label={ativo
                    ? `${t("Plan selected", "Plano selecionado")}: ${bi(plan.name)}`
                    : `${t("Select Plan", "Selecionar Plano")} ${bi(plan.name)}`}
                  onClick={() => setSelecionado(plan.id)}
                  className={`w-full h-10 rounded-[10px] border border-primary text-[0.875rem] font-semibold transition-colors inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                    ${ativo
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-[var(--primary-text,var(--primary))] hover:bg-[var(--primary-muted)]"}`}
                >
                  {ativo && <Check aria-hidden className="h-4 w-4" />}
                  {ativo ? t("Plan selected", "Plano selecionado") : t("Select Plan", "Selecionar Plano")}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </TemplateFrame>
  );
}

/* ─────────────────────────────────────────────
   7. Suporte FindLook (ajuda para lojas parceiras)
───────────────────────────────────────────── */
const canaisSuporte = [
  { icon: MessageCircle, rotulo: "WhatsApp do suporte", valor: "(11) 90000-0000",         desc: "Seg. a sex., das 9h às 18h",     cor: "bg-[var(--success-muted)] text-success" },
  { icon: Mail,          rotulo: "E-mail",              valor: "suporte@exemplo.com.br",   desc: "Resposta em até 1 dia útil",      cor: "bg-[var(--info-muted)] text-info" },
  { icon: BookOpen,      rotulo: "Central de ajuda",    valor: "Guias passo a passo",     desc: "Disponível a qualquer hora",      cor: `bg-[var(--primary-muted)] ${textoMarca}` },
];

const guiasRapidos = [
  "Como importar a planilha de peças",
  "Como tirar boas fotos das peças",
  "Como responder um pedido de reserva",
  "Como mudar de plano",
];

const assuntosSuporte = [
  "Cadastro de peças",
  "Importar planilha",
  "Fotos das peças",
  "Plano e pagamento",
  "Acesso da equipe",
  "Outro assunto",
];

function ContactTemplate() {
  const uid = useId();
  const pre = `sup${uid.replace(/:/g, "")}`;
  const [sent, setSent] = useState(false);
  const [subject, setSubject] = useState(assuntosSuporte[0]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <TemplateFrame url="Painel da loja · Suporte">
      <div className="bg-background min-h-[560px] flex flex-col md:flex-row overflow-hidden">

        {/* Painel de informações */}
        <div className="w-full md:w-[290px] shrink-0 bg-card border-b md:border-b-0 md:border-r border-border p-6 flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-info/6 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="h-10 w-10 rounded-[12px] bg-[var(--primary-muted)] flex items-center justify-center mb-4">
              <LifeBuoy aria-hidden className={`h-5 w-5 ${textoMarca}`} />
            </div>
            <h2 className="text-[1rem] font-bold text-foreground mb-1">Fale com o suporte da FindLook</h2>
            <p className="text-[0.8125rem] text-muted-foreground leading-relaxed">
              Ajuda para lojas parceiras: cadastro de peças, planilhas, fotos, equipe, plano e pagamento.
            </p>
          </div>

          <ul className="relative z-10 space-y-3">
            {canaisSuporte.map(ch => {
              const Icon = ch.icon;
              return (
                <li key={ch.rotulo} className="flex items-start gap-3 p-3 rounded-[10px] border border-border bg-background/60">
                  <div className={`h-8 w-8 rounded-[8px] flex items-center justify-center shrink-0 ${ch.cor}`}>
                    <Icon aria-hidden className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[0.6875rem] text-muted-foreground">{ch.rotulo}</div>
                    <div className="text-[0.75rem] font-semibold text-foreground truncate">{ch.valor}</div>
                    <div className="text-[0.6875rem] text-muted-foreground">{ch.desc}</div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Guias rápidos */}
          <nav aria-labelledby={`${pre}-guias`} className="relative z-10 mt-auto pt-4 border-t border-border">
            <p id={`${pre}-guias`} className="text-[0.6875rem] font-semibold text-foreground mb-2">Antes de escrever, veja se ajuda</p>
            <ul className="space-y-1">
              {guiasRapidos.map(g => (
                <li key={g}>
                  <button type="button" className={`w-full flex items-center justify-between gap-2 text-left text-[0.6875rem] text-muted-foreground hover:text-foreground py-1 rounded-[4px] ${foco}`}>
                    {g} <ChevronRight aria-hidden className="h-3 w-3 shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Formulário */}
        <div className="flex-1 p-6 overflow-y-auto">
          {sent ? (
            <div role="status" className="flex flex-col items-center justify-center h-full py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <CheckCircle aria-hidden className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-[1.0625rem] font-bold text-foreground mb-2">Recebemos sua mensagem</h3>
              <p className="text-[0.875rem] text-muted-foreground max-w-xs mb-6">
                Vamos responder em até 1 dia útil no e-mail informado. Assunto: {subject.toLowerCase()}.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className={`h-9 px-5 rounded-[10px] border border-border bg-card text-[0.875rem] font-medium text-foreground hover:bg-accent transition-colors ${foco}`}
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-4 max-w-md">
              <div>
                <h3 className="text-[0.9375rem] font-bold text-foreground mb-0.5">Nova mensagem para o suporte</h3>
                <p className="text-[0.75rem] text-muted-foreground">Conte o que aconteceu. Quanto mais detalhes, mais rápido conseguimos ajudar.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={`${pre}-nome`} className="block text-[0.75rem] font-medium text-foreground mb-1">Seu nome</label>
                  <div className="relative">
                    <User aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                    <input id={`${pre}-nome`} required type="text" autoComplete="name" defaultValue="Ana Oliveira" className={`${campo} pl-8`} />
                  </div>
                </div>
                <div>
                  <label htmlFor={`${pre}-email`} className="block text-[0.75rem] font-medium text-foreground mb-1">E-mail para resposta</label>
                  <div className="relative">
                    <AtSign aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                    <input id={`${pre}-email`} required type="email" autoComplete="email" defaultValue="ana@atelieaurora.com.br" className={`${campo} pl-8`} />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor={`${pre}-loja`} className="block text-[0.75rem] font-medium text-foreground mb-1">Loja</label>
                <div className="relative">
                  <Store aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                  <input id={`${pre}-loja`} type="text" autoComplete="organization" defaultValue="Ateliê Aurora" className={`${campo} pl-8`} />
                </div>
              </div>

              <div>
                <label htmlFor={`${pre}-assunto`} className="block text-[0.75rem] font-medium text-foreground mb-1">Assunto</label>
                <div className="relative">
                  <select
                    id={`${pre}-assunto`}
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className={`${campo} appearance-none pr-8 cursor-pointer`}
                  >
                    {assuntosSuporte.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                  <ChevronDown aria-hidden className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor={`${pre}-msg`} className="block text-[0.75rem] font-medium text-foreground mb-1">Mensagem</label>
                <textarea
                  id={`${pre}-msg`}
                  required
                  rows={4}
                  aria-describedby={`${pre}-msg-dica`}
                  placeholder="Ex.: importei a planilha, mas 3 peças ficaram sem foto."
                  className={`${campo} resize-none`}
                />
                <p id={`${pre}-msg-dica`} className="mt-1 text-[0.6875rem] text-muted-foreground">Não envie senhas nem dados de cartão por aqui.</p>
              </div>

              <div className="flex items-start gap-2.5">
                <input type="checkbox" id={`${pre}-whats`} className="mt-0.5 h-3.5 w-3.5 rounded accent-[var(--primary)] shrink-0" />
                <label htmlFor={`${pre}-whats`} className="text-[0.6875rem] text-muted-foreground leading-snug cursor-pointer">
                  Pode me responder também pelo WhatsApp da loja.
                </label>
              </div>

              <div className="flex items-start gap-2.5">
                <input type="checkbox" required id={`${pre}-consent`} className="mt-0.5 h-3.5 w-3.5 rounded accent-[var(--primary)] shrink-0" />
                <label htmlFor={`${pre}-consent`} className="text-[0.6875rem] text-muted-foreground leading-snug cursor-pointer">
                  Concordo com os <span className={`underline underline-offset-2 ${textoMarca}`}>Termos de uso</span> e a <span className={`underline underline-offset-2 ${textoMarca}`}>Política de privacidade</span>.
                </label>
              </div>

              <button
                type="submit"
                className={`w-full h-10 rounded-[10px] bg-primary text-primary-foreground text-[0.875rem] font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 ${foco}`}
              >
                <Send aria-hidden className="h-4 w-4" />
                Enviar mensagem
              </button>
            </form>
          )}
        </div>
      </div>
    </TemplateFrame>
  );
}

/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */
export function TemplatesShowcase() {
  const { t, bi } = useI18n();
  return (
    <div className="space-y-16">
      <div className="mb-2">
        <h2 className="text-[1.5rem] font-semibold tracking-[-0.02em] text-foreground mb-1">Templates</h2>
        <p className="text-[0.9375rem] text-muted-foreground">
          Telas prontas do painel da loja e das páginas da FindLook, montadas com os componentes do design system.
        </p>
      </div>

      {/* Painel da loja (protótipo) */}
      <section id="template-dashboard">
        <TemplateLabel icon={LayoutDashboard} label="Painel da loja: protótipo navegável" />
        <p className="-mt-2 mb-4 max-w-2xl text-[0.875rem] leading-relaxed text-muted-foreground">Uma janela só, com rolagem própria. Use o menu lateral, a busca, o sino e o menu da conta para trocar de página, como no painel de verdade. Em telas estreitas, o menu abre como gaveta dentro da janela.</p>
        <PrototipoDoPainel paginas={{
          perfil: <SettingsTemplate />,
          configuracoes: <SettingsTemplate abaInicial="notificacoes" />,
          equipe: <TeamTemplate />,
          planos: <PricingTemplate />,
          notificacoes: <InboxTemplate />,
          ajuda: <ContactTemplate />,
        }} />
      </section>

      <section id="template-auth">
        <TemplateLabel icon={LogIn} label="Entrar e criar conta" />
        <AuthTemplate />
      </section>

      {/* 8 — Landing page para lojistas */}
      <section id="template-landing">
        <TemplateLabel icon={Layout} label="Landing page para lojistas" />
        <LandingTemplate />
      </section>

      {/* ── Tokens ── */}
      <section id="templates-tokens" className="space-y-5">
        <div>
          <h2 className="text-[1.125rem] font-black text-foreground tracking-[-0.025em]">Tokens</h2>
          <p className="text-[0.8125rem] text-muted-foreground mt-0.5">{t("Core CSS custom properties shared across all templates.", "Propriedades CSS personalizadas principais compartilhadas por todos os templates.")}</p>
        </div>
        <TokenTable groups={templatesTokenGroups(t)} />
      </section>
    </div>
  );
}

const templatesTokenGroups = (t: (en: string, pt: string) => string): TokenGroup[] => [
  {
    group: t("Layout Background", "Fundo do layout"),
    tokens: [
      { name: "--background",      description: t("Page / app shell background", "Fundo da página / estrutura do app"),  light: "#F6F6F7",              dark: "#000000",              isColor: true },
      { name: "--foreground",      description: t("Default body text", "Texto padrão do corpo"),             light: "#19191C",              dark: "#F6F6F7",              isColor: true },
      { name: "--muted-foreground",description: t("Subdued labels and captions", "Rótulos e legendas discretos"),   light: "#888896",              dark: "#B3B3BC",              isColor: true },
    ],
  },
  {
    group: t("Sidebar", "Barra lateral"),
    tokens: [
      { name: "--sidebar",                   description: t("Sidebar panel background", "Fundo do painel da barra lateral"),      light: "#FFFFFF",              dark: "rgba(0,0,0,0.97)",  isColor: true },
      { name: "--sidebar-foreground",        description: t("Sidebar text", "Texto da barra lateral"),                  light: "#19191C",              dark: "#F6F6F7",              isColor: true },
      { name: "--sidebar-primary",           description: t("Active nav item", "Item de navegação ativo"),               light: "#E62040",              dark: "#E62040",              isColor: true },
      { name: "--sidebar-primary-foreground",description: t("Text on active nav item", "Texto no item de navegação ativo"),       light: "#FFFFFF",              dark: "#FFFFFF",              isColor: true },
      { name: "--sidebar-accent",            description: t("Nav hover background", "Fundo de hover da navegação"),          light: "#E9E9EC",              dark: "rgba(44,44,51,0.60)", isColor: true },
      { name: "--sidebar-border",            description: t("Sidebar separator", "Separador da barra lateral"),             light: "rgba(25,25,28,0.09)", dark: "rgba(255,255,255,0.06)", isColor: true },
    ],
  },
  {
    group: t("Card & Section Surfaces", "Superfícies de cards e seções"),
    tokens: [
      { name: "--card",            description: t("Content card background", "Fundo do card de conteúdo"),       light: "#FFFFFF",             dark: "rgba(25,25,28,0.75)", isColor: true },
      { name: "--card-foreground", description: t("Card body text", "Texto do corpo do card"),                light: "#19191C",             dark: "#F6F6F7",             isColor: true },
      { name: "--border",          description: t("Section divider", "Divisor de seção"),               light: "rgba(25,25,28,0.09)",dark: "rgba(255,255,255,0.07)", isColor: true },
      { name: "--muted",           description: t("Subtle row / alternate bg", "Linha sutil / fundo alternado"),    light: "#E9E9EC",             dark: "rgba(44,44,51,0.60)", isColor: true },
    ],
  },
  {
    group: t("Brand & CTA", "Marca e CTA"),
    tokens: [
      { name: "--primary",            description: t("Primary CTA button / link", "Botão / link CTA primário"),  light: "#E62040", dark: "#E62040", isColor: true },
      { name: "--primary-foreground", description: t("Text on CTA", "Texto sobre o CTA"),               light: "#FFFFFF", dark: "#FFFFFF", isColor: true },
      { name: "--primary-muted",      description: t("Tinted CTA zone", "Área de CTA com tom"),           light: "rgba(230,32,64,0.10)", dark: "rgba(230,32,64,0.15)", isColor: true },
    ],
  },
  {
    group: t("Elevation", "Elevação"),
    tokens: [
      { name: "--shadow-sm", description: t("Card lift", "Elevação do card"),                light: "0 1px 3px …" },
      { name: "--shadow",    description: t("Section container shadow", "Sombra do container de seção"), light: "0 2px 6px …" },
      { name: "--shadow-lg", description: t("Hero / modal shadow", "Sombra de hero / modal"),     light: "0 8px 24px …" },
    ],
  },
  {
    group: t("Shape", "Forma"),
    tokens: [
      { name: "--radius",    description: t("Default border radius", "Raio de borda padrão"), light: "0.75rem" },
      { name: "--radius-lg", description: t("Cards and panels", "Cards e painéis"),      light: "calc(0.75rem + 4px)" },
      { name: "--radius-xl", description: t("Hero sections", "Seções hero"),         light: "calc(0.75rem + 12px)" },
    ],
  },
];

/* ─────────────────────────────────────────────
   8. Landing page para lojistas (FindLook para lojas)
───────────────────────────────────────────── */
const reais = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const fatosLanding = [
  { valor: "Foto ou texto", rotulo: "Dois jeitos de buscar suas peças" },
  { valor: "Na sua região", rotulo: "Quem procura perto da loja" },
  { valor: "WhatsApp",      rotulo: "Contato direto com você" },
  { valor: reais(79),       rotulo: "Planos a partir de, por mês" },
];

/* Dados ilustrativos do painel (exemplo) */
const interesseMensal = [
  { m: "Jan", v: 38 }, { m: "Fev", v: 52 }, { m: "Mar", v: 47 }, { m: "Abr", v: 68 },
  { m: "Mai", v: 61 }, { m: "Jun", v: 80 }, { m: "Jul", v: 74 }, { m: "Ago", v: 93 },
  { m: "Set", v: 87 }, { m: "Out", v: 105 }, { m: "Nov", v: 118 }, { m: "Dez", v: 134 },
];

const pecasMaisVistas: { nome: string; icone: NomeIconeModa; categoria: string; vistas: number; situacao: string; ponto: string }[] = [
  { nome: "Vestido midi de linho",    icone: "vestido", categoria: "Vestidos", vistas: 312, situacao: "Publicada", ponto: "bg-success" },
  { nome: "Jaqueta jeans oversized",  icone: "jaqueta", categoria: "Casacos",  vistas: 248, situacao: "Publicada", ponto: "bg-success" },
  { nome: "Bolsa de couro caramelo",  icone: "bolsa",   categoria: "Bolsas",   vistas: 190, situacao: "Reservada", ponto: "bg-warning" },
];

const passosLanding = [
  { titulo: "Cadastre sua loja",    desc: "Nome, endereço, horário e WhatsApp. Leva poucos minutos." },
  { titulo: "Publique suas peças",  desc: "Uma a uma pelo painel ou várias de uma vez com uma planilha." },
  { titulo: "Apareça nas buscas",   desc: "Quem procura por foto ou descrição na sua região encontra as suas peças." },
  { titulo: "Converse e venda",     desc: "A pessoa chama a loja no WhatsApp. A venda acontece direto com você." },
];

const depoimentosLanding = [
  { pessoa: "Lia Ramos",    loja: "Brechó Raiz",     bairro: "Vila Madalena", iniciais: "LR", texto: "As pessoas chegam no WhatsApp já sabendo qual peça querem ver." },
  { pessoa: "Dani Costa",   loja: "Casa Linho",      bairro: "Moema",         iniciais: "DC", texto: "Importei o estoque por planilha em uma tarde e as peças já apareceram nas buscas." },
  { pessoa: "Ana Oliveira", loja: "Ateliê Aurora",   bairro: "Pinheiros",     iniciais: "AO", texto: "Ver quais peças são mais favoritadas me ajuda a decidir o que repor." },
  { pessoa: "Sam Ferreira", loja: "Sapataria Sol",   bairro: "Tatuapé",       iniciais: "SF", texto: "Agora sei o que procuram perto da loja e que eu ainda não tenho." },
  { pessoa: "Lu Martins",   loja: "Brechó da Vó Lu", bairro: "Santana",       iniciais: "LM", texto: "Gosto de falar direto com o cliente, sem ninguém no meio da venda." },
];

const duvidasLanding = [
  { q: "A FindLook vende as peças por mim?",          a: "Não. A FindLook ajuda pessoas da sua região a encontrar as suas peças. A conversa e a venda acontecem direto entre você e o cliente." },
  { q: "Preciso cadastrar as peças uma a uma?",       a: "Não. Você pode cadastrar pelo painel ou importar uma planilha com várias peças de uma vez. Depois é só conferir as fotos." },
  { q: "Brechós também podem participar?",            a: "Sim. A FindLook é para lojas e brechós que querem ser encontrados por quem procura peças na região." },
  { q: "Como as pessoas falam com a minha loja?",     a: "Pelo botão “Falar com a loja”, que abre uma conversa no WhatsApp da loja. Você recebe um aviso no painel a cada contato." },
  { q: "Posso trocar de plano depois?",               a: "Sim. Você pode mudar de plano quando precisar, direto nas configurações do painel da loja." },
];

const tiposLoja = ["Loja", "Brechó", "Loja e brechó"];

function LandingTemplate() {
  const uid = useId();
  const pre = `lp${uid.replace(/:/g, "")}`;
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);
  const [contactSent, setContactSent] = useState(false);
  const [tipoLoja, setTipoLoja] = useState(tiposLoja[0]);

  const total = depoimentosLanding.length;
  const prevSlide = () => setSlide(s => (s - 1 + total) % total);
  const nextSlide = () => setSlide(s => (s + 1) % total);
  const visibleTestimonials = [0, 1, 2].map(k => depoimentosLanding[(slide + k) % total]);

  return (
    <TemplateFrame url="FindLook · Para lojas">
      <div className="bg-background overflow-y-auto" style={{ maxHeight: 720 }}>

        {/* ══ NAVBAR ══ */}
        <nav aria-label="Página para lojas" className="sticky top-0 z-20 bg-background/90 backdrop-blur-xl border-b border-border px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <MarcaFindLook legenda="para lojas" />
          <div className="hidden md:flex items-center gap-4">
            {["Como funciona", "Benefícios", "Planos", "Dúvidas"].map(item => (
              <button key={item} type="button" className={`text-[0.75rem] font-medium text-muted-foreground hover:text-foreground transition-colors rounded-[4px] ${foco}`}>{item}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className={`h-7 px-3 text-[0.75rem] font-medium text-muted-foreground hover:text-foreground transition-colors rounded-[7px] ${foco}`}>Entrar</button>
            <button type="button" className={`h-7 px-3 rounded-[7px] bg-primary text-primary-foreground text-[0.75rem] font-semibold hover:opacity-90 transition-opacity whitespace-nowrap ${foco}`}>
              Cadastrar minha loja
            </button>
          </div>
        </nav>

        {/* ══ HERO ══ */}
        <div className="relative overflow-hidden px-4 sm:px-6 pt-14 pb-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] rounded-full bg-primary/7 blur-3xl pointer-events-none" />
          <div className="absolute top-10 left-1/5 w-[220px] h-[220px] rounded-full bg-info/5 blur-3xl pointer-events-none" />
          <div className="absolute top-10 right-1/5 w-[180px] h-[180px] rounded-full bg-warning/4 blur-3xl pointer-events-none" />
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/25 bg-[var(--primary-muted)] text-[0.6875rem] font-semibold mb-5 ${textoMarca}`}>
              <Store aria-hidden className="h-3 w-3" /> Para lojas e brechós da sua cidade
            </div>
            <h1 className="text-[1.875rem] sm:text-[2.25rem] font-black text-foreground tracking-[-0.04em] leading-[1.1] mb-4">
              Sua loja encontrada<br />
              <span className={textoMarca}>por quem já procura</span><br />
              o que você vende
            </h1>
            <p className="text-[0.9375rem] text-muted-foreground max-w-lg mx-auto leading-relaxed mb-8">
              Publique suas peças na FindLook e apareça para pessoas da região que buscam por foto ou descrição. O contato é direto com a sua loja, pelo WhatsApp.
            </p>
            <div className="flex items-center justify-center gap-3 mb-5">
              {subscribed ? (
                <div role="status" className="flex items-center gap-2 px-4 py-2 rounded-[10px] bg-[var(--success-muted)] border border-success/30 text-foreground text-[0.8125rem] font-medium">
                  <CheckCircle aria-hidden className="h-4 w-4 text-success" /> Pronto! Enviamos para o seu e-mail um link para continuar o cadastro.
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); if (email) setSubscribed(true); }} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                  <div className="relative flex-1">
                    <label htmlFor={`${pre}-hero-email`} className="sr-only">E-mail da loja</label>
                    <Mail aria-hidden className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                    <input id={`${pre}-hero-email`} type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail da loja"
                      className={`${campo} bg-card rounded-[9px] pl-9 py-2.5`} />
                  </div>
                  <button type="submit" className={`h-10 px-4 rounded-[9px] bg-primary text-primary-foreground text-[0.8125rem] font-semibold hover:opacity-90 transition-opacity whitespace-nowrap flex items-center justify-center gap-1.5 ${foco}`}>
                    <Store aria-hidden className="h-3.5 w-3.5" /> Cadastrar minha loja
                  </button>
                </form>
              )}
            </div>
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[0.6875rem] text-muted-foreground">
              {["Contato direto com quem procura", `Planos a partir de ${reais(79)} por mês`, "Troque de plano quando precisar"].map(item => (
                <li key={item} className="flex items-center gap-1.5"><Check aria-hidden className="h-3 w-3 text-success" />{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* ══ FATOS ══ */}
        <div className="border-y border-border bg-card/50 px-4 sm:px-6 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 sm:divide-x divide-border max-w-2xl mx-auto">
            {fatosLanding.map(s => (
              <div key={s.rotulo} className="text-center px-3">
                <div className="text-[1.0625rem] font-black text-foreground tracking-tight">{s.valor}</div>
                <div className="text-[0.6875rem] text-muted-foreground">{s.rotulo}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ PRÉVIA DO PAINEL ══ */}
        <div className="px-4 sm:px-6 py-10">
          <div className="text-center mb-6">
            <p className={`text-[0.6875rem] font-semibold uppercase tracking-[0.1em] mb-1 ${textoMarca}`}>Painel da loja</p>
            <h2 className="text-[1.25rem] font-black text-foreground tracking-tight">Tudo o que a sua loja precisa, em um só lugar</h2>
            <p className="text-[0.75rem] text-muted-foreground mt-1">Exemplo ilustrativo com dados fictícios.</p>
          </div>
          <div className="max-w-2xl mx-auto rounded-[16px] border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-xl)" }}>
            <div className="h-8 bg-muted/60 border-b border-border flex items-center px-4 gap-2 shrink-0" aria-hidden>
              <div className="flex gap-1.5"><div className="h-2 w-2 rounded-full bg-primary/50" /><div className="h-2 w-2 rounded-full bg-warning/50" /><div className="h-2 w-2 rounded-full bg-success/50" /></div>
              <div className="flex-1 mx-6"><div className="h-4 bg-background/60 rounded-[4px] max-w-[200px] mx-auto flex items-center px-2"><span className="text-[0.5rem] text-muted-foreground/70">Painel da loja · FindLook</span></div></div>
            </div>
            <div className="p-4">
              {/* Indicadores */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {[
                  { label: "Visualizações das peças", value: "1.284", delta: "+12%" },
                  { label: "Favoritos",               value: "236",   delta: "+8%"  },
                  { label: "Contatos",                value: "41",    delta: "+5%"  },
                  { label: "Buscas compatíveis",      value: "318",   delta: "+9%"  },
                ].map(k => (
                  <div key={k.label} className="rounded-[9px] border border-border bg-background p-2.5">
                    <div className="text-[0.5625rem] text-muted-foreground mb-1">{k.label}</div>
                    <div className="text-[0.9375rem] font-black text-foreground leading-none">{k.value}</div>
                    <div className="text-[0.5625rem] flex items-center gap-0.5 mt-1 font-medium text-muted-foreground">
                      <TrendingUp aria-hidden className="h-2.5 w-2.5 text-success" />
                      <span className="text-foreground">{k.delta}</span>&nbsp;no mês
                    </div>
                  </div>
                ))}
              </div>
              {/* Gráfico */}
              <div className="rounded-[9px] border border-border bg-background p-3 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.625rem] font-semibold text-foreground">Visualizações das peças — últimos 12 meses</span>
                  <span className="text-[0.5625rem] px-1.5 py-0.5 rounded-full bg-[var(--success-muted)] text-foreground font-semibold">+12%</span>
                </div>
                <div className="h-[80px]" role="img" aria-label="Gráfico de área: visualizações das peças crescendo de janeiro a dezembro">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={interesseMensal} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="lRevGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="var(--primary)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="m" tick={{ fontSize: 8, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                      <ReTooltip formatter={(v: number) => [v, "Visualizações"]} contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 10, color: "var(--popover-foreground)" }} />
                      <Area type="monotone" dataKey="v" name="Visualizações" stroke="var(--primary)" strokeWidth={2} fill="url(#lRevGrad)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              {/* Peças mais vistas */}
              <div className="rounded-[9px] border border-border bg-background overflow-hidden">
                <div className="px-3 py-1.5 border-b border-border text-[0.625rem] font-semibold text-foreground">Peças mais vistas</div>
                <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.9fr)] gap-2 border-b border-border bg-muted/40 px-3 py-1.5">
                  {["Peça", "Categoria", "Visualizações", "Situação"].map(h => (
                    <div key={h} className="text-[0.5rem] font-semibold uppercase tracking-wide text-muted-foreground truncate">{h}</div>
                  ))}
                </div>
                {pecasMaisVistas.map(r => (
                  <div key={r.nome} className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.9fr)] gap-2 px-3 py-2 border-b border-border last:border-0 items-center">
                    <div className="text-[0.625rem] font-medium text-foreground flex items-center gap-1.5 min-w-0">
                      <IconeModa nome={r.icone} size={12} className="text-muted-foreground" />
                      <span className="truncate">{r.nome}</span>
                    </div>
                    <div className="text-[0.5625rem] text-muted-foreground truncate">{r.categoria}</div>
                    <div className="text-[0.625rem] font-semibold text-foreground">{r.vistas.toLocaleString("pt-BR")}</div>
                    <div className="text-[0.5625rem] font-medium text-foreground flex items-center gap-1">
                      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${r.ponto}`} />{r.situacao}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ BENEFÍCIOS ══ */}
        <div className="px-4 sm:px-6 py-10 bg-card/30 border-y border-border">
          <div className="text-center mb-7">
            <p className={`text-[0.6875rem] font-semibold uppercase tracking-[0.1em] mb-1 ${textoMarca}`}>Benefícios</p>
            <h2 className="text-[1.25rem] font-black text-foreground tracking-tight">Feito para lojas de rua, ateliês e brechós</h2>
          </div>
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 rounded-[14px] border border-border bg-card p-5 relative overflow-hidden" style={{ boxShadow: "var(--shadow-sm)" }}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary/8 blur-2xl pointer-events-none" />
              <div className="h-8 w-8 rounded-[10px] bg-[var(--primary-muted)] flex items-center justify-center mb-3">
                <Search aria-hidden className={`h-4 w-4 ${textoMarca}`} />
              </div>
              <h3 className="text-[0.875rem] font-bold text-foreground mb-1">Apareça na busca certa</h3>
              <p className="text-[0.75rem] text-muted-foreground leading-snug mb-3">Quem procura por foto ou descrição encontra as suas peças pelo estilo, pelo tamanho e pela região.</p>
              <div className="flex flex-wrap gap-2">
                {["Busca por foto", "Busca por descrição", "Perto de quem procura"].map(chip => (
                  <span key={chip} className={`text-[0.5625rem] px-2 py-0.5 rounded-full bg-[var(--primary-muted)] font-medium border border-primary/15 ${textoMarca}`}>{chip}</span>
                ))}
              </div>
            </div>
            <div className="rounded-[14px] border border-border bg-card p-4 flex flex-col justify-between" style={{ boxShadow: "var(--shadow-xs)" }}>
              <MessageCircle aria-hidden className="h-5 w-5 text-success mb-2" />
              <div>
                <h3 className="text-[0.8125rem] font-bold text-foreground mb-1">Contato direto</h3>
                <p className="text-[0.6875rem] text-muted-foreground">A pessoa chama a loja no WhatsApp. A venda é sua.</p>
              </div>
            </div>
            <div className="rounded-[14px] border border-border bg-card p-4 flex flex-col justify-between" style={{ boxShadow: "var(--shadow-xs)" }}>
              <FileSpreadsheet aria-hidden className="h-5 w-5 text-info mb-2" />
              <div>
                <h3 className="text-[0.8125rem] font-bold text-foreground mb-1">Planilha ou uma a uma</h3>
                <p className="text-[0.6875rem] text-muted-foreground">Cadastre peças pelo painel ou importe várias de uma vez.</p>
              </div>
            </div>
            <div className="sm:col-span-2 rounded-[14px] border border-border bg-card p-5 relative overflow-hidden" style={{ boxShadow: "var(--shadow-sm)" }}>
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-info/6 blur-2xl pointer-events-none" />
              <div className="h-8 w-8 rounded-[10px] bg-[var(--info-muted)] flex items-center justify-center mb-3">
                <BarChart aria-hidden className="h-4 w-4 text-info" />
              </div>
              <h3 className="text-[0.875rem] font-bold text-foreground mb-1">Entenda o interesse pelas suas peças</h3>
              <p className="text-[0.75rem] text-muted-foreground leading-snug mb-3">Veja quais peças são mais vistas, favoritadas e procuradas na sua região. Nos planos Desempenho e Oportunidades.</p>
              <div className="flex flex-wrap gap-2">
                {["Favoritos", "Reservas", "Contatos", "Buscas compatíveis"].map(chip => (
                  <span key={chip} className="text-[0.5625rem] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium border border-border">{chip}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ INTERESSE MÊS A MÊS ══ */}
        <div className="px-4 sm:px-6 py-10">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
              <div>
                <p className={`text-[0.6875rem] font-semibold uppercase tracking-[0.1em] mb-1 ${textoMarca}`}>Acompanhamento</p>
                <h2 className="text-[1.125rem] font-black text-foreground tracking-tight">Acompanhe o interesse, mês a mês</h2>
              </div>
              <div className="flex gap-3 text-[0.625rem] text-muted-foreground">
                <span className="flex items-center gap-1"><span aria-hidden className="h-2 w-2 rounded-full bg-primary inline-block" />Buscas compatíveis com as suas peças (exemplo)</span>
              </div>
            </div>
            <div className="rounded-[14px] border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-sm)" }}>
              <div className="h-[130px]" role="img" aria-label="Gráfico de barras: buscas compatíveis com as peças da loja, de janeiro a dezembro, em crescimento">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart data={interesseMensal} margin={{ top: 4, right: 0, left: -20, bottom: 0 }} barGap={3}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="m" tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <ReTooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 10, color: "var(--popover-foreground)" }} />
                    <Bar dataKey="v" name="Buscas compatíveis" fill="var(--primary)" radius={[4, 4, 0, 0]} opacity={0.9} />
                  </ReBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* ══ COMO FUNCIONA ══ */}
        <div className="px-4 sm:px-6 py-10 bg-card/30 border-y border-border">
          <div className="text-center mb-8">
            <p className={`text-[0.6875rem] font-semibold uppercase tracking-[0.1em] mb-1 ${textoMarca}`}>Como funciona</p>
            <h2 className="text-[1.25rem] font-black text-foreground tracking-tight">Do cadastro ao primeiro contato</h2>
          </div>
          <div className="max-w-lg mx-auto relative">
            <div aria-hidden className="absolute left-[19px] top-2 bottom-2 w-px bg-border" />
            <ol className="space-y-6">
              {passosLanding.map((item, i) => (
                <li key={item.titulo} className="flex gap-4 relative">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 z-10 border-2 ${i === 0 ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border text-foreground"}`}>
                    <span className="text-[0.8125rem] font-bold">{i + 1}</span>
                  </div>
                  <div className="pt-1.5 pb-2">
                    <span className={`text-[0.6875rem] font-semibold ${textoMarca}`}>Passo {i + 1}</span>
                    <h3 className="text-[0.875rem] font-bold text-foreground mb-0.5">{item.titulo}</h3>
                    <p className="text-[0.75rem] text-muted-foreground leading-snug">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ══ COMPARATIVO DE PLANOS ══ */}
        <div className="px-4 sm:px-6 py-10">
          <div className="text-center mb-7">
            <p className={`text-[0.6875rem] font-semibold uppercase tracking-[0.1em] mb-1 ${textoMarca}`}>Planos</p>
            <h2 className="text-[1.25rem] font-black text-foreground tracking-tight">Compare e escolha o plano da sua loja</h2>
          </div>
          <div className="relative max-w-2xl mx-auto rounded-[14px] border border-border overflow-x-auto" style={{ boxShadow: "var(--shadow-md)" }}>
            <table className="w-full min-w-[520px] border-collapse">
              <caption className="sr-only">Comparativo dos planos Visibilidade, Desempenho e Oportunidades</caption>
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th scope="col" className="px-4 py-3 text-left text-[0.6875rem] font-semibold text-muted-foreground">Recurso</th>
                  {plans.map(p => (
                    <th key={p.id} scope="col" className={`px-3 py-3 text-center align-top ${p.highlight ? "bg-[var(--primary-muted)]" : ""}`}>
                      {p.highlight && <span className="block mb-1 text-[0.5625rem] font-bold uppercase tracking-wide text-muted-foreground">Recomendado</span>}
                      <span className={`block text-[0.75rem] font-bold ${p.highlight ? textoMarca : "text-foreground"}`}>{p.name.pt}</span>
                      <span className="block text-[0.6875rem] font-normal text-muted-foreground">{reais(p.price)}/mês</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pricingFeatures.map((f, i) => (
                  <tr key={f.pt} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-card" : "bg-muted/20"}`}>
                    <th scope="row" className="px-4 py-2.5 text-left text-[0.75rem] font-medium text-foreground">{f.pt}</th>
                    {plans.map(p => {
                      const inclui = i < p.included;
                      return (
                        <td key={p.id} className={`px-3 py-2.5 text-center ${p.highlight ? "bg-[var(--primary-muted)]" : ""}`}>
                          {inclui
                            ? <Check aria-hidden className={`h-3.5 w-3.5 mx-auto ${textoMarca}`} />
                            : <Minus aria-hidden className="h-3.5 w-3.5 mx-auto text-muted-foreground" />}
                          <span className="sr-only">{inclui ? "Incluído" : "Não incluído"}</span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-border bg-muted/20">
                  <td />
                  {plans.map(p => (
                    <td key={p.id} className="px-2 py-3 text-center">
                      <button
                        type="button"
                        aria-label={`Escolher o plano ${p.name.pt}`}
                        className={`h-7 px-3 rounded-[7px] text-[0.6875rem] font-semibold transition-colors whitespace-nowrap ${foco} ${p.highlight ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border bg-card text-foreground hover:bg-accent"}`}
                      >
                        Escolher
                      </button>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* ══ DEPOIMENTOS ══ */}
        <div className="px-4 sm:px-6 py-10 bg-card/30 border-y border-border">
          <div className="text-center mb-7">
            <p className={`text-[0.6875rem] font-semibold uppercase tracking-[0.1em] mb-1 ${textoMarca}`}>Depoimentos</p>
            <h2 className="text-[1.25rem] font-black text-foreground tracking-tight">Lojas que já estão na FindLook</h2>
            <p className="text-[0.6875rem] text-muted-foreground mt-1">Textos de exemplo para o template.</p>
          </div>
          <div className="max-w-2xl mx-auto" role="region" aria-roledescription="carrossel" aria-label="Depoimentos de lojas">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4" aria-live="polite">
              {visibleTestimonials.map((tm, i) => (
                <figure key={`${tm.pessoa}-${slide}-${i}`} className={`p-4 rounded-[12px] border border-border bg-card flex flex-col ${i > 0 ? "hidden sm:flex" : ""}`} style={{ boxShadow: "var(--shadow-xs)" }}>
                  <Store aria-hidden className="h-3.5 w-3.5 text-muted-foreground mb-3" />
                  <blockquote className="text-[0.75rem] text-muted-foreground leading-snug mb-4 italic">“{tm.texto}”</blockquote>
                  <figcaption className="flex items-center gap-2.5 mt-auto">
                    <div aria-hidden className="h-8 w-8 rounded-full bg-[var(--primary-muted)] flex items-center justify-center shrink-0">
                      <span className={`text-[0.5625rem] font-black ${textoMarca}`}>{tm.iniciais}</span>
                    </div>
                    <div>
                      <div className="text-[0.75rem] font-bold text-foreground leading-none">{tm.pessoa}</div>
                      <div className="text-[0.5625rem] text-muted-foreground mt-0.5">{tm.loja} · {tm.bairro}</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4">
              <button type="button" onClick={prevSlide} aria-label="Depoimento anterior" className={`h-8 w-8 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground transition-colors ${foco}`}>
                <ChevronRight aria-hidden className="h-4 w-4 rotate-180" />
              </button>
              <div className="flex gap-1.5">
                {depoimentosLanding.map((d, i) => (
                  <button
                    key={d.pessoa}
                    type="button"
                    onClick={() => setSlide(i)}
                    aria-label={`Ir para o depoimento ${i + 1} de ${total}`}
                    aria-current={i === slide ? "true" : undefined}
                    className={`h-1.5 rounded-full transition-all ${foco} ${i === slide ? "w-5 bg-primary" : "w-1.5 bg-border"}`}
                  />
                ))}
              </div>
              <button type="button" onClick={nextSlide} aria-label="Próximo depoimento" className={`h-8 w-8 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground transition-colors ${foco}`}>
                <ChevronRight aria-hidden className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ══ DÚVIDAS ══ */}
        <div className="px-4 sm:px-6 py-10">
          <div className="text-center mb-7">
            <p className={`text-[0.6875rem] font-semibold uppercase tracking-[0.1em] mb-1 ${textoMarca}`}>Dúvidas</p>
            <h2 className="text-[1.25rem] font-black text-foreground tracking-tight">Perguntas frequentes</h2>
          </div>
          <div className="max-w-xl mx-auto space-y-2">
            {duvidasLanding.map((item, i) => {
              const aberto = openFaq === i;
              return (
                <div key={item.q} className="rounded-[12px] border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-xs)" }}>
                  <h3>
                    <button
                      type="button"
                      id={`${pre}-faq-${i}`}
                      aria-expanded={aberto}
                      aria-controls={`${pre}-faq-painel-${i}`}
                      onClick={() => setOpenFaq(aberto ? null : i)}
                      className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-muted/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                    >
                      <span className="text-[0.875rem] font-semibold text-foreground pr-4">{item.q}</span>
                      <ChevronRight aria-hidden className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${aberto ? "rotate-90" : ""}`} />
                    </button>
                  </h3>
                  {aberto && (
                    <div id={`${pre}-faq-painel-${i}`} role="region" aria-labelledby={`${pre}-faq-${i}`} className="px-4 pb-4 pt-0">
                      <div className="h-px bg-border mb-3" />
                      <p className="text-[0.8125rem] text-muted-foreground leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ══ CONTATO / CTA FINAL ══ */}
        <div className="relative overflow-hidden border-y border-border">
          <div className="absolute inset-0 bg-card/40" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full bg-primary/6 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-[180px] h-[180px] rounded-full bg-info/5 blur-3xl pointer-events-none" />
          <div className="absolute top-10 right-10 w-[140px] h-[140px] rounded-full bg-warning/4 blur-3xl pointer-events-none" />

          <div className="relative z-10 px-4 sm:px-6 py-12">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-[var(--primary-muted)] text-[0.6875rem] font-semibold mb-3 ${textoMarca}`}>
                <MessageCircle aria-hidden className="h-3 w-3" /> Fale com a gente
              </div>
              <h2 className="text-[1.375rem] font-black text-foreground tracking-[-0.03em] mb-2">
                Sua loja pronta<br />
                <span className={textoMarca}>para ser encontrada</span>
              </h2>
              <p className="text-[0.8125rem] text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Tire dúvidas sobre os planos ou peça ajuda para cadastrar a loja. Escolha o canal ou preencha o formulário.
              </p>
            </div>

            <ul className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {[
                { icon: MessageCircle, label: "WhatsApp comercial",   value: "(11) 90000-0000",       badge: "Seg. a sex.", iconBg: "bg-[var(--success-muted)] text-success" },
                { icon: CalendarCheck, label: "Agendar uma conversa", value: "Por vídeo, com a nossa equipe", badge: "30 min", iconBg: `bg-[var(--primary-muted)] ${textoMarca}` },
                { icon: Mail,          label: "E-mail",               value: "suporte@exemplo.com.br", badge: "1 dia útil",  iconBg: "bg-[var(--info-muted)] text-info" },
              ].map(ch => {
                const Icon = ch.icon;
                return (
                  <li key={ch.label}>
                    <button type="button" className={`group w-full text-left relative rounded-[14px] border border-border bg-card p-4 flex flex-col gap-3 hover:border-primary/30 hover:shadow-md transition-all ${foco}`} style={{ boxShadow: "var(--shadow-xs)" }}>
                      <div className="flex items-start justify-between w-full">
                        <div className={`h-9 w-9 rounded-[10px] flex items-center justify-center ${ch.iconBg}`}>
                          <Icon aria-hidden style={{ height: 18, width: 18 }} />
                        </div>
                        <span className="text-[0.5625rem] font-bold px-1.5 py-0.5 rounded-full border border-border bg-muted text-foreground">{ch.badge}</span>
                      </div>
                      <div>
                        <div className="text-[0.8125rem] font-bold text-foreground mb-0.5">{ch.label}</div>
                        <div className="text-[0.6875rem] text-muted-foreground">{ch.value}</div>
                      </div>
                      <div className={`flex items-center gap-1 text-[0.6875rem] font-medium opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity ${textoMarca}`}>
                        Abrir <ArrowRight aria-hidden className="h-3 w-3" />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="max-w-2xl mx-auto flex items-center gap-3 mb-8">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground px-2">ou envie uma mensagem</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-[1fr_1.6fr] gap-6 items-start">
              {/* Confiança */}
              <div className="space-y-5">
                <div>
                  <h3 className="text-[0.875rem] font-bold text-foreground mb-1">Por que a FindLook?</h3>
                  <p className="text-[0.75rem] text-muted-foreground leading-relaxed">
                    A FindLook não vende: ela gera encontros entre quem procura e a sua loja.
                  </p>
                </div>
                <ul className="space-y-2.5">
                  {[
                    { icon: CheckCircle, text: "Contato direto, sem ninguém no meio da venda", color: "text-success" },
                    { icon: ShieldCheck, text: "Dados de quem procura protegidos, conforme a LGPD", color: "text-info" },
                    { icon: Zap,         text: "Troque de plano quando precisar",               color: textoMarca },
                    { icon: LifeBuoy,    text: "Suporte para cadastrar as primeiras peças",     color: "text-muted-foreground" },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <li key={item.text} className="flex items-start gap-2.5">
                        <Icon aria-hidden className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${item.color}`} />
                        <span className="text-[0.75rem] text-muted-foreground leading-snug">{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="rounded-[12px] border border-border bg-card p-3.5" style={{ boxShadow: "var(--shadow-xs)" }}>
                  <p className="text-[0.75rem] font-semibold text-foreground mb-0.5">Já tem conta?</p>
                  <p className="text-[0.6875rem] text-muted-foreground mb-2.5">Entre no painel para atualizar peças e ver os avisos da loja.</p>
                  <button type="button" className={`h-7 px-3 rounded-[7px] border border-border bg-background text-[0.6875rem] font-semibold text-foreground hover:bg-accent inline-flex items-center gap-1.5 ${foco}`}>
                    <LogIn aria-hidden className="h-3 w-3" /> Entrar no painel
                  </button>
                </div>
              </div>

              {/* Formulário */}
              <div className="rounded-[16px] border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-md)" }}>
                <div className="px-5 py-4 border-b border-border bg-muted/30 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-[9px] bg-[var(--primary-muted)] flex items-center justify-center">
                    <Send aria-hidden className={`h-4 w-4 ${textoMarca}`} />
                  </div>
                  <div>
                    <h3 className="text-[0.875rem] font-bold text-foreground">Quero conhecer a FindLook</h3>
                    <p className="text-[0.6875rem] text-muted-foreground">Respondemos em até 1 dia útil</p>
                  </div>
                </div>

                <div className="p-5">
                  {contactSent ? (
                    <div role="status" className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                      <div className="h-14 w-14 rounded-full bg-success/10 border border-success/20 flex items-center justify-center">
                        <CheckCircle aria-hidden className="h-7 w-7 text-success" />
                      </div>
                      <div>
                        <p className="text-[0.9375rem] font-bold text-foreground mb-1">Mensagem enviada!</p>
                        <p className="text-[0.75rem] text-muted-foreground leading-relaxed max-w-[220px] mx-auto">
                          Vamos responder em até 1 dia útil, no e-mail ou no WhatsApp informado.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setContactSent(false)}
                        className={`mt-1 h-8 px-4 rounded-[8px] border border-border bg-muted text-[0.75rem] font-medium text-foreground hover:bg-accent transition-colors ${foco}`}
                      >
                        Enviar outra mensagem
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={e => { e.preventDefault(); setContactSent(true); }} className="space-y-3">
                      <p className="text-[0.625rem] text-muted-foreground"><span className={textoMarca}>*</span> Campo obrigatório</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="space-y-1">
                          <label htmlFor={`${pre}-nome`} className="block text-[0.6875rem] font-semibold text-foreground">
                            Seu nome <span aria-hidden className={textoMarca}>*</span>
                          </label>
                          <div className="relative">
                            <User aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
                            <input id={`${pre}-nome`} required type="text" autoComplete="name" placeholder="Ana Oliveira" className={`${campo} pl-7 text-[0.75rem]`} />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label htmlFor={`${pre}-email`} className="block text-[0.6875rem] font-semibold text-foreground">
                            E-mail <span aria-hidden className={textoMarca}>*</span>
                          </label>
                          <div className="relative">
                            <Mail aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
                            <input id={`${pre}-email`} required type="email" autoComplete="email" placeholder="voce@email.com" className={`${campo} pl-7 text-[0.75rem]`} />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="space-y-1">
                          <label htmlFor={`${pre}-loja`} className="block text-[0.6875rem] font-semibold text-foreground">
                            Nome da loja <span aria-hidden className={textoMarca}>*</span>
                          </label>
                          <div className="relative">
                            <Store aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
                            <input id={`${pre}-loja`} required type="text" autoComplete="organization" placeholder="Ateliê Aurora" className={`${campo} pl-7 text-[0.75rem]`} />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label htmlFor={`${pre}-whats`} className="block text-[0.6875rem] font-semibold text-foreground">WhatsApp da loja</label>
                          <div className="relative">
                            <Phone aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
                            <input id={`${pre}-whats`} type="tel" autoComplete="tel" placeholder="(11) 90000-0000" className={`${campo} pl-7 text-[0.75rem]`} />
                          </div>
                        </div>
                      </div>

                      <fieldset className="space-y-1.5">
                        <legend className="block text-[0.6875rem] font-semibold text-foreground mb-1.5">Tipo de negócio</legend>
                        <div className="flex flex-wrap gap-1.5">
                          {tiposLoja.map(s => (
                            <button
                              key={s}
                              type="button"
                              aria-pressed={tipoLoja === s}
                              onClick={() => setTipoLoja(s)}
                              className={`px-2.5 py-1 rounded-full border text-[0.625rem] font-medium transition-all ${foco} ${tipoLoja === s ? `border-primary bg-[var(--primary-muted)] ${textoMarca}` : "border-border bg-muted text-muted-foreground hover:border-primary/40 hover:text-foreground"}`}
                            >
                              {tipoLoja === s && <Check aria-hidden className="inline h-2.5 w-2.5 mr-1 -mt-px" />}
                              {s}
                            </button>
                          ))}
                        </div>
                      </fieldset>

                      <div className="space-y-1">
                        <label htmlFor={`${pre}-msg`} className="block text-[0.6875rem] font-semibold text-foreground">
                          Mensagem <span className="font-normal text-muted-foreground">(opcional)</span>
                        </label>
                        <textarea id={`${pre}-msg`} rows={3} placeholder="Conte o que a sua loja vende e em qual bairro fica."
                          className={`${campo} text-[0.75rem] resize-none`} />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
                        <div className="flex items-start gap-1.5 flex-1 min-w-[160px]">
                          <input id={`${pre}-consent`} type="checkbox" required className="mt-0.5 h-3 w-3 rounded accent-[var(--primary)] shrink-0" />
                          <label htmlFor={`${pre}-consent`} className="text-[0.625rem] text-muted-foreground leading-snug cursor-pointer">
                            Concordo com os <span className={`underline underline-offset-1 ${textoMarca}`}>Termos</span> e a <span className={`underline underline-offset-1 ${textoMarca}`}>Política de privacidade</span>
                          </label>
                        </div>
                        <button type="submit"
                          className={`shrink-0 h-8 px-4 rounded-[8px] bg-primary text-primary-foreground text-[0.75rem] font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 whitespace-nowrap ${foco}`}>
                          <Send aria-hidden className="h-3 w-3" /> Enviar
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ RODAPÉ ══ */}
        <footer className="border-t border-border px-4 sm:px-6 py-6 bg-card/20">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <MarcaFindLook />
              <div className="flex flex-wrap items-center gap-4">
                {["Para quem procura", "Para lojas", "Planos", "Ajuda", "Contato"].map(l => (
                  <button key={l} type="button" className={`text-[0.6875rem] text-muted-foreground hover:text-foreground transition-colors rounded-[4px] ${foco}`}>{l}</button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
              <span className="text-[0.625rem] text-muted-foreground">© 2026 FindLook. Todos os direitos reservados.</span>
              <div className="flex items-center gap-3">
                {["Privacidade", "Termos", "Cookies"].map(l => (
                  <button key={l} type="button" className={`text-[0.6875rem] text-muted-foreground hover:text-foreground transition-colors rounded-[4px] ${foco}`}>{l}</button>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TemplateFrame>
  );
}
