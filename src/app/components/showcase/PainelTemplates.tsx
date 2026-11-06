import React, { useState } from "react";
import {
  Home, Shirt, Upload, Boxes, ShoppingBag, Search, Sparkles, FileBarChart, Store, CreditCard, Plug, Settings,
  Menu, ExternalLink, Plus, FileSpreadsheet, Eye, Heart, ScanSearch, MessageCircle, Target, Lightbulb,
  CalendarCheck, Camera, ClipboardList, Ruler, ShieldCheck, MapPin, Zap, TrendingUp, Activity, LineChart, ImagePlus, Bell,
} from "lucide-react";
import logoClaro from "../../../imports/findlook/findlook-horizontal-sobre-claro.png";
import logoEscuro from "../../../imports/findlook/findlook-horizontal-sobre-grafite.png";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "../ui/sheet";
import { SeletorDeLoja, ItemDoMenu, GrupoDoMenu, CardDePlano, CardDeAjuda, CampoDeBuscaGlobal, BotaoDeNotificacoes, GatilhoDaConta } from "../ui/painel-shell";
import { CabecalhoDaPagina, SeletorDePeriodo, BotaoDividido, BannerPromocional } from "../ui/painel-cabecalho";
import {
  CardIndicador, GraficoDeDesempenho, ItemDeAtividade, ItemDeAcao, ListaDeTendencias, ItemDeChecklist, AnelDePontuacao,
  CarrosselDeDicas, FaixaDeBeneficios, CardDoPainel, LinkVerTudo, Variacao, formatarNumero,
} from "../ui/painel-dados";
import { TabelaDeProdutos, type Produto } from "../ui/painel-produtos";
import { IconeModa } from "../ui/fashion-icons";

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

/* ─────────────────────────────────────────────
   Moldura e estrutura do painel
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

const itensDoMenu = [
  { id: "inicio", rotulo: "Início", icone: <Home /> },
  { id: "produtos", rotulo: "Produtos", icone: <Shirt /> },
  { id: "importar", rotulo: "Importar produtos", icone: <Upload /> },
  { id: "estoque", rotulo: "Estoque", icone: <Boxes /> },
  { id: "pedidos", rotulo: "Pedidos e reservas", icone: <ShoppingBag />, contador: 3 },
  { id: "buscas", rotulo: "Buscas e interesse", icone: <Search /> },
  { id: "inteligencia", rotulo: "Inteligência de vendas", icone: <Sparkles /> },
  { id: "relatorios", rotulo: "Relatórios", icone: <FileBarChart /> },
];
const itensMinhaLoja = [
  { id: "perfil", rotulo: "Perfil da loja", icone: <Store /> },
  { id: "planos", rotulo: "Planos e assinatura", icone: <CreditCard /> },
  { id: "integracoes", rotulo: "Integrações", icone: <Plug /> },
  { id: "configuracoes", rotulo: "Configurações", icone: <Settings /> },
];

function Logo() {
  return (
    <>
      <img src={logoClaro} alt="FindLook" className="h-8 w-auto dark:hidden" />
      <img src={logoEscuro} alt="FindLook" className="hidden h-8 w-auto dark:block" />
    </>
  );
}

function MenuLateral({ ativo }: { ativo: string }) {
  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <Logo />
      <SeletorDeLoja loja="Ateliê Aurora" />
      <nav aria-label="Menu do painel" className="space-y-0.5">
        <GrupoDoMenu>
          {itensDoMenu.map(i => (
            <ItemDoMenu key={i.id} href="#" icone={i.icone} ativo={i.id === ativo} contador={i.contador} rotuloContador="novos" onClick={e => e.preventDefault()}>{i.rotulo}</ItemDoMenu>
          ))}
        </GrupoDoMenu>
        <div className="my-2 border-t border-border" />
        <GrupoDoMenu titulo="Minha loja">
          {itensMinhaLoja.map(i => (
            <ItemDoMenu key={i.id} href="#" icone={i.icone} ativo={i.id === ativo} onClick={e => e.preventDefault()}>{i.rotulo}</ItemDoMenu>
          ))}
        </GrupoDoMenu>
      </nav>
      <div className="mt-auto space-y-3 pt-2">
        <CardDePlano plano="Plano Desempenho" preco="R$ 149" descricao="Análise de interesse, desempenho e recomendações para a sua loja." />
        <CardDeAjuda texto="Central de ajuda da FindLook" />
      </div>
    </div>
  );
}

/** Estrutura do painel: menu lateral (vira gaveta em telas estreitas) + barra superior + conteúdo. */
export function EstruturaDoPainel({ ativo, children }: { ativo: string; children: React.ReactNode }) {
  const [aberto, setAberto] = useState(false);
  return (
    <div className="@container bg-background">
      <div className="flex min-h-[720px]">
        <aside className="hidden w-64 shrink-0 border-r border-border bg-card @4xl:block">
          <MenuLateral ativo={ativo} />
        </aside>
        <Sheet open={aberto} onOpenChange={setAberto}>
          <SheetContent side="left" className="w-72 overflow-y-auto p-0">
            <SheetTitle className="sr-only">Menu do painel</SheetTitle>
            <SheetDescription className="sr-only">Navegação entre as áreas do painel da loja</SheetDescription>
            <MenuLateral ativo={ativo} />
          </SheetContent>
        </Sheet>
        <div className="@container min-w-0 flex-1">
          <div className="flex items-center gap-2 border-b border-border bg-background px-3 py-2.5 @xl:gap-3 @xl:px-5">
            <button type="button" onClick={() => setAberto(true)} aria-label="Abrir menu" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring @4xl:hidden">
              <Menu aria-hidden className="h-5 w-5" />
            </button>
            <CampoDeBuscaGlobal className="min-w-0 max-w-xl flex-1" />
            <div className="ml-auto flex shrink-0 items-center gap-1">
              <BotaoDeNotificacoes naoLidas={4} />
              <GatilhoDaConta nome="Ana Oliveira" papel="Proprietária" />
            </div>
          </div>
          <main className="space-y-5 p-4 @xl:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Início do painel da loja
───────────────────────────────────────────── */
const seriesGrafico = [
  { chave: "visualizacoes", rotulo: "Visualizações", cor: "var(--chart-1)" },
  { chave: "favoritos", rotulo: "Favoritos", cor: "var(--chart-2)" },
  { chave: "contatos", rotulo: "Contatos", cor: "var(--chart-3)" },
];

export function InicioDoPainelTemplate() {
  const [periodo, setPeriodo] = useState("30");
  const [banner, setBanner] = useState(true);
  const [dicas, setDicas] = useState(true);

  return (
    <MolduraDoPainel>
      <EstruturaDoPainel ativo="inicio">
        <div className="grid gap-4 @6xl:grid-cols-[minmax(0,1fr)_22rem] @6xl:items-start">
          <CabecalhoDaPagina
            saudacao="Olá, Ana! 👋"
            titulo="Sua loja em destaque na **FindLook**"
            descricao="Acompanhe o desempenho, gerencie seus produtos e veja como suas peças estão sendo descobertas por pessoas da sua região."
            acoes={
              <>
                <SeletorDePeriodo valor={periodo} onChange={setPeriodo} />
                <a href="#" target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-border bg-card px-3.5 text-[0.875rem] font-medium text-foreground shadow-[var(--shadow-xs)] hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  Ver minha loja <ExternalLink aria-hidden className="h-4 w-4" /><span className="sr-only">(abre em nova aba)</span>
                </a>
                <BotaoDividido rotulo="Cadastrar produto" icone={<Plus />} acoes={[{ rotulo: "Cadastrar produto", icone: <Plus /> }, { rotulo: "Importar planilha", icone: <FileSpreadsheet /> }, { rotulo: "Cadastrar com fotos", icone: <ImagePlus /> }]} />
              </>
            }
          />
          {banner && (
            <BannerPromocional
              titulo="Destaque sua coleção"
              texto="Deixe sua vitrine ainda mais atrativa com fotos de alta qualidade."
              acao="Ver dicas de foto"
              imagem={<IconeModa nome="cabide" size={44} />}
              onFechar={() => setBanner(false)}
            />
          )}
        </div>

        {/* Indicadores */}
        <div className="grid grid-cols-1 gap-3 @lg:grid-cols-2 @min-[44rem]:grid-cols-3 @6xl:grid-cols-5">
          <CardIndicador icone={<Shirt />} valor={128} rotulo="Produtos publicados" variacao={12} comparacao="vs. 30 dias" />
          <CardIndicador icone={<Eye />} valor={1284} rotulo="Visualizações" variacao={18.6} comparacao="vs. 30 dias" />
          <CardIndicador icone={<Heart />} valor={24} rotulo="Favoritos" variacao={33.3} comparacao="vs. 30 dias" />
          <CardIndicador icone={<ScanSearch />} valor={8} rotulo="Buscas compatíveis" explicacao="Buscas feitas por pessoas da sua região que combinam com peças da sua loja, como “calça jeans wide leg”." />
          <CardIndicador icone={<MessageCircle />} valor={6} rotulo="Contatos e reservas" variacao={50} comparacao="vs. 30 dias" />
        </div>

        {/* Desempenho, inteligência e atividade */}
        <div className="grid gap-4 @min-[44rem]:grid-cols-2 @6xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,0.85fr)]">
          <CardDoPainel icone={<LineChart />} titulo="Desempenho da descoberta" descricao="Visualizações, favoritos e contatos da sua loja.">
            <div className="mb-2 flex items-baseline gap-2">
              <span className="font-[family-name:var(--font-display)] text-[1.75rem] font-extrabold leading-none text-foreground">{formatarNumero(1284)}</span>
              <span className="text-[0.8125rem] text-muted-foreground">visualizações</span>
              <Variacao valor={18.6} />
            </div>
            <GraficoDeDesempenho dados={dadosDesempenho} chaveX="dia" series={seriesGrafico} visiveisIniciais={["visualizacoes"]} />
          </CardDoPainel>

          <CardDoPainel icone={<Sparkles />} titulo="Inteligência de vendas" descricao="O que as buscas da sua região mostram sobre a sua loja.">
            <div className="space-y-2">
              <ItemDeAcao midia={<IconeModa nome="vestido" size={24} />} titulo="Vestidos midi estão em alta" descricao="+62% de buscas na sua região." />
              <ItemDeAcao midia={<IconeModa nome="calca" size={24} />} titulo="Calças wide leg têm grande interesse" descricao="8 buscas compatíveis com seus produtos." />
              <ItemDeAcao midia={<TrendingUp />} titulo="Oportunidade de estoque" descricao="Considere ampliar peças no tamanho M." />
            </div>
          </CardDoPainel>

          <CardDoPainel icone={<Activity />} titulo="Atividade recente" acao={<LinkVerTudo rotulo="Ver toda a atividade" />} className="@min-[44rem]:col-span-2 @6xl:col-span-1">
            <ul className="-my-3 divide-y divide-border">
              <ItemDeAtividade icone={<Search />} titulo="Sua peça apareceu em buscas" detalhe="“vestido midi de linho” · 8 ocorrências" quando="há 12 min" />
              <ItemDeAtividade icone={<Heart />} titulo="Nova peça favoritada" detalhe="Vestido midi · R$ 249,90" quando="há 26 min" />
              <ItemDeAtividade icone={<CalendarCheck />} titulo="Reserva solicitada" detalhe="Vestido midi · Tam. P" quando="há 1 h" />
              <ItemDeAtividade icone={<MessageCircle />} titulo="Contato de interesse" detalhe="Alguém pediu mais informações sobre uma peça" quando="há 1 h" />
              <ItemDeAtividade icone={<Upload />} titulo="Planilha importada" detalhe="12 peças atualizadas" quando="há 2 h" />
            </ul>
          </CardDoPainel>
        </div>

        {/* Produtos e oportunidades */}
        <div className="grid gap-4 @6xl:grid-cols-[minmax(0,1fr)_22rem]">
          <CardDoPainel icone={<Shirt />} titulo={`Seus produtos (${formatarNumero(137)})`} descricao="Gerencie, edite e acompanhe o desempenho das suas peças.">
            <TabelaDeProdutos produtos={produtosExemplo} total={137} contagens={contagensExemplo} limite={4} />
          </CardDoPainel>
          <div className="grid gap-4 @min-[44rem]:grid-cols-2 @6xl:grid-cols-1">
            <CardDoPainel icone={<Target />} titulo="O que estão procurando na sua região" descricao="Buscas em alta que podem ser oportunidades para a sua loja.">
              <ListaDeTendencias itens={[{ termo: "Vestido midi", variacao: 62 }, { termo: "Calça wide leg", variacao: 48 }, { termo: "Blazer feminino", variacao: 37 }, { termo: "Saia de linho", variacao: 29 }]} />
              <a href="#" className="mt-3 flex h-10 items-center justify-center gap-1.5 rounded-[10px] border border-primary text-[0.875rem] font-semibold text-[var(--primary-text,var(--primary))] transition-colors hover:bg-[var(--primary-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Ver mais oportunidades
              </a>
            </CardDoPainel>
            <CardDoPainel icone={<ClipboardList />} titulo="Próximas ações" descricao="O que fazer agora para ser mais encontrada.">
              <div className="space-y-2">
                <ItemDeAcao midia={<Camera />} titulo="Melhore 3 fotos" descricao="Aumente a chance de ser encontrada." />
                <ItemDeAcao midia={<ClipboardList />} titulo="Revise 2 produtos pendentes" descricao="Complete as informações." />
                <ItemDeAcao midia={<Ruler />} titulo="Cadastre os tamanhos" descricao="3 peças sem variação de tamanho." />
              </div>
            </CardDoPainel>
          </div>
        </div>

        {/* Saúde do catálogo e dicas */}
        <div className="grid gap-4 @min-[44rem]:grid-cols-2">
          <CardDoPainel icone={<ShieldCheck />} titulo="Saúde do catálogo" descricao="Veja o que pode ser melhorado para aumentar a sua visibilidade.">
            <div className="@container">
            <div className="flex flex-col items-center gap-4 @md:flex-row @md:items-center">
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
          {dicas ? (
            <CardDoPainel icone={<Lightbulb />} titulo="Dicas para vender mais" descricao="Ações simples, com alto potencial de resultado.">
              <CarrosselDeDicas
                onFechar={() => setDicas(false)}
                dicas={[
                  { titulo: "Melhore suas fotos", texto: "Fotos bem iluminadas e com fundo neutro valorizam a peça e chamam mais atenção na vitrine.", acao: "Ver dicas", midia: <IconeModa nome="cabide" size={40} /> },
                  { titulo: "Informe todos os tamanhos", texto: "Peças com tamanhos cadastrados aparecem em mais buscas da sua região.", acao: "Revisar tamanhos", midia: <Ruler className="h-9 w-9" /> },
                  { titulo: "Responda rápido", texto: "Responda os contatos no mesmo dia, enquanto o interesse ainda está alto.", acao: "Ver contatos", midia: <MessageCircle className="h-9 w-9" /> },
                ]}
              />
            </CardDoPainel>
          ) : (
            <CardDoPainel icone={<Lightbulb />} titulo="Dicas para vender mais">
              <p className="text-[0.8125rem] text-muted-foreground">Você fechou as dicas. <button type="button" onClick={() => setDicas(true)} className="font-semibold text-[var(--primary-text,var(--primary))] underline underline-offset-2">Mostrar de novo</button></p>
            </CardDoPainel>
          )}
        </div>

        <FaixaDeBeneficios
          icone={<Sparkles />}
          titulo="Mais visibilidade, mais oportunidades."
          texto="Suas peças são mostradas para pessoas que procuram exatamente o seu estilo."
          beneficios={[
            { icone: <Search />, rotulo: "Descoberta de peças" },
            { icone: <MapPin />, rotulo: "Clientes da sua região" },
            { icone: <Zap />, rotulo: "Gestão simples" },
            { icone: <TrendingUp />, rotulo: "Mais oportunidades de venda" },
          ]}
        />
      </EstruturaDoPainel>
    </MolduraDoPainel>
  );
}

/* ─────────────────────────────────────────────
   Produtos (lista completa)
───────────────────────────────────────────── */
export function ProdutosTemplate() {
  return (
    <MolduraDoPainel>
      <EstruturaDoPainel ativo="produtos">
        <CabecalhoDaPagina
          titulo="Produtos"
          descricao="Cadastre, edite e acompanhe as peças da sua loja. Peças pendentes não aparecem na vitrine até serem revisadas."
          acoes={
            <>
              <a href="#" className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-border bg-card px-3.5 text-[0.875rem] font-medium text-foreground shadow-[var(--shadow-xs)] hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <FileSpreadsheet aria-hidden className="h-4 w-4" /> Importar planilha
              </a>
              <BotaoDividido rotulo="Cadastrar produto" icone={<Plus />} acoes={[{ rotulo: "Cadastrar produto", icone: <Plus /> }, { rotulo: "Cadastrar com fotos", icone: <ImagePlus /> }]} />
            </>
          }
        />
        <div className="grid grid-cols-2 gap-3 @4xl:grid-cols-4">
          <CardIndicador estilo="pilula" icone={<Shirt />} valor={128} rotulo="Publicados" variacao={12} />
          <CardIndicador estilo="pilula" icone={<ClipboardList />} valor={6} rotulo="Pendentes" explicacao="Peças com alguma informação faltando ou foto em baixa qualidade. Elas só aparecem na vitrine depois de revisadas." />
          <CardIndicador estilo="pilula" icone={<Boxes />} valor={3} rotulo="Esgotados" />
          <CardIndicador estilo="pilula" icone={<Bell />} valor={2} rotulo="Reservados" />
        </div>
        <CardDoPainel titulo={`Todos os produtos (${formatarNumero(137)})`} descricao="Selecione peças para publicar, marcar como esgotadas ou excluir de uma vez.">
          <TabelaDeProdutos produtos={produtosExemplo} total={137} contagens={contagensExemplo} estiloAbas="sublinhado" />
        </CardDoPainel>
      </EstruturaDoPainel>
    </MolduraDoPainel>
  );
}
