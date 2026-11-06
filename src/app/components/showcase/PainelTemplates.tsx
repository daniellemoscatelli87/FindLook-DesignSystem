import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  Home, Shirt, Upload, Boxes, ShoppingBag, Search, Sparkles, FileBarChart, Store, CreditCard, Plug, Settings, Users, LifeBuoy,
  Menu, X, ExternalLink, Plus, FileSpreadsheet, Eye, Heart, ScanSearch, MessageCircle, Target, Lightbulb, LogOut,
  CalendarCheck, Camera, ClipboardList, Ruler, ShieldCheck, MapPin, Zap, TrendingUp, Activity, LineChart, ImagePlus, Bell, Construction, CheckCheck,
} from "lucide-react";
import logoClaro from "../../../imports/findlook/findlook-horizontal-sobre-claro.png";
import logoEscuro from "../../../imports/findlook/findlook-horizontal-sobre-grafite.png";
import { SeletorDeLoja, ItemDoMenu, GrupoDoMenu, CardDePlano, CampoDeBuscaGlobal, BotaoDeNotificacoes, GatilhoDaConta } from "../ui/painel-shell";
import { CabecalhoDaPagina, SeletorDePeriodo, BotaoDividido, BannerPromocional } from "../ui/painel-cabecalho";
import {
  CardIndicador, GraficoDeDesempenho, ItemDeAtividade, ItemDeAcao, ListaDeTendencias, ItemDeChecklist, AnelDePontuacao,
  CarrosselDeDicas, FaixaDeBeneficios, CardDoPainel, LinkVerTudo, Variacao, formatarNumero,
} from "../ui/painel-dados";
import { TabelaDeProdutos, type Produto } from "../ui/painel-produtos";
import { IconeModa } from "../ui/fashion-icons";
import { UploadDropzone, UploadList, type UploadFile } from "../ui/upload";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";

/* ─────────────────────────────────────────────
   Dados de exemplo do painel da loja
───────────────────────────────────────────── */
export const produtosExemplo: Produto[] = [
  { id: "ca001", nome: "Calça jeans wide leg", detalhes: "SKU CA001 · Tam. 38 · Jeans", icone: "calca", condicao: "Nova", estoque: 3, preco: 189.9, nivel: 5, visualizacoes: 328, favoritos: 12, status: "publicado" },
  { id: "ve014", nome: "Vestido midi", detalhes: "SKU VE014 · Tam. P · Linho", icone: "vestido", condicao: "Nova", estoque: 2, preco: 249.9, nivel: 4, visualizacoes: 287, favoritos: 8, status: "pendente", motivo: "Foto em baixa qualidade" },
  { id: "cm023", nome: "Camiseta básica", detalhes: "SKU CM023 · Tam. M · Algodão", icone: "camiseta", condicao: "Usada", estoque: 1, preco: 59.9, nivel: 2, visualizacoes: 96, favoritos: 3, status: "publicado" },
  { id: "oc005", nome: "Óculos de sol", detalhes: "SKU OC005 · Tartaruga · Unissex", icone: "oculos", condicao: "Usada", estoque: 1, preco: 129.9, nivel: 3, visualizacoes: 152, favoritos: 6, status: "publicado" },
  { id: "bl031", nome: "Blazer feminino", detalhes: "SKU BL031 · Tam. M · Alfaiataria", icone: "jaqueta", condicao: "Nova", estoque: 0, preco: 319.9, nivel: 4, visualizacoes: 241, favoritos: 15, status: "esgotado" },
  { id: "sa012", nome: "Saia de linho", detalhes: "SKU SA012 · Tam. 40 · Linho", icone: "saia", condicao: "Nova", estoque: 1, preco: 169.9, nivel: 3, visualizacoes: 118, favoritos: 5, status: "reservado" },
  { id: "tn008", nome: "Tênis branco", detalhes: "SKU TN008 · Nº 37 · Couro", icone: "tenis", condicao: "Usada", estoque: 1, preco: 149.9, nivel: 1, visualizacoes: 44, favoritos: 1, status: "pendente", motivo: "Falta informar o tamanho" },
  { id: "bo019", nome: "Bolsa de palha", detalhes: "SKU BO019 · Única · Palha", icone: "bolsa", condicao: "Nova", estoque: 4, preco: 99.9, nivel: 3, visualizacoes: 131, favoritos: 7, status: "publicado" },
];

/** Quantidades da loja inteira (a tabela de exemplo mostra só algumas peças). */
export const contagensExemplo = { publicado: 128, pendente: 6, esgotado: 3, reservado: 2 };

const serieDias = ["2 out", "5 out", "9 out", "12 out", "16 out", "19 out", "23 out", "26 out", "30 out"];
const visualizacoes = [380, 520, 470, 690, 640, 820, 910, 1040, 1284];
const favoritos = [6, 9, 8, 12, 11, 15, 17, 20, 24];
const contatos = [1, 1, 2, 2, 3, 3, 4, 5, 6];
export const dadosDesempenho = serieDias.map((dia, i) => ({ dia, visualizacoes: visualizacoes[i]!, favoritos: favoritos[i]!, contatos: contatos[i]! }));

const seriesGrafico = [
  { chave: "visualizacoes", rotulo: "Visualizações", cor: "var(--chart-1)" },
  { chave: "favoritos", rotulo: "Favoritos", cor: "var(--chart-2)" },
  { chave: "contatos", rotulo: "Contatos", cor: "var(--chart-3)" },
];

/** Avisa aos templates reaproveitados que estão dentro do protótipo (sem moldura nem menu próprio). */
export const PainelEmbutido = createContext(false);

/* ─────────────────────────────────────────────
   Páginas e navegação
───────────────────────────────────────────── */
type PaginaId =
  | "inicio" | "produtos" | "importar" | "estoque" | "pedidos" | "buscas" | "inteligencia" | "relatorios"
  | "perfil" | "equipe" | "planos" | "integracoes" | "configuracoes" | "ajuda" | "notificacoes";

type ItemMenu = { id: PaginaId; rotulo: string; icone: React.ReactNode; contador?: number };

const menuPrincipal: ItemMenu[] = [
  { id: "inicio", rotulo: "Início", icone: <Home /> },
  { id: "produtos", rotulo: "Produtos", icone: <Shirt /> },
  { id: "importar", rotulo: "Importar produtos", icone: <Upload /> },
  { id: "estoque", rotulo: "Estoque", icone: <Boxes /> },
  { id: "pedidos", rotulo: "Pedidos e reservas", icone: <ShoppingBag />, contador: 3 },
  { id: "buscas", rotulo: "Buscas e interesse", icone: <Search /> },
  { id: "inteligencia", rotulo: "Inteligência de vendas", icone: <Sparkles /> },
  { id: "relatorios", rotulo: "Relatórios", icone: <FileBarChart /> },
];
const menuMinhaLoja: ItemMenu[] = [
  { id: "perfil", rotulo: "Perfil da loja", icone: <Store /> },
  { id: "equipe", rotulo: "Equipe", icone: <Users /> },
  { id: "planos", rotulo: "Planos e assinatura", icone: <CreditCard /> },
  { id: "integracoes", rotulo: "Integrações", icone: <Plug /> },
  { id: "configuracoes", rotulo: "Configurações", icone: <Settings /> },
  { id: "ajuda", rotulo: "Ajuda e suporte", icone: <LifeBuoy /> },
];
const titulos: Record<PaginaId, string> = {
  ...Object.fromEntries([...menuPrincipal, ...menuMinhaLoja].map(i => [i.id, i.rotulo])) as Record<PaginaId, string>,
  notificacoes: "Notificações",
};

const Navegar = createContext<(p: PaginaId) => void>(() => {});
const useNavegar = () => useContext(Navegar);
/** Clique de link interno do protótipo: não segue o href, troca de página. */
const irPara = (ir: (p: PaginaId) => void, p: PaginaId) => (e: React.MouseEvent) => { e.preventDefault(); ir(p); };

/* ─────────────────────────────────────────────
   Moldura (janela) do protótipo
───────────────────────────────────────────── */
export function MolduraDoPainel({ children, endereco = "Painel da loja · FindLook" }: { children: React.ReactNode; endereco?: string }) {
  return (
    <div className="overflow-hidden rounded-[16px] border border-border" style={{ boxShadow: "var(--shadow-lg)" }}>
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border bg-muted/60 px-4" aria-hidden>
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-primary/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-warning/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-success/50" />
        </div>
        <div className="mx-4 flex-1">
          <div className="mx-auto flex h-5 max-w-[280px] items-center rounded-[6px] bg-background/70 px-3">
            <span className="truncate text-[0.625rem] text-muted-foreground">{endereco}</span>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

function Logo() {
  return (
    <span className="flex h-9 items-center self-start">
      <img src={logoClaro} alt="FindLook" className="h-8 w-auto max-w-none object-contain dark:hidden" />
      <img src={logoEscuro} alt="FindLook" className="hidden h-8 w-auto max-w-none object-contain dark:block" />
    </span>
  );
}

function MenuLateral({ ativo, onIr, primeiroRef }: { ativo: PaginaId; onIr: (p: PaginaId) => void; primeiroRef?: React.Ref<HTMLAnchorElement> }) {
  const item = (i: ItemMenu, idx: number) => (
    <ItemDoMenu
      key={i.id}
      ref={idx === 0 ? primeiroRef : undefined}
      href={`#${i.id}`}
      icone={i.icone}
      ativo={i.id === ativo}
      contador={i.contador}
      rotuloContador="novos"
      onClick={irPara(onIr, i.id)}
    >
      {i.rotulo}
    </ItemDoMenu>
  );
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 space-y-4 px-4 pb-3 pt-4">
        <Logo />
        <SeletorDeLoja loja="Ateliê Aurora" />
      </div>
      <nav aria-label="Menu do painel" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-3 [scrollbar-width:thin]">
        <GrupoDoMenu>{menuPrincipal.map(item)}</GrupoDoMenu>
        <div className="my-2 border-t border-border" />
        <GrupoDoMenu titulo="Minha loja">{menuMinhaLoja.map((i, n) => item(i, n + 1))}</GrupoDoMenu>
      </nav>
      <div className="shrink-0 border-t border-border p-4">
        <CardDePlano compacto plano="Plano Desempenho" preco="R$ 149" onAcao={() => onIr("planos")} />
      </div>
    </div>
  );
}

/* ── Menu de notificações (sino) ─────────────────────────────── */
const notificacoesRecentes = [
  { icone: <Heart />, titulo: "Nova peça favoritada", detalhe: "Vestido midi", quando: "há 26 min" },
  { icone: <CalendarCheck />, titulo: "Reserva solicitada", detalhe: "Vestido midi · Tam. P", quando: "há 1 h" },
  { icone: <MessageCircle />, titulo: "Contato de interesse", detalhe: "Pedido de mais informações", quando: "há 1 h" },
  { icone: <Search />, titulo: "Sua peça apareceu em buscas", detalhe: "“vestido midi de linho”", quando: "há 2 h" },
];

function MenuDeNotificacoes() {
  const ir = useNavegar();
  const [lidas, setLidas] = useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <BotaoDeNotificacoes naoLidas={lidas ? 0 : notificacoesRecentes.length} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
          <DropdownMenuLabel className="p-0 text-[0.875rem]">Notificações</DropdownMenuLabel>
          <button type="button" onClick={() => setLidas(true)} disabled={lidas} className="inline-flex items-center gap-1 rounded-[6px] text-[0.75rem] font-semibold text-[var(--primary-text,var(--primary))] hover:underline disabled:pointer-events-none disabled:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <CheckCheck aria-hidden className="h-3.5 w-3.5" /> {lidas ? "Tudo lido" : "Marcar como lidas"}
          </button>
        </div>
        <div className="max-h-72 overflow-y-auto p-1">
          {notificacoesRecentes.map(n => (
            <DropdownMenuItem key={n.titulo} onSelect={() => ir("notificacoes")} className="items-start gap-3 rounded-[10px] px-2.5 py-2">
              <span aria-hidden className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary-muted)] text-[var(--primary-text,var(--primary))] [&>svg]:h-4 [&>svg]:w-4">{n.icone}</span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
                  {!lidas && <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}{n.titulo}{!lidas && <span className="sr-only">(não lida)</span>}
                </span>
                <span className="block truncate text-[0.75rem] text-muted-foreground">{n.detalhe} · {n.quando}</span>
              </span>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator className="m-0" />
        <DropdownMenuItem onSelect={() => ir("notificacoes")} className="justify-center rounded-none py-2.5 text-[0.8125rem] font-semibold text-[var(--primary-text,var(--primary))]">Ver todas as notificações</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MenuDaConta() {
  const ir = useNavegar();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <GatilhoDaConta nome="Ana Oliveira" papel="Proprietária" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <span className="block text-[0.8125rem] font-semibold text-foreground">Ana Oliveira</span>
          <span className="block text-[0.75rem] text-muted-foreground">Proprietária · Ateliê Aurora</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => ir("perfil")}><Store />Perfil da loja</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => ir("planos")}><CreditCard />Planos e assinatura</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => ir("configuracoes")}><Settings />Configurações</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => ir("ajuda")}><LifeBuoy />Ajuda e suporte</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem><LogOut />Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ── Busca do painel (vai para páginas) ──────────────────────── */
function BuscaDoPainel({ aberta, onAberta }: { aberta: boolean; onAberta: (v: boolean) => void }) {
  const ir = useNavegar();
  const escolher = (p: PaginaId) => { onAberta(false); ir(p); };
  return (
    <CommandDialog open={aberta} onOpenChange={onAberta} title="Buscar no painel" description="Vá para uma página ou encontre um produto">
      <CommandInput placeholder="Buscar páginas e produtos…" />
      <CommandList>
        <CommandEmpty>Nada encontrado. Tente outra palavra.</CommandEmpty>
        <CommandGroup heading="Páginas">
          {[...menuPrincipal, ...menuMinhaLoja].map(i => (
            <CommandItem key={i.id} value={i.rotulo} onSelect={() => escolher(i.id)}>{i.icone}{i.rotulo}</CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Produtos">
          {produtosExemplo.slice(0, 6).map(p => (
            <CommandItem key={p.id} value={`${p.nome} ${p.detalhes}`} onSelect={() => escolher("produtos")}>
              {p.icone && <IconeModa nome={p.icone} size={18} />}{p.nome}<span className="ml-auto text-[0.75rem] text-muted-foreground">{p.detalhes.split(" · ")[0]}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

/* ─────────────────────────────────────────────
   Protótipo navegável do painel
───────────────────────────────────────────── */
type PrototipoProps = {
  /** Páginas vindas de outros templates (Configurações, Equipe, Planos, Notificações, Suporte). */
  paginas?: Partial<Record<PaginaId, React.ReactNode>>;
  inicial?: PaginaId;
};

export function PrototipoDoPainel({ paginas = {}, inicial = "inicio" }: PrototipoProps) {
  const [pagina, setPagina] = useState<PaginaId>(inicial);
  const [gaveta, setGaveta] = useState(false);
  const [busca, setBusca] = useState(false);
  const conteudoRef = useRef<HTMLDivElement>(null);
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const botaoMenuRef = useRef<HTMLButtonElement>(null);
  const primeiroItemRef = useRef<HTMLAnchorElement>(null);
  const primeiraVez = useRef(true);

  const ir = useCallback((p: PaginaId) => { setPagina(p); setGaveta(false); }, []);

  // Ao trocar de página: volta ao topo do conteúdo e leva o foco ao título (sem rolar a página do DS).
  useEffect(() => {
    if (primeiraVez.current) { primeiraVez.current = false; return; }
    conteudoRef.current?.scrollTo({ top: 0 });
    tituloRef.current?.focus({ preventScroll: true });
  }, [pagina]);

  // Gaveta: Esc fecha, foco vai para o primeiro item e volta ao botão ao fechar.
  useEffect(() => {
    if (!gaveta) return;
    primeiroItemRef.current?.focus({ preventScroll: true });
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setGaveta(false); };
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("keydown", esc); botaoMenuRef.current?.focus({ preventScroll: true }); };
  }, [gaveta]);

  const conteudo = (() => {
    switch (pagina) {
      case "inicio": return <PaginaInicio />;
      case "produtos": return <PaginaProdutos />;
      case "importar": return <PaginaImportar />;
      case "buscas": return <PaginaBuscas />;
      case "inteligencia": return <PaginaInteligencia />;
      default:
        return paginas[pagina] ? <PainelEmbutido.Provider value={true}>{paginas[pagina]}</PainelEmbutido.Provider> : <PaginaEmBreve titulo={titulos[pagina]} />;
    }
  })();

  return (
    <Navegar.Provider value={ir}>
      <MolduraDoPainel endereco={`Painel da loja · ${titulos[pagina]}`}>
        <div className="@container/painel relative flex h-[min(780px,85vh)] min-h-[560px] overflow-hidden bg-background">
          {/* Menu fixo (telas largas) */}
          <aside aria-label="Menu lateral" className="hidden h-full w-64 shrink-0 border-r border-border bg-card @4xl/painel:block">
            <MenuLateral ativo={pagina} onIr={ir} />
          </aside>

          {/* Gaveta (telas estreitas), dentro da janela do protótipo */}
          <div className={`absolute inset-0 z-30 @4xl/painel:hidden ${gaveta ? "" : "pointer-events-none"}`} aria-hidden={!gaveta}>
            <div onClick={() => setGaveta(false)} className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${gaveta ? "opacity-100" : "opacity-0"}`} />
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Menu do painel"
              {...(!gaveta ? { inert: "" } : {})}
              className={`absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col bg-card shadow-[var(--shadow-lg)] transition-transform duration-200 ease-out motion-reduce:transition-none ${gaveta ? "translate-x-0" : "-translate-x-full"}`}
            >
              <button type="button" onClick={() => setGaveta(false)} aria-label="Fechar menu" className="absolute right-3 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <X aria-hidden className="h-5 w-5" />
              </button>
              <MenuLateral ativo={pagina} onIr={ir} primeiroRef={primeiroItemRef} />
            </div>
          </div>

          <div className="@container flex min-w-0 flex-1 flex-col">
            {/* Barra superior */}
            <div className="flex shrink-0 items-center gap-2 border-b border-border bg-background px-3 py-2.5 @xl:gap-3 @xl:px-5">
              <button ref={botaoMenuRef} type="button" onClick={() => setGaveta(true)} aria-label="Abrir menu" aria-expanded={gaveta} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring @4xl/painel:hidden">
                <Menu aria-hidden className="h-5 w-5" />
              </button>
              <CampoDeBuscaGlobal atalho="" placeholder="Buscar páginas e produtos…" onAbrir={() => setBusca(true)} className="min-w-0 max-w-md flex-1" />
              <div className="ml-auto flex shrink-0 items-center gap-1">
                <MenuDeNotificacoes />
                <MenuDaConta />
              </div>
            </div>

            {/* Conteúdo com rolagem própria */}
            <div ref={conteudoRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:thin]">
              <main key={pagina} className="@container space-y-5 p-4 animate-in fade-in-0 slide-in-from-bottom-1 duration-300 motion-reduce:animate-none @xl:p-6">
                <h1 ref={tituloRef} tabIndex={-1} className="sr-only">{titulos[pagina]}</h1>
                {conteudo}
              </main>
            </div>
          </div>
          <BuscaDoPainel aberta={busca} onAberta={setBusca} />
        </div>
      </MolduraDoPainel>
    </Navegar.Provider>
  );
}

/* ─────────────────────────────────────────────
   Páginas
───────────────────────────────────────────── */
function BotaoContorno({ children, onClick, href = "#", externo }: { children: React.ReactNode; onClick?: React.MouseEventHandler<HTMLAnchorElement>; href?: string; externo?: boolean }) {
  return (
    <a href={href} onClick={onClick} target={externo ? "_blank" : undefined} rel={externo ? "noreferrer" : undefined} className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-border bg-card px-3.5 text-[0.875rem] font-medium text-foreground shadow-[var(--shadow-xs)] transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      {children}
    </a>
  );
}

function PaginaInicio() {
  const ir = useNavegar();
  const [periodo, setPeriodo] = useState("30");
  const [banner, setBanner] = useState(true);
  const [dicas, setDicas] = useState(true);
  return (
    <>
      <div className="grid gap-4 @6xl:grid-cols-[minmax(0,1fr)_22rem] @6xl:items-start">
        <CabecalhoDaPagina
          saudacao="Olá, Ana! 👋"
          titulo="Sua loja em destaque na **FindLook**"
          descricao="Acompanhe o desempenho, gerencie seus produtos e veja como suas peças estão sendo descobertas por pessoas da sua região."
          acoes={<>
            <SeletorDePeriodo valor={periodo} onChange={setPeriodo} />
            <BotaoContorno externo>Ver minha loja <ExternalLink aria-hidden className="h-4 w-4" /><span className="sr-only">(abre em nova aba)</span></BotaoContorno>
            <BotaoDividido rotulo="Cadastrar produto" icone={<Plus />} onClick={() => ir("produtos")} acoes={[{ rotulo: "Cadastrar produto", icone: <Plus />, onSelect: () => ir("produtos") }, { rotulo: "Importar planilha", icone: <FileSpreadsheet />, onSelect: () => ir("importar") }, { rotulo: "Cadastrar com fotos", icone: <ImagePlus />, onSelect: () => ir("produtos") }]} />
          </>}
        />
        {banner && <BannerPromocional titulo="Destaque sua coleção" texto="Deixe sua vitrine ainda mais atrativa com fotos de alta qualidade." acao="Ver dicas de foto" imagem={<IconeModa nome="cabide" size={44} />} onFechar={() => setBanner(false)} />}
      </div>

      <div className="grid grid-cols-1 gap-3 @lg:grid-cols-2 @min-[44rem]:grid-cols-3 @6xl:grid-cols-5">
        <CardIndicador icone={<Shirt />} valor={128} rotulo="Produtos publicados" variacao={12} comparacao="vs. 30 dias" />
        <CardIndicador icone={<Eye />} valor={1284} rotulo="Visualizações" variacao={18.6} comparacao="vs. 30 dias" />
        <CardIndicador icone={<Heart />} valor={24} rotulo="Favoritos" variacao={33.3} comparacao="vs. 30 dias" />
        <CardIndicador icone={<ScanSearch />} valor={8} rotulo="Buscas compatíveis" explicacao="Buscas feitas por pessoas da sua região que combinam com peças da sua loja, como “calça jeans wide leg”." />
        <CardIndicador icone={<MessageCircle />} valor={6} rotulo="Contatos e reservas" variacao={50} comparacao="vs. 30 dias" />
      </div>

      <div className="grid gap-4 @min-[44rem]:grid-cols-2 @6xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,0.85fr)]">
        <CardDoPainel icone={<LineChart />} titulo="Desempenho da descoberta" descricao="Visualizações, favoritos e contatos da sua loja.">
          <div className="mb-2 flex flex-wrap items-baseline gap-2">
            <span className="font-[family-name:var(--font-display)] text-[1.75rem] font-extrabold leading-none text-foreground">{formatarNumero(1284)}</span>
            <span className="text-[0.8125rem] text-muted-foreground">visualizações</span>
            <Variacao valor={18.6} />
          </div>
          <GraficoDeDesempenho dados={dadosDesempenho} chaveX="dia" series={seriesGrafico} visiveisIniciais={["visualizacoes"]} />
        </CardDoPainel>
        <CardDoPainel icone={<Sparkles />} titulo="Inteligência de vendas" descricao="O que as buscas da sua região mostram sobre a sua loja." acao={<LinkVerTudo rotulo="Ver inteligência de vendas" onClick={irPara(ir, "inteligencia")} />}>
          <div className="space-y-2">
            <ItemDeAcao onClick={irPara(ir, "buscas")} midia={<IconeModa nome="vestido" size={24} />} titulo="Vestidos midi estão em alta" descricao="+62% de buscas na sua região." />
            <ItemDeAcao onClick={irPara(ir, "buscas")} midia={<IconeModa nome="calca" size={24} />} titulo="Calças wide leg têm grande interesse" descricao="8 buscas compatíveis com seus produtos." />
            <ItemDeAcao onClick={irPara(ir, "inteligencia")} midia={<TrendingUp />} titulo="Oportunidade de estoque" descricao="Considere ampliar peças no tamanho M." />
          </div>
        </CardDoPainel>
        <CardDoPainel icone={<Activity />} titulo="Atividade recente" acao={<LinkVerTudo rotulo="Ver todas as notificações" onClick={irPara(ir, "notificacoes")} />} className="@min-[44rem]:col-span-2 @6xl:col-span-1">
          <ul className="-my-3 divide-y divide-border">
            <ItemDeAtividade icone={<Search />} titulo="Sua peça apareceu em buscas" detalhe="“vestido midi de linho” · 8 ocorrências" quando="há 12 min" />
            <ItemDeAtividade icone={<Heart />} titulo="Nova peça favoritada" detalhe="Vestido midi · R$ 249,90" quando="há 26 min" />
            <ItemDeAtividade icone={<CalendarCheck />} titulo="Reserva solicitada" detalhe="Vestido midi · Tam. P" quando="há 1 h" />
            <ItemDeAtividade icone={<MessageCircle />} titulo="Contato de interesse" detalhe="Alguém pediu mais informações sobre uma peça" quando="há 1 h" />
            <ItemDeAtividade icone={<Upload />} titulo="Planilha importada" detalhe="12 peças atualizadas" quando="há 2 h" />
          </ul>
        </CardDoPainel>
      </div>

      <div className="grid gap-4 @6xl:grid-cols-[minmax(0,1fr)_22rem]">
        <CardDoPainel icone={<Shirt />} titulo={`Seus produtos (${formatarNumero(137)})`} descricao="Gerencie, edite e acompanhe o desempenho das suas peças.">
          <TabelaDeProdutos produtos={produtosExemplo} total={137} contagens={contagensExemplo} limite={4} onVerTodos={() => ir("produtos")} />
        </CardDoPainel>
        <div className="grid gap-4 @min-[44rem]:grid-cols-2 @6xl:grid-cols-1">
          <CardDoPainel icone={<Target />} titulo="O que estão procurando na sua região" descricao="Buscas em alta que podem ser oportunidades para a sua loja.">
            <ListaDeTendencias itens={[{ termo: "Vestido midi", variacao: 62 }, { termo: "Calça wide leg", variacao: 48 }, { termo: "Blazer feminino", variacao: 37 }, { termo: "Saia de linho", variacao: 29 }]} />
            <a href="#buscas" onClick={irPara(ir, "buscas")} className="mt-3 flex h-10 items-center justify-center gap-1.5 rounded-[10px] border border-primary text-[0.875rem] font-semibold text-[var(--primary-text,var(--primary))] transition-colors hover:bg-[var(--primary-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Ver mais oportunidades</a>
          </CardDoPainel>
          <CardDoPainel icone={<ClipboardList />} titulo="Próximas ações" descricao="O que fazer agora para ser mais encontrada.">
            <div className="space-y-2">
              <ItemDeAcao onClick={irPara(ir, "produtos")} midia={<Camera />} titulo="Melhore 3 fotos" descricao="Aumente a chance de ser encontrada." />
              <ItemDeAcao onClick={irPara(ir, "produtos")} midia={<ClipboardList />} titulo="Revise 2 produtos pendentes" descricao="Complete as informações." />
              <ItemDeAcao onClick={irPara(ir, "produtos")} midia={<Ruler />} titulo="Cadastre os tamanhos" descricao="3 peças sem variação de tamanho." />
            </div>
          </CardDoPainel>
        </div>
      </div>

      <div className="grid gap-4 @min-[44rem]:grid-cols-2">
        <CardDoPainel icone={<ShieldCheck />} titulo="Saúde do catálogo" descricao="Veja o que pode ser melhorado para aumentar a sua visibilidade.">
          <div className="@container">
            <div className="flex flex-col items-center gap-4 @md:flex-row">
              <AnelDePontuacao valor={85} />
              <ul className="w-full min-w-0 flex-1 space-y-1">
                <ItemDeChecklist estado="ok" texto="Fotos com boa qualidade" />
                <ItemDeChecklist estado="ok" texto="Informações completas" />
                <ItemDeChecklist estado="atencao" texto="3 produtos sem variação de tamanho" />
                <ItemDeChecklist estado="atencao" texto="2 fotos precisam de melhoria" />
              </ul>
            </div>
          </div>
        </CardDoPainel>
        <CardDoPainel icone={<Lightbulb />} titulo="Dicas para vender mais" descricao="Ações simples, com alto potencial de resultado.">
          {dicas ? (
            <CarrosselDeDicas onFechar={() => setDicas(false)} dicas={[
              { titulo: "Melhore suas fotos", texto: "Fotos bem iluminadas e com fundo neutro valorizam a peça e chamam mais atenção na vitrine.", acao: "Ver dicas", midia: <IconeModa nome="cabide" size={40} /> },
              { titulo: "Informe todos os tamanhos", texto: "Peças com tamanhos cadastrados aparecem em mais buscas da sua região.", acao: "Revisar tamanhos", midia: <Ruler className="h-9 w-9" /> },
              { titulo: "Responda rápido", texto: "Responda os contatos no mesmo dia, enquanto o interesse ainda está alto.", acao: "Ver contatos", midia: <MessageCircle className="h-9 w-9" /> },
            ]} />
          ) : (
            <p className="text-[0.8125rem] text-muted-foreground">Você fechou as dicas. <button type="button" onClick={() => setDicas(true)} className="font-semibold text-[var(--primary-text,var(--primary))] underline underline-offset-2">Mostrar de novo</button></p>
          )}
        </CardDoPainel>
      </div>

      <FaixaDeBeneficios icone={<Sparkles />} titulo="Mais visibilidade, mais oportunidades." texto="Suas peças são mostradas para pessoas que procuram exatamente o seu estilo." beneficios={[
        { icone: <Search />, rotulo: "Descoberta de peças" }, { icone: <MapPin />, rotulo: "Clientes da sua região" }, { icone: <Zap />, rotulo: "Gestão simples" }, { icone: <TrendingUp />, rotulo: "Mais oportunidades de venda" },
      ]} />
    </>
  );
}

function PaginaProdutos() {
  const ir = useNavegar();
  return (
    <>
      <CabecalhoDaPagina
        titulo="Produtos"
        descricao="Cadastre, edite e acompanhe as peças da sua loja. Peças pendentes não aparecem na vitrine até serem revisadas."
        acoes={<>
          <BotaoContorno onClick={irPara(ir, "importar")}><FileSpreadsheet aria-hidden className="h-4 w-4" /> Importar planilha</BotaoContorno>
          <BotaoDividido rotulo="Cadastrar produto" icone={<Plus />} acoes={[{ rotulo: "Cadastrar produto", icone: <Plus /> }, { rotulo: "Cadastrar com fotos", icone: <ImagePlus /> }]} />
        </>}
      />
      <div className="grid grid-cols-2 gap-3 @min-[44rem]:grid-cols-4">
        <CardIndicador estilo="pilula" icone={<Shirt />} valor={128} rotulo="Publicados" variacao={12} />
        <CardIndicador estilo="pilula" icone={<ClipboardList />} valor={6} rotulo="Pendentes" explicacao="Peças com alguma informação faltando ou foto em baixa qualidade. Elas só aparecem na vitrine depois de revisadas." />
        <CardIndicador estilo="pilula" icone={<Boxes />} valor={3} rotulo="Esgotados" />
        <CardIndicador estilo="pilula" icone={<Bell />} valor={2} rotulo="Reservados" />
      </div>
      <CardDoPainel titulo={`Todos os produtos (${formatarNumero(137)})`} descricao="Selecione peças para publicar, marcar como esgotadas ou excluir de uma vez.">
        <TabelaDeProdutos produtos={produtosExemplo} total={137} contagens={contagensExemplo} estiloAbas="sublinhado" />
      </CardDoPainel>
    </>
  );
}

function PaginaImportar() {
  const [itens, setItens] = useState<UploadFile[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const adicionar = (files: File[]) => {
    setErro(null);
    const novos = files.map(f => ({ id: `${f.name}-${Date.now()}`, name: f.name, size: f.size, type: f.type, status: "enviando" as const, progress: 0 }));
    setItens(v => [...novos, ...v]);
    novos.forEach(n => {
      let p = 0;
      const t = window.setInterval(() => {
        p += 20;
        setItens(v => v.map(i => (i.id === n.id ? { ...i, progress: Math.min(p, 100), status: p >= 100 ? "concluido" : "enviando" } : i)));
        if (p >= 100) window.clearInterval(t);
      }, 250);
    });
  };
  return (
    <>
      <CabecalhoDaPagina titulo="Importar produtos" descricao="Envie uma planilha para cadastrar ou atualizar várias peças de uma vez. Mostramos uma prévia antes de gravar." />
      <CardDoPainel icone={<FileSpreadsheet />} titulo="Planilha de produtos" descricao="CSV ou Excel (.xlsx), até 20 MB.">
        <UploadDropzone size="lg" multiple={false} accept={[".csv", ".xlsx"]} maxSize={20 * 1024 * 1024} title="Solte sua planilha aqui" description="CSV ou Excel (.xlsx), até 20 MB." onFiles={adicionar} onError={setErro} error={erro} />
        <UploadList className="mt-4" items={itens} onRemove={id => setItens(v => v.filter(i => i.id !== id))} />
      </CardDoPainel>
    </>
  );
}

function PaginaBuscas() {
  return (
    <>
      <CabecalhoDaPagina titulo="Buscas e interesse" descricao="O que as pessoas da sua região estão procurando e como isso combina com as peças da sua loja." />
      <div className="grid grid-cols-1 gap-3 @lg:grid-cols-3">
        <CardIndicador icone={<ScanSearch />} valor={8} rotulo="Buscas compatíveis" explicacao="Buscas feitas por pessoas da sua região que combinam com peças da sua loja." />
        <CardIndicador icone={<Eye />} valor={1284} rotulo="Visualizações" variacao={18.6} comparacao="vs. 30 dias" />
        <CardIndicador icone={<Heart />} valor={24} rotulo="Favoritos" variacao={33.3} comparacao="vs. 30 dias" />
      </div>
      <div className="grid gap-4 @min-[44rem]:grid-cols-2">
        <CardDoPainel icone={<Target />} titulo="Buscas em alta na sua região" descricao="Variação em relação aos 30 dias anteriores.">
          <ListaDeTendencias itens={[{ termo: "Vestido midi", variacao: 62 }, { termo: "Calça wide leg", variacao: 48 }, { termo: "Blazer feminino", variacao: 37 }, { termo: "Saia de linho", variacao: 29 }, { termo: "Bolsa de palha", variacao: 21 }, { termo: "Tênis branco", variacao: -8 }]} />
        </CardDoPainel>
        <CardDoPainel icone={<Search />} titulo="Suas peças que apareceram em buscas">
          <ul className="-my-3 divide-y divide-border">
            <ItemDeAtividade icone={<IconeModa nome="vestido" size={16} />} titulo="Vestido midi" detalhe="“vestido midi de linho” · 8 ocorrências" quando="há 12 min" />
            <ItemDeAtividade icone={<IconeModa nome="calca" size={16} />} titulo="Calça jeans wide leg" detalhe="“calça jeans wide leg” · 5 ocorrências" quando="há 27 min" />
            <ItemDeAtividade icone={<IconeModa nome="saia" size={16} />} titulo="Saia de linho" detalhe="“saia linho midi” · 3 ocorrências" quando="há 3 h" />
          </ul>
        </CardDoPainel>
      </div>
    </>
  );
}

function PaginaInteligencia() {
  const ir = useNavegar();
  return (
    <>
      <CabecalhoDaPagina titulo="Inteligência de vendas" descricao="O que os dados da plataforma mostram sobre a sua loja. São indícios para decidir, não garantias de venda." />
      <CardDoPainel icone={<LineChart />} titulo="Desempenho da descoberta" descricao="Ligue e desligue as séries para comparar.">
        <GraficoDeDesempenho dados={dadosDesempenho} chaveX="dia" series={seriesGrafico} altura={260} />
      </CardDoPainel>
      <div className="grid gap-4 @min-[44rem]:grid-cols-2">
        <CardDoPainel icone={<Sparkles />} titulo="Insights para sua loja">
          <div className="space-y-2">
            <ItemDeAcao onClick={irPara(ir, "buscas")} midia={<IconeModa nome="vestido" size={24} />} titulo="Vestidos midi estão em alta" descricao="+62% de buscas na sua região." />
            <ItemDeAcao onClick={irPara(ir, "buscas")} midia={<IconeModa nome="calca" size={24} />} titulo="Calças wide leg têm grande interesse" descricao="8 buscas compatíveis com seus produtos." />
            <ItemDeAcao onClick={irPara(ir, "produtos")} midia={<TrendingUp />} titulo="Oportunidade de estoque" descricao="Considere ampliar peças no tamanho M." />
          </div>
        </CardDoPainel>
        <CardDoPainel icone={<ClipboardList />} titulo="Próximas ações">
          <div className="space-y-2">
            <ItemDeAcao onClick={irPara(ir, "produtos")} midia={<Camera />} titulo="Melhore 3 fotos" descricao="Aumente a chance de ser encontrada." />
            <ItemDeAcao onClick={irPara(ir, "produtos")} midia={<Ruler />} titulo="Cadastre os tamanhos" descricao="3 peças sem variação de tamanho." />
          </div>
        </CardDoPainel>
      </div>
    </>
  );
}

function PaginaEmBreve({ titulo }: { titulo: string }) {
  const ir = useNavegar();
  return (
    <>
      <CabecalhoDaPagina titulo={titulo} />
      <div className="flex flex-col items-center rounded-[18px] border border-dashed border-border bg-card px-6 py-14 text-center">
        <span aria-hidden className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary-muted)] text-[var(--primary-text,var(--primary))]"><Construction className="h-6 w-6" /></span>
        <p className="font-[family-name:var(--font-display)] text-[1.125rem] font-bold text-foreground">Esta página ainda não tem template no DS</p>
        <p className="mt-1 max-w-md text-[0.875rem] leading-relaxed text-muted-foreground">O menu já leva até aqui para mostrar a navegação. O conteúdo de “{titulo}” ainda vai ser desenhado com os componentes do painel.</p>
        <a href="#inicio" onClick={irPara(ir, "inicio")} className="mt-5 inline-flex h-10 items-center rounded-[10px] bg-primary px-4 text-[0.875rem] font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Voltar ao início</a>
      </div>
    </>
  );
}
