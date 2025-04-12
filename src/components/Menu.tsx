import React, { useState } from 'react';
import MenuItem from './MenuItem';

interface MenuItemProps {
  id: number;
  image: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

const menuData: MenuItemProps[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f0018ca7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    name: 'Pizza Calabresa',
    description: 'Molho de tomate, calabresa, cebola e azeitonas.',
    price: 'R$45,00',
    category: 'Pizzas',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1565958217709-4301f0537961?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    name: 'Pizza Marguerita',
    description: 'Molho de tomate, mussarela, manjericão fresco.',
    price: 'R$40,00',
    category: 'Pizzas',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1513106875850-6c043f877650?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    name: 'Pizza Frango com Catupiry',
    description: 'Frango desfiado, catupiry, milho verde.',
    price: 'R$50,00',
    category: 'Pizzas',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1606787364408-5187a378647a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    name: 'Calzone Doce de Morango',
    description: 'Calzone com morango e chocolate.',
    price: 'R$25,00',
    category: 'Calzones Doces',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7ed9181a8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    name: 'Coca-Cola',
    description: 'Refrigerante Coca-Cola 350ml',
    price: 'R$8,00',
    category: 'Bebidas',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f0018ca7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    name: 'Promoção Pizza + Refri',
    description: 'Pizza grande + Coca-Cola 2L',
    price: 'R$60,00',
    category: 'Promoções',
  },
];

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('Pizzas');
  const categories = [...new Set(menuData.map((item) => item.category))];

  const filteredMenuItems = menuData.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        {/* Category Selection - Desktop */}
        <div className="hidden md:block overflow-x-auto whitespace-nowrap pb-4">
          <div className="flex space-x-4 px-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold ${
                  selectedCategory === category ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
                } hover:bg-red-700 transition-colors duration-200`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Category Selection - Mobile */}
        <div className="md:hidden px-4 mb-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-full bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
          {filteredMenuItems.map((item) => (
            <MenuItem
              key={item.id}
              image={item.image}
              name={item.name}
              description={item.description}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Menu;
