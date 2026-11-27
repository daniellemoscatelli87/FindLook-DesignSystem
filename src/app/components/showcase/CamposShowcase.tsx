import React, { useState } from "react";
import { ExternalLink, Mail, Save, Search, Store } from "lucide-react";
import { SectionHeader } from "./shared/SectionHeader";
import { DataTable, DoDont, Mono, Panel, SubTitle } from "./shared/Guidance";
import { Campo } from "../ui/campo";
import { CampoDeBusca } from "../ui/campo-de-busca";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { GrupoDeOpcoes, LinhaDeInterruptor } from "../ui/grupo-de-opcoes";
import { ChipFiltravel } from "../ui/chips";
import { SeletorDeQuantidade } from "../ui/seletor-de-quantidade";
import { CaixaDeCodigo } from "../ui/caixa-de-codigo";
import { BotaoComRetorno, useRetornoDoBotao } from "../ui/botao-com-retorno";
import { Button } from "../ui/button";
import { GradeDeCampos } from "../ui/cadastro-lojista";

/* Campos e formulários: o campo padrão e as peças de formulário que o produto montava à mão (27/11/2026). */

export function CamposShowcase() {
  const [email, setEmail] = useState("ana@");
  const [busca, setBusca] = useState("");
  const [descricao, setDescricao] = useState("Vestido midi de linho, com botões na frente e bolsos.");
  const [categorias, setCategorias] = useState<string[]>(["Feminino"]);
  const [novas, setNovas] = useState(true);
  const [aviso, setAviso] = useState(false);
  const [qtd, setQtd] = useState(2);
  const [qtdG, setQtdG] = useState(0);
  const salvar = useRetornoDoBotao(() => new Promise((r) => setTimeout(r, 1200)));
  const falhar = useRetornoDoBotao(() => new Promise((_, rej) => setTimeout(rej, 1200)));
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
            <Campo rotulo="Nome da loja" icone={<Store />} placeholder="Ateliê Aurora" ajuda="Como aparece para quem procura." />
            <Campo rotulo="E-mail" type="email" icone={<Mail />} value={email} onChange={(e) => setEmail(e.target.value)} erro={erroEmail} />
            <Campo rotulo="Senha" type="password" autoComplete="new-password" ajuda="Use pelo menos 8 caracteres." />
            <Campo rotulo="Instagram" opcional placeholder="@sualoja" />
          </GradeDeCampos>
        </Panel>
        <DataTable
          head={["Prop", "O que faz"]}
          rows={[
            [<Mono>rotulo · ajuda · erro</Mono>, "Rótulo visível; ajuda embaixo; o erro substitui a ajuda e liga aria-invalid."],
            [<Mono>opcional</Mono>, "Escreve \"(opcional)\" depois do rótulo. Marque o que é opcional, não o obrigatório."],
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
          <CampoDeBusca rotulo="Buscar loja" valor={busca} onValorChange={setBusca} placeholder="Nome, bairro, endereço ou Instagram" classeDoBloco="max-w-md" />
          <CampoDeBusca rotulo="Buscar peça" rotuloVisivel valor={busca} onValorChange={setBusca} placeholder="Ex.: vestido midi" classeDoBloco="max-w-md" />
        </Panel>
      </section>

      <section id="campo-texto-longo" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Texto longo com contador" description="Textarea com contador (prop contador e maxLength): cinza com folga, aviso quando faltam 10% e erro no limite. Leitores de tela só ouvem o aviso quando faltam 20 caracteres ou menos." />
        <Panel className="p-6 sm:p-8">
          <div className="max-w-lg space-y-2">
            <Label htmlFor="descricao-peca" className="text-body-sm font-semibold">Descrição da peça</Label>
            <Textarea id="descricao-peca" contador maxLength={120} value={descricao} onChange={(e) => setDescricao(e.target.value)} className="bg-card" />
          </div>
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

      <section id="botao-com-retorno" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Botão com retorno (carregando, sucesso e erro)" description="O próprio botão mostra o que acontece: girando e Salvando…, depois o check e Salvo, e volta sozinho. A largura não pula entre os estados." />
        <Panel className="p-6 sm:p-8">
          <SubTitle>Experimente</SubTitle>
          <div className="flex flex-wrap items-center gap-3">
            <BotaoComRetorno estado={salvar.estado} onClick={() => void salvar.executar()} icone={<Save aria-hidden />} className="h-10 w-full toque:h-11 sm:w-auto">Salvar alterações</BotaoComRetorno>
            <BotaoComRetorno variant="outline" estado={falhar.estado} onClick={() => void falhar.executar()} icone={<Search aria-hidden />} textoCarregando="Conferindo…" textoSucesso="Conferido" textoErro="Não deu certo" className="h-10 w-full toque:h-11 sm:w-auto">Conferir de novo (simula erro)</BotaoComRetorno>
          </div>
        </Panel>
        <DataTable head={["Estado", "O botão mostra"]} rows={[["parado", "ícone e texto da ação"], ["carregando", "ícone girando e \"Salvando…\"; desabilitado"], ["sucesso", "check e \"Salvo\" por 2 s"], ["erro", "alerta e \"Não deu certo\" por 2,5 s; diga o motivo perto do botão"]]} />
      </section>
    </div>
  );
}
