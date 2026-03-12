# Instagram Feed Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remover o player do YouTube e substituir o widget Elfsight pelo Behold.so na seção "Acompanhe Nossa Jornada".

**Architecture:** Reescrever `InstagramSection.tsx` para usar o embed do Behold.so com carregamento lazy; remover `YouTubeSection.tsx` por completo; simplificar `SocialMedia.tsx` para renderizar apenas o feed; atualizar `index.html` para trocar o preconnect hint.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Behold.so (widget embed)

---

## Pré-requisito obrigatório

> **Antes de implementar**, o Widget ID do Behold.so deve estar disponível.
>
> Passos para obter o Widget ID:
> 1. Criar conta gratuita em https://behold.so
> 2. Conectar o Instagram `@casadaalquimia`
> 3. Criar um widget com layout **grid**, **3 colunas**, imagens **quadradas**
> 4. Copiar o **Widget ID** gerado (formato: string alfanumérica)
> 5. Substituir `SEU_WIDGET_ID` no Passo 2 deste plano pelo ID real

---

## Chunk 1: Todas as alterações

### Mapa de arquivos

| Arquivo | Ação |
|---------|------|
| `index.html` | Modificar — trocar preconnect do Elfsight pelo Behold |
| `src/components/social/InstagramSection.tsx` | Reescrever completamente |
| `src/components/SocialMedia.tsx` | Modificar — remover YouTubeSection |
| `src/components/social/YouTubeSection.tsx` | Deletar |

---

### Tarefa 1: Atualizar preconnect no index.html

**Arquivo:** `index.html`

- [ ] **Passo 1.1: Trocar o preconnect hint**

Localizar a linha com o preconnect do Elfsight e substituir:

```diff
- <link rel="preconnect" href="https://static.elfsight.com" />
+ <link rel="preconnect" href="https://w.behold.so" />
```

- [ ] **Passo 1.2: Verificar no browser**

Abrir `http://localhost:8086` (ou a porta ativa do dev server) e confirmar que a página carrega sem erros no console.

- [ ] **Passo 1.3: Commit**

```bash
git add index.html
git commit -m "chore: swap elfsight preconnect for behold.so"
```

---

### Tarefa 2: Reescrever InstagramSection.tsx

**Arquivo:** `src/components/social/InstagramSection.tsx`

- [ ] **Passo 2.1: Substituir o conteúdo completo do arquivo**

```tsx
import React, { useEffect } from 'react';
import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Substitua pelo Widget ID gerado no painel do Behold.so
const BEHOLD_WIDGET_ID = 'SEU_WIDGET_ID';

interface InstagramSectionProps {
  isVisible: boolean;
}

const InstagramSection = ({ isVisible }: InstagramSectionProps) => {
  useEffect(() => {
    if (isVisible && !document.querySelector('script[src="https://w.behold.so/widget.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://w.behold.so/widget.js';
      script.type = 'module';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isVisible]);

  return (
    <div id="instagram">
      {/* Widget container — renderizado incondicionalmente para o MutationObserver do Behold encontrar o elemento */}
      <div className="min-h-[400px] w-full">
        <div data-behold-id={BEHOLD_WIDGET_ID}></div>
      </div>

      {/* Rodapé do feed */}
      <div className="flex items-center justify-between mt-4">
        <a
          href="https://www.instagram.com/casadaalquimia/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-highlight hover:text-highlight/80 flex items-center text-sm font-medium transition-colors link-underline"
        >
          @casadaalquimia <span className="ml-2">→</span>
        </a>

        <Button
          asChild
          variant="outline"
          className="bg-azul-2/10 border border-azul-2/20 text-azul-2 hover:bg-azul-2/15"
        >
          <a
            href="https://www.instagram.com/casadaalquimia/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Instagram className="h-4 w-4" />
            Seguir no Instagram
          </a>
        </Button>
      </div>
    </div>
  );
};

export default InstagramSection;
```

- [ ] **Passo 2.2: Verificar que o TypeScript compila sem erros**

```bash
npx tsc --noEmit
```

Esperado: nenhum erro de tipo.

- [ ] **Passo 2.3: Verificar visualmente no browser**

Rolar até a seção "Acompanhe Nossa Jornada". O widget do Behold deve aparecer com o grid de fotos. Confirmar que:
- O grid carrega após rolar até a seção (lazy load)
- O link `@casadaalquimia` aparece no rodapé à esquerda
- O botão "Seguir no Instagram" aparece à direita
- Não há erros no console do browser

> **Nota:** Se o `BEHOLD_WIDGET_ID` ainda for `'SEU_WIDGET_ID'` (placeholder), o widget ficará vazio — isso é esperado. O visual será validado após inserir o ID real.

- [ ] **Passo 2.4: Commit**

```bash
git add src/components/social/InstagramSection.tsx
git commit -m "feat: replace elfsight with behold.so instagram widget"
```

---

### Tarefa 3: Simplificar SocialMedia.tsx

**Arquivo:** `src/components/SocialMedia.tsx`

- [ ] **Passo 3.1: Remover YouTubeSection e simplificar o layout**

Substituir o conteúdo do arquivo pelo seguinte (mantendo o header existente e removendo a divisão em dois blocos):

```tsx
import { useIntersectionObserver } from '@/utils/animations';
import { Share2 } from 'lucide-react';
import InstagramSection from './social/InstagramSection';

const SocialMedia = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section
      ref={ref}
      id="social-media"
      className="py-20 md:py-32 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden"
    >
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg mb-6">
              <Share2 className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-foreground">Conecte-se Conosco</span>
            </span>

            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Acompanhe Nossa Jornada
              </span>
            </h2>

            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
              Fique por dentro das nossas atividades, cerimônias e compartilhe sua jornada conosco através das nossas redes sociais
            </p>
          </div>
        </div>

        {/* Feed do Instagram */}
        <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <InstagramSection isVisible={isVisible} />
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
```

- [ ] **Passo 3.2: Verificar que o TypeScript compila sem erros**

```bash
npx tsc --noEmit
```

Esperado: nenhum erro de tipo.

- [ ] **Passo 3.3: Verificar visualmente no browser**

Confirmar que:
- A seção aparece corretamente com header + feed
- O player do YouTube não aparece mais em nenhuma parte da página
- As animações de entrada do header funcionam ao rolar

- [ ] **Passo 3.4: Commit**

```bash
git add src/components/SocialMedia.tsx
git commit -m "refactor: remove youtube section from social media component"
```

---

### Tarefa 4: Deletar YouTubeSection.tsx

**Arquivo:** `src/components/social/YouTubeSection.tsx`

- [ ] **Passo 4.1: Deletar o arquivo**

```bash
git rm src/components/social/YouTubeSection.tsx
```

- [ ] **Passo 4.2: Verificar que nenhum outro arquivo importa YouTubeSection**

```bash
grep -r "YouTubeSection" src/
```

Esperado: nenhuma saída (zero referências).

- [ ] **Passo 4.3: Verificar que o TypeScript compila sem erros**

```bash
npx tsc --noEmit
```

Esperado: nenhum erro de tipo.

- [ ] **Passo 4.4: Commit final**

> `git rm` do Passo 4.1 já staging a deleção automaticamente — não é necessário `git add`.

```bash
git commit -m "chore: delete YouTubeSection component"
```

---

### Tarefa 5: Validação final com Widget ID real

> Esta tarefa só pode ser executada após obter o Widget ID no painel do Behold.so.

- [ ] **Passo 5.1: Inserir o Widget ID real**

Em `src/components/social/InstagramSection.tsx`, linha 5, substituir:

```ts
const BEHOLD_WIDGET_ID = 'SEU_WIDGET_ID';
```

pelo ID real:

```ts
const BEHOLD_WIDGET_ID = 'xxxxxxxxxxxxx'; // ID real do Behold
```

- [ ] **Passo 5.2: Testar o grid em conexão rápida**

Abrir o dev server, rolar até a seção e verificar:
- O grid 3×3 preenche com as fotos do Instagram `@casadaalquimia`
- Não há grid vazio (race condition)
- Badge do Behold aparece discretamente abaixo do grid (esperado no plano gratuito)
- Não há erros no console do browser

- [ ] **Passo 5.3: Commit com o Widget ID real**

```bash
git add src/components/social/InstagramSection.tsx
git commit -m "feat: set behold.so widget id for instagram feed"
```
