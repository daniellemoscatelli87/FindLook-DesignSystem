"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { ArrowDown, ArrowUp, ArrowUpDown, CheckIcon, EyeOff, MinusIcon } from "lucide-react";
import { cn } from "./utils";

/**
 * Tabela adaptável: a tabela das listas do painel (lojas, peças, agendamentos) que nunca rola para o lado (regra da
 * dona do produto, 18/11/2026). Ela mede a própria largura e:
 * - mostra as colunas que cabem, da mais importante para a menos importante (`prioridade`, menor = mais importante);
 *   as colunas `fixa` (nome, por exemplo) aparecem sempre; as que não couberem são avisadas embaixo da tabela
 *   ("Nesta largura ficam de fora: Público, Estilos.");
 * - abaixo de `larguraDaLista` (600 px de largura da própria tabela, padrão), vira lista: cada linha é um bloco com a
 *   primeira coluna fixa como título, as outras como "Rótulo: valor" embaixo, e as ações numa linha própria, alinhadas
 *   à borda esquerda do texto (regra das linhas no celular).
 * Seleção (opcional): caixa de 44 px no celular (a caixa desenhada tem 20 px, como o Checkbox), "selecionar todas" no
 * cabeçalho; linha selecionada no rosa do selecionado (--primary-suave); hover da linha cinza (--row-hover), de ponta
 * a ponta e sem cantos. Ordenação (opcional): botão no título da coluna com a seta da direção e aria-sort.
 * Vazio: `vazio` (use o EstadoVazio).
 * BarraDeFerramentasDaTabela: a faixa de cima (busca à esquerda; filtros, colunas e exportar à direita) e, embaixo,
 * os filtros aplicados. Quando a tabela é estreita, os botões descem para baixo da busca, alinhados à esquerda.
 */

export type ColunaAdaptavel<T> = {
  id: string;
  titulo: string;
  celula: (linha: T) => React.ReactNode;
  /** Largura mínima da coluna, em px (o espaço de que ela precisa para não espremer o conteúdo). */
  largura: number;
  prioridade?: number;
  fixa?: boolean;
  alinhar?: "inicio" | "fim";
  ordenavel?: boolean;
};

export type OrdemDaTabela = { coluna: string; direcao: "asc" | "desc" };

export type TabelaAdaptavelProps<T> = {
  colunas: ColunaAdaptavel<T>[];
  linhas: T[];
  chave: (linha: T) => string;
  /** Legenda da tabela (lida por leitores de tela; visível com `legendaVisivel`). */
  legenda: string;
  legendaVisivel?: boolean;
  /** Nome da linha para leitores de tela ("Selecionar Ateliê Aurora"). */
  rotuloDaLinha?: (linha: T) => string;
  selecionadas?: Set<string>;
  onSelecionadasChange?: (s: Set<string>) => void;
  acoes?: (linha: T) => React.ReactNode;
  /** Largura das ações, em px (padrão 56). */
  larguraDasAcoes?: number;
  ordem?: OrdemDaTabela;
  onOrdenar?: (o: OrdemDaTabela) => void;
  larguraDaLista?: number;
  vazio?: React.ReactNode;
  textoDoAviso?: (fora: string[]) => string;
  className?: string;
};

const foco = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const LARGURA_DA_SELECAO = 52;

/** Caixa de seleção com área de toque de 44 px no celular (36 px no computador); o desenho é o do Checkbox do DS. */
function CaixaDeSelecao({ marcada, onMarcadaChange, rotulo }: { marcada: boolean | "indeterminate"; onMarcadaChange: (v: boolean) => void; rotulo: string }) {
  return (
    <CheckboxPrimitive.Root
      checked={marcada}
      onCheckedChange={(v) => onMarcadaChange(v === true)}
      aria-label={rotulo}
      className={cn("group/caixa -m-3 flex size-9 shrink-0 items-center justify-center rounded-md sm:-m-2 toque:size-11", foco)}
    >
      <span
        aria-hidden
        className="flex size-5 items-center justify-center rounded-sm border border-[var(--border-strong)] bg-input-background text-primary-foreground transition-colors group-data-[state=checked]/caixa:border-primary group-data-[state=checked]/caixa:bg-primary group-data-[state=indeterminate]/caixa:border-primary group-data-[state=indeterminate]/caixa:bg-primary"
      >
        <CheckIcon className="hidden size-3.5 group-data-[state=checked]/caixa:block" strokeWidth={3} />
        <MinusIcon className="hidden size-3.5 group-data-[state=indeterminate]/caixa:block" strokeWidth={3} />
      </span>
    </CheckboxPrimitive.Root>
  );
}

const useLayoutSeguro = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

function useLargura<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  const [largura, setLargura] = React.useState<number | null>(null);
  useLayoutSeguro(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setLargura(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, largura };
}

export function TabelaAdaptavel<T>({
  colunas,
  linhas,
  chave,
  legenda,
  legendaVisivel = false,
  rotuloDaLinha,
  selecionadas,
  onSelecionadasChange,
  acoes,
  larguraDasAcoes = 56,
  ordem,
  onOrdenar,
  larguraDaLista = 600,
  vazio,
  textoDoAviso = (fora) => `Nesta largura ficam de fora: ${fora.join(", ")}.`,
  className,
}: TabelaAdaptavelProps<T>) {
  const { ref, largura } = useLargura<HTMLDivElement>();
  const selecionavel = Boolean(selecionadas && onSelecionadasChange);
  const lista = largura !== null && largura < larguraDaLista;

  // Colunas que cabem, por importância; mantém a ordem original na tela.
  const visiveis = React.useMemo(() => {
    if (largura === null) return new Set(colunas.map((c) => c.id));
    let livre = largura - (selecionavel ? LARGURA_DA_SELECAO : 0) - (acoes ? larguraDasAcoes : 0);
    const cabem = new Set<string>();
    for (const c of colunas.filter((c) => c.fixa)) { cabem.add(c.id); livre -= c.largura; }
    const resto = colunas.filter((c) => !c.fixa).sort((a, b) => (a.prioridade ?? 99) - (b.prioridade ?? 99));
    for (const c of resto) {
      if (c.largura <= livre) { cabem.add(c.id); livre -= c.largura; }
    }
    return cabem;
  }, [largura, colunas, selecionavel, acoes, larguraDasAcoes]);

  const mostradas = colunas.filter((c) => lista || visiveis.has(c.id));
  const fora = lista ? [] : colunas.filter((c) => !visiveis.has(c.id)).map((c) => c.titulo);
  const todas = linhas.length > 0 && linhas.every((l) => selecionadas?.has(chave(l)));
  const algumas = !todas && linhas.some((l) => selecionadas?.has(chave(l)));
  const marcar = (id: string, v: boolean) => {
    const n = new Set(selecionadas);
    if (v) n.add(id); else n.delete(id);
    onSelecionadasChange?.(n);
  };
  const marcarTodas = (v: boolean) => onSelecionadasChange?.(v ? new Set(linhas.map(chave)) : new Set());
  const nome = (l: T) => rotuloDaLinha?.(l) ?? chave(l);

  const cabecalhoDaColuna = (c: ColunaAdaptavel<T>) => {
    if (!c.ordenavel || !onOrdenar) return c.titulo;
    const atual = ordem?.coluna === c.id ? ordem.direcao : null;
    const Seta = atual === "asc" ? ArrowUp : atual === "desc" ? ArrowDown : ArrowUpDown;
    return (
      <button
        type="button"
        onClick={() => onOrdenar({ coluna: c.id, direcao: atual === "asc" ? "desc" : "asc" })}
        className={cn("-mx-2 inline-flex min-h-9 items-center gap-1 rounded-sm px-2 uppercase tracking-[0.06em] transition-colors hover:bg-accent hover:text-foreground", atual && "text-foreground", foco)}
      >
        {c.titulo}
        <Seta aria-hidden className="size-3.5" />
      </button>
    );
  };

  return (
    <div ref={ref} data-slot="tabela-adaptavel" data-modo={lista ? "lista" : "tabela"} className={cn("min-w-0", className)}>
      {linhas.length === 0 && vazio ? (
        <div className="p-4">{vazio}</div>
      ) : lista ? (
        <>
          <p className={legendaVisivel ? "m-0 px-4 pb-2 pt-4 text-body-sm font-semibold text-foreground" : "sr-only"}>{legenda}</p>
          {selecionavel && (
            <div className="flex items-center gap-3 border-b border-border px-4 py-1">
              <CaixaDeSelecao marcada={todas ? true : algumas ? "indeterminate" : false} onMarcadaChange={marcarTodas} rotulo="Selecionar todas" />
              <span aria-hidden className="text-body-sm text-muted-foreground">Selecionar todas</span>
            </div>
          )}
          <ul className="m-0 list-none p-0" aria-label={legenda}>
            {linhas.map((l) => {
              const id = chave(l);
              const marcada = selecionadas?.has(id) ?? false;
              const [titulo, ...resto] = mostradas.filter((c) => c.fixa).concat(mostradas.filter((c) => !c.fixa).sort((a, b) => (a.prioridade ?? 99) - (b.prioridade ?? 99)));
              return (
                <li
                  key={id}
                  data-selecionada={marcada || undefined}
                  className={cn("flex gap-3 border-b border-border px-4 py-3 transition-colors last:border-b-0", marcada ? "bg-[var(--primary-suave)]" : "hover:bg-[var(--row-hover)]")}
                >
                  {selecionavel && <div className="pt-1"><CaixaDeSelecao marcada={marcada} onMarcadaChange={(v) => marcar(id, v)} rotulo={`Selecionar ${nome(l)}`} /></div>}
                  <div className="min-w-0 flex-1">
                    {titulo && <div className="min-w-0 text-body-sm font-semibold text-foreground">{titulo.celula(l)}</div>}
                    {resto.length > 0 && (
                      <dl className="m-0 mt-2 grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1.5 text-body-sm">
                        {resto.map((c) => (
                          <React.Fragment key={c.id}>
                            <dt className="text-muted-foreground">{c.titulo}</dt>
                            <dd className="m-0 min-w-0 text-foreground [overflow-wrap:anywhere]">{c.celula(l)}</dd>
                          </React.Fragment>
                        ))}
                      </dl>
                    )}
                    {acoes && <div className="mt-2 flex flex-wrap items-center gap-2">{acoes(l)}</div>}
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <>
          <table className="w-full table-fixed border-collapse text-body-sm">
            <caption className={legendaVisivel ? "px-4 pb-2 pt-4 text-left text-body-sm font-semibold text-foreground" : "sr-only"}>{legenda}</caption>
            <colgroup>
              {selecionavel && <col style={{ width: LARGURA_DA_SELECAO }} />}
              {mostradas.map((c) => <col key={c.id} style={c.fixa ? undefined : { width: c.largura }} />)}
              {acoes && <col style={{ width: larguraDasAcoes }} />}
            </colgroup>
            <thead>
              <tr className="border-b border-border bg-muted">
                {selecionavel && (
                  <th scope="col" className="px-4 py-2 text-left">
                    <CaixaDeSelecao marcada={todas ? true : algumas ? "indeterminate" : false} onMarcadaChange={marcarTodas} rotulo="Selecionar todas" />
                  </th>
                )}
                {mostradas.map((c) => (
                  <th
                    key={c.id}
                    scope="col"
                    aria-sort={ordem?.coluna === c.id ? (ordem.direcao === "asc" ? "ascending" : "descending") : undefined}
                    className={cn("px-4 py-2 text-label font-semibold uppercase tracking-[0.06em] text-muted-foreground", c.alinhar === "fim" ? "text-right" : "text-left")}
                  >
                    {cabecalhoDaColuna(c)}
                  </th>
                ))}
                {acoes && <th scope="col" className="px-2 py-2"><span className="sr-only">Ações</span></th>}
              </tr>
            </thead>
            <tbody>
              {linhas.map((l) => {
                const id = chave(l);
                const marcada = selecionadas?.has(id) ?? false;
                return (
                  <tr key={id} data-selecionada={marcada || undefined} className={cn("border-b border-border transition-colors last:border-b-0", marcada ? "bg-[var(--primary-suave)]" : "hover:bg-[var(--row-hover)]")}>
                    {selecionavel && (
                      <td className="px-4 py-3 align-middle">
                        <CaixaDeSelecao marcada={marcada} onMarcadaChange={(v) => marcar(id, v)} rotulo={`Selecionar ${nome(l)}`} />
                      </td>
                    )}
                    {mostradas.map((c) => (
                      <td key={c.id} className={cn("px-4 py-3 align-middle text-foreground [overflow-wrap:anywhere]", c.alinhar === "fim" && "text-right", c.fixa && "font-semibold")}>
                        {c.celula(l)}
                      </td>
                    ))}
                    {acoes && <td className="px-2 py-3 text-right align-middle">{acoes(l)}</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {fora.length > 0 && (
            <p className="m-0 flex items-start gap-1.5 border-t border-border px-4 py-3 text-label text-muted-foreground" data-colunas-fora>
              <EyeOff aria-hidden className="mt-0.5 size-3.5 shrink-0" /> {textoDoAviso(fora)}
            </p>
          )}
        </>
      )}
    </div>
  );
}

/* ── Barra de ferramentas ── */
export function BarraDeFerramentasDaTabela({ busca, children, filtrosAtivos, className }: { busca?: React.ReactNode; children?: React.ReactNode; filtrosAtivos?: React.ReactNode; className?: string }) {
  return (
    <div data-slot="barra-de-ferramentas-da-tabela" className={cn("@container border-b border-border", className)}>
      <div className="flex flex-col gap-3 px-4 py-4 @3xl:flex-row @3xl:items-center @3xl:justify-between">
        {busca && <div className="min-w-0 flex-1 @3xl:max-w-sm">{busca}</div>}
        {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
      </div>
      {filtrosAtivos && <div className="px-4 pb-3">{filtrosAtivos}</div>}
    </div>
  );
}
