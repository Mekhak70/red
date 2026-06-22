import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Clock, CreditCard, Leaf, MapPin, ShieldCheck, Truck } from 'lucide-react'
import { SiteShell } from '@/components/site-shell'
import { Button } from '@/components/ui/button'
import { STORE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Մեր մասին',
  description:
    'Red սուպերմարկետ — ձեր վստահելի օնլայն խանութը Երևանում։ Թարմ մթերք, արագ առաքում և վճարում առաքման պահին։',
}

const values = [
  {
    icon: Leaf,
    title: 'Թարմություն ամեն օր',
    text: 'Ապրանքները ստանում ենք ուղիղ տեղական ֆերմերներից ու արտադրողներից՝ ամեն առավոտ։',
  },
  {
    icon: Truck,
    title: 'Արագ առաքում',
    text: 'Առաքում նույն օրը՝ Երևանի ողջ տարածքում, ձեր պատվերը պահպանելով թարմ։',
  },
  {
    icon: CreditCard,
    title: 'Վճարում առաքման պահին',
    text: 'Վճարեք կանխիկ կամ քարտով միայն այն ժամանակ, երբ ստանաք ձեր պատվերը։',
  },
  {
    icon: ShieldCheck,
    title: 'Որակի երաշխիք',
    text: 'Եթե ապրանքը ձեզ չի բավարարում, մենք կփոխարինենք կամ կվերադարձնենք գումարը։',
  },
]

const stats = [
  { value: '8', label: 'Ապրանքային կատեգորիա' },
  { value: '500+', label: 'Ապրանքատեսակ' },
  { value: '10K+', label: 'Գոհ հաճախորդ' },
  { value: '24/7', label: 'Օնլայն պատվեր' },
]

export default function AboutPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="bg-sidebar">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Մեր մասին
            </span>
            <h1 className="text-balance text-3xl font-extrabold tracking-tight md:text-4xl " style={{color:'#fff'}}>
              Թարմ մթերք ձեր դռան մոտ՝ ՌԵԴ սուպերմարկետից
            </h1>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              ՌԵԴ-ը ժամանակակից օնլայն սուպերմարկետ է Երևանում։ Մենք ստեղծել ենք
              պարզ ու հարմար ձև՝ ամենօրյա ապրանքները պատվիրելու համար՝ առանց
              հերթերի և ժամանակի կորստի։ Մեր նպատակն է բերել թարմությունն ու
              որակը անմիջապես ձեր խոհանոց։
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Button render={<Link href="/products" />}>Դիտել ապրանքները</Button>
              <Button variant="outline" render={<Link href="/contact" />}>
                Կապ մեզ հետ
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border">
            <Image
              src="/hero-grocery.png"
              alt="Red սուպերմարկետի թարմ մթերք"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold text-primary md:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            Ինչու՞ ընտրել մեզ
          </h2>
          <p className="mt-2 text-muted-foreground">
            Մենք հոգ ենք տանում ամեն մանրուքի մասին՝ ապրանքի ընտրությունից մինչև առաքում։
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="flex flex-col gap-3 rounded-2xl border bg-card p-6">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <v.icon className="size-6" />
              </div>
              <h3 className="font-bold">{v.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Store info */}
      <section className="bg-muted/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-extrabold tracking-tight">Այցելեք մեր խանութ</h2>
            <p className="leading-relaxed text-muted-foreground">
              Մեր ֆիզիկական խանութը բաց է ամեն օր։ Կարող եք գալ ինքնուրույն ընտրելու
              համար կամ պատվիրել առցանց՝ առաքմամբ։
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>{STORE.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-5 shrink-0 text-primary" />
                <span>{STORE.hours}</span>
              </li>
              <li className="flex items-center gap-3">
                <Truck className="size-5 shrink-0 text-primary" />
                <span>Անվճար առաքում 10,000 ֏-ից բարձր պատվերների դեպքում</span>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center rounded-2xl border bg-card p-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/logo.png"
                alt="Red սուպերմարկետ"
                width={72}
                height={72}
                className="size-18 rounded-xl object-contain"
              />
              <p className="text-2xl font-extrabold text-primary">Red</p>
              <p className="text-sm text-muted-foreground">
                Ձեր թաղամասի թվային սուպերմարկետը
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
