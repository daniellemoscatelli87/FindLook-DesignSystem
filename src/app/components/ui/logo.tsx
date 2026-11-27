import * as React from "react";
import { cn } from "./utils";

/**
 * Logo da FindLook: mesma API do Logo do design system Dani Moscatelli. É o desenho oficial (os mesmos traços dos
 * arquivos de src/imports/svg/, conferidos caminho a caminho) em SVG dentro do código: chega ao produto pela
 * sincronização, sem arquivo nem <img> com caminho próprio.
 *
 * variante: "horizontal" (símbolo + FindLook: cabeçalho, rodapé, telas de conta) ou "simbolo" (só o pin com cabide:
 *   cabeçalho rolado, espaços pequenos).
 * superficie: "clara" (padrão; "Find" em grafite) ou "escura" ("Find" em branco); "auto" segue o tema (.dark).
 *   "Look" e o símbolo ficam sempre no rosa da marca (--brand-pink), como manda a grafia da marca.
 * corDoSimbolo: "marca" (padrão, rosa com o cabide branco), "branco" ou "grafite" (símbolo de uma cor só, sobre a
 *   primária ou foto).
 * Tamanho pela altura (className; padrão h-10). Não recolorir, esticar nem aplicar sombra (Marca › Regras).
 * Acessibilidade: com `rotulo`, o SVG é uma imagem com nome; sem rotulo, é decorativo (o link em volta tem o nome).
 * A mais no FindLook: `href` (e `comoLink`, para o Link do Next.js) põe o logo num link de 44 px de toque, com o nome
 * "FindLook, página inicial" (ou `rotulo`).
 */
export type LogoProps = Omit<React.SVGProps<SVGSVGElement>, "children"> & {
  variante?: "horizontal" | "simbolo";
  superficie?: "clara" | "escura" | "auto";
  /** Nome acessível. Omita quando o link em volta já tem nome. */
  rotulo?: string;
  corDoSimbolo?: "marca" | "branco" | "grafite";
  /** FindLook: vira link para este endereço. */
  href?: string;
  /** FindLook: o link do produto no lugar do <a>. */
  comoLink?: React.ElementType;
};

const COR_DO_SIMBOLO = { marca: "fill-[var(--brand-pink)]", branco: "fill-[var(--brand-white)]", grafite: "fill-[var(--brand-graphite)]" } as const;

function Desenho({ variante, superficie, corDoSimbolo, className, acessivel, extra, props }: {
  variante: "horizontal" | "simbolo"; superficie: "clara" | "escura"; corDoSimbolo: keyof typeof COR_DO_SIMBOLO; className?: string;
  acessivel: Record<string, unknown>; extra?: string; props: React.SVGProps<SVGSVGElement>;
}) {
  const look = COR_DO_SIMBOLO[corDoSimbolo];
  const circulo = corDoSimbolo === "marca" ? "fill-[var(--brand-white)]" : "hidden";
  if (variante === "simbolo") {
    return (
      <svg data-slot="logo" data-variante="simbolo" viewBox="0 0 1130.37 1427.63" xmlns="http://www.w3.org/2000/svg" className={cn("block h-10 w-auto shrink-0", extra, className)} focusable="false" {...acessivel} {...props}>
        <circle cx="565.18" cy="565.18" r="500.18" className={circulo} />
        <path className={look} d="M528.96,1.18c292.08-19.7,550.49,209.55,594.08,492.83,28.09,182.54-25.6,349.34-144.42,487.3-122.39,142.11-250.45,279.97-368.14,426.35-38.47,32.68-73.68,22.56-105.96-10.85-42.61-44.1-84.96-97.57-125.29-144.58-82.33-95.97-168.03-192.06-247.22-290.35C17.76,820.05-25.43,639.51,14.64,460.6,66.96,226.98,285.34,17.61,528.96,1.18ZM552.72,214.82c-61.93,6.36-119.22,54.35-136.71,113.75-16.47,55.95-10.94,82,53.97,75.5,42-4.21,28-29.27,38.92-56.07,22.23-54.56,103.5-53.56,126.1-.85,17.67,41.22-1.59,73.06-35.82,95.36-114.39,74.52-246.54,134.78-359.87,210.18-113.95,75.81-69.41,232.89,60.09,252.03l529.24.11c127.98-12.78,181.22-172.37,72.96-252.17l-231.76-146.06c26.54-21.31,50.32-48.94,60.31-82.14,34.51-114.66-60.68-221.64-177.44-209.64Z" />
        <path className={look} d="M576.41,562.02c3.15-.8,5.8-.41,8.54,1.28l259.83,163.4c28.33,22.57,20.79,65.72-12.51,78.18-172.69,6.48-346.82.84-520.04,2.85-41.84-3.74-56.49-54.16-22.41-78.67l286.58-167.04Z" />
      </svg>
    );
  }
  const find = superficie === "escura" ? "fill-[var(--brand-white)]" : "fill-[var(--brand-graphite)]";
  const lookTexto = "fill-[var(--brand-pink)]";
  return (
    <svg data-slot="logo" data-variante="horizontal" data-superficie={superficie} viewBox="0 0 2980.3 970.94" xmlns="http://www.w3.org/2000/svg" className={cn("block h-10 w-auto shrink-0", extra, className)} focusable="false" {...acessivel} {...props}>
      <circle cx="385.47" cy="397.28" r="310.4" className={circulo} />
      <path className={look} d="M362.99,47.27c181.26-12.23,341.62,130.04,368.68,305.84,17.43,113.28-15.89,216.79-89.62,302.41-75.96,88.19-155.43,173.74-228.46,264.59-23.87,20.28-45.72,14-65.75-6.73-26.44-27.37-52.72-60.55-77.75-89.72-51.09-59.55-104.28-119.19-153.42-180.19-70.91-88.02-97.72-200.05-72.85-311.08C76.28,187.39,211.8,57.47,362.99,47.27ZM377.73,179.85c-38.43,3.95-73.99,33.73-84.84,70.59-10.22,34.72-6.79,50.88,33.49,46.85,26.07-2.61,17.38-18.16,24.15-34.79,13.79-33.86,64.23-33.24,78.26-.53,10.97,25.58-.98,45.34-22.23,59.18-70.99,46.24-153,83.64-223.33,130.43-70.72,47.05-43.07,144.52,37.29,156.41l328.44.07c79.42-7.93,112.46-106.97,45.28-156.49l-143.83-90.64c16.47-13.23,31.22-30.37,37.43-50.97,21.42-71.16-37.66-137.54-110.11-130.1Z" />
      <path className={look} d="M392.43,395.31c1.95-.5,3.6-.26,5.3.79l161.25,101.4c17.58,14.01,12.9,40.78-7.76,48.52-107.17,4.02-215.23.52-322.73,1.77-25.96-2.32-35.06-33.61-13.9-48.82l177.84-103.66Z" />
      <g transform="translate(67.49 0)">
        <path className={find} d="M1709.08,263.83v393.73h-77.75v-29.46l-17.54,15.29c-126.57,77.84-231.87-72.67-184.55-192.41,32.84-83.1,129.54-116.72,200.09-55.9.39.17,2-3.15,2-3.34v-127.9h77.75ZM1554.63,435.62c-92,10.96-73.66,174.85,21.81,154.37,82.9-17.78,70.25-165.34-21.81-154.37Z" />
        <path className={lookTexto} d="M2651.42,476.76l86.46-112.49h101.2l-101.8,134.59,109.84,160.04h-107.91l-71.7-101.15c-.91-1.2-1.99.62-2.73,1.34-2.98,2.94-13.37,15.35-13.37,18.78v81.02h-91.15v-396.41h89.14c.14,0,2.01,1.87,2.01,2.01v212.27Z" />
        <path className={lookTexto} d="M2084.14,361.99c214.75-18.93,217.11,318.11,3.63,303.59-178.31-12.13-181.98-287.87-3.63-303.59ZM2094.85,441c-72.6,5.85-72.55,137.53-.23,144.07,85.55,7.74,86.04-150.98.23-144.07Z" />
        <path className={lookTexto} d="M2384.39,361.98c110.55-10.06,186.5,88.63,159.11,193.79-31.32,120.24-191.7,150.11-263.15,48.64-64.28-91.29-12.51-231.82,104.03-242.43ZM2395.11,441c-76.5,7.2-69.84,150.25,10.32,144.21,76.83-5.79,71.47-151.91-10.32-144.21Z" />
        <polygon className={find} points="1029.47 263.83 1029.47 334.81 868.61 334.81 868.61 428.55 1016.06 428.55 1016.06 499.53 867.27 499.53 867.2 657.49 786.84 657.56 786.85 263.83 1029.47 263.83" />
        <path className={find} d="M1222.49,403.11c29.51-35.17,74.61-47.4,117.94-30.11,41.15,16.42,61.75,56.29,64.42,99.02l-.05,185.55c-17.18.39-34.48-.53-51.67-.06-3.38.09-24.74,3.96-24.74-.61v-170.08c0-48.3-65.86-64.78-94.53-27.49-4.36,5.67-11.36,21.98-11.36,28.83v169.41h-76.41v-287.93h74.4c.14,0,2.01,1.87,2.01,2.01v31.47Z" />
        <polygon className={lookTexto} points="1823.02 263.83 1823.02 569.84 1957.06 571.85 1957.06 658.9 1730.53 658.9 1730.53 263.83 1823.02 263.83" />
        <path className={find} d="M1049.58,369.63h73.05c.14,0,2.01,1.87,2.01,2.01v285.25c0,.14-1.87,2.01-2.01,2.01h-67.02c-.32,0-5.79-1.81-6.05-1.99-2.28-1.67-1.42-32.14-1.38-37.57.23-30.02,0-60.75,0-90.95,0-53-.15-105.95,1.4-158.76Z" />
        <path className={find} d="M1085.44,258.82c55.7-7.32,64.4,73.77,11.58,79.86-58.22,6.7-65.94-72.71-11.58-79.86Z" />
      </g>
    </svg>
  );
}

function Logo({ variante = "horizontal", superficie = "clara", rotulo, corDoSimbolo = "marca", href, comoLink, className, ...props }: LogoProps) {
  const comLink = Boolean(href);
  const acessivel = rotulo && !comLink ? { role: "img", "aria-label": rotulo } : { "aria-hidden": true as const };
  const base = { variante, corDoSimbolo, className, acessivel, props };
  const desenho = superficie === "auto" ? (
    <>
      <Desenho {...base} superficie="clara" extra="dark:hidden" />
      <Desenho {...base} superficie="escura" extra="hidden dark:block" />
    </>
  ) : (
    <Desenho {...base} superficie={superficie} />
  );
  if (!comLink) return desenho;
  const Comp = comoLink ?? "a";
  return (
    <Comp
      href={href}
      aria-label={rotulo ?? "FindLook, página inicial"}
      data-slot="link-do-logo"
      className="inline-flex min-h-11 min-w-11 shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {desenho}
    </Comp>
  );
}

export { Logo };
