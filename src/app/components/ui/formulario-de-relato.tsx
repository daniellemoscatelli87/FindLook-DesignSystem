"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";
import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Textarea } from "./textarea";
import { UploadDropzone } from "./upload";
import { AlertaComAcao, BotaoDoAlerta } from "./alerta-com-acao";

/**
 * Formulário de relato: a pessoa escolhe o que aconteceu (categorias vindas do produto), descreve e anexa evidências.
 * Valida antes de enviar e mostra os estados enviando, enviado (AlertaComAcao de sucesso) e erro (o texto fica).
 * Montado com RadioGroup, Textarea, UploadDropzone, Button e AlertaComAcao. Envio e regras ficam no produto.
 */
const TEXTOS = {
  pergunta: "O que aconteceu?",
  faltaCategoria: "Escolha a opção que mais se parece com o que aconteceu.",
  descricao: "Conte o que aconteceu",
  ajudaDescricao: "Inclua datas e detalhes, se tiver. Não é preciso informar dados pessoais.",
  faltaDescricao: "Escreva pelo menos 20 caracteres, com datas e detalhes, se tiver.",
  evidencias: "Evidências",
  opcional: "(opcional)",
  tituloArquivos: "Fotos, prints ou comprovantes",
  descricaoArquivos: "Até 5 arquivos, de até 10 MB cada.",
  enviar: "Enviar relato",
  enviando: "Enviando…",
  erroTitulo: "Não conseguimos enviar agora",
  erroTexto: "Confira sua conexão e tente de novo. Seu texto continua aqui.",
  enviadoTitulo: "Recebemos seu relato",
  enviadoTexto: "As informações foram encaminhadas para análise. Você poderá acompanhar o andamento por aqui.",
  acompanhar: "Acompanhar",
};

export function FormularioDeRelato({ categorias, contexto, rodape, onEnviar, hrefAcompanhar = "#", textos }: {
  categorias: readonly string[];
  /** Informações já conhecidas (loja, operação…), mostradas no topo. */
  contexto?: React.ReactNode;
  /** Nota ao lado do botão (quem analisa, privacidade). */
  rodape?: React.ReactNode;
  /** Deve rejeitar a Promise em caso de erro. */
  onEnviar: (dados: { categoria: string; descricao: string; arquivos: File[] }) => Promise<void>;
  hrefAcompanhar?: string;
  textos?: Partial<typeof TEXTOS>;
}) {
  const t = { ...TEXTOS, ...textos };
  const id = React.useId();
  const reduzir = useReducedMotion();
  const [categoria, setCategoria] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [arquivos, setArquivos] = React.useState<File[]>([]);
  const [estado, setEstado] = React.useState<"editando" | "enviando" | "enviado" | "erro">("editando");
  const [tentou, setTentou] = React.useState(false);
  const faltaCategoria = !categoria;
  const faltaDescricao = descricao.trim().length < 20;

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setTentou(true);
    if (faltaCategoria || faltaDescricao) return;
    setEstado("enviando");
    try {
      await onEnviar({ categoria, descricao: descricao.trim(), arquivos });
      setEstado("enviado");
    } catch {
      setEstado("erro");
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {estado === "enviado" ? (
        <motion.div key="enviado" initial={reduzir ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <AlertaComAcao tom="sucesso" titulo={t.enviadoTitulo} icone={<CheckCircle2 />} acoes={<BotaoDoAlerta tom="sucesso" asChild><a href={hrefAcompanhar}>{t.acompanhar}</a></BotaoDoAlerta>}>
            {t.enviadoTexto}
          </AlertaComAcao>
        </motion.div>
      ) : (
        <motion.form key="form" data-slot="formulario-de-relato" onSubmit={enviar} noValidate className="space-y-5" initial={false} exit={reduzir ? undefined : { opacity: 0, y: -8 }}>
          {contexto && <div className="space-y-1 text-[0.875rem] text-muted-foreground">{contexto}</div>}

          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold text-foreground">{t.pergunta}</legend>
            <RadioGroup value={categoria} onValueChange={setCategoria} aria-describedby={tentou && faltaCategoria ? `${id}-erro-cat` : undefined} className="grid gap-2 sm:grid-cols-2">
              {categorias.map((c) => (
                <label key={c} className={cn("flex cursor-pointer select-none items-start gap-2.5 rounded-md border border-border bg-card p-3 text-[0.875rem] text-foreground transition-colors hover:border-primary/30 hover:bg-[var(--primary-muted)]", categoria === c && "border-primary/40 bg-[var(--primary-muted)]")}>
                  <RadioGroupItem value={c} className="mt-0.5" /> {c}
                </label>
              ))}
            </RadioGroup>
            {tentou && faltaCategoria && <p id={`${id}-erro-cat`} className="text-sm font-medium text-primary-text">{t.faltaCategoria}</p>}
          </fieldset>

          <div className="space-y-1.5">
            <Label htmlFor={`${id}-desc`} className="text-sm font-semibold">{t.descricao}</Label>
            <Textarea id={`${id}-desc`} rows={4} value={descricao} onChange={(e) => setDescricao(e.target.value)} aria-invalid={tentou && faltaDescricao ? true : undefined} aria-describedby={`${id}-desc-ajuda`} className="bg-card" />
            <p id={`${id}-desc-ajuda`} className={cn("text-sm", tentou && faltaDescricao ? "font-medium text-primary-text" : "text-muted-foreground")}>
              {tentou && faltaDescricao ? t.faltaDescricao : t.ajudaDescricao}
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="m-0 text-sm font-semibold text-foreground">{t.evidencias} <span className="font-normal text-muted-foreground">{t.opcional}</span></p>
            <UploadDropzone size="compact" accept={["image/*", ".pdf"]} maxSize={10 * 1024 * 1024} maxFiles={5} title={t.tituloArquivos} description={t.descricaoArquivos} onFiles={(f) => setArquivos((a) => [...a, ...f].slice(0, 5))} />
            {arquivos.length > 0 && <p className="text-[0.8125rem] text-muted-foreground">{arquivos.length} {arquivos.length === 1 ? "arquivo anexado" : "arquivos anexados"}</p>}
          </div>

          {estado === "erro" && <AlertaComAcao tom="erro" titulo={t.erroTitulo}>{t.erroTexto}</AlertaComAcao>}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            {rodape ? <p className="m-0 text-[0.8125rem] text-muted-foreground">{rodape}</p> : <span />}
            <Button type="submit" disabled={estado === "enviando"} aria-busy={estado === "enviando" || undefined} className="shrink-0">
              {estado === "enviando" ? <><Loader2 aria-hidden className="animate-spin" /> {t.enviando}</> : t.enviar}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
