import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import type { Category } from "@/store/filterStore";

// Category data with icons and gradients
const CATEGORY_STYLES: Record<string, { gradient: string; emoji: string }> = {
  electronics: { gradient: "from-blue-500 to-cyan-400", emoji: "💻" },
  fashion: { gradient: "from-pink-500 to-rose-400", emoji: "👕" },
  gaming: { gradient: "from-purple-500 to-indigo-400", emoji: "🎮" },
  "home-kitchen": { gradient: "from-amber-500 to-orange-400", emoji: "🏠" },
  beauty: { gradient: "from-pink-400 to-fuchsia-400", emoji: "💄" },
  "food-groceries": { gradient: "from-green-500 to-emerald-400", emoji: "🍕" },
  "mobile-accessories": {
    gradient: "from-indigo-500 to-violet-400",
    emoji: "📱",
  },
  "books-stationery": { gradient: "from-lime-500 to-green-400", emoji: "📚" },
  travel: { gradient: "from-sky-500 to-blue-400", emoji: "✈️" },
  other: { gradient: "from-gray-500 to-slate-400", emoji: "📦" },
};

export function Categories() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.getCategories();
      return res as { data: Category[] };
    },
  });

  const categories = data?.data || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground rounded-full p-2">
                <span className="text-lg">🔥</span>
              </div>
              <span className="font-bold text-xl">DealHunt</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Browse Categories</h1>
        <p className="text-muted-foreground mb-8">
          Find the best deals across all categories
        </p>

        {/* Error State */}
        {isError && (
          <div className="text-red-500 mb-4">
            Error loading categories: {(error as Error)?.message}
          </div>
        )}

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {isLoading ? (
            // Skeletons
            Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-2xl" />
            ))
          ) : categories.length === 0 ? (
            <p className="col-span-full text-center text-muted-foreground">
              No categories found
            </p>
          ) : (
            categories.map((cat) => {
              const style = CATEGORY_STYLES[cat.slug] || CATEGORY_STYLES.other;
              return (
                <Link
                  key={cat.id}
                  to={`/?category=${cat.slug}`}
                  className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-90`}
                  />

                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center text-white p-4">
                    <span className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                      {cat.icon || style.emoji}
                    </span>
                    <h3 className="font-semibold text-center text-sm md:text-base">
                      {cat.name}
                    </h3>
                    {cat.dealCount > 0 && (
                      <span className="text-xs mt-1 opacity-80">
                        {cat.dealCount} deals
                      </span>
                    )}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}

export default Categories;
