// lib/data.ts
// Սա Server Component-ում կարող է օգտագործվել

// ============ TYPES ============
export type Category = {
  id: string;
  slug: string;
  name: string;
  image: string;
  sheetName?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  categoryId: string;
  image: string;
  unit: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  badges: ('new' | 'sale' | 'featured')[];
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
};

// ============ CATEGORIES WITH SHEET NAMES ============
// ✅ Փոխված sheetName-ները՝ համապատասխան հրապարակված թերթերի անուններին
export const categories: Category[] = [
  { id: 'c1', slug: 'fruits-vegetables', name: 'Թարմ միրգ և բանջարեղեն', image: '/products/fruits.png', sheetName: '25' },
  { id: 'c2', slug: 'dairy-icecream', name: 'Կաթնամթերք, պաղպաղակ և սառույց', image: '/products/dairy.png', sheetName: 'Sheet6' },
  { id: 'c3', slug: 'bakery-confectionery', name: 'Հացաբուլկեղեն և հրուշակեղեն', image: '/products/bakery.png', sheetName: 'Sheet29' },
  { id: 'c4', slug: 'beverages', name: 'Ոչ ալկոհոլային ըմպելիքներ', image: '/products/beverages.png', sheetName: 'Sheet27' },
  { id: 'c5', slug: 'sausages-snacks', name: 'Երշիկ և խորտիկներ', image: '/products/meat.png', sheetName: 'Sheet7' },
  { id: 'c6', slug: 'chips-seeds', name: 'Չիպսեր, սերմեր և եգիպտացորեն', image: '/products/snacks.png', sheetName: 'Sheet4' },
  { id: 'c7', slug: 'sweets', name: 'Քաղցրավենիք', image: '/products/sweets.jpg', sheetName: 'Sheet5' },
  { id: 'c8', slug: 'household', name: 'Կենցաղային պարագաներ', image: '/products/household.png', sheetName: 'Sheet22' },
  { id: 'c9', slug: 'ready-meals', name: 'Պատրաստի ուտեստ', image: '/products/ready-meals.png', sheetName: 'Sheet8' },
  { id: 'c10', slug: 'tobacco', name: 'Ծխախոտային արտադրանք և աքսեսուարներ', image: '/products/tobacco.png', sheetName: 'Sheet10' },
  { id: 'c11', slug: 'semi-finished', name: 'Կիսաֆաբրիկատներ', image: '/products/semi-finished.png', sheetName: 'Sheet9' },
  { id: 'c12', slug: 'souvenirs', name: 'Հուշանվերներ', image: '/products/souvenirs.png', sheetName: 'Sheet11' },
  { id: 'c13', slug: 'stationery', name: 'Գրենական պիտույքներ', image: '/products/stationery.png', sheetName: 'Sheet12' },
  { id: 'c14', slug: 'textile', name: 'Տեքստիլ, հագուստ և կոշիկի խնամք', image: '/products/textile.png', sheetName: 'Sheet14' },
  { id: 'c15', slug: 'holiday', name: 'Ամեն ինչ տոների համար', image: '/products/holiday.png', sheetName: 'Sheet15' },
  { id: 'c16', slug: 'electronics', name: 'Համակարգչային աքսեսուարներ', image: '/products/electronics.png', sheetName: 'Sheet16' },
  { id: 'c17', slug: 'kitchenware', name: 'Սպասք և խոհանոցային պարագաներ', image: '/products/kitchenware.png', sheetName: 'Sheet18' },
  { id: 'c18', slug: 'fish', name: 'Ձուկ և ծովամթերք', image: '/products/fish.png', sheetName: 'Sheet19' },
  { id: 'c19', slug: 'construction-tools-electrical-equipment', name: 'Շին․գործիքներ և Էլեկտրասարքավորում', image: '/products/elections.png', sheetName: 'Sheet17' },
  { id: 'c20', slug: 'toys', name: 'Խաղալիքներ', image: '/products/toys.png', sheetName: 'Sheet20' },
  { id: 'c21', slug: 'cosmetics', name: 'Կոսմետիկա և պարֆումերիա', image: '/products/cosmetics.png', sheetName: 'Sheet21' },
  { id: 'c22', slug: 'hygiene', name: 'Հիգիենա', image: '/products/hygiene.png', sheetName: 'Sheet23' },
  { id: 'c23', slug: 'diet', name: 'Դիետիկ, առանց գլյուտեն և բիո սննդամթերք', image: '/products/diet.png', sheetName: 'Sheet24' },
  { id: 'c24', slug: 'canned', name: 'Պահածոյացված մթերք', image: '/products/canned.png', sheetName: 'Sheet26' },
  { id: 'c25', slug: 'grocery', name: 'Նպարեղեն', image: '/products/grocery.png', sheetName: 'Sheet28' },
];

// ============ STORE INFO ============
export const STORE = {
  name: 'Red',
  address: 'Գայ համայնք, Երևանյան 45',
  phone: '+374 91 331233',
  phoneRaw: '+37491331233',
  whatsapp: '37491331233',
  email: 'info@storeRed.am',
  hours: 'Աշխատում ենք 24/7',
  freeDeliveryThreshold: 10000,
  deliveryFee: 1000,
};

// ============ HELPER FUNCTIONS ============
export function formatAMD(value: number): string {
  const grouped = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return grouped + ' ֏';
}

// ============ FETCH ALL DATA FROM GOOGLE SHEETS ============
export async function fetchAllDataFromSheets() {
  const SHEET_ID = '1sRSw9AGKl9bYS63Y5hxN-okEWBVxXJ-zitM3CDn--e8';
  
  // ✅ Parallel fetching - բոլորը միաժամանակ
  const fetchPromises = categories.map(async (category) => {
    try {
      const encodedSheetName = encodeURIComponent(category.sheetName || category.name);
      const url = `https://opensheet.elk.sh/${SHEET_ID}/${encodedSheetName}`;
      
      const response = await fetch(url, { 
        next: { revalidate: 3600 },
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) {
        console.error(`❌ Error loading ${category.name}: ${response.status}`);
        return { category, data: [], error: true };
      }

      const data = await response.json();
      console.log(`✅ Loaded ${category.name}: ${data.length} rows`);
      console.log(`   First row:`, data[0]);
      console.log(`   Second row:`, data[1]);
      
      return { category, data, error: false };
    } catch (error) {
      console.error(`❌ Exception fetching ${category.name}:`, error);
      return { category, data: [], error: true };
    }
  });

  const results = await Promise.all(fetchPromises);

  let allProducts: Product[] = [];

  for (const { category, data, error } of results) {
    if (error || data.length === 0) {
      console.log(`⚠️ Skipping ${category.name} - no data`);
      continue;
    }

    console.log(`🔄 Processing ${category.name}...`);

    // 🔑 ԿԱՐԵՎՈՐ: Առաջին տողը կատեգորիայի անունն է, երկրորդը՝ վերնագրեր
    // data[0] = կատեգորիայի անուն
    // data[1] = սյունակների վերնագրեր
    // data[2+] = ապրանքներ
    
    let categoryName = category.name;
    let headers: string[] = [];
    let productsData: any[] = [];

    if (data.length > 0) {
      // Առաջին տողը կատեգորիայի անունն է
      if (typeof data[0] === 'string') {
        categoryName = data[0];
        console.log(`   Category name: ${categoryName}`);
      } else if (typeof data[0] === 'object' && data[0] !== null) {
        // Եթե առաջին տողը օբյեկտ է, սա կարող է լինել վերնագրեր
        headers = Object.keys(data[0]);
        productsData = data;
      }
      
      // Երկրորդ տողը վերնագրերն են (եթե առաջինը կատեգորիա էր)
      if (data.length > 1 && typeof data[0] === 'string') {
        if (typeof data[1] === 'object' && data[1] !== null) {
          headers = Object.keys(data[1]);
          productsData = data.slice(2); // ապրանքները սկսած 3-րդ տողից
          console.log(`   Headers: ${headers.join(', ')}`);
        }
      }
      
      // Եթե վերնագրեր չկան, բայց կան ապրանքներ
      if (headers.length === 0 && data.length > 0) {
        // Օգտագործել default վերնագրեր
        headers = ['անուն', 'գին', 'նկար', 'տեսակ'];
        productsData = data;
      }
    }

    // 📝 Ֆորմատավորել ապրանքները
    const formattedProducts = productsData.map((item: any, index: number) => {
      // Եթե item-ը string է, սա կատեգորիա է կամ դատարկ տող
      if (typeof item === 'string') {
        return null;
      }

      // Համապատասխանեցնել սյունակները
      const getValue = (key: string) => {
        // Փորձել տարբեր տարբերակներ
        const keys = [key, key.toLowerCase(), key.trim()];
        for (const k of keys) {
          if (item[k] !== undefined && item[k] !== null && item[k] !== '') {
            return item[k];
          }
        }
        // Փորձել գտնել ըստ ինդեքսի, եթե headers-ը հայտնի է
        const idx = headers.findIndex(h => h.toLowerCase().includes(key.toLowerCase()));
        if (idx !== -1) {
          const values = Object.values(item);
          return values[idx] || '';
        }
        return '';
      };

      const name = getValue('անուն') || getValue('Name') || getValue('name') || 'Unnamed Product';
      const price = Number(getValue('գին') || getValue('Price') || getValue('price') || 0);
      const imageUrl = getValue('նկար') || getValue('Image') || getValue('image') || category.image;
      const unit = getValue('տեսակ') || getValue('Unit') || getValue('unit') || '1 հատ';

      // Google Drive-ի link-ից ստանալ ուղղակի նկարի URL
      let finalImageUrl = imageUrl;
      if (imageUrl.includes('drive.google.com')) {
        const match = imageUrl.match(/\/d\/([^/]+)/);
        if (match) {
          finalImageUrl = `https://drive.google.com/uc?export=view&id=${match[1]}`;
        }
      }

      return {
        id: `${category.id}-${index + 1}`,
        slug: `${category.slug}-${index + 1}`,
        name: String(name),
        description: '',
        price: price,
        oldPrice: undefined,
        categoryId: category.id,
        image: finalImageUrl,
        unit: String(unit),
        inStock: price > 0,
        rating: 4.5,
        reviewCount: 0,
        badges: [],
      };
    });

    // Հեռացնել null արժեքները
    const validProducts = formattedProducts.filter(p => p !== null) as Product[];
    console.log(`   Formatted ${validProducts.length} products`);
    allProducts.push(...validProducts);
  }

  console.log(`🎉 Total products: ${allProducts.length}`);

  // Default reviews
  const allReviews: Review[] = [
    { id: 'r1', name: 'Անի Հակոբյան', rating: 5, date: '2026-05-12', text: 'Շատ արագ առաքում և թարմ ապրանքներ։' },
    { id: 'r2', name: 'Դավիթ Մկրտչյան', rating: 5, date: '2026-05-08', text: 'Հիանալի սպասարկում, գները մատչելի են։' },
    { id: 'r3', name: 'Մարիամ Ղազարյան', rating: 4, date: '2026-04-28', text: 'Ապրանքների ընտրությունը մեծ է, առաքումը՝ ճշտապահ։' },
    { id: 'r4', name: 'Արամ Սարգսյան', rating: 5, date: '2026-04-15', text: 'Վճարումը առաքման պահին շատ հարմար է։' },
  ];

  return { products: allProducts, reviews: allReviews };
}

// ============ FETCH ONLY PRODUCTS ============
export async function fetchAllProductsFromSheets() {
  const data = await fetchAllDataFromSheets();
  return data.products;
}

// ============ FETCH ONLY REVIEWS ============
export async function fetchAllReviewsFromSheets() {
  const data = await fetchAllDataFromSheets();
  return data.reviews;
}

// ============ DEFAULT EXPORTS FOR BACKWARD COMPATIBILITY ============
export const defaultProducts: Product[] = [
  {
    id: 'p1', slug: 'fresh-apples', name: 'Թարմ խնձոր', description: 'Հյութալի կարմիր խնձոր՝ տեղական այգիներից։',
    price: 690, oldPrice: 850, categoryId: 'c1', image: '/products/fruits.png', unit: '1 կգ', inStock: true, rating: 4.8, reviewCount: 124, badges: ['sale', 'featured'],
  },
  {
    id: 'p2', slug: 'bananas', name: 'Բանան', description: 'Հասած էկվադորյան բանան՝ իդեալական նախաճաշի համար։',
    price: 590, categoryId: 'c1', image: '/products/fruits.png', unit: '1 կգ', inStock: true, rating: 4.7, reviewCount: 89, badges: ['new'],
  },
  {
    id: 'p3', slug: 'fresh-tomatoes', name: 'Թարմ պոմիդոր', description: 'Արարատյան դաշտի թարմ պոմիդոր։',
    price: 490, categoryId: 'c1', image: '/products/vegetables.png', unit: '1 կգ', inStock: true, rating: 4.6, reviewCount: 56, badges: ['featured'],
  },
  {
    id: 'p4', slug: 'cucumbers', name: 'Վարունգ', description: 'Թարմ ու խրթխրթան վարունգ՝ աղցանների համար։',
    price: 450, oldPrice: 550, categoryId: 'c1', image: '/products/vegetables.png', unit: '1 կգ', inStock: true, rating: 4.5, reviewCount: 41, badges: ['sale'],
  },
  {
    id: 'p5', slug: 'fresh-milk', name: 'Թարմ կաթ', description: 'Բնական կով կաթ՝ 3.2% յուղայնությամբ։',
    price: 420, categoryId: 'c2', image: '/products/dairy.png', unit: '1 լ', inStock: true, rating: 4.9, reviewCount: 203, badges: ['featured'],
  },
  {
    id: 'p6', slug: 'cheese', name: 'Հայկական պանիր', description: 'Ավանդական հայկական պանիր՝ բնական բաղադրությամբ։',
    price: 2200, oldPrice: 2600, categoryId: 'c2', image: '/products/dairy.png', unit: '500 գ', inStock: true, rating: 4.8, reviewCount: 78, badges: ['sale'],
  },
];

export const reviews: Review[] = [
  { id: 'r1', name: 'Անի Հակոբյան', rating: 5, date: '2026-05-12', text: 'Շատ արագ առաքում և թարմ ապրանքներ։' },
  { id: 'r2', name: 'Դավիթ Մկրտչյան', rating: 5, date: '2026-05-08', text: 'Հիանալի սպասարկում, գները մատչելի են։' },
  { id: 'r3', name: 'Մարիամ Ղազարյան', rating: 4, date: '2026-04-28', text: 'Ապրանքների ընտրությունը մեծ է, առաքումը՝ ճշտապահ։' },
  { id: 'r4', name: 'Արամ Սարգսյան', rating: 5, date: '2026-04-15', text: 'Վճարումը առաքման պահին շատ հարմար է։' },
];

// ============ HELPER FUNCTIONS FOR SINGLE ITEMS ============
export function getProductBySlug(slug: string): Product | undefined {
  return defaultProducts.find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}