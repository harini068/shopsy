import { getProductById, type Address, type CartEntry, type OrderRecord, type Product, type Rating } from "@/lib/shop-data";

const CART_KEY = "your_shoppy_cart";

const ADDRESS_KEY = "your_shoppy_addresses";
const ORDER_KEY = "your_shoppy_orders";
const RATING_KEY = "your_shoppy_ratings";
const storageListeners = new Map<string, Set<() => void>>();

function notifyStorageKey(key: string) {
  storageListeners.get(key)?.forEach((listener) => listener());
}

export function subscribeStorageKey(key: string, listener: () => void) {
  if (typeof window === "undefined") return () => {};

  const listeners = storageListeners.get(key) ?? new Set<() => void>();
  listeners.add(listener);
  storageListeners.set(key, listeners);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) listener();
  };
  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
    if (!listeners.size) storageListeners.delete(key);
  };
}

export function getStorageSnapshot(key: string, fallback: string) {
  if (typeof window === "undefined") return fallback;

  try {
    return window.localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function safeWrite<T>(key: string, value: T) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(key, JSON.stringify(value));
  notifyStorageKey(key);
}

export function getCart(): CartEntry[] {
  const stored = safeRead<unknown>(CART_KEY, []);
  if (!Array.isArray(stored)) return [];

  return stored.flatMap((entry): CartEntry[] => {
    if (!entry || typeof entry !== "object") return [];

    const candidate = entry as Partial<CartEntry>;
    const product = typeof candidate.productId === "string" ? getProductById(candidate.productId) : null;
    if (!product || !Number.isSafeInteger(candidate.quantity) || (candidate.quantity ?? 0) < 1) return [];

    return [{
      productId: product.id,
      quantity: Math.min(candidate.quantity as number, product.stock),
      price: product.discountPrice > 0 ? product.discountPrice : product.price,
    }];
  });
}

export function setCart(cart: CartEntry[]) {
  safeWrite(CART_KEY, cart);
}

export function getAddresses(): Address[] {
  return safeRead<Address[]>(ADDRESS_KEY, []);
}

export function setAddresses(addresses: Address[]) {
  safeWrite(ADDRESS_KEY, addresses);
}

export function getOrders(): OrderRecord[] {
  return safeRead<OrderRecord[]>(ORDER_KEY, []);
}

export function setOrders(orders: OrderRecord[]) {
  safeWrite(ORDER_KEY, orders);
}

export function getRatings(): Rating[] {
  return safeRead<Rating[]>(RATING_KEY, []);
}

export function setRatings(ratings: Rating[]) {
  safeWrite(RATING_KEY, ratings);
}

export function getProductFromCart(productId: string, cart: CartEntry[]) {
  return cart.find((entry) => entry.productId === productId) ?? null;
}

export function addToCart(product: Product, quantity = 1) {
  const canonicalProduct = getProductById(product.id);
  if (!canonicalProduct || !Number.isSafeInteger(quantity) || quantity < 1) return getCart();

  const current = getCart();
  const existing = current.find((entry) => entry.productId === canonicalProduct.id);

  const next = existing
    ? current.map((entry) =>
        entry.productId === canonicalProduct.id
          ? { ...entry, quantity: Math.min(entry.quantity + quantity, canonicalProduct.stock) }
          : entry,
      )
    : [...current, {
        productId: canonicalProduct.id,
        quantity: Math.min(quantity, canonicalProduct.stock),
        price: canonicalProduct.discountPrice > 0 ? canonicalProduct.discountPrice : canonicalProduct.price,
      }];

  setCart(next);
  return next;
}

export function removeFromCart(productId: string) {
  const next = getCart().filter((entry) => entry.productId !== productId);
  setCart(next);
  return next;
}

export function updateCartQuantity(productId: string, delta: number) {
  const next = getCart()
    .map((entry) => {
      if (entry.productId !== productId) return entry;
      const updated = entry.quantity + delta;
      const product = getProductById(entry.productId);
      return { ...entry, quantity: Math.max(1, Math.min(product?.stock ?? 1, updated)) };
    })
    .filter((entry) => entry.quantity > 0);

  setCart(next);
  return next;
}

export function clearCart() {
  setCart([]);
}

export function getCartTotal(cart: CartEntry[]) {
  return cart.reduce((sum, item) => {
    const product = getProductById(item.productId);
    if (!product || !Number.isSafeInteger(item.quantity) || item.quantity < 1) return sum;

    const price = product.discountPrice > 0 ? product.discountPrice : product.price;
    return sum + price * Math.min(item.quantity, product.stock);
  }, 0);
}
