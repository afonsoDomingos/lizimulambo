const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');

router.post('/cover', protect, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum ficheiro enviado' });
    }
    
    res.json({
      message: 'Imagem carregada com sucesso',
      imageUrl: `/uploads/${req.file.filename}`
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao carregar imagem', error: error.message });
  }
});

router.post('/author-photo', protect, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum ficheiro enviado' });
    }
    
    res.json({
      message: 'Foto carregada com sucesso',
      imageUrl: `/uploads/${req.file.filename}`
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao carregar foto', error: error.message });
  }
});

module.exports = router;
