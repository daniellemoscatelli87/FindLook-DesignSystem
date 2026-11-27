import * as React from "react";
import { cn } from "./utils";

/**
 * Barra de ação fixa do celular (FindLook)
 *
 * Botão em pílula, 56 px, preso na base da tela, sobre um degradê do fundo, que abre uma gaveta
 * (por exemplo, "Encontrar peças" na página inicial e "Cadastrar minha loja" na página do lojista).
 * - Só aparece abaixo de 768 px (somenteCelular); some enquanto a gaveta está aberta (oculta).
 * - Respeita a área segura do aparelho (env(safe-area-inset-bottom)) e fica em z-40, abaixo de menus e gavetas.
 * - aria-haspopup="dialog": avisa leitores de tela que o botão abre uma janela.
 * - Espaço no fim da página (27/11/2026): a barra reserva sozinha, no lugar onde é colocada, a altura dela mais a área
 *   segura (96 px num aparelho sem área segura; 160 px quando a página também tem o Voltar ao topo, que fica acima
 *   dela). Coloque a barra no fim da página, depois do rodapé, e nada do fim da página fica escondido atrás dela.
 *   O espaço continua lá enquanto a gaveta está aberta, para a página não pular. Se a barra precisar ficar em outro
 *   lugar, use reservarEspaco={false} e ponha o EspacoDaBarraFixa no fim da página.
 */

/** Altura reservada: faixa da barra (12 + 56 px) + base (16 px ou a área segura) + 12 px de folga; com o Voltar ao topo
    na página, mais 64 px (48 px do botão e 16 px de folga). */
const classeDoEspaco =
  "h-[calc(5rem+max(1rem,env(safe-area-inset-bottom)))] [body:has([data-slot=voltar-ao-topo])_&]:h-[calc(9rem+max(1rem,env(safe-area-inset-bottom)))]";

type EspacoDaBarraFixaProps = {
  /** Só no celular (abaixo de 768 px), como a barra. Padrão: true. */
  somenteCelular?: boolean;
  className?: string;
};

/** Espaço no fim da página para a barra fixa (e o Voltar ao topo) não cobrirem o conteúdo. A BarraFixaDoCelular já o
    coloca sozinha; use este só quando a barra estiver com reservarEspaco={false}. */
function EspacoDaBarraFixa({ somenteCelular = true, className }: EspacoDaBarraFixaProps) {
  return <div aria-hidden data-slot="barra-fixa-celular-espaco" className={cn(classeDoEspaco, somenteCelular && "md:hidden", className)} />;
}

type BarraFixaDoCelularProps = Omit<React.ComponentProps<"button">, "type"> & {
  /** Ícone à esquerda do texto (por exemplo, Search ou Store do Lucide). */
  icone?: React.ReactNode;
  /** Esconde a barra (use enquanto a gaveta que ela abre está aberta). */
  oculta?: boolean;
  /** Só no celular (abaixo de 768 px). Padrão: true. */
  somenteCelular?: boolean;
  /** Reserva o espaço da barra no lugar onde ela é colocada (o fim da página). Padrão: true. */
  reservarEspaco?: boolean;
  /** Classes da faixa que envolve o botão. */
  classeDaFaixa?: string;
};

function BarraFixaDoCelular({ icone, oculta = false, somenteCelular = true, reservarEspaco = true, classeDaFaixa, className, children, ...props }: BarraFixaDoCelularProps) {
  return (
    <>
      {reservarEspaco && <EspacoDaBarraFixa somenteCelular={somenteCelular} />}
      {!oculta && (
        <div
          data-slot="barra-fixa-celular"
          data-somente-celular={somenteCelular ? "sim" : "nao"}
          className={cn(
            "fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-background via-background/90 to-transparent px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]",
            somenteCelular && "md:hidden",
            classeDaFaixa,
          )}
        >
          <button
            type="button"
            aria-haspopup="dialog"
            className={cn(
              "flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-semibold text-primary-foreground shadow-[var(--shadow-lg)] transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg]:size-5 [&_svg]:shrink-0",
              className,
            )}
            {...props}
          >
            {icone && <span aria-hidden className="flex">{icone}</span>}
            {children}
          </button>
        </div>
      )}
    </>
  );
}

export { BarraFixaDoCelular, EspacoDaBarraFixa };
export type { BarraFixaDoCelularProps, EspacoDaBarraFixaProps };
