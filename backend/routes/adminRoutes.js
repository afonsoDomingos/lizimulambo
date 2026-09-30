const express = require('express');
const router = express.Router();
const { login, getProfile, setupFirstAdmin } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { body } = require('express-validator');

router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('O nome de utilizador é obrigatório'),
    body('password').notEmpty().withMessage('A palavra-passe é obrigatória')
  ],
  login
);

router.get('/profile', protect, getProfile);

router.post(
  '/setup',
  [
    body('username').notEmpty().withMessage('O nome de utilizador é obrigatório'),
    body('password').isLength({ min: 6 }).withMessage('A palavra-passe deve ter pelo menos 6 caracteres'),
    body('email').isEmail().withMessage('Email inválido')
  ],
  setupFirstAdmin
);

module.exports = router;
