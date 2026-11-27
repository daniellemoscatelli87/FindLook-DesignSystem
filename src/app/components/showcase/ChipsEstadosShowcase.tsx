import React, { useState } from "react";
import { AlertCircle, CheckCircle2, ClipboardCheck, Circle, GraduationCap, Info, Lock, MapPin, MessageCircle, Plus, SearchX, Sparkles, Star, Store, TriangleAlert, XCircle } from "lucide-react";
import { SectionHeader } from "./shared/SectionHeader";
import { DataTable, DoDont, Mono, Panel, SubTitle } from "./shared/Guidance";
import { ChipDeEstado } from "../ui/chip-de-estado";
import { ChipDeFiltro, ChipFiltravel, GrupoDeChips, ListaDeFiltrosAtivos } from "../ui/chips";
import { Badge } from "../ui/badge";
import { IconeComBase } from "../ui/painel-dados";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { EstadoVazio } from "../ui/estado-vazio";
import { Avaliacao } from "../ui/avaliacao";
import { TituloDeGrupo } from "../ui/titulo-de-grupo";
import { Button } from "../ui/button";
import { GradeDeCards } from "../ui/grade-de-cards";

/* Chips, etiquetas e estados: as peças de estado que o produto montava à mão (27/11/2026). */

const TIPOS = ["Loja", "Brechó", "Ateliê", "Outlet"];
const FILTROS_INICIAIS = ["Bairro: Batel", "Nota 4,5 ou mais", "Só lojas novas"];

export function ChipsEstadosShowcase() {
  const [tipos, setTipos] = useState<string[]>(["Brechó"]);
  const [filtros, setFiltros] = useState<string[]>(FILTROS_INICIAIS);
  return (
    <div className="space-y-16 pb-16">
      <section id="chip-de-estado" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Chip de estado" description="O estado de um item (etapa da loja, situação da peça) sempre em texto, com ícone opcional, na pílula do tom. Mesma API do Chip de estado do DS Dani Moscatelli. Para os cinco estados de informação fixos, use o StatusChip." />
        <Panel className="space-y-4 p-6 sm:p-8">
          <div className="flex flex-wrap gap-2">
            <ChipDeEstado icone={<Circle />}>A contatar</ChipDeEstado>
            <ChipDeEstado tom="aviso" icone={<MessageCircle />}>Contato</ChipDeEstado>
            <ChipDeEstado tom="aviso" icone={<MapPin />}>Visita</ChipDeEstado>
            <ChipDeEstado tom="marca" icone={<ClipboardCheck />}>Cadastro</ChipDeEstado>
            <ChipDeEstado tom="info" icone={<GraduationCap />}>Treinamento</ChipDeEstado>
            <ChipDeEstado tom="sucesso" icone={<CheckCircle2 />}>Ativa</ChipDeEstado>
            <ChipDeEstado tom="erro" icone={<XCircle />}>Sem interesse</ChipDeEstado>
          </div>
          <div className="flex flex-wrap gap-2">
            <ChipDeEstado tamanho="md" tom="sucesso" icone={<CheckCircle2 />}>Publicada</ChipDeEstado>
            <ChipDeEstado tamanho="md" tom="aviso" icone={<AlertCircle />}>Pendente</ChipDeEstado>
          </div>
        </Panel>
        <DataTable head={["Prop", "Valores"]} rows={[[<Mono>tom</Mono>, "marca · neutro (padrão) · sucesso · info · aviso · erro"], [<Mono>tamanho</Mono>, "sm (24 px, listas) · md (28 px)"], [<Mono>icone</Mono>, "ícone lucide de 14 px (opcional)"]]} />
        <DoDont dos={["O mesmo tom para o mesmo sentido na tela inteira.", "Na linha da lista, o chip vai na coluna do fim."]} donts={["Estado só por cor, sem texto.", "Mais de quatro tons numa lista."]} />
      </section>

      <section id="chips-filtro" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Chips filtráveis e filtros aplicados" description="O chip filtrável liga e desliga um filtro (ligado no rosa do selecionado com o check; hover cinza). O chip de filtro mostra um filtro já aplicado, que sai com um toque, e a lista termina com Limpar filtros na mesma linha." />
        <Panel className="space-y-6 p-6 sm:p-8">
          <div className="space-y-3">
            <SubTitle>ChipFiltravel em GrupoDeChips</SubTitle>
            <GrupoDeChips rotulo="Tipo de estabelecimento">
              {TIPOS.map((t, i) => (
                <ChipFiltravel key={t} ativo={tipos.includes(t)} contagem={[42, 17, 6, 3][i]} onAtivoChange={(v) => setTipos((l) => (v ? [...l, t] : l.filter((x) => x !== t)))}>{t}</ChipFiltravel>
              ))}
            </GrupoDeChips>
            <p className="m-0 text-label text-muted-foreground">Contagens de exemplo.</p>
          </div>
          <div className="space-y-3">
            <SubTitle>ChipDeFiltro em ListaDeFiltrosAtivos</SubTitle>
            {filtros.length > 0 ? (
              <ListaDeFiltrosAtivos onLimparTudo={() => setFiltros([])}>
                {filtros.map((f) => <ChipDeFiltro key={f} rotulo={f} onRemover={() => setFiltros((l) => l.filter((x) => x !== f))} />)}
              </ListaDeFiltrosAtivos>
            ) : (
              <Button variant="outline" className="h-10 toque:h-11" onClick={() => setFiltros(FILTROS_INICIAIS)}>Mostrar os filtros de novo</Button>
            )}
          </div>
        </Panel>
        <DoDont dos={["Chips quebram de linha; nunca rolam para o lado.", "Para uma escolha só, use o Controle segmentado."]} donts={["Chip ligado preenchido de pink.", "Hover rosa no chip desligado."]} />
      </section>

      <section id="etiquetas-tons" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Etiquetas e bases de ícone por tom" description="O Badge ganhou os tons (etiqueta retangular para atributos: Nova, Revisar tipo, Editada à mão) e o IconeComBase ganhou os tons de estado, além de marca e neutro." />
        <Panel className="space-y-6 p-6 sm:p-8">
          <div className="space-y-3">
            <SubTitle>Badge variant</SubTitle>
            <div className="flex flex-wrap gap-2">
              <Badge variant="marca"><Sparkles aria-hidden /> Nova</Badge>
              <Badge variant="neutro"><Lock aria-hidden /> Editada à mão</Badge>
              <Badge variant="aviso"><TriangleAlert aria-hidden /> Revisar tipo</Badge>
              <Badge variant="erro"><XCircle aria-hidden /> Fechada</Badge>
              <Badge variant="sucesso"><CheckCircle2 aria-hidden /> Conferida</Badge>
              <Badge variant="info"><Info aria-hidden /> Google</Badge>
            </div>
          </div>
          <div className="space-y-3">
            <SubTitle>IconeComBase tom</SubTitle>
            <div className="flex flex-wrap gap-3">
              <IconeComBase tom="marca"><Store /></IconeComBase>
              <IconeComBase tom="neutro"><Store /></IconeComBase>
              <IconeComBase tom="sucesso"><CheckCircle2 /></IconeComBase>
              <IconeComBase tom="aviso"><AlertCircle /></IconeComBase>
              <IconeComBase tom="erro"><TriangleAlert /></IconeComBase>
              <IconeComBase tom="info"><Info /></IconeComBase>
            </div>
          </div>
        </Panel>
        <DoDont dos={["Etiqueta (retângulo) para atributo; chip (pílula) para estado.", "Tom de estado na base só quando o ícone diz o estado."]} donts={["Base colorida só para enfeitar uma grade de cards iguais (use neutro)."]} />
      </section>

      <section id="alerta-tom" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Alerta com tom" description="O Alert aceita tom (info, sucesso, aviso, erro), com os mesmos nomes do Alerta com ação, e põe sozinho o ícone de cada estado. Sem título, a frase vira a mensagem principal." />
        <GradeDeCards className="gap-4 md:grid-cols-2">
          <Alert tom="erro"><AlertDescription>E-mail ou senha incorretos.</AlertDescription></Alert>
          <Alert tom="sucesso"><AlertTitle>Alterações salvas</AlertTitle><AlertDescription>A ficha da loja foi atualizada.</AlertDescription></Alert>
          <Alert tom="aviso"><AlertDescription>Sem internet. As mudanças serão enviadas quando a conexão voltar.</AlertDescription></Alert>
          <Alert tom="info"><AlertTitle>Busca em andamento</AlertTitle><AlertDescription>Novas lojas aparecem na lista assim que forem encontradas.</AlertDescription></Alert>
        </GradeDeCards>
        <DataTable head={["Prop", "O que faz"]} rows={[[<Mono>tom</Mono>, "info · sucesso · aviso · erro: liga a variante e o ícone"], [<Mono>icone</Mono>, "troca o ícone; icone={false} tira"]]} />
      </section>

      <section id="estado-vazio" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Estado vazio" description="O que aparece quando uma lista, uma busca ou uma área ainda não tem nada: o que está vazio, por quê (quando ajuda) e o próximo passo. Com ilustração do mascote, ícone ou só texto." />
        <GradeDeCards className="gap-4 md:grid-cols-2">
          <EstadoVazio variante="card" ilustracao={`${import.meta.env.BASE_URL}ilustracoes/findlook-sem-lojas-locais.webp`} titulo="Nenhuma loja por perto ainda" texto="Quando lojas do seu bairro entrarem na FindLook, elas aparecem aqui." acao={<Button variant="outline" className="h-10 toque:h-11">Indicar uma loja</Button>} />
          <EstadoVazio variante="card" icone={<SearchX />} titulo="Nenhuma loja com esses filtros" texto="Tire um filtro ou procure por outro bairro." acao={<Button variant="outline" className="h-10 toque:h-11">Limpar filtros</Button>} />
        </GradeDeCards>
        <GradeDeCards className="gap-4 md:grid-cols-2">
          <EstadoVazio icone={<Plus />} tom="marca" titulo="Cadastre sua primeira peça" texto="Peças publicadas aparecem para quem procura na região." acao={<Button className="h-10 toque:h-11"><Plus aria-hidden /> Cadastrar peça</Button>} />
          <EstadoVazio tamanho="sm" titulo="Nada agendado para hoje" texto="Os contatos e visitas marcados aparecem aqui." />
        </GradeDeCards>
        <DataTable head={["Prop", "Valores"]} rows={[[<Mono>variante</Mono>, "tracejado (padrão, no lugar de uma lista) · card (sozinho na página) · simples (dentro de um card)"], [<Mono>ilustracao · icone · tom</Mono>, "imagem do mascote, ou ícone na base cinza (ou rosa com tom=\"marca\")"], [<Mono>tamanho</Mono>, "md (padrão) · sm (colunas estreitas)"], [<Mono>acao · nivel</Mono>, "botões; nível do título quando o vazio é o conteúdo principal"]]} />
        <DoDont dos={["Diga o próximo passo.", "Uma ação principal só."]} donts={["\"Ops!\" ou culpa em quem usa.", "Inventar números ou motivos."]} />
      </section>

      <section id="avaliacao-e-grupos" className="scroll-mt-32 space-y-6">
        <SectionHeader title="Avaliação e título de grupo" description="A nota de uma loja com a estrela e o número de avaliações, e o título que separa os grupos de uma lista com o contador ao lado." />
        <Panel className="space-y-6 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-6">
            <Avaliacao nota={4.6} total={128} fonte="informada na ficha" />
            <Avaliacao nota={4} total={1} tamanho="md" />
            <Avaliacao nota={null} />
          </div>
          <div className="space-y-3">
            <TituloDeGrupo titulo="Atrasados" quantidade={2} icone={<AlertCircle />} item="agendamento" itens="agendamentos" />
            <TituloDeGrupo titulo="Hoje" quantidade={5} item="agendamento" itens="agendamentos" />
            <TituloDeGrupo titulo="Melhor avaliadas" quantidade={12} icone={<Star />} item="loja" itens="lojas" />
          </div>
          <p className="m-0 text-label text-muted-foreground">Notas e contagens de exemplo.</p>
        </Panel>
      </section>
    </div>
  );
}
