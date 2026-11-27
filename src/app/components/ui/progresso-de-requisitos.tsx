import * as React from "react";
import { Flag } from "lucide-react";
import { CardComCabecalho, ProgressoRotulado } from "./painel-dados";

/**
 * Progresso de requisitos: quanto falta para cumprir uma lista de metas (por exemplo, para liberar um recurso).
 * CardComCabecalho com um ProgressoRotulado por requisito e a contagem de requisitos cumpridos no canto.
 * As metas e os textos vêm do produto.
 */
export type Requisito = { rotulo: string; atual: number; meta: number; unidade?: string };

export function ProgressoDeRequisitos({ titulo, descricao, itens, icone = <Flag />, rotuloCumprido = "cumprido", className }: {
  titulo: React.ReactNode;
  descricao?: React.ReactNode;
  itens: Requisito[];
  icone?: React.ReactNode;
  rotuloCumprido?: string;
  className?: string;
}) {
  const fmt = (n: number) => n.toLocaleString("pt-BR");
  const cumpridos = itens.filter((r) => r.atual >= r.meta).length;
  return (
    <CardComCabecalho
      icone={icone}
      titulo={titulo}
      descricao={descricao}
      acao={<span className="text-[0.75rem] font-semibold tabular-nums text-muted-foreground">{cumpridos} de {itens.length}</span>}
      nivel={3}
      className={className}
    >
      <div className="space-y-4">
        {itens.map((r) => (
          <ProgressoRotulado
            key={r.rotulo}
            rotulo={r.atual >= r.meta ? `${r.rotulo} · ${rotuloCumprido}` : r.rotulo}
            pct={Math.min(100, (r.atual / r.meta) * 100)}
            texto={`${fmt(r.atual)} de ${fmt(r.meta)}${r.unidade ? ` ${r.unidade}` : ""}`}
          />
        ))}
      </div>
    </CardComCabecalho>
  );
}
