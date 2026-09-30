const express = require('express');
const router = express.Router();
const { getAuthor, updateAuthor } = require('../controllers/authorController');
const { protect } = require('../middleware/auth');

// Rotas públicas
router.get('/', getAuthor);

// Rotas administrativas
router.put('/admin', protect, updateAuthor);

module.exports = router;
