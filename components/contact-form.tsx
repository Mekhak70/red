'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    // Simulate sending the message
    setTimeout(() => {
      setSubmitting(false)
      ;(e.target as HTMLFormElement).reset()
      toast.success('Ձեր հաղորդագրությունն ուղարկված է', {
        description: 'Մենք կկապվենք ձեզ հետ հնարավորինս շուտ։',
      })
    }, 700)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Անուն</Label>
          <Input id="name" name="name" required placeholder="Ձեր անունը" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">Հեռախոս</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="+374 ..."
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Էլ. փոստ</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">Հաղորդագրություն</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Ինչպե՞ս կարող ենք օգնել ձեզ։"
        />
      </div>
      <Button type="submit" disabled={submitting} className="w-fit">
        <Send className="size-4" />
        {submitting ? 'Ուղարկվում է...' : 'Ուղարկել հաղորդագրությունը'}
      </Button>
    </form>
  )
}
