import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import OrderWizard from './components/OrderWizard';
import LoginScreen from './components/LoginScreen';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { OrderProvider } from './components/OrderContext';
import './index.css';
import MenuManagement from './components/MenuManagement';

function App() {
  return (
    <Router>
      <OrderProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/order" element={<OrderWizard />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/menu" element={<MenuManagement />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </OrderProvider>
    </Router>
  );
}

export default App;
