import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ChevronDown, ChevronUp, ShoppingCart, Droplets, Fence } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string;
  price_label: string | null;
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-earth-200">
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-brand-green-700 text-white text-xs font-bold px-3 py-1 rounded-full">
          {product.price_label}
        </div>
      </div>
      <div className="p-5">
        <h4 className="font-bold text-brand-dark text-lg mb-2 group-hover:text-brand-green-700 transition-colors">
          {product.name}
        </h4>
        <p className="text-brand-stone text-sm leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>
        <button
          onClick={() => {
            const el = document.querySelector('#contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full flex items-center justify-center gap-2 bg-brand-green-50 hover:bg-brand-green-100 text-brand-green-700 font-semibold py-2.5 rounded-xl transition-colors text-sm"
        >
          <ShoppingCart className="w-4 h-4" />
          Request Quote
        </button>
      </div>
    </div>
  );
}

function ProductSubsection({
  title,
  icon: Icon,
  products,
  initialShow = 4,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  products: Product[];
  initialShow?: number;
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? products : products.slice(0, initialShow);

  return (
    <div className="mb-20 last:mb-0">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-brand-green-100 flex items-center justify-center">
          <Icon className="w-6 h-6 text-brand-green-700" />
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-brand-dark">{title}</h3>
          <p className="text-brand-stone text-sm">{products.length} products available</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length > initialShow && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 bg-brand-green-700 hover:bg-brand-green-800 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-lg shadow-brand-green-700/25"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-5 h-5" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5" />
                View More Products
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Products() {
  const [waterTanks, setWaterTanks] = useState<Product[]>([]);
  const [chainlink, setChainlink] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useScrollReveal(0.1);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*').order('created_at');
      if (data) {
        setWaterTanks(data.filter((p) => p.category === 'water_tanks'));
        setChainlink(data.filter((p) => p.category === 'chainlink_fencing'));
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <section id="products" className="py-24 bg-white">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <span className="text-brand-green-700 font-semibold text-sm uppercase tracking-wider">What We Offer</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mt-3 mb-4">Our Products</h2>
          <p className="text-brand-stone">
            Explore our comprehensive range of water storage tanks and security fencing solutions, built to withstand East African conditions.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-brand-cream rounded-2xl overflow-hidden animate-pulse">
                <div className="h-56 bg-brand-earth-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-brand-earth-200 rounded w-3/4" />
                  <div className="h-4 bg-brand-earth-200 rounded w-full" />
                  <div className="h-10 bg-brand-earth-200 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="reveal">
              <ProductSubsection
                title="Water Tanks"
                icon={Droplets}
                products={waterTanks}
                initialShow={4}
              />
            </div>
            <div className="reveal">
              <ProductSubsection
                title="Chainlink & Fencing Solutions"
                icon={Fence}
                products={chainlink}
                initialShow={4}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
