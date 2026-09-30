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
    default: 'Profissional sénior com mais de 20 anos de experiência em gestão administrativa, financeira, recursos humanos e desenvolvimento organizacional, tendo exercido funções de liderança em organizações nacionais e internacionais, incluindo ONG internacionais e empresas privadas.\n\nÉ licenciada em Administração e Gestão de Empresas e certificada como Coach Integral Sistémica. Possui sólida experiência em liderança corporativa, gestão financeira (incluindo small grants), compliance, procurement, políticas e procedimentos internos, gestão patrimonial, relações institucionais, mediação de conflitos e desenvolvimento de equipas de alto desempenho.\n\nAo longo da sua carreira representou organizações junto de entidades governamentais, parceiros de cooperação e diferentes partes interessadas, contribuindo para o fortalecimento institucional, transparência, eficiência operacional e boa governação.\n\nParalelamente, desenvolve uma carreira como Life & Executive Coach, mentora e palestrante, apoiando líderes, profissionais, empreendedores e famílias no fortalecimento da inteligência emocional, liderança consciente, desenvolvimento pessoal, propósito de vida e transformação humana.\n\nÉ fundadora da Associação Sol Nascente, uma iniciativa dedicada ao desenvolvimento comunitário, inclusão social e fortalecimento das famílias, acreditando que uma sociedade mais forte começa pela transformação das pessoas.\n\nComo palestrante, aborda temas como:\n• Liderança feminina e liderança ética;\n• Desenvolvimento pessoal e inteligência emocional;\n• Resiliência e transformação pessoal;\n• Desenvolvimento organizacional;\n• Ética, integridade e cultura organizacional;\n• Coaching familiar e fortalecimento das relações;\n• Gestão de conflitos e comunicação estratégica.\n\nÉ autora do livro Entre Cicatrizes e Coroas, com lançamento previsto para março de 2027, uma obra dedicada à identidade, resiliência e transformação humana.\n\nPrincípio que orienta a sua liderança:\n"Acredito numa liderança construída sobre a ética, a integridade e o serviço. O verdadeiro impacto nasce quando o conhecimento, o amor e o propósito se transformam em ações que desenvolvem pessoas, fortalecem organizações e transformam comunidades."'
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
