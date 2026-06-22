'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { categories, products as allProducts } from '@/lib/data'
import { cn } from '@/lib/utils'

type SortKey = 'popular' | 'price-asc' | 'price-desc' | 'new' | 'sale'

export function ProductsBrowser({ initialCategory }: { initialCategory?: string }) {
  const searchParams = useSearchParams()
  const q = searchParams.get('q')?.toLowerCase() ?? ''
  const sortParam = (searchParams.get('sort') as SortKey) || 'popular'

  const [activeCat, setActiveCat] = useState<string | null>(initialCategory ?? null)
  const [sort, setSort] = useState<SortKey>(sortParam)
  const [onlyInStock, setOnlyInStock] = useState(false)

  const filtered = useMemo(() => {
    let list = [...allProducts]
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      )
    }
    if (activeCat) list = list.filter((p) => p.categoryId === activeCat)
    if (onlyInStock) list = list.filter((p) => p.inStock)

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'new':
        list = list.filter((p) => p.badges.includes('new')).concat(
          list.filter((p) => !p.badges.includes('new')),
        )
        break
      case 'sale':
        list.sort((a, b) => Number(b.badges.includes('sale')) - Number(a.badges.includes('sale')))
        break
      default:
        list.sort((a, b) => b.rating - a.rating)
    }
    return list
  }, [q, activeCat, onlyInStock, sort])

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-5">
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
          {q ? `Որոնման արդյունքներ՝ «${q}»` : 'Բոլոր ապրանքները'}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {filtered.length} ապրանք
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar filters */}
        <aside className="lg:w-56 lg:shrink-0">
          <div className="flex items-center gap-2 lg:mb-3">
            <SlidersHorizontal className="size-4 text-muted-foreground" />
            <span className="text-sm font-bold">Կատեգորիաներ</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 lg:mt-0 lg:flex-col lg:gap-1">
            <button
              onClick={() => setActiveCat(null)}
              className={cn(
                'rounded-md px-3 py-2 text-left text-sm font-medium transition-colors',
                !activeCat ? 'bg-primary/10 text-primary' : 'hover:bg-muted',
              )}
            >
              Բոլորը
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={cn(
                  'rounded-md px-3 py-2 text-left text-sm font-medium transition-colors',
                  activeCat === c.id ? 'bg-primary/10 text-primary' : 'hover:bg-muted',
                )}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="mt-4 border-t pt-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="size-4 accent-[var(--primary)]"
              />
              Միայն առկա ապրանքները
            </label>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {activeCat && (
                <Badge variant="secondary" className="gap-1">
                  {categories.find((c) => c.id === activeCat)?.name}
                  <button onClick={() => setActiveCat(null)} aria-label="Հեռացնել ֆիլտրը">
                    <X className="size-3" />
                  </button>
                </Badge>
              )}
            </div>
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger className="w-44" aria-label="Դասավորել">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Ըստ հանրաճանաչության</SelectItem>
                <SelectItem value="price-asc">Գին՝ աճման կարգով</SelectItem>
                <SelectItem value="price-desc">Գին՝ նվազման կարգով</SelectItem>
                <SelectItem value="new">Նոր ապրանքներ</SelectItem>
                <SelectItem value="sale">Զեղչված</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-16 text-center">
              <p className="text-muted-foreground">Ապրանքներ չեն գտնվել</p>
              <Button variant="outline" onClick={() => setActiveCat(null)}>
                Մաքրել ֆիլտրերը
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
