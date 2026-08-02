// components/products-browser.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product, formatAMD } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface ProductsBrowserProps {
  initialCategory: string | null
  initialProducts: Product[]
}

export function ProductsBrowser({ initialCategory, initialProducts }: ProductsBrowserProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(initialProducts)

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(initialProducts)
    } else {
      const filtered = initialProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredProducts(filtered)
    }
  }, [searchTerm, initialProducts])

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50" />
        <Input
          type="text"
          placeholder="Փնտրել ապրանքներ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 rounded-xl border-border/40 focus-visible:ring-rose-500/30"
        />
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground/70 mb-4">
        {filteredProducts.length} ապրանք
      </p>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg text-muted-foreground/70">
            {searchTerm ? 'Ապրանքներ չեն գտնվել' : 'Ապրանքներ չկան'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/50 p-4 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-rose-500/20 hover:bg-card/80"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-muted/30">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized={product.image.startsWith('http')}
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