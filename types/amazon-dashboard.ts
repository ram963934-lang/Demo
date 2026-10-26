export type GlobalSnapshotData = {
  sales: {
    amount: number;
    label: string;
    sparkline: number[];
  };
  openOrders: {
    total: number;
    fbmUnshipped: number;
    fbmPending: number;
    fbaPending: number;
  };
  buyerMessages: {
    count: number;
    label: string;
  };
  featuredOffer: {
    percentage: number;
    label: string;
  };
  globalPromotionsSales: {
    amount: number;
    label: string;
  };
  adSales: {
    amount: number;
    label: string;
  };
  adImpressions: {
    count: number;
    label: string;
  };
  sellerFeedback: {
    rating: number;
    reviewCount: number;
    label: string;
  };
  payments: {
    amount: number;
    label: string;
  };
};

export type ForumPost = {
  id: string;
  title: string;
  date: string;
  views?: number;
  comments?: number;
  icon: "folder" | "eye" | "chat";
};

export type SellerNewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
};

export type ProductPerformanceRow = {
  id: string;
  name: string;
  asin: string;
  sku: string;
  imageSeed: string;
  listingStatus: string;
  sales: string;
  unitsSold: string;
  pageViews: string;
  inventory: string;
  price: number;
};

export type AmazonDashboardData = {
  greeting: string;
  accountHealth: "Healthy" | "At Risk" | "Unhealthy";
  globalSnapshot: GlobalSnapshotData;
  actionsCount: number;
  forumPosts: ForumPost[];
  sellerNews: SellerNewsItem[];
  products: ProductPerformanceRow[];
};
