# Spec: Formulário de Contato com Google Sheets

**Data:** 2026-03-21
**Branch:** feature/redesign-visual-sagrado
**Status:** Aprovado para implementação

---

## Contexto

O formulário de contato atual (`src/components/ContactForm.tsx`) abre um `mailto:` e uma janela do WhatsApp ao ser submetido — nada é registrado e a experiência é inconsistente. O objetivo é tornar o formulário funcional de verdade: cada envio grava uma linha numa planilha do Google e dispara um email de notificação para a equipe.

---

## Objetivo

- Registrar cada envio do formulário numa planilha do Google Sheets
- Notificar a equipe por email a cada novo contato
- Exibir ao usuário uma mensagem de agradecimento elegante após o envio
- Manter o formulário resiliente a erros (não perder dados digitados)

---

## Arquitetura

```
[ContactForm]  →  fetch POST (text/plain com JSON no body)  →  [Google Apps Script Web App]
                                                                        ↓
                                                                 [Google Sheets]   ← nova linha (appendRow)
                                                                        ↓
                                                                 [Gmail]           ← email de aviso
                                                                        ↓
                                                                 retorna { status: "ok" }
                                                                        ↓
[ContactForm]  ←  exibe tela de agradecimento (substitui o formulário)
```

### Peças envolvidas

| Peça | Responsabilidade |
|------|-----------------|
| `ContactForm.tsx` | UI do formulário, submissão via `fetch`, exibição de estados |
| `VITE_CONTACT_SHEET_URL` | Variável de ambiente com a URL do Apps Script |
| Google Apps Script | Recebe POST, grava planilha, envia email |
| Google Sheets | Armazena os registros de contato (cabeçalho pré-criado manualmente) |
| Gmail (conta Google) | Envia email de notificação |

---

## Google Apps Script

### Comportamento

- `doPost(e)` — função principal:
  1. Faz `JSON.parse(e.postData.contents)` para obter os dados (o body chega como `text/plain`)
  2. Abre a planilha ativa e usa `sheet.appendRow(...)` para adicionar linha ao final (assume cabeçalho pré-existente na linha 1)
  3. Envia email de notificação para `EMAIL_DESTINO`
  4. Retorna `{ status: "ok" }` com headers CORS

- `doOptions(e)` — responde ao preflight CORS com os headers corretos

> **Nota CORS:** o Google Apps Script é servido por URL de redirect, o que impede `Content-Type: application/json` no fetch (causaria falha CORS). A solução é enviar com `Content-Type: text/plain` — isso evita o preflight e o JSON chega intacto em `e.postData.contents`, de onde é feito o parse manualmente.

### Código completo do Apps Script

O script abaixo deve ser colado no editor do Google Apps Script (Extensões → Apps Script) dentro da planilha:

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

### Formato de resposta

**Sucesso:**
```json
{ "status": "ok" }
```

**Erro:**
```json
{ "status": "error", "message": "Descrição do erro" }
```

Ambos são retornados com HTTP 200. O frontend deve verificar `responseBody.status === "ok"`, não apenas `response.ok`.

### Linha gravada na planilha

O script assume que o cabeçalho já existe na linha 1 (criado manualmente no setup). Usa `sheet.appendRow()` para adicionar dados a partir da linha 2 em diante.

| Data/Hora | Nome | Email | Telefone | Mensagem |
|-----------|------|-------|----------|----------|
| 21/03/2026 14:32 | Maria Silva | maria@email.com | (62) 99999-0000 | Tenho interesse... |

### Email de notificação

- **Assunto:** `[Casa da Alquimia] Nova mensagem de {nome}`
- **Corpo:** campos formatados em texto simples, legível

### Limitações do plano gratuito Google (não impactam este caso)

- 100 emails/dia via Gmail do script
- 90 min de execução total/dia (cada envio leva < 1s)

---

## Frontend — ContactForm.tsx

### Model de estado

O componente atual usa dois booleans separados (`isSubmitting`, `isSuccess`). Eles devem ser substituídos por um único estado discriminado com três valores:

```typescript
const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
```

O estado `error` não existe como valor persistente: em caso de erro, o toast é exibido e o estado retorna imediatamente para `'idle'`, mantendo os dados do formulário intactos para que o usuário possa tentar novamente. Não é necessário um quarto estado `error` na union type.

### Mudanças no handleSubmit

- Remove lógica de `mailto:` e WhatsApp
- Faz `fetch` POST para `import.meta.env.VITE_CONTACT_SHEET_URL` com:
  - `method: 'POST'`
  - `headers: { 'Content-Type': 'text/plain' }` (necessário para evitar CORS com o Apps Script)
  - `body: JSON.stringify(formData)`
- Timeout de 10 segundos via `AbortController`
- Verifica `responseBody.status === "ok"` (não apenas `response.ok`) para determinar sucesso
- Em caso de erro (catch ou `status !== "ok"`): exibe toast e chama `setStatus('idle')` — dados do formulário são preservados

### Estados do formulário

| Estado | Comportamento |
|--------|--------------|
| `idle` | Formulário normal e interativo |
| `submitting` | Botão com spinner, campos desabilitados |
| `success` | Card substituído pela tela de agradecimento (fade-in `transition-opacity duration-500`) |

Em caso de erro: toast de aviso, dados preservados, estado retorna para `idle`.

### Tela de agradecimento (estado `success`)

Substitui o conteúdo do card com fade-in suave via Tailwind (`transition-opacity duration-500`):

- Ícone `<MailCheck />` de `lucide-react` (tamanho `h-10 w-10`, cor `#2B4F8C`)
- Título: *"Mensagem recebida"* (fonte Cinzel, cor `#1A3A6B`)
- Texto: *"Obrigado pelo contato. Retornaremos em breve pelo email ou telefone que você nos deixou."* (Lato, cor `#2C2C1E`)
- Link discreto: *"Enviar outra mensagem"* — chama `setStatus('idle')` e reseta `formData` para valores vazios

### Variável de ambiente

**Desenvolvimento local** — arquivo `.env.local` na raiz do projeto (ignorado pelo git por padrão no Vite):

```
VITE_CONTACT_SHEET_URL=https://script.google.com/macros/s/SEU_ID/exec
```

**Produção (Plesk / servidor de build)** — a variável `VITE_CONTACT_SHEET_URL` deve ser configurada nas variáveis de ambiente do servidor antes de executar `npm run build`. Como o Vite injeta variáveis `VITE_*` em tempo de build (não em runtime), a variável precisa estar disponível no ambiente onde o comando de build é executado. Se não estiver definida, `import.meta.env.VITE_CONTACT_SHEET_URL` será `undefined` silenciosamente.

---

## Passos de setup manual (Google) — uma única vez

1. Criar uma planilha no Google Sheets
2. Na linha 1, criar o cabeçalho manualmente: `Data/Hora | Nome | Email | Telefone | Mensagem`
3. No menu da planilha: **Extensões → Apps Script**
4. Colar o código da seção "Código completo do Apps Script" acima
5. Ajustar `EMAIL_DESTINO` no script para o email correto
6. Clicar em **Implantar → Nova implantação** → Tipo: Web App → Executar como: Eu → Acesso: Qualquer pessoa
7. Autorizar as permissões solicitadas (acesso à planilha e ao Gmail)
8. Copiar a URL gerada e colocar no `.env.local` do projeto (e nas variáveis de ambiente de produção)

---

## O que não muda

- O visual e layout do formulário permanecem iguais
- Os campos (nome, email, telefone, mensagem) permanecem os mesmos
- Os links de email e WhatsApp na coluna esquerda permanecem (contato direto alternativo)
- O `useToast` permanece sendo usado para erros

---

## Fora do escopo

- Validações além das que já existem (`required`, `type="email"`)
- Anti-spam / CAPTCHA
- Painel de administração para visualizar as mensagens
- Integração com CRM ou outro sistema
