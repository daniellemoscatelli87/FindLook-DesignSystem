import { ArrowRight } from "lucide-react";
import { PageHeader, SectionLabel, useGo, type Navigate, type Target } from "./GetStartedShowcase";

const display = "font-[family-name:var(--font-display)]";

type PrincipleItem = {
  n: string;
  title: string;
  statement: string;
  practice: string[];
  linkLabel: string;
  target: Target;
};

/* Os seis princípios do Brand Book FindLook (17 / Princípios de design: "A plataforma conduz."). */
const principles: PrincipleItem[] = [
  {
    n: "01",
    title: "Intuitiva",
    statement: "Uma ação principal por etapa; caminhos previsíveis.",
    practice: [
      "Cada tela tem um CTA primário em pink e, no máximo, ações secundárias em contorno ou texto.",
      "O próximo passo fica visível sem rolar a tela no celular.",
    ],
    linkLabel: "Usabilidade › Hierarquia de ações",
    target: { page: "usability", anchor: "ux-hierarchy" },
  },
  {
    n: "02",
    title: "Didática",
    statement: "Mostrar o que fazer, por que fazer e o próximo passo.",
    practice: [
      "Formulários explicam o motivo do dado antes de pedi-lo (por exemplo, por que informar a região).",
      "Depois de uma ação, a interface diz o que aconteceu e o que vem em seguida.",
    ],
    linkLabel: "Usabilidade › Status do sistema",
    target: { page: "usability", anchor: "ux-feedback" },
  },
  {
    n: "03",
    title: "Transparente",
    statement: "Diferenciar o confirmado, o estimado e o desatualizado.",
    practice: [
      "Todo dado de peça ou loja carrega um estado: confirmado pela loja, a confirmar, esgotado, sugerido por IA ou desatualizado.",
      "Nunca comunicar um estado só com cor: sempre ícone e texto.",
    ],
    linkLabel: "Estados de informação",
    target: { page: "states", anchor: "states-lista" },
  },
  {
    n: "04",
    title: "Inclusiva",
    statement: "Meta WCAG 2.2 AA: teclado, foco, contraste e rótulos.",
    practice: [
      "Branco sobre pink passa o AA (4,5:1); texto corrido em pink sobre branco usa pink-600 (6,4:1).",
      "Todo componente é operável por teclado, com foco visível e rótulo acessível.",
    ],
    linkLabel: "Acessibilidade › Contraste",
    target: { page: "accessibility", anchor: "a11y-contrast" },
  },
  {
    n: "05",
    title: "Mobile-first",
    statement: "Começar pelas telas e interações do celular.",
    practice: [
      "Componentes são desenhados primeiro para 360 px de largura e alvos de toque de 44 px.",
      "A busca por foto e por descrição é a primeira interação pensada em cada jornada.",
    ],
    linkLabel: "Usabilidade › Tamanho do alvo",
    target: { page: "usability", anchor: "ux-targets" },
  },
  {
    n: "06",
    title: "Escalável",
    statement: "Componentes reutilizáveis e linguagem compartilhada.",
    practice: [
      "Consumidores e lojistas usam os mesmos componentes com conteúdos diferentes.",
      "Toda decisão visual tem nome: o mesmo token no design e no código.",
    ],
    linkLabel: "Design Tokens › As três camadas",
    target: { page: "tokens", anchor: "tokens-hierarchy" },
  },
];

const anchorId = (p: PrincipleItem) => `principle-${p.n}`;

function PrincipleCard({ p, onGo }: { p: PrincipleItem; onGo: (t: Target) => void }) {
  return (
    <article className="flex flex-col h-full bg-card border border-border rounded-[var(--radius)] p-6">
      <h3 className={`${display} text-[1.25rem] font-bold tracking-[-0.015em] leading-tight text-foreground mb-2`}>{p.title}</h3>
      <p className="text-[0.9375rem] leading-relaxed text-foreground mb-5">{p.statement}</p>
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-2">Na prática</p>
      <ul className="space-y-2 mb-6">
        {p.practice.map(item => (
          <li key={item} className="flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
            <span aria-hidden className="mt-[0.5em] h-1 w-1 rounded-full bg-primary shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => onGo(p.target)}
        className="group mt-auto self-start inline-flex items-center gap-1.5 rounded-[6px] text-[0.8125rem] font-semibold text-primary-text hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span>
          Saiba mais<span className="sr-only"> sobre {p.linkLabel}</span>
        </span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden />
      </button>
    </article>
  );
}

export function PrinciplesShowcase({ onNavigate }: { onNavigate: Navigate }) {
  const go = useGo(onNavigate);

  return (
    <div className="space-y-10 min-w-0">
      <PageHeader
        eyebrow="Início"
        title="Princípios de **design**"
        description="A plataforma conduz. Seis diretrizes do brand book que orientam produto, conteúdo e interação em todas as jornadas da FindLook."
      />

      <section>
        <SectionLabel>Princípios</SectionLabel>
        <ol className="relative list-none p-0 m-0">
          <span aria-hidden className="absolute top-2 bottom-2 left-[1.125rem] md:left-1/2 w-px -translate-x-1/2 bg-border" />
          {principles.map((p, i) => {
            const left = i % 2 === 0;
            return (
              <li
                key={p.n}
                id={anchorId(p)}
                className="relative scroll-mt-32 pl-14 pb-8 last:pb-0 md:pl-0 md:grid md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] md:items-start"
              >
                <span
                  aria-hidden
                  className={`${display} absolute left-0 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary bg-background text-[0.8125rem] font-semibold tabular-nums text-primary-text md:static md:col-start-2 md:row-start-1 md:mt-5 md:justify-self-center`}
                >
                  {p.n}
                </span>
                <div className={`md:row-start-1 ${left ? "md:col-start-1 md:pr-3" : "md:col-start-3 md:pl-3"}`}>
                  <PrincipleCard p={p} onGo={go} />
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <p className="text-[0.75rem] text-muted-foreground uppercase tracking-[0.08em] pt-2">Versão 1.0 · 2026 · Fonte: Brand Book FindLook v1.0</p>
    </div>
  );
}
