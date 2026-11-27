import React, { useRef, useState } from "react";
import { BarChart3, Eye, Heart, House, Package, Play, RotateCcw, Search, Settings, Shirt } from "lucide-react";
import { SectionHeader } from "./shared/SectionHeader";
import { DataTable, DoDont, Mono, Panel, SubTitle } from "./shared/Guidance";
import { SurgirAoRolar, TituloQueSurge } from "../ui/surgir-ao-rolar";
import { NumeroAnimado } from "../ui/numero-animado";
import { CursorDeDemonstracao, clicarCursor, moverCursor } from "../ui/cursor-de-demonstracao";
import { GraficoDaMiniatura, IndicadoresDaMiniatura, MiniaturaDoPainel, TabelaDaMiniatura } from "../ui/miniatura-do-painel";
import { ChipDeEstado } from "../ui/chip-de-estado";
import { Logo } from "../ui/logo";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader } from "../ui/card";
import { GradeDeCards } from "../ui/grade-de-cards";
import { useMenosMovimento } from "../ui/movimento";

/* Demonstrações animadas: entrada ao rolar, número que sobe, cursor que conta a história e miniatura do painel (27/11/2026). */

const espera = (ms: number) => new Promise((r) => setTimeout(r, ms));

function DemoDoCursor() {
  const palco = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const campo = useRef<HTMLDivElement>(null);
  const botao = useRef<HTMLDivElement>(null);
  const menos = useMenosMovimento();
  const [texto, setTexto] = useState("");
  const [visivel, setVisivel] = useState(false);
  const [rodando, setRodando] = useState(false);
  const [buscou, setBuscou] = useState(false);
  const frase = "vestido midi de linho";

  const rodar = async () => {
    setBuscou(false);
    setTexto("");
    if (menos) { setTexto(frase); setBuscou(true); return; }
    const c = cursor.current, p = palco.current;
    if (!c || !p || !campo.current || !botao.current) return;
    setRodando(true);
    setVisivel(true);
    await moverCursor(c, p, campo.current);
    await clicarCursor(c);
    for (let i = 1; i <= frase.length; i++) { setTexto(frase.slice(0, i)); await espera(45); }
    await moverCursor(c, p, botao.current);
    await clicarCursor(c);
    setBuscou(true);
    await espera(600);
    setVisivel(false);
    setRodando(false);
  };

  return (
    <div className="space-y-4">
      <div ref={palco} className="relative overflow-hidden rounded-lg border border-border bg-muted p-4 sm:p-6">
        <div className="space-y-3" aria-hidden>
          <div ref={campo}><Input readOnly tabIndex={-1} value={texto} placeholder="Descreva a peça que procura" className="h-11 bg-card" /></div>
          <div ref={botao} className="w-fit"><Button tabIndex={-1} className="h-11">Encontrar peças</Button></div>
          {buscou && <p className="m-0 text-body-sm font-semibold text-success-text motion-safe:animate-in motion-safe:fade-in">3 peças parecidas por perto (exemplo).</p>}
        </div>
        <CursorDeDemonstracao ref={cursor} visivel={visivel} />
      </div>
      <Button variant="outline" className="h-10 toque:h-11" onClick={() => void rodar()} disabled={rodando}>
        {buscou ? <RotateCcw aria-hidden /> : <Play aria-hidden />} {buscou ? "Ver de novo" : "Ver a demonstração"}
      </Button>
      <p className="sr-only" aria-live="polite">{buscou ? "Demonstração: a busca por vestido midi de linho encontrou 3 peças de exemplo." : ""}</p>
    </div>
  );
}

export function DemonstracoesShowcase() {
  const [vezes, setVezes] = useState(0);
  return (
    <div className="space-y-16 pb-16">
      <section id="surgir-ao-rolar" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Entrada ao rolar" description="SurgirAoRolar: os blocos sobem e aparecem quando chegam na tela (uma vez só, por padrão), com os itens um depois do outro em escalonar. TituloQueSurge: o título aparece palavra por palavra. A mesma API do DS Dani Moscatelli, com os tokens de movimento da FindLook. Com menos movimento, tudo aparece parado." />
        <Panel className="space-y-6 p-6 sm:p-8" key={vezes}>
          <TituloQueSurge as="h3" destaque="por perto" className="m-0 text-h3 font-bold text-foreground">Seu estilo por perto.</TituloQueSurge>
          <SurgirAoRolar escalonar>
            <GradeDeCards className="gap-4 sm:grid-cols-3">
              {["Descreva a peça", "Veja onde encontrar", "Fale com a loja"].map((t, i) => (
                <Card key={t} className="gap-2">
                  <CardHeader><p className="m-0 text-label font-semibold uppercase tracking-[0.08em] text-primary-text">Passo {i + 1}</p></CardHeader>
                  <CardContent><p className="m-0 text-body font-semibold text-foreground">{t}</p></CardContent>
                </Card>
              ))}
            </GradeDeCards>
          </SurgirAoRolar>
          <Button variant="outline" className="h-10 toque:h-11" onClick={() => setVezes((v) => v + 1)}><RotateCcw aria-hidden /> Repetir</Button>
        </Panel>
        <DataTable head={["Prop", "O que faz"]} rows={[[<Mono>efeito</Mono>, "subir (padrão) · desfoque"], [<Mono>escalonar · passo</Mono>, "filhos diretos um depois do outro (80 ms entre eles)"], [<Mono>atraso · repetir · raiz</Mono>, "atraso em ms; animar de novo ao voltar; contêiner com rolagem própria"]]} />
        <DoDont dos={["Use nas landings, para dar ritmo à leitura.", "Escalone listas curtas (até 12 itens)."]} donts={["Animar o que a pessoa precisa ler antes de rolar (o topo da página).", "Usar dentro do painel, em telas de trabalho."]} />
      </section>

      <section id="numero-animado" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Número animado" description="O número sobe de 0 até o valor quando aparece e acompanha as mudanças depois. Leitores de tela ouvem só o valor final." />
        <Panel className="flex flex-wrap items-end gap-8 p-6 sm:p-8" key={`n${vezes}`}>
          {[{ v: 128, r: "Peças publicadas" }, { v: 1284, r: "Visualizações" }, { v: 24, r: "Favoritos" }].map((n, i) => (
            <div key={n.r}>
              <NumeroAnimado valor={n.v} atraso={i * 0.1} className="block text-h2 font-bold leading-none text-foreground" />
              <p className="m-0 mt-2 text-body-sm text-muted-foreground">{n.r}</p>
            </div>
          ))}
        </Panel>
        <p className="text-body-sm text-muted-foreground">Números de exemplo.</p>
      </section>

      <section id="cursor-de-demonstracao" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Cursor de demonstração" description="A seta grande que conta a história de uma demonstração em etapas: entra, clica no campo, digita e aperta o botão. moverCursor e clicarCursor fazem o movimento com os tokens. Com menos movimento, a demonstração mostra direto o resultado." />
        <Panel className="p-6 sm:p-8"><DemoDoCursor /></Panel>
        <DoDont dos={["Comece só quando a área estiver na tela.", "Se a pessoa clicar, o cursor sai e ela segue sozinha."]} donts={["Cursor em tela de trabalho.", "Demonstração sem um botão para ver de novo."]} />
      </section>

      <section id="miniatura-do-painel" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Miniatura do painel" description="Ilustração conceitual do painel da loja para páginas de venda: janela, menu fechado, cards de resumo com o número subindo, gráfico que se desenha e a tabela de peças. Fica fora da leitura de tela; o aviso embaixo é lido." />
        <div className="mx-auto max-w-2xl">
          <MiniaturaDoPainel
            titulo="Painel da loja"
            logo={<Logo className="h-full" />}
            menu={[{ rotulo: "Início", icone: <House /> }, { rotulo: "Peças", icone: <Shirt /> }, { rotulo: "Estoque", icone: <Package /> }, { rotulo: "Relatórios", icone: <BarChart3 /> }, { rotulo: "Configurações", icone: <Settings /> }]}
          >
            <IndicadoresDaMiniatura itens={[
              { icone: <Shirt />, valor: 128, rotulo: "Peças publicadas", sinal: "check" },
              { icone: <Eye />, valor: 1284, rotulo: "Visualizações", sinal: "alta", tom: "neutro" },
              { icone: <Heart />, valor: 24, rotulo: "Favoritos", sinal: "alta" },
              { icone: <Search />, valor: 8, rotulo: "Buscas compatíveis", tom: "neutro" },
            ]} />
            <GraficoDaMiniatura titulo="Desempenho da descoberta" valores={[140, 260, 380, 410, 380, 470, 620, 690, 660, 700, 830, 950, 900, 1000, 1090, 1150]} eixoX={["02 out", "16 out", "30 out"]} />
            <TabelaDaMiniatura linhas={[
              { nome: "Calça wide leg", detalhe: "Tam. 38", quantidade: 3, preco: "R$ 189,90", situacao: <ChipDeEstado tom="sucesso">Publicada</ChipDeEstado> },
              { nome: "Vestido midi", detalhe: "Linho · Tam. P", quantidade: 2, preco: "R$ 249,90", situacao: <ChipDeEstado tom="aviso">Pendente</ChipDeEstado> },
            ]} />
          </MiniaturaDoPainel>
        </div>
        <SubTitle>Tokens de movimento em JavaScript (ui/movimento.ts)</SubTitle>
        <DataTable head={["Nome", "Valor e token CSS"]} rows={[
          [<Mono>DURACAO</Mono>, "rapida 0,15 · normal 0,25 · lenta 0,4 · extraLenta 0,6 s (--duration-fast, -normal, -slow, -xslow)"],
          [<Mono>CURVA_SNAPPY</Mono>, "[0.16, 1, 0.3, 1] (--ease-snappy)"],
          [<Mono>useMenosMovimento</Mono>, "true quando o aparelho pede menos movimento"],
        ]} />
      </section>
    </div>
  );
}
