export type Category = {
  id: string
  slug: string
  name: string
  image: string
}

export type Product = {
  id: string
  slug: string
  name: string
  description: string
  price: number
  oldPrice?: number
  categoryId: string
  image: string
  unit: string
  inStock: boolean
  rating: number
  reviewCount: number
  badges: ('new' | 'sale' | 'featured')[]
}

export type Review = {
  id: string
  name: string
  rating: number
  date: string
  text: string
}

export const categories: Category[] = [
  { id: 'c1', slug: 'fruits', name: 'Մրգեր', image: '/products/fruits.png' },
  { id: 'c2', slug: 'vegetables', name: 'Բանջարեղեն', image: '/products/vegetables.png' },
  { id: 'c3', slug: 'dairy', name: 'Կաթնամթերք', image: '/products/dairy.png' },
  { id: 'c4', slug: 'bakery', name: 'Հացաբուլկեղեն', image: '/products/bakery.png' },
  { id: 'c5', slug: 'beverages', name: 'Ըմպելիքներ', image: '/products/beverages.png' },
  { id: 'c6', slug: 'meat', name: 'Միս', image: '/products/meat.png' },
  { id: 'c7', slug: 'snacks', name: 'Խորտիկներ', image: '/products/snacks.png' },
  { id: 'c8', slug: 'household', name: 'Կենցաղային', image: '/products/household.png' },
]

export const products: Product[] = [
  {
    id: 'p1', slug: 'fresh-apples', name: 'Թարմ խնձոր', description: 'Հյութալի կարմիր խնձոր՝ տեղական այգիներից։ Հարուստ վիտամիններով և բնական քաղցրությամբ։',
    price: 690, oldPrice: 850, categoryId: 'c1', image: '/products/fruits.png', unit: '1 կգ', inStock: true, rating: 4.8, reviewCount: 124, badges: ['sale', 'featured'],
  },
  {
    id: 'p2', slug: 'bananas', name: 'Բանան', description: 'Հասած էկվադորյան բանան՝ իդեալական նախաճաշի և սմուզիների համար։',
    price: 590, categoryId: 'c1', image: '/products/fruits.png', unit: '1 կգ', inStock: true, rating: 4.7, reviewCount: 89, badges: ['new'],
  },
  {
    id: 'p3', slug: 'fresh-tomatoes', name: 'Թարմ պոմիդոր', description: 'Արարատյան դաշտի թարմ պոմիդոր՝ վառ համով և բույրով։',
    price: 490, categoryId: 'c2', image: '/products/vegetables.png', unit: '1 կգ', inStock: true, rating: 4.6, reviewCount: 56, badges: ['featured'],
  },
  {
    id: 'p4', slug: 'cucumbers', name: 'Վարունգ', description: 'Թարմ ու խրթխրթան վարունգ՝ աղցանների համար։',
    price: 450, oldPrice: 550, categoryId: 'c2', image: '/products/vegetables.png', unit: '1 կգ', inStock: true, rating: 4.5, reviewCount: 41, badges: ['sale'],
  },
  {
    id: 'p5', slug: 'fresh-milk', name: 'Թարմ կաթ', description: 'Բնական կով կաթ՝ 3.2% յուղայնությամբ։ Ամեն օր թարմ։',
    price: 420, categoryId: 'c3', image: '/products/dairy.png', unit: '1 լ', inStock: true, rating: 4.9, reviewCount: 203, badges: ['featured'],
  },
  {
    id: 'p6', slug: 'cheese', name: 'Հայկական պանիր', description: 'Ավանդական հայկական պանիր՝ բնական բաղադրությամբ։',
    price: 2200, oldPrice: 2600, categoryId: 'c3', image: '/products/dairy.png', unit: '500 գ', inStock: true, rating: 4.8, reviewCount: 78, badges: ['sale'],
  },
  {
    id: 'p7', slug: 'fresh-bread', name: 'Թարմ հաց', description: 'Ամեն առավոտ թխած թարմ հաց՝ խրթխրթան կեղևով։',
    price: 250, categoryId: 'c4', image: '/products/bakery.png', unit: '1 հատ', inStock: true, rating: 4.7, reviewCount: 312, badges: ['new', 'featured'],
  },
  {
    id: 'p8', slug: 'croissant', name: 'Կրուասան', description: 'Կարագով փափուկ կրուասան՝ ֆրանսիական բաղադրատոմսով։',
    price: 380, categoryId: 'c4', image: '/products/bakery.png', unit: '1 հատ', inStock: true, rating: 4.6, reviewCount: 67, badges: ['new'],
  },
  {
    id: 'p9', slug: 'orange-juice', name: 'Նարնջի հյութ', description: 'Բնական 100% նարնջի հյութ՝ առանց շաքարի հավելումի։',
    price: 890, oldPrice: 1050, categoryId: 'c5', image: '/products/beverages.png', unit: '1 լ', inStock: true, rating: 4.7, reviewCount: 94, badges: ['sale'],
  },
  {
    id: 'p10', slug: 'mineral-water', name: 'Հանքային ջուր', description: 'Բնական հանքային ջուր՝ հայկական աղբյուրներից։',
    price: 220, categoryId: 'c5', image: '/products/beverages.png', unit: '1.5 լ', inStock: true, rating: 4.8, reviewCount: 156, badges: [],
  },
  {
    id: 'p11', slug: 'chicken-fillet', name: 'Հավի ֆիլե', description: 'Թարմ հավի ֆիլե՝ առանց ոսկորի։ Բարձր որակ։',
    price: 1690, categoryId: 'c6', image: '/products/meat.png', unit: '1 կգ', inStock: true, rating: 4.6, reviewCount: 88, badges: ['featured'],
  },
  {
    id: 'p12', slug: 'beef', name: 'Տավարի միս', description: 'Թարմ տավարի միս՝ տեղական ֆերմայից։',
    price: 3200, oldPrice: 3600, categoryId: 'c6', image: '/products/meat.png', unit: '1 կգ', inStock: false, rating: 4.7, reviewCount: 45, badges: ['sale'],
  },
  {
    id: 'p13', slug: 'mixed-nuts', name: 'Ընկույզի խառնուրդ', description: 'Բոված ընկույզների խառնուրդ՝ նուշ, պիստակ, հնդկ/ընկույզ։',
    price: 1450, categoryId: 'c7', image: '/products/snacks.png', unit: '300 գ', inStock: true, rating: 4.8, reviewCount: 72, badges: ['new'],
  },
  {
    id: 'p14', slug: 'chocolate', name: 'Շոկոլադ', description: 'Մուգ շոկոլադ՝ 70% կակաոյով։ Պրեմիում որակ։',
    price: 780, oldPrice: 950, categoryId: 'c7', image: '/products/snacks.png', unit: '100 գ', inStock: true, rating: 4.9, reviewCount: 138, badges: ['sale', 'featured'],
  },
  {
    id: 'p15', slug: 'detergent', name: 'Լվացքի փոշի', description: 'Արդյունավետ լվացքի փոշի՝ թարմ բույրով։',
    price: 2890, categoryId: 'c8', image: '/products/household.png', unit: '3 կգ', inStock: true, rating: 4.5, reviewCount: 61, badges: [],
  },
  {
    id: 'p16', slug: 'dish-soap', name: 'Սպասք լվանալու հեղուկ', description: 'Խտացված սպասք լվանալու հեղուկ՝ լիմոնի բույրով։',
    price: 690, oldPrice: 820, categoryId: 'c8', image: '/products/household.png', unit: '1 լ', inStock: true, rating: 4.6, reviewCount: 53, badges: ['sale', 'new'],
  },
]

export const reviews: Review[] = [
  { id: 'r1', name: 'Անի Հակոբյան', rating: 5, date: '2026-05-12', text: 'Շատ արագ առաքում և թարմ ապրանքներ։ Միշտ պատվիրում եմ այստեղից։' },
  { id: 'r2', name: 'Դավիթ Մկրտչյան', rating: 5, date: '2026-05-08', text: 'Հիանալի սպասարկում, գները մատչելի են։ Խորհուրդ եմ տալիս բոլորին։' },
  { id: 'r3', name: 'Մարիամ Ղազարյան', rating: 4, date: '2026-04-28', text: 'Ապրանքների ընտրությունը մեծ է, առաքումը՝ ճշտապահ։' },
  { id: 'r4', name: 'Արամ Սարգսյան', rating: 5, date: '2026-04-15', text: 'Վճարումը առաքման պահին շատ հարմար է։ Ամեն ինչ կարգին էր։' },
]

export const STORE = {
  name: 'Red',
  address: 'Գայ համայնք, Երևանյան 45',
  phone: '+374 91 331233',
  phoneRaw: '+37491331233',
  whatsapp: '37491331233',
  email: 'info@storeRed.am',
  hours: 'Աշխատում ենք  24/7',
  freeDeliveryThreshold: 10000,
  deliveryFee: 1000,
}

export function formatAMD(value: number): string {
  // Deterministic thousands grouping so server and client render identically
  // regardless of the runtime's available ICU locale data.
  const grouped = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return grouped + ' ֏'
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}
