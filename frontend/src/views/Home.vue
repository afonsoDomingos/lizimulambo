<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-container">
        <div class="hero-content">
          <span class="hero-badge">Novo lançamento</span>
          <h1 id="hero-title" class="hero-title">Cicatrizes e Coroas</h1>
          <h2 class="hero-subtitle">Uma história de superação</h2>
          <p class="hero-description">
            Conheça o novo livro de Lizi Mulambo e descubra uma história de superação.
          </p>
          <div class="hero-buttons">
            <a 
              :href="whatsappLink" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn btn-primary"
              aria-label="Comprar o livro Cicatrizes e Coroas pelo WhatsApp"
            >
              Quero comprar o livro
            </a>
            <router-link to="/sobre" class="btn btn-secondary">
              Conhecer a autora
            </router-link>
          </div>
        </div>
        <div class="hero-image" role="img" aria-label="Capa do livro Cicatrizes e Coroas">
          <div class="book-placeholder">
            <p>Capa do livro</p>
            <span class="placeholder-text">A carregar...</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Book Preview Section -->
    <section class="book-preview">
      <div class="container">
        <h2 class="section-title">Sobre o livro</h2>
        <div class="book-info">
          <div class="book-info-content">
            <div class="info-row">
              <span class="info-label">Sinopse:</span>
              <span class="info-value">Consulte a sinopse oficial pelo WhatsApp</span>
            </div>
            <div class="info-row">
              <span class="info-label">Formato:</span>
              <span class="info-value">A confirmar</span>
            </div>
            <div class="info-row">
              <span class="info-label">Preço:</span>
              <span class="info-value">Consulte o preço pelo WhatsApp</span>
            </div>
            <div class="info-row">
              <span class="info-label">Disponibilidade:</span>
              <span class="info-value">Consulte a disponibilidade pelo WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Author Preview Section -->
    <section class="author-preview">
      <div class="container">
        <div class="author-grid">
          <div class="author-photo">
            <div class="photo-placeholder">
              <p>Foto da autora</p>
            </div>
          </div>
          <div class="author-info">
            <h2 class="section-title">Sobre Lizi Mulambo</h2>
            <p class="author-bio">
              Lizi Mulambo é coach na área de desenvolvimento pessoal e autora de "Cicatrizes e Coroas — Uma história de superação".
            </p>
            <router-link to="/sobre" class="btn btn-text">
              Saber mais →
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Catalog Section -->
    <section class="catalog">
      <div class="container">
        <h2 class="section-title">Catálogo</h2>
        <div class="catalog-grid">
          <div v-if="featuredBook" class="book-card featured">
            <div class="book-cover">
              <div class="cover-placeholder">
                <p>Capa</p>
              </div>
            </div>
            <div class="book-details">
              <h3>{{ featuredBook.title }}</h3>
              <p v-if="featuredBook.subtitle" class="book-subtitle">{{ featuredBook.subtitle }}</p>
              <p class="book-author">{{ featuredBook.author }}</p>
              <router-link :to="`/livro/${featuredBook.slug}`" class="btn btn-small">
                Ver detalhes
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <h2 class="cta-title">Garanta o seu exemplar de Cicatrizes e Coroas</h2>
        <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-large">
          Encomendar pelo WhatsApp
        </a>
        <p class="cta-note">A encomenda será combinada pelo WhatsApp</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const featuredBook = ref(null)
const whatsappLink = ref('https://wa.me/258857670109?text=Ol%C3%A1%2C%20Lizi.%20Gostaria%20de%20comprar%20o%20livro%20Cicatrizes%20e%20Coroas.%20Pode%20informar%20o%20pre%C3%A7o%2C%20a%20disponibilidade%20e%20as%20formas%20de%20entrega%3F')

onMounted(async () => {
  try {
    const response = await axios.get('/api/books/featured')
    featuredBook.value = response.data
  } catch (error) {
    console.error('Erro ao carregar livro em destaque:', error)
  }
})
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  background: linear-gradient(135deg, #FFFAF0 0%, #F5E6D3 100%);
  padding: 4rem 2rem;
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-content {
  animation: fadeInLeft 1s ease;
}

.hero-badge {
  display: inline-block;
  background-color: #D4AF37;
  color: #FFFAF0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-family: 'Georgia', serif;
  font-size: 3.5rem;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-family: 'Georgia', serif;
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.hero-description {
  font-size: 1.125rem;
  color: #444;
  margin-bottom: 2rem;
  line-height: 1.8;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-image {
  display: flex;
  justify-content: center;
  animation: fadeInRight 1s ease;
}

.book-placeholder {
  width: 300px;
  height: 450px;
  background: linear-gradient(135deg, #D4AF37 0%, #B4941F 100%);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #FFFAF0;
  font-family: 'Georgia', serif;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.placeholder-text {
  font-size: 0.875rem;
  opacity: 0.8;
  margin-top: 0.5rem;
}

.book-preview,
.author-preview,
.catalog,
.cta {
  padding: 4rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-family: 'Georgia', serif;
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 2rem;
  text-align: center;
}

.book-info {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.info-row {
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: bold;
  color: #1a1a1a;
  width: 150px;
  flex-shrink: 0;
}

.info-value {
  color: #666;
}

.author-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.photo-placeholder {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #D4AF37 0%, #B4941F 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFAF0;
  font-family: 'Georgia', serif;
  margin: 0 auto;
}

.author-bio {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #444;
  margin-bottom: 1.5rem;
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.book-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.book-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.book-card.featured {
  border: 2px solid #D4AF37;
}

.book-cover {
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #F5E6D3 0%, #E8D4B8 100%);
}

.cover-placeholder {
  color: #666;
  font-family: 'Georgia', serif;
}

.book-details {
  padding: 1.5rem;
}

.book-details h3 {
  font-family: 'Georgia', serif;
  font-size: 1.25rem;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.book-subtitle {
  color: #666;
  font-style: italic;
  margin-bottom: 0.5rem;
}

.book-author {
  color: #888;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.cta {
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
  color: #FFFAF0;
  text-align: center;
}

.cta-title {
  color: #FFFAF0;
  margin-bottom: 2rem;
}

.cta-note {
  margin-top: 1rem;
  color: #888;
  font-size: 0.875rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-family: 'Georgia', serif;
}

.btn-primary {
  background-color: #D4AF37;
  color: #FFFAF0;
}

.btn-primary:hover {
  background-color: #B4941F;
}

.btn-secondary {
  background-color: transparent;
  color: #1a1a1a;
  border: 2px solid #1a1a1a;
}

.btn-secondary:hover {
  background-color: #1a1a1a;
  color: #FFFAF0;
}

.btn-text {
  background: none;
  color: #D4AF37;
  padding: 0;
  font-weight: bold;
}

.btn-text:hover {
  text-decoration: underline;
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.25rem;
  }

  .book-placeholder {
    width: 250px;
    height: 375px;
  }

  .author-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .info-row {
    flex-direction: column;
    gap: 0.5rem;
  }

  .info-label {
    width: 100%;
  }
}
</style>
