import React from "react";
import { Ban, CheckCircle2, AlertCircle, Heart, MessageCircle } from "lucide-react";
import { SectionHeader } from "./shared/SectionHeader";
import { DoDont, Mono } from "./shared/Guidance";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ChipDeEstado } from "../ui/chip-de-estado";
import { MapaCoropletico, LegendaDoMapa, BarrasHorizontais, corDoMapa, type FaixaDoMapa } from "../ui/graficos";
import { CartaoDePecaDoPainel } from "../ui/cartao-de-peca-do-painel";
import { MolduraDeCelular, CabecalhoDaConversa, Conversa, BalaoDaConversa, CampoDeMensagem, type FotoDoCampo } from "../ui/conversa";

/*
 * Documentação das peças do FindLook que o produto ainda fazia à mão (28/11/2026): MapaCoropletico com faixas fixas,
 * números e "+N"; BarrasHorizontais com link por linha; CartaoDePecaDoPainel; CampoDeMensagem com a ref, o anexar
 * desligado e a prévia das fotos. Todos os dados são de exemplo.
 */

function Cabecalho({ titulo, quando, arquivo, nomes }: { titulo: string; quando: string; arquivo: string; nomes: string[] }) {
  return (
    <div>
      <SectionHeader title={titulo} description={quando} />
      <dl className="-mt-6 grid gap-2 text-body-sm text-muted-foreground sm:grid-cols-[auto_minmax(0,1fr)] sm:items-baseline sm:gap-x-3">
        <dt>Arquivo</dt>
        <dd className="m-0 flex flex-wrap gap-2"><Mono>{arquivo}</Mono></dd>
        <dt>Componentes</dt>
        <dd className="m-0 flex flex-wrap gap-2">{nomes.map(n => <Mono key={n}>{n}</Mono>)}</dd>
      </dl>
    </div>
  );
}

function ComoUsar({ children }: { children: string }) {
  return (
    <div className="space-y-2">
      <h3 className="text-body-sm font-semibold text-foreground">Como usar</h3>
      <pre className="m-0 whitespace-pre-wrap break-words rounded-md bg-muted p-3 text-label text-muted-foreground"><code>{children}</code></pre>
    </div>
  );
}

function Regras({ itens }: { itens: string[] }) {
  return <ul className="m-0 list-disc space-y-1 pl-5 text-body-sm text-muted-foreground">{itens.map(i => <li key={i}>{i}</li>)}</ul>;
}

const foto = (id: string) => `https://images.unsplash.com/photo-${id}?w=360&q=60&auto=format&fit=crop`;

/* ── Mapa com faixas fixas e números ── */

const FAIXAS: FaixaDoMapa[] = [
  { ate: 25, rotulo: "0 – 25 lojas" },
  { ate: 75, rotulo: "26 – 75 lojas" },
  { ate: 150, rotulo: "76 – 150 lojas" },
  { ate: 300, rotulo: "151 – 300 lojas" },
  { ate: Infinity, rotulo: "300+ lojas" },
];

export function SecaoMapaComFaixas() {
  const regioes = Array.from({ length: 9 }, (_, i) => {
    const x = (i % 3) * 200, y = Math.floor(i / 3) * 140;
    return { nome: `Região ${i + 1}`, d: `M${x + 6} ${y + 6}h188v128h-188z`, cx: x + 100, cy: y + 70 };
  });
  // Região 9 fica fora dos dados (não está em valores): pintada com semDado.
  const dados: [string, number, number][] = [["Região 1", 0, 0], ["Região 2", 18, 0], ["Região 3", 60, 2], ["Região 4", 120, 0], ["Região 5", 340, 5], ["Região 6", 210, 1], ["Região 7", 9, 0], ["Região 8", 90, 0]];
  const valores = new Map(dados.map(([n, v]) => [n, v]));
  const novas = new Map(dados.map(([n, , c]) => [n, c]));
  const [escolhida, setEscolhida] = React.useState<string | null>("Região 5");
  return (
    <section id="mapa-com-faixas" className="scroll-mt-32 space-y-6">
      <Cabecalho
        titulo="Mapa com faixas fixas e números"
        quando="O MapaCoropletico do mapa de bairros da Visão geral: faixas fixas (0–25, 26–75…) com legenda em lista, o total de cada região numa pílula, o “+N” das empresas para conferir no vermelho da marca, a região escolhida por cima das vizinhas e uma cor para quem está fora dos dados."
        arquivo="ui/graficos.tsx"
        nomes={["MapaCoropletico (faixas, etiquetas, semDado, mostrarLegenda)", "LegendaDoMapa", "corDoMapa"]}
      />
      <Card>
        <CardContent className="grid gap-6 p-6 md:grid-cols-[13rem_minmax(0,1fr)]">
          <div className="order-2 space-y-2 md:order-none">
            <p className="m-0 text-body-sm font-semibold text-foreground">Como ler o mapa</p>
            <LegendaDoMapa faixas={FAIXAS} />
            <p className="m-0 pt-2 text-label text-muted-foreground">A Região 9 está fora dos dados (cinza do --accent).</p>
          </div>
          <div className="mx-auto w-full max-w-md">
            <MapaCoropletico
              viewBox="0 0 600 420"
              regioes={regioes}
              valores={valores}
              faixas={FAIXAS}
              mostrarLegenda={false}
              semDado="var(--accent)"
              etiquetas={(nome, n) => (n > 0 ? { texto: String(n), extra: novas.get(nome) ? `+${novas.get(nome)}` : undefined } : null)}
              rotulo="Mapa de exemplo com 9 regiões, pintado pelo total de lojas em faixas fixas; os números estão na lista ao lado."
              rotuloDoValor={(n, nome) => `${n} lojas${novas.get(nome) ? `, ${novas.get(nome)} para conferir` : ""}`}
              escolhida={escolhida}
              onEscolher={setEscolhida}
            />
            <p aria-live="polite" className="m-0 mt-2 min-h-5 text-center text-body-sm text-muted-foreground">
              {escolhida ? `${escolhida}: ${valores.get(escolhida) ?? "fora dos dados"}${valores.has(escolhida) ? " lojas" : ""}` : "Toque numa região."}
            </p>
          </div>
        </CardContent>
      </Card>
      <ComoUsar>{`<MapaCoropletico
  viewBox={geo.viewBox} regioes={geo.bairros} valores={lojasPorBairro}
  faixas={[{ ate: 25, rotulo: "0 – 25 lojas" }, …, { ate: Infinity, rotulo: "300+ lojas" }]}
  mostrarLegenda={false}                      // legenda em outro lugar: <LegendaDoMapa faixas={…} />
  semDado="var(--accent)"                     // bairros que não estão em valores
  etiquetas={(bairro, n) => n > 0 ? { texto: String(n), extra: conferir(bairro) ? \`+\${conferir(bairro)}\` : undefined } : null}
  rotuloDoValor={(n, bairro) => \`\${n} lojas\`}
  escolhida={escolhido} onEscolher={setEscolhido}
/>
// Ponto de cor numa lista: corDoMapa(n, 0, faixas)`}</ComoUsar>
      <Regras itens={[
        "Faixas fixas, até 5, da menor para a maior: cada uma num token --mapa-1 a --mapa-5 (do cinza ao rosa). Valor 0 em --mapa-vazio; fora de valores, a cor de semDado (padrão --mapa-vazio).",
        "Pílula do número no card com borda --border-strong (na escolhida, grafite com o número claro); “+N” no vermelho da marca (--primary) com texto branco. As pílulas são decorativas: o número vai na dica de cada região e na lista equivalente.",
        "A escolhida é desenhada por último, com o contorno --mapa-escolhida por cima das vizinhas. O mapa aparece com um esmaecer; com “menos movimento”, aparece pronto.",
      ]} />
      <DoDont
        dos={["Ofereça a mesma informação em lista (TabelaAdaptavel) para teclado e leitores de tela.", "Escreva as faixas com a unidade (“26 – 75 lojas”)."]}
        donts={["Não use mais de 5 faixas.", "Não escreva o número direto sobre a cor da região: use a pílula, que garante o contraste."]}
      />
    </section>
  );
}

/* ── Barras horizontais com link ── */

export function SecaoBarrasHorizontaisComLink() {
  const [aberto, setAberto] = React.useState<string | null>(null);
  const linhas = [["Centro", 12], ["Batel", 9], ["Água Verde", 6], ["Portão", 3]] as const;
  return (
    <section id="barras-horizontais-com-link" className="scroll-mt-32 space-y-6">
      <Cabecalho
        titulo="Barras horizontais com link"
        quando="Cada linha das BarrasHorizontais pode levar a outra tela (href) ou fazer uma ação (onClick): a linha inteira vira link ou botão."
        arquivo="ui/graficos.tsx"
        nomes={["BarrasHorizontais (href, onClick, comoLink)"]}
      />
      <Card>
        <CardContent className="grid gap-4 p-6">
          <BarrasHorizontais
            rotulo="Lojas por bairro (exemplo)"
            linhas={linhas.map(([b, n], i) => ({ rotulo: b, texto: `${n} lojas`, partes: [{ rotulo: b, valor: n, cor: i === 0 ? "var(--chart-1)" : "var(--chart-2)" }], onClick: () => setAberto(b) }))}
          />
          <p aria-live="polite" className="m-0 min-h-5 text-body-sm text-muted-foreground">{aberto ? `Abriria as lojas de ${aberto}.` : "Toque numa linha."}</p>
        </CardContent>
      </Card>
      <ComoUsar>{`<BarrasHorizontais rotulo="Lojas por bairro" comoLink={Link}
  linhas={[{ rotulo: "Centro", texto: "12 lojas", partes: [...], href: "/admin/lojas/?bairro=Centro" }]} />`}</ComoUsar>
      <Regras itens={["Nome do link: “Centro, 12 lojas”; a barra é decorativa. Hover cinza de ponta a ponta (--row-hover, sem cantos), foco por dentro, 44 px no toque."]} />
      <DoDont dos={["Leve à lista filtrada pelo que a linha conta."]} donts={["Não misture linhas com e sem link."]} />
    </section>
  );
}

/* ── Cartão de peça do painel ── */

const SITUACAO = {
  publicada: <ChipDeEstado tom="sucesso" icone={<CheckCircle2 />}>Publicada</ChipDeEstado>,
  pausada: <ChipDeEstado tom="aviso" icone={<AlertCircle />}>Pausada</ChipDeEstado>,
  vendida: <ChipDeEstado tom="neutro" icone={<Ban />}>Vendida</ChipDeEstado>,
};

export function SecaoCartaoDePecaDoPainel() {
  const [salva, setSalva] = React.useState<string | null>(null);
  const [aberta, setAberta] = React.useState("Toque numa peça.");
  const abrir = (id: string, nome: string) => {
    setAberta(`Abriria ${nome} para editar. Ao salvar, o cartão fica em destaque.`);
    setSalva(id);
    setTimeout(() => setSalva(s => (s === id ? null : s)), 1800);
  };
  const interesse = (contatos: number, salvas: number) => [
    { icone: <MessageCircle aria-hidden />, valor: contatos, rotulo: `${contatos} ${contatos === 1 ? "pessoa pediu" : "pessoas pediram"} contato` },
    { icone: <Heart aria-hidden />, valor: salvas, rotulo: `${salvas} ${salvas === 1 ? "pessoa salvou" : "pessoas salvaram"}` },
  ];
  return (
    <section id="cartao-de-peca-do-painel" className="scroll-mt-32 space-y-6">
      <Cabecalho
        titulo="Cartão de peça do painel"
        quando="A peça como a loja a vê no painel: foto com a situação por cima, preço com promoção, tamanhos e o interesse (contatos e favoritos). O cartão inteiro abre a peça para editar; depois de salvar, fica em destaque por um momento. O ProductCard é a vitrine de quem compra."
        arquivo="ui/cartao-de-peca-do-painel.tsx"
        nomes={["CartaoDePecaDoPainel", "IndicadorDaPeca"]}
      />
      <Card>
        <CardContent className="grid gap-4 p-6">
          <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-4">
            <li><CartaoDePecaDoPainel titulo="Vestido midi florido" foto={foto("1595777457583-95e059d581b8")} situacao={SITUACAO.publicada} preco="R$ 159,90" precoPromocional="R$ 129,90" detalhes="P (1), M (2)" indicadores={interesse(3, 5)} destaque={salva === "1"} onAbrir={() => abrir("1", "Vestido midi florido")} /></li>
            <li><CartaoDePecaDoPainel titulo="Calça jeans reta de cintura alta" foto={foto("1542272604-787c3835535d")} situacao={SITUACAO.pausada} preco="R$ 89,90" detalhes="38, 40, 42" indicadores={interesse(0, 1)} destaque={salva === "2"} onAbrir={() => abrir("2", "Calça jeans reta")} /></li>
            <li><CartaoDePecaDoPainel titulo="Jaqueta de couro" foto={foto("1551028719-00167b16eac5")} situacao={SITUACAO.vendida} vendida preco="R$ 249,00" detalhes="M" destaque={salva === "3"} onAbrir={() => abrir("3", "Jaqueta de couro")} /></li>
            <li><CartaoDePecaDoPainel titulo="Peça sem foto e sem preço" situacao={SITUACAO.publicada} destaque={salva === "4"} onAbrir={() => abrir("4", "Peça sem foto")} /></li>
          </ul>
          <p aria-live="polite" className="m-0 text-body-sm text-muted-foreground">{aberta}</p>
          <div className="border-t border-border pt-4">
            <h3 className="mb-3 text-body-sm font-semibold text-foreground">Só de leitura (ficha da loja parceira)</h3>
            <div className="grid max-w-[11rem] grid-cols-1">
              <CartaoDePecaDoPainel titulo="Vestido midi florido" foto={foto("1595777457583-95e059d581b8")} situacao={SITUACAO.publicada} preco="R$ 129,90" detalhes="P, M" indicadores={interesse(3, 5)} />
            </div>
          </div>
        </CardContent>
      </Card>
      <ComoUsar>{`<CartaoDePecaDoPainel
  titulo={peca.titulo} foto={url}
  situacao={<ChipDaPeca situacao={peca.situacao} />}     // um ChipDeEstado
  preco={reais(peca.preco)} precoPromocional={promocao ? reais(promocao) : null}
  detalhes={textoTamanhos(peca.tamanhos)}
  indicadores={[{ icone: <MessageCircle />, valor: 3, rotulo: "3 pessoas pediram contato" }]}
  vendida={peca.situacao === "vendida"}
  destaque={acabouDeSalvar === peca.id}
  onAbrir={() => abrir(peca.id)}                          // ou href + comoLink; sem os dois, só leitura
/>`}</ComoUsar>
      <Regras itens={[
        "Foto 4:5 no cinza de apoio; sem foto, a camiseta. A situação é um ChipDeEstado numa base branca, sobre a foto.",
        "Nome em até 2 linhas (text-body-sm), preço em text-body negrito (promoção: o antigo riscado em text-label cinza e o novo em --primary-text, “em promoção” para leitores de tela), tamanhos em text-label cinza numa linha.",
        "O nome do cartão diz a ação e o interesse (“Editar Vestido midi florido. 3 pessoas pediram contato · 5 pessoas salvaram”); os números do rodapé ficam escondidos dos leitores (já estão no nome).",
        "Hover: borda mais forte, sombra pequena e subida de 2 px; toque encolhe um pouco. Com “menos movimento”, só a borda e a sombra mudam. Destaque de sucesso: borda e anel verdes. Vendida: foto esmaecida (o chip diz em texto).",
      ]} />
      <DoDont
        dos={["Ponha os cartões numa grade de 2 a 4 colunas, todos com a mesma altura.", "Limpe o destaque depois de 1,5 a 2 s."]}
        donts={["Não ponha botões dentro do cartão: ele inteiro já é o botão.", "Não use na vitrine para quem compra (é o ProductCard)."]}
      />
    </section>
  );
}

/* ── Campo de mensagem com fotos ── */

export function SecaoCampoDeMensagemComFotos() {
  const campo = React.useRef<HTMLInputElement>(null);
  const [texto, setTexto] = React.useState("");
  const [fotos, setFotos] = React.useState<FotoDoCampo[]>([]);
  const [enviadas, setEnviadas] = React.useState<{ id: number; texto?: string; imagem?: string }[]>([]);
  const banco = [foto("1595777457583-95e059d581b8"), foto("1542272604-787c3835535d"), foto("1551028719-00167b16eac5")];
  const MAX = 3;
  return (
    <section id="campo-de-mensagem-fotos" className="scroll-mt-32 space-y-6">
      <Cabecalho
        titulo="Campo de mensagem com fotos"
        quando="O CampoDeMensagem do simulador do WhatsApp: prévia das fotos escolhidas acima do campo, com remover em cada uma; o clipe desliga quando já há o máximo de fotos; e a ref do campo, para devolver o foco depois de enviar."
        arquivo="ui/conversa.tsx"
        nomes={["CampoDeMensagem (ref, anexarDesativado, fotos, onRemoverFoto, tituloDasFotos, descricaoDasFotos)", "FotoDoCampo"]}
      />
      <div className="grid gap-6 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:items-start">
        <MolduraDeCelular rotulo="Celular simulado (exemplo)" className="h-136" data-cards-ignorar>
          <CabecalhoDaConversa nome="FindLook" status="Robô em teste" />
          <Conversa rotulo="Conversa de exemplo" alinhamento="lados" rolagem>
            {enviadas.map(m => <BalaoDaConversa key={m.id} autor="eu" estado="enviada" imagem={m.imagem ? { src: m.imagem, alt: "Foto enviada" } : undefined}>{m.texto}</BalaoDaConversa>)}
          </Conversa>
          <CampoDeMensagem
            ref={campo}
            valor={texto}
            onValorChange={setTexto}
            placeholder={fotos.length ? "Descreva a peça (opcional)" : "Mensagem"}
            onAnexar={() => setFotos(f => [...f, { id: String(Date.now()), url: banco[f.length % banco.length]! }])}
            anexarDesativado={fotos.length >= MAX}
            rotuloAnexar={fotos.length ? "Adicionar mais fotos da peça" : "Escolher fotos de uma peça"}
            fotos={fotos}
            onRemoverFoto={id => setFotos(f => f.filter(x => x.id !== id))}
            tituloDasFotos={fotos.length > 1 ? `${fotos.length} fotos prontas para enviar` : "Foto pronta para enviar"}
            descricaoDasFotos={fotos.length < MAX ? `Pode juntar até ${MAX} fotos da mesma peça.` : "Máximo de fotos. Se quiser, escreva a descrição."}
            rotuloEnviar={fotos.length > 1 ? "Enviar fotos" : fotos.length ? "Enviar foto" : "Enviar mensagem"}
            onEnviar={() => {
              setEnviadas(m => [...m, ...fotos.map((f, i) => ({ id: Date.now() + i, imagem: f.url, texto: i === 0 && texto ? texto : undefined })), ...(fotos.length === 0 ? [{ id: Date.now(), texto }] : [])]);
              setFotos([]);
              setTexto("");
              campo.current?.focus();
            }}
          />
        </MolduraDeCelular>
        <div className="space-y-4">
          <p className="m-0 text-body-sm text-muted-foreground">Toque no clipe para juntar fotos de exemplo (até 3). Depois do envio, o foco volta ao campo pela ref.</p>
          <Button type="button" variant="outline" size="sm" onClick={() => campo.current?.focus()}>Pôr o foco no campo (ref)</Button>
        </div>
      </div>
      <ComoUsar>{`const campo = useRef<HTMLInputElement>(null);
<CampoDeMensagem
  ref={campo}
  valor={texto} onValorChange={setTexto}
  onAnexar={() => seletorDeArquivo.current?.click()}
  anexarDesativado={fotos.length >= 3}
  fotos={fotos.map(f => ({ id: f.id, url: f.previa }))}
  onRemoverFoto={(id) => tirar(id)}                 // o foco volta sozinho ao campo
  tituloDasFotos="Foto pronta para enviar"
  descricaoDasFotos="Pode juntar até 3 fotos da mesma peça."
  onEnviar={() => { enviar(); campo.current?.focus(); }}
/>`}</ComoUsar>
      <Regras itens={[
        "Miniaturas de 56 px com o botão de remover de 24 px no canto, com 44 × 44 px de área de toque (um ::after invisível); o nome é “Remover foto 2”.",
        "Com fotos, o enviar fica livre sem texto. O clipe desligado (anexarDesativado) não trava o campo nem o enviar.",
        "A faixa desliza de baixo e cada miniatura aparece com uma pequena escala; com “menos movimento”, só aparecem.",
      ]} />
      <DoDont
        dos={["Diga quantas fotos ainda cabem em descricaoDasFotos.", "Devolva o foco ao campo depois de enviar (ref)."]}
        donts={["Não esconda o clipe no máximo: desligue (anexarDesativado), para a pessoa entender o limite.", "Não ponha a prévia fora da moldura do campo."]}
      />
    </section>
  );
}
