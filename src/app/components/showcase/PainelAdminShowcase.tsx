import React, { useState } from "react";
import { Archive, CalendarPlus, Circle, ClipboardCheck, Columns3, Eye, Inbox, ListChecks, MapPin, MessageCircle, MoreHorizontal, ScanSearch, SlidersHorizontal, Store } from "lucide-react";
import { SectionHeader } from "./shared/SectionHeader";
import { DataTable, DoDont, Mono, Panel } from "./shared/Guidance";
import { Quadro, type ColunaDoQuadro } from "../ui/quadro";
import { AvisoDoSistema, BalaoDeConversa, BotaoDeResposta, CabecalhoDaConversa, CampoDeMensagem, Conversa, FolhaDeOpcoes, IndicadorDeDigitacao, MolduraDeCelular } from "../ui/conversa";
import { BarraDeFerramentasDaTabela, TabelaAdaptavel, type ColunaAdaptavel, type OrdemDaTabela } from "../ui/tabela-adaptavel";
import { CampoDeBusca } from "../ui/campo-de-busca";
import { ChipDeFiltro, ListaDeFiltrosAtivos } from "../ui/chips";
import { ChipDeEstado } from "../ui/chip-de-estado";
import { Avaliacao } from "../ui/avaliacao";
import { BarraDeAcoesEmLote } from "../ui/painel-produtos";
import { CardIndicador } from "../ui/painel-dados";
import { Button } from "../ui/button";
import { SimboloFindLook } from "../ui/carregando";
import { GradeDeCards } from "../ui/grade-de-cards";

/* Quadro, conversa e tabela: as peças da área administrativa e do painel do lojista (27/11/2026). Dados de exemplo. */

type Etapa = "a_contatar" | "contato" | "visita" | "cadastro";
type LojaExemplo = { id: string; nome: string; bairro: string; tipo: string; etapa: Etapa; nota: number | null; total: number | null; contato: string };

const LOJAS: LojaExemplo[] = [
  { id: "1", nome: "Ateliê Aurora", bairro: "Batel", tipo: "Ateliê", etapa: "a_contatar", nota: 4.8, total: 96, contato: "Instagram" },
  { id: "2", nome: "Brechó da Vila", bairro: "São Francisco", tipo: "Brechó", etapa: "contato", nota: 4.6, total: 212, contato: "WhatsApp" },
  { id: "3", nome: "Outlet Mercês", bairro: "Mercês", tipo: "Outlet", etapa: "visita", nota: 4.1, total: 38, contato: "Telefone" },
  { id: "4", nome: "Casa Linho", bairro: "Água Verde", tipo: "Loja", etapa: "a_contatar", nota: null, total: null, contato: "Site" },
  { id: "5", nome: "Garimpo Centro", bairro: "Centro", tipo: "Brechó", etapa: "contato", nota: 4.4, total: 64, contato: "WhatsApp" },
];

const COLUNAS: ColunaDoQuadro<Etapa>[] = [
  { id: "a_contatar", titulo: "A contatar", icone: <Circle />, vazio: "Nenhuma loja a contatar." },
  { id: "contato", titulo: "Contato", icone: <MessageCircle />, vazio: "Nenhuma loja em contato." },
  { id: "visita", titulo: "Visita", icone: <MapPin />, vazio: "Nenhuma visita marcada." },
  { id: "cadastro", titulo: "Cadastro", icone: <ClipboardCheck />, vazio: "Arraste para cá quem se cadastrar." },
];

const ETAPA: Record<Etapa, { rotulo: string; tom: "neutro" | "aviso" | "marca" }> = {
  a_contatar: { rotulo: "A contatar", tom: "neutro" },
  contato: { rotulo: "Contato", tom: "aviso" },
  visita: { rotulo: "Visita", tom: "aviso" },
  cadastro: { rotulo: "Cadastro", tom: "marca" },
};

const COLUNAS_DA_TABELA: ColunaAdaptavel<LojaExemplo>[] = [
  { id: "nome", titulo: "Loja", fixa: true, largura: 180, ordenavel: true, celula: (l) => l.nome },
  { id: "etapa", titulo: "Etapa", largura: 130, prioridade: 1, celula: (l) => <ChipDeEstado tom={ETAPA[l.etapa].tom}>{ETAPA[l.etapa].rotulo}</ChipDeEstado> },
  { id: "bairro", titulo: "Bairro", largura: 130, prioridade: 2, ordenavel: true, celula: (l) => l.bairro },
  { id: "nota", titulo: "Nota", largura: 110, prioridade: 3, ordenavel: true, celula: (l) => <Avaliacao nota={l.nota} total={l.total} /> },
  { id: "tipo", titulo: "Tipo", largura: 100, prioridade: 4, celula: (l) => l.tipo },
  { id: "contato", titulo: "Contato", largura: 110, prioridade: 5, celula: (l) => l.contato },
];

export function PainelAdminShowcase() {
  const [lojas, setLojas] = useState(LOJAS);
  const [busca, setBusca] = useState("");
  const [selecionadas, setSelecionadas] = useState<Set<string>>(new Set(["2"]));
  const [ordem, setOrdem] = useState<OrdemDaTabela>({ coluna: "nome", direcao: "asc" });
  const [filtros, setFiltros] = useState(["Com contato"]);
  const [texto, setTexto] = useState("");
  const [mensagens, setMensagens] = useState<{ id: number; de: "eu" | "outro"; texto: string; hora: string }[]>([
    { id: 1, de: "outro", texto: "Oi! Eu sou o robô da FindLook. O que você quer fazer?", hora: "10:02" },
  ]);
  const [respondida, setRespondida] = useState(false);
  const [digitando, setDigitando] = useState(false);
  const [folha, setFolha] = useState(false);

  const filtradas = lojas
    .filter((l) => !busca || `${l.nome} ${l.bairro}`.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => {
      const c = ordem.coluna as keyof LojaExemplo;
      const r = String(a[c] ?? "").localeCompare(String(b[c] ?? ""), "pt-BR", { numeric: true });
      return ordem.direcao === "asc" ? r : -r;
    });

  const responder = (t: string) => {
    const hora = "10:03";
    setRespondida(true);
    setMensagens((m) => [...m, { id: m.length + 1, de: "eu", texto: t, hora }]);
    setDigitando(true);
    window.setTimeout(() => {
      setDigitando(false);
      setMensagens((m) => [...m, { id: m.length + 1, de: "outro", texto: `Certo: "${t}". Mande uma foto da peça ou descreva o que procura.`, hora }]);
    }, 1400);
  };

  return (
    <div className="space-y-16 pb-16">
      <section id="quadro" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Quadro (kanban)" description="Itens em colunas por etapa. Com 896 px ou mais de largura do próprio quadro, as colunas ficam lado a lado; antes disso, uma embaixo da outra, abrindo e fechando. Mova com o mouse (arrastar) ou com o botão Mover para de cada cartão." />
        <Panel className="p-4 sm:p-6">
          <Quadro
            rotulo="Ativação das lojas (exemplo)"
            colunas={COLUNAS}
            itens={lojas}
            chave={(l) => l.id}
            coluna={(l) => l.etapa}
            rotuloItem={(l) => l.nome}
            onMover={(l, para) => setLojas((ls) => ls.map((x) => (x.id === l.id ? { ...x, etapa: para } : x)))}
            cartao={(l) => (
              <div className="min-w-0 space-y-1">
                <p className="m-0 text-body-sm font-semibold text-foreground">{l.nome}</p>
                <p className="m-0 text-label text-muted-foreground">{l.bairro} · {l.tipo}</p>
                <Avaliacao nota={l.nota} total={l.total} />
              </div>
            )}
          />
        </Panel>
        <DataTable
          head={["Prop", "O que faz"]}
          rows={[
            [<Mono>colunas</Mono>, "{ id, titulo, icone, vazio, subtitulo, rodape, quantidade }"],
            [<Mono>itens</Mono>, "Os itens; chave, coluna e cartao dizem a chave de cada um, em que coluna está e o conteúdo do cartão."],
            [<Mono>onMover</Mono>, "Mover para outra coluna; com podeMover, só aparecem as colunas permitidas."],
            [<Mono>limitarAltura</Mono>, "Coluna com até 24rem e rolagem vertical por dentro (desligado por padrão)."],
          ]}
        />
        <DoDont dos={["Sempre o botão Mover para, além de arrastar.", "Quatro a seis colunas."]} donts={["Rolagem para o lado no quadro.", "Cartão com mais de três linhas de texto."]} />
      </section>

      <section id="conversa" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Conversa e moldura de celular" description="As peças do WhatsApp da loja e do simulador do robô: cabeçalho, balões (meus à direita, no rosa principal), digitando, aviso do sistema, respostas rápidas, a folha de opções e o campo de mensagem, dentro da moldura de celular." />
        <MolduraDeCelular rotulo="Celular simulado (exemplo)" className="h-144">
          <CabecalhoDaConversa nome="FindLook" status="Robô em teste" digitando={digitando} simbolo={<SimboloFindLook />} />
          <Conversa rotulo="Conversa com o robô da FindLook">
            <AvisoDoSistema>Hoje</AvisoDoSistema>
            {mensagens.map((m, i) => (
              <BalaoDeConversa
                key={m.id}
                de={m.de}
                autor={m.de === "eu" ? "Você" : "FindLook"}
                hora={m.hora}
                estado={m.de === "eu" ? "lida" : undefined}
                acoes={i === 0 ? (
                  <>
                    <BotaoDeResposta disabled={respondida} onClick={() => responder("Procurar uma peça")}>Procurar uma peça</BotaoDeResposta>
                    <BotaoDeResposta disabled={respondida} icone={<ListChecks aria-hidden />} onClick={() => setFolha(true)}>Ver opções</BotaoDeResposta>
                  </>
                ) : undefined}
              >
                {m.texto}
              </BalaoDeConversa>
            ))}
            {digitando && <IndicadorDeDigitacao />}
          </Conversa>
          <CampoDeMensagem valor={texto} onValorChange={setTexto} onEnviar={() => { responder(texto); setTexto(""); }} onAnexar={() => undefined} />
          <FolhaDeOpcoes
            titulo="Ver opções"
            aberta={folha}
            onFechar={() => setFolha(false)}
            opcoes={[{ id: "procurar", titulo: "Procurar uma peça", descricao: "Por foto ou descrição" }, { id: "loja", titulo: "Cadastrar minha loja", descricao: "Para lojistas" }]}
            onEscolher={(o) => { setFolha(false); responder(o.titulo); }}
          />
        </MolduraDeCelular>
        <p className="text-body-sm text-muted-foreground">Experimente: escolha uma resposta, abra Ver opções ou escreva uma mensagem. Conversa de exemplo.</p>
        <Panel className="mx-auto max-w-sm space-y-3 bg-muted p-4">
          <IndicadorDeDigitacao autor="FindLook" />
          <IndicadorDeDigitacao texto="Procurando peças parecidas…" icone={<ScanSearch />} />
          <BalaoDeConversa de="eu" autor="Você" hora="10:05" estado="erro" citacao={{ texto: "Vestido midi de linho · R$ 249,90" }}>Ainda tem esse vestido no tamanho P? Posso passar na loja amanhã à tarde.</BalaoDeConversa>
        </Panel>
        <DoDont dos={["Meus balões à direita, no rosa principal; os do outro, à esquerda, no card.", "Respostas rápidas embaixo do balão, desabilitadas depois de respondidas."]} donts={["Hover rosa nas respostas (o hover é cinza).", "Mensagem sem a hora."]} />
      </section>

      <section id="tabela-adaptavel" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Tabela adaptável e barra de ferramentas" description="A tabela mede a própria largura e mostra as colunas que cabem, da mais importante para a menos importante, com o aviso das que ficaram de fora; abaixo de 600 px de largura, vira lista. Nunca rola para o lado. Mude a largura da janela para ver." />
        <Panel className="overflow-hidden p-0">
          <BarraDeFerramentasDaTabela
            busca={<CampoDeBusca rotulo="Buscar loja" valor={busca} onValorChange={setBusca} placeholder="Nome ou bairro" />}
            filtrosAtivos={filtros.length > 0 ? (
              <ListaDeFiltrosAtivos onLimparTudo={() => setFiltros([])}>
                {filtros.map((f) => <ChipDeFiltro key={f} rotulo={f} onRemover={() => setFiltros((l) => l.filter((x) => x !== f))} />)}
              </ListaDeFiltrosAtivos>
            ) : undefined}
          >
            <Button variant="outline" className="h-10 toque:h-11"><SlidersHorizontal aria-hidden /> Filtros</Button>
            <Button variant="outline" className="h-10 toque:h-11"><Columns3 aria-hidden /> Colunas</Button>
          </BarraDeFerramentasDaTabela>
          {selecionadas.size > 0 && (
            <div className="border-b border-border p-3">
              <BarraDeAcoesEmLote
                selecionados={selecionadas.size}
                onLimpar={() => setSelecionadas(new Set())}
                itemNoSingular="loja"
                itemNoPlural="lojas"
                selecionadaNoFeminino
                acoes={[{ rotulo: "Agendar contato", icone: <CalendarPlus /> }, { rotulo: "Arquivar", icone: <Archive /> }]}
              />
            </div>
          )}
          <TabelaAdaptavel
            legenda="Lojas mapeadas (exemplo)"
            colunas={COLUNAS_DA_TABELA}
            linhas={filtradas}
            chave={(l) => l.id}
            rotuloDaLinha={(l) => l.nome}
            selecionadas={selecionadas}
            onSelecionadasChange={setSelecionadas}
            ordem={ordem}
            onOrdenar={setOrdem}
            acoes={(l) => <Button variant="ghost" size="icon" className="size-10 toque:size-11" aria-label={`Ações de ${l.nome}`}><MoreHorizontal aria-hidden /></Button>}
            vazio={<p className="m-0 text-body-sm text-muted-foreground">Nenhuma loja com essa busca.</p>}
          />
        </Panel>
        <DataTable
          head={["Prop", "O que faz"]}
          rows={[
            [<Mono>colunas</Mono>, "{ id, titulo, celula, largura (px mínimos), prioridade (1 = mais importante), fixa, alinhar, ordenavel }"],
            [<Mono>selecionadas</Mono>, "Com onSelecionadasChange: seleção com caixa de 44 px no toque e Selecionar todas; linha selecionada no rosa do selecionado."],
            [<Mono>ordem</Mono>, "Com onOrdenar: ordenação pelo título da coluna, com aria-sort."],
            [<Mono>larguraDaLista</Mono>, "Quando vira lista (600 px). textoDoAviso e vazio mudam o aviso e o estado vazio."],
            [<Mono>itemNoPlural</Mono>, "Na BarraDeAcoesEmLote: o texto da lista (com itemNoSingular, selecionadaNoFeminino ou textoDaContagem)."],
          ]}
        />
        <DoDont dos={["A coluna mais importante com prioridade 1.", "Diga as colunas que ficaram de fora (o aviso faz isso)."]} donts={["Rolagem horizontal dentro do card.", "Cortar o nome da loja com reticências quando há espaço na lista."]} />
      </section>

      <section id="card-indicador-link" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Card de indicador clicável" description="O CardIndicador com href (ou onClick) vira o atalho para a lista filtrada: hover cinza com a borda mais forte e a seta no canto." />
        <GradeDeCards className="gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CardIndicador icone={<Store />} valor={48} total={75} rotulo="Lojas a contatar" href="#card-indicador-link" />
          <CardIndicador icone={<Inbox />} valor={12} rotulo="Contatos sem resposta" variacao={-8} comparacao="na semana" href="#card-indicador-link" />
          <CardIndicador icone={<Eye />} valor={1284} rotulo="Visualizações" variacao={18.6} comparacao="no mês" />
        </GradeDeCards>
        <p className="text-body-sm text-muted-foreground">Os dois primeiros são clicáveis; o terceiro não (sem href). Números de exemplo.</p>
      </section>
    </div>
  );
}
