'use client'

import { useState } from 'react'
import { Minus, Plus, ShoppingCart, Check } from 'lucide-react'
import type { Product } from '@/lib/data'
import { formatAMD } from '@/lib/data'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-lg border">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex size-10 items-center justify-center text-muted-foreground hover:text-foreground"
            aria-label="Պակասեցնել"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-10 text-center font-semibold">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="flex size-10 items-center justify-center text-muted-foreground hover:text-foreground"
            aria-label="Ավելացնել"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <span className="text-sm text-muted-foreground">
          Միավորի գին՝ {formatAMD(product.price)}
        </span>
      </div>

      <Button
        size="lg"
        onClick={handleAdd}
        disabled={!product.inStock}
        className="w-full sm:w-auto"
      >
        {added ? (
          <>
            <Check className="size-5" /> Ավելացված է
          </>
        ) : (
          <>
            <ShoppingCart className="size-5" />
            {product.inStock ? `Ավելացնել զամբյուղ — ${formatAMD(product.price * qty)}` : 'Առկա չէ'}
          </>
        )}
      </Button>
    </div>
  )
}
