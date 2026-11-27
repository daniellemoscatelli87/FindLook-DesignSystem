"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "./utils";

/* Estrela arredondada em volume: borda rosa clara, face vermelha com brilho e uma estrela branca no centro. As pontas
   arredondadas vêm do traço com junção redonda. */
const ESTRELA = "120.0,30.0 143.5,71.6 190.4,81.1 158.0,116.4 163.5,163.9 120.0,144.0 76.5,163.9 82.0,116.4 49.6,81.1 96.5,71.6";
const MIOLO = "120.0,68.0 131.5,90.2 156.1,94.3 138.5,112.0 142.3,136.7 120.0,125.5 97.7,136.7 101.5,112.0 83.9,94.3 108.5,90.2";

function Estrela({ id }: { id: string }) {
  return (
    <>
      {/* Borda rosa clara (a "moldura" em volume) */}
      <polygon points={ESTRELA} fill={`url(#${id}-borda)`} stroke={`url(#${id}-borda)`} strokeWidth="50" strokeLinejoin="round" filter={`url(#${id}-sombra)`} />
      <polygon points={ESTRELA} fill="none" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="46" strokeLinejoin="round" style={{ mixBlendMode: "soft-light" }} />
      {/* Face vermelha */}
      <polygon points={ESTRELA} fill={`url(#${id}-face)`} stroke={`url(#${id}-face)`} strokeWidth="30" strokeLinejoin="round" />
      {/* Brilho na parte de cima da face */}
      <polygon points={ESTRELA} fill={`url(#${id}-brilho)`} stroke={`url(#${id}-brilho)`} strokeWidth="30" strokeLinejoin="round" />
      {/* Estrela branca do centro, com sombra suave */}
      <polygon points={MIOLO} fill={`url(#${id}-miolo)`} stroke={`url(#${id}-miolo)`} strokeWidth="12" strokeLinejoin="round" filter={`url(#${id}-sombra-miolo)`} />
    </>
  );
}

function Gradientes({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-borda`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="var(--pink-200)" />
        <stop offset="1" stopColor="var(--pink-300)" />
      </linearGradient>
      <linearGradient id={`${id}-face`} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0" stopColor="var(--pink-500)" />
        <stop offset="1" stopColor="var(--pink-600)" />
      </linearGradient>
      <linearGradient id={`${id}-brilho`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.28" />
        <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${id}-miolo`} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="var(--pink-50)" />
      </linearGradient>
      <linearGradient id={`${id}-brilhos`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="var(--pink-400)" />
        <stop offset="1" stopColor="var(--pink-600)" />
      </linearGradient>
      <linearGradient id={`${id}-tampo`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="var(--pink-100)" />
      </linearGradient>
      <linearGradient id={`${id}-lateral`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="var(--pink-100)" />
        <stop offset="1" stopColor="var(--pink-200)" />
      </linearGradient>
      <filter id={`${id}-sombra`} x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="var(--pink-700)" floodOpacity="0.22" />
      </filter>
      <filter id={`${id}-sombra-miolo`} x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="var(--pink-800)" floodOpacity="0.35" />
      </filter>
    </defs>
  );
}

/**
 * Ilustração da estrela: uma estrela arredondada em volume, nas cores da marca, sobre um pedestal, com brilhos ao lado.
 * Para o topo de páginas de reconhecimento e conquista. Flutua devagar (sem animação com "menos movimento").
 * Com `rotulo`, mostra uma etiqueta em pílula rosa clara atrás da estrela, com o nome e a frase do reconhecimento (vindos
 * do produto). Decorativa: o texto da etiqueta é lido normalmente; a estrela fica escondida dos leitores de tela.
 * Com `src`, mostra a ilustração pronta (imagem) no lugar do desenho, com `alt` descrevendo o que ela diz; entra com um
 * leve crescimento e flutua devagar (parada com "menos movimento"). `tamanho` vira a largura da imagem.
 */
export function IlustracaoEstrela({ tamanho = 168, animar = true, rotulo, frase, src, alt, className }: {
  /** Largura da estrela com o pedestal, em px (a altura acompanha). */
  tamanho?: number;
  animar?: boolean;
  /** Nome do reconhecimento, ao lado da estrela (texto ou um MarcaFind). */
  rotulo?: React.ReactNode;
  frase?: React.ReactNode;
  /** Ilustração pronta (imagem com fundo transparente). */
  src?: string;
  /** Texto alternativo da imagem (o que está escrito nela). */
  alt?: string;
  className?: string;
}) {
  const reduzir = useReducedMotion();
  const mexe = animar && !reduzir;
  const id = React.useId().replace(/:/g, "");
  if (src) {
    return (
      <motion.div
        data-slot="ilustracao-estrela"
        className={cn("relative inline-flex", className)}
        initial={mexe ? { opacity: 0, scale: 0.94, y: 6 } : false}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={src}
          alt={alt ?? ""}
          width={tamanho}
          height={Math.round(tamanho * 0.4)}
          className="h-auto max-w-full select-none"
          draggable={false}
          animate={mexe ? { y: [0, -4, 0] } : undefined}
          transition={mexe ? { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 } : undefined}
        />
      </motion.div>
    );
  }
  return (
    <div data-slot="ilustracao-estrela" className={cn("relative inline-flex items-center", className)}>
      <svg aria-hidden width={tamanho} height={tamanho * (210 / 240)} viewBox="0 0 240 210" className="relative z-10 shrink-0 overflow-visible">
        <Gradientes id={id} />
        {/* Pedestal: tampo e lateral */}
        <path d="M22 178 L22 190 A98 17 0 0 0 218 190 L218 178 Z" fill={`url(#${id}-lateral)`} />
        <ellipse cx="120" cy="178" rx="98" ry="17" fill={`url(#${id}-tampo)`} />
        {/* Brilhos */}
        <motion.g
          stroke={`url(#${id}-brilhos)`} strokeWidth="9" strokeLinecap="round"
          animate={mexe ? { opacity: [0.45, 1, 0.45] } : undefined}
          transition={mexe ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" } : undefined}
        >
          <line x1="20" y1="28" x2="36" y2="52" />
          <line x1="4" y1="74" x2="30" y2="84" />
          <line x1="6" y1="128" x2="30" y2="118" />
        </motion.g>
        {/* Estrela */}
        <motion.g
          animate={mexe ? { y: [0, -5, 0] } : undefined}
          transition={mexe ? { duration: 4.2, repeat: Infinity, ease: "easeInOut" } : undefined}
        >
          <Estrela id={id} />
        </motion.g>
      </svg>
      {rotulo && (
        <div
          className="relative z-0 flex flex-col justify-center rounded-full border border-white/80 bg-[linear-gradient(180deg,var(--pink-50),var(--pink-100))] py-3 pr-7 shadow-[var(--shadow-sm)]"
          style={{ marginLeft: -tamanho * 0.3, paddingLeft: tamanho * 0.36 }}
        >
          <span className="text-[1.5rem] leading-tight">{rotulo}</span>
          {frase && <span className="text-[0.9375rem] font-medium leading-snug text-foreground">{frase}</span>}
        </div>
      )}
    </div>
  );
}

/** A mesma estrela, pequena e sem pedestal, para acompanhar o nome do reconhecimento em linhas e faixas. Decorativa. */
export function IconeEstrela({ tamanho = 40, className }: { tamanho?: number; className?: string }) {
  const id = React.useId().replace(/:/g, "");
  return (
    <svg aria-hidden data-slot="icone-estrela" width={tamanho} height={tamanho} viewBox="14 0 212 200" className={cn("shrink-0 overflow-visible", className)}>
      <Gradientes id={id} />
      <Estrela id={id} />
    </svg>
  );
}
