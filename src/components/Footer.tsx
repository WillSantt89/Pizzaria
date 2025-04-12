import React from 'react';
import { PhoneCall, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-red-600 text-white py-8">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <MapPin size={20} className="mr-2" />
          <p>R. dos Antúrios, 247 - Uberlândia, MG</p>
        </div>
        <div className="flex items-center justify-center mb-4">
          <PhoneCall size={20} className="mr-2" />
          <p>(34) 3210-1603</p>
        </div>
        <p>&copy; 2024 Like Pizza. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
