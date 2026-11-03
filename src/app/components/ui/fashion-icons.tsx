import * as React from "react";
import { cn } from "./utils";

/**
 * Ícones de moda (IconeModa)
 *
 * Ícones de traço no estilo Lucide (viewBox 24, traço 2, pontas e junções arredondadas), desenhados para o
 * universo da FindLook: peças de roupa, calçados e acessórios. São os mesmos desenhos da textura doodle
 * (scripts/gerar-texturas.mjs); a camiseta é o ícone "shirt" do Lucide.
 * Use quando o Lucide não tiver a peça (calça, vestido, saia, tênis…), por exemplo em listas de produtos.
 *
 *   <IconeModa nome="calca" className="size-4 text-primary" />
 */

type No = ["path", { d: string }] | ["circle", { cx: number; cy: number; r: number }] | ["ellipse", { cx: number; cy: number; rx: number; ry: number }];
const P = (d: string): No => ["path", { d }];
const C = (cx: number, cy: number, r: number): No => ["circle", { cx, cy, r }];

export const iconesModa = {
  camiseta: { rotulo: "Camiseta", nos: [P("M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z")] },
  camisa: { rotulo: "Camisa", nos: [P("M8 3 4 6v12l4 1v-6h8v6l4-1V6l-4-3"), P("M8 3c1 2 2.5 3 4 3s3-1 4-3"), P("M12 9v5")] },
  cropped: { rotulo: "Cropped", nos: [P("M6 4l3-1c1 1.5 2 2 3 2s2-.5 3-2l3 1v4l-2 1v4H8V9L6 8z"), P("M8 13h8")] },
  jaqueta: { rotulo: "Jaqueta", nos: [P("M9 3h6l4 2v14h-4v-7l-3 2-3-2v7H5V5z"), P("M12 7v3"), P("M9 3c1 2 2 3 3 3s2-1 3-3")] },
  vestido: { rotulo: "Vestido", nos: [P("M9 2h1.5L12 5l1.5-3H15l1 5-2 3 5 11H5l5-11-2-3z")] },
  calca: { rotulo: "Calça", nos: [P("M7 3h10l1 18h-5l-1-9-1 9H6z"), P("M7 7h10")] },
  shorts: { rotulo: "Shorts", nos: [P("M6 4h12l1 11h-6l-1-5-1 5H5z"), P("M6 8h12")] },
  saia: { rotulo: "Saia", nos: [P("M7 3h10v3H7z"), P("M7 6 4 21h16L17 6"), P("M10 6l-1 15"), P("M14 6l1 15")] },
  biquini: { rotulo: "Biquíni", nos: [P("M4 8c2 4 5 6 8 6s6-2 8-6"), P("M4 8l1 7h4l3-1 3 1h4l1-7"), P("M12 3v3")] },
  meia: { rotulo: "Meia", nos: [P("M9 3h6v9l3 3a4 4 0 0 1-6 5l-3-3z"), P("M9 7h6")] },
  tenis: { rotulo: "Tênis", nos: [P("M3 17c0-3 2-4 5-5l4-3c2 2 4 3 8 3 1 0 1 1 1 3v2H3z"), P("M8 17v-3"), P("M11 17v-4"), P("M3 17h18"), P("M9 11l1.5 1.5"), P("M11 9.5l1.5 1.5")] },
  sandalia: { rotulo: "Sandália", nos: [P("M9 2c3.3 0 5.5 3.2 5.5 8.5S13 22 9 22s-5.5-6.2-5.5-11.5S5.7 2 9 2z"), P("M9 8.5 5.5 14"), P("M9 8.5l3.5 5.5"), P("M9 8.5V6.5")] },
  bota: { rotulo: "Bota", nos: [P("M8 3h6v10l4 3v3H5v-3l3-2z"), P("M8 13h6"), P("M5 19h13")] },
  salto: { rotulo: "Salto", nos: [P("M3 19h18v2H3z"), P("M21 19c0-4-5-6-9-5l-6 1-2 4"), P("M15 12l3-6 2.5 1.2L18 13"), P("M7 19v-3.5")] },
  bone: { rotulo: "Boné", nos: [P("M4 14a7 7 0 0 1 14 0v1"), P("M3 15h15c2.6 0 4.6 1 4.6 2.2S20.6 19.2 18 19.2H4a1 1 0 0 1-1-1z"), P("M11 7V5.5"), P("M11 10v5")] },
  chapeu: { rotulo: "Chapéu", nos: [P("M3 16c0-1.2 4-2 9-2s9 .8 9 2-4 2-9 2-9-.8-9-2z"), P("M7 15V9a5 5 0 0 1 10 0v6")] },
  oculos: { rotulo: "Óculos de sol", nos: [P("M2 10h20"), P("M3 10l1 5a3 3 0 0 0 3 2h1a3 3 0 0 0 3-2.5V10"), P("M21 10l-1 5a3 3 0 0 1-3 2h-1a3 3 0 0 1-3-2.5V10"), P("M11 12h2")] },
  bolsa: { rotulo: "Bolsa", nos: [P("M6 9h12l1.2 11H4.8z"), P("M9 9V7a3 3 0 0 1 6 0v2"), P("M10 13h4")] },
  clutch: { rotulo: "Clutch", nos: [P("M3 8h18v10H3z"), P("M3 12h18"), C(12, 12, 1.5)] },
  cinto: { rotulo: "Cinto", nos: [P("M3 12h18"), P("M3 10v4"), P("M21 10v4"), P("M9 9h6v6H9z"), P("M12 9v6")] },
  gravata: { rotulo: "Gravata", nos: [P("M10 3h4l-1 4 2 11-3 3-3-3 2-11z")] },
  colar: { rotulo: "Colar", nos: [P("M5 3c0 7 3 11 7 11s7-4 7-11"), P("M12 14v2l-2 2 2 2 2-2-2-2")] },
  brinco: { rotulo: "Brinco", nos: [P("M12 2c-1.2 0-2 .8-2 2s2 2 2 4"), P("M12 8l-3.5 5a3.5 3.5 0 0 0 7 0z")] },
  anel: { rotulo: "Anel", nos: [C(12, 15, 5), P("M12 10 9 7l1-3h4l1 3z"), P("M10 4l2 3 2-3")] },
  pulseira: { rotulo: "Pulseira", nos: [["ellipse", { cx: 12, cy: 13, rx: 8, ry: 5 }], C(4.5, 11.5, 1), C(19.5, 11.5, 1), C(12, 18, 1)] },
  cabide: { rotulo: "Cabide", nos: [P("M12 3a2 2 0 0 1 2 2c0 1.5-2 1.7-2 3.5V10"), P("M12 10 3.4 15.7A1.6 1.6 0 0 0 4.3 18.6h15.4a1.6 1.6 0 0 0 .9-2.9z")] },
} satisfies Record<string, { rotulo: string; nos: No[] }>;

export type NomeIconeModa = keyof typeof iconesModa;
export const nomesIconesModa = Object.keys(iconesModa) as NomeIconeModa[];

export type IconeModaProps = Omit<React.SVGProps<SVGSVGElement>, "children"> & {
  nome: NomeIconeModa;
  /** Tamanho em px (padrão 24). Também pode ser controlado por classe, como `size-4`. */
  size?: number | string;
  strokeWidth?: number | string;
  /** Texto para leitores de tela. Sem ele, o ícone é decorativo (aria-hidden). */
  titulo?: string;
};

export function IconeModa({ nome, size = 24, strokeWidth = 2, titulo, className, ...props }: IconeModaProps) {
  const icone = iconesModa[nome];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      data-slot="icone-moda"
      data-icone={nome}
      role={titulo ? "img" : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
      className={cn("shrink-0", className)}
      {...props}
    >
      {icone.nos.map(([tag, a], i) => React.createElement(tag, { key: i, ...a }))}
    </svg>
  );
}
