import React, { useState } from "react";
import { ArrowRight, Check, CheckCircle2, ChevronDown, Keyboard, Lock, MousePointerClick, Smartphone, Store } from "lucide-react";
import { TokenTable, type TokenGroup } from "./shared/TokenTable";
import {
  SidePanel, SidePanelTrigger, SidePanelContent, SidePanelHeader, SidePanelBody, SidePanelActions, SidePanelFooter,
} from "@/app/components/ui/side-panel";

/* ─────────────────────────────────────────────────────────────
   Painel lateral (gaveta)
   Padrão herdado do formulário de contato do site do estúdio
   Dani Moscatelli, aqui com um exemplo da FindLook.
   ───────────────────────────────────────────────────────────── */

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-[1.375rem] font-bold tracking-[-0.02em] text-foreground">{title}</h2>
      {description && <p className="mt-1 max-w-2xl text-[0.9375rem] leading-relaxed text-muted-foreground">{description}</p>}
      <div className="mt-4 h-px bg-border" />
    </div>
  );
}

function ShowcaseCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[16px] border border-border bg-card p-6 ${className}`}>
      {children}
    </div>
  );
}

const field =
  "w-full rounded-[12px] border border-border bg-muted/40 px-4 py-2.5 text-[0.8125rem] leading-relaxed text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:bg-card focus:ring-2 focus:ring-ring aria-[invalid=true]:border-error";

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/* ── Variante: formulário "Cadastrar minha loja" (demonstração) ── */
function StorePanelDemo({ triggerLabel = "Cadastrar minha loja", outline = false }: { triggerLabel?: string; outline?: boolean }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState({ loja: "", whatsapp: "", bairro: "", tipo: "" });
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});
  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues(v => ({ ...v, [k]: k === "whatsapp" ? maskPhone(e.target.value) : e.target.value }));

  const validate = () => {
    const bad: Record<string, boolean> = {};
    if (!values.loja.trim()) bad.loja = true;
    if (values.whatsapp.replace(/\D/g, "").length < 10) bad.whatsapp = true;
    if (!values.bairro.trim()) bad.bairro = true;
    if (!values.tipo) bad.tipo = true;
    setInvalid(bad);
    return Object.keys(bad).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) { setError("Preencha os campos obrigatórios (*) e confira o WhatsApp."); return; }
    setError(null); setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 900); // demonstração: nada é enviado
  };
  const reset = () => { setSent(false); setError(null); setInvalid({}); setValues({ loja: "", whatsapp: "", bairro: "", tipo: "" }); };

  return (
    <SidePanel open={open} onOpenChange={o => { setOpen(o); if (!o) setTimeout(reset, 300); }}>
      <SidePanelTrigger asChild>
        <button className={outline
          ? "inline-flex h-10 items-center gap-2 rounded-[12px] border border-border bg-card px-4 text-[0.9375rem] font-semibold text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          : "inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-[0.875rem] font-semibold text-primary-foreground transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"}>
          <Store className="h-4 w-4" aria-hidden /> {triggerLabel}
        </button>
      </SidePanelTrigger>
      <SidePanelContent closeLabel="Fechar cadastro da loja">
        {!sent && (
          <SidePanelHeader
            eyebrow="Para quem vende"
            title="Cadastrar minha loja"
            description="Crie o perfil da sua loja para aparecer na busca de quem já procura o que você vende. Nada é publicado sem a sua confirmação."
          />
        )}
        <SidePanelBody>
          {sent ? (
            <div className="flex flex-col items-center space-y-4 px-4 py-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary-muted)] text-primary-text"><Check className="h-8 w-8" strokeWidth={2.5} aria-hidden /></div>
              <div>
                <h3 className="text-[1.25rem] font-bold text-foreground">Perfil criado!</h3>
                <p className="mx-auto mt-2 max-w-xs text-[0.875rem] text-muted-foreground">Próximo passo: cadastre produtos ou importe sua planilha. Depois, revise, publique e seja encontrado.</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="mt-4 rounded-full bg-muted px-6 py-2.5 text-[0.75rem] font-semibold text-foreground transition-colors hover:bg-accent">Fechar</button>
            </div>
          ) : (
            <form id="fl-store-form" noValidate onSubmit={submit} className="flex flex-col gap-2.5">
              <p className="rounded-[10px] bg-[var(--surface-tint)] px-3 py-2 text-[0.75rem] text-muted-foreground">Demonstração: campos de exemplo, nada é enviado.</p>
              <input className={field} aria-invalid={!!invalid.loja} placeholder="Nome da loja ou brechó *" aria-label="Nome da loja ou brechó" autoComplete="organization" value={values.loja} onChange={set("loja")} />
              <input className={field} aria-invalid={!!invalid.whatsapp} type="tel" placeholder="WhatsApp da loja *" aria-label="WhatsApp da loja" autoComplete="tel" value={values.whatsapp} onChange={set("whatsapp")} />
              <input className={field} aria-invalid={!!invalid.bairro} placeholder="Bairro e cidade *" aria-label="Bairro e cidade" autoComplete="address-level2" value={values.bairro} onChange={set("bairro")} />
              <fieldset className={`rounded-[12px] border bg-muted/40 p-3 ${invalid.tipo ? "border-error" : "border-border"}`}>
                <legend className="px-1 text-[0.75rem] font-semibold text-foreground">Tipo *</legend>
                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">
                  {["Loja", "Brechó", "Loja e brechó"].map(op => (
                    <label key={op} className="flex cursor-pointer items-center gap-2.5 rounded-[10px] border border-border/60 bg-card/70 p-2 text-[0.8125rem] font-medium text-foreground transition-colors hover:bg-card">
                      <input type="radio" name="fl-tipo" className="h-4 w-4 accent-[var(--primary)]" checked={values.tipo === op} onChange={() => setValues(v => ({ ...v, tipo: op }))} />
                      {op}
                    </label>
                  ))}
                </div>
              </fieldset>
              {error && <p role="alert" className="text-[0.75rem] text-error">{error}</p>}
            </form>
          )}
        </SidePanelBody>
        {!sent && (
          <>
            <SidePanelActions>
              <button type="submit" form="fl-store-form" disabled={sending} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-[0.875rem] font-semibold tracking-wide text-primary-foreground shadow-[var(--shadow-md)] transition-all hover:bg-[var(--primary-hover)] hover:shadow-[var(--shadow-lg)] disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                {sending ? "Enviando…" : "Criar perfil da loja"}
                {!sending && <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />}
              </button>
            </SidePanelActions>
            <SidePanelFooter>
              <span className="inline-flex items-center gap-1.5"><Lock className="h-3 w-3" aria-hidden /> Ambiente seguro.</span>
              <span className="font-medium text-foreground">FindLook</span>
            </SidePanelFooter>
          </>
        )}
      </SidePanelContent>
    </SidePanel>
  );
}

const tokenGroups: TokenGroup[] = [
  {
    group: "Painel lateral — superfície",
    tokens: [
      { name: "--card", description: "Fundo do painel", light: "#FFFFFF", dark: "rgba(25,25,28,.80)", isColor: true },
      { name: "--border", description: "Divisórias entre as zonas", light: "rgba(0,0,0,.10)", dark: "rgba(255,255,255,.07)", isColor: true },
      { name: "--shadow-xl", description: "Elevação do painel", light: "0 16px 48px …" },
      { name: "overlay", description: "Fundo escurecido: foreground a 40% + blur-sm", light: "bg-foreground/40" },
      { name: "radius", description: "Cantos esquerdos a partir do tablet", light: "24px (rounded-l-3xl)" },
    ],
  },
  {
    group: "Painel lateral — tamanhos e movimento",
    tokens: [
      { name: "width · celular", description: "Largura total da tela", light: "100%" },
      { name: "width · sm (≥ 640 px)", description: "Tablet", light: "500px" },
      { name: "width · md (≥ 768 px)", description: "Desktop", light: "540px" },
      { name: "duration", description: "Entrada/saída e fade do fundo", light: "300ms ease-in-out" },
      { name: "--primary / --ring", description: "Botão de ação e anel de foco", light: "#E62040", dark: "#E62040", isColor: true },
    ],
  },
];

export function SidePanelShowcase() {
  return (
    <div className="space-y-16">
      <section id="sidepanel-anatomy">
        <SectionHeader
          title="Painel lateral (gaveta)"
          description="Painel que desliza da direita por cima da página. Mantém a pessoa onde está, comporta uma tarefa longa (cadastro, detalhes de uma peça, filtros da busca) e fecha sem perder o contexto. Na FindLook, serve ao consumidor (filtros, contato com a loja) e ao lojista (cadastros e edições rápidas)."
        />
        <ShowcaseCard>
          <p className="mb-4 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Anatomia</p>
          <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="relative mx-auto w-full max-w-[320px] overflow-hidden rounded-[20px] border border-border bg-card" style={{ boxShadow: "var(--shadow-lg)" }}>
              {[
                ["1", "Cabeçalho", "Rótulo pequeno, título, texto de apoio e botão fechar. Fixo.", "bg-card"],
                ["2", "Corpo", "Rola sozinho. Guarda o formulário ou o conteúdo.", "bg-muted/30 min-h-[120px]"],
                ["3", "Barra de ação", "Um botão principal, largura total. Fixo.", "bg-card"],
                ["4", "Rodapé", "Nota opcional: segurança, assinatura.", "bg-muted/60"],
              ].map(([n, title, desc, bg], i) => (
                <div key={n} className={`flex items-start gap-3 px-4 py-3 ${i > 0 ? "border-t border-border" : ""} ${bg}`}>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[0.6875rem] font-bold text-primary-foreground">{n}</span>
                  <div><p className="text-[0.8125rem] font-semibold text-foreground">{title}</p><p className="text-[0.75rem] text-muted-foreground">{desc}</p></div>
                </div>
              ))}
            </div>
            <ul className="space-y-3 text-[0.875rem] leading-relaxed text-muted-foreground">
              <li><span className="font-semibold text-foreground">Largura:</span> tela inteira no celular, 500 px no tablet, 540 px no desktop; cantos esquerdos arredondados (24 px) a partir do tablet.</li>
              <li><span className="font-semibold text-foreground">Fundo:</span> página escurecida com leve desfoque; clicar nele fecha o painel.</li>
              <li><span className="font-semibold text-foreground">Movimento:</span> entra da direita em 300 ms enquanto o fundo aparece; o inverso ao fechar.</li>
              <li><span className="font-semibold text-foreground">Quando usar:</span> tarefas maiores que um diálogo (formulários com vários campos, detalhes de uma peça, filtros) que não devem tirar a pessoa da página.</li>
              <li><span className="font-semibold text-foreground">Quando não usar:</span> confirmações curtas (use um diálogo) ou navegação principal (use a sidebar).</li>
            </ul>
          </div>
        </ShowcaseCard>
      </section>

      <section id="sidepanel-behavior">
        <SectionHeader title="Comportamento" description="O que o componente garante ao abrir e fechar." />
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <ShowcaseCard>
            <p className="mb-4 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Experimente</p>
            <StorePanelDemo triggerLabel="Abrir painel com formulário" outline />
            <p className="mt-4 text-[0.75rem] text-muted-foreground">Abra, preencha ou tente enviar vazio para ver a validação, pressione Esc, clique fora, use Tab: o foco fica dentro e volta para este botão ao fechar.</p>
          </ShowcaseCard>
          <ShowcaseCard>
            <ul className="space-y-3">
              {[
                [MousePointerClick, "Abre por qualquer botão marcado como gatilho; o primeiro campo (ou o corpo) recebe o foco."],
                [Keyboard, "Fecha com Esc, com o botão fechar, clicando no fundo e, em formulários, com o botão Fechar do estado de sucesso."],
                [Lock, "Enquanto aberto: foco preso dentro, rolagem da página travada, diálogo aria-modal com título e descrição."],
                [CheckCircle2, "Ao fechar: o foco volta ao elemento que abriu; um formulário mantém o rascunho, a menos que a tarefa tenha sido concluída."],
                [Smartphone, "Celular: largura e altura totais; a barra de ação fica acima do teclado; campos com 16 px para evitar zoom."],
              ].map(([Icon, text], i) => {
                const I = Icon as React.ElementType;
                return (
                  <li key={i} className="flex items-start gap-3 text-[0.875rem] leading-relaxed text-muted-foreground">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[var(--primary-muted)] text-primary-text"><I className="h-3.5 w-3.5" aria-hidden /></span>
                    <span>{text as string}</span>
                  </li>
                );
              })}
            </ul>
          </ShowcaseCard>
        </div>
      </section>

      <section id="sidepanel-store">
        <SectionHeader
          title="Variante: formulário em painel"
          description="Exemplo de demonstração com a jornada do lojista: “Cadastrar minha loja”, com poucos campos. O padrão é o mesmo do formulário de contato do site do estúdio: uma mensagem de erro abaixo do formulário, campos inválidos destacados, estado “Enviando…” e sucesso dentro do próprio painel."
        />
        <ShowcaseCard>
          <div className="flex flex-wrap items-center gap-4">
            <StorePanelDemo />
            <p className="text-[0.8125rem] text-muted-foreground">Demonstração: os campos são exemplo e nada é enviado. Os campos reais do cadastro são definidos pelo produto.</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Campos de exemplo", "Nome da loja ou brechó, WhatsApp da loja (com máscara), bairro e cidade, tipo (loja, brechó, loja e brechó)."],
              ["Validação", "Todos obrigatórios; WhatsApp com pelo menos 10 dígitos. Uma mensagem abaixo do formulário e os campos inválidos destacados; revalida ao digitar depois da primeira tentativa."],
              ["Estados", "Parado → “Enviando…” (botão desabilitado) → sucesso substitui cabeçalho, formulário e barra de ação, com o próximo passo e um botão Fechar."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-[12px] border border-border bg-muted/30 p-4">
                <p className="mb-1 text-[0.8125rem] font-semibold text-foreground">{title}</p>
                <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </ShowcaseCard>
      </section>

      <section id="sidepanel-a11y">
        <SectionHeader title="Checklist de acessibilidade" />
        <ShowcaseCard>
          <ul className="grid gap-2 sm:grid-cols-2">
            {[
              "role=\"dialog\" com aria-modal, aria-labelledby (título) e aria-describedby (descrição).",
              "Botão fechar com nome acessível explícito (“Fechar cadastro da loja”).",
              "Foco preso enquanto aberto e devolvido ao gatilho ao fechar.",
              "Esc fecha; Tab e Shift+Tab circulam por dentro.",
              "Todo campo tem rótulo visível ou aria; o placeholder não é o único rótulo.",
              "Erros são anunciados (role=\"alert\") e mostrados junto ao formulário, não só por cor.",
              "Alvos de toque de pelo menos 44 px na barra de ação e nas opções.",
              "Respeita prefers-reduced-motion pelas utilidades de animação do sistema.",
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-[0.8125rem] leading-relaxed text-muted-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />{item}</li>
            ))}
          </ul>
        </ShowcaseCard>
      </section>

      <section id="sidepanel-usage">
        <SectionHeader title="Uso" description="Composição do componente em código." />
        <ShowcaseCard className="overflow-x-auto">
          <pre className="text-[0.75rem] leading-relaxed text-muted-foreground"><code>{`import { SidePanel, SidePanelTrigger, SidePanelContent, SidePanelHeader, SidePanelBody, SidePanelActions, SidePanelFooter } from "@/app/components/ui/side-panel";

<SidePanel>
  <SidePanelTrigger asChild><button>Cadastrar minha loja</button></SidePanelTrigger>
  <SidePanelContent closeLabel="Fechar cadastro da loja">
    <SidePanelHeader eyebrow="Para quem vende" title="Cadastrar minha loja" description="…" />
    <SidePanelBody>{/* formulário */}</SidePanelBody>
    <SidePanelActions><button type="submit" form="loja">Criar perfil da loja</button></SidePanelActions>
    <SidePanelFooter><span>🔒 Ambiente seguro.</span><span>FindLook</span></SidePanelFooter>
  </SidePanelContent>
</SidePanel>`}</code></pre>
        </ShowcaseCard>
      </section>

      <section id="sidepanel-tokens">
        <SectionHeader title="Tokens" />
        <TokenTable groups={tokenGroups} />
      </section>
    </div>
  );
}
