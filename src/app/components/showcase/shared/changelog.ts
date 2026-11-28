import type { Bi } from "../../../i18n";

export type ChangeKind = "New" | "Updated" | "Removed";

export type ChangeEntry = {
  date: string;
  kind: ChangeKind;
  title: Bi;
  desc: Bi;
  page?: string;
  anchor?: string;
};

// Mais recente primeiro. O design system é só em português: `en` repete o texto em português.
// Toda inclusão, mudança ou remoção entra no TOPO desta lista.
const pt = (text: string): Bi => ({ en: text, pt: text });

export const changelog: ChangeEntry[] = [
  {
    date: "Nov 2026", kind: "New", title: pt("Navegação de landing page"),
    desc: pt("Página nova (28/11/2026, aprovada pela dona do produto; mesma API nos dois DS) com as peças que conduzem a leitura de uma página longa. HeroComAba e AbaSaibaMais: o hero do site do estúdio Dani Moscatelli trazido como está, um painel arredondado (16 px de respiro, cantos de 32 px) com uma aba branca de 320 × 56 recortada no centro da base (cantos de cima de 40 px, texto de 16 px, cápsula da seta de 20 × 32); no celular, a seção seguinte começa com cantos de 28 px e a aba de 132 × 28, com área de toque de 44 px; o toque leva à seção seguinte com rolagem suave (instantânea com menos movimento) e põe o foco lá. CurvaSecao (nova aqui, mesma API do DS Dani Moscatelli), Parallax (só transform, parado com menos movimento e nas telas de toque), MenuDeAncoras (a seção em leitura no rosa de selecionado, com aria-current; chips que quebram de linha, lista vertical no computador ou lista de seleção no celular; gruda abaixo do cabeçalho do site), ProgressoDeLeitura (barra de 4 px na cor da marca, aria-hidden, sem transição) e SecaoFixa (coluna parada no computador, empilhada no celular). SurgirAoRolar e VoltarAoTopo ficam na mesma página. Cada peça tem classes de CSS puro (.ds-hero-com-aba, .ds-aba-saiba-mais, .ds-curva-secao, .ds-parallax, .ds-menu-de-ancoras, .ds-progresso-de-leitura, .ds-secao-fixa) num bloco próprio do theme.css, usadas também pelos componentes."),
    page: "navegacao-landing",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Contorno e secundário viram um botão só"),
    desc: pt("Decisão da dona do produto (28/11/2026), nos dois DS: \"Acho que o botão contorno e o secundário podem virar um único botão.\" O Button tem um botão secundário só, o Secundário (contorno): use variant=\"secondary\"; variant=\"outline\" continua funcionando como apelido do mesmo desenho (borda --input, fundo transparente, hover cinza), para nada quebrar nos produtos. Hierarquia: principal preenchido em pink para a única ação principal; secundário de contorno para as outras; ghost para ações terciárias; link para navegação de baixa ênfase; o contorno pink fica para uma ação secundária que pede destaque da marca. A página Botões mostra o secundário uma vez só (sem \"Contorno\" e \"Secundário\" separados), e a tabela de hierarquia de ações (Usabilidade) e o catálogo foram atualizados."),
    page: "buttons",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Desabilitado mais claro; carregando mantém a cor"),
    desc: pt("Decisão da dona do produto (28/11/2026), nos dois DS: \"Botão desabilitado: o fundo do cinza quero um pouco mais claro. E o botão loading é colorido, porém levemente esmaecido.\" Desabilitado = indisponível: --disabled no tema claro passa a ficar a meio caminho entre o --graphite-100 e o --graphite-50 (color-mix 50%, ≈ #F0F0F2; antes #E9E9EC); ainda tem forma no branco (1,14:1); texto apagado sobre ele: 3,9:1 (antes 3,6:1). Vale para todo quem usa o token: botões, BotaoDoAlerta, ChipFiltravel, o envio da Conversa, CartaoDeEscolha, EscalaDeNotas e EscolhaOrdenada. Carregando = trabalhando: Button ganha carregando e textoCarregando (mesma API nos dois DS): o giro do DS antes do rótulo (ou do textoCarregando), a cor da própria variante a 80% de opacidade (texto branco sobre o principal 4,0:1; contorno 10:1), aria-busy, aria-disabled e pointer-events-none (nunca o cinza de desabilitado), clique do teclado bloqueado e largura fixa (as duas camadas ficam empilhadas; passe carregando={false} num botão que pode carregar). Com \"menos movimento\", o giro para e o texto continua dizendo que está carregando (leitor de tela: textoCarregando ou \"Carregando\"). BotaoDeEnvio (\"enviando\"), BarraDaEtapa (CadastroLojista), o botão de enviar do CampoDeMensagem (Conversa) e o BotaoDoAlerta com aria-busy passam a usar esse estado; a demonstração de status do sistema em Usabilidade agora usa o BotaoDeEnvio. Nova subseção \"Desabilitado e carregando\" na página Botões, e os botões só de ícone da página ganharam nome para leitores de tela."),
    page: "buttons",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Caixa de consentimento e caixa de marcar quadrada"),
    desc: pt("CaixaDeConsentimento (28/11/2026, aprovada pela dona do produto; mesma API nos dois DS): um sim de consentimento num card que se marca inteiro (caixa nativa dentro de um label): caixa quadrada de 22 px com cantos de 6 px, título de 16 px seminegrito, texto de 14 px em cinza escuro (grafite 600, 7,8:1) com links em --primary-text; marcado = fundo --primary-suave e borda --primary; anel de foco, erro (borda --error e MensagemDeErro) e desativado. paragrafos põe cada frase numa linha nova. A Checkbox fica claramente quadrada: cantos de 6 px (novo --radius-xs) no lugar de 8 px, que deixavam a caixa de 20 px com cara de redonda, como um rádio."),
    page: "campos", anchor: "caixa-de-consentimento",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Pílula como forma padrão do botão"),
    desc: pt("Decisão da dona do produto (28/11/2026), nos dois DS: \"Pílula como padrão em ambos os projetos\". O Button é pílula (rounded-full) em qualquer variante e tamanho, com 4 px a mais de cada lado; o botão só de ícone é um círculo. forma=\"quadrado\" (cantos de 12 px) fica para casos raros (botão colado a um campo ou numa barra de ferramentas de cantos retos); forma=\"padrao\" é o nome antigo e continua valendo. A mesma regra nos componentes que desenham botões: janelas, calendário (dias e setas), paginação, BotaoDoAlerta e LinkDoAlerta, SegmentedControl (trilho em pílula), os botões de fechar das janelas e gavetas, o olho da senha e o botão de ajuda do painel. Campos, cards e chips mantêm a forma."),
    page: "buttons",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Página 404 padrão e espaço abaixo do cabeçalho"),
    desc: pt("Decisões da dona do produto (28/11/2026). Regra: link quebrado ou incompleto (um link de e-mail sem o código, por exemplo) = página 404 padrão; nunca formulário com botão desativado e aviso, nunca uma página \"link incompleto\". Novo token --espaco-abaixo-do-cabecalho (32 px no celular e no tablet, 64 px a partir de 1024 px, o ponto do desktop do grid) e a classe .ds-abaixo-do-cabecalho, iguais nos dois DS: toda página cujo conteúdo começa logo abaixo do cabeçalho do site usa. PaginaDeErro ganha abaixoDoCabecalho e elemento (\"div\" nas demonstrações) (e, como no DS Dani Moscatelli, moldura=\"card\" e selo); a 404 do FindLook continua com a ilustração da Nyx e Voltar ao início. Documentação: Moldura do site › Página de erro (404) e Grid e espaçamento › Espaço abaixo do cabeçalho, com exemplos ao vivo."),
    page: "site", anchor: "site-erro",
  },
  {
    date: "Nov 2026", kind: "New", title: { en: "Escolha ordenada e escala de notas", pt: "Escolha ordenada e escala de notas" },
    desc: { en: "Peças da pesquisa Moda em Curitiba, iguais nos dois DS (28/11/2026). EscolhaOrdenada: escolher até N opções na ordem dos toques (1º, 2º, 3º; tocar de novo tira e as de depois sobem; no máximo, as outras travam; a opção exclusiva fica sozinha); caixas de marcar nativas com a posição no nome e anúncio para leitores de tela. EscalaDeNotas e GrupoDeEscalas: nota de 1 a 10 (também 0 a 10 e NPS) em rádios nativos numerados, metade por linha no estreito e todos numa linha a partir de 34 rem, pontas escritas embaixo e erro por aspecto. Escolhido no rosa de selecionado com a borda primária; hover cinza.", pt: "Peças da pesquisa Moda em Curitiba, iguais nos dois DS (28/11/2026). EscolhaOrdenada: escolher até N opções na ordem dos toques (1º, 2º, 3º; tocar de novo tira e as de depois sobem; no máximo, as outras travam; a opção exclusiva fica sozinha); caixas de marcar nativas com a posição no nome e anúncio para leitores de tela. EscalaDeNotas e GrupoDeEscalas: nota de 1 a 10 (também 0 a 10 e NPS) em rádios nativos numerados, metade por linha no estreito e todos numa linha a partir de 34 rem, pontas escritas embaixo e erro por aspecto. Escolhido no rosa de selecionado com a borda primária; hover cinza." },
    page: "campos",
  },
  {
    date: "Nov 2026", kind: "New", title: { en: "Recorte de foto", pt: "Recorte de foto" },
    desc: { en: "RecorteDeFoto (28/11/2026), igual nos dois DS: escolher a foto na área de envio do DS, arrastar para enquadrar (dedo, mouse ou setas do teclado), zoom de 1 a 3 no controle deslizante, prévia redonda ou quadrada e “Usar esta foto” / “Cancelar”. O recorte é feito no aparelho, num canvas, e sai como arquivo de 600 × 600 px sem os dados escondidos da foto. Sem biblioteca nova.", pt: "RecorteDeFoto (28/11/2026), igual nos dois DS: escolher a foto na área de envio do DS, arrastar para enquadrar (dedo, mouse ou setas do teclado), zoom de 1 a 3 no controle deslizante, prévia redonda ou quadrada e “Usar esta foto” / “Cancelar”. O recorte é feito no aparelho, num canvas, e sai como arquivo de 600 × 600 px sem os dados escondidos da foto. Sem biblioteca nova." },
    page: "upload",
  },
  {
    date: "Nov 2026", kind: "New", title: { en: "Confete na conquista", pt: "Confete na conquista" },
    desc: { en: "Confete e dispararConfete (28/11/2026), iguais nos dois DS, com o desenho da tela final do cadastro da Rede de Parceiros: papeizinhos caindo por cerca de 3 s, nas cores dos tokens. Com “menos movimento”, nada aparece. EstadoFinal ganha comemorar.", pt: "Confete e dispararConfete (28/11/2026), iguais nos dois DS, com o desenho da tela final do cadastro da Rede de Parceiros: papeizinhos caindo por cerca de 3 s, nas cores dos tokens. Com “menos movimento”, nada aparece. EstadoFinal ganha comemorar." },
    page: "feedback",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Campos: contorno no escuro, desabilitado, erro, prefixo e asterisco", pt: "Campos: contorno no escuro, desabilitado, erro, prefixo e asterisco" },
    desc: { en: "Tokens (28/11/2026): o --input passa a ser só o contorno e nasce o --input-fundo, o preenchimento dos campos no escuro (antes o mesmo valor fazia as duas coisas, e a borda no escuro tinha 1,03:1). Contorno no escuro: grafite 500 (#696977): 3,41:1 no card, 3,38:1 no campo e 3,89:1 no fundo. Interruptor desligado no escuro no mesmo grafite. Desabilitado: o contorno volta ao cinza sutil (--border-strong), porque o contraste mínimo não vale para o que não se usa. Erro: a borda do campo usa o --error (o mesmo rosa da mensagem), pink 500: 3,98:1 no branco e 3,68:1 no cinza. Input ganha prefixo e sufixo (https://, R$, kg), fora do valor salvo; Input, Textarea, Badge e Card repassam a ref (forwardRef); Label ganha obrigatorio (o asterisco colado ao fim do rótulo).", pt: "Tokens (28/11/2026): o --input passa a ser só o contorno e nasce o --input-fundo, o preenchimento dos campos no escuro (antes o mesmo valor fazia as duas coisas, e a borda no escuro tinha 1,03:1). Contorno no escuro: grafite 500 (#696977): 3,41:1 no card, 3,38:1 no campo e 3,89:1 no fundo. Interruptor desligado no escuro no mesmo grafite. Desabilitado: o contorno volta ao cinza sutil (--border-strong), porque o contraste mínimo não vale para o que não se usa. Erro: a borda do campo usa o --error (o mesmo rosa da mensagem), pink 500: 3,98:1 no branco e 3,68:1 no cinza. Input ganha prefixo e sufixo (https://, R$, kg), fora do valor salvo; Input, Textarea, Badge e Card repassam a ref (forwardRef); Label ganha obrigatorio (o asterisco colado ao fim do rótulo)." },
    page: "campos",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Botão no celular, avatares, cabeçalho, quadro, cartões de escolha e gráficos", pt: "Botão no celular, avatares, cabeçalho, quadro, cartões de escolha e gráficos" },
    desc: { en: "Button: no celular, um texto longo quebra em linhas, centralizado, e o botão cresce (quebra=“celular”, padrão; “nunca” e “sempre”). AvatarCircles: modo decorativo (sem links). CabecalhoDoSite: as pílulas são o Button forma=“pilula”; no menu do celular, o foco entra na folha, fica preso nela e volta ao botão Menu. Quadro: cartões com position relative (link esticado fica no cartão). GrupoDeCartoesDeEscolha: sem consulta de contêiner (no Chromium do celular, dentro de um fieldset, o grupo sumia depois de um envio com erro). CardIndicador: formato=“percentual” e formatar. BarrasOrdenadas: destaque por rótulo, para escalas em ordem natural. Funil: lista de verdade (sem role=“img”).", pt: "Button: no celular, um texto longo quebra em linhas, centralizado, e o botão cresce (quebra=“celular”, padrão; “nunca” e “sempre”). AvatarCircles: modo decorativo (sem links). CabecalhoDoSite: as pílulas são o Button forma=“pilula”; no menu do celular, o foco entra na folha, fica preso nela e volta ao botão Menu. Quadro: cartões com position relative (link esticado fica no cartão). GrupoDeCartoesDeEscolha: sem consulta de contêiner (no Chromium do celular, dentro de um fieldset, o grupo sumia depois de um envio com erro). CardIndicador: formato=“percentual” e formatar. BarrasOrdenadas: destaque por rótulo, para escalas em ordem natural. Funil: lista de verdade (sem role=“img”)." },
    page: "buttons",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Demonstrações com os componentes do DS", pt: "Demonstrações com os componentes do DS" },
    desc: { en: "Os campos de Botões › Controles de formulário usam o Campo (antes, uma cópia à mão, com a borda de erro a 60%: 2,76:1); o Skeleton de verdade no carregamento; os seletores das páginas de Fundos e Cards viram SegmentedControl e Button (antes, botões feitos à mão com cores soltas).", pt: "Os campos de Botões › Controles de formulário usam o Campo (antes, uma cópia à mão, com a borda de erro a 60%: 2,76:1); o Skeleton de verdade no carregamento; os seletores das páginas de Fundos e Cards viram SegmentedControl e Button (antes, botões feitos à mão com cores soltas)." },
    page: "backgrounds",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Consistência entre os dois design systems"),
    desc: pt("Os componentes que o FindLook e o Dani Moscatelli têm em comum terminam com os mesmos nomes e as mesmas props (27/11/2026). Quadro aceita os dois jeitos (colunas com cartões prontos ou itens que mudam de etapa, com onMover); CabecalhoDoSite tem as mesmas props nos dois (acaoSecundaria, transparenteNoTopo, iconeAoRolar, telaLarga, comoLink, containerDoMenu e modelo), cada DS com o seu modelo de marca; TabelaAdaptavel mede a largura e mostra as colunas que cabem por qualquer número de prioridade (nova prop moldura); EstadoVazio (ilustracao, moldura), Conversa (rolagem, citacao, imagem, texto e icone no IndicadorDeDigitacao), Logo (href, comoLink), Prosa (html), MolduraDeConta (lateral, comoLink), Campo (opcional, acaoDoRotulo, Mostrar senha), CampoDeBusca (rotuloVisivel), ChipFiltravel (icone), Textarea (contador), PasswordConfirm, Alert (icone), menu lateral do painel e CardComCabecalho com as mesmas props. O script scripts/comparar-ds.mjs confere: 94 arquivos de ui/ em comum, 94 iguais (fora as diferenças de marca listadas em scripts/comparar-ds-marca.json). Tabela completa em propostas/2026-11-27-consistencia-entre-ds.md."),
    page: "campos",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Bordas de campo com pelo menos 3:1"),
    desc: pt("O contorno de campos, seleção, caixa de marcar, opção, botão de contorno, chip e do interruptor desligado passa a ser --input = grafite 400 (WCAG 1.4.11). Medido: FindLook #888896, 3,49:1 no branco e 3,24:1 no cinza #F6F6F7; Dani Moscatelli #627288, 4,9:1 no branco e 4,29:1 no fundo #EDF0F5 (antes 1,53:1 e 1,4:1). O --border-strong fica só nos cards e divisores, que não são campos. Trilho do interruptor desligado no mesmo grafite 400."),
    page: "buttons",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Ícones de estado iguais nos dois DS"),
    desc: pt("Um sinal só para cada estado (semiótica): aviso = ! no círculo (AlertCircle), erro = X no círculo (XCircle). O triângulo deixa de ser ícone de estado, porque no mundo ele quer dizer atenção, e o FindLook usava para erro enquanto o Dani Moscatelli usava para aviso. Vale para Alert, AlertaComAcao, EstadoVazio e EstadoFinal, BalaoDaConversa, Campo, ResumoDeErros, avisos (toast), Upload, senha, chips de status e para a documentação."),
    page: "feedback",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Um véu só atrás das janelas"),
    desc: pt("Dialog, AlertDialog, Sheet, Drawer, SidePanel, o menu do celular e as demonstrações usam o token --sobreposicao (grafite 950 a 50%, sem desfoque), com o mesmo nome e o mesmo valor nos dois DS."),
    page: "overlays",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Popover dentro de janela, Button com ref, botão pílula e ícone de 44 px"),
    desc: pt("Button passa a repassar a ref (forwardRef): com React 18, o Popover aberto por um Button dentro de uma janela ficava fora da tela (translate(0, -200%)); agora abre ancorado no campo, com 8 px de folga da borda. Nova demonstração: campo de data dentro de uma janela. Button ganha forma=\"pilula\" e size=\"icon-lg\" (44 px sempre); no celular, o botão tem 44 px também com as variantes do próprio Tailwind (max-sm e pointer-coarse), sem depender do theme.css estar no mesmo CSS do Tailwind."),
    page: "overlays",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Calendar no celular, em português"),
    desc: pt("No toque, o mês ocupa a largura que tem (até 320 px), cada dia é um quadrado de até 40 px e a área de toque é sempre de 44 × 44 px; cabe inteiro num card a partir de 320 px de tela (antes pedia cerca de 336 px). Dia escolhido no rosa de selecionado, hoje com contorno; dias da semana e meses em português."),
    page: "campos",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Tabelas da documentação no celular"),
    desc: pt("A tabela de documentação (props, teclas, tokens) vira lista no estreito, com o nome em cima e a descrição embaixo; o código nunca quebra no meio da palavra (antes, \"esconderAoRolar\" quebrava em três pedaços)."),
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("CampoDeEndereco, Upload acessível, Stepper com data e outros ajustes"),
    desc: pt("Novo CampoDeEndereco: sugere endereços enquanto a pessoa digita (combobox com lista, teclado, espera de 350 ms, procurando, nenhum resultado e erro); quem busca é o produto, com buscaNoPhoton() pronto (o mesmo pedido da área restrita em HTML). UploadDropzone sem controle dentro de outro e com campo de arquivo nomeado (axe: 0 falhas de label e nested-interactive). Stepper mede a largura real e aceita uma segunda linha (detalhe, como a data). Menu lateral: os nomes só entram com o esmaecer ao abrir e recolher, não ao mudar a largura da janela. AccordionContent: className documentado e manterNoHtml. Campo: aria-describedby de fora somado ao do Campo e manterAjudaNoErro. BarraDaEtapa: descricaoDoContinuar. Efeitos de layout seguros no servidor. Logo com fill-rule evenodd. Novos: ListaDeRecursos (a lista de recursos do CardDePreco, para a revisão do cadastro e a comparação de planos) e os tokens --mapa-1 a --mapa-5, --mapa-vazio, --mapa-borda e --mapa-escolhida no MapaCoropletico (5 faixas). CaixaDeCodigo: texto cinza sobre o rosa com 15% de --foreground (5,56:1)."),
    page: "campos",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Componentes iguais nos dois design systems"),
    desc: pt("Os componentes que o FindLook e o Dani Moscatelli têm em comum passam a ter os mesmos nomes, arquivos e props (o DS Dani Moscatelli publicou primeiro): Campo, CampoDeBusca, ChipFiltravel e GrupoDeChipsFiltraveis (ui/chip-filtravel), BotaoDeEnvio (ui/botao-de-envio, no lugar do BotaoComRetorno), EstadoVazio, EstadoFinal e PaginaDeErro, Alert tom, Conversa, BalaoDaConversa, SeparadorDaConversa e IndicadorDeDigitacao, CabecalhoDoSite, MolduraDeConta, Logo, LinkSaibaMais (ui/link-saiba-mais), Prosa, TabelaAdaptavel e ChipDeEstado. O que só o FindLook precisa ficou como props a mais, escritas na documentação de cada um. O Quadro tem o mesmo nome, mas a API do FindLook (move os itens entre as colunas)."),
    page: "campos", anchor: "campo-padrao",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Componentes do produto: moldura do site"),
    desc: pt("Peças que só existiam no produto FindLook viram componentes (27/11/2026): CabecalhoDoSite e MenuDoCelular (o padrão Header e menus com o comportamento das páginas públicas: transparente na capa, fundo ao rolar, logo que vira símbolo, some ao descer, folha inferior no celular), RodapeDoSite, MolduraDeConta (as telas Entrar, Criar conta e Recuperar acesso; o template Entrar e criar conta passou a usá-la), ProvaSocial, ListaDeVantagens, Logo (a assinatura oficial desenhada no componente), LinkDeTexto, LinkDeVoltar, LinkSaibaMais, LinkPularConteudo e Prosa (Termos de uso e Política de privacidade). Página nova: Moldura do site."),
    page: "site", anchor: "site-cabecalho",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Campos e formulários: um campo padrão só"),
    desc: pt("Campo é o campo padrão do DS (rótulo, ajuda, erro com ícone, opcional, ícone e Mostrar senha; 44 px no toque); o CampoDoCadastro passa a ser o mesmo componente. Novos: CampoDeBusca, GrupoDeOpcoes, LinhaDeInterruptor (o nome também liga e desliga; área de 44 px), SeletorDeQuantidade, CaixaDeCodigo e BotaoDeEnvio (enviando, feito no verde com o check e volta sozinho; erro vira Tentar de novo). Campo ganhou obrigatorio, children em função para outros controles e as máscaras CampoDeTelefone e CampoDeCnpj. Textarea ganhou o contador de caracteres (prop contador). Página nova: Campos e formulários."),
    page: "campos", anchor: "campo-padrao",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Chips e estados"),
    desc: pt("ChipDeEstado, ChipFiltravel e GrupoDeChipsFiltraveis (duas colunas no celular), ChipDeFiltro e ListaDeFiltrosAtivos, EstadoVazio, EstadoFinal e PaginaDeErro, Avaliacao e TituloDeGrupo. Badge ganhou os tons marca, neutro, sucesso, aviso, erro e info (etiqueta de atributo); IconeComBase ganhou os tons sucesso, aviso, erro e info; Alert ganhou a prop tom (neutro, info, sucesso, aviso, erro), que põe o ícone do estado sozinho. O texto do tom aviso leva 15% de --foreground para passar de 4,5:1. Página nova: Chips e estados."),
    page: "chips-e-estados", anchor: "chip-de-estado",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Quadro, conversa e tabela adaptável"),
    desc: pt("Quadro (kanban sem rolagem lateral: colunas lado a lado com 896 px ou mais, empilhadas antes disso, mover arrastando ou pelo botão Mover para), as peças da Conversa do WhatsApp (Conversa, BalaoDaConversa, SeparadorDaConversa e IndicadorDeDigitacao, mais MolduraDeCelular, CabecalhoDaConversa, BotaoDeResposta, CampoDeMensagem e FolhaDeOpcoes), TabelaAdaptavel (colunas que cabem por prioridade, aviso das que ficam de fora, lista abaixo de 600 px, seleção e ordenação) e BarraDeFerramentasDaTabela. BarraDeAcoesEmLote ganhou textos configuráveis (lojas, peças, agendamentos) e, no celular, as ações numa linha própria; CardIndicador ganhou href para virar atalho. Página nova: Quadro, conversa e tabela."),
    page: "painel-e-admin", anchor: "quadro",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Demonstrações animadas e tokens de movimento em JavaScript"),
    desc: pt("SurgirAoRolar e TituloQueSurge (mesma API do DS Dani Moscatelli, com os tokens da FindLook), NumeroAnimado, CursorDeDemonstracao (com moverCursor e clicarCursor) e MiniaturaDoPainel (com os cards, o gráfico e a tabela em miniatura). movimento.ts exporta DURACAO, CURVA, CURVA_SNAPPY e useMenosMovimento, para o produto não copiar números. Tudo respeita menos movimento. Página nova: Demonstrações animadas."),
    page: "demonstracoes", anchor: "surgir-ao-rolar",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Demonstrações trocadas pelos componentes novos"),
    desc: pt("O que era só demonstração agora usa os componentes: chips do cadastro em etapas e de Rótulos › Chips (ChipFiltravel); estados vazios de Rótulos, Usabilidade e Ilustrações (EstadoVazio); estados de chat de Movimento (IndicadorDeDigitacao e BalaoDaConversa); a tabela que vira lista de Gráficos (TabelaAdaptavel); e o template Entrar e criar conta (MolduraDeConta, Campo, SegmentedControl e EstadoFinal). Os tokens de toque (toque:h-11) e de tamanho de texto (text-body, text-label…) são os mesmos das correções da auditoria."),
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Correções da auditoria do celular: tokens de texto, toque de 44 px e componentes alinhados"),
    desc: pt("Auditoria de alinhamento e diagramação (27/11/2026), corrigida dentro dos componentes, para toda página que os usa ficar certa. Tokens de tamanho de texto, da escala de Tipografia: --text-display-xl/-lg/-md, --text-h1 a --text-h4, --text-subtitle-lg, --text-subtitle, --text-body-lg, --text-body, --text-body-sm, --text-button, --text-label e --text-caption (classes text-h1, text-body-sm etc.); todos os tamanhos escritos à mão em ui/ e nas páginas passaram para eles (13 px → 14 px, 15 px → 16 px, ou 14 px nos botões). Ritmo de 4/8 px: os meios passos (2, 6, 10 e 14 px) foram para o passo inteiro mais perto, e os raios fora dos tokens para o token mais perto (o vidro passa de 20 para 16 px). Toque: variante toque: (celular ou tela de dedo) com botões, campos, abas e listas de 44 px; caixa de seleção, rádio e interruptor crescem só a área de toque. Componentes: CabecalhoDaPagina (ações uma por linha, mesma largura, no celular), PartnerCard (botão e link na mesma linha; em card estreito, dois botões da mesma largura), TabelaDeProdutos no celular (uma borda esquerda: preço, status e menu na coluna do texto), CardIndicador (números na mesma altura; sem ícone em card estreito; minigráfico opcional), CardComCabecalho e CardDoPainel (ação desce para a coluna do texto em card estreito), CarrosselDeDicas (controles embaixo, à esquerda; fechar no canto), AbasComContador (vira lista de seleção quando não cabe), Pagination (nunca quebra; \"Página 4 de 12\" no celular, PaginationStatus), SegmentedControl (rótulo nunca quebra), selo do ProductCard, MapaCoropletico (marcador proporcional ao mapa). Hover das bordas: cinza forte (--border-strong), nunca rosa. Títulos e textos com text-wrap: pretty (como no DS Dani Moscatelli; o balance deixava primeiras linhas curtas demais). Textos em inglês dos componentes traduzidos. Demonstrações usam os componentes de verdade (Switch, SegmentedControl, Select, Accordion, Timeline, CardIndicador, CartaoDeEscolha, Button) e tabelas que viram lista; blocos de código quebram a linha. Regras escritas em Grid e espaçamento › Celular."),
    page: "grid", anchor: "grid-celular",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Regra dos rosas claros: selecionado no rosa do meio, hover cinza claro"),
    desc: pt("Decisão da dona do produto (27/11/2026), igual nos dois design systems: \"o estado selecionado fica com a mesma cor do estado hover [o rosa do meio]. E o hover passa a ser cinza claro\". SELECIONADO --primary-suave #FFECF0 (item ativo do menu, botão \"✓ Selecionado\", segmento, chip, linha e loja selecionados; continua rosa com o mouse em cima; --primary-text 5,7:1). HOVER cinza claro, nunca rosa: --accent (graphite-100 #E9E9EC) nos itens, com o texto passando a --foreground (17:1), porque o --muted (graphite-50) é claro demais no branco para um item pequeno; nos cards inteiros com texto cinza (ItemDeAcao, CardDePreco), o --muted com a borda mudando (texto cinza 5,0:1; no --accent seria 4,46:1). DESTAQUE --primary-muted #FEDFE6 (bases de ícones, destaques). --primary-sutil deixa de ser usado para seleção. Aplicado ao menu do painel e ao menu deste site, LinhaDeLista, SegmentedControl, CardDePreco, ItemDeLoja, tabela de produtos, ItemDeAcao, chips, cadastro em etapas, Cards › Estados e demonstrações; hovers rosa de upload, botões de contorno e links viraram cinza. Documentado em Fundamentos › Cores › Rosas claros."),
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Alerta com ação e linhas de lista no celular: uma borda esquerda só"),
    desc: pt("Pedido da dona do produto (27/11/2026): \"no mobile, diagramação ruim, principalmente na tag e nos botões\". AlertaComAcao abaixo de 640 px: base do ícone menor (36 px) na linha do título, centralizada com ele; descrição, botão e link começam na borda do respiro do card, alinhados com o ícone; botão e link lado a lado, centralizados, quebrando só quando não cabem (respiro de 16 px no celular). Do 640 px em diante, nada muda. LinhaDeLista: quando as tags e ações descem para baixo do texto, a linha começa na borda esquerda da coluna do texto, o mesmo x do título (alinharAcoesAbaixo=\"inicio\" passa a ser o padrão; \"fim\" mantém a borda direita de antes). O alerta-com-acao.tsx continua idêntico nos dois design systems."),
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Cartão de escolha: escolha única em cartões grandes"),
    desc: pt("Proposta de 27/11/2026, tirada do cadastro do produto, que montava o cartão à mão. Novo CartaoDeEscolha, sempre dentro de um GrupoDeCartoesDeEscolha (ui/cartao-de-escolha.tsx), feito sobre o RadioGroup do design system: card branco com borda de 2 px, ícone na base cinza e rádio à direita; escolhido, a borda fica na primária com o BrilhoDeSelecionado, o ícone passa para a base rosa (IconeComBase) e o rádio fica marcado. O cartão inteiro escolhe, as setas do teclado trocam a opção, o nome lido é o título e a frase é a descrição. Opções: colunas={2} (dois lado a lado quando o grupo tem 448 px ou mais) e desabilitado. Nova moldura comum dos cards que se escolhem (molduraDoSelecionavel, em ui/shine-border), usada também por Cards › Estados, pelo CardDePreco selecionado e pelo cadastro em etapas, sem mudar a aparência deles. Documentado em Controles de formulário › Cartões de escolha; proposta em propostas/2026-11-27-cartao-de-escolha.md."),
    page: "buttons", anchor: "cartoes-de-escolha",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Correções da revisão das telas do produto"),
    desc: pt("Revisão de 27/11/2026. Alerta só com descrição: sem AlertTitle, a frase fica na cor do texto principal, ocupa as duas linhas, centraliza na altura do ícone e quebra a linha de forma equilibrada, sozinha, sem classe extra (o produto pode tirar o MensagemDoAlerta); nova seção Feedback › Alerta só com descrição. Texto de apoio dos alertas coloridos e do Alerta com ação: --muted-foreground com 15% de --foreground, acima de 4,5:1 em todos os fundos. BotaoDoAlerta e LinkDoAlerta com 40 px de altura, a dos botões do DS, com o texto de 14 px. \"use client\" em todos os arquivos de ui/ que usam estado ou contexto (Card, GradeDeCards, painel de dados e outros), para o produto montar as páginas estáticas. BarraFixaDoCelular reserva sozinha o espaço dela no fim da página (96 px, ou 160 px com o Voltar ao topo, mais a área segura) e ganha EspacoDaBarraFixa e reservarEspaco. Voltar ao topo passa a ser secundário (branco, com borda, seta em --primary-text e --shadow-lg) e sobe sozinho para ficar 12 px acima da barra do celular; demonstração nova em Templates › Botões flutuantes. Contraste do texto cinza no rosa: hover do ItemDeAcao no rosa nível 2 (--primary-suave; 4,8:1, antes 4,35:1) e texto de apoio da FaixaDeEstado, da FaixaDeBeneficios, do BannerPromocional e do PartnerCard tint com 15% de --foreground (6,1:1). Requisitos de senha (PasswordConfirm): ponto neutro para \"ainda não\" e o check de sucesso (CheckCircle2 em --success-text) para \"atendido\", no lugar do círculo vazado que parecia um botão de rádio; \"As senhas coincidem\" também no verde de sucesso."),
    page: "feedback", anchor: "alerta-sem-titulo",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Rosas claros: selecionado no mais claro, hover no do meio"),
    desc: pt("Decisão da dona do produto (27/11/2026): o estado selecionado usa o rosa mais claro (--primary-sutil, nível 1): item ativo do menu, botão “✓ Selecionado”, segmento e chip ativos e linha selecionada. O hover dos itens rosados usa o rosa do meio (--primary-suave, nível 2), um pouco mais escuro. O nível 3 (--primary-muted) fica para bases de ícones e destaques."),
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Linhas no celular: tags e ações abaixo de todo o texto, por padrão"),
    desc: pt("Decisão da dona do produto (27/11/2026). Nas listas, no celular (abaixo de 640 px), as tags e ações vão para uma linha própria, abaixo de todo o bloco de texto, alinhadas à direita; do tablet em diante continuam ao lado do texto. A LinhaDeLista (ui/linha-de-lista.tsx) passa a ter quebraAcoes=\"estreito\" como padrão, e com ela a lista da Tabela de produtos e os exemplos de Dados > Linhas com tags e ações; quebraAcoes={false} é a opção de saída (ao lado do texto também no celular, com o texto na coluna dele) e quebraAcoes as põe abaixo em qualquer largura. A linha selecionada da LinhaDeLista e do ItemDeLoja usa o rosa claro nível 1 (--primary-sutil), como a linha selecionada das tabelas. No cadastro em etapas, os cards de plano (CardDePreco) ficam numa GradeDeCards: mesma altura, com o card selecionado (borda de 2 px e BrilhoDeSelecionado) dentro da grade."),
    page: "data", anchor: "linhas-colunas",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Três rosas claros e só a ação principal preenchida (Opção A)"),
    desc: pt("Decisão da dona do produto (27/11/2026). Só a ação principal de cada área é um botão preenchido; estados selecionados e ativos usam três fundos rosa claros, sempre com texto em --primary-text (#BC0A41). Nível 1 --primary-sutil #FFF5F8 (novo; hover dos itens do menu e linha selecionada em listas; 6,0:1). Nível 2 --primary-suave #FFECF0 (novo; cápsulas: chips ativos, badges e selos como \"Recomendado\"; 5,7:1). Nível 3 --primary-muted, de #FFE6EE para #FEDFE6 (pink-100; controles selecionados: botão \"✓ Selecionado\", item ativo do menu, segmento ativo; 5,2:1). No escuro: pink-500 a 8%, 12% e 16% sobre o grafite, texto em pink-300 (6,9:1 ou mais). Card selecionado (CardDePreco e cartões de Cards › Estados): fundo branco, borda primária de 2 px com o brilho animado do design system por cima (novo BrilhoDeSelecionado em ui/shine-border: ShineBorder preset primaria, 2 px; com menos movimento, só a borda parada), sem anel nem sombra; a ação vira contorno de 2 px, a mesma espessura da borda, com \"✓ Plano selecionado\" ou \"✓ Selecionado\", fundo nível 3 e texto --primary-text. Chips ativos (Rótulos e cadastro) deixam de ser preenchidos: fundo nível 2, texto --primary-text, borda rosa sutil e check, com aria-pressed. Menu do painel (ItemDoMenu, GrupoDoMenu) e menu do site do DS: ativo no nível 3 e hover no nível 1. Nível 2 também no SeloSecao, no chip do SidePanel, no contador da aba ativa e no estado Reservado da tabela de produtos, no StatusChip \"A confirmar\", nos badges e tags de Rótulos e nos selos e chips dos templates; nível 1 nas linhas selecionadas da tabela de produtos e na notificação selecionada. Página Cores: nova seção Três rosas claros."),
    page: "colors", anchor: "rosas-claros",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Cadastro em 5 etapas: largura toda, container queries e combinações de componentes"),
    desc: pt("Pedido da dona do produto (27/11/2026). Na página Padrões do produto, a gaveta fica na linha dela e o cadastro em 5 etapas ganha a largura toda do conteúdo. Os componentes passam a se adaptar à largura deles mesmos, não à da tela: Stepper mede se os nomes inteiros cabem e, se não cabem, mostra \"Etapa X de N · nome\" e os números (nunca \"Res…\"); nova opção textos.todasConcluidas para quando todas as etapas terminaram. EtapaDoCadastro põe a coluna lateral ao lado só com 896 px ou mais (de 15rem a 18rem, sempre secundária) e embaixo do formulário antes disso; nova GradeDeCampos (dois campos por linha só quando cada um tem 240 px ou mais); CampoDoCadastro ganha icone, inteiro e depois, e o erro ocupa o lugar da ajuda; novo ResumoDeErros (Alerta de erro com link para cada campo, a partir de 2 erros) e a prop resumoDeErros; o erro geral usa o Alerta de erro; LateralDaEtapa mais compacta; BlocoDeRevisao não estoura em telas estreitas. PasswordConfirm ganha erroSenha, erroConfirmacao, idSenha e idConfirmacao (opcionais; sem elas nada muda). Novo CardDePreco (ui/card-de-preco.tsx): o card do template Planos e assinatura vira componente, sem mudar o visual do template (que passa a usá-lo), com seleção por botão (aria-pressed) ou por rádio (selecao=\"radio\", dentro de um RadioGroup); os planos de exemplo ficam em shared/planos.ts. LateralDaEtapa: ícone no IconeComBase e o destaque no Alerta do design system (info ou aviso), no lugar da caixa colorida própria. A demonstração usa só peças do design system: CardDePreco no Plano, cartões selecionáveis de Cards › Estados no Pagamento, chips de Rótulos, Heading e DivisorSuave nos blocos da etapa 2, e a tela de sucesso é a própria EtapaDoCadastro com Alerta de sucesso e Itens de ação. A demonstração percorre as 5 etapas com validação, Voltar, Editar a partir da revisão, carregando e tela de sucesso, e a nova seção Combinações diz quais componentes cada etapa usa e por quê. Planos e preços são exemplos (R$ 00,00)."),
    page: "produto", anchor: "produto-cadastro",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Cards lado a lado: mesma altura, ou um por linha"),
    desc: pt("Regra da dona do produto (27/11/2026): cards lado a lado nunca têm tamanhos diferentes; se a diferença de conteúdo deixaria um card com uma área vazia vertical grande, os cards passam a ser horizontais, um por linha. Novo GradeDeCards (ui/grade-de-cards.tsx), com ItemDaGrade (rótulo + card, com subgrid para os cards começarem e terminarem juntos) e useOrientacaoDoCard: estica os cards da linha, mede a altura natural de cada um (ResizeObserver e MutationObserver, antes da pintura) e vira lista (data-layout=\"lista\") quando a diferença passa de 120 px, ou de 1/3 do card mais alto com pelo menos 64 px; volta à grade abaixo de 75% do limite, sem piscar; com uma coluna (celular), nada muda; a troca esmaece em --duration-normal, sem animação com \"menos movimento\". Props: colunas, larguraMinima, limiteDeDiferenca, layout, onLayoutChange. Card ganha orientacao (vertical ou horizontal, automática dentro da lista; no celular, sempre vertical), a nova CardMidia (imagem ou ícone em base rosa clara) e o CardFooter desce para a base (mt-auto). Card com ação (pedido da dona do produto, 27/11/2026): no card horizontal, o rodapé vira uma linha de largura inteira embaixo, com o divisor do card (DivisorDoCard, que usa o DivisorSuave) e os botões no canto inferior direito; a mídia continua à esquerda. PartnerCard e ProductCard seguem a orientação da grade quando não recebem orientation (o ProductCard horizontal alinha a ação à direita, abaixo do divisor); PartnerCard e CardDeLoja alinham a ação na base. Aplicado nas grades de cards de todas as páginas (Cards, Dados, Gráficos, templates do painel, KPIs, planos, Faça e Não faça, princípios e demais) e documentado em Cards > Mesma altura, ou um por linha, com demonstração, exemplos certos e errados e o limite."),
    page: "cards", anchor: "card-mesma-altura",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Catálogo do design system (CATALOGO.md e catalogo.json) e regra de consumo"),
    desc: pt("Pedido da dona do produto (27/11/2026): nenhuma conversa ou agente deve recriar à mão o que o DS já tem. Novo catálogo gerado automaticamente por scripts/gerar-catalogo.mjs antes de cada pnpm build: CATALOGO.md (para pessoas e agentes de IA) e catalogo.json (para programas), na raiz do repositório, com todos os componentes de ui/ (para que servem, props, variantes e onde ver), os templates e padrões que ainda só existem nas páginas de demonstração (backlog de promoção a componente), os tokens, as regras de uso e as propostas de componente. pnpm catalogo:check falha se o catálogo gravado estiver desatualizado. CLAUDE.md na raiz com a regra de consumo e propostas/README.md com o processo para criar componente novo dentro do DS. Nova seção Catálogo na página Desenvolvimento."),
    page: "develop", anchor: "dev-catalogo",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Pink do lenço do gato: nova escala pink e logo em #FC0256"),
    desc: pt("Decisão da dona do produto (25/11/2026). A cor principal da marca passa a ser o rosa-cereja do lenço do gato mascote, #FC0256 (antes #E62040, que puxava para o vermelho). A escala pink inteira nasce dela, calculada em OKLCH com a mesma luminosidade de cada passo: 50 #FFF2F5 · 100 #FEDFE6 · 200 #FBBACB · 300 #F78BA7 · 400 #F34E7C · 500 #FC0256 · 600 #BC0A41 · 700 #950333 · 800 #6F0427 · 900 #4C071D · 950 #2B0813. Papéis: botão principal --primary = pink-550 #E8004E (novo; texto branco 4,6:1), hover --primary-hover = pink-575 #D20648 (novo; 5,4:1); --destructive e --sidebar-primary também no pink-550; texto colorido grande --primary-destaque = pink-500 #FC0256 (novo token, só texto de 24 px ou negrito de 18,66 px: 3,98:1 sobre branco) nos destaques de títulos (Heading, Destaque, PartnerCard); texto colorido pequeno --primary-text = pink-600 #BC0A41 (6,4:1), agora também no Button link, no chip do SidePanel e na queda do painel de dados. Nunca texto branco sobre #FC0256. --error continua no pink-500; --error-text no pink-600 (5,8:1 no fundo do Alerta com ação). --primary-muted, --error-muted, --ring, --surface-tint e os fundos rosados recalculados no novo matiz. Logo oficial: os vetores (src/imports/svg) e os PNGs (src/imports/findlook) passam ao #FC0256, com o mesmo tamanho e a mesma transparência; favicon e ícones do app também. Gráficos (aprovado pela dona do produto em 26/11/2026): os dois tons de destaque acompanham a escala nova, --chart-1 #E62040 → #FC0256 e --chart-2 #FF6E85 → #FF6F95; os tons 3 a 7 não mudam."),
    page: "colors",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Linhas com tags e ações: o texto nunca passa da coluna final, e o hover cobre a linha inteira"),
    desc: pt("Regra da dona do produto (24/11/2026): nos grids, o texto nunca deve ultrapassar a coluna de tags ou ações. Em toda linha de lista, tabela, grade ou lista de cards com uma coluna final de tags, selos, status ou ações, o texto fica na coluna dele (minmax(0,1fr)) em qualquer largura e a coluna final mantém a largura (auto); no celular, nada de col-span-full, flex-basis 100% ou áreas de grid como \"res res\" passando por baixo dela. Sem espaço, as tags e ações descem para uma linha própria abaixo de todo o texto, ou a linha vira um card empilhado. Segunda regra da dona do produto, no mesmo dia: o hover da linha cobre a linha inteira, de ponta a ponta, sem cantos arredondados (--row-hover), incluindo a caixa de seleção do início e as tags e ações do fim; a linha selecionada tem a mesma forma, o foco do teclado é um contorno por dentro, e só a linha que é um card sozinho mantém o raio do card. Novo componente LinhaDeLista (ui/linha-de-lista.tsx), com início, conteúdo (título e descrição) e fim (tags e ações), grade auto | minmax(0,1fr) | auto e a opção quebraAcoes (sempre ou só no celular). Nova seção Dados > Linhas com tags e ações, com exemplo certo e errado na largura do celular, e as duas regras também em Cards > Comportamento responsivo. Corrigidos: a lista da Tabela de produtos em quadros estreitos (o preço, o status e o motivo passavam por baixo do menu de ações; agora usa a LinhaDeLista), o ponto de não lida das notificações (coluna própria), o ItemDeChecklist e o ItemDeLoja (hover e seleção sem cantos, foco por dentro, --row-hover) e a lista de verificação de Acessibilidade (hover sem cantos)."),
    page: "data", anchor: "linhas-colunas",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Alerta com ação; todos os alertas no mesmo padrão"),
    desc: pt("Aprovado pela dona do produto (23/11/2026). Novo AlertaComAcao (ui/alerta-com-acao.tsx), com BotaoDoAlerta e LinkDoAlerta: ícone com base de 44 px (cor do estado a 18%, 30% no aviso), título de 15 px em negrito e todo o resto em 14 px, borda na cor do estado a 22% e fundo do card com a cor do estado a 7% (9% no aviso). Ações sempre embaixo do texto: uma principal só de contorno, com texto na cor de texto do estado, e uma secundária em forma de link sublinhado; em alerta estreito, a linha de ações usa também a largura sob o ícone. role=\"alert\" em aviso e erro, role=\"status\" em info e sucesso. Tokens novos, só para texto e ícone sobre fundo claro: --success-text (#2B7553) e --info-text (#2E6E98), 5,1:1 no fundo do alerta; no tema escuro apontam para --success e --info. --error-text (novo) aponta para --primary-text, sem mudança visual: o erro dos alertas passa a usar esse token. O Alert (ui/alert.tsx) passa a ter a mesma aparência, sem mudar a API: o svg filho vira o ícone com base; ícones do padrão: info Info, sucesso CheckCircle2, aviso AlertCircle, erro TriangleAlert."),
    page: "feedback", anchor: "alerta-com-acao",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Site do DS com a estrutura do DS Dani Moscatelli"),
    desc: pt("Pedido da dona do produto (23/11/2026): os dois sites de documentação têm a mesma estrutura; só as cores mudam. O fundo da página e a faixa da trilha passam ao cinza da página (--graphite-50, #F6F6F7), com os cards brancos por cima, como o DM faz com o --background #EDF0F5. O --background da FindLook continua branco (fundo de campos e botões de contorno). Menu: mesma curva do DM (--ease-snappy) e item ativo com --primary-text. Medidas conferidas lado a lado: cabeçalho de 64 px com sombra e linha, menu de 240/64 px, itens de 36 px, trilha de 46 px, conteúdo de 960 px com 40 px de respiro. No celular, \"Design System\" some do cabeçalho como previsto (antes aparecia colado ao logo)."),
    page: "overview",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Menu que empurra, divisor suave, hover de linha e desabilitado"),
    desc: pt("Pedidos da dona do produto (23/11/2026). O menu lateral empurra o conteúdo, nunca o cobre: no site do DS, o botão ≡ Menu recolhe e expande (a escolha fica guardada) e o conteúdo acompanha a largura do menu, com os tokens de movimento; só no celular o menu é gaveta por cima. O painel (MenuLateral) já empurrava. CardComCabecalho: sem faixa cinza; o cabeçalho é separado do conteúdo por um divisor suave, que desaparece nas laterais (DivisorSuave, novo; cabecalho=\"divisor\" é o padrão, \"simples\" fica como opção; as faixas saíram). Hover de linha ou item dentro de card no cinza mais claro, pelo token --row-hover (--graphite-50; classe hover:bg-row-hover): tabela, tabela de produtos, checklist e as listas dos templates. Botão desabilitado com fundo --graphite-100 (#E9E9EC) e texto a 3,6:1. Página Cards: card direto sobre o fundo da página é sempre Só borda, no branco ou no cinza."),
    page: "cards", anchor: "card-layout",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Painel com a moldura do site do design system"),
    desc: pt("Pedido da dona do produto (23/11/2026): o painel funciona e se parece com o próprio site do DS. BarraSuperiorDoPainel: faixa branca de ponta a ponta no alto, com linha embaixo; logo à esquerda, busca e sino à direita e o perfil na ponta direita. Embaixo dela, o menu lateral branco com linha à direita; no topo do menu, o botão ≡ Menu (TopoDoMenu + BotaoRecolherMenu) recolhe e expande (240 px / 64 px, como o site do DS). ItemDoMenu no estilo do site do DS (ícone de 16 px, nome; o ativo com fundo rosa claro e texto vermelho, sem a barra à esquerda) e GrupoDoMenu expansivel (ícone, nome, seta e os itens numa linha-guia). Conteúdo sobre --graphite-50. Faixa neutra do CardComCabecalho em --graphite-100, com a descrição em --graphite-600 (contraste 6,5:1). Os cards voltam ao padrão Só borda (borda de 1 px, sem sombra em repouso); a sombra fica no que abre por cima da tela."),
    page: "overlays", anchor: "menu-painel",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Sombra no que abre por cima da tela; um botão principal por área"),
    desc: pt("Decisões da dona do produto (23/11/2026). Tudo que abre por cima da tela tem sombra dos tokens: diálogos, gavetas e painéis laterais --shadow-xl; menus, popovers, listas de seleção, busca, cards de passar o mouse, tooltips e avisos --shadow-md (submenus --shadow-lg); o drawer ganhou sombra. Os cards continuam no padrão \"Só borda\" (borda de 1 px, sem sombra em repouso). A base do ícone do CardComCabecalho passa a ser a mesma do CardIndicador (IconeComBase padrão). Regra nova \"Um botão principal por área visível\" (Botões): no máximo um botão principal preenchido por tela ou região; o resto usa o secundário ou um link. O BannerPromocional passa a usar o botão secundário; na Equipe, com o convite aberto, o principal é Enviar convite."),
    page: "buttons", anchor: "botao-principal",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Páginas do painel: Opção A"),
    desc: pt("Decisão da dona do produto (23/11/2026): cabeçalho da página fora do card (título, descrição e abas, no fundo da página); conteúdo em cards com cabeçalho de ícone, um card por assunto. O modelo antigo, com título e abas dentro do cabeçalho de um card grande, sai. Sem linhas desnecessárias: nada de linha entre o cabeçalho do card e o conteúdo, nem embaixo do título da página, nem linha de base nas abas (só a aba ativa tem o sublinhado); a linha fica só entre as linhas de listas e tabelas. Novos: CardComCabecalho (painel-dados: ícone de 40 px na base rosa clara, título, descrição e ação à direita, alinhada ao topo), AbasComContador estilo=\"pagina\" e idBase (liga cada aba ao painel) e CabecalhoDaPagina abas. Templates Configurações, Equipe, Notificações, Planos e assinatura e Ajuda e suporte refeitos assim; a tabela da Equipe não rola mais para o lado (colunas menos importantes ficam de fora em cards estreitos, com aviso). Ajustes da dona do produto (23/11/2026): o cabeçalho do CardComCabecalho fica numa faixa de cor, sem linha (cabecalho=\"faixa-neutra\", padrão, ou \"faixa-marca\"); a aba ativa da página mostra só o sublinhado e a cor (o anel de foco aparece só pelo teclado, colado ao rótulo); no CabecalhoDaPagina, o título e a descrição usam a largura disponível (descrição até ~65 caracteres) e as ações descem juntas para baixo do texto quando não cabem ao lado."),
    page: "overlays", anchor: "cabecalho-pagina",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Menu lateral recolhível"),
    desc: pt("Decisão da dona do produto (23/11/2026): nos painéis, o menu lateral pode ficar expandido (ícone + nome, 240 px) ou recolhido (só ícones, 64 px). O botão ≡ Menu fica no topo do menu, com aria-expanded e aria-controls. Recolhido: títulos dos grupos viram uma linha fina, cada item mostra um tooltip no mouse e no foco do teclado (e mantém o nome para leitores de tela), o item ativo mantém a barra à esquerda, o contador vira um ponto no ícone (o tooltip diz o número) e o logo mostra só o símbolo. A largura anima com os tokens de movimento; com \"menos movimento\", é instantânea. A escolha fica guardada no navegador, uma chave por painel. Abaixo de 1024 px, o menu continua gaveta, sem recolher. Perfil sempre no cabeçalho, à direita; cabeçalho branco, igual ao menu lateral, com linha fina embaixo. Novos em painel-shell: MenuLateralProvider, MenuLateral, NavDoMenu, DivisorDoMenu, BotaoRecolherMenu, useMenuLateral e useMenuRecolhido; ItemDoMenu, GrupoDoMenu, SeletorDeLoja, CardDePlano e CardDeAjuda se adaptam sozinhos, sem mudar a API."),
    page: "overlays", anchor: "menu-painel",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Card com Mostrar mais (sem rolagem por dentro)"),
    desc: pt("Pedido da dona do produto (21/11/2026): cards com rolagem por dentro prendiam a roda do mouse e dificultavam rolar a página. ConteudoRecolhivel mostra o que cabe, com um degradê, e Mostrar mais abre uma janela (modal) com tudo, ou leva para outra tela quando o conteúdo é muito grande (onMostrarMais); o card não estica. O botão só aparece quando sobra conteúdo. Se o conteúdo cresce por uma ação dentro do card, o card cresce junto. preencher: ocupa o espaço de um card de altura fixa. O fundo do conteúdo do painel passa a ser cinza claro (graphite-50), com os cards brancos; para manter o contraste sobre ele, --primary-muted ficou opaco (mesma cor sobre o branco) e a aba sublinhada ativa usa o pink de texto (pink-600)."),
    page: "cards", anchor: "card-mostrar-mais",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Carregamento de página"),
    desc: pt("Componente Carregando (pedido da dona do produto, 21/11/2026: \"crie um loading melhor para a plataforma\"): o símbolo da FindLook quica e pousa como um pin, com a sombra e uma onda rosa a cada pouso, a mensagem do que está carregando e uma barra indeterminada. Aparece depois de 200 ms, para não piscar; depois de 10 s avisa que está demorando e oferece Tentar de novo. Variantes pagina (tela inteira) e secao. Com \"menos movimento\", fica parado. Animações em theme.css (fl-carregando-*). O Skeleton continua para listas e cards de forma conhecida."),
    page: "motion", anchor: "loaders",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Paleta de 7 tons nos gráficos"),
    desc: pt("Decisão da dona do produto (21/11/2026): 7 tons em ordem de importância, do vermelho da marca ao cinza (--chart-1 a --chart-7: #E62040, #FF6E85, #F9B5BF, #E2919E, #C29AA0, #D4D4D4, #EBEBEB), os mesmos no tema claro e no escuro. Faixas: 1–2 destaque, 3–5 apoio e transição, 6–7 contexto. Cinco regras de uso: 1 gráfico = 1 foco, importância em ordem, contexto em cinza, no máximo 2 tons intensos e escalas contínuas do cinza ao rosa (--chart-seq-1 a 4 = tons 6, 4, 2 e 1). As séries usam os tons em sequência; \"Outros\" fica no tom 6 quando as partes param antes dele e no tom 7 nos demais casos. --chart-neutral passa a ser o tom 7; --chart-8 fica só por compatibilidade e aponta para o tom 7. Os componentes escolhem os tons com coresPorImportancia(n), configurada em graficos-paleta.ts; BarrasOrdenadas ganha cores=\"importancia\" e GraficoDeLinhas aceita séries neutro (tracejadas) e tom. Rosca, BarrasHorizontais e MapaCoropletico seguem as mesmas regras, com a mesma API."),
    page: "graficos", anchor: "graficos-cores",
  },
  {
    date: "Nov 2026", kind: "Removed", title: pt("Sunburst e Cascata"),
    desc: pt("Decisão da dona do produto (20/11/2026): os gráficos Sunburst e Cascata (waterfall) saem do catálogo de gráficos."),
    page: "graficos", anchor: "graficos-catalogo-composicao",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("CardIndicador: números alinhados; FaixaDeEstado com complemento"),
    desc: pt("Diagramação do CardIndicador (pedido da dona do produto, 21/11/2026): o ícone de explicação fica colado à última palavra do rótulo (não quebra sozinho para outra linha) e o número vai para a base do card, então numa linha de cards os números ficam alinhados mesmo quando um rótulo ocupa duas linhas. FaixaDeEstado ganha complemento (à direita; embaixo em telas estreitas), para o cabeçalho de uma tarefa longa com o progresso e o botão."),
    page: "cards", anchor: "card-ia",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Item de atividade com iniciais"),
    desc: pt("ItemDeAtividade aceita iniciaisDe (pedido da dona do produto, 20/11/2026): o avatar mostra até duas iniciais do nome, na base rosa, quando o título do card já diz o tipo e o ícone repetido não diferencia os itens. Função iniciais exportada. FaixaDeEstado passa a ter fundo rosa claro por padrão (tom neutro para cinza)."),
    page: "badges", anchor: "listas-painel",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Andamento de uma tarefa"),
    desc: pt("Padrão novo (dona do produto, 20/11/2026) para tarefas longas, como a busca de lojas: FaixaDeEstado (o chip do estado, uma divisória, o que está acontecendo e o que vem depois; fundo rosa claro por padrão, ou cinza com tom neutro), ProgressoRotulado (rótulo, porcentagem e a barra fina) e ResumoEmLinha (2 a 4 números lado a lado, com o ícone em base cinza e divisórias; um embaixo do outro em telas estreitas). LinkVerTudo ganha tom neutro (o link secundário não compete com o principal), ícone antes do texto e vira botão quando não tem endereço."),
    page: "cards", anchor: "card-andamento",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Base do ícone: quando usar"),
    desc: pt("Regra nova (dona do produto, 20/11/2026) com só três jeitos de mostrar um ícone: base rosa + ícone vermelho (marca e foco, o que convida a agir ou está ativo), base cinza + ícone cinza (neutro, só identifica; itens pausados ou encerrados) e sem base (inline, ao lado do texto). Nunca misturar base cinza com ícone vermelho. Componente IconeComBase (tom marca ou neutro), usado por CardIndicador, CardDeUso, PainelDeUso (agora marca), ItemDeAtividade e ItemDeAcao, que ganha tom (padrão marca; neutro para o que está pausado ou é só registro) e deixa a base cinza com ícone vermelho."),
    page: "icons", anchor: "icon-base",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Uso com limite no padrão dos templates"),
    desc: pt("PainelDeUso e CardDeUso ficam mais limpos, como o CardIndicador dos templates do painel: card branco com borda, ícone em base cinza, número grande, barra fina com trilho cinza e \"x% do limite\". O estado do limite vira uma linha discreta com ícone (verde quando está dentro do limite gratuito, vermelha no alerta), sem o fundo rosa."),
    page: "cards", anchor: "card-uso",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Uso com limite"),
    desc: pt("Dois componentes novos em ui/painel-dados.tsx para mostrar quanto de um limite foi usado: PainelDeUso, o destaque do topo (ícone, o que é medido, a porcentagem grande, \"usado de limite\" com a barra e uma caixa com o estado do limite, neutra ou de alerta), e CardDeUso, um card por tipo de uso (ícone em base rosa clara, rótulo, usado / limite, porcentagem e barra; sem limite, só o número). Cards da mesma linha têm a mesma altura."),
    page: "cards", anchor: "card-uso",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Mapa coroplético na escala de calor"),
    desc: pt("O MapaCoropletico (mapa com os contornos reais, que o produto informa) passa a usar a escala de calor da paleta de gráficos, --chart-seq-1 a --chart-seq-4 (do rosa-300 ao vermelho-700), a mesma do MapaDeCalorPorRegiao, com a legenda em blocos."),
    page: "data", anchor: "grafico-participacao",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Paleta de gráficos e uma rosca só"),
    desc: pt("Os gráficos passam a usar a paleta escolhida pela dona do produto: vermelho-700, vermelho-500, rosa-400, rosa-300 e cinza-500 (o cinza para \"Outros\" e o que não está em destaque). A escala de calor vai do rosa-300 ao vermelho-700, com a cor do texto definida por token. A rosca da Central de Inteligência passa a ser desenhada como a rosca redesenhada."),
    page: "graficos", anchor: "graficos-cores",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Gráficos e visualizações"),
    desc: pt("Página nova e ui/graficos-inteligencia.tsx: como escolher o gráfico, cores dos gráficos, rosca redesenhada, os gráficos recomendados para o FindLook (barras ordenadas, mapa de calor por região, dumbbell, linhas e área, slope, treemap, barras 100%, bolhas, heatmap matricial, bump, funil), cada um como um card de descoberta (conclusão, gráfico, por que importa, próximo passo), e o princípio do design de inteligência. Os tokens de gráfico passam a ser variações de tom do pink; o grafite fica só para informação sem destaque ou desabilitada."),
    page: "graficos", anchor: "graficos-recomendados",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Padrões do produto"),
    desc: pt("Página nova com padrões trazidos do produto como componentes: busca do hero (com botão fixo e gaveta no celular), card de loja, mapa de lojas (mapa ilustrativo ou o mapa real como slot), convite \"Sua loja não está no mapa?\", faixa de parceiros (com Pausar movimento) e as peças do cadastro do lojista. As telas do admin entram só depois da decisão final no produto."),
    page: "produto", anchor: "produto-busca",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Rosca, barras horizontais e mapa coroplético"),
    desc: pt("Três gráficos novos em ui/graficos.tsx: Rosca (partes de um todo, com o centro e a legenda com porcentagem), BarrasHorizontais (comparação de grupos, com barra simples ou empilhada e legenda) e MapaCoropletico (regiões pintadas por um valor, com legenda, marcadores e escolha por toque; as formas vêm do produto). Cor por token, valor sempre escrito, 2 px entre as partes, dica ao passar o mouse, rótulos que quebram de linha e respeito a menos movimento. Vieram da Central de Inteligência de Mercado do produto."),
    page: "data", anchor: "grafico-participacao",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Celular sem rolagem lateral"),
    desc: pt("Todas as páginas cabem em 390 px: paginação e abas quebram linha em vez de rolar, os cards de tipografia quebram textos longos e os círculos em órbita ficam um embaixo do outro no celular."),
    page: "overlays", anchor: "pagination",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Organização e limpeza"),
    desc: pt("Um estilo só de título de seção em todas as páginas (24 px). Raios levados para a escala (8, 12, 16 e 24 px). Cores padrão do Tailwind e hexadecimais que sobravam trocados por tokens. Feedback e Rótulos passam a ter conteúdo próprio; os tokens de Movimento ganham endereço próprio; saem do menu os itens que só levavam a avisos \"Ver em\"; link quebrado do changelog corrigido. As notificações (toast) funcionam (ui/sonner, sem next-themes) e a página Feedback mostra notificações reais, com exemplos de moda. Abas, sanfona, menu suspenso, diálogo, confirmação (ui/alert-dialog), caixa de seleção, opção e chave passam a usar os componentes de ui/, ajustados ao visual documentado. Página nova Catálogo de componentes, com todos os arquivos de ui/."),
    page: "catalogo", anchor: "catalogo-lista",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Tom de voz: textos de inteligência e dados"),
    desc: pt("Quatro seções novas na página Tom de voz: como escrever o que os dados e a IA encontram como uma conversa, e não um relatório. Regras, uma estrutura única para toda descoberta (descoberta, contexto, leitura possível, próximo passo, detalhamento), pares evitar e preferir com exemplos do painel do lojista e perguntas de revisão. Também: trilha de navegação, paginação, dica de contexto e painel lateral da página Overlays passam a usar os componentes reais de ui/; o painel lateral (ui/sheet) prende o foco e fecha com Esc."),
    page: "voice", anchor: "voice-inteligencia",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Indicador do painel com total"),
    desc: pt("O CardIndicador ganha a propriedade total: o número aparece com o total de que faz parte, menor, ao lado (por exemplo, 48 de 75 bairros pesquisados)."),
    page: "cards",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Regra: card nunca tem rolagem horizontal"),
    desc: pt("Regra da dona do produto: nenhum card tem rolagem para o lado; o conteúdo se adapta à largura. Tabelas escondem as colunas menos importantes ou viram lista, abas quebram para a linha de baixo, quadros (kanban) empilham as colunas no celular e galerias viram grade. O ui/table deixa de rolar (o texto quebra de linha), o ui/tabs e as Abas com contador quebram de linha e a tabela de produtos do Painel encurta o nome do produto em vez de rolar. A regra está na página Cards, em Comportamento responsivo."),
    page: "cards", anchor: "card-layout",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Ícones de aplicativo em 512 px"),
    desc: pt("Dois ícones novos, feitos a partir do símbolo oficial, para o painel do lojista instalável no celular (PWA): icone-app-512.png, com fundo transparente, e icone-app-maskable-512.png, com fundo branco e o símbolo dentro da área segura, para celulares que recortam o ícone."),
    page: "brand",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Padrão único de botão, campo e foco; exemplos de moda"),
    desc: pt("O ui/button passa a ser igual ao que a documentação mostra: 40 px, texto 15 px seminegrito e cantos de 12 px; campo de texto, seleção e alternador também com 40 px. Um destaque de foco só: anel de 2 px com respiro de 2 px, só pelo teclado. As páginas Controles de formulário e Feedback mostram os componentes reais; o ui/alert ganha as variantes de estado. Novo ui/status-chip (Estados de informação), que o produto pode sincronizar. Tokens de movimento no theme.css, cores *-muted como classes e tabelas de tokens com os valores do theme.css. Menu em português com o termo técnico, componentes em português e exemplos de moda (lojas, peças e buscas fictícias) no lugar dos de software. Campo de senha com caixa de dicas mais clara e checks em pink."),
    page: "buttons", anchor: "buttons",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Botões flutuantes: Voltar ao topo e barra fixa do celular"),
    desc: pt("Padrão novo em Templates: como o Voltar ao topo convive com a barra de ação fixa do celular (como Encontrar peças) sem cobrir o rodapé. O componente Voltar ao topo ganhou a opção comBarraFixa (no celular, sobe para 96 px da base, acima da barra) e passou a vir pronto para o Next.js (\"use client\"). No celular, a página reserva 160 px no fim quando tem barra fixa e Voltar ao topo."),
    page: "templates", anchor: "template-flutuantes",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Voltar ao topo"),
    desc: pt("Novo componente: botão redondo vermelho com seta para cima, fixo no canto inferior direito, que aparece quando a pessoa chega ao fim da página e a leva de volta ao topo. Com menos movimento, a volta é instantânea; ao voltar, o foco vai para o conteúdo principal. Entrou no template da landing page."),
    page: "templates", anchor: "template-landing",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Correções de acessibilidade e consistência"),
    desc: pt("As classes shadow-* passam a usar as sombras do DS (usavam as padrão do Tailwind). A borda dos campos aparece no tema claro (--input = --border-strong). O token de erro (--error e --destructive) passa a ser o pink cereja da marca. Sucesso e informação escurecidos só o necessário para o texto branco (4,5:1) e aviso em laranja queimado (#C2410C, 5,2:1). Título dos alertas em grafite, com ícone e borda coloridos. A página Cards informa o raio real do card padrão: 24 px (rounded-xl)."),
    page: "feedback", anchor: "alerts",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Grid e espaçamento"),
    desc: pt("Nova página em Fundamentos com o sistema de grid: escala de espaçamento de 4 px com tokens reais (--space-1 a --space-24), grid de 4, 8 e 12 colunas (celular, tablet a partir de 640 px e desktop a partir de 1024 px) com margem de 16, 24 e 32 px e calha de 16, 24 e 24 px, larguras máximas de leitura (768 px), padrão (1152 px) e larga (1280 px), ritmo de 64/80 px entre seções e 96 px no hero, exemplos de uso, o que evitar e tokens. Classes prontas: .ds-container, .ds-grid e .ds-section. A antiga seção Espaçamento de Fundamentos leva para a página nova."),
    page: "grid", anchor: "grid-visao",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Shine Border mais ligeiro"),
    desc: pt("A volta do brilho ficou cerca de 40% mais rápida: padrão do componente de 14 s para 8 s; exemplos lento, padrão e rápido em 11, 8 e 5 s; card de destaque e combinações de cor em 7 s."),
    page: "cards", anchor: "card-shine",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Shine Border: a luz agora dá a volta pela borda inteira"),
    desc: pt("Antes, um gradiente radial ia e voltava na diagonal: a borda só mudava de tom e o brilho não percorria os cantos. Agora um feixe (gradiente cônico) gira em volta do card a cada duration e passa por todos os cantos. Cores, presets, duração e movimento reduzido continuam iguais."),
    page: "cards", anchor: "card-shine",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Página Cards reorganizada: tudo sobre cards num só lugar"),
    desc: pt("A página Cards foi reorganizada e passou a concentrar tudo sobre cards. Começa por “Como escolher” (o fundo define card, borda, sombra e raio) e segue em partes: 1) Card sólido: anatomia, por fundo (branco, cinza claro e escuro no modo claro: card branco sem borda e com sombra forte), borda, sombra e raio, vertical e horizontal, com e sem foto e botão, botões, arquitetura de informação (com os cards de KPI e o indicador do painel), estados (incluindo carregando), animação e onde aplicar (elevação no hover, Wobble, Canvas Reveal), Shine Border, aninhados e componentes prontos (convite, peça, plano, dica e faixa de benefícios); 2) Card de vidro: só combinações aprovadas no contraste, por fundo (claro, escuro e foto), com conteúdo e no tema escuro (painel); o acabamento “Padrão” passou a se chamar “Vidro”; 3) Testar o vidro: a bancada de teste, separada; 4) O que evitar: todos os “não faça” num só lugar. Wobble Card, Shine Border, Canvas Reveal os cards de KPI e o indicador do painel saíram de Motion, Backgrounds e Exibição de dados; lá ficou um link “Ver em Cards”."),
    page: "cards", anchor: "card-escolher",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Cards de vidro: fundo de teste"),
    desc: pt("O seletor de acabamentos ganhou o controle “Fundo de teste”: padrão, textura fechada, textura aberta, textura escura, clara e discreta e cor sólida (cinza claro, cinza médio, grafite ou primária). A conferência de contraste de cada card usa o fundo escolhido (pior caso entre o fundo e um traço da textura). O vidro padrão passou a aparecer também na galeria de acabamentos."),
    page: "cards", anchor: "card-glass",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Vidro no tema escuro: acabamento painel e Luzes difusas"),
    desc: pt("O card padrão das páginas escuras passa a ser o vidro do painel conceitual da página de lojistas: GlassCard com o novo acabamento finish=\"painel\" (grafite-950 a 55%, desfoque de 8 px, borda clara e sombra grande), sobre o novo componente Luzes difusas (focos de luz nas cores da marca, que param com menos movimento e podem se dissolver na base). Caixas dentro do vidro são vazadas: só borda clara, sem preenchimento cinza."),
    page: "cards", anchor: "card-glass-escuro",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Header e menus: modelo padrão do site do estúdio"),
    desc: pt("O padrão agora segue o header atual do site do estúdio Dani Moscatelli: pílula clara flutuando no desktop, faixa que fica grafite no celular e menu em folha inferior. A rolagem virou três chaves independentes (transparente no topo, logo vira ícone ao rolar, some ao descer e volta ao subir). A versão do logo completo é escolhida pelo que está atrás dele (claro, escuro ou foto). O menu fica em um lugar só: header ou barra inferior."),
    page: "header", anchor: "header-demo",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Header e menus"),
    desc: pt("Nova seção com o padrão de header de site, com os links da landing “Para lojas”. Demonstração em uma janela com rolagem própria: três comportamentos de rolagem (transparente → sólido, some e volta, compacto ao rolar), três menus no celular (gaveta lateral, tela cheia e barra inferior com os itens do painel da loja) e quatro fundos por trás do header (fundo da página, foto escura com véu, gradiente da marca e modo escuro). Inclui checklist de acessibilidade, uso e tokens."),
    page: "header", anchor: "header-demo",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Cards de preço: recursos recolhíveis e “Para quem” opcional"),
    desc: pt("Em “Planos e assinatura”, a lista de recursos começa recolhida, com o botão “Ver recursos do plano” e a contagem (por exemplo, 5 de 10). Abrir ou fechar vale para todos os cards, que ficam sempre alinhados; o botão usa aria-expanded. O bloco “Para quem” é opcional: plano sem esse texto não mostra o bloco, e um interruptor acima do protótipo mostra o card com e sem ele."),
    page: "templates", anchor: "template-dashboard",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Cards de preço no estilo do card com wobble"),
    desc: pt("Os cards de “Planos e assinatura” passaram a usar o visual do card com wobble: cantos mais arredondados, ícone em círculo, selo “Recomendado” com estrela, nome do plano em destaque, checks em círculo colorido e rodapé com preço e ação. Continuam o seletor Mensal/Anual, o bloco “Para quem”, os recursos incluídos e não incluídos e o estado selecionado. Sobre a página branca, só borda, sem sombra. Dentro do protótipo, as colunas seguem a largura da janela, e o bloco “Para quem” cresce em vez de vazar quando o card fica estreito demais."),
    page: "templates", anchor: "template-dashboard",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Etapas (Stepper): visual do protótipo"),
    desc: pt("O Stepper passou a usar o visual do protótipo do produto (v8.87): abas numeradas (01, 02…), atual em círculo na primária com sublinhado de 3 px, concluídas em grafite escuro e futuras em cinza claro. No celular continua compacto, com “Etapa X de N”."),
    page: "stepper", anchor: "stepper-anatomy",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Etapas (Stepper)"),
    desc: pt("Novo componente para formulários em várias telas, como o cadastro do lojista: marcador numerado por etapa, atual em rosa claro com aria-current, concluídas com check e reabríveis, futuras bloqueadas. No celular mostra “Etapa X de N” e o nome da etapa atual."),
    page: "stepper", anchor: "stepper-demo",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Cards on white: border, no shadow", pt: "Card sobre fundo branco: borda, sem sombra" },
    desc: { en: "New rule in Cards: on a white background, a card has no shadow and uses a light gray border (--border); shadows are for hover and overlays. All resting cards on the white page now follow it.", pt: "Nova regra em Cards: sobre fundo branco, o card não tem sombra e usa borda cinza clara (--border); a sombra fica para o hover e para sobreposições. Todos os cards parados sobre a página branca passaram a seguir a regra." },
    page: "cards", anchor: "card-guidelines",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Real version number", pt: "Número de versão real" },
    desc: { en: "Pages now show the published version and year (for example “Version 37 · 2026”), updated on every publication, instead of the fixed “Version 1.0 · 2024” left over from the template.", pt: "As páginas passaram a mostrar a versão publicada e o ano (por exemplo, “Versão 37 · 2026”), atualizados a cada publicação, no lugar do texto fixo “Versão 1.0 · 2024” que veio do modelo." },
    page: "overview",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Header shimmer visible in light mode", pt: "Brilho do cabeçalho visível no modo claro" },
    desc: { en: "In light mode, the shimmer on “Design System” in the header now sweeps in the primary colour over graphite text, so the animation can be seen. Dark mode is unchanged.", pt: "No modo claro, o brilho que passa por “Design System” no cabeçalho agora corre na cor primária sobre o texto grafite, e a animação fica visível. O modo escuro não mudou." },
    page: "overview",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Menu: “Comece aqui” group", pt: "Menu: grupo “Comece aqui”" },
    desc: { en: "In Portuguese, the first menu group is now called “Comece aqui”, so it no longer repeats the name of its first item, “Início”.", pt: "O primeiro grupo do menu passou a se chamar “Comece aqui”, para não repetir o nome do primeiro item, “Início”." },
    page: "overview",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Complete Lucide library", pt: "Biblioteca Lucide completa" },
    desc: { en: "Icons › Library now shows the whole Lucide library (lucide-react 1.70.0, 2,029 icons in Lucide's official categories, searchable). The 18 brand icons Lucide removed in 1.x (Figma, Github, Instagram, Linkedin, Youtube…) are kept in the DS in their own group. No icon was removed.", pt: "Ícones › Biblioteca agora mostra a Lucide inteira (lucide-react 1.70.0, 2.029 ícones nas categorias oficiais da Lucide, com busca). Os 18 ícones de marca que a Lucide tirou na versão 1.x (Figma, Github, Instagram, Linkedin, Youtube…) continuam no DS, num grupo próprio. Nenhum ícone foi removido." },
    page: "icons", anchor: "icon-library",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Panel components aligned with the DS", pt: "Componentes do painel alinhados ao DS" },
    desc: { en: "Panel components now follow existing DS components and documentation.", pt: "Os componentes do painel passaram a seguir os que já existiam: indicador com a anatomia do Card de KPI, tabela de produtos no desenho da Tabela de dados (com o checkbox do DS), abas com contador iguais às Abas, status no chip dos Estados de informação, botão dividido e seletor de período nas medidas do botão e do select, legenda do gráfico em pontos. O anel de pontuação virou Gráfico de anel, em Gráficos. A documentação das seções novas segue o padrão do DS: título, descrição e exemplos." },
    page: "data", anchor: "grafico-anel",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Opens in light mode", pt: "DS abre no modo claro" },
    desc: { en: "Light mode is FindLook's official theme.", pt: "O modo claro é o oficial da FindLook: o design system agora abre no claro. O modo escuro continua disponível no botão Escuro." },
    page: "overview",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Store panel components in their sections", pt: "Componentes do painel nas seções do DS" },
    desc: { en: "Panel components documented in existing sections.", pt: "A aba Painel da loja saiu. Cada componente do painel agora está na seção onde se encaixa, no mesmo padrão das demais: Exibição de dados (indicador, gráfico de desempenho, tabela de produtos, pontuação e checklist), Estados (status de publicação), Botões (botão dividido, seletor de período), Navegação (menu do painel, barra superior, cabeçalho da página), Feedback (abas com contador, banner promocional), Rótulos (listas de atividade e ações) e Cards (card de plano, card de dica, faixa de benefícios)." },
    page: "data", anchor: "kpi-painel",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Store panel: single navigable prototype", pt: "Painel da loja: protótipo navegável em uma janela só" },
    desc: { en: "Panel templates merged into one prototype.", pt: "Os templates do painel viraram um protótipo só, com altura fixa e rolagem própria: o menu lateral troca de página (Início, Produtos, Importar, Buscas, Inteligência de vendas, Perfil, Equipe, Planos, Configurações, Ajuda e Notificações), com busca que leva às páginas, menu do sino e da conta. O menu tem rolagem própria e vira gaveta dentro da janela em telas estreitas. Logo sem distorção. Entrar e criar conta e a landing page continuam separadas." },
    page: "templates", anchor: "template-dashboard",
  },
  {
    date: "Nov 2026", kind: "New", title: { en: "Store panel", pt: "Painel da loja" },
    desc: { en: "New store panel components and templates.", pt: "Nova seção Componentes › Painel da loja, com menu lateral (seletor de loja, item com contador, card de plano e de ajuda), barra superior (busca, notificações, conta), cabeçalho da página (seletor de período, botão dividido, banner fechável), indicadores, gráfico com legenda que liga e desliga séries, listas (atividade, insights, tendências, checklist e anel de pontuação), tabela de produtos (abas com contagem, seleção e ações em lote, status com motivo, medidor de desempenho) e dicas. Templates novos: Início do painel da loja (no lugar do Dashboard genérico) e Produtos." },
    page: "templates", anchor: "template-dashboard",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Templates adapted to FindLook", pt: "Templates adaptados ao FindLook" },
    desc: { en: "Generic templates adapted to FindLook.", pt: "Configurações, Entrar e criar conta, Equipe, Notificações, Suporte e Landing page agora falam da loja parceira FindLook, em português. Nomes do menu traduzidos." },
    page: "templates", anchor: "template-dashboard",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Pricing template: new texts and calmer dark mode", pt: "Template de preços: textos novos e modo escuro mais sóbrio" },
    desc: { en: "New \"Who it's for\" texts; the box now has a fixed height of four lines. In dark mode, plan name, price, icon and the \"Who it's for\" box are neutral (only the lightbulb stays yellow); the primary colour remains on the Recommended tag, checks, highlighted border and button.", pt: "Textos novos em \"Para quem\"; a caixa agora tem altura fixa de quatro linhas. No modo escuro, nome, preço, ícone e a caixa \"Para quem\" ficaram neutros (só a lâmpada continua amarela); a cor primária fica na etiqueta Recomendado, nos checks, na borda do destaque e no botão." },
    page: "templates", anchor: "template-dashboard",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Pricing template: \"Who it's for\" box", pt: "Template de preços: caixa \"Para quem\"" },
    desc: { en: "The \"Who it's for\" box is now light yellow (warning-muted) with a lightbulb icon, has a fixed height of three lines in every card and no ellipsis: the text must fit in three lines. Three columns from 1280 px; one column below.", pt: "A caixa \"Para quem\" ficou amarelo-clara (warning-muted), com ícone de lâmpada, altura fixa de três linhas em todos os cards e sem reticências: o texto deve caber em até três linhas. Três colunas a partir de 1280 px; uma coluna abaixo disso." },
    page: "templates", anchor: "template-dashboard",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Pricing template: plan names and selected state", pt: "Template de preços: nomes dos planos e estado selecionado" },
    desc: { en: "Plans are now named after what each tag meant (Visibility, Performance, Opportunities) and the tag was removed. The button reads \"Select Plan\" and, once clicked, fills with the primary colour, shows a check and \"Plan selected\"; the chosen card gets the primary border. Under Templates › Pricing.", pt: "Os planos passaram a se chamar pelo que cada tag dizia (Visibilidade, Desempenho, Oportunidades) e a tag saiu do card. O botão agora diz \"Selecionar Plano\" e, ao ser clicado, fica preenchido na primária, com check e \"Plano selecionado\"; o card escolhido ganha a borda na primária. Em Templates › Preços." },
    page: "templates", anchor: "template-dashboard",
  },
  {
    date: "Nov 2026", kind: "Updated", title: { en: "Pricing template", pt: "Template de preços" },
    desc: { en: "Plan cards now have a section seal above the name, name and price in the primary colour with \"/ month\", a \"Who it's for\" box limited to two lines, a description, a divider, included items with a check and not-included items with a dash, a \"Recommended\" tag on the highlighted plan and an outlined \"Select\" button. Equal heights; one column on phones. Under Templates › Pricing.", pt: "Os cards de plano ganharam selo de seção acima do nome, nome e preço na cor primária com \"/ mês\", caixa \"Para quem\" com no máximo duas linhas, descrição, divisor, itens incluídos com check e não incluídos com traço, etiqueta \"Recomendado\" no plano em destaque e botão \"Selecionar\" em contorno. Mesma altura; uma coluna no celular. Em Templates › Preços." },
    page: "templates", anchor: "template-dashboard",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Campo de senha com confirmação"),
    desc: pt("Senha e confirmação com exibir/ocultar, força da senha em quatro barras com rótulo, dicas de preenchimento que ganham check verde conforme os requisitos são atendidos e aviso de coincidência. Em Componentes › Botões › Senha."),
    page: "buttons", anchor: "password",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Selo de seção"),
    desc: pt("Pílula colorida das seções do site (tom claro da primária, borda na primária, texto na primária em caixa alta com espaçamento largo), para nomear o assunto acima do título de cada seção. Ao lado do selo do hero, em Componentes › Rótulos."),
    page: "badges", anchor: "selo-secao",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Card de peça: sem bairro, estoque acima do divisor, botões com ícone"),
    desc: pt("Bairro removido; quantidade e atualização ficam acima do divisor e só a ação abaixo; preço antigo riscado na primária acima do atual, com o percentual ao lado; \"Ver peça\" com chevron; \"Avise-me\" como botão de contorno pink; exemplo compacto vertical removido."),
    page: "cards", anchor: "card-produto",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Linha do tempo (Timeline)"),
    desc: pt("Portada da seção \"Como funciona\" do site do estúdio: etapas com marcador redondo e card, linha à esquerda no celular e no centro com cards alternados a partir de 768 px, e a animação Step Indicator na rolagem (etapa atual cresce, feitas preenchem a linha, cards entram uma vez). Respeita movimento reduzido. Em Componentes."),
    page: "timeline", anchor: "timeline-demo",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Card de peça: versão horizontal, desconto e regras fixas"),
    desc: pt("Nova orientação horizontal (imagem à esquerda) para listas; variação com desconto (preço antigo riscado, atual e -N%); bairro e \"Atualizado há …\" sempre presentes; bairro à esquerda acima do nome; nome em até duas linhas com reticências; favorito mantém a cor no card esgotado; \"Avise-me\" com sino."),
    page: "cards", anchor: "card-produto",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Card de peça: escassez na primária, Novo sobre a imagem, esgotada em preto e branco"),
    desc: pt("Tag de escassez e contagem em pink com texto branco (o âmbar não é cor da grade principal); Selo Novo sobre a imagem no canto inferior esquerdo; peça esgotada em preto e branco com só o botão colorido e rótulo \"Avise-me\"."),
    page: "cards", anchor: "card-produto",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Card de peça: estoque, escassez e última atualização"),
    desc: pt("No lugar de \"A confirmar\" e \"Confirmado há…\", o card mostra a quantidade disponível, a tag âmbar de escassez quando restam até 3 peças (\"Só N restantes\" / \"Última peça\"), \"Esgotada\" com zero, e \"Estoque atualizado há…\"."),
    page: "cards", anchor: "card-produto",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Card de peça (ProductCard)"),
    desc: pt("Card de produto para busca, favoritos e vitrine da loja, montado com a anatomia do Card, o Button padrão, o Selo e os ícones de moda: imagem com favorito acessível, tag Novo, bairro, nome, loja · estilo, preço em reais, ação \"Ver peça\" e confirmação com ícone + texto. Densidade compacta para listas estreitas. Em Componentes › Cards."),
    page: "cards", anchor: "card-produto",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Mascote e cenas de volta em PNG e WebP"),
    desc: pt("Os SVGs vetorizados não ficaram bons: a folha mestre da Nyx, seus painéis e a cena \"Nenhuma loja por perto\" voltam a ser entregues em WebP (origem) e PNG (fallback), a partir dos arquivos raster enviados pela dona da marca."),
    page: "ilustracoes", anchor: "mascote-ativos",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Ilustração: nenhuma loja por perto (SVG)"),
    desc: pt("Quinta cena da biblioteca, a primeira em vetor: Nyx surpresa, de braços abertos, numa rua sem lojas, para a busca e o mapa quando não há lojas cadastradas na região. SVG como origem e PNG como fallback; texto alternativo e regras de uso."),
    page: "ilustracoes", anchor: "ilustracao-sem-lojas-locais",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Mascote: arquivo mestre em SVG e cabeçalho padrão"),
    desc: pt("A folha canônica da Nyx passa a ser o vetor mestre (nyx-mestre.svg, fundo transparente), com os painéis de personagem, turnaround, expressões, elementos e paleta recortados do mesmo vetor. Página com o cabeçalho padrão das demais (eyebrow, título com destaque, descrição)."),
    page: "ilustracoes", anchor: "mascote-personagem",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Mascote & Ilustrações: hierarquia completa e folha canônica da Nyx"),
    desc: pt("Seção reorganizada em Personagem (folha de referência com turnaround, elementos e paleta), Expressões e poses (cinco expressões permitidas), Estilo de ilustração, Estados vazios, Estados de erro, Diretrizes de uso (princípios, aplicação e governança) e Ativos e nomenclatura."),
    page: "ilustracoes", anchor: "mascote-personagem",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Ilustrações: identidade da marca e a mascote Nyx"),
    desc: pt("Seção reconstruída: as ilustrações são parte da identidade da marca, protagonizadas pela Nyx, a gata preta (quem ela é, marca registrada, mundo, estilo, onde aparece e onde não). Títulos das peças revisados e estrutura simples por peça: nome, imagem, visão web, visão mobile, onde/quando usar e como não usar."),
    page: "ilustracoes", anchor: "mascote-estilo",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Ilustração: contatos com lojas vazios"),
    desc: pt("Quarta peça da seção Ilustrações: gato com celular na pata imaginando um vestido, para a tela \"Seus contatos com lojas\" da área logada do consumidor quando nenhum contato foi feito. WebP e PNG, texto alternativo e regras de uso."),
    page: "ilustracoes", anchor: "ilustracao-contatos-vazio",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Ilustração: lojas seguidas vazias"),
    desc: pt("Terceira peça da seção Ilustrações: gato pensativo diante de três vitrines com o botão \"+ Seguir\", para a página de Lojas seguidas da área logada do consumidor quando ainda não há lojas seguidas. WebP e PNG, texto alternativo e regras de uso."),
    page: "ilustracoes", anchor: "ilustracao-lojas-seguidas-vazio",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Ilustração: favoritos vazios"),
    desc: pt("Segunda peça da seção Ilustrações: gato surpreso abrindo um guarda-roupa pink vazio, para a página de Favoritos da área logada do consumidor quando ainda não há favoritos. WebP e PNG, texto alternativo e regras de uso."),
    page: "ilustracoes", anchor: "ilustracao-favoritos-vazio",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Seção Ilustrações: página 404"),
    desc: pt("Nova seção, só no FindLook: estilo das ilustrações, catálogo e a primeira peça, a ilustração da página 404 (gato de óculos escuros na sacola, pin com cabide no lugar do zero), com WebP e PNG para download, texto alternativo e regras de uso."),
    page: "ilustracoes", anchor: "ilustracao-404",
    date: "Nov 2026", kind: "New", title: pt("Ícones de moda (IconeModa)"),
    desc: pt("Componente IconeModa com ícones de traço no estilo Lucide para peças que o Lucide não tem: camiseta, camisa, cropped, jaqueta, vestido, calça, shorts, saia, biquíni, meia, tênis, sandália, bota, salto, boné, chapéu, óculos de sol, bolsa, clutch, cinto, gravata, colar, brinco, anel, pulseira e cabide. Mesmos desenhos da textura doodle. Pedido da dona do produto para as listas de produtos da FindLook."),
    page: "icons", anchor: "icon-sizes",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Textura doodle só com peças de moda"),
    desc: pt("Decisão da dona do produto: a textura passa a ter exatamente oito peças (vestido, calça, saia, boné, óculos de sol, sandália, tênis e camiseta), sem outros elementos nem enfeites soltos, para ler como moda à primeira vista. Boné, sandália e saia redesenhados; SVG e PNG regerados."),
    page: "backgrounds", anchor: "doodle-bg",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Cards glassmorphism: área de teste com alerta de contraste"),
    desc: pt("Exemplos sobre a textura do sistema em ícones pequenos; cada card de teste mede o contraste de título e subtítulo contra a superfície efetiva do vidro (WCAG AA) e alerta quando a acessibilidade fica comprometida. Helper glassTextContrast e utilitários de contraste exportados."),
    page: "cards", anchor: "card-glass",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Escala de grafite rebalanceada no fim escuro"),
    desc: pt("Decisão da dona do produto: grafite-800 #2C2C33, grafite-900 #19191C e grafite-950 #000000 (700 segue #3E3E46), com passos regulares de claridade entre o cinza escuro e o preto. Fundo, cards e bordas do tema escuro acompanham; o vetor do logo mantém #060608."),
    page: "colors", anchor: "colors",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Card de vidro com controle livre de opacidade e desfoque"),
    desc: pt("Props numéricas opacity (0–100 %) e blur (0–80 px) sobrepõem o acabamento; sliders no seletor da seção Cards glassmorphism mostram o resultado e o código na hora."),
    page: "cards", anchor: "card-glass",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Cards glassmorphism com acabamentos"),
    desc: pt("Nova prop finish com graus de transparência: translúcido, fosco, foco de luz e cristal, combináveis com tom e opacidade. Seletor interativo na seção de cards glassmorphism; tokens dos acabamentos."),
    page: "cards", anchor: "card-glass",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Textura doodle"),
    desc: pt("Padrão sem emenda com 48 ícones de traço do universo da moda (vestido, calça, saia, cropped, salto, anel, colar, óculos…). Traço em cor sólida: grafite-200 no claro, grafite-800 no escuro, ou qualquer token via máscara. Download em SVG e PNG. Em Backgrounds."),
    page: "backgrounds", anchor: "doodle-bg",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Cards glassmorphism"),
    desc: pt("Nova subcategoria em Cards: componente GlassCard com vidro claro e escuro, três intensidades, tingimento na primária, versão interativa e fallback sólido com transparência reduzida; regras de fundo, contraste e quantidade."),
    page: "cards", anchor: "card-glass",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Controle segmentado"),
    desc: pt("Opções acopladas que se tocam como botões, sempre com uma selecionada: variantes suave e sólida, três tamanhos, ícones, largura total e opção desabilitada. Em Componentes › Botões › Controle segmentado."),
    page: "buttons", anchor: "segmented",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Shine Border com combinações de cores"),
    desc: pt("Nova prop preset com cinco combinações só de tokens (primária, dourada, primária-dourada, ouro, contraste); o dourado é o token --warning. shineColor segue aceitando uma lista de cores. Documentado em Motion › Shine Border."),
    page: "motion", anchor: "shine-border",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Avatar Circles"),
    desc: pt("Círculos de avatares sobrepostos com “+N”, portado do Magic UI e adaptado aos tokens (bordas seguem o fundo, três tamanhos, “+N” clicável só com destino). Em Componentes › Badges › Avatar."),
    page: "badges", anchor: "avatar-circles",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Card de convite ao parceiro"),
    desc: pt("Card que convida o lojista a cadastrar a loja: selo, título com destaque, benefício, ação principal e link secundário. Vertical e horizontal, tamanhos P, M e G, superfícies card, apoio e grafite. Em Componentes › Cards."),
    page: "cards", anchor: "card-partner",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Títulos com destaque na cor primária"),
    desc: pt("Padrão do hero do site aplicado aos títulos: a expressão-chave fica em pink (componente Heading, destaque entre asteriscos). Títulos de página do design system atualizados e regra documentada em Fundamentos › Tipografia."),
    page: "colors", anchor: "typography",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Componentes de upload"),
    desc: pt("Área de arrastar e soltar (com câmera no celular), lista de arquivos com progresso e estados, imagem única com prévia (logo da loja, capa) e galeria de fotos da peça com capa. Validação de tipo, tamanho e quantidade, mensagens em português, checklist de acessibilidade, uso e tokens."),
    page: "upload", anchor: "upload-dropzone",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Selo (tag do hero)"),
    desc: pt("A pílula do topo da página Experience Intelligence do site do estúdio virou componente: fundo de card, borda fina, caixa alta com espaçamento largo e ponto ou ícone na cor primária. Em Rótulos › Selo, com regras de uso e tokens."),
    page: "badges", anchor: "selo",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Cabide sempre branco nos logos"),
    desc: pt("Os vetores oficiais traziam o cabide como recorte, e ele ficava grafite no fundo escuro. Agora o cabide é branco em qualquer fundo, no símbolo e nas assinaturas horizontal e vertical. SVGs, PNGs e favicon regenerados."),
    page: "brand", anchor: "brand-simbolo",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Assinatura horizontal com mais respiro entre símbolo e logotipo"),
    desc: pt("O espaço entre o símbolo e o logotipo passou de 0,13 F para 0,3 F (F = altura do “F”), nas versões sobre claro e sobre grafite. Proporção do símbolo mantida (2,25 F). SVGs e PNGs de download atualizados."),
    page: "brand", anchor: "brand-assinatura",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Painel lateral (gaveta)"),
    desc: pt("Componente e documentação do painel que desliza da direita: anatomia (cabeçalho, corpo rolável, barra de ação fixa, rodapé), comportamento, exemplo de formulário em painel (“Cadastrar minha loja”, demonstração), checklist de acessibilidade, uso e tokens. Padrão herdado do formulário de contato do site do estúdio."),
    page: "sidepanel", anchor: "sidepanel-anatomy",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Tokens unificados com as cores do logo oficial"),
    desc: pt("Pink FindLook passa de #F4144B para #E62040 e o Preto Grafite de #111014 para #060608, as cores do arquivo vetorial da marca. Escalas de 50 a 950 e contrastes recalculados: branco sobre pink agora atinge 4,5:1."),
    page: "colors", anchor: "colors",
  },
  {
    date: "Nov 2026", kind: "Updated", title: pt("Logos oficiais em vetor"),
    desc: pt("Os logos gerados na v1 foram substituídos pelos arquivos vetoriais oficiais da marca: assinaturas horizontal e vertical (fundo claro e escuro), símbolo com cabide vazado, wordmark recortado da assinatura e versões monocromáticas do símbolo. Download em SVG e PNG."),
    page: "brand", anchor: "brand-assinatura",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Estados de informação"),
    desc: pt("Cinco estados padronizados (confirmado pela loja, a confirmar, esgotado, sugerido por IA e desatualizado), sempre com ícone e texto, nunca só cor."),
    page: "states",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("Tom de voz e mensagens"),
    desc: pt("Simplicidade, proximidade e ação, com exemplos do que dizer e do que evitar, e a arquitetura de mensagens por público."),
    page: "voice",
  },
  {
    date: "Nov 2026", kind: "New", title: pt("FindLook Design System v1.0"),
    desc: pt("Primeira versão: marca, paleta Pink + Grafite, tipografia Plus Jakarta Sans, princípios de design e logos em SVG e PNG, sobre a estrutura de componentes, usabilidade, acessibilidade e motion do Dani Moscatelli Design System v2."),
    page: "overview",
  },
];
