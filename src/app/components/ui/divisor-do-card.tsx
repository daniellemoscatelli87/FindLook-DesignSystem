import * as React from "react";

import { DivisorSuave } from "./painel-dados";

/**
 * Divisor do rodapé do card (27/11/2026): o mesmo divisor que separa o cabeçalho do conteúdo nos cards do painel
 * (DivisorSuave, que some nas laterais). O Card horizontal mostra este divisor acima das ações ("Card com ação: divisor
 * e botão no canto inferior direito", dona do produto). Cada design system aponta para o próprio divisor.
 */
export function DivisorDoCard({ className }: { className?: string }) {
  return (
    <div data-slot="card-divisor" className={className}>
      <DivisorSuave />
    </div>
  );
}
