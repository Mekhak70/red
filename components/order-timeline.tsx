import { Check } from 'lucide-react'
import { STATUS_FLOW, STATUS_LABELS, type OrderStatus } from '@/lib/orders'
import { cn } from '@/lib/utils'

export function OrderTimeline({ status }: { status: OrderStatus }) {
  if (status === 'cancelled') {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm font-medium text-destructive">
        Այս պատվերը չեղարկվել է։
      </div>
    )
  }

  const currentIndex = STATUS_FLOW.indexOf(status)

  return (
    <ol className="flex flex-col gap-0">
      {STATUS_FLOW.map((s, i) => {
        const done = i <= currentIndex
        const active = i === currentIndex
        const isLast = i === STATUS_FLOW.length - 1
        return (
          <li key={s} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                  done
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground',
                )}
              >
                {done ? <Check className="size-4" /> : <span className="size-2 rounded-full bg-current" />}
              </span>
              {!isLast && (
                <span className={cn('w-0.5 flex-1 min-h-8', i < currentIndex ? 'bg-primary' : 'bg-border')} />
              )}
            </div>
            <div className={cn('pb-6', isLast && 'pb-0')}>
              <p className={cn('font-semibold', active ? 'text-primary' : done ? 'text-foreground' : 'text-muted-foreground')}>
                {STATUS_LABELS[s]}
              </p>
              {active && (
                <p className="text-sm text-muted-foreground">Ընթացիկ կարգավիճակ</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
