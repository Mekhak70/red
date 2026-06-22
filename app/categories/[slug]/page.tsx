import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ChevronRight } from 'lucide-react'
import { SiteShell } from '@/components/site-shell'
import { ProductsBrowser } from '@/components/products-browser'
import { categories, getCategoryBySlug } from '@/lib/data'

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) return { title: 'Կատեգորիան չի գտնվել' }
  return { title: category.name, description: `${category.name}՝ թարմ ապրանքներ առցանց պատվերով։` }
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <nav className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Գլխավոր</Link>
          <ChevronRight className="size-3.5" />
          <Link href="/categories" className="hover:text-primary">Կատեգորիաներ</Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">{category.name}</span>
        </nav>
      </div>
      <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-center text-muted-foreground">Բեռնվում է...</div>}>
        <ProductsBrowser initialCategory={category.id} />
      </Suspense>
    </SiteShell>
  )
}
