import React, { useState } from "react";
import { TokenTable, type TokenGroup } from "./shared/TokenTable";
import { useI18n } from "../../i18n";
import {
  Search, Eye, EyeOff, ChevronDown, Plus, Send, Upload, Trash2, Edit3, Copy, Share, MoreHorizontal,
  ArrowRight, Check, X, Zap, Star, XCircle,
} from "lucide-react";
import { SegmentedControl } from "@/app/components/ui/segmented-control";
import { Button } from "@/app/components/ui/button";
import { Campo } from "@/app/components/ui/campo";
import { Input } from "@/app/components/ui/input";
import { Checkbox } from "@/app/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Switch } from "@/app/components/ui/switch";
import { Textarea } from "@/app/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { PasswordConfirm, regrasPadrao, textosPadrao } from "@/app/components/ui/password-field";
import { GrupoDeCartoesDeEscolha, CartaoDeEscolha } from "@/app/components/ui/cartao-de-escolha";
import { Store, CreditCard, QrCode, Barcode } from "lucide-react";
import { LayoutGrid, List, Map as MapIcon, FileSpreadsheet, Camera } from "lucide-react";
import { BotaoDividido, SeletorDePeriodo, periodosPadrao } from "@/app/components/ui/painel-cabecalho";
import { SectionHeader } from "./shared/SectionHeader";
import { DoDont } from "./shared/Guidance";
import { EscolhaObrigatoriaDemo, opcoesDeExemplo } from "./shared/EscolhaObrigatoriaDemo";
import { SecaoBotaoQuebra } from "./shared/LacunasDocs";

const periodosProprios = [{ valor: "hoje", rotulo: "Hoje" }, { valor: "semana", rotulo: "Esta semana" }, { valor: "mes", rotulo: "Este mês" }, { valor: "ano", rotulo: "Este ano" }];

/* ── Shared helpers ── */

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h3 className="text-label font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-5">{title}</h3>
      {children}
    </div>
  );
}

function ShowcaseCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`bg-card rounded-lg border border-border p-6 ${className}`}
    >
      {children}
    </div>
  );
}

/* ── Button variants ── */
// As demonstrações usam o componente real (ui/button), o mesmo que o produto copia.
const variantesUi: Record<string, "default" | "outline" | "ghost" | "link" | "secondary" | "destructive"> = {
  primary: "default", outline: "outline", ghost: "ghost", link: "link", secondary: "secondary", destructive: "destructive", "pink-outline": "outline",
};
const tamanhosUi: Record<string, "sm" | "default" | "lg" | "icon"> = { sm: "sm", md: "default", lg: "lg", xl: "lg", "icon-sm": "icon", icon: "icon", "icon-lg": "icon" };
const tamanhoExtra: Record<string, string> = { xl: "h-13 px-7", "icon-sm": "size-8", "icon-lg": "size-11" };

function Btn({ variant = "primary", size = "md", children, disabled = false, icon, iconOnly = false, rotulo, className = "" }:
  { variant?: "primary"|"outline"|"ghost"|"link"|"secondary"|"destructive"|"pink-outline"; size?: "sm"|"md"|"lg"|"xl"|"icon-sm"|"icon"|"icon-lg"; children?: React.ReactNode; disabled?: boolean; icon?: React.ReactNode; iconOnly?: boolean; rotulo?: string; className?: string }) {
  const contorno = variant === "pink-outline" ? "border-primary text-[var(--primary-text,var(--primary))] hover:bg-accent hover:text-[var(--primary-text,var(--primary))]" : "";
  return (
    <Button
      variant={variantesUi[variant]}
      size={tamanhosUi[size] ?? "default"}
      className={`${contorno} ${tamanhoExtra[size] ?? ""} ${variant === "link" ? "!px-0" : ""} ${className}`}
      disabled={disabled}
      aria-label={iconOnly ? rotulo : undefined}
    >
      {icon && <span className="shrink-0" aria-hidden>{icon}</span>}
      {!iconOnly && children}
    </Button>
  );
}


function FormShowcaseBase() {
  const { t } = useI18n();
  const formTokenGroups = getFormTokenGroups(t);
  const [condicao, setCondicao] = useState("nova");
  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [senhaUnica, setSenhaUnica] = useState("Sucesso@20234");
  const [checkA, setCheckA] = useState<boolean | "indeterminate">(true);
  const [checkB, setCheckB] = useState<boolean | "indeterminate">(false);
  const [checkC, setCheckC] = useState<boolean | "indeterminate">("indeterminate");
  const [swA, setSwA] = useState(true);
  const [swB, setSwB] = useState(false);
  const [radio, setRadio] = useState("b");
  const [perfil, setPerfil] = useState("consumidor");
  const [pagamento, setPagamento] = useState("");
  const [perfilLado, setPerfilLado] = useState("lojista");
  const [loading, setLoading] = useState(false);
  const [ultimaAcao, setUltimaAcao] = useState("Nenhuma ainda");
  const [periodo, setPeriodo] = useState("30");
  const [periodoCurto, setPeriodoCurto] = useState("semana");

  return (
    <div className="space-y-16">

      {/* ── BUTTONS ── */}
      <section id="buttons">
        <SectionHeader title={t("Buttons", "Botões")} description={t("Button hierarchy: primary filled in pink for the one main action; secondary with an outline for the other actions (a single variant, owner's decision of 28/11/2026: use variant=\"secondary\"; variant=\"outline\" is the same button, kept as an alias); ghost for tertiary actions; link for low-emphasis navigation. The Pink outline is for a secondary action that needs brand emphasis.", "Hierarquia de botões: principal preenchido em pink para a única ação principal; secundário de contorno para as outras ações (uma variante só, decisão da dona do produto de 28/11/2026: use variant=\"secondary\"; variant=\"outline\" é o mesmo botão, mantido como apelido); ghost para ações terciárias; link para navegação de baixa ênfase. O contorno pink fica para uma ação secundária que pede destaque da marca.")} />

        <SubSection title={t("Variants", "Variantes")}>
          <ShowcaseCard>
            <div className="flex flex-wrap gap-3 items-center">
              <Btn variant="primary" icon={<Zap className="h-4 w-4" />}>{t("Primary CTA", "CTA primário")}</Btn>
              <Btn variant="secondary">{t("Secondary (outline)", "Secundário (contorno)")}</Btn>
              <Btn variant="ghost">Ghost</Btn>
              <Btn variant="link">{t("Link button", "Botão link")}</Btn>
              <Btn variant="pink-outline">{t("Pink Outline", "Contorno Pink")}</Btn>
              <Btn variant="primary" disabled>{t("Disabled", "Desabilitado")}</Btn>
              <Button carregando textoCarregando={t("Loading", "Carregando")}>{t("Save", "Salvar")}</Button>
            </div>
          </ShowcaseCard>
        </SubSection>

        <SubSection title={t("Disabled and loading", "Desabilitado e carregando")}>
          <ShowcaseCard>
            <p className="mb-5 max-w-2xl text-body-sm leading-relaxed text-muted-foreground">
              {t(
                "Two different states that never share a look (owner's decision, 28/11/2026). Disabled means the action is not available right now (something is missing, or there is no permission): grey background, no colour, no click. Loading means the action was accepted and is working: the button keeps its own colour, slightly faded (80%), with the spinner before the text; it is marked aria-busy, takes no clicks and keeps its width. With reduced motion the spinner stops and the text still says it is loading.",
                "Dois estados diferentes, que nunca têm a mesma cara (decisão da dona do produto, 28/11/2026). Desabilitado quer dizer que a ação não está disponível agora (falta preencher algo ou não há permissão): fundo cinza, sem cor, sem clique. Carregando quer dizer que a ação foi aceita e está trabalhando: o botão mantém a própria cor, um pouco esmaecido (80%), com o giro antes do texto; fica marcado como ocupado (aria-busy), não recebe clique e não muda de largura. Com \"menos movimento\", o giro fica parado e o texto continua dizendo que está carregando.",
              )}
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <p className="mb-3 text-label font-semibold uppercase tracking-[0.08em] text-muted-foreground">{t("Disabled: unavailable", "Desabilitado: indisponível")}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button disabled>{t("Continue", "Continuar")}</Button>
                  <Button variant="secondary" disabled>{t("Back", "Voltar")}</Button>
                </div>
              </div>
              <div>
                <p className="mb-3 text-label font-semibold uppercase tracking-[0.08em] text-muted-foreground">{t("Loading: working", "Carregando: trabalhando")}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button carregando textoCarregando={t("Saving…", "Salvando…")}>{t("Save", "Salvar")}</Button>
                  <Button variant="secondary" carregando textoCarregando={t("Updating…", "Atualizando…")}>{t("Update", "Atualizar")}</Button>
                </div>
              </div>
              <div>
                <p className="mb-3 text-label font-semibold uppercase tracking-[0.08em] text-muted-foreground">{t("Try it", "Experimente")}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    carregando={loading}
                    textoCarregando={t("Saving…", "Salvando…")}
                    onClick={() => { setLoading(true); window.setTimeout(() => setLoading(false), 2000); }}
                  >
                    {t("Save changes", "Salvar alterações")}
                  </Button>
                </div>
              </div>
            </div>
            <pre className="mt-6 whitespace-pre-wrap break-words rounded-md bg-muted/60 p-3 text-label text-muted-foreground"><code>{`import { Button } from "@/app/components/ui/button";

// Desabilitado: a ação não está disponível
<Button disabled>Continuar</Button>

// Carregando: a ação está trabalhando (passe sempre true ou false: a largura não pula)
<Button carregando={salvando} textoCarregando="Salvando…">Salvar</Button>`}</code></pre>
          </ShowcaseCard>
        </SubSection>

        <SubSection title={t("Ghost and Link Buttons", "Botões Ghost e Link")}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ShowcaseCard>
              <p className="text-body-sm font-semibold text-foreground mb-1">{t("Ghost button", "Botão ghost")}</p>
              <p className="text-body-sm leading-relaxed text-muted-foreground mb-5">
                {t("Use for tertiary or contextual actions that should remain available without competing with the primary action.", "Use para ações terciárias ou contextuais que devem continuar disponíveis sem competir com a ação principal.")}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Btn variant="ghost">{t("Dismiss", "Dispensar")}</Btn>
                <Btn variant="ghost" icon={<Star className="h-4 w-4" />}>{t("Favorite", "Favoritar")}</Btn>
                <Btn variant="ghost" size="icon" icon={<MoreHorizontal className="h-4 w-4" />} iconOnly rotulo={t("More options", "Mais opções")} />
              </div>
            </ShowcaseCard>
            <ShowcaseCard>
              <p className="text-body-sm font-semibold text-foreground mb-1">{t("Link button", "Botão link")}</p>
              <p className="text-body-sm leading-relaxed text-muted-foreground mb-5">
                {t("Use for low-emphasis navigation. Keep mutation, submission and destructive actions in standard button variants.", "Use para navegação de baixa ênfase. Mantenha ações de alteração, envio e exclusão nas variantes padrão de botão.")}
              </p>
              <div className="flex flex-wrap items-center gap-5">
                <Btn variant="link">{t("View documentation", "Ver documentação")}</Btn>
                <Btn variant="link" icon={<ArrowRight className="h-4 w-4" />}>{t("Learn more", "Saiba mais")}</Btn>
              </div>
            </ShowcaseCard>
          </div>
        </SubSection>

        <SubSection title={t("Sizes", "Tamanhos")}>
          <ShowcaseCard>
            <div className="flex flex-wrap gap-3 items-center">
              <Btn size="sm">{t("Small", "Pequeno")}</Btn>
              <Btn size="md">{t("Medium", "Médio")}</Btn>
              <Btn size="lg">{t("Large", "Grande")}</Btn>
              <Btn size="xl">{t("Extra Large", "Extra grande")}</Btn>
            </div>
          </ShowcaseCard>
        </SubSection>

        <SubSection title={t("Icon Buttons", "Botões de ícone")}>
          <ShowcaseCard>
            <div className="flex flex-wrap gap-3 items-center">
              <Btn size="icon-sm" variant="secondary" icon={<Plus className="h-4 w-4" />} iconOnly rotulo={t("Add", "Adicionar")} />
              <Btn size="icon" variant="secondary" icon={<Edit3 className="h-4 w-4" />} iconOnly rotulo={t("Edit", "Editar")} />
              <Btn size="icon-lg" variant="secondary" icon={<Share className="h-5 w-5" />} iconOnly rotulo={t("Share", "Compartilhar")} />
              <Btn size="icon-sm" variant="ghost" icon={<Trash2 className="h-4 w-4" />} iconOnly rotulo={t("Delete", "Excluir")} />
              <Btn size="icon" variant="ghost" icon={<Copy className="h-4 w-4" />} iconOnly rotulo={t("Copy", "Copiar")} />
              <Btn size="icon" variant="primary" icon={<ArrowRight className="h-4 w-4" />} iconOnly rotulo={t("Next", "Avançar")} />
              <Btn size="icon" variant="ghost" icon={<MoreHorizontal className="h-4 w-4" />} iconOnly rotulo={t("More options", "Mais opções")} />
            </div>
          </ShowcaseCard>
        </SubSection>

        <SubSection title={t("Forma: pílula como padrão, quadrado como exceção rara", "Forma: pílula como padrão, quadrado como exceção rara")}>
          <ShowcaseCard>
            <p className="mb-4 max-w-2xl text-body-sm text-muted-foreground">{t("Decisão da dona do produto (28/11/2026), igual nos dois design systems: \"Pílula como padrão em ambos os projetos\". Todo botão é pílula, em qualquer variante e tamanho, e o botão só de ícone é um círculo; os componentes que desenham botões (janelas, calendário, paginação, botões do alerta, controle segmentado) seguem a mesma regra. forma=\"quadrado\" (cantos de 12 px) é exceção rara: um botão colado a um campo ou dentro de uma barra de ferramentas de cantos retos. size=\"icon\" tem 40 px com mouse e 44 px no toque; size=\"icon-lg\" tem 44 px sempre. Todo botão tem 44 px de altura no celular (abaixo de 640 px) e em telas de toque.", "Decisão da dona do produto (28/11/2026), igual nos dois design systems: \"Pílula como padrão em ambos os projetos\". Todo botão é pílula, em qualquer variante e tamanho, e o botão só de ícone é um círculo; os componentes que desenham botões (janelas, calendário, paginação, botões do alerta, controle segmentado) seguem a mesma regra. forma=\"quadrado\" (cantos de 12 px) é exceção rara: um botão colado a um campo ou dentro de uma barra de ferramentas de cantos retos. size=\"icon\" tem 40 px com mouse e 44 px no toque; size=\"icon-lg\" tem 44 px sempre. Todo botão tem 44 px de altura no celular (abaixo de 640 px) e em telas de toque.")}</p>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
              <Button variant="secondary">{t("Secondary", "Secundário")}</Button>
              <Button>{t("Preenchida", "Preenchida")}</Button>
              <Button size="icon" variant="secondary" aria-label={t("Editar", "Editar")}><Edit3 aria-hidden /></Button>
              <Button size="icon-lg" variant="ghost" aria-label={t("Mais opções", "Mais opções")}><MoreHorizontal aria-hidden /></Button>
              </div>
              <p className="text-label font-semibold uppercase tracking-[0.08em] text-muted-foreground">{t("Exceção: forma=\"quadrado\"", "Exceção: forma=\"quadrado\"")}</p>
              <div className="flex flex-wrap items-center gap-3">
              <Button forma="quadrado" variant="secondary">{t("Secondary", "Secundário")}</Button>
              <Button forma="quadrado">{t("Preenchida", "Preenchida")}</Button>
              </div>
            </div>
          </ShowcaseCard>
        </SubSection>

        <SubSection title={t("Compound Buttons", "Botões compostos")}>
          <ShowcaseCard>
            <div className="flex flex-wrap gap-3 items-center">
              <Btn variant="primary" icon={<Send className="h-4 w-4" />}>{t("Send Report", "Enviar relatório")}</Btn>
              <Btn variant="secondary" icon={<Upload className="h-4 w-4" />}>{t("Upload File", "Enviar arquivo")}</Btn>
              <Btn variant="ghost" icon={<Star className="h-4 w-4" />}>{t("Favorite", "Favoritar")}</Btn>
              <Btn variant="secondary" size="lg" icon={<Plus className="h-4 w-4" />}>{t("New Project", "Novo projeto")}</Btn>
              <Btn variant="secondary" size="lg" icon={<Check className="h-4 w-4" />}>{t("Confirm", "Confirmar")}</Btn>
            </div>
          </ShowcaseCard>
        </SubSection>
      </section>

      {/* ── UM BOTÃO PRINCIPAL POR ÁREA VISÍVEL ── */}
      <section id="botao-principal">
        <SectionHeader title="Um botão principal por área visível" description="Regra da dona do produto (23/11/2026): numa tela ou região visível, no máximo um botão principal preenchido. A ação principal da página fica com ele; o resto usa o botão secundário (contorno) ou um botão link, para ações de pouca ênfase. Banners e cards promocionais usam o secundário ou um link com seta." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            { certo: true, rotulo: "Faça: um principal, banner com secundário" },
            { certo: false, rotulo: "Não faça: dois principais disputando" },
          ].map(ex => (
            <ShowcaseCard key={ex.rotulo}>
              <p className={`mb-3 text-label font-semibold uppercase tracking-[0.08em] ${ex.certo ? "text-success" : "text-[var(--primary-text,var(--primary))]"}`}>{ex.certo ? <Check aria-hidden className="mr-1 inline h-3.5 w-3.5" /> : <X aria-hidden className="mr-1 inline h-3.5 w-3.5" />}{ex.rotulo}</p>
              <div aria-hidden className="space-y-3 rounded-lg bg-muted p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-body font-bold text-foreground">Sua loja</span>
                  <span className="inline-flex h-9 items-center gap-1 rounded-md bg-primary px-3 text-body-sm font-semibold text-primary-foreground"><Plus className="h-3.5 w-3.5" /> Cadastrar produto</span>
                </div>
                <div className="rounded-lg bg-[var(--primary-muted)] p-3">
                  <p className="text-body-sm font-bold text-foreground">Destaque sua coleção</p>
                  <p className="text-label text-muted-foreground">Fotos de alta qualidade atraem mais visitas.</p>
                  {ex.certo
                    ? <span className="mt-2 inline-flex h-9 items-center gap-1 rounded-md border border-[var(--border-strong)] bg-card px-3 text-body-sm font-semibold text-foreground">Ver dicas de foto <ArrowRight className="h-3.5 w-3.5" /></span>
                    : <span className="mt-2 inline-flex h-9 items-center gap-1 rounded-md bg-primary px-3 text-body-sm font-semibold text-primary-foreground">Ver dicas de foto <ArrowRight className="h-3.5 w-3.5" /></span>}
                </div>
              </div>
            </ShowcaseCard>
          ))}
        </div>
        <div className="mt-4">
          <DoDont
            dos={[
              "No máximo um botão principal (preenchido) por tela ou região visível.",
              "A ação principal da página fica com o botão principal.",
              "Banners e cards promocionais: botão secundário (contorno) ou link com seta.",
              "Ações de pouca ênfase: botão link ou ghost.",
            ]}
            donts={[
              "Dois botões vermelhos preenchidos perto um do outro.",
              "Usar o principal num banner quando a página já tem uma ação principal.",
              "Trocar a hierarquia só para chamar atenção: use texto e posição, não outro botão principal.",
            ]}
          />
        </div>
      </section>

      {/* ── INPUTS ── */}
      <section id="inputs">
        <SectionHeader title={t("Form Controls", "Controles de formulário")} description={t("Clean, accessible form inputs with consistent styling across all states.", "Campos de formulário limpos e acessíveis, com estilo consistente em todos os estados.")} />

        <SubSection title={t("Text Inputs", "Campos de texto")}>
          <ShowcaseCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Campo rotulo={t("Default Input", "Campo padrão")} placeholder={t("Enter text...", "Digite um texto...")} />
              <Campo rotulo={t("With Icon", "Com ícone")} placeholder={t("Search anything...", "Busque qualquer coisa...")} icone={<Search />} />
              <Campo rotulo={t("Password", "Senha")} type="password" placeholder={t("Enter password...", "Digite a senha...")} />
              <Campo rotulo={t("With Hint", "Com dica")} placeholder={t("Enter your email...", "Digite seu e-mail...")} type="email" ajuda={t("We'll never share your email with anyone.", "Nunca compartilharemos seu e-mail com ninguém.")} />
              <Campo rotulo={t("Error State", "Estado de erro")} placeholder={t("Enter value...", "Digite um valor...")} erro={t("This field is required.", "Este campo é obrigatório.")} />
              <Campo rotulo={t("Disabled", "Desabilitado")} placeholder={t("Disabled input...", "Campo desabilitado...")} disabled />
            </div>
          </ShowcaseCard>
        </SubSection>

        <SubSection title={t("Password", "Senha")}>
          <div id="password" className="scroll-mt-32" />
          <ShowcaseCard>
            <p className="mb-5 text-body-sm leading-relaxed text-muted-foreground">
              {t("Password and confirmation fields, each with a show/hide button. Strength in four bars plus a text label, calculated from the requirements met. The hint list shows a neutral dot, like a list bullet, on each requirement not met yet, and swaps it for the green success check as soon as it is met; the sign changes shape and screen readers hear \"met\" or \"not met\", so colour is never the only signal. Nothing in the list looks like a control: the old hollow circle looked like a radio button. The confirmation shows whether the passwords match after the person types.", "Campos de senha e de confirmação, cada um com botão de exibir/ocultar. Força em quatro barras mais um rótulo em texto, calculada pelos requisitos atendidos. A lista de dicas mostra um ponto neutro, como o de uma lista, em cada requisito ainda não atendido, e troca pelo check verde de sucesso assim que ele é atendido; o sinal muda de forma e o leitor de tela ouve \"atendido\" ou \"não atendido\", então a cor nunca é o único sinal. Nada na lista parece um controle: o círculo vazado de antes lembrava um botão de rádio. A confirmação mostra se as senhas coincidem depois que a pessoa digita.")}
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <p className="mb-3 text-caption font-semibold uppercase tracking-[0.08em] text-muted-foreground">{t("Try it: create and confirm", "Experimente: criar e confirmar")}</p>
                <PasswordConfirm senha={senha} confirmacao={confirmacao} onSenhaChange={setSenha} onConfirmacaoChange={setConfirmacao} />
              </div>
              <div>
                <p className="mb-3 text-caption font-semibold uppercase tracking-[0.08em] text-muted-foreground">{t("All requirements met (single field)", "Todos os requisitos atendidos (campo único)")}</p>
                <PasswordConfirm semConfirmacao senha={senhaUnica} confirmacao="" onSenhaChange={setSenhaUnica} onConfirmacaoChange={() => {}} />
              </div>
            </div>
            <pre className="mt-6 whitespace-pre-wrap [overflow-wrap:anywhere] rounded-md bg-muted/60 p-3 text-label text-muted-foreground"><code>{`import { PasswordConfirm } from "@/app/components/ui/password-field";

const [senha, setSenha] = useState("");
const [confirmacao, setConfirmacao] = useState("");

<PasswordConfirm
  senha={senha} onSenhaChange={setSenha}
  confirmacao={confirmacao} onConfirmacaoChange={setConfirmacao}
/>

// Campo único (troca de senha em etapas, por exemplo):
<PasswordConfirm semConfirmacao … />`}</code></pre>
            <ul className="mt-4 grid gap-1 text-body-sm text-muted-foreground sm:grid-cols-2">
              <li>• {t("Requirements: 8+ characters, upper and lower case, a number, a special symbol. Override with the regras prop (id, label, test).", "Requisitos: 8 ou mais caracteres, maiúsculas e minúsculas, um número, um símbolo especial. Troque com a prop regras (id, label, test).")}</li>
              <li>• {t("Strength = requirements met (0–4): Weak, Fair, Good, Strong. Bars in the primary colour, label in text.", "Força = requisitos atendidos (0–4): Fraca, Razoável, Boa, Forte. Barras na cor primária, rótulo em texto.")}</li>
              <li>• {t("Show/hide: 36 px button inside the field, aria-pressed and \"Show/Hide password\" label; each field toggles on its own.", "Exibir/ocultar: botão de 36 px dentro do campo, aria-pressed e rótulo \"Mostrar/Ocultar senha\"; cada campo alterna sozinho.")}</li>
              <li>• {t("Accessibility: the field points to the strength and hints (aria-describedby); strength and match messages are announced (aria-live); autocomplete=\"new-password\".", "Acessibilidade: o campo aponta para a força e as dicas (aria-describedby); força e coincidência são anunciadas (aria-live); autocomplete=\"new-password\".")}</li>
            </ul>
          </ShowcaseCard>
        </SubSection>

        <SubSection title="Textarea">
          <ShowcaseCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="textarea-demo-1" className="text-body-sm font-medium text-foreground">{t("Message", "Mensagem")}</label>
                <Textarea id="textarea-demo-1" placeholder={t("Write your message here...", "Escreva sua mensagem aqui...")} rows={4} />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="textarea-demo-2" className="text-body-sm font-medium text-foreground">{t("Notes", "Notas")}</label>
                <Textarea id="textarea-demo-2" placeholder={t("Add notes...", "Adicione notas...")} rows={4} disabled />
              </div>
            </div>
          </ShowcaseCard>
        </SubSection>

        <SubSection title="Select">
          <ShowcaseCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[t("Default Select", "Select padrão"), t("With Label", "Com rótulo")].map((lbl, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <label htmlFor={`select-demo-${i}`} className="text-body-sm font-medium text-foreground">{lbl}</label>
                  <Select>
                    <SelectTrigger id={`select-demo-${i}`} className="w-full"><SelectValue placeholder={t("Select an option...", "Selecione uma opção...")} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alfa">{t("Option Alpha", "Opção Alfa")}</SelectItem>
                      <SelectItem value="beta">{t("Option Beta", "Opção Beta")}</SelectItem>
                      <SelectItem value="gama">{t("Option Gamma", "Opção Gama")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </ShowcaseCard>
        </SubSection>

        <SubSection title="Checkbox">
          <ShowcaseCard>
            <div className="flex flex-wrap gap-8">
              {[
                { id: "checked", label: t("Checked", "Marcado"), state: checkA, setter: setCheckA },
                { id: "unchecked", label: t("Unchecked", "Desmarcado"), state: checkB, setter: setCheckB },
                { id: "indeterminate", label: t("Indeterminate", "Indeterminado"), state: checkC, setter: setCheckC },
              ].map(({ id, label, state, setter }) => (
                <label key={id} className="flex items-center gap-2 cursor-pointer select-none group">
                  <Checkbox checked={state} onCheckedChange={setter} />
                  <span className="text-body text-foreground group-hover:text-foreground transition-colors">{label}</span>
                </label>
              ))}
              <label className="flex items-center gap-2 cursor-not-allowed select-none opacity-40">
                <Checkbox disabled />
                <span className="text-body text-foreground">{t("Disabled", "Desabilitado")}</span>
              </label>
            </div>
          </ShowcaseCard>
        </SubSection>

        <SubSection title="Radio">
          <ShowcaseCard>
            <RadioGroup value={radio} onValueChange={setRadio} className="flex flex-wrap gap-6">
              {["a", "b", "c"].map((val) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer select-none">
                  <RadioGroupItem value={val} />
                  <span className="text-body text-foreground">{t("Option", "Opção")} {val.toUpperCase()}</span>
                </label>
              ))}
              <label className="flex items-center gap-2 cursor-not-allowed select-none opacity-40">
                <RadioGroupItem value="d" disabled />
                <span className="text-body text-foreground">{t("Disabled", "Desabilitado")}</span>
              </label>
            </RadioGroup>
          </ShowcaseCard>
        </SubSection>

        <SubSection title="Cartões de escolha">
          <div id="cartoes-de-escolha" className="scroll-mt-32" />
          <ShowcaseCard>
            <p className="mb-6 max-w-3xl text-body-sm leading-relaxed text-muted-foreground">
              Escolha única entre 2 a 4 opções grandes, cada uma com ícone, título e uma frase de explicação, como a primeira pergunta do cadastro. Componente <code className="text-foreground">CartaoDeEscolha</code>, sempre dentro de um <code className="text-foreground">GrupoDeCartoesDeEscolha</code>, em <code className="text-foreground">ui/cartao-de-escolha.tsx</code>. O cartão é branco com borda de 2 px; escolhido, a borda fica na cor da marca com o brilho que corre por ela, o ícone passa para a base rosa e o rádio à direita fica marcado. Clique em qualquer ponto do cartão para escolher; no teclado, as setas trocam a opção.
            </p>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="min-w-0">
                <p id="escolha-perfil" className="mb-3 text-body-sm leading-5 font-semibold text-foreground">Como você vai usar a FindLook?</p>
                <GrupoDeCartoesDeEscolha aria-labelledby="escolha-perfil" value={perfil} onValueChange={setPerfil}>
                  <CartaoDeEscolha valor="consumidor" icone={<Search />} titulo="Quero encontrar peças" descricao="Buscar, salvar e seguir lojas" />
                  <CartaoDeEscolha valor="lojista" icone={<Store />} titulo="Tenho uma loja ou brechó" descricao="Mostrar meu catálogo" />
                </GrupoDeCartoesDeEscolha>
                <p className="mt-3 text-label text-muted-foreground">Um por linha (padrão): cada cartão usa a largura toda, o melhor arranjo no celular.</p>
              </div>
              <div className="min-w-0">
                <p id="escolha-pagamento" className="mb-3 text-body-sm leading-5 font-semibold text-foreground">Forma de pagamento</p>
                <GrupoDeCartoesDeEscolha aria-labelledby="escolha-pagamento" value={pagamento} onValueChange={setPagamento}>
                  <CartaoDeEscolha valor="cartao" icone={<CreditCard />} titulo="Cartão de crédito" descricao="Cobrança automática a cada período." />
                  <CartaoDeEscolha valor="pix" icone={<QrCode />} titulo="Pix" descricao="Pagamento na hora, pelo app do banco." />
                  <CartaoDeEscolha valor="boleto" icone={<Barcode />} titulo="Boleto" descricao="Indisponível neste plano." desabilitado />
                </GrupoDeCartoesDeEscolha>
                <p className="mt-3 text-label text-muted-foreground">Sem escolha inicial, quando nenhuma opção é a mais comum; a terceira está desabilitada e diz por quê.</p>
              </div>
            </div>
            <div className="mt-8 min-w-0">
              <p id="escolha-perfil-lado" className="mb-3 text-body-sm leading-5 font-semibold text-foreground">Como você vai usar a FindLook?</p>
              <GrupoDeCartoesDeEscolha aria-labelledby="escolha-perfil-lado" colunas={2} value={perfilLado} onValueChange={setPerfilLado}>
                <CartaoDeEscolha valor="consumidor" icone={<Search />} titulo="Quero encontrar peças" descricao="Buscar, salvar e seguir lojas" />
                <CartaoDeEscolha valor="lojista" icone={<Store />} titulo="Tenho uma loja ou brechó" descricao="Mostrar meu catálogo" />
              </GrupoDeCartoesDeEscolha>
              <p className="mt-3 text-label text-muted-foreground">A mesma pergunta com dois lado a lado (colunas=2): vale quando o espaço do grupo tem 448 px ou mais e o número de opções é par; abaixo disso, volta a um por linha.</p>
            </div>
            <div id="cartoes-de-escolha-obrigatorio" className="mt-8 min-w-0 scroll-mt-32 border-t border-border pt-8">
              <p className="mb-4 max-w-3xl text-body-sm leading-relaxed text-muted-foreground">Num formulário, com escolha obrigatória (<code className="text-foreground">required</code>): toque em Continuar sem escolher. O erro aparece abaixo da pergunta, ligado ao grupo, e os cartões continuam do mesmo tamanho.</p>
              <EscolhaObrigatoriaDemo pergunta="Como você vai usar a FindLook?" opcoes={opcoesDeExemplo("FL")} />
            </div>
            <pre className="mt-6 whitespace-pre-wrap break-words rounded-md bg-muted/60 p-3 text-label text-muted-foreground"><code>{`import { GrupoDeCartoesDeEscolha, CartaoDeEscolha } from "@/app/components/ui/cartao-de-escolha";

<p id="pergunta">Como você vai usar a FindLook?</p>
<GrupoDeCartoesDeEscolha aria-labelledby="pergunta" value={perfil} onValueChange={setPerfil}>
  <CartaoDeEscolha
    valor="consumidor" icone={<Search />}
    titulo="Quero encontrar peças" descricao="Buscar, salvar e seguir lojas"
  />
  <CartaoDeEscolha
    valor="lojista" icone={<Store />}
    titulo="Tenho uma loja ou brechó" descricao="Mostrar meu catálogo"
  />
</GrupoDeCartoesDeEscolha>

// Dois lado a lado quando houver espaço: colunas={2}. Opção indisponível: desabilitado.`}</code></pre>
            <div className="mt-6">
              <DoDont
                dos={[
                  "Use para 2 a 4 opções que mudam o caminho da pessoa e pedem uma frase de explicação.",
                  "Dê ao grupo o nome da pergunta (aria-labelledby), escrita como pergunta.",
                  "Deixe a escolha aparecer na borda, no ícone e no rádio, nunca só na cor.",
                ]}
                donts={[
                  "Não pinte o cartão escolhido de rosa: ele continua branco (o rosa fica na borda e na base do ícone).",
                  "Não use para opções de uma ou duas palavras: aí o Controle segmentado é mais direto.",
                  "Não monte o cartão à mão com Card, rádio e ícone: use o CartaoDeEscolha.",
                ]}
              />
            </div>
          </ShowcaseCard>
        </SubSection>

        <SubSection title={t("Segmented control", "Controle segmentado")}>
          <div id="segmented" className="scroll-mt-32" />
          <ShowcaseCard>
            <p className="text-body-sm leading-relaxed text-muted-foreground mb-5">
              {t("Coupled options that are tapped like buttons; exactly one is always selected. For short, exclusive choices with two to five options and one- or two-word labels: condition, period, view mode. For long lists use Select; for independent choices use Checkbox or Switch.", "Opções acopladas que se tocam como botões; sempre há exatamente uma selecionada. Para escolhas curtas e exclusivas, de duas a cinco opções com rótulos de uma ou duas palavras: condição, período, modo de exibição. Para listas longas use Select; para escolhas independentes use Checkbox ou Switch.")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-body-sm font-medium text-foreground">{"Condição da peça"}</label>
                <SegmentedControl aria-label={"Condição da peça"} value={condicao} onValueChange={setCondicao} options={[{ value: "nova", label: "Nova" }, { value: "usada", label: "Usada" }, { value: "tanto-faz", label: "Tanto faz" }]} />
                <p className="text-label text-muted-foreground">{t("Selected: ", "Opção escolhida: ")}<span className="font-medium text-foreground">{condicao}</span></p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-body-sm font-medium text-foreground">{"Tipo de loja"} <span className="text-muted-foreground font-normal">· variant="solida"</span></label>
                <SegmentedControl aria-label={"Tipo de loja"} variant="solida" options={[{ value: "todas", label: "Todas" }, { value: "lojas", label: "Lojas" }, { value: "brechos", label: "Brechós" }]} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-body-sm font-medium text-foreground">{t("With icons", "Com ícones")}</label>
                <SegmentedControl aria-label={t("View mode", "Modo de exibição")} options={[{ value: "lista", label: "Lista", icon: <List /> }, { value: "grade", label: "Grade", icon: <LayoutGrid /> }, { value: "mapa", label: "Mapa", icon: <MapIcon /> }]} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-body-sm font-medium text-foreground">{t("Full width", "Largura total")} <span className="text-muted-foreground font-normal">· fullWidth</span></label>
                <SegmentedControl aria-label={"Período"} fullWidth options={[{ value: "comprar", label: "Quero comprar" }, { value: "vender", label: "Quero vender" }]} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-body-sm font-medium text-foreground">{t("Sizes", "Tamanhos")}</label>
                <div className="flex flex-col items-start gap-3">
                  <SegmentedControl size="sm" aria-label={"Período"} options={[{ value: "hoje", label: "Hoje" }, { value: "semana", label: "Esta semana" }, { value: "mes", label: "Este mês" }]} />
                  <SegmentedControl size="md" aria-label={"Período"} options={[{ value: "hoje", label: "Hoje" }, { value: "semana", label: "Esta semana" }, { value: "mes", label: "Este mês" }]} />
                  <SegmentedControl size="lg" aria-label={"Período"} options={[{ value: "hoje", label: "Hoje" }, { value: "semana", label: "Esta semana" }, { value: "mes", label: "Este mês" }]} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-body-sm font-medium text-foreground">{t("Disabled option", "Opção desabilitada")}</label>
                <SegmentedControl aria-label={t("Delivery", "Entrega")} options={[{ value: "retirar", label: "Retirar na loja" }, { value: "entrega", label: "Entrega", disabled: true }]} />
              </div>
            </div>
            <pre className="mt-5 whitespace-pre-wrap [overflow-wrap:anywhere] rounded-md bg-muted/60 p-3 text-label text-muted-foreground"><code>{`import { SegmentedControl } from "@/app/components/ui/segmented-control";

<SegmentedControl
  aria-label="Condição"
  value={condicao}
  onValueChange={setCondicao}
  options={[
    { value: "nova", label: "Nova" },
    { value: "usada", label: "Usada" },
    { value: "tanto-faz", label: "Tanto faz" },
  ]}
/>`}</code></pre>
            <ul className="mt-4 grid gap-1 text-body-sm text-muted-foreground sm:grid-cols-2">
              <li>• {t("Props: options (value, label, icon, disabled), value, defaultValue, onValueChange, variant suave | solida, size sm | md | lg, fullWidth, aria-label.", "Props: options (value, label, icon, disabled), value, defaultValue, onValueChange, variant suave | solida, size sm | md | lg, fullWidth, aria-label.")}</li>
              <li>• {t("Keyboard: arrows move the selection, Tab enters and leaves the group. Minimum height 32 px (sm), 40 px (md) and 44 px (lg).", "Teclado: setas movem a seleção, Tab entra e sai do grupo. Altura mínima de 32 px (sm), 40 px (md) e 44 px (lg).")}</li>
              <li>• {t("The selection is never removed by tapping again: there is always one active option.", "A seleção nunca é removida ao tocar de novo: sempre há uma opção ativa.")}</li>
              <li>• {t("Always give the group a visible label or an aria-label.", "Dê sempre ao grupo um rótulo visível ou um aria-label.")}</li>
            </ul>
          </ShowcaseCard>
        </SubSection>

        <SubSection title="Botão dividido">
          <div id="botao-dividido" className="scroll-mt-32" />
          <ShowcaseCard>
            <div className="flex flex-wrap items-center gap-3">
              <BotaoDividido
                rotulo="Cadastrar produto"
                icone={<Plus />}
                onClick={() => setUltimaAcao("Cadastrar produto")}
                acoes={[
                  { rotulo: "Cadastrar produto", icone: <Plus />, onSelect: () => setUltimaAcao("Cadastrar produto") },
                  { rotulo: "Importar planilha", icone: <FileSpreadsheet />, onSelect: () => setUltimaAcao("Importar planilha") },
                  { rotulo: "Cadastrar com fotos", icone: <Camera />, onSelect: () => setUltimaAcao("Cadastrar com fotos") },
                ]}
              />
              <span className="text-body-sm text-muted-foreground" aria-live="polite">Última ação: <strong className="font-medium text-foreground">{ultimaAcao}</strong></span>
            </div>
          </ShowcaseCard>
        </SubSection>

        <SubSection title="Seletor de período">
          <div id="seletor-periodo" className="scroll-mt-32" />
          <ShowcaseCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <span className="text-body-sm font-medium text-foreground">Períodos padrão</span>
                <div><SeletorDePeriodo valor={periodo} onChange={setPeriodo} /></div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-body-sm font-medium text-foreground">Com períodos próprios</span>
                <div><SeletorDePeriodo valor={periodoCurto} onChange={setPeriodoCurto} periodos={[{ valor: "hoje", rotulo: "Hoje" }, { valor: "semana", rotulo: "Esta semana" }, { valor: "mes", rotulo: "Este mês" }]} /></div>
              </div>
            </div>
          </ShowcaseCard>
        </SubSection>

        <SubSection title={t("Switch / Toggle", "Switch / Toggle")}>
          <ShowcaseCard>
            <div className="flex flex-wrap gap-8">
              {[
                { id: "notifications", label: t("Notifications", "Notificações"), state: swA, setter: setSwA },
                { id: "dark", label: t("Dark mode", "Modo escuro"), state: swB, setter: setSwB },
              ].map(({ id, label, state, setter }) => (
                <div key={id} className="flex items-center gap-3">
                  <Switch id={`sw-${id}`} checked={state} onCheckedChange={setter} />
                  <label htmlFor={`sw-${id}`} className="text-body text-foreground cursor-pointer">{label}</label>
                </div>
              ))}
              <div className="flex items-center gap-3 opacity-40 cursor-not-allowed">
                <div className="h-6 w-11 rounded-full bg-switch-background" />
                <span className="text-body text-foreground">{t("Disabled", "Desabilitado")}</span>
              </div>
            </div>
          </ShowcaseCard>
        </SubSection>

        <SubSection title={t("Search Bar", "Barra de busca")}>
          <ShowcaseCard>
            <div className="max-w-md">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder={t("Search anything...", "Busque qualquer coisa...")}
                  className="w-full bg-card border border-border text-foreground placeholder:text-muted-foreground rounded-md pl-10 pr-4 py-3 text-body outline-none transition-all duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring focus:border-primary/60"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <kbd className="hidden sm:inline-flex items-center px-1 py-1 rounded-sm bg-muted text-muted-foreground text-caption font-medium border border-border">⌘K</kbd>
                </div>
              </div>
            </div>
          </ShowcaseCard>
        </SubSection>
      </section>

      {/* ── Tokens ── */}
      <section id="buttons-tokens" className="space-y-5">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-h3 font-semibold tracking-[-0.02em] text-foreground">Tokens</h2>
          <p className="text-body-sm text-muted-foreground mt-1">{t("CSS custom properties used by buttons and form controls.", "CSS custom properties usadas por botões e controles de formulário.")}</p>
        </div>
        <TokenTable groups={formTokenGroups} />
      </section>
    </div>
  );
}

function getFormTokenGroups(t: (en: string, pt: string) => string): TokenGroup[] {
  return [
  {
    group: t("Button Colors", "Cores de botão"),
    tokens: [
      { name: "--primary",               description: t("Primary button background", "Fundo do botão primário"),     light: "#E8004E", dark: "#E8004E", isColor: true },
      { name: "--primary-foreground",    description: t("Text on primary button", "Texto no botão primário"),        light: "#FFFFFF", dark: "#FFFFFF", isColor: true },
      { name: "--primary-hover",         description: t("Hover state of primary", "Estado hover do primário"),        light: "#D20648", dark: "#D20648", isColor: true },
      { name: "--secondary",             description: t("Secondary button background", "Fundo do botão secundário"),   light: "#F6F6F7", dark: "rgba(44,44,51,0.80)", isColor: true },
      { name: "--secondary-foreground",  description: t("Text on secondary button", "Texto no botão secundário"),      light: "#19191C", dark: "#F6F6F7", isColor: true },
      { name: "--muted",                 description: t("Ghost button hover background", "Fundo de hover do botão ghost"), light: "#E9E9EC", dark: "rgba(44,44,51,0.60)", isColor: true },
      { name: "--destructive",           description: t("Danger / delete button", "Botão de perigo / excluir"),        light: "#E8004E", dark: "#E8004E", isColor: true },
      { name: "--destructive-foreground",description: t("Text on destructive button", "Texto no botão destrutivo"),    light: "#FFFFFF", dark: "#FFFFFF", isColor: true },
    ],
  },
  {
    group: t("Input & Form", "Input e formulário"),
    tokens: [
      { name: "--input",            description: t("Outline of fields, outline buttons and chips (at least 3:1)", "Contorno de campos, botões de contorno e chips (pelo menos 3:1)"), light: "var(--graphite-400)",         dark: "var(--graphite-500)", isColor: true },
      { name: "--input-background", description: t("Input field background", "Fundo do campo de input"),      light: "#FFFFFF",             dark: "rgba(25,25,28,0.60)", isColor: true },
      { name: "--input-fundo",      description: t("Field fill in the dark theme (the outline is --input)", "Preenchimento dos campos no tema escuro (o contorno é o --input; 28/11/2026)"), light: "#FFFFFF", dark: "rgba(25,25,28,0.60)", isColor: true },
      { name: "--ring",             description: t("Focus ring", "Anel de foco"),                  light: "rgba(252,2,86,0.40)", dark: "rgba(252,2,86,0.45)", isColor: true },
      { name: "--border",           description: t("Default border", "Borda padrão"),              light: "rgba(25,25,28,0.09)", dark: "rgba(255,255,255,0.07)", isColor: true },
      { name: "--border-strong",    description: t("Card border on hover (decorative, not for fields)", "Borda de card no hover (decorativa, não vale para campos)"),       light: "rgba(25,25,28,0.16)", dark: "rgba(255,255,255,0.12)", isColor: true },
      { name: "--foreground",       description: t("Input text", "Texto do input"),                  light: "#19191C",             dark: "#F6F6F7", isColor: true },
      { name: "--muted-foreground", description: t("Placeholder text", "Texto de placeholder"),            light: "#888896",             dark: "#B3B3BC", isColor: true },
    ],
  },
  {
    group: t("Shape", "Forma"),
    tokens: [
      { name: "--radius-sm", description: t("Small inputs / badges", "Inputs pequenos / badges"),     light: "calc(0.75rem - 4px)" },
      { name: "--radius-md", description: t("Campos de texto (botões são pílula desde 28/11/2026)", "Campos de texto (botões são pílula desde 28/11/2026)"),      light: "0.75rem" },
      { name: "--radius-lg", description: t("Large controls", "Controles grandes"),            light: "calc(0.75rem + 4px)" },
    ],
  },
  {
    group: t("Typography", "Tipografia"),
    tokens: [
      { name: "--font-sans",            description: t("UI text / button labels", "Texto de UI / rótulos de botão"), light: "Plus Jakarta Sans" },
      { name: "--font-weight-semibold", description: t("Button label weight", "Peso do rótulo do botão"),     light: "600" },
      { name: "--font-weight-medium",   description: t("Input label weight", "Peso do rótulo do input"),      light: "500" },
    ],
  },
];
}

/* Peças de 28/11/2026 (shared/LacunasDocs): a mesma documentação nos dois design systems. */
export function FormShowcase() {
  return (
    <>
      <FormShowcaseBase />
      {(
        <div className="mt-20 space-y-20">
        <SecaoBotaoQuebra />
        </div>
      )}
    </>
  );
}
