import React, { useRef, useState } from "react";
import { CalendarDays, CalendarPlus, Filter, Info, Lock, MoreHorizontal, Sparkles, Star, Store, TriangleAlert, UserRoundCog, ListChecks } from "lucide-react";
import { useI18n } from "../../i18n";
import { PageHeader } from "./GetStartedShowcase";
import { SectionHeader } from "./shared/SectionHeader";
import { Callout, SubTitle } from "./shared/Guidance";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { CardDoPainel, ItemDeAtividade } from "../ui/painel-dados";
import { BarraFixaDoCelular } from "../ui/barra-fixa-celular";
import { BuscaDePecas, BuscaNoCelular, type ValoresDaBusca } from "../ui/busca-pecas";
import { CardDeLoja } from "../ui/card-loja";
import { MapaDeLojas, MapaIlustrativo, ConviteAoMapa, type PinoIlustrativo } from "../ui/mapa-lojas";
import { FaixaDeParceiros } from "../ui/faixa-parceiros";
import {
  CampoDoCadastro, GavetaApresentarLoja, MolduraDoCadastro, EtapaDoCadastro, BarraDaEtapa, LateralDaEtapa, ListaDeRevisao, BlocoDeRevisao, LinhaDeDado,
} from "../ui/cadastro-lojista";
import { QuadroDeAtivacao, CartaoDoQuadro, ChipDeEtapa, IconeDeEtapa, ETAPAS_DA_LOJA, type EtapaDaLoja } from "../ui/admin-ativacao";
import { ItemDaAgenda, GrupoDaAgenda, type StatusDoAgendamento } from "../ui/admin-agenda";
import { LinhaDeLoja, CabecalhoDaFicha, EtiquetaDaLoja } from "../ui/admin-lojas";
import { AndamentoDaBusca, ChipDaBusca, SeloAoVivo } from "../ui/admin-busca-ao-vivo";

/* Padrões do produto: componentes trazidos do produto FindLook (busca do hero, loja e mapa, cadastro do lojista e
   telas do admin), para o produto copiar daqui. Todos os dados desta página são exemplos fictícios. */

const codigo = "overflow-x-auto rounded-md bg-muted/60 p-3 text-[0.75rem] text-muted-foreground";

/** Moldura de celular para demonstrar o que é fixo na tela: o transform faz `fixed` valer dentro da moldura. */
function MolduraCelular({ children, escuro = false, rotulo }: { children: (moldura: HTMLDivElement | null) => React.ReactNode; escuro?: boolean; rotulo: string }) {
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  return (
    <div
      ref={setEl}
      role="group"
      aria-label={rotulo}
      data-moldura-celular
      className={`relative mx-auto h-[640px] w-full max-w-[360px] overflow-hidden rounded-xl border border-border [transform:translateZ(0)] [&_[data-slot=drawer-content]]:max-h-[92%] ${escuro ? "dark bg-[var(--graphite-950)] text-foreground" : "bg-background"}`}
    >
      {children(el)}
    </div>
  );
}

function ConteudoFalso({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div className="space-y-3 p-5 pt-8">
      <p className="text-[1.375rem] font-extrabold leading-tight tracking-tight text-foreground">{titulo}</p>
      <p className="text-[0.875rem] leading-relaxed text-muted-foreground">{texto}</p>
      <div aria-hidden className="space-y-2 pt-4">
        {[90, 75, 82, 60].map((w) => <div key={w} className="h-3 rounded-full bg-muted" style={{ width: `${w}%` }} />)}
      </div>
    </div>
  );
}

/* ── Dados de exemplo (fictícios) ── */
const PINOS: PinoIlustrativo[] = [
  { id: "aurora", nome: "Brechó Aurora", estilo: "Vintage e segunda mão", bairro: "São Francisco", x: 38, y: 30 },
  { id: "lume", nome: "Ateliê Lume", estilo: "Moda autoral", bairro: "Batel", x: 26, y: 58 },
  { id: "trama", nome: "Casa Trama", estilo: "Casual", bairro: "Centro", x: 56, y: 46 },
  { id: "sol", nome: "Garimpo Sol", estilo: "Streetwear", bairro: "Água Verde", x: 64, y: 74 },
  { id: "vertice", nome: "Marca Vértice", estilo: "Social e alfaiataria", bairro: "Bigorrilho", x: 78, y: 36 },
];

type LojaDemo = { id: string; nome: string; detalhe: string; etapa: EtapaDaLoja; proximo?: string };
const LOJAS_QUADRO: LojaDemo[] = [
  { id: "aurora", nome: "Brechó Aurora", detalhe: "Brechó · São Francisco", etapa: "a_contatar" },
  { id: "lume", nome: "Ateliê Lume", detalhe: "Ateliê · Batel", etapa: "a_contatar" },
  { id: "trama", nome: "Casa Trama", detalhe: "Loja de roupas · Centro", etapa: "contato", proximo: "Visita qui, 20/11 · 14:00" },
  { id: "sol", nome: "Garimpo Sol", detalhe: "Brechó · Água Verde", etapa: "visita" },
  { id: "vertice", nome: "Marca Vértice", detalhe: "Marca própria · Bigorrilho", etapa: "cadastro" },
];
const COLUNAS_FUNIL: EtapaDaLoja[] = ["a_contatar", "contato", "visita", "cadastro", "sem_interesse"];
const VAZIO_FUNIL: Partial<Record<EtapaDaLoja, string>> = {
  a_contatar: "Todas as lojas já foram contatadas.",
  contato: "Arraste para cá as lojas que você contatou.",
  visita: "Nenhuma visita em andamento.",
  cadastro: "Nenhuma loja em cadastro.",
  sem_interesse: "Nenhuma loja sem interesse.",
};

const ETAPAS_CADASTRO = [{ titulo: "Responsável" }, { titulo: "Dados da loja" }, { titulo: "Plano" }, { titulo: "Revisão" }, { titulo: "Pagamento" }];

export function ProdutoShowcase() {
  const { t } = useI18n();
  const [buscaEnviada, setBuscaEnviada] = useState<ValoresDaBusca | null>(null);
  const [lojaSelecionada, setLojaSelecionada] = useState<string | null>("trama");
  const [gaveta, setGaveta] = useState(false);
  const [cadastroEnviado, setCadastroEnviado] = useState<string | null>(null);
  const [etapa, setEtapa] = useState(0);
  const tituloEtapa = useRef<HTMLHeadingElement>(null);
  const [lojasQuadro, setLojasQuadro] = useState(LOJAS_QUADRO);
  const [agenda, setAgenda] = useState<Record<string, StatusDoAgendamento>>({ a1: "agendado", a2: "agendado", a3: "feito" });
  const [marcadas, setMarcadas] = useState<string[]>([]);
  const pinoAtual = PINOS.find((p) => p.id === lojaSelecionada);

  const irPara = (i: number) => {
    setEtapa(i);
    requestAnimationFrame(() => tituloEtapa.current?.focus());
  };
  const condicao = { novo: "Nova", usado: "Segunda mão", ambos: "Tanto faz" } as const;

  return (
    <div className="min-w-0 space-y-16 pb-16">
      <PageHeader
        eyebrow={t("Components", "Componentes")}
        title={t("Product **patterns**", "Padrões do **produto**")}
        description={t(
          "Components brought from the FindLook product, so the product can copy them from here: the hero search, store card and map, the store registration and the admin screens. They only present: data, saving and business rules stay in the product. All data on this page is fictitious example data.",
          "Componentes trazidos do produto FindLook para o produto copiar daqui: a busca do hero, o card de loja e o mapa, o cadastro do lojista e as telas do admin. Eles só apresentam: dados, gravação e regras de negócio ficam no produto. Todos os dados desta página são exemplos fictícios.",
        )}
      />

      {/* ── Busca do hero ── */}
      <section id="produto-busca" className="scroll-mt-32 space-y-6">
        <SectionHeader
          title={t("Hero search", "Busca do hero")}
          description={t(
            "The “What do you want to find?” box: description of the piece, optional reference photo, Item condition and the Find pieces button. On phones, a fixed button opens the same search in a bottom drawer, with the Garimpar button.",
            "A caixa “O que você quer encontrar?”: descrição da peça, foto de referência opcional, Condição da peça e o botão Encontrar peças. No celular, um botão fixo abre a mesma busca numa gaveta inferior, com o botão Garimpar.",
          )}
        />
        <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="min-w-0 space-y-3">
            <SubTitle>{t("Computer and tablet: BuscaDePecas", "Computador e tablet: BuscaDePecas")}</SubTitle>
            <div className="rounded-xl bg-[var(--surface-tint)] p-4 sm:p-6">
              <BuscaDePecas elevada onBuscar={setBuscaEnviada} />
            </div>
            <p role="status" className="text-[0.8125rem] text-muted-foreground">
              {buscaEnviada
                ? t(`Sent: “${buscaEnviada.descricao}” · ${condicao[buscaEnviada.condicao]}${buscaEnviada.foto ? " · with photo" : ""}`, `Enviado: “${buscaEnviada.descricao}” · ${condicao[buscaEnviada.condicao]}${buscaEnviada.foto ? " · com foto" : ""}`)
                : t("Try it: submit empty to see the error; fill it in to see what onBuscar receives.", "Experimente: envie vazio para ver o erro; preencha para ver o que o onBuscar recebe.")}
            </p>
          </div>
          <div className="min-w-0 space-y-3">
            <SubTitle>{t("Phone: BuscaNoCelular", "Celular: BuscaNoCelular")}</SubTitle>
            <MolduraCelular rotulo={t("Phone demo of the search", "Demonstração da busca no celular")}>
              {(moldura) => (
                <>
                  <ConteudoFalso titulo="Diga o que procura. A gente mostra onde encontrar." texto={t("Home page content (example).", "Conteúdo da página inicial (exemplo).")} />
                  <BuscaNoCelular somenteCelular={false} container={moldura} onBuscar={setBuscaEnviada} />
                </>
              )}
            </MolduraCelular>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Callout title={t("When to use", "Quando usar")}>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t("Card variant in the home page hero; elevada only on a colored or photo background.", "Variante card no hero da página inicial; elevada só sobre fundo com cor ou foto.")}</li>
              <li>{t("Below 768 px, BuscaNoCelular replaces the open card: fixed bar Find pieces and the drawer with Garimpar.", "Abaixo de 768 px, BuscaNoCelular substitui o card aberto: barra fixa Encontrar peças e a gaveta com Garimpar.")}</li>
              <li>{t("Leave 96 px free at the end of the page on phones so the bar does not cover the footer.", "Deixe 96 px livres no fim da página, no celular, para a barra não cobrir o rodapé.")}</li>
            </ul>
          </Callout>
          <Callout title={t("Accessibility", "Acessibilidade")}>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t("The form is named by its title; the description is required (aria-required) and the error is linked to the field and announced (role=alert); focus returns to the field.", "O formulário é nomeado pelo título; a descrição é obrigatória (aria-required) e o erro fica ligado ao campo e é anunciado (role=alert); o foco volta ao campo.")}</li>
              <li>{t("Item condition is a fieldset with legend; arrows change the option.", "Condição da peça é um fieldset com legenda; as setas mudam a opção.")}</li>
              <li>{t("The fixed button says it opens a dialog (aria-haspopup); the drawer traps focus and closes with Esc or Close.", "O botão fixo avisa que abre uma janela (aria-haspopup); a gaveta prende o foco e fecha com Esc ou Fechar.")}</li>
            </ul>
          </Callout>
        </div>
        <pre className={codigo}><code>{`import { BuscaDePecas, BuscaNoCelular } from "@/app/components/ui/busca-pecas";

<div className="hidden md:block">
  <BuscaDePecas elevada onBuscar={({ descricao, condicao, foto }) => buscar(descricao, condicao, foto)} />
</div>
<BuscaNoCelular onBuscar={buscar} />   {/* só abaixo de 768 px */}`}</code></pre>
      </section>

      {/* ── Card de loja e mapa ── */}
      <section id="produto-loja-mapa" className="scroll-mt-32 space-y-6">
        <SectionHeader
          title={t("Store card and map", "Card de loja e mapa")}
          description={t(
            "The stores network on the map: the map, the “Stores on the map” list, the store card and the “Is your store not on the map?” invitation. The map comes in as a slot: the product uses an interactive map; here, an illustrative drawing.",
            "A rede de lojas no mapa: o mapa, a lista “Lojas no mapa”, o card da loja e o convite “Sua loja não está no mapa?”. O mapa entra como slot: o produto usa um mapa interativo; aqui, um desenho ilustrativo.",
          )}
        />
        <MapaDeLojas
          aviso={t("Fictitious example: illustrative stores and positions.", "Exemplo fictício: lojas e posições ilustrativas.")}
          lojas={PINOS}
          selecionada={lojaSelecionada}
          onSelecionar={setLojaSelecionada}
          mapa={
            <MapaIlustrativo
              pinos={PINOS}
              selecionada={lojaSelecionada}
              onSelecionar={setLojaSelecionada}
              onFecharDetalhe={() => setLojaSelecionada(null)}
              detalhe={pinoAtual && (
                <CardDeLoja nome={pinoAtual.nome} estilo={pinoAtual.estilo} bairro={pinoAtual.bairro} exemplo acao={{ rotulo: "Ver perfil", indisponivel: "Perfil disponível quando a loja entrar na rede" }} />
              )}
            />
          }
          convite={<ConviteAoMapa link={{ rotulo: "Conhecer a FindLook para lojistas", href: "#produto-loja-mapa" }} />}
        />
        <div className="grid min-w-0 gap-4 sm:grid-cols-2">
          <div className="min-w-0 space-y-2">
            <SubTitle>{t("Store card: action available", "Card de loja: ação disponível")}</SubTitle>
            <CardDeLoja nome="Ateliê Lume" estilo="Moda autoral" bairro="Batel" exemplo acao={{ rotulo: "Ver perfil", onClick: () => undefined }} />
          </div>
          <div className="min-w-0 space-y-2">
            <SubTitle>{t("Store card: action not yet available", "Card de loja: ação ainda indisponível")}</SubTitle>
            <CardDeLoja nome="Brechó Aurora" estilo="Vintage e segunda mão" bairro="São Francisco" exemplo acao={{ rotulo: "Ver perfil", indisponivel: "Perfil disponível quando a loja entrar na rede" }} />
          </div>
        </div>
        <div className="min-w-0 space-y-3">
          <SubTitle>{t("Partners strip (no partners yet: “Your store here” invitations)", "Faixa de parceiros (ainda sem parceiros: convites “Sua loja aqui”)")}</SubTitle>
          <div className="overflow-hidden rounded-xl">
            <FaixaDeParceiros />
          </div>
          <div className="dark overflow-hidden rounded-xl bg-[var(--graphite-950)]">
            <FaixaDeParceiros tom="escuro" titulo="Lojas e marcas na FindLook" />
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Callout title={t("When to use", "Quando usar")}>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t("MapaDeLojas with the product's interactive map in the mapa slot; MapaIlustrativo only for demos and prototypes, always with the “Illustrative map” seal.", "MapaDeLojas com o mapa interativo do produto no slot mapa; MapaIlustrativo só em demonstrações e protótipos, sempre com o selo “Mapa ilustrativo”.")}</li>
              <li>{t("Every store that is not real uses exemplo (“Fictitious example” seal).", "Toda loja que não é real usa exemplo (selo “Exemplo fictício”).")}</li>
              <li>{t("Partners strip: only logos; without partners, the “Your store here” invitations.", "Faixa de parceiros: só os logos; sem parceiros, os convites “Sua loja aqui”.")}</li>
            </ul>
          </Callout>
          <Callout title={t("Accessibility", "Acessibilidade")}>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t("Pins and list items are buttons with aria-pressed; the selected store also gets a check, not only color.", "Pinos e itens da lista são botões com aria-pressed; a loja selecionada também ganha um check, não só cor.")}</li>
              <li>{t("An unavailable action keeps its name and the reason in text, linked by aria-describedby.", "Ação indisponível mantém o nome e o motivo em texto, ligado por aria-describedby.")}</li>
              <li>{t("The strip pauses on hover, has a Pause button and stays still with reduced motion; the moving part is hidden from screen readers, which get the title and the partner names.", "A faixa para sob o mouse, tem botão Pausar e fica parada com menos movimento; a parte que se move fica oculta para leitores de tela, que recebem o título e os nomes dos parceiros.")}</li>
            </ul>
          </Callout>
        </div>
        <pre className={codigo}><code>{`import { MapaDeLojas, ConviteAoMapa } from "@/app/components/ui/mapa-lojas";
import { CardDeLoja } from "@/app/components/ui/card-loja";
import { FaixaDeParceiros } from "@/app/components/ui/faixa-parceiros";

<MapaDeLojas
  mapa={<MapaInterativo selecionada={id} onSelecionar={setId} />}   // o mapa do produto
  lojas={lojas} selecionada={id} onSelecionar={setId}
  convite={<ConviteAoMapa link={{ rotulo: "Conhecer a FindLook para lojistas", href: "/para-lojistas/" }} />}
/>
<CardDeLoja nome={l.nome} estilo={l.estilo} bairro={l.bairro} acao={{ rotulo: "Ver perfil", href: l.url }} />
<FaixaDeParceiros parceiros={[{ nome: "Loja", logo: "/parceiros/loja.svg" }]} />`}</code></pre>
      </section>

      {/* ── Cadastro do lojista ── */}
      <section id="produto-cadastro" className="scroll-mt-32 space-y-6">
        <SectionHeader
          title={t("Store registration", "Cadastro do lojista")}
          description={t(
            "The first step in the “Shall we present your store?” drawer (store name and e-mail) and the pieces of the 5-step registration: frame with the Stepper, step layout with side column, action bar and the review summary.",
            "O 1º passo na gaveta “Vamos apresentar sua loja?” (nome da loja e e-mail) e as peças do cadastro em 5 etapas: moldura com o Stepper, layout da etapa com coluna lateral, barra de ações e o resumo da revisão.",
          )}
        />
        <div className="grid min-w-0 gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start">
          <div className="min-w-0 space-y-3">
            <SubTitle>{t("Drawer (store page, dark theme)", "Gaveta (página do lojista, tema escuro)")}</SubTitle>
            <MolduraCelular escuro rotulo={t("Phone demo of the registration drawer", "Demonstração da gaveta de cadastro no celular")}>
              {(moldura) => (
                <>
                  <ConteudoFalso titulo="Sua loja merece ser descoberta." texto={t("Store page content (example).", "Conteúdo da página do lojista (exemplo).")} />
                  <BarraFixaDoCelular icone={<Store />} somenteCelular={false} oculta={gaveta} onClick={() => setGaveta(true)}>Cadastrar minha loja</BarraFixaDoCelular>
                  <GavetaApresentarLoja
                    tom="escuro"
                    aberta={gaveta}
                    onAbertaChange={setGaveta}
                    container={moldura}
                    onContinuar={(d) => { setCadastroEnviado(d.loja); setGaveta(false); }}
                  />
                </>
              )}
            </MolduraCelular>
            <p role="status" className="text-[0.8125rem] text-muted-foreground">
              {cadastroEnviado ? t(`onContinuar received “${cadastroEnviado}”. The product then opens the 5-step registration.`, `onContinuar recebeu “${cadastroEnviado}”. O produto abre então o cadastro em 5 etapas.`) : t("Try it: Continue empty shows the errors.", "Experimente: Continuar vazio mostra os erros.")}
            </p>
          </div>
          <div className="min-w-0 space-y-3">
            <SubTitle>{t("5-step registration: MolduraDoCadastro + EtapaDoCadastro", "Cadastro em 5 etapas: MolduraDoCadastro + EtapaDoCadastro")}</SubTitle>
            <div className="rounded-xl bg-muted p-3 sm:p-4">
              <MolduraDoCadastro etapas={ETAPAS_CADASTRO} atual={etapa} onIrPara={irPara}>
                {etapa === 0 && (
                  <EtapaDoCadastro
                    titulo="Primeiro, seu acesso."
                    explicacao="Informe os dados de quem será responsável pela conta e pelo contato com a FindLook."
                    tituloRef={tituloEtapa}
                    obrigatorios="* Campos obrigatórios"
                    onSubmit={(e) => { e.preventDefault(); irPara(1); }}
                    lateral={
                      <LateralDaEtapa
                        icone={<UserRoundCog />}
                        titulo="Quem deve ser o responsável?"
                        paragrafos={["Cadastre a pessoa que administrará a conta da loja na FindLook. Ela terá acesso às configurações, à assinatura e às informações de cobrança."]}
                        destaque="Seus dados pessoais não serão exibidos no perfil público da loja."
                        iconeDestaque={<Lock />}
                      />
                    }
                    barra={<BarraDaEtapa />}
                  >
                    <div className="grid gap-x-[18px] gap-y-6 sm:grid-cols-2">
                      <CampoDoCadastro rotulo="Nome completo *" placeholder="Seu nome completo" autoComplete="name" />
                      <CampoDoCadastro rotulo="E-mail de acesso *" placeholder="nome@exemplo.com" type="email" ajuda="Vamos enviar um link para confirmar que o e-mail é seu." />
                    </div>
                  </EtapaDoCadastro>
                )}
                {etapa === 1 && (
                  <EtapaDoCadastro
                    titulo="Agora, queremos conhecer sua loja."
                    explicacao="Comece pelas informações que identificam seu estabelecimento e permitem formalizar seu cadastro na FindLook."
                    tituloRef={tituloEtapa}
                    obrigatorios="* Campos obrigatórios"
                    erro={t("Example of a general error: Could not save the store data. Try again.", "Exemplo de erro geral: Não conseguimos salvar os dados da loja. Tente de novo.")}
                    onSubmit={(e) => { e.preventDefault(); irPara(2); }}
                    barra={<BarraDaEtapa onVoltar={() => irPara(0)} />}
                  >
                    <div className="grid gap-x-[18px] gap-y-6 sm:grid-cols-2">
                      <CampoDoCadastro rotulo="Nome da loja *" defaultValue="Brechó Aurora" ajuda="Como sua loja é conhecida pelos clientes." />
                      <CampoDoCadastro rotulo="CNPJ *" placeholder="00.000.000/0000-00" inputMode="numeric" erro="Confira o CNPJ: os números não conferem." />
                    </div>
                  </EtapaDoCadastro>
                )}
                {etapa === 2 && (
                  <EtapaDoCadastro titulo="Escolha como deseja crescer." tituloRef={tituloEtapa} onSubmit={(e) => { e.preventDefault(); irPara(3); }} barra={<BarraDaEtapa onVoltar={() => irPara(1)} />}>
                    <p className="rounded-md border border-dashed border-border bg-muted px-4 py-5 text-sm text-muted-foreground">{t("Plan cards go here (see Cards › Plan card).", "Aqui entram os cards de plano (ver Cards › Card de plano).")}</p>
                  </EtapaDoCadastro>
                )}
                {etapa === 3 && (
                  <EtapaDoCadastro
                    titulo="Revise sua contratação."
                    explicacao="Confira os dados do responsável, da loja e o plano antes de continuar."
                    tituloRef={tituloEtapa}
                    onSubmit={(e) => { e.preventDefault(); irPara(4); }}
                    lateral={<LateralDaEtapa icone={<ListChecks />} tom="marca" iconeDestaque={<Info />} titulo="Tudo certo para continuar?" destaque="Encontrou alguma informação incorreta? Volte à etapa correspondente para ajustar. Nenhuma cobrança será realizada nesta etapa." />}
                    barra={<BarraDaEtapa onVoltar={() => irPara(2)} />}
                  >
                    <ListaDeRevisao valoresAbertos={["loja"]}>
                      <BlocoDeRevisao valor="responsavel" titulo="01 · Responsável" nomeEtapa="Responsável" resumo={["Ana Exemplo", "ana@aurora.exemplo.com.br"]} onEditar={() => irPara(0)}>
                        <LinhaDeDado rotulo="Nome" valor="Ana Exemplo" />
                        <LinhaDeDado rotulo="E-mail" valor="ana@aurora.exemplo.com.br" />
                        <LinhaDeDado rotulo="WhatsApp" />
                      </BlocoDeRevisao>
                      <BlocoDeRevisao valor="loja" titulo="02 · Dados da loja" nomeEtapa="Dados da loja" resumo={["Brechó Aurora", "São Francisco"]} onEditar={() => irPara(1)}>
                        <LinhaDeDado rotulo="Nome da loja" valor="Brechó Aurora" />
                        <LinhaDeDado rotulo="Bairro" valor="São Francisco" />
                        <LinhaDeDado rotulo="Cidade" valor="Curitiba" />
                        <LinhaDeDado rotulo="Estado" valor="PR" />
                      </BlocoDeRevisao>
                    </ListaDeRevisao>
                  </EtapaDoCadastro>
                )}
                {etapa === 4 && (
                  <EtapaDoCadastro titulo="Pagamento" explicacao="Conclua sua assinatura e prepare a sua loja para ser descoberta." tituloRef={tituloEtapa} barra={<BarraDaEtapa onVoltar={() => irPara(3)} carregando textoCarregando={t("Loading state (example)", "Estado carregando (exemplo)")} />}>
                    <p className="rounded-md border border-dashed border-border bg-muted px-4 py-5 text-sm text-muted-foreground">{t("The payment form stays in the product.", "O formulário de pagamento fica no produto.")}</p>
                  </EtapaDoCadastro>
                )}
              </MolduraDoCadastro>
            </div>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Callout title={t("When to use", "Quando usar")}>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t("GavetaApresentarLoja opens from every “Register my store” button; on the store page, tom=\"escuro\". On phones, add BarraFixaDoCelular with “Register my store”.", "GavetaApresentarLoja abre por todos os botões “Cadastrar minha loja”; na página do lojista, tom=\"escuro\". No celular, acrescente a BarraFixaDoCelular com “Cadastrar minha loja”.")}</li>
              <li>{t("Each step of the registration is an EtapaDoCadastro inside MolduraDoCadastro; the side column is optional.", "Cada etapa do cadastro é uma EtapaDoCadastro dentro da MolduraDoCadastro; a coluna lateral é opcional.")}</li>
              <li>{t("Data, CNPJ lookup, account creation and payment stay in the product.", "Dados, consulta do CNPJ, criação da conta e pagamento ficam no produto.")}</li>
            </ul>
          </Callout>
          <Callout title={t("Accessibility", "Acessibilidade")}>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t("On each step change, move focus to the step title (tituloRef): screen readers announce the new step.", "A cada troca de etapa, leve o foco ao título da etapa (tituloRef): leitores de tela anunciam a nova etapa.")}</li>
              <li>{t("Field errors are linked by aria-describedby and the first invalid field gets focus.", "Erros dos campos ficam ligados por aria-describedby e o primeiro campo inválido recebe o foco.")}</li>
              <li>{t("Edit reads with the step name (“Edit store data”); the loading button says so in text and is disabled.", "Editar é lido com o nome da etapa (“Editar dados da loja”); o botão em carregamento diz isso em texto e fica desativado.")}</li>
            </ul>
          </Callout>
        </div>
        <pre className={codigo}><code>{`import { GavetaApresentarLoja, MolduraDoCadastro, EtapaDoCadastro, BarraDaEtapa, LateralDaEtapa } from "@/app/components/ui/cadastro-lojista";

<GavetaApresentarLoja tom="escuro" aberta={aberta} onAbertaChange={setAberta} onContinuar={({ loja, email }) => seguir(loja, email)} />

<MolduraDoCadastro etapas={etapas} atual={etapa} concluidas={feitas} onIrPara={ir}>
  <EtapaDoCadastro titulo="Agora, queremos conhecer sua loja." tituloRef={titulo} obrigatorios="* Campos obrigatórios"
    lateral={<LateralDaEtapa icone={<Store />} titulo="Seu cadastro, sua identidade." destaque="…" />}
    barra={<BarraDaEtapa onVoltar={() => ir(0)} carregando={salvando} />} onSubmit={continuar}>
    {/* campos */}
  </EtapaDoCadastro>
</MolduraDoCadastro>`}</code></pre>
      </section>

      {/* ── Telas do admin ── */}
      <section id="produto-admin" className="scroll-mt-32 space-y-6">
        <SectionHeader
          title={t("Admin screens", "Telas do admin")}
          description={t(
            "Pieces of the administrative area, following the panel templates: the store activation board, the schedule, the stores list, the store record header and the live store search.",
            "Peças da área administrativa, nos padrões dos templates do painel: o quadro da ativação de lojas, a agenda, a lista de lojas, o cabeçalho da ficha da loja e a busca de lojas ao vivo.",
          )}
        />
        <div className="@container min-w-0 space-y-6">
          <div className="min-w-0 space-y-3">
            <SubTitle>{t("Stage chips", "Chips de etapa")}</SubTitle>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(ETAPAS_DA_LOJA) as EtapaDaLoja[]).map((e) => <ChipDeEtapa key={e} etapa={e} />)}
              {(["pedida", "em_andamento", "pausada", "concluida"] as const).map((e) => <ChipDaBusca key={e} estado={e} />)}
            </div>
          </div>

          <CardDoPainel
            icone={<Filter />}
            titulo="Funil de ativação"
            descricao="Cada coluna é uma etapa e cada cartão, uma loja. Arraste os cartões entre as etapas (no celular, use o botão de mover do cartão) e use Agendar para marcar contato ou visita."
          >
            <QuadroDeAtivacao
              rotulo="Quadro da ativação das lojas"
              colunas={COLUNAS_FUNIL.map((e) => ({
                id: e,
                titulo: ETAPAS_DA_LOJA[e].rotulo,
                quantidade: lojasQuadro.filter((l) => l.etapa === e).length,
                icone: <IconeDeEtapa etapa={e} />,
                vazio: VAZIO_FUNIL[e]!,
                subtitulo: e === "a_contatar" ? "Começo do funil" : e === "sem_interesse" ? "Fora do funil; dá para retomar" : undefined,
              }))}
              itens={lojasQuadro}
              chave={(l) => l.id}
              coluna={(l) => l.etapa}
              rotuloItem={(l) => l.nome}
              onMover={(l, para) => setLojasQuadro((ls) => ls.map((x) => (x.id === l.id ? { ...x, etapa: para } : x)))}
              cartao={(l) => <CartaoDoQuadro nome={l.nome} detalhe={l.detalhe} proximo={l.proximo} href="#produto-admin" onAgendar={() => undefined} />}
            />
          </CardDoPainel>

          <div className="grid min-w-0 gap-6 @min-[60rem]:grid-cols-2">
            <CardDoPainel icone={<CalendarDays />} titulo="Agenda de hoje" descricao="2 agendamentos hoje, 1 atrasado.">
              <div className="space-y-4">
                <GrupoDaAgenda titulo="Atrasados" quantidade={1}>
                  <ItemDaAgenda tipo="contato" quando="ter, 18/11 · 16:00" atrasado status={agenda.a1} loja={{ nome: "Brechó Aurora", bairro: "São Francisco", href: "#produto-admin" }}
                    onFeito={() => setAgenda((a) => ({ ...a, a1: "feito" }))} onRemarcar={() => undefined} onCancelar={() => setAgenda((a) => ({ ...a, a1: "cancelado" }))} onReabrir={() => setAgenda((a) => ({ ...a, a1: "agendado" }))} />
                </GrupoDaAgenda>
                <GrupoDaAgenda titulo="Hoje" quantidade={2} vazio="Nada agendado para hoje.">
                  <ItemDaAgenda tipo="visita" quando="14:00" status={agenda.a2} loja={{ nome: "Casa Trama", bairro: "Centro", href: "#produto-admin" }} observacao="Levar o material de apresentação."
                    onFeito={() => setAgenda((a) => ({ ...a, a2: "feito" }))} onRemarcar={() => undefined} onCancelar={() => setAgenda((a) => ({ ...a, a2: "cancelado" }))} onReabrir={() => setAgenda((a) => ({ ...a, a2: "agendado" }))} />
                  <ItemDaAgenda tipo="treinamento" quando="16:30" status={agenda.a3} loja={{ nome: "Marca Vértice", parceira: true, href: "#produto-admin" }}
                    onFeito={() => setAgenda((a) => ({ ...a, a3: "feito" }))} onReabrir={() => setAgenda((a) => ({ ...a, a3: "agendado" }))} />
                </GrupoDaAgenda>
                <GrupoDaAgenda titulo="Amanhã" quantidade={0} vazio="Nada agendado para amanhã." />
              </div>
            </CardDoPainel>

            <CardDoPainel icone={<Store />} titulo="Lojas encontradas nesta busca" descricao="Atualiza sozinha, em tempo real." acao={<SeloAoVivo />}>
              <AndamentoDaBusca estado="em_andamento" descricao="Manual · começou em 19/11/2026 09:12" pct={42.5} resumo="12 lojas novas até agora · último sinal há 2 min" />
              <ul className="mt-2 divide-y divide-border">
                <ItemDeAtividade icone={<Store />} titulo="Garimpo Sol" detalhe="Água Verde · Brechó · nota 4,7 (58), telefone, site" quando="há 2 min" />
                <ItemDeAtividade icone={<Store />} titulo="Ateliê Lume" detalhe="Batel · Ateliê · Aguardando nota e contato" quando="há 6 min" />
              </ul>
            </CardDoPainel>
          </div>

          <div className="min-w-0 space-y-3">
            <SubTitle>{t("Stores list (LinhaDeLoja)", "Lista de lojas (LinhaDeLoja)")}</SubTitle>
            <ul aria-label="Lojas mapeadas" className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
              {[
                { id: "aurora", nome: "Brechó Aurora", detalhe: "Brechó · São Francisco", etapa: "a_contatar" as const, nota: 4.8, avaliacoes: 112, contatos: { whatsapp: "(41) 90000-0001", instagram: "@brechoaurora.exemplo" }, etiquetas: <EtiquetaDaLoja tom="primario" icone={<Sparkles aria-hidden />}>Nova</EtiquetaDaLoja> },
                { id: "trama", nome: "Casa Trama", detalhe: "Loja de roupas · Centro", etapa: "contato" as const, nota: 4.1, avaliacoes: 23, contatos: { telefone: "(41) 3000-0002", site: "trama.exemplo.com.br" } },
                { id: "lume", nome: "Ateliê Lume", detalhe: "Ateliê · Batel", etapa: "sem_interesse" as const, nota: null, avaliacoes: null, contatos: {}, etiquetas: <EtiquetaDaLoja tom="atencao" icone={<TriangleAlert aria-hidden />}>Revisar tipo</EtiquetaDaLoja> },
              ].map((l) => (
                <LinhaDeLoja
                  key={l.id}
                  nome={l.nome}
                  detalhe={l.detalhe}
                  href="#produto-admin"
                  etapa={l.etapa}
                  etiquetas={l.etiquetas}
                  contatos={l.contatos}
                  nota={l.nota}
                  avaliacoes={l.avaliacoes}
                  selecionada={marcadas.includes(l.id)}
                  onSelecionar={(v) => setMarcadas((m) => (v ? [...m, l.id] : m.filter((x) => x !== l.id)))}
                  acoes={
                    <DropdownMenu>
                      <DropdownMenuTrigger aria-label={`Ações de ${l.nome}`} className="flex size-9 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <MoreHorizontal aria-hidden className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Abrir a ficha</DropdownMenuItem>
                        <DropdownMenuItem>Arquivar loja</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  }
                />
              ))}
            </ul>
          </div>

          <div className="min-w-0 space-y-3">
            <SubTitle>{t("Store record header (CabecalhoDaFicha)", "Cabeçalho da ficha da loja (CabecalhoDaFicha)")}</SubTitle>
            <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
              <CabecalhoDaFicha
                nivel={3}
                voltar={{ rotulo: "Lojas mapeadas", href: "#produto-admin" }}
                nome="Casa Trama"
                descricao="Loja de roupas · Centro (Regional Matriz)"
                etapa="contato"
                etiquetas={<EtiquetaDaLoja tom="primario" icone={<Star aria-hidden />}>Reputação boa</EtiquetaDaLoja>}
                acoes={
                  <>
                    <Button type="button"><CalendarPlus aria-hidden /> Agendar</Button>
                    <Button type="button" variant="outline" size="icon" aria-label="Mais ações da loja"><MoreHorizontal aria-hidden /></Button>
                  </>
                }
              />
            </div>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Callout title={t("When to use", "Quando usar")}>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t("The columns come from the product: today, A contatar, Contato, Visita, Cadastro and Sem interesse; Treinamento and Ativa are partner store stages.", "As colunas vêm do produto: hoje, A contatar, Contato, Visita, Cadastro e Sem interesse; Treinamento e Ativa são etapas das lojas parceiras.")}</li>
              <li>{t("Put the board, the schedule and the live search inside CardDoPainel, as in the panel templates.", "Coloque o quadro, a agenda e a busca ao vivo dentro do CardDoPainel, como nos templates do painel.")}</li>
              <li>{t("LinhaDeLoja inside a list (ul) with dividers; for many columns, use the data table.", "LinhaDeLoja dentro de uma lista (ul) com divisórias; para muitas colunas, use a tabela de dados.")}</li>
            </ul>
          </Callout>
          <Callout title={t("Accessibility", "Acessibilidade")}>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t("No horizontal scroll: columns side by side from 56rem, stacked and collapsible below; Move to does the same as dragging, by keyboard and touch.", "Sem rolagem horizontal: colunas lado a lado a partir de 56rem, empilhadas e recolhíveis abaixo; Mover para faz o mesmo que arrastar, pelo teclado e no toque.")}</li>
              <li>{t("Stages, overdue, done and live states always have icon and text.", "Etapas, atrasado, feito e ao vivo sempre têm ícone e texto.")}</li>
              <li>{t("Icon buttons have names that include the store (“Mark as done: Visit with Casa Trama”); the spinning and pulsing icons stop with reduced motion.", "Botões de ícone têm nomes com a loja (“Marcar como feito: Visita com Casa Trama”); os ícones que giram e pulsam param com menos movimento.")}</li>
            </ul>
          </Callout>
        </div>
        <pre className={codigo}><code>{`import { QuadroDeAtivacao, CartaoDoQuadro, ChipDeEtapa } from "@/app/components/ui/admin-ativacao";
import { ItemDaAgenda, GrupoDaAgenda } from "@/app/components/ui/admin-agenda";
import { LinhaDeLoja, CabecalhoDaFicha } from "@/app/components/ui/admin-lojas";
import { AndamentoDaBusca, SeloAoVivo } from "@/app/components/ui/admin-busca-ao-vivo";

<QuadroDeAtivacao rotulo="Quadro da ativação das lojas" colunas={colunas} itens={lojas}
  chave={(l) => l.id} coluna={(l) => l.situacao} rotuloItem={(l) => l.nome} onMover={mover}
  cartao={(l) => <CartaoDoQuadro nome={l.nome} detalhe={\`\${l.tipo} · \${l.bairro}\`} href={fichaDe(l)} onAgendar={() => agendar(l)} />} />

<GrupoDaAgenda titulo="Hoje" quantidade={hoje.length} vazio="Nada agendado para hoje.">
  {hoje.map((a) => <ItemDaAgenda key={a.id} tipo={a.tipo} quando={hora(a)} loja={lojaDe(a)} onFeito={() => feito(a)} />)}
</GrupoDaAgenda>`}</code></pre>
      </section>
    </div>
  );
}
