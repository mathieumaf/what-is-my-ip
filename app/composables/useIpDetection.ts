interface IpResponse {
  ip: string
}

interface UseIpDetectionReturn {
  ipAddress: Readonly<Ref<string>>
  loading: Readonly<Ref<boolean>>
  error: Readonly<Ref<Error | null | undefined>>
  refresh: () => Promise<void>
}

export const useIpDetection = (): UseIpDetectionReturn => {
  const {
    data,
    status,
    error: fetchError,
    refresh,
  } = useFetch<IpResponse>('/api/ip', {
    server: false,
  })

  const ipAddress = computed(() => data.value?.ip ?? '')
  const loading = computed(
    () => status.value === 'pending' || (status.value === 'idle' && !data.value)
  )
  const error = computed(() => fetchError.value)

  return {
    ipAddress: readonly(ipAddress),
    loading: readonly(loading),
    error: readonly(error),
    refresh,
  }
}
