# Deploy Rápido no Vercel (Full-Stack com Services)

## Configuração Mais Simples - Tudo num Único Projecto

### Passo 1: MongoDB Atlas (Grátis) - 5 minutos
1. Aceda a https://www.mongodb.com/cloud/atlas
2. Crie conta gratuita e cluster
3. Crie banco de dados "lizi-mulambo"
4. Crie utilizador de banco de dados
5. Copie a connection string (ex: `mongodb+srv://user:pass@cluster.mongodb.net/lizi-mulambo`)

### Passo 2: Deploy no Vercel - 5 minutos
1. Aceda a https://vercel.com
2. Crie conta gratuita
3. "Add New..." → "Project"
4. Importe repositório: `afonsoDomingos/lizimulambo`
5. O Vercel detectará automaticamente a configuração de services
6. Configure Environment Variables (para o serviço backend):
   ```
   MONGODB_URI=mongodb+srv://SEU_USER:SEU_PASSWORD@SEU_CLUSTER.mongodb.net/lizi-mulambo
   JWT_SECRET=use_uma_string_longa_e_aleatoria_aqui
   JWT_EXPIRE=7d
   NODE_ENV=production
   FRONTEND_URL=https://SEU_DOMINIO_VERCEL.app
   ```
7. Clique em "Deploy"
8. Aguarde 3-5 minutos

### Passo 3: Criar Administrador - 2 minutos
Após o deploy, execute via terminal ou Postman:
```bash
curl -X POST https://SEU_DOMINIO_VERCEL.app/api/admin/setup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "sua_palavra_passe",
    "email": "admin@exemplo.com"
  }'
```

### Passo 4: Popular Banco de Dados - 2 minutos
Opção A - Via API (mais simples):
Aguardar implementação de endpoint de seed

Opção B - Via terminal local:
```bash
cd backend
MONGODB_URI="sua_connection_string_atlas" node scripts/seed.js
```

### Passo 5: Testar - 2 minutos
1. Aceda à URL do Vercel
2. Navegue pelo site
3. Acesse `/admin/login`
4. Faça login e teste o painel admin

## Resumo das URLs

- **Site**: https://SEU_DOMINIO.vercel.app
- **Admin**: https://SEU_DOMINIO.vercel.app/admin/login
- **API**: https://SEU_DOMINIO.vercel.app/api/* (automático via routing)
- **MongoDB**: mongodb+srv://...

## Custos Totais: R$ 0,00

Todos os serviços são gratuitos para pequenos projetos!

## Vantagens desta Abordagem

✅ **Um único projecto** - Frontend e backend juntos
✅ **Um domínio** - Sem necessidade de subdomínios
✅ **Routing automático** - Vercel lida com `/api/*` → backend
✅ **Deploy simultâneo** - Git push deploya ambos
✅ **Logs centralizados** - Tudo num lugar
✅ **CORS não necessário** - Serviços internos
✅ **Grátis** - Plano gratuito do Vercel

## Como Funciona

O `vercel.json` configurado no repositório:
- Define 2 serviços: `frontend` (Vite) e `backend` (Express)
- Configura rewrites: `/api/*` → backend, `/*` → frontend
- O Vercel roteia automaticamente as requisições

## Troubleshooting Rápido

### Deploy falhou
- Verifique as variáveis de ambiente do backend
- Verifique os logs no painel do Vercel
- Certifique-se que o MongoDB Atlas está acessível

### API não funciona
- Verifique se os rewrites estão correctos
- Confirme que o backend está a correr
- Verifique os logs do serviço backend

### Não consigo criar admin
- Certifique-se que o endpoint `/api/admin/setup` existe
- Verifique se já existe um admin na base de dados
- Confirme a connection string do MongoDB

## Suporte

Para problemas detalhados, consulte o guia completo em `DEPLOYMENT.md`
