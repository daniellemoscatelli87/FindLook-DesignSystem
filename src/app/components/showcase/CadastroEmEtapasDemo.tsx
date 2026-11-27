import React, { useEffect, useId, useRef, useState } from "react";
import {
  ArrowRight, AtSign, Check, CreditCard, Globe, Info, ListChecks, Loader2, Lock, MapPin, QrCode, RotateCcw, ShieldCheck, Store, UserRoundCog, Wand2,
} from "lucide-react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { SegmentedControl } from "../ui/segmented-control";
import { ImageUpload } from "../ui/upload";
import { PasswordConfirm, regrasPadrao } from "../ui/password-field";
import {
  CampoDoCadastro, MensagemDeErro, GradeDeCampos, MolduraDoCadastro, EtapaDoCadastro, BarraDaEtapa, LateralDaEtapa, ListaDeRevisao, BlocoDeRevisao,
  LinhaDeDado, type ErroDoResumo,
} from "../ui/cadastro-lojista";
import { navegarPara } from "./shared/VejaEm";

/*
 * Demonstração do cadastro do lojista em 5 etapas (pedido da dona do produto, 27/11/2026): cada etapa combina
 * componentes do design system. Só apresentação: nada é gravado, a consulta do CEP é simulada e planos e preços
 * são exemplos (R$ 00,00). As regras de negócio (planos, preços, CNPJ, pagamento) ficam no produto.
 */

const ETAPAS = [{ titulo: "Responsável" }, { titulo: "Dados da loja" }, { titulo: "Plano" }, { titulo: "Revisão" }, { titulo: "Pagamento" }];

/* ── Máscaras (comportamento do campo; o design system ainda não tem um componente de máscara) ── */
const digitos = (v: string) => v.replace(/\D/g, "");
const mascaraCelular = (v: string) => {
  const d = digitos(v).slice(0, 11);
  if (!d) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};
const mascaraCnpj = (v: string) =>
  digitos(v).slice(0, 14)
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
const mascaraCep = (v: string) => digitos(v).slice(0, 8).replace(/^(\d{5})(\d)/, "$1-$2");
const mascaraCartao = (v: string) => digitos(v).slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
const mascaraValidade = (v: string) => digitos(v).slice(0, 4).replace(/^(\d{2})(\d)/, "$1/$2");

/** Dígitos verificadores do CNPJ (formato, não consulta a Receita). */
function cnpjValido(v: string) {
  const d = digitos(v);
  if (d.length !== 14 || /^(\d)\1+$/.test(d)) return false;
  const dv = (base: string) => {
    let soma = 0, peso = base.length - 7;
    for (const n of base) { soma += Number(n) * peso--; if (peso < 2) peso = 9; }
    const r = soma % 11;
    return r < 2 ? 0 : 11 - r;
  };
  const d1 = dv(d.slice(0, 12));
  const d2 = dv(d.slice(0, 12) + d1);
  return d.endsWith(`${d1}${d2}`);
}

/* ── Dados ── */
type Tipo = "loja" | "brecho" | "ambos";
type Periodo = "mensal" | "anual";
type Forma = "cartao" | "pix";
type Dados = {
  nome: string; email: string; celular: string; senha: string; confirmacao: string;
  loja: string; cnpj: string; semCnpj: boolean; tipo: Tipo; categorias: string[]; cep: string; rua: string; numero: string; complemento: string;
  bairro: string; cidade: string; logo: string | null; instagram: string; site: string;
  plano: string; periodo: Periodo; termos: boolean;
  forma: Forma; cartaoNumero: string; cartaoNome: string; validade: string; cvv: string;
};
type Campo = keyof Dados;
type Erros = Partial<Record<Campo, string>>;

const VAZIO: Dados = {
  nome: "", email: "", celular: "", senha: "", confirmacao: "",
  loja: "", cnpj: "", semCnpj: false, tipo: "loja", categorias: [], cep: "", rua: "", numero: "", complemento: "", bairro: "", cidade: "", logo: null, instagram: "", site: "",
  plano: "", periodo: "mensal", termos: false,
  forma: "cartao", cartaoNumero: "", cartaoNome: "", validade: "", cvv: "",
};
/** Dados de exemplo (fictícios) para percorrer a demonstração sem digitar. */
const EXEMPLO: Dados = {
  ...VAZIO,
  nome: "Ana Exemplo", email: "ana@aurora.exemplo.com.br", celular: "(41) 90000-0000", senha: "Exemplo@2026", confirmacao: "Exemplo@2026",
  loja: "Brechó Aurora", cnpj: "11.222.333/0001-81", tipo: "brecho", categorias: ["Feminino", "Acessórios"], cep: "80000-000", rua: "Rua Exemplo", numero: "100",
  bairro: "Centro", cidade: "Curitiba · PR", instagram: "brechoaurora", plano: "desempenho",
};

const TIPOS = [
  { value: "loja" as const, label: "Loja" },
  { value: "brecho" as const, label: "Brechó" },
  { value: "ambos" as const, label: "Os dois" },
];
const NOME_DO_TIPO: Record<Tipo, string> = { loja: "Loja", brecho: "Brechó", ambos: "Loja e brechó" };
const CATEGORIAS = ["Feminino", "Masculino", "Infantil", "Plus size", "Acessórios", "Calçados", "Moda praia", "Festa"];

/* Planos de exemplo: os nomes vêm do Card de plano do design system; preços e recursos são só ilustrativos. */
const PLANOS = [
  { id: "visibilidade", nome: "Visibilidade", paraQuem: "Para começar a ser encontrada", recursos: ["Perfil da loja no mapa", "Peças na busca"] },
  { id: "desempenho", nome: "Desempenho", paraQuem: "Para acompanhar o interesse", recursos: ["Tudo do Visibilidade", "Painel de desempenho"], recomendado: true },
  { id: "oportunidades", nome: "Oportunidades", paraQuem: "Para crescer com dados da região", recursos: ["Tudo do Desempenho", "Insights do mercado local"] },
];
const PRECO_EXEMPLO = "R$ 00,00";

const ORDEM: Campo[][] = [
  ["nome", "email", "celular", "senha", "confirmacao"],
  ["loja", "cnpj", "categorias", "cep", "numero"],
  ["plano"],
  ["termos"],
  ["cartaoNumero", "cartaoNome", "validade", "cvv"],
];
const ROTULOS: Partial<Record<Campo, string>> = {
  nome: "Nome completo", email: "E-mail de acesso", celular: "Celular (WhatsApp)", senha: "Senha", confirmacao: "Confirmar senha",
  loja: "Nome da loja", cnpj: "CNPJ", categorias: "Categorias", cep: "CEP", numero: "Número",
  plano: "Plano", termos: "Termos de uso", cartaoNumero: "Número do cartão", cartaoNome: "Nome impresso no cartão", validade: "Validade", cvv: "Código de segurança",
};

function validar(etapa: number, d: Dados): Erros {
  const e: Erros = {};
  if (etapa === 0) {
    if ((d.nome.trim().match(/\p{L}/gu) ?? []).length < 2) e.nome = "Informe seu nome completo.";
    const email = d.email.trim();
    if (!email) e.email = "Informe seu e-mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) e.email = "Confira o e-mail. Ele precisa ter o formato nome@exemplo.com.";
    if (digitos(d.celular).length < 10) e.celular = "Informe o celular com DDD, como (41) 90000-0000.";
    if (!d.senha) e.senha = "Crie uma senha.";
    else if (!regrasPadrao.every((r) => r.test(d.senha))) e.senha = "A senha ainda não atende a todos os itens da lista.";
    if (!d.confirmacao) e.confirmacao = "Repita a senha para confirmar.";
    else if (d.confirmacao !== d.senha) e.confirmacao = "As senhas não coincidem.";
  }
  if (etapa === 1) {
    if ((d.loja.trim().match(/\p{L}/gu) ?? []).length < 2) e.loja = "Informe o nome da loja.";
    if (!d.semCnpj) {
      if (!digitos(d.cnpj)) e.cnpj = "Informe o CNPJ ou marque “Ainda não tenho CNPJ”.";
      else if (!cnpjValido(d.cnpj)) e.cnpj = "Confira o CNPJ: os números não conferem.";
    }
    if (!d.categorias.length) e.categorias = "Escolha pelo menos uma categoria.";
    if (digitos(d.cep).length !== 8) e.cep = "Informe o CEP com 8 números.";
    if (!d.numero.trim()) e.numero = "Informe o número (ou “s/n”).";
  }
  if (etapa === 2 && !d.plano) e.plano = "Escolha um plano para continuar.";
  if (etapa === 3 && !d.termos) e.termos = "Para continuar, aceite os Termos de uso e a Política de privacidade.";
  if (etapa === 4 && d.forma === "cartao") {
    if (digitos(d.cartaoNumero).length !== 16) e.cartaoNumero = "Informe os 16 números do cartão.";
    if ((d.cartaoNome.trim().match(/\p{L}/gu) ?? []).length < 2) e.cartaoNome = "Informe o nome como está no cartão.";
    const [mm] = d.validade.split("/");
    if (digitos(d.validade).length !== 4 || Number(mm) < 1 || Number(mm) > 12) e.validade = "Informe a validade no formato MM/AA.";
    if (digitos(d.cvv).length < 3) e.cvv = "Informe o código de 3 ou 4 números.";
  }
  return e;
}

/* ── Peças de composição (só padrões que já existem no design system) ── */

/** Grupo de campos com legenda (fieldset), para separar assuntos dentro de uma etapa longa. */
function Grupo({ titulo, descricao, children, className }: { titulo: string; descricao?: string; children: React.ReactNode; className?: string }) {
  return (
    <fieldset className={cn("min-w-0 border-t border-border pt-6 first:border-t-0 first:pt-0", className)}>
      <legend className="float-left w-full text-[0.9375rem] font-bold text-foreground">{titulo}</legend>
      {descricao && <p className="clear-both pt-1 text-sm text-muted-foreground">{descricao}</p>}
      <div className="clear-both pt-4">{children}</div>
    </fieldset>
  );
}

/** Chip filtrável (Rótulos › Chips) com o tom suave do Controle segmentado: um só botão preenchido por área. */
function Chip({ ativo, onClick, children, id, invalido }: { ativo: boolean; onClick: () => void; children: React.ReactNode; id?: string; invalido?: boolean }) {
  return (
    <button
      id={id}
      type="button"
      aria-pressed={ativo}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[0.8125rem] font-medium",
        "transition-[background-color,border-color,color] duration-[var(--duration-fast)] ease-[var(--ease-out)] motion-reduce:transition-none",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        ativo
          ? "border-primary/40 bg-[var(--primary-muted)] font-semibold text-primary-text"
          : cn("bg-card text-foreground hover:border-[var(--border-strong)] hover:bg-row-hover", invalido ? "border-error/60" : "border-border"),
      )}
    >
      {ativo && <Check className="size-3.5 motion-safe:animate-in motion-safe:zoom-in-50" strokeWidth={3} aria-hidden />}
      {children}
    </button>
  );
}

/** Cartão selecionável (Cards › Estados: borda de 2 px na primária e marcação visível) com um RadioGroupItem. */
function CartaoDeOpcao({ id, valor, selecionado, children, topo }: { id: string; valor: string; selecionado: boolean; children: React.ReactNode; topo?: React.ReactNode }) {
  return (
    <label
      htmlFor={id}
      data-selecionado={selecionado || undefined}
      className={cn(
        "relative flex min-w-0 cursor-pointer flex-col rounded-xl border-2 bg-card p-5",
        "transition-[border-color,background-color] duration-[var(--duration-fast)] ease-[var(--ease-out)] motion-reduce:transition-none",
        "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2",
        selecionado ? "border-primary" : "border-border hover:border-[var(--border-strong)]",
      )}
    >
      {topo}
      <span className="flex items-start gap-3">
        <span className="min-w-0 flex-1">{children}</span>
        <RadioGroupItem id={id} value={valor} className="mt-0.5 shrink-0" />
      </span>
    </label>
  );
}

/* ── Demonstração ── */
export function CadastroEmEtapasDemo() {
  const base = useId();
  const id = (c: Campo) => `${base}-${c}`;
  const [etapa, setEtapa] = useState(0);
  const [direcao, setDirecao] = useState<1 | -1>(1);
  const [concluidas, setConcluidas] = useState<number[]>([]);
  const [d, setD] = useState<Dados>(VAZIO);
  const [erros, setErros] = useState<Erros>({});
  const [tentou, setTentou] = useState<Record<number, boolean>>({});
  const [salvando, setSalvando] = useState(false);
  const [concluido, setConcluido] = useState(false);
  const [vindoDaRevisao, setVindoDaRevisao] = useState(false);
  const [cep, setCep] = useState<"parado" | "buscando" | "achou">("parado");
  const titulo = useRef<HTMLHeadingElement>(null);
  const raiz = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const depois = (ms: number, fn: () => void) => { timers.current.push(window.setTimeout(fn, ms)); };

  const focarTitulo = () => requestAnimationFrame(() => titulo.current?.focus({ preventScroll: true }));
  const rolarParaOTopo = () => {
    const el = raiz.current;
    if (!el) return;
    const topo = el.getBoundingClientRect().top;
    if (topo < 0 || topo > window.innerHeight * 0.6) el.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  const irPara = (i: number) => {
    setDirecao(i >= etapa ? 1 : -1);
    setEtapa(i);
    setErros({});
    rolarParaOTopo();
    focarTitulo();
  };

  const mudar = <K extends Campo>(campo: K, valor: Dados[K]) => {
    setD((atual) => {
      const novo = { ...atual, [campo]: valor };
      if (tentou[etapa]) setErros(validar(etapa, novo));
      return novo;
    });
  };

  // CEP: ao completar 8 números, simula a consulta e preenche rua, bairro e cidade.
  const mudarCep = (v: string) => {
    const m = mascaraCep(v);
    mudar("cep", m);
    if (digitos(m).length === 8) {
      setCep("buscando");
      depois(700, () => {
        setD((a) => ({ ...a, rua: a.rua || "Rua Exemplo", bairro: a.bairro || "Centro", cidade: a.cidade || "Curitiba · PR" }));
        setCep("achou");
      });
    } else setCep("parado");
  };

  const focarCampo = (campoId: string) => {
    const el = document.getElementById(campoId);
    el?.focus({ preventScroll: true });
    el?.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  const continuar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (salvando) return;
    setTentou((t) => ({ ...t, [etapa]: true }));
    const novos = validar(etapa, d);
    setErros(novos);
    const primeiro = ORDEM[etapa].find((c) => novos[c]);
    if (primeiro) {
      requestAnimationFrame(() => focarCampo(id(primeiro)));
      return;
    }
    setSalvando(true);
    const final = etapa === ETAPAS.length - 1;
    depois(final ? 1600 : 450, () => {
      setSalvando(false);
      setConcluidas((c) => Array.from(new Set([...c, etapa])));
      if (final) {
        setConcluido(true);
        rolarParaOTopo();
        focarTitulo();
        return;
      }
      const proxima = vindoDaRevisao ? 3 : etapa + 1;
      setVindoDaRevisao(false);
      irPara(proxima);
    });
  };

  const editar = (i: number) => {
    setVindoDaRevisao(true);
    irPara(i);
  };

  const preencher = () => {
    setD(EXEMPLO);
    setErros({});
    setCep("achou");
  };
  const recomecar = () => {
    setD(VAZIO);
    setErros({});
    setTentou({});
    setConcluidas([]);
    setConcluido(false);
    setVindoDaRevisao(false);
    setCep("parado");
    irPara(0);
  };

  const resumo: ErroDoResumo[] = ORDEM[etapa].filter((c) => erros[c]).map((c) => ({ id: id(c), rotulo: ROTULOS[c] ?? c, mensagem: erros[c]! }));
  const plano = PLANOS.find((p) => p.id === d.plano);
  const barra = (onVoltar?: () => void, rotuloFinal?: React.ReactNode, textoCarregando = "Salvando…") => (
    <BarraDaEtapa
      onVoltar={onVoltar}
      carregando={salvando}
      textoCarregando={textoCarregando}
      rotuloContinuar={vindoDaRevisao && etapa < 3 ? <>Salvar e voltar à revisão <ArrowRight aria-hidden /></> : rotuloFinal}
    />
  );
  const entrada = cn(
    "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-[var(--duration-normal)] motion-safe:ease-[var(--ease-out)]",
    direcao === 1 ? "motion-safe:slide-in-from-right-3" : "motion-safe:slide-in-from-left-3",
  );

  return (
    <div ref={raiz} className="min-w-0 scroll-mt-32 space-y-3" data-demo-cadastro>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="min-w-0 flex-1 text-[0.8125rem] text-muted-foreground">
          Experimente: Continuar com campos vazios mostra os erros; o Stepper reabre as etapas concluídas; na Revisão, Editar volta à etapa.
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm" onClick={preencher}><Wand2 aria-hidden /> Preencher com exemplo</Button>
          <Button type="button" variant="ghost" size="sm" onClick={recomecar}><RotateCcw aria-hidden /> Recomeçar</Button>
        </div>
      </div>

      <MolduraDoCadastro etapas={ETAPAS} atual={concluido ? ETAPAS.length : etapa} concluidas={concluido ? [0, 1, 2, 3, 4] : concluidas} onIrPara={concluido ? undefined : irPara}>
        <div key={concluido ? "fim" : etapa} className={entrada}>
          {concluido ? (
            <Sucesso tituloRef={titulo} email={d.email} onRecomecar={recomecar} />
          ) : (
            <>
              {etapa === 0 && (
                <EtapaDoCadastro
                  titulo="Primeiro, seu acesso."
                  explicacao="Informe os dados de quem será responsável pela conta e pelo contato com a FindLook."
                  tituloRef={titulo}
                  obrigatorios="* Campos obrigatórios"
                  resumoDeErros={resumo}
                  onSubmit={continuar}
                  lateral={
                    <LateralDaEtapa
                      icone={<UserRoundCog />}
                      titulo="Quem deve ser o responsável?"
                      paragrafos={["A pessoa que vai administrar a conta da loja: configurações, assinatura e cobrança."]}
                      destaque="Seus dados pessoais não aparecem no perfil público da loja."
                      iconeDestaque={<Lock />}
                    />
                  }
                  barra={barra()}
                >
                  <GradeDeCampos>
                    <CampoDoCadastro id={id("nome")} rotulo="Nome completo *" placeholder="Seu nome completo" autoComplete="name" maxLength={120} aria-required value={d.nome} onChange={(e) => mudar("nome", e.target.value)} erro={erros.nome} />
                    <CampoDoCadastro id={id("email")} rotulo="E-mail de acesso *" placeholder="nome@exemplo.com" type="email" inputMode="email" autoComplete="email" maxLength={254} aria-required value={d.email} onChange={(e) => mudar("email", e.target.value)} erro={erros.email} ajuda="Vamos enviar um link para confirmar que o e-mail é seu." />
                    <CampoDoCadastro id={id("celular")} rotulo="Celular (WhatsApp) *" placeholder="(41) 90000-0000" type="tel" inputMode="tel" autoComplete="tel-national" aria-required value={d.celular} onChange={(e) => mudar("celular", mascaraCelular(e.target.value))} erro={erros.celular} ajuda="Com DDD. Usamos para avisos importantes da conta." />
                    <div className="col-span-full min-w-0">
                      <PasswordConfirm
                        senha={d.senha}
                        confirmacao={d.confirmacao}
                        onSenhaChange={(v) => mudar("senha", v)}
                        onConfirmacaoChange={(v) => mudar("confirmacao", v)}
                        textos={{ senha: "Senha *", confirmar: "Confirmar senha *" }}
                        idSenha={id("senha")}
                        idConfirmacao={id("confirmacao")}
                        erroSenha={erros.senha}
                        erroConfirmacao={erros.confirmacao}
                      />
                    </div>
                  </GradeDeCampos>
                </EtapaDoCadastro>
              )}

              {etapa === 1 && (
                <EtapaDoCadastro
                  titulo="Agora, queremos conhecer sua loja."
                  explicacao="Comece pelas informações que identificam a loja e ajudam as pessoas a encontrá-la."
                  tituloRef={titulo}
                  obrigatorios="* Campos obrigatórios"
                  resumoDeErros={resumo}
                  onSubmit={continuar}
                  lateral={
                    <LateralDaEtapa
                      icone={<Store />}
                      tom="marca"
                      iconeDestaque={<Info />}
                      titulo="Seu cadastro, sua vitrine."
                      paragrafos={["Nome, tipo, categorias, endereço e logo aparecem no perfil público da loja."]}
                      destaque="O CNPJ serve só para formalizar o cadastro e não aparece para o público."
                    />
                  }
                  barra={barra(() => irPara(0))}
                >
                  <div className="space-y-8">
                    <Grupo titulo="Identificação">
                      <GradeDeCampos>
                        <CampoDoCadastro id={id("loja")} rotulo="Nome da loja *" placeholder="Ex.: Ateliê Aurora" autoComplete="organization" maxLength={80} aria-required value={d.loja} onChange={(e) => mudar("loja", e.target.value)} erro={erros.loja} ajuda="Como os clientes conhecem a loja." />
                        <CampoDoCadastro
                          id={id("cnpj")}
                          rotulo={d.semCnpj ? "CNPJ" : "CNPJ *"}
                          placeholder="00.000.000/0000-00"
                          inputMode="numeric"
                          aria-required={!d.semCnpj}
                          disabled={d.semCnpj}
                          value={d.cnpj}
                          onChange={(e) => mudar("cnpj", mascaraCnpj(e.target.value))}
                          erro={d.semCnpj ? null : erros.cnpj}
                          depois={
                            <label className="flex w-fit cursor-pointer items-center gap-2.5 pt-1 text-sm text-foreground">
                              <Checkbox checked={d.semCnpj} onCheckedChange={(v) => { mudar("semCnpj", v === true); if (v === true) mudar("cnpj", ""); }} />
                              Ainda não tenho CNPJ
                            </label>
                          }
                        />
                      </GradeDeCampos>
                      <div className="mt-6 min-w-0 space-y-2">
                        <p id={`${base}-tipo`} className="text-sm font-semibold text-foreground">Tipo de loja *</p>
                        <SegmentedControl<Tipo> aria-labelledby={`${base}-tipo`} options={TIPOS} value={d.tipo} onValueChange={(v) => mudar("tipo", v)} />
                      </div>
                    </Grupo>

                    <Grupo titulo="Categorias *" descricao="Escolha uma ou mais. Elas ajudam a loja a aparecer nas buscas certas.">
                      <div role="group" aria-label="Categorias" aria-describedby={erros.categorias ? `${base}-categorias-erro` : undefined} className="flex flex-wrap gap-2">
                        {CATEGORIAS.map((c, i) => (
                          <Chip
                            key={c}
                            id={i === 0 ? id("categorias") : undefined}
                            ativo={d.categorias.includes(c)}
                            invalido={Boolean(erros.categorias)}
                            onClick={() => mudar("categorias", d.categorias.includes(c) ? d.categorias.filter((x) => x !== c) : [...d.categorias, c])}
                          >
                            {c}
                          </Chip>
                        ))}
                      </div>
                      <p className="sr-only" aria-live="polite">{d.categorias.length ? `${d.categorias.length} selecionadas` : ""}</p>
                      {erros.categorias && <MensagemDeErro id={`${base}-categorias-erro`} className="mt-3">{erros.categorias}</MensagemDeErro>}
                    </Grupo>

                    <Grupo titulo="Endereço" descricao="Digite o CEP: preenchemos a rua, o bairro e a cidade.">
                      <GradeDeCampos>
                        <CampoDoCadastro
                          id={id("cep")}
                          rotulo="CEP *"
                          placeholder="00000-000"
                          inputMode="numeric"
                          autoComplete="postal-code"
                          aria-required
                          icone={<MapPin />}
                          value={d.cep}
                          onChange={(e) => mudarCep(e.target.value)}
                          erro={erros.cep}
                          ajuda={
                            <span aria-live="polite" className="inline-flex items-start gap-1.5">
                              {cep === "buscando" && <><Loader2 className="mt-0.5 size-4 shrink-0 motion-safe:animate-spin" aria-hidden /> Buscando o endereço…</>}
                              {cep === "achou" && <><Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden /> Endereço de exemplo preenchido (simulação).</>}
                              {cep === "parado" && "Só números; o traço entra sozinho."}
                            </span>
                          }
                        />
                        <CampoDoCadastro rotulo="Rua" placeholder="Preenchida pelo CEP" autoComplete="address-line1" value={d.rua} onChange={(e) => mudar("rua", e.target.value)} />
                        <CampoDoCadastro id={id("numero")} rotulo="Número *" placeholder="Ex.: 120 ou s/n" aria-required value={d.numero} onChange={(e) => mudar("numero", e.target.value)} erro={erros.numero} />
                        <CampoDoCadastro rotulo="Complemento" placeholder="Ex.: Loja 2" autoComplete="address-line2" value={d.complemento} onChange={(e) => mudar("complemento", e.target.value)} />
                        <CampoDoCadastro rotulo="Bairro" placeholder="Preenchido pelo CEP" value={d.bairro} onChange={(e) => mudar("bairro", e.target.value)} />
                        <CampoDoCadastro rotulo="Cidade" placeholder="Preenchida pelo CEP" value={d.cidade} onChange={(e) => mudar("cidade", e.target.value)} />
                      </GradeDeCampos>
                    </Grupo>

                    <Grupo titulo="Presença online" descricao="Opcional. Você pode completar depois.">
                      <div className="flex min-w-0 flex-wrap items-start gap-x-6 gap-y-6">
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-foreground">Logo da loja</p>
                          <ImageUpload value={d.logo} onChange={(_f, url) => mudar("logo", url)} label="Logo" size={112} maxSize={2 * 1024 * 1024} />
                        </div>
                        <div className="min-w-0 flex-[1_1_15rem]">
                          <GradeDeCampos>
                            <CampoDoCadastro rotulo="Instagram" placeholder="nomedaloja" icone={<AtSign />} autoCapitalize="none" spellCheck={false} value={d.instagram} onChange={(e) => mudar("instagram", e.target.value.replace(/^@/, ""))} ajuda="Sem o @." />
                            <CampoDoCadastro rotulo="Site" placeholder="www.sualoja.com.br" icone={<Globe />} type="url" inputMode="url" autoCapitalize="none" value={d.site} onChange={(e) => mudar("site", e.target.value)} />
                          </GradeDeCampos>
                        </div>
                      </div>
                    </Grupo>
                  </div>
                </EtapaDoCadastro>
              )}

              {etapa === 2 && (
                <EtapaDoCadastro
                  titulo="Escolha como deseja crescer."
                  explicacao="Compare os planos e escolha o que combina com o momento da loja. Planos e preços desta página são exemplos."
                  tituloRef={titulo}
                  resumoDeErros={resumo}
                  onSubmit={continuar}
                  barra={barra(() => irPara(1))}
                >
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <p id={`${base}-periodo`} className="text-sm font-semibold text-foreground">Cobrança</p>
                      <SegmentedControl<Periodo>
                        aria-labelledby={`${base}-periodo`}
                        size="sm"
                        options={[{ value: "mensal", label: "Mensal" }, { value: "anual", label: "Anual" }]}
                        value={d.periodo}
                        onValueChange={(v) => mudar("periodo", v)}
                      />
                    </div>
                    <div className="@container/planos">
                      <RadioGroup
                        aria-label="Planos"
                        aria-invalid={erros.plano ? true : undefined}
                        aria-describedby={erros.plano ? `${base}-plano-erro` : undefined}
                        value={d.plano}
                        onValueChange={(v) => mudar("plano", v)}
                        className="grid gap-3 @min-[42rem]/planos:grid-cols-3"
                      >
                        {PLANOS.map((p, i) => (
                          <CartaoDeOpcao
                            key={p.id}
                            id={i === 0 ? id("plano") : `${base}-plano-${p.id}`}
                            valor={p.id}
                            selecionado={d.plano === p.id}
                            topo={p.recomendado ? (
                              <Badge variant="outline" className="mb-3 border-primary/25 bg-[var(--primary-muted)] font-semibold text-primary-text">
                                <ShieldCheck aria-hidden /> Recomendado
                              </Badge>
                            ) : (
                              // Lado a lado, os outros cartões guardam a mesma altura, para nomes e preços ficarem alinhados.
                              <Badge aria-hidden variant="outline" className="invisible mb-3 hidden font-semibold @min-[42rem]/planos:inline-flex">
                                <ShieldCheck /> Recomendado
                              </Badge>
                            )}
                          >
                            <span className="block text-[1.0625rem] font-bold text-foreground">{p.nome}</span>
                            <span className="mt-0.5 block text-sm text-muted-foreground">{p.paraQuem}</span>
                            <span className="mt-4 flex flex-wrap items-baseline gap-x-1">
                              <span className="text-[1.5rem] font-extrabold tracking-tight text-foreground">{PRECO_EXEMPLO}</span>
                              <span className="text-sm text-muted-foreground">/{d.periodo === "mensal" ? "mês" : "ano"}</span>
                            </span>
                            <span className="block text-xs text-muted-foreground">Valor de exemplo</span>
                            <ul className="mt-4 space-y-1.5">
                              {p.recursos.map((r) => (
                                <li key={r} className="flex items-start gap-2 text-sm text-foreground">
                                  <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden /> {r}
                                </li>
                              ))}
                            </ul>
                          </CartaoDeOpcao>
                        ))}
                      </RadioGroup>
                    </div>
                    {erros.plano && <MensagemDeErro id={`${base}-plano-erro`}>{erros.plano}</MensagemDeErro>}
                    <Alert variant="info">
                      <Info aria-hidden />
                      <AlertTitle>Sem fidelidade: cancele quando quiser.</AlertTitle>
                      <AlertDescription>Você pode trocar de plano depois, pelo painel da loja.</AlertDescription>
                    </Alert>
                  </div>
                </EtapaDoCadastro>
              )}

              {etapa === 3 && (
                <EtapaDoCadastro
                  titulo="Revise sua contratação."
                  explicacao="Confira os dados do responsável, da loja e o plano antes de seguir para o pagamento."
                  tituloRef={titulo}
                  resumoDeErros={resumo}
                  onSubmit={continuar}
                  lateral={<LateralDaEtapa icone={<ListChecks />} tom="marca" iconeDestaque={<Info />} titulo="Tudo certo para continuar?" destaque="Encontrou algo errado? Use Editar para voltar à etapa. Nenhuma cobrança acontece nesta etapa." />}
                  barra={barra(() => irPara(2))}
                >
                  <ListaDeRevisao valoresAbertos={["responsavel", "loja", "plano"]}>
                    <BlocoDeRevisao valor="responsavel" titulo="01 · Responsável" nomeEtapa="Responsável" resumo={[d.nome, d.email]} onEditar={() => editar(0)}>
                      <LinhaDeDado rotulo="Nome" valor={d.nome} />
                      <LinhaDeDado rotulo="E-mail" valor={d.email} />
                      <LinhaDeDado rotulo="Celular (WhatsApp)" valor={d.celular} />
                      <LinhaDeDado rotulo="Senha" valor={d.senha ? "Criada" : ""} />
                    </BlocoDeRevisao>
                    <BlocoDeRevisao valor="loja" titulo="02 · Dados da loja" nomeEtapa="Dados da loja" resumo={[d.loja, NOME_DO_TIPO[d.tipo]]} onEditar={() => editar(1)}>
                      <LinhaDeDado rotulo="Nome da loja" valor={d.loja} />
                      <LinhaDeDado rotulo="CNPJ" valor={d.semCnpj ? "Ainda não tem" : d.cnpj} />
                      <LinhaDeDado rotulo="Tipo" valor={NOME_DO_TIPO[d.tipo]} />
                      <LinhaDeDado rotulo="Categorias" valor={d.categorias.join(", ")} />
                      <LinhaDeDado rotulo="Endereço" valor={[d.rua, d.numero, d.complemento].filter(Boolean).join(", ")} className="@min-[30rem]/revisao:col-span-2" />
                      <LinhaDeDado rotulo="Bairro e cidade" valor={[d.bairro, d.cidade].filter(Boolean).join(" · ")} />
                      <LinhaDeDado rotulo="Instagram" valor={d.instagram && `@${d.instagram}`} />
                    </BlocoDeRevisao>
                    <BlocoDeRevisao valor="plano" titulo="03 · Plano" nomeEtapa="Plano" resumo={[plano?.nome, d.periodo === "mensal" ? "Mensal" : "Anual"]} onEditar={() => editar(2)}>
                      <LinhaDeDado rotulo="Plano" valor={plano?.nome} />
                      <LinhaDeDado rotulo="Cobrança" valor={`${d.periodo === "mensal" ? "Mensal" : "Anual"} · ${PRECO_EXEMPLO} (exemplo)`} />
                    </BlocoDeRevisao>
                  </ListaDeRevisao>
                  <div className="mt-6 space-y-2">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={id("termos")}
                        checked={d.termos}
                        onCheckedChange={(v) => mudar("termos", v === true)}
                        aria-invalid={erros.termos ? true : undefined}
                        aria-describedby={erros.termos ? `${base}-termos-erro` : undefined}
                        className="mt-0.5"
                      />
                      <Label htmlFor={id("termos")} className="block text-sm font-normal leading-relaxed text-foreground">
                        Li e aceito os{" "}
                        <a href="#produto-cadastro" onClick={(e) => e.preventDefault()} className="rounded-sm font-semibold text-primary-text underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Termos de uso</a>{" "}
                        e a{" "}
                        <a href="#produto-cadastro" onClick={(e) => e.preventDefault()} className="rounded-sm font-semibold text-primary-text underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Política de privacidade</a>. *
                      </Label>
                    </div>
                    {erros.termos && <MensagemDeErro id={`${base}-termos-erro`} className="pl-8">{erros.termos}</MensagemDeErro>}
                  </div>
                </EtapaDoCadastro>
              )}

              {etapa === 4 && (
                <EtapaDoCadastro
                  titulo="Pagamento"
                  explicacao="Conclua a assinatura e prepare a sua loja para ser descoberta."
                  tituloRef={titulo}
                  obrigatorios={d.forma === "cartao" ? "* Campos obrigatórios" : undefined}
                  resumoDeErros={resumo}
                  onSubmit={continuar}
                  lateral={
                    <LateralDaEtapa
                      icone={<Lock />}
                      titulo="Resumo da assinatura"
                      paragrafos={[`Plano ${plano?.nome ?? "a escolher"} · ${d.periodo === "mensal" ? "mensal" : "anual"}`, `Total: ${PRECO_EXEMPLO} (valor de exemplo)`]}
                      destaque="Demonstração: não digite dados reais de cartão."
                      tom="aviso"
                      iconeDestaque={<Info />}
                    />
                  }
                  barra={barra(() => irPara(3), <>Confirmar assinatura <Check aria-hidden /></>, "Confirmando…")}
                >
                  <div className="space-y-6">
                    <div className="@container/formas">
                      <p id={`${base}-forma`} className="mb-2 text-sm font-semibold text-foreground">Forma de pagamento</p>
                      <RadioGroup aria-labelledby={`${base}-forma`} value={d.forma} onValueChange={(v) => { mudar("forma", v as Forma); setErros({}); }} className="grid gap-3 @min-[28rem]/formas:grid-cols-2">
                        <CartaoDeOpcao id={`${base}-forma-cartao`} valor="cartao" selecionado={d.forma === "cartao"}>
                          <span className="flex items-center gap-3">
                            <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[var(--primary-muted)] text-primary-text"><CreditCard className="size-5" /></span>
                            <span className="min-w-0">
                              <span className="block font-bold text-foreground">Cartão de crédito</span>
                              <span className="block text-sm text-muted-foreground">Cobrança automática</span>
                            </span>
                          </span>
                        </CartaoDeOpcao>
                        <CartaoDeOpcao id={`${base}-forma-pix`} valor="pix" selecionado={d.forma === "pix"}>
                          <span className="flex items-center gap-3">
                            <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"><QrCode className="size-5" /></span>
                            <span className="min-w-0">
                              <span className="block font-bold text-foreground">Pix</span>
                              <span className="block text-sm text-muted-foreground">Pagamento na hora</span>
                            </span>
                          </span>
                        </CartaoDeOpcao>
                      </RadioGroup>
                    </div>
                    {d.forma === "cartao" ? (
                      <GradeDeCampos>
                        <CampoDoCadastro inteiro id={id("cartaoNumero")} rotulo="Número do cartão *" placeholder="0000 0000 0000 0000" inputMode="numeric" autoComplete="off" icone={<CreditCard />} aria-required value={d.cartaoNumero} onChange={(e) => mudar("cartaoNumero", mascaraCartao(e.target.value))} erro={erros.cartaoNumero} />
                        <CampoDoCadastro inteiro id={id("cartaoNome")} rotulo="Nome impresso no cartão *" placeholder="Como aparece no cartão" autoComplete="off" aria-required value={d.cartaoNome} onChange={(e) => mudar("cartaoNome", e.target.value)} erro={erros.cartaoNome} />
                        <CampoDoCadastro id={id("validade")} rotulo="Validade *" placeholder="MM/AA" inputMode="numeric" autoComplete="off" aria-required value={d.validade} onChange={(e) => mudar("validade", mascaraValidade(e.target.value))} erro={erros.validade} />
                        <CampoDoCadastro id={id("cvv")} rotulo="Código de segurança *" placeholder="3 ou 4 números" inputMode="numeric" autoComplete="off" aria-required maxLength={4} value={d.cvv} onChange={(e) => mudar("cvv", digitos(e.target.value))} erro={erros.cvv} ajuda="No verso do cartão." />
                      </GradeDeCampos>
                    ) : (
                      <Alert variant="info">
                        <QrCode aria-hidden />
                        <AlertTitle>O QR Code aparece depois de confirmar.</AlertTitle>
                        <AlertDescription>Você paga pelo app do banco, com o QR Code ou o código copia e cola. A assinatura começa quando o pagamento é confirmado.</AlertDescription>
                      </Alert>
                    )}
                    <p role="status" className="sr-only">{salvando ? "Confirmando a assinatura…" : ""}</p>
                  </div>
                </EtapaDoCadastro>
              )}
            </>
          )}
        </div>
      </MolduraDoCadastro>
    </div>
  );
}

/* ── Tela de sucesso ── */
function Sucesso({ tituloRef, email, onRecomecar }: { tituloRef: React.Ref<HTMLHeadingElement>; email: string; onRecomecar: () => void }) {
  const passos = [
    { titulo: "Confirme seu e-mail", texto: email ? `Enviamos o link para ${email}.` : "Enviamos um link para o e-mail de acesso." },
    { titulo: "Complete o perfil da loja", texto: "Horário, fotos e uma descrição curta." },
    { titulo: "Publique suas primeiras peças", texto: "Elas passam a aparecer nas buscas da região." },
  ];
  return (
    <div className="@container/sucesso px-4 pt-10 pb-10 @min-[40rem]/sucesso:px-7 @min-[40rem]/sucesso:pt-12" data-sucesso>
      <div className="mx-auto max-w-xl text-center">
        <span aria-hidden className="mx-auto flex size-16 items-center justify-center rounded-full bg-success-muted text-success motion-safe:animate-in motion-safe:zoom-in-50 motion-safe:duration-[var(--duration-slow)] motion-safe:ease-[var(--ease-back)]">
          <Check className="size-8" strokeWidth={2.5} />
        </span>
        <h2 ref={tituloRef} tabIndex={-1} className="mt-6 text-[1.5rem] font-bold leading-tight tracking-[-0.02em] text-foreground outline-none [text-wrap:balance]">
          Pronto! Sua loja está cadastrada.
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">Agora faltam poucos passos para ela ser descoberta. (Demonstração: nada foi gravado.)</p>
      </div>
      <ol className="mx-auto mt-8 max-w-xl divide-y divide-border rounded-xl border border-border">
        {passos.map((p, i) => (
          <li
            key={p.titulo}
            className="flex items-start gap-4 px-5 py-4 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-[var(--duration-normal)] motion-safe:[animation-fill-mode:both]"
            style={{ animationDelay: `${200 + i * 80}ms` }}
          >
            <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-[0.8125rem] font-extrabold tabular-nums text-[var(--graphite-600)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-foreground">{p.titulo}</span>
              <span className="block text-sm text-muted-foreground">{p.texto}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="mx-auto mt-8 flex max-w-xl flex-col-reverse gap-3 @min-[30rem]/sucesso:flex-row @min-[30rem]/sucesso:justify-center">
        <Button type="button" variant="outline" size="lg" onClick={onRecomecar}><RotateCcw aria-hidden /> Recomeçar a demonstração</Button>
        <Button type="button" size="lg">Ir para o painel <ArrowRight aria-hidden /></Button>
      </div>
    </div>
  );
}

/* ── Combinações: quais componentes cada etapa usa e por quê ── */
type Peca = { nome: string; por: string; secao?: string; ancora?: string };
const COMBINACOES: { etapa: string; titulo: string; formula: string; pecas: Peca[] }[] = [
  {
    etapa: "01", titulo: "Responsável", formula: "Campos + máscara + Senha com confirmação + Coluna lateral",
    pecas: [
      { nome: "Campo de texto (CampoDoCadastro)", por: "Rótulo, ajuda e erro ligados ao campo.", secao: "buttons", ancora: "inputs" },
      { nome: "Senha com confirmação (PasswordConfirm)", por: "Força, dicas com check e confirmação em tempo real.", secao: "buttons", ancora: "password" },
      { nome: "Coluna lateral (LateralDaEtapa)", por: "Explica para que servem os dados, sem tirar o foco do formulário." },
    ],
  },
  {
    etapa: "02", titulo: "Dados da loja", formula: "Campos + caixa de seleção + Controle segmentado + chips + Upload",
    pecas: [
      { nome: "Caixa de seleção", por: "“Ainda não tenho CNPJ” desativa o campo, sem esconder a regra.", secao: "buttons", ancora: "inputs" },
      { nome: "Controle segmentado", por: "Três opções curtas e exclusivas: Loja, Brechó ou Os dois.", secao: "buttons", ancora: "segmented" },
      { nome: "Chips filtráveis", por: "Várias categorias ao mesmo tempo, com check.", secao: "badges", ancora: "badges" },
      { nome: "Campo com ícone", por: "CEP, Instagram e site reconhecidos pelo ícone.", secao: "buttons", ancora: "inputs" },
      { nome: "Imagem única (ImageUpload)", por: "Logo com prévia, troca e remoção.", secao: "upload", ancora: "upload-image" },
    ],
  },
  {
    etapa: "03", titulo: "Plano", formula: "Cartões selecionáveis + Controle segmentado + Badge + Alerta",
    pecas: [
      { nome: "Cartão selecionável", por: "Um plano por vez: borda de 2 px e marcação, não só cor.", secao: "cards", ancora: "card-states" },
      { nome: "Controle segmentado", por: "Mensal ou anual muda o preço de todos os cartões.", secao: "buttons", ancora: "segmented" },
      { nome: "Badge", por: "“Recomendado” em texto e ícone, no topo do cartão.", secao: "badges", ancora: "badges" },
      { nome: "Alerta (info)", por: "“Sem fidelidade” tranquiliza antes da escolha.", secao: "feedback", ancora: "alerts" },
    ],
  },
  {
    etapa: "04", titulo: "Revisão", formula: "Lista de revisão (Accordion) + Editar por bloco + caixa de seleção com links",
    pecas: [
      { nome: "ListaDeRevisao e BlocoDeRevisao", por: "Um bloco por etapa; Editar volta e retorna à revisão.", secao: "overlays", ancora: "accordion" },
      { nome: "Caixa de seleção com links", por: "Aceite dos termos, obrigatório e com erro no padrão.", secao: "buttons", ancora: "inputs" },
    ],
  },
  {
    etapa: "05", titulo: "Pagamento", formula: "Cartões selecionáveis + campos com máscara + Alerta + carregando e sucesso",
    pecas: [
      { nome: "Cartão selecionável", por: "Cartão de crédito ou Pix, com ícone na base.", secao: "cards", ancora: "card-states" },
      { nome: "Alerta (info)", por: "Explica o Pix antes de confirmar.", secao: "feedback", ancora: "alerts" },
      { nome: "Barra da etapa carregando", por: "Confirmando… com o botão desativado; depois, a tela de sucesso.", secao: "motion", ancora: "micro" },
    ],
  },
  {
    etapa: "✓", titulo: "Em todas as etapas", formula: "Stepper + erros nos campos + resumo dos erros",
    pecas: [
      { nome: "Stepper", por: "Nomes inteiros quando cabem; senão, “Etapa X de N” e os números.", secao: "stepper", ancora: "stepper-demo" },
      { nome: "Erro no campo", por: "aria-invalid, texto com ícone e foco no primeiro erro.", secao: "buttons", ancora: "inputs" },
      { nome: "Resumo dos erros (Alerta de erro)", por: "Com 2 erros ou mais, no topo, com link para cada campo.", secao: "feedback", ancora: "alerts" },
      { nome: "Tokens de movimento", por: "Entrada de cada etapa e check do sucesso; parados com menos movimento.", secao: "motion", ancora: "motion-tokens" },
    ],
  },
];

export function CombinacoesDoCadastro() {
  return (
    <div className="@container/combinacoes min-w-0">
      <ul className="grid gap-3 @min-[40rem]/combinacoes:grid-cols-2 @min-[58rem]/combinacoes:grid-cols-3">
        {COMBINACOES.map((c) => (
          <li key={c.titulo} className="min-w-0 rounded-xl border border-border bg-card p-5">
            <div className="flex items-start gap-3">
              <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-[0.8125rem] font-extrabold tabular-nums text-[var(--graphite-600)]">{c.etapa}</span>
              <div className="min-w-0 flex-1">
                <h4 className="text-[0.9375rem] font-bold text-foreground">{c.titulo}</h4>
                <p className="mt-0.5 text-[0.8125rem] leading-snug text-muted-foreground">{c.formula}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-3 border-t border-border pt-4">
              {c.pecas.map((p) => (
                <li key={p.nome} className="min-w-0 text-[0.8125rem] leading-snug">
                  {p.secao ? (
                    <button
                      type="button"
                      onClick={() => navegarPara(p.secao!, p.ancora)}
                      className="rounded-sm text-left font-semibold text-primary-text underline decoration-primary/30 underline-offset-4 transition-colors duration-[var(--duration-fast)] hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {p.nome}
                    </button>
                  ) : (
                    <span className="font-semibold text-foreground">{p.nome}</span>
                  )}
                  <span className="block text-muted-foreground">{p.por}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
