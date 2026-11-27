"use client";

import * as React from "react";
import { cn } from "./utils";

/**
 * SurgirAoRolar e TituloQueSurge (entrada ao rolar)
 *
 * Os blocos entram quando chegam na tela. Mesma API do SurgirAoRolar do design system Dani Moscatelli, com os tokens de
 * movimento da FindLook (Movimento › Tokens):
 * subir    — sobe 24 px e aparece em --duration-xslow (600 ms), curva --ease-snappy (o "Revelar" das landings).
 * desfoque — sobe 24 px saindo de um desfoque de 6 px, no mesmo tempo.
 * escalonar — os filhos diretos entram um depois do outro (`passo` ms entre eles; até 12 filhos), como a lista de
 *             vantagens do hero.
 * repetir   — o que volta a ficar abaixo da tela é recolhido e anima de novo na próxima descida. Desligado (padrão):
 *             anima uma vez só.
 * raiz      — ref de um contêiner com rolagem própria (demonstrações); sem ela, a página.
 * TituloQueSurge: o título surge palavra por palavra, saindo de um desfoque; o texto inteiro fica para os leitores de
 * tela e as palavras animadas ficam ocultas para eles. `destaque` pinta um trecho no tom do título de destaque.
 * Menos movimento: com prefers-reduced-motion, nada fica escondido e nada anima.
 */

type Efeito = "subir" | "desfoque";

type OpcoesVisivel = {
  raiz?: React.RefObject<HTMLElement | null>;
  limiar?: number;
  margem?: string;
  repetir?: boolean;
  /** Tempo total da entrada, em ms; depois dele os estilos da entrada saem (o hover dos filhos volta a ser imediato). */
  duracao?: number;
};

/** --duration-xslow, em ms, para os temporizadores. */
const DURACAO_MS = 600;

const filhos = Array.from({ length: 11 }, (_, i) => `[data-surgir][data-escalonar] > :nth-child(${i + 2}) { --surgir-i: ${i + 1}; }`).join("\n");

const CSS = `
[data-surgir][data-estado="oculto"]:not([data-escalonar]),
[data-surgir][data-estado="oculto"][data-escalonar] > * { opacity: 0; transform: translateY(24px); }
[data-surgir="desfoque"][data-estado="oculto"]:not([data-escalonar]),
[data-surgir="desfoque"][data-estado="oculto"][data-escalonar] > * { filter: blur(6px); }
[data-surgir][data-estado="visto"]:not([data-escalonar]),
[data-surgir][data-estado="visto"][data-escalonar] > * {
  opacity: 1; transform: none; filter: none;
  transition: opacity var(--duration-xslow) var(--ease-snappy), transform var(--duration-xslow) var(--ease-snappy), filter var(--duration-xslow) var(--ease-snappy);
  transition-delay: calc(var(--surgir-atraso, 0ms) + var(--surgir-i, 0) * var(--surgir-passo, 80ms));
}
${filhos}
[data-surgir-titulo] .surgir-palavra { display: inline-block; }
[data-surgir-titulo][data-estado="oculto"] .surgir-palavra { opacity: 0; filter: blur(10px); transform: translateY(.35em); }
[data-surgir-titulo][data-estado="visto"] .surgir-palavra {
  opacity: 1; filter: none; transform: none;
  transition: opacity var(--duration-xslow) var(--ease-snappy), filter var(--duration-xslow) var(--ease-snappy), transform var(--duration-xslow) var(--ease-snappy);
  transition-delay: calc(var(--surgir-atraso, 0ms) + 120ms + var(--surgir-k, 0) * var(--surgir-passo, 40ms));
}
@media (prefers-reduced-motion: reduce) {
  [data-surgir], [data-surgir][data-escalonar] > *, [data-surgir-titulo] .surgir-palavra { transition: none !important; opacity: 1 !important; transform: none !important; filter: none !important; }
}
`;

/** Põe o CSS dos efeitos uma vez só no <head> (assim nenhum <style> entra entre os filhos escalonados). */
function useEstiloSurgir() {
  React.useInsertionEffect(() => {
    if (document.getElementById("fl-surgir-ao-rolar")) return;
    const el = document.createElement("style");
    el.id = "fl-surgir-ao-rolar";
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}

const useLayoutSeguro = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

/** "inicial" (sem estilo, antes do script), "oculto" (esperando a tela), "visto" (entrando) ou "fim" (entrada terminada). */
export function useSurgirAoRolar<T extends HTMLElement>({ raiz, limiar = 0.15, margem = "0px 0px -8% 0px", repetir = false, duracao = 1600 }: OpcoesVisivel = {}) {
  useEstiloSurgir();
  const ref = React.useRef<T>(null);
  const [estado, setEstado] = React.useState<"inicial" | "oculto" | "visto" | "fim">("inicial");

  React.useEffect(() => {
    if (estado !== "visto") return;
    const id = window.setTimeout(() => setEstado((s) => (s === "visto" ? "fim" : s)), duracao);
    return () => window.clearTimeout(id);
  }, [estado, duracao]);

  useLayoutSeguro(() => {
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzir || !("IntersectionObserver" in window)) return;
    setEstado("oculto");
  }, []);

  React.useEffect(() => {
    if (estado === "inicial") return;
    const el = ref.current;
    if (!el) return;
    const caixa = raiz?.current ?? null;
    const topoDaRaiz = () => (caixa ? caixa.getBoundingClientRect().top : 0);
    const mostrar = () => setEstado((s) => (s === "fim" ? s : "visto"));
    // rolagem rápida pode pular o bloco sem o observador perceber: o que já ficou acima da tela aparece
    let quadro = 0;
    const conferir = () => {
      quadro = 0;
      if (el.getBoundingClientRect().bottom < topoDaRaiz()) mostrar();
    };
    const aoRolar = () => { if (!quadro) quadro = requestAnimationFrame(conferir); };
    const alvoRolagem: HTMLElement | Window = caixa ?? window;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting || e.boundingClientRect.bottom < topoDaRaiz()) {
        mostrar();
        if (!repetir) { obs.disconnect(); alvoRolagem.removeEventListener("scroll", aoRolar); }
      } else if (repetir) {
        const fundo = caixa ? caixa.getBoundingClientRect().bottom : window.innerHeight;
        if (e.boundingClientRect.top > fundo) setEstado("oculto");
      }
    }, { root: caixa, threshold: limiar, rootMargin: margem });
    // só observa depois que o estado escondido foi desenhado; senão o que já está na tela aparece sem a transição
    let r2 = 0;
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => obs.observe(el)); });
    alvoRolagem.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      cancelAnimationFrame(r1); cancelAnimationFrame(r2); cancelAnimationFrame(quadro);
      obs.disconnect(); alvoRolagem.removeEventListener("scroll", aoRolar);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado === "inicial", raiz, limiar, margem, repetir]);

  return { ref, estado };
}

export type SurgirAoRolarProps = React.HTMLAttributes<HTMLElement> & OpcoesVisivel & {
  as?: React.ElementType;
  efeito?: Efeito;
  escalonar?: boolean;
  /** Intervalo entre os filhos, em ms (padrão 80). */
  passo?: number;
  /** Atraso antes de começar, em ms. */
  atraso?: number;
};

function SurgirAoRolar({
  as: Tag = "div",
  efeito = "subir",
  escalonar = false,
  passo = 80,
  atraso = 0,
  raiz,
  limiar,
  margem,
  repetir,
  duracao,
  className,
  style,
  children,
  ...props
}: SurgirAoRolarProps) {
  const quantos = escalonar ? Math.min(React.Children.count(children), 12) : 1;
  const { ref, estado } = useSurgirAoRolar<HTMLElement>({ raiz, limiar, margem, repetir, duracao: duracao ?? atraso + DURACAO_MS + (quantos - 1) * passo + 600 });
  const vars = { "--surgir-passo": `${passo}ms`, "--surgir-atraso": `${atraso}ms` } as React.CSSProperties;
  return (
    <Tag
      ref={ref}
      data-slot="surgir-ao-rolar"
      data-surgir={efeito}
      data-escalonar={escalonar ? "" : undefined}
      data-estado={estado}
      className={className}
      style={{ ...vars, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}

export type TituloQueSurgeProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, "children"> & OpcoesVisivel & {
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  children: string;
  /** Intervalo entre as palavras, em ms. */
  passo?: number;
  atraso?: number;
  /** Trecho do título em destaque (no tom de destaque dos títulos, --primary-destaque: só texto grande). */
  destaque?: string;
};

function TituloQueSurge({ as: Tag = "h2", children, passo = 40, atraso = 0, destaque, raiz, limiar, margem, repetir, duracao, className, style, ...props }: TituloQueSurgeProps) {
  const partes = children.split(/(\s+)/);
  const palavras = partes.filter((p) => p.trim()).length;
  const { ref, estado } = useSurgirAoRolar<HTMLHeadingElement>({ raiz, limiar, margem, repetir, duracao: duracao ?? atraso + 120 + palavras * passo + 800 });
  const ini = destaque ? children.indexOf(destaque) : -1;
  const fim = ini >= 0 && destaque ? ini + destaque.length : -1;
  let k = 0;
  let pos = 0;
  return (
    <Tag
      ref={ref}
      data-slot="titulo-que-surge"
      data-surgir-titulo=""
      data-estado={estado}
      className={cn(className)}
      style={{ "--surgir-passo": `${passo}ms`, "--surgir-atraso": `${atraso}ms`, ...style } as React.CSSProperties}
      {...props}
    >
      <span className="sr-only">{children}</span>
      <span aria-hidden>
        {partes.map((p, i) => {
          const comeco = pos;
          pos += p.length;
          if (!p) return null;
          if (/^\s+$/.test(p)) return p;
          const realce = ini >= 0 && comeco >= ini && comeco < fim;
          return (
            <span key={i} className={cn("surgir-palavra", realce && "text-primary-destaque")} style={{ "--surgir-k": k++ } as React.CSSProperties}>{p}</span>
          );
        })}
      </span>
    </Tag>
  );
}

export { SurgirAoRolar, TituloQueSurge };
