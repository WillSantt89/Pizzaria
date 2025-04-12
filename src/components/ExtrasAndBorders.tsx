import React from 'react';
import { useOrder } from './OrderContext';

const extras = [
  { name: 'Borda de Catupiry', price: 8 },
  { name: 'Bacon', price: 5 },
];

function ExtrasAndBorders() {
  const { order, addExtra, removeExtra } = useOrder();
  const { extras: selectedExtras } = order;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Adicionais</h3>
      <div className="grid grid-cols-2 gap-4">
        {extras.map((extra) => (
          <button
            key={extra.name}
            onClick={() => {
              if (selectedExtras.some((e) => e.name === extra.name)) {
                removeExtra(extra);
              } else {
                addExtra(extra);
              }
            }}
            className={`px-4 py-2 rounded-full font-semibold ${
              selectedExtras.some((e) => e.name === extra.name)
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700'
            } hover:bg-red-700 transition-colors duration-200`}
          >
            {extra.name}
            {extra.price > 0 && (
              <span className="text-xs text-gray-500 ml-1">(+R${extra.price.toFixed(2)})</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ExtrasAndBorders;
