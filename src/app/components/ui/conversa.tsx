"use client";

import * as React from "react";
import { Check, CheckCheck, Clock, Eye, Loader2, MousePointerClick, Paperclip, SendHorizontal, X, XCircle } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";
import { Input } from "./input";

/**
 * Conversa (WhatsApp da loja e simulador do robô). Conversa, BalaoDaConversa, SeparadorDaConversa e
 * IndicadorDeDigitacao têm a mesma API do design system Dani Moscatelli:
 * - Conversa: a lista (role="log"). alinhamento "esquerda" (padrão: todas na mesma borda, como um histórico) ou
 *   "lados" (as suas à direita, como num chat: use no WhatsApp). A mais no FindLook: `rolagem` (área com rolagem
 *   própria e fundo cinza, que desce sozinha até a última mensagem).
 * - BalaoDaConversa: autor "eu" (cinza de apoio, --secondary) ou "outro" (card com borda); nunca a primária cheia nem o
 *   rosa de selecionado (balão não é botão nem seleção). Nome, texto, hora (`quando`) e o estado do envio em ícone +
 *   texto (enviando, enviada, lida, aberto, clicado, não enviada), na mesma borda do texto. `depois` vai embaixo do
 *   balão (as respostas rápidas). A mais no FindLook: `citacao` (a peça respondida) e `imagem`.
 * - SeparadorDaConversa: "Hoje", "24 de novembro", "O robô foi reiniciado".
 * - IndicadorDeDigitacao: três pontos que sobem um depois do outro; a mais no FindLook, `texto` e `icone` para um
 *   balão de etapa ("Procurando peças parecidas…").
 * Peças do FindLook: MolduraDeCelular (o aparelho, palco da FolhaDeOpcoes), CabecalhoDaConversa, BotaoDeResposta
 * (resposta rápida, 44 px, hover cinza), CampoDeMensagem (anexar, texto, enviar) e FolhaDeOpcoes (a lista do
 * WhatsApp, que abre por baixo: foco no primeiro item, Esc e o fundo fecham, Tab circula dentro).
 * Com "menos movimento", balões e folhas aparecem sem deslizar e os pontos ficam parados.
 */

const foco = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/* ── Moldura ── */
export function MolduraDeCelular({ className, children, rotulo = "Celular", ...props }: React.HTMLAttributes<HTMLElement> & { rotulo?: string }) {
  return (
    <section
      aria-label={rotulo}
      data-slot="moldura-de-celular"
      className={cn("relative mx-auto flex h-160 max-h-[calc(100dvh-4rem)] min-h-120 w-full max-w-sm flex-col overflow-clip rounded-xl border-[6px] border-foreground bg-background shadow-[var(--shadow-lg)]", className)}
      {...props}
    >
      {children}
    </section>
  );
}

/* ── Cabeçalho ── */
export function CabecalhoDaConversa({ nome, status, digitando = false, foto, simbolo, acoes, className }: { nome: string; status?: string; digitando?: boolean; foto?: string; simbolo?: React.ReactNode; acoes?: React.ReactNode; className?: string }) {
  return (
    <div data-slot="cabecalho-da-conversa" className={cn("flex shrink-0 items-center gap-3 border-b border-border bg-card px-4 py-3", className)}>
      {foto ? (
        <img src={foto} alt="" className="size-10 shrink-0 rounded-full object-cover" />
      ) : (
        <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary-muted)] text-primary-text [&>svg]:size-6">{simbolo}</span>
      )}
      <div className="min-w-0 flex-1">
        <p className="m-0 truncate text-body font-bold text-foreground">{nome}</p>
        {(status || digitando) && (
          <p className="m-0 truncate text-label text-muted-foreground" aria-hidden>
            {digitando ? <span className="font-semibold text-primary-text">digitando…</span> : status}
          </p>
        )}
      </div>
      {acoes}
    </div>
  );
}

/* ── Área das mensagens ── */
type Autor = "eu" | "outro";
const AlinhamentoDaConversa = React.createContext<"esquerda" | "lados">("esquerda");
const apoioNoCinza = "text-[color:color-mix(in_oklab,var(--muted-foreground)_85%,var(--foreground))]";

export type ConversaProps = React.ComponentProps<"div"> & {
  rotulo?: string;
  /** "esquerda" (padrão): todas na mesma borda, como um histórico; "lados": as suas à direita, como num chat. */
  alinhamento?: "esquerda" | "lados";
  /** FindLook: área com rolagem própria (dentro da MolduraDeCelular), fundo cinza e rolagem até a última mensagem. */
  rolagem?: boolean;
};

export function Conversa({ className, children, rotulo = "Conversa", alinhamento = "esquerda", rolagem = false, ...props }: ConversaProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !rolagem) return;
    const menos = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: el.scrollHeight, behavior: menos ? "auto" : "smooth" });
  }, [children, rolagem]);
  return (
    <AlinhamentoDaConversa.Provider value={alinhamento}>
      <div
        ref={ref}
        role="log"
        aria-label={rotulo}
        data-slot="conversa"
        data-alinhamento={alinhamento}
        tabIndex={rolagem ? 0 : undefined}
        className={cn(
          "flex flex-col gap-3",
          rolagem && "min-h-0 flex-1 overflow-y-auto overscroll-contain bg-muted px-3 py-4 [scrollbar-width:thin] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </AlinhamentoDaConversa.Provider>
  );
}

/* ── Balão ── */
/* Estado da mensagem enviada, sempre em ícone + texto visível. */
const ESTADOS = {
  enviando: { Icone: Clock, texto: "Enviando" },
  enviada: { Icone: Check, texto: "Enviada" },
  lida: { Icone: CheckCheck, texto: "Lida" },
  aberto: { Icone: Eye, texto: "Aberto" },
  clicado: { Icone: MousePointerClick, texto: "Clicado" },
  erro: { Icone: XCircle, texto: "Não enviada" },
} as const;

export type BalaoDaConversaProps = Omit<React.ComponentProps<"div">, "children"> & {
  autor: Autor;
  nome?: React.ReactNode;
  quando?: React.ReactNode;
  avatar?: React.ReactNode;
  estado?: keyof typeof ESTADOS;
  /** Troca o texto do estado (por exemplo, "Lida às 10:05"). */
  textoDoEstado?: string;
  /** Mensagem recebida que ainda não foi lida: ponto na primária e "Não lida" em texto. */
  naoLida?: boolean;
  /** Anexos ou ações depois do balão (no FindLook, as respostas rápidas: BotaoDeResposta). */
  depois?: React.ReactNode;
  /** FindLook: a peça respondida, no topo do balão. */
  citacao?: { texto: string; imagem?: string };
  /** FindLook: foto enviada, antes do texto. */
  imagem?: { src: string; alt: string };
  children?: React.ReactNode;
};

export function BalaoDaConversa({ autor, nome, quando, avatar, estado, textoDoEstado, naoLida, depois, citacao, imagem, children, className, ...props }: BalaoDaConversaProps) {
  const eu = autor === "eu";
  const alinhamento = React.useContext(AlinhamentoDaConversa);
  const aDireita = eu && alinhamento === "lados";
  const est = estado ? ESTADOS[estado] : null;
  return (
    <div
      data-slot="balao-da-conversa"
      data-autor={autor}
      className={cn("flex items-end gap-2 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-[var(--duration-normal)]", aDireita ? "flex-row-reverse" : "flex-row", className)}
      {...props}
    >
      {avatar && <span className="shrink-0">{avatar}</span>}
      <div className={cn("flex min-w-0 max-w-[85%] flex-col gap-2 sm:max-w-[80%]", aDireita ? "items-end" : "items-stretch")}>
        <div
          className={cn(
            "min-w-0 rounded-lg px-4 py-3 text-body-sm leading-relaxed",
            eu ? "bg-secondary text-secondary-foreground" : "border border-border bg-card text-card-foreground",
            aDireita ? "rounded-br-sm" : "rounded-bl-sm",
          )}
        >
          {(nome || naoLida) && (
            <p className="m-0 mb-1 flex flex-wrap items-center gap-x-2 text-label font-semibold text-foreground">
              {nome}
              {naoLida && <span className="inline-flex items-center gap-1 text-primary-text"><span aria-hidden className="size-2 rounded-full bg-primary" />Não lida</span>}
            </p>
          )}
          {citacao && (
            <span className="mb-2 flex items-center gap-2 rounded-sm border-l-4 border-primary bg-card/60 py-1 pl-2 pr-1">
              <span className="min-w-0 flex-1"><span className="sr-only">Respondendo a: </span><span className="block truncate text-label font-semibold">{citacao.texto}</span></span>
              {citacao.imagem && <img src={citacao.imagem} alt="" className="size-9 shrink-0 rounded-sm object-cover" />}
            </span>
          )}
          {imagem && <img src={imagem.src} alt={imagem.alt} loading="lazy" className="mb-2 max-h-56 w-full rounded-md bg-muted object-cover" />}
          {children && <div className="whitespace-pre-line [overflow-wrap:anywhere]">{children}</div>}
          {(quando || est) && (
            <p className={cn("m-0 mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-label", eu ? apoioNoCinza : "text-muted-foreground")}>
              {quando}
              {est && (
                <span className={cn("inline-flex items-center gap-1", estado === "erro" && "font-semibold text-error-text")}>
                  <est.Icone aria-hidden className={cn("size-3.5", estado === "enviando" && "motion-safe:animate-pulse")} />
                  <span>{textoDoEstado ?? est.texto}</span>
                </span>
              )}
            </p>
          )}
        </div>
        {depois && <div className="grid w-full gap-2">{depois}</div>}
      </div>
    </div>
  );
}

/* ── Separador ── */
export function SeparadorDaConversa({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div data-slot="separador-da-conversa" role="separator" aria-label={typeof children === "string" ? children : undefined} className={cn("my-2 flex items-center gap-3 text-label font-medium text-muted-foreground", className)}>
      <span aria-hidden className="h-px flex-1 bg-border" />
      <span aria-hidden>{children}</span>
      <span aria-hidden className="h-px flex-1 bg-border" />
    </div>
  );
}

/* ── Digitando ── */
export function IndicadorDeDigitacao({ autor = "outro", avatar, rotulo = "Digitando", texto, icone, className }: {
  autor?: Autor; avatar?: React.ReactNode; rotulo?: string;
  /** FindLook: em vez dos pontos, um balão de etapa ("Procurando peças parecidas…") com o ícone pulsando. */
  texto?: string; icone?: React.ReactNode; className?: string;
}) {
  const alinhamento = React.useContext(AlinhamentoDaConversa);
  const aDireita = autor === "eu" && alinhamento === "lados";
  const balao = cn("inline-flex min-h-10 items-center gap-2 rounded-lg px-4", autor === "eu" ? "bg-secondary" : "border border-border bg-card", aDireita ? "rounded-br-sm" : "rounded-bl-sm");
  return (
    <div data-slot="indicador-de-digitacao" role="status" className={cn("flex items-end gap-2 motion-safe:animate-in motion-safe:fade-in", aDireita ? "flex-row-reverse" : "flex-row", className)}>
      {avatar && <span className="shrink-0">{avatar}</span>}
      {texto ? (
        <span className={cn(balao, "max-w-[85%] py-2 text-body-sm text-foreground")}>
          {icone && <span aria-hidden className="inline-flex text-primary-text [&>svg]:size-4 [&>svg]:motion-safe:animate-pulse">{icone}</span>}
          <span key={texto} className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1">{texto}</span>
        </span>
      ) : (
        <span className={cn(balao, "gap-1")}>
          {[0, 1, 2].map((i) => (
            <span key={i} aria-hidden className="fl-digitando-ponto size-2 rounded-full bg-muted-foreground" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
          <span className="sr-only">{rotulo}</span>
        </span>
      )}
    </div>
  );
}

/* ── Resposta rápida ── */
export function BotaoDeResposta({ className, icone, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { icone?: React.ReactNode }) {
  return (
    <button
      type="button"
      data-slot="botao-de-resposta"
      className={cn(
        "flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-input bg-card px-3 text-body-sm font-semibold text-primary-text transition-[background-color,transform] duration-[var(--duration-fast)] hover:bg-accent active:scale-[0.98] motion-reduce:active:scale-100",
        "disabled:cursor-not-allowed disabled:border-transparent disabled:bg-disabled disabled:text-disabled-foreground disabled:active:scale-100",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        foco,
        className,
      )}
      {...props}
    >
      {icone}
      {children}
    </button>
  );
}

/* ── Campo de mensagem ── */
export type CampoDeMensagemProps = {
  valor: string;
  onValorChange: (v: string) => void;
  onEnviar: () => void;
  onAnexar?: () => void;
  ocupado?: boolean;
  placeholder?: string;
  rotulo?: string;
  rotuloAnexar?: string;
  rotuloEnviar?: string;
  /** Algo pronto para enviar sem texto (por exemplo, uma foto escolhida). */
  podeEnviarSemTexto?: boolean;
  className?: string;
};

export function CampoDeMensagem({ valor, onValorChange, onEnviar, onAnexar, ocupado = false, placeholder = "Mensagem", rotulo = "Mensagem", rotuloAnexar = "Anexar foto", rotuloEnviar = "Enviar mensagem", podeEnviarSemTexto = false, className }: CampoDeMensagemProps) {
  const id = React.useId();
  const pode = (valor.trim().length > 0 || podeEnviarSemTexto) && !ocupado;
  return (
    <form
      data-slot="campo-de-mensagem"
      onSubmit={(e) => { e.preventDefault(); if (pode) onEnviar(); }}
      className={cn("flex shrink-0 items-center gap-1.5 border-t border-border bg-card p-2", className)}
    >
      {onAnexar && (
        <Button type="button" variant="ghost" size="icon" className="size-11 shrink-0 rounded-full text-muted-foreground" aria-label={rotuloAnexar} disabled={ocupado} onClick={onAnexar}>
          <Paperclip aria-hidden className="size-5" />
        </Button>
      )}
      <label htmlFor={id} className="sr-only">{rotulo}</label>
      <Input
        id={id}
        value={valor}
        onChange={(e) => onValorChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        enterKeyHint="send"
        maxLength={2000}
        className="h-11 min-w-0 flex-1 rounded-full bg-background px-4 text-body"
      />
      <Button type="submit" size="icon" className="size-11 shrink-0 rounded-full transition-transform active:scale-95 motion-reduce:active:scale-100" aria-label={rotuloEnviar} disabled={!pode}>
        {ocupado ? <Loader2 aria-hidden className="size-5 animate-spin motion-reduce:animate-none" /> : <SendHorizontal aria-hidden className="size-5" />}
      </Button>
    </form>
  );
}

/* ── Folha de opções ── */
export type OpcaoDaFolha = { id: string; titulo: string; descricao?: string };

export function FolhaDeOpcoes({ titulo, opcoes, aberta, onFechar, onEscolher }: { titulo: string; opcoes: OpcaoDaFolha[]; aberta: boolean; onFechar: () => void; onEscolher: (o: OpcaoDaFolha) => void }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const tid = React.useId();
  React.useEffect(() => {
    if (aberta) ref.current?.querySelector<HTMLButtonElement>("[data-opcao]")?.focus({ preventScroll: true });
  }, [aberta]);
  if (!aberta) return null;
  return (
    <div data-slot="folha-de-opcoes" className="absolute inset-0 z-10 flex items-end bg-sobreposicao motion-safe:animate-in motion-safe:fade-in" onClick={onFechar}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={tid}
        className="max-h-[75%] w-full overflow-y-auto rounded-t-xl bg-card pb-3 shadow-[var(--shadow-lg)] motion-safe:animate-in motion-safe:slide-in-from-bottom motion-safe:duration-[var(--duration-slow)]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Escape") onFechar();
          if (e.key === "Tab") {
            const focaveis = [...(ref.current?.querySelectorAll<HTMLButtonElement>("button") ?? [])];
            const primeiro = focaveis[0], ultimo = focaveis[focaveis.length - 1];
            if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo?.focus(); }
            else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro?.focus(); }
          }
        }}
      >
        <div className="sticky top-0 flex items-center justify-between gap-2 border-b border-border bg-card py-1 pl-4 pr-1">
          <h3 id={tid} className="m-0 text-body font-bold text-foreground">{titulo}</h3>
          <Button type="button" variant="ghost" size="icon" className="size-11 rounded-full" aria-label="Fechar" onClick={onFechar}>
            <X aria-hidden />
          </Button>
        </div>
        <ul className="m-0 list-none p-0">
          {opcoes.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                data-opcao
                onClick={() => onEscolher(o)}
                className={cn("flex min-h-14 w-full flex-col items-start justify-center px-4 py-2 text-left transition-colors hover:bg-muted", foco, "focus-visible:ring-inset focus-visible:ring-offset-0")}
              >
                <span className="text-body font-semibold text-foreground">{o.titulo}</span>
                {o.descricao && <span className="text-body-sm text-muted-foreground">{o.descricao}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
