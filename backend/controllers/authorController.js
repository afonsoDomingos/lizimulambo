const Author = require('../models/Author');
const { validationResult } = require('express-validator');

// @desc    Obter informações da autora
// @route   GET /api/author
// @access  Public
exports.getAuthor = async (req, res) => {
  try {
    const author = await Author.findOne();
    
    if (!author) {
      return res.status(404).json({ message: 'Informações da autora não encontradas' });
    }
    
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter informações da autora', error: error.message });
  }
};

// @desc    Actualizar informações da autora
// @route   PUT /api/admin/author
// @access  Private (Admin)
exports.updateAuthor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let author = await Author.findOne();
    
    if (!author) {
      author = await Author.create(req.body);
    } else {
      author = await Author.findOneAndUpdate({}, req.body, {
        new: true,
        runValidators: true
      });
    }

    res.json(author);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao actualizar informações da autora', error: error.message });
  }
};
