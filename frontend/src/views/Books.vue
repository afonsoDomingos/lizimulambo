<template>
  <div class="books">
    <section class="books-hero">
      <div class="container">
        <h1 class="page-title">Livros</h1>
        <p class="page-subtitle">Descubra as obras de Lizi Mulambo</p>
      </div>
    </section>

    <section class="books-content">
      <div class="container">
        <div v-if="loading" class="loading">
          <p>A carregar livros...</p>
        </div>
        <div v-else-if="books.length === 0" class="no-books">
          <p>Em breve, novos livros estarão disponíveis.</p>
        </div>
        <div v-else class="books-grid">
          <div 
            v-for="book in books" 
            :key="book._id" 
            class="book-card"
            :class="{ featured: book.featured }"
          >
            <div class="book-cover">
              <div v-if="book.coverImage" class="cover-image">
                <img :src="book.coverImage" :alt="book.title" />
              </div>
              <div v-else class="cover-placeholder">
                <p>Capa</p>
              </div>
            </div>
            <div class="book-details">
              <h3>{{ book.title }}</h3>
              <p v-if="book.subtitle" class="book-subtitle">{{ book.subtitle }}</p>
              <p class="book-author">{{ book.author }}</p>
              <router-link :to="`/livro/${book.slug}`" class="btn btn-small">
                Ver detalhes
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const books = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await axios.get('/api/books')
    books.value = response.data
  } catch (error) {
    console.error('Erro ao carregar livros:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.books {
  min-height: 100vh;
}

.books-hero {
  background: linear-gradient(135deg, #FFFAF0 0%, #F5E6D3 100%);
  padding: 4rem 2rem;
  text-align: center;
}

.page-title {
  font-family: 'Georgia', serif;
  font-size: 3rem;
  color: #1a1a1a;
  margin: 0 0 1rem 0;
}

.page-subtitle {
  font-size: 1.25rem;
  color: #666;
  margin: 0;
}

.books-content {
  padding: 4rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.loading,
.no-books {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  font-size: 1.125rem;
}

.books-grid {
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

.cover-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-family: 'Georgia', serif;
  background-color: #D4AF37;
  color: #FFFAF0;
}

.btn:hover {
  background-color: #B4941F;
}

.btn-small {
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .books-grid {
    grid-template-columns: 1fr;
  }
}
</style>
