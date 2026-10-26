import { WEEKDAY, demoDay, demoNextWeekday, shiftDay } from "@/lib/date";

export const MEESHO_SUPPLIER = {
  storeName: "Deal sale",
  supplierId: "MS-DL-8842",
  email: "dealsale.supplier@demo.meesho",
  phone: "+91 98765 43210",
  gstin: "29ABCDE1234F1Z5",
  warehouse: "Bangalore FC — Whitefield",
  joinedDate: "Jan 2025",
};

export const MEESHO_ONBOARDING = {
  catalogsLive: 3,
  steps: [
    { id: 1, label: "Upload catalogs to get started", done: true },
    { id: 2, label: "Catalogs go live on Meesho", done: true },
    { id: 3, label: "Get your first order", done: false, active: true },
  ],
};

export const MEESHO_LEARN_ITEMS = [
  {
    id: "1",
    title: "Book free live training",
    badge: "Expert Led",
    description: "Learn to operate and grow your business on meesho.",
    icon: "training",
  },
  {
    id: "2",
    title: "Prepare catalogs for meesho",
    description: "Watch step-by-step catalog preparation guides.",
    icon: "youtube",
  },
  {
    id: "3",
    title: "Pricing & commission",
    description: "Understand Meesho pricing and commission structure.",
    icon: "pricing",
  },
  {
    id: "4",
    title: "Delivery & Returns",
    description: "Learn about shipping, delivery and return policies.",
    icon: "delivery",
  },
];

export type MeeshoCatalogUpload = {
  id: string;
  fileId: string;
  category: string;
  type: "bulk" | "single";
  status: "all" | "action_required" | "qc_progress" | "qc_error" | "qc_pass";
  uploadedAt: string;
  products: number;
};

export const MEESHO_CATALOG_UPLOADS: MeeshoCatalogUpload[] = [
  {
    id: "cu-1",
    fileId: "SF-882910",
    category: "Home Decor",
    type: "single",
    status: "qc_pass",
    uploadedAt: demoDay(-1),
    products: 1,
  },
  {
    id: "cu-2",
    fileId: "SF-882845",
    category: "Home Decor",
    type: "single",
    status: "qc_pass",
    uploadedAt: demoDay(-3),
    products: 1,
  },
  {
    id: "cu-3",
    fileId: "SF-882701",
    category: "Jewellery",
    type: "single",
    status: "qc_pass",
    uploadedAt: demoDay(-5),
    products: 1,
  },
  {
    id: "cu-4",
    fileId: "SF-882512",
    category: "Fashion",
    type: "single",
    status: "qc_pass",
    uploadedAt: demoDay(-7),
    products: 1,
  },
  {
    id: "cu-5",
    fileId: "SF-882401",
    category: "Fashion",
    type: "single",
    status: "qc_pass",
    uploadedAt: demoDay(-9),
    products: 1,
  },
];

export type MeeshoInventoryCatalog = {
  id: string;
  name: string;
  catalogId: string;
  category: string;
  imageUrl: string;
  skus: MeeshoInventorySku[];
};

export type MeeshoInventorySku = {
  id: string;
  title: string;
  styleId: string;
  skuId: string;
  variation: string;
  meeshoPrice: number;
  estimatedOrdersPerDay: number;
  daysToStockout: number;
  stock: number;
  imageUrl: string;
};

export const MEESHO_INVENTORY: MeeshoInventoryCatalog[] = [
  {
    id: "cat-1",
    name: "Ravishing Vases",
    catalogId: "509789999",
    category: "Home Decor",
    imageUrl: "/products/home%20decor/Vases.jpg.jpg",
    skus: [
      {
        id: "sku-1",
        title: "Artificial Wooden Flower Vase | Home Decor Showpiece | Table Decor | Gift Item",
        styleId: "MS-ST-001",
        skuId: "MS-SKU-001",
        variation: "Free Size",
        meeshoPrice: 578,
        estimatedOrdersPerDay: 0.2,
        daysToStockout: 50,
        stock: 10,
        imageUrl: "/products/home%20decor/Vases.jpg.jpg",
      },
    ],
  },
  {
    id: "cat-2",
    name: "Elegant Handbags",
    catalogId: "509788412",
    category: "Fashion",
    imageUrl: "/products/Hand%20Bag/Hand%20Bag.jpg.png",
    skus: [
      {
        id: "sku-2",
        title: "Classic Leather Handbag — Tan | Crossbody Strap",
        styleId: "MS-ST-002",
        skuId: "MS-SKU-002",
        variation: "Free Size",
        meeshoPrice: 899,
        estimatedOrdersPerDay: 0.4,
        daysToStockout: 35,
        stock: 14,
        imageUrl: "/products/Hand%20Bag/Hand%20Bag.jpg.png",
      },
    ],
  },
  {
    id: "cat-3",
    name: "Travel Backpacks",
    catalogId: "509787201",
    category: "Fashion",
    imageUrl: "/products/Bag%20Pack/Bagpack.jpg.jfif",
    skus: [
      {
        id: "sku-3",
        title: "TELGO Travel Backpack — Sky Blue | Laptop Compartment",
        styleId: "MS-ST-003",
        skuId: "MS-SKU-003",
        variation: "Free Size",
        meeshoPrice: 999,
        estimatedOrdersPerDay: 0.6,
        daysToStockout: 28,
        stock: 18,
        imageUrl: "/products/Bag%20Pack/Bagpack.jpg.jfif",
      },
    ],
  },
];

export type MeeshoOrderStatus =
  | "pending"
  | "processing"
  | "packed"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "returned"
  | "cancelled";

export type MeeshoPaymentType = "Prepaid" | "COD";

export type MeeshoOrder = {
  id: string;
  orderId: string;
  skuId: string;
  productName: string;
  imageUrl: string;
  customerName: string;
  city: string;
  quantity: number;
  sellingPrice: number;
  amount: number;
  paymentType: MeeshoPaymentType;
  courierPartner: string;
  /** Calendar date (IST), `YYYY-MM-DD`. */
  orderDateIso: string;
  /** Calendar date (IST), `YYYY-MM-DD`. */
  expectedDeliveryDate: string;
  status: MeeshoOrderStatus;
};

export const MEESHO_ORDERS: MeeshoOrder[] = [
  {
    id: "o1",
    orderId: "MSORD7829145632",
    skuId: "MS-SKU-002",
    productName: "Classic Leather Handbag — Maroon | Crossbody Strap",
    imageUrl: "/products/Hand%20Bag/Hand%20Bag2.jpg.png",
    customerName: "Priya Sharma",
    city: "Delhi",
    quantity: 1,
    sellingPrice: 899,
    amount: 899,
    paymentType: "Prepaid",
    courierPartner: "Delhivery",
    orderDateIso: demoDay(0),
    expectedDeliveryDate: demoDay(4),
    status: "pending",
  },
  {
    id: "o2",
    orderId: "MSORD7829038471",
    skuId: "MS-SKU-004",
    productName: "Kundan Choker Necklace Set with Matching Earrings",
    imageUrl: "/products/Jewellery/LJ113.jpg.jpg",
    customerName: "Rahul Verma",
    city: "Mumbai",
    quantity: 1,
    sellingPrice: 449,
    amount: 449,
    paymentType: "COD",
    courierPartner: "Blue Dart",
    orderDateIso: demoDay(-1),
    expectedDeliveryDate: demoDay(3),
    status: "processing",
  },
  {
    id: "o3",
    orderId: "MSORD7828912044",
    skuId: "MS-SKU-001",
    productName: "Artificial Wooden Flower Vase | Home Decor Showpiece",
    imageUrl: "/products/home%20decor/Vases.jpg.jpg",
    customerName: "Ananya Reddy",
    city: "Hyderabad",
    quantity: 2,
    sellingPrice: 578,
    amount: 1156,
    paymentType: "Prepaid",
    courierPartner: "Ekart",
    orderDateIso: demoDay(-2),
    expectedDeliveryDate: demoDay(2),
    status: "packed",
  },
  {
    id: "o4",
    orderId: "MSORD7828847290",
    skuId: "MS-SKU-003",
    productName: "TELGO Travel Backpack — Black | 35L Laptop Compartment",
    imageUrl: "/products/Bag%20Pack/Bagpack.jpg%20(2).jfif",
    customerName: "Vikram Patel",
    city: "Ahmedabad",
    quantity: 1,
    sellingPrice: 1099,
    amount: 1099,
    paymentType: "COD",
    courierPartner: "Xpressbees",
    orderDateIso: demoDay(-3),
    expectedDeliveryDate: demoDay(1),
    status: "shipped",
  },
  {
    id: "o5",
    orderId: "MSORD7828715633",
    skuId: "MS-SKU-005",
    productName: "Women's Sling Bag — Brown | Adjustable Chain Strap",
    imageUrl: "/products/Hand%20Bag/Hand%20Bag3.jpg.png",
    customerName: "Sneha Iyer",
    city: "Bengaluru",
    quantity: 2,
    sellingPrice: 799,
    amount: 1598,
    paymentType: "Prepaid",
    courierPartner: "Shadowfax",
    orderDateIso: demoDay(-4),
    expectedDeliveryDate: demoDay(0),
    status: "out_for_delivery",
  },
  {
    id: "o6",
    orderId: "MSORD7828600124",
    skuId: "MS-SKU-006",
    productName: "Gold Plated Jhumka Earrings — Traditional Festive Wear",
    imageUrl: "/products/Jewellery/LJ72.jpg.jpg",
    customerName: "Amit Kumar",
    city: "Pune",
    quantity: 3,
    sellingPrice: 299,
    amount: 897,
    paymentType: "COD",
    courierPartner: "Delhivery",
    orderDateIso: demoDay(-5),
    expectedDeliveryDate: demoDay(-1),
    status: "delivered",
  },
  {
    id: "o7",
    orderId: "MSORD7828489102",
    skuId: "MS-SKU-007",
    productName: "Ceramic Table Lamp — White Base with Linen Shade",
    imageUrl: "/products/home%20decor/Lamp.jpg.jpg",
    customerName: "Kavita Singh",
    city: "Jaipur",
    quantity: 1,
    sellingPrice: 749,
    amount: 749,
    paymentType: "Prepaid",
    courierPartner: "Ekart",
    orderDateIso: demoDay(-7),
    expectedDeliveryDate: demoDay(-3),
    status: "delivered",
  },
  {
    id: "o8",
    orderId: "MSORD7828376401",
    skuId: "MS-SKU-008",
    productName: "Travel Backpack — Navy Blue | USB Charging Port",
    imageUrl: "/products/Bag%20Pack/Bagpack.jpg%20(3).jfif",
    customerName: "Rohit Gupta",
    city: "Lucknow",
    quantity: 1,
    sellingPrice: 949,
    amount: 949,
    paymentType: "Prepaid",
    courierPartner: "DTDC",
    orderDateIso: demoDay(-9),
    expectedDeliveryDate: demoDay(-5),
    status: "delivered",
  },
  {
    id: "o9",
    orderId: "MSORD7828265018",
    skuId: "MS-SKU-009",
    productName: "Vegan Leather Tote Bag — Black | Office Handbag",
    imageUrl: "/products/Hand%20Bag/Hand%20Bag4.jpg.png",
    customerName: "Meera Nair",
    city: "Chennai",
    quantity: 1,
    sellingPrice: 849,
    amount: 849,
    paymentType: "Prepaid",
    courierPartner: "Blue Dart",
    orderDateIso: demoDay(-11),
    expectedDeliveryDate: demoDay(-7),
    status: "returned",
  },
  {
    id: "o10",
    orderId: "MSORD7828152033",
    skuId: "MS-SKU-010",
    productName: "Oxidised Silver Kada Bracelet — Adjustable Unisex",
    imageUrl: "/products/Jewellery/LJ68.jpg.jpg",
    customerName: "Arjun Malhotra",
    city: "Surat",
    quantity: 2,
    sellingPrice: 299,
    amount: 598,
    paymentType: "COD",
    courierPartner: "Xpressbees",
    orderDateIso: demoDay(-12),
    expectedDeliveryDate: demoDay(-8),
    status: "cancelled",
  },
  {
    id: "o11",
    orderId: "MSORD7828041109",
    skuId: "MS-SKU-011",
    productName: "Macrame Wall Hanging Set — Boho Home Decor (Pack of 2)",
    imageUrl: "/products/home%20decor/Homedecor.jpg.jpg",
    customerName: "Divya Joshi",
    city: "Delhi",
    quantity: 1,
    sellingPrice: 529,
    amount: 529,
    paymentType: "COD",
    courierPartner: "Delhivery",
    orderDateIso: demoDay(-14),
    expectedDeliveryDate: demoDay(-10),
    status: "delivered",
  },
  {
    id: "o12",
    orderId: "MSORD7827928834",
    skuId: "MS-SKU-012",
    productName: "Laptop Backpack — Grey | Anti-Theft & Water Resistant",
    imageUrl: "/products/Bag%20Pack/Bagpack.jpg%20(4).jfif",
    customerName: "Karan Mehta",
    city: "Mumbai",
    quantity: 1,
    sellingPrice: 1199,
    amount: 1199,
    paymentType: "Prepaid",
    courierPartner: "Ekart",
    orderDateIso: demoDay(-15),
    expectedDeliveryDate: demoDay(-11),
    status: "delivered",
  },
  {
    id: "o13",
    orderId: "MSORD7827816502",
    skuId: "MS-SKU-002",
    productName: "Classic Leather Handbag — Tan | Crossbody Strap",
    imageUrl: "/products/Hand%20Bag/Hand%20Bag.jpg.png",
    customerName: "Pooja Agarwal",
    city: "Pune",
    quantity: 1,
    sellingPrice: 799,
    amount: 799,
    paymentType: "COD",
    courierPartner: "Shadowfax",
    orderDateIso: demoDay(-17),
    expectedDeliveryDate: demoDay(-13),
    status: "delivered",
  },
  {
    id: "o14",
    orderId: "MSORD7827704290",
    skuId: "MS-SKU-013",
    productName: "Pearl Drop Pendant Set — Rose Gold Plated",
    imageUrl: "/products/Jewellery/LJ114.jpg.jpg",
    customerName: "Sanjay Reddy",
    city: "Hyderabad",
    quantity: 1,
    sellingPrice: 389,
    amount: 389,
    paymentType: "Prepaid",
    courierPartner: "Blue Dart",
    orderDateIso: demoDay(-19),
    expectedDeliveryDate: demoDay(-15),
    status: "delivered",
  },
  {
    id: "o15",
    orderId: "MSORD7827593118",
    skuId: "MS-SKU-014",
    productName: "Decorative Resin Showpiece Set — Living Room Accent",
    imageUrl: "/products/home%20decor/home%20decor.jpg.jpg",
    customerName: "Lakshmi Venkatesh",
    city: "Bengaluru",
    quantity: 2,
    sellingPrice: 499,
    amount: 998,
    paymentType: "COD",
    courierPartner: "Xpressbees",
    orderDateIso: demoDay(-21),
    expectedDeliveryDate: demoDay(-17),
    status: "delivered",
  },
];

export type MeeshoPayment = {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "completed" | "scheduled" | "processing";
};

/** Meesho settles weekly every Friday (see the Payments page and Help FAQ); the next one is always in the future. */
const NEXT_PAYOUT_DATE = demoNextWeekday(WEEKDAY.Friday);
const payoutDate = (weeksBack: number) => shiftDay(NEXT_PAYOUT_DATE, -7 * weeksBack);

export const MEESHO_PAYMENTS: MeeshoPayment[] = [
  { id: "p1", date: payoutDate(0), description: "Weekly settlement", amount: 12480, status: "scheduled" },
  { id: "p2", date: payoutDate(1), description: "Weekly settlement", amount: 8920, status: "completed" },
  { id: "p3", date: payoutDate(2), description: "Return deductions", amount: -420, status: "completed" },
  { id: "p4", date: payoutDate(3), description: "Weekly settlement", amount: 15640, status: "completed" },
];

export type MeeshoReturn = {
  id: string;
  returnId: string;
  orderId: string;
  productName: string;
  reason: string;
  status: "pending" | "approved" | "rejected" | "completed";
  date: string;
  amount: number;
};

export const MEESHO_RETURNS: MeeshoReturn[] = [
  {
    id: "r1",
    returnId: "RET-44201",
    orderId: "ORD-88102",
    productName: "Ceramic Vase Set of 3",
    reason: "Size mismatch",
    status: "pending",
    date: demoDay(-2),
    amount: 578,
  },
  {
    id: "r2",
    returnId: "RET-44188",
    orderId: "ORD-88056",
    productName: "Classic Leather Handbag",
    reason: "Quality issue",
    status: "approved",
    date: demoDay(-4),
    amount: 899,
  },
];

export const MEESHO_GROWTH_METRICS = {
  views7d: 18420,
  orders7d: 42,
  revenue7d: 38420,
  conversion: 2.8,
  catalogScore: 78,
  returnRate: 4.2,
};
