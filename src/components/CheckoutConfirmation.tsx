import React, { useState } from 'react';
import { useOrder } from './OrderContext';
import { Copy, Send } from 'lucide-react';
import { useCopyToClipboard } from 'react-use'; // Import the hook

function CheckoutConfirmation({ onClose }: { onClose: () => void }) {
  const { order, resetOrder, setDeliveryFee } = useOrder();
  const { size, flavors, extras, drinks, total, deliveryFee } = order;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [state, copyToClipboard] = useCopyToClipboard();

  const whatsappMessage = `
  🍕 Pedido de Pizza 🍕

  Tamanho: ${size || 'Não especificado'}
  Sabores: ${flavors.map((f) => f.name).join(', ') || 'Nenhum'}
  Adicionais: ${extras.map((e) => e.name).join(', ') || 'Nenhum'}
  Bebidas: ${drinks.map((d) => d.name).join(', ') || 'Nenhuma'}

  Taxa de entrega: R$${deliveryFee.toFixed(2)}
  Total: R$${total.toFixed(2)}

  ---
  Nome: ${name || 'Não informado'}
  Endereço: ${address || 'Não informado'}
  Pagamento: ${paymentMethod || 'Não informado'}
  `;

  const handleCopy = () => {
    copyToClipboard(whatsappMessage);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://web.whatsapp.com/send?text=${encodedMessage}`, '_blank');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate order submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    resetOrder();
    onClose();
    // Optionally, show a success message or redirect the user
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6">
        <h3 className="text-2xl font-semibold text-center">Confirmar Pedido</h3>

        <div>
          <p className="text-gray-700">
            Por favor, revise seu pedido e preencha as informações abaixo:
          </p>
          <pre className="bg-gray-100 p-4 rounded-md mt-2 text-sm whitespace-pre-wrap">
            {whatsappMessage}
          </pre>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Endereço
            </label>
            <input
              type="text"
              id="address"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
              Forma de Pagamento
            </label>
            <input
              type="text"
              id="paymentMethod"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleCopy}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md transition-all duration-300 flex items-center justify-center"
          >
            {isCopied ? 'Copiado!' : (
              <>
                <Copy size={16} className="mr-2" /> Copiar
              </>
            )}
          </button>
          <button
            onClick={handleOpenWhatsApp}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition-all duration-300 flex items-center justify-center"
          >
            <Send size={16} className="mr-2" /> Enviar no WhatsApp
          </button>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition-all duration-300"
          >
            Voltar
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition-all duration-300"
          >
            {isSubmitting ? 'Enviando...' : 'Confirmar Pedido'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutConfirmation;
