<template>
  <header class="header">
    <nav class="nav">
      <div class="nav-container">
        <router-link to="/" class="logo">
          Lizi Mulambo
        </router-link>
        
        <button 
          class="mobile-menu-btn" 
          @click="toggleMenu"
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul class="nav-links" :class="{ active: menuOpen }">
          <li><router-link to="/" @click="closeMenu">Início</router-link></li>
          <li><router-link to="/sobre" @click="closeMenu">Sobre Lizi</router-link></li>
          <li><router-link to="/livros" @click="closeMenu">Livros</router-link></li>
          <li><router-link to="/contactos" @click="closeMenu">Contactos</router-link></li>
          <li>
            <router-link to="/livros" class="btn-buy" @click="closeMenu">
              Comprar o livro
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}
</script>

<style scoped>
.header {
  background-color: #FFFAF0;
  border-bottom: 1px solid #D4AF37;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav {
  padding: 1rem 2rem;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: 'Georgia', serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a1a1a;
  text-decoration: none;
  letter-spacing: 0.05em;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  color: #1a1a1a;
  text-decoration: none;
  font-family: 'Georgia', serif;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #D4AF37;
}

.btn-buy {
  background-color: #D4AF37;
  color: #FFFAF0 !important;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn-buy:hover {
  background-color: #B4941F;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.mobile-menu-btn span {
  width: 25px;
  height: 2px;
  background-color: #1a1a1a;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #FFFAF0;
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    border-bottom: 1px solid #D4AF37;
  }

  .nav-links.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-links .btn-buy {
    width: 100%;
    text-align: center;
  }
}
</style>
