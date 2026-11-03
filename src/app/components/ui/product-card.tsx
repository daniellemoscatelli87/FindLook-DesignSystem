import * as React from "react";
import { Heart, Flame, PackageCheck, RefreshCw, Bell, ChevronRight } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";
import { Selo } from "./selo";
import { IconeModa, type NomeIconeModa } from "./fashion-icons";

/**
 * ProductCard (card de peça)
 *
 * Card de uma peça na busca, nos favoritos ou na vitrine da loja. Segue a anatomia do Card do sistema:
 * superfície `--card`, borda `--border`, raio `--radius`, sombra `--shadow-sm`; imagem em superfície de apoio
 * (`--surface-tint`); ação principal com o Button padrão; favorito como botão de alternância com estado
 * acessível (aria-pressed); estoque sempre com ícone + texto, nunca só cor.
 *
 * Sempre presentes: estoque com quantidade e "Atualizado há …", acima do divisor; abaixo dele, só a ação.
 * Nome da peça em até duas linhas, com reticências.
 * Escassez: `quantidade <= estoque.poucasAte` (padrão 3) mostra a tag na primária ("Só 2 restantes" /
 * "Última peça") e a contagem na primária. Esgotada (0): imagem e textos em preto e branco, só o favorito
 * e o botão coloridos, botão "Avise-me" com sino.
 * `orientation="horizontal"`: imagem à esquerda, conteúdo à direita (listas e resultados em linha).
 * Desconto: `precoAntigo` mostra o preço anterior riscado, na primária, acima do atual; o percentual "-N%" fica ao lado do atual.
 * Ações: "Ver peça" (primária, com chevron) ou, esgotada, "Avise-me" (contorno na primária, com sino).
 */
export type ProductStock = {
  quantidade: number;
  /** Texto relativo, já formatado pelo produto: "há 2 h", "ontem", "há 3 dias". */
  atualizadoHa: string;
  /** Limite para a tag de escassez (inclusive). Padrão: 3. */
  poucasAte?: number;
};

export type ProductCardProps = Omit<React.HTMLAttributes<HTMLElement>, "title"> & {
  nome: string;
  loja: string;
  estilo?: string;
  preco: number | string;
  /** Preço anterior, quando há desconto: aparece riscado acima do atual, com o percentual calculado (só com números). */
  precoAntigo?: number | string;
  /** Peça recém-cadastrada: Selo "Novo" sobre a imagem, canto inferior esquerdo. */
  novo?: boolean;
  /** Imagem da peça; sem ela, um ícone de moda ocupa a área. */
  imagem?: { src: string; alt: string };
  icone?: NomeIconeModa;
  favorito?: boolean;
  onFavoritar?: (favorito: boolean) => void;
  estoque: ProductStock;
  cta?: { label?: string; href?: string; onClick?: () => void };
  /** Densidade compacta para listas em telas estreitas. */
  compacto?: boolean;
  orientation?: "vertical" | "horizontal";
};

const formatarPreco = (v: number | string) =>
  typeof v === "number" ? v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : v;

export function ProductCard({
  nome, loja, estilo, preco, precoAntigo, novo = false, imagem, icone = "camiseta", favorito = false, onFavoritar, estoque, cta, compacto = false, orientation = "vertical", className, ...props
}: ProductCardProps) {
  const [fav, setFav] = React.useState(favorito);
  React.useEffect(() => setFav(favorito), [favorito]);
  const toggle = () => { const v = !fav; setFav(v); onFavoritar?.(v); };
  const horizontal = orientation === "horizontal";
  const poucasAte = estoque.poucasAte ?? 3;
  const escasso = estoque.quantidade > 0 && estoque.quantidade <= poucasAte;
  const esgotado = estoque.quantidade <= 0;
  const Cta = cta?.href ? "a" : "button";
  const ctaLabel = cta?.label ?? (esgotado ? "Avise-me" : "Ver peça");
  const desconto = typeof preco === "number" && typeof precoAntigo === "number" && precoAntigo > preco ? Math.round((1 - preco / precoAntigo) * 100) : null;
  const tagCls = "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.08em] shadow-[var(--shadow-sm)]";
  // na vertical a tag de estoque fica sobre a imagem; na horizontal (imagem estreita) vai para o conteúdo
  const tagEstoque = escasso ? (
    <span className={cn(tagCls, "bg-primary text-primary-foreground")}><Flame className="h-3.5 w-3.5" aria-hidden />{estoque.quantidade === 1 ? "Última peça" : `Só ${estoque.quantidade} restantes`}</span>
  ) : esgotado ? (
    <span className={cn(tagCls, "bg-muted text-muted-foreground")}>Esgotada</span>
  ) : null;

  return (
    <article
      data-slot="product-card"
      data-orientation={orientation}
      className={cn(
        "group/pc overflow-hidden rounded-[var(--radius)] border border-border bg-card text-card-foreground shadow-[var(--shadow-sm)] transition-shadow duration-200 hover:shadow-[var(--shadow-md)]",
        horizontal ? "flex" : "flex flex-col",
        className,
      )}
      {...props}
    >
      {/* Imagem: a área em preto e branco quando esgotada; o favorito fica fora dela e mantém a cor */}
      <div className={cn("relative shrink-0", horizontal ? (compacto ? "w-28 sm:w-36" : "w-36 sm:w-48") : "w-full")}>
        <div className={cn("flex h-full items-center justify-center bg-[var(--surface-tint,var(--muted))]", horizontal ? "min-h-full" : compacto ? "aspect-[4/3]" : "aspect-square", esgotado && "grayscale")}>
          {imagem ? (
            <img src={imagem.src} alt={imagem.alt} className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <IconeModa nome={icone} size={compacto || horizontal ? 56 : 88} strokeWidth={1.5} className="text-[var(--primary-text,var(--primary))] opacity-80" titulo={nome} />
          )}
          {!horizontal && tagEstoque && <span className="absolute left-3 top-3">{tagEstoque}</span>}
          {novo && <span className="absolute bottom-3 left-3"><Selo size="sm" tone="primary" dot={false} className="bg-card shadow-[var(--shadow-sm)]">Novo</Selo></span>}
        </div>
        <button
          type="button"
          aria-pressed={fav}
          aria-label={fav ? `Remover ${nome} dos favoritos` : `Salvar ${nome} nos favoritos`}
          onClick={toggle}
          className={cn(
            "absolute right-3 top-3 inline-flex items-center justify-center rounded-full border bg-card shadow-[var(--shadow-sm)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            horizontal && compacto ? "h-8 w-8" : "h-10 w-10",
            fav ? "border-primary/20 text-primary" : "border-border text-muted-foreground hover:text-primary",
          )}
        >
          <Heart className={horizontal && compacto ? "h-4 w-4" : "h-5 w-5"} fill={fav ? "currentColor" : "none"} aria-hidden />
        </button>
      </div>

      {/* Conteúdo */}
      <div className={cn("flex min-w-0 flex-1 flex-col", compacto ? "gap-2 p-4" : horizontal ? "gap-2 p-4 sm:p-5" : "gap-3 p-5")}>
        <div className={cn("flex min-w-0 flex-1 flex-col", compacto || horizontal ? "gap-2" : "gap-3", esgotado && "grayscale")}>
          <div>
            {horizontal && tagEstoque && <div className="mb-2">{tagEstoque}</div>}
            <h3 className={cn("line-clamp-2 font-semibold tracking-[-0.01em] text-foreground", compacto || horizontal ? "text-[1rem]" : "text-[1.125rem]")} style={{ fontFamily: "var(--font-sans)" }} title={nome}>{nome}</h3>
            <p className="mt-0.5 truncate text-[0.875rem] text-muted-foreground">{loja}{estilo ? ` · ${estilo}` : ""}</p>
          </div>
          <div>
            {precoAntigo !== undefined && (
              <p className="text-[0.8125rem] font-semibold text-[var(--primary-text,var(--primary))] line-through decoration-[var(--primary-text,var(--primary))]/70"><span className="sr-only">De </span>{formatarPreco(precoAntigo)}</p>
            )}
            <p className="flex flex-wrap items-center gap-2">
              <span className={cn("font-bold tracking-[-0.02em] text-foreground", compacto || horizontal ? "text-[1.125rem]" : "text-[1.375rem]")}>{precoAntigo !== undefined && <span className="sr-only">por </span>}{formatarPreco(preco)}</span>
              {desconto !== null && desconto > 0 && (
                <span className="rounded-full bg-[var(--primary-muted)] px-2 py-0.5 text-[0.6875rem] font-bold text-[var(--primary-text,var(--primary))]">-{desconto}%</span>
              )}
            </p>
          </div>
          <div className="mt-auto flex flex-col gap-0.5 text-[0.75rem] text-muted-foreground">
            <span className={cn("inline-flex items-center gap-1 font-semibold", esgotado ? "text-muted-foreground" : escasso ? "text-[var(--primary-text,var(--primary))]" : "text-foreground")}>
              <PackageCheck className={cn("h-3.5 w-3.5", !esgotado && !escasso && "text-[var(--success)]")} aria-hidden />
              {esgotado ? "Sem peças no momento" : estoque.quantidade === 1 ? "1 disponível" : `${estoque.quantidade} disponíveis`}
            </span>
            <span className="inline-flex items-center gap-1"><RefreshCw className="h-3 w-3" aria-hidden />Atualizado {estoque.atualizadoHa}</span>
          </div>
        </div>
        <div className={cn("flex items-center border-t border-border", horizontal ? "pt-3" : "pt-4")}>
          <Button asChild={!!cta?.href} size={compacto || horizontal ? "sm" : "default"} variant={esgotado ? "outline" : "default"} className={cn("rounded-full px-5", esgotado && "border-primary text-[var(--primary-text,var(--primary))] hover:bg-[var(--primary-muted)] hover:text-[var(--primary-text,var(--primary))]")}>
            <Cta {...(cta?.href ? { href: cta.href } : { type: "button", onClick: cta?.onClick })}>
              {esgotado && <Bell aria-hidden />}{ctaLabel}{!esgotado && <ChevronRight aria-hidden />}
            </Cta>
          </Button>
        </div>
      </div>
    </article>
  );
}
