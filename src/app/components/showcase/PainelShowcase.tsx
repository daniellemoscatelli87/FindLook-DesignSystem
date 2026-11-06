import React, { useState } from "react";
import { Home, Shirt, ShoppingBag, Search, Store, Settings, Eye, Heart, ScanSearch, MessageCircle, Plus, FileSpreadsheet, ImagePlus, CalendarCheck, Upload, Camera, TrendingUp, Ruler, MapPin, Zap, Sparkles } from "lucide-react";
import { PageHeader, PageSection } from "./GetStartedShowcase";
import { SeletorDeLoja, ItemDoMenu, GrupoDoMenu, CardDePlano, CardDeAjuda, CampoDeBuscaGlobal, BotaoDeNotificacoes, GatilhoDaConta } from "../ui/painel-shell";
import { CabecalhoDaPagina, SeletorDePeriodo, BotaoDividido, BannerPromocional } from "../ui/painel-cabecalho";
import { CardIndicador, GraficoDeDesempenho, ItemDeAtividade, ItemDeAcao, ListaDeTendencias, ItemDeChecklist, AnelDePontuacao, CarrosselDeDicas, FaixaDeBeneficios, formatarNumero, formatarPreco, formatarVariacao } from "../ui/painel-dados";
import { AbasComContador, CelulaDeProduto, MedidorDeDesempenho, StatusDePublicacao, TabelaDeProdutos } from "../ui/painel-produtos";
import { IconeModa } from "../ui/fashion-icons";
import { produtosExemplo, dadosDesempenho, contagensExemplo } from "./PainelTemplates";

/**
 * Painel da loja: documentação dos componentes do painel administrativo do FindLook.
 * Cada bloco mostra o componente funcionando, onde ele é usado e as regras de uso.
 */

function Palco({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`@container rounded-[var(--radius)] border border-border bg-background p-4 sm:p-6 ${className}`}>{children}</div>;
}

function Regras({ itens }: { itens: string[] }) {
  return (
    <ul className="mt-4 grid gap-2 text-[0.875rem] leading-relaxed text-muted-foreground sm:grid-cols-2">
      {itens.map(r => <li key={r} className="rounded-[12px] border border-border bg-card px-4 py-3">{r}</li>)}
    </ul>
  );
}

function Codigo({ children }: { children: string }) {
  return <pre className="mt-4 overflow-x-auto rounded-[12px] border border-border bg-muted/50 p-4 text-[0.75rem] leading-relaxed text-foreground"><code>{children}</code></pre>;
}

export function PainelShowcase() {
  const [periodo, setPeriodo] = useState("30");
  const [aba, setAba] = useState("todos");
  const [banner, setBanner] = useState(true);

  return (
    <div className="min-w-0 space-y-14">
      <PageHeader
        eyebrow="Componentes"
        title="Painel da **loja**"
        description="Peças do painel administrativo das lojas parceiras: estrutura com menu e barra superior, cabeçalho da página, indicadores, gráfico, listas, tabela de produtos e blocos de engajamento. Juntas, formam os templates Início do painel e Produtos."
      />

      {/* 1 — Estrutura */}
      <PageSection id="painel-estrutura" label="Estrutura" title="Menu lateral e barra superior" intro={<p>O menu fica fixo à esquerda em telas largas e vira uma gaveta (botão de menu) em telas estreitas. A barra superior traz a busca global, as notificações e a conta.</p>}>
        <Palco>
          <div className="grid grid-cols-1 gap-6 @3xl:grid-cols-[16rem_minmax(0,1fr)]">
            <div className="space-y-4 rounded-[14px] border border-border bg-card p-4">
              <SeletorDeLoja loja="Ateliê Aurora" />
              <nav aria-label="Exemplo de menu">
                <GrupoDoMenu>
                  <ItemDoMenu href="#" icone={<Home />} ativo onClick={e => e.preventDefault()}>Início</ItemDoMenu>
                  <ItemDoMenu href="#" icone={<Shirt />} onClick={e => e.preventDefault()}>Produtos</ItemDoMenu>
                  <ItemDoMenu href="#" icone={<ShoppingBag />} contador={3} onClick={e => e.preventDefault()}>Pedidos e reservas</ItemDoMenu>
                  <ItemDoMenu href="#" icone={<Search />} onClick={e => e.preventDefault()}>Buscas e interesse</ItemDoMenu>
                </GrupoDoMenu>
                <GrupoDoMenu titulo="Minha loja" className="mt-2 border-t border-border pt-1">
                  <ItemDoMenu href="#" icone={<Store />} onClick={e => e.preventDefault()}>Perfil da loja</ItemDoMenu>
                  <ItemDoMenu href="#" icone={<Settings />} onClick={e => e.preventDefault()}>Configurações</ItemDoMenu>
                </GrupoDoMenu>
              </nav>
              <CardDePlano plano="Plano Desempenho" preco="R$ 149" descricao="Análise de interesse, desempenho e recomendações." />
              <CardDeAjuda texto="Central de ajuda da FindLook" />
            </div>
            <div className="flex flex-wrap items-center gap-3 self-start rounded-[14px] border border-border bg-card p-3">
              <CampoDeBuscaGlobal className="max-w-md flex-1" />
              <BotaoDeNotificacoes naoLidas={4} />
              <GatilhoDaConta nome="Ana Oliveira" papel="Proprietária" />
            </div>
          </div>
        </Palco>
        <Regras itens={[
          "Item ativo: fundo no tom claro da primária, texto na primária e aria-current=\"page\".",
          "Contador só aparece quando há novidade; o leitor de tela ouve “3 novos”, não só o número.",
          "O seletor de loja mostra “Loja verificada” com ícone e texto, nunca só o ícone.",
          "O card de plano mostra o plano atual da loja (Visibilidade, Desempenho ou Oportunidades), igual ao template de preços.",
          "A busca global abre a busca do painel e aceita Ctrl + K.",
          "O ponto do sino é decorativo; o rótulo do botão diz quantas notificações não foram lidas.",
        ]} />
        <Codigo>{`<ItemDoMenu href="/pedidos" icone={<ShoppingBag />} contador={3}>Pedidos e reservas</ItemDoMenu>
<CardDePlano plano="Plano Desempenho" preco="R$ 149" />
<BotaoDeNotificacoes naoLidas={4} />`}</Codigo>
      </PageSection>

      {/* 2 — Cabeçalho */}
      <PageSection id="painel-cabecalho" label="Cabeçalho" title="Cabeçalho da página" intro={<p>Saudação, título com a palavra da marca em destaque, descrição e ações. Use o seletor de período quando a página mostra números; use o botão dividido quando a ação principal tem variações.</p>}>
        <Palco className="space-y-4">
          <CabecalhoDaPagina
            saudacao="Olá, Ana! 👋"
            titulo="Sua loja em destaque na **FindLook**"
            descricao="Acompanhe o desempenho, gerencie seus produtos e veja como suas peças estão sendo descobertas por pessoas da sua região."
            acoes={<>
              <SeletorDePeriodo valor={periodo} onChange={setPeriodo} />
              <BotaoDividido rotulo="Cadastrar produto" icone={<Plus />} acoes={[{ rotulo: "Cadastrar produto", icone: <Plus /> }, { rotulo: "Importar planilha", icone: <FileSpreadsheet /> }, { rotulo: "Cadastrar com fotos", icone: <ImagePlus /> }]} />
            </>}
          />
          {banner ? (
            <BannerPromocional titulo="Destaque sua coleção" texto="Deixe sua vitrine ainda mais atrativa com fotos de alta qualidade." acao="Ver dicas de foto" imagem={<IconeModa nome="cabide" size={44} />} onFechar={() => setBanner(false)} />
          ) : (
            <button type="button" onClick={() => setBanner(true)} className="text-[0.8125rem] font-semibold text-[var(--primary-text,var(--primary))] underline underline-offset-2">Mostrar o banner de novo</button>
          )}
        </Palco>
        <Regras itens={[
          "Só um botão primário por página: “Cadastrar produto”. As demais ações são de contorno.",
          "O botão dividido tem duas áreas com rótulos próprios: a ação e “Mais opções”.",
          "Link que abre outra aba (“Ver minha loja”) leva o ícone de link externo e avisa o leitor de tela.",
          "O banner é fechável e não volta na mesma visita. Não use para avisos de erro: para isso existe o Alert.",
        ]} />
      </PageSection>

      {/* 3 — Indicadores */}
      <PageSection id="painel-indicadores" label="Dados" title="Indicadores" intro={<p>Número grande no formato brasileiro, rótulo e variação com seta. A explicação no “i” abre ao toque, ao clique e pelo teclado.</p>}>
        <Palco className="space-y-4">
          <div className="grid grid-cols-1 gap-3 @lg:grid-cols-2 @4xl:grid-cols-4">
            <CardIndicador icone={<Eye />} valor={1284} rotulo="Visualizações" variacao={18.6} comparacao="vs. 30 dias" />
            <CardIndicador icone={<Heart />} valor={24} rotulo="Favoritos" variacao={33.3} comparacao="vs. 30 dias" />
            <CardIndicador icone={<ScanSearch />} valor={8} rotulo="Buscas compatíveis" explicacao="Buscas feitas por pessoas da sua região que combinam com peças da sua loja." />
            <CardIndicador icone={<MessageCircle />} valor={6} rotulo="Contatos e reservas" variacao={-12} comparacao="vs. 30 dias" />
          </div>
          <p className="text-[0.75rem] font-semibold text-muted-foreground">Variação em pílula</p>
          <div className="grid grid-cols-2 gap-3 @4xl:grid-cols-4">
            <CardIndicador estilo="pilula" icone={<Shirt />} valor={128} rotulo="Produtos publicados" variacao={12} />
            <CardIndicador estilo="pilula" icone={<Eye />} valor={1284} rotulo="Visualizações" variacao={18} />
          </div>
        </Palco>
        <Regras itens={[
          `Formato pt-BR: ${formatarNumero(1284)}, ${formatarVariacao(18.6)}, ${formatarPreco(249.9)}.`,
          "A direção da variação vem da seta e do sinal, não só da cor. O leitor de tela ouve “Alta de 18,6%”.",
          "O número da variação fica em cor de texto; o verde e o vermelho ficam na seta, para manter o contraste.",
          "Até 5 indicadores por linha; em telas estreitas eles empilham.",
        ]} />
      </PageSection>

      {/* 4 — Gráfico */}
      <PageSection id="painel-grafico" label="Dados" title="Gráfico de desempenho" intro={<p>Área com degradê, legenda que liga e desliga cada série e destaque do valor mais recente. As cores seguem a paleta de gráficos do DS: rosa para a série principal e grafites para as outras.</p>}>
        <Palco>
          <GraficoDeDesempenho dados={dadosDesempenho} chaveX="dia" series={[{ chave: "visualizacoes", rotulo: "Visualizações", cor: "var(--chart-1)" }, { chave: "favoritos", rotulo: "Favoritos", cor: "var(--chart-2)" }, { chave: "contatos", rotulo: "Contatos", cor: "var(--chart-3)" }]} />
        </Palco>
        <Regras itens={[
          "Pelo menos uma série fica sempre ligada.",
          "A legenda são caixas de seleção de verdade: funcionam com Tab e espaço.",
          "O gráfico tem um resumo em texto para o leitor de tela (último dia e valores).",
          "Séries com escalas muito diferentes (visualizações × contatos) ficam melhores uma de cada vez.",
        ]} />
      </PageSection>

      {/* 5 — Listas */}
      <PageSection id="painel-listas" label="Listas" title="Atividade, insights, tendências e checklist" intro={<p>Listas curtas que levam a uma ação. Cada item tem um só destino.</p>}>
        <Palco>
          <div className="grid gap-6 @4xl:grid-cols-2">
            <div>
              <p className="mb-2 text-[0.75rem] font-semibold text-muted-foreground">Item de atividade</p>
              <ul className="divide-y divide-border rounded-[12px] border border-border bg-card px-3">
                <ItemDeAtividade icone={<Heart />} titulo="Nova peça favoritada" detalhe="Vestido midi · R$ 249,90" quando="há 26 min" />
                <ItemDeAtividade icone={<CalendarCheck />} titulo="Reserva solicitada" detalhe="Vestido midi · Tam. P" quando="há 1 h" />
                <ItemDeAtividade icone={<Upload />} titulo="Planilha importada" detalhe="12 peças atualizadas" quando="há 2 h" />
              </ul>
            </div>
            <div>
              <p className="mb-2 text-[0.75rem] font-semibold text-muted-foreground">Item de ação (insight e próxima ação)</p>
              <div className="space-y-2">
                <ItemDeAcao midia={<IconeModa nome="vestido" size={24} />} titulo="Vestidos midi estão em alta" descricao="+62% de buscas na sua região." />
                <ItemDeAcao midia={<Camera />} titulo="Melhore 3 fotos" descricao="Aumente a chance de ser encontrada." />
                <ItemDeAcao midia={<TrendingUp />} titulo="Oportunidade de estoque" descricao="Considere ampliar peças no tamanho M." />
              </div>
            </div>
            <div>
              <p className="mb-2 text-[0.75rem] font-semibold text-muted-foreground">Lista de tendências</p>
              <ListaDeTendencias itens={[{ termo: "Vestido midi", variacao: 62 }, { termo: "Calça wide leg", variacao: 48 }, { termo: "Blazer feminino", variacao: 37 }]} />
            </div>
            <div>
              <p className="mb-2 text-[0.75rem] font-semibold text-muted-foreground">Anel de pontuação e checklist</p>
              <div className="flex flex-col items-center gap-4 rounded-[12px] border border-border bg-card p-4 @lg:flex-row">
                <AnelDePontuacao valor={85} />
                <ul className="w-full flex-1 space-y-1">
                  <ItemDeChecklist estado="ok" texto="Fotos com boa qualidade" />
                  <ItemDeChecklist estado="atencao" texto="3 produtos sem variação de tamanho" />
                </ul>
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-4">
                <AnelDePontuacao valor={62} tamanho={88} />
                <AnelDePontuacao valor={34} tamanho={88} />
              </div>
            </div>
          </div>
        </Palco>
        <Regras itens={[
          "Tempo relativo curto: “há 12 min”, “há 1 h”, “ontem”.",
          "Checklist: check verde para o que está em dia, alerta amarelo para o que precisa de atenção, sempre com texto.",
          "Anel: 80% ou mais é “Bom” (verde), de 50% a 79% “Regular” (amarelo), abaixo de 50% “Precisa melhorar” (vermelho).",
          "Insight não é conclusão: diga o que os dados mostram (“+62% de buscas”) e sugira, sem prometer resultado.",
        ]} />
      </PageSection>

      {/* 6 — Produtos */}
      <PageSection id="painel-produtos" label="Produtos" title="Tabela de produtos" intro={<p>Abas com a quantidade por status, busca, filtros, seleção com ações em lote, ações por linha e rodapé. Em telas estreitas, cada linha vira um card.</p>}>
        <Palco className="space-y-5">
          <div className="flex flex-wrap gap-4">
            <AbasComContador valor={aba} onChange={setAba} abas={[{ valor: "todos", rotulo: "Todos", quantidade: 137 }, { valor: "publicado", rotulo: "Publicados", quantidade: 128 }, { valor: "pendente", rotulo: "Pendentes", quantidade: 6 }]} />
            <AbasComContador estilo="sublinhado" valor={aba} onChange={setAba} abas={[{ valor: "todos", rotulo: "Todos", quantidade: 137 }, { valor: "publicado", rotulo: "Publicados", quantidade: 128 }, { valor: "pendente", rotulo: "Pendentes", quantidade: 6 }]} />
          </div>
          <div className="grid gap-4 @3xl:grid-cols-3">
            <CelulaDeProduto nome="Vestido midi" detalhes="SKU VE014 · Tam. P · Linho" icone="vestido" />
            <MedidorDeDesempenho nivel={4} visualizacoes={287} favoritos={8} />
            <div className="flex flex-wrap gap-3">
              <StatusDePublicacao status="publicado" />
              <StatusDePublicacao status="pendente" motivo="Foto em baixa qualidade" />
              <StatusDePublicacao status="esgotado" />
              <StatusDePublicacao status="reservado" />
              <StatusDePublicacao status="rascunho" />
            </div>
          </div>
          <TabelaDeProdutos produtos={produtosExemplo} total={137} contagens={contagensExemplo} limite={5} />
        </Palco>
        <Regras itens={[
          "Status sempre com ícone e texto. “Pendente” mostra o motivo logo abaixo.",
          "O medidor em barrinhas é um apoio visual: o número de visualizações aparece sempre em texto.",
          "A barra de ações em lote só aparece com itens selecionados e diz quantos são.",
          "O menu ⋯ de cada linha tem nome próprio (“Ações de Vestido midi”). “Excluir” fica por último, separado e em vermelho.",
          "Abas: setas do teclado trocam de aba; a quantidade fica entre parênteses.",
          "Sem resultado na busca: diga o que aconteceu e como sair (“Tente outra palavra ou limpe os filtros”).",
        ]} />
      </PageSection>

      {/* 7 — Engajamento */}
      <PageSection id="painel-engajamento" label="Engajamento" title="Dicas e faixa de benefícios" intro={<p>Blocos que ajudam a loja a vender mais. Ficam abaixo dos dados e podem ser fechados.</p>}>
        <Palco className="space-y-5">
          <CarrosselDeDicas dicas={[
            { titulo: "Melhore suas fotos", texto: "Fotos bem iluminadas e com fundo neutro valorizam a peça e chamam mais atenção na vitrine.", acao: "Ver dicas", midia: <IconeModa nome="cabide" size={40} /> },
            { titulo: "Informe todos os tamanhos", texto: "Peças com tamanhos cadastrados aparecem em mais buscas da sua região.", acao: "Revisar tamanhos", midia: <Ruler className="h-9 w-9" /> },
          ]} />
          <FaixaDeBeneficios icone={<Sparkles />} titulo="Mais visibilidade, mais oportunidades." texto="Suas peças são mostradas para pessoas que procuram exatamente o seu estilo." beneficios={[{ icone: <Search />, rotulo: "Descoberta de peças" }, { icone: <MapPin />, rotulo: "Clientes da sua região" }, { icone: <Zap />, rotulo: "Gestão simples" }, { icone: <TrendingUp />, rotulo: "Mais oportunidades de venda" }]} />
        </Palco>
        <Regras itens={[
          "O carrossel não passa sozinho: a pessoa avança com os botões e ouve “2 de 3”.",
          "Dica não promete resultado: só cite números (como “+40% de visualizações”) quando houver fonte.",
        ]} />
      </PageSection>
    </div>
  );
}
