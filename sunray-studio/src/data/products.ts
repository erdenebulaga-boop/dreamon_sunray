export type Product = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  images?: string[];
  category: Category;
  subcategory?: string;
  tags: string[];
  badge?: "new" | "bestseller" | "sale";
  badges?: ("new" | "bestseller" | "sale")[];
  discountPercent?: number;
  saleEndsAt?: string; // ISO date string
  rating: number;
  reviewCount: number;
  inStock: boolean;
  size?: string;
  howToUse?: string;
  ingredients?: string;
  storage?: string;
};

export type Category =
  | "skincare"
  | "haircare"
  | "makeup"
  | "devices"
  | "sets";

export type Subcategory = {
  key: string;
  name: string;
};

export const categories: Record<
  Category,
  { name: string; slug: string; subcategories: Subcategory[] }
> = {
  skincare: {
    name: "Арьс арчилгаа",
    slug: "skincare",
    subcategories: [
      { key: "cleansing", name: "Цэвэрлэгээ" },
      { key: "care", name: "Арчлах" },
      { key: "cream", name: "Тос" },
    ],
  },
  haircare: {
    name: "Үсний арчилгаа",
    slug: "haircare",
    subcategories: [
      { key: "shampoo", name: "Шампунь" },
      { key: "scalp", name: "Хуйх" },
    ],
  },
  makeup: {
    name: "Нүүрний будалт",
    slug: "makeup",
    subcategories: [
      { key: "foundation", name: "Үндэс" },
    ],
  },
  devices: {
    name: "Төхөөрөмж",
    slug: "devices",
    subcategories: [
      { key: "cleansing-device", name: "Цэвэрлэгч төхөөрөмж" },
      { key: "treatment-device", name: "Эмчилгээний төхөөрөмж" },
    ],
  },
  sets: {
    name: "Багц & Бэлэг",
    slug: "sets",
    subcategories: [],
  },
};

export const products: Product[] = [
  // ─── SKINCARE ───
  {
    id: "1",
    slug: "rexri-daily-sun-cream",
    brand: "Rexri",
    name: "\u04e8\u0434\u04e9\u0440 \u0442\u0443\u0442\u043c\u044b\u043d \u043d\u0430\u0440\u043d\u044b \u0442\u043e\u0441",
    description: "Өдөр тутмын хөнгөн бүтээгдэхүүн бөгөөд SPF50+ PA+++ хамгаалалттай. Тослог биш томьёолоор арьсанд хурдан шингэж, цагаан мөр үлдээхгүй. Чийгшүүлэх найрлагатай тул нүүр хуурайшихаас сэргийлнэ. Нүүрний гоо сайхны бүтээгдэхүүний доор суурь болгон хэрэглэхэд тохиромжтой.",
    shortDescription: "SPF50+ нарны хамгаалалт",
    price: 45000,
    currency: "MNT",
    image: "/products/rexri-sun-cream.jpg",
    category: "skincare",
    subcategory: "cream",
    tags: ["SPF", "UV Protection", "Daily"],
    badge: "bestseller",
    badges: ["bestseller", "sale"],
    discountPercent: 20,
    saleEndsAt: "2026-03-15T23:59:59",
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    size: "50ml",
    howToUse: "Нарны хэт ягаан туяанаас арьсыг хамгаална. Ургамлын ханд агуулсан тул дав Өглөөний арьс арчилгааны хамгийн сүүлийн шатандаа хэрэглэнэ. Дараах тохиолдолд 2-3 цаг тутамд дахин түрхнэ.",
    ingredients: "Water, Ethylhexyl Mehoxycinnamate, Ethylhexyl Salicylate, Titanium Dioxide, Niacinamide, Glycerin, Butylene Glycol, Cetearyl Alcohol",
    storage: "Эрдсээр баялаг усаар хийгдсэн тул коллаген болон идэвхтэй найрлагууд агуулна. Хамгийн багадаа 30 см зайд байлгаад нүүрэндээ 3-4 удаа шүршинэ.",
  },
  {
    id: "2",
    slug: "rexri-daily-moisture-toner",
    brand: "Rexri",
    name: "\u04e8\u0434\u04e9\u0440 \u0447\u0438\u0439\u0433\u0448\u04af\u04af\u043b\u044d\u0445 \u0442\u043e\u043d\u0438\u043a",
    description: "Ургамлын гаралтай чийгшүүлэх тоник бөгөөд хуурай арьсыг зөөлөн чийгшүүлнэ. Гиалурон хүчил болон пантенол агуулсан тул арьсны чийгийн тэнцвэрийг хадгална. Нүүр угаасны дараа хэрэглэхэд арьсыг дараагийн арчилгаанд бэлтгэнэ. Мэдрэг арьсанд ч тохирсон зөөлөн найрлагатай.",
    shortDescription: "Ургамлын чийгшүүлэх тоник",
    price: 38000,
    currency: "MNT",
    image: "/products/rexri-moisture-toner.jpg",
    category: "skincare",
    subcategory: "care",
    tags: ["Hydrating", "Toner", "Plant-based"],
    badge: "new",
    badges: ["new", "sale"],
    discountPercent: 10,
    saleEndsAt: "2026-03-12T23:59:59",
    rating: 4.6,
    reviewCount: 87,
    inStock: true,
    size: "200ml",
    howToUse: "Нүүр угаасны дараа хөвөн дээр тоник түрхэж нүүр, хүзүү рүү зөөлөн арчина. Гараараа шууд нүүрэндээ тавьж хэрэглэж болно.",
    ingredients: "Aloe Barbadensis Leaf Water, Water, Dipropylene Glycol, Glycerin, Panthenol, Sodium Hyaluronate, Centella Asiatica Extract",
    storage: "Өрөөний температурт хадгална. Хэт халуун, хүйтнээс хамгаална. Нээснээс хойш 12 сарын дотор хэрэглэнэ.",
  },
  {
    id: "3",
    slug: "rexri-moisture-glow-mask",
    brand: "Rexri",
    name: "\u0413\u044d\u0440\u044d\u043b\u0442\u044d\u0439 \u0447\u0438\u0439\u0433\u0448\u04af\u04af\u043b\u044d\u0445 \u043c\u0430\u0441\u043a",
    description: "Гэрэлтүүлэх ба гүнзгий чийгшүүлэх маск бөгөөд чийгшүүлэх шүүсээр баяжуулсан. Арьсны уян хатныг сэргээж, үүдэн цоргыг нарийсгана. Нэг удаагийн хэрэглээгээр арьс мэдэгдэхүйц гэрэлтэй болно. Долоо хоногт 2-3 удаа хэрэглэхэд хамгийн сайн үр дүн өгнө.",
    shortDescription: "Гүнзгий чийгшүүлэх маск",
    price: 8500,
    currency: "MNT",
    image: "/products/rexri-glow-mask.jpg",
    category: "skincare",
    subcategory: "care",
    tags: ["Sheet Mask", "Brightening", "Hydrating"],
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    size: "1pc",
  },
  {
    id: "4",
    slug: "keepkiss-water-active-mask",
    brand: "KEEPKISS",
    name: "\u0423\u0441\u0430\u043d \u0438\u0434\u044d\u0432\u0445\u0438\u0436\u04af\u04af\u043b\u044d\u0445 \u043c\u0430\u0441\u043a",
    description: "Гүнзгий чийгшүүлэх үйлдэлтэй усан идэвхит маск бөгөөд хуурай арьсанд онцгой тохирно. Усны молекулууд арьсны гүн давхаргад нэвтэрч чийгшүүлнэ. Хэрэглэсний дараа арьс зөөлөн, уян хатан болно. 6 ширхэг багцтай тул хоёр долоо хоногийн турш тогтмол хэрэглэх боломжтой.",
    shortDescription: "Усан идэвхит маск",
    price: 12000,
    currency: "MNT",
    image: "/products/keepkiss-water-mask.jpg",
    category: "skincare",
    subcategory: "care",
    tags: ["Sheet Mask", "Moisturizing"],
    rating: 4.5,
    reviewCount: 156,
    inStock: true,
    size: "26ml x 6",
  },
  {
    id: "5",
    slug: "keepkiss-medical-repair-patches",
    brand: "KEEPKISS",
    name: "\u042d\u043c\u043d\u044d\u043b\u0433\u044d\u044d\u043d\u0438\u0439 \u043d\u04e9\u0445\u04e9\u043d \u043d\u0430\u0430\u043b\u0442",
    description: "Ариун эмнэлгээний зэргийн нүүрний наалт бөгөөд эмчилгээний дараах арьс нөхөн сэргээнэ. Гэмтсэн арьсыг тайвшруулж, улайралтыг бууруулна. Бактерийн эсрэг хамгаалалттай тул халдваргүй нөхцөлд эдгэрэлтийг дэмжинэ. Лазер эмчилгээ болон бусад процедурын дараа хэрэглэхэд тохиромжтой.",
    shortDescription: "Эмнэлгийн нөхөн сэргээх наалт",
    price: 25000,
    currency: "MNT",
    image: "/products/keepkiss-repair-patches.jpg",
    category: "skincare",
    subcategory: "care",
    tags: ["Medical", "Post-treatment", "Recovery"],
    rating: 4.9,
    reviewCount: 68,
    inStock: true,
    size: "28g x 5",
  },
  {
    id: "6",
    slug: "fucuishi-ceramide-freeze-dried-mask",
    brand: "FUCUISHI",
    name: "\u0426\u0435\u0440\u0430\u043c\u0438\u0434 \u0445\u04e9\u043b\u0434\u04e9\u04e9 \u0445\u0430\u0442\u0430\u0430\u0441\u0430\u043d \u043c\u0430\u0441\u043a",
    description: "Усаар идэвхиждэг хөлдөө хатаасан церамид маск бөгөөд арьсны хамгаалалтын давхаргыг бэхжүүлнэ. Церамид найрлага нь арьсны байгалийн хамгаалалтыг дуурайж, чийг алдалтаас сэргийлнэ. Хөлдөө хатаасан технологи тул идэвхтэй бодисууд илүү өндөр концентрацитай. Мэдрэг болон гэмтсэн арьсанд онцгой тохиромжтой.",
    shortDescription: "Церамид хөлдөө хатаасан маск",
    price: 35000,
    currency: "MNT",
    image: "/products/fucuishi-ceramide-mask.jpg",
    category: "skincare",
    subcategory: "care",
    tags: ["Ceramide", "Barrier Repair", "Freeze Dried"],
    badge: "new",
    rating: 4.7,
    reviewCount: 42,
    inStock: true,
    size: "2.8g x 5",
  },
  {
    id: "7",
    slug: "fucuishi-black-gold-reviving-mask",
    brand: "FUCUISHI",
    name: "\u0425\u0430\u0440 \u0430\u043b\u0442 \u0441\u044d\u0440\u0433\u044d\u044d\u0445 \u043c\u0430\u0441\u043a",
    description: "Хар алтны цогцолбортой премиум маск бөгөөд ядарсан арьсыг гүнзгий тэжээж сэргээнэ. Хар алтны ханд нь арьсны эсийн шинэчлэлийг идэвхжүүлнэ. Үр дүнтэй антиэйжинг найрлага нь нүүрний жижиг үрчлээг тэгшилнэ. Долоо хоногт 1-2 удаа оройн арчилгаанд хэрэглэхэд тохиромжтой.",
    shortDescription: "Премиум антиэйжинг маск",
    price: 42000,
    currency: "MNT",
    image: "/products/fucuishi-black-gold-mask.jpg",
    category: "skincare",
    subcategory: "care",
    tags: ["Premium", "Revitalizing", "Anti-aging"],
    badge: "bestseller",
    rating: 4.8,
    reviewCount: 91,
    inStock: true,
    size: "28ml x 5",
  },
  {
    id: "8",
    slug: "yuyun-germ-protecting-milk",
    brand: "YUYUN",
    name: "\u0425\u0430\u043c\u0433\u0430\u0430\u043b\u0430\u043b\u0442\u044b\u043d \u0441\u04af\u04af",
    description: "Арьсыг хамгаалж тэжээдэг зөөлөн сүү бөгөөд хөнгөн, хурдан шингэдэг. Өдрийн турш арьсны чийгийн түвшинг тогтвортой барьж, хуурайшилтаас хамгаална. Байгалийн ургамлын ханд агуулсан тул мэдрэг арьсанд зориулсан. Нүүр болон хүзүүний арьсанд өдөр бүр хэрэглэнэ.",
    shortDescription: "Хамгаалалтын тэжээлтэй сүү",
    price: 32000,
    currency: "MNT",
    image: "/products/yuyun-protecting-milk.jpg",
    category: "skincare",
    subcategory: "cream",
    tags: ["Moisturizer", "Protection", "Gentle"],
    rating: 4.4,
    reviewCount: 53,
    inStock: true,
    size: "100ml",
  },
  {
    id: "9",
    slug: "xiuting-tianqi-mask",
    brand: "XiuTing YingHua",
    name: "\u0422\u0438\u0430\u043d\u0447\u0438 \u0445\u0430\u043c\u0433\u0430\u0430\u043b\u0430\u043b\u0442\u044b\u043d \u043c\u0430\u0441\u043a",
    description: "Арьсыг хамгаалж, тэжээж, гоо үзэсгэлэнтэй болгодог крем маск. Тианчи ургамлын ханд нь арьсны эсийг идэвхжүүлж, өнгө зүсийг сайжруулна. Шөнийн арчилгаанд хэрэглэхэд арьсыг гүнзгий тэжээнэ. Тогтмол хэрэглэснээр арьс зөөлөн, уян хатан болно.",
    shortDescription: "Тианчи хамгаалалтын крем маск",
    price: 28000,
    currency: "MNT",
    image: "/products/xiuting-tianqi-mask.jpg",
    category: "skincare",
    subcategory: "care",
    tags: ["Cream Mask", "Nourishing", "Protection"],
    rating: 4.3,
    reviewCount: 37,
    inStock: true,
    size: "100g",
  },
  // ─── HAIRCARE ───
  {
    id: "10",
    slug: "sunray-light-shiny-shampoo",
    brand: "Sunray",
    name: "\u0425\u04e9\u043d\u0433\u04e9\u043d \u0433\u044d\u0440\u044d\u043b\u0442\u044d\u0439 \u0448\u0430\u043c\u043f\u0443\u043d\u044c",
    description: "Салоны зэргийн үхээс хамгаалах, хуйхэлт эсрэг шампунь бөгөөд 720г том лонхтой. Толгойн арьсыг тайвшруулж, хуйхыг үндсээр нь арилгана. Үсний ширхэгийг бэхжүүлж, гөлгөр, гялалзсан болгоно. Мэргэжлийн салонд болон гэрийн хэрэглээнд адил тохиромжтой.",
    shortDescription: "Хуйхэлт эсрэг шампунь",
    price: 55000,
    currency: "MNT",
    image: "/products/sunray-shampoo-blue.jpg",
    category: "haircare",
    subcategory: "shampoo",
    tags: ["Anti-Dandruff", "Salon", "Professional"],
    badge: "bestseller",
    rating: 4.6,
    reviewCount: 178,
    inStock: true,
    size: "720g",
  },
  {
    id: "11",
    slug: "zheanji-scalp-nutrient-solution",
    brand: "ZHEANJI",
    name: "\u0422\u043e\u043b\u0433\u043e\u0439\u043d \u0430\u0440\u044c\u0441 \u0442\u044d\u0436\u044d\u044d\u0445 \u0448\u0438\u043d\u0433\u044d\u043d",
    description: "Толгойн арьсыг тайвшруулж тэжээдэг өтгөн ургамлын хандивч бөгөөд үс эрүүл өсөхөд тусална. Үсний үндэсний хоол тэжээлийг нэмэгдүүлж, үс унахаас сэргийлнэ. Байгалийн ургамлын хандууд агуулсан тул толгойн арьсыг зөөлрүүлнэ. Өдөр бүр шампуний дараа толгойн арьсанд шүршиж хэрэглэнэ.",
    shortDescription: "Хуйх тэжээх шингэн",
    price: 18000,
    currency: "MNT",
    image: "/products/zheanji-scalp-solution.jpg",
    category: "haircare",
    subcategory: "scalp",
    tags: ["Scalp Care", "Plant Extract", "Treatment"],
    rating: 4.5,
    reviewCount: 62,
    inStock: true,
    size: "30ml",
  },
  // ─── MAKEUP ───
  {
    id: "12",
    slug: "sunray-cushion-compact",
    brand: "Sunray",
    name: "\u041f\u0440\u0435\u043c\u0438\u0443\u043c \u043a\u0443\u0448\u043d \u043d\u04af\u04af\u0440\u043d\u0438\u0439 \u04af\u043d\u0434\u044d\u0441",
    description: "Толь, түрхүүртэй премиум кушн компакт бөгөөд хар алтан баглаатай. Байгалийн чийглэг өнгөтэй тул арьсыг гэрэлтэй, эрүүл харагдуулна. Хөнгөн бүрхэлт нь арьсны согогийг далдалж, жигд өнгө өгнө. Өдөржингөө тослог гялалзалгүйгээр бат удаан барина.",
    shortDescription: "Премиум кушн компакт",
    price: 68000,
    currency: "MNT",
    image: "/products/sunray-cushion-compact.jpg",
    category: "makeup",
    subcategory: "foundation",
    tags: ["Foundation", "Cushion", "Dewy"],
    badge: "new",
    rating: 4.7,
    reviewCount: 95,
    inStock: true,
  },
  // ─── DEVICES ───
  {
    id: "13",
    slug: "sunray-skin-scrubber",
    brand: "Sunray",
    name: "\u0425\u044d\u0442 \u0430\u0432\u0438\u0430\u043d \u0430\u0440\u044c\u0441 \u0446\u044d\u0432\u044d\u0440\u043b\u044d\u0433\u0447",
    description: "Дижитал дэлгэцтэй мэргэжлийн арьс цэвэрлэгч бөгөөд нүхийг гүнзгий цэвэрлэнэ. Хэт авианы технологи ашиглан арьсны үхсэн эсүүдийг зөөлөн арилгана. Арьсны нүх цоргыг нарийсгаж, гадаргууг тэгш болгоно. Долоо хоногт 2-3 удаа хэрэглэхэд арьс цэвэрхэн, гэрэлтэй болно.",
    shortDescription: "Хэт авиан арьс цэвэрлэгч",
    price: 89000,
    currency: "MNT",
    image: "/products/sunray-skin-scrubber.jpg",
    category: "devices",
    subcategory: "cleansing-device",
    tags: ["Ultrasonic", "Deep Cleanse", "Professional"],
    badge: "bestseller",
    rating: 4.8,
    reviewCount: 134,
    inStock: true,
  },
  {
    id: "14",
    slug: "kskin-facial-mist-sprayer",
    brand: "K-SKIN",
    name: "\u041d\u0430\u043d\u043e \u043d\u04af\u04af\u0440\u043d\u0438\u0439 \u0448\u04af\u0440\u0448\u04af\u04af\u0440",
    description: "Явж яваахад чийгшүүлэх зөөвөрлөх нано шүршүүр бөгөөд цэнэглэдэг батарейтай. Нано хэмжээний усны дуслууд арьсны гүнд нэвтэрч чийгшүүлнэ. Макияжны дээрээс хэрэглэхэд макияж гүйлгэхгүй. Оффис, нислэг, аялалд авч явахад тохиромжтой жижиг хэмжээтэй.",
    shortDescription: "Зөөвөрлөх нано шүршүүр",
    price: 45000,
    currency: "MNT",
    image: "/products/kskin-mist-sprayer.jpg",
    category: "devices",
    subcategory: "treatment-device",
    tags: ["Portable", "Hydration", "Nano Mist"],
    rating: 4.4,
    reviewCount: 76,
    inStock: true,
  },
  {
    id: "15",
    slug: "ems-beauty-device",
    brand: "Sunray",
    name: "EMS \u0433\u043e\u043e \u0441\u0430\u0439\u0436\u0440\u0443\u0443\u043b\u0430\u0433\u0447",
    description: "EP, EMS, Beat, Sonic режимүүдтэй олон чидэлтэй төхөөрөмж бөгөөд гэртээ мэргэжлийн арчилгаа хийх боломжтой. Нүүрний булчинг чангалж, арьсны уян хатныг сэргээнэ. Серум болон тосны шингэлтийг сайжруулж, арчилгааны үр дүнг нэмэгдүүлнэ. Тогтмол хэрэглэснээр нүүрний дүрс тодорхой болно.",
    shortDescription: "EMS гоо сайхны төхөөрөмж",
    price: 125000,
    currency: "MNT",
    image: "/products/ems-beauty-device.jpg",
    category: "devices",
    subcategory: "treatment-device",
    tags: ["EMS", "Sonic", "Professional"],
    rating: 4.6,
    reviewCount: 58,
    inStock: true,
  },
  {
    id: "16",
    slug: "ipl-hair-removal-device",
    brand: "Sunray",
    name: "IPL \u04af\u0441 \u0437\u0430\u0439\u043b\u0443\u0443\u043b\u0430\u0433\u0447",
    description: "Олон эрчимтэй мэргэжлийн IPL үс зайлуулагч бөгөөд гэртээ аюулгүй хэрэглэнэ. Гэрлийн импульс технологи ашиглан үсний үндэсийг сулруулна. 5 шатлалт эрчимтэй тул арьсны төрөл бүрт тохируулж хэрэглэнэ. Тогтмол хэрэглэснээр үс нарийсаж, өсөлт удааширна.",
    shortDescription: "IPL үс зайлуулагч",
    price: 289000,
    currency: "MNT",
    image: "/products/ipl-hair-removal.jpg",
    category: "devices",
    subcategory: "treatment-device",
    tags: ["IPL", "Hair Removal", "Professional"],
    rating: 4.7,
    reviewCount: 43,
    inStock: true,
  },
  // ─── SALON PRODUCTS ───
  {
    id: "17",
    slug: "young-sister-perilla-film-powder",
    brand: "YOUNG SISTER",
    name: "\u0427\u0438\u0439\u0433\u0448\u04af\u04af\u043b\u044d\u0445 \u0437\u04e9\u04e9\u043b\u04e9\u043d \u043d\u0443\u043d\u0442\u0430\u0433",
    description: "Салоны 1кг зөөлөн нунтаг бөгөөд Ази эмэгтэйчүүдийн арьсанд зориулсан. Усанд хольж маск болгон хэрэглэхэд арьсыг гүнзгий чийгшүүлнэ. Ургамлын гаралтай найрлага нь арьсыг тайвшруулж, үрэвслийг бууруулна. Мэргэжлийн гоо сайхны салон болон спа-д зориулсан том хэмжээтэй.",
    shortDescription: "Салоны чийгшүүлэх нунтаг",
    price: 75000,
    currency: "MNT",
    image: "/products/young-sister-film-powder.jpg",
    category: "skincare",
    subcategory: "care",
    tags: ["Salon", "Professional", "1kg"],
    rating: 4.5,
    reviewCount: 29,
    inStock: true,
    size: "1kg",
  },
  // ─── SETS ───
  {
    id: "18",
    slug: "rexri-creative-complete-set",
    brand: "Rexri",
    name: "\u041a\u0440\u0435\u0430\u0442\u0438\u0432 \u0431\u04af\u0440\u044d\u043d \u0431\u0430\u0433\u0446",
    description: "Rexri арьс арчилгааны бүрэн цуглалт бөгөөд тоник, серум, крем, чийгшүүлэх тоник, маск, нарны тос багтсан. Премиум улаан бэлгийн хайрцагтай тул бэлэг болгоход тохиромжтой. Бүх бүтээгдэхүүнийг хамтад нь хэрэглэснээр арчилгааны үр дүн хамгийн өндөр байна. Тус тусдаа худалдаж авснаас хэмнэлттэй үнэтэй.",
    shortDescription: "Бүрэн арчилгааны багц",
    price: 185000,
    originalPrice: 220000,
    currency: "MNT",
    image: "/products/rexri-complete-set.jpg",
    category: "sets",
    tags: ["Gift Set", "Complete Routine", "Premium"],
    badge: "sale",
    badges: ["sale"],
    discountPercent: 15,
    saleEndsAt: "2026-03-20T23:59:59",
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
  },
  {
    id: "19",
    slug: "rexri-creative-toner",
    brand: "Rexri",
    name: "\u041a\u0440\u0435\u0430\u0442\u0438\u0432 \u0442\u043e\u043d\u0438\u043a",
    description: "Rexri Creative цувралын премиум тоник бөгөөд нүүр угаасны дараа арьсыг тэнцвэржүүлнэ. Арьсны pH түвшинг хэвийн байлгаж, дараагийн арчилгааны бүтээгдэхүүнийг илүү сайн шингэхэд туслана. Хиалурон хүчил болон витамин агуулсан тул чийгшүүлэх үйлдэлтэй. Өглөө оройн арчилгааны эхний шатанд хэрэглэнэ.",
    shortDescription: "Премиум тэнцвэржүүлэх тоник",
    price: 48000,
    currency: "MNT",
    image: "/products/rexri-creative-toner.jpg",
    category: "skincare",
    subcategory: "care",
    tags: ["Toner", "Premium", "Hydrating"],
    rating: 4.6,
    reviewCount: 55,
    inStock: true,
    size: "120ml",
  },
  {
    id: "20",
    slug: "rexri-creative-serum",
    brand: "Rexri",
    name: "\u041a\u0440\u0435\u0430\u0442\u0438\u0432 \u0441\u0435\u0440\u0443\u043c",
    description: "Rexri Creative цувралын өтгөн серум бөгөөд идэвхитэй орцуулгуудаар олон асуудлыг шийднэ. Арьсны өнгийг тэгшилж, толбо, үрчлээг бууруулна. Өндөр концентрацитай найрлага тул бага хэмжээгээр хэрэглэхэд хангалттай. Тоникийн дараа, кремний өмнө хэрэглэхэд хамгийн сайн үр дүн өгнө.",
    shortDescription: "Өндөр концентрацитай серум",
    price: 52000,
    currency: "MNT",
    image: "/products/rexri-creative-serum.jpg",
    category: "skincare",
    subcategory: "care",
    tags: ["Serum", "Treatment", "Premium"],
    rating: 4.7,
    reviewCount: 48,
    inStock: true,
    size: "40ml",
  },
];

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.badge);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.badge === "bestseller");
}
