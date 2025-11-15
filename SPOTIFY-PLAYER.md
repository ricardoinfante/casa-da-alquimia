# 🎵 Spotify Player - Casa da Alquimia

## 📌 Implementação Concluída

✅ **Player do Spotify integrado ao site!**

---

## 🎨 Características

### **Design**

- 🎨 Header personalizado com cores do Spotify (#1DB954)
- 🌊 Gradiente elegante de preto para verde
- 💫 Animações suaves de transição
- 📱 Totalmente responsivo

### **Funcionalidades**

- ✅ **Player fixo no footer** - Sempre visível enquanto navega
- ✅ **Minimizar/Maximizar** - Economiza espaço na tela
- ✅ **Fechar player** - Remove temporariamente
- ✅ **Botão flutuante** - Reabre o player quando fechado
- ✅ **Persistência** - Lembra preferências do usuário (localStorage)
- ✅ **Carregamento otimizado** - Delay de 2s para não impactar performance
- ✅ **Lazy loading** - Iframe carrega sob demanda

---

## 🎼 Playlist Configurada

**URL:** https://open.spotify.com/playlist/5gK8vevkgH2nRAw1LuGdCD

**ID da Playlist:** `5gK8vevkgH2nRAw1LuGdCD`

**Descrição:** Músicas para meditação e rituais da Casa da Alquimia

---

## 📂 Arquivos Criados/Modificados

### **Novo Componente**

```
src/components/SpotifyPlayer.tsx
```

### **Arquivos Modificados**

```
src/pages/Index.tsx        - Player adicionado
src/index.css              - Espaçamento para o player
```

---

## 🎯 Como Funciona

### **Estados do Player**

#### **1. Maximizado (Padrão)**

```
┌─────────────────────────────────────┐
│ 🎵 Playlist Casa da Alquimia [Spotify] │
│ Músicas para meditação e rituais   │
│                [🔊] [⬜] [❌]        │
├─────────────────────────────────────┤
│                                     │
│    [Iframe do Spotify - 352px]     │
│                                     │
└─────────────────────────────────────┘
```

#### **2. Minimizado**

```
┌─────────────────────────────────────┐
│ 🎵 Playlist Casa da Alquimia        │
│                [🔊] [⬛] [❌]        │
├─────────────────────────────────────┤
│ 🎵 Clique para expandir o player    │
└─────────────────────────────────────┘
```

#### **3. Fechado (Botão Flutuante)**

```
                              ┌──────┐
                              │  ♪   │
                              │  🎵  │
                              └──────┘
                            (canto inferior direito)
```

---

## 🔧 Configurações

### **Alterar Playlist**

No arquivo `src/pages/Index.tsx`:

```tsx
<SpotifyPlayer playlistId="SUA_PLAYLIST_ID_AQUI" />
```

### **Obter ID de qualquer Playlist do Spotify**

1. Abra a playlist no Spotify Web
2. Copie a URL: `https://open.spotify.com/playlist/ID_AQUI?si=...`
3. Use apenas o ID: `5gK8vevkgH2nRAw1LuGdCD`

---

## 🎨 Personalização

### **Cores do Player**

No arquivo `src/components/SpotifyPlayer.tsx`:

```tsx
// Header
className = "bg-gradient-to-r from-[#191414] to-[#1DB954]";

// Botão flutuante
className = "bg-gradient-to-r from-[#1DB954] to-[#1ed760]";

// Altere #1DB954 para sua cor preferida
```

### **Altura do Player**

```tsx
// Alterar altura do iframe (padrão: 352px)
<div className={`... ${isMinimized ? 'h-0' : 'h-[352px]'}`}>
  <iframe height="352" ... />
</div>
```

### **Delay de Carregamento**

```tsx
// Alterar delay (padrão: 2000ms = 2 segundos)
const timer = setTimeout(() => {
  setShowPlayer(true);
}, 2000); // Mudar este valor
```

---

## 🎵 Tipos de Embeds do Spotify

Você pode usar diferentes tipos de conteúdo:

### **Playlist** (Atual)

```tsx
<SpotifyPlayer playlistId="5gK8vevkgH2nRAw1LuGdCD" />
```

### **Álbum**

```tsx
// Modificar no componente para aceitar albumId
src={`https://open.spotify.com/embed/album/${albumId}`}
```

### **Artista**

```tsx
src={`https://open.spotify.com/embed/artist/${artistId}`}
```

### **Podcast**

```tsx
src={`https://open.spotify.com/embed/show/${showId}`}
```

---

## 📱 Responsividade

O player se adapta automaticamente:

- **Desktop:** Player completo com 100% da largura
- **Tablet:** Mantém funcionalidade completa
- **Mobile:** Player responsivo, recomenda-se usar minimizado

---

## ♿ Acessibilidade

✅ **ARIA Labels** em todos os botões:

- "Abrir player de música"
- "Minimizar player" / "Maximizar player"
- "Fechar player"
- "Ativar som" / "Desativar som"

✅ **Navegação por teclado:** Todos os controles acessíveis

✅ **Títulos descritivos:** Iframe com title apropriado

---

## 🚀 Performance

### **Otimizações Implementadas**

1. **Lazy Loading:** Iframe carrega apenas quando necessário
2. **Delay inicial:** 2s após página carregar
3. **localStorage:** Salva preferências sem requisições
4. **CSS Transitions:** Animações suaves via CSS
5. **Conditional Rendering:** Componentes renderizam sob demanda

### **Impacto no Build**

```
Antes:  Index-BYCxfSQ0.js  163.17 KB
Depois: Index-BlcgYylZ.js  168.73 KB
Aumento: +5.56 KB (3.4%)
```

✅ **Impacto mínimo no tamanho do bundle**

---

## 🎛️ Controles

| Botão | Ação                                   | Atalho |
| ----- | -------------------------------------- | ------ |
| 🔊    | Mute visual (controle real no Spotify) | -      |
| ⬜    | Minimizar player                       | -      |
| ⬛    | Maximizar player                       | -      |
| ❌    | Fechar player                          | -      |
| 🎵    | Reabrir player (botão flutuante)       | -      |

---

## 🧪 Testar Localmente

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Abrir navegador em http://localhost:8080

# Testar funcionalidades:
# 1. Scroll até o footer
# 2. Ver player aparecer após 2 segundos
# 3. Clicar em minimizar
# 4. Fechar player
# 5. Reabrir com botão flutuante
```

---

## 🐛 Troubleshooting

### **Player não aparece**

**Causa:** Bloqueador de conteúdo/anúncios  
**Solução:** Desabilitar extensões como AdBlock para `open.spotify.com`

### **Música não toca**

**Causa:** Requer conta Spotify (gratuita ou premium)  
**Solução:** Usuários devem fazer login no Spotify

### **Player fica por cima do footer**

**Causa:** z-index incorreto  
**Solução:** Player tem `z-40`, Footer deve ter `z-10` ou menos

### **Botão flutuante não aparece**

**Causa:** localStorage não limpo  
**Solução:**

```javascript
// No console do navegador:
localStorage.removeItem("spotifyPlayerVisible");
localStorage.removeItem("spotifyPlayerMinimized");
```

---

## 🔄 Atualizações Futuras Sugeridas

### **Alta Prioridade**

- [ ] Adicionar múltiplas playlists com selector
- [ ] Integração com Spotify Web API para mostrar música atual
- [ ] Sincronização com backend para analytics

### **Média Prioridade**

- [ ] Tema claro/escuro para o player
- [ ] Playlist por seção do site (meditação, rituais, etc)
- [ ] Botões de compartilhamento da playlist

### **Baixa Prioridade**

- [ ] PWA com controles de mídia do sistema
- [ ] Histórico de músicas ouvidas
- [ ] Recomendações personalizadas

---

## 📊 Métricas

### **Uso de localStorage**

```javascript
// Dados salvos:
spotifyPlayerMinimized: "true" | "false";
spotifyPlayerVisible: "true" | "false";
```

**Tamanho:** ~50 bytes

---

## 🎨 Integração Visual

O player foi desenhado para combinar com:

✅ Paleta de cores do site (azul #173D90, verde #80A94D)  
✅ Footer existente  
✅ Gradientes sutis  
✅ Sombras consistentes  
✅ Animações do site

---

## 📞 Suporte

**Documentação Spotify Embed:**  
https://developer.spotify.com/documentation/embeds

**Problemas?**  
Verifique console do navegador (F12) para erros

---

✅ **Player do Spotify implementado com sucesso!**

**Funciona:** ✅ Desktop | ✅ Mobile | ✅ Tablet

**Próximo deploy:** Incluir na pasta `dist/` automaticamente
