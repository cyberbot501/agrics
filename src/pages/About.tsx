import { Target, Eye, Award, Users } from 'lucide-react';
import farmBg from "../assets/camp.jpg";

export default function About() {
  return (
    <div className="min-h-screen pt-16">
      <section  style={{
    backgroundImage: `url(${farmBg})`,
  }}
  className="relative bg-cover bg-center bg-no-repeat text-white py-20"
>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Building a sustainable agricultural future for Nigeria
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Olupo Agriculture Prodution Nigeria Limited is established to engage in business of Agricultural services,
                  produce and processing, marketing, distribution, wholesales and retails of kinds
                  of Cocoa, Cashew nuts and all categories of fruit products.
                </p>
                <p>
                  We also deal in the business of chemical (Agro-allied) services, importation of
                  Agricultural equipment, raw materials and warehouse of all Agricultural produce,
                  agricultural farming, mechanized farming, fish farming, fish mills, poultry farming,
                  importation of farm inputs, livestock breeders, animal husbandry and Agricultural
                  services, farm produce and all kind of Agricultural equipment, tools, marketing,
                  importation of Agricultural raw material, warehouse of all Agricultural produce
                  and products in all ramifications.
                </p>
                <p>
                  We engage in business of factory natural juice and carry on the production and
                  packaging and sealing of natural juice. We carry on juice purification, treatment
                  services, food production, food processing, foodstuffs, beverages, distribution,
                  suppliers of all kinds of food items, process of fruit juice (Orange, Cashew, Mango,
                  Guava, Apple, Pineapple, Strawberry, Grape, Watermelon, Coconut and Ginger juice).
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-12 shadow-2xl">
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Assured</h3>
                      <p className="text-gray-600">Premium products from sustainable sources</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Customer First</h3>
                      <p className="text-gray-600">Dedicated to meeting your agricultural needs</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
                      <p className="text-gray-600">Modern farming techniques and equipment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Vision
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-12 border-4 border-green-100">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center">
                  <Eye className="h-10 w-10 text-white" />
                </div>
              </div>
              <p className="text-2xl text-center text-gray-700 leading-relaxed font-medium">
                To become a leading force in Nigeria's agricultural sector, delivering quality,
                innovation, and sustainability in every facet of our business.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
              <div className="text-4xl font-bold text-green-600 mb-4">Quality</div>
              <p className="text-gray-600 text-lg">
                We never compromise on the quality of our products and services
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
              <div className="text-4xl font-bold text-green-600 mb-4">Sustainability</div>
              <p className="text-gray-600 text-lg">
                Environmentally responsible farming practices for future generations
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
              <div className="text-4xl font-bold text-green-600 mb-4">Integrity</div>
              <p className="text-gray-600 text-lg">
                Honest and transparent business dealings with all stakeholders
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
