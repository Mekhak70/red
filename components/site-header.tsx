'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, Phone, Search } from 'lucide-react'
import { useState } from 'react'

import { CartDrawer } from '@/components/cart-drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { STORE } from '@/lib/data'
import { cn } from '@/lib/utils'


const navLinks = [
  { href: '/', label: 'Գլխավոր' },
  { href: '/products', label: 'Ապրանքներ' },
  { href: '/categories', label: 'Կատեգորիաներ' },
  { href: '/about', label: 'Մեր մասին' },
  { href: '/contact', label: 'Կապ' },
]



function SearchBar({
  className
}: {
  className?: string
}) {

  const router = useRouter()

  const [q, setQ] = useState('')


  function submit(e: React.FormEvent) {

    e.preventDefault()

    const value = q.trim()


    if (!value) {

      router.push('/products')

      return
    }


    router.push(
      `/products?q=${encodeURIComponent(value)}`
    )

  }



  return (

    <form
      onSubmit={submit}
      className={cn(
        'relative',
        className
      )}
    >

      <Search
        className="
        absolute
        left-3
        top-1/2
        size-4
        -translate-y-1/2
        text-muted-foreground
        "
      />


      <Input

        value={q}

        onChange={(e) =>
          setQ(e.target.value)
        }

        placeholder="Որոնել ապրանքներ..."

        className="
        pl-9
        "

      />

    </form>

  )
}





export function SiteHeader() {

  const pathname = usePathname()

  const [
    mobileOpen,
    setMobileOpen
  ] = useState(false)



  return (

    <header className="sticky
                      top-0
                      z-50
                      border-b
                      bg-card/95
                      backdrop-blur
                      ">
      {/* TOP */}

      <div className="hidden
bg-primary
text-primary-foreground
md:block
">


        <div className="mx-auto
flex
max-w-7xl
items-center
justify-between
px-4
py-1.5
text-xs
">


          <span>
            {STORE.address}
          </span>


          <div className="
flex
items-center
gap-4
">

            <span>
              {STORE.hours}
            </span>


            <a
              href={`tel:${STORE.phoneRaw}`}
              className="flex items-center gap-1 font-medium"
            >

              <Phone className="size-3.5" />

              {STORE.phone}

            </a>

          </div>

        </div>

      </div>




      <div className="
                        mx-auto
                        flex
                        max-w-7xl
                        items-center
                        gap-3
                        px-4
                        py-3
                        ">


        {/* MOBILE MENU */}

        <Sheet
          open={mobileOpen}
          onOpenChange={setMobileOpen}
        >


          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              />
            }
          >

            <Menu className="size-5" />

          </SheetTrigger>

          <SheetContent side="left" className="w-72">


            <SheetHeader>

              <SheetTitle>

                <Logo />

              </SheetTitle>

            </SheetHeader>



            <nav className="
flex
flex-col
gap-1
px-2
">


              {
                navLinks.map(item => (

                  <Link

                    key={item.href}

                    href={item.href}

                    onClick={() =>
                      setMobileOpen(false)
                    }

                    className={cn(
                      `
rounded-md
px-3
py-2.5
text-sm
font-medium
transition-colors
hover:bg-muted
`,
                      pathname === item.href &&
                      'bg-primary/10 text-primary'
                    )}

                  >

                    {item.label}

                  </Link>


                ))
              }



            </nav>


          </SheetContent>


        </Sheet>





        <Logo />





        <SearchBar
          className="
hidden
flex-1
md:block
"
        />






        <div className="
ml-auto
flex
items-center
gap-1
">


          <Button

            variant="ghost"

            size="icon"

            className="hidden md:inline-flex"

            render={
              <a
                href={`tel:${STORE.phoneRaw}`}
              />
            }

          >

            <Phone className="size-5" />

          </Button>


          <CartDrawer />


        </div>




      </div>





      {/* MOBILE SEARCH */}

      <div className="
px-4
pb-3
md:hidden
">

        <SearchBar />

      </div>
      <nav className="hidden
border-t
md:block
">

        <div className="
                        mx-auto
                        flex
                        max-w-7xl
                        items-center
                        gap-1
                        px-4
                        ">


          {
            navLinks.map(item => (

              <Link
                key={item.href}
                href={item.href}
                className={cn(            `
                  border-b-2
                  border-transparent
                  px-3
                  py-2.5
                  text-sm
                  font-medium
                  transition-colors
                  hover:text-primary
                  `,
                  pathname === item.href &&
                  'border-primary text-primary'
                )}
              >
                {item.label}
              </Link>


            ))
          }



        </div>

      </nav>



    </header>

  )

}






function Logo() {

  return (

    <Link
      href="/"
      className="
flex
items-center
gap-2
"
    >

      <Image

        src="/logo.png"

        alt="Red սուպերմարկետ"

        width={40}

        height={40}

        className="
size-10
rounded-lg
object-contain
"

      />


      <div className="
flex
flex-col
leading-none
">

        <span className="
text-lg
font-extrabold
text-primary
">

          Red

        </span>


        <span className="
text-[10px]
font-medium
text-muted-foreground
">

          ՍՈՒՊԵՐՄԱՐԿԵՏ

        </span>


      </div>


    </Link>

  )

}