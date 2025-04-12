import React, { useState } from 'react';

interface MenuItem {
  id: number;
  image: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1593560708357-31558262b840?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      name: 'Pizza Calabresa',
      description: 'Molho de tomate, calabresa, cebola e azeitonas.',
      price: '45.00',
      category: 'Pizzas',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1565958217709-4301f0537961?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      name: 'Pizza Marguerita',
      description: 'Molho de tomate, mussarela, manjericão fresco.',
      price: '40.00',
      category: 'Pizzas',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1513106875850-6c043f877650?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      name: 'Pizza Frango com Catupiry',
      description: 'Frango desfiado, catupiry, milho verde.',
      price: '50.00',
      category: 'Pizzas',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1606787364408-5187a378647a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      name: 'Calzone Doce de Morango',
      description: 'Calzone com morango e chocolate.',
      price: '25.00',
      category: 'Calzones Doces',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7ed9181a8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      name: 'Coca-Cola',
      description: 'Refrigerante Coca-Cola 350ml',
      price: '8.00',
      category: 'Bebidas',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f0018ca7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      name: 'Promoção Pizza + Refri',
      description: 'Pizza grande + Coca-Cola 2L',
      price: '60.00',
      category: 'Promoções',
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState<MenuItem>({
    id: 0,
    image: '',
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const handleEdit = (item: MenuItem) => {
    setIsEditing(true);
    setEditingItem(item);
    setNewItem({ ...item });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingItem(null);
    setNewItem({
      id: 0,
      image: '',
      name: '',
      description: '',
      price: '',
      category: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      setMenuItems(
        menuItems.map((item) => (item.id === editingItem.id ? { ...newItem, id: editingItem.id } : item))
      );
      handleCancelEdit();
    }
  };

  const handleAddItem = () => {
    const newId = menuItems.length > 0 ? Math.max(...menuItems.map((item) => item.id)) + 1 : 1;
    setMenuItems([...menuItems, { ...newItem, id: newId }]);
    setNewItem({
      id: 0,
      image: '',
      name: '',
      description: '',
      price: '',
      category: '',
    });
  };

  const handleDelete = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Gerenciamento de Cardápio</h2>

      {/* Add/Edit Form */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium mb-2">
          {isEditing ? 'Editar Item' : 'Adicionar Item'}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              URL da Imagem
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={newItem.image}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={newItem.description}
              onChange={handleInputChange}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Preço
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={newItem.price}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Categoria
            </label>
            <select
              id="category"
              name="category"
              value={newItem.category}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            >
              <option value="">Selecione uma categoria</option>
              <option value="Pizzas">Pizzas</option>
              <option value="Calzones Doces">Calzones Doces</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Promoções">Promoções</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          {isEditing ? (
            <>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 mr-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Salvar
              </button>
            </>
          ) : (
            <button
              onClick={handleAddItem}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              Adicionar
            </button>
          )}
        </div>
      </div>

      {/* Menu Items List */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-medium mb-2">Itens do Cardápio</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nome
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Categoria
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Preço
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {menuItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-red-600 hover:text-red-900 mr-2"
                    >
                      Editar
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;
