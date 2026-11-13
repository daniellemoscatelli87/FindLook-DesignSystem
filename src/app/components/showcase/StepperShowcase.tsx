import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "../../i18n";
import { Stepper, type StepperEtapa } from "../ui/stepper";
import { Button } from "../ui/button";
import { Callout, DataTable, DoDont, display } from "./shared/Guidance";
import { TokenTable } from "./shared/TokenTable";

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <h2 className={`${display} text-[1.5rem] font-semibold tracking-[-0.02em] text-foreground mb-1`}>{title}</h2>
      <p className="text-[0.9375rem] leading-relaxed text-muted-foreground max-w-3xl">{description}</p>
    </div>
  );
}

// Exemplo: cadastro do lojista em 5 etapas (documento "Funcionalidades por perfil", 11/11/2026).
const CADASTRO: StepperEtapa[] = [
  { titulo: "Responsável", descricao: "Quem responde pela loja" },
  { titulo: "Dados da loja", descricao: "Nome e CNPJ" },
  { titulo: "Plano" },
  { titulo: "Revisão" },
  { titulo: "Pagamento" },
];

export function StepperShowcase() {
  const { t } = useI18n();
  const [atual, setAtual] = useState(1);

  return (
    <div className="space-y-16 pb-16">
      <section id="stepper-demo" className="scroll-mt-32">
        <SectionHeader
          title={t("Stepper", "Etapas (Stepper)")}
          description={t(
            "Shows where the person is in a form split into screens: which steps are done, the current one and what comes next. Visual from the product prototype (v8.87), as numbered tabs.",
            "Mostra onde a pessoa está num formulário dividido em telas: quais etapas já foram feitas, a atual e o que vem depois. Visual do protótipo do produto (v8.87), em abas numeradas.",
          )}
        />
        <div className="rounded-[20px] border border-border bg-card p-5 md:p-8">
          <Stepper etapas={CADASTRO} atual={atual} onIrPara={setAtual} rotulo="Etapas do cadastro da loja" />
          <div className="mt-8 rounded-[14px] border border-dashed border-border p-5 text-[0.875rem] text-muted-foreground">
            {t("Form of the step", "Formulário da etapa")} <strong className="text-foreground">{CADASTRO[atual]!.titulo}</strong>
          </div>
          <div className="mt-5 flex flex-wrap justify-between gap-3">
            <Button variant="outline" onClick={() => setAtual((a) => Math.max(0, a - 1))} disabled={atual === 0}>
              <ArrowLeft aria-hidden /> {t("Back", "Voltar")}
            </Button>
            <Button onClick={() => setAtual((a) => Math.min(CADASTRO.length - 1, a + 1))} disabled={atual === CADASTRO.length - 1}>
              {t("Continue", "Continuar")} <ArrowRight aria-hidden />
            </Button>
          </div>
        </div>
        <p className="mt-3 text-[0.8125rem] text-muted-foreground">
          {t(
            "Try it: Continue and Back move between steps; done steps can be reopened by clicking the marker. Below 640 px, only “Step X of N” and the current step name are shown.",
            "Experimente: Continuar e Voltar mudam de etapa; etapas concluídas podem ser reabertas pelo marcador. Abaixo de 640 px, aparecem só “Etapa X de N” e o nome da etapa atual.",
          )}
        </p>
      </section>

      <section id="stepper-anatomy" className="scroll-mt-32">
        <SectionHeader title={t("Anatomy and states", "Anatomia e estados")} description={t("Each step is a list item with a numbered marker and a name.", "Cada etapa é um item de lista com um marcador numerado e um nome.")} />
        <DataTable
          head={[t("State", "Estado"), t("Marker", "Marcador"), t("Name", "Nome"), t("Interaction", "Interação")]}
          rows={[
            [t("Current", "Atual"), t("Number in a primary-filled circle", "Número em círculo preenchido na primária"), t("Bold, dark, with a 3 px primary underline", "Negrito escuro, com sublinhado de 3 px na primária"), t("aria-current=\"step\"", "aria-current=\"step\"")],
            [t("Done", "Concluída"), t("Number in a dark graphite circle (--foreground)", "Número em círculo grafite escuro (--foreground)"), t("Bold, muted", "Negrito, cinza"), t("Reopens the step when onIrPara is given", "Reabre a etapa quando há onIrPara")],
            [t("Pending", "Pendente"), t("Number in a light gray circle (--secondary)", "Número em círculo cinza claro (--secondary)"), t("Bold, muted", "Negrito, cinza"), t("Not clickable until the previous steps are done", "Não clicável até as anteriores serem concluídas")],
            [t("Base line", "Linha de base"), t("1 px line under all steps (--border)", "Linha de 1 px sob todas as etapas (--border)"), "—", "—"],
          ]}
        />
      </section>

      <section id="stepper-a11y" className="scroll-mt-32">
        <SectionHeader title={t("Accessibility", "Acessibilidade")} description={t("The state never depends on color alone.", "O estado nunca depende só da cor.")} />
        <Callout title={t("Checklist", "Checklist")}>
          <ul className="list-disc space-y-1 pl-5">
            <li>{t("A nav with a name (rotulo) and an ordered list: the order is the DOM order.", "Uma navegação com nome (rotulo) e uma lista ordenada: a ordem é a do DOM.")}</li>
            <li>{t("Each marker says its state in text for screen readers (done, current step, pending).", "Cada marcador diz o estado em texto para leitores de tela (concluída, etapa atual, pendente).")}</li>
            <li>{t("Current has an underline and a dark name; done and pending differ by a dark or light fill: visible without color.", "A atual tem sublinhado e nome escuro; concluída e pendente se diferenciam pelo preenchimento escuro ou claro: visível sem cor.")}</li>
            <li>{t("Reopenable steps are buttons, reachable by keyboard, with a visible focus ring.", "Etapas que podem ser reabertas são botões, alcançáveis pelo teclado, com anel de foco visível.")}</li>
            <li>{t("On phones the other names leave the screen but stay for screen readers.", "No celular, os nomes das outras etapas saem da tela, mas continuam para leitores de tela.")}</li>
          </ul>
        </Callout>
      </section>

      <section id="stepper-usage" className="scroll-mt-32">
        <SectionHeader title={t("Usage", "Uso")} description={t("For forms split into three to six screens.", "Para formulários divididos em três a seis telas.")} />
        <div className="grid gap-5 lg:grid-cols-2">
          <DoDont
            dos={[
              t("Short step names (one or two words), the same ones used as the screen title.", "Nomes curtos (uma ou duas palavras), os mesmos usados como título da tela."),
              t("Let the person go back to done steps without losing what was typed.", "Deixe a pessoa voltar às etapas concluídas sem perder o que digitou."),
              t("Keep one main action per step (Continue) and Back on the left.", "Mantenha uma ação principal por etapa (Continuar) e Voltar à esquerda."),
            ]}
            donts={[
              t("Do not let the person jump to future steps before finishing the current one.", "Não deixe a pessoa pular para etapas futuras antes de concluir a atual."),
              t("Do not use it to explain a process: that is the Timeline.", "Não use para explicar um processo: isso é a Linha do tempo."),
              t("Do not use more than six steps; split the flow instead.", "Não use mais de seis etapas; divida o fluxo."),
            ]}
          />
          <TokenTable groups={[{
            group: t("Stepper tokens", "Tokens do Stepper"),
            tokens: [
              { name: "--primary · --primary-foreground", description: t("Current marker and underline", "Marcador e sublinhado da etapa atual"), light: "var(--primary)", isColor: false },
              { name: "--foreground · --background", description: t("Done marker", "Marcador concluído"), light: "var(--foreground)", isColor: false },
              { name: "--secondary · --border", description: t("Pending marker · base line", "Marcador pendente · linha de base"), light: "var(--secondary)", isColor: false },
              { name: "--ring", description: t("Focus ring", "Anel de foco"), light: "var(--ring)", isColor: false },
              { name: "marker", description: t("Marker size", "Tamanho do marcador"), light: "38 px · 32 px (< 640 px)" },
            ],
          }]} />
        </div>
        <pre className="mt-5 overflow-x-auto rounded-[10px] bg-muted/60 p-3 text-[0.75rem] text-muted-foreground"><code>{`import { Stepper } from "@/app/components/ui/stepper";

<Stepper
  rotulo="Etapas do cadastro da loja"
  etapas={[{ titulo: "Responsável" }, { titulo: "Dados da loja" }, { titulo: "Plano" }, { titulo: "Revisão" }, { titulo: "Pagamento" }]}
  atual={1}                 // índice da etapa atual
  onIrPara={setEtapa}       // opcional: reabrir etapas concluídas
/>`}</code></pre>
      </section>
    </div>
  );
}
