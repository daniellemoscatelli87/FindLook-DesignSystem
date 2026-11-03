import * as React from "react";
import { Heart, MapPin, Flame, PackageCheck, RefreshCw } from "lucide-react";
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
 * Estoque: `estoque.quantidade` mostra "N disponíveis"; quando `quantidade <= estoque.poucasAte` (padrão 3)
 * entra a tag de escassez na primária ("Só 2 restantes" / "Última peça") e a contagem fica na primária;
 * `estoque.atualizadoHa` informa a última atualização pela loja ("Atualizado há 2 h").
 * Esgotada (quantidade 0): imagem e textos em preto e branco, só o botão colorido, com o rótulo "Avise-me".
 */
export type ProductStock = {
  quantidade: number;
  /** Limite para a tag de escassez (inclusive). Padrão: 3. */
  poucasAte?: number;
  /** Texto relativo, já formatado pelo produto: "há 2 h", "ontem", "há 3 dias". */
  atualizadoHa?: string;
};

export type ProductCardProps = Omit<React.HTMLAttributes<HTMLElement>, "title"> & {
  nome: string;
  loja: string;
  estilo?: string;
  preco: number | string;
  bairro?: string;
  /** Peça recém-cadastrada: Selo "Novo" sobre a imagem, canto inferior esquerdo. */
  novo?: boolean;
  /** Imagem da peça; sem ela, um ícone de moda ocupa a área. */
  imagem?: { src: string; alt: string };
  icone?: NomeIconeModa;
  favorito?: boolean;
  onFavoritar?: (favorito: boolean) => void;
  estoque?: ProductStock;
  cta?: { label?: string; href?: string; onClick?: () => void };
  /** Densidade compacta para listas em telas estreitas. */
  compacto?: boolean;
};

const formatarPreco = (v: number | string) =>
  typeof v === "number" ? v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : v;

export function ProductCard({
  nome, loja, estilo, preco, bairro, novo = false, imagem, icone = "camiseta", favorito = false, onFavoritar, estoque, cta, compacto = false, className, ...props
}: ProductCardProps) {
  const [fav, setFav] = React.useState(favorito);
  const poucasAte = estoque?.poucasAte ?? 3;
  const escasso = !!estoque && estoque.quantidade > 0 && estoque.quantidade <= poucasAte;
  const esgotado = !!estoque && estoque.quantidade <= 0;
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
      <div className={cn("relative flex items-center justify-center bg-[var(--surface-tint,var(--muted))]", compacto ? "aspect-[4/3]" : "aspect-square", esgotado && "grayscale")}>
        {imagem ? (
          <img src={imagem.src} alt={imagem.alt} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <IconeModa nome={icone} size={compacto ? 56 : 88} strokeWidth={1.5} className="text-[var(--primary-text,var(--primary))] opacity-80" titulo={nome} />
        )}
        {escasso && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-primary-foreground shadow-[var(--shadow-sm)]">
            <Flame className="h-3.5 w-3.5" aria-hidden />{estoque!.quantidade === 1 ? "Última peça" : `Só ${estoque!.quantidade} restantes`}
          </span>
        )}
        {esgotado && (
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-card px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-muted-foreground shadow-[var(--shadow-sm)]">Esgotada</span>
        )}
        {novo && (
          <span className="absolute bottom-3 left-3"><Selo size="sm" tone="primary" dot={false} className="bg-card shadow-[var(--shadow-sm)]">Novo</Selo></span>
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
        <div className={cn("flex flex-1 flex-col", compacto ? "gap-2" : "gap-3", esgotado && "grayscale")}>
        {bairro && (
          <div className="flex items-center justify-end">
            <span className="inline-flex items-center gap-1 text-[0.75rem] font-semibold text-[var(--primary-text,var(--primary))]"><MapPin className="h-3.5 w-3.5" aria-hidden />{bairro}</span>
          </div>
        )}
        <div>
          <h3 className={cn("font-semibold tracking-[-0.01em] text-foreground", compacto ? "text-[1rem]" : "text-[1.125rem]")} style={{ fontFamily: "var(--font-sans)" }}>{nome}</h3>
          <p className="mt-0.5 text-[0.875rem] text-muted-foreground">{loja}{estilo ? ` · ${estilo}` : ""}</p>
        </div>
        <p className={cn("font-bold tracking-[-0.02em] text-foreground", compacto ? "text-[1.125rem]" : "text-[1.375rem]")}>{formatarPreco(preco)}</p>
        {estoque && (
          <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-border pt-3 text-[0.75rem] text-muted-foreground">
            <span className={cn("inline-flex items-center gap-1 font-semibold", esgotado ? "text-muted-foreground" : escasso ? "text-[var(--primary-text,var(--primary))]" : "text-foreground")}>
              <PackageCheck className={cn("h-3.5 w-3.5", !esgotado && !escasso && "text-[var(--success)]")} aria-hidden />
              {esgotado ? "Sem peças no momento" : estoque.quantidade === 1 ? "1 disponível" : `${estoque.quantidade} disponíveis`}
            </span>
            {estoque.atualizadoHa && (
              <span className="inline-flex items-center gap-1 whitespace-nowrap"><RefreshCw className="h-3 w-3" aria-hidden />Atualizado {estoque.atualizadoHa}</span>
            )}
          </div>
        )}
        </div>
        <div className={cn("flex items-center", !estoque && "mt-auto pt-1")}>
          <Button asChild={!!cta?.href} size={compacto ? "sm" : "default"} className="rounded-full px-5">
            <Cta {...(cta?.href ? { href: cta.href } : { type: "button", onClick: cta?.onClick })}>{cta?.label ?? (esgotado ? "Avise-me" : "Ver peça")}</Cta>
          </Button>
        </div>
      </div>
    </article>
  );
}
