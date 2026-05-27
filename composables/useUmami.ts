type UmamiProps = Record<string, string | number | boolean>

export function useUmami() {
  function track(eventName: string, props?: UmamiProps) {
    if (import.meta.server) return
    const w = window as typeof window & { umami?: { track: (name: string, props?: UmamiProps) => void } }
    if (w.umami?.track) {
      w.umami.track(eventName, props)
    }
    else {
      // Script ainda carregando (defer) — aguarda e tenta uma vez
      window.addEventListener('load', () => {
        w.umami?.track(eventName, props)
      }, { once: true })
    }
  }

  return { track }
}
