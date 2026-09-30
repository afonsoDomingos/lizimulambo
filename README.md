# Lizi Mulambo - Website Oficial

Website elegante e responsivo para Lizi Mulambo, coach na área de desenvolvimento pessoal e autora de "Cicatrizes e Coroas — Uma história de superação".

## 📋 Funcionalidades

- **Página Inicial**: Apresentação do livro "Cicatrizes e Coroas" com chamada para acção
- **Sobre a Autora**: Biografia e informações sobre Lizi Mulambo
- **Catálogo de Livros**: Lista de livros publicados com detalhes individuais
- **Integração WhatsApp**: Sistema de encomendas directas pelo WhatsApp
- **Painel Administrativo**: Área protegida para gerir livros e informações da autora
- **Design Responsivo**: Optimizado para desktop e mobile
- **SEO Optimizado**: Meta tags, Open Graph e dados estruturados
- **Acessibilidade**: Navegação por teclado, contraste adequado e labels

## 🛠️ Stack Tecnológico

### Frontend
- Vue 3 com Composition API
- Vite (build tool)
- Vue Router (navegação)
- Axios (requisições HTTP)

### Backend
- Node.js
- Express.js
- MongoDB com Mongoose
- JWT (autenticação)
- Multer (upload de ficheiros)
- Helmet (segurança)
- Express Rate Limit (proteção contra abuso)

## 📦 Instalação

### Pré-requisitos
- Node.js (v16 ou superior)
- MongoDB (local ou na cloud)
- npm ou yarn

### Backend

1. Navegue para a pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Crie o ficheiro `.env` baseado no `.env.example`:
```bash
cp .env.example .env
```

4. Configure as variáveis de ambiente no ficheiro `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lizi-mulambo
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Inicie o servidor MongoDB (se estiver a usar local):
```bash
mongod
```

6. Inicie o servidor backend:
```bash
npm run dev
```

O servidor estará a correr em `http://localhost:5000`

### Frontend

1. Navegue para a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará a correr em `http://localhost:5173`

## 🔧 Configuração Inicial

### Criar o Primeiro Administrador

Após configurar o backend, crie o primeiro administrador executando:

```bash
curl -X POST http://localhost:5000/api/admin/setup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "sua_palavra_passe_segura",
    "email": "admin@exemplo.com"
  }'
```

Ou use uma ferramenta como Postman ou Insomnia para fazer a requisição POST para `http://localhost:5000/api/admin/setup` com o seguinte body:

```json
{
  "username": "admin",
  "password": "sua_palavra_passe_segura",
  "email": "admin@exemplo.com"
}
```

**Nota**: Este endpoint só funciona se não existir nenhum administrador na base de dados.

### Adicionar o Primeiro Livro

1. Faça login em `/admin/login`
2. Navegue para o painel administrativo em `/admin`
3. Clique em "Adicionar Livro"
4. Preencha os dados do livro:
   - Título: "Cicatrizes e Coroas"
   - Subtítulo: "Uma história de superação"
   - Slug: "cicatrizes-e-coroas"
   - Marque como "Livro em destaque"
   - Marque "Publicar livro"
5. Clique em "Guardar"

### Actualizar Informações da Autora

1. No painel administrativo, clique na aba "Autora"
2. Actualize a biografia, foto e contactos
3. Clique em "Guardar"

## 📂 Estrutura do Projecto

```
lizi-mulambo/
├── backend/
│   ├── config/
│   │   └── database.js          # Configuração MongoDB
│   ├── controllers/
│   │   ├── adminController.js   # Lógica de autenticação
│   │   ├── authorController.js  # Lógica da autora
│   │   └── bookController.js    # Lógica dos livros
│   ├── middleware/
│   │   ├── auth.js              # Middleware de autenticação
│   │   └── upload.js            # Middleware de upload
│   ├── models/
│   │   ├── Admin.js             # Modelo do administrador
│   │   ├── Author.js            # Modelo da autora
│   │   └── Book.js              # Modelo dos livros
│   ├── routes/
│   │   ├── adminRoutes.js       # Rotas de admin
│   │   ├── authorRoutes.js      # Rotas da autora
│   │   ├── bookRoutes.js        # Rotas dos livros
│   │   └── uploadRoutes.js      # Rotas de upload
│   ├── uploads/                 # Ficheiros carregados
│   ├── .env.example             # Exemplo de variáveis de ambiente
│   ├── package.json
│   └── server.js                # Entrada do servidor
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   └── styles/
│   │   │       └── main.css    # Estilos globais
│   │   ├── components/
│   │   │   ├── Footer.vue
│   │   │   ├── Header.vue
│   │   │   ├── MetaTags.vue
│   │   │   └── WhatsAppButton.vue
│   │   ├── router/
│   │   │   └── index.js         # Configuração de rotas
│   │   ├── views/
│   │   │   ├── About.vue
│   │   │   ├── AdminDashboard.vue
│   │   │   ├── AdminLogin.vue
│   │   │   ├── BookDetail.vue
│   │   │   ├── Books.vue
│   │   │   ├── Contact.vue
│   │   │   └── Home.vue
│   │   ├── App.vue
│   │   └── main.js
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🚀 Build para Produção

### Frontend

```bash
cd frontend
npm run build
```

Os ficheiros de produção serão gerados na pasta `dist/`.

### Backend

```bash
cd backend
npm start
```

## 🔒 Segurança

- Todas as rotas administrativas são protegidas com JWT
- Palavras-passe são encriptadas com bcrypt
- Rate limiting implementado para prevenir abuso
- Helmet para headers de segurança
- Validação de dados com express-validator
- Upload de ficheiros com validação de tipo e tamanho

## 📱 Onde Inserir Conteúdo

### Capa Oficial do Livro

1. No painel administrativo, edite o livro "Cicatrizes e Coroas"
2. No campo "URL da Capa", insira o caminho da imagem
3. Alternativamente, pode colocar a imagem na pasta `backend/uploads/` e usar o caminho relativo

### Biografia Completa

1. No painel administrativo, clique na aba "Autora"
2. No campo "Biografia Completa", insira a biografia detalhada
3. Clique em "Guardar"

### Sinopse Oficial

1. No painel administrativo, edite o livro
2. No campo "Sinopse", insira a sinopse oficial
3. Clique em "Guardar"

### Preço e Condições de Entrega

1. No painel administrativo, edite o livro
2. Defina o preço em meticais
3. Selecione a disponibilidade (disponível, esgotado, pré-venda)
4. Clique em "Guardar"

## 🤝 Suporte

Para suporte ou questões, contacte através do WhatsApp: +258 85 767 0109

## 📄 Licença

Este projecto é propriedade de Lizi Mulambo. Todos os direitos reservados.
