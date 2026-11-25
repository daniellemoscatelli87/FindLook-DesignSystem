import React from "react";
import { ArrowRight, CalendarCheck, CalendarDays, ChartColumn, CircleX, Headset, Lock, Package, ShoppingCart, Target, Trophy, Truck } from "lucide-react";
import { CabecalhoComIlustracao } from "@/app/components/ui/cabecalho-com-ilustracao";
import { IconeEstrela, IlustracaoEstrela } from "@/app/components/ui/ilustracao-estrela";
import { CardDeNota } from "@/app/components/ui/card-de-nota";
import { ListaDeProgresso } from "@/app/components/ui/lista-de-progresso";
import { CardComCabecalho, CardDeInformacao, FaixaDeBeneficios, ItemDeChecklist } from "@/app/components/ui/painel-dados";
import { BadgeDeFaixa } from "@/app/components/ui/termometro";
import { Button } from "@/app/components/ui/button";
import seloEstrela from "../../../imports/findlook/findstar-selo-3d.webp";

/* Abertura de uma página de desempenho: exemplo com dados fictícios e genéricos. Nomes, regras e textos de cada
   programa vêm do produto. */
export function AberturaDeDesempenho() {
  const nao = (e: React.MouseEvent) => e.preventDefault();
  return (
    <div className="relative isolate space-y-5 overflow-hidden rounded-xl bg-muted/40 p-4 sm:p-6">
      <CabecalhoComIlustracao
        nivel={2}
        fundo="pagina"
        titulo={<>Programa <span className="text-[var(--primary-text,var(--primary))]">Destaque</span></>}
        subtitulo={<>Seu desempenho, de <strong>forma simples e transparente.</strong></>}
        descricao="Acompanhe sua nota, entenda o que influencia o resultado e saiba como evoluir."
        ilustracao={<IlustracaoEstrela src={seloEstrela} alt="FindStar: excelência no atendimento" tamanho={400} />}
      />
      <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
        <CardDeNota
          rotulo="Sua nota atual"
          explicacao="Exemplo: a nota considera os últimos 90 dias."
          valor={78}
          selo={<BadgeDeFaixa preenchida faixa={{ id: "bom", nome: "Bom", tom: 3, inicio: 60, fim: 80 }} />}
          titulo="Você está perto do próximo nível."
          texto="Mantenha o bom desempenho e conquiste o selo."
          progresso={78}
          rotuloProgresso="Progresso até o próximo nível"
          detalheProgresso="78 de 100"
        />
        <CardDeInformacao icone={<CalendarDays />} rotulo="Próxima avaliação" valor="1º de cada mês" texto="Avaliação mensal, automática." />
      </div>
      <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
        <CardComCabecalho icone={<ChartColumn />} iconeRedondo cabecalho="simples" titulo="Desempenho por critério" descricao="Veja sua nota em cada critério e foque no que pode melhorar.">
          <ListaDeProgresso itens={[
            { id: "a", icone: <Headset />, rotulo: "Atendimento", etiqueta: "Peso 40%", pct: 82, valor: "82", total: "/100" },
            { id: "b", icone: <Package />, rotulo: "Qualidade", etiqueta: "Peso 25%", pct: 74, valor: "74", total: "/100" },
            { id: "c", icone: <ShoppingCart />, rotulo: "Pedidos", etiqueta: "Peso 15%", pct: 90, valor: "90", total: "/100" },
            { id: "d", icone: <Truck />, rotulo: "Entrega", etiqueta: "Peso 10%", pct: null, semValor: "Sem dados" },
            { id: "e", icone: <CircleX />, rotulo: "Cancelamentos", etiqueta: "Peso 10%", pct: 95, valor: "95", total: "/100" },
          ]} />
        </CardComCabecalho>
        <CardComCabecalho icone={<Target />} iconeRedondo fundo="marca" cabecalho="simples" titulo="Como evoluir agora" descricao="Ações práticas que mais aumentam sua nota.">
          <ul className="m-0 list-none divide-y divide-border p-0">
            <ItemDeChecklist estado="feito" texto="Responda tudo em até um dia." onClick={nao} />
            <ItemDeChecklist estado="feito" texto="Mantenha as informações atualizadas." onClick={nao} />
            <ItemDeChecklist estado="pendente" texto="Cumpra o prazo combinado." onClick={nao} />
            <ItemDeChecklist estado="pendente" texto="Evite cancelar o que confirmou." onClick={nao} />
          </ul>
        </CardComCabecalho>
      </div>
      <FaixaDeBeneficios
        tom="neutro"
        variante="linha"
        icone={<IconeEstrela tamanho={34} />}
        titulo="Selo"
        texto="O reconhecimento das lojas que se destacam."
        beneficios={[
          { icone: <Trophy />, rotulo: <><span className="block text-[0.6875rem] font-normal text-muted-foreground">A partir de</span><span className="text-[1.375rem] font-extrabold">90</span> pontos</> },
          { icone: <CalendarCheck />, rotulo: <><span className="block text-[0.6875rem] font-normal text-muted-foreground">Avaliação</span>mensal</> },
          { icone: <Lock />, rotulo: <><span className="block text-[0.75rem] font-normal text-muted-foreground">Conquista por desempenho</span><span className="text-[0.75rem] font-normal text-muted-foreground">(não depende do plano)</span></> },
        ]}
        acao={<Button variant="outline" className="h-11 rounded-full border-primary/50 px-5 text-[var(--primary-text,var(--primary))]">Ver critérios <ArrowRight aria-hidden /></Button>}
      />
    </div>
  );
}
