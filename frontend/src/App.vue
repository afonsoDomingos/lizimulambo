<template>
  <div id="app">
    <MetaTags 
      :title="metaTitle" 
      :description="metaDescription"
    />
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'
import MetaTags from './components/MetaTags.vue'

const route = useRoute()

const metaTitle = computed(() => {
  return route.meta.title || 'Lizi Mulambo - Coach e Autora'
})

const metaDescription = computed(() => {
  const descriptions = {
    'Home': 'Lizi Mulambo é coach na área de desenvolvimento pessoal e autora de "Cicatrizes e Coroas — Uma história de superação". Profissional sénior com mais de 20 anos de experiência em gestão administrativa, financeira, recursos humanos e desenvolvimento organizacional. Conheça o novo livro.',
    'About': 'Conheça Lizi Mulambo, coach na área de desenvolvimento pessoal e autora de "Cicatrizes e Coroas — Uma história de superação".',
    'Books': 'Descubra os livros de Lizi Mulambo, incluindo "Cicatrizes e Coroas — Uma história de superação".',
    'Contact': 'Entre em contacto com Lizi Mulambo pelo WhatsApp, Facebook ou Instagram para encomendar livros.'
  }
  return descriptions[route.name] || 'Lizi Mulambo é coach na área de desenvolvimento pessoal e autora de "Cicatrizes e Coroas — Uma história de superação". Profissional sénior com mais de 20 anos de experiência em gestão administrativa, financeira, recursos humanos e desenvolvimento organizacional.'
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Georgia', serif;
  background-color: #FFFAF0;
  color: #1a1a1a;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
