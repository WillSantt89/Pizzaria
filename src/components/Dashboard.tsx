import React, { useState, useEffect } from 'react';
import { useOrder } from './OrderContext';
import { BarChart2, PieChart, Calendar, DollarSign, User, Award } from 'lucide-react';

// Simulated data (replace with actual data fetching)
const generateRandomOrders = (count: number) => {
  const pizzas = ['Margherita', 'Pepperoni', 'Vegetarian', 'Hawaiian'];
  const customers = ['John Doe', 'Jane Smith', 'Peter Jones', 'Alice Brown'];
  const statuses = ['Novo', 'Entregue', 'Cancelado'];

  const orders = [];
  for (let i = 0; i < count; i++) {
    const date = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000); // Last 7 days
    orders.push({
      id: i + 1,
      customer: customers[Math.floor(Math.random() * customers.length)],
      pizza: pizzas[Math.floor(Math.random() * pizzas.length)],
      value: parseFloat((Math.random() * 30).toFixed(2)),
      date: date.toLocaleDateString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      coupon: Math.random() > 0.8 ? 'PIZZA20' : null, // 20% chance of a coupon
    });
  }
  return orders;
};

function Dashboard() {
  const { order } = useOrder();
  const [orders, setOrders] = useState(generateRandomOrders(20)); // Initial data
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [filters, setFilters] = useState({
    date: '',
    value: '',
    customer: '',
  });

  // Filter orders
  useEffect(() => {
    let newFilteredOrders = [...orders];

    if (filters.date) {
      newFilteredOrders = newFilteredOrders.filter((order) => order.date === filters.date);
    }
    if (filters.value) {
      newFilteredOrders = newFilteredOrders.filter((order) => order.value.toString().includes(filters.value));
    }
    if (filters.customer) {
      newFilteredOrders = newFilteredOrders.filter((order) =>
        order.customer.toLowerCase().includes(filters.customer.toLowerCase())
      );
    }

    setFilteredOrders(newFilteredOrders);
  }, [filters, orders]);

  // Calculate metrics
  const mostOrderedPizza = () => {
    const pizzaCounts: { [key: string]: number } = {};
    filteredOrders.forEach((order) => {
      pizzaCounts[order.pizza] = (pizzaCounts[order.pizza] || 0) + 1;
    });
    let mostOrdered = '';
    let maxCount = 0;
    for (const pizza in pizzaCounts) {
      if (pizzaCounts[pizza] > maxCount) {
        maxCount = pizzaCounts[pizza];
        mostOrdered = pizza;
      }
    }
    return mostOrdered;
  };

  const averageTicket = () => {
    if (filteredOrders.length === 0) return 0;
    const total = filteredOrders.reduce((sum, order) => sum + order.value, 0);
    return (total / filteredOrders.length).toFixed(2);
  };

  const recurringCustomers = () => {
    const customerCounts: { [key: string]: number } = {};
    filteredOrders.forEach((order) => {
      customerCounts[order.customer] = (customerCounts[order.customer] || 0) + 1;
    });
    const recurring = Object.entries(customerCounts)
      .filter(([, count]) => count > 1)
      .map(([customer]) => customer);
    return recurring;
  };

  const usedCoupons = () => {
    const coupons = filteredOrders.filter((order) => order.coupon).map((order) => order.coupon);
    return [...new Set(coupons)]; // Remove duplicates
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Points and Loyalty
  const pointsToFreePizza = 100; // Example: 100 points for a free pizza
  const pointsProgress = Math.min(100, (order.points / pointsToFreePizza) * 100); // Ensure progress doesn't exceed 100%

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard da Pizzaria</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metrics Cards */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center space-x-2">
            <BarChart2 size={20} />
            <span className="font-medium">Pizza Mais Pedida</span>
          </div>
          <p className="text-2xl font-bold mt-2">{mostOrderedPizza() || 'Nenhuma'}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center space-x-2">
            <PieChart size={20} />
            <span className="font-medium">Ticket Médio</span>
          </div>
          <p className="text-2xl font-bold mt-2">R${averageTicket()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center space-x-2">
            <User size={20} />
            <span className="font-medium">Clientes Recorrentes</span>
          </div>
          <p className="text-2xl font-bold mt-2">{recurringCustomers().length}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center space-x-2">
            <DollarSign size={20} />
            <span className="font-medium">Cupons Utilizados</span>
          </div>
          <p className="text-2xl font-bold mt-2">{usedCoupons().length}</p>
        </div>
      </div>

      {/* Loyalty Section */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center space-x-2">
          <Award size={20} /> Pontos de Fidelidade
        </h3>
        <p>Você tem {order.points} pontos.</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${pointsProgress}%` }} />
        </div>
        {pointsProgress === 100 && <p className="mt-2 text-green-600">Você já pode pedir uma pizza grátis!</p>}
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-xl font-semibold mb-2">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Calendar size={16} className="text-gray-500" />
            <input
              type="date"
              name="date"
              onChange={handleFilterChange}
              value={filters.date}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Data"
            />
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign size={16} className="text-gray-500" />
            <input
              type="text"
              name="value"
              onChange={handleFilterChange}
              value={filters.value}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Valor"
            />
          </div>
          <div className="flex items-center space-x-2">
            <User size={16} className="text-gray-500" />
            <input
              type="text"
              name="customer"
              onChange={handleFilterChange}
              value={filters.customer}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Cliente"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-xl font-semibold mb-2">Lista de Pedidos</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pizza
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cupom
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.pizza}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R${order.value.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.coupon || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recurring Customers */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-xl font-semibold mb-2">Clientes Recorrentes</h3>
          <ul>
            {recurringCustomers().map((customer) => (
              <li key={customer} className="py-1">
                {customer}
              </li>
            ))}
          </ul>
        </div>

        {/* Used Coupons */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-xl font-semibold mb-2">Cupons Utilizados</h3>
          <ul>
            {usedCoupons().map((coupon) => (
              <li key={coupon} className="py-1">
                {coupon}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
