"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, Check, Store, X, XCircle } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";
import { Stepper, type StepperEtapa } from "./stepper";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { IconeComBase } from "./painel-dados";
import { Campo, MensagemDeErro, GradeDeCampos, ResumoDeErros, type CampoProps, type ErroDoResumo } from "./campo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "./drawer";

/**
 * Cadastro do lojista (FindLook)
 *
 * 1º passo, na gaveta "Vamos apresentar sua loja?" (página do lojista):
 * - FormularioApresentarLoja: nome da loja e e-mail, botão Continuar e "Sem fidelidade: cancele quando quiser."
 * - GavetaApresentarLoja: a gaveta inferior com o formulário (tom escuro na página do lojista).
 *
 * Cadastro em 5 etapas (Responsável · Dados da loja · Plano · Revisão · Pagamento), peças reaproveitáveis:
 * - MolduraDoCadastro: card com o Stepper do design system no topo.
 * - EtapaDoCadastro: título (recebe o foco a cada etapa), explicação, aviso de campos obrigatórios, erro geral,
 *   resumo dos erros (2 ou mais), formulário, coluna lateral e a barra de ações presa ao pé.
 * - GradeDeCampos: um campo por linha; dois por linha só quando cada campo fica com 240 px ou mais.
 * - ResumoDeErros: Alerta de erro com a lista dos campos a conferir (cada item leva ao campo).
 *
 * Responsivo pela largura do próprio cadastro (container queries, decisão da dona do produto de 27/11/2026), não pela
 * largura da tela: o mesmo cadastro funciona na página inteira, num card estreito ou ao lado de outra coluna.
 * - A coluna lateral só fica ao lado do formulário quando a etapa tem 56rem (896 px) ou mais; antes disso, desce para
 *   baixo do formulário. O formulário é sempre a coluna principal; a lateral tem de 15rem a 18rem.
 * - LateralDaEtapa: ícone na base (IconeComBase, tom marca), título, explicação e um destaque num Alerta do design system
 *   (info; aviso usa o Alerta de aviso).
 * - BarraDaEtapa: Voltar e Continuar (com estado "carregando").
 * - ListaDeRevisao, BlocoDeRevisao e LinhaDeDado: o resumo da etapa Revisão, em blocos que abrem e fecham,
 *   com Editar para voltar à etapa.
 *
 * Só apresentação: nenhum componente grava dados nem consulta serviços. A validação padrão do 1º passo é de
 * formato (nome com 2 letras ou mais e e-mail no formato nome@exemplo.com); regras de negócio ficam no produto.
 */

const foco = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

/* ── Campo com rótulo, ajuda e erro ─────────────────────────────── */
/* Desde 27/11/2026 o campo padrão do DS é o Campo (ui/campo.tsx): CampoDoCadastro e MensagemDeErro são os mesmos
   componentes, com os nomes de antes para quem já os usa. */
type CampoDoCadastroProps = CampoProps;
const CampoDoCadastro = Campo;

/* ── 1º passo: Vamos apresentar sua loja? ────────────────────────── */
const textosPadraoApresentar = {
  titulo: "Vamos apresentar sua loja?",
  loja: "Como sua loja se chama?",
  lojaPlaceholder: "Ex.: Ateliê Aurora",
  email: "E-mail",
  emailPlaceholder: "nome@exemplo.com",
  botao: "Continuar",
  tranquilidade: ["Sem fidelidade: cancele quando quiser."],
  jaTem: "Já tem conta?",
  entrar: "Entrar",
  fechar: "Fechar",
  erroLoja: "Informe o nome da loja (pelo menos 2 letras).",
  erroEmailVazio: "Informe seu e-mail.",
  erroEmail: "Confira o e-mail. Ele precisa ter o formato nome@exemplo.com.",
};
type TextosApresentar = typeof textosPadraoApresentar;
type DadosApresentar = { loja: string; email: string };
type ErrosApresentar = Partial<Record<keyof DadosApresentar, string | null>>;

function validarApresentar(d: DadosApresentar, tx: TextosApresentar): ErrosApresentar {
  const loja = d.loja.trim();
  const email = d.email.trim();
  return {
    loja: (loja.match(/\p{L}/gu) ?? []).length < 2 ? tx.erroLoja : null,
    email: !email ? tx.erroEmailVazio : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? null : tx.erroEmail,
  };
}

type FormularioApresentarLojaProps = {
  /** card: com título próprio. gaveta: o título fica no cabeçalho da gaveta. */
  variante?: "card" | "gaveta";
  idTitulo?: string;
  valoresIniciais?: Partial<DadosApresentar>;
  onContinuar?: (dados: DadosApresentar) => void;
  /** Troca a validação padrão (formato). */
  validar?: (dados: DadosApresentar) => ErrosApresentar;
  /** Link "Entrar" (padrão: #). */
  hrefEntrar?: string;
  textos?: Partial<TextosApresentar>;
  className?: string;
};

function FormularioApresentarLoja({ variante = "card", idTitulo, valoresIniciais, onContinuar, validar, hrefEntrar = "#", textos, className }: FormularioApresentarLojaProps) {
  const tx = { ...textosPadraoApresentar, ...textos };
  const gaveta = variante === "gaveta";
  const id = React.useId();
  const [dados, setDados] = React.useState<DadosApresentar>({ loja: valoresIniciais?.loja ?? "", email: valoresIniciais?.email ?? "" });
  const [erros, setErros] = React.useState<ErrosApresentar>({});
  const [tentou, setTentou] = React.useState(false);
  const checar = (d: DadosApresentar) => (validar ? validar(d) : validarApresentar(d, tx));

  const mudar = (campo: keyof DadosApresentar, valor: string) => {
    const novo = { ...dados, [campo]: valor };
    setDados(novo);
    if (tentou) setErros(checar(novo));
  };

  function continuar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTentou(true);
    const novos = checar(dados);
    setErros(novos);
    if (Object.values(novos).some(Boolean)) {
      // O foco vai para o primeiro campo com erro, depois que a tela mostra os erros.
      const form = e.currentTarget;
      requestAnimationFrame(() => form.querySelector<HTMLInputElement>("[aria-invalid=true]")?.focus());
      return;
    }
    onContinuar?.({ loja: dados.loja.trim(), email: dados.email.trim() });
  }

  return (
    <form
      data-slot="formulario-apresentar-loja"
      onSubmit={continuar}
      noValidate
      aria-labelledby={gaveta ? idTitulo : `${id}-titulo`}
      aria-label={gaveta && !idTitulo ? tx.titulo : undefined}
      className={className}
    >
      {!gaveta && (
        <h2 id={`${id}-titulo`} className="mb-5 flex items-center gap-2 text-h4 leading-7 font-extrabold tracking-tight text-foreground">
          <Store className="size-5 shrink-0 text-primary-text" aria-hidden />
          {tx.titulo}
        </h2>
      )}
      <div className="space-y-4">
        <CampoDoCadastro rotulo={tx.loja} placeholder={tx.lojaPlaceholder} autoComplete="organization" maxLength={120} value={dados.loja} onChange={(e) => mudar("loja", e.target.value)} erro={erros.loja} />
        <CampoDoCadastro rotulo={tx.email} placeholder={tx.emailPlaceholder} type="email" inputMode="email" autoComplete="email" maxLength={254} value={dados.email} onChange={(e) => mudar("email", e.target.value)} erro={erros.email} />
      </div>
      <Button type="submit" size="lg" className="mt-6 h-12 w-full text-body leading-6">
        {tx.botao} <ArrowRight aria-hidden />
      </Button>
      <ul className="mt-4 space-y-1">
        {tx.tranquilidade.map((t) => (
          <li key={t} className="flex items-start gap-2 text-body-sm leading-5 text-muted-foreground">
            <Check className="mt-1 size-4 shrink-0 text-success" aria-hidden /> {t}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-body-sm leading-5 text-muted-foreground">
        {tx.jaTem}{" "}
        <a href={hrefEntrar} className={cn("rounded-sm font-semibold text-primary-text underline underline-offset-4", foco)}>{tx.entrar}</a>
      </p>
    </form>
  );
}

type GavetaApresentarLojaProps = Omit<FormularioApresentarLojaProps, "variante" | "idTitulo"> & {
  aberta: boolean;
  onAbertaChange: (aberta: boolean) => void;
  /** escuro: na página do lojista, que usa o tema escuro (decisão de 01/11/2026). */
  tom?: "claro" | "escuro";
  container?: HTMLElement | null;
};

function GavetaApresentarLoja({ aberta, onAbertaChange, tom = "claro", container, textos, ...props }: GavetaApresentarLojaProps) {
  const tx = { ...textosPadraoApresentar, ...textos };
  return (
    <Drawer open={aberta} onOpenChange={onAbertaChange}>
      <DrawerContent container={container} className={cn("max-h-[92dvh] text-foreground md:mx-auto md:max-w-lg", tom === "escuro" && "dark bg-[var(--graphite-950)]")}>
        <DrawerHeader className="flex-row items-center justify-between gap-3 px-5 pt-3 pb-2 text-left">
          <DrawerTitle className="flex items-center gap-2 text-h4 leading-7 font-extrabold tracking-tight text-foreground">
            <Store className="size-5 shrink-0 text-primary-text" aria-hidden />
            {tx.titulo}
          </DrawerTitle>
          <DrawerClose aria-label={tx.fechar} className={cn("flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground", foco)}>
            <X className="size-5" aria-hidden />
          </DrawerClose>
          <DrawerDescription className="sr-only">{tx.titulo}</DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <FormularioApresentarLoja {...props} textos={textos} variante="gaveta" />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

/* ── Cadastro em etapas ──────────────────────────────────────────── */
type MolduraDoCadastroProps = {
  etapas: StepperEtapa[];
  atual: number;
  concluidas?: number[];
  onIrPara?: (indice: number) => void;
  rotulo?: string;
  children: React.ReactNode;
  className?: string;
};

function MolduraDoCadastro({ etapas, atual, concluidas, onIrPara, rotulo = "Etapas do cadastro da loja", children, className }: MolduraDoCadastroProps) {
  return (
    <div data-slot="moldura-do-cadastro" className={cn("@container/moldura min-w-0 rounded-xl border border-border bg-card", className)}>
      <div className="px-4 pt-5 @min-[40rem]/moldura:px-7 @min-[40rem]/moldura:pt-4">
        <Stepper etapas={etapas} atual={atual} concluidas={concluidas} onIrPara={onIrPara} rotulo={rotulo} />
      </div>
      {children}
    </div>
  );
}

type EtapaDoCadastroProps = {
  titulo: string;
  explicacao?: string;
  /** Recebe o foco a cada troca de etapa (leitores de tela anunciam a nova etapa). */
  tituloRef?: React.Ref<HTMLHeadingElement>;
  /** Texto "* Campos obrigatórios" (omita quando a etapa não tem campos). */
  obrigatorios?: string;
  /** Erro geral da etapa (por exemplo, falha ao salvar), num Alerta de erro. */
  erro?: React.ReactNode;
  /** Erros dos campos, para o resumo no topo. O resumo só aparece com 2 erros ou mais (com 1, basta o erro no campo). */
  resumoDeErros?: ErroDoResumo[];
  lateral?: React.ReactNode;
  barra?: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
};

function EtapaDoCadastro({ titulo, explicacao, tituloRef, obrigatorios, erro, resumoDeErros, lateral, barra, onSubmit, children }: EtapaDoCadastroProps) {
  return (
    <form data-slot="etapa-do-cadastro" onSubmit={(e) => (onSubmit ? onSubmit(e) : e.preventDefault())} noValidate className="@container/etapa">
      <div
        className={cn(
          "grid gap-8 px-4 pt-8 pb-10 @min-[40rem]/etapa:px-7 @min-[40rem]/etapa:pt-12",
          lateral && "@min-[56rem]/etapa:grid-cols-[minmax(0,1fr)_minmax(15rem,18rem)] @min-[56rem]/etapa:gap-8",
        )}
      >
        <div className="min-w-0">
          <h2 ref={tituloRef} tabIndex={-1} className="text-h3 font-bold leading-tight tracking-[-0.02em] text-foreground outline-none [text-wrap:pretty]">
            {titulo}
          </h2>
          {explicacao && <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{explicacao}</p>}
          {obrigatorios && <p className="mt-5 text-body-sm leading-5 text-muted-foreground">{obrigatorios}</p>}
          {erro && (
            <Alert variant="error" className="mt-5">
              <XCircle aria-hidden />
              <AlertDescription>{erro}</AlertDescription>
            </Alert>
          )}
          {resumoDeErros && resumoDeErros.length >= 2 && <ResumoDeErros erros={resumoDeErros} className="mt-5" />}
          <div className="mt-6">{children}</div>
        </div>
        {lateral}
      </div>
      {barra}
    </form>
  );
}

type BarraDaEtapaProps = {
  onVoltar?: () => void;
  rotuloVoltar?: string;
  rotuloContinuar?: React.ReactNode;
  /** Mostra o carregamento no botão principal (Button carregando: cor do botão esmaecida, giro, sem clique). */
  carregando?: boolean;
  textoCarregando?: string;
  desativado?: boolean;
  /**
   * id do texto que explica o Continuar (por exemplo, "Você revisa tudo antes de publicar" ou o motivo de estar
   * desativado): vira o aria-describedby do botão principal (27/11/2026).
   */
  descricaoDoContinuar?: string;
  /** Troca os botões padrão. */
  children?: React.ReactNode;
  className?: string;
};

function BarraDaEtapa({ onVoltar, rotuloVoltar = "Voltar", rotuloContinuar, carregando = false, textoCarregando = "Salvando…", desativado = false, descricaoDoContinuar, children, className }: BarraDaEtapaProps) {
  // Os dois botões dividem a linha quando cabem; quando não cabem (rótulo longo no celular), cada um ocupa a largura
  // toda e o principal fica em cima (27/11/2026: nunca passam da borda nem ficam com larguras diferentes).
  const botao = "flex-[1_1_auto] @min-[40rem]/etapa:min-w-40 @min-[40rem]/etapa:flex-none";
  return (
    <div data-slot="barra-da-etapa" className={cn("sticky bottom-0 z-10 flex flex-wrap-reverse justify-end gap-3 rounded-b-xl border-t border-border bg-card px-4 py-3 @min-[40rem]/etapa:px-7 @min-[40rem]/etapa:py-4", className)}>
      {children ?? (
        <>
          {onVoltar && (
            <Button type="button" variant="outline" size="lg" className={botao} onClick={onVoltar}>
              <ArrowLeft aria-hidden className="@min-[40rem]/etapa:hidden" /> {rotuloVoltar}
            </Button>
          )}
          {/* Carregando = o Button carregando (28/11/2026): na cor do botão, um pouco esmaecido, com o giro; nunca o cinza de desativado. */}
          <Button type="submit" size="lg" className={botao} disabled={desativado} carregando={carregando} textoCarregando={textoCarregando} aria-describedby={descricaoDoContinuar}>
            {rotuloContinuar ?? (
              <>
                Continuar <ArrowRight aria-hidden />
              </>
            )}
          </Button>
        </>
      )}
    </div>
  );
}

/* O destaque é um Alerta do design system: info (padrão; "marca" também vira info, o Alerta não tem tom de marca) ou aviso. */
const TONS_LATERAL = { info: "info", marca: "info", aviso: "warning" } as const;

type LateralDaEtapaProps = {
  icone: React.ReactNode;
  titulo: string;
  paragrafos?: string[];
  destaque?: string;
  tom?: keyof typeof TONS_LATERAL;
  /** Ícone do Alerta (lucide). Sem ele, o Alerta fica sem ícone, o recomendado na coluna lateral: o texto ganha a
      largura toda (com ícone, numa lateral de 18rem, sobram cerca de 130 px para o texto). */
  iconeDestaque?: React.ReactElement;
  className?: string;
};

function LateralDaEtapa({ icone, titulo, paragrafos = [], destaque, tom = "info", iconeDestaque, className }: LateralDaEtapaProps) {
  const id = React.useId();
  return (
    <aside data-slot="lateral-da-etapa" aria-labelledby={id} className={cn("@container/lateral min-w-0 self-start rounded-xl border border-border bg-card p-5 @min-[56rem]/etapa:p-6", className)}>
      <IconeComBase tom="marca" tamanho="lg">{icone}</IconeComBase>
      <h3 id={id} className="mt-4 text-subtitle font-bold tracking-[-0.01em] text-foreground">{titulo}</h3>
      {paragrafos.map((p) => (
        <p key={p} className="mt-2 text-body-sm leading-relaxed text-muted-foreground">{p}</p>
      ))}
      {destaque && (
        <Alert variant={TONS_LATERAL[tom]} role="note" className="mt-4">
          {iconeDestaque}
          <AlertDescription>{destaque}</AlertDescription>
        </Alert>
      )}
    </aside>
  );
}

/* ── Revisão ─────────────────────────────────────────────────────── */
function ListaDeRevisao({ children, valoresAbertos, className }: { children: React.ReactNode; valoresAbertos?: string[]; className?: string }) {
  return (
    <Accordion type="multiple" defaultValue={valoresAbertos} className={cn("space-y-3", className)}>
      {children}
    </Accordion>
  );
}

type BlocoDeRevisaoProps = {
  valor: string;
  /** Título do bloco, por exemplo "02 · Dados da loja". */
  titulo: string;
  /** Nome da etapa, lido junto com Editar ("Editar dados da loja"). */
  nomeEtapa?: string;
  /** Partes do resumo mostrado com o bloco fechado (as vazias são ignoradas). */
  resumo?: (string | false | null | undefined)[];
  onEditar?: () => void;
  rotuloEditar?: string;
  /** Conteúdo depois da lista de dados (por exemplo, os recursos do plano). */
  depois?: React.ReactNode;
  children: React.ReactNode;
};

function BlocoDeRevisao({ valor, titulo, nomeEtapa, resumo = [], onEditar, rotuloEditar = "Editar", depois, children }: BlocoDeRevisaoProps) {
  const texto = resumo.filter(Boolean).join(" · ");
  return (
    <AccordionItem value={valor} data-slot="bloco-de-revisao" className="@container/revisao rounded-lg border border-border px-5 last:border-b">
      <AccordionTrigger className="min-w-0 items-center py-4 hover:no-underline [&>svg]:size-5 [&>svg]:text-primary-text">
        <span className="min-w-0">
          <span className="block text-body leading-6 font-bold text-foreground">{titulo}</span>
          {texto && <span className="mt-1 block truncate text-body-sm leading-5 font-normal text-muted-foreground">{texto}</span>}
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <dl className="grid gap-x-6 gap-y-3 text-body-sm leading-5 @min-[30rem]/revisao:grid-cols-2">{children}</dl>
        {depois}
        {onEditar && (
          <button type="button" onClick={onEditar} className={cn("mt-4 rounded-sm text-body-sm leading-5 font-semibold text-primary-text underline underline-offset-4", foco)}>
            {rotuloEditar}
            {nomeEtapa && <span className="sr-only"> {nomeEtapa.toLowerCase()}</span>}
          </button>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

function LinhaDeDado({ rotulo, valor, vazio = "Não informado", className }: { rotulo: string; valor?: React.ReactNode; vazio?: string; className?: string }) {
  return (
    <div data-slot="linha-de-dado" className={cn("min-w-0", className)}>
      <dt className="text-label leading-4 text-muted-foreground">{rotulo}</dt>
      <dd className="break-words font-medium text-foreground">{valor || vazio}</dd>
    </div>
  );
}

export {
  CampoDoCadastro, MensagemDeErro, GradeDeCampos, ResumoDeErros, FormularioApresentarLoja, GavetaApresentarLoja, MolduraDoCadastro, EtapaDoCadastro,
  BarraDaEtapa, LateralDaEtapa, ListaDeRevisao, BlocoDeRevisao, LinhaDeDado, validarApresentar, textosPadraoApresentar,
};
export type { CampoDoCadastroProps, ErroDoResumo, DadosApresentar, ErrosApresentar, TextosApresentar, FormularioApresentarLojaProps, GavetaApresentarLojaProps, EtapaDoCadastroProps, BarraDaEtapaProps, LateralDaEtapaProps, BlocoDeRevisaoProps };
