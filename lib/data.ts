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
  category: any;
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

export const categories: Category[] = [
  {
    id: 'c1',
    slug: 'fruits-vegetables',
    name: 'Թարմ միրգ և բանջարեղեն',
    image: '/products/fruits.png',
    sheetName: '25',
  },
  {
    id: 'c2',
    slug: 'dairy-icecream',
    name: 'Կաթնամթերք, պաղպաղակ և սառույց',
    image: '/products/dairy.png',
    sheetName: 'Sheet6',
  },
  {
    id: 'c3',
    slug: 'bakery-confectionery',
    name: 'Հացաբուլկեղեն և հրուշակեղեն',
    image: '/products/bakery.png',
    sheetName: 'Sheet29',
  },
  {
    id: 'c4',
    slug: 'beverages',
    name: 'Ոչ ալկոհոլային ըմպելիքներ',
    image: '/products/beverages.png',
    sheetName: 'Sheet27',
  },
  {
    id: 'c5',
    slug: 'sausages-snacks',
    name: 'Երշիկ և խորտիկներ',
    image: '/products/meat.png',
    sheetName: 'Sheet7',
  },
  {
    id: 'c6',
    slug: 'chips-seeds',
    name: 'Չիպսեր, սերմեր և եգիպտացորեն',
    image: '/products/snacks.png',
    sheetName: 'Sheet4',
  },
  {
    id: 'c7',
    slug: 'sweets',
    name: 'Քաղցրավենիք',
    image: '/products/sweets.jpg',
    sheetName: 'Sheet5',
  },
  {
    id: 'c8',
    slug: 'household',
    name: 'Կենցաղային պարագաներ',
    image: '/products/household.png',
    sheetName: 'Sheet22',
  },
  {
    id: 'c9',
    slug: 'ready-meals',
    name: 'Պատրաստի ուտեստ',
    image: '/products/ready-meals.png',
    sheetName: 'Sheet8',
  },
  {
    id: 'c10',
    slug: 'tobacco',
    name: 'Ծխախոտային արտադրանք և աքսեսուարներ',
    image: '/products/tobacco.png',
    sheetName: 'Sheet10',
  },
  {
    id: 'c11',
    slug: 'semi-finished',
    name: 'Կիսաֆաբրիկատներ',
    image: '/products/semi-finished.png',
    sheetName: 'Sheet9',
  },
  {
    id: 'c12',
    slug: 'souvenirs',
    name: 'Հուշանվերներ',
    image: '/products/souvenirs.png',
    sheetName: 'Sheet11',
  },
  {
    id: 'c13',
    slug: 'stationery',
    name: 'Գրենական պիտույքներ',
    image: '/products/stationery.png',
    sheetName: 'Sheet12',
  },
  {
    id: 'c14',
    slug: 'textile',
    name: 'Տեքստիլ, հագուստ և կոշիկի խնամք',
    image: '/products/textile.png',
    sheetName: 'Sheet14',
  },
  {
    id: 'c15',
    slug: 'holiday',
    name: 'Ամեն ինչ տոների համար',
    image: '/products/holiday.png',
    sheetName: 'Sheet15',
  },
  {
    id: 'c16',
    slug: 'electronics',
    name: 'Համակարգչային աքսեսուարներ',
    image: '/products/electronics.png',
    sheetName: 'Sheet16',
  },
  {
    id: 'c17',
    slug: 'kitchenware',
    name: 'Սպասք և խոհանոցային պարագաներ',
    image: '/products/kitchenware.png',
    sheetName: 'Sheet18',
  },
  {
    id: 'c18',
    slug: 'fish',
    name: 'Ձուկ և ծովամթերք',
    image: '/products/fish.png',
    sheetName: 'Sheet19',
  },
  {
    id: 'c19',
    slug: 'construction-tools-electrical-equipment',
    name: 'Շին․գործիքներ և Էլեկտրասարքավորում',
    image: '/products/elections.png',
    sheetName: 'Sheet17',
  },
  {
    id: 'c20',
    slug: 'toys',
    name: 'Խաղալիքներ',
    image: '/products/toys.png',
    sheetName: 'Sheet20',
  },
  {
    id: 'c21',
    slug: 'cosmetics',
    name: 'Կոսմետիկա և պարֆումերիա',
    image: '/products/cosmetics.png',
    sheetName: 'Sheet21',
  },
  {
    id: 'c22',
    slug: 'hygiene',
    name: 'Հիգիենա',
    image: '/products/hygiene.png',
    sheetName: 'Sheet23',
  },
  {
    id: 'c24',
    slug: 'diet',
    name: 'Դիետիկ, առանց գլյուտեն և բիո սննդամթերք',
    image: '/products/diet.png',
    sheetName: 'Sheet24',
  },
  {
    id: 'c26',
    slug: 'canned',
    name: 'Պահածոյացված մթերք',
    image: '/products/canned.png',
    sheetName: 'Sheet26',
  },
  {
    id: 'c28',
    slug: 'grocery',
    name: 'Նպարեղեն',
    image: '/products/grocery.png',
    sheetName: 'Sheet28',
  },
  {
    id: 'c30',
    slug: 'alcoholic-drinks',
    name: 'Ալկոհոլային խմիչքներ',
    image: '/products/alcoholic-drinks.png',
    sheetName: 'Sheet30',
  },
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


// ============ FORMAT PRICE ============

export function formatAMD(value: number): string {
  const grouped = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return grouped + ' ֏';
}


// ============ PARSE PRICE ============

function parsePrice(value: unknown): number {
  if (value === null || value === undefined) {
    return 0;
  }

  let str = String(value).trim();

  if (!str) {
    return 0;
  }

  // Հեռացնել դրամի նշանը
  str = str.replace(/֏/g, '').trim();

  /*
   * Օրինակներ
   *
   * 120       → 120
   * 1,200     → 1200
   * 1 200     → 1200
   * 1200,50   → 1200.50
   * 1200.50   → 1200.50
   */

  str = str.replace(/\s/g, '');

  // Եթե կա և՛ կետ, և՛ ստորակետ
  if (str.includes('.') && str.includes(',')) {
    // 1,200.50 → 1200.50
    str = str.replace(/,/g, '');
  }

  // Եթե միայն ստորակետ կա
  else if (str.includes(',')) {
    const parts = str.split(',');

    if (
      parts.length === 2 &&
      parts[1].length === 3 &&
      /^\d+$/.test(parts[0]) &&
      /^\d+$/.test(parts[1])
    ) {
      // 1,200 → 1200
      str = parts.join('');
    } else {
      // 1200,50 → 1200.50
      str = str.replace(',', '.');
    }
  }

  // Մաքրել մնացած նշանները
  str = str.replace(/[^0-9.]/g, '');

  const num = Number(str);

  return Number.isFinite(num) ? num : 0;
}


// ============ GOOGLE DRIVE IMAGE ============

function convertGoogleDriveImage(url: string): string {
  if (!url) return '';

  const trimmed = url.trim();

  // Google Drive file ID
  let fileId = '';

  // https://drive.google.com/file/d/FILE_ID/view
  const fileMatch = trimmed.match(
    /drive\.google\.com\/file\/d\/([^/?]+)/
  );

  if (fileMatch?.[1]) {
    fileId = fileMatch[1];
  }

  // https://drive.google.com/uc?...&id=FILE_ID
  if (!fileId) {
    const idMatch = trimmed.match(
      /[?&]id=([^&]+)/
    );

    if (idMatch?.[1]) {
      fileId = idMatch[1];
    }
  }

  // Եթե միայն ID է եկել
  if (
    !fileId &&
    !trimmed.includes('/') &&
    trimmed.length > 20
  ) {
    fileId = trimmed;
  }

  // Google Drive → thumbnail
  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }

  return trimmed;
}


// ============ GOOGLE SHEETS CELL HELPER ============

function getCellValue(row: any, index: number): string {
  const cell = row?.c?.[index];

  if (!cell) {
    return '';
  }

  // formatted value
  if (cell.f !== undefined && cell.f !== null) {
    return String(cell.f).trim();
  }

  // raw value
  if (cell.v !== undefined && cell.v !== null) {
    return String(cell.v).trim();
  }

  return '';
}


// ============ IS URL ============

function isUrl(value: string): boolean {
  if (!value) {
    return false;
  }

  return (
    value.includes('drive.google.com') ||
    value.startsWith('http://') ||
    value.startsWith('https://')
  );
}


// ============ IS HEADER ============

function isNameHeader(value: string): boolean {
  const v = value.trim().toLowerCase();

  return (
    v === 'անուն' ||
    v.includes('անուն') ||
    v === 'ապրանք' ||
    v.includes('ապրանք') ||
    v === 'name' ||
    v.includes('product')
  );
}

function isPriceHeader(value: string): boolean {
  const v = value.trim().toLowerCase();

  return (
    v === 'գին' ||
    v.includes('գին') ||
    v === 'price' ||
    v.includes('price') ||
    v === 'cost'
  );
}

function isImageHeader(value: string): boolean {
  const v = value.trim().toLowerCase();

  return (
    v === 'նկար' ||
    v.includes('նկար') ||
    v === 'image' ||
    v === 'photo' ||
    v === 'link' ||
    v === 'url'
  );
}

function isUnitHeader(value: string): boolean {
  const v = value.trim().toLowerCase();

  return (
    v.includes('միավոր') ||
    v === 'unit' ||
    v.includes('տեսակ') ||
    v === 'type'
  );
}


// ============ FIND HEADER ROW ============

function findHeaderRow(rows: any[]): number {
  const maxRows = Math.min(rows.length, 15);

  for (let i = 0; i < maxRows; i++) {
    const values = Array.from(
      { length: 10 },
      (_, index) => getCellValue(rows[i], index)
    );

    const hasName = values.some(isNameHeader);
    const hasPrice = values.some(isPriceHeader);
    const hasImage = values.some(isImageHeader);

    if (
      (hasName && hasPrice) ||
      (hasName && hasImage) ||
      (hasPrice && hasImage)
    ) {
      return i;
    }
  }

  return -1;
}


// ============ FIND PRODUCT DATA FALLBACK ============

function findProductName(
  row: any,
  nameIndex: number
): string {
  // Նախ փորձել ճիշտ column-ը
  if (nameIndex >= 0) {
    const value = getCellValue(row, nameIndex);

    if (value && !isUrl(value)) {
      const lower = value.toLowerCase();

      if (
        !isNameHeader(lower) &&
        !isPriceHeader(lower) &&
        !isImageHeader(lower)
      ) {
        return value;
      }
    }
  }

  // Եթե ճիշտ column-ում չկա,
  // փնտրել ամբողջ row-ում
  const values = Array.from(
    { length: 10 },
    (_, index) => getCellValue(row, index)
  );

  for (const value of values) {
    if (!value) continue;

    if (isUrl(value)) continue;

    if (isNameHeader(value)) continue;

    if (isPriceHeader(value)) continue;

    if (isImageHeader(value)) continue;

    const clean = value
      .replace(/\s/g, '')
      .replace(/֏/g, '');

    // Թվային արժեքը անուն չէ
    if (/^[\d.,]+$/.test(clean)) {
      continue;
    }

    if (value.length >= 2) {
      return value;
    }
  }

  return '';
}


// ============ FIND PRODUCT PRICE FALLBACK ============

function findProductPrice(
  row: any,
  priceIndex: number
): number {
  // Նախ ճիշտ column
  if (priceIndex >= 0) {
    const value = getCellValue(row, priceIndex);
    const price = parsePrice(value);

    if (price > 0) {
      return price;
    }
  }

  // Հետո ամբողջ row-ում փնտրել թիվ
  const values = Array.from(
    { length: 10 },
    (_, index) => getCellValue(row, index)
  );

  for (const value of values) {
    if (!value) continue;

    if (isUrl(value)) continue;

    const price = parsePrice(value);

    if (price > 0) {
      return price;
    }
  }

  return 0;
}


// ============ FIND PRODUCT IMAGE ============

function findProductImage(
  row: any,
  imageIndex: number
): string {
  // Նախ header-ից գտնված column-ը
  if (imageIndex >= 0) {
    const value = getCellValue(row, imageIndex);

    if (isUrl(value)) {
      return value;
    }
  }

  // Քո Sheet-ի screenshot-ի կառուցվածքում
  // A = նկարի URL / image
  const firstColumn = getCellValue(row, 0);

  if (isUrl(firstColumn)) {
    return firstColumn;
  }

  // Հետո ամբողջ row-ում URL փնտրել
  const values = Array.from(
    { length: 10 },
    (_, index) => getCellValue(row, index)
  );

  for (const value of values) {
    if (isUrl(value)) {
      return value;
    }
  }

  return '';
}


// ============ FETCH ALL DATA FROM GOOGLE SHEETS ============

export async function fetchAllDataFromSheets() {
  const SHEET_ID =
    '1sRSw9AGKl9bYS63Y5hxN-okEWBVxXJ-zitM3CDn--e8';

  const allProducts: Product[] = [];

  const fetchPromises = categories.map(async (category) => {
    try {
      const sheetName = encodeURIComponent(
        category.sheetName || ''
      );

      if (!sheetName) {
        return {
          category,
          rows: [],
          error: true,
        };
      }

      const url =
        `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq` +
        `?sheet=${sheetName}&tqx=out:json`;

      console.log(
        `📡 Loading Sheet: ${category.sheetName}`
      );

      const response = await fetch(url, {
        next: {
          revalidate: 3600,
        },
      });

      if (!response.ok) {
        console.error(
          `❌ ${category.name} (${category.sheetName}) – HTTP ${response.status}`
        );

        return {
          category,
          rows: [],
          error: true,
        };
      }

      const text = await response.text();

      const jsonText = text
        .replace(/^[^(]+\(/, '')
        .replace(/\);?\s*$/, '');

      const json = JSON.parse(jsonText);

      const rows = json?.table?.rows || [];

      console.log(
        `📦 ${category.sheetName}: ${rows.length} rows`
      );

      return {
        category,
        rows,
        error: false,
      };
    } catch (error) {
      console.error(
        `❌ ${category.name} (${category.sheetName}) – fetch error:`,
        error
      );

      return {
        category,
        rows: [],
        error: true,
      };
    }
  });

  const results = await Promise.all(fetchPromises);


  // =========================================================
  // PROCESS SHEETS
  // =========================================================

  for (const {
    category,
    rows,
    error,
  } of results) {

    if (
      error ||
      !Array.isArray(rows) ||
      rows.length === 0
    ) {
      continue;
    }


    // =======================================================
    // Գտնել header-ի իրական row-ը
    // =======================================================

    const headerRowIndex = findHeaderRow(rows);

    console.log(
      `📋 ${category.sheetName} header row:`,
      headerRowIndex + 1
    );


    // =======================================================
    // Column index-ներ
    // =======================================================

    let nameIndex = -1;
    let priceIndex = -1;
    let imageIndex = -1;
    let unitIndex = -1;


    // =======================================================
    // Եթե header գտնվեց
    // =======================================================

    if (headerRowIndex >= 0) {
      const headerRow = rows[headerRowIndex];

      const headers = Array.from(
        { length: 10 },
        (_, index) =>
          getCellValue(
            headerRow,
            index
          ).toLowerCase()
      );


      headers.forEach((header, index) => {
        if (!header) return;


        // NAME
        if (
          nameIndex === -1 &&
          isNameHeader(header)
        ) {
          nameIndex = index;
        }


        // PRICE
        if (
          priceIndex === -1 &&
          isPriceHeader(header)
        ) {
          priceIndex = index;
        }


        // IMAGE
        if (
          imageIndex === -1 &&
          isImageHeader(header)
        ) {
          imageIndex = index;
        }


        // UNIT
        if (
          unitIndex === -1 &&
          isUnitHeader(header)
        ) {
          unitIndex = index;
        }
      });


      console.log(
        `📊 ${category.sheetName} columns:`,
        {
          nameIndex,
          priceIndex,
          imageIndex,
          unitIndex,
          headers,
        }
      );
    }


    // =======================================================
    // FALLBACK
    //
    // Քո screenshot-ի հիմնական կառուցվածքը.
    //
    // A = image
    // B = empty
    // C = name
    // D = price
    // E = Google Drive link
    //
    // Եթե header-ը ինչ-որ պատճառով չի գտնվել,
    // օգտագործում ենք այս կառուցվածքը։
    // =======================================================

    if (nameIndex === -1) {
      nameIndex = 2;
    }

    if (priceIndex === -1) {
      priceIndex = 3;
    }

    if (imageIndex === -1) {
      imageIndex = 4;
    }


    // =======================================================
    // ՈՐՏԵՂԻՑ ՍԿՍԵԼ
    // =======================================================

    let startIndex = 0;

    if (headerRowIndex >= 0) {
      startIndex = headerRowIndex + 1;
    }


    // =======================================================
    // ԱՊՐԱՆՔՆԵՐ
    // =======================================================

    for (
      let i = startIndex;
      i < rows.length;
      i++
    ) {

      const row = rows[i];

      if (!row) {
        continue;
      }


      // =====================================================
      // RAW VALUES
      // =====================================================

      const allValues = Array.from(
        { length: 10 },
        (_, index) =>
          getCellValue(row, index)
      );


      // Ամբողջովին դատարկ row
      if (
        allValues.every(
          (value) => !value
        )
      ) {
        continue;
      }


      // =====================================================
      // NAME
      // =====================================================

      const name =
        findProductName(
          row,
          nameIndex
        );


      // =====================================================
      // PRICE
      // =====================================================

      const price =
        findProductPrice(
          row,
          priceIndex
        );


      // =====================================================
      // IMAGE
      // =====================================================

      let image =
        findProductImage(
          row,
          imageIndex
        );


      // =====================================================
      // Եթե անուն կամ գին չկա
      // =====================================================

      if (
        !name ||
        price <= 0
      ) {

        console.log(
          `⚠️ ${category.sheetName} row ${i + 1} skipped:`,
          {
            name,
            price,
            values: allValues,
          }
        );

        continue;
      }


      // =====================================================
      // GOOGLE DRIVE IMAGE
      // =====================================================

      image =
        convertGoogleDriveImage(
          image
        );


      // Եթե նկար չկա
      if (!image) {
        image = category.image;
      }


      // =====================================================
      // UNIT
      // =====================================================

      let unit = '1 հատ';

      if (unitIndex >= 0) {

        const unitValue =
          getCellValue(
            row,
            unitIndex
          );

        if (unitValue) {
          unit = unitValue;
        }
      }


      // =====================================================
      // PRODUCT
      // =====================================================

      const product: Product = {

        id:
          `${category.id}-${i + 1}`,

        slug:
          `${category.slug}-${i + 1}`,

        name,

        description: '',

        price,

        oldPrice: undefined,

        categoryId:
          category.id,

        image,

        unit,

        inStock: true,

        rating: 4.5,

        reviewCount: 0,

        badges: [],
      };


      allProducts.push(product);


      // =====================================================
      // DEBUG
      // =====================================================

      console.log(
        `✅ ${category.sheetName} →`,
        {
          row: i + 1,
          name,
          price,
          image,
        }
      );
    }
  }


  // =========================================================
  // TOTAL
  // =========================================================

  console.log(
    ` ապրանքներ: ${allProducts}`
  );


  // =========================================================
  // REVIEWS
  // =========================================================

  const allReviews: Review[] = [

    {
      id: 'r1',
      name: 'Անի Հակոբյան',
      rating: 5,
      date: '2026-05-12',
      text: 'Շատ արագ առաքում և թարմ ապրանքներ։',
    },

    {
      id: 'r2',
      name: 'Դավիթ Մկրտչյան',
      rating: 5,
      date: '2026-05-08',
      text: 'Հիանալի սպասարկում, գները մատչելի են։',
    },

    {
      id: 'r3',
      name: 'Մարիամ Ղազարյան',
      rating: 4,
      date: '2026-04-28',
      text: 'Ապրանքների ընտրությունը մեծ է, առաքումը՝ ճշտապահ։',
    },

    {
      id: 'r4',
      name: 'Արամ Սարգսյան',
      rating: 5,
      date: '2026-04-15',
      text: 'Վճարումը առաքման պահին շատ հարմար է։',
    },

  ];


  return {
    products: allProducts,
    reviews: allReviews,
  };
}


// ============ FETCH ONLY PRODUCTS ============

export async function fetchAllProductsFromSheets() {
  const data =
    await fetchAllDataFromSheets();

  return data.products;
}


// ============ FETCH ONLY REVIEWS ============

export async function fetchAllReviewsFromSheets() {
  const data =
    await fetchAllDataFromSheets();

  return data.reviews;
}


// ============ DEFAULT PRODUCTS ============

export const defaultProducts: Product[] = [

  {
    id: 'p1',
    slug: 'fresh-apples',
    name: 'Թարմ խնձոր',
    description:
      'Հյութալի կարմիր խնձոր՝ տեղական այգիներից։',
    price: 690,
    oldPrice: 850,
    categoryId: 'c1',
    image: '/products/fruits.png',
    unit: '1 կգ',
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
    badges: ['sale', 'featured'],
  },

  {
    id: 'p2',
    slug: 'bananas',
    name: 'Բանան',
    description:
      'Հասած էկվադորյան բանան՝ իդեալական նախաճաշի համար։',
    price: 590,
    categoryId: 'c1',
    image: '/products/fruits.png',
    unit: '1 կգ',
    inStock: true,
    rating: 4.7,
    reviewCount: 89,
    badges: ['new'],
  },

  {
    id: 'p3',
    slug: 'fresh-tomatoes',
    name: 'Թարմ պոմիդոր',
    description:
      'Արարատյան դաշտի թարմ պոմիդոր։',
    price: 490,
    categoryId: 'c1',
    image: '/products/vegetables.png',
    unit: '1 կգ',
    inStock: true,
    rating: 4.6,
    reviewCount: 56,
    badges: ['featured'],
  },

  {
    id: 'p4',
    slug: 'cucumbers',
    name: 'Վարունգ',
    description:
      'Թարմ ու խրթխրթան վարունգ՝ աղցանների համար։',
    price: 450,
    oldPrice: 550,
    categoryId: 'c1',
    image: '/products/vegetables.png',
    unit: '1 կգ',
    inStock: true,
    rating: 4.5,
    reviewCount: 41,
    badges: ['sale'],
  },

  {
    id: 'p5',
    slug: 'fresh-milk',
    name: 'Թարմ կաթ',
    description:
      'Բնական կով կաթ՝ 3.2% յուղայնությամբ։',
    price: 420,
    categoryId: 'c2',
    image: '/products/dairy.png',
    unit: '1 լ',
    inStock: true,
    rating: 4.9,
    reviewCount: 203,
    badges: ['featured'],
  },

  {
    id: 'p6',
    slug: 'cheese',
    name: 'Հայկական պանիր',
    description:
      'Ավանդական հայկական պանիր՝ բնական բաղադրությամբ։',
    price: 2200,
    oldPrice: 2600,
    categoryId: 'c2',
    image: '/products/dairy.png',
    unit: '500 գ',
    inStock: true,
    rating: 4.8,
    reviewCount: 78,
    badges: ['sale'],
  },

];


// ============ REVIEWS ============

export const reviews: Review[] = [

  {
    id: 'r1',
    name: 'Անի Հակոբյան',
    rating: 5,
    date: '2026-05-12',
    text: 'Շատ արագ առաքում և թարմ ապրանքներ։',
  },

  {
    id: 'r2',
    name: 'Դավիթ Մկրտչյան',
    rating: 5,
    date: '2026-05-08',
    text: 'Հիանալի սպասարկում, գները մատչելի են։',
  },

  {
    id: 'r3',
    name: 'Մարիամ Ղազարյան',
    rating: 4,
    date: '2026-04-28',
    text: 'Ապրանքների ընտրությունը մեծ է, առաքումը՝ ճշտապահ։',
  },

  {
    id: 'r4',
    name: 'Արամ Սարգսյան',
    rating: 5,
    date: '2026-04-15',
    text: 'Վճարումը առաքման պահին շատ հարմար է։',
  },

];


// ============ HELPER FUNCTIONS FOR SINGLE ITEMS ============

export function getProductBySlug(
  slug: string
): Product | undefined {

  return defaultProducts.find(
    (p) => p.slug === slug
  );
}


export function getCategoryBySlug(
  slug: string
): Category | undefined {

  return categories.find(
    (c) => c.slug === slug
  );
}