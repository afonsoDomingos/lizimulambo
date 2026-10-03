<template>
  <header class="header" :class="{ 'scrolled': isScrolled }">
    <nav class="nav">
      <div class="nav-container">
        <router-link to="/" class="logo">
          <span class="logo-text">Lizi</span>
          <span class="logo-accent">Mulambo</span>
        </router-link>
        
        <button 
          class="mobile-menu-btn" 
          @click="toggleMenu"
          :class="{ 'active': menuOpen }"
          aria-label="Menu"
          aria-expanded="menuOpen"
        >
          <span class="line line-1"></span>
          <span class="line line-2"></span>
          <span class="line line-3"></span>
        </button>

        <ul class="nav-links" :class="{ active: menuOpen }">
          <li>
            <router-link to="/" @click="closeMenu" class="nav-link">
              <span class="link-text">Início</span>
              <span class="link-underline"></span>
            </router-link>
          </li>
          <li>
            <router-link to="/sobre" @click="closeMenu" class="nav-link">
              <span class="link-text">Sobre Lizi</span>
              <span class="link-underline"></span>
            </router-link>
          </li>
          <li>
            <router-link to="/livros" @click="closeMenu" class="nav-link">
              <span class="link-text">Livros</span>
              <span class="link-underline"></span>
            </router-link>
          </li>
          <li>
            <router-link to="/contactos" @click="closeMenu" class="nav-link">
              <span class="link-text">Contactos</span>
              <span class="link-underline"></span>
            </router-link>
          </li>
          <li>
            <router-link to="/livros" class="btn-buy" @click="closeMenu">
              <span class="btn-text">Comprar o livro</span>
              <span class="btn-icon">→</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="mobile-overlay" :class="{ 'active': menuOpen }" @click="closeMenu"></div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const menuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  // Prevent body scroll when menu is open
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}

const closeMenu = () => {
  menuOpen.value = false
  document.body.style.overflow = ''
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.header {
  background-color: #FFFAF0;
  border-bottom: 1px solid #D4AF37;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.header.scrolled {
  background-color: rgba(255, 250, 240, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(212, 175, 55, 0.3);
}

.nav {
  padding: 1.25rem 2rem;
  transition: padding 0.3s ease;
}

.header.scrolled .nav {
  padding: 0.75rem 2rem;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: baseline;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.02);
}

.logo-text {
  font-family: 'Poppins', sans-serif;
  font-weight: 900;
  font-size: 1.75rem;
  color: #1a1a1a;
}

.logo-accent {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 1.75rem;
  color: #D4AF37;
  margin-left: 0.1em;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2.5rem;
  align-items: center;
}

.nav-link {
  position: relative;
  color: #1a1a1a;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #D4AF37;
}

.link-underline {
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #D4AF37;
  transition: width 0.3s ease;
}

.nav-link:hover .link-underline {
  width: 100%;
}

.btn-buy {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #D4AF37 0%, #B4941F 100%);
  color: #FFFAF0 !important;
  padding: 0.875rem 1.75rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

.btn-buy:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
  background: linear-gradient(135deg, #B4941F 0%, #9A7A18 100%);
}

.btn-icon {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.btn-buy:hover .btn-icon {
  transform: translateX(4px);
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.mobile-menu-btn:hover {
  background-color: rgba(212, 175, 55, 0.1);
}

.line {
  width: 28px;
  height: 2.5px;
  background-color: #1a1a1a;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.mobile-menu-btn.active .line-1 {
  transform: rotate(45deg) translate(6px, 6px);
}

.mobile-menu-btn.active .line-2 {
  opacity: 0;
  transform: translateX(-10px);
}

.mobile-menu-btn.active .line-3 {
  transform: rotate(-45deg) translate(6px, -6px);
}

.mobile-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mobile-overlay.active {
  opacity: 1;
}

/* Tablet styles */
@media (max-width: 1024px) {
  .nav-links {
    gap: 1.75rem;
  }

  .logo-text,
  .logo-accent {
    font-size: 1.5rem;
  }
}

/* Mobile styles */
@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
  }

  .mobile-overlay {
    display: block;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: 0;
    width: 280px;
    height: 100vh;
    background-color: #FFFAF0;
    flex-direction: column;
    padding: 6rem 2rem 2rem;
    gap: 0;
    transform: translateX(100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-left: 1px solid #D4AF37;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }

  .nav-links.active {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-links li {
    width: 100%;
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.3s ease;
  }

  .nav-links.active li {
    opacity: 1;
    transform: translateX(0);
  }

  .nav-links.active li:nth-child(1) {
    transition-delay: 0.1s;
  }

  .nav-links.active li:nth-child(2) {
    transition-delay: 0.15s;
  }

  .nav-links.active li:nth-child(3) {
    transition-delay: 0.2s;
  }

  .nav-links.active li:nth-child(4) {
    transition-delay: 0.25s;
  }

  .nav-links.active li:nth-child(5) {
    transition-delay: 0.3s;
  }

  .nav-link {
    display: block;
    padding: 1rem 0;
    font-size: 1.125rem;
    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
  }

  .nav-link:last-child {
    border-bottom: none;
  }

  .nav-links .btn-buy {
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
    padding: 1rem;
  }

  .logo-text,
  .logo-accent {
    font-size: 1.35rem;
  }
}

/* Small mobile */
@media (max-width: 480px) {
  .nav {
    padding: 1rem 1.5rem;
  }

  .header.scrolled .nav {
    padding: 0.75rem 1.5rem;
  }

  .logo-text,
  .logo-accent {
    font-size: 1.2rem;
  }

  .nav-links {
    width: 100%;
  }
}
</style>
