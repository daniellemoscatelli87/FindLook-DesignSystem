"use client";

import * as React from "react";

/**
 * Tokens de movimento em JavaScript: os mesmos valores de --duration-* e --ease-* (theme.css, documentados em
 * Movimento › Tokens), para animações feitas com a biblioteca motion ou com a Web Animations API. Use estes nomes em
 * vez de copiar números no produto; se o token mudar no tema, mude aqui também.
 * useMenosMovimento: "menos movimento" do aparelho, seguro para páginas geradas no servidor (a primeira pintura é a com
 * movimento, como no servidor; a preferência entra logo depois de a página abrir, sem erro de hidratação).
 */

/** Durações em segundos (motion). --duration-instant 80 ms, -fast 150, -normal 250, -slow 400, -xslow 600. */
export const DURACAO = { instantanea: 0.08, rapida: 0.15, normal: 0.25, lenta: 0.4, extraLenta: 0.6 } as const;

/** As mesmas durações em milissegundos (setTimeout, Web Animations API). */
export const DURACAO_MS = { instantanea: 80, rapida: 150, normal: 250, lenta: 400, extraLenta: 600 } as const;

/** Curvas (cubic-bezier) de --ease-out, --ease-in, --ease-in-out, --ease-snappy e --ease-back. */
export const CURVA = {
  saida: [0, 0, 0.58, 1],
  entrada: [0.42, 0, 1, 1],
  entradaESaida: [0.42, 0, 0.58, 1],
  snappy: [0.16, 1, 0.3, 1],
  volta: [0.34, 1.56, 0.64, 1],
} as const;

/** A curva mais usada nas entradas (painéis, cards, balões). */
export const CURVA_SNAPPY = CURVA.snappy;

/** A curva como texto CSS (Web Animations API, style). */
export function curvaCss(nome: keyof typeof CURVA) {
  return `cubic-bezier(${CURVA[nome].join(", ")})`;
}

/** true quando a pessoa pediu "menos movimento" no aparelho. */
export function useMenosMovimento() {
  const [menos, setMenos] = React.useState(false);
  React.useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const atualizar = () => setMenos(m.matches);
    atualizar();
    m.addEventListener?.("change", atualizar);
    return () => m.removeEventListener?.("change", atualizar);
  }, []);
  return menos;
}
