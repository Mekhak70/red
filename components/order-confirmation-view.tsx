'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Package, Phone } from 'lucide-react'

import { SiteShell } from '@/components/site-shell'
import { OrderTimeline } from '@/components/order-timeline'

import { getOrder, type Order } from '@/lib/orders'
import { formatAMD, STORE } from '@/lib/data'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'


export function OrderConfirmationView({
  orderId
}: {
  orderId: string
}) {


  const [order, setOrder] = useState<Order | null | undefined>(undefined)



  useEffect(() => {


    async function loadOrder() {


      try {

        const currentOrder = await getOrder(orderId)


        setOrder(
          currentOrder ?? null
        )


      } catch(error) {


        console.error(
          "Order loading error:",
          error
        )


        setOrder(null)


      }


    }


    loadOrder()



  }, [orderId])





  if (order === undefined) {


    return (

      <SiteShell>

        <div className="mx-auto max-w-3xl px-4 py-20 text-center text-muted-foreground">

          Բեռնվում է...

        </div>

      </SiteShell>

    )

  }





  if (order === null) {


    return (

      <SiteShell>

        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-20 text-center">


          <h1 className="text-2xl font-extrabold">

            Պատվերը չի գտնվել

          </h1>



          <p className="text-muted-foreground">

            Հնարավոր է պատվերը գոյություն չունի։

          </p>



          <Button render={<Link href="/products" />}>

            Դեպի ապրանքներ

          </Button>


        </div>


      </SiteShell>

    )

  }







  return (

    <SiteShell>


      <div className="mx-auto max-w-3xl px-4 py-8">



        <div className="flex flex-col items-center gap-3 rounded-2xl border bg-card p-8 text-center">


          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">


            <CheckCircle2 className="size-9" />


          </div>




          <h1 className="text-2xl font-extrabold tracking-tight">

            Շնորհակալություն պատվերի համար

          </h1>



          <p className="text-muted-foreground">

            Ձեր պատվերն ընդունված է։ Մենք շուտով կզանգահարենք հաստատման համար։

          </p>




          <div className="mt-2 rounded-lg bg-muted px-4 py-2">


            <span className="text-sm text-muted-foreground">

              Պատվերի համար՝

            </span>


            <span className="ml-1 font-bold text-primary">

              {order.id}

            </span>


          </div>



        </div>






        <div className="mt-6 grid gap-6 md:grid-cols-2">



          <div className="rounded-xl border bg-card p-5">


            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">


              <Package className="size-5 text-primary" />


              Պատվերի կարգավիճակ


            </h2>



            <OrderTimeline status={order.status}/>


          </div>








          <div className="flex flex-col gap-6">



            <div className="rounded-xl border bg-card p-5">


              <h2 className="mb-3 text-lg font-bold">

                Առաքման տվյալներ

              </h2>



              <dl className="flex flex-col gap-2 text-sm">


                <div className="flex justify-between">

                  <dt className="text-muted-foreground">

                    Անուն

                  </dt>


                  <dd className="font-medium">

                    {order.customer.name}

                  </dd>


                </div>




                <div className="flex justify-between">


                  <dt className="text-muted-foreground">

                    Հեռախոս

                  </dt>


                  <dd className="font-medium">

                    {order.customer.phone}

                  </dd>


                </div>





                <div className="flex justify-between">


                  <dt className="text-muted-foreground">

                    Հասցե

                  </dt>


                  <dd className="font-medium">

                    {order.customer.address}

                  </dd>


                </div>





                <div className="flex justify-between">


                  <dt className="text-muted-foreground">

                    Վճարում

                  </dt>


                  <dd className="font-medium">

                    {
                      order.payment === 'cash'
                      ? 'Կանխիկ'
                      : 'Քարտով'
                    }
                    {' '}առաքման պահին

                  </dd>


                </div>



              </dl>


            </div>








            <div className="rounded-xl border bg-card p-5">


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

                          sizes="48px"

                          className="rounded-md object-cover"

                        />


                      </div>



                      <div className="flex-1">


                        <p className="text-sm font-medium">

                          {item.name}

                        </p>


                        <p className="text-xs text-muted-foreground">

                          {item.quantity} հատ

                        </p>


                      </div>




                      <span className="text-sm font-bold">

                        {formatAMD(
                          item.price * item.quantity
                        )}

                      </span>



                    </li>


                  ))
                }


              </ul>



              <Separator className="my-4"/>




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



        </div>






        <div className="mt-6 flex items-center gap-2 rounded-xl bg-muted/50 p-5 text-sm">


          <Phone className="size-4 text-primary"/>


          Հարցե՞ր ունեք պատվերի վերաբերյալ։ Զանգահարեք՝ {STORE.phone}



        </div>




      </div>



    </SiteShell>

  )

}