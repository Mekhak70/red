'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { SiteShell } from '@/components/site-shell'
import { useCart } from '@/lib/cart-context'
import { formatAMD, STORE } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function CartPage() {
  const { items, subtotal, setQuantity, removeItem, count } = useCart()
  const deliveryFee = subtotal >= STORE.freeDeliveryThreshold || subtotal === 0 ? 0 : STORE.deliveryFee
  const total = subtotal + deliveryFee

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-extrabold tracking-tight md:text-3xl">
          Իմ զամբյուղը
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed py-20 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="size-7 text-muted-foreground" />
            </div>
            <p className="text-lg font-semibold">Ձեր զամբյուղը դատարկ է</p>
            <p className="text-sm text-muted-foreground">
              Ավելացրեք ապրանքներ՝ պատվեր կատարելու համար
            </p>
            <Button render={<Link href="/products" />}>
              Սկսել գնումները <ArrowRight className="size-4" />
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ul className="flex flex-col gap-3">
                {items.map(({ product, quantity }) => (
                  <li
                    key={product.id}
                    className="flex gap-4 rounded-xl border bg-card p-3"
                  >
                    <Link href={`/products/${product.slug}`} className="shrink-0">
                      <Image
                        src={product.image || '/placeholder.svg'}
                        alt={product.name}
                        width={96}
                        height={96}
                        className="size-20 rounded-lg object-cover sm:size-24"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <Link
                        href={`/products/${product.slug}`}
                        className="font-semibold hover:text-primary"
                      >
                        {product.name}
                      </Link>
                      <span className="text-sm text-muted-foreground">
                        {product.unit} · {formatAMD(product.price)}
                      </span>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-lg border">
                          <button
                            onClick={() => setQuantity(product.id, quantity - 1)}
                            className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground"
                            aria-label="Պակասեցնել"
                          >
                            <Minus className="size-4" />
                          </button>
                          <span className="w-9 text-center text-sm font-semibold">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(product.id, quantity + 1)}
                            className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground"
                            aria-label="Ավելացնել"
                          >
                            <Plus className="size-4" />
                          </button>
                        </div>
                        <span className="font-bold text-primary">
                          {formatAMD(product.price * quantity)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="self-start text-muted-foreground hover:text-destructive"
                      aria-label="Հեռացնել"
                    >
                      <Trash2 className="size-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border bg-card p-5">
                <h2 className="text-lg font-bold">Պատվերի ամփոփում</h2>
                <Separator className="my-4" />
                <dl className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Ապրանքներ ({count})</dt>
                    <dd className="font-medium">{formatAMD(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Առաքում</dt>
                    <dd className="font-medium">
                      {deliveryFee === 0 ? 'Անվճար' : formatAMD(deliveryFee)}
                    </dd>
                  </div>
                </dl>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Ընդհանուր</span>
                  <span className="text-xl font-extrabold text-primary">
                    {formatAMD(total)}
                  </span>
                </div>
                <Button className="mt-5 w-full" size="lg" render={<Link href="/checkout" />}>
                  Անցնել վճարման <ArrowRight className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="mt-2 w-full"
                  render={<Link href="/products" />}
                >
                  Շարունակել գնումները
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SiteShell>
  )
}
