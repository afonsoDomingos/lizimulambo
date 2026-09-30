<template>
  <div>
    <title>{{ pageTitle }}</title>
    <meta name="description" :content="pageDescription" />
    <meta name="keywords" content="Lizi Mulambo, coach, desenvolvimento pessoal, Cicatrizes e Coroas, livro, superação" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" :content="currentUrl" />
    <meta property="og:title" :content="pageTitle" />
    <meta property="og:description" :content="pageDescription" />
    <meta property="og:image" :content="ogImage" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" :content="currentUrl" />
    <meta property="twitter:title" :content="pageTitle" />
    <meta property="twitter:description" :content="pageDescription" />
    <meta property="twitter:image" :content="ogImage" />
    
    <!-- Canonical URL -->
    <link rel="canonical" :href="currentUrl" />
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
  title: {
    type: String,
    default: 'Lizi Mulambo - Coach e Autora'
  },
  description: {
    type: String,
    default: 'Lizi Mulambo é coach na área de desenvolvimento pessoal e autora de "Cicatrizes e Coroas — Uma história de superação".'
  },
  image: {
    type: String,
    default: ''
  }
})

const pageTitle = computed(() => props.title)
const pageDescription = computed(() => props.description)
const ogImage = computed(() => props.image || 'https://via.placeholder.com/1200x630/FFFAF0/D4AF37?text=Lizi+Mulambo')
const currentUrl = computed(() => `${window.location.origin}${route.path}`)

const updateMeta = () => {
  document.title = pageTitle.value
}

onMounted(() => {
  updateMeta()
})

watch(() => props.title, updateMeta)
watch(() => route.path, updateMeta)
</script>
