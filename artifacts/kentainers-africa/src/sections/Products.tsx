import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Droplets, Fence } from "lucide-react";

const waterTanks = [
  { name: "Kentainers 500L", capacity: "500 Litres", price: "KES 4,500" },
  { name: "Kentainers 1,000L", capacity: "1,000 Litres", price: "KES 7,500" },
  { name: "Kentainers 2,300L", capacity: "2,300 Litres", price: "KES 14,000" },
  { name: "Kentainers 5,000L", capacity: "5,000 Litres", price: "KES 28,000" },
  { name: "Kentainers 10,000L", capacity: "10,000 Litres", price: "KES 52,000" },
  { name: "Kentainers 20,000L", capacity: "20,000 Litres", price: "KES 95,000" },
];

const chainlinkProducts = [
  { name: "Galvanized Chainlink", detail: '2" mesh, 1.8mm wire', price: "KES 1,200/m" },
  { name: "PVC Coated Chainlink", detail: '2" mesh, 2.0mm wire', price: "KES 1,800/m" },
  { name: "Hexagonal Wire Mesh", detail: "1.2m x 50m rolls", price: "KES 3,500/roll" },
  { name: "Chicken Wire (Kukunet)", detail: "1.2m x 50m rolls", price: "KES 2,800/roll" },
  { name: "Chainlink Posts", detail: "2.1m galvanized", price: "KES 350/pc" },
  { name: "Installation Services", detail: "Professional setup", price: "Custom Quote" },
];

function ProductCard({
  name,
  detail,
  price,
  icon,
}: {
  name: string;
  detail: string;
  price: string;
  icon: React.ReactNode;
}) {
  const requestQuote = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white border border-brand-stone-200 rounded-xl p-6 hover:shadow-lg hover:border-brand-green-300 transition-all group">
      <div className="w-12 h-12 rounded-lg bg-brand-green-100 flex items-center justify-center mb-4 group-hover:bg-brand-green-700 transition-colors">
        <span className="text-brand-green-700 group-hover:text-white transition-colors">
          {icon}
        </span>
      </div>
      <h3 className="font-semibold text-brand-dark text-lg mb-1">{name}</h3>
      <p className="text-brand-stone-500 text-sm mb-3">{detail}</p>
      <p className="text-brand-green-700 font-bold text-lg mb-4">{price}</p>
      <button
        onClick={requestQuote}
        className="w-full bg-brand-green-700 hover:bg-brand-green-800 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors"
      >
        Request Quote
      </button>
    </div>
  );
}

export default function Products() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="products"
      ref={ref}
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
            Our Products
          </h2>
          <p className="text-brand-stone-500 max-w-2xl mx-auto">
            Quality water tanks and fencing solutions for every need
          </p>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Droplets className="w-6 h-6 text-brand-green-700" />
            <h3 className="text-2xl font-bold text-brand-dark">Water Tanks</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {waterTanks.map((tank) => (
              <ProductCard
                key={tank.name}
                name={tank.name}
                detail={tank.capacity}
                price={tank.price}
                icon={<Droplets className="w-5 h-5" />}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-8">
            <Fence className="w-6 h-6 text-brand-green-700" />
            <h3 className="text-2xl font-bold text-brand-dark">
              Chainlink & Wire Products
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {chainlinkProducts.map((product) => (
              <ProductCard
                key={product.name}
                name={product.name}
                detail={product.detail}
                price={product.price}
                icon={<Fence className="w-5 h-5" />}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
