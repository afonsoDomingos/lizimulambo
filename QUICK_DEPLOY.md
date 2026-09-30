# Deploy Rápido no Vercel (Frontend) + Render (Backend)

## Opção Mais Simples e Recomendada

### Passo 1: MongoDB Atlas (Grátis)
1. Aceda a https://www.mongodb.com/cloud/atlas
2. Crie conta e cluster gratuito
3. Crie banco de dados "lizi-mulambo"
4. Copie a connection string

### Passo 2: Backend no Render (Grátis)
1. Aceda a https://render.com
2. Crie conta gratuita
3. "New +" → "Web Service"
4. Conecte repositório: `afonsoDomingos/lizimulambo`
5. Configuração:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
6. Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://SEU_USER:SEU_PASSWORD@SEU_CLUSTER.mongodb.net/lizi-mulambo
   JWT_SECRET=seu_secret_aqui
   NODE_ENV=production
   FRONTEND_URL=https://SEU_SITE_VERCEL.app
   ```
7. Deploy e copie a URL (ex: `https://lizi-mulambo-backend.onrender.com`)

### Passo 3: Frontend no Vercel (Grátis)
1. Aceda a https://vercel.com
2. Crie conta gratuita
3. "Add New..." → "Project"
4. Importe repositório: `afonsoDomingos/lizimulambo`
5. Configuração:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Environment Variables:
     ```
     VITE_API_URL=https://lizi-mulambo-backend.onrender.com
     ```
6. Deploy e copie a URL (ex: `https://lizi-mulambo.vercel.app`)

### Passo 4: Actualizar CORS no Backend
No Render, adicione no Environment Variables:
```
FRONTEND_URL=https://lizi-mulambo.vercel.app
```

Ou actualize a URL múltipla:
```
FRONTEND_URL=https://lizi-mulambo.vercel.app,https://www.lizi-mulambo.com
```

### Passo 5: Criar Admin no Backend
Depois do deploy, execute via terminal ou Postman:
```bash
curl -X POST https://lizi-mulambo-backend.onrender.com/api/admin/setup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "sua_palavra_passe",
    "email": "admin@exemplo.com"
  }'
```

Ou via script:
```bash
cd backend
MONGODB_URI="sua_connection_string" node scripts/setupAdmin.js
```

### Passo 6: Popular Banco de Dados
```bash
cd backend
MONGODB_URI="sua_connection_string" node scripts/seed.js
```

## Resumo das URLs

- **Frontend**: https://lizi-mulambo.vercel.app
- **Backend**: https://lizi-mulambo-backend.onrender.com
- **Admin**: https://lizi-mulambo.vercel.app/admin/login
- **MongoDB**: mongodb+srv://...

## Custos Totais: R$ 0,00

Todos os serviços são gratuitos para pequenos projetos!

## Suporte

Para problemas, consulte o guia completo em `DEPLOYMENT.md`
