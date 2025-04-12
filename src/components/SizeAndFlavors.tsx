import React from 'react';
import { useOrder } from './OrderContext';

const sizes = [
  { name: 'Pequena', price: 20 },
  { name: 'Média', price: 30 },
  { name: 'Grande', price: 40 },
];

const flavors = [
  { name: 'Calabresa', price: 0 },
  { name: 'Marguerita', price: 0 },
  { name: 'Frango com Catupiry', price: 5 },
];

function SizeAndFlavors() {
  const { order, setSize, addFlavor, removeFlavor } = useOrder();
  const { size, flavors: selectedFlavors } = order;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Escolha o Tamanho</h3>
      <div className="flex space-x-4">
        {sizes.map((s) => (
          <button
            key={s.name}
            onClick={() => setSize(s.name)}
            className={`px-4 py-2 rounded-full font-semibold ${
              size === s.name ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-red-700 transition-colors duration-200`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <h3 className="text-xl font-semibold">Escolha os Sabores</h3>
      <div className="grid grid-cols-2 gap-4">
        {flavors.map((flavor) => (
          <button
            key={flavor.name}
            onClick={() => {
              if (selectedFlavors.some((f) => f.name === flavor.name)) {
                removeFlavor(flavor);
              } else {
                addFlavor(flavor);
              }
            }}
            className={`px-4 py-2 rounded-full font-semibold ${
              selectedFlavors.some((f) => f.name === flavor.name)
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700'
            } hover:bg-red-700 transition-colors duration-200`}
          >
            {flavor.name}
            {flavor.price > 0 && (
              <span className="text-xs text-gray-500 ml-1">(+R${flavor.price.toFixed(2)})</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SizeAndFlavors;
