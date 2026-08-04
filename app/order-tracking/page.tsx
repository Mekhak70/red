'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Package, Search } from 'lucide-react'

import { SiteShell } from '@/components/site-shell'
import { OrderTimeline } from '@/components/order-timeline'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import {
  getOrder,
  getOrders,
  STATUS_LABELS,
  type Order,
} from '@/lib/orders'

import { formatAMD } from '@/lib/data'



export default function OrderTrackingPage() {


  const [query, setQuery] = useState('')

  const [order, setOrder] = useState<Order | null | undefined>(
    undefined
  )

  const [recent, setRecent] = useState<Order[]>([])





  useEffect(() => {


    async function loadOrders() {


      const orders = await getOrders()


      setRecent(orders)


    }


    loadOrders()


  }, [])







  async function handleSearch(
    e: React.FormEvent
  ) {

    e.preventDefault()


    const id = query.trim()


    if (!id) return



    const foundOrder = await getOrder(id)



    setOrder(
      foundOrder ?? null
    )


  }







  return (

    <SiteShell>


      <div className="mx-auto max-w-3xl px-4 py-8">



        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">

          Հետևել պատվերին

        </h1>



        <p className="mt-1 text-muted-foreground">

          Մուտքագրեք պատվերի համարը՝ կարգավիճակը ստուգելու համար։

        </p>






        <form
          onSubmit={handleSearch}
          className="mt-6 flex flex-col gap-3 rounded-2xl border bg-card p-5 sm:flex-row sm:items-end"
        >



          <div className="flex flex-1 flex-col gap-1.5">


            <Label htmlFor="orderId">

              Պատվերի համար

            </Label>



            <Input

              id="orderId"

              value={query}

              onChange={(e)=>
                setQuery(e.target.value)
              }

              placeholder="2021-123456"

            />


          </div>




          <Button type="submit">


            <Search className="size-4"/>


            Ստուգել


          </Button>



        </form>









        {
          order === undefined &&
          recent.length > 0 && (


            <div className="mt-6">


              <h2 className="mb-3 text-sm font-semibold text-muted-foreground">

                Վերջին պատվերները

              </h2>




              <ul className="flex flex-col gap-2">


                {
                  recent
                  .slice(0,5)
                  .map((o)=>(


                    <li key={o.id}>


                      <button

                        type="button"

                        onClick={async()=>{


                          setQuery(o.id)


                          const result =
                            await getOrder(o.id)


                          setOrder(
                            result ?? null
                          )


                        }}

                        className="flex w-full items-center justify-between rounded-xl border bg-card px-4 py-3 hover:border-primary"

                      >


                        <span className="font-semibold text-primary">

                          {o.id}

                        </span>



                        <span className="text-sm text-muted-foreground">

                          {STATUS_LABELS[o.status]}

                        </span>



                      </button>


                    </li>


                  ))
                }


              </ul>


            </div>


          )
        }









        {
          order === null && (

            <div className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center">


              <p className="font-semibold text-destructive">

                Պատվերը չի գտնվել

              </p>


              <p className="mt-1 text-sm text-muted-foreground">

                Ստուգեք պատվերի համարը։

              </p>


            </div>


          )
        }









        {
          order && (


            <div className="mt-6 grid gap-6 md:grid-cols-2">



              <div className="rounded-2xl border bg-card p-5">


                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">


                  <Package className="size-5 text-primary"/>


                  Կարգավիճակ


                </h2>



                <p className="mb-4 text-sm text-muted-foreground">

                  Պատվեր՝

                  <span className="ml-1 font-bold text-primary">

                    {order.id}

                  </span>


                </p>



                <OrderTimeline
                  status={order.status}
                />


              </div>







              <div className="rounded-2xl border bg-card p-5">


                <h2 className="mb-3 text-lg font-bold">

                  Ապրանքներ

                </h2>



                <ul className="flex flex-col gap-3">


                  {
                    order.items.map((item)=>(


                      <li
                        key={item.id}
                        className="flex items-center gap-3"
                      >


                        <div className="relative size-12">


                          <Image

                            src={
                              item.image ||
                              '/placeholder.svg'
                            }

                            alt={item.name}

                            fill

                            className="rounded-md object-cover"

                          />


                        </div>



                        <span className="flex-1 text-sm">

                          {item.name}

                        </span>



                        <span className="text-sm font-bold">

                          {
                            formatAMD(
                              item.price *
                              item.quantity
                            )
                          }

                        </span>



                      </li>


                    ))
                  }


                </ul>




                <Separator className="my-3"/>



                <div className="flex justify-between">


                  <span className="font-semibold">

                    Ընդհանուր

                  </span>



                  <span className="text-lg font-bold text-primary">

                    {formatAMD(order.total)}

                  </span>


                </div>



              </div>




            </div>


          )
        }







        {
          order === undefined &&
          recent.length === 0 && (


            <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border bg-card p-8 text-center">


              <Package className="size-10 text-muted-foreground"/>


              <p className="text-muted-foreground">

                Դեռ պատվերներ չկան։

              </p>



              <Button
                variant="outline"
                render={<Link href="/products"/>}
              >

                Սկսել գնումները

              </Button>


            </div>


          )
        }



      </div>


    </SiteShell>

  )

}