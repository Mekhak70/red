'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Package, Phone } from 'lucide-react'
import { SiteShell } from '@/components/site-shell'
import { OrderTimeline } from '@/components/order-timeline'
import { getOrder, type Order } from '@/lib/orders'
import { formatAMD, STORE } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function OrderConfirmationView({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null | undefined>(undefined)

  useEffect(() => {
    setOrder(getOrder(orderId) ?? null)
  }, [orderId])

  if (order === undefined) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-3xl px-4 py-20 text-center text-muted-foreground">
          Բեռնվում է...
        </div>
      </SiteShell>
    )
  }

  if (order === null) {
    return (
      <SiteShell>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-20 text-center">
          <h1 className="text-2xl font-extrabold">Պատվերը չի գտնվել</h1>
          <p className="text-muted-foreground">
            Հնարավոր է պատվերի համարը սխալ է կամ ջնջվել է բրաուզերի պատմությունից։
          </p>
          <Button render={<Link href="/products" />}>Դեպի ապրանքներ</Button>
        </div>
      </SiteShell>
    )
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="flex flex-col items-center gap-3 rounded-2xl border bg-card p-8 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="size-9" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Շնորհակալություն պատվերի համար</h1>
          <p className="text-muted-foreground text-pretty">
            Ձեր պատվերն ընդունված է։ Մենք շուտով կզանգահարենք հաստատման համար։
          </p>
          <div className="mt-2 rounded-lg bg-muted px-4 py-2">
            <span className="text-sm text-muted-foreground">Պատվերի համար՝ </span>
            <span className="font-bold text-primary">{order.id}</span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-5">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <Package className="size-5 text-primary" /> Պատվերի կարգավիճակ
            </h2>
            <OrderTimeline status={order.status} />
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-xl border bg-card p-5">
              <h2 className="mb-3 text-lg font-bold">Առաքման տվյալներ</h2>
              <dl className="flex flex-col gap-1.5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Անուն</dt>
                  <dd className="text-right font-medium">{order.customer.name}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Հեռախոս</dt>
                  <dd className="text-right font-medium">{order.customer.phone}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Հասցե</dt>
                  <dd className="text-right font-medium">{order.customer.address}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Վճարում</dt>
                  <dd className="text-right font-medium">
                    {order.payment === 'cash' ? 'Կանխիկ' : 'Քարտով'} առաքման պահին
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h2 className="mb-3 text-lg font-bold">Ապրանքներ</h2>
              <ul className="flex flex-col gap-3">
                {order.items.map((it) => (
                  <li key={it.id} className="flex items-center gap-3">
                    <div className="relative size-12 shrink-0">
                      <Image
                        src={it.image || '/placeholder.svg'}
                        alt={it.name}
                        fill
                        sizes="48px"
                        className="rounded-md object-cover"
                      />
                      <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                        {it.quantity}
                      </span>
                    </div>
                    <span className="min-w-0 flex-1 truncate text-sm">{it.name}</span>
                    <span className="text-sm font-medium">{formatAMD(it.price * it.quantity)}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-3" />
              <div className="flex items-center justify-between">
                <span className="font-semibold">Ընդհանուր</span>
                <span className="text-lg font-extrabold text-primary">{formatAMD(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 rounded-xl bg-muted/50 p-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="size-4 text-primary" />
            <span>Հարցե՞ր ունեք պատվերի վերաբերյալ։ Զանգահարեք՝ {STORE.phone}</span>
          </div>
          <Button variant="outline" render={<Link href="/order-tracking" />}>
            Հետևել պատվերին
          </Button>
        </div>
      </div>
    </SiteShell>
  )
}
