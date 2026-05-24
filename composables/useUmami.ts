type UmamiProps = Record<string, string | number | boolean>

export function useUmami() {
  function track(eventName: string, props?: UmamiProps) {
    if (import.meta.server) return
    const w = window as typeof window & { umami?: { track: (name: string, props?: UmamiProps) => void } }
    w.umami?.track(eventName, props)
  }

  return { track }
}
