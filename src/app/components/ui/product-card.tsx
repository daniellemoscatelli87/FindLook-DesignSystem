import * as React from "react";
import { Heart, MapPin, CheckCircle2, Clock } from "lucide-react";
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
 * acessível (aria-pressed); confirmação da peça sempre com ícone + texto, nunca só cor.
 */
export type ProductStatus = { tipo: "confirmado"; ha: string } | { tipo: "a-confirmar" };

export type ProductCardProps = Omit<React.HTMLAttributes<HTMLElement>, "title"> & {
  nome: string;
  loja: string;
  estilo?: string;
  preco: number | string;
  bairro?: string;
  /** Peça recém-cadastrada. */
  novo?: boolean;
  /** Imagem da peça; sem ela, um ícone de moda ocupa a área. */
  imagem?: { src: string; alt: string };
  icone?: NomeIconeModa;
  favorito?: boolean;
  onFavoritar?: (favorito: boolean) => void;
  status?: ProductStatus;
  cta?: { label?: string; href?: string; onClick?: () => void };
  /** Densidade compacta para listas em telas estreitas. */
  compacto?: boolean;
};

const formatarPreco = (v: number | string) =>
  typeof v === "number" ? v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : v;

export function ProductCard({
  nome, loja, estilo, preco, bairro, novo = false, imagem, icone = "camiseta", favorito = false, onFavoritar, status, cta, compacto = false, className, ...props
}: ProductCardProps) {
  const [fav, setFav] = React.useState(favorito);
  React.useEffect(() => setFav(favorito), [favorito]);
  const toggle = () => { const v = !fav; setFav(v); onFavoritar?.(v); };
  const Cta = cta?.href ? "a" : "button";
  return (
    <article
      data-slot="product-card"
      className={cn("group/pc flex flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-card text-card-foreground shadow-[var(--shadow-sm)] transition-shadow duration-200 hover:shadow-[var(--shadow-md)]", className)}
      {...props}
    >
      {/* Imagem */}
      <div className={cn("relative flex items-center justify-center bg-[var(--surface-tint,var(--muted))]", compacto ? "aspect-[4/3]" : "aspect-square")}>
        {imagem ? (
          <img src={imagem.src} alt={imagem.alt} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <IconeModa nome={icone} size={compacto ? 56 : 88} strokeWidth={1.5} className="text-[var(--primary-text,var(--primary))] opacity-80" titulo={nome} />
        )}
        <button
          type="button"
          aria-pressed={fav}
          aria-label={fav ? `Remover ${nome} dos favoritos` : `Salvar ${nome} nos favoritos`}
          onClick={toggle}
          className={cn(
            "absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border bg-card shadow-[var(--shadow-sm)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            fav ? "border-primary/20 text-primary" : "border-border text-muted-foreground hover:text-primary",
          )}
        >
          <Heart className="h-5 w-5" fill={fav ? "currentColor" : "none"} aria-hidden />
        </button>
      </div>

      {/* Conteúdo */}
      <div className={cn("flex flex-1 flex-col", compacto ? "gap-2 p-4" : "gap-3 p-5")}>
        {(novo || bairro) && (
          <div className="flex items-center justify-between gap-2">
            {novo ? <Selo size="sm" tone="primary" dot={false}>Novo</Selo> : <span />}
            {bairro && <span className="inline-flex items-center gap-1 text-[0.75rem] font-semibold text-[var(--primary-text,var(--primary))]"><MapPin className="h-3.5 w-3.5" aria-hidden />{bairro}</span>}
          </div>
        )}
        <div>
          <h3 className={cn("font-semibold tracking-[-0.01em] text-foreground", compacto ? "text-[1rem]" : "text-[1.125rem]")} style={{ fontFamily: "var(--font-sans)" }}>{nome}</h3>
          <p className="mt-0.5 text-[0.875rem] text-muted-foreground">{loja}{estilo ? ` · ${estilo}` : ""}</p>
        </div>
        <p className={cn("font-bold tracking-[-0.02em] text-foreground", compacto ? "text-[1.125rem]" : "text-[1.375rem]")}>{formatarPreco(preco)}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <Button asChild={!!cta?.href} size={compacto ? "sm" : "default"} className="rounded-full px-5">
            <Cta {...(cta?.href ? { href: cta.href } : { type: "button", onClick: cta?.onClick })}>{cta?.label ?? "Ver peça"}</Cta>
          </Button>
          {status && (status.tipo === "confirmado" ? (
            <span className="inline-flex items-center gap-1 text-[0.75rem] text-muted-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-[var(--success)]" aria-hidden />Confirmado {status.ha}</span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[0.75rem] text-muted-foreground"><Clock className="h-3.5 w-3.5" aria-hidden />A confirmar</span>
          ))}
        </div>
      </div>
    </article>
  );
}
