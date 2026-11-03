import React from "react";
import { Download, Check, X } from "lucide-react";
import { useI18n } from "../../i18n";
import { DataTable, display } from "./shared/Guidance";

/* ══════════════════════════════════════
   MASCOTE & ILUSTRAÇÕES — parte da identidade da marca FindLook
   Mascote: Nyx, a gata preta. Só no FindLook Design System.
   Hierarquia: Personagem · Expressões e poses · Estilo · Estados vazios ·
   Estados de erro · Diretrizes de uso · Ativos e nomenclatura.
══════════════════════════════════════ */

type Illustration = {
  id: string;
  nome: string;
  contexto: "vazio" | "erro";
  arquivoWebp: string;
  arquivoPng: string;
  largura: number;
  altura: number;
  alt: string;
  expressao: string;
  onde: string;
  quando: string;
  naoUsar: string[];
};

const ilustracoes: Illustration[] = [
  {
    id: "ilustracao-404",
    nome: "Página não encontrada (404)",
    contexto: "erro",
    arquivoWebp: "ilustracoes/findlook-404.webp",
    arquivoPng: "ilustracoes/findlook-404.png",
    largura: 1536,
    altura: 1024,
    alt: "Número 404 com o pin de localização da FindLook no lugar do zero e um cabide dentro; Nyx, a gata preta de óculos escuros, espia de dentro de uma sacola de compras pink, ao lado de um par de botas pretas.",
    expressao: "Curiosa (espiando da sacola)",
    onde: "Página 404 (endereço inexistente), em qualquer área do produto.",
    quando: "Sempre que a página pedida não existe ou foi removida. Vem acompanhada de um caminho de volta (início ou busca).",
    naoUsar: ["Não usar em erros de sistema (500) nem em falhas de conexão: o tom brincalhão não combina com falha do produto.", "Não usar em estados vazios: o 404 já está escrito na imagem."],
  },
  {
    id: "ilustracao-favoritos-vazio",
    nome: "Favoritos ainda vazios",
    contexto: "vazio",
    arquivoWebp: "ilustracoes/findlook-favoritos-vazio.webp",
    arquivoPng: "ilustracoes/findlook-favoritos-vazio.png",
    largura: 1448,
    altura: 1086,
    alt: "Nyx, a gata preta de óculos escuros e lenço pink, abre surpresa um guarda-roupa pink vazio com dois cabides na arara; no topo do móvel, o pin de localização com o cabide; ao lado, sapatos de salto e uma caixa de presente listrada.",
    expressao: "Surpresa (abrindo o guarda-roupa)",
    onde: "Área logada do consumidor › Favoritos.",
    quando: "Quando a pessoa ainda não salvou nenhuma peça como favorita. Some assim que o primeiro favorito existir.",
    naoUsar: ["Não usar quando a lista está vazia por filtro ou busca: aí o estado é \"nenhum resultado\", não \"ainda vazio\".", "Não usar para favoritos de lojas: esta peça fala de peças de roupa (guarda-roupa)."],
  },
  {
    id: "ilustracao-lojas-seguidas-vazio",
    nome: "Nenhuma loja seguida",
    contexto: "vazio",
    arquivoWebp: "ilustracoes/findlook-lojas-seguidas-vazio.webp",
    arquivoPng: "ilustracoes/findlook-lojas-seguidas-vazio.png",
    largura: 1536,
    altura: 1024,
    alt: "Nyx, a gata preta de óculos escuros e lenço pink, sentada e pensativa diante de três vitrines de lojas de roupa; cada loja tem o pin de localização com cabide no telhado e um botão pink \"+ Seguir\" na vitrine.",
    expressao: "Pensativa (sentada, pata no queixo)",
    onde: "Área logada do consumidor › Lojas seguidas.",
    quando: "Quando a pessoa ainda não segue nenhuma loja. Some assim que a primeira loja for seguida.",
    naoUsar: ["Não usar na lista de lojas da busca ou do mapa: os botões \"+ Seguir\" da imagem podem parecer clicáveis.", "Não usar para favoritos de peças: esta peça fala de lojas (vitrines)."],
  },
  {
    id: "ilustracao-contatos-vazio",
    nome: "Nenhum contato com lojas",
    contexto: "vazio",
    arquivoWebp: "ilustracoes/findlook-contatos-vazio.webp",
    arquivoPng: "ilustracoes/findlook-contatos-vazio.png",
    largura: 1536,
    altura: 1024,
    alt: "Nyx, a gata preta de óculos escuros e lenço pink, sentada com um celular pink na pata, imagina em um balão de pensamento um vestido pink pendurado em um cabide; ao lado, uma sacola de compras pink.",
    expressao: "Feliz (imaginando a peça, celular na pata)",
    onde: "Área logada do consumidor › Seus contatos com lojas.",
    quando: "Quando a pessoa ainda não iniciou nenhum contato com uma loja. Some assim que o primeiro contato existir.",
    naoUsar: ["Não usar na caixa de mensagens da loja (área do lojista): a cena é do ponto de vista de quem compra.", "Não usar quando há contatos arquivados ou filtrados: aí a lista não está \"ainda vazia\"."],
  },
];

const expressoes = [
  { nome: "Feliz", uso: "Confirmações, conclusão de etapa, boas-vindas." },
  { nome: "Surpresa", uso: "Descoberta, novidade, primeiro contato com um recurso." },
  { nome: "Pensativa", uso: "Escolha em aberto, lista ainda vazia, comparação." },
  { nome: "Curiosa", uso: "Busca, exploração, página não encontrada." },
  { nome: "Radiante", uso: "Favoritos, loja seguida, conquista." },
];

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <h2 className={`${display} text-[1.5rem] font-semibold tracking-[-0.02em] text-foreground mb-1`}>{title}</h2>
      <p className="text-[0.9375rem] leading-relaxed text-muted-foreground max-w-3xl">{description}</p>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{children}</p>;
}

function Panel({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`rounded-[16px] bg-white p-4 sm:p-6 dark:ring-1 dark:ring-white/10 ${className}`}>
      <img src={src} alt={alt} className="mx-auto h-auto w-full" />
    </div>
  );
}

function saveBlob(blob: Blob, filename: string) {
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}

async function baixar(url: string, filename: string) {
  try {
    saveBlob(await (await fetch(url)).blob(), filename);
  } catch {
    window.open(url, "_blank");
  }
}

function DownloadButton({ url, filename, label }: { url: string; filename: string; label: string }) {
  return (
    <button type="button" onClick={() => baixar(url, filename)} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[0.75rem] font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
      <Download className="h-3.5 w-3.5" aria-hidden /> {label}
    </button>
  );
}

/** Esqueleto de estado vazio (web e mobile) com a ilustração no lugar: textos são marcadores, não copy do produto. */
function EmptyStateMock({ src, alt, mobile = false }: { src: string; alt: string; mobile?: boolean }) {
  const { t } = useI18n();
  return (
    <div className={mobile ? "mx-auto w-[300px] rounded-[28px] border-[6px] border-[var(--graphite-900)] bg-white p-4 pt-8 shadow-[var(--shadow-md)]" : "rounded-[16px] border border-border bg-white p-8 shadow-[var(--shadow-xs)]"}>
      {!mobile && <div className="mb-6 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[var(--graphite-300)]" /><span className="h-2 w-16 rounded-full bg-[var(--graphite-200)]" /><span className="ml-auto h-2 w-10 rounded-full bg-[var(--graphite-200)]" /></div>}
      <div className={`flex flex-col items-center text-center ${mobile ? "gap-3" : "gap-4"}`}>
        <img src={src} alt={alt} className={mobile ? "w-[180px] h-auto" : "w-[300px] h-auto"} />
        <span className={`${display} ${mobile ? "text-[1rem]" : "text-[1.25rem]"} font-semibold tracking-[-0.01em] text-[var(--graphite-950)]`}>{t("Empty state title", "Título do estado vazio")}</span>
        <span className={`${mobile ? "text-[0.75rem]" : "text-[0.875rem]"} max-w-[28ch] leading-relaxed text-[var(--graphite-500)]`}>{t("Support text: what the person can do next.", "Texto de apoio: o que a pessoa pode fazer agora.")}</span>
        <span className={`inline-flex items-center rounded-full bg-primary ${mobile ? "h-9 px-4 text-[0.75rem]" : "h-10 px-5 text-[0.875rem]"} font-semibold text-primary-foreground`}>{t("Primary action", "Ação principal")}</span>
      </div>
      {mobile && <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-[var(--graphite-200)]" />}
    </div>
  );
}

function IllustrationCard({ il }: { il: Illustration }) {
  const { t } = useI18n();
  const base = import.meta.env.BASE_URL;
  const webp = base + il.arquivoWebp;
  const png = base + il.arquivoPng;
  const nomeArquivo = il.arquivoWebp.split("/").pop()!.replace(/\.webp$/, "");
  return (
    <section id={il.id} className="scroll-mt-32 space-y-6 rounded-[24px] border border-border bg-card p-5 sm:p-8" style={{ boxShadow: "var(--shadow-sm)" }}>
      <div>
        <Label>{t("Name", "Nome")}</Label>
        <h3 className={`${display} text-[1.375rem] font-semibold tracking-[-0.02em] text-foreground`}>{il.nome}</h3>
        <p className="mt-1 text-[0.8125rem] text-muted-foreground">{t("Expression", "Expressão")}: {il.expressao}</p>
      </div>
      <div>
        <Label>{t("Image", "Imagem")}</Label>
        <Panel src={webp} alt={il.alt} className="[&_img]:max-w-[560px]" />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <DownloadButton url={webp} filename={`${nomeArquivo}.webp`} label="WebP" />
          <DownloadButton url={png} filename={`${nomeArquivo}.png`} label="PNG" />
          <span className="text-[0.75rem] text-muted-foreground">{il.largura} × {il.altura} px · {t("transparent background", "fundo transparente")} · <span className="font-mono">{nomeArquivo}</span></span>
        </div>
        <p className="mt-2 text-[0.75rem] leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground">{t("Alt text", "Texto alternativo")}:</span> {il.alt}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div><Label>{t("Web view", "Visão web")}</Label><EmptyStateMock src={webp} alt="" /></div>
        <div><Label>{t("Mobile view", "Visão mobile")}</Label><EmptyStateMock src={webp} alt="" mobile /></div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label>{t("Where / when to use", "Onde / quando usar")}</Label>
          <ul className="space-y-2 text-[0.875rem] leading-relaxed text-foreground">
            <li className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-[var(--success)]" aria-hidden /><span><span className="font-semibold">{t("Where", "Onde")}:</span> {il.onde}</span></li>
            <li className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-[var(--success)]" aria-hidden /><span><span className="font-semibold">{t("When", "Quando")}:</span> {il.quando}</span></li>
          </ul>
        </div>
        <div>
          <Label>{t("How not to use", "Como não usar")}</Label>
          <ul className="space-y-2 text-[0.875rem] leading-relaxed text-foreground">
            {il.naoUsar.map((n) => <li key={n} className="flex gap-2"><X className="mt-1 h-4 w-4 shrink-0 text-[var(--error,var(--destructive))]" aria-hidden /><span>{n}</span></li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Bullets({ items }: { items: [string, string][] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map(([a, b]) => (
        <li key={a} className="rounded-[14px] border border-border bg-card p-4"><p className="mb-1 text-[0.875rem] font-semibold text-foreground">{a}</p><p className="text-[0.8125rem] leading-relaxed text-muted-foreground">{b}</p></li>
      ))}
    </ul>
  );
}

export function IllustrationsShowcase() {
  const { t } = useI18n();
  const base = import.meta.env.BASE_URL;
  const m = (f: string) => base + "mascote/" + f;
  const vazios = ilustracoes.filter((i) => i.contexto === "vazio");
  const erros = ilustracoes.filter((i) => i.contexto === "erro");
  return (
    <div className="space-y-16 pb-16">

      {/* ── 1. PERSONAGEM / MASTER ── */}
      <section id="mascote-personagem" className="scroll-mt-32">
        <SectionHeader
          title={t("The mascot Nyx: character and master reference", "A mascote Nyx: personagem e referência oficial")}
          description={t(
            "The FindLook cat is a proprietary element of the brand's visual identity. Her role is to bring the platform closer to people, turning moments of the journey into simple, expressive and recognizable visual stories. Curious, observant and connected to the fashion world, the mascot embodies FindLook's spirit of discovery. Her expressions and interactions make the experience more human, especially in moments that call for guidance, context or feedback.",
            "A gatinha da FindLook é um elemento proprietário da identidade visual da marca. Sua função é aproximar a plataforma das pessoas, traduzindo situações da jornada em narrativas visuais simples, expressivas e reconhecíveis. Curiosa, observadora e conectada ao universo da moda, a mascote representa o espírito de descoberta da FindLook. Suas expressões e interações tornam a experiência mais humana, especialmente em momentos que exigem orientação, contextualização ou feedback.",
          )}
        />
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Label>{t("Official character", "Personagem oficial")}</Label>
            <Panel src={m("nyx-master.webp")} alt={t("Nyx, the FindLook mascot: a black cat sitting, with pink sunglasses on her head and a pink scarf, looking up with a smile.", "Nyx, a mascote da FindLook: uma gata preta sentada, com óculos escuros pink na cabeça e lenço pink, olhando para cima com um sorriso.")} className="[&_img]:max-w-[360px]" />
            <p className={`${display} mt-3 text-center text-[1.125rem] font-semibold text-foreground`}>Nyx</p>
            <p className="text-center text-[0.8125rem] text-muted-foreground">{t("The FindLook cat · official character", "A gatinha FindLook · personagem oficial")}</p>
          </div>
          <div className="space-y-5">
            <div>
              <Label>{t("Turnaround (reference views)", "Turnaround (visões de referência)")}</Label>
              <Panel src={m("nyx-turnaround.webp")} alt={t("Nyx in four views: front, three-quarter right, right profile and back.", "Nyx em quatro visões: frente, 3/4 direita, perfil direita e costas.")} />
              <p className="mt-2 text-[0.75rem] text-muted-foreground">{t("Front · 3/4 right · right profile · back. New scenes start from one of these views.", "Frente · 3/4 direita · perfil direita · costas. Novas cenas partem de uma destas visões.")}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label>{t("Elements and proportions", "Elementos e proporções")}</Label>
                <Panel src={m("nyx-elementos.webp")} alt={t("Nyx's fixed elements: head and ear shape, default eyes, default muzzle, three whiskers per side, default paw.", "Elementos fixos da Nyx: formato da cabeça e orelhas, olhos padrão, focinho padrão, três bigodes por lado, pata padrão.")} />
              </div>
              <div>
                <Label>{t("Character palette", "Paleta do personagem")}</Label>
                <Panel src={m("nyx-paleta.webp")} alt={t("Character palette: graphite for the fur, pink for sunglasses and scarf, white for eyes and outlines, light gray for the base shadow.", "Paleta do personagem: grafite na pelagem, pink nos óculos e no lenço, branco nos olhos e contornos, cinza claro na sombra da base.")} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <DataTable
            head={[t("Element", "Elemento"), t("Token in the product", "Token no produto")]}
            rows={[
              [t("Fur", "Pelagem"), <span key="a" className="font-mono text-[0.75rem]">--graphite-950</span>],
              [t("Sunglasses and scarf", "Óculos e lenço"), <span key="b" className="font-mono text-[0.75rem]">--primary (pink-500)</span>],
              [t("Eyes and outlines", "Olhos e contornos"), <span key="c" className="font-mono text-[0.75rem]">#FFFFFF</span>],
              [t("Base shadow", "Sombra da base"), <span key="d" className="font-mono text-[0.75rem]">--graphite-200</span>],
            ]}
          />
          <div className="rounded-[14px] border border-border bg-muted/40 p-4 text-[0.8125rem] leading-relaxed text-muted-foreground">
            <p className="mb-2 font-semibold text-foreground">{t("Download the master sheet", "Baixar a folha de referência")}</p>
            <p className="mb-3">{t("The canonical sheet is the starting point for any new scene: same proportions, same elements, same palette.", "A folha canônica é o ponto de partida de qualquer cena nova: mesmas proporções, mesmos elementos, mesma paleta.")}</p>
            <div className="flex flex-wrap gap-2">
              <DownloadButton url={m("nyx-folha-canonica.webp")} filename="nyx-folha-canonica.webp" label="WebP" />
              <DownloadButton url={m("nyx-folha-canonica.png")} filename="nyx-folha-canonica.png" label="PNG" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. EXPRESSÕES E POSES ── */}
      <section id="mascote-expressoes" className="scroll-mt-32">
        <SectionHeader title={t("Expressions and poses", "Expressões e poses")} description={t("Five main expressions are allowed. Each one answers a moment of the journey; the pose and the props complete the message.", "Cinco expressões principais são permitidas. Cada uma responde a um momento da jornada; a pose e os objetos de cena completam a mensagem.")} />
        <Panel src={m("nyx-expressoes.webp")} alt={t("Nyx's five main expressions: happy, surprised, thoughtful, curious and radiant.", "As cinco expressões principais da Nyx: feliz, surpresa, pensativa, curiosa e radiante.")} className="[&_img]:max-w-[900px]" />
        <div className="mt-5">
          <DataTable
            head={[t("Expression", "Expressão"), t("When to use", "Quando usar"), t("In the library", "Na biblioteca")]}
            rows={expressoes.map((e) => [e.nome, e.uso, ilustracoes.filter((i) => i.expressao.startsWith(e.nome)).map((i) => i.nome).join(", ") || <span key={e.nome} className="text-muted-foreground">{t("no scene yet", "ainda sem cena")}</span>])}
          />
        </div>
        <div className="mt-5">
          <Bullets items={[
            [t("Poses already in use", "Poses já em uso"), t("Sitting (thoughtful, with the phone), opening a door, peeking out of a bag. New poses keep the sitting silhouette as the base.", "Sentada (pensativa, com o celular), abrindo uma porta, espiando de dentro da sacola. Poses novas mantêm a silhueta sentada como base.")],
            [t("Not allowed", "Não permitido"), t("Angry, sad or scared expressions; mouth with teeth; eyes in another shape; any pose that hides the sunglasses or the scarf.", "Expressões de raiva, tristeza ou medo; boca com dentes; olhos de outro formato; qualquer pose que esconda os óculos ou o lenço.")],
          ]} />
        </div>
      </section>

      {/* ── 3. ESTILO DE ILUSTRAÇÃO ── */}
      <section id="mascote-estilo" className="scroll-mt-32">
        <SectionHeader title={t("Illustration style", "Estilo de ilustração")} description={t("What makes a FindLook scene recognizable, beyond the character.", "O que torna uma cena da FindLook reconhecível, além do personagem.")} />
        <Bullets items={[
          [t("Shapes", "Formas"), t("Flat shapes, no outlines, rounded and friendly; a soft gray shadow at the base of the scene.", "Formas chapadas, sem contorno, arredondadas e simpáticas; sombra cinza suave na base da cena.")],
          [t("Colors", "Cores"), t("Only the brand palette: pink (--primary), graphite (--graphite-950) and white. Pink carries the brand elements; graphite carries Nyx and the type.", "Só a paleta da marca: pink (--primary), grafite (--graphite-950) e branco. O pink leva os elementos da marca; o grafite leva a Nyx e os números.")],
          [t("Brand symbol in the scene", "Símbolo da marca na cena"), t("The location pin with the hanger always appears: as the zero in 404, on top of the wardrobe, on the store roofs.", "O pin de localização com o cabide aparece sempre: como o zero do 404, no topo do guarda-roupa, nos telhados das lojas.")],
          [t("Props", "Objetos de cena"), t("Fashion pieces only: bag, boots, heels, dress, hangers, store fronts, gift box. Phone allowed when the scene is about the app.", "Só peças de moda: sacola, botas, saltos, vestido, cabides, vitrines, caixa de presente. Celular permitido quando a cena é sobre o app.")],
          [t("Emphasis marks", "Marcas de ênfase"), t("Pink strokes and sparkles near Nyx's head mark the emotion; never more than one group per scene.", "Traços e brilhos pink perto da cabeça da Nyx marcam a emoção; nunca mais de um grupo por cena.")],
          [t("Background", "Fundo"), t("Always transparent. In the product the scene sits on a light surface; in dark mode, on a white card.", "Sempre transparente. No produto a cena fica sobre superfície clara; no tema escuro, sobre um card branco.")],
        ]} />
      </section>

      {/* ── 4. ESTADOS VAZIOS ── */}
      <section id="mascote-estados-vazios" className="scroll-mt-32 space-y-8">
        <SectionHeader title={t("Empty states", "Estados vazios")} description={t("Scenes for lists that are still empty in the consumer's area. Each one has name, image, web and mobile views, where and when to use it and how not to use it.", "Cenas para listas ainda vazias na área do consumidor. Cada uma tem nome, imagem, visão web, visão mobile, onde e quando usar e como não usar.")} />
        {vazios.map((il) => <IllustrationCard key={il.id} il={il} />)}
      </section>

      {/* ── 5. ESTADOS DE ERRO ── */}
      <section id="mascote-estados-erro" className="scroll-mt-32 space-y-8">
        <SectionHeader title={t("Error states", "Estados de erro")} description={t("Scenes for errors that are the person's path, not the product's failure. System errors (500, offline) have no mascot.", "Cenas para erros de caminho da pessoa, não de falha do produto. Erros de sistema (500, sem conexão) não levam a mascote.")} />
        {erros.map((il) => <IllustrationCard key={il.id} il={il} />)}
      </section>

      {/* ── 6. DIRETRIZES DE USO ── */}
      <section id="mascote-diretrizes" className="scroll-mt-32">
        <SectionHeader title={t("Usage guidelines", "Diretrizes de uso")} description={t("Principles, application guidelines and governance for the mascot and its illustrations.", "Princípios, diretrizes de aplicação e governança da mascote e de suas ilustrações.")} />
        <Label>{t("Principles", "Princípios de utilização")}</Label>
        <Bullets items={[
          [t("Consistency", "Consistência"), t("Preserve the character's physical traits, proportions, colors and visual language in every application.", "Preservar as características físicas, proporções, cores e linguagem visual do personagem em todas as aplicações.")],
          [t("Context", "Contexto"), t("Each illustration represents a real situation of the journey and helps the person understand the state of the interface.", "Cada ilustração deve representar uma situação real da jornada, contribuindo para a compreensão do estado da interface.")],
          [t("Expressiveness", "Expressividade"), t("Use gestures, postures and expressions consistent with the message.", "Utilizar gestos, posturas e expressões coerentes com a mensagem comunicada.")],
          [t("Clarity", "Clareza"), t("The mascot complements the text; it never replaces essential information, actions or guidance.", "A mascote complementa a comunicação textual, sem substituir informações essenciais, ações ou orientações.")],
          [t("Moderation", "Moderação"), t("Prioritize relevant moments; avoid excessive presence on operational screens.", "Priorizar aplicações em momentos relevantes, evitando a presença excessiva em telas operacionais.")],
          [t("Accessibility", "Acessibilidade"), t("Illustrations are never the only way to convey important information; every one has alt text.", "Garantir que as ilustrações não sejam a única forma de transmitir informações importantes; toda ilustração tem texto alternativo.")],
        ]} />
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-[14px] border border-border bg-card p-4 text-[0.875rem] leading-relaxed text-foreground">
            <Label>{t("Application guidelines", "Diretrizes de aplicação")}</Label>
            <ul className="space-y-2">
              <li className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-[var(--success)]" aria-hidden /><span>{t("The mascot may be used in empty states, error pages, onboarding, confirmations and other contextual communications.", "A mascote pode ser utilizada em estados vazios, páginas de erro, onboarding, confirmações e outras comunicações contextuais.")}</span></li>
              <li className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-[var(--success)]" aria-hidden /><span>{t("Illustrations respect the FindLook visual identity, keep consistent proportions and adapt to different screen sizes.", "As ilustrações devem respeitar a identidade visual da FindLook, manter proporções consistentes e adaptar-se aos diferentes tamanhos de tela.")}</span></li>
              <li className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-[var(--success)]" aria-hidden /><span>{t("New scenes start from the official character reference, ensuring aesthetic continuity and brand recognition.", "A criação de novas cenas deve partir da referência visual oficial do personagem, garantindo continuidade estética e reconhecimento da marca.")}</span></li>
            </ul>
          </div>
          <div className="rounded-[14px] border border-border bg-card p-4 text-[0.875rem] leading-relaxed text-foreground">
            <Label>{t("Governance", "Governança")}</Label>
            <p>{t("Every new illustration is added to the official library, identified by its usage context and validated for visual consistency, accessibility and fit with the experience.", "Toda nova ilustração deve ser incorporada à biblioteca oficial, identificada pelo contexto de uso e validada quanto à consistência visual, acessibilidade e adequação à experiência.")}</p>
            <p className="mt-3 text-[0.8125rem] text-muted-foreground">{t("In practice: the brand owner supplies the piece; it enters this section with name, context, alt text and rules; the product only uses what is listed here.", "Na prática: a dona da marca fornece a peça; ela entra nesta seção com nome, contexto, texto alternativo e regras; o produto só usa o que está listado aqui.")}</p>
          </div>
        </div>
      </section>

      {/* ── 7. ATIVOS E NOMENCLATURA ── */}
      <section id="mascote-ativos" className="scroll-mt-32">
        <SectionHeader title={t("Assets and naming", "Ativos e nomenclatura")} description={t("Every file of the library, with its naming rule.", "Todos os arquivos da biblioteca, com a regra de nomes.")} />
        <div className="mb-5 rounded-[14px] border border-border bg-muted/40 p-4 text-[0.8125rem] leading-relaxed text-muted-foreground">
          <p className="font-semibold text-foreground">{t("Naming rule", "Regra de nomes")}</p>
          <p className="mt-1"><span className="font-mono text-foreground">findlook-&lt;contexto&gt;-&lt;estado&gt;.webp</span> {t("for scenes (e.g. findlook-favoritos-vazio), and", "para cenas (ex.: findlook-favoritos-vazio), e")} <span className="font-mono text-foreground">nyx-&lt;parte&gt;.webp</span> {t("for the character reference (e.g. nyx-turnaround). Lowercase, no accents, hyphens; WebP is the source, PNG the fallback.", "para a referência do personagem (ex.: nyx-turnaround). Minúsculas, sem acentos, com hífens; WebP é a origem, PNG o fallback.")}</p>
        </div>
        <DataTable
          head={[t("File", "Arquivo"), t("What it is", "O que é"), t("Context", "Contexto"), t("Size", "Dimensões")]}
          rows={[
            [<span key="1" className="font-mono text-[0.75rem]">mascote/nyx-folha-canonica.webp · .png</span>, t("Master sheet (character, turnaround, expressions, elements, palette)", "Folha de referência (personagem, turnaround, expressões, elementos, paleta)"), t("Reference", "Referência"), "1536 × 1024"],
            [<span key="2" className="font-mono text-[0.75rem]">mascote/nyx-master · nyx-turnaround · nyx-expressoes · nyx-elementos · nyx-paleta.webp</span>, t("Panels cut from the master sheet", "Painéis recortados da folha de referência"), t("Reference", "Referência"), t("variable", "variável")],
            ...ilustracoes.map((il) => [<a key={il.id} href={`#${il.id}`} className="font-mono text-[0.75rem] text-foreground underline decoration-primary/40 underline-offset-4 hover:text-primary">{il.arquivoWebp.replace("ilustracoes/", "")} · .png</a>, il.nome, il.contexto === "vazio" ? t("Empty state", "Estado vazio") : t("Error state", "Estado de erro"), `${il.largura} × ${il.altura}`]),
          ]}
        />
        <p className="mt-3 text-[0.75rem] text-muted-foreground">{t("All files live in public/ilustracoes and public/mascote of the FindLook Design System repository and are served from the same paths on the published site.", "Todos os arquivos ficam em public/ilustracoes e public/mascote do repositório FindLook Design System e são servidos nos mesmos caminhos no site publicado.")}</p>
      </section>
    </div>
  );
}
