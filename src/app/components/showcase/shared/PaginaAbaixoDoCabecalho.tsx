import React, { useRef, useState } from "react";
import { LogIn, Monitor, Smartphone, Store } from "lucide-react";
import { CabecalhoDoSite, type ItemDoCabecalho } from "../../ui/cabecalho-do-site";
import { SegmentedControl } from "../../ui/segmented-control";
import { Button } from "../../ui/button";
import { PaginaDeErro } from "../../ui/estado-vazio";

/* Demonstração do espaço abaixo do cabeçalho (28/11/2026): o cabeçalho do site e a página 404 do FindLook (ilustração
   da Nyx e "Voltar ao início") numa moldura de celular (390 px) ou de computador. As media queries seguem a janela da
   documentação, não a moldura; por isso a moldura define os valores da tela escolhida (--espaco-abaixo-do-cabecalho),
   os mesmos do theme.css. */

type Tela = "celular" | "computador";
const VALORES: Record<Tela, { espaco: string; px: number }> = {
  celular: { espaco: "var(--space-8)", px: 32 },
  computador: { espaco: "var(--space-16)", px: 64 },
};

const itens: ItemDoCabecalho[] = [
  { id: "como-funciona", rotulo: "Como funciona", href: "#site-erro" },
  { id: "lojas-locais", rotulo: "Lojas locais", href: "#site-erro" },
  { id: "duvidas", rotulo: "Dúvidas", href: "#site-erro" },
];

export function PaginaAbaixoDoCabecalho() {
  const [tela, setTela] = useState<Tela>("celular");
  const raiz = useRef<HTMLDivElement>(null);
  const v = VALORES[tela];
  return (
    <div className="space-y-4">
      <SegmentedControl
        size="lg"
        aria-label="Tela"
        value={tela}
        onValueChange={setTela}
        options={[
          { value: "celular", label: "Celular · 390 px", icon: <Smartphone aria-hidden /> },
          { value: "computador", label: "Computador", icon: <Monitor aria-hidden /> },
        ]}
      />
      <div
        ref={raiz}
        data-testid="demo-abaixo-do-cabecalho"
        data-tela={tela}
        className={`overflow-hidden rounded-xl border border-border bg-background ${tela === "celular" ? "mx-auto max-w-[390px]" : ""}`}
        style={{ "--espaco-abaixo-do-cabecalho": v.espaco } as React.CSSProperties}
      >
        <CabecalhoDoSite
          itens={itens}
          atual="como-funciona"
          tela={tela}
          raiz={raiz}
          esconderAoRolar={false}
          transparenteNoTopo={false}
          inicioHref="#site-erro"
          acaoSecundaria={{ rotulo: "Sou Lojista", href: "#site-erro", icone: <Store aria-hidden /> }}
          acao={{ rotulo: "Entrar", href: "#site-erro", icone: <LogIn aria-hidden /> }}
        />
        <div className="relative">
          {/* Régua da documentação (decorativa): mostra o espaço entre o fim do cabeçalho e o conteúdo. */}
          <div aria-hidden className="pointer-events-none absolute left-1 top-0 flex items-center gap-1" style={{ height: "var(--espaco-abaixo-do-cabecalho)" }}>
            <span className="h-full w-0.5 rounded-full bg-primary" />
            <span className="font-mono text-caption font-semibold text-primary-text">{v.px}</span>
          </div>
          <PaginaDeErro
            abaixoDoCabecalho
            elemento="div"
            telaCheia={false}
            ilustracao={<img src={`${import.meta.env.BASE_URL}ilustracoes/findlook-404.webp`} alt="" className="h-auto w-full" />}
            titulo="Página não encontrada"
            acoes={<Button asChild><a href="#site-erro">Voltar ao início</a></Button>}
          />
        </div>
      </div>
    </div>
  );
}
