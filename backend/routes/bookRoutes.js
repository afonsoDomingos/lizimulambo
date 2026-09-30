const express = require('express');
const router = express.Router();
const {
  getBooks,
  getBookBySlug,
  getFeaturedBook,
  getAllBooks,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');
const { protect } = require('../middleware/auth');
const { body } = require('express-validator');

// Rotas públicas
router.get('/', getBooks);
router.get('/featured', getFeaturedBook);
router.get('/:slug', getBookBySlug);

// Rotas administrativas
router.get('/admin/all', protect, getAllBooks);
router.post(
  '/admin',
  protect,
  [
    body('title').notEmpty().withMessage('O título é obrigatório'),
    body('slug').notEmpty().withMessage('O slug é obrigatório')
  ],
  createBook
);
router.put(
  '/admin/:id',
  protect,
  [
    body('title').optional().notEmpty().withMessage('O título não pode estar vazio'),
    body('slug').optional().notEmpty().withMessage('O slug não pode estar vazio')
  ],
  updateBook
);
router.delete('/admin/:id', protect, deleteBook);

module.exports = router;
