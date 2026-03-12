# Spec: Redesign da Seção "Acompanhe Nossa Jornada"

**Data:** 2026-03-12
**Status:** Aprovado

---

## Contexto

A seção `SocialMedia` contém atualmente dois subsections: um feed do Instagram (via widget Elfsight) e um player do YouTube (iframe embed). O visual está aquém do padrão do restante do site — o Elfsight tem branding pesado e o player do YouTube não tem consistência visual com a identidade da Casa da Alquimia.

---

## Objetivo

Remover o player do YouTube e substituir o widget Elfsight por um feed do Instagram mais limpo, usando o Behold.so (plano gratuito). O resultado deve ser um grid editorial limpo, próximo à referência fornecida (grid 3×3, imagens quadradas, sem ruído visual).

---

## O que muda

### Remoções
- `YouTubeSection.tsx` — arquivo deletado
- Import e uso de `YouTubeSection` em `SocialMedia.tsx` — removidos
- Script do Elfsight (`static.elfsight.com/platform/platform.js`) — removido
- Div `.elfsight-app-*` — removida

### Modificações

**`SocialMedia.tsx`**
- Remove a `div` wrapper do `YouTubeSection` e o espaçamento `space-y-20` (não há mais dois blocos)
- O layout passa a renderizar apenas o `InstagramSection`
- Estrutura simplificada: header + feed centralizado

**`InstagramSection.tsx`** — reescrito
- Carrega o script do Behold.so de forma lazy (via `useEffect` com `isVisible`), idêntico ao comportamento atual do Elfsight
- Script: `https://w.behold.so/widget.js` — **obrigatório** definir `script.type = "module"` antes de anexar ao DOM; o widget usa ES module syntax e falha silenciosamente sem este atributo
- Renderiza a div `<div data-behold-id="SEU_WIDGET_ID"></div>` **fora** de qualquer condicional de visibilidade (deve existir no DOM antes do script executar)
- Abaixo do widget: link `@casadaalquimia` alinhado à esquerda + botão "Seguir no Instagram" alinhado à direita, na mesma linha de rodapé

---

## Layout da seção

```
[Header existente]
  "Conecte-se Conosco" (badge)
  "Acompanhe Nossa Jornada" (título)
  Subtítulo descritivo

[Feed Behold.so — grid 3×3 configurado no painel do Behold]
  ↳ min-height: 400px (evita layout shift enquanto carrega)
  ↳ div data-behold-id renderizada incondicionalmente (sem wrapper isVisible)

[Rodapé do feed — flex justify-between items-center]
  [@casadaalquimia →] (link à esquerda)
  [Seguir no Instagram] (botão à direita)
```

---

## Configuração do Behold.so

A configuração do grid (número de colunas, gap, forma das imagens) é feita no painel do Behold.so, não no código. O desenvolvedor precisa:

1. Criar conta em [behold.so](https://behold.so)
2. Conectar o Instagram `@casadaalquimia`
3. Criar um widget com layout grid 3×3, imagens quadradas
4. Copiar o `Widget ID` gerado
5. Substituir o placeholder `SEU_WIDGET_ID` no componente

---

## Arquivos afetados

| Arquivo | Ação |
|---------|------|
| `src/components/social/YouTubeSection.tsx` | Deletar |
| `src/components/social/InstagramSection.tsx` | Reescrever |
| `src/components/SocialMedia.tsx` | Remover YouTubeSection + simplificar layout |
| `index.html` | Remover `<link rel="preconnect" href="https://static.elfsight.com" />`; adicionar `<link rel="preconnect" href="https://w.behold.so" />` |

---

## Comportamento de loading

- O script do Behold é injetado via `useEffect` apenas quando `isVisible === true` — evita carregamento para usuários que não rolam até a seção
- O script **deve** ter `type="module"` definido antes de ser anexado ao DOM
- A `<div data-behold-id="...">` é renderizada **incondicionalmente** (independente de `isVisible`) — o Behold usa um `MutationObserver` para detectar o elemento, mas há risco de race condition se o elemento não estiver no DOM quando o script executar
- `min-height: 400px` no container do widget previne layout shift

### Verificação de race condition
Após implementar, testar em conexão rápida: o grid deve preencher corretamente. Se aparecer vazio, significa que o script executou antes do React commitar o elemento. A solução é garantir que o elemento `data-behold-id` não esteja dentro de nenhum `{isVisible && ...}` condicional.

---

## O que não muda

- Header da seção (badge, título, subtítulo, animações de entrada)
- ID da seção (`id="social-media"`, `id="instagram"`)
- Link de navegação no Navbar (`#instagram`)
- Paleta de cores e tipografia

---

## Estilo do botão "Seguir no Instagram"

Usar o componente `<Button>` do projeto com `variant="outline"` e as classes de cor da identidade do site:

```tsx
<Button
  variant="outline"
  className="border-primary/30 text-primary hover:bg-primary/10"
  asChild
>
  <a href="https://www.instagram.com/casadaalquimia/" target="_blank" rel="noopener noreferrer">
    <Instagram className="h-4 w-4 mr-2" />
    Seguir no Instagram
  </a>
</Button>
```

---

## Fora de escopo

- Redes sociais no Footer (já existem, não precisam de alteração)
- SpotifyPlayer (componente independente, não relacionado)
- Qualquer mudança no design do header da seção
