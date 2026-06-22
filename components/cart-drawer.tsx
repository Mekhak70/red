'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { formatAMD, STORE } from '@/lib/data'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

export function CartDrawer() {
  const { items, count, subtotal, removeItem, setQuantity } = useCart()
  const [open, setOpen] = useState(false)
  const deliveryFree = subtotal >= STORE.freeDeliveryThreshold

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Բացել զամբյուղը"
          />
        }
      >
        <ShoppingBag className="size-5" />
        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
            {count}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="size-5 text-primary" />
            Իմ զամբյուղը ({count})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="size-7 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">Ձեր զամբյուղը դատարկ է</p>
            <Button onClick={() => setOpen(false)} render={<Link href="/products" />}>
              Սկսել գնումները
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-3">
              <ul className="flex flex-col gap-3">
                {items.map(({ product, quantity }) => (
                  <li
                    key={product.id}
                    className="flex gap-3 rounded-lg border bg-card p-2"
                  >
                    <Image
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="size-16 shrink-0 rounded-md object-cover"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <Link
                        href={`/products/${product.slug}`}
                        onClick={() => setOpen(false)}
                        className="truncate text-sm font-semibold hover:text-primary"
                      >
                        {product.name}
                      </Link>
                      <span className="text-xs text-muted-foreground">
                        {product.unit}
                      </span>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-md border">
                          <button
                            onClick={() => setQuantity(product.id, quantity - 1)}
                            className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
                            aria-label="Պակասեցնել"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-7 text-center text-sm font-medium">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(product.id, quantity + 1)}
                            className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
                            aria-label="Ավելացնել"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-primary">
                          {formatAMD(product.price * quantity)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="self-start text-muted-foreground hover:text-destructive"
                      aria-label="Հեռացնել"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <SheetFooter className="border-t">
              <div className="flex w-full flex-col gap-3">
                {!deliveryFree && (
                  <Badge variant="secondary" className="w-fit gap-1">
                    Ավելացրեք {formatAMD(STORE.freeDeliveryThreshold - subtotal)}՝ անվճար առաքման համար
                  </Badge>
                )}
                <div className="flex items-center justify-between text-base">
                  <span className="font-medium">Ընդհանուր</span>
                  <span className="text-xl font-bold text-primary">
                    {formatAMD(subtotal)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setOpen(false)}
                    render={<Link href="/cart" />}
                  >
                    Զամբյուղ
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => setOpen(false)}
                    render={<Link href="/checkout" />}
                  >
                    Պատվիրել
                  </Button>
                </div>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
