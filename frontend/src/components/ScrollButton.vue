<template>
  <div v-if="showButton" class="scroll-button">
    <button 
      @click="scrollToTop" 
      class="scroll-action scroll-up"
      aria-label="Ir para o topo"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
    
    <div class="scroll-percentage">
      {{ scrollPercentage }}%
    </div>
    
    <button 
      @click="scrollToBottom" 
      class="scroll-action scroll-down"
      aria-label="Ir para o fundo"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrollPercentage = ref(0)
const showButton = ref(false)

const updateScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const percentage = Math.round((scrollTop / docHeight) * 100)
  
  scrollPercentage.value = percentage
  showButton.value = percentage > 5
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', updateScroll)
  updateScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
})
</script>

<style scoped>
.scroll-button {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 1000;
  background-color: #FFFAF0;
  border-radius: 12px;
  padding: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 2px solid #D4AF37;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.scroll-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.scroll-action {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background-color: #D4AF37;
  color: #1a1a1a;
}

.scroll-action:hover {
  background-color: #b8962e;
  transform: scale(1.1);
}

.scroll-action svg {
  width: 20px;
  height: 20px;
}

.scroll-percentage {
  font-family: 'Georgia', serif;
  font-size: 1rem;
  font-weight: bold;
  color: #1a1a1a;
  min-width: 40px;
  text-align: center;
}

@media (max-width: 768px) {
  .scroll-button {
    right: 1rem;
    bottom: 1rem;
    padding: 0.5rem;
  }

  .scroll-action {
    width: 36px;
    height: 36px;
  }

  .scroll-action svg {
    width: 18px;
    height: 18px;
  }

  .scroll-percentage {
    font-size: 0.875rem;
  }
}
</style>
