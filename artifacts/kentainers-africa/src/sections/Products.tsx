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

function cloudinaryThumb(url: string) {
  return url
    .replace('/video/upload/', '/video/upload/so_0,w_600,h_400,c_fill/')
    .replace(/\.mp4$/, '.jpg');
}

const STATIC_WATER_TANKS: Product[] = [
  {
    id: 'wtp1',
    name: '500L Polyethylene Water Tank',
    description: 'Compact and lightweight polyethylene tank ideal for household use, small gardens, and rural homesteads.',
    category: 'water_tanks',
    image_url: cloudinaryThumb('https://res.cloudinary.com/dvru78pi3/video/upload/v1780963554/wt1_ehrqxa.mp4'),
    price_label: 'From KES 5,500',
  },
  {
    id: 'wtp2',
    name: '1,000L Water Storage Tank',
    description: 'Mid-size polyethylene tank perfect for family homes and small businesses needing reliable water storage.',
    category: 'water_tanks',
    image_url: cloudinaryThumb('https://res.cloudinary.com/dvru78pi3/video/upload/v1780963622/wt3_cpf1no.mp4'),
    price_label: 'From KES 9,800',
  },
  {
    id: 'wtp3',
    name: '2,000L Water Tank',
    description: 'Popular mid-large tank for apartment buildings, schools, and offices across East Africa.',
    category: 'water_tanks',
    image_url: cloudinaryThumb('https://res.cloudinary.com/dvru78pi3/video/upload/v1780963548/wt5_uxp6ow.mp4'),
    price_label: 'From KES 17,500',
  },
  {
    id: 'wtp4',
    name: '5,000L Commercial Tank',
    description: 'Large-capacity tank for commercial properties, farms, and institutions requiring high-volume water storage.',
    category: 'water_tanks',
    image_url: cloudinaryThumb('https://res.cloudinary.com/dvru78pi3/video/upload/v1780963700/wt7_uzrrow.mp4'),
    price_label: 'From KES 38,000',
  },
  {
    id: 'wtp5',
    name: '10,000L Industrial Tank',
    description: 'Heavy-duty industrial-grade tank for factories, hotels, and large construction sites.',
    category: 'water_tanks',
    image_url: cloudinaryThumb('https://res.cloudinary.com/dvru78pi3/video/upload/v1780963671/wt9_yc1ecp.mp4'),
    price_label: 'From KES 72,000',
  },
  {
    id: 'wtp6',
    name: '20,000L Water Reservoir',
    description: 'Ultra-large reservoir tank for community water projects, NGOs, and government water supply programmes.',
    category: 'water_tanks',
    image_url: cloudinaryThumb('https://res.cloudinary.com/dvru78pi3/video/upload/v1780963579/wt8_eosqi0.mp4'),
    price_label: 'Get a Quote',
  },
];

const STATIC_CHAINLINK: Product[] = [
  {
    id: 'clp1',
    name: 'Galvanized Chainlink — 3ft',
    description: 'Standard galvanized chainlink fencing, 3ft high. Ideal for garden boundaries, poultry runs, and light security.',
    category: 'chainlink_fencing',
    image_url: '/chainlink/cl-img1.jpeg',
    price_label: 'Per Roll',
  },
  {
    id: 'clp2',
    name: 'Heavy Duty Chainlink — 6ft',
    description: 'Industrial-grade galvanized 6ft chainlink for schools, factories, estates, and perimeter security fencing.',
    category: 'chainlink_fencing',
    image_url: '/chainlink/cl-img2.jpeg',
    price_label: 'Per Roll',
  },
  {
    id: 'clp3',
    name: 'PVC Coated Chainlink',
    description: 'Colour-coated chainlink (green, black, yellow) for decorative yet durable perimeter fencing solutions.',
    category: 'chainlink_fencing',
    image_url: '/chainlink/cl-img8.jpeg',
    price_label: 'Per Roll',
  },
  {
    id: 'clp4',
    name: 'Hexagonal Wire Mesh',
    description: 'Flexible hexagonal wire mesh for poultry farms, garden netting, and gabion basket filling.',
    category: 'chainlink_fencing',
    image_url: '/chainlink/cl-img3.jpeg',
    price_label: 'Per Roll',
  },
  {
    id: 'clp5',
    name: 'Chicken Wire (Kukunet)',
    description: 'Premium galvanized Kukunet hexagonal wire mesh, 30m rolls. Ideal for chicken coops, farms, and small animal enclosures.',
    category: 'chainlink_fencing',
    image_url: '/chainlink/cl-img9.jpeg',
    price_label: 'Per Roll',
  },
  {
    id: 'clp6',
    name: 'Bulk Chainlink Supply',
    description: 'Wholesale bulk rolls of galvanized chainlink for large-scale projects, contractors, and resellers across East Africa.',
    category: 'chainlink_fencing',
    image_url: '/chainlink/cl-img7.jpeg',
    price_label: 'Bulk Pricing',
  },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-earth-200">
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {product.price_label && (
          <div className="absolute top-3 right-3 bg-brand-green-700 text-white text-xs font-bold px-3 py-1 rounded-full">
            {product.price_label}
          </div>
        )}
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

  if (products.length === 0) return null;

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                View All Products
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Products() {
  const [dbWaterTanks, setDbWaterTanks] = useState<Product[]>([]);
  const [dbChainlink, setDbChainlink] = useState<Product[]>([]);
  const sectionRef = useScrollReveal(0.1);

  useEffect(() => {
    async function fetchProducts() {
      if (!supabase) return;
      const { data } = await supabase.from('products').select('*').order('created_at');
      if (data) {
        setDbWaterTanks(data.filter((p) => p.category === 'water_tanks'));
        setDbChainlink(data.filter((p) => p.category === 'chainlink_fencing'));
      }
    }
    fetchProducts();
  }, []);

  const waterTanks = dbWaterTanks.length > 0 ? dbWaterTanks : STATIC_WATER_TANKS;
  const chainlink = dbChainlink.length > 0 ? dbChainlink : STATIC_CHAINLINK;

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
      </div>
    </section>
  );
}
