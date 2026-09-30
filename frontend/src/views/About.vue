<template>
  <div class="about">
    <section class="about-hero">
      <div class="container">
        <h1 class="page-title">Sobre Lizi Mulambo</h1>
      </div>
    </section>

    <section class="about-content">
      <div class="container">
        <div class="author-full">
          <div class="author-photo-large">
            <div class="photo-placeholder-large">
              <p>Foto da autora</p>
            </div>
          </div>
          <div class="author-bio-full">
            <h2 class="section-title">Biografia</h2>
            <div v-if="author" class="bio-content">
              <p class="short-bio">{{ author.shortBio }}</p>
              <p v-if="author.fullBio" class="full-bio">{{ author.fullBio }}</p>
            </div>
            <div v-else class="bio-content">
              <p class="short-bio">
                Lizi Mulambo é coach na área de desenvolvimento pessoal e autora de "Cicatrizes e Coroas — Uma história de superação".
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <h2 class="section-title">Contactos</h2>
        <div class="contact-grid">
          <a 
            href="https://web.facebook.com/coachlizimulambo/" 
            target="_blank" 
            rel="noopener noreferrer"
            class="contact-card"
          >
            <div class="contact-icon">Facebook</div>
            <p>Seguir no Facebook</p>
          </a>
          <a 
            href="https://www.instagram.com/lizimulambo2000/" 
            target="_blank" 
            rel="noopener noreferrer"
            class="contact-card"
          >
            <div class="contact-icon">Instagram</div>
            <p>Seguir no Instagram</p>
          </a>
          <a 
            href="https://wa.me/258857670109" 
            target="_blank" 
            rel="noopener noreferrer"
            class="contact-card"
          >
            <div class="contact-icon">WhatsApp</div>
            <p>Contactar pelo WhatsApp</p>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const author = ref(null)

onMounted(async () => {
  try {
    const response = await axios.get('/api/author')
    author.value = response.data
  } catch (error) {
    console.error('Erro ao carregar informações da autora:', error)
  }
})
</script>

<style scoped>
.about {
  min-height: 100vh;
}

.about-hero {
  background: linear-gradient(135deg, #FFFAF0 0%, #F5E6D3 100%);
  padding: 4rem 2rem;
  text-align: center;
}

.page-title {
  font-family: 'Georgia', serif;
  font-size: 3rem;
  color: #1a1a1a;
  margin: 0;
}

.about-content {
  padding: 4rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.author-full {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.author-photo-large {
  display: flex;
  justify-content: center;
}

.photo-placeholder-large {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #D4AF37 0%, #B4941F 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFAF0;
  font-family: 'Georgia', serif;
  font-size: 1.25rem;
}

.author-bio-full {
  padding: 2rem 0;
}

.section-title {
  font-family: 'Georgia', serif;
  font-size: 2rem;
  color: #1a1a1a;
  margin-bottom: 2rem;
}

.bio-content {
  line-height: 1.8;
}

.short-bio,
.full-bio {
  font-size: 1.125rem;
  color: #444;
  margin-bottom: 1.5rem;
}

.contact-section {
  padding: 4rem 2rem;
  background-color: #f9f9f9;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.contact-card {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  color: #1a1a1a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.contact-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #D4AF37;
}

.contact-card p {
  margin: 0;
  color: #666;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .author-full {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .photo-placeholder-large {
    width: 300px;
    height: 300px;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
