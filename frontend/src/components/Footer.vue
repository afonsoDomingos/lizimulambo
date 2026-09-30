<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Lizi Mulambo</h3>
        <p>Coach na área de desenvolvimento pessoal</p>
      </div>

      <div class="footer-section">
        <h3>Links Rápidos</h3>
        <ul>
          <li><router-link to="/">Início</router-link></li>
          <li><router-link to="/sobre">Sobre Lizi</router-link></li>
          <li><router-link to="/livros">Livros</router-link></li>
          <li><router-link to="/contactos">Contactos</router-link></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Contactos</h3>
        <ul class="contact-links">
          <li>
            <a 
              href="https://web.facebook.com/coachlizimulambo/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              Facebook
            </a>
          </li>
          <li>
            <a 
              href="https://www.instagram.com/lizimulambo2000/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </li>
          <li>
            <a 
              href="https://www.linkedin.com/in/lizi-mulambo-67a87064" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a 
              href="https://wa.me/258857670109" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} Lizi Mulambo. Todos os direitos reservados.</p>
      <div class="powered-by">
        <a 
          href="https://www.wehosthere.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          class="powered-by-link"
        >
          <span>Powered by WeHosThere</span>
          <img src="/wehosthere-logo.png" alt="WeHosThere" class="wehosthere-logo" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background-color: #1a1a1a;
  color: #FFFAF0;
  padding: 3rem 2rem 1rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  font-family: 'Georgia', serif;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #D4AF37;
}

.footer-section p {
  color: #ccc;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #FFFAF0;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #D4AF37;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid #333;
  text-align: center;
  color: #888;
  font-size: 0.875rem;
}

.powered-by {
  margin-top: 1.5rem;
}

.powered-by-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: #888;
  text-decoration: none;
  transition: opacity 0.3s ease;
  font-size: 1rem;
}

.powered-by-link:hover {
  opacity: 0.8;
}

.wehosthere-logo {
  height: 40px;
  width: auto;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
}
</style>
