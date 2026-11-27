import * as React from "react";
import { cn } from "./utils";

/**
 * Prosa: tipografia de texto longo (Termos de uso, Política de privacidade, páginas de ajuda). Envolve o HTML que vem
 * de um texto em Markdown e dá a ele a escala do DS: título da página 32 px, seções 20 px, texto 16 px com entrelinha
 * 1,7, listas com respiro, links em --primary-text sublinhados, citação como um card cinza só de borda e tabelas que
 * quebram o texto (nunca rolam para o lado: as células quebram a palavra quando precisam).
 * Largura de leitura: --content-reading (768 px). Use `<Prosa html={...} />` para HTML pronto ou `<Prosa>` com filhos.
 */
export type ProsaProps = React.HTMLAttributes<HTMLElement> & {
  /** HTML já convertido do Markdown (só de arquivos do próprio site, nunca de quem usa o site). */
  html?: string;
  as?: "article" | "div" | "section";
};

const estilo = [
  "max-w-[var(--content-reading)] text-body leading-[1.7] text-foreground [overflow-wrap:anywhere]",
  "[&_h1]:mb-4 [&_h1]:text-h2 [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:tracking-[-0.02em] [&_h1]:[text-wrap:balance]",
  "[&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-h4 [&_h2]:font-bold [&_h2]:leading-snug [&_h2]:[text-wrap:balance]",
  "[&_h3]:mb-2 [&_h3]:mt-8 [&_h3]:text-body-lg [&_h3]:font-bold [&_h3]:leading-snug",
  "[&_p]:my-4 [&_strong]:font-semibold",
  "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_li]:pl-1 [&_li::marker]:text-muted-foreground",
  "[&_a]:rounded-sm [&_a]:font-semibold [&_a]:text-primary-text [&_a]:underline [&_a]:underline-offset-[3px] [&_a:focus-visible]:outline-none [&_a:focus-visible]:ring-2 [&_a:focus-visible]:ring-ring",
  "[&_blockquote]:my-6 [&_blockquote]:rounded-md [&_blockquote]:border [&_blockquote]:border-border [&_blockquote]:bg-muted [&_blockquote]:p-4 [&_blockquote_p]:m-0",
  "[&_hr]:my-8 [&_hr]:border-border",
  "[&_table]:my-6 [&_table]:w-full [&_table]:table-fixed [&_table]:border-collapse [&_table]:text-body-sm [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:p-2 [&_th]:text-left [&_th]:font-semibold [&_td]:border [&_td]:border-border [&_td]:p-2 [&_td]:align-top",
  "[&>*:first-child]:mt-0",
].join(" ");

export function Prosa({ html, as: Tag = "article", className, children, ...props }: ProsaProps) {
  return (
    <Tag
      data-slot="prosa"
      className={cn(estilo, className)}
      {...(html !== undefined ? { dangerouslySetInnerHTML: { __html: html } } : { children })}
      {...props}
    />
  );
}
