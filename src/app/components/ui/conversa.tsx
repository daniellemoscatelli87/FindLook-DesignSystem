"use client";

import * as React from "react";
import { AlertCircle, Check, CheckCheck, Loader2, Paperclip, SendHorizontal, X } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";
import { Input } from "./input";

/**
 * Conversa (WhatsApp da loja e simulador do robô): as peças de uma conversa de mensagens, para montar dentro da
 * MolduraDeCelular ou de um card.
 * - MolduraDeCelular: o aparelho (borda grossa no grafite, cantos de 24 px, --shadow-lg), com cabeçalho, conversa e
 *   campo empilhados; é o palco das folhas que abrem por baixo (FolhaDeOpcoes).
 * - CabecalhoDaConversa: foto ou símbolo, nome e a linha de status ("digitando…" no rosa de texto quando `digitando`).
 * - Conversa: a área das mensagens (role="log": leitores de tela ouvem as novas), rola sozinha para a última mensagem.
 * - BalaoDeConversa: `de="eu"` (à direita, no rosa principal com texto branco, 4,6:1) ou `de="outro"` (à esquerda,
 *   card com borda). Hora e, nas minhas, enviada (✓), lida (✓✓) ou não enviada (!), com nome para leitores de tela.
 *   `citacao` (a peça respondida), `imagem` e, embaixo do balão, `acoes` (BotaoDeResposta). Entra subindo de leve.
 * - IndicadorDeDigitacao: os três pontos que sobem um depois do outro ("FindLook está digitando", para leitores de tela);
 *   com `texto`, vira um balão de etapa ("Procurando peças parecidas…") com o ícone girando devagar.
 * - AvisoDoSistema: pílula central ("Hoje", "O robô foi reiniciado").
 * - BotaoDeResposta: resposta rápida embaixo de um balão (44 px de altura; hover cinza claro; desabilitado depois
 *   de respondido).
 * - CampoDeMensagem: anexar (opcional), o texto e o botão Enviar (o principal da área), todos com 44 px.
 * - FolhaDeOpcoes: lista que abre por baixo dentro da moldura (como a lista do WhatsApp): foco no primeiro item, Esc e
 *   o fundo fecham, Tab circula dentro.
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
export function Conversa({ rotulo, className, children }: { rotulo: string; className?: string; children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const quantas = React.Children.count(children);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const menos = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: el.scrollHeight, behavior: menos ? "auto" : "smooth" });
  }, [quantas, children]);
  return (
    <div
      ref={ref}
      role="log"
      aria-label={rotulo}
      aria-live="polite"
      tabIndex={0}
      data-slot="conversa"
      className={cn("flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain bg-muted px-3 py-4 [scrollbar-width:thin] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring", className)}
    >
      {children}
    </div>
  );
}

/* ── Balão ── */
export type EstadoDaMensagem = "enviando" | "enviada" | "lida" | "erro";

export type BalaoDeConversaProps = {
  de: "eu" | "outro";
  /** Nome lido antes da mensagem por leitores de tela ("Você", "FindLook"). */
  autor?: string;
  hora?: string;
  estado?: EstadoDaMensagem;
  citacao?: { texto: string; imagem?: string };
  imagem?: { src: string; alt: string };
  acoes?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export function BalaoDeConversa({ de, autor, hora, estado, citacao, imagem, acoes, className, children }: BalaoDeConversaProps) {
  const eu = de === "eu";
  const IconeDoEstado = estado === "enviando" ? Loader2 : estado === "enviada" ? Check : estado === "lida" ? CheckCheck : estado === "erro" ? AlertCircle : null;
  const nomeDoEstado = { enviando: "enviando", enviada: "enviada", lida: "lida", erro: "não enviada" } as const;
  return (
    <div
      data-slot="balao-de-conversa"
      data-de={de}
      className={cn(
        "flex motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-[var(--duration-normal)]",
        eu ? "justify-end" : "justify-start",
        className,
      )}
    >
      <div className={cn("flex max-w-[85%] flex-col gap-2", eu ? "items-end" : "items-stretch")}>
        <div
          className={cn(
            "rounded-lg px-3 py-2 text-body-sm leading-snug",
            eu ? "rounded-tr-sm bg-primary text-primary-foreground" : "rounded-tl-sm border border-border bg-card text-foreground",
            estado === "erro" && "opacity-80",
          )}
        >
          <span className="sr-only">{autor ?? (eu ? "Você" : "Mensagem")}: </span>
          {citacao && (
            <span className={cn("mb-2 flex items-center gap-2 rounded-sm border-l-4 py-1 pl-2 pr-1", eu ? "border-primary-foreground bg-primary-foreground/15" : "border-primary bg-muted")}>
              <span className="min-w-0 flex-1"><span className="sr-only">Respondendo a: </span><span className="block truncate text-label font-semibold">{citacao.texto}</span></span>
              {citacao.imagem && <img src={citacao.imagem} alt="" className="size-9 shrink-0 rounded-sm object-cover" />}
            </span>
          )}
          {imagem && <img src={imagem.src} alt={imagem.alt} loading="lazy" className="mb-2 max-h-56 w-full rounded-md bg-muted object-cover" />}
          {children && <div className="m-0 whitespace-pre-line [overflow-wrap:anywhere]">{children}</div>}
          {(hora || IconeDoEstado) && (
            <span className={cn("mt-1 flex items-center justify-end gap-1 text-caption", eu ? "text-primary-foreground" : "text-muted-foreground")}>
              {hora}
              {eu && IconeDoEstado && estado && (
                <>
                  <IconeDoEstado aria-hidden className={cn("size-3.5", estado === "enviando" && "animate-spin motion-reduce:animate-none")} />
                  <span className="sr-only">, {nomeDoEstado[estado]}</span>
                </>
              )}
            </span>
          )}
        </div>
        {acoes && <div className="grid w-full gap-2">{acoes}</div>}
      </div>
    </div>
  );
}

/* ── Digitando ── */
export function IndicadorDeDigitacao({ autor = "FindLook", texto, icone, className }: { autor?: string; texto?: string; icone?: React.ReactNode; className?: string }) {
  return (
    <div data-slot="indicador-de-digitacao" role="status" className={cn("flex motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1", className)}>
      {texto ? (
        <div className="flex max-w-[85%] items-center gap-2 rounded-lg rounded-tl-sm border border-border bg-card px-3 py-2 text-body-sm text-foreground">
          {icone && <span aria-hidden className="inline-flex text-primary-text [&>svg]:size-4 [&>svg]:motion-safe:animate-pulse">{icone}</span>}
          <span key={texto} className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1">{texto}</span>
        </div>
      ) : (
        <>
          <span className="sr-only">{autor} está digitando</span>
          <div aria-hidden className="flex items-center gap-1 rounded-lg rounded-tl-sm border border-border bg-card px-3.5 py-3">
            {[0, 1, 2].map((i) => (
              <span key={i} className="fl-digitando-ponto size-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: `${i * 150}ms` }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ── Aviso do sistema ── */
export function AvisoDoSistema({ icone, children, className }: { icone?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <p data-slot="aviso-do-sistema" className={cn("mx-auto my-1 flex w-fit max-w-[90%] items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-center text-label font-medium text-muted-foreground", className)}>
      {icone && <span aria-hidden className="inline-flex shrink-0 [&>svg]:size-3.5">{icone}</span>}
      {children}
    </p>
  );
}

/* ── Resposta rápida ── */
export function BotaoDeResposta({ className, icone, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { icone?: React.ReactNode }) {
  return (
    <button
      type="button"
      data-slot="botao-de-resposta"
      className={cn(
        "flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-border bg-card px-3 text-body-sm font-semibold text-primary-text transition-[background-color,transform] duration-[var(--duration-fast)] hover:bg-accent active:scale-[0.98] motion-reduce:active:scale-100",
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
    <div data-slot="folha-de-opcoes" className="absolute inset-0 z-10 flex items-end bg-foreground/30 motion-safe:animate-in motion-safe:fade-in" onClick={onFechar}>
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
                className={cn("flex min-h-14 w-full flex-col items-start justify-center px-4 py-2 text-left transition-colors hover:bg-accent", foco, "focus-visible:ring-inset focus-visible:ring-offset-0")}
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
