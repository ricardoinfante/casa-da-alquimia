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
[ContactForm]  →  fetch POST (JSON)  →  [Google Apps Script Web App]
                                                ↓
                                         [Google Sheets]   ← nova linha
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
| Google Sheets | Armazena os registros de contato |
| Gmail (conta Google) | Envia email de notificação |

---

## Google Apps Script

### Comportamento

- `doPost(e)` — função principal:
  1. Faz parse do JSON recebido
  2. Abre a planilha ativa e adiciona uma nova linha ao final
  3. Envia email de notificação para `EMAIL_DESTINO`
  4. Retorna `{ status: "ok" }` com headers CORS

- `doOptions(e)` — responde ao preflight CORS do browser com os headers corretos

### Configuração no script

```javascript
const EMAIL_DESTINO = "contato@acasadaalquimia.com.br";
```

### Formato dos dados recebidos (JSON)

```json
{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "phone": "(62) 99999-0000",
  "message": "Tenho interesse nos rituais..."
}
```

### Linha gravada na planilha

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

### Mudanças no handleSubmit

- Remove lógica de `mailto:` e WhatsApp
- Faz `fetch` POST para `import.meta.env.VITE_CONTACT_SHEET_URL`
- Timeout de 10 segundos via `AbortController`
- Trata erros de rede e erros retornados pelo script

### Estados do formulário

| Estado | Comportamento |
|--------|--------------|
| idle | Formulário normal |
| submitting | Botão com spinner, campos desabilitados |
| success | Formulário substituído pela tela de agradecimento |
| error | Toast de erro, dados preservados, botão reativado |

### Tela de agradecimento (estado success)

Substitui o conteúdo do card com fade-in suave:

- Ícone (envelope ou similar, da paleta Cinzel/Lato)
- Título: *"Mensagem recebida"* (fonte Cinzel, cor `#1A3A6B`)
- Texto: *"Obrigado pelo contato. Retornaremos em breve pelo email ou telefone que você nos deixou."* (Lato, cor `#2C2C1E`)
- Link discreto: *"Enviar outra mensagem"* — reseta o estado para `idle` com formulário vazio

### Variável de ambiente

Arquivo `.env` na raiz do projeto:

```
VITE_CONTACT_SHEET_URL=https://script.google.com/macros/s/SEU_ID/exec
```

O `.env` já deve estar no `.gitignore` — a URL não deve ir para o repositório.

---

## Passos de setup manual (Google) — uma única vez

1. Criar uma planilha no Google Sheets com cabeçalho na linha 1: `Data/Hora | Nome | Email | Telefone | Mensagem`
2. No menu da planilha: **Extensões → Apps Script**
3. Colar o script gerado na implementação
4. Ajustar `EMAIL_DESTINO` no script
5. Clicar em **Implantar → Nova implantação** → Tipo: Web App → Executar como: Eu → Acesso: Qualquer pessoa
6. Autorizar as permissões solicitadas (acesso à planilha e ao Gmail)
7. Copiar a URL gerada e colocar no `.env` do projeto

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
