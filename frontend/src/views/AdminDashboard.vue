<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <h1>Painel Administrativo</h1>
      <button @click="logout" class="btn btn-secondary">Sair</button>
    </div>

    <div class="dashboard-content">
      <div class="dashboard-tabs">
        <button 
          @click="activeTab = 'books'" 
          class="tab-btn"
          :class="{ active: activeTab === 'books' }"
        >
          Livros
        </button>
        <button 
          @click="activeTab = 'author'" 
          class="tab-btn"
          :class="{ active: activeTab === 'author' }"
        >
          Autora
        </button>
      </div>

      <!-- Books Tab -->
      <div v-if="activeTab === 'books'" class="tab-content">
        <div class="section-header">
          <h2>Gestão de Livros</h2>
          <button @click="showBookForm = true" class="btn btn-primary">Adicionar Livro</button>
        </div>

        <div v-if="books.length === 0" class="empty-state">
          <p>Nenhum livro encontrado. Adicione o primeiro livro.</p>
        </div>

        <div v-else class="books-list">
          <div 
            v-for="book in books" 
            :key="book._id" 
            class="book-item"
          >
            <div class="book-item-info">
              <h3>{{ book.title }}</h3>
              <p v-if="book.subtitle">{{ book.subtitle }}</p>
              <div class="book-status">
                <span :class="['status-badge', book.published ? 'published' : 'draft']">
                  {{ book.published ? 'Publicado' : 'Rascunho' }}
                </span>
                <span v-if="book.featured" class="status-badge featured">Destaque</span>
              </div>
            </div>
            <div class="book-item-actions">
              <button @click="editBook(book)" class="btn btn-small">Editar</button>
              <button @click="deleteBook(book._id)" class="btn btn-small btn-danger">Eliminar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Author Tab -->
      <div v-if="activeTab === 'author'" class="tab-content">
        <div class="section-header">
          <h2>Informações da Autora</h2>
        </div>

        <form @submit.prevent="saveAuthor" class="author-form">
          <div class="form-group">
            <label for="authorName">Nome</label>
            <input 
              id="authorName" 
              v-model="authorForm.name" 
              type="text" 
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="shortBio">Biografia Curta</label>
            <textarea 
              id="shortBio" 
              v-model="authorForm.shortBio" 
              class="form-textarea"
              rows="3"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="fullBio">Biografia Completa</label>
            <textarea 
              id="fullBio" 
              v-model="authorForm.fullBio" 
              class="form-textarea"
              rows="6"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="facebook">Facebook</label>
            <input 
              id="facebook" 
              v-model="authorForm.facebook" 
              type="url" 
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="instagram">Instagram</label>
            <input 
              id="instagram" 
              v-model="authorForm.instagram" 
              type="url" 
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="linkedin">LinkedIn</label>
            <input 
              id="linkedin" 
              v-model="authorForm.linkedin" 
              type="url" 
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="whatsapp">WhatsApp</label>
            <input 
              id="whatsapp" 
              v-model="authorForm.whatsapp" 
              type="text" 
              class="form-input"
            />
          </div>

          <button type="submit" class="btn btn-primary">Guardar</button>
        </form>
      </div>
    </div>

    <!-- Book Form Modal -->
    <div v-if="showBookForm" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ editingBook ? 'Editar Livro' : 'Adicionar Livro' }}</h2>
          <button @click="closeBookForm" class="close-btn">&times;</button>
        </div>

        <form @submit.prevent="saveBook" class="book-form">
          <div class="form-group">
            <label for="bookTitle">Título *</label>
            <input 
              id="bookTitle" 
              v-model="bookForm.title" 
              type="text" 
              required 
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="bookSubtitle">Subtítulo</label>
            <input 
              id="bookSubtitle" 
              v-model="bookForm.subtitle" 
              type="text" 
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="bookSlug">Slug *</label>
            <input 
              id="bookSlug" 
              v-model="bookForm.slug" 
              type="text" 
              required 
              class="form-input"
              placeholder="cicatrizes-e-coroas"
            />
          </div>

          <div class="form-group">
            <label for="bookSynopsis">Sinopse</label>
            <textarea 
              id="bookSynopsis" 
              v-model="bookForm.synopsis" 
              class="form-textarea"
              rows="4"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="bookFormat">Formato</label>
            <select id="bookFormat" v-model="bookForm.format" class="form-select">
              <option value="físico">Físico</option>
              <option value="digital">Digital</option>
              <option value="físico e digital">Físico e Digital</option>
            </select>
          </div>

          <div class="form-group">
            <label for="bookPrice">Preço (MZN)</label>
            <input 
              id="bookPrice" 
              v-model.number="bookForm.price" 
              type="number" 
              min="0" 
              step="0.01"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="bookAvailability">Disponibilidade</label>
            <select id="bookAvailability" v-model="bookForm.availability" class="form-select">
              <option value="indisponível">Indisponível</option>
              <option value="disponível">Disponível</option>
              <option value="esgotado">Esgotado</option>
              <option value="pré-venda">Pré-venda</option>
            </select>
          </div>

          <div class="form-group">
            <label for="bookCover">URL da Capa</label>
            <input 
              id="bookCover" 
              v-model="bookForm.coverImage" 
              type="url" 
              class="form-input"
            />
          </div>

          <div class="form-group checkbox-group">
            <label>
              <input type="checkbox" v-model="bookForm.featured" />
              Livro em destaque
            </label>
          </div>

          <div class="form-group checkbox-group">
            <label>
              <input type="checkbox" v-model="bookForm.published" />
              Publicar livro
            </label>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Guardar</button>
            <button type="button" @click="closeBookForm" class="btn btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const activeTab = ref('books')
const books = ref([])
const author = ref(null)
const showBookForm = ref(false)
const editingBook = ref(null)

const bookForm = ref({
  title: '',
  subtitle: '',
  slug: '',
  synopsis: '',
  format: 'físico',
  price: null,
  availability: 'indisponível',
  coverImage: '',
  featured: false,
  published: false
})

const authorForm = ref({
  name: 'Lizi Mulambo',
  shortBio: 'Lizi Mulambo é coach na área de desenvolvimento pessoal e autora de "Cicatrizes e Coroas — Uma história de superação".',
  fullBio: 'Profissional sénior com mais de 20 anos de experiência em gestão administrativa, financeira, recursos humanos e desenvolvimento organizacional, tendo exercido funções de liderança em organizações nacionais e internacionais, incluindo ONG internacionais e empresas privadas.\n\nÉ licenciada em Administração e Gestão de Empresas e certificada como Coach Integral Sistémica. Possui sólida experiência em liderança corporativa, gestão financeira (incluindo small grants), compliance, procurement, políticas e procedimentos internos, gestão patrimonial, relações institucionais, mediação de conflitos e desenvolvimento de equipas de alto desempenho.\n\nAo longo da sua carreira representou organizações junto de entidades governamentais, parceiros de cooperação e diferentes partes interessadas, contribuindo para o fortalecimento institucional, transparência, eficiência operacional e boa governação.\n\nParalelamente, desenvolve uma carreira como Life & Executive Coach, mentora e palestrante, apoiando líderes, profissionais, empreendedores e famílias no fortalecimento da inteligência emocional, liderança consciente, desenvolvimento pessoal, propósito de vida e transformação humana.\n\nÉ fundadora da Associação Sol Nascente, uma iniciativa dedicada ao desenvolvimento comunitário, inclusão social e fortalecimento das famílias, acreditando que uma sociedade mais forte começa pela transformação das pessoas.\n\nComo palestrante, aborda temas como:\n• Liderança feminina e liderança ética;\n• Desenvolvimento pessoal e inteligência emocional;\n• Resiliência e transformação pessoal;\n• Desenvolvimento organizacional;\n• Ética, integridade e cultura organizacional;\n• Coaching familiar e fortalecimento das relações;\n• Gestão de conflitos e comunicação estratégica.\n\nÉ autora do livro Entre Cicatrizes e Coroas, com lançamento previsto para março de 2027, uma obra dedicada à identidade, resiliência e transformação humana.\n\nPrincípio que orienta a sua liderança:\n"Acredito numa liderança construída sobre a ética, a integridade e o serviço. O verdadeiro impacto nasce quando o conhecimento, o amor e o propósito se transformam em ações que desenvolvem pessoas, fortalecem organizações e transformam comunidades."',
  facebook: 'https://web.facebook.com/coachlizimulambo/',
  instagram: 'https://www.instagram.com/lizimulambo2000/',
  linkedin: 'https://www.linkedin.com/in/lizi-mulambo-67a87064',
  whatsapp: '+258 85 767 0109'
})

const loadBooks = async () => {
  try {
    const token = localStorage.getItem('adminToken')
    const response = await axios.get('/api/books/admin/all', {
      headers: { Authorization: `Bearer ${token}` }
    })
    books.value = response.data
  } catch (error) {
    console.error('Erro ao carregar livros:', error)
  }
}

const loadAuthor = async () => {
  try {
    const response = await axios.get('/api/author')
    author.value = response.data
    if (author.value) {
      authorForm.value = { ...authorForm.value, ...author.value }
    }
  } catch (error) {
    console.error('Erro ao carregar autora:', error)
  }
}

const editBook = (book) => {
  editingBook.value = book
  bookForm.value = { ...book }
  showBookForm.value = true
}

const closeBookForm = () => {
  showBookForm.value = false
  editingBook.value = null
  bookForm.value = {
    title: '',
    subtitle: '',
    slug: '',
    synopsis: '',
    format: 'físico',
    price: null,
    availability: 'indisponível',
    coverImage: '',
    featured: false,
    published: false
  }
}

const saveBook = async () => {
  try {
    const token = localStorage.getItem('adminToken')
    
    if (editingBook.value) {
      await axios.put(
        `/api/books/admin/${editingBook.value._id}`,
        bookForm.value,
        { headers: { Authorization: `Bearer ${token}` } }
      )
    } else {
      await axios.post(
        '/api/books/admin',
        bookForm.value,
        { headers: { Authorization: `Bearer ${token}` } }
      )
    }
    
    closeBookForm()
    loadBooks()
  } catch (error) {
    console.error('Erro ao guardar livro:', error)
    alert('Erro ao guardar livro. Verifique os dados.')
  }
}

const deleteBook = async (id) => {
  if (!confirm('Tem certeza que deseja eliminar este livro?')) return
  
  try {
    const token = localStorage.getItem('adminToken')
    await axios.delete(`/api/books/admin/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    loadBooks()
  } catch (error) {
    console.error('Erro ao eliminar livro:', error)
    alert('Erro ao eliminar livro.')
  }
}

const saveAuthor = async () => {
  try {
    const token = localStorage.getItem('adminToken')
    await axios.put(
      '/api/author/admin',
      authorForm.value,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    alert('Informações da autora guardadas com sucesso!')
  } catch (error) {
    console.error('Erro ao guardar autora:', error)
    alert('Erro ao guardar informações da autora.')
  }
}

const logout = () => {
  localStorage.removeItem('adminToken')
  localStorage.removeItem('adminInfo')
  router.push('/admin/login')
}

onMounted(() => {
  const token = localStorage.getItem('adminToken')
  if (!token) {
    router.push('/admin/login')
    return
  }
  
  loadBooks()
  loadAuthor()
})
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.dashboard-header {
  background-color: #1a1a1a;
  color: #FFFAF0;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-header h1 {
  font-family: 'Georgia', serif;
  font-size: 1.5rem;
  margin: 0;
}

.dashboard-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.dashboard-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: white;
  cursor: pointer;
  font-family: 'Georgia', serif;
  font-size: 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.tab-btn.active {
  background-color: #D4AF37;
  color: #FFFAF0;
}

.tab-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-family: 'Georgia', serif;
  font-size: 1.5rem;
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.books-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.book-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border: 1px solid #eee;
  border-radius: 8px;
}

.book-item-info h3 {
  font-family: 'Georgia', serif;
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.book-item-info p {
  color: #666;
  margin-bottom: 0.5rem;
}

.book-status {
  display: flex;
  gap: 0.5rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
}

.status-badge.published {
  background-color: #28a745;
  color: white;
}

.status-badge.draft {
  background-color: #6c757d;
  color: white;
}

.status-badge.featured {
  background-color: #D4AF37;
  color: #FFFAF0;
}

.book-item-actions {
  display: flex;
  gap: 0.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.form-textarea {
  resize: vertical;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-group input[type="checkbox"] {
  width: auto;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-family: 'Georgia', serif;
  font-size: 1rem;
}

.btn-primary {
  background-color: #D4AF37;
  color: #FFFAF0;
}

.btn-primary:hover {
  background-color: #B4941F;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.modal-header h2 {
  font-family: 'Georgia', serif;
  font-size: 1.5rem;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
}

.close-btn:hover {
  color: #1a1a1a;
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .book-item {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .book-status {
    justify-content: center;
  }

  .book-item-actions {
    width: 100%;
    justify-content: center;
  }
}
</style>
