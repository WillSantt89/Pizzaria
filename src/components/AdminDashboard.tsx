import React from 'react';
import {
  Menu,
  PieChart,
  Settings,
  CreditCard,
  BarChart2,
  LogOut,
} from 'lucide-react';

function AdminDashboard() {
  const handleLogout = () => {
    // In a real app, you'd clear the authentication state and redirect to the login page
    alert('Logout');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Painel Administrativo</h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <LogOut size={16} />
            <span>Sair</span>
          </button>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Menu Management Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <Menu className="h-6 w-6 text-gray-500" aria-hidden="true" />
                  <span className="ml-5 text-sm font-medium text-gray-900">Gerenciar Cardápio</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">Editar itens, preços e categorias.</p>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Acessar
                </button>
              </div>
            </div>

            {/* Coupons and Promotions Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <CreditCard className="h-6 w-6 text-gray-500" aria-hidden="true" />
                  <span className="ml-5 text-sm font-medium text-gray-900">Cupons e Promoções</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">Criar e gerenciar cupons e promoções.</p>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Acessar
                </button>
              </div>
            </div>

            {/* Statistics Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <BarChart2 className="h-6 w-6 text-gray-500" aria-hidden="true" />
                  <span className="ml-5 text-sm font-mediumtext-gray-900">Estatísticas</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">Visualizar dados de vendas e desempenho.</p>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Acessar
                </button>
              </div>
            </div>

            {/* Settings Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <Settings className="h-6 w-6 text-gray-500" aria-hidden="true" />
                  <span className="ml-5 text-sm font-medium text-gray-900">Configurações</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">Configurar horários de funcionamento e outras opções.</p>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Acessar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
