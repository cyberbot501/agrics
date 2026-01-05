import { useState } from 'react';
import { Menu, X } from 'lucide-react';
// import { Sprout } from 'lucide-react'
import logo from "../assets/logo.png"

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Products', id: 'products' },
    { name: 'Farming Calendar', id: 'calendar' },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            {/* <Sprout className="h-8 w-8 text-green-600" /> */}
            <img src={logo} alt=""  width={50} height={50}/>
            <div className='flex flex-col'>
                <span className="text-2xl font-bold text-green-700">Olupo Agriculture</span>
            <p className="text-sm text-gray-600">Production Nigeria Limited</p>
            </div>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === item.id ? 'text-green-600 border-b-2 border-green-600' : ''
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md ${
                  currentPage === item.id ? 'text-green-600 bg-green-50' : ''
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
