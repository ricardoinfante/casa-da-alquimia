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
- Script: `https://w.behold.so/widget.js` (type="module")
- Renderiza a div `<div data-behold-id="SEU_WIDGET_ID"></div>`
- Acima do widget: link `@casadaalquimia` alinhado à direita
- Abaixo do widget: botão "Seguir no Instagram" centralizado com ícone do Instagram

---

## Layout da seção

```
[Header existente]
  "Conecte-se Conosco" (badge)
  "Acompanhe Nossa Jornada" (título)
  Subtítulo descritivo

[Feed Behold.so — grid 3×3 configurado no painel do Behold]
  ↳ min-height: 400px (evita layout shift enquanto carrega)

[Rodapé do feed]
  [@casadaalquimia →] (link para o perfil)
  [Seguir no Instagram] (botão secundário, centralizado)
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

---

## Comportamento de loading

- O script do Behold é injetado via `useEffect` apenas quando `isVisible === true`
- Evita carregamento desnecessário para usuários que não rolam até a seção
- `min-height: 400px` no container do widget previne layout shift

---

## O que não muda

- Header da seção (badge, título, subtítulo, animações de entrada)
- ID da seção (`id="social-media"`, `id="instagram"`)
- Link de navegação no Navbar (`#instagram`)
- Paleta de cores e tipografia

---

## Fora de escopo

- Redes sociais no Footer (já existem, não precisam de alteração)
- SpotifyPlayer (componente independente, não relacionado)
- Qualquer mudança no design do header da seção
