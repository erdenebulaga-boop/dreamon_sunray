export type Product = {
  id: string;
  slug: string;
  brand: string;
  name: {
    en: string;
    mn: string;
  };
  description: {
    en: string;
    mn: string;
  };
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  images?: string[];
  category: Category;
  tags: string[];
  badge?: "new" | "bestseller" | "sale";
  rating: number;
  reviewCount: number;
  inStock: boolean;
  size?: string;
  howToUse?: { en: string; mn: string };
  ingredients?: { en: string; mn: string };
  storage?: { en: string; mn: string };
};

export type Category =
  | "skincare"
  | "haircare"
  | "makeup"
  | "devices"
  | "sets";

export const categories: Record<
  Category,
  { en: string; mn: string; slug: string }
> = {
  skincare: {
    en: "Skincare",
    mn: "\u0410\u0440\u044c\u0441 \u0430\u0440\u0447\u0438\u043b\u0433\u0430\u0430",
    slug: "skincare",
  },
  haircare: {
    en: "Haircare",
    mn: "\u04ae\u0441\u043d\u0438\u0439 \u0430\u0440\u0447\u0438\u043b\u0433\u0430\u0430",
    slug: "haircare",
  },
  makeup: {
    en: "Makeup",
    mn: "\u041d\u04af\u04af\u0440\u043d\u0438\u0439 \u0431\u0443\u0434\u0430\u043b\u0442",
    slug: "makeup",
  },
  devices: {
    en: "Devices",
    mn: "\u0422\u04e9\u0445\u04e9\u04e9\u0440\u04e9\u043c\u0436",
    slug: "devices",
  },
  sets: {
    en: "Sets & Gifts",
    mn: "\u0411\u0430\u0433\u0446 & \u0411\u044d\u043b\u044d\u0433",
    slug: "sets",
  },
};

export const products: Product[] = [
  // ─── SKINCARE ───
  {
    id: "1",
    slug: "rexri-daily-sun-cream",
    brand: "Rexri",
    name: {
      en: "Daily Sun Cream SPF50+ PA+++",
      mn: "\u04e8\u0434\u04e9\u0440 \u0442\u0443\u0442\u043c\u044b\u043d \u043d\u0430\u0440\u043d\u044b \u0442\u043e\u0441",
    },
    description: {
      en: "Lightweight daily sun protection with SPF50+ PA+++ rating. Non-greasy formula absorbs quickly, leaving no white cast. Perfect for everyday use under makeup.",
      mn: "\u04e8\u0434\u04e9\u0440 \u0442\u0443\u0442\u043c\u044b\u043d \u0445\u04e9\u043d\u0433\u04e9\u043d \u0431\u04af\u0442\u044d\u044d\u0433\u0434\u044d\u0445\u04af\u04af\u043d. SPF50+ PA+++ \u0445\u0430\u043c\u0433\u0430\u0430\u043b\u0430\u043b\u0442\u0442\u0430\u0439. \u0422\u043e\u0441\u043b\u043e\u0433 \u0431\u0438\u0448 \u0442\u043e\u043c\u044c\u0451\u043e\u043b\u043e\u043e\u0440 \u0445\u0443\u0440\u0434\u0430\u043d \u0448\u0438\u043d\u0433\u044d\u043d\u044d.",
    },
    price: 45000,
    currency: "MNT",
    image: "/products/rexri-sun-cream.jpg",
    category: "skincare",
    tags: ["SPF", "UV Protection", "Daily"],
    badge: "bestseller",
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    size: "50ml",
    howToUse: {
      en: "Apply generously to face and neck 15 minutes before sun exposure. Reapply every 2-3 hours for continued protection.",
      mn: "Нарны хэт ягаан туяанаас арьсыг хамгаална. Ургамлын ханд агуулсан тул дав Өглөөний арьс арчилгааны хамгийн сүүлийн шатандаа хэрэглэнэ. Дараах тохиолдолд 2-3 цаг тутамд дахин түрхнэ.",
    },
    ingredients: {
      en: "Water, Ethylhexyl Methoxycinnamate, Ethylhexyl Salicylate, Titanium Dioxide, Niacinamide, Glycerin, Butylene Glycol, Cetearyl Alcohol",
      mn: "Water, Ethylhexyl Mehoxycinnamate, Ethylhexyl Salicylate, Titanium Dioxide, Niacinamide, Glycerin, Butylene Glycol, Cetearyl Alcohol",
    },
    storage: {
      en: "Store in a cool, dry place away from direct sunlight. Keep the cap tightly closed after use.",
      mn: "Эрдсээр баялаг усаар хийгдсэн тул коллаген болон идэвхтэй найрлагууд агуулна. Хамгийн багадаа 30 см зайд байлгаад нүүрэндээ 3-4 удаа шүршинэ.",
    },
  },
  {
    id: "2",
    slug: "rexri-daily-moisture-toner",
    brand: "Rexri",
    name: {
      en: "Daily Moisture Toner",
      mn: "\u04e8\u0434\u04e9\u0440 \u0447\u0438\u0439\u0433\u0448\u04af\u04af\u043b\u044d\u0445 \u0442\u043e\u043d\u0438\u043a",
    },
    description: {
      en: "Plant-based hydrating toner that moisturizes rough skin. Gentle formula suitable for all skin types. 200ml bottle.",
      mn: "\u0423\u0440\u0433\u0430\u043c\u043b\u044b\u043d \u0433\u0430\u0440\u0430\u043b\u0442\u0430\u0439 \u0447\u0438\u0439\u0433\u0448\u04af\u04af\u043b\u044d\u0445 \u0442\u043e\u043d\u0438\u043a. \u0425\u0443\u0443\u0440\u0430\u0439 \u0430\u0440\u044c\u0441\u044b\u0433 \u0437\u04e9\u04e9\u043b\u04e9\u043d \u0447\u0438\u0439\u0433\u0448\u04af\u04af\u043b\u043d\u044d.",
    },
    price: 38000,
    currency: "MNT",
    image: "/products/rexri-moisture-toner.jpg",
    category: "skincare",
    tags: ["Hydrating", "Toner", "Plant-based"],
    badge: "new",
    rating: 4.6,
    reviewCount: 87,
    inStock: true,
    size: "200ml",
    howToUse: {
      en: "After cleansing, apply toner to a cotton pad and gently sweep across face and neck. Can also be patted directly onto skin with hands.",
      mn: "Нүүр угаасны дараа хөвөн дээр тоник түрхэж нүүр, хүзүү рүү зөөлөн арчина. Гараараа шууд нүүрэндээ тавьж хэрэглэж болно.",
    },
    ingredients: {
      en: "Aloe Barbadensis Leaf Water, Water, Dipropylene Glycol, Glycerin, Panthenol, Sodium Hyaluronate, Centella Asiatica Extract",
      mn: "Aloe Barbadensis Leaf Water, Water, Dipropylene Glycol, Glycerin, Panthenol, Sodium Hyaluronate, Centella Asiatica Extract",
    },
    storage: {
      en: "Store at room temperature. Avoid extreme heat or cold. Use within 12 months of opening.",
      mn: "Өрөөний температурт хадгална. Хэт халуун, хүйтнээс хамгаална. Нээснээс хойш 12 сарын дотор хэрэглэнэ.",
    },
  },
  {
    id: "3",
    slug: "rexri-moisture-glow-mask",
    brand: "Rexri",
    name: {
      en: "Moisture Glow Mask",
      mn: "\u0413\u044d\u0440\u044d\u043b\u0442\u044d\u0439 \u0447\u0438\u0439\u0433\u0448\u04af\u04af\u043b\u044d\u0445 \u043c\u0430\u0441\u043a",
    },
    description: {
      en: "Sheet mask for brightening and deep hydration. Infused with moisturizing essence for radiant, glowing skin.",
      mn: "\u0413\u044d\u0440\u044d\u043b\u0442\u04af\u04af\u043b\u044d\u0445 \u0431\u0430 \u0433\u04af\u043d\u0437\u0433\u0438\u0439 \u0447\u0438\u0439\u0433\u0448\u04af\u04af\u043b\u044d\u0445 \u043c\u0430\u0441\u043a. \u0427\u0438\u0439\u0433\u0448\u04af\u04af\u043b\u044d\u0445 \u0448\u04af\u04af\u0441\u044d\u044d\u0440 \u0431\u0430\u044f\u0436\u0443\u0443\u043b\u0441\u0430\u043d.",
    },
    price: 8500,
    currency: "MNT",
    image: "/products/rexri-glow-mask.jpg",
    category: "skincare",
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
    name: {
      en: "Water Active Heart Favour Mask",
      mn: "\u0423\u0441\u0430\u043d \u0438\u0434\u044d\u0432\u0445\u0438\u0436\u04af\u04af\u043b\u044d\u0445 \u043c\u0430\u0441\u043a",
    },
    description: {
      en: "Anastatinca water active mask with deep moisturizing properties. Comes in single sheet or box of 6.",
      mn: "\u0413\u04af\u043d\u0437\u0433\u0438\u0439 \u0447\u0438\u0439\u0433\u0448\u04af\u04af\u043b\u044d\u0445 \u04af\u0439\u043b\u0434\u044d\u043b\u0442\u044d\u0439 \u0443\u0441\u0430\u043d \u0438\u0434\u044d\u0432\u0445\u0438\u0442 \u043c\u0430\u0441\u043a.",
    },
    price: 12000,
    currency: "MNT",
    image: "/products/keepkiss-water-mask.jpg",
    category: "skincare",
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
    name: {
      en: "Medical Repair Patches",
      mn: "\u042d\u043c\u043d\u044d\u043b\u0433\u044d\u044d\u043d\u0438\u0439 \u043d\u04e9\u0445\u04e9\u043d \u043d\u0430\u0430\u043b\u0442",
    },
    description: {
      en: "Sterile medical-grade face patches for wound care and post-treatment skin recovery. 5 patches per box.",
      mn: "\u0410\u0440\u0438\u0443\u043d \u044d\u043c\u043d\u044d\u043b\u0433\u044d\u044d\u043d\u0438\u0439 \u0437\u044d\u0440\u0433\u0438\u0439\u043d \u043d\u04af\u04af\u0440\u043d\u0438\u0439 \u043d\u0430\u0430\u043b\u0442. \u042d\u043c\u0447\u0438\u043b\u0433\u044d\u044d\u043d\u0438\u0439 \u0434\u0430\u0440\u0430\u0430\u0445 \u0430\u0440\u044c\u0441 \u043d\u04e9\u0445\u04e9\u043d \u0441\u044d\u0440\u0433\u044d\u044d\u043d\u044d.",
    },
    price: 25000,
    currency: "MNT",
    image: "/products/keepkiss-repair-patches.jpg",
    category: "skincare",
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
    name: {
      en: "Ceramide Freeze Dried Facial Mask",
      mn: "\u0426\u0435\u0440\u0430\u043c\u0438\u0434 \u0445\u04e9\u043b\u0434\u04e9\u04e9 \u0445\u0430\u0442\u0430\u0430\u0441\u0430\u043d \u043c\u0430\u0441\u043a",
    },
    description: {
      en: "Advanced freeze-dried ceramide mask that activates with water. Strengthens skin barrier and provides intense hydration.",
      mn: "\u0423\u0441\u0430\u0430\u0440 \u0438\u0434\u044d\u0432\u0445\u0438\u0436\u0434\u044d\u0433 \u0445\u04e9\u043b\u0434\u04e9\u04e9 \u0445\u0430\u0442\u0430\u0430\u0441\u0430\u043d \u0446\u0435\u0440\u0430\u043c\u0438\u0434 \u043c\u0430\u0441\u043a. \u0410\u0440\u044c\u0441\u043d\u044b \u0445\u0430\u043c\u0433\u0430\u0430\u043b\u0430\u043b\u0442\u044b\u043d \u0434\u0430\u0432\u0445\u0430\u0440\u0433\u044b\u0433 \u0431\u044d\u0445\u0436\u04af\u04af\u043b\u043d\u044d.",
    },
    price: 35000,
    currency: "MNT",
    image: "/products/fucuishi-ceramide-mask.jpg",
    category: "skincare",
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
    name: {
      en: "Black Gold Reviving Face Mask",
      mn: "\u0425\u0430\u0440 \u0430\u043b\u0442 \u0441\u044d\u0440\u0433\u044d\u044d\u0445 \u043c\u0430\u0441\u043a",
    },
    description: {
      en: "Premium revitalizing face mask with black gold complex. Deeply nourishes and rejuvenates tired skin.",
      mn: "\u0425\u0430\u0440 \u0430\u043b\u0442\u043d\u044b \u0446\u043e\u0433\u0446\u043e\u043b\u0431\u043e\u0440\u0442\u043e\u0439 \u043f\u0440\u0435\u043c\u0438\u0443\u043c \u043c\u0430\u0441\u043a. \u042f\u0434\u0430\u0440\u0441\u0430\u043d \u0430\u0440\u044c\u0441\u044b\u0433 \u0433\u04af\u043d\u0437\u0433\u0438\u0439 \u0442\u044d\u0436\u044d\u044d\u0436 \u0441\u044d\u0440\u0433\u044d\u044d\u043d\u044d.",
    },
    price: 42000,
    currency: "MNT",
    image: "/products/fucuishi-black-gold-mask.jpg",
    category: "skincare",
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
    name: {
      en: "Germ Protecting Milk",
      mn: "\u0425\u0430\u043c\u0433\u0430\u0430\u043b\u0430\u043b\u0442\u044b\u043d \u0441\u04af\u04af",
    },
    description: {
      en: "Gentle protecting milk lotion that shields and nourishes skin. Lightweight, fast-absorbing formula.",
      mn: "\u0410\u0440\u044c\u0441\u044b\u0433 \u0445\u0430\u043c\u0433\u0430\u0430\u043b\u0436 \u0442\u044d\u0436\u044d\u044d\u0434\u044d\u0433 \u0437\u04e9\u04e9\u043b\u04e9\u043d \u0441\u04af\u04af. \u0425\u04e9\u043d\u0433\u04e9\u043d, \u0445\u0443\u0440\u0434\u0430\u043d \u0448\u0438\u043d\u0433\u044d\u0434\u044d\u0433.",
    },
    price: 32000,
    currency: "MNT",
    image: "/products/yuyun-protecting-milk.jpg",
    category: "skincare",
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
    name: {
      en: "Tianqi Protection Mask",
      mn: "\u0422\u0438\u0430\u043d\u0447\u0438 \u0445\u0430\u043c\u0433\u0430\u0430\u043b\u0430\u043b\u0442\u044b\u043d \u043c\u0430\u0441\u043a",
    },
    description: {
      en: "Jar mask for skin protection, maintenance, and beautification. 100g of nourishing cream mask.",
      mn: "\u0410\u0440\u044c\u0441\u044b\u0433 \u0445\u0430\u043c\u0433\u0430\u0430\u043b\u0436, \u0442\u044d\u0436\u044d\u044d\u0436, \u0433\u043e\u043e \u04af\u0437\u044d\u0441\u0433\u044d\u043b\u044d\u043d\u0442\u044d\u0439 \u0431\u043e\u043b\u0433\u043e\u0434\u043e\u0433 \u043a\u0440\u0435\u043c \u043c\u0430\u0441\u043a.",
    },
    price: 28000,
    currency: "MNT",
    image: "/products/xiuting-tianqi-mask.jpg",
    category: "skincare",
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
    name: {
      en: "Light & Shiny Anti-Dandruff Shampoo",
      mn: "\u0425\u04e9\u043d\u0433\u04e9\u043d \u0433\u044d\u0440\u044d\u043b\u0442\u044d\u0439 \u0448\u0430\u043c\u043f\u0443\u043d\u044c",
    },
    description: {
      en: "Salon-grade anti-itch anti-dandruff shampoo. Large 720g pump bottle for professional and home use.",
      mn: "\u0421\u0430\u043b\u043e\u043d\u044b \u0437\u044d\u0440\u0433\u0438\u0439\u043d \u04af\u0445\u044d\u044d\u0441 \u0445\u0430\u043c\u0433\u0430\u0430\u043b\u0430\u0445, \u0445\u0443\u0439\u0445\u044d\u043b\u0442 \u044d\u0441\u0440\u0433 \u0448\u0430\u043c\u043f\u0443\u043d\u044c. 720\u0433 \u0442\u043e\u043c \u043b\u043e\u043d\u0445\u0442\u043e\u0439.",
    },
    price: 55000,
    currency: "MNT",
    image: "/products/sunray-shampoo-blue.jpg",
    category: "haircare",
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
    name: {
      en: "Plant Extract Scalp Soothing Solution",
      mn: "\u0422\u043e\u043b\u0433\u043e\u0439\u043d \u0430\u0440\u044c\u0441 \u0442\u044d\u0436\u044d\u044d\u0445 \u0448\u0438\u043d\u0433\u044d\u043d",
    },
    description: {
      en: "Concentrated plant extract solution for scalp soothing and nourishment. Helps with scalp irritation and promotes healthy hair growth.",
      mn: "\u0422\u043e\u043b\u0433\u043e\u0439\u043d \u0430\u0440\u044c\u0441\u044b\u0433 \u0442\u0430\u0439\u0432\u0448\u0440\u0443\u0443\u043b\u0436 \u0442\u044d\u0436\u044d\u044d\u0434\u044d\u0433 \u04e9\u0442\u0433\u04e9\u043d \u0443\u0440\u0433\u0430\u043c\u043b\u044b\u043d \u0445\u0430\u043d\u0434\u0438\u0432\u0447. \u04ae\u0441 \u044d\u0440\u04af\u04af\u043b \u04e9\u0441\u04e9\u0445\u04e9\u0434 \u0442\u0443\u0441\u0430\u043b\u043d\u0430.",
    },
    price: 18000,
    currency: "MNT",
    image: "/products/zheanji-scalp-solution.jpg",
    category: "haircare",
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
    name: {
      en: "Luxury Cushion Compact Foundation",
      mn: "\u041f\u0440\u0435\u043c\u0438\u0443\u043c \u043a\u0443\u0448\u043d \u043d\u04af\u04af\u0440\u043d\u0438\u0439 \u04af\u043d\u0434\u044d\u0441",
    },
    description: {
      en: "Premium cushion compact with mirror and applicator pad. Black & gold luxury packaging. Buildable coverage with a natural dewy finish.",
      mn: "\u0422\u043e\u043b\u044c, \u0442\u04af\u0440\u0445\u04af\u04af\u0440\u0442\u044d\u0439 \u043f\u0440\u0435\u043c\u0438\u0443\u043c \u043a\u0443\u0448\u043d \u043a\u043e\u043c\u043f\u0430\u043a\u0442. \u0425\u0430\u0440 \u0430\u043b\u0442\u0430\u043d \u0431\u0430\u0433\u043b\u0430\u0430\u0442\u0430\u0439. \u0411\u0430\u0439\u0433\u0430\u043b\u0438\u0439\u043d \u0447\u0438\u0439\u0433\u043b\u044d\u0433 \u04e9\u043d\u0433\u04e9\u0442\u044d\u0439.",
    },
    price: 68000,
    currency: "MNT",
    image: "/products/sunray-cushion-compact.jpg",
    category: "makeup",
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
    name: {
      en: "Ultrasonic Skin Scrubber",
      mn: "\u0425\u044d\u0442 \u0430\u0432\u0438\u0430\u043d \u0430\u0440\u044c\u0441 \u0446\u044d\u0432\u044d\u0440\u043b\u044d\u0433\u0447",
    },
    description: {
      en: "Professional ultrasonic skin scrubber with digital display. Deep cleanses pores, removes blackheads, and enhances product absorption.",
      mn: "\u0414\u0438\u0436\u0438\u0442\u0430\u043b \u0434\u044d\u043b\u0433\u044d\u0446\u0442\u044d\u0439 \u043c\u044d\u0440\u0433\u044d\u0436\u043b\u0438\u0439\u043d \u0430\u0440\u044c\u0441 \u0446\u044d\u0432\u044d\u0440\u043b\u044d\u0433\u0447. \u041d\u04af\u0445\u0438\u0439\u0433 \u0433\u04af\u043d\u0437\u0433\u0438\u0439 \u0446\u044d\u0432\u044d\u0440\u043b\u044d\u043d\u044d.",
    },
    price: 89000,
    currency: "MNT",
    image: "/products/sunray-skin-scrubber.jpg",
    category: "devices",
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
    name: {
      en: "Nano Facial Mist Sprayer",
      mn: "\u041d\u0430\u043d\u043e \u043d\u04af\u04af\u0440\u043d\u0438\u0439 \u0448\u04af\u0440\u0448\u04af\u04af\u0440",
    },
    description: {
      en: "Portable nano mist sprayer for instant hydration on-the-go. Rechargeable with elegant green design.",
      mn: "\u042f\u0432\u0436 \u044f\u0432\u0430\u0445\u0430\u0434 \u0447\u0438\u0439\u0433\u0448\u04af\u04af\u043b\u044d\u0445 \u0437\u04e9\u04e9\u0432\u04e9\u0440\u043b\u04e9\u0445 \u043d\u0430\u043d\u043e \u0448\u04af\u0440\u0448\u04af\u04af\u0440. \u0426\u044d\u043d\u044d\u0433\u043b\u044d\u0434\u044d\u0433 \u0431\u0430\u0442\u0430\u0440\u0435\u0439\u0442\u0430\u0439.",
    },
    price: 45000,
    currency: "MNT",
    image: "/products/kskin-mist-sprayer.jpg",
    category: "devices",
    tags: ["Portable", "Hydration", "Nano Mist"],
    rating: 4.4,
    reviewCount: 76,
    inStock: true,
  },
  {
    id: "15",
    slug: "ems-beauty-device",
    brand: "Sunray",
    name: {
      en: "EMS Sonic Beauty Device",
      mn: "EMS \u0433\u043e\u043e \u0441\u0430\u0439\u0436\u0440\u0443\u0443\u043b\u0430\u0433\u0447",
    },
    description: {
      en: "Multi-function beauty device with EP, EMS, Beat, and Sonic modes. Professional-grade facial treatment at home.",
      mn: "EP, EMS, Beat, Sonic \u0440\u0435\u0436\u0438\u043c\u04af\u04af\u0434\u0442\u044d\u0439 \u043e\u043b\u043e\u043d \u0447\u0438\u0434\u044d\u043b\u0442\u044d\u0439 \u0442\u04e9\u0445\u04e9\u04e9\u0440\u04e9\u043c\u0436. \u0413\u044d\u0440\u0442\u044d\u044d \u043c\u044d\u0440\u0433\u044d\u0436\u043b\u0438\u0439\u043d \u0430\u0440\u0447\u0438\u043b\u0433\u0430\u0430.",
    },
    price: 125000,
    currency: "MNT",
    image: "/products/ems-beauty-device.jpg",
    category: "devices",
    tags: ["EMS", "Sonic", "Professional"],
    rating: 4.6,
    reviewCount: 58,
    inStock: true,
  },
  {
    id: "16",
    slug: "ipl-hair-removal-device",
    brand: "Sunray",
    name: {
      en: "IPL Hair Removal Device",
      mn: "IPL \u04af\u0441 \u0437\u0430\u0439\u043b\u0443\u0443\u043b\u0430\u0433\u0447",
    },
    description: {
      en: "Professional IPL hair removal device with multiple intensity levels. Safe and effective for home use.",
      mn: "\u041e\u043b\u043e\u043d \u044d\u0440\u0447\u0438\u043c\u0442\u044d\u0439 \u043c\u044d\u0440\u0433\u044d\u0436\u043b\u0438\u0439\u043d IPL \u04af\u0441 \u0437\u0430\u0439\u043b\u0443\u0443\u043b\u0430\u0433\u0447. \u0413\u044d\u0440\u0442\u044d\u044d \u0430\u044e\u0443\u043b\u0433\u04af\u0439 \u0445\u044d\u0440\u044d\u0433\u043b\u044d\u043d\u044d.",
    },
    price: 289000,
    currency: "MNT",
    image: "/products/ipl-hair-removal.jpg",
    category: "devices",
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
    name: {
      en: "Perilla Moisturizing Soft Film Powder",
      mn: "\u0427\u0438\u0439\u0433\u0448\u04af\u04af\u043b\u044d\u0445 \u0437\u04e9\u04e9\u043b\u04e9\u043d \u043d\u0443\u043d\u0442\u0430\u0433",
    },
    description: {
      en: "Professional salon-size 1kg soft film powder. Developed for Asian skin. Soothes, moisturizes, and rejuvenates.",
      mn: "\u0421\u0430\u043b\u043e\u043d\u044b 1\u043a\u0433 \u0437\u04e9\u04e9\u043b\u04e9\u043d \u043d\u0443\u043d\u0442\u0430\u0433. \u0410\u0437\u0438 \u044d\u043c\u044d\u0433\u0442\u044d\u0439\u0447\u04af\u04af\u0434\u0438\u0439\u043d \u0430\u0440\u044c\u0441\u0430\u043d\u0434 \u0437\u043e\u0440\u0438\u0443\u043b\u0441\u0430\u043d.",
    },
    price: 75000,
    currency: "MNT",
    image: "/products/young-sister-film-powder.jpg",
    category: "skincare",
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
    name: {
      en: "Creative Complete Skincare Set",
      mn: "\u041a\u0440\u0435\u0430\u0442\u0438\u0432 \u0431\u04af\u0440\u044d\u043d \u0431\u0430\u0433\u0446",
    },
    description: {
      en: "Complete Rexri skincare collection: Creative Toner, Creative Serum, Creative Cream, Moisture Toner, Glow Mask, and Daily Sun Cream in premium red gift box.",
      mn: "Rexri \u0430\u0440\u044c\u0441 \u0430\u0440\u0447\u0438\u043b\u0433\u0430\u0430\u043d\u044b \u0431\u04af\u0440\u044d\u043d \u0446\u0443\u0433\u043b\u0430\u043b\u0442: \u0422\u043e\u043d\u0438\u043a, \u0421\u0435\u0440\u0443\u043c, \u041a\u0440\u0435\u043c, \u0427\u0438\u0439\u0433\u0448\u04af\u04af\u043b\u044d\u0445 \u0442\u043e\u043d\u0438\u043a, \u041c\u0430\u0441\u043a, \u041d\u0430\u0440\u043d\u044b \u0442\u043e\u0441. \u041f\u0440\u0435\u043c\u0438\u0443\u043c \u0443\u043b\u0430\u0430\u043d \u0431\u044d\u043b\u0433\u0438\u0439\u043d \u0445\u0430\u0439\u0440\u0446\u0430\u0433\u0442\u0430\u0439.",
    },
    price: 185000,
    originalPrice: 220000,
    currency: "MNT",
    image: "/products/rexri-complete-set.jpg",
    category: "sets",
    tags: ["Gift Set", "Complete Routine", "Premium"],
    badge: "sale",
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
  },
  {
    id: "19",
    slug: "rexri-creative-toner",
    brand: "Rexri",
    name: {
      en: "Creative Toner",
      mn: "\u041a\u0440\u0435\u0430\u0442\u0438\u0432 \u0442\u043e\u043d\u0438\u043a",
    },
    description: {
      en: "Premium toner from the Rexri Creative line. Balances and hydrates skin after cleansing.",
      mn: "Rexri Creative \u0446\u0443\u0432\u0440\u0430\u043b\u044b\u043d \u043f\u0440\u0435\u043c\u0438\u0443\u043c \u0442\u043e\u043d\u0438\u043a. \u041d\u04af\u04af\u0440 \u0443\u0433\u0430\u0430\u0441\u043d\u044b \u0434\u0430\u0440\u0430\u0430 \u0430\u0440\u044c\u0441\u044b\u0433 \u0442\u044d\u043d\u0446\u0432\u044d\u0440\u0436\u04af\u04af\u043b\u043d\u044d.",
    },
    price: 48000,
    currency: "MNT",
    image: "/products/rexri-creative-toner.jpg",
    category: "skincare",
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
    name: {
      en: "Creative Serum",
      mn: "\u041a\u0440\u0435\u0430\u0442\u0438\u0432 \u0441\u0435\u0440\u0443\u043c",
    },
    description: {
      en: "Concentrated treatment serum from the Rexri Creative line. Targets multiple skin concerns with potent active ingredients.",
      mn: "Rexri Creative \u0446\u0443\u0432\u0440\u0430\u043b\u044b\u043d \u04e9\u0442\u0433\u04e9\u043d \u0441\u0435\u0440\u0443\u043c. \u0418\u0434\u044d\u0432\u0445\u0438\u0442\u044d\u0439 \u043e\u0440\u0446\u0443\u0443\u043b\u0433\u0443\u0443\u0434\u0430\u0430\u0440 \u043e\u043b\u043e\u043d \u0430\u0441\u0443\u0443\u0434\u043b\u044b\u0433 \u0448\u0438\u0439\u0434\u043d\u044d.",
    },
    price: 52000,
    currency: "MNT",
    image: "/products/rexri-creative-serum.jpg",
    category: "skincare",
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
