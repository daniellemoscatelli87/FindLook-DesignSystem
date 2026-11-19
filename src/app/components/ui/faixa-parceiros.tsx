import * as React from "react";
import { Pause, Play, Store } from "lucide-react";
import { cn } from "./utils";

/**
 * Faixa de parceiros (FindLook): só os logos das lojas e marcas parceiras, rolando devagar.
 * Sem parceiros, os espaços mostram o convite "Sua loja aqui".
 *
 * - O título fica só para leitores de tela ("Descubra a moda local"), com a lista dos nomes dos parceiros.
 * - A faixa que se move é decorativa (aria-hidden). Para sob o mouse e o foco.
 * - Movimento: o botão Pausar (WCAG 2.2.2, movimento que dura mais de 5 segundos) e, com "menos movimento"
 *   no sistema, a faixa fica parada.
 * - Tom escuro: para a página do lojista (tema escuro), com logos claros.
 */

type Parceiro = { nome: string; logo: string };

type FaixaDeParceirosProps = {
  parceiros?: Parceiro[];
  /** Quantos espaços a faixa tem (os logos se repetem até preencher). */
  espacos?: number;
  titulo?: string;
  convite?: string;
  tom?: "claro" | "escuro";
  /** Duração de uma volta, em segundos. */
  duracao?: number;
  /** Mostra o botão Pausar/Continuar. Padrão: true. */
  botaoPausar?: boolean;
  className?: string;
};

const estilos = `
@keyframes faixa-de-parceiros { from { transform: translateX(0); } to { transform: translateX(-50%); } }
[data-slot=faixa-de-parceiros] [data-faixa-trilho] { animation: faixa-de-parceiros var(--faixa-duracao, 48s) linear infinite; }
[data-slot=faixa-de-parceiros]:hover [data-faixa-trilho],
[data-slot=faixa-de-parceiros][data-pausada=true] [data-faixa-trilho] { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) { [data-slot=faixa-de-parceiros] [data-faixa-trilho] { animation: none; } }
`;

function FaixaDeParceiros({
  parceiros = [],
  espacos = 10,
  titulo = "Descubra a moda local",
  convite = "Sua loja aqui",
  tom = "claro",
  duracao = 48,
  botaoPausar = true,
  className,
}: FaixaDeParceirosProps) {
  const id = React.useId();
  const [pausada, setPausada] = React.useState(false);
  const escuro = tom === "escuro";
  const itens = Array.from({ length: espacos }, (_, i) => (parceiros.length ? parceiros[i % parceiros.length]! : null));

  const lista = (
    <ul className="flex shrink-0 items-center gap-4 pr-4">
      {itens.map((p, i) => (
        <li key={i} className="shrink-0">
          {p ? (
            <span className="flex h-12 w-48 items-center justify-center px-5">
              <img
                src={p.logo}
                alt=""
                className={cn(
                  "max-h-9 w-auto max-w-full object-contain transition duration-200",
                  escuro ? "opacity-60 brightness-0 invert hover:opacity-90" : "opacity-80 grayscale hover:opacity-100 hover:grayscale-0",
                )}
              />
            </span>
          ) : (
            <span className="flex h-16 w-48 items-center gap-3 rounded-lg border border-dashed border-primary/30 bg-card/80 px-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-muted text-primary-text">
                <Store className="size-4" />
              </span>
              <span className="text-sm font-semibold text-foreground">{convite}</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <section
      data-slot="faixa-de-parceiros"
      data-pausada={pausada}
      aria-labelledby={`${id}-titulo`}
      style={{ "--faixa-duracao": `${duracao}s` } as React.CSSProperties}
      className={cn("relative py-4", escuro ? "dark border-y border-border text-foreground" : "border-y border-border bg-muted", className)}
    >
      <style>{estilos}</style>
      <h2 id={`${id}-titulo`} className="sr-only">{titulo}</h2>
      {parceiros.length > 0 && (
        <ul className="sr-only">
          {parceiros.map((p) => <li key={p.nome}>{p.nome}</li>)}
        </ul>
      )}
      <div aria-hidden className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div data-faixa-trilho className="flex w-max">
          {lista}
          {lista}
        </div>
      </div>
      {botaoPausar && (
        // Fica numa linha própria, abaixo dos logos: não cobre a faixa e não flutua (WCAG 2.2.2)
        <div className="mt-2 flex justify-end px-4 motion-reduce:hidden">
          <button
            type="button"
            onClick={() => setPausada((v) => !v)}
            aria-pressed={pausada}
            className="inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-[0.75rem] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {pausada ? <Play className="size-3.5" aria-hidden /> : <Pause className="size-3.5" aria-hidden />}
            {pausada ? "Continuar movimento" : "Pausar movimento"}
            <span className="sr-only"> da faixa de parceiros</span>
          </button>
        </div>
      )}
    </section>
  );
}

export { FaixaDeParceiros };
export type { FaixaDeParceirosProps, Parceiro };
