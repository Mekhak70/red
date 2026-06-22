import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { SiteShell } from '@/components/site-shell'
import { categories, products } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Կատեգորիաներ',
  description: 'Դիտեք մեր բոլոր ապրանքային կատեգորիաները՝ մրգեր, բանջարեղեն, կաթնամթերք և ավելին։',
}

export default function CategoriesPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
          Կատեգորիաներ
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ընտրեք կատեգորիան և գտեք ձեզ անհրաժեշտ ապրանքները
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => {
            const count = products.filter((p) => p.categoryId === c.id).length
            return (
              <Link
                key={c.id}
                href={`/categories/${c.slug}`}
                className="group relative overflow-hidden rounded-2xl border bg-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={c.image || '/placeholder.svg'}
                    alt={c.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h2 className="text-lg font-bold">{c.name}</h2>
                    <p className="text-sm text-white/80">{count} ապրանք</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </SiteShell>
  )
}
