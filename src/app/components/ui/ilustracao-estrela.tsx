"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "./utils";

/**
 * Ilustração da estrela: uma estrela em volume, nas cores da marca, sobre um pedestal, com brilhos ao redor.
 * Para o topo de páginas de reconhecimento e conquista. Flutua devagar (sem animação com "menos movimento").
 * Com `rotulo`, mostra ao lado uma etiqueta de vidro com o nome e a frase do reconhecimento (vindos do produto).
 * Decorativa: o texto da etiqueta é lido normalmente; a estrela fica escondida dos leitores de tela.
 */
export function IlustracaoEstrela({ tamanho = 168, animar = true, rotulo, frase, className }: {
  /** Largura da estrela em px (a altura acompanha). */
  tamanho?: number;
  animar?: boolean;
  /** Nome do reconhecimento, ao lado da estrela (texto ou um MarcaFind). */
  rotulo?: React.ReactNode;
  frase?: React.ReactNode;
  className?: string;
}) {
  const reduzir = useReducedMotion();
  const mexe = animar && !reduzir;
  const id = React.useId().replace(/:/g, "");
  return (
    <div data-slot="ilustracao-estrela" className={cn("relative inline-flex items-center", className)}>
      <svg aria-hidden width={tamanho} height={tamanho * 1.02} viewBox="0 0 200 204" className="shrink-0 overflow-visible">
        <defs>
          <linearGradient id={`${id}-face`} x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0" stopColor="var(--pink-400)" />
            <stop offset="0.55" stopColor="var(--pink-500)" />
            <stop offset="1" stopColor="var(--pink-700)" />
          </linearGradient>
          <linearGradient id={`${id}-miolo`} x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="var(--pink-100)" />
          </linearGradient>
          <radialGradient id={`${id}-base`} cx="0.5" cy="0.35" r="0.7">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="var(--pink-100)" />
          </radialGradient>
          <filter id={`${id}-sombra`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="var(--pink-700)" floodOpacity="0.28" />
          </filter>
        </defs>
        {/* Pedestal */}
        <ellipse cx="100" cy="182" rx="78" ry="16" fill="var(--pink-200)" opacity="0.55" />
        <ellipse cx="100" cy="174" rx="78" ry="16" fill={`url(#${id}-base)`} stroke="var(--pink-100)" />
        {/* Brilhos */}
        <motion.g
          stroke="var(--pink-500)" strokeWidth="5" strokeLinecap="round"
          animate={mexe ? { opacity: [0.35, 1, 0.35] } : undefined}
          transition={mexe ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" } : undefined}
        >
          <line x1="22" y1="44" x2="34" y2="54" />
          <line x1="12" y1="82" x2="28" y2="84" />
          <line x1="36" y1="18" x2="42" y2="32" />
        </motion.g>
        {/* Estrela */}
        <motion.g
          animate={mexe ? { y: [0, -6, 0], rotate: [-2, 2, -2] } : undefined}
          transition={mexe ? { duration: 4.2, repeat: Infinity, ease: "easeInOut" } : undefined}
          style={{ transformOrigin: "100px 100px" }}
        >
          <path
            filter={`url(#${id}-sombra)`}
            fill={`url(#${id}-face)`}
            stroke="var(--pink-600)" strokeWidth="2" strokeLinejoin="round"
            d="M100 20 C106 20 109 24 112 31 L127 62 L161 67 C169 68 173 71 174 76 C175 81 172 85 167 90 L142 114 L148 148 C149 156 147 160 143 162 C139 165 134 164 127 160 L100 143 L73 160 C66 164 61 165 57 162 C53 160 51 156 52 148 L58 114 L33 90 C28 85 25 81 26 76 C27 71 31 68 39 67 L73 62 L88 31 C91 24 94 20 100 20 Z"
          />
          <path
            fill={`url(#${id}-miolo)`}
            d="M100 60 L109 81 L131 84 L115 99 L119 121 L100 110 L81 121 L85 99 L69 84 L91 81 Z"
          />
          <path fill="#FFFFFF" opacity="0.35" d="M100 26 C104 26 106 29 108 33 L118 54 C108 50 92 50 82 54 L92 33 C94 29 96 26 100 26 Z" />
        </motion.g>
      </svg>
      {rotulo && (
        <div className="-ml-6 flex flex-col rounded-xl border border-white/70 bg-card/80 px-4 py-2.5 shadow-[var(--shadow-sm)] backdrop-blur-sm">
          <span className="text-[1.25rem] leading-tight">{rotulo}</span>
          {frase && <span className="text-[0.8125rem] font-medium text-foreground">{frase}</span>}
        </div>
      )}
    </div>
  );
}
