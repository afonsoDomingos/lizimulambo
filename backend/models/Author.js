const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Lizi Mulambo'
  },
  shortBio: {
    type: String,
    default: 'Lizi Mulambo é coach na área de desenvolvimento pessoal e autora de "Cicatrizes e Coroas — Uma história de superação".'
  },
  fullBio: {
    type: String,
    default: ''
  },
  photo: {
    type: String,
    default: ''
  },
  facebook: {
    type: String,
    default: 'https://web.facebook.com/coachlizimulambo/'
  },
  instagram: {
    type: String,
    default: 'https://www.instagram.com/lizimulambo2000/'
  },
  linkedin: {
    type: String,
    default: 'https://www.linkedin.com/in/lizi-mulambo-67a87064'
  },
  whatsapp: {
    type: String,
    default: '+258 85 767 0109'
  },
  whatsappLink: {
    type: String,
    default: 'https://wa.me/258857670109'
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

authorSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Author', authorSchema);
