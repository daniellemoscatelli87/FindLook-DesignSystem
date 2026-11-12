import { CheckCircle, XCircle, MessageCircle, Megaphone, Search, Store, Heart } from "lucide-react";
import { PageHeader, PageSection, SectionLabel } from "./GetStartedShowcase";

const display = "font-[family-name:var(--font-display)]";

/* Fonte: Brand Book FindLook v1.0 — 06 Tom de voz, 07 Mensagens, 18 Conteúdo e estados. */

const pilares = [
  {
    id: "simplicidade",
    title: "Simplicidade",
    rule: "Frases curtas, uma ideia por vez, palavras do dia a dia.",
    do: "Encontre peças perto de você.",
    dont: "Explore nosso ecossistema de soluções.",
  },
  {
    id: "proximidade",
    title: "Proximidade",
    rule: "Falar com a pessoa, na cidade dela, sobre a peça que ela quer.",
    do: "Sua próxima peça pode estar aqui.",
    dont: "Acesse uma ampla rede comercial.",
  },
  {
    id: "acao",
    title: "Ação",
    rule: "Convidar a fazer, com verbo no começo e sem jargão.",
    do: "Já deu um Find?",
    dont: "Otimize sua jornada de aquisição.",
  },
];

const mensagens = [
  { icon: Heart, publico: "Marca", frase: "Seu estilo por perto.", nota: "Assinatura emocional e abrangente." },
  { icon: Megaphone, publico: "Campanha", frase: "Já deu um Find?", nota: "Convite de lembrança e compartilhamento." },
  { icon: Search, publico: "Consumidor", frase: "Procure por foto ou descrição.", nota: "Benefício funcional: encontrar peças na cidade." },
  { icon: Store, publico: "Lojista", frase: "Seja encontrado por quem já procura o que você vende.", nota: "Benefício comercial: visibilidade com intenção." },
];

const microcopy: { contexto: string; escrever: string; evitar: string }[] = [
  { contexto: "Botão principal da busca", escrever: "Buscar peças", evitar: "Enviar" },
  { contexto: "Campo de busca vazio", escrever: "Busque por peça, estilo ou descrição", evitar: "Digite aqui" },
  { contexto: "Resultado sem correspondência", escrever: "Não encontramos essa peça nas lojas da sua região. Tente outra foto ou descrição.", evitar: "Nenhum resultado." },
  { contexto: "Convite ao lojista", escrever: "Cadastrar minha loja", evitar: "Solicitar onboarding" },
  { contexto: "Dado que depende da loja", escrever: "A confirmar com a loja", evitar: "Indisponível" },
  { contexto: "Erro ao enviar foto", escrever: "A foto não subiu. Confira a conexão e tente de novo.", evitar: "Erro 500" },
];

export function VoiceShowcase() {
  return (
    <div className="space-y-14 min-w-0">
      <PageHeader
        eyebrow="Diretrizes"
        title="Tom de **voz**"
        description="A conversa é direta. Uma marca amigável, urbana e fácil de entender, que diz exatamente o que sabe e convida a agir."
      />

      <PageSection
        id="voice-principios"
        label="Pilares"
        title="Três pilares, um jeito de falar"
        intro={<p>Em qualquer texto da FindLook, de um botão a uma campanha, os três pilares se aplicam ao mesmo tempo. Quando um texto parece técnico ou distante, é porque algum deles ficou de fora.</p>}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pilares.map(p => (
            <article key={p.id} id={`voice-${p.id}`} className="scroll-mt-32 flex flex-col rounded-[var(--radius)] border border-border bg-card p-5">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-primary-text mb-2">{p.title}</p>
              <p className="text-[0.9375rem] text-foreground leading-relaxed mb-5">{p.rule}</p>
              <div className="mt-auto space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" aria-hidden />
                  <p className={`${display} text-[1rem] font-bold tracking-[-0.01em] text-foreground`}>{p.do}</p>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-error shrink-0 mt-0.5" aria-hidden />
                  <p className="text-[0.875rem] text-muted-foreground line-through decoration-error/50">{p.dont}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection
        id="voice-mensagens"
        label="Arquitetura de mensagens"
        title="O que dizer em cada ponto"
        intro={<p>Cada público tem uma mensagem principal. A marca fala de estilo e proximidade; a campanha convida; o consumidor ouve o benefício funcional; o lojista, o benefício comercial.</p>}
      >
        <div className="space-y-3">
          {mensagens.map(({ icon: Icon, publico, frase, nota }, i) => (
            <div key={publico} className={`grid grid-cols-1 sm:grid-cols-[9rem_minmax(0,1fr)] gap-2 sm:gap-6 rounded-[var(--radius)] border border-border px-5 py-4 ${i % 2 === 0 ? "bg-[var(--surface-tint)]" : "bg-muted"}`}>
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary-text" aria-hidden />
                <span className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-primary-text">{publico}</span>
              </div>
              <div>
                <p className={`${display} text-[1.125rem] font-bold tracking-[-0.015em] text-foreground`}>{frase}</p>
                <p className="text-[0.8125rem] text-muted-foreground mt-0.5">{nota}</p>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        id="voice-microcopy"
        label="Microcopy"
        title="Nos componentes"
        intro={
          <>
            <p>A linguagem da FindLook é humana, objetiva e acionável. Nos componentes, isso vira três regras: dizer o que fazer, dizer o que aconteceu e dizer exatamente o que se sabe.</p>
            <p>Os exemplos abaixo seguem os pilares e os estados de informação. Botões começam com verbo; mensagens de erro dizem o que houve e como corrigir; dados que dependem da loja nunca são apresentados como certeza.</p>
          </>
        }
      >
        <div className="rounded-[var(--radius)] border border-border bg-card overflow-hidden">
          <div className="hidden sm:grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1fr)] text-[0.75rem] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3 border-b border-border bg-muted/20">
            <span>Contexto</span><span>Escrever</span><span>Evitar</span>
          </div>
          {microcopy.map((m, i, arr) => (
            <div key={m.contexto} className={`grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1fr)] gap-1 sm:gap-4 px-5 py-3.5 text-[0.8125rem] ${i < arr.length - 1 ? "border-b border-border" : ""}`}>
              <span className="font-medium text-foreground">{m.contexto}</span>
              <span className="flex items-start gap-2 text-foreground"><CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" aria-hidden />{m.escrever}</span>
              <span className="flex items-start gap-2 text-muted-foreground"><XCircle className="h-4 w-4 text-error shrink-0 mt-0.5" aria-hidden />{m.evitar}</span>
            </div>
          ))}
        </div>
      </PageSection>

      <section>
        <SectionLabel>Resumo</SectionLabel>
        <div className="flex items-start gap-3 rounded-[var(--radius)] bg-foreground text-background px-5 py-4">
          <MessageCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden />
          <p className="text-[0.9375rem] font-medium">Para quem compra: encontrar. Para quem vende: ser encontrado. Todo texto da FindLook serve a um desses dois verbos.</p>
        </div>
      </section>
    </div>
  );
}
