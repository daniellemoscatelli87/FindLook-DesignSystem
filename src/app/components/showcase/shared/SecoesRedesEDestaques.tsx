import React from "react";
import { CircleCheck, Handshake, Users } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Callout, DataTable, DoDont, Mono, Panel, SubTitle } from "./Guidance";
import { GradeDeCards, ItemDaGrade } from "../../ui/grade-de-cards";
import { GrupoDeRedesSociais, LinkDeRedeSocial, htmlDoLinkDeRedeSocial, nomeDaRede, redesSociais } from "../../ui/link-de-rede-social";
import { GrupoDePilulasDeDestaque, PilulaDeDestaque } from "../../ui/pilula-de-destaque";
import { CardDeDepoimento } from "../../ui/card-de-depoimento";
import { BotaoWhatsApp, htmlDoBotaoWhatsApp } from "../../ui/botao-whatsapp";

/* Documentação do LinkDeRedeSocial e da PilulaDeDestaque (28/11/2026, aprovados pela dona do produto; mesma API e
   mesmas classes do DS Dani Moscatelli). Os links de exemplo levam à página inicial de cada rede. */

function Codigo({ children }: { children: string }) {
  return (
    <pre className="m-0 whitespace-pre-wrap [overflow-wrap:anywhere] rounded-md border border-border bg-muted/60 p-4 font-[family-name:var(--font-mono)] text-label leading-relaxed text-foreground">
      <code>{children}</code>
    </pre>
  );
}

const ENDERECO: Record<string, string> = {
  linkedin: "https://www.linkedin.com/",
  instagram: "https://www.instagram.com/",
  whatsapp: "https://www.whatsapp.com/",
  facebook: "https://www.facebook.com/",
  youtube: "https://www.youtube.com/",
  tiktok: "https://www.tiktok.com/",
  behance: "https://www.behance.net/",
};

export function SecaoLinkDeRedeSocial() {
  return (
    <section id="site-redes-sociais" className="scroll-mt-32 space-y-6">
      <SectionHeader
        title="Links de redes sociais"
        description="A pílula branca de link para uma rede social: o ícone da rede na cor oficial da marca, o texto e uma sombra suave. Abre o perfil em nova aba. Em grupo, centralizadas e quebrando em linhas."
      />
      <Panel className="p-5 sm:p-6">
        <SubTitle>Em grupo, centralizado (sm, o padrão)</SubTitle>
        <div data-demo="redes-inicio" className="flex flex-col items-center gap-3 py-4">
          <p className="m-0 text-center text-body font-semibold leading-relaxed text-foreground sm:text-subtitle">Siga nas redes sociais:</p>
          <GrupoDeRedesSociais aria-label="Redes sociais">
            <LinkDeRedeSocial rede="linkedin" href={ENDERECO.linkedin}>LinkedIn</LinkDeRedeSocial>
            <LinkDeRedeSocial rede="instagram" href={ENDERECO.instagram}>Instagram</LinkDeRedeSocial>
            <LinkDeRedeSocial rede="whatsapp" href={ENDERECO.whatsapp}>WhatsApp</LinkDeRedeSocial>
          </GrupoDeRedesSociais>
        </div>
      </Panel>
      <GradeDeCards className="gap-4 md:grid-cols-2">
        <ItemDaGrade>
          <Panel className="h-full p-5 sm:p-6">
            <SubTitle>Todas as redes (sm)</SubTitle>
            <GrupoDeRedesSociais aria-label="Redes, tamanho pequeno">
              {redesSociais.map((r) => <LinkDeRedeSocial key={r} rede={r} href="#site-redes-sociais">{nomeDaRede(r)}</LinkDeRedeSocial>)}
            </GrupoDeRedesSociais>
          </Panel>
        </ItemDaGrade>
        <ItemDaGrade>
          <Panel className="h-full p-5 sm:p-6">
            <SubTitle>Todas as redes (md)</SubTitle>
            <GrupoDeRedesSociais aria-label="Redes, tamanho médio">
              {redesSociais.map((r) => <LinkDeRedeSocial key={r} rede={r} tamanho="md" href="#site-redes-sociais">{nomeDaRede(r)}</LinkDeRedeSocial>)}
            </GrupoDeRedesSociais>
          </Panel>
        </ItemDaGrade>
      </GradeDeCards>
      <DataTable
        head={["Prop", "O que faz"]}
        rows={[
          [<Mono>rede</Mono>, "linkedin · instagram · whatsapp · facebook · youtube · tiktok · behance: escolhe o ícone e a cor oficial."],
          [<Mono>href · children</Mono>, "O endereço do perfil e o texto da pílula."],
          [<Mono>tamanho</Mono>, "sm (padrão): 32 px, texto de 12 px, ícone de 14 px. md: 40 px, texto de 14 px, ícone de 16 px. No toque, a área de toque tem 44 px de altura sem mudar o desenho."],
          [<Mono>novaAba</Mono>, "Abre em nova aba. Padrão: sim para link externo (http ou https), com \"(abre em nova aba)\" lido só pelos leitores de tela."],
          [<Mono>GrupoDeRedesSociais</Mono>, "A lista (ul/li): centralizada e quebrando em linhas, 12 px entre as pílulas. alinhamento=\"inicio\" alinha à esquerda."],
        ]}
      />
      <div className="space-y-3">
        <SubTitle>Como usar</SubTitle>
        <Codigo>{`<GrupoDeRedesSociais aria-label="Redes sociais">
  <LinkDeRedeSocial rede="instagram" href="https://www.instagram.com/…">Instagram</LinkDeRedeSocial>
  <LinkDeRedeSocial rede="whatsapp" href="https://wa.me/…">WhatsApp</LinkDeRedeSocial>
</GrupoDeRedesSociais>`}</Codigo>
        <p className="m-0 text-body-sm text-muted-foreground">
          Em páginas de HTML puro, as mesmas classes: o desenho mora no theme.css (bloco &quot;@ds-css-puro&quot;) e o componente em React só as aplica. A página precisa dos tokens do DS. O HTML pronto sai de htmlDoLinkDeRedeSocial:
        </p>
        <Codigo>{`<ul class="ds-grupo-redes-sociais" aria-label="Redes sociais">
  <li>${htmlDoLinkDeRedeSocial({ rede: "instagram", href: ENDERECO.instagram, texto: "Instagram" })}</li>
</ul>`}</Codigo>
        <DataTable
          head={["Classe", "O que faz"]}
          rows={[
            [<Mono>.ds-link-rede-social</Mono>, "A pílula (sm)."],
            [<Mono>.ds-link-rede-social--md</Mono>, "Tamanho médio."],
            [<Mono>.ds-link-rede-social--linkedin … --behance</Mono>, "A rede: dá a cor do ícone (--marca-*)."],
            [<Mono>.ds-link-rede-social__icone</Mono>, "O svg da marca (aria-hidden)."],
            [<Mono>.ds-grupo-redes-sociais (--inicio)</Mono>, "A lista, centralizada (ou alinhada à esquerda)."],
            [<Mono>.ds-so-leitor</Mono>, "Texto só para leitores de tela (\" (abre em nova aba)\")."],
          ]}
        />
      </div>
      <Callout title="Exceções registradas">
        Cores das marcas (dona do produto, 19/11 e 28/11/2026): cada ícone mantém a cor oficial da rede (--marca-linkedin #0A66C2, --marca-instagram #E1306C, --marca-whatsapp #25D366, --marca-facebook #1877F2, --marca-youtube #FF0000, --marca-tiktok preto, branco no escuro, --marca-behance #1769FF), só no ícone. Sombra: a pílula é um link, não um card, então a regra &quot;card sem sombra parada&quot; não vale para ela; fica a sombra suave (--shadow-suave). O hover é cinza (--accent), como todo estado do DS.
      </Callout>
      <DoDont
        dos={["Escreva o que o link abre (\"Perfil da loja\") ou o nome da rede.", "Deixe as pílulas num GrupoDeRedesSociais, centralizadas embaixo de um título curto.", "Use a cor oficial só no ícone; o texto fica em --foreground."]}
        donts={["Usar para uma ação da página (enviar, cadastrar): isso é o Button.", "Pintar o texto, o fundo ou a borda na cor da marca.", "Pôr a pílula em fundo escuro ou sobre foto: ela foi desenhada para fundo claro."]}
      />
    </section>
  );
}

export function SecaoPilulaDeDestaque() {
  return (
    <section id="site-pilulas-destaque" className="scroll-mt-32 space-y-6">
      <SectionHeader
        title="Pílulas de destaque"
        description="Destaques curtos que não são clicáveis (números, qualidades, públicos): fundo cinza bem claro, borda fina, texto em --foreground e um ícone Lucide no vermelho do texto da marca, de 18 px em todas. Uma lista, centralizada e quebrando em linhas."
      />
      <Panel className="p-5 sm:p-6">
        <SubTitle>Exemplo (textos do site do estúdio)</SubTitle>
        <div data-demo="pilulas-inicio" className="py-4">
          <GrupoDePilulasDeDestaque aria-label="Destaques">
            <PilulaDeDestaque icone={CircleCheck}>35 recomendações</PilulaDeDestaque>
            <PilulaDeDestaque icone={Handshake}>Excelência e compromisso</PilulaDeDestaque>
            <PilulaDeDestaque icone={Users}>Líderes, clientes &amp; pares</PilulaDeDestaque>
          </GrupoDePilulasDeDestaque>
        </div>
      </Panel>
      <DataTable
        head={["Prop ou classe", "O que faz"]}
        rows={[
          [<Mono>icone</Mono>, "Um ícone Lucide como componente (icone={Users}): 18 px, --primary-text, aria-hidden."],
          [<Mono>children</Mono>, "O texto do destaque: 12 px no celular, 14 px a partir de 768 px."],
          [<Mono>GrupoDePilulasDeDestaque</Mono>, "A lista (ul); cada pílula é um li. alinhamento=\"inicio\" alinha à esquerda."],
          [<Mono>.ds-grupo-pilulas-destaque · .ds-pilula-destaque · .ds-pilula-destaque__icone</Mono>, "O mesmo desenho nas páginas de HTML puro (theme.css, bloco \"@ds-css-puro\"); HTML pronto em htmlDaPilulaDeDestaque."],
        ]}
      />
      <Codigo>{`import { CircleCheck, Handshake, Users } from "lucide-react";

<GrupoDePilulasDeDestaque aria-label="Destaques">
  <PilulaDeDestaque icone={CircleCheck}>35 recomendações</PilulaDeDestaque>
  <PilulaDeDestaque icone={Handshake}>Excelência e compromisso</PilulaDeDestaque>
  <PilulaDeDestaque icone={Users}>Líderes, clientes & pares</PilulaDeDestaque>
</GrupoDePilulasDeDestaque>`}</Codigo>
      <DoDont
        dos={["De dois a quatro destaques curtos, cada um com o seu ícone Lucide.", "Só números e fatos reais."]}
        donts={["Transformar em link ou botão: ela não tem hover nem clique.", "Usar para um estado (pendente, ativo): isso é o ChipDeEstado.", "Usar emoji ou o caractere de estrela como ícone."]}
      />
    </section>
  );
}

const AVATAR = `${import.meta.env.BASE_URL}avatares/avatar-2.svg`;

export function SecaoCardDeDepoimento() {
  return (
    <section id="site-depoimentos" className="scroll-mt-32 space-y-6">
      <SectionHeader
        title="Card de depoimento"
        description="O feedback de quem usou a plataforma: aspas, o depoimento primeiro, um divisor e a pessoa embaixo, com o selo do perfil (Cliente ou Loja parceira), a loja e, se houver, a nota que a pessoa deu. Mesmo componente e mesma API do DS Dani Moscatelli (lá, depoimentos de clientes e pares). Os exemplos abaixo são fictícios."
      />
      <div data-demo="depoimentos-fl">
        <GradeDeCards className="gap-4 md:grid-cols-2">
          <ItemDaGrade>
            <CardDeDepoimento nome="Pessoa de exemplo" cargo="Cliente em Curitiba" foto={AVATAR} perfil="consumidor" nota={5}>
              “Depoimento de exemplo: no produto, este texto vem do feedback real de quem usou a plataforma, com autorização. <strong>O trecho principal fica em destaque.</strong>”
            </CardDeDepoimento>
          </ItemDaGrade>
          <ItemDaGrade>
            <CardDeDepoimento nome="Lojista de exemplo" cargo="Proprietária" loja="Loja de exemplo" perfil="lojista" nota={4}>
              “Depoimento de exemplo de uma loja parceira: como a plataforma ajudou a loja a ser encontrada. <strong>Só com autorização de quem escreveu.</strong>”
            </CardDeDepoimento>
          </ItemDaGrade>
        </GradeDeCards>
      </div>
      <DataTable
        head={["Prop", "O que faz"]}
        rows={[
          [<Mono>nome · cargo · foto</Mono>, "Quem escreveu. Sem foto, aparecem as iniciais na base rosa clara."],
          [<Mono>perfil</Mono>, "\"consumidor\" (selo Cliente) ou \"lojista\" (selo Loja parceira), no ChipDeEstado neutro, embaixo do nome."],
          [<Mono>loja</Mono>, "O nome da loja, na linha do cargo (\"Proprietária · Loja de exemplo\")."],
          [<Mono>nota</Mono>, "A nota de 1 a 5 que a pessoa deu, na Avaliacao do DS (estrela e número), no alto à direita. Sem nota, nada aparece."],
          [<Mono>origem</Mono>, "De onde veio o depoimento (opcional; usado no DS Dani Moscatelli: \"Recomendação no LinkedIn\")."],
          [<Mono>.ds-card-depoimento e partes</Mono>, "O mesmo desenho em HTML puro (theme.css, bloco \"@ds-css-puro\"): __texto, __topo, __aspas, __pessoa, __foto, __iniciais, __quem, __nome, __cargo, __origem, __perfil."],
        ]}
      />
      <Codigo>{`<CardDeDepoimento nome="…" cargo="Proprietária" loja="…" perfil="lojista" nota={5}>
  “Texto do feedback com <strong>o trecho principal</strong>.”
</CardDeDepoimento>`}</Codigo>
      <DoDont
        dos={["Só feedback real, com autorização de quem escreveu.", "Nota só a que a pessoa deu de fato; sem nota, deixe sem.", "Nos exemplos e protótipos, deixe claro que é fictício (\"Pessoa de exemplo\", \"Loja de exemplo\")."]}
        donts={["Inventar depoimentos, nomes, lojas ou números.", "Pôr sombra parada no card: só borda.", "Usar o selo do perfil para outra coisa que não seja quem escreveu."]}
      />
    </section>
  );
}

export function SecaoBotaoWhatsApp() {
  return (
    <section id="site-botao-whatsapp" className="scroll-mt-32 space-y-6">
      <SectionHeader
        title="Botão do WhatsApp"
        description="O botão flutuante do WhatsApp: um círculo de 56 px no verde oficial do WhatsApp com o ícone branco, no canto inferior direito, que abre a conversa em nova aba com uma mensagem pronta. Mesmo componente e mesma API do DS Dani Moscatelli; aqui, sem número padrão: cada tela passa o número."
      />
      <Panel className="p-5 sm:p-6">
        <SubTitle>Dentro de uma caixa (fixo=&#123;false&#125;), como numa página</SubTitle>
        <div data-demo="botao-whatsapp" className="relative mx-auto h-56 max-w-[390px] overflow-hidden rounded-lg border border-border bg-muted">
          <div aria-hidden className="space-y-3 p-4">
            <div className="h-4 w-2/3 rounded-full bg-graphite-200" />
            <div className="h-3 w-1/2 rounded-full bg-graphite-100" />
            <div className="h-20 rounded-md border border-border bg-card" />
          </div>
          <BotaoWhatsApp fixo={false} mensagem="Olá! Vim pela FindLook." rotulo="Conversar com a loja no WhatsApp (exemplo)" />
        </div>
      </Panel>
      <DataTable
        head={["Prop ou classe", "O que faz"]}
        rows={[
          [<Mono>numero · mensagem</Mono>, "Número com DDI e DDD (só dígitos) e a mensagem pronta. No FindLook não há padrão: passe sempre o número."],
          [<Mono>rotulo · titulo</Mono>, "O nome lido pelos leitores de tela (com \" (abre em nova aba)\" no fim) e a dica do mouse."],
          [<Mono>fixo</Mono>, "true (padrão): fixo na página, 20 px da borda (24 px a partir de 640 px) mais a área segura do aparelho, camada 45 (acima das faixas fixas, 43, e dos outros flutuantes, 44). false: dentro de uma caixa."],
          [<Mono>.ds-botao-whatsapp (--na-caixa) · __icone · .ds-espaco-botao-whatsapp</Mono>, "O mesmo desenho em HTML puro (theme.css, bloco \"@ds-css-puro\"); HTML pronto em htmlDoBotaoWhatsApp. A classe do rodapé deixa 96 px embaixo do conteúdo, para o botão nunca cobrir o fim da página."],
        ]}
      />
      <Codigo>{`<BotaoWhatsApp numero="55…" mensagem="Olá! Vim pela FindLook." rotulo="Conversar com a loja no WhatsApp" />
<footer className="ds-espaco-botao-whatsapp">…</footer>

${htmlDoBotaoWhatsApp({ numero: "55…", rotulo: "Conversar no WhatsApp" }).replace(/<path d="[^"]+"/, '<path d="…"')}`}</Codigo>
      <Callout title="Acessibilidade e exceção">
        Alvo de 56 × 56 px (acima de 44 px), nome em rotulo, anel de foco, cresce 5% no hover e fica parado com &quot;menos movimento&quot;. Na barra fixa do celular, o botão fica acima dela (camada 45). O verde do WhatsApp com o ícone branco é exceção da dona do produto (19/11/2026): o ícone sobre o verde tem 2:1, abaixo dos 3:1 dos elementos gráficos; o nome do botão é o que os leitores de tela leem.
      </Callout>
      <DoDont
        dos={["Um botão por página, sempre no mesmo canto.", "Dar ao último bloco da página (o rodapé) a classe .ds-espaco-botao-whatsapp.", "Escrever em rotulo com quem a pessoa vai conversar."]}
        donts={["Trocar o verde ou pôr texto no botão.", "Pôr outro flutuante no mesmo canto fora das camadas do DS.", "Inventar um número: sem número real, não mostre o botão."]}
      />
    </section>
  );
}
