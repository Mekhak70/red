'use client'

import { MessageCircle, Phone } from 'lucide-react'
import { STORE } from '@/lib/data'

export function QuickContact() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
      <a
        href={`https://wa.me/${STORE.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <MessageCircle className="size-6" />
      </a>
      <a
        href={`tel:${STORE.phoneRaw}`}
        aria-label="Զանգահարել"
        className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        <Phone className="size-6" />
      </a>
    </div>
  )
}
