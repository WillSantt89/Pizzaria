import React from 'react';

function Menu() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">🍕 Cardápio da Pizza On</h2>

        {/* Pizzas Salgadas */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">🍕 PIZZAS SALGADAS (35cm – 8 fatias)</h3>
          <p className="italic mb-2">→ Escolha até 2 sabores</p>
          <ul>
            <MenuItem name="Calabresa" ingredients="Molho de tomate, mussarela, calabresa, cebola e orégano" price="R$ 39,90" />
            <MenuItem name="Frango com Catupiry" ingredients="Frango desfiado, catupiry, milho, mussarela e orégano" price="R$ 42,90" />
            <MenuItem name="Portuguesa" ingredients="Presunto, ovos, cebola, azeitona, ervilha, mussarela e orégano" price="R$ 44,90" />
            <MenuItem name="Quatro Queijos" ingredients="Mussarela, catupiry, parmesão e gorgonzola" price="R$ 45,90" />
            <MenuItem name="Baiana" ingredients="Calabresa moída, pimenta, cebola roxa, mussarela e orégano" price="R$ 43,90" />
            <MenuItem name="Napolitana" ingredients="Tomate em rodelas, parmesão, mussarela e orégano" price="R$ 40,90" />
          </ul>
        </div>

        {/* Pizzas Especiais */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">🥓 PIZZAS ESPECIAIS</h3>
          <p className="italic mb-2">(Sabores Gourmet para paladares exigentes)</p>
          <ul>
            <MenuItem name="Carne Seca com Requeijão" ingredients="Carne seca desfiada, requeijão cremoso, cebola caramelizada e mussarela" price="R$ 48,90" />
            <MenuItem name="Camarão com Catupiry" ingredients="Camarão refogado, catupiry, alho-poró e mussarela" price="R$ 54,90" />
            <MenuItem name="Rúcula com Tomate Seco" ingredients="Rúcula fresca, tomate seco, mussarela e parmesão ralado" price="R$ 47,90" />
          </ul>
        </div>

        {/* Pizzas Doces */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">🍭 PIZZAS DOCES (25cm – 6 fatias)</h3>
          <ul>
            <MenuItem name="Chocolate com Morango" ingredients="Chocolate ao leite, morango fatiado e granulado" price="R$ 34,90" />
            <MenuItem name="Prestígio" ingredients="Chocolate ao leite, coco ralado e leite condensado" price="R$ 33,90" />
            <MenuItem name="Banana com Canela" ingredients="Banana, açúcar, canela e doce de leite" price="R$ 31,90" />
            <MenuItem name="Ovomaltine" ingredients="Chocolate ao leite, Ovomaltine e leite condensado" price="R$ 35,90" />
          </ul>
        </div>

        {/* Bebidas */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">🥤 BEBIDAS</h3>
          <ul>
            <MenuItem name="Coca-Cola" size="2 Litros" price="R$ 12,00" />
            <MenuItem name="Coca-Cola" size="Lata" price="R$ 5,50" />
            <MenuItem name="Guaraná Antártica" size="2 Litros" price="R$ 11,00" />
            <MenuItem name="Água" size="500ml" price="R$ 3,00" />
            <MenuItem name="Suco Natural" size="300ml" price="R$ 7,00" />
          </ul>
        </div>

        {/* Adicionais */}
        <div>
          <h3 className="text-xl font-semibold mb-2">🧀 Adicionais</h3>
          <p className="italic mb-2">(R$ 3,00 cada)</p>
          <ul>
            <MenuItem name="Borda recheada" description="(catupiry / cheddar / chocolate)" price="R$ 3,00" />
            <MenuItem name="Bacon crocante" price="R$ 3,00" />
            <MenuItem name="Azeitonas extras" price="R$ 3,00" />
            <MenuItem name="Molho barbecue" price="R$ 3,00" />
          </ul>
        </div>
      </div>
    </section>
  );
}

interface MenuItemProps {
  name: string;
  ingredients?: string;
  price: string;
  size?: string;
  description?: string;
}

function MenuItem({ name, ingredients, price, size, description }: MenuItemProps) {
  return (
    <li className="flex justify-between py-2 border-b border-gray-200 last:border-none">
      <div>
        <span className="font-semibold">{name}</span>
        {size && <span className="ml-2 text-gray-500">({size})</span>}
        {description && <p className="text-gray-700 text-sm">{description}</p>}
        {ingredients && <p className="text-gray-700 text-sm">{ingredients}</p>}
      </div>
      <span>{price}</span>
    </li>
  );
}

export default Menu;
