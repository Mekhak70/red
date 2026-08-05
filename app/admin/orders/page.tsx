'use client'

import { useEffect, useState } from 'react'
import {
  getOrders,
  updateOrderStatus,
  STATUS_LABELS,
  STATUS_FLOW,
  type Order,
  type OrderStatus
} from '@/lib/orders'

import { formatAMD } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'


const PAGE_SIZE = 10


export default function AdminOrdersPage() {


  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)



  async function loadOrders() {

    setLoading(true)

    const data = await getOrders()

    setOrders(data)

    setLoading(false)

  }



  useEffect(() => {

    loadOrders()

  }, [])



  async function changeStatus(
    id: string,
    status: OrderStatus
  ) {

    await updateOrderStatus(
      id,
      status
    )

    await loadOrders()

  }



  if (loading) {

    return (
      <div className="p-10 text-center">
        Բեռնվում է...
      </div>
    )

  }



  const totalPages = Math.ceil(
    orders.length / PAGE_SIZE
  )


  const currentOrders = orders.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )





  return (

    <div className="mx-auto max-w-6xl px-4 py-8">


      <h1 className="mb-6 text-3xl font-black">
        Պատվերներ
      </h1>



      <div className="flex flex-col gap-5">


        {
          currentOrders.map((order) => (


            <div
              key={order.id}
              className="
            rounded-xl
            border
            bg-white
            p-5
            shadow-sm
            "
            >



              <div className="
          flex
          flex-col
          gap-3
          md:flex-row
          md:items-center
          md:justify-between
          ">


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


                  {
                    order.createdAt && (

                      <p className="text-sm text-gray-500 mt-2">

                        📅 {
                          new Date(
                            order.createdAt
                          ).toLocaleString(
                            'hy-AM'
                          )
                        }

                      </p>

                    )
                  }


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





              <Separator className="my-4" />




              <h3 className="mb-3 font-bold">
                Ապրանքներ
              </h3>




              <div className="flex flex-col gap-3">


                {
                  order.items.map(item => (


                    <div
                      key={item.id}
                      className="
                flex
                items-center
                justify-between
                gap-3
                "
                    >



                      <div className="
              flex
              items-center
              gap-3
              ">



                        {
                          item.image && (

                            <div className="
                    relative
                    h-16
                    w-16
                    overflow-hidden
                    rounded-lg
                    border
                    ">

                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />

                            </div>

                          )
                        }



                        <div>

                          <p className="font-medium">
                            {item.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            Քանակ՝ {item.quantity}
                          </p>

                        </div>


                      </div>




                      <span className="font-semibold">

                        {formatAMD(
                          item.price * item.quantity
                        )}

                      </span>



                    </div>


                  ))
                }


              </div>





              <Separator className="my-4" />





              <div className="flex flex-wrap gap-2">


                {
                  STATUS_FLOW.map(status => (


                    <Button

                      key={status}

                      variant={
                        order.status === status
                          ? "default"
                          : "outline"
                      }


                      onClick={() => changeStatus(
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





      {
        totalPages > 1 && (

          <div className="
          mt-8
          flex
          justify-center
          gap-2
          ">


            {
              Array.from(
                {
                  length: totalPages
                }
              ).map((_, index) => (


                <Button

                  key={index}

                  variant={
                    page === index + 1
                      ? "default"
                      : "outline"
                  }


                  onClick={() => {
                    setPage(index + 1), window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                    })
                  }}

                >

                  {index + 1}

                </Button>


              ))
            }


          </div>

        )
      }




    </div>

  )

}