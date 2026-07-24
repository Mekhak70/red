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
  ChevronRight,
  ShoppingBag,
  Gift,
  Zap,
  Award,
  ThumbsUp,
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

const stats = [
  { value: '10,000+', label: 'Ապրանքներ' },
  { value: '5,000+', label: 'Գոհ հաճախորդ' },
  { value: '98%', label: 'Դրական կարծիք' },
  { value: '24/7', label: 'Առցանց պատվեր' },
]

export default function HomePage() {
  const featured = products.filter((p) => p.badges.includes('featured'))
  const newArrivals = products.filter((p) => p.badges.includes('new'))
  const onSale = products.filter((p) => p.badges.includes('sale'))

  return (
    <SiteShell>
      {/* Hero Section - Soft & Elegant */}
      <section className="relative overflow-hidden">
  {/* Background */}
  <div className="absolute inset-0">
  <Image
  src="/red-main.png"
  alt="RED Supermarket"
  fill
  priority
  className="
    object-contain
    object-top
    md:object-cover
    md:object-center
  "
/>
    <div className="absolute inset-0 bg-black/55" />
  </div>

  {/* Content */}
  <div className="relative z-10 mx-auto flex min-h-[90vh] md:min-h-screen max-w-7xl items-center px-5 md:px-6 py-24 md:py-0">
    <div className="max-w-3xl">

      {/* Badge */}
      <div className="mb-6 inline-flex items-center rounded-full bg-red-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg">
        🚚 Անվճար առաքում 10,000 ֏-ից
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight text-white">
        Թարմ մթերք
        <br />
        <span className="text-red-500">
          ամեն օր
        </span>
      </h1>

      {/* Description */}
      <p className="mt-6 max-w-xl text-base sm:text-lg md:text-xl leading-7 md:leading-8 text-white/80">
        RED Սուպերմարկետում կգտնեք հազարավոր թարմ և որակյալ
        ապրանքներ՝ արագ առաքմամբ, մատչելի գներով և բարձր
        սպասարկմամբ։
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">

        <Link href="/products" className="w-full sm:w-auto">
          <Button
            size="lg"
            className="w-full rounded-xl bg-red-600 py-6 text-base md:text-lg font-semibold hover:bg-red-700"
          >
            Սկսել գնումները →
          </Button>
        </Link>

        <Link href="/categories" className="w-full sm:w-auto">
          <Button
            variant="secondary"
            size="lg"
            className="w-full rounded-xl bg-white py-6 text-base md:text-lg font-semibold text-black hover:bg-gray-100"
          >
            Կատեգորիաներ
          </Button>
        </Link>

      </div>

      {/* Features */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
          <div className="text-3xl">🚚</div>
          <h3 className="mt-3 font-semibold text-white">
            Արագ առաքում
          </h3>
          <p className="mt-2 text-sm text-white/70">
            Նույն օրվա առաքում Երևանի տարածքում։
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
          <div className="text-3xl">🥬</div>
          <h3 className="mt-3 font-semibold text-white">
            Թարմ ապրանքներ
          </h3>
          <p className="mt-2 text-sm text-white/70">
            Ամեն օր թարմացվող տեսականի։
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
          <div className="text-3xl">💳</div>
          <h3 className="mt-3 font-semibold text-white">
            Հեշտ վճարում
          </h3>
          <p className="mt-2 text-sm text-white/70">
            Վճարեք կանխիկ կամ քարտով։
          </p>
        </div>

      </div>

    </div>
  </div>

  <div className="absolute bottom-0 left-0 h-32 md:h-40 w-full bg-gradient-to-t from-white to-transparent" />
</section>

      {/* Trust badges - Soft & Elegant */}
      <section className="relative border-y border-border/40 bg-gradient-to-b from-card/80 via-card/60 to-muted/10">
        <div className="absolute inset-0 bg-grid-black/[0.01] bg-[size:40px_40px]" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-10 lg:grid-cols-4">
          {trustBadges.map((b, i) => (
            <div 
              key={b.title} 
              className="group flex items-center gap-4 rounded-2xl p-4 transition-all duration-500 hover:bg-gradient-to-br hover:from-rose-500/5 hover:to-amber-500/5 hover:scale-105 hover:shadow-lg"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500/10 to-amber-500/10 text-rose-500/70 transition-all duration-500 group-hover:from-rose-500/20 group-hover:to-amber-500/20 group-hover:scale-110 group-hover:shadow-md">
                <b.icon className="size-5" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-foreground/90">{b.title}</p>
                <p className="text-xs text-muted-foreground/70">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories - Soft */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <Badge className="mb-3 bg-rose-500/5 text-rose-500/70 hover:bg-rose-500/10 border-rose-500/10">
              🛍️ Կատեգորիաներ
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground/90">Բոլոր կատեգորիաները</h2>
            <p className="mt-2 text-muted-foreground/70">
              Ընտրեք ձեր ուզած ապրանքատեսակը
            </p>
          </div>
          <Link
            href="/categories"
            className="group hidden items-center gap-1 text-sm font-medium text-rose-500/70 hover:text-rose-500/90 hover:underline sm:flex"
          >
            Տեսնել բոլորը 
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-8">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/categories/${c.slug}`}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border/40 bg-card/50 p-5 text-center backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-rose-500/20 hover:bg-gradient-to-b hover:from-rose-500/5 hover:to-transparent"
            >
              <div className="relative size-20 overflow-hidden rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg">
                <Image
                  src={c.image || '/placeholder.svg'}
                  alt={c.name}
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <span className="text-sm font-semibold text-foreground/80">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Product Rows */}
      <ProductRow
        title="🔥 Զեղչված ապրանքներ"
        subtitle="Շահավետ առաջարկներ՝ սահմանափակ ժամանակով"
        products={onSale}
        href="/products?sort=sale"
      />

      <ProductRow
        title="⭐ Առաջարկվող ապրանքներ"
        subtitle="Մեր հաճախորդների սիրելիները"
        products={featured}
        href="/products"
      />

      <ProductRow
        title="✨ Նոր ապրանքներ"
        subtitle="Թարմ համալրումներ մեր դարակներում"
        products={newArrivals}
        href="/products?sort=new"
      />

      {/* Reviews - Soft */}
      <section className="relative bg-gradient-to-b from-muted/20 via-muted/10 to-transparent">
        <div className="absolute inset-0 bg-grid-black/[0.01] bg-[size:40px_40px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-gradient-to-r from-amber-500/10 to-amber-500/5 text-amber-600/70 hover:from-amber-500/20 hover:to-amber-500/10 border-amber-500/10">
              <Star className="mr-1 size-3 fill-amber-400/70 text-amber-400/70" />
              5,000+ գոհ հաճախորդ
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground/90 md:text-4xl">
              Հաճախորդների կարծիքները
            </h2>
            <p className="mt-2 text-muted-foreground/70">
              Ինչ են ասում մեր գնորդները
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map((r, i) => (
              <figure 
                key={r.id} 
                className="group flex flex-col gap-4 rounded-2xl border border-border/40 bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:bg-card/80 hover:border-rose-500/20"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < r.rating
                          ? 'size-4 fill-amber-400/70 text-amber-400/70 transition-all group-hover:scale-110 group-hover:rotate-12'
                          : 'size-4 text-muted-foreground/20'
                      }
                    />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-pretty text-foreground/80">
                  "{r.text}"
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gradient-to-br from-rose-500/10 to-amber-500/10 flex items-center justify-center text-rose-500/70 font-bold">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground/90">{r.name}</p>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="size-3 text-emerald-500/70" />
                      <p className="text-xs text-muted-foreground/70">Հաստատված գնորդ</p>
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery CTA - Soft & Elegant */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500/80 via-rose-400/70 to-amber-400/60 px-8 py-20 text-center text-white shadow-xl">
          {/* Decorative elements - softer */}
          <div className="absolute -right-32 -top-32 size-96 rounded-full bg-white/5 blur-3xl animate-pulse" />
          <div className="absolute -left-32 -bottom-32 size-96 rounded-full bg-white/5 blur-3xl animate-pulse animation-delay-1000" />
          
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="rounded-full bg-white/10 p-5 backdrop-blur-sm shadow-lg hover:scale-105 transition-transform duration-300">
              <ShoppingBag className="size-11 text-white/80" />
            </div>
            <h2 className="text-3xl font-extrabold text-balance md:text-4xl lg:text-5xl text-white/95">
              Պատվիրեք հիմա, ստացեք նույն օրը
            </h2>
            <p className="max-w-2xl text-white/80 text-pretty text-lg">
              Անվճար առաքում 10,000 ֏-ից բարձր պատվերների դեպքում։ 
              Վճարեք առաքման պահին՝ կանխիկ կամ քարտով։
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/products">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="group px-10 py-7 text-lg font-semibold text-foreground/90 bg-white/90 hover:bg-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl rounded-2xl"
                >
                  Սկսել գնումները
                  <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1 group-hover:scale-110" />
                </Button>
              </Link>
              <Link href="/delivery">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border border-white/20 bg-white/5 px-10 py-7 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:scale-105 rounded-2xl"
                >
                  Առաքման պայմաններ
                  <Gift className="ml-2 size-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}