import * as React from "react";
import { ArrowRight, CheckCircle2, Clock, Ban, Bookmark, FilePen, Heart, MoreHorizontal, Search, SlidersHorizontal, X, Eye, Pencil, Copy, Trash2, Send } from "lucide-react";
import { cn } from "./utils";
import { IconeModa, type NomeIconeModa } from "./fashion-icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { formatarNumero, formatarPreco } from "./painel-dados";

/**
 * Produtos no painel da loja (FindLook)
 *
 * AbasComContador (filtro por status, com quantidade), CelulaDeProduto (foto ou ícone, nome e
 * detalhes), MedidorDeDesempenho (barrinhas + número em texto), StatusDePublicacao (com motivo),
 * BarraDeAcoesEmLote e TabelaDeProdutos (busca, filtros, seleção, ações por linha, rodapé;
 * vira lista de cards em telas estreitas).
 */

const foco = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/* ── Abas com contador ───────────────────────────────────────── */
type Aba = { valor: string; rotulo: string; quantidade?: number };

function AbasComContador({ abas, valor, onChange, estilo = "pilula", rotulo = "Filtrar por status", className }: { abas: Aba[]; valor: string; onChange: (v: string) => void; estilo?: "pilula" | "sublinhado"; rotulo?: string; className?: string }) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const mover = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const n = e.key === "Home" ? 0 : e.key === "End" ? abas.length - 1 : (i + dir + abas.length) % abas.length;
    refs.current[n]?.focus();
    onChange(abas[n]!.valor);
  };
  return (
    <div role="tablist" aria-label={rotulo} data-slot="abas-com-contador" className={cn("flex max-w-full gap-1 overflow-x-auto", estilo === "pilula" ? "rounded-[12px] border border-border bg-muted/50 p-1" : "border-b border-border", className)}>
      {abas.map((a, i) => {
        const ativa = a.valor === valor;
        return (
          <button
            key={a.valor}
            ref={el => { refs.current[i] = el; }}
            type="button"
            role="tab"
            aria-selected={ativa}
            tabIndex={ativa ? 0 : -1}
            onClick={() => onChange(a.valor)}
            onKeyDown={e => mover(e, i)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap px-3 text-[0.8125rem] font-medium transition-colors",
              foco,
              estilo === "pilula"
                ? cn("h-8 rounded-[9px]", ativa ? "bg-primary text-primary-foreground shadow-[var(--shadow-xs)]" : "text-foreground hover:bg-card")
                : cn("-mb-px h-10 border-b-2", ativa ? "border-primary font-semibold text-[var(--primary-text,var(--primary))]" : "border-transparent text-muted-foreground hover:text-foreground"),
            )}
          >
            {a.rotulo}
            {a.quantidade !== undefined && <span className={cn("tabular-nums", estilo === "pilula" && !ativa && "text-muted-foreground")}>({formatarNumero(a.quantidade)})</span>}
          </button>
        );
      })}
    </div>
  );
}

/* ── Célula de produto ───────────────────────────────────────── */
function CelulaDeProduto({ nome, detalhes, icone, foto, className }: { nome: string; detalhes?: string; icone?: NomeIconeModa; foto?: string; className?: string }) {
  return (
    <div data-slot="celula-de-produto" className={cn("flex min-w-0 items-center gap-3", className)}>
      <span aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-border bg-muted text-[var(--primary-text,var(--primary))]">
        {foto ? <img src={foto} alt="" className="h-full w-full object-cover" /> : icone ? <IconeModa nome={icone} size={26} /> : null}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[0.875rem] font-semibold text-foreground">{nome}</span>
        {detalhes && <span className="block truncate text-[0.75rem] text-muted-foreground">{detalhes}</span>}
      </span>
    </div>
  );
}

/* ── Medidor de desempenho ───────────────────────────────────── */
/** nivel de 0 a 5. Sempre acompanhado do número em texto. */
function MedidorDeDesempenho({ nivel, visualizacoes, favoritos, className }: { nivel: number; visualizacoes: number; favoritos?: number; className?: string }) {
  return (
    <div data-slot="medidor-de-desempenho" className={cn("flex items-center gap-3 whitespace-nowrap", className)}>
      <span aria-hidden className="flex h-4 items-end gap-[3px]">
        {[1, 2, 3, 4, 5].map(b => (
          <span key={b} className={cn("w-[4px] rounded-[2px]", b <= nivel ? "bg-primary" : "bg-muted-foreground/25")} style={{ height: `${6 + b * 2}px` }} />
        ))}
      </span>
      <span className="text-[0.75rem] text-foreground"><span className="sr-only">Desempenho {nivel} de 5: </span>{formatarNumero(visualizacoes)} visualizações</span>
      {favoritos !== undefined && (
        <span className="inline-flex items-center gap-1 text-[0.75rem] text-foreground">
          <Heart aria-hidden className="h-3.5 w-3.5 text-[var(--primary-text,var(--primary))]" />
          {formatarNumero(favoritos)}<span className="sr-only"> favoritos</span>
        </span>
      )}
    </div>
  );
}

/* ── Status de publicação ────────────────────────────────────── */
type StatusProduto = "publicado" | "pendente" | "esgotado" | "reservado" | "rascunho";

const statusInfo: Record<StatusProduto, { rotulo: string; Icone: React.ElementType; cor: string; fundo: string }> = {
  publicado: { rotulo: "Publicado", Icone: CheckCircle2, cor: "text-success", fundo: "border-success/30 bg-success/10" },
  pendente:  { rotulo: "Pendente",  Icone: Clock,        cor: "text-warning", fundo: "border-warning/40 bg-warning/10" },
  esgotado:  { rotulo: "Esgotado",  Icone: Ban,          cor: "text-muted-foreground", fundo: "border-border bg-muted" },
  reservado: { rotulo: "Reservado", Icone: Bookmark,     cor: "text-[var(--primary-text,var(--primary))]", fundo: "border-primary/30 bg-[var(--primary-muted)]" },
  rascunho:  { rotulo: "Rascunho",  Icone: FilePen,      cor: "text-muted-foreground", fundo: "border-border bg-card" },
};

function StatusDePublicacao({ status, motivo, className }: { status: StatusProduto; motivo?: string; className?: string }) {
  const s = statusInfo[status];
  return (
    <div data-slot="status-de-publicacao" className={cn("min-w-0", className)}>
      <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.75rem] font-semibold text-foreground", s.fundo)}>
        <s.Icone aria-hidden className={cn("h-3.5 w-3.5", s.cor)} />
        {s.rotulo}
      </span>
      {motivo && <p className="mt-1 text-[0.75rem] leading-snug text-muted-foreground">{motivo}</p>}
    </div>
  );
}

/* ── Barra de ações em lote ──────────────────────────────────── */
function BarraDeAcoesEmLote({ selecionados, onLimpar, acoes, className }: { selecionados: number; onLimpar: () => void; acoes: { rotulo: string; icone: React.ReactNode; destrutiva?: boolean; onClick?: () => void }[]; className?: string }) {
  if (!selecionados) return null;
  return (
    <div data-slot="acoes-em-lote" role="region" aria-label="Ações para os produtos selecionados" className={cn("flex flex-wrap items-center gap-2 rounded-[12px] border border-primary/25 bg-[var(--primary-muted)] px-3 py-2", className)}>
      <p className="mr-auto text-[0.8125rem] font-semibold text-foreground" aria-live="polite">{selecionados} {selecionados === 1 ? "produto selecionado" : "produtos selecionados"}</p>
      {acoes.map(a => (
        <button key={a.rotulo} type="button" onClick={a.onClick} className={cn("inline-flex h-8 items-center gap-1.5 rounded-[8px] border bg-card px-3 text-[0.8125rem] font-medium transition-colors hover:bg-muted [&>svg]:h-4 [&>svg]:w-4", a.destrutiva ? "border-error/40 text-error" : "border-border text-foreground", foco)}>
          {a.icone}{a.rotulo}
        </button>
      ))}
      <button type="button" onClick={onLimpar} aria-label="Limpar seleção" className={cn("flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-card hover:text-foreground", foco)}>
        <X aria-hidden className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ── Tabela de produtos ──────────────────────────────────────── */
type Produto = {
  id: string;
  nome: string;
  detalhes: string;
  icone?: NomeIconeModa;
  foto?: string;
  condicao: "Nova" | "Usada";
  estoque: number;
  preco: number;
  nivel: number;
  visualizacoes: number;
  favoritos: number;
  status: StatusProduto;
  motivo?: string;
};

type TabelaDeProdutosProps = {
  produtos: Produto[];
  /** Total de produtos da loja (para o rodapé e para a aba "Todos"). */
  total?: number;
  /** Mostra só N linhas e o link "Ver todos os produtos". */
  limite?: number;
  /** Seleção com caixas e ações em lote. */
  selecionavel?: boolean;
  estiloAbas?: "pilula" | "sublinhado";
  /** Ação do link "Ver todos os produtos" (rodapé da prévia). */
  onVerTodos?: () => void;
  /** Quantidade real por status (quando a lista mostra só parte das peças). */
  contagens?: Partial<Record<StatusProduto, number>>;
  className?: string;
};

const abasStatus: { valor: "todos" | StatusProduto; rotulo: string }[] = [
  { valor: "todos", rotulo: "Todos" }, { valor: "publicado", rotulo: "Publicados" }, { valor: "pendente", rotulo: "Pendentes" },
  { valor: "esgotado", rotulo: "Esgotados" }, { valor: "reservado", rotulo: "Reservados" },
];

function TabelaDeProdutos({ produtos, total, limite, selecionavel = true, estiloAbas = "pilula", contagens, onVerTodos, className }: TabelaDeProdutosProps) {
  const [aba, setAba] = React.useState("todos");
  const [busca, setBusca] = React.useState("");
  const [selecionados, setSelecionados] = React.useState<string[]>([]);
  const idBusca = React.useId();

  const contagem = (v: string) => (v === "todos" ? (total ?? produtos.length) : (contagens?.[v as StatusProduto] ?? produtos.filter(p => p.status === v).length));
  const filtrados = produtos.filter(p => (aba === "todos" || p.status === aba) && (!busca || `${p.nome} ${p.detalhes}`.toLowerCase().includes(busca.toLowerCase())));
  const visiveis = limite ? filtrados.slice(0, limite) : filtrados;
  const todosMarcados = visiveis.length > 0 && visiveis.every(p => selecionados.includes(p.id));
  const algunsMarcados = visiveis.some(p => selecionados.includes(p.id)) && !todosMarcados;
  const alternar = (id: string) => setSelecionados(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const alternarTodos = () => setSelecionados(s => todosMarcados ? s.filter(id => !visiveis.some(p => p.id === id)) : Array.from(new Set([...s, ...visiveis.map(p => p.id)])));

  const caixa = "h-4 w-4 shrink-0 cursor-pointer rounded-[4px] accent-[var(--primary)]";

  const MenuDaLinha = ({ p }: { p: Produto }) => (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label={`Ações de ${p.nome}`} className={cn("flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", foco)}>
        <MoreHorizontal aria-hidden className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuItem><Eye />Ver na vitrine</DropdownMenuItem>
        <DropdownMenuItem><Pencil />Editar</DropdownMenuItem>
        <DropdownMenuItem><Copy />Duplicar</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive"><Trash2 />Excluir</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div data-slot="tabela-de-produtos" className={cn("@container min-w-0 space-y-3", className)}>
      <div className="flex flex-col gap-3 @3xl:flex-row @3xl:items-center @3xl:justify-between">
        <AbasComContador abas={abasStatus.map(a => ({ ...a, quantidade: contagem(a.valor) }))} valor={aba} onChange={setAba} estilo={estiloAbas} />
        <div className="flex gap-2">
          <div className="relative min-w-0 flex-1 @3xl:w-64 @3xl:flex-none">
            <label htmlFor={idBusca} className="sr-only">Buscar produto</label>
            <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input id={idBusca} type="search" value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar produto, SKU ou categoria…" className={cn("h-9 w-full rounded-[10px] border border-border bg-card pl-9 pr-3 text-[0.8125rem] text-foreground placeholder:text-muted-foreground", foco)} />
          </div>
          <button type="button" className={cn("inline-flex h-9 shrink-0 items-center gap-1.5 rounded-[10px] border border-border bg-card px-3 text-[0.8125rem] font-medium text-foreground transition-colors hover:bg-muted", foco)}>
            <SlidersHorizontal aria-hidden className="h-4 w-4" />Filtros
          </button>
        </div>
      </div>

      {selecionavel && (
        <BarraDeAcoesEmLote
          selecionados={selecionados.length}
          onLimpar={() => setSelecionados([])}
          acoes={[{ rotulo: "Publicar", icone: <Send aria-hidden /> }, { rotulo: "Marcar como esgotado", icone: <Ban aria-hidden /> }, { rotulo: "Excluir", icone: <Trash2 aria-hidden />, destrutiva: true }]}
        />
      )}

      {/* Tabela (telas largas) */}
      <div className="relative hidden overflow-x-auto rounded-[12px] border border-border @2xl:block">
        <table className="w-full text-left">
          <caption className="sr-only">Produtos da loja{aba !== "todos" ? `, filtro: ${abasStatus.find(a => a.valor === aba)?.rotulo}` : ""}</caption>
          <thead className="bg-muted/50 text-[0.75rem] font-semibold text-muted-foreground">
            <tr>
              {selecionavel && (
                <th scope="col" className="w-10 px-3 py-2.5">
                  <input type="checkbox" className={caixa} aria-label="Selecionar todos os produtos visíveis" checked={todosMarcados} ref={el => { if (el) el.indeterminate = algunsMarcados; }} onChange={alternarTodos} />
                </th>
              )}
              <th scope="col" className="px-3 py-2.5">Produto</th>
              <th scope="col" className="hidden px-3 py-2.5 @4xl:table-cell">Condição</th>
              <th scope="col" className="hidden px-3 py-2.5 text-right @4xl:table-cell">Estoque</th>
              <th scope="col" className="px-3 py-2.5 text-right">Preço</th>
              <th scope="col" className="hidden px-3 py-2.5 @4xl:table-cell">Desempenho (30 dias)</th>
              <th scope="col" className="px-3 py-2.5">Status</th>
              <th scope="col" className="px-3 py-2.5"><span className="sr-only">Ações</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {visiveis.map(p => {
              const marcado = selecionados.includes(p.id);
              return (
                <tr key={p.id} className={cn("transition-colors hover:bg-muted/40", marcado && "bg-[var(--primary-muted)]")}>
                  {selecionavel && <td className="px-3 py-3"><input type="checkbox" className={caixa} aria-label={`Selecionar ${p.nome}`} checked={marcado} onChange={() => alternar(p.id)} /></td>}
                  <td className="max-w-64 px-3 py-3"><CelulaDeProduto nome={p.nome} detalhes={p.detalhes} icone={p.icone} foto={p.foto} /><div className="mt-1 space-y-1 pl-[3.75rem] @4xl:hidden"><p className="text-[0.75rem] text-muted-foreground">{p.condicao} · {p.estoque} em estoque</p><MedidorDeDesempenho nivel={p.nivel} visualizacoes={p.visualizacoes} favoritos={p.favoritos} /></div></td>
                  <td className="hidden px-3 py-3 @4xl:table-cell"><span className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-[0.75rem] text-foreground">{p.condicao}</span></td>
                  <td className="hidden px-3 py-3 text-right text-[0.875rem] tabular-nums text-foreground @4xl:table-cell">{p.estoque}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-right text-[0.875rem] font-semibold tabular-nums text-foreground">{formatarPreco(p.preco)}</td>
                  <td className="hidden px-3 py-3 @4xl:table-cell"><MedidorDeDesempenho nivel={p.nivel} visualizacoes={p.visualizacoes} favoritos={p.favoritos} /></td>
                  <td className="max-w-44 px-3 py-3"><StatusDePublicacao status={p.status} motivo={p.motivo} /></td>
                  <td className="px-3 py-3 text-right"><MenuDaLinha p={p} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Lista de cards (telas estreitas) */}
      <ul className="space-y-2 @2xl:hidden" aria-label="Produtos da loja">
        {visiveis.map(p => {
          const marcado = selecionados.includes(p.id);
          return (
            <li key={p.id} className={cn("rounded-[12px] border border-border bg-card p-3", marcado && "border-primary/40 bg-[var(--primary-muted)]")}>
              <div className="flex items-start gap-3">
                {selecionavel && <input type="checkbox" className={cn(caixa, "mt-4")} aria-label={`Selecionar ${p.nome}`} checked={marcado} onChange={() => alternar(p.id)} />}
                <CelulaDeProduto nome={p.nome} detalhes={`${p.detalhes} · ${p.condicao}`} icone={p.icone} foto={p.foto} className="flex-1" />
                <MenuDaLinha p={p} />
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[0.9375rem] font-bold tabular-nums text-foreground">{formatarPreco(p.preco)} <span className="text-[0.75rem] font-normal text-muted-foreground">· {p.estoque} em estoque</span></span>
                <StatusDePublicacao status={p.status} />
              </div>
              {p.motivo && <p className="mt-1 text-[0.75rem] text-muted-foreground">{p.motivo}</p>}
              <MedidorDeDesempenho nivel={p.nivel} visualizacoes={p.visualizacoes} favoritos={p.favoritos} className="mt-2" />
            </li>
          );
        })}
      </ul>

      {visiveis.length === 0 && (
        <div className="rounded-[12px] border border-dashed border-border p-8 text-center">
          <p className="text-[0.9375rem] font-semibold text-foreground">Nenhum produto encontrado</p>
          <p className="mt-1 text-[0.8125rem] text-muted-foreground">Tente outra palavra ou limpe os filtros.</p>
        </div>
      )}

      {limite !== undefined && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-1">
          <p className="text-[0.8125rem] text-muted-foreground">Exibindo {visiveis.length} de {formatarNumero(contagem(aba))} produtos</p>
          <a href="#" onClick={e => { if (onVerTodos) { e.preventDefault(); onVerTodos(); } }} className={cn("inline-flex items-center gap-1 rounded-[6px] text-[0.8125rem] font-semibold text-[var(--primary-text,var(--primary))] hover:underline", foco)}>
            Ver todos os produtos <ArrowRight aria-hidden className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </div>
  );
}

export { AbasComContador, CelulaDeProduto, MedidorDeDesempenho, StatusDePublicacao, BarraDeAcoesEmLote, TabelaDeProdutos, statusInfo };
export type { Produto, StatusProduto, Aba };
