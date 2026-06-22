'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Plus, Star } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { formatAMD, type Product } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const badgeLabels: Record<string, string> = {
  new: 'Նոր',
  sale: 'Զեղչ',
  featured: 'Հիթ',
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    addItem(product)
    toast.success(`${product.name} ավելացվեց զամբյուղ`)
  }

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {discount > 0 && (
            <Badge className="bg-primary text-primary-foreground">-{discount}%</Badge>
          )}
          {product.badges
            .filter((b) => b !== 'sale')
            .map((b) => (
              <Badge
                key={b}
                className={cn(
                  b === 'new'
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-secondary text-secondary-foreground',
                )}
              >
                {badgeLabels[b]}
              </Badge>
            ))}
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <Badge variant="secondary">Առկա չէ</Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-accent text-accent" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-balance">
          {product.name}
        </h3>
        <span className="text-xs text-muted-foreground">{product.unit}</span>
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatAMD(product.oldPrice)}
              </span>
            )}
            <span className="text-base font-bold text-primary">
              {formatAMD(product.price)}
            </span>
          </div>
          <Button
            size="icon"
            onClick={handleAdd}
            disabled={!product.inStock}
            aria-label="Ավելացնել զամբյուղ"
            className="size-9 shrink-0"
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </div>
    </Link>
  )
}
