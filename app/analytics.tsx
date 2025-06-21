// app/analytics.tsx
'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function GoogleAnalyticsPageView() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-2EGXJ02Z3K', {
        page_path: pathname,
      })
    }
  }, [pathname])

  return null
}
