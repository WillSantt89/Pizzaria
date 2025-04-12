import React from 'react';
import { useOrder } from './OrderContext';

const drinks = [
  { name: 'Coca-Cola', price: 8 },
  { name: 'Guaraná', price: 7 },
];

function Drinks() {
  const { order, addDrink, removeDrink } = useOrder();
  const { drinks: selectedDrinks } = order;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Bebidas</h3>
      <div className="grid grid-cols-2 gap-4">
        {drinks.map((drink) => (
          <button
            key={drink.name}
            onClick={() => {
              if (selectedDrinks.some((d) => d.name === drink.name)) {
                removeDrink(drink);
              } else {
                addDrink(drink);
              }
            }}
            className={`px-4 py-2 rounded-full font-semibold ${
              selectedDrinks.some((d) => d.name === drink.name)
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700'
            } hover:bg-red-700 transition-colors duration-200`}
          >
            {drink.name}
            {drink.price > 0 && (
              <span className="text-xs text-gray-500 ml-1">(+R${drink.price.toFixed(2)})</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Drinks;
