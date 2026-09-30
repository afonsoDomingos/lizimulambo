<template>
  <div class="book-detail">
    <section v-if="loading" class="loading">
      <p>A carregar livro...</p>
    </section>
    <section v-else-if="!book" class="not-found">
      <div class="container">
        <h1>Livro não encontrado</h1>
        <router-link to="/livros" class="btn">Voltar aos livros</router-link>
      </div>
    </section>
    <section v-else class="book-content">
      <div class="container">
        <div class="book-full">
          <div class="book-cover-large">
            <img src="/book-cover.jpg" :alt="book.title" class="book-cover-img-detail" />
          </div>
          <div class="book-info-full">
            <h1 class="book-title">{{ book.title }}</h1>
            <p v-if="book.subtitle" class="book-subtitle-large">{{ book.subtitle }}</p>
            <p class="book-author-large">{{ book.author }}</p>

            <div class="book-meta">
              <div class="meta-row">
                <span class="meta-label">Formato:</span>
                <span class="meta-value">{{ book.format || 'A confirmar' }}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">Preço:</span>
                <span class="meta-value">
                  {{ book.price ? `${book.price} ${book.currency}` : 'Consulte o preço pelo WhatsApp' }}
                </span>
              </div>
              <div class="meta-row">
                <span class="meta-label">Disponibilidade:</span>
                <span class="meta-value" :class="availabilityClass">{{ book.availability || 'Consulte a disponibilidade pelo WhatsApp' }}</span>
              </div>
            </div>

            <div class="book-synopsis">
              <h2>Sinopse</h2>
              <p v-if="book.synopsis">{{ book.synopsis }}</p>
              <p v-else>Consulte a sinopse oficial pelo WhatsApp</p>
            </div>

            <div class="book-order">
              <label for="quantity">Quantidade:</label>
              <input 
                id="quantity" 
                v-model.number="quantity" 
                type="number" 
                min="1" 
                value="1"
                class="quantity-input"
              />
              <button 
                @click="showOrderModal = true"
                class="btn btn-primary btn-large"
              >
                Encomendar pelo WhatsApp
              </button>
              <p class="order-note">A encomenda será combinada pelo WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <OrderModal
      :show="showOrderModal"
      :book-title="book?.title"
      :initial-quantity="quantity"
      @close="showOrderModal = false"
      @submit="handleOrderSubmit"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import OrderModal from '../components/OrderModal.vue'

// Hardcoded data - no backend dependency
const route = useRoute()
const book = ref({
  title: 'Cicatrizes e Coroas',
  subtitle: 'Uma história de superação',
  author: 'Lizi Mulambo',
  synopsis: '',
  format: 'físico',
  price: null,
  availability: 'indisponível',
  coverImage: '',
  featured: true,
  published: true,
  slug: 'cicatrizes-e-coroas'
})
const loading = ref(false)
const quantity = ref(1)
const showOrderModal = ref(false)

const availabilityClass = computed(() => {
  if (!book.value) return ''
  const availability = book.value.availability
  if (availability === 'disponível') return 'available'
  if (availability === 'esgotado') return 'sold-out'
  if (availability === 'pré-venda') return 'pre-order'
  return ''
})

const handleOrderSubmit = (formData) => {
  const message = `Olá, Lizi! Gostaria de encomendar o livro "${formData.quantity}x ${book.value.title}"

📋 *Dados da Encomenda:*
• Nome: ${formData.name}
• Email: ${formData.email}
• Telefone: ${formData.phone}
• Quantidade: ${formData.quantity}
• Cidade/Província: ${formData.city}${formData.address ? `\n• Endereço: ${formData.address}` : ''}${formData.notes ? `\n\n📝 *Notas:* ${formData.notes}` : ''}

Pode informar o preço, a disponibilidade e as formas de entrega?`

  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/258857670109?text=${encodedMessage}`
  window.open(whatsappUrl, '_blank')
  showOrderModal.value = false
}
</script>

<style scoped>
.book-detail {
  min-height: 100vh;
}

.loading,
.not-found {
  padding: 4rem 2rem;
  text-align: center;
}

.book-content {
  padding: 4rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.book-full {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.book-cover-large {
  display: flex;
  justify-content: center;
}

.book-cover-img-detail {
  width: 350px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.book-info-full {
  padding: 2rem 0;
}

.book-title {
  font-family: 'Georgia', serif;
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.book-subtitle-large {
  font-family: 'Georgia', serif;
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 0.5rem;
  font-style: italic;
}

.book-author-large {
  color: #888;
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

.book-meta {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.meta-row {
  display: flex;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}

.meta-row:last-child {
  border-bottom: none;
}

.meta-label {
  font-weight: bold;
  color: #1a1a1a;
  width: 150px;
  flex-shrink: 0;
}

.meta-value {
  color: #666;
}

.meta-value.available {
  color: #28a745;
  font-weight: bold;
}

.meta-value.sold-out {
  color: #dc3545;
  font-weight: bold;
}

.meta-value.pre-order {
  color: #D4AF37;
  font-weight: bold;
}

.book-synopsis {
  margin-bottom: 2rem;
}

.book-synopsis h2 {
  font-family: 'Georgia', serif;
  font-size: 1.5rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.book-synopsis p {
  line-height: 1.8;
  color: #444;
}

.book-order {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
}

.book-order label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.quantity-input {
  width: 100px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.order-note {
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

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

@media (max-width: 768px) {
  .book-full {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .book-title {
    font-size: 2rem;
  }

  .book-subtitle-large {
    font-size: 1.25rem;
  }

  .book-cover-img-detail {
    width: 280px;
  }

  .meta-row {
    flex-direction: column;
    gap: 0.5rem;
  }

  .meta-label {
    width: 100%;
  }
}
</style>
