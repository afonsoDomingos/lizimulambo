<template>
  <div class="admin-login">
    <div class="login-container">
      <h1 class="login-title">Administração</h1>
      <p class="login-subtitle">Inicie sessão para gerir o conteúdo</p>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Nome de utilizador</label>
          <input 
            id="username" 
            v-model="username" 
            type="text" 
            required 
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Palavra-passe</label>
          <input 
            id="password" 
            v-model="password" 
            type="password" 
            required 
            class="form-input"
          />
        </div>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'A entrar...' : 'Entrar' }}
        </button>
      </form>
      
      <p class="login-note">
        Se ainda não tem conta de administrador, contacte o desenvolvedor.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await axios.post('/api/admin/login', {
      username: username.value,
      password: password.value
    })
    
    localStorage.setItem('adminToken', response.data.token)
    localStorage.setItem('adminInfo', JSON.stringify(response.data.admin))
    
    router.push('/admin')
  } catch (err) {
    error.value = err.response?.data?.message || 'Erro ao fazer login. Verifique as suas credenciais.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.admin-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FFFAF0 0%, #F5E6D3 100%);
  padding: 2rem;
}

.login-container {
  background-color: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.login-title {
  font-family: 'Georgia', serif;
  font-size: 2rem;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  text-align: center;
}

.login-subtitle {
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: bold;
  color: #1a1a1a;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: #D4AF37;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  text-align: center;
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

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-note {
  text-align: center;
  color: #888;
  font-size: 0.875rem;
  margin-top: 1.5rem;
}
</style>
