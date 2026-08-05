// components/products-browser.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product, formatAMD } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'


interface ProductsBrowserProps {
  initialCategory: string | null
  initialProducts: Product[]
  initialSearch?:string
}


// Armenian transliteration
const armenianMap: Record<string,string> = {
  ա:'a', բ:'b', գ:'g', դ:'d', ե:'e',
  զ:'z', է:'e', ը:'y', թ:'t', ժ:'zh',
  ի:'i', լ:'l', խ:'kh', ծ:'ts', կ:'k',
  հ:'h', ձ:'dz', ղ:'gh', ճ:'ch',
  մ:'m', յ:'y', ն:'n', շ:'sh',
  ո:'o', չ:'ch', պ:'p', ջ:'j',
  ռ:'r', ս:'s', վ:'v', տ:'t',
  ր:'r', ց:'c', ւ:'u', փ:'p',
  ք:'q', օ:'o', ֆ:'f'
}


// Russian transliteration
const russianMap:Record<string,string> = {
  а:'a', б:'b', в:'v', г:'g',
  д:'d', е:'e', ё:'yo', ж:'zh',
  з:'z', и:'i', й:'y', к:'k',
  л:'l', м:'m', н:'n', о:'o',
  п:'p', р:'r', с:'s', т:'t',
  у:'u', ф:'f', х:'kh', ц:'ts',
  ч:'ch', ш:'sh', щ:'sch',
  ы:'y', э:'e', ю:'yu', я:'ya'
}


function transliterate(text:string){

  return text
    .toLowerCase()
    .split('')
    .map(char =>
      armenianMap[char] ||
      russianMap[char] ||
      char
    )
    .join('')
}



function normalize(text:string){

  return text
    .toLowerCase()
    .replace(/[^a-z0-9а-яёա-ֆ]/gi,'')
}



export function ProductsBrowser({
  initialCategory,
  initialProducts,
  initialSearch 
}: ProductsBrowserProps) {


  const [searchTerm,setSearchTerm] = useState(initialSearch || '')
  const [filteredProducts,setFilteredProducts] =
    useState<Product[]>([])



  useEffect(()=>{


    let products = [...initialProducts]


    // category
    if(initialCategory){

      products = products.filter(product =>
        product.category === initialCategory ||
        product.category?.slug === initialCategory
      )

    }



    // multilingual search
    if(searchTerm.trim()){


      const search =
        normalize(searchTerm)


      products = products.filter(product=>{


        const name =
          normalize(product.name)


        const translatedName =
          normalize(
            transliterate(product.name)
          )


        return (
          name.includes(search) ||
          translatedName.includes(search)
        )


      })

    }


    setFilteredProducts(products)


  },[
    searchTerm,
    initialCategory,
    initialProducts
  ])




  return (

    <div className="mx-auto max-w-7xl px-4 py-6">


      {/* Search */}

      <div className="mb-6 relative">

        <Search
          className="
          absolute left-3 top-1/2
          -translate-y-1/2
          size-4
          text-muted-foreground/50
          "
        />


        <Input

          type="search"

          placeholder="Փնտրել ապրանքներ..."

          value={searchTerm}

          onChange={(e)=>
            setSearchTerm(e.target.value)
          }

          className="
          pl-10
          rounded-xl
          border-border/40
          focus-visible:ring-rose-500/30
          "

        />

      </div>




      <p className="
      text-sm 
      text-muted-foreground/70 
      mb-4
      ">
        {filteredProducts.length} ապրանք
      </p>





      {
      filteredProducts.length === 0 ? (


        <div className="
        flex flex-col
        items-center
        justify-center
        py-20
        text-center
        ">

          <p className="
          text-lg 
          text-muted-foreground/70
          ">

            {
              searchTerm
              ? 'Ապրանքներ չեն գտնվել'
              : 'Ապրանքներ չկան'
            }

          </p>


        </div>


      ) : (


        <div className="
        grid
        grid-cols-2
        gap-4
        sm:grid-cols-2
        lg:grid-cols-4
        ">


        {
        filteredProducts.map(product=>(


          <Link

            key={product.id}

            href={`/products/${product.slug}`}

            className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border
            border-border/40
            bg-card/50
            p-4
            transition-all
            duration-500
            hover:shadow-xl
            hover:-translate-y-2
            hover:border-rose-500/20
            "

          >


          <div className="
          relative
          aspect-square
          overflow-hidden
          rounded-xl
          bg-muted/30
          ">


          {
          product.image ? (

            <Image

              src={product.image}

              alt={product.name}

              fill

              className="
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
              "

              unoptimized={
                product.image.startsWith('http')
              }

            />

          ):(

            <div className="
            flex
            h-full
            items-center
            justify-center
            text-muted-foreground/30
            ">
              No image
            </div>

          )
          }





          {
          product.oldPrice && (

            <Badge
              className="
              absolute
              top-3
              right-3
              bg-red-500
              text-white
              "
            >

              -
              {
              Math.round(
              (
              (product.oldPrice-product.price)
              /
              product.oldPrice
              )*100
              )
              }%

            </Badge>

          )
          }




          {
          product.badges?.includes('new') && (

            <Badge
              className="
              absolute
              top-3
              left-3
              bg-green-500
              text-white
              "
            >
              🆕 Նոր
            </Badge>

          )
          }



          </div>





          <div className="mt-3">


            <h3 className="
            font-semibold
            line-clamp-1
            group-hover:text-rose-500
            ">

              {product.name}

            </h3>




            <div className="
            mt-1
            flex
            items-center
            gap-2
            ">

              <span className="
              text-lg
              font-bold
              text-red-600
              ">
                {formatAMD(product.price)}
              </span>



              {
              product.oldPrice && (

                <span className="
                text-sm
                text-muted-foreground/50
                line-through
                ">

                  {formatAMD(product.oldPrice)}

                </span>

              )
              }


            </div>




            <div className="
            mt-2
            text-sm
            text-muted-foreground/70
            ">

              ⭐ {product.rating} ({product.reviewCount})

            </div>





            <div className="mt-2 text-xs">


            {
            product.inStock ? (

              <span className="text-green-600">
                ✅ Կա պահեստում
              </span>

            ):(
              <span className="text-red-600">
                ❌ Բացակայում է
              </span>
            )
            }


            </div>



          </div>



          </Link>


        ))
        }


        </div>


      )
      }



    </div>

  )
}