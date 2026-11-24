"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Award, BadgeCheck, CheckCircle2, FileText, History, Loader2, RefreshCw, ShieldAlert, Star, TrendingUp } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./dialog";
import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Textarea } from "./textarea";
import { SegmentedControl } from "./segmented-control";
import { Stepper } from "./stepper";
import { UploadDropzone } from "./upload";
import { AlertaComAcao, BotaoDoAlerta, LinkDoAlerta, type TomDoAlerta } from "./alerta-com-acao";
import { CardComCabecalho, GraficoDeDesempenho, IconeComBase, ItemDeAtividade, superficieDoCard } from "./painel-dados";
import { MarcaFind, textoComMarcas } from "./marca-find";
import { BadgeDeClassificacao, FAIXAS_FINDSCORE } from "./findscore";

/*
 * FindScore e FindStar, lote 2 (especificação da dona do produto, 24/11/2026): metodologia, histórico, avisos da conta
 * e do reconhecimento, denúncia, andamento da ocorrência e verificação pública do FindStar. Tudo montado com os
 * componentes do DS: Dialog, CardComCabecalho, GraficoDeDesempenho, SegmentedControl, ItemDeAtividade, AlertaComAcao,
 * RadioGroup, Textarea, UploadDropzone, Stepper, IconeComBase, Badge e MarcaFind. Só apresentam; regras e gravação ficam
 * no produto.
 */

/* ── Critérios (metodologia inicial; os pesos vêm do produto, que os versiona) ── */
export const CRITERIOS_FINDSCORE = [
  { id: "atendimento", nome: "Atendimento", peso: 0.3, descricao: "Respostas às solicitações e o tempo até a primeira resposta, dentro do horário de funcionamento da loja." },
  { id: "confirmacao", nome: "Confirmação das peças", peso: 0.25, descricao: "Se as peças reservadas estavam mesmo disponíveis, peça por peça." },
  { id: "vendas", nome: "Cumprimento das vendas", peso: 0.15, descricao: "Compras confirmadas que foram concluídas como combinado. O volume de vendas não conta." },
  { id: "entrega", nome: "Entrega no prazo", peso: 0.15, descricao: "Entregas e retiradas disponíveis no prazo combinado." },
  { id: "cancelamentos", nome: "Cancelamentos atribuíveis à loja", peso: 0.15, descricao: "Só os cancelamentos em que a responsabilidade foi da loja." },
] as const;

/* ── 1. Metodologia ("Entenda o FindScore") ─────────────────── */
export function MetodologiaDoFindScore({ gatilho, criterios = CRITERIOS_FINDSCORE }: { gatilho: React.ReactElement; criterios?: readonly { id: string; nome: string; peso: number; descricao: string }[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{gatilho}</DialogTrigger>
      <DialogContent className="max-h-[88dvh] gap-0 overflow-y-auto rounded-[20px] p-6 sm:max-w-xl">
        <div className="flex items-start gap-3 pr-8">
          <IconeComBase tom="marca"><TrendingUp /></IconeComBase>
          <div className="min-w-0">
            <DialogTitle className="text-[1.125rem] font-semibold text-foreground">Entenda o <MarcaFind sufixo="Score" /></DialogTitle>
            <DialogDescription className="mt-0.5 text-[0.875rem] text-muted-foreground">
              O <MarcaFind sufixo="Score" className="text-foreground" /> reflete o desempenho da loja no atendimento, na disponibilidade das peças e no cumprimento dos compromissos assumidos com os consumidores na FindLook.
            </DialogDescription>
          </div>
        </div>

        <h3 className="mt-6 text-[0.9375rem] font-semibold text-foreground">O que é avaliado</h3>
        <ul className="m-0 mt-2 list-none divide-y divide-border p-0">
          {criterios.map((c) => (
            <li key={c.id} className="flex items-start justify-between gap-4 py-2.5">
              <span className="min-w-0 text-[0.875rem]">
                <span className="font-semibold text-foreground">{c.nome}</span>
                <span className="block text-muted-foreground">{c.descricao}</span>
              </span>
              <span className="shrink-0 text-[0.875rem] font-semibold tabular-nums text-foreground">{Math.round(c.peso * 100)}%</span>
            </li>
          ))}
        </ul>

        <h3 className="mt-5 text-[0.9375rem] font-semibold text-foreground">As faixas</h3>
        <ul className="m-0 mt-2 flex list-none flex-wrap gap-2 p-0">
          {FAIXAS_FINDSCORE.map((f) => (
            <li key={f.id} className="flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground">
              <BadgeDeClassificacao valor={f.min + 0.5} /> {f.min}{f.max === 100 ? " a 100" : `–${f.max}`}
            </li>
          ))}
        </ul>

        <h3 className="mt-5 text-[0.9375rem] font-semibold text-foreground">Como é calculado</h3>
        <ul className="m-0 mt-2 list-disc space-y-1 pl-5 text-[0.875rem] text-muted-foreground">
          <li>Considera os últimos 90 dias e é atualizado todo dia.</li>
          <li>A loja só recebe o <MarcaFind sufixo="Score" className="text-foreground" /> depois de ter histórico suficiente; até lá, aparece "Em avaliação".</li>
          <li>Desistências e falta de pagamento de quem compra não contam contra a loja.</li>
          <li>O plano contratado, a publicidade e o volume de vendas não entram no cálculo.</li>
          <li>O <MarcaFind sufixo="Score" className="text-foreground" /> não é garantia de qualidade: ele mostra o desempenho recente da loja na FindLook.</li>
        </ul>

        <div className={cn("mt-5 flex items-start gap-3 rounded-lg p-4", superficieDoCard)}>
          <IconeComBase tom="marca" redonda><Star className="fill-current" /></IconeComBase>
          <p className="m-0 text-[0.875rem] text-muted-foreground">
            <MarcaFind sufixo="Star" className="text-foreground" /> é o reconhecimento das lojas com excelência consistente. É conquistado só por mérito e revisto todo mês; nenhum plano compra o selo.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ── 2. Histórico ───────────────────────────────────────────── */
export type EventoDoHistorico = { id: string; tipo: "faixa" | "findstar" | "metodologia" | "renovacao"; titulo: string; detalhe?: string; quando: string };

const ICONE_DO_EVENTO: Record<EventoDoHistorico["tipo"], React.ReactNode> = {
  faixa: <TrendingUp />,
  findstar: <Star />,
  renovacao: <RefreshCw />,
  metodologia: <FileText />,
};

export function HistoricoDoFindScore({ pontos, eventos, className }: {
  /** Pontuação por dia (o eixo X é o rótulo do dia, por exemplo "24/11"). */
  pontos: { dia: string; findscore: number }[];
  eventos: EventoDoHistorico[];
  className?: string;
}) {
  const [periodo, setPeriodo] = React.useState<"30" | "60" | "90">("90");
  const dados = pontos.slice(-Number(periodo));
  return (
    <CardComCabecalho
      icone={<History />}
      titulo={<>Evolução do <MarcaFind sufixo="Score" /></>}
      descricao="Mudanças de faixa, conquistas e alterações da metodologia aparecem marcadas."
      acao={
        <SegmentedControl
          size="sm"
          value={periodo}
          onValueChange={(v) => setPeriodo(v as "30" | "60" | "90")}
          options={[{ value: "30", label: "30 dias" }, { value: "60", label: "60 dias" }, { value: "90", label: "90 dias" }]}
          aria-label="Período do histórico"
        />
      }
      nivel={3}
      className={className}
    >
      <GraficoDeDesempenho dados={dados} chaveX="dia" series={[{ chave: "findscore", rotulo: "FindScore", cor: "var(--chart-1)" }]} altura={200} tetoY={100} />
      {eventos.length > 0 && (
        <ul className="m-0 mt-4 list-none divide-y divide-border p-0">
          {eventos.map((e) => <ItemDeAtividade key={e.id} icone={ICONE_DO_EVENTO[e.tipo]} titulo={e.titulo} detalhe={e.detalhe} quando={e.quando} />)}
        </ul>
      )}
    </CardComCabecalho>
  );
}

/* ── 3. Avisos do reconhecimento e da conta (AlertaComAcao) ───── */
export const AVISOS_DE_GOVERNANCA = {
  publicado: { tom: "sucesso", titulo: "Seu FindScore está disponível", texto: "Sua loja atingiu os requisitos necessários para receber sua primeira classificação de desempenho.", acao: "Consultar FindScore" },
  novo_nivel: { tom: "sucesso", titulo: "Sua loja alcançou um novo nível", texto: "Seu desempenho evoluiu e sua loja conquistou uma nova classificação no FindScore.", acao: "Ver evolução" },
  queda: { tom: "aviso", titulo: "Seu FindScore precisa de atenção", texto: "Identificamos oportunidades de melhoria que podem ajudar sua loja a recuperar seu desempenho.", acao: "Ver oportunidades" },
  elegivel: { tom: "info", titulo: "Você está elegível ao FindStar", texto: "Sua loja atingiu os requisitos de excelência e será considerada na próxima avaliação mensal.", acao: "Conhecer os critérios" },
  conquistado: { tom: "sucesso", titulo: "Sua loja conquistou o FindStar!", texto: "Seu desempenho foi reconhecido pela FindLook. Os materiais oficiais de divulgação já estão disponíveis.", acao: "Divulgar conquista" },
  renovado: { tom: "sucesso", titulo: "Seu FindStar foi renovado", texto: "Sua loja continua atendendo aos critérios de excelência da FindLook.", acao: "Consultar reconhecimento" },
  risco: { tom: "aviso", titulo: "A próxima avaliação do FindStar está chegando", texto: "Alguns requisitos precisam de atenção para que sua loja continue elegível ao reconhecimento.", acao: "Ver requisitos" },
  nao_renovado: { tom: "info", titulo: "Seu reconhecimento FindStar não foi renovado", texto: "Nesta avaliação, sua loja não atingiu todos os requisitos necessários para manter o reconhecimento. Consulte seu desempenho e identifique oportunidades para reconquistá-lo.", acao: "Ver oportunidades de melhoria" },
  prazo: { tom: "aviso", titulo: "Uma solicitação está aguardando sua resposta", texto: "Responda dentro do prazo para evitar o cancelamento da reserva e possíveis impactos no seu FindScore.", acao: "Responder solicitação" },
  sem_resposta: { tom: "aviso", titulo: "Uma reserva foi cancelada por ausência de resposta", texto: "O prazo de atendimento expirou sem retorno da sua loja. Consulte a ocorrência e acompanhe seu impacto no desempenho.", acao: "Consultar ocorrência" },
  ocorrencia: { tom: "aviso", titulo: "Existe uma ocorrência que requer sua atenção", texto: "Uma situação relacionada à operação da sua loja está sendo analisada pela FindLook. Consulte as informações e os procedimentos disponíveis.", acao: "Consultar ocorrência" },
  suspensa: { tom: "erro", titulo: "Sua loja está temporariamente suspensa", texto: "Algumas funcionalidades foram restringidas enquanto analisamos uma ocorrência relacionada às políticas da FindLook.", acao: "Consultar decisão" },
  banida: { tom: "erro", titulo: "Sua loja foi descredenciada da FindLook", texto: "Após análise, foi identificada uma violação grave das condições de permanência na plataforma. Sua loja não poderá realizar novas operações na FindLook.", acao: "Consultar decisão" },
} as const satisfies Record<string, { tom: TomDoAlerta; titulo: string; texto: string; acao: string }>;

export type TipoDeAviso = keyof typeof AVISOS_DE_GOVERNANCA;

export function AvisoDeGovernanca({ tipo, href, linkSecundario, onFechar, className }: {
  tipo: TipoDeAviso;
  href?: string;
  /** Ação secundária em forma de link (por exemplo, "Entenda o FindScore"). */
  linkSecundario?: { rotulo: string; href: string };
  onFechar?: () => void;
  className?: string;
}) {
  const a = AVISOS_DE_GOVERNANCA[tipo];
  const icone = tipo === "conquistado" || tipo === "renovado" || tipo === "elegivel" ? <Award /> : tipo === "suspensa" || tipo === "banida" ? <ShieldAlert /> : undefined;
  return (
    <AlertaComAcao
      tom={a.tom}
      titulo={textoComMarcas(a.titulo)}
      icone={icone}
      onFechar={onFechar}
      className={className}
      acoes={
        <>
          <BotaoDoAlerta tom={a.tom} asChild><a href={href ?? "#"}>{a.acao}</a></BotaoDoAlerta>
          {linkSecundario && <LinkDoAlerta asChild><a href={linkSecundario.href}>{linkSecundario.rotulo}</a></LinkDoAlerta>}
        </>
      }
    >
      {textoComMarcas(a.texto)}
    </AlertaComAcao>
  );
}

/* ── 4. Denúncia ─────────────────────────────────────────────── */
export const CATEGORIAS_DE_DENUNCIA = [
  "Ausência de resposta", "Informações incorretas sobre a peça", "Produto indisponível anunciado como disponível", "Descumprimento de oferta",
  "Problema com pagamento", "Cobrança indevida", "Problema com entrega", "Problema com cancelamento", "Problema com troca ou devolução",
  "Problema com reembolso", "Atendimento ofensivo ou abusivo", "Discriminação", "Suspeita de fraude", "Produto falsificado ou ilícito",
  "Uso indevido de dados pessoais", "Outra situação",
] as const;

export function FormularioDeDenuncia({ loja, operacao, onEnviar, hrefAcompanhar = "#" }: {
  loja: string;
  /** Operação relacionada, quando existe ("Reserva #A1B2 · 23/11/2026"). Os dados dela já vão junto; não é preciso repetir. */
  operacao?: string;
  /** Envio real fica no produto. Deve rejeitar a Promise em caso de erro. */
  onEnviar: (dados: { categoria: string; descricao: string; arquivos: File[] }) => Promise<void>;
  hrefAcompanhar?: string;
}) {
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
          <AlertaComAcao
            tom="sucesso"
            titulo="Recebemos seu relato"
            icone={<CheckCircle2 />}
            acoes={<BotaoDoAlerta tom="sucesso" asChild><a href={hrefAcompanhar}>Acompanhar ocorrência</a></BotaoDoAlerta>}
          >
            As informações foram encaminhadas para análise. Você poderá acompanhar o andamento desta ocorrência pela <MarcaFind sufixo="Look" />.
          </AlertaComAcao>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={enviar} noValidate className="space-y-5" initial={false} exit={reduzir ? undefined : { opacity: 0, y: -8 }}>
          <div className="space-y-1">
            <p className="m-0 text-[0.875rem] text-muted-foreground">Loja: <span className="font-semibold text-foreground">{loja}</span></p>
            {operacao && <p className="m-0 text-[0.875rem] text-muted-foreground">Operação: <span className="font-semibold text-foreground">{operacao}</span> <span className="block text-[0.8125rem]">Os dados desta operação já seguem com o relato; não é preciso repetir.</span></p>}
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold text-foreground">O que aconteceu?</legend>
            <RadioGroup value={categoria} onValueChange={setCategoria} aria-describedby={tentou && faltaCategoria ? `${id}-erro-cat` : undefined} className="grid gap-2 sm:grid-cols-2">
              {CATEGORIAS_DE_DENUNCIA.map((c) => (
                <label key={c} className={cn("flex cursor-pointer select-none items-start gap-2.5 rounded-md border border-border bg-card p-3 text-[0.875rem] text-foreground transition-colors hover:border-primary/30 hover:bg-[var(--primary-muted)]", categoria === c && "border-primary/40 bg-[var(--primary-muted)]")}>
                  <RadioGroupItem value={c} className="mt-0.5" /> {c}
                </label>
              ))}
            </RadioGroup>
            {tentou && faltaCategoria && <p id={`${id}-erro-cat`} className="text-sm font-medium text-primary-text">Escolha a opção que mais se parece com o que aconteceu.</p>}
          </fieldset>

          <div className="space-y-1.5">
            <Label htmlFor={`${id}-desc`} className="text-sm font-semibold">Conte o que aconteceu</Label>
            <Textarea
              id={`${id}-desc`}
              rows={4}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              aria-invalid={tentou && faltaDescricao ? true : undefined}
              aria-describedby={`${id}-desc-ajuda`}
              className="bg-card"
            />
            <p id={`${id}-desc-ajuda`} className={cn("text-sm", tentou && faltaDescricao ? "font-medium text-primary-text" : "text-muted-foreground")}>
              {tentou && faltaDescricao ? "Escreva pelo menos 20 caracteres, com datas e detalhes, se tiver." : "Inclua datas e detalhes, se tiver. Não é preciso informar dados pessoais."}
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="m-0 text-sm font-semibold text-foreground">Evidências <span className="font-normal text-muted-foreground">(opcional)</span></p>
            <UploadDropzone
              size="compact"
              accept={["image/*", ".pdf"]}
              maxSize={10 * 1024 * 1024}
              maxFiles={5}
              title="Fotos, prints ou comprovantes"
              description="Até 5 arquivos, de até 10 MB cada."
              onFiles={(f) => setArquivos((a) => [...a, ...f].slice(0, 5))}
            />
            {arquivos.length > 0 && <p className="text-[0.8125rem] text-muted-foreground">{arquivos.length} {arquivos.length === 1 ? "arquivo anexado" : "arquivos anexados"}</p>}
          </div>

          {estado === "erro" && (
            <AlertaComAcao tom="erro" titulo="Não conseguimos enviar agora">Confira sua conexão e tente de novo. Seu texto continua aqui.</AlertaComAcao>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="m-0 text-[0.8125rem] text-muted-foreground">{textoComMarcas("Seu relato é analisado pela FindLook. A loja não vê seus dados de contato por esta denúncia.")}</p>
            <Button type="submit" disabled={estado === "enviando"} aria-busy={estado === "enviando" || undefined} className="shrink-0">
              {estado === "enviando" ? <><Loader2 aria-hidden className="animate-spin" /> Enviando…</> : "Enviar relato"}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/* ── 5. Andamento da ocorrência (Stepper) ───────────────────── */
export const ETAPAS_DA_OCORRENCIA = ["Recebida", "Em triagem", "Em análise", "Concluída"] as const;

export function AndamentoDaOcorrencia({ atual, aguardandoInformacoes = false, protocolo, className }: {
  /** Índice da etapa atual (0 a 3). */
  atual: number;
  /** A FindLook pediu informações complementares. */
  aguardandoInformacoes?: boolean;
  protocolo: string;
  className?: string;
}) {
  return (
    <CardComCabecalho icone={<FileText />} titulo={`Ocorrência ${protocolo}`} descricao="Acompanhe aqui cada etapa da análise." nivel={3} className={className}>
      <Stepper etapas={ETAPAS_DA_OCORRENCIA.map((titulo) => ({ titulo }))} atual={atual} rotulo="Andamento da ocorrência" />
      {aguardandoInformacoes && (
        <AlertaComAcao tom="aviso" titulo="Precisamos de mais informações" className="mt-4" acoes={<BotaoDoAlerta tom="aviso">Enviar informações</BotaoDoAlerta>}>
          {textoComMarcas("Para continuar a análise, responda às perguntas da FindLook nesta ocorrência.")}
        </AlertaComAcao>
      )}
    </CardComCabecalho>
  );
}

/* ── 6. Verificação pública do FindStar (destino do QR Code) ── */
export function VerificacaoDoFindStar({ loja, estado, concedidoEm, validade, className }: {
  loja: string;
  estado: "vigente" | "nao_vigente" | "indisponivel";
  concedidoEm?: string;
  validade?: string;
  className?: string;
}) {
  const texto = {
    vigente: "Esta loja possui reconhecimento FindStar vigente.",
    nao_vigente: "Esta loja não possui reconhecimento FindStar vigente neste momento.",
    indisponivel: "Esta loja não está disponível para novas operações na FindLook.",
  }[estado];
  return (
    <CardComCabecalho
      icone={estado === "vigente" ? <BadgeCheck /> : <Star />}
      tom={estado === "vigente" ? "marca" : "neutro"}
      titulo={<>Verificação <MarcaFind sufixo="Star" /></>}
      descricao={loja}
      nivel={2}
      className={className}
    >
      <p className={cn("m-0 text-[0.9375rem] font-semibold", estado === "vigente" ? "text-foreground" : "text-muted-foreground")}>{textoComMarcas(texto)}</p>
      {estado === "vigente" && (concedidoEm || validade) && (
        <p className="m-0 mt-1 text-[0.8125rem] text-muted-foreground">{[concedidoEm && `Concedido ou renovado em ${concedidoEm}`, validade && `Válido até ${validade}`].filter(Boolean).join(" · ")}</p>
      )}
      <p className="m-0 mt-3 text-[0.8125rem] text-muted-foreground">
        {textoComMarcas("O FindStar reconhece as lojas que se destacam pela excelência no atendimento e pelo cumprimento dos compromissos assumidos com os consumidores na FindLook. É revisto todo mês.")}
      </p>
    </CardComCabecalho>
  );
}
