import { Tractor, Fish, Beef, Droplets, Truck, Package, Wheat, ShoppingBag } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Tractor,
      title: 'Agricultural Services',
      description: 'We offer a full range of agricultural services, from produce processing to distribution and farm management.',
      features: ['Produce Processing', 'Farm Management', 'Distribution Services', 'Mechanized Farming'],
    },
    {
      icon: Fish,
      title: 'Fish Farming',
      description: 'Specializing in fish farming and aquaculture, we ensure sustainable practices for healthy and profitable yields.',
      features: ['Catfish Farming', 'Fish Mills', 'Aquaculture Consultation', 'Sustainable Practices'],
    },
    {
      icon: Beef,
      title: 'Livestock Distribution',
      description: 'We breed, raise, and distribute livestock, ensuring the highest standards for cattle, poultry, and more.',
      features: ['Cattle Breeding', 'Poultry Farming', 'Sheep & Goats', 'Animal Husbandry'],
    },
    {
      icon: Droplets,
      title: 'Fruit Juice Production',
      description: 'Our natural juices, made from the finest fruits, are packaged and distributed for healthy consumption.',
      features: ['Orange Juice', 'Mango Juice', 'Cashew Juice', 'Mixed Fruit Blends'],
    },
    {
      icon: Truck,
      title: 'Home Delivery',
      description: 'Enjoy the convenience of having fresh farm products delivered straight to your doorstep. We offer reliable and timely delivery.',
      features: ['Same-Day Delivery', 'Fresh Products', 'Nationwide Coverage', 'Order Tracking'],
    },
    {
      icon: Package,
      title: 'Feed Milling',
      description: 'Providing high-quality feed for poultry, fish, and livestock to ensure optimal growth.',
      features: ['Poultry Feed', 'Fish Feed', 'Livestock Feed', 'Custom Formulations'],
    },
  ];

  const featuredProducts = [
    {
      icon: ShoppingBag,
      title: 'Poultry Products',
      description: 'We supply eggs, chicken, and turkey, ensuring quality from farm to table.',
    },
    {
      icon: Wheat,
      title: 'Cocoa & Cashew',
      description: 'We process and distribute premium cocoa and cashew nuts, sourced from sustainable farms.',
    },
    {
      icon: Package,
      title: 'Livestock Feed Milling',
      description: 'Providing high-quality feed for poultry, fish, and livestock to ensure optimal growth.',
    },
    {
      icon: Fish,
      title: 'Aquaculture Feed',
      description: 'Specializing in aquaculture feed, we cater to the nutritional needs of fish farming.',
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Explore the diverse range of services we provide to meet your agricultural and food production needs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What We Do
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive agricultural solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-green-50 rounded-2xl border-2 border-gray-100 hover:border-green-300 transition-all duration-300 hover:shadow-2xl overflow-hidden group"
                >
                  <div className="p-8">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                      <Icon className="h-8 w-8 text-green-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              High-quality products for every agricultural need
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => {
              const Icon = product.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Vision
            </h2>
            <p className="text-2xl leading-relaxed opacity-95">
              To become a leading force in Nigeria's agricultural sector, delivering quality,
              innovation, and sustainability in every facet of our business.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
