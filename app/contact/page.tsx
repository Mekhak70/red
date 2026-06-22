import type { Metadata } from 'next'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { SiteShell } from '@/components/site-shell'
import { ContactForm } from '@/components/contact-form'
import { STORE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Կապ',
  description:
    'Կապվեք Red սուպերմարկետի հետ։ Հեռախոս, էլ. փոստ, WhatsApp և հասցե Երևանում։',
}

const contactCards = [
  {
    icon: Phone,
    title: 'Զանգահարեք',
    value: STORE.phone,
    href: `tel:${STORE.phoneRaw}`,
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: STORE.phone,
    href: `https://wa.me/${STORE.whatsapp}`,
  },
  {
    icon: Mail,
    title: 'Էլ. փոստ',
    value: STORE.email,
    href: `mailto:${STORE.email}`,
  },
]

export default function ContactPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            Կապ մեզ հետ
          </h1>
          <p className="mt-1 text-pretty text-muted-foreground">
            Հարցե՞ր ունեք պատվերի, առաքման կամ ապրանքների վերաբերյալ։ Գրեք կամ
            զանգահարեք մեզ — մենք ուրախ կլինենք օգնել։
          </p>
        </div>

        {/* Quick contact cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {contactCards.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-3 rounded-2xl border bg-card p-5 transition-colors hover:border-primary"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <c.icon className="size-6" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">{c.title}</p>
                <p className="truncate font-semibold">{c.value}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 text-lg font-bold">Ուղարկեք հաղորդագրություն</h2>
            <ContactForm />
          </div>

          {/* Store details + map */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border bg-card p-6">
              <h2 className="mb-4 text-lg font-bold">Մեր խանութը</h2>
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
                  <Phone className="size-5 shrink-0 text-primary" />
                  <a href={`tel:${STORE.phoneRaw}`} className="hover:text-primary">
                    {STORE.phone}
                  </a>
                </li>
              </ul>
            </div>
            <div className="overflow-hidden rounded-2xl border">
              <iframe
                title="Red սուպերմարկետի քարտեզ"
                src="https://www.openstreetmap.org/export/embed.html?bbox=44.50%2C40.17%2C44.55%2C40.20&layer=mapnik"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  )
}
