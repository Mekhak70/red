'use client'

import Link from 'next/link'
import {
  Truck,
  MapPin,
  Clock,
  CreditCard,
  ShieldCheck,
  PackageCheck,
  Phone,
  Sparkles,
  ArrowRight
} from 'lucide-react'


const deliveryFeatures = [
  {
    icon: MapPin,
    title: 'Առաքման տարածք',
    text: 'Առաքում ենք Երևանում և հարակից տարածքներում'
  },
  {
    icon: Clock,
    title: 'Արագ առաքում',
    text: 'Պատվերները պատրաստվում և ուղարկվում են արագ'
  },
  {
    icon: CreditCard,
    title: 'Վճարման տարբերակներ',
    text: 'Կանխիկ և առցանց վճարման հնարավորություն'
  },
  {
    icon: ShieldCheck,
    title: 'Անվտանգություն',
    text: 'Ապրանքները տեղափոխվում են ապահով փաթեթավորմամբ'
  },
  {
    icon: PackageCheck,
    title: 'Որակի երաշխիք',
    text: 'Ստանում եք պատվերը ճիշտ վիճակում'
  },
  {
    icon: Truck,
    title: 'Ամենօրյա առաքում',
    text: 'Աշխատում ենք ամեն օր'
  }
]


export default function DeliveryPage() {

  return (
    <main className="min-h-screen bg-background overflow-hidden">


      <section className="relative py-24 px-4">


        <div
          className="
          absolute inset-0
          bg-gradient-to-br
          from-rose-500/20
          via-background
          to-amber-400/20
          "
        />


        <div
          className="
          absolute
          top-20
          left-10
          w-72
          h-72
          rounded-full
          bg-rose-500/20
          blur-3xl
          "
        />


        <div
          className="
          relative
          max-w-6xl
          mx-auto
          text-center
          "
        >


          <div
            className="
            inline-flex
            items-center
            gap-2
            px-5
            py-2
            rounded-full
            bg-card/50
            backdrop-blur-xl
            border
            border-border/40
            mb-8
            "
          >

            <Sparkles className="w-4 h-4 text-amber-400"/>

            Արագ և անվտանգ առաքում

          </div>



          <h1
            className="
            text-4xl
            md:text-6xl
            font-black
            mb-6
            "
          >

            🚚 Առաքման

            <span
              className="
              bg-gradient-to-r
              from-rose-500
              to-amber-400
              bg-clip-text
              text-transparent
              "
            >
              {' '}պայմաններ
            </span>

          </h1>



          <p
            className="
            max-w-2xl
            mx-auto
            text-muted-foreground
            text-lg
            mb-10
            "
          >
            Մենք հոգ ենք տանում, որպեսզի ձեր պատվերը հասնի
            արագ և անվտանգ։
          </p>



          <div
            className="
            flex
            flex-col
            sm:flex-row
            justify-center
            gap-4
            "
          >


            <Link
              href="/products"
              className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-8
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-rose-500
              to-pink-500
              text-white
              font-bold
              hover:scale-105
              transition
              "
            >

              Պատվիրել հիմա

              <ArrowRight className="w-5 h-5"/>

            </Link>



            <Link
              href="tel:+37400000000"
              className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-8
              py-4
              rounded-2xl
              bg-card/50
              backdrop-blur-xl
              border
              border-border/40
              font-bold
              "
            >

              <Phone className="w-5 h-5"/>

              Կապ մեզ հետ

            </Link>


          </div>


        </div>


      </section>



      <section className="px-4 py-20">

        <div className="max-w-6xl mx-auto">


          <div
            className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
            "
          >


            {deliveryFeatures.map((item,index)=>{

              const Icon = item.icon


              return (

                <div
                  key={index}
                  className="
                  rounded-3xl
                  bg-card/50
                  backdrop-blur-xl
                  border
                  border-border/40
                  p-7
                  hover:-translate-y-2
                  hover:shadow-xl
                  transition
                  "
                >


                  <div
                    className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-gradient-to-br
                    from-rose-500/20
                    to-amber-400/20
                    flex
                    items-center
                    justify-center
                    mb-5
                    "
                  >

                    <Icon className="w-7 h-7 text-rose-500"/>

                  </div>


                  <h3 className="text-xl font-bold mb-2">
                    {item.title}
                  </h3>


                  <p className="text-muted-foreground">
                    {item.text}
                  </p>


                </div>

              )

            })}


          </div>


        </div>


      </section>


    </main>
  )
}