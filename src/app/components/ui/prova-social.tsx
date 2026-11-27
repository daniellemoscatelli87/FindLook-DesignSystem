import * as React from "react";
import { AvatarCircles, type Avatar } from "./avatar-circles";
import { cn } from "./utils";

/**
 * Prova social do hero: círculos de avatares (AvatarCircles) e uma frase curta ao lado, com o número em destaque
 * ("800 pessoas já encontraram seus looks"). O destaque fica em --primary-text e o resto em --muted-foreground.
 * Na mesma linha quando cabe; no celular, a frase desce para baixo dos avatares, alinhada à mesma borda esquerda.
 * Regra de conteúdo: número real (ou zerado no lançamento); nunca invente.
 */
export type ProvaSocialProps = {
  avatares: Avatar[];
  /** Número do último círculo (+N). */
  maisPessoas?: number;
  /** Trecho em destaque, no começo da frase ("800 pessoas"). */
  destaque: string;
  /** O resto da frase ("já encontraram seus looks"). */
  texto: string;
  tamanho?: "sm" | "md" | "lg";
  className?: string;
};

export function ProvaSocial({ avatares, maisPessoas, destaque, texto, tamanho = "md", className }: ProvaSocialProps) {
  return (
    <div data-slot="prova-social" className={cn("flex flex-wrap items-center gap-x-4 gap-y-3", className)}>
      <AvatarCircles numPeople={maisPessoas} avatarUrls={avatares} size={tamanho} />
      <p className="m-0 min-w-0 text-body-sm leading-snug">
        <span className="font-semibold text-primary-text">{destaque}</span> <span className="text-muted-foreground">{texto}</span>
      </p>
    </div>
  );
}
