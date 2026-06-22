import { Suspense } from 'react'
import type { Metadata } from 'next'
import { SiteShell } from '@/components/site-shell'
import { ProductsBrowser } from '@/components/products-browser'

export const metadata: Metadata = {
  title: 'Ապրանքներ',
  description: 'Դիտեք մեր ամբողջ տեսականին՝ թարմ մթերք, խմիչքներ, կենցաղային ապրանքներ և ավելին։',
}

export default function ProductsPage() {
  return (
    <SiteShell>
      <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-center text-muted-foreground">Բեռնվում է...</div>}>
        <ProductsBrowser />
      </Suspense>
    </SiteShell>
  )
}
