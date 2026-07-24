import Image from 'next/image'
import Link from 'next/link'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { STORE, categories } from '@/lib/data'

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-sidebar text-sidebar-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Red սուպերմարկետ" width={44} height={44} className="size-11 rounded-lg object-contain" />
            <div className="flex flex-col leading-none">
              <span className="text-xl font-extrabold text-primary">Red</span>
              <span className="text-[10px] font-medium text-sidebar-foreground/60">ՍՈՒՊԵՐՄԱՐԿԵՏ</span>
            </div>
          </Link>
          <p className="text-sm text-sidebar-foreground/70 leading-relaxed">
            Ձեր վստահելի օնլայն սուպերմարկետը՝ թարմ մթերքով և արագ առաքմամբ Երևանում։
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">Կատեգորիաներ</h3>
          <ul className="flex flex-col gap-2 text-sm text-sidebar-foreground/70">
            {categories.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link href={`/categories/${c.slug}`} className="hover:text-primary">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">Տեղեկություն</h3>
          <ul className="flex flex-col gap-2 text-sm text-sidebar-foreground/70">
            <li><Link href="/about" className="hover:text-primary">Մեր մասին</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Կապ</Link></li>
            {/* <li><Link href="/order-tracking" className="hover:text-primary">Հետևել պատվերին</Link></li> */}
            <li><Link href="/products" className="hover:text-primary">Բոլոր ապրանքները</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">Կապ</h3>
          <ul className="flex flex-col gap-3 text-sm text-sidebar-foreground/70">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{STORE.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-primary" />
              <a href={`tel:${STORE.phoneRaw}`} className="hover:text-primary">{STORE.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-primary" />
              <a href={`mailto:${STORE.email}`} className="hover:text-primary">{STORE.email}</a>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="size-4 shrink-0 text-primary" />
              <span>{STORE.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sidebar-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-sidebar-foreground/60 sm:flex-row">
          <span>© {new Date().getFullYear()} Red Սուպերմարկետ։ Բոլոր իրավունքները պաշտպանված են։</span>
          <span>Վճարում առաքման պահին · Անվճար առաքում 10,000 ֏-ից</span>
        </div>
      </div>
    </footer>
  )
}
