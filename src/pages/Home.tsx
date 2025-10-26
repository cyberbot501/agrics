import { Wheat, Fish, Beef, Droplets, Truck, Package } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const features = [
    {
      icon: Wheat,
      title: 'Premium Produce',
      description: 'Quality cocoa, cashew, and agricultural products',
    },
    {
      icon: Fish,
      title: 'Aquaculture',
      description: 'Sustainable fish farming and quality catfish',
    },
    {
      icon: Beef,
      title: 'Livestock',
      description: 'Healthy poultry, cattle, sheep, and goats',
    },
    {
      icon: Droplets,
      title: 'Natural Juices',
      description: 'Fresh fruit juices from the finest produce',
    },
    {
      icon: Package,
      title: 'Feed Services',
      description: 'Quality feed milling and ingredients',
    },
    {
      icon: Truck,
      title: 'Home Delivery',
      description: 'Fresh products delivered to your doorstep',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Cultivating Excellence
              <span className="block text-green-600 mt-2">From Farm to Table</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Nigeria's trusted partner in agriculture, livestock, and natural food production.
              Quality products, sustainable practices, exceptional service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('products')}
                className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg text-lg font-semibold"
              >
                Browse Products
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="px-8 py-4 bg-white text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg text-lg font-semibold"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive agricultural solutions for modern farming needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-8 bg-gradient-to-br from-white to-green-50 rounded-2xl border-2 border-gray-100 hover:border-green-300 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                    <Icon className="h-8 w-8 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Explore our wide range of quality products and services tailored to your agricultural needs
          </p>
          <button
            onClick={() => onNavigate('products')}
            className="px-10 py-4 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl text-lg font-semibold"
          >
            View All Products
          </button>
        </div>
      </section>
    </div>
  );
}
