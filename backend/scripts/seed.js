/**
 * Script para popular o banco de dados com dados iniciais
 * Execute: node scripts/seed.js
 */

const mongoose = require('mongoose');
const Book = require('../models/Book');
const Author = require('../models/Author');
require('dotenv').config();

const seedData = async () => {
  try {
    console.log('A popular banco de dados...');

    // Criar/atualizar autora
    let author = await Author.findOne();
    if (!author) {
      author = await Author.create({
        name: 'Lizi Mulambo',
        shortBio: 'Lizi Mulambo é coach na área de desenvolvimento pessoal e autora de "Cicatrizes e Coroas — Uma história de superação".',
        fullBio: `Profissional sénior com mais de 20 anos de experiência em gestão administrativa, financeira, recursos humanos e desenvolvimento organizacional, tendo exercido funções de liderança em organizações nacionais e internacionais, incluindo ONG internacionais e empresas privadas.

É licenciada em Administração e Gestão de Empresas e certificada como Coach Integral Sistémica. Possui sólida experiência em liderança corporativa, gestão financeira (incluindo small grants), compliance, procurement, políticas e procedimentos internos, gestão patrimonial, relações institucionais, mediação de conflitos e desenvolvimento de equipas de alto desempenho.

Ao longo da sua carreira representou organizações junto de entidades governamentais, parceiros de cooperação e diferentes partes interessadas, contribuindo para o fortalecimento institucional, transparência, eficiência operacional e boa governação.

Paralelamente, desenvolve uma carreira como Life & Executive Coach, mentora e palestrante, apoiando líderes, profissionais, empreendedores e famílias no fortalecimento da inteligência emocional, liderança consciente, desenvolvimento pessoal, propósito de vida e transformação humana.

É fundadora da Associação Sol Nascente, uma iniciativa dedicada ao desenvolvimento comunitário, inclusão social e fortalecimento das famílias, acreditando que uma sociedade mais forte começa pela transformação das pessoas.

Como palestrante, aborda temas como:
• Liderança feminina e liderança ética;
• Desenvolvimento pessoal e inteligência emocional;
• Resiliência e transformação pessoal;
• Desenvolvimento organizacional;
• Ética, integridade e cultura organizacional;
• Coaching familiar e fortalecimento das relações;
• Gestão de conflitos e comunicação estratégica.

É autora do livro Entre Cicatrizes e Coroas, com lançamento previsto para março de 2027, uma obra dedicada à identidade, resiliência e transformação humana.

Princípio que orienta a sua liderança:
"Acredito numa liderança construída sobre a ética, a integridade e o serviço. O verdadeiro impacto nasce quando o conhecimento, o amor e o propósito se transformam em ações que desenvolvem pessoas, fortalecem organizações e transformam comunidades."`,
        facebook: 'https://web.facebook.com/coachlizimulambo/',
        instagram: 'https://www.instagram.com/lizimulambo2000/',
        linkedin: 'https://www.linkedin.com/in/lizi-mulambo-67a87064',
        whatsapp: '+258 85 767 0109',
        whatsappLink: 'https://wa.me/258857670109'
      });
      console.log('✓ Autora criada');
    } else {
      console.log('✓ Autora já existe');
    }

    // Verificar se já existe o livro
    const existingBook = await Book.findOne({ slug: 'cicatrizes-e-coroas' });
    if (!existingBook) {
      const book = await Book.create({
        title: 'Cicatrizes e Coroas',
        subtitle: 'Uma história de superação',
        author: 'Lizi Mulambo',
        synopsis: '',
        format: 'físico',
        price: null,
        currency: 'MZN',
        availability: 'indisponível',
        coverImage: '',
        featured: true,
        published: true,
        slug: 'cicatrizes-e-coroas'
      });
      console.log('✓ Livro "Cicatrizes e Coroas" criado');
    } else {
      console.log('✓ Livro "Cicatrizes e Coroas" já existe');
    }

    console.log('\n✓ Banco de dados populado com sucesso!');
    console.log('\nPróximos passos:');
    console.log('1. Faça login em /admin/login');
    console.log('2. Actualize a biografia da autora no painel administrativo');
    console.log('3. Adicione a capa, sinopse, preço e disponibilidade do livro');
    
    process.exit(0);
  } catch (error) {
    console.error('Erro ao popular banco de dados:', error.message);
    process.exit(1);
  }
};

// Conectar ao MongoDB e popular dados
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
    seedData();
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  });
