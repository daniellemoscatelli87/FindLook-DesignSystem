import React, { useState, useEffect, useId, useRef } from "react";
import { VoltarAoTopo } from "../ui/voltar-ao-topo";
import { BarraFixaDoCelular } from "../ui/barra-fixa-celular";
import { MolduraCelular, ConteudoFalso } from "./shared/MolduraCelular";
import { TokenTable, type TokenGroup } from "./shared/TokenTable";
import { Callout, DoDont } from "./shared/Guidance";
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
  ShieldCheck, Rocket, BarChart, Layout, Minus, Lightbulb, Star, ArrowRight,
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
import { Checkbox } from "../ui/checkbox";
import { Timeline } from "../ui/timeline";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { SegmentedControl } from "../ui/segmented-control";
import { CartaoDeEscolha, GrupoDeCartoesDeEscolha } from "../ui/cartao-de-escolha";
import { IconeModa, type NomeIconeModa } from "../ui/fashion-icons";
import logoSimbolo from "../../../imports/findlook/findlook-simbolo.png";
import { SectionHeader } from "./shared/SectionHeader";
import { CabecalhoDaPagina } from "../ui/painel-cabecalho";
import { CardComCabecalho } from "../ui/painel-dados";
import { AbasComContador } from "../ui/painel-produtos";
import { GradeDeCards } from "../ui/grade-de-cards";
import { CardDePreco } from "../ui/card-de-preco";
import { MolduraDeConta } from "../ui/moldura-de-conta";
import { Campo } from "../ui/campo";
import { ListaDeVantagens } from "../ui/lista-de-vantagens";
import { LinkDeTexto } from "../ui/links";
import { EstadoVazio } from "../ui/estado-vazio";
import { Button } from "../ui/button";
import { plans, pricingFeatures } from "./shared/planos";

type L = { en: string; pt: string };

/* ─────────────────────────────────────────────
   Shared helpers
───────────────────────────────────────────── */

function TemplateLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="h-7 w-7 rounded-sm bg-muted flex items-center justify-center">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <span className="text-label font-semibold uppercase tracking-[0.07em] text-muted-foreground">{label}</span>
    </div>
  );
}

/* Wraps each template in a browser-chrome frame */
function TemplateFrame({ children, className = "", url = "Painel da loja · FindLook" }: { children: React.ReactNode; className?: string; url?: string }) {
  const embutido = React.useContext(PainelEmbutido);
  // Dentro do protótipo do painel (Opção A, 23/11/2026): sem moldura nem card em volta; a página monta o próprio
  // cabeçalho (fora de card) e os cards com cabeçalho de ícone.
  if (embutido) return <div className={className}>{children}</div>;
  return (
    <div className={`rounded-lg border border-border overflow-hidden ${className}`} style={{ boxShadow: "var(--shadow-lg)" }}>
      {/* Browser chrome */}
      <div className="h-9 bg-muted/60 border-b border-border flex items-center px-4 gap-2 shrink-0">
        <div className="flex gap-1">
          <div className="h-2.5 w-2.5 rounded-full bg-primary/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-warning/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-success/50" />
        </div>
        <div className="flex-1 mx-4">
          <div className="h-5 bg-background/70 rounded-sm max-w-[280px] mx-auto flex items-center px-3">
            <span className="text-caption text-muted-foreground/60 truncate">{url}</span>
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
const campo = "w-full bg-background border border-border rounded-sm px-3 py-2 text-body-sm text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all";
const textoMarca = "text-[var(--primary-text,var(--primary))]";

/* Símbolo + wordmark FindLook, com legenda opcional (ex.: nome da loja) */
function MarcaFindLook({ legenda, tamanho = "sm" }: { legenda?: string; tamanho?: "sm" | "md" }) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <img src={logoSimbolo} alt="" className={`${tamanho === "md" ? "h-8" : "h-6"} w-auto object-contain shrink-0`} />
      <div className="min-w-0 leading-tight">
        <span className={`${tamanho === "md" ? "text-body" : "text-body-sm"} font-extrabold tracking-[-0.03em] text-foreground whitespace-nowrap`}>
          Find<span className="text-primary">Look</span>
        </span>
        {legenda && <span className="block text-caption text-muted-foreground truncate">{legenda}</span>}
      </div>
    </div>
  );
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
  const pre = `cfg${uid.replace(/:/g, "")}`;

  const linhaSwitch = (id: string, titulo: string, desc: string, marcado: boolean, mudar: (v: boolean) => void, Icon?: React.ElementType, desativado = false) => (
    <div key={id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
      <div className="flex items-start gap-2 min-w-0">
        {Icon && (
          <span className="h-7 w-7 rounded-sm bg-muted flex items-center justify-center shrink-0">
            <Icon aria-hidden className="h-3.5 w-3.5 text-muted-foreground" />
          </span>
        )}
        <div className="min-w-0">
          <label htmlFor={`${pre}-${id}`} className="block text-body-sm font-medium text-foreground cursor-pointer">{titulo}</label>
          <p id={`${pre}-${id}-desc`} className="text-caption text-muted-foreground leading-snug">{desc}</p>
        </div>
      </div>
      <Switch id={`${pre}-${id}`} checked={marcado} onCheckedChange={mudar} disabled={desativado} aria-describedby={`${pre}-${id}-desc`} />
    </div>
  );

  // Opção A (decisão da dona do produto, 23/11/2026): título, descrição e abas fora de qualquer card, no fundo da
  // página; embaixo, o conteúdo da aba em cards brancos com cabeçalho de ícone, um card por assunto.
  const rotulo = (id: string, texto: string) => <label htmlFor={`${pre}-${id}`} className="block text-label font-medium text-foreground mb-1">{texto}</label>;
  return (
    <TemplateFrame url="Painel da loja · Configurações">
      <div className={`space-y-5 ${embutido ? "" : "bg-muted p-4 sm:p-6"}`}>
        <CabecalhoDaPagina
          nivel={2}
          titulo="Configurações da loja"
          descricao="Essas informações aparecem na vitrine da sua loja na FindLook."
          abas={
            <AbasComContador
              estilo="pagina"
              idBase={pre}
              rotulo="Seções das configurações"
              abas={tabs.map(tb => ({ valor: tb.id, rotulo: tb.label }))}
              valor={activeTab}
              onChange={setActiveTab}
            />
          }
        />

        <div id={`${pre}-painel`} role="tabpanel" aria-labelledby={`${pre}-aba-${activeTab}`} className="space-y-4">
          {activeTab === "perfil" && (
            <form onSubmit={e => { e.preventDefault(); setSalvo(true); }} className="space-y-4">
              <CardComCabecalho nivel={3} icone={<Store />} titulo="Identidade da loja" descricao="Nome, logo e a frase que apresenta a loja na vitrine.">
                <div className="space-y-4 max-w-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-[var(--primary-muted)] flex items-center justify-center shrink-0">
                      <Store aria-hidden className={`h-7 w-7 ${textoMarca}`} />
                    </div>
                    <div>
                      <div className="text-body-sm font-semibold text-foreground">Ateliê Aurora</div>
                      <div className="text-label text-muted-foreground">Loja parceira desde mar. de 2026</div>
                      <button type="button" className={`mt-1 text-caption font-medium hover:underline rounded-sm ${textoMarca} ${foco}`}>Trocar logo da loja</button>
                    </div>
                  </div>
                  <div>
                    {rotulo("nome", "Nome da loja")}
                    <input id={`${pre}-nome`} type="text" autoComplete="organization" defaultValue="Ateliê Aurora" onChange={() => setSalvo(false)} className={campo} />
                  </div>
                  <div>
                    {rotulo("desc", "Descrição")}
                    <textarea
                      id={`${pre}-desc`}
                      rows={3}
                      aria-describedby={`${pre}-desc-dica`}
                      onChange={() => setSalvo(false)}
                      defaultValue="Moda feminina autoral e peças de brechó selecionadas. Tamanhos do PP ao GG."
                      className={`${campo} resize-none`}
                    />
                    <p id={`${pre}-desc-dica`} className="mt-1 text-caption text-muted-foreground">Conte em poucas palavras o que a sua loja vende e para quem.</p>
                  </div>
                </div>
              </CardComCabecalho>

              <CardComCabecalho nivel={3} icone={<MapPin />} titulo="Endereço e contato" descricao="Onde a loja fica, quando abre e como falar com ela.">
                <div className="grid grid-cols-1 @lg:grid-cols-2 gap-3 max-w-2xl">
                  <div>
                    {rotulo("endereco", "Endereço")}
                    <input id={`${pre}-endereco`} type="text" autoComplete="street-address" defaultValue="Rua dos Pinheiros, 820" onChange={() => setSalvo(false)} className={campo} />
                  </div>
                  <div>
                    {rotulo("bairro", "Bairro e cidade")}
                    <input id={`${pre}-bairro`} type="text" autoComplete="address-level2" defaultValue="Pinheiros, São Paulo – SP" onChange={() => setSalvo(false)} className={campo} />
                  </div>
                  <div>
                    {rotulo("horario", "Horário de funcionamento")}
                    <input id={`${pre}-horario`} type="text" defaultValue="Seg. a sáb., das 10h às 19h" onChange={() => setSalvo(false)} className={campo} />
                  </div>
                  <div>
                    {rotulo("whats", "WhatsApp da loja")}
                    <input id={`${pre}-whats`} type="tel" autoComplete="tel" defaultValue="(11) 98765-4321" onChange={() => setSalvo(false)} className={campo} />
                  </div>
                </div>
              </CardComCabecalho>

              <div className="flex flex-wrap items-center justify-end gap-3">
                <p role="status" className="text-label text-muted-foreground flex items-center gap-1">
                  {salvo && <><CheckCircle aria-hidden className="h-3.5 w-3.5 text-success" /> Alterações salvas. A vitrine já mostra as novas informações.</>}
                </p>
                <button type="submit" className={`h-10 px-4 rounded-md bg-primary text-primary-foreground text-body-sm font-semibold hover:bg-[var(--primary-hover)] transition-colors ${foco}`}>
                  Salvar alterações
                </button>
              </div>
            </form>
          )}

          {activeTab === "notificacoes" && (
            <>
              <CardComCabecalho nivel={3} icone={<Bell />} titulo="O que avisar" descricao="Escolha quais movimentos da sua vitrine geram aviso.">
                {/* Linha entre as opções: separa itens de uma lista (a única linha mantida dentro dos cards). */}
                <div className="divide-y divide-border max-w-2xl">
                  {avisosLoja.map(a =>
                    linhaSwitch(a.chave, a.titulo, a.desc, avisos[a.chave], v => setAvisos(prev => ({ ...prev, [a.chave]: v })), a.icon)
                  )}
                </div>
              </CardComCabecalho>
              <CardComCabecalho nivel={3} icone={<Send />} titulo="Onde avisar" descricao="Os avisos ficam sempre no painel; e-mail e WhatsApp são opcionais.">
                <div className="divide-y divide-border max-w-2xl">
                  {linhaSwitch("no-painel", "No painel da loja", "Sempre ativo. Os avisos ficam em Notificações.", true, () => {}, Bell, true)}
                  {linhaSwitch("email", "Por e-mail", "ana@atelieaurora.com.br", canais.email, v => setCanais(p => ({ ...p, email: v })), Mail)}
                  {linhaSwitch("whatsapp", "Pelo WhatsApp", "(11) 98765-4321", canais.whatsapp, v => setCanais(p => ({ ...p, whatsapp: v })), Smartphone)}
                </div>
              </CardComCabecalho>
            </>
          )}

          {activeTab === "aparencia" && (
            <CardComCabecalho nivel={3} icone={<Sun />} titulo="Tema do painel" descricao="Escolha como o painel aparece para você.">
              {/* Cartões de escolha do DS (rádio de verdade), no lugar dos botões feitos à mão (27/11/2026) */}
              <GrupoDeCartoesDeEscolha
                aria-label="Tema do painel"
                colunas={2}
                className="max-w-md"
                value={darkToggle ? "dark" : "light"}
                onValueChange={v => document.documentElement.classList.toggle("dark", v === "dark")}
              >
                <CartaoDeEscolha valor="light" icone={<Sun />} titulo="Modo claro" descricao="Fundo branco, o padrão do painel." />
                <CartaoDeEscolha valor="dark" icone={<Moon />} titulo="Modo escuro" descricao="Fundo grafite, para pouca luz." />
              </GrupoDeCartoesDeEscolha>
            </CardComCabecalho>
          )}

          {activeTab === "conta" && (
            <>
              <CardComCabecalho
                nivel={3}
                icone={<Zap />}
                titulo="Plano"
                descricao="Plano Desempenho · R$ 149,00 por mês · renova em 1º de dez. de 2026"
                acao={<button type="button" className={`h-9 px-3 rounded-md border border-[var(--border-strong)] bg-card text-body-sm font-medium text-foreground hover:bg-accent ${foco}`}>Ver planos</button>}
              />

              <CardComCabecalho nivel={3} icone={<ShieldCheck />} titulo="Privacidade da vitrine" descricao="O que quem encontra suas peças pode ver da loja.">
                <div className="max-w-2xl">
                  <div className="divide-y divide-border">
                  {linhaSwitch("mostrar-whats", "Mostrar o WhatsApp na vitrine", "Quem encontra suas peças pode chamar a loja direto.", privacidade.whatsapp, v => setPrivacidade(p => ({ ...p, whatsapp: v })), MessageCircle)}
                  {linhaSwitch("mostrar-end", "Mostrar o endereço completo", "Desligado, a vitrine mostra só o bairro.", privacidade.endereco, v => setPrivacidade(p => ({ ...p, endereco: v })), MapPin)}
                  </div>
                  <div className="mt-4 flex items-start gap-2 p-3 rounded-md bg-muted">
                    <ShieldCheck aria-hidden className="h-4 w-4 text-success shrink-0 mt-1" />
                    <p className="text-caption text-muted-foreground leading-snug">
                      Os avisos mostram o que as pessoas fizeram, sem nome nem contato. Você só recebe os dados de alguém quando a pessoa escolhe falar com a loja.
                    </p>
                  </div>
                </div>
              </CardComCabecalho>

              <CardComCabecalho
                nivel={3}
                icone={<Store />}
                tom={vitrinePausada ? "neutro" : "marca"}
                titulo={vitrinePausada ? "Vitrine pausada" : "Vitrine no ar"}
                descricao={<span role="status">{vitrinePausada ? "Sua loja não aparece nas buscas até você reativar." : "Sua loja aparece nas buscas da região."}</span>}
                acao={
                  <button
                    type="button"
                    onClick={() => setVitrinePausada(v => !v)}
                    className={`h-9 px-3 rounded-md border border-[var(--border-strong)] bg-card text-body-sm font-medium text-foreground hover:bg-accent ${foco}`}
                  >
                    {vitrinePausada ? "Reativar vitrine" : "Pausar vitrine"}
                  </button>
                }
              >
                <button type="button" className={`inline-flex items-center gap-1 text-body-sm font-medium text-muted-foreground hover:text-foreground rounded-sm ${foco}`}>
                  <LogOut aria-hidden className="h-3.5 w-3.5" /> Sair da conta
                </button>
              </CardComCabecalho>
            </>
          )}
        </div>
      </div>
    </TemplateFrame>
  );
}

/* ─────────────────────────────────────────────
   3. Entrar e criar conta (loja parceira)
───────────────────────────────────────────── */
function AuthTemplate() {
  // MolduraDeConta, Campo, SegmentedControl e EstadoVazio do DS (27/11/2026): o template é feito só de componentes.
  const uid = useId();
  const pre = `auth${uid.replace(/:/g, "")}`;
  const [tab, setTab] = useState<"entrar" | "criar">("entrar");
  const [enviado, setEnviado] = useState(false);
  const entrar = tab === "entrar";

  const trocar = (novo: "entrar" | "criar") => { setTab(novo); setEnviado(false); };

  return (
    <TemplateFrame url="FindLook · Entrar">
      <MolduraDeConta
        altura="conteudo"
        idDoConteudo={`${pre}-conteudo`}
        logoHref="#template-auth"
        voltar={{ rotulo: "Voltar ao início", href: "#template-auth" }}
        titulo={entrar ? "Que bom ter você de volta" : "Cadastre sua loja"}
        explicacao={entrar ? "Entre no painel da sua loja." : "Leva poucos minutos. Você revisa tudo antes de publicar."}
        lateral={
          <div className="space-y-5">
            <p className="m-0 text-h4 font-bold leading-snug text-foreground">Sua loja encontrada por quem já procura o que você vende.</p>
            <ListaDeVantagens itens={["Vitrine pesquisável por foto e descrição", "Contato direto pelo WhatsApp", "Veja quais peças despertam interesse"]} />
          </div>
        }
        rodape={
          <p className="m-0">
            {entrar ? "Sua loja ainda não está na FindLook? " : "Já tem conta? "}
            <LinkDeTexto href="#template-auth" onClick={(e) => { e.preventDefault(); trocar(entrar ? "criar" : "entrar"); }}>{entrar ? "Cadastre sua loja" : "Entrar"}</LinkDeTexto>
          </p>
        }
      >
        <SegmentedControl<"entrar" | "criar">
          aria-label="Escolha uma opção"
          fullWidth
          className="mb-6"
          options={[{ value: "entrar", label: "Entrar" }, { value: "criar", label: "Criar conta" }]}
          value={tab}
          onValueChange={trocar}
        />
        {enviado ? (
          <EstadoVazio
            variante="simples"
            icone={<CheckCircle />}
            tom="marca"
            titulo={entrar ? "Tudo certo!" : "Conta criada!"}
            texto={entrar ? "Abrindo o painel do Ateliê Aurora." : "Enviamos um e-mail para confirmar o endereço. Depois é só cadastrar as primeiras peças."}
            acao={<Button variant="outline" className="h-10 toque:h-11" onClick={() => setEnviado(false)}>Voltar</Button>}
          />
        ) : (
          <form className="space-y-5" onSubmit={e => { e.preventDefault(); setEnviado(true); }}>
            {!entrar && (
              <>
                <Campo id={`${pre}-nome`} rotulo="Seu nome" icone={<User />} required autoComplete="name" placeholder="Ana Oliveira" />
                <Campo id={`${pre}-loja`} rotulo="Nome da loja" icone={<Store />} required autoComplete="organization" placeholder="Ateliê Aurora" />
              </>
            )}
            <Campo id={`${pre}-email`} rotulo="E-mail" type="email" icone={<Mail />} required autoComplete="email" placeholder="ana@atelieaurora.com.br" />
            <Campo
              id={`${pre}-senha`}
              rotulo="Senha"
              type="password"
              icone={<Lock />}
              required
              minLength={entrar ? undefined : 8}
              autoComplete={entrar ? "current-password" : "new-password"}
              ajuda={entrar ? <LinkDeTexto href="#template-auth">Esqueci minha senha</LinkDeTexto> : "Use pelo menos 8 caracteres."}
            />
            {!entrar && (
              <div className="flex items-start gap-3">
                <Checkbox id={`${pre}-termos`} required className="mt-0.5" />
                <label htmlFor={`${pre}-termos`} className="text-body-sm leading-snug text-muted-foreground">
                  Li e aceito os <LinkDeTexto href="#template-auth">Termos de uso</LinkDeTexto> e a <LinkDeTexto href="#template-auth">Política de privacidade</LinkDeTexto>.
                </label>
              </div>
            )}
            <Button type="submit" className="h-10 w-full toque:h-11">
              {entrar ? <LogIn aria-hidden /> : <Store aria-hidden />}
              {entrar ? "Entrar" : "Cadastrar minha loja"}
            </Button>
          </form>
        )}
      </MolduraDeConta>
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
  responsavel: { rotulo: "Responsável", desc: "Cuida do plano, da equipe e de todos os dados da loja.", cor: `bg-[var(--primary-suave)] ${textoMarca} border-primary/20` },
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

  // Opção A (23/11/2026): cabeçalho da página fora do card; convite e lista em cards com cabeçalho de ícone.
  return (
    <TemplateFrame url="Painel da loja · Equipe">
      <div className={`space-y-5 ${embutido ? "" : "bg-muted p-4 sm:p-6"}`}>
        <CabecalhoDaPagina
          nivel={2}
          titulo="Equipe da loja"
          descricao={`${pessoas.length} pessoas com acesso ao painel do Ateliê Aurora.`}
          acoes={
            <button
              type="button"
              aria-expanded={convidando}
              aria-controls={`${pre}-convite`}
              onClick={() => setConvidando(v => !v)}
              // Um botão principal por área visível: com o convite aberto, o principal é "Enviar convite"; este vira secundário.
              className={`h-10 px-4 rounded-md text-body-sm font-semibold flex items-center gap-2 transition-colors ${foco} ${convidando ? "border border-[var(--border-strong)] bg-card text-foreground hover:bg-accent" : "bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]"}`}
            >
              <UserPlus aria-hidden className="h-4 w-4" /> Convidar pessoa
            </button>
          }
        />

        {convidando && (
          <CardComCabecalho nivel={3} icone={<UserPlus />} titulo="Convidar pessoa" descricao="A pessoa recebe um e-mail para criar a senha e entrar no painel.">
          <form id={`${pre}-convite`} onSubmit={enviarConvite} className="space-y-4">
            <div className="grid grid-cols-1 @xl:grid-cols-[minmax(0,1fr)_auto] gap-3 items-end">
              <div>
                <label htmlFor={`${pre}-email`} className="block text-label font-medium text-foreground mb-1">E-mail da pessoa</label>
                <input id={`${pre}-email`} type="email" required autoComplete="off" value={emailConvite} onChange={e => setEmailConvite(e.target.value)} placeholder="nome@email.com" className={campo} />
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setConvidando(false)} className={`h-9 px-3 rounded-sm border border-border bg-card text-label font-medium text-foreground hover:bg-accent ${foco}`}>Cancelar</button>
                <button type="submit" className={`h-9 px-3 rounded-sm bg-primary text-primary-foreground text-label font-semibold hover:opacity-90 flex items-center gap-1 ${foco}`}>
                  <Send aria-hidden className="h-3.5 w-3.5" /> Enviar convite
                </button>
              </div>
            </div>
            <fieldset>
              <legend className="text-label font-medium text-foreground mb-1">O que essa pessoa pode fazer</legend>
              <div className="grid grid-cols-1 @xl:grid-cols-2 gap-2">
                {(["atendente", "estoquista"] as const).map(p => (
                  <label key={p} className={`flex items-start gap-2 p-2 rounded-md border cursor-pointer bg-card transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring ${papelConvite === p ? "border-primary" : "border-border"}`}>
                    <input type="radio" name={`${pre}-papel`} value={p} checked={papelConvite === p} onChange={() => setPapelConvite(p)} className="mt-1 accent-[var(--primary)]" />
                    <span>
                      <span className="block text-label font-semibold text-foreground">{papeis[p].rotulo}</span>
                      <span className="block text-caption text-muted-foreground leading-snug">{papeis[p].desc}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </form>
          </CardComCabecalho>
        )}

        <CardComCabecalho nivel={3} icone={<Users />} titulo="Pessoas com acesso" descricao={`Mostrando ${filtered.length} de ${pessoas.length} pessoas. Só a pessoa responsável muda plano e equipe.`}>
          <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar pessoa…"
              aria-label="Buscar pessoa por nome ou e-mail"
              className={`${campo} pl-8 py-1 text-label`}
            />
          </div>
          {/* Filtro por papel: controle segmentado do DS, em 2 colunas iguais no celular (nunca uma opção sozinha) */}
          <SegmentedControl
            aria-label="Filtrar por papel"
            size="sm"
            className="grid-flow-row grid-cols-2 [&>[data-slot=segmented-item]:nth-child(3)]:border-l-0 [&>[data-slot=segmented-item]:nth-child(n+3)]:border-t sm:grid-flow-col sm:grid-cols-none sm:[&>[data-slot=segmented-item]:nth-child(3)]:border-l sm:[&>[data-slot=segmented-item]:nth-child(n+3)]:border-t-0"
            value={filtro}
            onValueChange={v => setFiltro(v as typeof filtro)}
            options={(["todos", "responsavel", "atendente", "estoquista"] as const).map(f => ({ value: f, label: f === "todos" ? "Todos" : papeis[f].rotulo }))}
          />
          </div>

          <p role="status" className="sr-only">{aviso}</p>
        {aviso && (
          <div className="mb-4 flex items-center justify-between gap-2 rounded-md border border-success/30 bg-[var(--success-muted)] px-3 py-2 text-label text-foreground shrink-0">
            <span className="flex items-center gap-2"><CheckCircle aria-hidden className="h-3.5 w-3.5 text-success" /> {aviso}</span>
            <button type="button" onClick={() => setAviso("")} aria-label="Fechar aviso" className={`h-6 w-6 rounded-sm flex items-center justify-center text-muted-foreground hover:bg-accent ${foco}`}><X aria-hidden className="h-3.5 w-3.5" /></button>
          </div>
        )}

          {/* Tabela sem rolagem lateral: em cards estreitos, Situação e Último acesso ficam de fora (aviso abaixo).
              A linha entre as pessoas fica: separa as linhas da tabela. */}
          <table className="w-full">
            <caption className="sr-only">Pessoas com acesso ao painel da loja</caption>
            <thead>
              <tr>
                <th scope="col" className="text-left pr-2 pb-2 text-caption font-semibold uppercase tracking-[0.06em] text-muted-foreground">Pessoa</th>
                <th scope="col" className="hidden @md:table-cell text-left px-2 pb-2 text-caption font-semibold uppercase tracking-[0.06em] text-muted-foreground">Papel</th>
                <th scope="col" className="hidden @2xl:table-cell text-left px-2 pb-2 text-caption font-semibold uppercase tracking-[0.06em] text-muted-foreground">Situação</th>
                <th scope="col" className="hidden @3xl:table-cell text-left px-2 pb-2 text-caption font-semibold uppercase tracking-[0.06em] text-muted-foreground">Último acesso</th>
                <th scope="col" className="pl-2 pb-2"><span className="sr-only">Ações</span></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => {
                const dono = m.papel === "responsavel";
                return (
                  <tr key={m.email} className="border-t border-border hover:bg-row-hover transition-colors">
                    <td className="px-2 py-3 first:pl-0 last:pr-0">
                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 rounded-full bg-[var(--primary-muted)] flex items-center justify-center shrink-0" aria-hidden>
                          <span className={`text-caption font-bold ${textoMarca}`}>{m.iniciais}</span>
                        </div>
                        <div className="min-w-0">
                          <div className="text-body-sm font-medium text-foreground break-words">{m.nome}</div>
                          <div className="text-caption text-muted-foreground break-all">{m.email}</div>
                          {/* Card estreito: o papel vem embaixo do e-mail, em vez de uma coluna. */}
                          <div className="@md:hidden mt-1">
                            {editando === m.email ? (
                              <select
                                autoFocus
                                aria-label={`Papel de ${m.nome}`}
                                value={m.papel}
                                onChange={e => setPessoas(prev => prev.map(p => p.email === m.email ? { ...p, papel: e.target.value as Papel } : p))}
                                className={`${campo} py-1 text-label w-auto`}
                              >
                                <option value="atendente">Atendente</option>
                                <option value="estoquista">Estoquista</option>
                              </select>
                            ) : (
                              <span className={`inline-flex items-center px-2 py-1 rounded-full border text-caption font-semibold ${papeis[m.papel].cor}`}>{papeis[m.papel].rotulo}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden @md:table-cell px-2 py-3">
                      {editando === m.email ? (
                        <select
                          autoFocus
                          aria-label={`Papel de ${m.nome}`}
                          value={m.papel}
                          onChange={e => setPessoas(prev => prev.map(p => p.email === m.email ? { ...p, papel: e.target.value as Papel } : p))}
                          className={`${campo} py-1 text-label w-auto`}
                        >
                          <option value="atendente">Atendente</option>
                          <option value="estoquista">Estoquista</option>
                        </select>
                      ) : (
                        <span title={papeis[m.papel].desc} className={`inline-flex items-center px-2 py-1 rounded-full border text-caption font-semibold ${papeis[m.papel].cor}`}>
                          {papeis[m.papel].rotulo}
                        </span>
                      )}
                    </td>
                    <td className="hidden @2xl:table-cell px-2 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-caption font-medium border border-border bg-card text-foreground">
                        <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${situacoes[m.situacao].ponto}`} />
                        {situacoes[m.situacao].rotulo}
                      </span>
                    </td>
                    <td className="hidden @3xl:table-cell px-2 py-3 text-label text-muted-foreground whitespace-nowrap">{m.acesso}</td>
                    <td className="px-2 py-3 first:pl-0 last:pr-0">
                      {dono ? (
                        <span className="block text-right text-caption text-muted-foreground">Você</span>
                      ) : removendo === m.email ? (
                        <div className="flex flex-wrap items-center gap-1 justify-end">
                          <span className="text-caption text-foreground whitespace-nowrap">Remover acesso?</span>
                          <button type="button" autoFocus onClick={() => setRemovendo(null)} className={`h-6 px-2 rounded-sm border border-border bg-card text-caption text-foreground hover:bg-accent ${foco}`}>Cancelar</button>
                          <button
                            type="button"
                            onClick={() => { setPessoas(prev => prev.filter(p => p.email !== m.email)); setRemovendo(null); setAviso(`${m.nome} não tem mais acesso ao painel.`); }}
                            className={`h-6 px-2 rounded-sm bg-destructive text-[var(--destructive-foreground)] text-caption font-semibold hover:opacity-90 ${foco}`}
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
                            className={`h-6 w-6 rounded-sm flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground transition-colors ${foco}`}
                          >
                            {editando === m.email ? <Check aria-hidden className="h-3 w-3" /> : <Edit2 aria-hidden className="h-3 w-3" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => setRemovendo(m.email)}
                            aria-label={`Remover acesso de ${m.nome}`}
                            className={`h-6 w-6 rounded-sm flex items-center justify-center text-muted-foreground hover:bg-[var(--error-muted)] hover:text-error-text transition-colors ${foco}`}
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
              <p className="text-body-sm">
                {termo ? <>Ninguém da equipe encontrado para “<strong className="text-foreground">{search}</strong>”.</> : "Ninguém da equipe com esse papel."}
              </p>
            </div>
          )}
          <p className="mt-3 text-caption text-muted-foreground @2xl:hidden">Nesta largura, a situação e o último acesso ficam de fora. Abra numa tela maior para ver tudo.</p>
          <p className="mt-3 hidden text-caption text-muted-foreground @2xl:block @3xl:hidden">Nesta largura, o último acesso fica de fora. Abra numa tela maior para ver tudo.</p>
        </CardComCabecalho>
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
  reserva:  { icon: CalendarCheck,   cor: "bg-[var(--warning-muted)] text-warning-text",    rotulo: "Reserva" },
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
  const embutido = React.useContext(PainelEmbutido);
  const pre = `av${useId().replace(/:/g, "")}`;
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
      <div className={`space-y-5 ${embutido ? "" : "bg-muted p-4 @xl:p-6"}`}>
        <CabecalhoDaPagina
          nivel={2}
          titulo="Notificações"
          descricao={unread > 0 ? `${unread} ${unread === 1 ? "aviso não lido" : "avisos não lidos"} sobre a sua vitrine.` : "Tudo em dia. Nenhum aviso não lido."}
          acoes={
            <button
              type="button"
              disabled={unread === 0}
              onClick={() => setItems(prev => prev.map(n => ({ ...n, lida: true })))}
              className={`h-10 px-4 rounded-md border border-[var(--border-strong)] bg-card flex items-center gap-2 whitespace-nowrap text-body-sm font-medium text-foreground hover:bg-accent disabled:opacity-50 disabled:pointer-events-none ${foco}`}
            >
              <CheckCheck aria-hidden className="h-4 w-4" /> Marcar todas como lidas
            </button>
          }
          abas={
            <AbasComContador
              estilo="pagina"
              idBase={pre}
              rotulo="Mostrar"
              abas={[{ valor: "todas", rotulo: "Todas", quantidade: items.length }, { valor: "nao-lidas", rotulo: "Não lidas", quantidade: unread }]}
              valor={soNaoLidas ? "nao-lidas" : "todas"}
              onChange={v => setSoNaoLidas(v === "nao-lidas")}
            />
          }
        />
        <div id={`${pre}-painel`} role="tabpanel" aria-labelledby={`${pre}-aba-${soNaoLidas ? "nao-lidas" : "todas"}`}>
        <CardComCabecalho nivel={3} icone={<Bell />} titulo="Avisos da vitrine" descricao="Escolha um aviso para ver os detalhes e o que fazer.">
      {/* A linha entre a lista e o detalhe fica: separa as duas colunas; a das linhas separa os avisos da lista. */}
      <div className="flex h-[480px] overflow-hidden rounded-md border border-border">
        {/* Lista */}
        <div className={`${detalheMobile ? "hidden @xl:flex" : "flex"} w-full @xl:w-[290px] shrink-0 border-r border-border flex-col`}>
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
                      ${selected === n.id ? "bg-[var(--primary-suave)] border-l-2 border-l-primary" : "hover:bg-row-hover border-l-2 border-l-transparent"}`}
                  >
                    <div className={`h-7 w-7 rounded-sm flex items-center justify-center shrink-0 mt-1 ${tipo.cor}`}>
                      <Icon aria-hidden className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className={`block mb-1 text-label leading-tight truncate ${!n.lida ? "font-bold text-foreground" : "font-medium text-muted-foreground"}`}>
                        {!n.lida && <span className="sr-only">Não lida: </span>}
                        {n.titulo}
                      </span>
                      <p className="text-caption text-muted-foreground leading-tight line-clamp-2">{n.texto}</p>
                      <span className="text-caption text-muted-foreground">{n.quando}</span>
                    </div>
                    {/* Coluna própria para o ponto de não lida: o texto nunca passa por baixo dele (regra de 24/11/2026). */}
                    <span aria-hidden className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${!n.lida ? "bg-primary" : ""}`} />
                  </button>
                </li>
              );
            })}
            {lista.length === 0 && (
              <li className="flex flex-col items-center justify-center text-center py-12 px-6 text-muted-foreground">
                <CheckCheck aria-hidden className="h-6 w-6 mb-2 opacity-40" />
                <p className="text-label">Tudo em dia. Nenhuma notificação não lida.</p>
              </li>
            )}
          </ul>
        </div>

        {/* Detalhe */}
        <div className={`${detalheMobile ? "block" : "hidden @xl:block"} flex-1 min-w-0 overflow-y-auto`}>
          {atual ? (() => {
            const tipo = tiposAviso[atual.tipo];
            const Icon = tipo.icon;
            return (
              <div className="p-5 @xl:p-6">
                <button
                  type="button"
                  onClick={() => setDetalheMobile(false)}
                  className={`@xl:hidden mb-4 inline-flex items-center gap-1 text-label font-medium text-muted-foreground hover:text-foreground rounded-sm ${foco}`}
                >
                  <ChevronRight aria-hidden className="h-3.5 w-3.5 rotate-180" /> Voltar para a lista
                </button>
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`h-10 w-10 rounded-md flex items-center justify-center shrink-0 ${tipo.cor}`}>
                      <Icon aria-hidden className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-body font-semibold text-foreground">{atual.titulo}</h2>
                      <span className="text-label text-muted-foreground">{tipo.rotulo} · {atual.quando}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setSelected(null); setDetalheMobile(false); }}
                    aria-label="Fechar notificação"
                    className={`h-7 w-7 rounded-sm flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors shrink-0 ${foco}`}
                  >
                    <X aria-hidden className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-body-sm text-foreground leading-relaxed mb-3">{atual.texto}</p>
                <p className="text-label text-muted-foreground leading-relaxed mb-6 flex items-start gap-1">
                  <ShieldCheck aria-hidden className="h-3.5 w-3.5 shrink-0 mt-1" />
                  A FindLook mostra o que aconteceu sem nome nem contato de quem fez a busca ou salvou a peça.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button type="button" className={`h-8 px-4 rounded-sm bg-primary text-primary-foreground text-label font-semibold hover:opacity-90 transition-opacity ${foco}`}>
                    {atual.acao}
                  </button>
                  <button
                    type="button"
                    onClick={() => marcar(atual.id, !atual.lida)}
                    className={`h-8 px-4 rounded-sm border border-border bg-card text-label font-medium text-foreground hover:bg-accent transition-colors inline-flex items-center gap-1 ${foco}`}
                  >
                    {atual.lida ? <><Mail aria-hidden className="h-3.5 w-3.5" /> Marcar como não lida</> : <><MailOpen aria-hidden className="h-3.5 w-3.5" /> Marcar como lida</>}
                  </button>
                </div>
              </div>
            );
          })() : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground px-6 text-center">
              <Inbox aria-hidden className="h-8 w-8 mb-2 opacity-30" />
              <p className="text-body-sm">Escolha uma notificação para ver os detalhes.</p>
            </div>
          )}
        </div>
      </div>
        </CardComCabecalho>
        </div>
      </div>
    </TemplateFrame>
  );
}


/* ─────────────────────────────────────────────
   6. Pricing / Plans Template
───────────────────────────────────────────── */
/* Recursos e planos de exemplo: em shared/planos.ts (também usados no cadastro em etapas, Padrões do produto). */

/* Controle só da demonstração: liga e desliga o bloco opcional "Para quem" nos cards de preço */
function ChaveParaQuem({ ligado, onChange }: { ligado: boolean; onChange: (v: boolean) => void }) {
  const { t } = useI18n();
  return (
    <div className="mb-4 flex items-center gap-2">
      <Switch checked={ligado} onCheckedChange={onChange} aria-labelledby="rotulo-chave-para-quem" />
      <span id="rotulo-chave-para-quem" className="text-body-sm font-medium text-foreground">Página Planos e assinatura: mostrar “Para quem”</span>
    </div>
  );
}

function PrototipoComControles() {
  const [mostrarParaQuem, setMostrarParaQuem] = useState(true);
  return (
    <>
      <ChaveParaQuem ligado={mostrarParaQuem} onChange={setMostrarParaQuem} />
      <PrototipoDoPainel paginas={{
        perfil: <SettingsTemplate />,
        configuracoes: <SettingsTemplate abaInicial="notificacoes" />,
        equipe: <TeamTemplate />,
        planos: <PricingTemplate mostrarParaQuem={mostrarParaQuem} />,
        notificacoes: <InboxTemplate />,
        ajuda: <ContactTemplate />,
      }} />
    </>
  );
}

function PricingTemplate({ mostrarParaQuem = true }: { mostrarParaQuem?: boolean }) {
  const { t, bi } = useI18n();
  const embutido = React.useContext(PainelEmbutido);
  const [annual, setAnnual] = useState(false);
  const [selecionado, setSelecionado] = useState<string | null>(null);
  // Lista de recursos começa recolhida; abrir ou fechar vale para todos os cards, que ficam sempre alinhados
  const [recursosAbertos, setRecursosAbertos] = useState(false);

  return (
    <TemplateFrame>
      {/* Opção A (23/11/2026): título, descrição e a escolha mensal/anual fora de card; os planos são os cards. */}
      <div className={`space-y-5 ${embutido ? "" : "bg-muted p-4 sm:p-6"}`}>
        <CabecalhoDaPagina
          nivel={2}
          titulo={t("Plans & Pricing", "Planos e assinatura")}
          descricao={t("Choose the plan that fits your store. Change whenever you need.", "Escolha o plano que combina com a sua loja. Troque quando precisar.")}
          acoes={
          <SegmentedControl
            aria-label={t("Billing", "Cobrança")}
            value={annual ? "anual" : "mensal"}
            onValueChange={v => setAnnual(v === "anual")}
            options={[
              { value: "mensal", label: t("Monthly", "Mensal") },
              { value: "anual", label: <>{t("Yearly", "Anual")} <span className="ml-1 rounded-full bg-success/10 px-2 py-1 text-caption font-bold text-success-text">-20%</span></> },
            ]}
          />
          }
        />

        {/* Colunas pela largura disponível (não pela tela): dentro do protótipo do painel, os 3 cards só ficam lado a lado se couberem */}
        <div className="@container/precos">
        <GradeDeCards className="@4xl/precos:grid-cols-3 gap-5 max-w-md @4xl/precos:max-w-none">
          {plans.map(plan => {
            const Icon = plan.icon;
            const valor = annual ? Math.round(plan.price * 0.8) : plan.price;
            return (
              <CardDePreco
                key={plan.id}
                valor={plan.id}
                nome={bi(plan.name)}
                descricao={bi(plan.desc)}
                icone={<Icon aria-hidden />}
                destaque={plan.highlight}
                paraQuem={mostrarParaQuem && plan.forWhom ? bi(plan.forWhom) : undefined}
                recursos={pricingFeatures.map((f, i) => ({ texto: bi(f), incluido: i < plan.included }))}
                recursosAbertos={recursosAbertos}
                onRecursosAbertosChange={setRecursosAbertos}
                preco={`R$ ${valor}`}
                periodo={t("/ month", "/ mês")}
                selecionado={selecionado === plan.id}
                onSelecionar={() => setSelecionado(plan.id)}
                textos={{
                  recomendado: t("Recommended", "Recomendado"),
                  paraQuem: t("Who it's for:", "Para quem:"),
                  verRecursos: t("Show plan features", "Ver recursos do plano"),
                  ocultarRecursos: t("Hide plan features", "Ocultar recursos do plano"),
                  contagem: (i, total) => t(`${i} of ${total}`, `${i} de ${total}`),
                  incluido: t("Included: ", "Incluído: "),
                  naoIncluido: t("Not included: ", "Não incluído: "),
                  selecionar: t("Select Plan", "Selecionar Plano"),
                  selecionado: t("Plan selected", "Plano selecionado"),
                }}
              />
            );
          })}
        </GradeDeCards>
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
  const embutido = React.useContext(PainelEmbutido);
  const uid = useId();
  const pre = `sup${uid.replace(/:/g, "")}`;
  const [sent, setSent] = useState(false);
  const [subject, setSubject] = useState(assuntosSuporte[0]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  // Opção A (23/11/2026): cabeçalho fora do card; mensagem, canais e guias em cards com cabeçalho de ícone.
  return (
    <TemplateFrame url="Painel da loja · Suporte">
      <div className={`space-y-5 ${embutido ? "" : "bg-muted p-4 sm:p-6"}`}>
        <CabecalhoDaPagina
          nivel={2}
          titulo="Ajuda e suporte"
          descricao="Ajuda para lojas parceiras: cadastro de peças, planilhas, fotos, equipe, plano e pagamento."
        />
        <div className="@container">
          <div className="grid items-start gap-4 @4xl:grid-cols-[minmax(0,1fr)_20rem]">
            <CardComCabecalho nivel={3} icone={<Send />} titulo="Nova mensagem para o suporte" descricao="Conte o que aconteceu. Quanto mais detalhes, mais rápido conseguimos ajudar.">
          {sent ? (
            <div role="status" className="flex flex-col items-center justify-center py-10 text-center">
              <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <CheckCircle aria-hidden className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-subtitle font-bold text-foreground mb-2">Recebemos sua mensagem</h3>
              <p className="text-body-sm text-muted-foreground max-w-xs mb-6">
                Vamos responder em até 1 dia útil no e-mail informado. Assunto: {subject.toLowerCase()}.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className={`h-9 px-5 rounded-md border border-border bg-card text-body-sm font-medium text-foreground hover:bg-accent transition-colors ${foco}`}
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-4 max-w-xl">

              <div className="grid grid-cols-1 @lg:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={`${pre}-nome`} className="block text-label font-medium text-foreground mb-1">Seu nome</label>
                  <div className="relative">
                    <User aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                    <input id={`${pre}-nome`} required type="text" autoComplete="name" defaultValue="Ana Oliveira" className={`${campo} pl-8`} />
                  </div>
                </div>
                <div>
                  <label htmlFor={`${pre}-email`} className="block text-label font-medium text-foreground mb-1">E-mail para resposta</label>
                  <div className="relative">
                    <AtSign aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                    <input id={`${pre}-email`} required type="email" autoComplete="email" defaultValue="ana@atelieaurora.com.br" className={`${campo} pl-8`} />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor={`${pre}-loja`} className="block text-label font-medium text-foreground mb-1">Loja</label>
                <div className="relative">
                  <Store aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                  <input id={`${pre}-loja`} type="text" autoComplete="organization" defaultValue="Ateliê Aurora" className={`${campo} pl-8`} />
                </div>
              </div>

              <div>
                <label htmlFor={`${pre}-assunto`} className="block text-label font-medium text-foreground mb-1">Assunto</label>
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
                <label htmlFor={`${pre}-msg`} className="block text-label font-medium text-foreground mb-1">Mensagem</label>
                <textarea
                  id={`${pre}-msg`}
                  required
                  rows={4}
                  aria-describedby={`${pre}-msg-dica`}
                  placeholder="Ex.: importei a planilha, mas 3 peças ficaram sem foto."
                  className={`${campo} resize-none`}
                />
                <p id={`${pre}-msg-dica`} className="mt-1 text-caption text-muted-foreground">Não envie senhas nem dados de cartão por aqui.</p>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox id={`${pre}-whats`} />
                <label htmlFor={`${pre}-whats`} className="text-caption text-muted-foreground leading-snug cursor-pointer">
                  Pode me responder também pelo WhatsApp da loja.
                </label>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox id={`${pre}-consent`} required />
                <label htmlFor={`${pre}-consent`} className="text-caption text-muted-foreground leading-snug cursor-pointer">
                  Concordo com os <span className={`underline underline-offset-2 ${textoMarca}`}>Termos de uso</span> e a <span className={`underline underline-offset-2 ${textoMarca}`}>Política de privacidade</span>.
                </label>
              </div>

              <button
                type="submit"
                className={`w-full h-10 rounded-md bg-primary text-primary-foreground text-body-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 ${foco}`}
              >
                <Send aria-hidden className="h-4 w-4" />
                Enviar mensagem
              </button>
            </form>
          )}
            </CardComCabecalho>
            <div className="space-y-4">
              <CardComCabecalho nivel={3} icone={<LifeBuoy />} titulo="Canais de atendimento" descricao="Escolha o jeito mais fácil para você.">
          <ul className="divide-y divide-border">
            {canaisSuporte.map(ch => {
              const Icon = ch.icon;
              return (
                <li key={ch.rotulo} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <div className={`h-8 w-8 rounded-sm flex items-center justify-center shrink-0 ${ch.cor}`}>
                    <Icon aria-hidden className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-caption text-muted-foreground">{ch.rotulo}</div>
                    <div className="text-label font-semibold text-foreground truncate">{ch.valor}</div>
                    <div className="text-caption text-muted-foreground">{ch.desc}</div>
                  </div>
                </li>
              );
            })}
          </ul>
              </CardComCabecalho>
              <CardComCabecalho nivel={3} icone={<BookOpen />} titulo="Antes de escrever" descricao="Veja se um destes guias resolve.">
            <ul className="space-y-1">
              {guiasRapidos.map(g => (
                <li key={g}>
                  <button type="button" className={`w-full flex items-center justify-between gap-2 text-left text-body-sm text-muted-foreground hover:text-foreground py-1 rounded-sm ${foco}`}>
                    {g} <ChevronRight aria-hidden className="h-3 w-3 shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
              </CardComCabecalho>
            </div>
          </div>
        </div>
      </div>
    </TemplateFrame>
  );
}

/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */
/* Botões flutuantes no celular: página rolada até o fim, com a barra de ação e o Voltar ao topo (27/11/2026). */
function DemoBotoesFlutuantes() {
  const { t } = useI18n();
  const rolagem = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = rolagem.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);
  return (
    <MolduraCelular rotulo={t("Phone demo: end of a page with the action bar and Back to top", "Demonstração no celular: fim de uma página com a barra de ação e o Voltar ao topo")}>
      {() => (
        <>
          <div ref={rolagem} data-cards-ignorar data-gc-ignorar className="h-full overflow-y-auto">
            <div data-topo tabIndex={-1} className="outline-none">
              <ConteudoFalso titulo="Diga o que procura. A gente mostra onde encontrar." texto={t("Home page content (example).", "Conteúdo da página inicial (exemplo).")} />
            </div>
            <ConteudoFalso titulo={t("Local stores", "Lojas locais")} texto={t("More page content (example).", "Mais conteúdo da página (exemplo).")} />
            <footer className="mt-6 border-t border-border px-5 py-6 text-label leading-relaxed text-muted-foreground">
              <p className="font-semibold text-foreground">Seu estilo por perto.</p>
              <p className="mt-1">Privacidade · Termos de uso</p>
              <p className="mt-1">Desenvolvido por Dani Moscatelli • Experience Design Studio</p>
            </footer>
            <BarraFixaDoCelular icone={<Search />} somenteCelular={false}>{t("Find pieces", "Encontrar peças")}</BarraFixaDoCelular>
          </div>
          <VoltarAoTopo rolagem={rolagem} focoEm="[data-topo]" />
        </>
      )}
    </MolduraCelular>
  );
}

export function TemplatesShowcase() {
  const { t, bi } = useI18n();
  return (
    <div className="space-y-16">
      <div className="mb-2">
        <h2 className="text-h3 font-semibold tracking-[-0.02em] text-foreground mb-1">Templates</h2>
        <p className="text-body text-muted-foreground">
          Telas prontas do painel da loja e das páginas da FindLook, montadas com os componentes do design system.
        </p>
      </div>

      {/* Painel da loja (protótipo) */}
      <section id="template-dashboard">
        <TemplateLabel icon={LayoutDashboard} label="Painel da loja: protótipo navegável" />
        <p className="-mt-2 mb-4 max-w-2xl text-body-sm leading-relaxed text-muted-foreground">Uma janela só, com rolagem própria. Use o menu lateral, a busca, o sino e o menu da conta para trocar de página, como no painel de verdade. Em telas largas, o botão Recolher menu, no pé do menu, deixa só os ícones (com tooltip) e a escolha fica guardada. O cabeçalho é branco, igual ao menu, com linha fina embaixo, e o perfil fica sempre nele, à direita. Em telas estreitas, o menu abre como gaveta dentro da janela, sempre expandido.</p>
        <PrototipoComControles />
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

      {/* 9 — Botões flutuantes (padrão de 16/11/2026) */}
      <section id="template-flutuantes" className="space-y-5">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-h3 font-semibold tracking-[-0.02em] text-foreground">{t("Floating buttons", "Botões flutuantes")}</h2>
          <p className="text-body-sm text-muted-foreground mt-1 max-w-2xl">
            {t(
              "The landing pages have up to two buttons fixed on the screen: the phone action bar (for example, Find pieces or Register my store) and Back to top. Rules so that one never covers the other or the footer.",
              "As landing pages têm até dois botões fixos na tela: a barra de ação do celular (por exemplo, Encontrar peças ou Cadastrar minha loja) e o Voltar ao topo. Regras para um nunca cobrir o outro nem o rodapé.",
            )}
          </p>
        </div>
        <Callout title={t("Back to top", "Voltar ao topo")}>
          {t(
            "Component VoltarAoTopo (ui/voltar-ao-topo.tsx): round secondary button, 48 px: white surface, border, arrow in the brand text colour and the floating shadow (--shadow-lg). It is secondary on purpose: next to the filled phone action bar, only the main action is filled. Bottom right corner (16 px on the phone, 24 px from 640 px). It only appears at the end of the page and goes back to the top; with reduced motion the return is instant; focus goes to the main content. When the page has a phone action bar, it rises on its own to sit just above it, 12 px away, counting the device safe area.",
            "Componente VoltarAoTopo (ui/voltar-ao-topo.tsx): botão redondo secundário, 48 px: superfície branca, borda, seta na cor de texto da marca e a sombra dos elementos que flutuam (--shadow-lg). É secundário de propósito: ao lado da barra de ação do celular, que é preenchida, só a ação principal fica cheia. Fica no canto inferior direito (16 px no celular, 24 px a partir de 640 px). Só aparece no fim da página e volta ao topo; com menos movimento a volta é instantânea; o foco vai para o conteúdo principal. Quando a página tem a barra de ação do celular, ele sobe sozinho para ficar logo acima dela, a 12 px, contando a área segura do aparelho.",
          )}
        </Callout>
        <Callout title={t("Phone action bar", "Barra de ação do celular")}>
          {t(
            "Component BarraFixaDoCelular (ui/barra-fixa-celular.tsx): filled 56 px pill, fixed at the bottom of the screen, that opens a drawer. It reserves the space it needs by itself, where it is placed: its height plus the device safe area (96 px on a device without one), or 160 px when the page also has Back to top. Place it at the end of the page, after the footer, and nothing at the end of the page is hidden behind it. The space stays while the drawer is open, so the page does not jump. If the bar has to sit elsewhere, use reservarEspaco={false} and put EspacoDaBarraFixa at the end of the page.",
            "Componente BarraFixaDoCelular (ui/barra-fixa-celular.tsx): pílula preenchida de 56 px, presa na base da tela, que abre uma gaveta. Ela reserva sozinha o espaço de que precisa, no lugar onde é colocada: a altura dela mais a área segura do aparelho (96 px num aparelho sem área segura), ou 160 px quando a página também tem o Voltar ao topo. Coloque a barra no fim da página, depois do rodapé, e nada do fim da página fica escondido atrás dela. O espaço continua lá enquanto a gaveta está aberta, para a página não pular. Se a barra precisar ficar em outro lugar, use reservarEspaco={false} e ponha o EspacoDaBarraFixa no fim da página.",
          )}
        </Callout>
        <div className="space-y-3">
          <p className="text-body-sm font-semibold text-foreground">{t("Try it: end of the page on the phone", "Experimente: fim da página no celular")}</p>
          <DemoBotoesFlutuantes />
          <p className="mx-auto max-w-[360px] text-label leading-relaxed text-muted-foreground">{t("The demo starts at the end of the page. Back to top sits above the bar, and the last line of the footer stays visible above both. Tap Back to top to go up.", "A demonstração começa no fim da página. O Voltar ao topo fica acima da barra, e a última linha do rodapé continua visível acima dos dois. Toque no Voltar ao topo para subir.")}</p>
        </div>
        <DoDont
          dos={[
            t("Place the phone action bar at the end of the page, after the footer: it reserves its own space.", "Coloque a barra de ação do celular no fim da página, depois do rodapé: ela reserva o próprio espaço."),
            t("Keep Back to top secondary (white, with border): the filled button is the bar.", "Mantenha o Voltar ao topo secundário (branco, com borda): o botão preenchido é a barra."),
            t("Keep the layer order: fixed bar and Back to top at z-40, menus and drawers above them.", "Mantenha a ordem das camadas: barra fixa e Voltar ao topo em z-40, menus e gavetas acima deles."),
          ]}
          donts={[
            t("Do not place Back to top over the phone action bar.", "Não coloque o Voltar ao topo por cima da barra de ação do celular."),
            t("Do not let the last line of the footer end under a floating button.", "Não deixe a última linha do rodapé terminar embaixo de um botão flutuante."),
            t("Do not show Back to top at the top or in the middle of the page.", "Não mostre o Voltar ao topo no topo ou no meio da página."),
          ]}
        />
        <TokenTable groups={[{
          group: t("Floating buttons", "Botões flutuantes"),
          tokens: [
            { name: "VoltarAoTopo", description: t("Size / corner (phone · 640 px+)", "Tamanho / canto (celular · 640 px+)"), light: "48 px · 16 px · 24 px" },
            { name: "VoltarAoTopo", description: t("Surface / border / icon / shadow", "Superfície / borda / ícone / sombra"), light: "--card · --border-strong · --primary-text · --shadow-lg" },
            { name: t("Above the bar", "Acima da barra"), description: t("Distance from the bottom when the page has the bar (automatic)", "Distância da base quando a página tem a barra (automática)"), light: "84 px + área segura além de 16 px" },
            { name: t("End of page (automatic)", "Fim da página (automático)"), description: t("Space reserved by the bar: with Back to top / only the bar", "Espaço reservado pela barra: com Voltar ao topo / só a barra"), light: "160 px / 96 px (+ área segura)" },
            { name: "z-index", description: t("Fixed bar and Back to top", "Barra fixa e Voltar ao topo"), light: "z-40" },
          ],
        }]} />
      </section>

      {/* ── Tokens ── */}
      <section id="templates-tokens" className="space-y-5">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-h3 font-semibold tracking-[-0.02em] text-foreground">Tokens</h2>
          <p className="text-body-sm text-muted-foreground mt-1">{t("Core CSS custom properties shared across all templates.", "Propriedades CSS personalizadas principais compartilhadas por todos os templates.")}</p>
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
      { name: "--sidebar-primary",           description: t("Active nav item", "Item de navegação ativo"),               light: "#E8004E",              dark: "#E8004E",              isColor: true },
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
      { name: "--primary",            description: t("Primary CTA button / link", "Botão / link CTA primário"),  light: "#E8004E", dark: "#E8004E", isColor: true },
      { name: "--primary-foreground", description: t("Text on CTA", "Texto sobre o CTA"),               light: "#FFFFFF", dark: "#FFFFFF", isColor: true },
      { name: "--primary-muted",      description: t("Tinted CTA zone", "Área de CTA com tom"),           light: "#FEDFE6", dark: "rgba(252,2,86,0.16)", isColor: true },
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
  const rolagemRef = useRef<HTMLDivElement>(null);

  return (
    <TemplateFrame url="FindLook · Para lojas">
      <div ref={rolagemRef} className="bg-background overflow-y-auto" style={{ maxHeight: 720 }}>

        {/* ══ NAVBAR ══ */}
        <nav aria-label="Página para lojas" className="sticky top-0 z-20 bg-background/90 backdrop-blur-xl border-b border-border px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <MarcaFindLook legenda="para lojas" />
          <div className="hidden md:flex items-center gap-4">
            {["Como funciona", "Benefícios", "Planos", "Dúvidas"].map(item => (
              <button key={item} type="button" className={`text-label font-medium text-muted-foreground hover:text-foreground transition-colors rounded-sm ${foco}`}>{item}</button>
            ))}
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button type="button" className={`h-8 px-2 sm:px-3 text-label font-medium text-muted-foreground hover:text-foreground transition-colors rounded-sm ${foco}`}>Entrar</button>
            <button type="button" className={`h-8 px-2 sm:px-3 rounded-sm bg-primary text-primary-foreground text-label font-semibold hover:bg-[var(--primary-hover)] transition-colors whitespace-nowrap ${foco}`}>
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
            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border border-primary/25 bg-[var(--primary-suave)] text-caption font-semibold mb-5 ${textoMarca}`}>
              <Store aria-hidden className="h-3 w-3" /> Para lojas e brechós da sua cidade
            </div>
            <h1 className="text-h2 sm:text-display-md font-black text-foreground tracking-[-0.04em] leading-[1.1] mb-4">
              Sua loja encontrada<br />
              <span className={textoMarca}>por quem já procura</span><br />
              o que você vende
            </h1>
            <p className="text-body text-muted-foreground max-w-lg mx-auto leading-relaxed mb-8">
              Publique suas peças na FindLook e apareça para pessoas da região que buscam por foto ou descrição. O contato é direto com a sua loja, pelo WhatsApp.
            </p>
            <div className="flex items-center justify-center gap-3 mb-5">
              {subscribed ? (
                <div role="status" className="flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--success-muted)] border border-success/30 text-foreground text-body-sm font-medium">
                  <CheckCircle aria-hidden className="h-4 w-4 text-success" /> Pronto! Enviamos para o seu e-mail um link para continuar o cadastro.
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); if (email) setSubscribed(true); }} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                  <div className="relative flex-1">
                    <label htmlFor={`${pre}-hero-email`} className="sr-only">E-mail da loja</label>
                    <Mail aria-hidden className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                    <input id={`${pre}-hero-email`} type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail da loja"
                      className={`${campo} bg-card rounded-sm pl-9 py-2`} />
                  </div>
                  <button type="submit" className={`h-10 px-4 rounded-sm bg-primary text-primary-foreground text-body-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap flex items-center justify-center gap-1 ${foco}`}>
                    <Store aria-hidden className="h-3.5 w-3.5" /> Cadastrar minha loja
                  </button>
                </form>
              )}
            </div>
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-caption text-muted-foreground">
              {["Contato direto com quem procura", `Planos a partir de ${reais(79)} por mês`, "Troque de plano quando precisar"].map(item => (
                <li key={item} className="flex items-center gap-1"><Check aria-hidden className="h-3 w-3 text-success" />{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* ══ FATOS ══ */}
        <div className="border-y border-border bg-card/50 px-4 sm:px-6 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 sm:divide-x divide-border max-w-2xl mx-auto">
            {fatosLanding.map(s => (
              <div key={s.rotulo} className="text-center px-3">
                <div className="text-subtitle font-black text-foreground tracking-tight">{s.valor}</div>
                <div className="text-caption text-muted-foreground">{s.rotulo}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ PRÉVIA DO PAINEL ══ */}
        <div className="px-4 sm:px-6 py-10">
          <div className="text-center mb-6">
            <p className={`text-caption font-semibold uppercase tracking-[0.1em] mb-1 ${textoMarca}`}>Painel da loja</p>
            <h2 className="text-h4 font-black text-foreground tracking-tight">Tudo o que a sua loja precisa, em um só lugar</h2>
            <p className="text-label text-muted-foreground mt-1">Exemplo ilustrativo com dados fictícios.</p>
          </div>
          <div className="max-w-2xl mx-auto rounded-lg border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-xl)" }}>
            <div className="h-8 bg-muted/60 border-b border-border flex items-center px-4 gap-2 shrink-0" aria-hidden>
              <div className="flex gap-1"><div className="h-2 w-2 rounded-full bg-primary/50" /><div className="h-2 w-2 rounded-full bg-warning/50" /><div className="h-2 w-2 rounded-full bg-success/50" /></div>
              <div className="flex-1 mx-6"><div className="h-4 bg-background/60 rounded-sm max-w-[200px] mx-auto flex items-center px-2"><span className="text-caption text-muted-foreground/70">Painel da loja · FindLook</span></div></div>
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
                  <div key={k.label} className="rounded-sm border border-border bg-background p-2">
                    <div className="text-caption text-muted-foreground mb-1">{k.label}</div>
                    <div className="text-body font-black text-foreground leading-none">{k.value}</div>
                    <div className="text-caption flex items-center gap-1 mt-1 font-medium text-muted-foreground">
                      <TrendingUp aria-hidden className="h-2.5 w-2.5 text-success" />
                      <span className="text-foreground">{k.delta}</span>&nbsp;no mês
                    </div>
                  </div>
                ))}
              </div>
              {/* Gráfico */}
              <div className="rounded-sm border border-border bg-background p-3 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-caption font-semibold text-foreground">Visualizações das peças — últimos 12 meses</span>
                  <span className="text-caption px-1 py-1 rounded-full bg-[var(--success-muted)] text-foreground font-semibold">+12%</span>
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
              <div className="@container/pecas rounded-sm border border-border bg-background overflow-hidden">
                <div className="px-3 py-1 border-b border-border text-caption font-semibold text-foreground">Peças mais vistas<span className="font-normal text-muted-foreground @md/pecas:hidden"> · no celular, só peça e situação</span></div>
                <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)] @md/pecas:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.9fr)] gap-2 border-b border-border bg-muted/40 px-3 py-1">
                  {["Peça", "Categoria", "Visualizações", "Situação"].map(h => (
                    <div key={h} className={`text-caption font-semibold uppercase tracking-wide text-muted-foreground ${h === "Categoria" || h === "Visualizações" ? "hidden @md/pecas:block" : ""}`}>{h}</div>
                  ))}
                </div>
                {pecasMaisVistas.map(r => (
                  <div key={r.nome} className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)] @md/pecas:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.9fr)] gap-2 px-3 py-2 border-b border-border last:border-0 items-center">
                    <div className="text-caption font-medium text-foreground flex items-center gap-1 min-w-0">
                      <IconeModa nome={r.icone} size={12} className="text-muted-foreground" />
                      <span className="truncate">{r.nome}</span>
                    </div>
                    <div className="hidden text-caption text-muted-foreground truncate @md/pecas:block">{r.categoria}</div>
                    <div className="hidden text-caption font-semibold text-foreground @md/pecas:block">{r.vistas.toLocaleString("pt-BR")}</div>
                    <div className="text-caption font-medium text-foreground flex items-center gap-1">
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
            <p className={`text-caption font-semibold uppercase tracking-[0.1em] mb-1 ${textoMarca}`}>Benefícios</p>
            <h2 className="text-h4 font-black text-foreground tracking-tight">Feito para lojas de rua, ateliês e brechós</h2>
          </div>
          <GradeDeCards className="max-w-2xl mx-auto sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 rounded-lg border border-border bg-card p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary/8 blur-2xl pointer-events-none" />
              <div className="h-8 w-8 rounded-md bg-[var(--primary-muted)] flex items-center justify-center mb-3">
                <Search aria-hidden className={`h-4 w-4 ${textoMarca}`} />
              </div>
              <h3 className="text-body-sm font-bold text-foreground mb-1">Apareça na busca certa</h3>
              <p className="text-label text-muted-foreground leading-snug mb-3">Quem procura por foto ou descrição encontra as suas peças pelo estilo, pelo tamanho e pela região.</p>
              <div className="flex flex-wrap gap-2">
                {["Busca por foto", "Busca por descrição", "Perto de quem procura"].map(chip => (
                  <span key={chip} className={`text-caption px-2 py-1 rounded-full bg-[var(--primary-suave)] font-medium border border-primary/15 ${textoMarca}`}>{chip}</span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 flex flex-col justify-between">
              <MessageCircle aria-hidden className="h-5 w-5 text-success mb-2" />
              <div>
                <h3 className="text-body-sm font-bold text-foreground mb-1">Contato direto</h3>
                <p className="text-caption text-muted-foreground">A pessoa chama a loja no WhatsApp. A venda é sua.</p>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 flex flex-col justify-between">
              <FileSpreadsheet aria-hidden className="h-5 w-5 text-info mb-2" />
              <div>
                <h3 className="text-body-sm font-bold text-foreground mb-1">Planilha ou uma a uma</h3>
                <p className="text-caption text-muted-foreground">Cadastre peças pelo painel ou importe várias de uma vez.</p>
              </div>
            </div>
            <div className="sm:col-span-2 rounded-lg border border-border bg-card p-5 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-info/6 blur-2xl pointer-events-none" />
              <div className="h-8 w-8 rounded-md bg-[var(--info-muted)] flex items-center justify-center mb-3">
                <BarChart aria-hidden className="h-4 w-4 text-info" />
              </div>
              <h3 className="text-body-sm font-bold text-foreground mb-1">Entenda o interesse pelas suas peças</h3>
              <p className="text-label text-muted-foreground leading-snug mb-3">Veja quais peças são mais vistas, favoritadas e procuradas na sua região. Nos planos Desempenho e Oportunidades.</p>
              <div className="flex flex-wrap gap-2">
                {["Favoritos", "Reservas", "Contatos", "Buscas compatíveis"].map(chip => (
                  <span key={chip} className="text-caption px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium border border-border">{chip}</span>
                ))}
              </div>
            </div>
          </GradeDeCards>
        </div>

        {/* ══ INTERESSE MÊS A MÊS ══ */}
        <div className="px-4 sm:px-6 py-10">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
              <div>
                <p className={`text-caption font-semibold uppercase tracking-[0.1em] mb-1 ${textoMarca}`}>Acompanhamento</p>
                <h2 className="text-subtitle font-black text-foreground tracking-tight">Acompanhe o interesse, mês a mês</h2>
              </div>
              <div className="flex gap-3 text-caption text-muted-foreground">
                <span className="flex items-center gap-1"><span aria-hidden className="h-2 w-2 rounded-full bg-primary inline-block" />Buscas compatíveis com as suas peças (exemplo)</span>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-5">
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
            <p className={`text-caption font-semibold uppercase tracking-[0.1em] mb-1 ${textoMarca}`}>Como funciona</p>
            <h2 className="text-h4 font-black text-foreground tracking-tight">Do cadastro ao primeiro contato</h2>
          </div>
          {/* Linha do tempo do DS (antes, montada à mão): um passo por card, com o número no marcador */}
          <Timeline
            alternar={false}
            className="max-w-lg mx-auto"
            etapas={passosLanding.map((item, i) => ({ titulo: item.titulo, descricao: item.desc, icone: <span className="text-body-sm font-bold">{i + 1}</span> }))}
          />
        </div>

        {/* ══ COMPARATIVO DE PLANOS ══ */}
        <div className="px-4 sm:px-6 py-10">
          <div className="text-center mb-7">
            <p className={`text-caption font-semibold uppercase tracking-[0.1em] mb-1 ${textoMarca}`}>Planos</p>
            <h2 className="text-h4 font-black text-foreground tracking-tight">Compare e escolha o plano da sua loja</h2>
          </div>
          {/* Celular: um card por plano, um embaixo do outro (card nunca tem rolagem horizontal). */}
          <ul className="sm:hidden max-w-md mx-auto space-y-3" aria-label="Planos">
            {plans.map(p => (
              <li key={p.id} className={`rounded-lg border p-4 ${p.highlight ? "border-primary/40 bg-[var(--primary-muted)]" : "border-border bg-card"}`} style={{ boxShadow: "var(--shadow-sm)" }}>
                {p.highlight && <span className="block mb-1 text-caption font-bold uppercase tracking-wide text-[color:color-mix(in_oklab,var(--muted-foreground)_85%,var(--foreground))]">Recomendado</span>}
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className={`text-body font-bold ${p.highlight ? textoMarca : "text-foreground"}`}>{p.name.pt}</h3>
                  <span className={`text-label ${p.highlight ? "text-[color:color-mix(in_oklab,var(--muted-foreground)_85%,var(--foreground))]" : "text-muted-foreground"}`}>{reais(p.price)}/mês</span>
                </div>
                <ul className="mt-3 space-y-1">
                  {pricingFeatures.map((f, i) => {
                    const inclui = i < p.included;
                    return (
                      <li key={f.pt} className={`flex items-start gap-2 text-label ${inclui ? "text-foreground" : p.highlight ? "text-[color:color-mix(in_oklab,var(--muted-foreground)_85%,var(--foreground))]" : "text-muted-foreground"}`}>
                        {inclui ? <Check aria-hidden className={`mt-1 h-3.5 w-3.5 shrink-0 ${textoMarca}`} /> : <Minus aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0" />}
                        <span>{f.pt}<span className="sr-only">{inclui ? ": incluído" : ": não incluído"}</span></span>
                      </li>
                    );
                  })}
                </ul>
                <button
                  type="button"
                  aria-label={`Escolher o plano ${p.name.pt}`}
                  className={`mt-4 h-9 w-full rounded-sm text-label font-semibold transition-colors ${foco} ${p.highlight ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border bg-card text-foreground hover:bg-accent"}`}
                >
                  Escolher
                </button>
              </li>
            ))}
          </ul>
          {/* Do tablet em diante: tabela comparativa, que cabe na largura (sem rolagem horizontal). */}
          <div className="relative hidden sm:block max-w-2xl mx-auto rounded-lg border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-md)" }}>
            <table className="w-full border-collapse">
              <caption className="sr-only">Comparativo dos planos Visibilidade, Desempenho e Oportunidades</caption>
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th scope="col" className="px-4 py-3 text-left text-caption font-semibold text-muted-foreground">Recurso</th>
                  {plans.map(p => (
                    <th key={p.id} scope="col" className={`px-3 py-3 text-center align-top ${p.highlight ? "bg-[var(--primary-muted)]" : ""}`}>
                      {p.highlight && <span className="block mb-1 text-caption font-bold uppercase tracking-wide text-[color:color-mix(in_oklab,var(--muted-foreground)_85%,var(--foreground))]">Recomendado</span>}
                      <span className={`block text-label font-bold ${p.highlight ? textoMarca : "text-foreground"}`}>{p.name.pt}</span>
                      <span className={`block text-caption font-normal ${p.highlight ? "text-[color:color-mix(in_oklab,var(--muted-foreground)_85%,var(--foreground))]" : "text-muted-foreground"}`}>{reais(p.price)}/mês</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pricingFeatures.map((f, i) => (
                  <tr key={f.pt} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-card" : "bg-muted/20"}`}>
                    <th scope="row" className="px-4 py-2 text-left text-label font-medium text-foreground">{f.pt}</th>
                    {plans.map(p => {
                      const inclui = i < p.included;
                      return (
                        <td key={p.id} className={`px-3 py-2 text-center ${p.highlight ? "bg-[var(--primary-muted)]" : ""}`}>
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
                        className={`h-7 px-3 rounded-sm text-caption font-semibold transition-colors whitespace-nowrap ${foco} ${p.highlight ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border bg-card text-foreground hover:bg-accent"}`}
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
            <p className={`text-caption font-semibold uppercase tracking-[0.1em] mb-1 ${textoMarca}`}>Depoimentos</p>
            <h2 className="text-h4 font-black text-foreground tracking-tight">Lojas que já estão na FindLook</h2>
            <p className="text-caption text-muted-foreground mt-1">Textos de exemplo para o template.</p>
          </div>
          <div className="max-w-2xl mx-auto" role="region" aria-roledescription="carrossel" aria-label="Depoimentos de lojas">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4" aria-live="polite">
              {visibleTestimonials.map((tm, i) => (
                <figure key={`${tm.pessoa}-${slide}-${i}`} className={`p-4 rounded-md border border-border bg-card flex flex-col ${i > 0 ? "hidden sm:flex" : ""}`}>
                  <Store aria-hidden className="h-3.5 w-3.5 text-muted-foreground mb-3" />
                  <blockquote className="text-label text-muted-foreground leading-snug mb-4 italic">“{tm.texto}”</blockquote>
                  <figcaption className="flex items-center gap-2 mt-auto">
                    <div aria-hidden className="h-8 w-8 rounded-full bg-[var(--primary-muted)] flex items-center justify-center shrink-0">
                      <span className={`text-caption font-black ${textoMarca}`}>{tm.iniciais}</span>
                    </div>
                    <div>
                      <div className="text-label font-bold text-foreground leading-none">{tm.pessoa}</div>
                      <div className="text-caption text-muted-foreground mt-1">{tm.loja} · {tm.bairro}</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4">
              <button type="button" onClick={prevSlide} aria-label="Depoimento anterior" className={`h-8 w-8 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground transition-colors ${foco}`}>
                <ChevronRight aria-hidden className="h-4 w-4 rotate-180" />
              </button>
              <div className="flex">
                {depoimentosLanding.map((d, i) => (
                  <button
                    key={d.pessoa}
                    type="button"
                    onClick={() => setSlide(i)}
                    aria-label={`Ir para o depoimento ${i + 1} de ${total}`}
                    aria-current={i === slide ? "true" : undefined}
                    data-alvo-compacto
                    className={`flex h-8 min-w-8 items-center justify-center rounded-full px-1 ${foco}`}
                  >
                    {/* O ponto é o desenho; o botão em volta é a área de toque (32 px; as setas ao lado têm 44 px no toque) */}
                    <span aria-hidden className={`h-2 rounded-full transition-all ${i === slide ? "w-5 bg-primary" : "w-2 bg-[var(--border-strong)]"}`} />
                  </button>
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
            <p className={`text-caption font-semibold uppercase tracking-[0.1em] mb-1 ${textoMarca}`}>Dúvidas</p>
            <h2 className="text-h4 font-black text-foreground tracking-tight">Perguntas frequentes</h2>
          </div>
          {/* Acordeão do DS (antes, montado à mão) */}
          <Accordion type="single" collapsible value={openFaq === null ? "" : String(openFaq)} onValueChange={v => setOpenFaq(v === "" ? null : Number(v))} className="max-w-xl mx-auto space-y-2">
            {duvidasLanding.map((item, i) => (
              <AccordionItem key={item.q} value={String(i)} className="rounded-md border border-border bg-card last:border-b">
                <AccordionTrigger className="px-4 py-3 text-body-sm font-semibold text-foreground hover:bg-row-hover hover:no-underline">{item.q}</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground leading-relaxed">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* ══ CONTATO / CTA FINAL ══ */}
        <div className="relative overflow-hidden border-y border-border">
          <div className="absolute inset-0 bg-card/40" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full bg-primary/6 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-[180px] h-[180px] rounded-full bg-info/5 blur-3xl pointer-events-none" />
          <div className="absolute top-10 right-10 w-[140px] h-[140px] rounded-full bg-warning/4 blur-3xl pointer-events-none" />

          <div className="relative z-10 px-4 sm:px-6 py-12">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border border-primary/20 bg-[var(--primary-suave)] text-caption font-semibold mb-3 ${textoMarca}`}>
                <MessageCircle aria-hidden className="h-3 w-3" /> Fale com a gente
              </div>
              <h2 className="text-h3 font-black text-foreground tracking-[-0.03em] mb-2">
                Sua loja pronta<br />
                <span className={textoMarca}>para ser encontrada</span>
              </h2>
              <p className="text-body-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
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
                    <button type="button" className={`group w-full text-left relative rounded-lg border border-border bg-card p-4 flex flex-col gap-3 hover:border-[var(--border-strong)] hover:shadow-md transition-all ${foco}`}>
                      <div className={`h-9 w-9 rounded-md flex items-center justify-center ${ch.iconBg}`}>
                        <Icon aria-hidden className="h-5 w-5" />
                      </div>
                      {/* Prazo embaixo do texto, na mesma borda do título (27/11/2026) */}
                      <div>
                        <div className="text-body-sm font-bold text-foreground mb-1">{ch.label}</div>
                        <div className="text-caption text-muted-foreground">{ch.value}</div>
                        <span className="mt-2 inline-flex text-caption font-bold px-2 py-1 rounded-full border border-border bg-muted text-foreground">{ch.badge}</span>
                      </div>
                      <div className={`flex items-center gap-1 text-caption font-medium opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity ${textoMarca}`}>
                        Abrir <ArrowRight aria-hidden className="h-3 w-3" />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="max-w-2xl mx-auto flex items-center gap-3 mb-8">
              <div className="flex-1 h-px bg-border" />
              <span className="text-caption font-semibold uppercase tracking-[0.1em] text-muted-foreground px-2">ou envie uma mensagem</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-[1fr_1.6fr] gap-6 items-start">
              {/* Confiança */}
              <div className="space-y-5">
                <div>
                  <h3 className="text-body-sm font-bold text-foreground mb-1">Por que a FindLook?</h3>
                  <p className="text-label text-muted-foreground leading-relaxed">
                    A FindLook não vende: ela gera encontros entre quem procura e a sua loja.
                  </p>
                </div>
                <ul className="space-y-2">
                  {[
                    { icon: CheckCircle, text: "Contato direto, sem ninguém no meio da venda", color: "text-success" },
                    { icon: ShieldCheck, text: "Dados de quem procura protegidos, conforme a LGPD", color: "text-info" },
                    { icon: Zap,         text: "Troque de plano quando precisar",               color: textoMarca },
                    { icon: LifeBuoy,    text: "Suporte para cadastrar as primeiras peças",     color: "text-muted-foreground" },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <li key={item.text} className="flex items-start gap-2">
                        <Icon aria-hidden className={`h-3.5 w-3.5 mt-1 shrink-0 ${item.color}`} />
                        <span className="text-label text-muted-foreground leading-snug">{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="rounded-md border border-border bg-card p-3">
                  <p className="text-label font-semibold text-foreground mb-1">Já tem conta?</p>
                  <p className="text-caption text-muted-foreground mb-2">Entre no painel para atualizar peças e ver os avisos da loja.</p>
                  <button type="button" className={`h-7 px-3 rounded-sm border border-border bg-background text-caption font-semibold text-foreground hover:bg-accent inline-flex items-center gap-1 ${foco}`}>
                    <LogIn aria-hidden className="h-3 w-3" /> Entrar no painel
                  </button>
                </div>
              </div>

              {/* Formulário */}
              <div className="rounded-lg border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-md)" }}>
                <div className="px-5 py-4 border-b border-border bg-muted/30 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-sm bg-[var(--primary-muted)] flex items-center justify-center">
                    <Send aria-hidden className={`h-4 w-4 ${textoMarca}`} />
                  </div>
                  <div>
                    <h3 className="text-body-sm font-bold text-foreground">Quero conhecer a FindLook</h3>
                    <p className="text-caption text-muted-foreground">Respondemos em até 1 dia útil</p>
                  </div>
                </div>

                <div className="p-5">
                  {contactSent ? (
                    <div role="status" className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                      <div className="h-14 w-14 rounded-full bg-success/10 border border-success/20 flex items-center justify-center">
                        <CheckCircle aria-hidden className="h-7 w-7 text-success" />
                      </div>
                      <div>
                        <p className="text-body font-bold text-foreground mb-1">Mensagem enviada!</p>
                        <p className="text-label text-muted-foreground leading-relaxed max-w-[220px] mx-auto">
                          Vamos responder em até 1 dia útil, no e-mail ou no WhatsApp informado.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setContactSent(false)}
                        className={`mt-1 h-8 px-4 rounded-sm border border-border bg-muted text-label font-medium text-foreground hover:bg-accent transition-colors ${foco}`}
                      >
                        Enviar outra mensagem
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={e => { e.preventDefault(); setContactSent(true); }} className="space-y-3">
                      <p className="text-caption text-muted-foreground"><span className={textoMarca}>*</span> Campo obrigatório</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label htmlFor={`${pre}-nome`} className="block text-caption font-semibold text-foreground">
                            Seu nome <span aria-hidden className={textoMarca}>*</span>
                          </label>
                          <div className="relative">
                            <User aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
                            <input id={`${pre}-nome`} required type="text" autoComplete="name" placeholder="Ana Oliveira" className={`${campo} pl-7 text-label`} />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label htmlFor={`${pre}-email`} className="block text-caption font-semibold text-foreground">
                            E-mail <span aria-hidden className={textoMarca}>*</span>
                          </label>
                          <div className="relative">
                            <Mail aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
                            <input id={`${pre}-email`} required type="email" autoComplete="email" placeholder="voce@email.com" className={`${campo} pl-7 text-label`} />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label htmlFor={`${pre}-loja`} className="block text-caption font-semibold text-foreground">
                            Nome da loja <span aria-hidden className={textoMarca}>*</span>
                          </label>
                          <div className="relative">
                            <Store aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
                            <input id={`${pre}-loja`} required type="text" autoComplete="organization" placeholder="Ateliê Aurora" className={`${campo} pl-7 text-label`} />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label htmlFor={`${pre}-whats`} className="block text-caption font-semibold text-foreground">WhatsApp da loja</label>
                          <div className="relative">
                            <Phone aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
                            <input id={`${pre}-whats`} type="tel" autoComplete="tel" placeholder="(11) 90000-0000" className={`${campo} pl-7 text-label`} />
                          </div>
                        </div>
                      </div>

                      <fieldset className="space-y-1">
                        <legend className="block text-caption font-semibold text-foreground mb-1">Tipo de negócio</legend>
                        <div className="flex flex-wrap gap-1">
                          {tiposLoja.map(s => (
                            <button
                              key={s}
                              type="button"
                              aria-pressed={tipoLoja === s}
                              onClick={() => setTipoLoja(s)}
                              className={`px-2 py-1 rounded-full border text-caption font-medium transition-all ${foco} ${tipoLoja === s ? `border-primary bg-[var(--primary-suave)] ${textoMarca}` : "border-border bg-muted text-muted-foreground hover:border-[var(--border-strong)] hover:text-foreground"}`}
                            >
                              {tipoLoja === s && <Check aria-hidden className="inline h-2.5 w-2.5 mr-1 -mt-px" />}
                              {s}
                            </button>
                          ))}
                        </div>
                      </fieldset>

                      <div className="space-y-1">
                        <label htmlFor={`${pre}-msg`} className="block text-caption font-semibold text-foreground">
                          Mensagem <span className="font-normal text-muted-foreground">(opcional)</span>
                        </label>
                        <textarea id={`${pre}-msg`} rows={3} placeholder="Conte o que a sua loja vende e em qual bairro fica."
                          className={`${campo} text-label resize-none`} />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        <div className="flex items-start gap-2 flex-1 min-w-[160px]">
                          <Checkbox id={`${pre}-consent`} required />
                          <label htmlFor={`${pre}-consent`} className="text-caption text-muted-foreground leading-snug cursor-pointer">
                            Concordo com os <span className={`underline underline-offset-1 ${textoMarca}`}>Termos</span> e a <span className={`underline underline-offset-1 ${textoMarca}`}>Política de privacidade</span>
                          </label>
                        </div>
                        <button type="submit"
                          className={`shrink-0 h-8 px-4 rounded-sm bg-primary text-primary-foreground text-label font-bold hover:opacity-90 transition-opacity flex items-center gap-1 whitespace-nowrap ${foco}`}>
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
              {/* Celular: links em 2 colunas iguais, com 44 px de toque; do 640 px em diante, numa linha (27/11/2026) */}
              <div className="grid w-full grid-cols-2 gap-x-4 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-4">
                {["Para quem procura", "Para lojas", "Planos", "Ajuda", "Contato"].map(l => (
                  <button key={l} type="button" className={`inline-flex min-h-10 items-center text-left text-label text-muted-foreground hover:text-foreground transition-colors rounded-sm toque:min-h-11 ${foco}`}>{l}</button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
              <span className="text-caption text-muted-foreground">© 2026 FindLook. Todos os direitos reservados.</span>
              <div className="flex items-center gap-4">
                {["Privacidade", "Termos", "Cookies"].map(l => (
                  <button key={l} type="button" className={`inline-flex min-h-10 items-center text-label text-muted-foreground hover:text-foreground transition-colors rounded-sm toque:min-h-11 ${foco}`}>{l}</button>
                ))}
              </div>
            </div>
          </div>
        </footer>

        {/* Voltar ao topo: aparece quando a pessoa chega ao fim da página. Na página real fica fixo no canto da tela;
            aqui, dentro da janela de demonstração, acompanha a rolagem dela. */}
        <div className="sticky bottom-4 z-30 flex h-0 items-end justify-end px-4">
          <VoltarAoTopo rolagem={rolagemRef} focoEm="h1" className="static" />
        </div>
      </div>
    </TemplateFrame>
  );
}
