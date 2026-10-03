import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollZoom() {
  const scale = ref(1)
  const translateY = ref(0)
  const opacity = ref(1)

  const handleScroll = () => {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight

    // Calculate scale based on scroll position
    // Starts at 1, increases as user scrolls down, maxes at 1.15
    const maxScale = 1.15
    const scrollProgress = Math.min(scrollY / windowHeight, 1)
    scale.value = 1 + (scrollProgress * (maxScale - 1))

    // Calculate parallax translateY
    translateY.value = scrollY * 0.3

    // Calculate fade out effect (optional)
    opacity.value = Math.max(1 - (scrollProgress * 0.3), 0.7)
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    scale,
    translateY,
    opacity
  }
}
