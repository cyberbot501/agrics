import { useEffect, useState } from 'react';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import { supabase, Product } from '../lib/supabase';
import PurchaseModal from '../components/PurchaseModal';
import farmBg from "../assets/cap.jpg";
import pot from "../assets/pot.jpg";
import cow from "../assets/cow.jpg";
import feed from "../assets/feed.jpg";
import veg from "../assets/veg.jpg";
import catf from "../assets/catf.jpg";


export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('in_stock', true)
        .order('category', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Poultry': pot,
      'Aquaculture': catf,
      'Livestock': cow,
      'Feed Services': feed,
      'Vegetables': veg,
    };
    return icons[category] || '🌱';
  };

  return (
    <div className="min-h-screen pt-16">
      <section style={{
    backgroundImage: `url(${farmBg})`,
  }}
  className="relative bg-cover bg-center bg-no-repeat text-white py-20"
>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Products</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Quality agricultural products at competitive prices
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white sticky top-16 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="h-5 w-5 text-gray-600 flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-600">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 h-48 flex items-center justify-center">
                   <img src={getCategoryIcon(product.category)} alt="" className='w-full h-full'/>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-0">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {product.name}
                        </h3>
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {product.description}
                    </p>

                    <div className="flex items-baseline space-x-2 mb-4">
                      {product.price > 0 ? (
                        <>
                          <span className="text-3xl font-bold text-green-600">
                            ₦{product.price.toLocaleString()}
                          </span>
                          <span className="text-gray-600">{product.unit}</span>
                        </>
                      ) : (
                        <span className="text-xl font-semibold text-gray-700">
                          {product.unit}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span className="font-semibold">Buy Now</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedProduct && (
        <PurchaseModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
