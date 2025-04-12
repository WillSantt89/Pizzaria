import React from 'react';
import { Pizza } from 'lucide-react';

function Header() {
  return (
    <header className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-0">
        <div className="flex items-center">
          <Pizza size={32} color="#e53e3e" className="mr-2" />
          <span className="text-2xl font-bold text-red-600">Pizza On</span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-red-600 transition-colors duration-200">
                Cardápio
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 transition-colors duration-200">
                Promoções
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 transition-colors duration-200">
                Contato
              </a>
            </li>
            <li>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-red-600 font-bold py-2 px-4 rounded-full shadow-md transition-all duration-300">
                Pedir Agora
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
