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
 */

type BarraFixaDoCelularProps = Omit<React.ComponentProps<"button">, "type"> & {
  /** Ícone à esquerda do texto (por exemplo, Search ou Store do Lucide). */
  icone?: React.ReactNode;
  /** Esconde a barra (use enquanto a gaveta que ela abre está aberta). */
  oculta?: boolean;
  /** Só no celular (abaixo de 768 px). Padrão: true. */
  somenteCelular?: boolean;
  /** Classes da faixa que envolve o botão. */
  classeDaFaixa?: string;
};

function BarraFixaDoCelular({ icone, oculta = false, somenteCelular = true, classeDaFaixa, className, children, ...props }: BarraFixaDoCelularProps) {
  if (oculta) return null;
  return (
    <div
      data-slot="barra-fixa-celular"
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
  );
}

export { BarraFixaDoCelular };
export type { BarraFixaDoCelularProps };
