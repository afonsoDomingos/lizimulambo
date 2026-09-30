const Book = require('../models/Book');
const { validationResult } = require('express-validator');

// @desc    Obter todos os livros publicados
// @route   GET /api/books
// @access  Public
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ published: true }).sort({ featured: -1, createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter livros', error: error.message });
  }
};

// @desc    Obter livro por slug
// @route   GET /api/books/:slug
// @access  Public
exports.getBookBySlug = async (req, res) => {
  try {
    const book = await Book.findOne({ slug: req.params.slug, published: true });
    
    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter livro', error: error.message });
  }
};

// @desc    Obter livro em destaque
// @route   GET /api/books/featured
// @access  Public
exports.getFeaturedBook = async (req, res) => {
  try {
    const book = await Book.findOne({ featured: true, published: true });
    
    if (!book) {
      return res.status(404).json({ message: 'Nenhum livro em destaque' });
    }
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter livro em destaque', error: error.message });
  }
};

// @desc    Obter todos os livros (incluindo não publicados)
// @route   GET /api/admin/books
// @access  Private (Admin)
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter livros', error: error.message });
  }
};

// @desc    Criar novo livro
// @route   POST /api/admin/books
// @access  Private (Admin)
exports.createBook = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar livro', error: error.message });
  }
};

// @desc    Actualizar livro
// @route   PUT /api/admin/books/:id
// @access  Private (Admin)
exports.updateBook = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao actualizar livro', error: error.message });
  }
};

// @desc    Eliminar livro
// @route   DELETE /api/admin/books/:id
// @access  Private (Admin)
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    res.json({ message: 'Livro eliminado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao eliminar livro', error: error.message });
  }
};
