<template>
  <div>
    <!-- Loading State -->
    <div v-if="pending" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
      <div class="flex items-center">
        <svg class="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <h3 class="text-red-800 font-medium">Error loading IP information</h3>
          <p class="text-red-600 text-sm mt-1">{{ error.message }}</p>
        </div>
      </div>
      <button @click="refresh()" class="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
        Try Again
      </button>
    </div>

    <!-- IP Information Cards -->
    <div v-else-if="data?.success && data.data" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Main IP Card -->
      <div class="bg-white rounded-xl shadow-lg p-6 md:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-semibold text-gray-800">Your IP Address</h2>
          <button @click="refresh()" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm">
            Refresh
          </button>
        </div>
        <div class="text-center">
          <div class="text-4xl font-mono font-bold text-indigo-600 mb-2">{{ data.data.query }}</div>
          <div class="text-gray-600">{{ data.data.isp }}</div>
        </div>
      </div>

      <!-- Location Card -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          Location
        </h3>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">Country:</span>
            <span class="font-medium">{{ data.data.country }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Region:</span>
            <span class="font-medium">{{ data.data.regionName }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">City:</span>
            <span class="font-medium">{{ data.data.city }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Timezone:</span>
            <span class="font-medium">{{ data.data.timezone }}</span>
          </div>
        </div>
      </div>

      <!-- Technical Details Card -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
          </svg>
          Technical Details
        </h3>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">ISP:</span>
            <span class="font-medium text-sm">{{ data.data.isp }}</span>
          </div>
          <div v-if="data.data.as" class="flex justify-between">
            <span class="text-gray-600">AS:</span>
            <span class="font-medium text-sm">{{ data.data.as }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Latitude:</span>
            <span class="font-medium">{{ data.data.lat }}°</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Longitude:</span>
            <span class="font-medium">{{ data.data.lon }}°</span>
          </div>
        </div>
      </div>

      <!-- Map Link Card -->
      <div class="bg-white rounded-xl shadow-lg p-6 md:col-span-2">
        <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"></path>
          </svg>
          View on Map
        </h3>
        <a 
          :href="`https://www.google.com/maps?q=${data.data.lat},${data.data.lon}`" 
          target="_blank" 
          class="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
          Open in Google Maps
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
// Fetch IP data from our server API
const { data, pending, error, refresh } = await useFetch('/api/ip')
</script>
