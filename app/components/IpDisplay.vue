<script setup lang="ts">
const { ipAddress, loading, error, refresh } = useIpDetection()
</script>

<template>
  <section aria-label="IP address display" :aria-busy="loading" data-testid="ip-display">
    <UCard>
      <USkeleton
        v-if="loading"
        class="h-10 w-48 mx-auto sm:h-14 sm:w-72 lg:h-20 lg:w-96"
        data-testid="ip-skeleton"
      />
      <UAlert
        v-else-if="error"
        color="error"
        variant="soft"
        icon="i-heroicons-exclamation-triangle"
        title="Unable to detect IP"
        description="We couldn't determine your IP address."
        :actions="[{ label: 'Try Again', onClick: () => refresh(), size: 'xl' }]"
        data-testid="ip-error"
      />
      <p
        v-else
        class="text-3xl sm:text-5xl lg:text-6xl font-mono font-bold text-center"
        data-testid="ip-address"
      >
        {{ ipAddress }}
      </p>
    </UCard>
  </section>
</template>
