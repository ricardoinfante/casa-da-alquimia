# 🤝 Guia de Contribuição - Casa da Alquimia

## Convenções de Código

### TypeScript

- Use TypeScript para novos arquivos
- Defina tipos explícitos quando possível
- Evite `any`, use `unknown` quando o tipo for realmente desconhecido

### React

- Use functional components
- Prefira hooks customizados para lógica reutilizável
- Mantenha componentes pequenos e focados
- Use React.memo() para componentes que renderizam frequentemente

### Naming Conventions

```typescript
// Components: PascalCase
const ContactForm = () => {};

// Functions: camelCase
const handleSubmit = () => {};

// Constants: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;

// Files: kebab-case ou PascalCase
contact - form.tsx;
ContactForm.tsx;
```

### CSS/Tailwind

- Use Tailwind classes quando possível
- Crie componentes customizados em `@layer components` para estilos reutilizáveis
- Prefira utility classes a CSS customizado
- Use variáveis CSS para cores do tema

## Estrutura de Commits

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(escopo): descrição curta

Descrição detalhada (opcional)

Closes #123 (se aplicável)
```

### Tipos

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Apenas documentação
- `style`: Formatação, ponto e vírgula, etc
- `refactor`: Refatoração de código
- `perf`: Melhoria de performance
- `test`: Adicionar ou corrigir testes
- `chore`: Tarefas de build, CI/CD, etc

### Exemplos

```bash
feat(contact): adicionar formulário de contato

fix(navbar): corrigir menu mobile não fechando

docs(readme): atualizar instruções de instalação

style(hero): ajustar espaçamento do título

refactor(components): extrair lógica de validação

perf(images): implementar lazy loading
```

## Workflow de Desenvolvimento

### 1. Criar Branch

```bash
# Partindo da main atualizada
git checkout main
git pull origin main

# Criar nova branch
git checkout -b feat/nome-da-feature
# ou
git checkout -b fix/nome-do-bug
```

### 2. Desenvolver

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Em outro terminal, rodar linter
npm run lint
```

### 3. Testar

```bash
# Build de produção
npm run build

# Preview do build
npm run preview

# Testar em diferentes navegadores
# Testar responsividade
# Validar acessibilidade
```

### 4. Commit

```bash
git add .
git commit -m "tipo(escopo): descrição"
```

### 5. Push e Pull Request

```bash
git push origin feat/nome-da-feature
```

Criar PR no GitHub com:

- Título descritivo
- Descrição do que foi feito
- Screenshots (se aplicável)
- Checklist de testes

## Checklist para Pull Request

- [ ] Código segue as convenções do projeto
- [ ] Sem erros no console
- [ ] Build funciona (`npm run build`)
- [ ] Testado em Chrome, Firefox e Safari
- [ ] Testado em mobile
- [ ] Acessibilidade verificada
- [ ] Sem vulnerabilidades novas (`npm audit`)
- [ ] Documentação atualizada (se necessário)
- [ ] Commits seguem padrão Conventional Commits

## Prioridades de Features

### 🔥 Alta Prioridade

1. Backend para formulário de contato
2. Sistema de pagamento para doações
3. Sistema de agendamento de rituais
4. Painel administrativo

### 🌟 Média Prioridade

1. Blog/Notícias
2. Galeria de fotos própria
3. FAQ interativo
4. Área de membros

### 💡 Baixa Prioridade

1. PWA
2. Modo escuro
3. Internacionalização
4. Analytics

## Estrutura de Novos Componentes

```tsx
// src/components/MeuComponente.tsx
import React from "react";
import { MinhaIcon } from "lucide-react";

interface MeuComponenteProps {
  titulo: string;
  descricao?: string;
  className?: string;
}

/**
 * Descrição do componente
 *
 * @param titulo - Título principal
 * @param descricao - Descrição opcional
 * @param className - Classes CSS adicionais
 */
const MeuComponente: React.FC<MeuComponenteProps> = ({
  titulo,
  descricao,
  className = "",
}) => {
  return (
    <div className={`meu-componente ${className}`}>
      <h3 className="text-xl font-display">{titulo}</h3>
      {descricao && <p className="text-foreground/70">{descricao}</p>}
    </div>
  );
};

export default MeuComponente;
```

## Testes

### Testes Manuais Essenciais

- [ ] Navegação funciona em todas as seções
- [ ] Formulários validam corretamente
- [ ] Links externos abrem em nova aba
- [ ] Imagens carregam corretamente
- [ ] Animações funcionam suavemente
- [ ] Performance adequada (Lighthouse > 90)

### Testes de Acessibilidade

- [ ] Navegação por teclado funciona
- [ ] Screen readers conseguem ler conteúdo
- [ ] Contraste de cores adequado (WCAG AA)
- [ ] Textos alternativos em imagens
- [ ] ARIA labels onde necessário

## Recursos Úteis

- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Web Accessibility](https://www.w3.org/WAI/fundamentals/)

## Perguntas?

Entre em contato através dos issues do GitHub ou pelo email: casadaalquimia@gmail.com

---

Obrigado por contribuir com a Casa da Alquimia! 🌿✨
