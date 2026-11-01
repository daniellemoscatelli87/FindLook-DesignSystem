import React, { useState } from "react";
import { CheckCircle, XCircle, Copy, Check, Download, Monitor, Tablet, Smartphone, Globe, Share2, Image as ImageIcon, UserCircle2, LayoutDashboard, AlertTriangle } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

import pngSimbolo from "@/imports/findlook/findlook-simbolo.png";
import pngSimboloMonoBranco from "@/imports/findlook/findlook-simbolo-mono-branco.png";
import pngSimboloMonoGrafite from "@/imports/findlook/findlook-simbolo-mono-grafite.png";
import pngHorizontalClaro from "@/imports/findlook/findlook-horizontal-sobre-claro.png";
import pngHorizontalGrafite from "@/imports/findlook/findlook-horizontal-sobre-grafite.png";
import pngVerticalClaro from "@/imports/findlook/findlook-vertical-sobre-claro.png";
import pngVerticalGrafite from "@/imports/findlook/findlook-vertical-sobre-grafite.png";
import pngWordmarkClaro from "@/imports/findlook/findlook-wordmark-sobre-claro.png";
import pngWordmarkGrafite from "@/imports/findlook/findlook-wordmark-sobre-grafite.png";

import svgSimbolo from "@/imports/svg/findlook-simbolo.svg?raw";
import svgSimboloMonoBranco from "@/imports/svg/findlook-simbolo-mono-branco.svg?raw";
import svgSimboloMonoGrafite from "@/imports/svg/findlook-simbolo-mono-grafite.svg?raw";
import svgHorizontalClaro from "@/imports/svg/findlook-horizontal-sobre-claro.svg?raw";
import svgHorizontalGrafite from "@/imports/svg/findlook-horizontal-sobre-grafite.svg?raw";
import svgVerticalClaro from "@/imports/svg/findlook-vertical-sobre-claro.svg?raw";
import svgVerticalGrafite from "@/imports/svg/findlook-vertical-sobre-grafite.svg?raw";
import svgWordmarkClaro from "@/imports/svg/findlook-wordmark-sobre-claro.svg?raw";
import svgWordmarkGrafite from "@/imports/svg/findlook-wordmark-sobre-grafite.svg?raw";

type DownloadAsset = { png: string; svg: string; filename: string };

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

async function downloadPng(url: string, filename: string) {
  try {
    saveBlob(await (await fetch(url)).blob(), filename);
  } catch {
    window.open(url, "_blank");
  }
}

function downloadSvg(markup: string, filename: string) {
  saveBlob(new Blob([markup], { type: "image/svg+xml;charset=utf-8" }), filename);
}

function DownloadButtons({ asset }: { asset: DownloadAsset }) {
  const btn =
    "inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-[0.75rem] font-semibold text-foreground transition-colors hover:border-primary hover:text-primary-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  return (
    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        onClick={() => downloadPng(asset.png, `${asset.filename}.png`)}
        className={btn}
        aria-label={`Baixar ${asset.filename} em PNG com fundo transparente`}
        title="PNG, fundo transparente"
      >
        <Download size={13} aria-hidden /> PNG
      </button>
      <button
        type="button"
        onClick={() => downloadSvg(asset.svg, `${asset.filename}.svg`)}
        className={btn}
        aria-label={`Baixar ${asset.filename} em SVG`}
        title="SVG, vetorial"
      >
        <Download size={13} aria-hidden /> SVG
      </button>
    </div>
  );
}

/* ── Cabeçalho de bloco ── */
function SectionBlock({ id, title, subtitle }: { id: string; title: string; subtitle?: string }) {
  return (
    <div id={id} className="mb-8 scroll-mt-32">
      <h2 className="text-[1.375rem] font-bold tracking-[-0.02em] text-foreground">{title}</h2>
      {subtitle && <p className="mt-1 text-[0.9375rem] text-muted-foreground">{subtitle}</p>}
      <div className="mt-4 h-px bg-border" />
    </div>
  );
}

/* ── Card de logo ── */
function LogoCard({
  label, description, bg, children, badge, download,
}: {
  label: string;
  description?: string;
  bg: string;
  children: React.ReactNode;
  badge?: string;
  download?: DownloadAsset;
}) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className={`flex items-center justify-center p-10 min-h-[220px] ${bg}`}>{children}</div>
      <div className="px-5 py-4 bg-card border-t border-border">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[0.875rem] font-semibold text-foreground">{label}</p>
            {description && <p className="text-[0.8125rem] text-muted-foreground mt-0.5">{description}</p>}
          </div>
          {download && <DownloadButtons asset={download} />}
          {!download && badge && (
            <span className="text-[0.6875rem] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
              {badge}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Amostra de cor ── */
function ColorChip({ name, hex, usage }: { name: string; hex: string; usage: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copy}
      aria-label={`Copiar ${hex} (${name})`}
      className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-all w-full text-left"
    >
      <div className="h-24 w-full border-b border-border/40" style={{ backgroundColor: hex }} />
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="flex-1 min-w-0">
          <p className="text-[0.875rem] font-semibold text-foreground truncate">{name}</p>
          <p className="text-[0.8125rem] text-muted-foreground font-mono">{hex}</p>
          <p className="text-[0.75rem] text-muted-foreground mt-1">{usage}</p>
        </div>
        <span className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1">
          {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
        </span>
      </div>
    </button>
  );
}

/* ── Certo / Errado ── */
function RuleCard({ type, bg, children, label }: { type: "do" | "dont"; bg: string; children: React.ReactNode; label: string }) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className={`flex items-center justify-center p-8 min-h-[180px] ${bg}`}>{children}</div>
      <div className="px-4 py-3 bg-card border-t border-border">
        <div className="flex items-center gap-2">
          {type === "do" ? <CheckCircle className="h-4 w-4 text-success shrink-0" /> : <XCircle className="h-4 w-4 text-error shrink-0" />}
          <span className={`text-[0.8125rem] font-medium ${type === "do" ? "text-success" : "text-error"}`}>
            {type === "do" ? "Correto" : "Incorreto"}
          </span>
        </div>
        <p className="mt-0.5 text-[0.8125rem] text-muted-foreground pl-6">— {label}</p>
      </div>
    </div>
  );
}

const GRAFITE_BG = "bg-[#060608]";
const ROSA_BG = "bg-[#FFF2F5]";

export function BrandShowcase() {
  return (
    <section id="brand" className="space-y-16">

      {/* ── Introdução ── */}
      <div className="space-y-3 max-w-2xl">
        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
          Diretrizes de uso da marca FindLook: assinatura, símbolo, paleta, tipografia e regras de aplicação, para que a marca seja reconhecida sem ruído em todos os pontos de contato.
        </p>
        <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">
          Fonte: Brand Book FindLook, versão conceitual 1.0 (Curitiba). Os arquivos desta página são os vetores oficiais da marca (assinaturas horizontal e vertical, para fundo claro e escuro, e o símbolo). O wordmark é recortado da assinatura oficial e as versões monocromáticas do símbolo são o vetor oficial em uma só cor.
        </p>
      </div>

      {/* ── Assinatura horizontal ── */}
      <div>
        <SectionBlock
          id="brand-assinatura"
          title="Assinatura principal — horizontal"
          subtitle="Símbolo + logotipo. Priorize a assinatura horizontal em peças amplas: cabeçalhos, banners, materiais impressos e apresentações. Proporção fixa: símbolo com 2,25 vezes a altura do “F” e espaço de 0,3 F entre o símbolo e o logotipo."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <LogoCard
            download={{ png: pngHorizontalGrafite, svg: svgHorizontalGrafite, filename: "findlook-horizontal-sobre-grafite" }}
            label="Positiva sobre grafite"
            description="Versão preferencial da marca: “Find” em branco, “Look” em pink"
            bg={GRAFITE_BG}
          >
            <ImageWithFallback src={pngHorizontalGrafite} alt="Assinatura horizontal FindLook sobre grafite" className="h-16 w-auto object-contain" />
          </LogoCard>
          <LogoCard
            download={{ png: pngHorizontalClaro, svg: svgHorizontalClaro, filename: "findlook-horizontal-sobre-claro" }}
            label="Positiva sobre claro"
            description="Para fundos brancos e superfícies claras lisas: “Find” em grafite, “Look” em pink"
            bg="bg-white"
          >
            <ImageWithFallback src={pngHorizontalClaro} alt="Assinatura horizontal FindLook sobre fundo claro" className="h-16 w-auto object-contain" />
          </LogoCard>
        </div>
      </div>

      {/* ── Assinatura vertical ── */}
      <div>
        <SectionBlock
          id="brand-vertical"
          title="Assinatura vertical"
          subtitle="Símbolo sobre o logotipo. Use em espaços quadrados ou altos: cartões, totens, capas e redes sociais."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <LogoCard
            download={{ png: pngVerticalGrafite, svg: svgVerticalGrafite, filename: "findlook-vertical-sobre-grafite" }}
            label="Vertical sobre grafite"
            description="Mesma hierarquia da horizontal, empilhada"
            bg={GRAFITE_BG}
          >
            <ImageWithFallback src={pngVerticalGrafite} alt="Assinatura vertical FindLook sobre grafite" className="h-48 w-auto object-contain" />
          </LogoCard>
          <LogoCard
            download={{ png: pngVerticalClaro, svg: svgVerticalClaro, filename: "findlook-vertical-sobre-claro" }}
            label="Vertical sobre claro"
            description="Para fundos brancos e rosa claro"
            bg={ROSA_BG}
          >
            <ImageWithFallback src={pngVerticalClaro} alt="Assinatura vertical FindLook sobre rosa claro" className="h-48 w-auto object-contain" />
          </LogoCard>
        </div>
      </div>

      {/* ── Símbolo ── */}
      <div>
        <SectionBlock
          id="brand-simbolo"
          title="Símbolo — localização + moda"
          subtitle="O pin de localização com o cabide vazado. Em escala pequena, é a aplicação reduzida da marca. Nunca redesenhe o cabide nem separe suas partes. Por ser vazado, o cabide toma a cor do fundo: prefira fundos lisos, brancos ou grafite."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <LogoCard
            download={{ png: pngSimbolo, svg: svgSimbolo, filename: "findlook-simbolo" }}
            label="Símbolo oficial sobre claro"
            description="O cabide é vazado: assume a cor do fundo (branco aqui)"
            bg="bg-white"
          >
            <ImageWithFallback src={pngSimbolo} alt="Símbolo FindLook: pin pink com cabide vazado, sobre fundo branco" className="h-28 w-auto object-contain" />
          </LogoCard>
          <LogoCard
            download={{ png: pngSimbolo, svg: svgSimbolo, filename: "findlook-simbolo" }}
            label="Símbolo oficial sobre grafite"
            description="Mesmo arquivo: o cabide vazado fica grafite"
            bg={GRAFITE_BG}
          >
            <ImageWithFallback src={pngSimbolo} alt="Símbolo FindLook: pin pink com cabide vazado, sobre fundo grafite" className="h-28 w-auto object-contain" />
          </LogoCard>
          <LogoCard
            download={{ png: pngSimboloMonoBranco, svg: svgSimboloMonoBranco, filename: "findlook-simbolo-mono-branco" }}
            label="Monocromático branco"
            description="Vetor oficial em branco: marca d’água, fundo pink e fotos"
            bg={GRAFITE_BG}
          >
            <ImageWithFallback src={pngSimboloMonoBranco} alt="Símbolo FindLook monocromático branco" className="h-28 w-auto object-contain" />
          </LogoCard>
          <LogoCard
            download={{ png: pngSimboloMonoGrafite, svg: svgSimboloMonoGrafite, filename: "findlook-simbolo-mono-grafite" }}
            label="Monocromático grafite"
            description="Vetor oficial em grafite: impressão em uma cor e carimbos"
            bg="bg-white"
          >
            <ImageWithFallback src={pngSimboloMonoGrafite} alt="Símbolo FindLook monocromático grafite" className="h-28 w-auto object-contain" />
          </LogoCard>
        </div>
      </div>

      {/* ── Wordmark ── */}
      <div>
        <SectionBlock
          id="brand-wordmark"
          title="Wordmark — uso restrito"
          subtitle="Recorte da assinatura oficial. Só é permitido quando o símbolo já aparece na mesma peça ou quando o espaço horizontal é extremo (por exemplo, rodapés de uma linha)."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <LogoCard
            download={{ png: pngWordmarkGrafite, svg: svgWordmarkGrafite, filename: "findlook-wordmark-sobre-grafite" }}
            label="Wordmark sobre grafite"
            bg={GRAFITE_BG}
          >
            <ImageWithFallback src={pngWordmarkGrafite} alt="Wordmark FindLook sobre grafite" className="h-12 w-auto object-contain" />
          </LogoCard>
          <LogoCard
            download={{ png: pngWordmarkClaro, svg: svgWordmarkClaro, filename: "findlook-wordmark-sobre-claro" }}
            label="Wordmark sobre claro"
            bg="bg-white"
          >
            <ImageWithFallback src={pngWordmarkClaro} alt="Wordmark FindLook sobre fundo claro" className="h-12 w-auto object-contain" />
          </LogoCard>
        </div>
      </div>

      {/* ── Assinatura com slogan ── */}
      <div>
        <SectionBlock
          id="brand-slogan"
          title="Assinatura com slogan"
          subtitle="“Seu estilo por perto.” é a assinatura emocional da marca. Em peças institucionais, acompanha o logotipo separada por um filete pink."
        />
        <div className="rounded-2xl border border-border bg-card px-8 py-10 flex flex-wrap items-center justify-center gap-6">
          <ImageWithFallback src={pngHorizontalClaro} alt="FindLook" className="h-12 w-auto object-contain dark:hidden" />
          <ImageWithFallback src={pngHorizontalGrafite} alt="FindLook" className="h-12 w-auto object-contain hidden dark:block" />
          <span aria-hidden className="h-10 w-0.5 rounded-full bg-primary" />
          <p className="text-[1.5rem] font-medium tracking-[-0.01em] text-foreground">Seu estilo por perto.</p>
        </div>
        <p className="mt-3 text-[0.8125rem] text-muted-foreground">
          Convite de campanha: “Já deu um Find?”. Mensagens por público estão em <span className="font-medium text-foreground">Tom de voz</span>.
        </p>
      </div>

      {/* ── Quando usar o símbolo ── */}
      <div>
        <SectionBlock
          id="brand-uso-simbolo"
          title="Quando e onde usar o símbolo isolado"
          subtitle="O símbolo substitui a assinatura completa quando o espaço é muito limitado ou o contexto já estabelece a marca."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Globe, label: "Favicon", desc: "16 × 16 px a 32 × 32 px", bg: "bg-card", preview: pngSimbolo, previewSize: "h-6" },
            { icon: Smartphone, label: "Ícone de app e PWA", desc: "Tela inicial do celular", bg: GRAFITE_BG, preview: pngSimbolo, previewSize: "h-10" },
            { icon: UserCircle2, label: "Avatar da plataforma", desc: "Perfil oficial e notificações", bg: "bg-card", preview: pngSimbolo, previewSize: "h-10" },
            { icon: Share2, label: "Redes sociais", desc: "Foto de perfil do @findlook.cwb", bg: GRAFITE_BG, preview: pngSimbolo, previewSize: "h-10" },
            { icon: LayoutDashboard, label: "Cabeçalho mobile", desc: "Topo do app em telas estreitas", bg: "bg-card", preview: pngSimbolo, previewSize: "h-8" },
            { icon: ImageIcon, label: "Marca d’água", desc: "Fotos de peças e lojas", bg: "bg-[#2B2B31]", preview: pngSimboloMonoBranco, previewSize: "h-8" },
            { icon: Monitor, label: "Tela de carregamento", desc: "Splash e estados de espera", bg: GRAFITE_BG, preview: pngSimbolo, previewSize: "h-12" },
            { icon: Tablet, label: "Menu lateral recolhido", desc: "Painel do lojista em modo compacto", bg: "bg-card", preview: pngSimbolo, previewSize: "h-8" },
          ].map(({ icon: Icon, label, desc, bg, preview, previewSize }) => (
            <div key={label} className={`rounded-2xl border border-border ${bg} p-5 flex flex-col gap-4`}>
              <div className="flex items-start justify-between">
                <Icon className="h-4 w-4 text-muted-foreground mt-0.5" />
                <ImageWithFallback src={preview} alt={`Símbolo FindLook — ${label}`} className={`${previewSize} w-auto object-contain`} />
              </div>
              <div>
                <p className={`text-[0.875rem] font-semibold ${bg === "bg-card" ? "text-foreground" : "text-white"}`}>{label}</p>
                <p className={`text-[0.75rem] mt-0.5 leading-snug ${bg === "bg-card" ? "text-muted-foreground" : "text-white/70"}`}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card px-6 py-5">
          <p className="text-[0.8125rem] font-semibold text-foreground mb-4">Tamanhos mínimos</p>
          <div className="flex flex-wrap gap-6 items-end">
            {[
              { size: "h-4", label: "16px", note: "mínimo digital" },
              { size: "h-6", label: "24px", note: "favicon / aba" },
              { size: "h-8", label: "32px", note: "avatar pequeno" },
              { size: "h-10", label: "40px", note: "cabeçalho mobile" },
              { size: "h-14", label: "56px", note: "perfil / redes" },
              { size: "h-20", label: "80px", note: "ícone de app" },
            ].map(({ size, label, note }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <ImageWithFallback src={pngSimbolo} alt={`Símbolo ${label}`} className={`${size} w-auto object-contain`} />
                <span className="text-[0.75rem] font-mono font-semibold text-foreground">{label}</span>
                <span className="text-[0.6875rem] text-muted-foreground">{note}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[0.75rem] text-muted-foreground border-t border-border pt-3">
            Nunca use o símbolo abaixo de <span className="font-semibold text-foreground">16 px</span> no digital ou <span className="font-semibold text-foreground">5 mm</span> na impressão.
          </p>
        </div>
      </div>

      {/* ── Responsividade ── */}
      <div>
        <SectionBlock
          id="brand-responsivo"
          title="Escala e legibilidade — adaptação por dispositivo"
          subtitle="Priorize a assinatura horizontal em peças amplas. Na escala pequena, use somente o símbolo."
        />
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-4 text-[0.75rem] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3 border-b border-border bg-muted/20">
            <span>Dispositivo</span><span>Breakpoint</span><span>Versão da marca</span><span>Altura mínima</span>
          </div>
          {[
            { device: "Desktop", bp: "≥ 1024 px", version: "Assinatura horizontal", size: "32 px" },
            { device: "Tablet", bp: "768–1023 px", version: "Horizontal reduzida ou vertical", size: "40 px" },
            { device: "Celular", bp: "< 768 px", version: "Símbolo isolado", size: "32 px" },
            { device: "Favicon / aba", bp: "—", version: "Símbolo isolado", size: "16–32 px" },
          ].map(({ device, bp, version, size }, i, arr) => (
            <div key={device} className={`grid grid-cols-4 px-5 py-3.5 text-[0.8125rem] ${i < arr.length - 1 ? "border-b border-border" : ""}`}>
              <span className="font-medium text-foreground">{device}</span>
              <span className="text-muted-foreground font-mono">{bp}</span>
              <span className="text-foreground">{version}</span>
              <span className="text-muted-foreground font-mono">{size}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Monitor, title: "Desktop", img: pngHorizontalGrafite, h: "h-8" },
            { icon: Tablet, title: "Tablet", img: pngHorizontalGrafite, h: "h-7" },
            { icon: Smartphone, title: "Celular", img: pngSimbolo, h: "h-8" },
          ].map(({ icon: Icon, title, img, h }) => (
            <div key={title} className="rounded-2xl border border-border overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/30">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-[0.8125rem] font-semibold text-foreground">{title}</span>
              </div>
              <div className={`px-6 py-5 ${GRAFITE_BG} flex items-center`}>
                <ImageWithFallback src={img} alt={`Marca no cabeçalho — ${title}`} className={`${h} w-auto object-contain`} />
                <div className="ml-auto flex items-center gap-2">
                  <span className="h-7 w-16 rounded-full bg-primary flex items-center justify-center text-[0.6875rem] font-semibold text-white">Buscar</span>
                  <span className="h-7 w-7 rounded-lg bg-white/10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Fundos ── */}
      <div>
        <SectionBlock
          id="brand-fundos"
          title="Fundo e contraste"
          subtitle="Preferir branco sobre grafite; pink como destaque. Preferir grafite ou superfícies claras lisas; evitar fotos complexas sem faixa de proteção."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { bg: "bg-white border border-border", label: "Branco", img: pngSimbolo, text: "text-muted-foreground" },
            { bg: `${ROSA_BG} border border-border`, label: "Rosa claro", img: pngSimbolo, text: "text-muted-foreground" },
            { bg: GRAFITE_BG, label: "Preto grafite", img: pngSimbolo, text: "text-white/60" },
            { bg: "bg-primary", label: "Pink", img: pngSimboloMonoBranco, text: "text-white/80" },
          ].map(({ bg, label, img, text }) => (
            <div key={label} className={`rounded-2xl flex flex-col items-center justify-center gap-4 p-6 min-h-[160px] ${bg}`}>
              <ImageWithFallback src={img} alt={`Símbolo FindLook sobre ${label.toLowerCase()}`} className="h-14 w-auto object-contain" />
              <span className={`text-[0.75rem] font-medium ${text}`}>{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-[0.8125rem] text-muted-foreground">
          <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" aria-hidden />
          <p>Sobre o pink, o símbolo pink some. Use a versão monocromática branca. Em fotografia, aplique uma faixa grafite ou branca atrás da marca.</p>
        </div>
      </div>

      {/* ── Paleta ── */}
      <div>
        <SectionBlock
          id="brand-paleta"
          title="Identidade cromática — a cor que faz encontrar"
          subtitle="Quatro cores oficiais. Os tokens do sistema (escalas pink e grafite de 50 a 950) derivam delas e estão em Fundamentos."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <ColorChip name="Pink FindLook" hex="#E62040" usage="Destaque / ação (cor do logo oficial)" />
          <ColorChip name="Preto Grafite" hex="#060608" usage="Base / contraste (cor do logo oficial)" />
          <ColorChip name="Branco" hex="#FFFFFF" usage="Clareza / respiro" />
          <ColorChip name="Rosa Claro" hex="#FFF2F5" usage="Apoio / superfícies" />
        </div>
        <p className="mt-3 text-[0.8125rem] text-muted-foreground">
          Pink e Preto Grafite são as cores do arquivo vetorial oficial do logo, adotadas nos tokens em 01/11/2026 (o brand book v1.0 sugeria <span className="font-mono text-foreground">#F4144B</span> e <span className="font-mono text-foreground">#111014</span> e pedia validação no arquivo-mestre). Texto branco sobre o pink atinge 4,5:1 e passa o AA para texto normal; para texto corrido em pink sobre branco, o sistema usa <span className="font-mono text-foreground">pink-600</span> (6,4:1), ver Acessibilidade.
        </p>
      </div>

      {/* ── Tipografia ── */}
      <div>
        <SectionBlock
          id="brand-tipografia"
          title="Tipografia — forte para ser vista"
          subtitle="Direção tipográfica: Plus Jakarta Sans em toda a marca e no produto. Evitar fontes decorativas, excesso de pesos e texto em caixa alta contínua."
        />
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          {[
            { sample: "Aa Bb Cc", size: "text-[3rem]", weight: "font-extrabold", label: "Títulos — ExtraBold 800", tracking: "tracking-[-0.03em]" },
            { sample: "Uma cidade. Muitos estilos.", size: "text-[2rem]", weight: "font-bold", label: "Títulos — Bold 700", tracking: "tracking-[-0.025em]" },
            { sample: "Seu estilo por perto.", size: "text-[1.25rem]", weight: "font-medium", label: "Destaques — Medium 500", tracking: "tracking-[-0.01em]" },
            { sample: "Textos claros e objetivos, que mostram o que fazer e o que acontece depois.", size: "text-[1rem]", weight: "font-normal", label: "Corpo — Regular 400", tracking: "" },
            { sample: "CONFIRMADO PELA LOJA", size: "text-[0.75rem]", weight: "font-semibold", label: "Rótulos — SemiBold 600, só em rótulos curtos", tracking: "tracking-[0.12em]" },
          ].map(({ sample, size, weight, label, tracking }, i, arr) => (
            <div key={label} className={`px-6 py-5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-4 ${i < arr.length - 1 ? "border-b border-border" : ""}`}>
              <span className={`${size} ${weight} ${tracking} text-foreground leading-tight`} style={{ fontFamily: "var(--font-sans)" }}>{sample}</span>
              <span className="text-[0.75rem] text-muted-foreground shrink-0 font-mono">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Regras ── */}
      <div>
        <SectionBlock
          id="brand-regras"
          title="Regras para crescer"
          subtitle="Checklist de aplicação e cuidados essenciais, do brand book."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          {[
            ["Preservar", "Proporções, alinhamento e área de proteção do logo."],
            ["Contraste", "Preferir branco sobre grafite; pink como destaque."],
            ["Clareza", "Uma mensagem central e um CTA prioritário por peça."],
            ["Respiro", "Evitar ícones, textos e elementos excessivamente próximos."],
            ["Validação", "Usar o arquivo vetorial oficial e verificar todos os QR codes."],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-white"><Check className="h-3.5 w-3.5" aria-hidden /></span>
                <p className="text-[0.8125rem] font-semibold text-primary-text uppercase tracking-wider">{title}</p>
              </div>
              <p className="text-[0.8125rem] text-muted-foreground leading-snug">{desc}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <RuleCard type="do" bg={GRAFITE_BG} label="Positiva sobre grafite em fundo grafite">
            <ImageWithFallback src={pngHorizontalGrafite} alt="Correto: assinatura sobre grafite" className="h-12 w-auto object-contain" />
          </RuleCard>
          <RuleCard type="do" bg="bg-white" label="Positiva sobre claro em fundo branco">
            <ImageWithFallback src={pngHorizontalClaro} alt="Correto: assinatura sobre claro" className="h-12 w-auto object-contain" />
          </RuleCard>
          <RuleCard type="dont" bg="bg-white" label="Não use a versão para grafite em fundo claro">
            <ImageWithFallback src={pngHorizontalGrafite} alt="Incorreto: versão para grafite em fundo branco" className="h-12 w-auto object-contain" />
          </RuleCard>
          <RuleCard type="dont" bg="bg-white" label="Não esticar, inclinar nem alterar proporções">
            <ImageWithFallback src={pngSimbolo} alt="Incorreto: símbolo distorcido" className="h-16 w-28 object-fill" style={{ transform: "scaleX(1.6)" }} />
          </RuleCard>
          <RuleCard type="dont" bg="bg-white" label="Não mudar as cores da marca">
            <ImageWithFallback src={pngSimboloMonoGrafite} alt="Incorreto: símbolo recolorido" className="h-16 w-auto object-contain" style={{ filter: "sepia(1) hue-rotate(60deg) saturate(3)" }} />
          </RuleCard>
          <RuleCard type="dont" bg="bg-primary" label="Não aplicar o símbolo pink sobre pink">
            <ImageWithFallback src={pngSimbolo} alt="Incorreto: símbolo pink sobre fundo pink" className="h-16 w-auto object-contain opacity-90" />
          </RuleCard>
        </div>
        <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-2 text-[0.8125rem] text-muted-foreground">
          {["Não esticar, inclinar, contornar ou mudar cores.", "Não redesenhar o cabide nem separar suas partes.", "Uma mensagem central e um CTA por peça.", "Antes da produção: conferir proporções, cores, tipografia e espessuras no arquivo original."].map(r => (
            <li key={r} className="flex items-start gap-2"><XCircle className="h-4 w-4 text-error shrink-0 mt-0.5" aria-hidden />{r}</li>
          ))}
        </ul>
      </div>

      {/* ── Área de proteção ── */}
      <div>
        <SectionBlock
          id="brand-respiro"
          title="Área de proteção"
          subtitle="Manter espaço livre em torno do conjunto. Referência provisória: a altura do “F” do logotipo ao redor."
        />
        <div className="rounded-2xl border border-border bg-card p-16 sm:p-20 flex items-center justify-center overflow-x-auto">
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 -m-10 border-2 border-dashed border-primary/30 rounded-lg pointer-events-none" />
            {[
              "absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1",
              "absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col-reverse items-center gap-1",
            ].map((cls, i) => (
              <div key={i} className={cls}>
                <div className="w-px h-8 bg-primary/40" />
                <span className="text-[0.6875rem] font-mono text-primary-text bg-card px-1.5 py-0.5 rounded">1 F</span>
              </div>
            ))}
            {[
              "absolute -left-10 top-1/2 -translate-y-1/2 flex items-center gap-1",
              "absolute -right-10 top-1/2 -translate-y-1/2 flex flex-row-reverse items-center gap-1",
            ].map((cls, i) => (
              <div key={i} className={cls}>
                <div className="h-px w-8 bg-primary/40" />
                <span className="text-[0.6875rem] font-mono text-primary-text bg-card px-1.5 py-0.5 rounded">1 F</span>
              </div>
            ))}
            <ImageWithFallback src={pngHorizontalClaro} alt="Assinatura com área de proteção" className="h-16 w-auto object-contain dark:hidden" />
            <ImageWithFallback src={pngHorizontalGrafite} alt="Assinatura com área de proteção" className="h-16 w-auto object-contain hidden dark:block" />
          </div>
        </div>
        <p className="mt-3 text-[0.8125rem] text-muted-foreground text-center">
          Onde <span className="font-semibold text-primary-text">1 F</span> = altura do “F” maiúsculo do logotipo.
        </p>
      </div>

    </section>
  );
}
