<script setup lang="ts">
const { ipAddress, loading, error, refresh } = useIpDetection()
</script>

<template>
  <section aria-label="IP address display" data-testid="ip-display">
    <UCard>
      <USkeleton
        v-if="loading"
        class="h-12 w-48 mx-auto md:h-16 md:w-72 lg:h-20 lg:w-96"
        data-testid="ip-skeleton"
      />
      <UAlert
        v-else-if="error"
        color="error"
        variant="soft"
        icon="i-heroicons-exclamation-triangle"
        title="Unable to detect IP"
        description="We couldn't determine your IP address."
        :actions="[{ label: 'Try Again', onClick: () => refresh() }]"
        data-testid="ip-error"
      />
      <p
        v-else
        class="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-center"
        data-testid="ip-address"
      >
        {{ ipAddress }}
      </p>
    </UCard>
  </section>
</template>
