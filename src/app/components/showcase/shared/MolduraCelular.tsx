import React, { useState } from "react";

/** Moldura de celular para demonstrar o que é fixo na tela: o transform faz `fixed` valer dentro da moldura. */
export function MolduraCelular({ children, escuro = false, rotulo }: { children: (moldura: HTMLDivElement | null) => React.ReactNode; escuro?: boolean; rotulo: string }) {
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  return (
    <div
      ref={setEl}
      role="group"
      aria-label={rotulo}
      data-moldura-celular
      className={`relative mx-auto h-[640px] w-full max-w-[360px] overflow-hidden rounded-xl border border-border [transform:translateZ(0)] [&_[data-slot=drawer-content]]:max-h-[92%] ${escuro ? "dark bg-[var(--graphite-950)] text-foreground" : "bg-background"}`}
    >
      {children(el)}
    </div>
  );
}

export function ConteudoFalso({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div className="space-y-3 p-5 pt-8">
      <p className="text-h3 font-extrabold leading-tight tracking-tight text-foreground">{titulo}</p>
      <p className="text-body-sm leading-relaxed text-muted-foreground">{texto}</p>
      <div aria-hidden className="space-y-2 pt-4">
        {[90, 75, 82, 60].map((w) => <div key={w} className="h-3 rounded-full bg-muted" style={{ width: `${w}%` }} />)}
      </div>
    </div>
  );
}
