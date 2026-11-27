import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ClipboardCheck, Loader2 } from "lucide-react";
import { AlertaComAcao, BotaoDoAlerta, LinkDoAlerta, type TomDoAlerta } from "../ui/alerta-com-acao";
import { Callout, DoDont, Mono, Panel } from "./shared/Guidance";

/**
 * Documentação do Alerta com ação (aprovado pela dona do produto em 23/11/2026).
 * Textos de exemplo iguais aos da proposta aprovada (mock11).
 */

function Rotulo({ children }: { children: React.ReactNode }) {
  return <h4 className="mb-4 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{children}</h4>;
}

/* Exemplo do painel da loja, com a ação simulada: carregando, depois o alerta passa para sucesso. */
function DemoAvisoDaLoja() {
  const [fase, setFase] = useState<"aviso" | "confirmando" | "confirmado">("aviso");
  const area = useRef<HTMLDivElement>(null);
  const primeiraVez = useRef(true);
  useEffect(() => {
    if (fase !== "confirmando") return;
    const id = window.setTimeout(() => setFase("confirmado"), 700);
    return () => window.clearTimeout(id);
  }, [fase]);
  // O botão clicado some: o foco vai para a ação seguinte visível
  useEffect(() => {
    if (primeiraVez.current) { primeiraVez.current = false; return; }
    if (fase === "confirmando") return;
    area.current?.querySelector<HTMLElement>(fase === "confirmado" ? '[data-slot="link-do-alerta"]' : '[data-slot="botao-do-alerta"]')?.focus();
  }, [fase]);

  return (
    <div ref={area}>
      {fase === "confirmado" ? (
        <AlertaComAcao
          tom="sucesso"
          titulo="Peças conferidas hoje"
          acoes={<>
            <BotaoDoAlerta><ArrowRight aria-hidden />Ver peças</BotaoDoAlerta>
            <LinkDoAlerta onClick={() => setFase("aviso")}>Ver o aviso de novo</LinkDoAlerta>
          </>}
        >
          Elas continuam aparecendo para quem procura no FindLook.
        </AlertaComAcao>
      ) : (
        <AlertaComAcao
          tom="aviso"
          titulo="Sua loja vai ficar pausada na quarta-feira"
          acoes={
            <BotaoDoAlerta onClick={() => fase === "aviso" && setFase("confirmando")} aria-busy={fase === "confirmando"}>
              {fase === "confirmando"
                ? <><Loader2 aria-hidden className="animate-spin motion-reduce:animate-none" />Confirmando…</>
                : <><ClipboardCheck aria-hidden />Confirmar que estão em dia</>}
            </BotaoDoAlerta>
          }
        >
          <p>Faz 3 dias úteis que não recebemos notícias das suas vendas. Com a loja pausada, as peças deixam de aparecer para quem procura no FindLook, para ninguém procurar uma peça que já foi vendida. Confirme para elas continuarem aparecendo.</p>
          <p><strong>Vendeu alguma peça?</strong> Marque como <strong>“vendida”</strong> antes de confirmar.</p>
        </AlertaComAcao>
      )}
    </div>
  );
}

function DemoInfoFechavel() {
  const [aberto, setAberto] = useState(true);
  const area = useRef<HTMLDivElement>(null);
  const primeiraVez = useRef(true);
  useEffect(() => {
    if (primeiraVez.current) { primeiraVez.current = false; return; }
    area.current?.querySelector<HTMLElement>(aberto ? '[data-slot="botao-do-alerta"]' : "button")?.focus();
  }, [aberto]);
  return (
    <div ref={area} className="h-full">
      {aberto ? (
        <AlertaComAcao
          tom="info"
          titulo="Nova versão do catálogo"
          onFechar={() => setAberto(false)}
          className="h-full"
          acoes={<>
            <BotaoDoAlerta>Ver o que mudou</BotaoDoAlerta>
            <LinkDoAlerta onClick={() => setAberto(false)}>Agora não</LinkDoAlerta>
          </>}
        >
          As peças agora mostram o tamanho na lista. Você pode mudar isso nas configurações.
        </AlertaComAcao>
      ) : (
        <div className="flex h-full min-h-[120px] flex-col items-start justify-center gap-3 rounded-lg border border-dashed border-border px-[22px] py-5">
          <p className="text-[0.875rem] text-muted-foreground">Você fechou o aviso.</p>
          <LinkDoAlerta onClick={() => setAberto(true)}>Mostrar de novo</LinkDoAlerta>
        </div>
      )}
    </div>
  );
}

const CONTRASTES: { tom: TomDoAlerta; nome: string; token: string; valor: string; contraste: string }[] = [
  { tom: "info", nome: "Info", token: "--info-text", valor: "#2E6E98", contraste: "5,1:1" },
  { tom: "sucesso", nome: "Sucesso", token: "--success-text", valor: "#2B7553", contraste: "5,1:1" },
  { tom: "aviso", nome: "Aviso", token: "--warning-text", valor: "#A66200", contraste: "4,5:1" },
  { tom: "erro", nome: "Erro", token: "--error-text", valor: "#B91B35 (= --primary-text)", contraste: "5,7:1" },
];

const BORDA_DO_TOM: Record<TomDoAlerta, string> = {
  info: "border-info",
  sucesso: "border-success",
  aviso: "border-warning",
  erro: "border-error",
};

const exemploDeCodigo = `import { AlertaComAcao, BotaoDoAlerta, LinkDoAlerta } from "@/app/components/ui/alerta-com-acao";

<AlertaComAcao
  tom="aviso"
  titulo="WhatsApp sem confirmação"
  acoes={<>
    <BotaoDoAlerta onClick={confirmar}>Confirmar número</BotaoDoAlerta>
    <LinkDoAlerta onClick={adiar}>Lembrar depois</LinkDoAlerta>
  </>}
>
  O número da loja ainda não foi confirmado. Sem ele, não dá para cadastrar peças.
</AlertaComAcao>`;

export function AlertaComAcaoDoc() {
  return (
    <div className="space-y-10">
      <div>
        <h3 className="font-[family-name:var(--font-display)] text-[1.25rem] font-semibold tracking-[-0.01em] text-foreground">Alerta com ação</h3>
        <p className="mt-1 max-w-3xl text-[0.9375rem] leading-relaxed text-muted-foreground">
          Aviso que pede uma ação de quem lê: ícone com base, título, descrição e, embaixo do texto, uma ação principal de contorno e, se precisar, uma secundária em forma de link. Componente <Mono>AlertaComAcao</Mono>, com <Mono>BotaoDoAlerta</Mono> e <Mono>LinkDoAlerta</Mono>, em <Mono>ui/alerta-com-acao.tsx</Mono>.
        </p>
      </div>

      <div>
        <Rotulo>Exemplo: aviso no painel da loja</Rotulo>
        <DemoAvisoDaLoja />
      </div>

      <div>
        <Rotulo>Com destaque e lista de condições (destaque, itens; textos de exemplo)</Rotulo>
        <AlertaComAcao
          tom="info"
          destaque
          titulo="Requisitos para participar"
          itens={[
            { texto: "Pelo menos 15 dias de cadastro", cumprido: true },
            { texto: "8 pedidos respondidos", cumprido: true },
            { texto: "3 avaliações recebidas", cumprido: false },
          ]}
        >
          Para participar, sua conta precisa:
        </AlertaComAcao>
      </div>

      <div>
        <Rotulo>Os 4 estados (textos de exemplo)</Rotulo>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <DemoInfoFechavel />
          <AlertaComAcao tom="sucesso" titulo="Peças conferidas hoje" acoes={<BotaoDoAlerta><ArrowRight aria-hidden />Ver peças</BotaoDoAlerta>}>
            Elas continuam aparecendo para quem procura no FindLook.
          </AlertaComAcao>
          <AlertaComAcao tom="aviso" titulo="WhatsApp sem confirmação" acoes={<><BotaoDoAlerta>Confirmar número</BotaoDoAlerta><LinkDoAlerta>Lembrar depois</LinkDoAlerta></>}>
            O número da loja ainda não foi confirmado. Sem ele, não dá para cadastrar peças.
          </AlertaComAcao>
          <AlertaComAcao tom="erro" titulo="Sua loja está pausada" acoes={<><BotaoDoAlerta>Confirmar e voltar a aparecer</BotaoDoAlerta><LinkDoAlerta>Ver peças</LinkDoAlerta></>}>
            Suas peças não aparecem para quem procura no FindLook. Confirme para elas voltarem a aparecer.
          </AlertaComAcao>
        </div>
      </div>

      <div>
        <Rotulo>Regras de uso</Rotulo>
        <DoDont
          dos={[
            "Coloque as ações embaixo do texto, nunca ao lado.",
            "Use uma só ação principal, de contorno (BotaoDoAlerta), na cor do estado.",
            "Se precisar de uma segunda ação, use o link (LinkDoAlerta).",
            "Destaque com <strong> só o que a pessoa precisa ver: seminegrito, na cor do texto principal.",
            "Use role=\"alert\" em aviso e erro e role=\"status\" em info e sucesso (o componente já faz isso).",
          ]}
          donts={[
            "Variar o tamanho do texto dentro do card: só o título tem 15 px; descrição, nota e botões têm 14 px.",
            "Preencher o botão principal ou usar mais de um botão de contorno.",
            "Usar a cor do estado no texto do botão: o texto usa a cor de texto do estado (tabela abaixo).",
            "Usar o alerta com ação só para informar: sem ação, use o Alerta simples.",
          ]}
        />
      </div>

      <div>
        <Rotulo>Cores de texto dos botões e contraste</Rotulo>
        <Panel className="divide-y divide-border">
          {CONTRASTES.map(c => (
            <div key={c.tom} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3.5">
              <span aria-hidden className={`h-6 w-6 shrink-0 rounded-sm border-[1.5px] ${BORDA_DO_TOM[c.tom]}`} style={{ backgroundColor: `var(${c.token})` }} />
              <span className="min-w-[7.5rem] text-[0.875rem] font-semibold text-foreground">{c.nome}</span>
              <Mono>{c.token}</Mono>
              <span className="text-[0.8125rem] text-muted-foreground">{c.valor}</span>
              <span className="text-[0.8125rem] font-semibold text-foreground sm:ml-auto">{c.contraste} no fundo do alerta</span>
            </div>
          ))}
        </Panel>
        <p className="mt-3 max-w-3xl text-[0.8125rem] leading-relaxed text-muted-foreground">
          <Mono>--info-text</Mono>, <Mono>--success-text</Mono> e <Mono>--error-text</Mono> são novos (23/11/2026): servem só para texto e ícone sobre fundo claro. No tema escuro, <Mono>--info-text</Mono> e <Mono>--success-text</Mono> apontam para <Mono>--info</Mono> e <Mono>--success</Mono>, como o <Mono>--warning-text</Mono>; o <Mono>--error-text</Mono> aponta para o <Mono>--primary-text</Mono> nos dois temas. O link usa <Mono>--foreground</Mono>, com sublinhado a 35% que fica inteiro no hover.
        </p>
      </div>

      <div className="space-y-3">
        <Rotulo>Quando usar</Rotulo>
        <Callout title="Todos os alertas seguem este padrão">
          O Alerta simples (<Mono>Alert</Mono>) tem a mesma aparência: ícone com base, título de 15 px e o resto em 14 px. Use o <strong className="font-semibold text-foreground">Alerta simples</strong> para informar um estado sem pedir nada (alterações salvas, falha ao enviar). Use o <strong className="font-semibold text-foreground">Alerta com ação</strong> quando a pessoa precisa fazer algo para resolver ou evitar o problema. Para retorno passageiro de uma ação, use o toast.
        </Callout>
      </div>

      <div>
        <Rotulo>Como usar</Rotulo>
        <pre className="whitespace-pre-wrap break-words rounded-lg border border-border bg-card p-4 text-[0.75rem] leading-relaxed text-muted-foreground"><code>{exemploDeCodigo}</code></pre>
      </div>
    </div>
  );
}
