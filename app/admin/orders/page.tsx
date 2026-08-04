'use client'

import { useEffect, useState } from 'react'
import { getOrders, updateOrderStatus, STATUS_LABELS, STATUS_FLOW, type Order, type OrderStatus } from '@/lib/orders'
import { formatAMD } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'


export default function AdminOrdersPage() {

  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)


  async function loadOrders(){

    setLoading(true)

    const data = await getOrders()

    setOrders(data)

    setLoading(false)

  }



  useEffect(()=>{

    loadOrders()

  },[])




  async function changeStatus(
    id:string,
    status:OrderStatus
  ){

    await updateOrderStatus(
      id,
      status
    )


    await loadOrders()

  }



  if(loading){

    return (
      <div className="p-10 text-center">
        Բեռնվում է...
      </div>
    )

  }



  return (

    <div className="mx-auto max-w-6xl px-4 py-8">


      <h1 className="mb-6 text-3xl font-black">
        Պատվերներ
      </h1>



      <div className="flex flex-col gap-5">


        {
          orders.map((order)=>(


            <div
              key={order.id}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >


              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">


                <div>


                  <h2 className="text-xl font-bold">
                    #{order.id}
                  </h2>


                  <p>
                    👤 {order.customer.name}
                  </p>


                  <p>
                    📞 {order.customer.phone}
                  </p>


                  <p>
                    📍 {order.customer.address}
                  </p>


                </div>



                <div className="text-right">


                  <p className="font-bold text-primary text-xl">
                    {formatAMD(order.total)}
                  </p>


                  <p className="text-sm text-gray-500">
                    {STATUS_LABELS[order.status]}
                  </p>


                </div>


              </div>




              <Separator className="my-4"/>




              <div>

                <h3 className="mb-2 font-bold">
                  Ապրանքներ
                </h3>


                {
                  order.items.map(item=>(

                    <div
                      key={item.id}
                      className="flex justify-between text-sm"
                    >

                      <span>
                        {item.name} × {item.quantity}
                      </span>


                      <span>
                        {formatAMD(
                          item.price * item.quantity
                        )}
                      </span>


                    </div>

                  ))
                }


              </div>




              <Separator className="my-4"/>



              <div className="flex flex-wrap gap-2">


                {
                  STATUS_FLOW.map(status=>(

                    <Button

                      key={status}

                      variant={
                        order.status === status
                          ? "default"
                          : "outline"
                      }


                      onClick={()=>changeStatus(
                        order.id,
                        status
                      )}

                    >

                      {STATUS_LABELS[status]}

                    </Button>

                  ))
                }


              </div>


            </div>


          ))
        }


      </div>


    </div>

  )

}