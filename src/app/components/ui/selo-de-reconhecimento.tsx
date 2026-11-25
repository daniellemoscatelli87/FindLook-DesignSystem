import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "./utils";
import { Badge } from "./badge";
import { Selo } from "./selo";
import { IconeComBase, superficieDoCard } from "./painel-dados";

/**
 * Selo de reconhecimento: mostra que algo (uma loja, por exemplo) conquistou um reconhecimento.
 * Montado com os componentes do DS: IconeComBase (base rosa, o foco), Selo (pílula) e Badge (versão compacta).
 * O nome, a frase e a validade vêm do produto; o DS não define critérios de concessão.
 */
type Props = {
  /** Nome do reconhecimento (texto ou um MarcaFind). */
  nome: React.ReactNode;
  /** Frase curta embaixo do nome. */
  frase?: React.ReactNode;
  /** Texto da pílula (Selo do DS). */
  rotulo?: string;
  /** Validade ou data, quando a aplicação pedir. */
  validade?: string;
  /** Nome inteiro para leitores de tela. */
  descricaoAcessivel: string;
  icone?: React.ReactNode;
  /** "compacto": cards e listas · "horizontal" e "vertical": perfis e páginas. */
  variante?: "compacto" | "horizontal" | "vertical";
  className?: string;
};

export function SeloDeReconhecimento({ nome, frase, rotulo, validade, descricaoAcessivel, icone = <Star className="fill-current" />, variante = "horizontal", className }: Props) {
  if (variante === "compacto") {
    return (
      <Badge variant="outline" data-slot="selo-de-reconhecimento" data-variante="compacto" role="img" aria-label={descricaoAcessivel} className={cn("h-6 rounded-full pl-1.5 pr-2.5 text-[0.8125rem]", className)}>
        <span aria-hidden className="flex text-primary [&>svg]:!size-3.5">{icone}</span>
        {nome}
      </Badge>
    );
  }
  const vertical = variante === "vertical";
  return (
    <div
      data-slot="selo-de-reconhecimento"
      data-variante={variante}
      role="img"
      aria-label={descricaoAcessivel}
      className={cn("inline-flex rounded-lg p-4", superficieDoCard, vertical ? "flex-col items-center gap-3 text-center" : "items-center gap-3.5", className)}
    >
      <IconeComBase tom="marca" tamanho="lg" redonda>{icone}</IconeComBase>
      <div className={cn("flex min-w-0 flex-col gap-1", vertical && "items-center")}>
        <span className="text-[1.25rem] leading-none">{nome}</span>
        {frase && <span className="text-[0.875rem] font-medium text-foreground">{frase}</span>}
        {rotulo && <Selo size="sm" className="mt-1">{rotulo}</Selo>}
        {validade && <span className="text-[0.75rem] text-muted-foreground">{validade}</span>}
      </div>
    </div>
  );
}
