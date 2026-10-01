export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  images: string[];
  categoryId: string;
  stock: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
};

export type Address = {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CartEntry = {
  productId: string;
  quantity: number;
  price: number;
};

export type OrderItemSnapshot = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
};

export type OrderRecord = {
  id: string;
  userId: string;
  paymentMethod: "COD" | "PhonePe";
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  orderStatus: "PLACED" | "PROCESSING" | "SHIPPED" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED";
  totalAmount: number;
  addressId: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItemSnapshot[];
};

export type Rating = {
  id: string;
  userId: string;
  productId: string;
  orderId: string;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
};

export const categories: Category[] = [
  {
    id: "cat-fashion",
    name: "Fashion",
    description: "Everyday style with clean lines and premium basics.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "cat-electronics",
    name: "Electronics",
    description: "Smart gadgets for work, play, and life at home.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "cat-home",
    name: "Home",
    description: "Comfort-focused essentials for refined spaces.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "cat-beauty",
    name: "Beauty",
    description: "Self-care essentials with a premium finish.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Aero Smart Watch",
    description: "A fitness-first smartwatch with premium design and all-day battery performance.",
    price: 189,
    discountPrice: 149,
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    ],
    categoryId: "cat-electronics",
    stock: 12,
    rating: 4.8,
    reviewCount: 320,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "prod-2",
    name: "Urban Backpack",
    description: "Water-resistant backpack with roomy compartments for work, travel, and everyday carry.",
    price: 94,
    discountPrice: 79,
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    ],
    categoryId: "cat-fashion",
    stock: 18,
    rating: 4.6,
    reviewCount: 160,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "prod-3",
    name: "Luma Headphones",
    description: "Wireless performance headphones that blend rich sound with a comfort-first fit.",
    price: 149,
    discountPrice: 119,
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    ],
    categoryId: "cat-electronics",
    stock: 9,
    rating: 4.9,
    reviewCount: 410,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "prod-4",
    name: "Cloud Lamp",
    description: "A soft-glow ambient lamp designed to bring warmth and calm to any room.",
    price: 76,
    discountPrice: 58,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
    ],
    categoryId: "cat-home",
    stock: 25,
    rating: 4.7,
    reviewCount: 290,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "prod-5",
    name: "Velvet Glow Kit",
    description: "A complete skincare and glow routine delivering hydration, brightening, and calm.",
    price: 64,
    discountPrice: 49,
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
    ],
    categoryId: "cat-beauty",
    stock: 30,
    rating: 4.5,
    reviewCount: 140,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "prod-6",
    name: "Summit Runner",
    description: "Lightweight running shoes built for speed, comfort, and all-day energy.",
    price: 120,
    discountPrice: 95,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80",
    ],
    categoryId: "cat-fashion",
    stock: 14,
    rating: 4.7,
    reviewCount: 182,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

export const defaultAddresses: Address[] = [
  {
    id: "addr-1",
    userId: "demo-user",
    fullName: "Demo User",
    phone: "+1 234 567 890",
    address: "456 Market Street",
    city: "San Francisco",
    state: "California",
    pincode: "94103",
    landmark: "Near City Center",
    isDefault: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

export const initialRatings: Rating[] = [
  {
    id: "rating-1",
    userId: "demo-user",
    productId: "prod-1",
    orderId: "order-1",
    rating: 5,
    review: "Excellent quality and the design looks premium.",
    createdAt: "2026-04-01T00:00:00.000Z",
    updatedAt: "2026-04-01T00:00:00.000Z",
  },
];

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function getProductById(productId: string) {
  return products.find((product) => product.id === productId) ?? null;
}

export function getCategoryById(categoryId: string) {
  return categories.find((category) => category.id === categoryId) ?? null;
}
