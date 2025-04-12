import React from 'react';
import { useOrder } from './OrderContext';

function OrderSummary() {
  const { order } = useOrder();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
      {order.items.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {order.items.map((item, index) => (
            <li key={index} className="flex justify-between py-2 border-b border-gray-200">
              <span>{item.name}</span>
              <span>R${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 text-right">
        <p className="text-lg font-bold">Total: R${order.total.toFixed(2)}</p>
        <button className="button-primary mt-2">Finalizar Pedido</button>
      </div>
    </div>
  );
}

export default OrderSummary;
