import { supabase } from "./supabase"



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







// ===============================
// Supabase -> Order converter
// ===============================

function mapOrder(data:any):Order {

  return {

    id:data.id,

    createdAt:data.created_at,

    status:data.status,


    customer:{

      name:data.name,

      phone:data.phone,

      address:data.address,

      notes:data.notes || "",

    },


    payment:data.payment,


    items:data.items || [],


    subtotal:Number(data.subtotal),

    deliveryFee:Number(data.delivery_fee),

    total:Number(data.total),

  }

}








// ===============================
// Ավելացնել պատվեր
// ===============================

export async function addOrder(
  order:Order
){


  const {error}=await supabase

    .from("orders")

    .insert({

      id:order.id,

      created_at:order.createdAt,

      status:order.status,


      name:order.customer.name,

      phone:order.customer.phone,

      address:order.customer.address,


      payment:order.payment,


      items:order.items,


      subtotal:order.subtotal,

      delivery_fee:order.deliveryFee,

      total:order.total,


      notes:order.customer.notes || null,

    })



  if(error){

    console.error(
      "ADD ORDER ERROR:",
      error
    )

    throw error

  }


}









// ===============================
// Ստանալ մեկ պատվեր
// ===============================

export async function getOrder(
  id:string
):Promise<Order|null>{


  const cleanId=id.trim()


  const {data,error}=await supabase

    .from("orders")

    .select("*")

    .eq(
      "id",
      cleanId
    )

    .maybeSingle()



  if(error){

    console.error(
      "GET ORDER ERROR:",
      error
    )

    return null

  }



  if(!data){

    return null

  }



  return mapOrder(data)

}









// ===============================
// Բոլոր պատվերները
// ===============================

export async function getOrders():Promise<Order[]>{


  const {data,error}=await supabase

    .from("orders")

    .select("*")

    .order(
      "created_at",
      {
        ascending:false
      }
    )



  if(error){

    console.error(
      "GET ORDERS ERROR:",
      error
    )

    return []

  }



  return data.map(mapOrder)

}









// ===============================
// Փոխել պատվերի status
// ===============================

export async function updateOrderStatus(

  id:string,

  status:OrderStatus

){



  const {data,error}=await supabase

    .from("orders")

    .update({

      status:status

    })

    .eq(
      "id",
      id
    )

    .select()





  console.log(
    "UPDATE STATUS DATA:",
    data
  )


  console.log(
    "UPDATE STATUS ERROR:",
    error
  )





  if(error){

    throw error

  }





  if(!data || data.length===0){

    throw new Error(
      "Order status not updated"
    )

  }



  return data[0]

}









// ===============================
// Ստեղծել պատվերի ID
// ===============================

export function generateOrderId(){


  const number=Math.floor(

    100000 +

    Math.random()*900000

  )


  return `2021-${number}`

}