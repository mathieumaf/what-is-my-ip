export default defineNuxtPlugin(() => {
  const applyTheme = () => {
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (prefersDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Apply theme immediately
  applyTheme()

  // Listen for changes in system theme preference
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', applyTheme)

  // Cleanup on unmount
  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      mediaQuery.removeEventListener('change', applyTheme)
    })
  }
})
