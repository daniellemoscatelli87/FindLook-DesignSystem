"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "./utils";

/**
 * Voltar ao topo
 *
 * Botão redondo de 48 px, secundário (superfície branca, borda, seta na cor de texto da marca e a sombra dos elementos
 * que flutuam, --shadow-lg), que aparece quando a pessoa chega ao fim da página e a leva de volta ao topo. É secundário
 * de propósito (27/11/2026): ao lado da barra de ação do celular, que é preenchida, só a ação principal fica cheia.
 * Fica fixo no canto inferior direito. Quando a página tem a BarraFixaDoCelular, ele sobe sozinho para ficar logo
 * acima dela (12 px de folga, contando a área segura do aparelho), sem cobrir o botão; a barra também reserva o espaço
 * dos dois no fim da página. Com "menos movimento", a volta é instantânea. Ao voltar, o foco vai para o elemento de
 * `focoEm` (por padrão, o <main>), para quem usa teclado ou leitor de tela continuar do começo.
 *
 * rolagem      — ref de um contêiner com rolagem própria (por exemplo, uma janela de demonstração); sem ela, usa a página.
 * limiar       — distância, em px, do fim da rolagem a partir da qual o botão aparece.
 * comBarraFixa — não é mais necessário (a posição acima da barra é automática); continua aceito e força a posição
 *                acima da barra até 768 px.
 */
export type VoltarAoTopoProps = {
  rolagem?: React.RefObject<HTMLElement | null>;
  limiar?: number;
  rotulo?: string;
  focoEm?: string;
  comBarraFixa?: boolean;
  className?: string;
};

export function VoltarAoTopo({ rolagem, limiar = 160, rotulo = "Voltar ao topo", focoEm = "main", comBarraFixa = false, className }: VoltarAoTopoProps) {
  const [visivel, setVisivel] = React.useState(false);

  React.useEffect(() => {
    const el = rolagem?.current ?? null;
    const alvo: HTMLElement | Window = el ?? window;
    const medir = () => {
      const topo = el ? el.scrollTop : window.scrollY;
      const altura = el ? el.clientHeight : window.innerHeight;
      const total = el ? el.scrollHeight : document.documentElement.scrollHeight;
      setVisivel(topo > 0 && topo + altura >= total - limiar);
    };
    medir();
    alvo.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      alvo.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
    };
  }, [rolagem, limiar]);

  const subir = () => {
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = rolagem?.current ?? null;
    (el ?? window).scrollTo({ top: 0, behavior: reduzir ? "auto" : "smooth" });
    const destino = (el ?? document).querySelector<HTMLElement>(focoEm);
    if (destino) {
      if (!destino.hasAttribute("tabindex")) destino.setAttribute("tabindex", "-1");
      destino.focus({ preventScroll: true });
    }
  };

  return (
    <button
      type="button"
      data-slot="voltar-ao-topo"
      data-visivel={visivel ? "sim" : "nao"}
      aria-label={rotulo}
      title={rotulo}
      aria-hidden={visivel ? undefined : true}
      tabIndex={visivel ? undefined : -1}
      onClick={subir}
      className={cn(
        "fixed right-4 bottom-4 z-40 inline-flex size-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-card text-primary-text shadow-[var(--shadow-lg)] transition-[opacity,translate,background-color,bottom] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none sm:right-6 sm:bottom-6",
        // Acima da barra de ação do celular (BarraFixaDoCelular): faixa de 12 + 56 px + base (16 px ou a área segura).
        "max-md:[body:has([data-slot=barra-fixa-celular])_&]:bottom-[calc(4.25rem+max(1rem,env(safe-area-inset-bottom)))] [body:has([data-slot=barra-fixa-celular][data-somente-celular=nao])_&]:bottom-[calc(4.25rem+max(1rem,env(safe-area-inset-bottom)))]",
        comBarraFixa && "max-md:bottom-[calc(4.25rem+max(1rem,env(safe-area-inset-bottom)))]",
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        className,
      )}
    >
      <ArrowUp className="size-5" aria-hidden />
    </button>
  );
}
