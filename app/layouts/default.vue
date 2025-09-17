<template>
  <div class="min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-800 mb-2">What is my IP?</h1>
          <p class="text-gray-600">Discover your public IP address and location information</p>
        </div>
        
        <!-- Page Content -->
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="css">
body {
  @apply bg-gradient-to-br from-blue-50 to-indigo-100;
}
</style>
