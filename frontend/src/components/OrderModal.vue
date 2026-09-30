<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Dados da Encomenda</h2>
        <button @click="close" class="close-btn" aria-label="Fechar">&times;</button>
      </div>
      
      <form @submit.prevent="submitOrder" class="order-form">
        <div class="form-group">
          <label for="name">Nome Completo *</label>
          <input 
            id="name" 
            v-model="form.name" 
            type="text" 
            required 
            placeholder="Seu nome completo"
          />
        </div>

        <div class="form-group">
          <label for="email">Email *</label>
          <input 
            id="email" 
            v-model="form.email" 
            type="email" 
            required 
            placeholder="seu@email.com"
          />
        </div>

        <div class="form-group">
          <label for="phone">Telefone/WhatsApp *</label>
          <input 
            id="phone" 
            v-model="form.phone" 
            type="tel" 
            required 
            placeholder="+258 XX XXX XXXX"
          />
        </div>

        <div class="form-group">
          <label for="quantity">Quantidade *</label>
          <input 
            id="quantity" 
            v-model.number="form.quantity" 
            type="number" 
            min="1" 
            required
          />
        </div>

        <div class="form-group">
          <label for="city">Cidade/Província *</label>
          <input 
            id="city" 
            v-model="form.city" 
            type="text" 
            required 
            placeholder="Maputo, Gaza, etc."
          />
        </div>

        <div class="form-group">
          <label for="address">Endereço (opcional)</label>
          <textarea 
            id="address" 
            v-model="form.address" 
            rows="2"
            placeholder="Endereço para entrega"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="notes">Notas Adicionais (opcional)</label>
          <textarea 
            id="notes" 
            v-model="form.notes" 
            rows="2"
            placeholder="Alguma informação adicional"
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="button" @click="close" class="btn btn-secondary">
            Cancelar
          </button>
          <button type="submit" class="btn btn-primary">
            Enviar Encomenda
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  bookTitle: String,
  initialQuantity: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['close', 'submit'])

const form = ref({
  name: '',
  email: '',
  phone: '',
  quantity: props.initialQuantity,
  city: '',
  address: '',
  notes: ''
})

watch(() => props.initialQuantity, (newVal) => {
  form.value.quantity = newVal
})

const close = () => {
  emit('close')
}

const submitOrder = () => {
  emit('submit', { ...form.value })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background-color: #FFFAF0;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #ddd;
}

.modal-header h2 {
  margin: 0;
  font-family: 'Georgia', serif;
  color: #1a1a1a;
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background-color: #f0f0f0;
}

.order-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #1a1a1a;
  font-size: 0.9rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #D4AF37;
}

.form-group textarea {
  resize: vertical;
  min-height: 60px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.form-actions button {
  flex: 1;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #D4AF37;
  color: #1a1a1a;
  font-weight: 600;
}

.btn-primary:hover {
  background-color: #b8962e;
}

.btn-secondary {
  background-color: #666;
  color: #FFFAF0;
}

.btn-secondary:hover {
  background-color: #555;
}

@media (max-width: 768px) {
  .modal-content {
    max-height: 95vh;
  }

  .form-actions {
    flex-direction: column;
  }
}
</style>
