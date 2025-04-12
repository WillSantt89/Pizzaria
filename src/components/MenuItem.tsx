import React from 'react';

interface MenuItemProps {
  image: string;
  name: string;
  description: string;
  price: string;
}

function MenuItem({ image, name, description, price }: MenuItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden menu-item">
      <img className="w-full h-48 object-cover" src={image} alt={name} />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <p className="text-gray-700 text-sm mb-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold">{price}</span>
          <button className="button-primary">Adicionar</button>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
