# Contact Form Google Sheets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fazer o formulário de contato enviar dados para o Google Sheets via Apps Script, notificar por email e exibir tela de agradecimento ao usuário.

**Architecture:** O frontend faz um `fetch POST` com `Content-Type: text/plain` para um Google Apps Script publicado como Web App. O script grava uma linha na planilha e envia email de notificação. Em caso de sucesso, o formulário é substituído por uma tela de agradecimento. Erros exibem toast e preservam os dados digitados.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Vite, Lucide React, `useToast` hook existente.

**Spec:** `docs/superpowers/specs/2026-03-21-contact-form-google-sheets-design.md`

---

## Mapa de arquivos

| Arquivo | Ação | Responsabilidade |
|---------|------|-----------------|
| `.env.local` | Criar | Variável `VITE_CONTACT_SHEET_URL` para desenvolvimento local |
| `src/components/ContactForm.tsx` | Modificar | Refatorar estado, substituir mailto/WhatsApp por fetch, adicionar tela de agradecimento |

Nenhum arquivo novo de componente é necessário — tudo fica em `ContactForm.tsx`.

---

## Task 1: Variável de ambiente

**Files:**
- Create: `.env.local`

> **Nota:** O projeto não tem suite de testes automatizados configurada. As verificações serão feitas via lint (`npm run lint`) e teste manual no browser (`npm run dev` em `http://localhost:8086`).

- [ ] **Step 1: Verificar se `.env.local` já existe**

```bash
ls .env.local 2>/dev/null && echo "existe" || echo "não existe"
```

- [ ] **Step 2: Criar `.env.local` com a variável placeholder**

Criar o arquivo `.env.local` na raiz do projeto com o conteúdo abaixo. O URL real será preenchido após o setup do Google Apps Script.

```
# URL do Google Apps Script (Web App)
# Preencher após configurar o script no Google (ver docs/superpowers/specs/2026-03-21-contact-form-google-sheets-design.md)
VITE_CONTACT_SHEET_URL=https://script.google.com/macros/s/SEU_ID_AQUI/exec
```

- [ ] **Step 3: Verificar que `.env.local` está no `.gitignore`**

```bash
grep -n "\.env\.local" .gitignore
```

Expected: deve aparecer `.env.local` listado. Se não aparecer, adicionar a linha `.env.local` ao `.gitignore`.

- [ ] **Step 4: Commit (apenas se .gitignore foi alterado)**

```bash
git add .gitignore
git commit -m "chore: ensure .env.local is in .gitignore"
```

> Não commitar o `.env.local` — ele deve ficar apenas local.

---

## Task 2: Refatorar o model de estado do ContactForm

**Files:**
- Modify: `src/components/ContactForm.tsx`

O componente atual usa dois booleans separados (`isSubmitting`, `isSuccess`). Vamos substituir por um único estado discriminado `'idle' | 'submitting' | 'success'`. Aproveitamos também para limpar imports não utilizados.

- [ ] **Step 1: Ler o arquivo atual completo**

Ler `src/components/ContactForm.tsx` para entender todos os pontos de uso de `isSubmitting`, `isSuccess` e `Check` antes de modificar.

- [ ] **Step 2: Atualizar os imports do React e do lucide-react**

Substituir a linha de import do React para incluir `useEffect` e remover o import default desnecessário (React 18 + Vite usa o novo JSX transform e não precisa do `React` default para JSX):

```typescript
// ANTES:
import React, { useState } from 'react';

// DEPOIS:
import { useEffect, useState } from 'react';
```

Substituir a linha de import do lucide-react para remover `Check` (que só era usado no botão de `isSuccess`, que será eliminado) e adicionar `MailCheck`:

```typescript
// ANTES:
import { Check, Mail, MessageCircle, Phone, User } from 'lucide-react';

// DEPOIS:
import { Mail, MailCheck, MessageCircle, Phone, User } from 'lucide-react';
```

- [ ] **Step 3: Substituir os dois booleans pelo estado discriminado**

No topo do componente, dentro de `const ContactForm = () => {`, substituir:

```typescript
// ANTES:
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);

// DEPOIS:
const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
```

- [ ] **Step 4: Substituir o botão de submit para usar o novo estado**

Substituir todo o bloco `<button type="submit" ...>` (incluindo o conteúdo interno com o spinner e o `<Check />`):

```tsx
<button
  type="submit"
  disabled={status !== 'idle'}
  className={`
    relative inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-['Lato'] font-semibold tracking-wider uppercase transition-all duration-300
    ${status === 'submitting'
      ? 'bg-[#2B4F8C]/60 text-white cursor-not-allowed'
      : 'bg-[#2B4F8C] text-white hover:bg-[#1A3A6B] hover:-translate-y-px'
    }
  `}
  aria-label={status === 'submitting' ? "Enviando mensagem" : "Enviar mensagem"}
>
  {status === 'submitting' ? (
    <>
      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      Enviando…
    </>
  ) : (
    <>
      <Mail className="h-4 w-4" />
      Enviar
    </>
  )}
</button>
```

- [ ] **Step 5: Adicionar `disabled` nos campos do formulário**

Adicionar `disabled={status === 'submitting'}` e a classe `disabled:opacity-50` em todos os inputs e na textarea. Aplicar em: input `name`, input `email`, input `phone`, e textarea `message`.

Exemplo para o input de nome:
```tsx
<input
  id="name"
  name="name"
  type="text"
  required
  value={formData.name}
  onChange={handleChange}
  onFocus={() => setFocused('name')}
  onBlur={() => setFocused(null)}
  disabled={status === 'submitting'}
  className={`${fieldClass('name')} disabled:opacity-50`}
  placeholder="Seu nome"
  aria-required="true"
/>
```

Aplicar o mesmo padrão nos demais campos.

- [ ] **Step 6: Rodar lint**

```bash
npm run lint
```

Expected: 0 erros. Corrigir qualquer erro antes de prosseguir.

- [ ] **Step 7: Commit**

```bash
git add src/components/ContactForm.tsx
git commit -m "refactor: replace isSubmitting/isSuccess booleans with status union type"
```

---

## Task 3: Substituir handleSubmit por fetch para o Apps Script

**Files:**
- Modify: `src/components/ContactForm.tsx`

Remover a lógica de `mailto:` e WhatsApp. Adicionar `fetch` POST com `Content-Type: text/plain`, `AbortController` para timeout de 10s, e verificação de `responseBody.status === "ok"`.

- [ ] **Step 1: Substituir o handleSubmit completo**

Localizar a função `handleSubmit` no arquivo e substituir todo o seu corpo pelo código abaixo:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus('submitting');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const url = import.meta.env.VITE_CONTACT_SHEET_URL;
    if (!url) {
      throw new Error('VITE_CONTACT_SHEET_URL não configurada');
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(formData),
      signal: controller.signal,
    });

    const result = await response.json();

    if (result.status !== 'ok') {
      throw new Error(result.message || 'Erro ao enviar mensagem');
    }

    setStatus('success');
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === 'AbortError';
    toast({
      title: 'Erro ao enviar',
      description: isTimeout
        ? 'A conexão demorou demais. Tente novamente.'
        : 'Não foi possível enviar sua mensagem. Tente novamente.',
      variant: 'destructive',
    });
    setStatus('idle');
  } finally {
    clearTimeout(timeoutId);
  }
};
```

- [ ] **Step 2: Rodar lint**

```bash
npm run lint
```

Expected: 0 erros.

- [ ] **Step 3: Verificar comportamento no browser**

```bash
npm run dev
```

Abrir `http://localhost:8086` e navegar até `#contact`.

Verificar que:
- O formulário renderiza normalmente
- O botão está habilitado com o texto "Enviar"
- Com a URL placeholder no `.env.local`, o envio vai falhar — isso é esperado
- O spinner aparece enquanto aguarda
- O toast de erro aparece após o timeout ou erro de rede
- Os dados do formulário são preservados após o erro
- O botão volta ao estado normal

- [ ] **Step 4: Commit**

```bash
git add src/components/ContactForm.tsx
git commit -m "feat: replace mailto/WhatsApp with fetch POST to Google Apps Script"
```

---

## Task 4: Adicionar tela de agradecimento (estado success)

**Files:**
- Modify: `src/components/ContactForm.tsx`

Quando `status === 'success'`, o conteúdo do card do formulário é substituído por uma tela de agradecimento com fade-in suave.

- [ ] **Step 1: Adicionar estado de opacidade e funções auxiliares**

Logo após a declaração de `status`, adicionar:

```typescript
const [successVisible, setSuccessVisible] = useState(false);

useEffect(() => {
  if (status === 'success') {
    const timer = setTimeout(() => setSuccessVisible(true), 50);
    return () => clearTimeout(timer);
  } else {
    setSuccessVisible(false);
  }
}, [status]);

const handleReset = () => {
  setFormData({ name: '', email: '', phone: '', message: '' });
  setStatus('idle');
};
```

- [ ] **Step 2: Envolver o `<form>` existente em renderização condicional**

Localizar o `<div className="lg:col-span-3">` no JSX. Ele contém atualmente apenas o `<form ...>`. Substituir o conteúdo desse div por:

```tsx
<div className="lg:col-span-3">
  {status === 'success' ? (
    <div
      className={`
        bg-white/70 backdrop-blur-sm border border-[#2C2C1E]/8 rounded-sm p-8 md:p-10
        shadow-[0_2px_40px_rgba(44,44,30,0.06)]
        flex flex-col items-center justify-center text-center min-h-[360px]
        transition-opacity duration-500
        ${successVisible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <div className="w-16 h-16 rounded-sm border border-[#2B4F8C]/20 flex items-center justify-center mb-6">
        <MailCheck className="h-10 w-10 text-[#2B4F8C]" />
      </div>

      <h3 className="font-['Cinzel'] text-2xl font-bold text-[#1A3A6B] mb-4">
        Mensagem recebida
      </h3>

      <p className="font-['Lato'] text-base text-[#2C2C1E]/70 leading-relaxed max-w-sm mb-8">
        Obrigado pelo contato. Retornaremos em breve pelo email ou telefone que você nos deixou.
      </p>

      <button
        type="button"
        onClick={handleReset}
        className="text-sm font-['Lato'] text-[#7A4900]/60 hover:text-[#7A4900] underline underline-offset-4 transition-colors"
      >
        Enviar outra mensagem
      </button>
    </div>
  ) : (
    <form
      onSubmit={handleSubmit}
      className="bg-white/70 backdrop-blur-sm border border-[#2C2C1E]/8 rounded-sm p-8 md:p-10 shadow-[0_2px_40px_rgba(44,44,30,0.06)]"
    >
      {/* Manter aqui TODO o conteúdo interno do <form> existente sem alteração:
          - grid de Name + Email
          - campo Phone
          - campo Message (textarea)
          - div do footer com "* Campos obrigatórios" e o botão de submit
      */}
    </form>
  )}
</div>
```

> **Atenção ao worker:** o bloco `{/* Manter aqui TODO o conteúdo... */}` é um placeholder de instrução — não o deixe no código final. Mova literalmente todo o conteúdo interno do `<form>` atual (do `{/* Name + Email row */}` até o `</div>` do footer row, inclusive) para dentro do novo `<form>`. Não altere nenhuma linha desse conteúdo.

- [ ] **Step 3: Rodar lint**

```bash
npm run lint
```

Expected: 0 erros.

- [ ] **Step 4: Verificar tela de agradecimento no browser**

Temporariamente forçar o estado inicial para `'success'` para validar visualmente:

```typescript
// TEMPORÁRIO — reverter após o teste
const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('success');
```

Com `npm run dev` rodando, verificar:
- A tela de agradecimento ocupa o card do formulário
- O fade-in acontece suavemente ao carregar
- O ícone `MailCheck` está visível (tamanho adequado, cor azul cobalto)
- Os textos estão corretos
- O link "Enviar outra mensagem" está visível

Reverter o estado para `'idle'` e verificar:
- O formulário volta a aparecer normalmente

- [ ] **Step 5: Commit**

```bash
git add src/components/ContactForm.tsx
git commit -m "feat: add success thank-you screen with fade-in to contact form"
```

---

## Task 5: Verificação final e lint

**Files:**
- Nenhum arquivo novo

- [ ] **Step 1: Rodar lint completo**

```bash
npm run lint
```

Expected: 0 erros, 0 warnings relevantes.

- [ ] **Step 2: Build de produção**

```bash
npm run build
```

Expected: build completo sem erros de TypeScript. A variável `VITE_CONTACT_SHEET_URL` estará com valor placeholder — isso é esperado e não impede o build.

- [ ] **Step 3: Verificação manual no browser (checklist)**

Com `npm run dev` rodando:

- [ ] Formulário renderiza normalmente com todos os campos
- [ ] Labels flutuantes funcionam (animação ao focar nos campos)
- [ ] Botão "Enviar" aparece habilitado
- [ ] Ao submeter com URL placeholder: spinner aparece, toast de erro aparece, dados são preservados, botão volta ao normal
- [ ] Layout responsivo no mobile (tela ≤ 768px): formulário em coluna única
- [ ] Links de email e WhatsApp na coluna esquerda continuam funcionando

- [ ] **Step 4: Commit final**

```bash
git add .
git commit -m "chore: verify contact form implementation — lint and build passing"
```

---

## Setup Google Apps Script (feito pelo usuário — uma vez)

> Executar manualmente após o código estar pronto para testar o fluxo completo.

1. Criar uma planilha no Google Sheets
2. Na linha 1, criar o cabeçalho: `Data/Hora | Nome | Email | Telefone | Mensagem`
3. No menu da planilha: **Extensões → Apps Script**
4. Colar o código abaixo no editor:

```javascript
const EMAIL_DESTINO = "contato@acasadaalquimia.com.br";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    var timestamp = Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm");
    sheet.appendRow([
      timestamp,
      data.name || "",
      data.email || "",
      data.phone || "",
      data.message || ""
    ]);

    var subject = "[Casa da Alquimia] Nova mensagem de " + (data.name || "desconhecido");
    var body = [
      "Nova mensagem recebida pelo site:",
      "",
      "Nome: " + (data.name || ""),
      "Email: " + (data.email || ""),
      "Telefone: " + (data.phone || ""),
      "",
      "Mensagem:",
      data.message || ""
    ].join("\n");

    GmailApp.sendEmail(EMAIL_DESTINO, subject, body);

    return buildResponse({ status: "ok" });
  } catch (err) {
    return buildResponse({ status: "error", message: err.message });
  }
}

function doOptions(e) {
  return buildResponse({});
}

function buildResponse(data) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
```

5. Ajustar `EMAIL_DESTINO` se necessário
6. **Implantar → Nova implantação** → Tipo: Web App → Executar como: Eu → Acesso: Qualquer pessoa
7. Autorizar as permissões (Gmail + Sheets)
8. Copiar a URL gerada
9. Substituir o placeholder em `.env.local`:
   ```
   VITE_CONTACT_SHEET_URL=https://script.google.com/macros/s/ID_REAL/exec
   ```
10. Para produção (Plesk): configurar `VITE_CONTACT_SHEET_URL` nas variáveis de ambiente do servidor de build antes de executar `npm run build`

---

## Teste de integração completo (após setup do Apps Script)

Com a URL real configurada no `.env.local`:

1. `npm run dev`
2. Abrir `http://localhost:8086#contact`
3. Preencher o formulário com dados reais
4. Submeter
5. Verificar:
   - Tela de agradecimento aparece com fade-in
   - Nova linha na planilha do Google Sheets
   - Email de notificação chegou na caixa de entrada
