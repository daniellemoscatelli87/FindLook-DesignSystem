import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { AlertCircle, Check, CheckCircle2, Clock, Info, TriangleAlert, X } from "lucide-react";

import { cn } from "./utils";

/**
 * Alerta com ação (aprovado pela dona do produto em 23/11/2026)
 *
 * Aviso que pede uma ação de quem lê: ícone com base, título, descrição (com nota opcional) e, embaixo do texto,
 * uma ação principal de contorno (BotaoDoAlerta) e, se precisar, uma secundária em forma de link (LinkDoAlerta).
 * Regras:
 *  - as ações ficam sempre embaixo do texto, nunca ao lado;
 *  - uma só ação principal, de contorno (sem preenchimento);
 *  - dentro do card só o título muda de tamanho (15 px); todo o resto tem 14 px;
 *  - role="alert" para aviso e erro; role="status" para info e sucesso.
 * Tudo vem dos tokens: cor do estado (--info, --success, --warning, --error), cor de texto do estado
 * (--info-text, --success-text, --warning-text, --error-text), --card, --foreground, --muted-foreground, --ring,
 * --disabled e os tokens de movimento. O arquivo é o mesmo nos dois design systems; só os tokens mudam.
 */

type TomDoAlerta = "info" | "sucesso" | "aviso" | "erro";

/* Cada tom define as variáveis que o alerta e os botões usam:
   --alerta-cor (borda, fundo e contorno do botão), --alerta-texto (texto do botão), --alerta-icone (ícone),
   --alerta-fundo (tinta do fundo sobre o card) e --alerta-base (tinta da base do ícone). */
const variaveisDoTom = cva("", {
  variants: {
    tom: {
      info: "[--alerta-cor:var(--info)] [--alerta-texto:var(--info-text)] [--alerta-icone:var(--info)] [--alerta-fundo:7%] [--alerta-base:18%]",
      sucesso: "[--alerta-cor:var(--success)] [--alerta-texto:var(--success-text)] [--alerta-icone:var(--success)] [--alerta-fundo:7%] [--alerta-base:18%]",
      aviso: "[--alerta-cor:var(--warning)] [--alerta-texto:var(--warning-text)] [--alerta-icone:var(--warning-text)] [--alerta-fundo:9%] [--alerta-base:30%]",
      erro: "[--alerta-cor:var(--error)] [--alerta-texto:var(--error-text)] [--alerta-icone:var(--error-text)] [--alerta-fundo:7%] [--alerta-base:18%]",
    },
  },
  defaultVariants: { tom: "info" },
});

const ICONE_DO_TOM: Record<TomDoAlerta, React.ElementType> = {
  info: Info,
  sucesso: CheckCircle2,
  aviso: AlertCircle,
  erro: TriangleAlert,
};

const transicao =
  "transition-[background-color,color,border-color,text-decoration-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out)] motion-reduce:transition-none";
const foco =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const ContextoDoAlerta = React.createContext<TomDoAlerta | null>(null);

type AlertaComAcaoProps = Omit<React.ComponentProps<"div">, "title"> & {
  tom?: TomDoAlerta;
  titulo: React.ReactNode;
  /** Troca o ícone padrão do tom (ícone lucide de 20 px). */
  icone?: React.ReactNode;
  /** Ações embaixo do texto: um BotaoDoAlerta e, se precisar, um LinkDoAlerta. */
  acoes?: React.ReactNode;
  /** Mostra o botão Fechar no canto (32 px). */
  onFechar?: () => void;
  rotuloFechar?: string;
  /** Destaque: título maior e um divisor entre o ícone e o texto (para um aviso que abre ou resume uma seção). */
  destaque?: boolean;
  /** Lista de condições embaixo do texto, em cartões brancos, cada uma marcada como cumprida (check verde) ou não. */
  itens?: { texto: React.ReactNode; cumprido: boolean }[];
  /** Prefixos lidos pelos leitores de tela antes de cada condição. */
  rotulosDosItens?: { cumprido: string; pendente: string };
};

function AlertaComAcao({
  tom = "info",
  titulo,
  icone,
  acoes,
  onFechar,
  rotuloFechar = "Fechar",
  destaque = false,
  itens,
  rotulosDosItens = { cumprido: "Cumprido: ", pendente: "Ainda não cumprido: " },
  className,
  children,
  ...props
}: AlertaComAcaoProps) {
  const Icone = ICONE_DO_TOM[tom];
  return (
    <ContextoDoAlerta.Provider value={tom}>
      <div
        data-slot="alerta-com-acao"
        data-tom={tom}
        role={tom === "aviso" || tom === "erro" ? "alert" : "status"}
        className={cn(
          variaveisDoTom({ tom }),
          "[--alerta-tinta:color-mix(in_oklab,var(--alerta-cor)_var(--alerta-fundo),transparent)]",
          "@container/alerta relative grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-x-[18px] rounded-lg border border-[color:color-mix(in_oklab,var(--alerta-cor)_22%,transparent)] bg-card bg-[image:linear-gradient(var(--alerta-tinta),var(--alerta-tinta))] px-[22px] py-5 text-left",
          onFechar && "pr-[52px]",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden
          data-slot="alerta-com-acao-icone"
          className="col-start-1 row-start-1 flex size-11 shrink-0 items-center justify-center rounded-md bg-[color:color-mix(in_oklab,var(--alerta-cor)_var(--alerta-base),var(--card))] text-[color:var(--alerta-icone)] [&>svg]:size-5"
        >
          {icone ?? <Icone />}
        </span>
        <div className={cn("col-start-2 row-start-1 min-w-0", destaque ? "border-l border-[color:color-mix(in_oklab,var(--alerta-cor)_30%,transparent)] py-0.5 pl-[18px] -ml-[2px]" : "pt-[3px]")}>
          <div data-slot="alerta-com-acao-titulo" className={cn("font-bold text-foreground", destaque ? "font-[family-name:var(--font-display)] text-[1.25rem] leading-tight tracking-[-0.01em]" : "text-[0.9375rem] leading-[1.35]")}>
            {titulo}
          </div>
          {children != null && (
            <div
              data-slot="alerta-com-acao-descricao"
              className={cn("mt-1 leading-[1.6] text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground [&>p+p]:mt-1.5", destaque ? "text-[0.9375rem]" : "text-sm")}
            >
              {children}
            </div>
          )}
        </div>
        {itens && itens.length > 0 && (
          <ul
            data-slot="alerta-com-acao-itens"
            className={cn("col-start-2 row-start-2 m-0 mt-4 flex min-w-0 list-none flex-wrap gap-3 p-0 @max-[30rem]/alerta:col-span-2 @max-[30rem]/alerta:col-start-1", destaque && "pl-[18px] @max-[30rem]/alerta:pl-0")}
          >
            {itens.map((it, i) => (
              <li
                key={i}
                data-cumprido={it.cumprido}
                className="flex min-w-0 items-center gap-3 rounded-lg border border-[color:color-mix(in_oklab,var(--alerta-cor)_12%,transparent)] bg-card px-3 py-2 text-sm text-foreground shadow-[var(--shadow-xs)] @max-[30rem]/alerta:w-full"
              >
                <span
                  aria-hidden
                  className={cn("flex size-8 shrink-0 items-center justify-center rounded-full [&>svg]:size-4", it.cumprido ? "bg-[color:color-mix(in_oklab,var(--success)_16%,var(--card))] text-[color:var(--success-text,var(--success))]" : "bg-muted text-muted-foreground")}
                >
                  {it.cumprido ? <Check strokeWidth={3} /> : <Clock />}
                </span>
                <span className="min-w-0">
                  <span className="sr-only">{it.cumprido ? rotulosDosItens.cumprido : rotulosDosItens.pendente}</span>
                  {it.texto}
                </span>
              </li>
            ))}
          </ul>
        )}
        {/* Ações embaixo do texto. Em alerta estreito (menos de 352 px de conteúdo, como no celular), a linha de ações usa
            também a largura sob o ícone, para o botão não quebrar em duas linhas. */}
        {acoes != null && (
          <div
            data-slot="alerta-com-acao-acoes"
            className="col-start-2 row-start-3 mt-3.5 flex min-w-0 flex-wrap items-center gap-2 @max-[22rem]/alerta:col-span-2 @max-[22rem]/alerta:col-start-1"
          >
            {acoes}
          </div>
        )}
        {onFechar && (
          <button
            type="button"
            aria-label={rotuloFechar}
            onClick={onFechar}
            className={cn(
              "absolute right-3 top-3 flex size-8 items-center justify-center rounded-sm text-muted-foreground hover:bg-[color:color-mix(in_oklab,var(--alerta-cor)_10%,transparent)] hover:text-foreground [&_svg]:size-4",
              transicao,
              foco,
            )}
          >
            <X aria-hidden />
          </button>
        )}
      </div>
    </ContextoDoAlerta.Provider>
  );
}

type BotaoDoAlertaProps = React.ComponentProps<"button"> & {
  /** Por padrão usa o tom do AlertaComAcao em volta. */
  tom?: TomDoAlerta;
  asChild?: boolean;
};

/** Ação principal do alerta: só contorno, na cor do estado; texto e ícone na cor de texto do estado. */
function BotaoDoAlerta({ tom, asChild = false, className, ...props }: BotaoDoAlertaProps) {
  const tomDoContexto = React.useContext(ContextoDoAlerta);
  const tomFinal = tom ?? tomDoContexto ?? "info";
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="botao-do-alerta"
      data-tom={tomFinal}
      className={cn(
        variaveisDoTom({ tom: tomFinal }),
        "inline-flex min-h-9 max-w-full items-center justify-center gap-2 rounded-md border-[length:1.5px] border-[color:var(--alerta-cor)] bg-transparent px-3.5 py-1.5 text-left text-sm font-semibold leading-snug text-[color:var(--alerta-texto)]",
        "hover:bg-[color:color-mix(in_oklab,var(--alerta-cor)_8%,transparent)] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        "disabled:cursor-not-allowed disabled:border-transparent disabled:bg-disabled disabled:text-disabled-foreground aria-disabled:pointer-events-none aria-disabled:border-transparent aria-disabled:bg-disabled aria-disabled:text-disabled-foreground",
        transicao,
        foco,
        className,
      )}
      {...props}
    />
  );
}

type LinkDoAlertaProps = React.ComponentProps<"button"> & { asChild?: boolean };

/** Ação secundária do alerta: botão com cara de link, sublinhado, em --foreground. */
function LinkDoAlerta({ asChild = false, className, ...props }: LinkDoAlertaProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="link-do-alerta"
      className={cn(
        "inline-flex min-h-9 max-w-full items-center gap-2 rounded-sm bg-transparent px-1.5 text-left text-sm font-semibold leading-snug text-foreground underline decoration-[color:color-mix(in_oklab,var(--foreground)_35%,transparent)] underline-offset-4 hover:decoration-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        "disabled:cursor-not-allowed disabled:text-disabled-foreground disabled:no-underline aria-disabled:pointer-events-none aria-disabled:text-disabled-foreground aria-disabled:no-underline",
        transicao,
        foco,
        className,
      )}
      {...props}
    />
  );
}

export { AlertaComAcao, BotaoDoAlerta, LinkDoAlerta, variaveisDoTom as variaveisDoAlerta };
export type { TomDoAlerta, AlertaComAcaoProps, BotaoDoAlertaProps, LinkDoAlertaProps };
