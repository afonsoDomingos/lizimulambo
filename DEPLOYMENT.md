# Guia de Deployment

## Opção Recomendada: Frontend no Vercel + Backend no Render

### Por que esta abordagem?
- **Vercel**: Excelente para frontend Vue.js, grátis, CDN global, deploy automático
- **Render**: Suporta Node.js/Express, grátis para pequenos projetos, fácil configuração
- **MongoDB Atlas**: Banco de dados em nuvem, grátis para pequenos projetos

---

## Passo 1: MongoDB Atlas (Banco de Dados)

1. Aceda a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie uma conta gratuita
3. Crie um novo cluster (grátis)
4. Crie um banco de dados "lizi-mulambo"
5. Crie um utilizador de banco de dados
6. Obtenha a connection string (ex: `mongodb+srv://user:password@cluster.mongodb.net/lizi-mulambo`)
7. Configure IP whitelist para permitir conexões (0.0.0.0/0 para todos, ou IPs específicos)

---

## Passo 2: Backend no Render

### 2.1 Preparar o Backend

1. Crie um ficheiro `backend/.env` com:
```env
PORT=5000
MONGODB_URI=mongodb+srv://SEU_USER:SEU_PASSWORD@SEU_CLUSTER.mongodb.net/lizi-mulambo
JWT_SECRET=seu_jwt_secret_muito_seguro_aqui
JWT_EXPIRE=7d
NODE_ENV=production
```

2. Adicione script de start no `backend/package.json` (já existe):
```json
"scripts": {
  "start": "node server.js"
}
```

### 2.2 Deploy no Render

1. Aceda a [Render](https://render.com)
2. Crie uma conta gratuita
3. Clique em "New +" → "Web Service"
4. Conecte o repositório GitHub: `afonsoDomingos/lizimulambo`
5. Configure:
   - **Name**: `lizi-mulambo-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment Variables**: Adicione as variáveis do `.env`
6. Clique em "Create Web Service"
7. Aguarde o deploy (aprox. 2-3 minutos)
8. Copie a URL do backend (ex: `https://lizi-mulambo-backend.onrender.com`)

---

## Passo 3: Frontend no Vercel

### 3.1 Preparar o Frontend

1. Actualize `frontend/.env`:
```env
VITE_API_URL=https://lizi-mulambo-backend.onrender.com
```

### 3.2 Deploy no Vercel

**Opção A: Via Dashboard (Mais Fácil)**

1. Aceda a [Vercel](https://vercel.com)
2. Crie uma conta gratuita
3. Clique em "Add New..." → "Project"
4. Importe o repositório GitHub: `afonsoDomingos/lizimulambo`
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Environment Variables**: Adicione `VITE_API_URL` com a URL do backend
6. Clique em "Deploy"
7. Aguarde o deploy (aprox. 1-2 minutos)
8. Copie a URL do frontend (ex: `https://lizi-mulambo.vercel.app`)

**Opção B: Via CLI**

1. Instale Vercel CLI:
```bash
npm install -g vercel
```

2. Navegue para a pasta do frontend:
```bash
cd frontend
```

3. Faça login:
```bash
vercel login
```

4. Deploy:
```bash
vercel
```

5. Siga as instruções no terminal

---

## Passo 4: Configurar CORS no Backend

No ficheiro `backend/server.js`, actualize a configuração CORS para permitir o domínio do Vercel:

```javascript
const cors = require('cors');

// Em produção, especifique o domínio do Vercel
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://SEU_DOMINIO_VERCEL.app', 'https://SEU_DOMINIO_VERCEL.vercel.app']
    : '*',
  credentials: true
};

app.use(cors(corsOptions));
```

Adicione também no `.env` do backend:
```env
FRONTEND_URL=https://SEU_DOMINIO_VERCEL.app
```

---

## Passo 5: Testar o Deploy

1. Aceda à URL do Vercel
2. Verifique se o site carrega correctamente
3. Teste a navegação entre páginas
4. Teste o botão do WhatsApp
5. Teste o login no admin (crie o admin primeiro via API)
6. Verifique se as chamadas à API funcionam

---

## Opção Alternativa: Full-Stack no Vercel

Se preferir tudo no Vercel, precisa converter o backend para Vercel Functions:

### 1. Criar ficheiro `backend/api/index.js`

```javascript
const express = require('express');
const serverless = require('serverless-http');
const app = require('../server').default;

module.exports.handler = serverless(app);
```

### 2. Instalar dependência adicional
```bash
cd backend
npm install serverless-http
```

### 3. Actualizar `backend/server.js` para exportar app
```javascript
// No final do ficheiro
module.exports = app;
```

### 4. Configurar Vercel para incluir backend
No `vercel.json` na raiz do projecto:
```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "functions": {
    "api/**/*.js": {
      "runtime": "nodejs18.x"
    }
  }
}
```

**Nota**: Esta opção é mais complexa e pode ter limitações com uploads de ficheiros e conexões de banco de dados longas.

---

## Solução de Problemas

### Backend não inicia no Render
- Verifique se o PORT está definido como variável de ambiente
- Render atribui porta automaticamente via `process.env.PORT`
- Certifique-se que o MONGODB_URI está correcto

### CORS errors no frontend
- Verifique se o domínio do Vercel está na lista de allowed origins
- Certifique-se que as variáveis de ambiente estão configuradas no Vercel

### MongoDB connection timeout
- Verifique se o IP whitelist no MongoDB Atlas permite conexões
- Certifique-se que o utilizador e password estão correctos
- Verifique se o cluster está activo (não suspenso)

### Upload de imagens não funciona
- Render e Vercel Functions têm limitações para armazenamento local
- Considere usar um serviço de armazenamento como:
  - Cloudinary (grátis para pequenos projetos)
  - AWS S3
  - Firebase Storage

---

## Monitoramento e Logs

### Render
- Aceda ao dashboard do Render
- Clique no serviço "lizi-mulambo-backend"
- Verifique os logs em "Logs"

### Vercel
- Aceda ao dashboard do Vercel
- Clique no projecto
- Verifique os logs em "Deployments" → "View Function Logs"

---

## Custos

### Plano Gratuito (Disponível)

**MongoDB Atlas**
- 512 MB de armazenamento
- Compartilhado cluster
- Gratuito para sempre

**Render**
- 512 MB RAM
- 0.1 CPU
- Sleep após 15 minutos de inactividade (acordam em ~30 segundos)
- Gratuito para pequenos projetos

**Vercel**
- Hospedagem frontend ilimitada
- 100 GB bandwidth/mês
- Deploy automático
- Gratuito para uso pessoal

### Plano Pago (Recomendado para Produção)

Se o site tiver muito tráfego, considere:
- Render: $7/mês (server sempre activo)
- MongoDB Atlas: $9/mês (dedicated cluster)
- Vercel: $20/mês (bandwidth ilimitada, sem limites)

---

## Domínio Personalizado

### Configurar no Vercel
1. Aceda ao dashboard do Vercel
2. Clique no projecto → "Settings" → "Domains"
3. Adicione o domínio (ex: `lizimulambo.com`)
4. Configure os DNS no seu registador de domínios

### Configurar no Render
1. Aceda ao dashboard do Render
2. Clique no serviço → "Settings" → "Custom Domains"
3. Adicione o subdomínio (ex: `api.lizimulambo.com`)
4. Configure os DNS

---

## Backup e Segurança

### Backup do Banco de Dados
- MongoDB Atlas tem backups automáticos no plano pago
- No plano grátis, pode fazer backup manual via MongoDB Compass
- Exporte regularmente os dados

### Segurança
- Nunca commit ficheiros `.env`
- Use variáveis de ambiente em produção
- Actualize dependências regularmente
- Use palavras-passe fortes
- Active HTTPS (automático no Vercel e Render)
