const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  author: {
    type: String,
    required: true,
    default: 'Lizi Mulambo'
  },
  synopsis: {
    type: String,
    default: ''
  },
  format: {
    type: String,
    enum: ['físico', 'digital', 'físico e digital'],
    default: 'físico'
  },
  price: {
    type: Number,
    default: null
  },
  currency: {
    type: String,
    default: 'MZN'
  },
  availability: {
    type: String,
    enum: ['disponível', 'esgotado', 'pré-venda', 'indisponível'],
    default: 'indisponível'
  },
  coverImage: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: false
  },
  publicationDate: {
    type: Date,
    default: null
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

bookSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Book', bookSchema);
