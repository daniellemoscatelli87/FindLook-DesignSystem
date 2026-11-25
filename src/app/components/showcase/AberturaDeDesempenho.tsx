import React from "react";
import { CalendarDays, Clock, Gauge, Lock, PackageCheck, ShieldCheck, Sparkles, Star, Target, Truck } from "lucide-react";
import { CabecalhoComIlustracao } from "@/app/components/ui/cabecalho-com-ilustracao";
import { IlustracaoEstrela } from "@/app/components/ui/ilustracao-estrela";
import { CardDeNota } from "@/app/components/ui/card-de-nota";
import { ListaDeProgresso } from "@/app/components/ui/lista-de-progresso";
import { CardComCabecalho, FaixaDeBeneficios, ItemDeChecklist } from "@/app/components/ui/painel-dados";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

/* Abertura de uma página de desempenho: exemplo com dados fictícios e genéricos. Nomes, regras e textos de cada
   programa vêm do produto. */
export function AberturaDeDesempenho() {
  return (
    <div className="space-y-5 rounded-xl bg-muted/40 p-4 sm:p-6">
      <CabecalhoComIlustracao
        nivel={2}
        titulo={<>Programa <span className="text-[var(--primary-text,var(--primary))]">Destaque</span></>}
        subtitulo={<>Seu desempenho, de forma <strong>simples e transparente</strong>.</>}
        descricao="Acompanhe sua nota, entenda o que influencia o resultado e saiba como evoluir."
        ilustracao={<IlustracaoEstrela tamanho={140} rotulo={<strong className="font-extrabold">Selo de excelência</strong>} frase="Exemplo genérico" />}
      />
      <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <CardDeNota
          rotulo="Sua nota atual"
          explicacao="Exemplo: a nota considera os últimos 90 dias."
          valor={78}
          selo={<Badge variant="outline" className="rounded-full px-2.5 font-semibold"><span aria-hidden className="size-2 rounded-full" style={{ background: "var(--termometro-3)" }} />Bom</Badge>}
          titulo="Você está perto do próximo nível."
          texto="Mantenha o bom desempenho para conquistar o selo."
          progresso={78}
          rotuloProgresso="Progresso até o próximo nível"
        />
        <CardComCabecalho icone={<CalendarDays />} titulo="Próxima avaliação" cabecalho="simples">
          <p className="m-0 font-[family-name:var(--font-display)] text-[1.5rem] font-extrabold text-foreground">1º de cada mês</p>
          <p className="m-0 mt-1 text-[0.875rem] text-muted-foreground">Avaliação mensal, automática.</p>
        </CardComCabecalho>
      </div>
      <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <CardComCabecalho icone={<Gauge />} titulo="Desempenho por critério" descricao="Veja sua nota em cada critério e foque no que pode melhorar.">
          <ListaDeProgresso itens={[
            { id: "a", icone: <Clock />, rotulo: "Pontualidade", etiqueta: "Peso 40%", pct: 82, valor: "82", total: "/100" },
            { id: "b", icone: <PackageCheck />, rotulo: "Qualidade", etiqueta: "Peso 35%", pct: 74, valor: "74", total: "/100" },
            { id: "c", icone: <Truck />, rotulo: "Entrega", etiqueta: "Peso 25%", pct: null, semValor: "Sem dados" },
          ]} />
        </CardComCabecalho>
        <CardComCabecalho icone={<Target />} titulo="Como evoluir agora" descricao="Ações que mais aumentam sua nota.">
          <ul className="m-0 list-none divide-y divide-border p-0">
            <ItemDeChecklist estado="feito" texto="Responda tudo em até um dia." />
            <ItemDeChecklist estado="pendente" texto="Mantenha as informações atualizadas." />
            <ItemDeChecklist estado="pendente" texto="Cumpra o prazo combinado." />
          </ul>
        </CardComCabecalho>
      </div>
      <FaixaDeBeneficios
        tom="neutro"
        icone={<Star />}
        titulo="Selo de excelência"
        texto="O reconhecimento das lojas que se destacam."
        beneficios={[
          { icone: <Sparkles />, rotulo: <><span className="block text-[0.6875rem] font-normal text-muted-foreground">A partir de</span>nível máximo</> },
          { icone: <CalendarDays />, rotulo: <><span className="block text-[0.6875rem] font-normal text-muted-foreground">Avaliação</span>mensal</> },
          { icone: <Lock />, rotulo: <><span className="block text-[0.6875rem] font-normal text-muted-foreground">Conquista por</span>desempenho</> },
        ]}
        acao={<Button variant="outline" className="h-10 border-primary/40 text-[var(--primary-text,var(--primary))]">Ver critérios <ShieldCheck aria-hidden /></Button>}
      />
    </div>
  );
}
