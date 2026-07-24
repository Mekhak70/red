'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, Phone, Search } from 'lucide-react'
import { useState } from 'react'
import { CartDrawer } from '@/components/cart-drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { STORE } from '@/lib/data'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Գլխավոր' },
  { href: '/products', label: 'Ապրանքներ' },
  { href: '/categories', label: 'Կատեգորիաներ' },
  // { href: '/order-tracking', label: 'Հետևել պատվերին' },
  { href: '/about', label: 'Մեր մասին' },
  { href: '/contact', label: 'Կապ' },
]

function SearchBar({ className }: { className?: string }) {
  const router = useRouter()
  const [q, setQ] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    router.push(`/products?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <form onSubmit={submit} className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Որոնել ապրանքներ..."
        className="pl-9"
        aria-label="Որոնում"
      />
    </form>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      {/* Top bar */}
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs">
          <span>{STORE.address}</span>
          <div className="flex items-center gap-4">
            <span>{STORE.hours}</span>
            <a href={`tel:${STORE.phoneRaw}`} className="flex items-center gap-1 font-medium">
              <Phone className="size-3.5" />
              {STORE.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Մենյու" />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-2">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted',
                    pathname === l.href && 'bg-primary/10 text-primary',
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Logo />

        <SearchBar className="hidden flex-1 md:block" />

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex"
            render={<a href={`tel:${STORE.phoneRaw}`} aria-label="Զանգահարել" />}
          >
            <Phone className="size-5" />
          </Button>
          <CartDrawer />
        </div>
      </div>

      {/* Mobile search */}
      <div className="px-4 pb-3 md:hidden">
        <SearchBar />
      </div>

      {/* Desktop nav */}
      <nav className="hidden border-t md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'border-b-2 border-transparent px-3 py-2.5 text-sm font-medium transition-colors hover:text-primary',
                pathname === l.href && 'border-primary text-primary',
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src="/logo.png" alt="Red սուպերմարկետ" width={40} height={40} className="size-10 rounded-lg object-contain" />
      <div className="flex flex-col leading-none">
        <span className="text-lg font-extrabold tracking-tight text-primary">Red</span>
        <span className="text-[10px] font-medium text-muted-foreground">ՍՈՒՊԵՐՄԱՐԿԵՏ</span>
      </div>
    </Link>
  )
}
