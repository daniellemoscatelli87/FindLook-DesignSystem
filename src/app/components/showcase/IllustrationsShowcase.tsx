import React from "react";
import { Download, Check, X } from "lucide-react";
import { useI18n } from "../../i18n";
import { DataTable, display } from "./shared/Guidance";

/* ══════════════════════════════════════
   ILUSTRAÇÕES — parte da identidade da marca FindLook
   Mascote: Nyx, a gata preta. Só no FindLook Design System.
   Cada ilustração entra aqui conforme a dona da marca envia.
══════════════════════════════════════ */

type Illustration = {
  id: string;
  nome: string;
  arquivoWebp: string;
  arquivoPng: string;
  largura: number;
  altura: number;
  alt: string;
  /** Onde / quando usar. */
  onde: string;
  quando: string;
  /** Como não usar (específico da peça). */
  naoUsar: string[];
};

const ilustracoes: Illustration[] = [
  {
    id: "ilustracao-404",
    nome: "Página não encontrada (404)",
    arquivoWebp: "ilustracoes/findlook-404.webp",
    arquivoPng: "ilustracoes/findlook-404.png",
    largura: 1536,
    altura: 1024,
    alt: "Número 404 com o pin de localização da FindLook no lugar do zero e um cabide dentro; Nyx, a gata preta de óculos escuros, espia de dentro de uma sacola de compras pink, ao lado de um par de botas pretas.",
    onde: "Página 404 (endereço inexistente), em qualquer área do produto.",
    quando: "Sempre que a página pedida não existe ou foi removida. Vem acompanhada de um caminho de volta (início ou busca).",
    naoUsar: ["Não usar em erros de sistema (500) nem em falhas de conexão: o tom brincalhão não combina com falha do produto.", "Não usar em estados vazios: o 404 já está escrito na imagem."],
  },
  {
    id: "ilustracao-favoritos-vazio",
    nome: "Favoritos ainda vazios",
    arquivoWebp: "ilustracoes/findlook-favoritos-vazio.webp",
    arquivoPng: "ilustracoes/findlook-favoritos-vazio.png",
    largura: 1448,
    altura: 1086,
    alt: "Nyx, a gata preta de óculos escuros e lenço pink, abre surpresa um guarda-roupa pink vazio com dois cabides na arara; no topo do móvel, o pin de localização com o cabide; ao lado, sapatos de salto e uma caixa de presente listrada.",
    onde: "Área logada do consumidor › Favoritos.",
    quando: "Quando a pessoa ainda não salvou nenhuma peça como favorita. Some assim que o primeiro favorito existir.",
    naoUsar: ["Não usar quando a lista está vazia por filtro ou busca: aí o estado é \"nenhum resultado\", não \"ainda vazio\".", "Não usar para favoritos de lojas: esta peça fala de peças de roupa (guarda-roupa)."],
  },
  {
    id: "ilustracao-lojas-seguidas-vazio",
    nome: "Nenhuma loja seguida",
    arquivoWebp: "ilustracoes/findlook-lojas-seguidas-vazio.webp",
    arquivoPng: "ilustracoes/findlook-lojas-seguidas-vazio.png",
    largura: 1536,
    altura: 1024,
    alt: "Nyx, a gata preta de óculos escuros e lenço pink, sentada e pensativa diante de três vitrines de lojas de roupa; cada loja tem o pin de localização com cabide no telhado e um botão pink \"+ Seguir\" na vitrine.",
    onde: "Área logada do consumidor › Lojas seguidas.",
    quando: "Quando a pessoa ainda não segue nenhuma loja. Some assim que a primeira loja for seguida.",
    naoUsar: ["Não usar na lista de lojas da busca ou do mapa: os botões \"+ Seguir\" da imagem podem parecer clicáveis.", "Não usar para favoritos de peças: esta peça fala de lojas (vitrines)."],
  },
  {
    id: "ilustracao-contatos-vazio",
    nome: "Nenhum contato com lojas",
    arquivoWebp: "ilustracoes/findlook-contatos-vazio.webp",
    arquivoPng: "ilustracoes/findlook-contatos-vazio.png",
    largura: 1536,
    altura: 1024,
    alt: "Nyx, a gata preta de óculos escuros e lenço pink, sentada com um celular pink na pata, imagina em um balão de pensamento um vestido pink pendurado em um cabide; ao lado, uma sacola de compras pink.",
    onde: "Área logada do consumidor › Seus contatos com lojas.",
    quando: "Quando a pessoa ainda não iniciou nenhum contato com uma loja. Some assim que o primeiro contato existir.",
    naoUsar: ["Não usar na caixa de mensagens da loja (área do lojista): a cena é do ponto de vista de quem compra.", "Não usar quando há contatos arquivados ou filtrados: aí a lista não está \"ainda vazia\"."],
  },
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
      {/* Nome */}
      <div>
        <Label>{t("Name", "Nome")}</Label>
        <h3 className={`${display} text-[1.375rem] font-semibold tracking-[-0.02em] text-foreground`}>{il.nome}</h3>
      </div>

      {/* Imagem */}
      <div>
        <Label>{t("Image", "Imagem")}</Label>
        <div className="rounded-[16px] bg-white p-6 sm:p-8 dark:ring-1 dark:ring-white/10">
          <img src={webp} width={il.largura} height={il.altura} alt={il.alt} className="mx-auto h-auto w-full max-w-[560px]" />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => baixar(webp, `${nomeArquivo}.webp`)} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[0.75rem] font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
            <Download className="h-3.5 w-3.5" aria-hidden /> WebP
          </button>
          <button type="button" onClick={() => baixar(png, `${nomeArquivo}.png`)} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[0.75rem] font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
            <Download className="h-3.5 w-3.5" aria-hidden /> PNG
          </button>
          <span className="text-[0.75rem] text-muted-foreground">{il.largura} × {il.altura} px · {t("transparent background", "fundo transparente")}</span>
        </div>
        <p className="mt-2 text-[0.75rem] leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground">{t("Alt text", "Texto alternativo")}:</span> {il.alt}</p>
      </div>

      {/* Visão web / Visão mobile */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Label>{t("Web view", "Visão web")}</Label>
          <EmptyStateMock src={webp} alt="" />
        </div>
        <div>
          <Label>{t("Mobile view", "Visão mobile")}</Label>
          <EmptyStateMock src={webp} alt="" mobile />
        </div>
      </div>

      {/* Onde / quando usar · Como não usar */}
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

export function IllustrationsShowcase() {
  const { t } = useI18n();
  const base = import.meta.env.BASE_URL;
  return (
    <div className="space-y-12 pb-16">
      {/* Identidade: a mascote Nyx */}
      <section id="ilustracoes-estilo" className="scroll-mt-32">
        <SectionHeader
          title={t("Illustrations and the mascot Nyx", "Ilustrações e a mascote Nyx")}
          description={t(
            "Illustrations are part of the FindLook brand identity, next to the symbol, the colors and the typography. They star Nyx, the black cat: she appears in every piece, always with her pink sunglasses and pink scarf, and brings the brand's light, fashion-minded tone to the moments when there is nothing on screen yet.",
            "As ilustrações fazem parte da identidade da marca FindLook, ao lado do símbolo, das cores e da tipografia. Elas têm como protagonista a Nyx, a gata preta: ela aparece em todas as peças, sempre com os óculos escuros pink e o lenço pink, e leva o tom leve e fashion da marca para os momentos em que ainda não há nada na tela.",
          )}
        />
        <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-[20px] bg-white p-6 dark:ring-1 dark:ring-white/10">
            <img src={base + "ilustracoes/findlook-contatos-vazio.webp"} alt={t("Nyx, the FindLook mascot: a black cat with pink sunglasses and a pink scarf.", "Nyx, a mascote da FindLook: uma gata preta de óculos escuros pink e lenço pink.")} className="mx-auto h-auto w-full max-w-[380px]" />
            <p className={`${display} mt-3 text-center text-[1.125rem] font-semibold text-[var(--graphite-950)]`}>Nyx</p>
            <p className="text-center text-[0.8125rem] text-[var(--graphite-500)]">{t("The FindLook mascot", "A mascote da FindLook")}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [t("Who she is", "Quem ela é"), t("A black cat, curious and stylish. She is the person who searches: she looks, compares, imagines the piece and goes find it in the city.", "Uma gata preta, curiosa e estilosa. Ela é quem procura: olha, compara, imagina a peça e vai encontrá-la na cidade.")],
              [t("Her signature", "Sua marca registrada"), t("Pink sunglasses on the head or the eyes and a pink scarf. Never without them; never in another color.", "Óculos escuros pink na cabeça ou nos olhos e lenço pink. Nunca sem eles; nunca em outra cor.")],
              [t("Her world", "Seu mundo"), t("The brand symbol (the location pin with the hanger) is always in the scene, plus fashion pieces: bags, boots, dresses, hangers, store fronts.", "O símbolo da marca (o pin de localização com o cabide) está sempre na cena, junto de peças de moda: sacolas, botas, vestidos, cabides, vitrines.")],
              [t("Style", "Estilo"), t("Flat shapes, no outlines, soft shadow at the base. Only the brand palette: pink, graphite and white.", "Formas chapadas, sem contorno, sombra suave na base. Só a paleta da marca: pink, grafite e branco.")],
              [t("Where she appears", "Onde ela aparece"), t("In specific moments: errors and empty states of the consumer area, onboarding. One illustration per screen, never as decoration.", "Em momentos específicos: erros e estados vazios da área do consumidor, onboarding. Uma ilustração por tela, nunca como decoração.")],
              [t("Where she does not appear", "Onde ela não aparece"), t("In the logo, as icon or avatar, in the store owner's area, over photos or over the brand pink.", "No logo, como ícone ou avatar, na área do lojista, sobre fotos ou sobre o pink da marca.")],
            ].map(([a, b]) => (
              <div key={a as string} className="rounded-[14px] border border-border bg-card p-4"><p className="mb-1 text-[0.875rem] font-semibold text-foreground">{a}</p><p className="text-[0.8125rem] leading-relaxed text-muted-foreground">{b}</p></div>
            ))}
          </div>
        </div>
        <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted-foreground">{t("The illustrations are supplied by the brand owner and are not generated in the product. New pieces enter this section as they are delivered, always with Nyx. In dark mode, place them on a light surface: Nyx and the type are graphite.", "As ilustrações são fornecidas pela dona da marca e não são geradas no produto. Novas peças entram nesta seção conforme são entregues, sempre com a Nyx. No tema escuro, coloque-as sobre superfície clara: a Nyx e os números são grafite.")}</p>
      </section>

      {/* Catálogo */}
      <section className="scroll-mt-32">
        <SectionHeader title={t("Catalog", "Catálogo")} description={t("Each piece below has name, image, web and mobile views, where and when to use it and how not to use it.", "Cada peça abaixo tem nome, imagem, visão web, visão mobile, onde e quando usar e como não usar.")} />
        <DataTable
          head={[t("Illustration", "Ilustração"), t("Where", "Onde"), t("Status", "Status")]}
          rows={ilustracoes.map((il) => [<a key={il.id} href={`#${il.id}`} className="font-semibold text-foreground underline decoration-primary/40 underline-offset-4 hover:text-primary">{il.nome}</a>, il.onde, <span key={il.id + "s"} className="inline-flex items-center gap-1 text-[var(--success)]"><Check className="h-3.5 w-3.5" aria-hidden /> {t("Available", "Disponível")}</span>])}
        />
      </section>

      <div className="space-y-10">
        {ilustracoes.map((il) => <IllustrationCard key={il.id} il={il} />)}
      </div>
    </div>
  );
}
