import * as React from "react";
import { ArrowRight, CalendarClock, CalendarPlus, CheckCircle2, ChevronDown, Circle, ClipboardCheck, GraduationCap, MapPin, MessageCircle, MoveRight, XCircle, type LucideIcon } from "lucide-react";
import { cn } from "./utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./dropdown-menu";

/**
 * Ativação de lojas (área administrativa da FindLook)
 *
 * ChipDeEtapa: a etapa da loja (A contatar, Contato, Visita, Cadastro, Sem interesse e, nas lojas parceiras,
 * Treinamento e Ativa), sempre com ícone e texto, no formato do Chip de status.
 * QuadroDeAtivacao: o quadro (kanban) do funil, sem rolagem horizontal: colunas lado a lado quando o quadro
 * tem 56rem ou mais; abaixo disso, uma embaixo da outra, abrindo e fechando pelo título. Arrastar funciona com
 * o mouse; no teclado e no toque, cada cartão tem o botão "Mover para", que faz o mesmo.
 * CartaoDoQuadro: o cartão da loja. O cartão inteiro abre a ficha; "Agendar" é uma ação à parte.
 *
 * Só apresentação: o produto decide as colunas, a ordem e o que acontece ao mover (onMover).
 */

const foco = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/* ── Etapas ──────────────────────────────────────────────────────── */
type EtapaDaLoja = "a_contatar" | "contato" | "visita" | "cadastro" | "sem_interesse" | "treinamento" | "ativa";

const ETAPAS_DA_LOJA: Record<EtapaDaLoja, { rotulo: string; Icone: LucideIcon; classe: string; cor: string }> = {
  a_contatar: { rotulo: "A contatar", Icone: Circle, classe: "bg-muted border-border", cor: "text-muted-foreground" },
  contato: { rotulo: "Contato", Icone: MessageCircle, classe: "bg-warning-muted border-warning/40", cor: "text-warning" },
  visita: { rotulo: "Visita", Icone: MapPin, classe: "bg-warning-muted border-warning/40", cor: "text-warning" },
  cadastro: { rotulo: "Cadastro", Icone: ClipboardCheck, classe: "bg-primary-muted border-primary/30", cor: "text-primary-text" },
  treinamento: { rotulo: "Treinamento", Icone: GraduationCap, classe: "bg-warning-muted border-warning/40", cor: "text-warning" },
  ativa: { rotulo: "Ativa", Icone: CheckCircle2, classe: "bg-success-muted border-success/30", cor: "text-success" },
  sem_interesse: { rotulo: "Sem interesse", Icone: XCircle, classe: "bg-card border-border", cor: "text-muted-foreground" },
};

function ChipDeEtapa({ etapa, rotulo, className }: { etapa: EtapaDaLoja; rotulo?: string; className?: string }) {
  const { rotulo: padrao, Icone, classe, cor } = ETAPAS_DA_LOJA[etapa];
  return (
    <span data-slot="chip-de-etapa" className={cn("inline-flex h-6 shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2 text-[0.6875rem] font-semibold text-foreground", classe, className)}>
      <Icone aria-hidden className={cn("size-3", cor)} />
      {rotulo ?? padrao}
    </span>
  );
}

function IconeDeEtapa({ etapa, className }: { etapa: EtapaDaLoja; className?: string }) {
  const { Icone } = ETAPAS_DA_LOJA[etapa];
  return <Icone aria-hidden className={className} />;
}

/* ── Quadro ──────────────────────────────────────────────────────── */
type ColunaDoQuadro<K extends string> = {
  id: K;
  titulo: string;
  /** Total da coluna (pode ser maior que os cartões mostrados). */
  quantidade: number;
  icone?: React.ReactNode;
  /** Linha curta abaixo do título (por exemplo, quantos % avançaram da etapa anterior). */
  subtitulo?: React.ReactNode;
  /** Texto da coluna vazia. */
  vazio: string;
  /** Abaixo dos cartões (por exemplo, "Ver todas as 24"). */
  rodape?: React.ReactNode;
};

type QuadroDeAtivacaoProps<K extends string, T> = {
  colunas: ColunaDoQuadro<K>[];
  itens: T[];
  chave: (item: T) => string;
  coluna: (item: T) => K;
  cartao: (item: T) => React.ReactNode;
  onMover?: (item: T, para: K) => void;
  podeMover?: (item: T, para: K) => boolean;
  /** Nome do quadro para leitores de tela. */
  rotulo: string;
  /** Nome do item (usado em "Mover Brechó Aurora"). */
  rotuloItem: (item: T) => string;
  rotuloMover?: string;
  rotuloMoverPara?: string;
  className?: string;
};

function QuadroDeAtivacao<K extends string, T>({
  colunas, itens, chave, coluna, cartao, onMover, podeMover = () => true, rotulo, rotuloItem, rotuloMover = "Mover", rotuloMoverPara = "Mover para", className,
}: QuadroDeAtivacaoProps<K, T>) {
  const [arrastando, setArrastando] = React.useState<string | null>(null);
  const [alvo, setAlvo] = React.useState<K | null>(null);
  const [fechadas, setFechadas] = React.useState<Set<K>>(() => new Set(colunas.filter((c) => c.quantidade === 0).map((c) => c.id)));
  const alternar = (id: K) => setFechadas((f) => { const n = new Set(f); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const emArraste = arrastando ? itens.find((t) => chave(t) === arrastando) : undefined;
  const idBase = React.useId();
  const podeArrastar = !!onMover;

  const soltar = (e: React.DragEvent, para: K) => {
    e.preventDefault();
    setAlvo(null);
    setArrastando(null);
    if (emArraste && coluna(emArraste) !== para && podeMover(emArraste, para)) onMover?.(emArraste, para);
  };

  return (
    <div data-slot="quadro-de-ativacao" className={cn("@container min-w-0", className)}>
      <div role="group" aria-label={rotulo} className="grid grid-cols-1 gap-3 @min-[56rem]:[grid-template-columns:repeat(var(--colunas),minmax(0,1fr))]" style={{ "--colunas": colunas.length } as React.CSSProperties}>
        {colunas.map((c) => {
          const daColuna = itens.filter((t) => coluna(t) === c.id);
          const aceita = emArraste ? coluna(emArraste) !== c.id && podeMover(emArraste, c.id) : false;
          const fechada = fechadas.has(c.id);
          const idLista = `${idBase}-${c.id}`;
          const cabecalho = (
            <>
              {c.icone && <span aria-hidden className="text-muted-foreground [&>svg]:size-4">{c.icone}</span>}
              <span className="min-w-0 flex-1 truncate text-left text-[0.8125rem] font-bold text-foreground">{c.titulo}</span>
              <span className="rounded-full border border-border bg-card px-2 py-0.5 text-[0.6875rem] font-semibold tabular-nums text-foreground">{c.quantidade}</span>
            </>
          );
          return (
            <section
              key={c.id}
              aria-label={`${c.titulo}: ${c.quantidade}`}
              onDragOver={(e) => { if (aceita) { e.preventDefault(); setAlvo(c.id); } }}
              onDragLeave={() => setAlvo((a) => (a === c.id ? null : a))}
              onDrop={(e) => soltar(e, c.id)}
              className={cn(
                "flex min-w-0 flex-col rounded-lg border bg-muted/40 p-2.5 transition-colors motion-reduce:transition-none",
                alvo === c.id ? "border-primary bg-primary-muted" : aceita ? "border-dashed border-primary/50" : "border-border",
              )}
            >
              <button type="button" onClick={() => alternar(c.id)} aria-expanded={!fechada} aria-controls={idLista} className={cn("flex items-center gap-2 rounded-sm px-1 py-0.5 @min-[56rem]:hidden", foco)}>
                {cabecalho}
                <ChevronDown aria-hidden className={cn("size-4 shrink-0 text-muted-foreground transition-transform motion-reduce:transition-none", !fechada && "rotate-180")} />
              </button>
              <h3 className="mb-2 hidden items-center gap-2 px-1 @min-[56rem]:flex">{cabecalho}</h3>
              <div id={idLista} className={cn("mt-2 flex-col @min-[56rem]:mt-0 @min-[56rem]:flex", fechada ? "hidden" : "flex")}>
                {c.subtitulo && <p className="-mt-1 mb-2 px-1 text-[0.6875rem] leading-snug text-muted-foreground">{c.subtitulo}</p>}
                <ul className="flex max-h-[26rem] min-h-16 flex-col gap-2 overflow-y-auto overscroll-contain p-0.5 [scrollbar-width:thin]">
                  {daColuna.length === 0 && <li className="rounded-md border border-dashed border-border px-3 py-4 text-center text-[0.75rem] text-muted-foreground">{c.vazio}</li>}
                  {daColuna.map((t) => {
                    const destinos = podeArrastar ? colunas.filter((d) => d.id !== c.id && podeMover(t, d.id)) : [];
                    return (
                      <li
                        key={chave(t)}
                        draggable={destinos.length > 0}
                        onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", chave(t)); setArrastando(chave(t)); }}
                        onDragEnd={() => { setArrastando(null); setAlvo(null); }}
                        className={cn(
                          "group relative flex min-w-0 items-start gap-1.5 rounded-md border border-border bg-card p-2.5 transition-[background-color,border-color,box-shadow] duration-150 has-[[data-cartao-link]:hover]:border-primary/30 has-[[data-cartao-link]:hover]:bg-primary-muted has-[[data-cartao-link]:hover]:shadow-[var(--shadow-xs)] motion-reduce:transition-none",
                          destinos.length > 0 && "cursor-grab active:cursor-grabbing",
                          arrastando === chave(t) && "opacity-50",
                        )}
                      >
                        <div className="min-w-0 flex-1">{cartao(t)}</div>
                        {destinos.length > 0 && (
                          <DropdownMenu>
                            <DropdownMenuTrigger aria-label={`${rotuloMover} ${rotuloItem(t)}`} className={cn("relative z-10 flex size-8 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground", foco)}>
                              <MoveRight aria-hidden className="size-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>{rotuloMoverPara}</DropdownMenuLabel>
                              {destinos.map((d) => (
                                <DropdownMenuItem key={d.id} onSelect={() => onMover?.(t, d.id)}>{d.titulo}</DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </li>
                    );
                  })}
                </ul>
                {c.rodape && <div className="mt-2 px-1">{c.rodape}</div>}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

/* ── Cartão ──────────────────────────────────────────────────────── */
type CartaoDoQuadroProps = {
  nome: string;
  /** Linha de apoio, por exemplo "Brechó · Batel". */
  detalhe?: string;
  /** Próximo agendamento, por exemplo "Visita qui, 20/11 · 14:00". */
  proximo?: string;
  /** Abre a ficha da loja: link (href) ou ação (onAbrir). O cartão inteiro é clicável. */
  href?: string;
  onAbrir?: () => void;
  rotuloAbrir?: string;
  onAgendar?: () => void;
  rotuloAgendar?: string;
};

function CartaoDoQuadro({ nome, detalhe, proximo, href, onAbrir, rotuloAbrir, onAgendar, rotuloAgendar = "Agendar" }: CartaoDoQuadroProps) {
  const classeLink = cn(
    "block w-full truncate rounded-sm text-left text-[0.8125rem] font-semibold text-foreground after:absolute after:inset-0 after:rounded-md after:content-[''] hover:text-primary-text",
    foco,
  );
  const aria = rotuloAbrir ?? `Abrir a ficha de ${nome}`;
  return (
    <>
      {href ? (
        <a href={href} onClick={onAbrir} draggable={false} data-cartao-link aria-label={aria} className={classeLink}>{nome}</a>
      ) : (
        <button type="button" onClick={onAbrir} draggable={false} data-cartao-link aria-label={aria} className={classeLink}>{nome}</button>
      )}
      {detalhe && <p className="truncate text-[0.75rem] text-muted-foreground">{detalhe}</p>}
      {proximo && (
        <p className="mt-1 flex items-start gap-1 text-[0.6875rem] font-semibold text-primary-text">
          <CalendarClock aria-hidden className="mt-px size-3 shrink-0" /> {proximo}
        </p>
      )}
      {onAgendar && (
        <button
          type="button"
          draggable={false}
          onClick={onAgendar}
          aria-label={`${rotuloAgendar} com ${nome}`}
          className={cn("relative z-10 mt-1.5 inline-flex h-7 items-center gap-1 rounded-sm border border-[var(--border-strong)] bg-card px-2 text-[0.75rem] font-medium text-foreground hover:bg-muted", foco)}
        >
          <CalendarPlus aria-hidden className="size-3.5" /> {rotuloAgendar}
        </button>
      )}
    </>
  );
}

/** "Ver todas as 24" no pé da coluna, quando há mais lojas do que cartões. */
function VerTodasDaColuna({ total, mostradas, href = "#", onClick }: { total: number; mostradas: number; href?: string; onClick?: () => void }) {
  if (total <= mostradas) return null;
  return (
    <a href={href} onClick={onClick} className={cn("inline-flex items-center gap-1 rounded-sm text-[0.75rem] font-semibold text-primary-text hover:underline", foco)}>
      Ver todas as {total} <ArrowRight aria-hidden className="size-3.5" />
    </a>
  );
}

export { ChipDeEtapa, IconeDeEtapa, ETAPAS_DA_LOJA, QuadroDeAtivacao, CartaoDoQuadro, VerTodasDaColuna };
export type { EtapaDaLoja, ColunaDoQuadro, QuadroDeAtivacaoProps, CartaoDoQuadroProps };
