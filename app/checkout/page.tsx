'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Banknote, CreditCard } from 'lucide-react'
import { SiteShell } from '@/components/site-shell'
import { useCart } from '@/lib/cart-context'
import { formatAMD, STORE } from '@/lib/data'
import {
  addOrder,
  generateOrderId,
  type Order,
} from '@/lib/orders'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart()
  const router = useRouter()
  const [payment, setPayment] = useState<'cash' | 'card'>('cash')
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const deliveryFee = subtotal >= STORE.freeDeliveryThreshold ? 0 : STORE.deliveryFee
  const total = subtotal + deliveryFee

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Մուտքագրեք ձեր անունը'
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone.trim())) e.phone = 'Մուտքագրեք վավեր հեռախոսահամար'
    if (!form.address.trim()) e.address = 'Մուտքագրեք առաքման հասցեն'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate() || items.length === 0) return
    setSubmitting(true)

    const order: Order = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      status: 'pending',
      customer: { ...form },
      payment,
      items: items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image,
      })),
      subtotal,
      deliveryFee,
      total,
    }

    addOrder(order)
    clear()
    router.push(`/order-confirmation/${order.id}`)
  }

  if (items.length === 0) {
    return (
      <SiteShell>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-20 text-center">
          <h1 className="text-2xl font-extrabold">Զամբյուղը դատարկ է</h1>
          <p className="text-muted-foreground">
            Պատվեր կատարելու համար նախ ավելացրեք ապրանքներ։
          </p>
          <Button render={<Link href="/products" />}>Դեպի ապրանքներ</Button>
        </div>
      </SiteShell>
    )
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-extrabold tracking-tight md:text-3xl">
          Պատվերի ձևակերպում
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            {/* Contact */}
            <section className="rounded-xl border bg-card p-5">
              <h2 className="mb-4 text-lg font-bold">Կոնտակտային տվյալներ</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name">Անուն Ազգանուն *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    aria-invalid={!!errors.name}
                    placeholder="Անի Հակոբյան"
                  />
                  {errors.name && <span className="text-xs text-destructive">{errors.name}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone">Հեռախոս *</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    aria-invalid={!!errors.phone}
                    placeholder="+374 XX XXXXXX"
                    inputMode="tel"
                  />
                  {errors.phone && <span className="text-xs text-destructive">{errors.phone}</span>}
                </div>
              </div>
            </section>

            {/* Delivery */}
            <section className="rounded-xl border bg-card p-5">
              <h2 className="mb-4 text-lg font-bold">Առաքման հասցե</h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="address">Հասցե *</Label>
                  <Input
                    id="address"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    aria-invalid={!!errors.address}
                    placeholder="Փողոց, շենք, բնակարան, քաղաք"
                  />
                  {errors.address && <span className="text-xs text-destructive">{errors.address}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="notes">Նշումներ (ոչ պարտադիր)</Label>
                  <Textarea
                    id="notes"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Հավելյալ ցուցումներ առաքչի համար"
                    rows={3}
                  />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-xl border bg-card p-5">
              <h2 className="mb-4 text-lg font-bold">Վճարման եղանակ</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {([
                  { id: 'cash', label: 'Կանխիկ առաքման պահին', icon: Banknote },
                  { id: 'card', label: 'Քարտով առաքման պահին', icon: CreditCard },
                ] as const).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPayment(opt.id)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg border p-4 text-left transition-colors',
                      payment === opt.id
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'hover:bg-muted',
                    )}
                  >
                    <opt.icon className="size-5 text-primary" />
                    <span className="text-sm font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border bg-card p-5">
              <h2 className="text-lg font-bold">Ձեր պատվերը</h2>
              <Separator className="my-4" />
              <ul className="flex max-h-64 flex-col gap-3 overflow-y-auto">
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className="flex items-center gap-3">
                    <div className="relative size-12 shrink-0">
                      <Image
                        src={product.image || '/placeholder.svg'}
                        alt={product.name}
                        fill
                        sizes="48px"
                        className="rounded-md object-cover"
                      />
                      <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                        {quantity}
                      </span>
                    </div>
                    <span className="min-w-0 flex-1 truncate text-sm">{product.name}</span>
                    <span className="text-sm font-medium">
                      {formatAMD(product.price * quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <Separator className="my-4" />
              <dl className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Ապրանքներ</dt>
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
                <span className="text-xl font-extrabold text-primary">{formatAMD(total)}</span>
              </div>
              <Button type="submit" size="lg" className="mt-5 w-full" disabled={submitting}>
                {submitting ? 'Ուղարկվում է...' : 'Հաստատել պատվերը'}
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Հաստատելով՝ դուք համաձայնում եք մեր պայմաններին
              </p>
            </div>
          </div>
        </form>
      </div>
    </SiteShell>
  )
}
