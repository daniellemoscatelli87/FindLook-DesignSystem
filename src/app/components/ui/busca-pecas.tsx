"use client";

import * as React from "react";
import { AlertCircle, ChevronRight, ImagePlus, Info, Lightbulb, MessageCircleQuestion, Search, X } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { SegmentedControl } from "./segmented-control";
import { UploadDropzone, formatBytes } from "./upload";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "./drawer";
import { BarraFixaDoCelular } from "./barra-fixa-celular";

/**
 * Busca de peças (FindLook): a caixa "O que você quer encontrar?" do hero da página inicial.
 *
 * BuscaDePecas: descrição da peça (obrigatória), foto de referência opcional (com prévia, trocar e remover),
 * Condição da peça no Controle segmentado (Nova · Segunda mão · Tanto faz), botão "Encontrar peças" e o aviso
 * de disponibilidade. Variante "card" (hero, computador e tablet) e "gaveta" (dentro da gaveta do celular,
 * com o botão "Garimpar").
 * BuscaNoCelular: barra fixa "Encontrar peças" que abre a busca numa gaveta inferior.
 *
 * Componente de apresentação: não faz a busca. Entrega os valores em onBuscar; a validação padrão só confere
 * se a descrição foi preenchida (troque por `validar`).
 */

type CondicaoDaPeca = "novo" | "usado" | "ambos";
type ValoresDaBusca = { descricao: string; condicao: CondicaoDaPeca; foto: File | null };

const textosPadraoBusca = {
  titulo: "O que você quer encontrar?",
  rotulo: "Descreva a peça que procura",
  placeholder: "Ex.: Jaqueta preta estilo biker, com zíperes prateados e modelagem curta.",
  dica: "Conte os detalhes. Nós buscamos as possibilidades.",
  erroVazio: "Descreva a peça para buscar. Por exemplo: tipo, cor e estilo.",
  fotoTitulo: "Adicione uma foto de referência (opcional)",
  fotoDescricao: "Uma imagem ajuda a refinar a busca e encontrar peças mais semelhantes.",
  trocarFoto: "Trocar foto",
  removerFoto: "Remover foto",
  fotoAlt: "Foto escolhida para a busca",
  condicao: "Condição da peça",
  nova: "Nova",
  usada: "Segunda mão",
  tantoFaz: "Tanto faz",
  botao: "Encontrar peças",
  botaoGaveta: "Garimpar",
  aviso: "A busca considera peças cadastradas por lojas e brechós participantes. A disponibilidade deve ser confirmada com a loja.",
  fechar: "Fechar",
};
type TextosDaBusca = typeof textosPadraoBusca;

const TIPOS_FOTO = ["image/jpeg", "image/png", "image/webp"];
const TAMANHO_FOTO = 10 * 1024 * 1024;
const foco = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

type BuscaDePecasProps = {
  /** card: caixa aberta no hero. gaveta: dentro da gaveta do celular (o título fica no cabeçalho da gaveta). */
  variante?: "card" | "gaveta";
  /** Na variante gaveta: id de um título que nomeia o formulário (sem ele, o formulário usa o texto do título). */
  idTitulo?: string;
  /** Recebe os valores quando a validação passa. */
  onBuscar?: (valores: ValoresDaBusca) => void;
  /** Valida a descrição e devolve a mensagem de erro (ou null). Padrão: só confere se está preenchida. */
  validar?: (descricao: string) => string | null;
  condicaoInicial?: CondicaoDaPeca;
  maxCaracteres?: number;
  tiposDeFoto?: string[];
  tamanhoMaximoFoto?: number;
  /** Sombra grande: só quando a caixa fica sobre um fundo com cor ou foto (o hero). Em fundo branco, sem sombra. */
  elevada?: boolean;
  textos?: Partial<TextosDaBusca>;
  className?: string;
};

function BuscaDePecas({
  variante = "card",
  idTitulo,
  onBuscar,
  validar,
  condicaoInicial = "ambos",
  maxCaracteres = 300,
  tiposDeFoto = TIPOS_FOTO,
  tamanhoMaximoFoto = TAMANHO_FOTO,
  elevada = false,
  textos,
  className,
}: BuscaDePecasProps) {
  const tx = { ...textosPadraoBusca, ...textos };
  const gaveta = variante === "gaveta";
  const id = React.useId();
  const [descricao, setDescricao] = React.useState("");
  const [condicao, setCondicao] = React.useState<CondicaoDaPeca>(condicaoInicial);
  const [foto, setFoto] = React.useState<File | null>(null);
  const [previa, setPrevia] = React.useState<string | null>(null);
  const [erroDescricao, setErroDescricao] = React.useState<string | null>(null);
  const [erroFoto, setErroFoto] = React.useState<string | null>(null);
  const campo = React.useRef<HTMLTextAreaElement>(null);
  const trocar = React.useRef<HTMLInputElement>(null);
  const checar = validar ?? ((d: string) => (d.trim() ? null : tx.erroVazio));

  React.useEffect(() => {
    if (!foto) return setPrevia(null);
    const url = URL.createObjectURL(foto);
    setPrevia(url);
    return () => URL.revokeObjectURL(url);
  }, [foto]);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const erro = checar(descricao);
    setErroDescricao(erro);
    if (erro) return campo.current?.focus();
    onBuscar?.({ descricao: descricao.trim(), condicao, foto });
  }

  function escolherFoto(f: File | undefined) {
    if (!f) return;
    if (!tiposDeFoto.includes(f.type)) return setErroFoto(`“${f.name}” não é um formato aceito.`);
    if (f.size > tamanhoMaximoFoto) return setErroFoto(`“${f.name}” passa de ${formatBytes(tamanhoMaximoFoto)}.`);
    setErroFoto(null);
    setFoto(f);
  }

  const idDescricao = `${id}-descricao`;
  const idDica = `${id}-dica`;
  const idErro = `${id}-erro`;
  const linkTexto = cn("rounded-sm text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary-text", foco);

  return (
    <form
      data-slot="busca-de-pecas"
      onSubmit={enviar}
      noValidate
      aria-labelledby={gaveta ? idTitulo : `${id}-titulo`}
      aria-label={gaveta && !idTitulo ? tx.titulo : undefined}
      className={cn(!gaveta && "rounded-xl border border-border bg-card p-5 sm:p-6", !gaveta && elevada && "shadow-[var(--shadow-lg)]", className)}
    >
      {!gaveta && (
        <h2 id={`${id}-titulo`} className="mb-5 flex items-center gap-2 text-xl font-extrabold tracking-tight text-foreground">
          <MessageCircleQuestion className="size-5 shrink-0 text-primary-text" aria-hidden />
          {tx.titulo}
        </h2>
      )}

      <div className="space-y-2">
        <Label htmlFor={idDescricao} className="block text-sm font-semibold leading-snug">
          {tx.rotulo}
          <span aria-hidden className="ml-1 text-primary-text">*</span>
        </Label>
        <Textarea
          ref={campo}
          id={idDescricao}
          value={descricao}
          maxLength={maxCaracteres}
          rows={3}
          required
          aria-required="true"
          aria-invalid={erroDescricao ? true : undefined}
          aria-describedby={`${idDica}${erroDescricao ? ` ${idErro}` : ""}`}
          placeholder={tx.placeholder}
          onChange={(e) => {
            setDescricao(e.target.value);
            if (erroDescricao) setErroDescricao(checar(e.target.value));
          }}
          className="min-h-24 resize-y bg-card text-[0.9375rem]"
        />
        <div className="flex items-start gap-3 rounded-md border border-warning/20 bg-warning-muted px-4 py-3">
          <Lightbulb className="mt-0.5 size-5 shrink-0 text-warning-text" aria-hidden />
          <p id={idDica} className="flex-1 text-sm leading-relaxed text-foreground">{tx.dica}</p>
        </div>
        {erroDescricao && (
          <p id={idErro} role="alert" className="flex items-start gap-1.5 text-sm font-medium text-primary-text">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
            {erroDescricao}
          </p>
        )}
      </div>

      <div className="mt-5">
        {previa && foto ? (
          <div className="flex items-center gap-3 rounded-md border border-border bg-card p-3">
            <img src={previa} alt={tx.fotoAlt} className="size-14 shrink-0 rounded-sm object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{foto.name}</p>
              <p className="text-xs text-muted-foreground">{formatBytes(foto.size)}</p>
              <div className="mt-1 flex gap-4">
                <button type="button" onClick={() => trocar.current?.click()} className={linkTexto}>{tx.trocarFoto}</button>
                <button type="button" onClick={() => setFoto(null)} className={linkTexto}>{tx.removerFoto}</button>
              </div>
            </div>
            <input
              ref={trocar}
              type="file"
              accept={tiposDeFoto.join(",")}
              className="sr-only"
              tabIndex={-1}
              aria-label={tx.trocarFoto}
              onChange={(e) => {
                escolherFoto(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </div>
        ) : (
          <UploadDropzone
            size="compact"
            multiple={false}
            accept={tiposDeFoto}
            maxSize={tamanhoMaximoFoto}
            title={tx.fotoTitulo}
            description={tx.fotoDescricao}
            icon={<ImagePlus className="size-5 text-primary-text" strokeWidth={1.75} aria-hidden />}
            error={erroFoto}
            onError={setErroFoto}
            onFiles={(arquivos) => escolherFoto(arquivos[0])}
          />
        )}
        {previa && erroFoto && (
          <p role="alert" className="mt-2 flex items-start gap-1.5 text-sm font-medium text-primary-text">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
            {erroFoto}
          </p>
        )}
      </div>

      <fieldset className="mt-5 min-w-0 border-0 p-0">
        <legend className="mb-2 text-sm font-semibold text-foreground">{tx.condicao}</legend>
        <SegmentedControl<CondicaoDaPeca>
          aria-label={tx.condicao}
          fullWidth
          // Em telas estreitas as três opções dividem a largura e o texto pode quebrar, sem vazar do card.
          className="auto-cols-[minmax(0,1fr)] [&_[data-slot=segmented-item]]:h-auto [&_[data-slot=segmented-item]]:min-h-10 [&_[data-slot=segmented-item]]:px-2 [&_[data-slot=segmented-item]]:py-1.5 [&_[data-slot=segmented-item]]:text-center [&_[data-slot=segmented-item]]:leading-tight [&_[data-slot=segmented-item]]:whitespace-normal"
          value={condicao}
          onValueChange={setCondicao}
          options={[
            { value: "novo", label: tx.nova },
            { value: "usado", label: tx.usada },
            { value: "ambos", label: tx.tantoFaz },
          ]}
        />
      </fieldset>

      <Button type="submit" size="lg" className="mt-6 h-12 w-full text-base">
        {gaveta ? (
          <>
            {tx.botaoGaveta} <ChevronRight aria-hidden />
          </>
        ) : (
          <>
            <Search aria-hidden /> {tx.botao}
          </>
        )}
      </Button>
      <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground">
        <Info className="mt-px size-3.5 shrink-0" aria-hidden />
        {tx.aviso}
      </p>
    </form>
  );
}

type BuscaNoCelularProps = Omit<BuscaDePecasProps, "variante" | "idTitulo" | "elevada"> & {
  /** Estado controlado da gaveta (opcional). */
  aberta?: boolean;
  onAbertaChange?: (aberta: boolean) => void;
  /** Só no celular (abaixo de 768 px). Padrão: true. Desligue em demonstrações. */
  somenteCelular?: boolean;
  /** Onde montar a gaveta (padrão: body). */
  container?: HTMLElement | null;
};

/** Barra fixa "Encontrar peças" que abre a busca numa gaveta inferior (celular). */
function BuscaNoCelular({ aberta, onAbertaChange, somenteCelular = true, container, textos, onBuscar, ...props }: BuscaNoCelularProps) {
  const tx = { ...textosPadraoBusca, ...textos };
  const [interna, setInterna] = React.useState(false);
  const estaAberta = aberta ?? interna;
  const mudar = (v: boolean) => {
    if (aberta === undefined) setInterna(v);
    onAbertaChange?.(v);
  };
  return (
    <>
      <BarraFixaDoCelular icone={<Search />} oculta={estaAberta} somenteCelular={somenteCelular} onClick={() => mudar(true)}>
        {tx.botao}
      </BarraFixaDoCelular>
      <Drawer open={estaAberta} onOpenChange={mudar}>
        <DrawerContent container={container} className="max-h-[92dvh]">
          <DrawerHeader className="flex-row items-center justify-between gap-3 px-5 pt-3 pb-2 text-left">
            <DrawerTitle className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
              <MessageCircleQuestion className="size-5 shrink-0 text-primary-text" aria-hidden />
              {tx.titulo}
            </DrawerTitle>
            <DrawerClose aria-label={tx.fechar} className={cn("flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground", foco)}>
              <X className="size-5" aria-hidden />
            </DrawerClose>
            <DrawerDescription className="sr-only">{tx.dica}</DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <BuscaDePecas {...props} textos={textos} variante="gaveta" onBuscar={onBuscar} />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export { BuscaDePecas, BuscaNoCelular, textosPadraoBusca };
export type { BuscaDePecasProps, BuscaNoCelularProps, CondicaoDaPeca, ValoresDaBusca, TextosDaBusca };
