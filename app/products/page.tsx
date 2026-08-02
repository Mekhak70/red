// app/products/page.tsx
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { SiteShell } from '@/components/site-shell'
import { ProductsBrowser } from '@/components/products-browser'
import { fetchAllProductsFromSheets, defaultProducts } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Ապրանքներ',
  description: 'Դիտեք մեր ամբողջ տեսականին՝ թարմ մթերք, խմիչքներ, կենցաղային ապրանքներ և ավելին։',
}

export default async function ProductsPage() {
  // Fetch all products from Google Sheets
  const products = await fetchAllProductsFromSheets()
  const allProducts = products.length > 0 ? products : defaultProducts

  return (
    <SiteShell>
      <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-center text-muted-foreground">Բեռնվում է...</div>}>
        <ProductsBrowser 
          initialCategory={null}
          initialProducts={allProducts}
        />
      </Suspense>
    </SiteShell>
  )
}