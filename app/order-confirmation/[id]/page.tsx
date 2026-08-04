import { use } from 'react'
import { OrderConfirmationView } from '@/components/order-confirmation-view'

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  console.log("PAGE ORDER ID:", id)

  return <OrderConfirmationView orderId={id} />
}
