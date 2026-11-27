import React, { useState } from "react";
import { Bell, CalendarClock, CheckCircle2, ClipboardList, Mail, PackageCheck, Truck } from "lucide-react";
import { LinhaComInterruptor } from "@/app/components/ui/linha-com-interruptor";
import { GradeSemanal, type ValorDaGrade } from "@/app/components/ui/grade-semanal";
import { SelecaoEmGrupos, type GrupoDeSelecao } from "@/app/components/ui/selecao-em-grupos";
import { CampoDeValor } from "@/app/components/ui/campo-de-valor";
import { CardComCabecalho } from "@/app/components/ui/painel-dados";
import { ListaDeEtapas } from "@/app/components/ui/lista-de-etapas";

/* Controles das telas de configuração. Exemplos com dados genéricos; regras e textos de cada produto ficam no produto. */

function Sub({ id, titulo, descricao, children }: { id: string; titulo: string; descricao: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <div id={id} className="scroll-mt-32" />
      <h3 className="mb-2 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{titulo}</h3>
      <p className="mb-5 max-w-3xl text-[0.875rem] leading-relaxed text-muted-foreground">{descricao}</p>
      {children}
    </div>
  );
}

const DIAS = [
  { valor: "seg", rotulo: "Segunda" }, { valor: "ter", rotulo: "Terça" }, { valor: "qua", rotulo: "Quarta" },
  { valor: "qui", rotulo: "Quinta" }, { valor: "sex", rotulo: "Sexta" }, { valor: "sab", rotulo: "Sábado" }, { valor: "dom", rotulo: "Domingo" },
];
const PERIODOS = [{ valor: "manha", rotulo: "Manhã", detalhe: "8h–12h" }, { valor: "tarde", rotulo: "Tarde", detalhe: "13h–17h" }];

// Exemplo genérico: estados do Sudeste e do Sul (dados públicos).
const GRUPOS: GrupoDeSelecao[] = [
  { valor: "sudeste", rotulo: "Sudeste", itens: [{ valor: "ES", rotulo: "Espírito Santo" }, { valor: "MG", rotulo: "Minas Gerais" }, { valor: "RJ", rotulo: "Rio de Janeiro" }, { valor: "SP", rotulo: "São Paulo" }] },
  { valor: "sul", rotulo: "Sul", itens: [{ valor: "PR", rotulo: "Paraná" }, { valor: "RS", rotulo: "Rio Grande do Sul" }, { valor: "SC", rotulo: "Santa Catarina" }] },
];

export function ControlesDeConfiguracao() {
  const [avisos, setAvisos] = useState({ email: true, resumo: false });
  const [agenda, setAgenda] = useState(true);
  const [grade, setGrade] = useState<ValorDaGrade>({ seg: ["manha", "tarde"], ter: ["manha", "tarde"], qua: ["tarde"] });
  const [estados, setEstados] = useState<string[]>(["PR", "SC"]);
  const [valor, setValor] = useState<number | null>(1250);

  return (
    <>
      <Sub id="linha-interruptor" titulo="Linha com interruptor"
        descricao="Um ajuste que liga e desliga, com título e descrição. Várias linhas seguidas, separadas por linha fina, dentro de um card com cabeçalho. A descrição pode explicar o que acontece em cada estado. O que o ajuste libera (campos, outra escolha) aparece embaixo, só com ele ligado.">
        <CardComCabecalho nivel={3} icone={<Bell />} titulo="Avisos" descricao="Escolha como receber os avisos.">
          <div className="max-w-2xl divide-y divide-border">
            <LinhaComInterruptor icone={<Mail />} titulo="Por e-mail" descricao={avisos.email ? "Ligado, cada aviso chega também por e-mail." : "Desligado, os avisos ficam só no painel."} checked={avisos.email} onCheckedChange={(v) => setAvisos((a) => ({ ...a, email: v }))} />
            <LinhaComInterruptor icone={<CalendarClock />} titulo="Agenda de atendimento" descricao="Mostra em quais dias e períodos você atende." checked={agenda} onCheckedChange={setAgenda}>
              <p className="m-0 rounded-md bg-muted p-3 text-[0.8125rem] text-muted-foreground">Conteúdo liberado pelo ajuste (por exemplo, a grade semanal abaixo).</p>
            </LinhaComInterruptor>
            <LinhaComInterruptor icone={<Truck />} titulo="Ajuste indisponível" descricao="Desabilitado: explique por quê na descrição." checked={false} onCheckedChange={() => {}} disabled />
          </div>
        </CardComCabecalho>
      </Sub>

      <Sub id="grade-semanal" titulo="Grade semanal"
        descricao="Em quais períodos de cada dia algo acontece. Cada período é um botão que liga e desliga; a faixa de cima liga ou desliga um período em todos os dias. Os períodos dividem a largura (sem rolagem lateral) e, em telas estreitas, o nome do dia fica em cima. Dias, períodos e horários vêm do produto.">
        <div className="max-w-2xl rounded-lg border border-border bg-card p-5">
          <GradeSemanal dias={DIAS} periodos={PERIODOS} valor={grade} onChange={setGrade} />
        </div>
      </Sub>

      <Sub id="selecao-em-grupos" titulo="Seleção em grupos"
        descricao="Escolher vários itens de uma lista longa organizada em grupos. Busca sem acento, caixa do grupo inteiro (marcada, parcial ou vazia), contagem e o resumo do que foi escolhido, com botão para tirar cada item. Os grupos começam fechados e a busca abre os que têm resultado.">
        <div className="max-w-2xl rounded-lg border border-border bg-card p-5">
          <SelecaoEmGrupos rotulo="estados" grupos={GRUPOS} valor={estados} onChange={setEstados} />
        </div>
      </Sub>

      <Sub id="lista-de-etapas" titulo="Lista de etapas"
        descricao="Como um processo acontece, passo a passo, para explicar regras e prazos dentro de um card. Lista ordenada, com ícone em base rosa, título, quando acontece e a descrição inteira, sem cortar. Para o que já aconteceu (feed), use o Item de atividade.">
        <div className="max-w-sm">
          <CardComCabecalho nivel={3} icone={<ClipboardList />} titulo="Como funciona o pedido" descricao="Exemplo genérico.">
            <ListaDeEtapas etapas={[
              { icone: <ClipboardList />, titulo: "Você faz o pedido", quando: "Na hora", descricao: "O pedido chega para a equipe com tudo o que você escolheu." },
              { icone: <CheckCircle2 />, titulo: "A equipe confirma", quando: "Em até 2 dias", descricao: "Você recebe um aviso com o que foi confirmado e o que mudou." },
              { icone: <PackageCheck />, titulo: "Entrega", quando: "Em até 5 dias", descricao: "Acompanhe pelo painel até a entrega." },
            ]} />
          </CardComCabecalho>
        </div>
      </Sub>

      <Sub id="campo-de-valor" titulo="Campo de valor"
        descricao="Valor em reais: entra e sai em centavos, aparece com R$ e vírgula e se formata ao sair do campo. Aceita 12, 12,5 e 1.200,00. Vazio vira nulo.">
        <div className="grid max-w-2xl gap-4 rounded-lg border border-border bg-card p-5 sm:grid-cols-2">
          <CampoDeValor rotulo="Valor" valor={valor} onChange={setValor} ajuda={`Guardado como ${valor ?? "nulo"} centavos.`} />
          <CampoDeValor rotulo="Com erro" valor={null} onChange={() => {}} erro="Informe um valor." />
        </div>
      </Sub>
    </>
  );
}
