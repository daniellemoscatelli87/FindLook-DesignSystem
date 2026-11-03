import React from "react";
import { Download, Check, X, AlertTriangle } from "lucide-react";
import { useI18n } from "../../i18n";
import { DataTable, DoDont, SubTitle, display } from "./shared/Guidance";

/* ══════════════════════════════════════
   ILUSTRAÇÕES — só no FindLook Design System
   Cada ilustração entra aqui conforme a dona do produto envia.
══════════════════════════════════════ */

type Illustration = {
  id: string;
  nome: string;
  uso: string;
  arquivoWebp: string;
  arquivoPng: string;
  largura: number;
  altura: number;
  alt: string;
  descricao: string;
  elementos: string[];
};

const ilustracoes: Illustration[] = [
  {
    id: "ilustracao-404",
    nome: "Página 404",
    uso: "Página não encontrada",
    arquivoWebp: "ilustracoes/findlook-404.webp",
    arquivoPng: "ilustracoes/findlook-404.png",
    largura: 1536,
    altura: 1024,
    alt: "Número 404 com um pin de localização no lugar do zero e um cabide dentro; um gato preto de óculos escuros espia de dentro de uma sacola de compras pink, ao lado de um par de botas pretas.",
    descricao: "O zero do 404 vira o pin de localização da FindLook com o cabide dentro: a página não foi encontrada, mas a busca continua. O gato de óculos escuros na sacola dá o tom leve e fashion do erro.",
    elementos: ["Pin de localização com cabide (símbolo da marca)", "Gato preto de óculos escuros (personagem)", "Sacola de compras pink com lenço", "Par de botas pretas de salto", "Traços de ênfase em pink"],
  },
  {
    id: "ilustracao-favoritos-vazio",
    nome: "Favoritos vazios",
    uso: "Área logada do consumidor › Favoritos, quando ainda não há favoritos adicionados",
    arquivoWebp: "ilustracoes/findlook-favoritos-vazio.webp",
    arquivoPng: "ilustracoes/findlook-favoritos-vazio.png",
    largura: 1448,
    altura: 1086,
    alt: "Gato preto de óculos escuros e lenço pink abre, surpreso, um guarda-roupa pink vazio com dois cabides na arara; no topo do móvel, o pin de localização com o cabide; ao lado, um par de sapatos de salto e uma caixa de presente listrada.",
    descricao: "O guarda-roupa está vazio, mas pronto: os cabides esperam as primeiras peças favoritas. O gato surpreso dá leveza ao estado vazio e convida a explorar.",
    elementos: ["Guarda-roupa pink aberto com dois cabides vazios", "Pin de localização com cabide no topo (símbolo da marca)", "Gato preto de óculos escuros e lenço pink (personagem)", "Sapatos de salto e caixa de presente listrada", "Brilhos e traços de ênfase em pink"],
  },
  {
    id: "ilustracao-lojas-seguidas-vazio",
    nome: "Lojas seguidas vazias",
    uso: "Área logada do consumidor › Lojas seguidas, quando ainda não há lojas seguidas",
    arquivoWebp: "ilustracoes/findlook-lojas-seguidas-vazio.webp",
    arquivoPng: "ilustracoes/findlook-lojas-seguidas-vazio.png",
    largura: 1536,
    altura: 1024,
    alt: "Gato preto de óculos escuros e lenço pink, sentado e pensativo, diante de três vitrines de lojas de roupa; cada loja tem o pin de localização com cabide no telhado e um botão pink \"+ Seguir\" na vitrine.",
    descricao: "Três vitrines convidam, cada uma com o pin da marca e o botão \"+ Seguir\". O gato ainda escolhe: o estado vazio de lojas seguidas vira um convite para descobrir e seguir as primeiras lojas.",
    elementos: ["Três vitrines de lojas de roupa (vestido, araras com camisetas e calças, blazer e bolsa)", "Pin de localização com cabide no telhado de cada loja (símbolo da marca)", "Botões pink \"+ Seguir\" nas vitrines", "Gato preto de óculos escuros e lenço pink, pensativo (personagem)", "Toldo pink e branco na loja central"],
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

function IllustrationCard({ il }: { il: Illustration }) {
  const { t } = useI18n();
  const base = import.meta.env.BASE_URL;
  const webp = base + il.arquivoWebp;
  const png = base + il.arquivoPng;
  const nomeArquivo = il.arquivoWebp.split("/").pop()!.replace(/\.webp$/, "");
  return (
    <section id={il.id} className="scroll-mt-32 space-y-6">
      <SectionHeader title={il.nome} description={il.descricao} />

      {/* prévia: a ilustração tem o gato em grafite, então no tema escuro ela fica sobre uma superfície clara */}
      <div className="rounded-[20px] border border-border bg-card p-4 sm:p-6" style={{ boxShadow: "var(--shadow-sm)" }}>
        <div className="rounded-[16px] bg-white p-6 sm:p-10 dark:ring-1 dark:ring-white/10">
          <img src={webp} width={il.largura} height={il.altura} alt={il.alt} className="mx-auto h-auto w-full max-w-[720px]" />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => baixar(webp, `${nomeArquivo}.webp`)} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[0.75rem] font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
            <Download className="h-3.5 w-3.5" aria-hidden /> WebP · {il.largura}×{il.altura}
          </button>
          <button type="button" onClick={() => baixar(png, `${nomeArquivo}.png`)} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[0.75rem] font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
            <Download className="h-3.5 w-3.5" aria-hidden /> PNG · {il.largura}×{il.altura}
          </button>
          <span className="text-[0.75rem] text-muted-foreground">{t("Transparent background", "Fundo transparente")}</span>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <DataTable
          head={[t("Attribute", "Atributo"), t("Value", "Valor")]}
          rows={[
            [t("Use", "Uso"), il.uso],
            [t("File", "Arquivo"), <span key="f" className="font-mono text-[0.75rem]">{il.arquivoWebp} · {il.arquivoPng}</span>],
            [t("Size", "Dimensões"), `${il.largura} × ${il.altura} px (${(il.largura / il.altura).toFixed(2).replace(".", ",")}:1)`],
            [t("Background", "Fundo"), t("Transparent; works on light surfaces. In dark mode, place it on a light surface (white card): the cat and the number are graphite.", "Transparente; funciona sobre superfícies claras. No tema escuro, coloque sobre uma superfície clara (card branco): o gato e o número são grafite.")],
            [t("Alt text", "Texto alternativo"), il.alt],
            [t("Elements", "Elementos"), il.elementos.join(" · ")],
          ]}
        />
        <div className="space-y-4">
          <DoDont
            dos={[
              t("Use it only on the page it was made for; one illustration per screen.", "Use só na página para a qual foi feita; uma ilustração por tela."),
              t("Keep the original proportion; scale between 280 px and 720 px wide.", "Mantenha a proporção original; escale entre 280 px e 720 px de largura."),
              t("Always provide the alt text above (or alt=\"\" if the text next to it already says the same).", "Informe sempre o texto alternativo acima (ou alt=\"\" se o texto ao lado já diz o mesmo)."),
            ]}
            donts={[
              t("Do not recolor, mirror, crop the character or add effects.", "Não recolorir, espelhar, cortar o personagem nem aplicar efeitos."),
              t("Do not place it over photos, textures or the brand pink: the pink elements disappear.", "Não colocar sobre fotos, texturas ou o pink da marca: os elementos pink somem."),
              t("Do not use it as a logo, icon or avatar.", "Não usar como logo, ícone ou avatar."),
            ]}
          />
          <pre className="overflow-x-auto rounded-[10px] bg-muted/60 p-3 text-[0.75rem] text-muted-foreground"><code>{`<img
  src="/${il.arquivoWebp}"
  width="${il.largura}" height="${il.altura}"
  alt="${il.alt}"
  class="mx-auto w-full max-w-[560px] h-auto"
/>`}</code></pre>
        </div>
      </div>
    </section>
  );
}

export function IllustrationsShowcase() {
  const { t } = useI18n();
  return (
    <div className="space-y-16 pb-16">
      <section id="ilustracoes-estilo" className="scroll-mt-32">
        <SectionHeader
          title={t("Illustrations", "Ilustrações")}
          description={t(
            "Illustrations are part of the FindLook voice: light, fashion-minded and with the brand symbol in the scene. They are used sparingly, in specific moments (errors, empty states, onboarding), and each one is published here with its file, alt text and usage rules.",
            "As ilustrações fazem parte da voz da FindLook: leves, com humor de moda e com o símbolo da marca na cena. São usadas com parcimônia, em momentos específicos (erros, estados vazios, onboarding), e cada uma é publicada aqui com arquivo, texto alternativo e regras de uso.",
          )}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            [t("Style", "Estilo"), t("Flat shapes, no outlines, soft shadows at the base. Rounded, friendly forms.", "Formas chapadas, sem contorno, sombra suave na base. Formas arredondadas e simpáticas.")],
            [t("Colors", "Cores"), t("Only the brand palette: pink (--primary), graphite (--graphite-950) and white. Pink carries the brand elements; graphite carries the character and the type.", "Só a paleta da marca: pink (--primary), grafite (--graphite-950) e branco. O pink leva os elementos da marca; o grafite leva o personagem e o número.")],
            [t("Recurring elements", "Elementos recorrentes"), t("The location pin with the hanger (brand symbol), the cat with sunglasses (character) and fashion pieces: bag, boots, scarf.", "O pin de localização com o cabide (símbolo da marca), o gato de óculos escuros (personagem) e peças de moda: sacola, botas, lenço.")],
          ].map(([a, b]) => (
            <div key={a as string} className="rounded-[14px] border border-border bg-card p-4"><p className="mb-1 text-[0.875rem] font-semibold text-foreground">{a}</p><p className="text-[0.8125rem] leading-relaxed text-muted-foreground">{b}</p></div>
          ))}
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-[12px] border border-border bg-muted/40 p-3 text-[0.8125rem] text-muted-foreground">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--warning)]" aria-hidden />
          <p>{t("Illustrations are supplied by the brand owner; they are not generated in the product. New pieces are added to this section as they are delivered.", "As ilustrações são fornecidas pela dona da marca; não são geradas no produto. Novas peças entram nesta seção conforme são entregues.")}</p>
        </div>
      </section>

      <div className="space-y-16">
        {ilustracoes.map((il) => <IllustrationCard key={il.id} il={il} />)}
      </div>

      <section className="scroll-mt-32">
        <SubTitle>{t("Catalog", "Catálogo")}</SubTitle>
        <DataTable
          head={[t("Illustration", "Ilustração"), t("Use", "Uso"), t("Status", "Status")]}
          rows={ilustracoes.map((il) => [il.nome, il.uso, <span key={il.id} className="inline-flex items-center gap-1 text-[var(--success)]"><Check className="h-3.5 w-3.5" aria-hidden /> {t("Available", "Disponível")}</span>])}
        />
        <p className="mt-2 text-[0.75rem] text-muted-foreground"><X className="mr-1 inline h-3 w-3" aria-hidden />{t("Other moments (onboarding, no results, other empty lists) have no illustration yet.", "Outros momentos (onboarding, busca sem resultado, outras listas vazias) ainda não têm ilustração.")}</p>
      </section>
    </div>
  );
}
