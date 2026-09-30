# Guia de Deployment

## Opção Recomendada: Vercel Services (Full-Stack em um projeto)

### Por que esta abordagem?
- **Vercel Services**: Deploy de frontend e backend em um único projeto
- **Routing automático**: Vercel lida com routing entre serviços via rewrites
- **Domínio único**: Frontend e backend no mesmo domínio
- **Grátis**: Ambos os serviços no plano gratuito do Vercel
- **Deploy automático**: Git push triggera deploy de ambos os serviços
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

## Passo 2: Deploy no Vercel com Services

### 2.1 Configurar Variáveis de Ambiente no Vercel

O `vercel.json` já está configurado no repositório. Agora precisa configurar as variáveis de ambiente.

**Variáveis necessárias para o serviço backend:**
- `MONGODB_URI` - Connection string do MongoDB Atlas
- `JWT_SECRET` - Segredo para JWT tokens (use uma string longa e aleatória)
- `JWT_EXPIRE` - Tempo de expiração do token (ex: `7d`)
- `NODE_ENV` - `production`
- `FRONTEND_URL` - URL do domínio Vercel (opcional, para CORS)

### 2.2 Deploy via Dashboard Vercel

1. Aceda a [Vercel](https://vercel.com)
2. Crie uma conta gratuita
3. Clique em "Add New..." → "Project"
4. Importe o repositório GitHub: `afonsoDomingos/lizimulambo`
5. O Vercel detectará automaticamente a configuração de services
6. Configure as variáveis de ambiente:
   - Clique em "Environment Variables"
   - Adicione as variáveis do backend (veja acima)
   - Selecione o serviço "backend" para cada variável
7. Clique em "Deploy"
8. Aguarde o deploy de ambos os serviços (aprox. 3-5 minutos)
9. Copie a URL do projecto (ex: `https://lizi-mulambo.vercel.app`)

### 2.3 Deploy via Vercel CLI

1. Instale Vercel CLI:
```bash
npm install -g vercel
```

2. Faça login:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Siga as instruções no terminal
5. Quando perguntado sobre variáveis de ambiente, adicione as do backend

---

## Passo 3: Configurar CORS no Backend

No ficheiro `backend/server.js`, a configuração CORS já está preparada. No Vercel, o routing interno não requer CORS, mas é boa prática manter.

No painel do Vercel, adicione a variável de ambiente para o backend:
```
FRONTEND_URL=https://SEU_DOMINIO_VERCEL.app
```

---

## Passo 4: Criar Primeiro Administrador

Após o deploy, crie o primeiro administrador executando:

**Via API (usando curl ou Postman):**
```bash
curl -X POST https://SEU_DOMINIO_VERCEL.app/api/admin/setup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "sua_palavra_passe_segura",
    "email": "admin@exemplo.com"
  }'
```

Ou acesse diretamente:
```
https://SEU_DOMINIO_VERCEL.app/api/admin/setup
```

**Nota:** Este endpoint só funciona se não existir nenhum administrador na base de dados.

---

## Passo 5: Popular Banco de Dados

1. Acesse o painel do Vercel
2. Clique no serviço "backend"
3. Vá para "Logs" → "Function Logs"
4. Ou execute localmente com a connection string de produção:
```bash
cd backend
MONGODB_URI="sua_connection_string_atlas" node scripts/seed.js
```

---

## Passo 6: Testar o Deploy

1. Aceda à URL do Vercel
2. Verifique se o site carrega correctamente
3. Teste a navegação entre páginas
4. Teste o botão do WhatsApp
5. Acesse `/admin/login` e faça login
6. Verifique se as chamadas à API funcionam
7. Teste a gestão de livros no painel admin

---

## Como Funciona o Routing com Vercel Services

### Configuração no vercel.json
```json
{
  "services": {
    "frontend": {
      "root": "frontend",
      "framework": "vite"
    },
    "backend": {
      "root": "backend",
      "framework": null,
      "buildCommand": "npm install",
      "startCommand": "node server.js"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": { "service": "backend" }
    },
    {
      "source": "/uploads/(.*)",
      "destination": { "service": "backend" }
    },
    {
      "source": "/(.*)",
      "destination": { "service": "frontend" }
    }
  ]
}
```

### Fluxo de Requisições
1. Utilizador acessa `https://seu-dominio.vercel.app`
2. Vercel roteia para o serviço `frontend` (catch-all `/(.*)`)
3. Frontend faz chamada para `/api/books`
4. Vercel detecta o padrão `/api/*` e roteia para o serviço `backend`
5. Backend processa a requisição e retorna resposta
6. Tudo transparente para o utilizador

---

## Solução de Problemas

### Backend não inicia no Vercel
- Verifique se as variáveis de ambiente estão configuradas
- Certifique-se que `MONGODB_URI` está correcto
- Verifique os logs no painel do Vercel

### CORS errors
- No Vercel Services, o routing interno não requer CORS
- Se ainda tiver problemas, adicione `FRONTEND_URL` nas variáveis de ambiente

### MongoDB connection timeout
- Verifique se o IP whitelist no MongoDB Atlas permite conexões
- Certifique-se que o cluster está activo (não suspenso)
- Verifique se a connection string está correcta

### Upload de imagens não funciona
- Vercel Functions têm limitações para armazenamento local
- Considere usar um serviço de armazenamento cloud:
  - Cloudinary (grátis para pequenos projetos)
  - Vercel Blob Storage
  - AWS S3

### Rotas do frontend não funcionam
- Verifique se o catch-all `/(.*)` está no final dos rewrites
- O Vercel deve servir o `index.html` para rotas SPA

---

## Monitoramento e Logs

### Vercel Dashboard
1. Aceda ao dashboard do Vercel
2. Clique no projecto
3. Verifique os logs de cada serviço separadamente
4. "Deployments" mostra histórico de deploys
5. "Logs" mostra logs em tempo real

### Desenvolvimento Local com Vercel Dev
```bash
vercel dev
```
Este comando:
- Inicia ambos os serviços localmente
- Simula o routing do Vercel
- Injeta variáveis de ambiente
- Útil para testar antes do deploy

---

## Custos

### Plano Gratuito (Disponível)

**MongoDB Atlas**
- 512 MB de armazenamento
- Compartilhado cluster
- Gratuito para sempre

**Vercel**
- Hospedagem frontend ilimitada
- Serverless Functions (backend)
- 100 GB bandwidth/mês
- Deploy automático
- Gratuito para uso pessoal

### Plano Pago (Recomendado para Produção)

Se o site tiver muito tráfego, considere:
- Vercel Pro: $20/mês (bandwidth ilimitada, sem limites)
- MongoDB Atlas: $9/mês (dedicated cluster)

---

## Domínio Personalizado

### Configurar no Vercel
1. Aceda ao dashboard do Vercel
2. Clique no projecto → "Settings" → "Domains"
3. Adicione o domínio (ex: `lizimulambo.com`)
4. Configure os DNS no seu registador de domínios
5. O Vercel fornecerá os registros DNS necessários

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
- Active HTTPS (automático no Vercel)
- Limite o IP whitelist no MongoDB Atlas

---

## Comparação com Outras Opções

### Vercel Services vs Vercel + Render
| Característica | Vercel Services | Vercel + Render |
|---------------|----------------|-----------------|
| Domínios | 1 | 2 |
| Configuração | Simples | Moderada |
| Custos | Grátis | Grátis |
| CORS | Não necessário | Necessário |
| Deploy | Simultâneo | Separado |
| Logs | Centralizado | Separados |

### Quando Usar Vercel + Render
- Se precisar de backend sempre activo (Vercel Functions tem cold starts)
- Se tiver operações longas (uploads grandes, processamento pesado)
- Se preferir separar responsabilidades

---

## Rollback

Se algo der errado após o deploy:

1. Aceda ao dashboard do Vercel
2. Clique em "Deployments"
3. Encontre o deploy anterior que funcionava
4. Clique nos três pontos → "Redeploy"
5. Ou use Git para reverter:
```bash
git revert <commit-hash>
git push origin main
```
