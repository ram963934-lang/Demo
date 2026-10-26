import {
  WEEKDAY,
  demoDay,
  demoDayAt,
  demoHoursAgo,
  demoMinutesAgo,
  demoMonthShort,
  demoMonthStart,
  demoNextWeekday,
  formatWeekdayShort,
  formatMonthYear,
  getIsoWeekNumber,
  shiftDay,
  toDate,
} from "@/lib/date";

export const FLIPKART_SELLER = {
  storeName: "UrbanCraft India",
  sellerId: "FK-SL-928471",
  email: "seller@urbancraft.demo.flipkart",
  phone: "+91 99887 76655",
  gstin: "27AABCU9603R1ZM",
  warehouse: "Flipkart Fulfillment — Mumbai Bhiwandi",
  tier: "Gold Seller",
  rating: 4.6,
};

export type FlipkartProduct = {
  id: string;
  fsn: string;
  sku: string;
  title: string;
  category: string;
  brand: string;
  price: number;
  mrp: number;
  stock: number;
  status: "active" | "inactive" | "out_of_stock" | "pending_qc";
  imageUrl: string;
  description: string;
  views7d: number;
  orders7d: number;
  returnRate: number;
  fulfillment: "FBF" | "Easy Ship" | "Self Ship";
  /** ISO timestamp of the last edit; render with formatRelativeTime(). */
  lastUpdated: string;
};

export const FLIPKART_PRODUCTS: FlipkartProduct[] = [
  {
    id: "fk-p1",
    fsn: "BAGFH8K2LM",
    sku: "UC-BP-SKY-001",
    title: "TELGO Travel Backpack — Sky Blue | Laptop Compartment",
    category: "Bags & Luggage",
    brand: "TELGO",
    price: 999,
    mrp: 2499,
    stock: 142,
    status: "active",
    imageUrl: "/products/Bag%20Pack/Bagpack.jpg.jfif",
    description: "Premium travel backpack with padded laptop sleeve, USB charging port, and water-resistant fabric.",
    views7d: 8420,
    orders7d: 86,
    returnRate: 2.1,
    fulfillment: "FBF",
    lastUpdated: demoHoursAgo(2),
  },
  {
    id: "fk-p2",
    fsn: "HBFJ3N9PQR",
    sku: "UC-HB-TAN-002",
    title: "Classic Leather Handbag — Tan | Crossbody Strap",
    category: "Handbags",
    brand: "UrbanCraft",
    price: 1299,
    mrp: 3499,
    stock: 64,
    status: "active",
    imageUrl: "/products/Hand%20Bag/Hand%20Bag.jpg.png",
    description: "Genuine-look leather handbag with detachable crossbody strap and multiple compartments.",
    views7d: 6210,
    orders7d: 52,
    returnRate: 3.4,
    fulfillment: "Easy Ship",
    lastUpdated: demoMinutesAgo(45),
  },
  {
    id: "fk-p3",
    fsn: "HDVK5W1XYZ",
    sku: "UC-VD-SET-003",
    title: "Artificial Wooden Flower Vase | Home Decor Showpiece",
    category: "Home Decor",
    brand: "UrbanCraft",
    price: 578,
    mrp: 1299,
    stock: 28,
    status: "active",
    imageUrl: "/products/home%20decor/Vases.jpg.jpg",
    description: "Elegant wooden-finish vase for living room, dining table, and gifting.",
    views7d: 3840,
    orders7d: 41,
    returnRate: 1.8,
    fulfillment: "FBF",
    lastUpdated: demoHoursAgo(1),
  },
  {
    id: "fk-p4",
    fsn: "JWLK8M2ABC",
    sku: "UC-JW-GLD-004",
    title: "Gold-Plated Statement Necklace Set | Party Wear",
    category: "Jewellery",
    brand: "SparkleLane",
    price: 449,
    mrp: 1999,
    stock: 0,
    status: "out_of_stock",
    imageUrl: "/products/Jewellery/LJ113.jpg.jpg",
    description: "Anti-tarnish gold-plated necklace with matching earrings for festive occasions.",
    views7d: 5120,
    orders7d: 0,
    returnRate: 4.2,
    fulfillment: "Easy Ship",
    lastUpdated: demoHoursAgo(3),
  },
  {
    id: "fk-p5",
    fsn: "DCOR9P4LMN",
    sku: "UC-DC-WAL-005",
    title: "Minimalist Wall Art Frame Set of 3 | Modern Decor",
    category: "Home Decor",
    brand: "UrbanCraft",
    price: 899,
    mrp: 2199,
    stock: 95,
    status: "active",
    imageUrl: "/products/home%20decor/Homedecor.jpg.jpg",
    description: "Contemporary wall art frames for bedroom and living room styling.",
    views7d: 2980,
    orders7d: 24,
    returnRate: 2.5,
    fulfillment: "FBF",
    lastUpdated: demoHoursAgo(5),
  },
  {
    id: "fk-p6",
    fsn: "BAGP2K7RST",
    sku: "UC-BP-OLV-006",
    title: "TELGO Daypack — Olive Green | Hiking & Commute",
    category: "Bags & Luggage",
    brand: "TELGO",
    price: 849,
    mrp: 1899,
    stock: 18,
    status: "active",
    imageUrl: "/products/Bag%20Pack/Bagpack.jpg%20(3).jfif",
    description: "Lightweight daypack with ventilated back panel for outdoor and daily use.",
    views7d: 1940,
    orders7d: 19,
    returnRate: 1.5,
    fulfillment: "Self Ship",
    lastUpdated: demoHoursAgo(6),
  },
];

export type FlipkartOrderStatus =
  | "new"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "return_requested";

export type FlipkartOrder = {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  amount: number;
  status: FlipkartOrderStatus;
  /** ISO timestamp (IST). */
  orderDate: string;
  customerCity: string;
  fulfillment: string;
  paymentMode: string;
};

export const FLIPKART_ORDERS: FlipkartOrder[] = [
  {
    id: "fk-o1",
    orderId: "OD4287193847291",
    productId: "fk-p1",
    productName: "TELGO Travel Backpack — Sky Blue",
    sku: "UC-BP-SKY-001",
    quantity: 1,
    amount: 999,
    status: "new",
    orderDate: demoDayAt(0, "09:42"),
    customerCity: "Pune",
    fulfillment: "FBF",
    paymentMode: "Prepaid",
  },
  {
    id: "fk-o2",
    orderId: "OD4287193847102",
    productId: "fk-p2",
    productName: "Classic Leather Handbag — Tan",
    sku: "UC-HB-TAN-002",
    quantity: 1,
    amount: 1299,
    status: "packed",
    orderDate: demoDayAt(0, "08:15"),
    customerCity: "Mumbai",
    fulfillment: "Easy Ship",
    paymentMode: "Prepaid",
  },
  {
    id: "fk-o3",
    orderId: "OD4287193846890",
    productId: "fk-p3",
    productName: "Artificial Wooden Flower Vase",
    sku: "UC-VD-SET-003",
    quantity: 2,
    amount: 1156,
    status: "shipped",
    orderDate: demoDayAt(-1, "16:30"),
    customerCity: "Bangalore",
    fulfillment: "FBF",
    paymentMode: "COD",
  },
  {
    id: "fk-o4",
    orderId: "OD4287193846501",
    productId: "fk-p5",
    productName: "Minimalist Wall Art Frame Set of 3",
    sku: "UC-DC-WAL-005",
    quantity: 1,
    amount: 899,
    status: "delivered",
    orderDate: demoDayAt(-3, "11:20"),
    customerCity: "Delhi",
    fulfillment: "FBF",
    paymentMode: "Prepaid",
  },
  {
    id: "fk-o5",
    orderId: "OD4287193846208",
    productId: "fk-p1",
    productName: "TELGO Travel Backpack — Sky Blue",
    sku: "UC-BP-SKY-001",
    quantity: 1,
    amount: 999,
    status: "delivered",
    orderDate: demoDayAt(-5, "14:05"),
    customerCity: "Hyderabad",
    fulfillment: "FBF",
    paymentMode: "Prepaid",
  },
  {
    id: "fk-o6",
    orderId: "OD4287193845903",
    productId: "fk-p6",
    productName: "TELGO Daypack — Olive Green",
    sku: "UC-BP-OLV-006",
    quantity: 1,
    amount: 849,
    status: "cancelled",
    orderDate: demoDayAt(-7, "07:48"),
    customerCity: "Chennai",
    fulfillment: "Self Ship",
    paymentMode: "COD",
  },
  {
    id: "fk-o7",
    orderId: "OD4287193845601",
    productId: "fk-p2",
    productName: "Classic Leather Handbag — Tan",
    sku: "UC-HB-TAN-002",
    quantity: 1,
    amount: 1299,
    status: "return_requested",
    orderDate: demoDayAt(-9, "17:12"),
    customerCity: "Jaipur",
    fulfillment: "Easy Ship",
    paymentMode: "Prepaid",
  },
];

export type FlipkartPayment = {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "completed" | "scheduled" | "processing";
  type: "settlement" | "fee" | "refund" | "ads";
};

/**
 * Flipkart settles every Tuesday (see the Support FAQ and Settings page), so the cycle is anchored to Tuesdays:
 * the next payout is the first Tuesday after today and earlier ones are exactly a week apart.
 * "Week N" is the cycle that closed before the payout (ISO week of the payout date minus one).
 */
const NEXT_SETTLEMENT_DATE = demoNextWeekday(WEEKDAY.Tuesday);
const settlementDate = (weeksBack: number) => shiftDay(NEXT_SETTLEMENT_DATE, -7 * weeksBack);
const settlementLabel = (date: string) => `Weekly settlement — Week ${getIsoWeekNumber(toDate(date) as Date) - 1}`;

export const FLIPKART_PAYMENTS: FlipkartPayment[] = [
  { id: "fp1", date: settlementDate(0), description: settlementLabel(settlementDate(0)), amount: 42850, status: "scheduled", type: "settlement" },
  // The refund belongs to the return requested yesterday on OD4287193845601; it can only be processed after
  // that request (and after the order itself), so it is still "processing" rather than completed.
  { id: "fp5", date: demoDay(-1), description: "Return refund — OD4287193845601", amount: -1299, status: "processing", type: "refund" },
  { id: "fp2", date: settlementDate(1), description: settlementLabel(settlementDate(1)), amount: 38620, status: "completed", type: "settlement" },
  { id: "fp3", date: settlementDate(1), description: "Flipkart Ads spend", amount: -4200, status: "completed", type: "ads" },
  { id: "fp4", date: settlementDate(2), description: settlementLabel(settlementDate(2)), amount: 35280, status: "completed", type: "settlement" },
  { id: "fp6", date: demoDay(-19), description: "Platform commission & fees", amount: -2840, status: "completed", type: "fee" },
];

export type FlipkartReturn = {
  id: string;
  returnId: string;
  orderId: string;
  productName: string;
  reason: string;
  status: "pending" | "approved" | "rejected" | "completed";
  date: string;
  amount: number;
};

export const FLIPKART_RETURNS: FlipkartReturn[] = [
  { id: "fr1", returnId: "RET-FK-88201", orderId: "OD4287193845601", productName: "Classic Leather Handbag — Tan", reason: "Size mismatch", status: "pending", date: demoDay(-1), amount: 1299 },
  { id: "fr2", returnId: "RET-FK-88144", orderId: "OD4287193844102", productName: "Gold-Plated Statement Necklace Set", reason: "Quality issue", status: "approved", date: demoDay(-4), amount: 449 },
  { id: "fr3", returnId: "RET-FK-88098", orderId: "OD4287193843801", productName: "TELGO Travel Backpack — Sky Blue", reason: "Changed mind", status: "completed", date: demoDay(-9), amount: 999 },
];

export const FLIPKART_DASHBOARD = {
  revenue7d: 186420,
  orders7d: 222,
  units7d: 248,
  returnRate: 2.8,
  avgRating: 4.6,
  adRoas: 4.2,
  // Seven days ending today, oldest first. Labels come from the dates, so they stay correct if the clock moves.
  revenueTrend: [
    [22400, 28], [24800, 31], [26200, 34], [28100, 36], [31200, 39], [29800, 37], [23920, 17],
  ].map(([revenue, orders], index) => {
    const date = demoDay(index - 6);
    return { date, day: formatWeekdayShort(date), revenue, orders };
  }),
  categorySplit: [
    { name: "Bags", value: 38 },
    { name: "Home Decor", value: 28 },
    { name: "Handbags", value: 22 },
    { name: "Jewellery", value: 12 },
  ],
  // Six months ending with the current one. The last value is month-to-date, hence the "(MTD)" label.
  monthlySales: [142000, 158000, 224000, 186000, 198000, 86420].map((sales, index, all) => {
    const offset = index - (all.length - 1);
    return { month: offset === 0 ? `${demoMonthShort(0)} (MTD)` : demoMonthShort(offset), sales };
  }),
  trafficSources: [
    { name: "Search", value: 42 },
    { name: "Direct", value: 24 },
    { name: "Ads", value: 18 },
    { name: "Referral", value: 10 },
    { name: "Other", value: 6 },
  ],
  orderStatusSplit: [
    { name: "Delivered", value: 58 },
    { name: "Shipped", value: 18 },
    { name: "Packed", value: 12 },
    { name: "New", value: 8 },
    { name: "Cancelled", value: 4 },
  ],
  kpis: {
    todaySales: 28640,
    revenue: 186420,
    orders: 222,
    visitors: 28420,
    conversion: 3.2,
    wallet: 42850,
    returns: 12,
    cancelled: 8,
  },
};

export const FLIPKART_CUSTOMERS = [
  { id: "c1", name: "Priya Sharma", city: "Mumbai", orders: 4, spent: 4896, lastOrder: demoDay(-1), rating: 5 },
  { id: "c2", name: "Rahul Verma", city: "Delhi", orders: 3, spent: 3297, lastOrder: demoDay(-3), rating: 4 },
  { id: "c3", name: "Ananya Reddy", city: "Hyderabad", orders: 2, spent: 1998, lastOrder: demoDay(-5), rating: 5 },
  { id: "c4", name: "Vikram Patel", city: "Ahmedabad", orders: 2, spent: 1748, lastOrder: demoDay(-7), rating: 4 },
  { id: "c5", name: "Sneha Iyer", city: "Bangalore", orders: 1, spent: 1299, lastOrder: demoDay(-9), rating: 3 },
];

export const FLIPKART_ADS = [
  { id: "fa1", name: "Backpack — Search Boost", type: "PLA", budget: 5000, spend: 3840, roas: 4.8, status: "active", impressions: 84200, clicks: 2840 },
  { id: "fa2", name: "Home Decor — Display", type: "Display", budget: 3000, spend: 2100, roas: 3.2, status: "active", impressions: 124000, clicks: 1920 },
  { id: "fa3", name: "Handbag — Brand Store", type: "Brand", budget: 2000, spend: 1980, roas: 2.9, status: "paused", impressions: 42000, clicks: 980 },
];

export const FLIPKART_REPORTS = [
  { id: "r1", name: "Sales Summary", period: "Last 7 days", generated: demoDay(0) },
  { id: "r2", name: "Inventory Health", period: "Last 30 days", generated: demoDay(-1) },
  { id: "r3", name: "Return Analysis", period: "Last 30 days", generated: demoDay(-1) },
  // Monthly invoices are produced on the 1st for the month that just closed.
  { id: "r4", name: "Tax Invoice Report", period: formatMonthYear(demoMonthStart(-1)), generated: demoMonthStart(0) },
  { id: "r5", name: "Ads Performance", period: "Last 7 days", generated: demoDay(0) },
];

export function getFlipkartProduct(id: string) {
  return FLIPKART_PRODUCTS.find((p) => p.id === id);
}

export function getFlipkartOrder(id: string) {
  return FLIPKART_ORDERS.find((o) => o.id === id);
}
