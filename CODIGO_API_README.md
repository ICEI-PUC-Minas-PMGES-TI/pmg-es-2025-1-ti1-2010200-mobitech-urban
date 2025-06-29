# MoveWave - Sistema de API Integrada

## 🚀 Como Funciona Agora

O sistema MoveWave agora usa uma **arquitetura híbrida** que permite compartilhamento de dados entre todos os usuários:

### ✅ **Dados Compartilhados (Servidor)**
- **Usuários**: Login e cadastro
- **Posts**: Todas as postagens e comentários
- **Problemas Urbanos**: Estatísticas e histórico
- **Cadastros de Prefeitura**: Dados das prefeituras

### 🔄 **Fallback para localStorage**
Se o servidor não estiver disponível, o sistema automaticamente usa localStorage como backup.

## 🛠️ Como Iniciar o Sistema

### 1. Iniciar o Servidor JSON (pasta `code`)
```bash
cd code
npm start
```
O servidor ficará disponível em: `http://localhost:3000`

### 2. Acessar a Aplicação Web (pasta `code`)
Abra o arquivo `code/htmls/index.html` no navegador

**Estrutura do Projeto:**
```
pmg-es-2025-1-ti1-2010200-mobitech-urban/
└── code/             # Aplicação Web + Servidor (Tudo em um lugar!)
    ├── htmls/        # Páginas HTML
    ├── assets/       # CSS, JS, Imagens
    ├── db/           # Banco de dados
    │   └── db.json   # Dados da aplicação
    ├── index.js      # Servidor JSON
    └── package.json  # Dependências
```

## 📊 Endpoints da API

### Usuários
- `GET /usuarios` - Listar usuários
- `POST /usuarios` - Criar usuário
- `PUT /usuarios/:id` - Atualizar usuário
- `DELETE /usuarios/:id` - Deletar usuário

### Posts
- `GET /posts` - Listar posts
- `POST /posts` - Criar post
- `PUT /posts/:id` - Atualizar post
- `DELETE /posts/:id` - Deletar post

### Problemas Urbanos
- `GET /problemas_urbanos` - Obter estatísticas
- `PUT /problemas_urbanos` - Atualizar estatísticas

### Comentários
- `GET /comentarios` - Listar comentários
- `POST /comentarios` - Criar comentário

### Cadastros Prefeitura
- `GET /cadastros_prefeitura` - Listar cadastros
- `POST /cadastros_prefeitura` - Criar cadastro

## 🔧 Arquivos Modificados

### 1. `code/db/db.json`
- Expandido para incluir posts, problemas urbanos, comentários e cadastros

### 2. `code/assets/js/api-config.js` (NOVO)
- Configuração centralizada da API
- Funções utilitárias para requisições

### 3. `code/assets/js/problemas_urbanos.js`
- Modificado para usar API com fallback localStorage
- Mantém compatibilidade com sistema existente

### 4. `code/assets/js/script.js`
- Posts agora carregam do servidor
- Sistema de likes e comentários integrado
- Fallback para localStorage se servidor indisponível

### 5. `code/assets/js/criarpost.js`
- Novos posts salvos no servidor
- Integração com sistema de usuários

### 6. `code/assets/js/prefeitura.js`
- Gráficos carregam dados do servidor
- Atualização automática a cada 30 segundos

### 7. `code/index.js` e `code/package.json`
- Servidor JSON movido para pasta code
- Tudo organizado em um só lugar

## 🌐 Benefícios da Nova Arquitetura

### ✅ **Compartilhamento Real**
- Posts criados em um computador aparecem em outros
- Problemas urbanos são contabilizados globalmente
- Estatísticas da prefeitura refletem dados de todos os usuários

### ✅ **Robustez**
- Sistema funciona mesmo se servidor cair (localStorage)
- Sincronização automática quando servidor volta
- Dados não se perdem

### ✅ **Escalabilidade**
- Fácil adicionar novos tipos de dados
- API RESTful padrão
- Preparado para expansão

### ✅ **Organização**
- Tudo em uma pasta só (code)
- Fácil de gerenciar e fazer backup
- Estrutura mais limpa

## 🧪 Testando o Sistema

### 1. Teste de Compartilhamento
1. Inicie o servidor: `cd code && npm start`
2. Abra `code/htmls/index.html` em dois navegadores diferentes
3. Crie um post em um navegador
4. Verifique se aparece no outro navegador

### 2. Teste de Fallback
1. Pare o servidor (`Ctrl+C` no terminal)
2. Tente criar um post
3. Verifique se salva no localStorage
4. Reinicie o servidor: `cd code && npm start`
5. Verifique se os dados sincronizam

### 3. Teste de Estatísticas
1. Acesse a página da prefeitura (`code/htmls/prefeitura.html`)
2. Crie posts com diferentes tipos de problemas
3. Verifique se os gráficos atualizam

## 🔍 Monitoramento

### Console do Navegador
- Logs de sucesso/erro das requisições
- Avisos quando usando fallback localStorage

### Servidor
- Logs de requisições em `http://localhost:3000`
- Dados salvos em `code/db/db.json`

## 🚨 Solução de Problemas

### Servidor não inicia
```bash
cd code
npm install
npm start
```

### Dados não aparecem
1. Verifique se servidor está rodando em `http://localhost:3000`
2. Abra console do navegador (F12)
3. Verifique erros de rede

### Posts não sincronizam
1. Verifique conexão com servidor
2. Recarregue a página
3. Verifique se localStorage está sendo usado como fallback

## 📈 Próximos Passos

1. **Autenticação**: Implementar JWT para segurança
2. **Geolocalização**: Salvar coordenadas dos problemas
3. **Notificações**: Sistema de alertas em tempo real
4. **Backup**: Sistema de backup automático dos dados
5. **Deploy**: Hospedar em servidor de produção

---

**Desenvolvido para o projeto MoveWave - Solução para Enchentes Urbanas** 