import React, { useState } from 'react';
import { useOrder } from './OrderContext';
import SizeAndFlavors from './SizeAndFlavors';
import ExtrasAndBorders from './ExtrasAndBorders';
import Drinks from './Drinks';
import OrderSummary from './OrderSummary';

const steps = [
  { id: 1, name: 'Tamanho e Sabores', component: SizeAndFlavors },
  { id: 2, name: 'Adicionais e Bordas', component: ExtrasAndBorders },
  { id: 3, name: 'Bebidas', component: Drinks },
  { id: 4, name: 'Resumo', component: OrderSummary },
];

function OrderWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const { order } = useOrder();

  const CurrentStepComponent = steps.find((step) => step.id === currentStep)?.component;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-center mb-4">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center space-x-2 ${
              step.id <= currentStep ? 'text-red-600' : 'text-gray-400'
            }`}
          >
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step.id <= currentStep ? 'border-red-600' : 'border-gray-400'
              }`}
            >
              {step.id}
            </span>
            <span>{step.name}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {CurrentStepComponent && <CurrentStepComponent />}

        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded-full font-semibold ${
              currentStep === 1 ? 'bg-gray-300 text-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors duration-200`}
          >
            Voltar
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length}
            className={`px-4 py-2 rounded-full font-semibold ${
              currentStep === steps.length ? 'bg-gray-300 text-gray-500' : 'bg-red-600 text-white hover:bg-red-700'
            } transition-colors duration-200`}
          >
            {currentStep === steps.length ? 'Finalizar' : 'Próximo'}
          </button>
        </div>
      </div>

      <div className="mt-4 text-right">
        <p className="text-lg font-bold">Total: R${order.total.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default OrderWizard;
