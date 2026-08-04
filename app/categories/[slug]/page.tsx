// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategoryBySlug, categories, fetchAllProductsFromSheets, defaultProducts, formatAMD } from '@/lib/data'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  // ✅ Վերականգնել notFound()-ը - սա պարտադիր է:
  if (!category) {
    notFound()
  }

  const products = await fetchAllProductsFromSheets()
  const allProducts = products.length > 0 ? products : defaultProducts
  const categoryProducts = allProducts.filter((p) => p.categoryId === category.id)
console.log(`Category: ${category}, Products: ${categoryProducts.length}`)
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground/90">
            {category.name}
          </h1>
          <Badge className="bg-rose-500/10 text-rose-500/70 hover:bg-rose-500/20 border-rose-500/20">
            {categoryProducts.length} ապրանք
          </Badge>
        </div>
        <p className="text-muted-foreground/70 mt-1">
          Ընտրեք ձեր ուզած ապրանքը {category.name} կատեգորիայից
        </p>
      </div>

      {/* Products */}
      {categoryProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg text-muted-foreground/70">
            Այս կատեգորիայում ապրանքներ չկան
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categoryProducts.map((product) => (
            console.log(`Rendering product: ${product.name}, Price: ${product.price}, Old Price: ${product.image} $`),
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/50 p-4 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-rose-500/20 hover:bg-card/80"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-muted/30">
                {product.image ? (
                 <Image
                 src={product.image}
                 alt={product.name || "Product"}
                 fill
                 className="object-cover transition-transform duration-700 group-hover:scale-110"
                 unoptimized={product.image.startsWith("http")}
               />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground/30">
                    No image
                  </div>
                )}
                {product.oldPrice && (
                  <Badge className="absolute top-3 right-3 bg-red-500/90 hover:bg-red-500 text-white border-0 shadow-lg px-3 py-1 text-sm font-semibold">
                    -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                  </Badge>
                )}
                {product.badges.includes('new') && (
                  <Badge className="absolute top-3 left-3 bg-green-500/90 hover:bg-green-500 text-white border-0 shadow-lg px-3 py-1 text-sm font-semibold">
                    🆕 Նոր
                  </Badge>
                )}
                {product.badges.includes('featured') && (
                  <Badge className="absolute bottom-3 left-3 bg-yellow-500/90 hover:bg-yellow-500 text-white border-0 shadow-lg px-3 py-1 text-sm font-semibold">
                    ⭐ Առաջարկվող
                  </Badge>
                )}
              </div>
              <div className="mt-3">
                <h3 className="font-semibold text-foreground/90 line-clamp-1 group-hover:text-rose-500/90 transition-colors">
                  {product.name}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-lg font-bold text-red-600">
                    {formatAMD(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-muted-foreground/50 line-through">
                      {formatAMD(product.oldPrice)}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground/70">
                  <span>⭐ {product.rating}</span>
                  <span>({product.reviewCount})</span>
                </div>
                <div className="mt-2 text-xs">
                  {product.inStock ? (
                    <span className="text-green-600">✅ Կա պահեստում</span>
                  ) : (
                    <span className="text-red-600">❌ Բացակայում է</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}