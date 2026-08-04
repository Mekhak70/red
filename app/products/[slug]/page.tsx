// app/products/[slug]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Check, ChevronRight, Star, Truck, X } from 'lucide-react'
import { SiteShell } from '@/components/site-shell'
import { ProductRow } from '@/components/product-row'
import { AddToCart } from '@/components/add-to-cart'
import { Badge } from '@/components/ui/badge'
import {
  categories,
  formatAMD,
  fetchAllProductsFromSheets,
  defaultProducts,
  getCategoryBySlug,
} from '@/lib/data'

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const products = await fetchAllProductsFromSheets()
  const allProducts = products.length > 0 ? products : defaultProducts
  const product = allProducts.find((p) => p.slug === slug)
  
  if (!product) {
    return { title: 'Ապրանք չի գտնվել' }
  }
  
  return { 
    title: product.name, 
    description: product.description 
  }
}

export async function generateStaticParams() {
  const products = await fetchAllProductsFromSheets()
  const allProducts = products.length > 0 ? products : defaultProducts
  return allProducts.map((p) => ({ slug: p.slug }))
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params
  const products = await fetchAllProductsFromSheets()
  const allProducts = products.length > 0 ? products : defaultProducts
  const product = allProducts.find((p) => p.slug === slug)
  
  if (!product) notFound()

  const category = categories.find((c) => c.id === product?.categoryId)
  const related = allProducts
    .filter((p) => p.categoryId === product?.categoryId && p.id !== product.id)
    .slice(0, 4)

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-5 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Գլխավոր</Link>
          <ChevronRight className="size-3.5" />
          <Link href="/products" className="hover:text-primary">Ապրանքներ</Link>
          {category && (
            <>
              <ChevronRight className="size-3.5" />
              <Link href={`/categories/${category.slug}`} className="hover:text-primary">
                {category.name}
              </Link>
            </>
          )}
        </nav>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl border bg-card">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                unoptimized={product.image.startsWith('http')}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground/30">
                No image
              </div>
            )}
            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              {product.badges.includes('sale') && (
                <Badge className="bg-primary text-primary-foreground">🔥 Զեղչ</Badge>
              )}
              {product.badges.includes('new') && (
                <Badge className="bg-accent text-accent-foreground">🆕 Նոր</Badge>
              )}
              {product.badges.includes('featured') && (
                <Badge className="bg-yellow-500 text-white">⭐ Առաջարկվող</Badge>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-balance md:text-3xl">
                {product.name}
              </h1>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-accent text-accent" />
                  <span className="text-sm font-semibold">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviewCount} կարծիք)
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">{product.unit}</span>
              </div>
            </div>

            <div className="flex items-end gap-3">
              <span className="text-3xl font-extrabold text-primary">
                {formatAMD(product.price)}
              </span>
              {product.oldPrice && (
                <span className="mb-1 text-lg text-muted-foreground line-through">
                  {formatAMD(product.oldPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm">
              {product.inStock ? (
                <span className="flex items-center gap-1.5 font-medium text-primary">
                  <Check className="size-4" /> Առկա է պահեստում
                </span>
              ) : (
                <span className="flex items-center gap-1.5 font-medium text-destructive">
                  <X className="size-4" /> Ժամանակավորապես առկա չէ
                </span>
              )}
            </div>

            <p className="leading-relaxed text-muted-foreground text-pretty">
              {product.description}
            </p>

            <div className="border-y py-4">
              <AddToCart product={product} />
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3 text-sm">
              <Truck className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="font-semibold">Արագ առաքում Երևանում</p>
                <p className="text-muted-foreground">
                  Պատվիրեք այսօր և ստացեք նույն օրը։ Վճարում առաքման պահին։
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <ProductRow title="Նմանատիպ ապրանքներ" products={related} />
      )}
    </SiteShell>
  )
}