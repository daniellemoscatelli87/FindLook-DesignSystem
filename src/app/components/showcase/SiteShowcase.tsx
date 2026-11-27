import React, { useRef } from "react";
import { AtSign, LogIn, ShieldCheck, Store } from "lucide-react";
import { SectionHeader } from "./shared/SectionHeader";
import { DataTable, DoDont, Mono, Panel, SubTitle } from "./shared/Guidance";
import { CabecalhoDoSite, type LinkDoCabecalho } from "../ui/cabecalho-do-site";
import { RodapeDoSite } from "../ui/rodape-do-site";
import { MolduraDeConta } from "../ui/moldura-de-conta";
import { ProvaSocial } from "../ui/prova-social";
import { ListaDeVantagens } from "../ui/lista-de-vantagens";
import { Logo } from "../ui/logo";
import { LinkDeTexto, LinkDeVoltar, LinkPularConteudo, LinkSaibaMais } from "../ui/links";
import { Prosa } from "../ui/prosa";
import { Campo } from "../ui/campo";
import { Button } from "../ui/button";
import { Heading } from "../ui/heading";

/* Moldura do site: as peças das páginas públicas do produto, promovidas a componentes (27/11/2026). */

const links: LinkDoCabecalho[] = [
  { rotulo: "Como funciona", href: "#site-cabecalho", atual: true },
  { rotulo: "Lojas locais", href: "#site-cabecalho" },
  { rotulo: "Novas e usadas", href: "#site-cabecalho" },
  { rotulo: "Dúvidas", href: "#site-cabecalho" },
];

const avatares = [1, 2, 3, 4].map((i) => ({ imageUrl: `${import.meta.env.BASE_URL}avatares/avatar-${i}.svg`, profileUrl: "#site-prova-social", name: `Pessoa ${i} (exemplo)` }));

function Exemplo({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <SubTitle>{titulo}</SubTitle>
      {children}
    </div>
  );
}

export function SiteShowcase() {
  const palco = useRef<HTMLDivElement>(null);
  return (
    <div className="space-y-16 pb-16">
      <section id="site-cabecalho" className="scroll-mt-32 space-y-6">
        <SectionHeader
          title="Cabeçalho do site e menu do celular"
          description="O padrão Header e menus (modelo Faixa inteira) como componente, com o comportamento das páginas públicas: transparente sobre a capa, ganha o fundo ao rolar, o logo vira o símbolo, some ao descer e volta ao subir. No celular, os links ficam no menu em folha inferior."
        />
        <Panel className="overflow-hidden p-0">
          <div ref={palco} className="relative h-112 overflow-y-auto overscroll-contain" tabIndex={0} aria-label="Demonstração do cabeçalho: role esta área">
            <CabecalhoDoSite
              raiz={palco}
              links={links}
              transparenteNoTopo
              telaLarga="xl"
              acaoSecundaria={{ rotulo: "Sou Lojista", href: "#site-cabecalho", icone: <Store aria-hidden /> }}
              acaoPrincipal={{ rotulo: "Entrar", href: "#site-cabecalho", icone: <LogIn aria-hidden /> }}
            />
            <div className="-mt-16 bg-gradient-to-b from-muted to-accent px-4 pb-16 pt-28 sm:px-8 xl:-mt-18">
              <Heading level={3} size="section">Diga o que procura. A gente mostra **onde encontrar**.</Heading>
              <p className="mt-3 max-w-xl text-body text-muted-foreground">Role esta área para ver o cabeçalho ganhar o fundo, trocar o logo pelo símbolo, sumir ao descer e voltar ao subir.</p>
            </div>
            <div className="space-y-4 px-4 py-10 sm:px-8">
              {Array.from({ length: 8 }, (_, i) => <div key={i} aria-hidden className="h-6 rounded-sm bg-muted" />)}
            </div>
          </div>
        </Panel>
        <DataTable
          head={["Prop", "O que faz"]}
          rows={[
            [<Mono>links</Mono>, "Itens do menu ({ rotulo, href, atual }). O atual fica no rosa do selecionado, com aria-current."],
            [<Mono>acaoSecundaria · acaoPrincipal</Mono>, "As duas pílulas da direita (contorno e preenchida), com ícone. No celular, lado a lado no fim do menu."],
            [<Mono>transparenteNoTopo · iconeAoRolar · someAoRolar</Mono>, "Os três comportamentos de rolagem (os dois últimos ligados por padrão)."],
            [<Mono>telaLarga</Mono>, "\"lg\" (1024 px, padrão) ou \"xl\" (1280 px), para menus com mais itens."],
            [<Mono>superficie</Mono>, "\"escura\" na página do lojista (logo da versão sobre grafite)."],
            [<Mono>comoLink · raiz · posicao</Mono>, "Link do produto (Next.js), contêiner com rolagem própria e \"sticky\" ou \"fixed\"."],
          ]}
        />
        <DoDont
          dos={["Uma ação principal só (Entrar) e uma secundária (Sou Lojista).", "Itens curtos, de uma ou duas palavras.", "Na página com capa, use transparenteNoTopo e comece a capa por baixo do cabeçalho."]}
          donts={["Mais de sete links no menu.", "Hover rosa nos links: o hover é cinza; o rosa é só do item atual.", "Montar o cabeçalho à mão no produto."]}
        />
      </section>

      <section id="site-rodape" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Rodapé do site" description="O rodapé do protótipo das páginas públicas: marca e slogan, colunas de links (duas lado a lado no celular), o card de convite ao lojista, a faixa de privacidade, a linha final e os créditos." />
        <Panel className="overflow-hidden p-0">
          <RodapeDoSite
            marca={{ slogan: "Seu estilo por perto.", texto: "Uma nova forma de descobrir peças, lojas e marcas na sua cidade.", complemento: <span className="inline-flex items-center gap-2"><AtSign aria-hidden /> @lookfind.cwb</span> }}
            colunas={[
              { titulo: "Descobrir", links: [{ rotulo: "Como funciona", href: "#site-rodape" }, { rotulo: "Lojas locais", href: "#site-rodape" }, { rotulo: "Novas e usadas", href: "#site-rodape" }, { rotulo: "Explorar peças", href: "#site-rodape" }] },
              { titulo: "FindLook", links: [{ rotulo: "Dúvidas frequentes", href: "#site-rodape" }, { rotulo: "Para lojas e marcas", href: "#site-rodape" }, { rotulo: "Minhas preferências", href: "#site-rodape" }] },
            ]}
            convite={{ selo: "Para lojas e marcas", titulo: "Faça parte da descoberta.", texto: "Mostre suas peças para quem está procurando por elas.", acao: { rotulo: "Conheça a FindLook para lojistas", href: "#site-rodape" } }}
            faixa={{ icone: <ShieldCheck />, titulo: "Suas escolhas, seus dados.", texto: "Você decide quais interesses compartilhar e quando receber novidades.", link: { rotulo: "Gerenciar preferências", href: "#site-rodape" } }}
            linhaFinal={["© 2026 FindLook. Seu estilo por perto.", "Curitiba, PR • www.findlook.com.br"]}
            creditos={{ links: [{ rotulo: "Privacidade", href: "#site-rodape" }, { rotulo: "Termos de uso", href: "#site-rodape" }, { rotulo: "Área administrativa", href: "#site-rodape" }], autoria: "Desenvolvido por Dani Moscatelli • Experience Design Studio." }}
          />
        </Panel>
        <DoDont
          dos={["Links sem destino (site, Instagram) entram sem href e viram texto.", "O card de convite tem divisor e o botão no canto inferior direito."]}
          donts={["Fundo rosa no rodapé inteiro (o rosa é destaque, não superfície).", "Repetir no rodapé os mesmos botões do cabeçalho."]}
        />
      </section>

      <section id="site-conta" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Moldura das telas de conta" description="Entrar, criar conta, recuperar acesso, redefinir senha e a área administrativa: fundo cinza, logo e Voltar ao início no topo e um card só de borda com o título, a explicação e o formulário. Com lateral, a coluna da marca aparece do 768 px em diante." />
        <Panel className="overflow-hidden p-0">
          <MolduraDeConta
            altura="conteudo"
            idDoConteudo="conteudo-exemplo-conta"
            voltar={{ rotulo: "Voltar ao início", href: "#site-conta" }}
            logoHref="#site-conta"
            titulo="Que bom ter você de volta"
            explicacao="Entre no painel da sua loja."
            lateral={<ListaDeVantagens itens={["Vitrine pesquisável por foto e descrição", "Contato direto pelo WhatsApp", "Veja quais peças despertam interesse"]} />}
            rodape={<p className="m-0">Sua loja ainda não está na FindLook? <LinkDeTexto href="#site-conta">Cadastre sua loja</LinkDeTexto></p>}
          >
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <Campo rotulo="E-mail" type="email" autoComplete="email" placeholder="ana@atelieaurora.com.br" />
              <Campo rotulo="Senha" type="password" autoComplete="current-password" ajuda={<LinkDeTexto href="#site-conta">Esqueci minha senha</LinkDeTexto>} />
              <Button type="submit" className="h-10 w-full toque:h-11"><LogIn aria-hidden /> Entrar</Button>
            </form>
          </MolduraDeConta>
        </Panel>
      </section>

      <section id="site-hero" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Peças do hero: vantagens, prova social e Saiba mais" description="A lista de vantagens com o check na base rosa, os círculos de avatares com a frase e a alça Saiba mais na base do hero." />
        <Panel className="space-y-8 p-6 sm:p-8">
          <Exemplo titulo="ListaDeVantagens">
            <ListaDeVantagens surgir itens={["Suas peças encontradas por quem procura na região", "Mais conexões entre sua loja e potenciais clientes", "Inteligência para reconhecer oportunidades de negócio"]} />
          </Exemplo>
          <div id="site-prova-social">
            <Exemplo titulo="ProvaSocial">
              <ProvaSocial avatares={avatares} maisPessoas={99} destaque="800 pessoas" texto="já encontraram seus looks (número de exemplo)" />
            </Exemplo>
          </div>
          <Exemplo titulo="LinkSaibaMais">
            <div className="flex justify-center"><LinkSaibaMais href="#site-links" /></div>
          </Exemplo>
        </Panel>
        <DoDont
          dos={["Três vantagens curtas, no máximo quatro.", "Na prova social, só número real (zerado no lançamento)."]}
          donts={["Inventar depoimentos ou números.", "Check verde ou ícones diferentes por item."]}
        />
      </section>

      <section id="site-logo" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Logo" description="A assinatura oficial desenhada no próprio componente: Find na cor do fundo e Look e o símbolo no rosa da marca. Com href, vira o link para a página inicial (44 px de toque)." />
        <div className="grid gap-4 sm:grid-cols-3">
          <Panel className="flex min-h-32 items-center justify-center p-6"><Logo className="h-10" /></Panel>
          <Panel className="dark flex min-h-32 items-center justify-center bg-background p-6"><Logo superficie="escura" className="h-10" /></Panel>
          <Panel className="flex min-h-32 items-center justify-center p-6"><Logo variante="simbolo" className="h-12" /></Panel>
        </div>
        <DataTable head={["Prop", "Valores"]} rows={[[<Mono>variante</Mono>, "horizontal (padrão) · simbolo"], [<Mono>superficie</Mono>, "clara (padrão) · escura"], [<Mono>href · comoLink</Mono>, "vira link; nome lido \"FindLook, página inicial\""], [<Mono>decorativo</Mono>, "escondido dos leitores de tela quando o nome já está ao lado"]]} />
      </section>

      <section id="site-links" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Links de texto" description="Um desenho para cada tipo de link: dentro do texto, voltar, saiba mais e pular para o conteúdo." />
        <Panel className="space-y-6 p-6 sm:p-8">
          <Exemplo titulo="LinkDeVoltar">
            <LinkDeVoltar href="#site-links">Lojas mapeadas</LinkDeVoltar>
          </Exemplo>
          <Exemplo titulo="LinkDeTexto">
            <p className="m-0 text-body text-foreground">Site da loja: <LinkDeTexto href="https://www.findlook.com.br" externo>findlook.com.br</LinkDeTexto>. Leia os <LinkDeTexto href="#site-links">Termos de uso</LinkDeTexto> antes de continuar.</p>
          </Exemplo>
          <Exemplo titulo="LinkPularConteudo">
            <p className="m-0 text-body-sm text-muted-foreground">Primeiro item de cada página: aparece só com o Tab e leva ao conteúdo principal. Aperte Tab nesta área para ver.</p>
            <div className="relative h-16 rounded-md border border-dashed border-border [transform:translateZ(0)]"><LinkPularConteudo href="#site-links" /></div>
          </Exemplo>
        </Panel>
      </section>

      <section id="site-prosa" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Prosa (textos longos)" description="Tipografia dos Termos de uso, da Política de privacidade e das páginas de ajuda: recebe o HTML do texto em Markdown e aplica a escala do DS, na largura de leitura." />
        <Panel className="p-6 sm:p-8">
          <Prosa>
            <h1>Termos de uso</h1>
            <p>Exemplo de texto longo. A FindLook mostra peças cadastradas por lojas e brechós participantes; a disponibilidade deve ser confirmada com a loja.</p>
            <h2>1. Quem pode usar</h2>
            <ul><li>Pessoas que procuram peças na cidade.</li><li>Lojas e brechós cadastrados.</li></ul>
            <blockquote><p>Rascunho de exemplo: este texto não é o documento jurídico.</p></blockquote>
            <p>Dúvidas? Veja a <a href="#site-prosa">Política de privacidade</a>.</p>
          </Prosa>
        </Panel>
      </section>
    </div>
  );
}
