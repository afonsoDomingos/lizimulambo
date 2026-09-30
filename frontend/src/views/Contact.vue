<template>
  <div class="contact">
    <section class="contact-hero">
      <div class="container">
        <h1 class="page-title">Contactos</h1>
        <p class="page-subtitle">Entre em contacto com Lizi Mulambo</p>
      </div>
    </section>

    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <a 
            href="https://web.facebook.com/coachlizimulambo/" 
            target="_blank" 
            rel="noopener noreferrer"
            class="contact-card"
          >
            <div class="contact-icon">Facebook</div>
            <h3>Facebook</h3>
            <p>Seguir no Facebook</p>
            <span class="contact-link">web.facebook.com/coachlizimulambo</span>
          </a>

          <a 
            href="https://www.instagram.com/lizimulambo2000/" 
            target="_blank" 
            rel="noopener noreferrer"
            class="contact-card"
          >
            <div class="contact-icon">Instagram</div>
            <h3>Instagram</h3>
            <p>Seguir no Instagram</p>
            <span class="contact-link">instagram.com/lizimulambo2000</span>
          </a>

          <a 
            href="https://wa.me/258857670109" 
            target="_blank" 
            rel="noopener noreferrer"
            class="contact-card whatsapp"
          >
            <div class="contact-icon">WhatsApp</div>
            <h3>WhatsApp</h3>
            <p>Contactar pelo WhatsApp</p>
            <span class="contact-link">+258 85 767 0109</span>
          </a>
        </div>

        <div class="order-info">
          <h2 class="section-title">Encomendas</h2>
          <p class="order-text">
            Para encomendar livros, contacte pelo WhatsApp. O preço, disponibilidade e formas de entrega serão combinados directamente com a autora.
          </p>
          <a 
            href="https://wa.me/258857670109?text=Ol%C3%A1%2C%20Lizi.%20Gostaria%20de%20comprar%20o%20livro%20Cicatrizes%20e%20Coroas.%20Pode%20informar%20o%20pre%C3%A7o%2C%20a%20disponibilidade%20e%20as%20formas%20de%20entrega%3F" 
            target="_blank" 
            rel="noopener noreferrer"
            class="btn btn-primary btn-large"
          >
            Encomendar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
.contact {
  min-height: 100vh;
}

.contact-hero {
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

.contact-content {
  padding: 4rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.contact-card {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  color: #1a1a1a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: block;
}

.contact-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.contact-card.whatsapp {
  border: 2px solid #25D366;
}

.contact-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #D4AF37;
}

.contact-card h3 {
  font-family: 'Georgia', serif;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.contact-card p {
  color: #666;
  margin-bottom: 0.5rem;
}

.contact-link {
  color: #D4AF37;
  font-size: 0.875rem;
  word-break: break-all;
}

.order-info {
  background-color: #f9f9f9;
  padding: 3rem;
  border-radius: 8px;
  text-align: center;
}

.section-title {
  font-family: 'Georgia', serif;
  font-size: 2rem;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

.order-text {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #444;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
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
  .page-title {
    font-size: 2rem;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .order-info {
    padding: 2rem;
  }
}
</style>
