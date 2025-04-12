import React from 'react';
import { PhoneCall, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-red-600 text-white py-8">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <MapPin size={20} className="mr-2" />
          <p>Rua da pizza, 50 Jardim das flores Sp</p>
        </div>
        <div className="flex items-center justify-center mb-4">
          <PhoneCall size={20} className="mr-2" />
          <p>(11) 4002-8922</p>
        </div>
        <p>&copy; 2024 Pizza On. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
