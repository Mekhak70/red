import { use } from 'react'
import { OrderConfirmationView } from '@/components/order-confirmation-view'

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  return <OrderConfirmationView orderId={id} />
}
