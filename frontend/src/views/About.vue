<template>
  <div class="about">
    <section class="about-hero">
      <div class="container">
        <h1 class="page-title">Sobre Lizi Mulambo</h1>
      </div>
    </section>

    <section class="about-content">
      <div class="container">
        <div class="author-full">
          <div class="author-photo-large">
            <img src="/author-photo.jpg" alt="Lizi Mulambo" class="author-photo-img-large" />
          </div>
          <div class="author-bio-full">
            <h2 class="section-title">Biografia</h2>
            <div class="bio-content">
              <p class="short-bio">Lizi Mulambo é coach na área de desenvolvimento pessoal e autora de "Cicatrizes e Coroas — Uma história de superação".</p>
              <p class="bio-paragraph">Profissional sénior com mais de 20 anos de experiência em gestão administrativa, financeira, recursos humanos e desenvolvimento organizacional, tendo exercido funções de liderança em organizações nacionais e internacionais, incluindo ONG internacionais e empresas privadas.</p>
              <p class="bio-paragraph">É licenciada em Administração e Gestão de Empresas e certificada como Coach Integral Sistémica. Possui sólida experiência em liderança corporativa, gestão financeira (incluindo small grants), compliance, procurement, políticas e procedimentos internos, gestão patrimonial, relações institucionais, mediação de conflitos e desenvolvimento de equipas de alto desempenho.</p>
              <p class="bio-paragraph">Ao longo da sua carreira representou organizações junto de entidades governamentais, parceiros de cooperação e diferentes partes interessadas, contribuindo para o fortalecimento institucional, transparência, eficiência operacional e boa governação.</p>
              <p class="bio-paragraph">Paralelamente, desenvolve uma carreira como Life & Executive Coach, mentora e palestrante, apoiando líderes, profissionais, empreendedores e famílias no fortalecimento da inteligência emocional, liderança consciente, desenvolvimento pessoal, propósito de vida e transformação humana.</p>
              <p class="bio-paragraph">É fundadora da Associação Sol Nascente, uma iniciativa dedicada ao desenvolvimento comunitário, inclusão social e fortalecimento das famílias, acreditando que uma sociedade mais forte começa pela transformação das pessoas.</p>
              <p class="bio-paragraph">Como palestrante, aborda temas como:</p>
              <ul class="bio-list">
                <li>Liderança feminina e liderança ética</li>
                <li>Desenvolvimento pessoal e inteligência emocional</li>
                <li>Resiliência e transformação pessoal</li>
                <li>Desenvolvimento organizacional</li>
                <li>Ética, integridade e cultura organizacional</li>
                <li>Coaching familiar e fortalecimento das relações</li>
                <li>Gestão de conflitos e comunicação estratégica</li>
              </ul>
              <p class="bio-paragraph">É autora do livro Entre Cicatrizes e Coroas, com lançamento previsto para março de 2027, uma obra dedicada à identidade, resiliência e transformação humana.</p>
              <p class="bio-quote">Princípio que orienta a sua liderança: "Acredito numa liderança construída sobre a ética, a integridade e o serviço. O verdadeiro impacto nasce quando o conhecimento, o amor e o propósito se transformam em ações que desenvolvem pessoas, fortalecem organizações e transformam comunidades."</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <h2 class="section-title">Contactos</h2>
        <div class="contact-grid">
          <a 
            href="https://web.facebook.com/coachlizimulambo/" 
            target="_blank" 
            rel="noopener noreferrer"
            class="contact-card"
          >
            <div class="contact-icon">Facebook</div>
            <p>Seguir no Facebook</p>
          </a>
          <a 
            href="https://www.instagram.com/lizimulambo2000/" 
            target="_blank" 
            rel="noopener noreferrer"
            class="contact-card"
          >
            <div class="contact-icon">Instagram</div>
            <p>Seguir no Instagram</p>
          </a>
          <a 
            href="https://www.linkedin.com/in/lizi-mulambo-67a87064" 
            target="_blank" 
            rel="noopener noreferrer"
            class="contact-card"
          >
            <div class="contact-icon">LinkedIn</div>
            <p>Seguir no LinkedIn</p>
          </a>
          <a 
            href="https://wa.me/258857670109" 
            target="_blank" 
            rel="noopener noreferrer"
            class="contact-card"
          >
            <div class="contact-icon">WhatsApp</div>
            <p>Contactar pelo WhatsApp</p>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
.about {
  min-height: 100vh;
}

.about-hero {
  background: linear-gradient(135deg, #FFFAF0 0%, #F5E6D3 100%);
  padding: 4rem 2rem;
  text-align: center;
}

.page-title {
  font-family: 'Georgia', serif;
  font-size: 3rem;
  color: #1a1a1a;
  margin: 0;
}

.about-content {
  padding: 4rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.author-full {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.author-photo-large {
  display: flex;
  justify-content: center;
}

.author-photo-img-large {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.author-bio-full {
  padding: 2rem 0;
  max-height: none;
  overflow: visible;
}

.section-title {
  font-family: 'Georgia', serif;
  font-size: 2rem;
  color: #1a1a1a;
  margin-bottom: 2rem;
}

.bio-content {
  line-height: 1.8;
}

.short-bio,
.full-bio {
  font-size: 1.125rem;
  color: #444;
  margin-bottom: 1.5rem;
}

.bio-paragraph {
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.bio-list {
  margin: 1.5rem 0;
  padding-left: 2rem;
  list-style-type: disc;
}

.bio-list li {
  margin-bottom: 0.5rem;
  color: #444;
}

.bio-quote {
  margin: 2rem 0;
  padding: 1.5rem;
  border-left: 4px solid #D4AF37;
  background-color: #f9f9f9;
  font-style: italic;
  color: #666;
  padding-left: 1.5rem;
}

.contact-section {
  padding: 4rem 2rem;
  background-color: #f9f9f9;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
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
}

.contact-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.contact-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #D4AF37;
}

.contact-card p {
  margin: 0;
  color: #666;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .author-full {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .author-photo-img-large {
    width: 300px;
    height: 300px;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
