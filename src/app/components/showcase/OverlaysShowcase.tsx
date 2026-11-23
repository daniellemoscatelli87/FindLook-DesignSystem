import React, { useState } from "react";
import { TokenTable, type TokenGroup } from "./shared/TokenTable";
import {
  X, ChevronRight, Trash2, Check,
  Bell, Settings, HelpCircle, Info,
  ChevronDown, Plus, Minus,
  ShieldCheck, CreditCard, Zap, MessageSquare, Globe,
} from "lucide-react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { useI18n } from "../../i18n";
import { Breadcrumb as UiBreadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Pagination as UiPagination, PaginationContent, PaginationItem, PaginationLink, PaginationEllipsis } from "../ui/pagination";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "../ui/sheet";
import { Button } from "../ui/button";
import { House, ShoppingBag, Package, ChartColumn, Store, Users, Plus as PlusIcon, FileSpreadsheet, Camera, UserRound, ArrowLeftRight, LogOut, CalendarCheck, Star, Send, Mail, Smartphone } from "lucide-react";
import { CardComCabecalho } from "../ui/painel-dados";
import { AbasComContador } from "../ui/painel-produtos";
import { Switch } from "../ui/switch";
import {
  SeletorDeLoja, ItemDoMenu, GrupoDoMenu, CardDePlano, CampoDeBuscaGlobal, BotaoDeNotificacoes, GatilhoDaConta,
  MenuLateralProvider, MenuLateral, NavDoMenu, DivisorDoMenu, BotaoRecolherMenu, useMenuRecolhido,
} from "../ui/painel-shell";
import simboloFindLook from "../../../imports/findlook/findlook-simbolo.png";
import logoFindLook from "../../../imports/findlook/findlook-horizontal-sobre-claro.png";
import { CabecalhoDaPagina, SeletorDePeriodo, BotaoDividido } from "../ui/painel-cabecalho";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { SectionHeader } from "./shared/SectionHeader";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "../ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type Bi = { en: string; pt: string };
type TFn = (en: string, pt: string) => string;

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

/* ── Breadcrumb ── */
const bc = (en: string, pt: string): Bi => ({ en, pt });
const breadcrumbPaths: Bi[][] = [
  [bc("Dashboard", "Painel"), bc("Projects", "Projetos"), bc("Graphite UI", "Graphite UI")],
  [bc("Settings", "Configurações"), bc("Billing", "Cobrança"), bc("Subscription", "Assinatura")],
  [bc("Analytics", "Análises"), bc("Reports", "Relatórios")],
];

// As demonstrações usam os componentes reais de ui/, os mesmos que o produto copia.
function Breadcrumb({ path }: { path: Bi[] }) {
  const { bi } = useI18n();
  return (
    <UiBreadcrumb>
      <BreadcrumbList>
        {path.map((item, i) => (
          <React.Fragment key={item.en}>
            {i > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {i === path.length - 1
                ? <BreadcrumbPage>{bi(item)}</BreadcrumbPage>
                : <BreadcrumbLink href="#" onClick={e => e.preventDefault()}>{bi(item)}</BreadcrumbLink>}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </UiBreadcrumb>
  );
}

/* ── Pagination ── */
function Pagination({ total = 12, current = 4, onChange }: { total?: number; current?: number; onChange?: (p: number) => void }) {
  const { t } = useI18n();
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  const visible: (number | "...")[] = [];

  if (total <= 7) {
    visible.push(...pages);
  } else {
    visible.push(1);
    if (current > 3) visible.push("...");
    for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) visible.push(p);
    if (current < total - 2) visible.push("...");
    visible.push(total);
  }
  const ir = (p: number) => (e: React.MouseEvent) => { e.preventDefault(); if (p >= 1 && p <= total) onChange?.(p); };

  return (
    <UiPagination className="mx-0 w-auto justify-start">
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href="#" onClick={ir(current - 1)} aria-label={t("Previous page", "Página anterior")} aria-disabled={current === 1} className={current === 1 ? "pointer-events-none opacity-40" : ""}>
            <ChevronRight className="h-4 w-4 rotate-180" />
          </PaginationLink>
        </PaginationItem>
        {visible.map((p, i) => (
          <PaginationItem key={`${p}-${i}`}>
            {p === "..."
              ? <PaginationEllipsis />
              : <PaginationLink href="#" onClick={ir(p)} isActive={p === current}>{p}</PaginationLink>}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink href="#" onClick={ir(current + 1)} aria-label={t("Next page", "Próxima página")} aria-disabled={current === total} className={current === total ? "pointer-events-none opacity-40" : ""}>
            <ChevronRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </UiPagination>
  );
}

/* ── Tooltip wrapper ── */
function TooltipDemo({ content, children }: { content: Bi; children: React.ReactNode }) {
  const { bi } = useI18n();
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent sideOffset={6}>{bi(content)}</TooltipContent>
    </Tooltip>
  );
}

/* ── Drawer ── */
function DrawerDemo({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n();
  return (
    <Sheet open={open} onOpenChange={v => { if (!v) onClose(); }}>
      <SheetContent side="right" className="w-80 gap-0 p-0 sm:max-w-80">
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="text-[1rem] font-semibold">{t("Drawer Panel", "Painel lateral")}</SheetTitle>
          <SheetDescription className="sr-only">{t("Example of a side panel", "Exemplo de painel lateral")}</SheetDescription>
        </SheetHeader>
        <div className="flex-1 space-y-4 px-6 py-5">
          <p className="text-[0.9rem] text-muted-foreground">{t("This is a slide-in drawer panel. It overlays the content and provides contextual actions or additional details.", "Este é um painel lateral deslizante. Ele se sobrepõe ao conteúdo e oferece ações contextuais ou detalhes adicionais.")}</p>
          <div className="space-y-3">
            {[["Profile Settings", "Configurações do perfil"], ["Notifications", "Notificações"], ["Store data", "Dados da loja"], ["Opening hours", "Horário de funcionamento"]].map(([en, pt]) => (
              <button key={en} className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-[0.9rem] font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                {t(en, pt)}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
        <SheetFooter className="border-t border-border px-6 py-5">
          <Button className="w-full" onClick={onClose}>{t("Done", "Concluído")}</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function ListaDePartes({ itens, className = "" }: { itens: { nome: string; texto: string }[]; className?: string }) {
  return (
    <dl className={`grid gap-4 ${className}`}>
      {itens.map(item => (
        <div key={item.nome}>
          <dt className="text-[0.875rem] font-semibold text-foreground">{item.nome}</dt>
          <dd className="mt-0.5 text-[0.8125rem] leading-relaxed text-muted-foreground">{item.texto}</dd>
        </div>
      ))}
    </dl>
  );
}

const itensDoMenu = [
  { id: "inicio", rotulo: "Início", icone: <House /> },
  { id: "pedidos", rotulo: "Pedidos", icone: <ShoppingBag />, contador: 3 },
  { id: "produtos", rotulo: "Produtos", icone: <Package /> },
  { id: "relatorios", rotulo: "Relatórios", icone: <ChartColumn /> },
];
const itensDaLoja = [
  { id: "perfil", rotulo: "Perfil da loja", icone: <Store /> },
  { id: "equipe", rotulo: "Equipe", icone: <Users /> },
];

/* Logo do menu: inteiro quando expandido, só o símbolo quando recolhido. */
function LogoDoMenuExemplo() {
  return useMenuRecolhido()
    ? <span className="flex h-9 items-center justify-center"><img src={simboloFindLook} alt="FindLook" className="h-8 w-8 object-contain" /></span>
    : <span className="flex h-9 items-center"><img src={logoFindLook} alt="FindLook" className="h-8 w-auto max-w-none object-contain" /></span>;
}

/* Exemplo do menu recolhível: menu lateral + cabeçalho branco com o perfil à direita + conteúdo no fundo cinza. */
function ExemploMenuRecolhivel() {
  const [ativo, setAtivo] = useState("inicio");
  return (
    <MenuLateralProvider chave="findlook-ds:exemplo-menu:menu-recolhido">
      <div className="flex h-[500px] overflow-hidden rounded-lg border border-border bg-muted">
        <MenuLateral>
          <div className="flex h-full min-h-0 flex-col">
            <div className="shrink-0 space-y-3 px-4 pb-3 pt-4">
              <LogoDoMenuExemplo />
              <SeletorDeLoja loja="Ateliê Aurora" />
            </div>
            <NavDoMenu aria-label="Menu do painel (exemplo recolhível)">
              <GrupoDoMenu>
                {itensDoMenu.map(item => (
                  <ItemDoMenu key={item.id} href="#" icone={item.icone} ativo={ativo === item.id} contador={item.contador} rotuloContador="pedidos novos" onClick={e => { e.preventDefault(); setAtivo(item.id); }}>
                    {item.rotulo}
                  </ItemDoMenu>
                ))}
              </GrupoDoMenu>
              <DivisorDoMenu />
              <GrupoDoMenu titulo="Minha loja">
                {itensDaLoja.map(item => (
                  <ItemDoMenu key={item.id} href="#" icone={item.icone} ativo={ativo === item.id} onClick={e => { e.preventDefault(); setAtivo(item.id); }}>
                    {item.rotulo}
                  </ItemDoMenu>
                ))}
              </GrupoDoMenu>
            </NavDoMenu>
            {/* Abaixo de 1024 px o botão não aparece; o pé vazio some junto (empty:hidden). */}
            <div className="shrink-0 border-t border-border p-4 empty:hidden">
              <BotaoRecolherMenu />
            </div>
          </div>
        </MenuLateral>
        <div className="hidden min-w-0 flex-1 flex-col sm:flex">
          <div className="flex shrink-0 items-center gap-2 border-b border-border bg-card px-3 py-2.5">
            <span className="min-w-0 flex-1 truncate text-[0.875rem] font-semibold text-foreground">{[...itensDoMenu, ...itensDaLoja].find(i => i.id === ativo)?.rotulo}</span>
            <GatilhoDaConta nome="Ana Oliveira" papel="Proprietária" className="shrink-0" />
          </div>
          <div className="min-h-0 flex-1 space-y-3 p-4" aria-hidden>
            <div className="h-20 rounded-lg border border-border bg-card" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-24 rounded-lg border border-border bg-card" />
              <div className="h-24 rounded-lg border border-border bg-card" />
            </div>
          </div>
        </div>
      </div>
    </MenuLateralProvider>
  );
}

const regrasMenuRecolhivel: { titulo: string; texto: string }[] = [
  { titulo: "Expandido ou recolhido", texto: "Expandido, o menu mostra ícone e nome (256 px). Recolhido, só os ícones (72 px), centralizados. A largura muda com os tokens de movimento (--duration-normal, --ease-in-out); com “menos movimento”, a troca é instantânea." },
  { titulo: "Botão no pé do menu", texto: "“Recolher menu” vira “Expandir menu”. Tem aria-expanded e aria-controls (aponta para o menu) e anel de foco visível. Recolhido, fica só com o ícone e mantém o nome para leitores de tela." },
  { titulo: "Recolhido", texto: "Os títulos dos grupos viram uma linha fina. Cada item mostra um tooltip com o nome ao passar o mouse e ao chegar pelo teclado, e continua com o nome para leitores de tela. O item ativo mantém o fundo e a barra à esquerda, na altura toda. O contador vira um ponto no ícone, e o tooltip diz o número (“Pedidos, 3 pedidos novos”). O logo mostra só o símbolo." },
  { titulo: "Escolha guardada", texto: "A escolha fica salva no navegador (localStorage, uma chave por painel) e volta ao abrir de novo, sem piscar e sem animar na abertura." },
  { titulo: "Celular e tablet", texto: "Abaixo de 1024 px, o menu não recolhe: continua a gaveta de hoje, sempre expandida, sem o botão." },
  { titulo: "Cabeçalho e perfil", texto: "Cabeçalho branco, igual ao menu lateral, com linha fina embaixo; perfil sempre no cabeçalho, à direita. O conteúdo fica no fundo cinza claro. O perfil nunca vai para o menu lateral." },
];

/* Opção A (decisão da dona do produto, 23/11/2026): cabeçalho da página fora do card (título, descrição e abas);
   conteúdo em cards com cabeçalho de ícone, um card por assunto. Sem linhas desnecessárias. */
function ExemploOpcaoA() {
  const [aba, setAba] = useState("notificacoes");
  const [avisos, setAvisos] = useState({ reservas: true, buscas: false, email: true, whatsapp: false });
  const linha = (id: keyof typeof avisos, titulo: string, texto: string) => (
    <div key={id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <label htmlFor={`exa-${id}`} className="block cursor-pointer text-[0.875rem] font-medium text-foreground">{titulo}</label>
        <p id={`exa-${id}-d`} className="text-[0.75rem] text-muted-foreground">{texto}</p>
      </div>
      <Switch id={`exa-${id}`} checked={avisos[id]} onCheckedChange={v => setAvisos(a => ({ ...a, [id]: v }))} aria-describedby={`exa-${id}-d`} />
    </div>
  );
  return (
    <div className="@container space-y-5 rounded-lg border border-border bg-muted p-4 sm:p-6">
      <CabecalhoDaPagina
        nivel={3}
        titulo="Configurações da loja"
        descricao="Essas informações aparecem na vitrine da sua loja na FindLook."
        abas={<AbasComContador estilo="pagina" idBase="exemplo-opcao-a" rotulo="Seções das configurações (exemplo)" valor={aba} onChange={setAba} abas={[{ valor: "perfil", rotulo: "Perfil da loja" }, { valor: "notificacoes", rotulo: "Notificações" }, { valor: "conta", rotulo: "Conta e privacidade" }]} />}
      />
      <div id="exemplo-opcao-a-painel" role="tabpanel" aria-labelledby={`exemplo-opcao-a-aba-${aba}`} className="space-y-4">
        {aba === "notificacoes" ? (
          <>
            <CardComCabecalho nivel={4} icone={<Bell />} titulo="O que avisar" descricao="Escolha quais movimentos da sua vitrine geram aviso.">
              <div className="divide-y divide-border">
                {linha("reservas", "Pedido de reserva", "Quando alguém pede para a loja separar uma peça.")}
                {linha("buscas", "Busca compatível", "Quando alguém da região procura uma peça parecida.")}
              </div>
            </CardComCabecalho>
            <CardComCabecalho nivel={4} icone={<Send />} titulo="Onde avisar" descricao="Os avisos ficam sempre no painel; e-mail e WhatsApp são opcionais.">
              <div className="divide-y divide-border">
                {linha("email", "Por e-mail", "ana@atelieaurora.com.br")}
                {linha("whatsapp", "Pelo WhatsApp", "(11) 98765-4321")}
              </div>
            </CardComCabecalho>
          </>
        ) : (
          <CardComCabecalho nivel={4} icone={aba === "perfil" ? <Store /> : <UserRound />} titulo={aba === "perfil" ? "Identidade da loja" : "Sua conta"} descricao="Exemplo: troque de aba para ver o conteúdo mudar embaixo do cabeçalho." />
        )}
      </div>
    </div>
  );
}

const regrasOpcaoA: { titulo: string; texto: string }[] = [
  { titulo: "Cabeçalho da página fora do card", texto: "Título, descrição e abas ficam no fundo da página, sem card em volta e sem linha embaixo. Ações da página (um botão) ficam à direita do título." },
  { titulo: "Abas da página", texto: "Logo abaixo do título (AbasComContador estilo=\"pagina\" com idBase). Sem linha de base de ponta a ponta: só a aba ativa tem o sublinhado. No celular, quebram de linha; nunca rolam para o lado." },
  { titulo: "Conteúdo em cards com cabeçalho de ícone", texto: "CardComCabecalho: ícone de 40 px na base rosa clara (--primary-muted) com ícone vermelho (--primary-text), título no estilo de título de card e uma linha de descrição; ação opcional à direita, alinhada ao topo. Um card por assunto (ex.: “O que avisar” e “Onde avisar”)." },
  { titulo: "Sem linhas desnecessárias", texto: "Nada de linha entre o cabeçalho do card e o conteúdo, nem entre grupos dentro do card: o espaçamento separa. A linha fica só onde tem sentido, entre as linhas de uma lista ou tabela." },
  { titulo: "O modelo antigo sai", texto: "Título e abas dentro do cabeçalho de um card grande não são mais usados." },
];

/* Classes do conteúdo dos menus do exemplo (mesmas do Dropdown de ações). */
const menuConteudo = "z-50 min-w-[220px] bg-card border border-border rounded-md p-1.5";
const menuItem = "gap-2 px-3 py-2 text-[0.875rem] font-medium text-foreground rounded-sm cursor-pointer";

/* Accordion slide animations */
const accordionStyles = `
  @keyframes accordion-down {
    from { height: 0; opacity: 0; }
    to   { height: var(--radix-accordion-content-height); opacity: 1; }
  }
  @keyframes accordion-up {
    from { height: var(--radix-accordion-content-height); opacity: 1; }
    to   { height: 0; opacity: 0; }
  }
  .animate-accordion-down { animation: accordion-down 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
  .animate-accordion-up   { animation: accordion-up   0.18s ease-in; }
`;

export function OverlaysShowcase() {
  const { t, bi } = useI18n();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [paginationPage, setPaginationPage] = useState(4);
  const [itemAtivo, setItemAtivo] = useState("pedidos");
  const [avisoBusca, setAvisoBusca] = useState("");
  const [periodoCabecalho, setPeriodoCabecalho] = useState("30");
  const rotuloAtivo = [...itensDoMenu, ...itensDaLoja].find(i => i.id === itemAtivo)?.rotulo;

  return (
    <div className="space-y-16">
      <style>{accordionStyles}</style>

      {/* ── BREADCRUMB ── */}
      <section id="breadcrumb">
        <SectionHeader title={t("Breadcrumb", "Breadcrumb")} description={t("Hierarchical navigation showing the current page location.", "Navegação hierárquica que mostra a localização da página atual.")} />
        <SubSection title={t("Breadcrumb Variants", "Variantes de breadcrumb")}>
          <ShowcaseCard>
            <div className="space-y-4">
              {breadcrumbPaths.map((path, i) => (
                <Breadcrumb key={i} path={path} />
              ))}
            </div>
          </ShowcaseCard>
        </SubSection>
      </section>

      {/* ── PAGINATION ── */}
      <section id="pagination">
        <SectionHeader title={t("Pagination", "Paginação")} description={t("Navigate between pages with ellipsis for large page counts.", "Navegue entre páginas, com reticências para grandes quantidades de páginas.")} />
        <SubSection title={t("Pagination Controls", "Controles de paginação")}>
          <ShowcaseCard>
            <div className="space-y-6">
              <Pagination total={12} current={paginationPage} onChange={setPaginationPage} />
              <Pagination total={5} current={2} />
              <Pagination total={3} current={1} />
            </div>
          </ShowcaseCard>
        </SubSection>
      </section>

      {/* ── MENU DO PAINEL ── */}
      <section id="menu-painel">
        <SectionHeader title="Menu do painel" description="Menu lateral do painel da loja: troca de loja, páginas agrupadas por assunto e o plano atual no rodapé. Nas telas a partir de 1024 px, pode ficar expandido ou recolhido (só ícones)." />
        <SubSection title="Anatomia do menu">
          <ShowcaseCard>
            <div>
              <div className="w-64 max-w-full">
                <nav aria-label="Menu do painel (exemplo)" className="flex flex-col gap-2 rounded-lg border border-border bg-background p-3">
                  <SeletorDeLoja loja="Ateliê Aurora" />
                  <GrupoDoMenu>
                    {itensDoMenu.map(item => (
                      <ItemDoMenu key={item.id} href="#" icone={item.icone} ativo={itemAtivo === item.id} contador={item.contador} rotuloContador="pedidos novos" onClick={e => { e.preventDefault(); setItemAtivo(item.id); }}>
                        {item.rotulo}
                      </ItemDoMenu>
                    ))}
                  </GrupoDoMenu>
                  <GrupoDoMenu titulo="Minha loja">
                    {itensDaLoja.map(item => (
                      <ItemDoMenu key={item.id} href="#" icone={item.icone} ativo={itemAtivo === item.id} onClick={e => { e.preventDefault(); setItemAtivo(item.id); }}>
                        {item.rotulo}
                      </ItemDoMenu>
                    ))}
                  </GrupoDoMenu>
                  <CardDePlano compacto plano="Plano Desempenho" preco="R$ 149" className="mt-2" />
                </nav>
              </div>
            </div>
          </ShowcaseCard>
        </SubSection>
        <SubSection title="Menu recolhível">
          <ShowcaseCard>
            <div id="menu-recolhivel" className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start">
              <ExemploMenuRecolhivel />
              <ul className="space-y-3">
                {regrasMenuRecolhivel.map(r => (
                  <li key={r.titulo} className="text-[0.8125rem] leading-relaxed text-muted-foreground">
                    <span className="block text-[0.875rem] font-semibold text-foreground">{r.titulo}</span>
                    {r.texto}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-5 text-[0.8125rem] leading-relaxed text-muted-foreground">
              No código: <code className="rounded-sm bg-muted px-1 py-0.5 text-[0.75rem] text-foreground">MenuLateralProvider</code> (guarda a escolha) envolve o painel;{" "}
              <code className="rounded-sm bg-muted px-1 py-0.5 text-[0.75rem] text-foreground">MenuLateral</code> é a coluna que muda de largura;{" "}
              <code className="rounded-sm bg-muted px-1 py-0.5 text-[0.75rem] text-foreground">NavDoMenu</code>,{" "}
              <code className="rounded-sm bg-muted px-1 py-0.5 text-[0.75rem] text-foreground">DivisorDoMenu</code> e{" "}
              <code className="rounded-sm bg-muted px-1 py-0.5 text-[0.75rem] text-foreground">BotaoRecolherMenu</code> completam o menu. Item, grupo, seletor de loja e cards do rodapé se adaptam sozinhos;{" "}
              <code className="rounded-sm bg-muted px-1 py-0.5 text-[0.75rem] text-foreground">useMenuRecolhido()</code> troca o logo pelo símbolo. Na gaveta do celular, os mesmos itens aparecem expandidos.
            </p>
          </ShowcaseCard>
        </SubSection>
      </section>

      {/* ── BARRA SUPERIOR ── */}
      <section id="barra-superior">
        <SectionHeader title="Barra superior" description="Barra no topo do painel com a busca global, as notificações e o menu da conta. Branca, igual ao menu lateral, com linha fina embaixo; o perfil fica sempre aqui, à direita." />
        <SubSection title="Barra do painel">
          <ShowcaseCard>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 sm:gap-3">
              <div className="min-w-0 flex-1">
                <CampoDeBuscaGlobal onAbrir={() => setAvisoBusca("No painel, este campo abre a busca global, a mesma que abre com Ctrl + K.")} />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <BotaoDeNotificacoes naoLidas={4} className="shrink-0" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={6} className={menuConteudo} style={{ boxShadow: "var(--shadow-lg)" }}>
                  <DropdownMenuLabel className="px-3 py-1.5 text-[0.75rem] font-semibold text-muted-foreground">4 não lidas</DropdownMenuLabel>
                  <DropdownMenuItem className={menuItem}><ShoppingBag />Novo pedido de Júlia</DropdownMenuItem>
                  <DropdownMenuItem className={menuItem}><CalendarCheck />Reserva confirmada para amanhã</DropdownMenuItem>
                  <DropdownMenuItem className={menuItem}><Star />Nova avaliação: 5 estrelas</DropdownMenuItem>
                  <DropdownMenuItem className={menuItem}><Package />Produto com estoque baixo</DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1 bg-border" />
                  <DropdownMenuItem className={menuItem}>Ver todas as notificações</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <GatilhoDaConta nome="Ana Oliveira" papel="Proprietária" className="shrink-0" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={6} className={menuConteudo} style={{ boxShadow: "var(--shadow-lg)" }}>
                  <DropdownMenuLabel className="px-3 py-1.5">
                    <span className="block text-[0.875rem] font-semibold text-foreground">Ana Oliveira</span>
                    <span className="block text-[0.75rem] font-normal text-muted-foreground">Proprietária · Ateliê Aurora</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-1 bg-border" />
                  <DropdownMenuItem className={menuItem}><UserRound />Meu perfil</DropdownMenuItem>
                  <DropdownMenuItem className={menuItem}><Settings />Configurações da conta</DropdownMenuItem>
                  <DropdownMenuItem className={menuItem}><ArrowLeftRight />Trocar de loja</DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1 bg-border" />
                  <DropdownMenuItem className={menuItem}><LogOut />Sair</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </ShowcaseCard>
        </SubSection>
      </section>

      {/* ── CABEÇALHO DA PÁGINA ── */}
      <section id="cabecalho-pagina">
        <SectionHeader title="Cabeçalho da página" description="Abertura de cada página do painel: saudação, título, uma frase de contexto e as ações da página. Cabeçalho da página fora do card: título, descrição e abas; conteúdo em cards com cabeçalho de ícone." />
        <SubSection title="Cabeçalho com ações">
          <ShowcaseCard>
            <div className="@container rounded-lg border border-border bg-background p-5">
              <CabecalhoDaPagina nivel={3}
                saudacao="Olá, Ana! 👋"
                titulo="Sua loja em destaque na **FindLook**"
                descricao="Veja como sua loja está indo e o que fazer hoje para vender mais."
                acoes={<>
                  <SeletorDePeriodo valor={periodoCabecalho} onChange={setPeriodoCabecalho} />
                  <BotaoDividido
                    rotulo="Cadastrar produto"
                    icone={<PlusIcon />}
                    acoes={[
                      { rotulo: "Cadastrar produto", icone: <PlusIcon /> },
                      { rotulo: "Importar planilha", icone: <FileSpreadsheet /> },
                      { rotulo: "Cadastrar com fotos", icone: <Camera /> },
                    ]}
                  />
                </>}
              />
            </div>
          </ShowcaseCard>
        </SubSection>
        <SubSection title="Página com abas e cards (Opção A)">
          <ShowcaseCard>
            <div id="pagina-opcao-a" className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-start">
              <ExemploOpcaoA />
              <ul className="space-y-3">
                {regrasOpcaoA.map(r => (
                  <li key={r.titulo} className="text-[0.8125rem] leading-relaxed text-muted-foreground">
                    <span className="block text-[0.875rem] font-semibold text-foreground">{r.titulo}</span>
                    {r.texto}
                  </li>
                ))}
              </ul>
            </div>
          </ShowcaseCard>
        </SubSection>
      </section>

      {/* ── TOOLTIPS ── */}
      <section id="tooltips">
        <SectionHeader title={t("Tooltips", "Tooltips")} description={t("Contextual information on hover for icons and interactive elements.", "Informações contextuais ao passar o mouse sobre ícones e elementos interativos.")} />
        <SubSection title={t("Tooltip Variants", "Variantes de tooltip")}>
          <ShowcaseCard>
            <div className="flex flex-wrap gap-4">
              <TooltipDemo content={{ en: "View notifications", pt: "Ver notificações" }}><button className="h-10 w-10 rounded-md border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"><Bell className="h-4.5 w-4.5" style={{ height: "18px", width: "18px" }} /></button></TooltipDemo>
              <TooltipDemo content={{ en: "Open settings", pt: "Abrir configurações" }}><button className="h-10 w-10 rounded-md border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"><Settings className="h-4.5 w-4.5" style={{ height: "18px", width: "18px" }} /></button></TooltipDemo>
              <TooltipDemo content={{ en: "Get help and documentation", pt: "Obter ajuda e documentação" }}><button className="h-10 w-10 rounded-md border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"><HelpCircle className="h-4.5 w-4.5" style={{ height: "18px", width: "18px" }} /></button></TooltipDemo>
              <TooltipDemo content={{ en: "Important information about this field", pt: "Informação importante sobre este campo" }}><button className="inline-flex items-center gap-1.5 text-[0.875rem] text-muted-foreground underline underline-offset-2 decoration-dashed hover:text-foreground transition-colors"><Info className="h-4 w-4" />{t("Learn more", "Saiba mais")}</button></TooltipDemo>
            </div>
          </ShowcaseCard>
        </SubSection>
      </section>

      {/* ── DROPDOWN ── */}
      <section id="dropdown">
        <SectionHeader title={t("Dropdown Menus", "Menus dropdown")} description={t("Context menus and action dropdowns with keyboard navigation.", "Menus de contexto e dropdowns de ações com navegação por teclado.")} />
        <SubSection title={t("Action Dropdown", "Dropdown de ações")}>
          <ShowcaseCard>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center gap-2 h-10 px-4 text-[0.9375rem] font-semibold rounded-md border border-border bg-card hover:bg-accent text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {t("Actions", "Ações")}
                  <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="m6 9 6 6 6-6"/></svg>
                </button>
              </DropdownMenuTrigger>
                <DropdownMenuContent
                  sideOffset={6}
                  align="start"
                  className="z-50 min-w-[180px] bg-card border border-border rounded-md p-1.5 shadow-lg animate-in fade-in-0 zoom-in-95"
                  style={{ boxShadow: "var(--shadow-lg)" }}
                >
                  {[
                    { icon: Settings, label: { en: "Edit", pt: "Editar" }, shortcut: "⌘E" },
                    { icon: Check,    label: { en: "Approve", pt: "Aprovar" },  shortcut: null },
                    { icon: Bell,     label: { en: "Notify", pt: "Notificar" },   shortcut: null },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem
                        key={item.label.en}
                        className="flex items-center justify-between gap-2 px-3 py-2 text-[0.875rem] font-medium text-foreground rounded-sm hover:bg-accent cursor-pointer outline-none"
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          {bi(item.label)}
                        </span>
                        {item.shortcut && <span className="text-[0.75rem] text-muted-foreground font-normal">{item.shortcut}</span>}
                      </DropdownMenuItem>
                    );
                  })}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-[0.875rem] font-medium text-primary rounded-sm hover:bg-primary/10 cursor-pointer outline-none">
                    <Trash2 className="h-4 w-4" />
                    {t("Delete", "Excluir")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </ShowcaseCard>
        </SubSection>
      </section>

      {/* ── DIALOGS ── */}
      <section id="dialogs">
        <SectionHeader title={t("Dialogs & Modals", "Diálogos e modais")} description={t("Focused overlay panels for forms, confirmations, and contextual actions.", "Painéis sobrepostos e focados para formulários, confirmações e ações contextuais.")} />
        <SubSection title={t("Dialog Variants", "Variantes de diálogo")}>
          <ShowcaseCard>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setDialogOpen(true)}
                className="inline-flex items-center gap-2 h-10 px-4 text-[0.9375rem] font-semibold rounded-md bg-primary text-primary-foreground hover:bg-[var(--primary-hover)] transition-colors"
              >
                {t("Open Dialog", "Abrir diálogo")}
              </button>
              <button
                onClick={() => setConfirmOpen(true)}
                className="inline-flex items-center gap-2 h-10 px-4 text-[0.9375rem] font-semibold rounded-md border border-border bg-card hover:bg-accent text-foreground transition-colors"
              >
                {t("Confirm Dialog", "Diálogo de confirmação")}
              </button>
              <button
                onClick={() => setDrawerOpen(true)}
                className="inline-flex items-center gap-2 h-10 px-4 text-[0.9375rem] font-semibold rounded-md border border-border bg-card hover:bg-accent text-foreground transition-colors"
              >
                {t("Open Drawer", "Abrir painel lateral")}
              </button>
            </div>
          </ShowcaseCard>
        </SubSection>
      </section>

      {/* ── DIALOG MODALS ── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md gap-0 rounded-[20px] p-6 sm:max-w-md" style={{ boxShadow: "var(--shadow-xl)" }}>
            <div className="mb-5 pr-8">
              <div>
                <DialogTitle className="text-[1.125rem] font-semibold text-foreground">{t("Create Project", "Criar projeto")}</DialogTitle>
                <DialogDescription className="text-[0.875rem] text-muted-foreground mt-0.5">{t("Set up a new workspace project.", "Configure um novo projeto no workspace.")}</DialogDescription>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.875rem] font-medium text-foreground">{t("Project Name", "Nome do projeto")}</label>
                <Input placeholder={t("Enter project name...", "Digite o nome do projeto...")} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.875rem] font-medium text-foreground">{t("Description", "Descrição")}</label>
                <Textarea rows={3} placeholder={t("Describe your project...", "Descreva seu projeto...")} />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <DialogClose asChild><Button variant="outline">{t("Cancel", "Cancelar")}</Button></DialogClose>
              <Button>{t("Create Project", "Criar projeto")}</Button>
            </div>
          </DialogContent>
      </Dialog>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialogContent className="max-w-sm gap-0 rounded-[20px] p-6 sm:max-w-sm" style={{ boxShadow: "var(--shadow-xl)" }}>
            <div className="flex flex-col items-center text-center gap-4 mb-5">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Trash2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <AlertDialogTitle className="text-[1.125rem] font-semibold text-foreground">{t("Delete Project", "Excluir projeto")}</AlertDialogTitle>
                <AlertDialogDescription className="text-[0.875rem] text-muted-foreground mt-1">{t("This action cannot be undone. All data will be permanently removed.", "Esta ação não pode ser desfeita. Todos os dados serão removidos permanentemente.")}</AlertDialogDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <AlertDialogCancel className="flex-1">{t("Cancel", "Cancelar")}</AlertDialogCancel>
              <AlertDialogAction className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90">{t("Delete", "Excluir")}</AlertDialogAction>
            </div>
          </AlertDialogContent>
      </AlertDialog>

      <DrawerDemo open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* ── Accordion ── */}
      <section id="accordion" className="space-y-5 mt-10">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-[1.5rem] font-semibold tracking-[-0.02em] text-foreground">{t("Accordion", "Sanfona (accordion)")}</h2>
          <p className="text-[0.8125rem] text-muted-foreground mt-0.5">{t("Collapsible content panels powered by Radix UI. Three style variants.", "Painéis de conteúdo recolhíveis com Radix UI. Três variantes de estilo.")}</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Variant 1 — Default (bordered, single open) */}
          <ShowcaseCard>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-muted-foreground mb-4">{t("Default — Single open", "Padrão — Um aberto por vez")}</p>
            <Accordion type="single" collapsible className="w-full divide-y divide-border rounded-md border border-border overflow-hidden">
              {defaultItems.map(item => (
                <AccordionItem key={item.value} value={item.value} className="border-b-0">
                    <AccordionTrigger className="group flex w-full items-center justify-between px-5 py-4 text-[0.9375rem] font-semibold text-foreground bg-card hover:bg-muted transition-colors data-[state=open]:bg-muted">
                      {bi(item.label)}
                    </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <div className="px-5 pb-5 pt-3 text-[0.875rem] text-muted-foreground leading-relaxed bg-card">
                      {bi(item.content)}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ShowcaseCard>

          {/* Variant 2 — Flush (no outer border, subtle separator) */}
          <ShowcaseCard>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-muted-foreground mb-4">{t("Flush — Multiple open", "Flush — Vários abertos")}</p>
            <Accordion type="multiple" className="w-full divide-y divide-border">
              {flushItems.map(item => (
                <AccordionItem key={item.value} value={item.value} className="border-b-0">
                    <AccordionTrigger semIcone className="group flex w-full items-center justify-between py-4 text-[0.9375rem] font-semibold text-foreground hover:text-primary transition-colors">
                      <span className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 text-primary shrink-0" />
                        {bi(item.label)}
                      </span>
                      <span className="h-5 w-5 rounded-full border border-border flex items-center justify-center shrink-0 transition-colors group-data-[state=open]:bg-primary group-data-[state=open]:border-primary">
                        <Plus className="h-3 w-3 text-muted-foreground group-data-[state=open]:hidden" />
                        <Minus className="h-3 w-3 text-white hidden group-data-[state=open]:block" />
                      </span>
                    </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <div className="pb-4 text-[0.875rem] text-muted-foreground leading-relaxed">
                      {bi(item.content)}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ShowcaseCard>

          {/* Variant 3 — Card stack (each item is its own card) */}
          <ShowcaseCard>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-muted-foreground mb-4">{t("Card stack — FAQ style", "Pilha de cards — estilo FAQ")}</p>
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqItems.map(item => (
                <AccordionItem
                  key={item.value}
                  value={item.value}
                  className="rounded-md border border-border bg-background overflow-hidden data-[state=open]:border-primary/40 data-[state=open]:bg-primary/[0.03] transition-colors"
                >
                    <AccordionTrigger className="group flex w-full items-center justify-between px-4 py-3.5 text-[0.875rem] font-semibold text-foreground">
                      <span className="text-left">{bi(item.label)}</span>
                    </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <div className="px-4 pb-4 text-[0.8125rem] text-muted-foreground leading-relaxed border-t border-border/50 pt-3">
                      {bi(item.content)}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ShowcaseCard>
        </div>
      </section>

      {/* ── Tokens ── */}
      <section id="overlays-tokens" className="space-y-5 mt-10">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-[1.5rem] font-semibold tracking-[-0.02em] text-foreground">{t("Tokens", "Tokens")}</h2>
          <p className="text-[0.8125rem] text-muted-foreground mt-0.5">{t("CSS custom properties used by popovers, dialogs, tooltips, and navigation.", "Propriedades CSS customizadas usadas por popovers, diálogos, tooltips e navegação.")}</p>
        </div>
        <TokenTable groups={overlaysTokenGroups(t)} />
      </section>
    </div>
  );
}

/* ── Accordion data ── */
const defaultItems = [
  {
    value: "what",
    label: { en: "O que é o FindLook Design System?", pt: "O que é o FindLook Design System?" },
    content: { en: "Os fundamentos, componentes e padrões da FindLook, plataforma web de descoberta de moda local. Paleta Pink + Grafite, Plus Jakarta Sans, modo claro e escuro e meta WCAG 2.2 AA.", pt: "Os fundamentos, componentes e padrões da FindLook, plataforma web de descoberta de moda local. Paleta Pink + Grafite, Plus Jakarta Sans, modo claro e escuro e meta WCAG 2.2 AA." },
  },
  {
    value: "tokens",
    label: { en: "How do I use the design tokens?", pt: "Como usar os design tokens?" },
    content: { en: "All tokens are CSS custom properties accessible via var(--token-name). Use them directly in CSS or via Tailwind v4 classes mapped in the @theme inline of the theme.css file.", pt: "Todos os tokens são propriedades CSS customizadas acessíveis via var(--token-name). Use-os diretamente no CSS ou por classes do Tailwind v4 mapeadas no @theme inline do arquivo theme.css." },
  },
  {
    value: "radix",
    label: { en: "Which Radix UI primitives are included?", pt: "Quais primitivos do Radix UI estão incluídos?" },
    content: { en: "Dialog, Dropdown Menu, Tooltip, Accordion, Tabs, Popover, Switch, Checkbox, Select, Radio Group, Slider, Progress and more. All are fully keyboard accessible and follow ARIA guidelines.", pt: "Dialog, Dropdown Menu, Tooltip, Accordion, Tabs, Popover, Switch, Checkbox, Select, Radio Group, Slider, Progress e mais. Todos são totalmente acessíveis por teclado e seguem as diretrizes ARIA." },
  },
  {
    value: "dark",
    label: { en: "Is Dark Mode supported in all components?", pt: "O dark mode é suportado em todos os componentes?" },
    content: { en: "Yes. Every semantic token has a light and dark variant defined in the theme.css file. Switching modes is instant via the .dark class on the root element, with no Flash of Unstyled Content.", pt: "Sim. Todo token semântico tem uma variante clara e uma escura definidas no arquivo theme.css. A troca de modo é instantânea pela classe .dark no elemento raiz, sem Flash of Unstyled Content." },
  },
];

const flushItems = [
  {
    value: "security",
    icon: ShieldCheck,
    label: { en: "Your data", pt: "Seus dados" },
    content: { en: "Your choices, your data.", pt: "Suas escolhas, seus dados." },
  },
  {
    value: "billing",
    icon: CreditCard,
    label: { en: "Plan and payment", pt: "Plano e pagamento" },
    content: { en: "Launch Basic plan, R$ 9.99 per month. No commitment: cancel whenever you want.", pt: "Básico de lançamento, R$ 9,99 por mês. Sem fidelidade: cancele quando quiser." },
  },
  {
    value: "performance",
    icon: Zap,
    label: { en: "Item availability", pt: "Disponibilidade das peças" },
    content: { en: "Availability must be confirmed with the store.", pt: "A disponibilidade deve ser confirmada com a loja." },
  },
  {
    value: "support",
    icon: MessageSquare,
    label: { en: "Support", pt: "Suporte" },
    content: { en: "Talk to the FindLook team through the support page.", pt: "Fale com a equipe FindLook pela página de suporte." },
  },
];

const faqItems = [
  {
    value: "trial",
    label: { en: "How does the search work?", pt: "Como funciona a busca?" },
    content: { en: "The search considers items listed by participating stores and thrift shops. Availability must be confirmed with the store.", pt: "A busca considera peças cadastradas por lojas e brechós participantes. A disponibilidade deve ser confirmada com a loja." },
  },
  {
    value: "cancel",
    label: { en: "Can I cancel whenever I want?", pt: "Posso cancelar quando quiser?" },
    content: { en: "Yes. No commitment: cancel whenever you want.", pt: "Sim. Sem fidelidade: cancele quando quiser." },
  },
  {
    value: "migration",
    label: { en: "How do I register my store?", pt: "Como cadastro minha loja?" },
    content: { en: "Use the Register my store button. Registration has 5 steps.", pt: "Pelo botão Cadastrar minha loja. O cadastro tem 5 etapas." },
  },
  {
    value: "limits",
    label: { en: "How much does it cost for my store?", pt: "Quanto custa para a minha loja?" },
    content: { en: "The launch Basic plan costs R$ 9.99 per month.", pt: "O plano Básico de lançamento custa R$ 9,99 por mês." },
  },
  {
    value: "api",
    label: { en: "Does it show new and used items?", pt: "Aparecem peças novas e usadas?" },
    content: { en: "Yes. FindLook brings together stores and thrift shops, with new and second-hand items.", pt: "Sim. A FindLook reúne lojas e brechós, com peças novas e de segunda mão." },
  },
];

const overlaysTokenGroups = (t: TFn): TokenGroup[] => [
  {
    group: t("Popover & Dialog Surface", "Superfície de popover e diálogo"),
    tokens: [
      { name: "--popover",            description: t("Floating panel background", "Fundo do painel flutuante"),    light: "#FFFFFF",             dark: "rgba(25,25,28,0.95)", isColor: true },
      { name: "--popover-foreground", description: t("Floating panel text", "Texto do painel flutuante"),          light: "#19191C",             dark: "#F6F6F7",             isColor: true },
      { name: "--card",               description: t("Dialog card background", "Fundo do card do diálogo"),       light: "#FFFFFF",             dark: "rgba(25,25,28,0.75)", isColor: true },
      { name: "--card-foreground",    description: t("Dialog card text", "Texto do card do diálogo"),             light: "#19191C",             dark: "#F6F6F7",             isColor: true },
    ],
  },
  {
    group: t("Border & Focus", "Borda e foco"),
    tokens: [
      { name: "--border",       description: t("Default border", "Borda padrão"),              light: "rgba(25,25,28,0.09)",  dark: "rgba(255,255,255,0.07)", isColor: true },
      { name: "--border-strong",description: t("Active / hover border", "Borda ativa / hover"),       light: "rgba(25,25,28,0.16)",  dark: "rgba(255,255,255,0.12)", isColor: true },
      { name: "--ring",         description: t("Keyboard focus ring", "Anel de foco do teclado"),         light: "rgba(230,32,64,0.35)", dark: "rgba(230,32,64,0.40)",   isColor: true },
    ],
  },
  {
    group: t("Elevation", "Elevação"),
    tokens: [
      { name: "--shadow-sm", description: t("Tooltip micro-shadow", "Micro-sombra do tooltip"),    light: "0 1px 3px …" },
      { name: "--shadow-md", description: t("Dropdown / popover", "Dropdown / popover"),      light: "0 4px 12px …" },
      { name: "--shadow-lg", description: t("Dialog / modal", "Diálogo / modal"),          light: "0 8px 24px …" },
      { name: "--shadow-xl", description: t("Full-page overlay", "Overlay de página inteira"),       light: "0 16px 48px …" },
    ],
  },
  {
    group: t("Background Overlay", "Overlay de fundo"),
    tokens: [
      { name: "--foreground / 20", description: t("Dialog backdrop (20% opacity)", "Backdrop do diálogo (20% de opacidade)"), light: "rgba(25,25,28,0.20)",  dark: "rgba(25,25,28,0.60)", isColor: true },
    ],
  },
  {
    group: t("Shape", "Forma"),
    tokens: [
      { name: "--radius-sm", description: t("Tooltip corner radius", "Raio de canto do tooltip"),  light: "calc(0.75rem - 4px)" },
      { name: "--radius-md", description: t("Dropdown corner radius", "Raio de canto do dropdown"), light: "0.75rem" },
      { name: "--radius-lg", description: t("Dialog corner radius", "Raio de canto do diálogo"),   light: "calc(0.75rem + 4px)" },
    ],
  },
  {
    group: t("Pagination", "Paginação"),
    tokens: [
      { name: "--primary",       description: t("Active page number bg", "Fundo do número da página ativa"), light: "#E62040",  dark: "#E62040",  isColor: true },
      { name: "--muted",         description: t("Page item hover bg", "Fundo do item de página no hover"),    light: "#E9E9EC",  dark: "rgba(44,44,51,0.60)", isColor: true },
      { name: "--muted-foreground",description: t("Inactive page text", "Texto de página inativa"),  light: "#888896",  dark: "#B3B3BC",  isColor: true },
    ],
  },
  {
    group: t("Accordion", "Sanfona (accordion)"),
    tokens: [
      { name: "--card",            description: t("Accordion panel background", "Fundo do painel do accordion"),      light: "#FFFFFF",              dark: "rgba(25,25,28,0.75)", isColor: true },
      { name: "--muted",           description: t("Trigger hover background", "Fundo do gatilho no hover"),        light: "#E9E9EC",              dark: "rgba(44,44,51,0.60)", isColor: true },
      { name: "--border",          description: t("Item separator", "Separador de item"),                  light: "rgba(25,25,28,0.09)",  dark: "rgba(255,255,255,0.07)", isColor: true },
      { name: "--primary",         description: t("Open item accent border / icon", "Borda de destaque / ícone do item aberto"),  light: "#E62040",              dark: "#E62040", isColor: true },
      { name: "--primary-muted",   description: t("Open item tinted background", "Fundo com tom do item aberto"),     light: "rgba(230,32,64,0.03)", dark: "rgba(230,32,64,0.05)", isColor: true },
      { name: "--foreground",      description: t("Trigger text", "Texto do gatilho"),                    light: "#19191C",              dark: "#F6F6F7", isColor: true },
      { name: "--muted-foreground",description: t("Content / chevron text", "Texto do conteúdo / chevron"),          light: "#888896",              dark: "#B3B3BC", isColor: true },
    ],
  },
];
