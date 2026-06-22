export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'

export type OrderItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export type Order = {
  id: string
  createdAt: string
  status: OrderStatus
  customer: {
    name: string
    phone: string
    address: string
    notes?: string
  }
  payment: 'cash' | 'card'
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  total: number
}

const KEY = 'storeRed_orders'

export const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Սպասում է',
  confirmed: 'Հաստատված',
  preparing: 'Պատրաստվում է',
  out_for_delivery: 'Առաքման ճանապարհին',
  delivered: 'Առաքված',
  cancelled: 'Չեղարկված',
}

export const STATUS_FLOW: OrderStatus[] = [
  'pending',
  'confirmed',
  'preparing',
  'out_for_delivery',
  'delivered',
]

export function getOrders(): Order[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]') as Order[]
  } catch {
    return []
  }
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem(KEY, JSON.stringify(orders))
  window.dispatchEvent(new Event('orders-updated'))
}

export function addOrder(order: Order) {
  const orders = getOrders()
  orders.unshift(order)
  saveOrders(orders)
}

export function getOrder(id: string): Order | undefined {
  return getOrders().find((o) => o.id.toLowerCase() === id.toLowerCase())
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  const orders = getOrders()
  const idx = orders.findIndex((o) => o.id === id)
  if (idx >= 0) {
    orders[idx].status = status
    saveOrders(orders)
  }
}

export function generateOrderId(): string {
  const n = Math.floor(100000 + Math.random() * 900000)
  return `2021-${n}`
}
