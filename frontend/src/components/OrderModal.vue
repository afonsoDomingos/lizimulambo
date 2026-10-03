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
          <select 
            id="quantity" 
            v-model.number="form.quantity" 
            required
            class="form-select"
          >
            <option :value="1">1 exemplar</option>
            <option :value="2">2 exemplares</option>
            <option :value="3">3 exemplares</option>
            <option :value="4">4 exemplares</option>
            <option :value="5">5 exemplares</option>
            <option :value="6">6 exemplares</option>
            <option :value="7">7 exemplares</option>
            <option :value="8">8 exemplares</option>
            <option :value="9">9 exemplares</option>
            <option :value="10">10 exemplares</option>
            <option :value="20">20 exemplares</option>
            <option :value="50">50 exemplares</option>
          </select>
        </div>

        <div class="form-group">
          <label for="city">Cidade/Província *</label>
          <select 
            id="city" 
            v-model="form.city" 
            required
            class="form-select"
          >
            <option value="">Selecione a província</option>
            <option value="Maputo Cidade">Maputo Cidade</option>
            <option value="Maputo Província">Maputo Província</option>
            <option value="Gaza">Gaza</option>
            <option value="Inhambane">Inhambane</option>
            <option value="Sofala">Sofala</option>
            <option value="Manica">Manica</option>
            <option value="Tete">Tete</option>
            <option value="Zambézia">Zambézia</option>
            <option value="Nampula">Nampula</option>
            <option value="Niassa">Niassa</option>
            <option value="Cabo Delgado">Cabo Delgado</option>
          </select>
        </div>

        <div class="form-group">
          <label for="paymentMethod">Método de Pagamento Preferido *</label>
          <select 
            id="paymentMethod" 
            v-model="form.paymentMethod" 
            required
            class="form-select"
          >
            <option value="">Selecione o método</option>
            <option value="M-Pesa">M-Pesa</option>
            <option value="Vodacom">Vodacom</option>
            <option value="Transferência Bancária">Transferência Bancária</option>
            <option value="Dinheiro">Dinheiro (Entrega)</option>
          </select>
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
  paymentMethod: '',
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
  font-family: 'Poppins', sans-serif;
  font-weight: 900;
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
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
  background-color: white;
  cursor: pointer;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #D4AF37;
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
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
