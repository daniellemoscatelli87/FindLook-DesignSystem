import React, { useState } from "react";
import { ExternalLink, Mail, Save, Search, Store } from "lucide-react";
import { SectionHeader } from "./shared/SectionHeader";
import { DataTable, DoDont, Mono, Panel, SubTitle } from "./shared/Guidance";
import { Campo, CampoDeCnpj, cnpjValido } from "../ui/campo";
import { CampoDeBusca } from "../ui/campo-de-busca";
import { Textarea } from "../ui/textarea";
import { GrupoDeOpcoes, LinhaDeInterruptor } from "../ui/grupo-de-opcoes";
import { ChipFiltravel } from "../ui/chip-filtravel";
import { SeletorDeQuantidade } from "../ui/seletor-de-quantidade";
import { CaixaDeCodigo } from "../ui/caixa-de-codigo";
import { BotaoDeEnvio, useEstadoDoEnvio } from "../ui/botao-de-envio";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { CampoDeEndereco, type SugestaoDeEndereco } from "../ui/campo-de-endereco";
import { GradeDeCampos } from "../ui/cadastro-lojista";

/* Campos e formulários: o campo padrão e as peças de formulário que o produto montava à mão (27/11/2026). */

/* Exemplo do CampoDeEndereco sem chamar serviço nenhum: uma lista de exemplo filtrada, com uma espera de 400 ms para
   mostrar o "Procurando…". No produto, passe a busca de verdade (por exemplo, buscaNoPhoton()). */
const ENDERECOS_DE_EXEMPLO: SugestaoDeEndereco[] = [
  { id: "1", titulo: "Rua XV de Novembro, 700", linha: "Centro, Curitiba - PR, 80020-310" },
  { id: "2", titulo: "Rua Comendador Araújo, 143", linha: "Centro, Curitiba - PR, 80420-000" },
  { id: "3", titulo: "Avenida Sete de Setembro, 2775", linha: "Rebouças, Curitiba - PR, 80230-010" },
  { id: "4", titulo: "Rua Mateus Leme, 1200", linha: "Centro Cívico, Curitiba - PR, 80530-010" },
  { id: "5", titulo: "Praça Tiradentes", linha: "Centro, Curitiba - PR" },
];
const semAcento = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
function buscaDeExemplo(texto: string, sinal: AbortSignal) {
  return new Promise<SugestaoDeEndereco[]>((resolve, reject) => {
    const id = window.setTimeout(() => resolve(ENDERECOS_DE_EXEMPLO.filter((e) => semAcento(`${e.titulo} ${e.linha}`).includes(semAcento(texto)))), 400);
    sinal.addEventListener("abort", () => { window.clearTimeout(id); reject(new DOMException("cancelado", "AbortError")); });
  });
}
function DemoEndereco() {
  const [valor, setValor] = useState("");
  return (
    <div className="max-w-xl">
      <CampoDeEndereco
        rotulo="Endereço"
        valor={valor}
        onValorChange={setValor}
        buscar={buscaDeExemplo}
        placeholder="Pesquise o endereço ou o nome do local"
        ajuda="Confira o número e acrescente o complemento, se precisar. Exemplo: digite “rua” ou “centro”."
      />
    </div>
  );
}

export function CamposShowcase() {
  const [data, setData] = useState<Date | undefined>(new Date(2026, 10, 27));
  const [email, setEmail] = useState("ana@");
  const [busca, setBusca] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [descricao, setDescricao] = useState("Vestido midi de linho, com botões na frente e bolsos.");
  const [categorias, setCategorias] = useState<string[]>(["Feminino"]);
  const [novas, setNovas] = useState(true);
  const [aviso, setAviso] = useState(false);
  const [qtd, setQtd] = useState(2);
  const [qtdG, setQtdG] = useState(0);
  const salvar = useEstadoDoEnvio(() => new Promise((r) => setTimeout(r, 1200)));
  const falhar = useEstadoDoEnvio(() => new Promise((_, rej) => setTimeout(rej, 1200)));
  const alternar = (c: string) => setCategorias((l) => (l.includes(c) ? l.filter((x) => x !== c) : [...l, c]));
  const erroEmail = email.includes("@") && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? null : "Confira o e-mail: use o formato nome@exemplo.com.";

  return (
    <div className="space-y-16 pb-16">
      <section id="campo-padrao" className="scroll-mt-32 space-y-6">
        <SectionHeader
          title="Campo (o campo padrão)"
          description="Um campo só para todo o produto (decisão de 27/11/2026): rótulo visível em cima, ajuda embaixo e, com erro, a mensagem com ícone no lugar da ajuda. O CampoDoCadastro do cadastro do lojista é este mesmo componente. 44 px de altura no toque, 40 px no computador."
        />
        <Panel className="p-6 sm:p-8">
          <GradeDeCampos>
            <Campo rotulo="Nome da loja" obrigatorio icone={<Store />} placeholder="Ateliê Aurora" ajuda="Como aparece para quem procura." />
            <CampoDeCnpj rotulo="CNPJ" valor={cnpj} onValorChange={setCnpj} erro={cnpj.length === 18 && !cnpjValido(cnpj) ? "Confira o CNPJ: os números não batem." : null} ajuda="Só números; a máscara entra sozinha." />
            <Campo rotulo="E-mail" type="email" icone={<Mail />} value={email} onChange={(e) => setEmail(e.target.value)} erro={erroEmail} />
            <Campo rotulo="Senha" type="password" autoComplete="new-password" ajuda="Use pelo menos 8 caracteres." />
            <Campo rotulo="Instagram" opcional placeholder="@sualoja" />
          </GradeDeCampos>
        </Panel>
        <DataTable
          head={["Prop", "O que faz"]}
          rows={[
            [<Mono>rotulo · ajuda · erro</Mono>, "Rótulo visível; ajuda embaixo; o erro substitui a ajuda e liga aria-invalid."],
            [<Mono>obrigatorio</Mono>, "Põe \" *\" no rótulo e required (o aviso \"* Campos obrigatórios\" fica no topo do formulário). No FindLook, opcional escreve \"(opcional)\"."],
            [<Mono>children</Mono>, "Função que recebe { id, aria-invalid, aria-describedby, required } para outro controle do DS (Textarea, Select, PasswordInput)."],
            [<Mono>icone</Mono>, "Ícone de 16 px dentro do campo, à esquerda."],
            [<Mono>type="password"</Mono>, "Botão Mostrar senha / Ocultar senha (44 px no toque)."],
            [<Mono>acaoDoRotulo · depois · inteiro</Mono>, "Link à direita do rótulo, conteúdo logo abaixo do campo e linha inteira na GradeDeCampos."],
          ]}
        />
        <DoDont
          dos={["Escreva o erro dizendo como corrigir.", "Agrupe campos curtos com a GradeDeCampos (dois por linha só quando cabem)."]}
          donts={["Usar o texto de exemplo (placeholder) como rótulo.", "Montar rótulo, campo e erro à mão no produto."]}
        />
      </section>

      <section id="campo-de-busca" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Campo de busca" description="Busca dentro de uma lista (lojas, peças, agenda): lupa, texto e o botão Limpar quando há texto. Esc também limpa. O rótulo existe sempre, escondido por padrão." />
        <Panel className="space-y-6 p-6 sm:p-8">
          <CampoDeBusca rotulo="Buscar loja" valor={busca} onValorChange={setBusca} placeholder="Nome, bairro, endereço ou Instagram" className="max-w-md" />
          <CampoDeBusca rotulo="Buscar peça" rotuloVisivel valor={busca} onValorChange={setBusca} placeholder="Ex.: vestido midi" className="max-w-md" />
        </Panel>
      </section>

      <section id="campo-texto-longo" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Texto longo com contador" description="Textarea com contador (prop contador e maxLength): cinza com folga, aviso quando faltam 10% e erro no limite. Leitores de tela só ouvem o aviso quando faltam 20 caracteres ou menos." />
        <Panel className="p-6 sm:p-8">
          {/* Campo com children em função: o Textarea recebe id e as descrições do Campo. */}
          <Campo rotulo="Descrição da peça" classeDoBloco="max-w-lg">
            {(p) => <Textarea {...p} contador maxLength={120} value={descricao} onChange={(e) => setDescricao(e.target.value)} className="bg-card" />}
          </Campo>
        </Panel>
      </section>

      <section id="grupo-de-opcoes" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Grupo de opções e linha com interruptor" description="Um conjunto de escolhas com um nome só (fieldset com legenda visível) e a configuração que liga e desliga, em que a linha inteira é o interruptor." />
        <Panel className="space-y-6 p-6 sm:p-8">
          <GrupoDeOpcoes titulo="Categorias de produtos" ajuda="O que a loja vende. Marque quantas precisar." disposicao="chips">
            {["Feminino", "Masculino", "Infantil", "Calçados", "Acessórios", "Moda praia"].map((c) => (
              <ChipFiltravel key={c} ativo={categorias.includes(c)} onAtivoChange={() => alternar(c)}>{c}</ChipFiltravel>
            ))}
          </GrupoDeOpcoes>
          <GrupoDeOpcoes titulo="Mostrar na lista" separado>
            <LinhaDeInterruptor rotulo="Só lojas novas" ajuda="Encontradas nos últimos 7 dias." checked={novas} onCheckedChange={setNovas} />
            <LinhaDeInterruptor rotulo="Avisar por e-mail" checked={aviso} onCheckedChange={setAviso} />
            <LinhaDeInterruptor rotulo="Mostrar lojas arquivadas" ajuda="Disponível para quem administra." disabled />
          </GrupoDeOpcoes>
        </Panel>
        <DoDont dos={["Legenda curta, com a ajuda dizendo quantas escolher."]} donts={["Fieldset sem legenda.", "Interruptor sem nome ao lado (o nome é o rótulo lido)."]} />
      </section>

      <section id="seletor-de-quantidade" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Seletor de quantidade" description="Menos, o número e mais: estoque por tamanho. O menos para no mínimo e o mais no máximo; o número pulsa de leve a cada mudança e é anunciado." />
        <Panel className="space-y-4 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="w-24 text-body-sm font-semibold text-foreground">Tamanho M</span>
            <SeletorDeQuantidade rotulo="Quantidade do tamanho M" valor={qtd} onValorChange={setQtd} max={10} />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="w-24 text-body-sm font-semibold text-foreground">Tamanho G</span>
            <SeletorDeQuantidade rotulo="Quantidade do tamanho G" valor={qtdG} onValorChange={setQtdG} max={10} />
          </div>
        </Panel>
      </section>

      <section id="caixa-de-codigo" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Caixa de código" description="Um código para copiar ou enviar (o vínculo do WhatsApp da loja): instrução, o código grande, a validade e as ações numa linha, alinhadas à borda do texto." />
        <div className="max-w-lg">
          <CaixaDeCodigo
            instrucao="Do WhatsApp da loja, mande esta mensagem:"
            codigo="FINDLOOK 4821"
            validade="O código vale por 30 minutos."
            acoes={<Button className="h-10 toque:h-11"><ExternalLink aria-hidden /> Abrir no WhatsApp</Button>}
          />
        </div>
        <p className="text-body-sm text-muted-foreground">Código de exemplo. O botão Copiar vira "Copiado" com o check por 2 segundos.</p>
      </section>

      <section id="botao-de-envio" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Botão de envio (enviando, feito e erro)" description="O próprio botão mostra o que acontece: girando e Enviando…, depois o check no verde de sucesso, e volta sozinho; com erro, vira Tentar de novo. A largura não pula entre os estados. Mesma API do DS Dani Moscatelli." />
        <Panel className="p-6 sm:p-8">
          <SubTitle>Experimente</SubTitle>
          <div className="flex flex-wrap items-center gap-3">
            <BotaoDeEnvio estado={salvar.estado} onVoltar={salvar.voltar} onClick={() => void salvar.enviar()} textos={{ enviando: "Salvando…", feito: "Salvo" }} icone={<Save aria-hidden />} className="h-10 w-full toque:h-11 sm:w-auto">Salvar alterações</BotaoDeEnvio>
            <BotaoDeEnvio variant="outline" estado={falhar.estado} onVoltar={falhar.voltar} onClick={() => void falhar.enviar()} icone={<Search aria-hidden />} textos={{ enviando: "Conferindo…", feito: "Conferido" }} className="h-10 w-full toque:h-11 sm:w-auto">Conferir de novo (simula erro)</BotaoDeEnvio>
          </div>
        </Panel>
        <DataTable head={["Estado", "O botão mostra"]} rows={[["parado", "ícone e texto da ação"], ["enviando", "ícone girando e \"Enviando…\" (textos.enviando); ocupado"], ["feito", "check e \"Enviado\" no verde; voltarApos (2,4 s) chama onVoltar"], ["erro", "\"Tentar de novo\"; diga o motivo perto do botão"]]} />
      </section>

      <section id="calendario" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Seletor de data (Calendar)" description="O mês para escolher uma data num campo. Com mouse, dias de 32 px; no toque, dias de 40 px com área de toque de 44 px, para o mês inteiro caber em 304 px e entrar num card de celular a partir de 320 px. O dia escolhido fica no rosa de selecionado e hoje tem contorno." />
        <Panel className="p-6 sm:p-8">
          <div className="mx-auto w-full rounded-xl border border-border bg-card sm:w-fit">
            <Calendar mode="single" selected={data} onSelect={setData} defaultMonth={new Date(2026, 10, 1)} />
          </div>
        </Panel>
      </section>

      <section id="campo-de-endereco" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Endereço com sugestões (CampoDeEndereco)" description="Sugere endereços enquanto a pessoa digita (a partir de 3 letras, depois de uma pequena pausa). Setas escolhem, Enter confirma, Esc fecha; sem resultado, a pessoa continua escrevendo à mão. Quem busca é o produto: passe a função buscar (por exemplo, buscaNoPhoton(), com dados do OpenStreetMap)." />
        <Panel className="p-6 sm:p-8">
          <DemoEndereco />
        </Panel>
        <DataTable head={["Prop", "O que faz"]} rows={[[<Mono>buscar(texto, sinal)</Mono>, "Devolve as sugestões { id, titulo, linha }; use o sinal para cancelar o pedido anterior."], [<Mono>valor · onValorChange</Mono>, "O texto do campo (a pessoa pode escrever o endereço inteiro sem escolher sugestão)."], [<Mono>onEscolher</Mono>, "Chamado ao escolher uma sugestão."], [<Mono>atraso · minimo</Mono>, "Espera depois da última tecla (350 ms) e letras mínimas para buscar (3)."], [<Mono>rotulo · ajuda · erro</Mono>, "Os mesmos do Campo."]]} />
      </section>
    </div>
  );
}
