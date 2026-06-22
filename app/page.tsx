import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight,
  Clock,
  CreditCard,
  ShieldCheck,
  Star,
  Truck,
} from 'lucide-react'
import { SiteShell } from '@/components/site-shell'
import { ProductRow } from '@/components/product-row'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { categories, products, reviews, STORE } from '@/lib/data'

export const metadata: Metadata = {
  description:
    'Թարմ մթերք, խմիչքներ և կենցաղային ապրանքներ առցանց՝ արագ առաքմամբ Երևանում։ Վճարում առաքման պահին։',
}

const trustBadges = [
  { icon: Truck, title: 'Արագ առաքում', text: 'Նույն օրը՝ Երևանում' },
  { icon: CreditCard, title: 'Վճարում առաքման պահին', text: 'Կանխիկ կամ քարտով' },
  { icon: ShieldCheck, title: 'Որակի երաշխիք', text: 'Միայն թարմ ապրանքներ' },
  { icon: Clock, title: 'Ամեն օր բաց', text: STORE.hours },
]

export default function HomePage() {
  const featured = products.filter((p) => p.badges.includes('featured'))
  const newArrivals = products.filter((p) => p.badges.includes('new'))
  const onSale = products.filter((p) => p.badges.includes('sale'))

  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sidebar text-sidebar-foreground">
        <div className="absolute inset-0">
          <Image
            src="/hero-grocery.png"
            alt=""
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sidebar via-sidebar/90 to-sidebar/40" />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-16 md:py-24">
          <Badge className="w-fit bg-accent text-accent-foreground">
            Անվճար առաքում 10,000 ֏-ից
          </Badge>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-balance md:text-6xl">
            Թարմ մթերք՝ ձեր դռան մոտ
          </h1>
          <p className="max-w-xl text-base text-sidebar-foreground/80 leading-relaxed md:text-lg">
            2021 սուպերմարկետը՝ ձեր վստահելի օնլայն խանութը։ Պատվիրեք հազարավոր
            թարմ ապրանքներ և ստացեք առաքում նույն օրը։ Վճարեք առաքման պահին։
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" render={<Link href="/products" />}>
              Սկսել գնումները
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-sidebar-foreground/30 bg-transparent text-sidebar-foreground hover:bg-sidebar-foreground/10"
              render={<Link href="/categories" />}
            >
              Դիտել կատեգորիաները
            </Button>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 lg:grid-cols-4">
          {trustBadges.map((b) => (
            <div key={b.title} className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <b.icon className="size-5" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold">{b.title}</p>
                <p className="text-xs text-muted-foreground">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight">Կատեգորիաներ</h2>
          <Link
            href="/categories"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Տեսնել բոլորը <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/categories/${c.slug}`}
              className="group flex flex-col items-center gap-2 rounded-xl border bg-card p-3 text-center transition-shadow hover:shadow-md"
            >
              <div className="relative size-16 overflow-hidden rounded-full bg-muted">
                <Image
                  src={c.image || '/placeholder.svg'}
                  alt={c.name}
                  fill
                  sizes="64px"
                  className="object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <span className="text-xs font-semibold">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <ProductRow
        title="Զեղչված ապրանքներ"
        subtitle="Շահավետ առաջարկներ՝ սահմանափակ ժամանակով"
        products={onSale}
        href="/products?sort=sale"
      />

      <ProductRow
        title="Առաջարկվող ապրանքներ"
        subtitle="Մեր հաճախորդների սիրելիները"
        products={featured}
        href="/products"
      />

      <ProductRow
        title="Նոր ապրանքներ"
        subtitle="Թարմ համալրումներ մեր դարակներում"
        products={newArrivals}
        href="/products?sort=new"
      />

      {/* Reviews */}
      <section className="bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-extrabold tracking-tight">Հաճախորդների կարծիքները</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Ավելի քան 5,000 գոհ հաճախորդ
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map((r) => (
              <figure key={r.id} className="flex flex-col gap-3 rounded-xl border bg-card p-5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < r.rating
                          ? 'size-4 fill-accent text-accent'
                          : 'size-4 text-muted-foreground/30'
                      }
                    />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-pretty">
                  {r.text}
                </blockquote>
                <figcaption className="mt-auto text-sm font-semibold">{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery CTA */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground">
          <Truck className="size-10" />
          <h2 className="text-2xl font-extrabold text-balance md:text-3xl">
            Պատվիրեք հիմա, ստացեք նույն օրը
          </h2>
          <p className="max-w-xl text-primary-foreground/85 text-pretty">
            Անվճար առաքում 10,000 ֏-ից բարձր պատվերների դեպքում։ Վճարեք առաքման
            պահին՝ կանխիկ կամ քարտով։
          </p>
          <Button size="lg" variant="secondary" render={<Link href="/products" />}>
            Սկսել գնումները
          </Button>
        </div>
      </section>
    </SiteShell>
  )
}
