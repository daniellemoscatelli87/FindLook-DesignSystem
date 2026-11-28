import React, { useState } from "react";
import { CaixaDeConsentimento } from "../../ui/caixa-de-consentimento";
import { GradeDeCards, ItemDaGrade } from "../../ui/grade-de-cards";
import { SectionHeader } from "./SectionHeader";
import { DataTable, DoDont, Mono, Panel, SubTitle } from "./Guidance";

/* Documentação da CaixaDeConsentimento (28/11/2026, aprovada pela dona do produto; mesma API do DS Dani Moscatelli). */
export function SecaoCaixaDeConsentimento() {
  const [aceito, setAceito] = useState(true);
  const [termos, setTermos] = useState(false);
  const frase = [
    <>Autorizo o uso dos meus contatos exclusivamente para essa finalidade, conforme a <a href="#caixa-de-consentimento">Política de Privacidade</a>.</>,
    "Posso revogar meu consentimento a qualquer momento.",
  ];
  return (
    <section id="caixa-de-consentimento" className="scroll-mt-32 space-y-6">
      <SectionHeader
        title="Caixa de consentimento"
        description="Um sim de consentimento (receber avisos, aceitar os termos) num card que a pessoa marca inteiro: caixa de marcar quadrada, título e a frase legal com os links. Marcado, o card fica no rosa do selecionado."
      />
      <GradeDeCards className="gap-4 md:grid-cols-2">
        <ItemDaGrade>
          <Panel className="h-full p-5 sm:p-6">
            <SubTitle>Desmarcado</SubTitle>
            <CaixaDeConsentimento titulo="Sim, quero receber os avisos." paragrafos={frase} />
          </Panel>
        </ItemDaGrade>
        <ItemDaGrade>
          <Panel className="h-full p-5 sm:p-6">
            <SubTitle>Marcado</SubTitle>
            <CaixaDeConsentimento titulo="Sim, quero receber os avisos." paragrafos={frase} checked={aceito} onCheckedChange={setAceito} />
          </Panel>
        </ItemDaGrade>
        <ItemDaGrade>
          <Panel className="h-full p-5 sm:p-6">
            <SubTitle>Erro (aparece ao enviar sem marcar; marque para sumir)</SubTitle>
            <CaixaDeConsentimento titulo="Li e aceito os termos de uso." checked={termos} onCheckedChange={setTermos} erro={!termos ? "Marque para continuar." : undefined}>
              Os termos estão em <a href="#caixa-de-consentimento">Termos de uso</a>.
            </CaixaDeConsentimento>
          </Panel>
        </ItemDaGrade>
        <ItemDaGrade>
          <Panel className="h-full p-5 sm:p-6">
            <SubTitle>Desativado</SubTitle>
            <CaixaDeConsentimento disabled titulo="Sim, quero receber os avisos." paragrafos={frase} />
          </Panel>
        </ItemDaGrade>
      </GradeDeCards>
      <DataTable
        head={["Prop", "O que faz"]}
        rows={[
          [<Mono>titulo</Mono>, "O sim, em 16 px seminegrito (\"Sim, quero receber os avisos.\")."],
          [<Mono>children · paragrafos</Mono>, "A frase legal em 14 px, cinza escuro. children numa linha corrida; paragrafos é uma lista em que cada item começa numa linha nova (a frase \"Posso revogar…\" depois de \"Política de Privacidade.\"). Links em --primary-text, seminegrito e sublinhados."],
          [<Mono>checked · onCheckedChange</Mono>, "Caixa nativa: checked/defaultChecked, onChange e onCheckedChange(marcado). O card inteiro é o rótulo: tocar em qualquer parte marca."],
          [<Mono>erro · disabled</Mono>, "Erro: borda --error e a MensagemDeErro do DS embaixo. Desativado: mais claro, sem clique."],
        ]}
      />
      <DoDont
        dos={["Use caixa QUADRADA para um sim/não de consentimento.", "Comece o título pelo sim (\"Sim, quero…\") e deixe a frase legal embaixo.", "Ponha em paragrafos cada frase que deve começar numa linha nova."]}
        donts={["Nunca use círculo para consentimento: círculo é escolha entre opções (rádio).", "Deixar a caixa marcada de antemão num consentimento opcional.", "Esconder o link da política fora do card."]}
      />
    </section>
  );
}
