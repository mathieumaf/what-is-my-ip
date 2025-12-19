<template>
  <div>
    <!-- Loading State -->
    <div v-if="pending" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="border rounded-lg p-6 mb-6 bg-red-50 border-red-200 dark:bg-red-950/40 dark:border-red-900/60"
    >
      <div class="flex items-center">
        <svg class="w-6 h-6 mr-3 text-red-600 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <h3 class="font-medium text-red-800 dark:text-red-200">Error loading IP information</h3>
          <p class="text-sm mt-1 text-red-600 dark:text-red-300">{{ error.message }}</p>
        </div>
      </div>
      <button
        @click="refresh()"
        class="rounded-md transition-colors px-4 py-2 mt-4 bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400"
      >
        Try Again
      </button>
    </div>

    <!-- IP Information Cards -->
    <div v-else-if="data?.success && data.data" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Main IP Card -->
      <div class="rounded-xl shadow-lg p-6 md:col-span-2 bg-white dark:bg-slate-900/70">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-semibold text-gray-800 dark:text-slate-100">Your IP Address</h2>
          <button
            @click="refresh()"
            class="text-sm rounded-md transition-colors px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            Refresh
          </button>
        </div>
        <div class="text-center">
          <div class="text-4xl font-mono font-bold mb-2 text-indigo-600 dark:text-indigo-300">{{ data.data.query }}</div>
          <div class="text-gray-600 dark:text-slate-300">{{ data.data.isp }}</div>
        </div>
      </div>

      <!-- Location Card -->
      <div class="rounded-xl shadow-lg p-6 bg-white dark:bg-slate-900/70">
        <h3 class="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-slate-100">
          <svg class="w-5 h-5 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          Location
        </h3>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-slate-300">Country:</span>
            <span class="font-medium text-gray-900 dark:text-slate-100">{{ data.data.country }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-slate-300">Region:</span>
            <span class="font-medium text-gray-900 dark:text-slate-100">{{ data.data.regionName }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-slate-300">City:</span>
            <span class="font-medium text-gray-900 dark:text-slate-100">{{ data.data.city }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-slate-300">Timezone:</span>
            <span class="font-medium text-gray-900 dark:text-slate-100">{{ data.data.timezone }}</span>
          </div>
        </div>
      </div>

      <!-- Technical Details Card -->
      <div class="rounded-xl shadow-lg p-6 bg-white dark:bg-slate-900/70">
        <h3 class="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-slate-100">
          <svg class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
          </svg>
          Technical Details
        </h3>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-slate-300">ISP:</span>
            <span class="font-medium text-sm text-gray-900 dark:text-slate-100">{{ data.data.isp }}</span>
          </div>
          <div v-if="data.data.as" class="flex justify-between">
            <span class="text-gray-600 dark:text-slate-300">AS:</span>
            <span class="font-medium text-sm text-gray-900 dark:text-slate-100">{{ data.data.as }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-slate-300">Latitude:</span>
            <span class="font-medium text-gray-900 dark:text-slate-100">{{ data.data.lat }}°</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-slate-300">Longitude:</span>
            <span class="font-medium text-gray-900 dark:text-slate-100">{{ data.data.lon }}°</span>
          </div>
        </div>
      </div>

      <!-- Map Link Card -->
      <div class="rounded-xl shadow-lg p-6 md:col-span-2 bg-white dark:bg-slate-900/70">
        <h3 class="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-slate-100">
          <svg class="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"></path>
          </svg>
          View on Map
        </h3>
        <a
          :href="`https://www.google.com/maps?q=${data.data.lat},${data.data.lon}`"
          target="_blank"
          class="inline-flex items-center rounded-lg transition-colors px-6 py-3 bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400"
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

<script setup lang="ts">
// Fetch IP data exclusively on the client to capture the visitor's IP instead of the server's
const { data, pending, error, refresh } = useFetch('/api/ip', { server: false })
</script>
