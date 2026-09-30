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
        fullBio: '',
        facebook: 'https://web.facebook.com/coachlizimulambo/',
        instagram: 'https://www.instagram.com/lizimulambo2000/',
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
