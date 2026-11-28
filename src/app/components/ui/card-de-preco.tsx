"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { ArrowRight, Check, ChevronDown, Lightbulb, Minus, Star } from "lucide-react";
import { cn } from "./utils";
import { BrilhoDeSelecionado, molduraDoSelecionavel } from "./shine-border";
import { IconeComBase } from "./painel-dados";

/**
 * Card de preço (CardDePreco), o card do template "Planos e assinatura" (Templates › Pricing), agora reaproveitável
 * (extraído em 27/11/2026, sem mudar o visual do template).
 *
 * Estrutura: ícone do plano informativo (colorido na base cinza: o card não se toca, só a ação) e, no plano em destaque, o selo "Recomendado" · nome · descrição ·
 * "Para quem" opcional (caixa neutra, até 4 linhas, mesma altura em todos os cards) · Ver/Ocultar recursos do plano
 * (abre e fecha a lista com incluído e não incluído) · divisor · preço com período à esquerda e a ação à direita
 * (empilham quando o card fica estreito).
 *
 * Estado selecionado (Opção A, decisões da dona do produto de 27/11/2026: só a ação principal da área é preenchida):
 * o card continua branco, com a borda de 2 px na primária e o brilho animado do design system por cima dela
 * (BrilhoDeSelecionado, de ui/shine-border; parado com "menos movimento"); a ação vira um botão de contorno de 2 px
 * (a mesma espessura da borda do card) com "✓ Plano selecionado", texto --primary-text e fundo no rosa do selecionado (--primary-suave;
 * hover dos outros no cinza claro, --accent; regra de 27/11/2026). Nunca só cor: o check e o texto mudam. A borda do selecionado é a moldura
 * comum dos cards que se escolhem (molduraDoSelecionavel, de ui/shine-border), a mesma do CartaoDeEscolha. O plano em destaque também tem a borda de 2 px; o selo "Recomendado" usa o nível 2
 * (--primary-suave).
 *
 * Seleção:
 * - "botao" (padrão, página de planos do painel): a ação é um botão com aria-pressed.
 * - "radio" (cadastro em etapas): a ação é um item de rádio (role="radio", aria-checked); ponha os cards dentro de um
 *   RadioGroup (ui/radio-group). As setas do teclado trocam o plano, como em qualquer grupo de rádio.
 */

export type RecursoDoPlano = { texto: string; incluido: boolean };

type TextosDoCardDePreco = {
  recomendado: string;
  paraQuem: string;
  verRecursos: string;
  ocultarRecursos: string;
  /** Recebe incluídos e total: "5 de 10". */
  contagem: (incluidos: number, total: number) => string;
  incluido: string;
  naoIncluido: string;
  selecionar: string;
  selecionado: string;
};

const textosPadrao: TextosDoCardDePreco = {
  recomendado: "Recomendado",
  paraQuem: "Para quem:",
  verRecursos: "Ver recursos do plano",
  ocultarRecursos: "Ocultar recursos do plano",
  contagem: (i, t) => `${i} de ${t}`,
  incluido: "Incluído: ",
  naoIncluido: "Não incluído: ",
  selecionar: "Selecionar Plano",
  selecionado: "Plano selecionado",
};

/**
 * ListaDeRecursos: a lista de recursos de um plano (incluído: check colorido na base cinza, o tom informativo;
 * não incluído: traço cinza na base cinza, o tom desabilitado, e o texto em cinza), a mesma do CardDePreco. Use na revisão do cadastro e na comparação de planos, para
 * o mesmo recurso ter sempre o mesmo sinal. Leitores de tela ouvem "Incluído:" ou "Não incluído:" antes de cada item.
 */
export function ListaDeRecursos({ recursos, textos, className, ...props }: Omit<React.ComponentProps<"ul">, "children"> & {
  recursos: RecursoDoPlano[];
  textos?: { incluido?: string; naoIncluido?: string };
}) {
  const tx = { incluido: "Incluído:", naoIncluido: "Não incluído:", ...textos };
  return (
    <ul data-slot="lista-de-recursos" className={cn("m-0 list-none space-y-2 p-0", className)} {...props}>
      {recursos.map((r) => (
        <li key={r.texto} className={`flex items-start gap-2 text-body-sm leading-snug ${r.incluido ? "text-foreground" : "text-muted-foreground"}`}>
          <span aria-hidden className={`mt-px h-4 w-4 shrink-0 rounded-full flex items-center justify-center ${r.incluido ? "bg-muted" : "bg-disabled"}`}>
            {r.incluido
              ? <Check className="h-2.5 w-2.5 text-[var(--primary-text,var(--primary))]" strokeWidth={3} />
              : <Minus className="h-2.5 w-2.5 text-disabled-foreground" strokeWidth={3} />}
          </span>
          <span>
            <span className="sr-only">{(r.incluido ? tx.incluido : tx.naoIncluido).trim()} </span>
            {r.texto}
          </span>
        </li>
      ))}
    </ul>
  );
}

export type CardDePrecoProps = {
  /** Identifica o plano (vira o value do rádio no modo "radio"). */
  valor: string;
  nome: string;
  descricao: string;
  icone: React.ReactNode;
  /** Plano em destaque: selo "Recomendado" e borda de 2 px. */
  destaque?: boolean;
  /** Texto de "Para quem"; sem ele, o bloco não aparece. */
  paraQuem?: React.ReactNode;
  recursos: RecursoDoPlano[];
  /** Lista de recursos aberta. Controle no pai para abrir e fechar todos os cards juntos (ficam alinhados). */
  recursosAbertos?: boolean;
  onRecursosAbertosChange?: (aberto: boolean) => void;
  /** Valor já formatado, por exemplo "R$ 149". */
  preco: string;
  /** Período depois do preço, por exemplo "/ mês". */
  periodo: string;
  selecao?: "botao" | "radio";
  selecionado?: boolean;
  /** Modo "botao": chamado ao apertar Selecionar Plano. */
  onSelecionar?: () => void;
  /** id do controle de seleção (para levar o foco a ele, por exemplo pelo resumo de erros). */
  idDaAcao?: string;
  textos?: Partial<TextosDoCardDePreco>;
  className?: string;
};

const classeDaAcao = (ativo: boolean) =>
  cn(
    "h-10 w-full @[19rem]:w-auto px-4 rounded-md border-primary text-body-sm font-semibold whitespace-nowrap text-[var(--primary-text,var(--primary))] transition-colors inline-flex items-center justify-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    ativo ? "border-2 bg-[var(--primary-suave)]" : "border bg-card hover:bg-muted",
  );

export function CardDePreco({
  valor, nome, descricao, icone, destaque = false, paraQuem, recursos, recursosAbertos, onRecursosAbertosChange, preco, periodo,
  selecao = "botao", selecionado = false, onSelecionar, idDaAcao, textos, className,
}: CardDePrecoProps) {
  const tx = { ...textosPadrao, ...textos };
  const idLista = `${React.useId()}-recursos`;
  const [abertoInterno, setAbertoInterno] = React.useState(false);
  const aberto = recursosAbertos ?? abertoInterno;
  const alternar = () => {
    if (recursosAbertos === undefined) setAbertoInterno(!aberto);
    onRecursosAbertosChange?.(!aberto);
  };
  const incluidos = recursos.filter((r) => r.incluido).length;
  const conteudoDaAcao = (
    <>
      {selecionado && <Check aria-hidden className="h-4 w-4" />}
      {selecionado ? tx.selecionado : tx.selecionar}
      {!selecionado && <ArrowRight aria-hidden className="h-4 w-4" />}
    </>
  );
  const rotuloDaAcao = selecionado ? `${tx.selecionado}: ${nome}` : `${tx.selecionar} ${nome}`;

  return (
    <div
      data-slot="card-de-preco"
      data-selecionado={selecionado || undefined}
      className={cn(
        "@container relative rounded-lg p-4 sm:p-6 flex flex-col transition-[background-color,box-shadow] duration-[var(--duration-fast)]",
        // Selecionado: a moldura comum dos cards que se escolhem (a mesma do CartaoDeEscolha e de Cards › Estados).
        selecionado ? molduraDoSelecionavel(true) : destaque ? "border-2 border-primary" : "border border-border",
        "bg-card",
        className,
      )}
    >
      {selecionado && <BrilhoDeSelecionado />}
      {/* Topo: ícone do plano e, no destacado, o selo no estilo do card com wobble */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <IconeComBase tom="informativo" tamanho="sm" redonda>{icone}</IconeComBase>
        {destaque && (
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-[var(--primary-suave)] px-2 py-1 text-caption font-bold uppercase tracking-[0.06em] text-[var(--primary-text,var(--primary))] whitespace-nowrap">
            <Star aria-hidden className="h-3 w-3 fill-current" />
            {tx.recomendado}
          </span>
        )}
      </div>

      <h3 className="mb-2 text-h3 font-black leading-tight tracking-[-0.03em] text-foreground">{nome}</h3>
      <p className="mb-4 text-body-sm leading-relaxed text-muted-foreground">{descricao}</p>

      {/* "Para quem": no máximo 4 linhas, sem reticências; altura de 4 linhas em todos os cards. Caixa neutra em cinza,
          nos dois temas: é uma dica, não um aviso (decisão da dona do produto, 20/11/2026) */}
      {paraQuem && (
        <div className="mb-5 flex gap-2 sm:gap-2 rounded-md border border-border bg-muted px-2 sm:px-3 py-2">
          <Lightbulb aria-hidden className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
          <p className="min-h-[5.5em] text-body-sm leading-snug text-foreground">
            <strong className="font-bold">{tx.paraQuem}</strong> {paraQuem}
          </p>
        </div>
      )}

      {/* Ocultar / expandir os recursos do plano */}
      <button
        type="button"
        aria-expanded={aberto}
        aria-controls={idLista}
        onClick={alternar}
        className="mb-3 -mx-1 flex items-center justify-between gap-2 rounded-sm px-1 py-1 text-left text-body-sm font-semibold text-foreground transition-colors hover:text-[var(--primary-text,var(--primary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span>{aberto ? tx.ocultarRecursos : tx.verRecursos}</span>
        <span className="flex items-center gap-1 text-label font-medium text-muted-foreground whitespace-nowrap">
          {tx.contagem(incluidos, recursos.length)}
          <ChevronDown aria-hidden className={`h-4 w-4 transition-transform ${aberto ? "rotate-180" : ""}`} />
        </span>
      </button>

      {aberto ? (
        <ListaDeRecursos id={idLista} recursos={recursos} textos={{ incluido: tx.incluido, naoIncluido: tx.naoIncluido }} className="flex-1 mb-5" />
      ) : (
        <div id={idLista} className="flex-1 mb-2" />
      )}

      <div className="mb-4 border-t border-border" />

      {/* Rodapé no estilo do card com wobble: preço à esquerda e ação à direita; empilha quando o card é estreito */}
      <div className="flex flex-col gap-3 @[19rem]:flex-row @[19rem]:items-center @[19rem]:justify-between">
        <div className="flex items-baseline gap-1 whitespace-nowrap">
          <span className="text-h3 font-black leading-none tracking-[-0.03em] text-foreground">{preco}</span>
          <span className="text-label text-muted-foreground">{periodo}</span>
        </div>
        {selecao === "radio" ? (
          <RadioGroupPrimitive.Item id={idDaAcao} value={valor} aria-label={rotuloDaAcao} data-slot="card-de-preco-acao" className={classeDaAcao(selecionado)}>
            {conteudoDaAcao}
          </RadioGroupPrimitive.Item>
        ) : (
          <button id={idDaAcao} type="button" aria-pressed={selecionado} aria-label={rotuloDaAcao} onClick={onSelecionar} data-slot="card-de-preco-acao" className={classeDaAcao(selecionado)}>
            {conteudoDaAcao}
          </button>
        )}
      </div>
    </div>
  );
}
