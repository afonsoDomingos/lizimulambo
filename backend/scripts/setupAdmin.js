/**
 * Script para criar o primeiro administrador
 * Execute: node scripts/setupAdmin.js
 */

const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Verificar se já existe um admin
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      console.log('Já existe um administrador. Use o endpoint /api/admin/setup ou contacte o administrador existente.');
      process.exit(1);
    }

    // Solicitar dados
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const question = (prompt) => {
      return new Promise((resolve) => {
        rl.question(prompt, resolve);
      });
    };

    const username = await question('Nome de utilizador: ');
    const password = await question('Palavra-passe (mínimo 6 caracteres): ');
    const email = await question('Email: ');

    if (password.length < 6) {
      console.log('A palavra-passe deve ter pelo menos 6 caracteres.');
      rl.close();
      process.exit(1);
    }

    // Criar admin
    const admin = await Admin.create({
      username,
      password,
      email
    });

    console.log('✓ Administrador criado com sucesso!');
    console.log(`Username: ${admin.username}`);
    console.log(`Email: ${admin.email}`);
    console.log('\nAgora pode fazer login em /admin/login');

    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('Erro ao criar administrador:', error.message);
    process.exit(1);
  }
};

// Conectar ao MongoDB e criar admin
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
    createAdmin();
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  });
