import Link from "next/link";

const categories = [
  { name: "Fashion", description: "Trending looks", emoji: "👗" },
  { name: "Electronics", description: "Smart essentials", emoji: "📱" },
  { name: "Home", description: "Cozy upgrades", emoji: "🏠" },
  { name: "Beauty", description: "Self care picks", emoji: "💄" },
  { name: "Sports", description: "Move with style", emoji: "🏃" },
  { name: "Accessories", description: "Small details", emoji: "👜" },
];

const featuredProducts = [
  {
    name: "Aero Smart Watch",
    price: "$189",
    oldPrice: "$249",
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Urban Backpack",
    price: "$94",
    oldPrice: "$129",
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Luma Headphones",
    price: "$149",
    oldPrice: "$199",
    badge: "Top rated",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Cloud Lamp",
    price: "$76",
    oldPrice: "$99",
    badge: "Editor’s pick",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  },
];

const perks = [
  "Free delivery over $50",
  "Secure payment options",
  "7-day easy returns",
  "24/7 customer support",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f6f8] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 text-lg font-bold text-white shadow-lg shadow-orange-200">
              Y
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Your
              </p>
              <h1 className="text-xl font-black tracking-tight">SHOPPY</h1>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#home" className="transition hover:text-slate-900">Home</a>
            <a href="#categories" className="transition hover:text-slate-900">Categories</a>
            <a href="#featured" className="transition hover:text-slate-900">Featured</a>
            <a href="#offers" className="transition hover:text-slate-900">Offers</a>
            <a href="#footer" className="transition hover:text-slate-900">Support</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/signin"
              className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Shop now
            </Link>
          </div>
        </div>
      </header>

      <main id="home">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,146,60,0.18),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(244,114,182,0.14),_transparent_35%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
            <div className="flex flex-col justify-center">
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-orange-700">
                <span className="h-2 w-2 rounded-full bg-orange-500" />
                Fresh deals every day
              </div>

              <h2 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Discover essentials that feel premium.
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
                Minimal, stylish, and smart shopping for every room, routine, and moment of your day.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="rounded-full bg-slate-900 px-6 py-3 text-center text-base font-semibold text-white shadow-xl shadow-slate-300 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Shop collection
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-full border border-slate-200 bg-white px-6 py-3 text-center text-base font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                >
                  Explore offers
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                {perks.map((perk) => (
                  <span key={perk} className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 ring-1 ring-slate-200">
                    <span className="text-green-500">✓</span>
                    {perk}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-amber-200/60 blur-3xl" />
              <div className="absolute -right-6 bottom-12 h-40 w-40 rounded-full bg-rose-200/60 blur-3xl" />

              <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/60 bg-white p-4 shadow-[0_25px_80px_rgba(15,23,42,0.14)]">
                <div className="rounded-[1.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-300">New arrivals</p>
                      <h3 className="mt-2 text-2xl font-bold">Weekend edit</h3>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-orange-200">
                      Save 30%
                    </span>
                  </div>

                  <div className="mt-8 overflow-hidden rounded-[1.5rem] bg-slate-950/20 p-3">
                    <img
                      src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
                      alt="Curated lifestyle product display"
                      className="h-72 w-full rounded-[1.2rem] object-cover"
                    />
                  </div>

                  <div className="mt-6 flex items-end justify-between">
                    <div>
                      <p className="text-sm text-slate-300">Limited drop</p>
                      <p className="text-3xl font-black">$149</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 px-4 py-3 text-right">
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-300">Rating</p>
                      <p className="text-lg font-bold">4.9/5</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Shop by category</p>
              <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Curated for your lifestyle</h3>
            </div>
            <button className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:inline-flex">
              View all
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-rose-100 text-3xl shadow-inner">
                  {category.emoji}
                </div>
                <h4 className="text-xl font-bold text-slate-900">{category.name}</h4>
                <p className="mt-2 text-sm text-slate-600">{category.description}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-800">
                  Shop now
                  <span className="transition group-hover:translate-x-1">→</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="featured" className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Featured products</p>
                <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Must-have picks</h3>
              </div>
              <button className="hidden rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 sm:inline-flex">
                Browse more
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <article
                  key={product.name}
                  className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-700">
                      {product.badge}
                    </span>
                  </div>

                  <div className="p-5">
                    <h4 className="text-lg font-bold text-slate-900">{product.name}</h4>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-2xl font-black text-slate-900">{product.price}</span>
                      <span className="text-sm text-slate-400 line-through">{product.oldPrice}</span>
                    </div>
                    <button className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
                      Add to cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="offers" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-8 text-white shadow-[0_20px_60px_rgba(15,23,42,0.2)] lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Limited-time offer</p>
                <h3 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Save up to 50% on premium essentials.</h3>
                <p className="mt-4 max-w-lg text-base text-slate-300">
                  Refresh your everyday essentials with carefully selected picks built for comfort, style, and convenience.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                    Shop deals
                  </button>
                  <button className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                    Learn more
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="rounded-[1.5rem] bg-white/10 p-5 shadow-inner ring-1 ring-white/10 backdrop-blur-sm">
                  <div className="rounded-[1.2rem] bg-white p-5 text-slate-900">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Flash sale</p>
                    <p className="mt-3 text-5xl font-black">50%</p>
                    <p className="mt-2 text-sm font-medium text-slate-600">Off selected home & tech items</p>
                    <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500">
                      <span>Ends in</span>
                      <span className="text-slate-900">12:48:24</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-400 text-sm font-bold text-white">
                Y
              </div>
              <h4 className="text-lg font-black tracking-tight">SHOPPY</h4>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
              Curated shopping for a smarter, calmer, and more elevated everyday life.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-600">Company</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>About</li>
              <li>Journal</li>
              <li>Careers</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-600">Support</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Help center</li>
              <li>Shipping</li>
              <li>Returns</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-600">Newsletter</p>
            <div className="mt-4 flex items-center overflow-hidden rounded-full border border-slate-200 bg-slate-50">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              <button className="bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 py-4">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
            <p>© 2026 YOUR SHOPPY. All rights reserved.</p>
            <div className="flex gap-5">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Accessibility</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
