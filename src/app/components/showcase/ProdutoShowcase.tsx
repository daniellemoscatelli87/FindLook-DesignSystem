import React, { useState } from "react";
import { CalendarDays, CalendarPlus, Check, Filter, MoreHorizontal, Sparkles, Star, Store, TriangleAlert } from "lucide-react";
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
import { GradeDeCards, ItemDaGrade } from "../ui/grade-de-cards";
import { GavetaApresentarLoja } from "../ui/cadastro-lojista";
import { CadastroEmEtapasDemo, CombinacoesDoCadastro } from "./CadastroEmEtapasDemo";
import { MolduraCelular, ConteudoFalso } from "./shared/MolduraCelular";

/* Padrões do produto: componentes trazidos do produto FindLook (busca do hero, loja e mapa e cadastro do lojista),
   para o produto copiar daqui. As telas do admin entram só quando a decisão final for tomada no FindLook. Todos os dados desta página são exemplos fictícios. */

const codigo = "whitespace-pre-wrap [overflow-wrap:anywhere] rounded-md bg-muted/60 p-3 text-label text-muted-foreground";

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


export function ProdutoShowcase() {
  const { t } = useI18n();
  const [buscaEnviada, setBuscaEnviada] = useState<ValoresDaBusca | null>(null);
  const [lojaSelecionada, setLojaSelecionada] = useState<string | null>("trama");
  const [gaveta, setGaveta] = useState(false);
  const [cadastroEnviado, setCadastroEnviado] = useState<string | null>(null);
  const [lojasQuadro, setLojasQuadro] = useState(LOJAS_QUADRO);
  const [agenda, setAgenda] = useState<Record<string, StatusDoAgendamento>>({ a1: "agendado", a2: "agendado", a3: "feito" });
  const [marcadas, setMarcadas] = useState<string[]>([]);
  const pinoAtual = PINOS.find((p) => p.id === lojaSelecionada);

  const condicao = { novo: "Nova", usado: "Segunda mão", ambos: "Tanto faz" } as const;

  return (
    <div className="min-w-0 space-y-16 pb-16">
      <PageHeader
        eyebrow={t("Components", "Componentes")}
        title={t("Product **patterns**", "Padrões do **produto**")}
        description={t(
          "Components brought from the FindLook product, so the product can copy them from here: the hero search, store card and map, and the store registration. They only present: data, saving and business rules stay in the product. All data on this page is fictitious example data.",
          "Componentes trazidos do produto FindLook para o produto copiar daqui: a busca do hero, o card de loja e o mapa, e o cadastro do lojista. Eles só apresentam: dados, gravação e regras de negócio ficam no produto. Todos os dados desta página são exemplos fictícios.",
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
        <div data-cards-ignorar className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="min-w-0 space-y-3">
            <SubTitle>{t("Computer and tablet: BuscaDePecas", "Computador e tablet: BuscaDePecas")}</SubTitle>
            <div className="rounded-xl bg-[var(--surface-tint)] p-4 sm:p-6">
              <BuscaDePecas elevada onBuscar={setBuscaEnviada} />
            </div>
            <p role="status" className="text-body-sm text-muted-foreground">
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
        <GradeDeCards className="min-w-0 gap-4 sm:grid-cols-2">
          <ItemDaGrade className="min-w-0 space-y-2">
            <SubTitle>{t("Store card: action available", "Card de loja: ação disponível")}</SubTitle>
            <CardDeLoja nome="Ateliê Lume" estilo="Moda autoral" bairro="Batel" exemplo acao={{ rotulo: "Ver perfil", onClick: () => undefined }} />
          </ItemDaGrade>
          <ItemDaGrade className="min-w-0 space-y-2">
            <SubTitle>{t("Store card: action not yet available", "Card de loja: ação ainda indisponível")}</SubTitle>
            <CardDeLoja nome="Brechó Aurora" estilo="Vintage e segunda mão" bairro="São Francisco" exemplo acao={{ rotulo: "Ver perfil", indisponivel: "Perfil disponível quando a loja entrar na rede" }} />
          </ItemDaGrade>
        </GradeDeCards>
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
        {/* Pedido da dona do produto (27/11/2026): a gaveta fica na linha dela e o cadastro em 5 etapas ganha a largura toda. */}
        <div data-cards-ignorar className="grid min-w-0 gap-6 md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] md:items-start">
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
          </div>
          <div className="min-w-0 space-y-4 md:pt-9">
            <p className="text-body leading-relaxed text-foreground">O 1º passo acontece na gaveta “Vamos apresentar sua loja?”: só o nome da loja e o e-mail. Ao continuar, o produto abre o cadastro em 5 etapas, logo abaixo.</p>
            <ul className="space-y-2 text-body-sm leading-5 text-muted-foreground">
              <li className="flex items-start gap-2"><Check className="mt-1 size-4 shrink-0 text-success" aria-hidden /> Abre por todos os botões “Cadastrar minha loja”; na página do lojista, tom escuro.</li>
              <li className="flex items-start gap-2"><Check className="mt-1 size-4 shrink-0 text-success" aria-hidden /> No celular, a barra fixa “Cadastrar minha loja” abre a mesma gaveta.</li>
              <li className="flex items-start gap-2"><Check className="mt-1 size-4 shrink-0 text-success" aria-hidden /> Continuar vazio mostra os erros e leva o foco ao primeiro campo.</li>
            </ul>
            <p role="status" className="text-body-sm text-muted-foreground">
              {cadastroEnviado ? `onContinuar recebeu “${cadastroEnviado}”. O produto abre então o cadastro em 5 etapas.` : "Experimente: toque em Cadastrar minha loja na moldura."}
            </p>
          </div>
        </div>

        <div className="min-w-0 space-y-3">
          <SubTitle>{t("5-step registration: MolduraDoCadastro + EtapaDoCadastro", "Cadastro em 5 etapas: MolduraDoCadastro + EtapaDoCadastro")}</SubTitle>
          <div className="rounded-xl bg-muted p-2 sm:p-4">
            <CadastroEmEtapasDemo />
          </div>
        </div>

        <div id="produto-cadastro-combinacoes" className="min-w-0 scroll-mt-32 space-y-3">
          <SubTitle>Combinações</SubTitle>
          <p className="max-w-3xl text-body-sm leading-relaxed text-muted-foreground">Quais componentes do design system cada etapa combina, e por quê. Cada nome leva à documentação do componente.</p>
          <CombinacoesDoCadastro />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Callout title={t("When to use", "Quando usar")}>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t("GavetaApresentarLoja opens from every “Register my store” button; on the store page, tom=\"escuro\". On phones, add BarraFixaDoCelular with “Register my store”.", "GavetaApresentarLoja abre por todos os botões “Cadastrar minha loja”; na página do lojista, tom=\"escuro\". No celular, acrescente a BarraFixaDoCelular com “Cadastrar minha loja”.")}</li>
              <li>{t("Each step of the registration is an EtapaDoCadastro inside MolduraDoCadastro; the side column is optional.", "Cada etapa do cadastro é uma EtapaDoCadastro dentro da MolduraDoCadastro; a coluna lateral é opcional.")}</li>
              <li>Tudo se adapta à largura do próprio cadastro (container queries): a coluna lateral só fica ao lado com 896 px ou mais; os campos, dentro da GradeDeCampos, ficam dois por linha só quando cada um tem 240 px ou mais.</li>
              <li>{t("Data, CNPJ lookup, account creation and payment stay in the product.", "Dados, consulta do CNPJ, criação da conta e pagamento ficam no produto.")}</li>
            </ul>
          </Callout>
          <Callout title={t("Accessibility", "Acessibilidade")}>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t("On each step change, move focus to the step title (tituloRef): screen readers announce the new step.", "A cada troca de etapa, leve o foco ao título da etapa (tituloRef): leitores de tela anunciam a nova etapa.")}</li>
              <li>{t("Field errors are linked by aria-describedby and the first invalid field gets focus.", "Erros dos campos ficam ligados por aria-describedby e o primeiro campo inválido recebe o foco.")}</li>
              <li>Com 2 erros ou mais, o resumo (Alerta de erro, role=&quot;alert&quot;) aparece no topo da etapa, com um link para cada campo.</li>
              <li>{t("Edit reads with the step name (“Edit store data”); the loading button says so in text and is disabled.", "Editar é lido com o nome da etapa (“Editar dados da loja”); o botão em carregamento diz isso em texto e fica desativado.")}</li>
            </ul>
          </Callout>
        </div>
        <pre className={codigo}><code>{`import { GavetaApresentarLoja, MolduraDoCadastro, EtapaDoCadastro, GradeDeCampos, CampoDoCadastro, BarraDaEtapa, LateralDaEtapa } from "@/app/components/ui/cadastro-lojista";

<GavetaApresentarLoja tom="escuro" aberta={aberta} onAbertaChange={setAberta} onContinuar={({ loja, email }) => seguir(loja, email)} />

<MolduraDoCadastro etapas={etapas} atual={etapa} concluidas={feitas} onIrPara={ir}>
  <EtapaDoCadastro titulo="Agora, queremos conhecer sua loja." tituloRef={titulo} obrigatorios="* Campos obrigatórios"
    resumoDeErros={erros}   // [{ id, rotulo, mensagem }]; aparece com 2 ou mais
    lateral={<LateralDaEtapa icone={<Store />} titulo="Seu cadastro, sua vitrine." destaque="…" />}
    barra={<BarraDaEtapa onVoltar={() => ir(0)} carregando={salvando} />} onSubmit={continuar}>
    <GradeDeCampos>
      <CampoDoCadastro id="loja" rotulo="Nome da loja *" erro={erroLoja} />
      <CampoDoCadastro id="cep" rotulo="CEP *" icone={<MapPin />} />
      <CampoDoCadastro inteiro rotulo="Rua" />
    </GradeDeCampos>
  </EtapaDoCadastro>
</MolduraDoCadastro>`}</code></pre>
      </section>


    </div>
  );
}
