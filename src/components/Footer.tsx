import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-400">Olupo Agriculture</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Leading provider of quality agricultural products and services in Nigeria.
              From farm to table, we deliver excellence.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-green-400">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-gray-300 text-sm"> +234 802 4567 577, +234 803 6226 669, +234 809 9187 979</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-400" />
                <span className="text-gray-300 text-sm">olupoagric@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-400" />
                <span className="text-gray-300 text-sm">Nigeria</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-green-400">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Olupo Agriculture. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
