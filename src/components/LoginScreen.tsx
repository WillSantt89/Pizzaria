import React, { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { CheckCircle, Loader2 } from 'lucide-react';

function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const handleSendCode = async () => {
    setVerificationError('');
    if (!phoneNumber) {
      setVerificationError('Por favor, insira um número de telefone.');
      return;
    }

    setIsLoading(true);
    // Simulate sending verification code (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsCodeSent(true);
  };

  const handleVerifyCode = async () => {
    setVerificationError('');
    if (!verificationCode) {
      setVerificationError('Por favor, insira o código de verificação.');
      return;
    }

    setIsLoading(true);
    // Simulate code verification (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (verificationCode === '123456') {
      setVerificationSuccess(true);
    } else {
      setVerificationError('Código de verificação inválido.');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Bem-vindo(a)
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Insira seu número de telefone para começar.
          </p>
        </div>
        {verificationError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{verificationError}</span>
          </div>
        )}
        {verificationSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">Verificação concluída com sucesso!</span>
          </div>
        )}
        <div className="mt-8 space-y-6">
          {!isCodeSent && !verificationSuccess && (
            <div>
              <label htmlFor="phone" className="sr-only">
                Número de Telefone
              </label>
              <PhoneInput
                id="phone"
                value={phoneNumber}
                onChange={setPhoneNumber}
                placeholder="Número de Telefone"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              />
              <button
                type="button"
                onClick={handleSendCode}
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-2"
              >
                {isLoading ? (
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <Loader2 className="h-5 w-5 text-white animate-spin" aria-hidden="true" />
                  </span>
                ) : (
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    Enviar Código
                  </span>
                )}
                Enviar Código
              </button>
            </div>
          )}
          {isCodeSent && !verificationSuccess && (
            <div>
              <label htmlFor="verification-code" className="sr-only">
                Código de Verificação
              </label>
              <input
                type="text"
                id="verification-code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Código de Verificação"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              />
              <button
                type="button"
                onClick={handleVerifyCode}
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-2"
              >
                {isLoading ? (
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <Loader2 className="h-5 w-5 text-white animate-spin" aria-hidden="true" />
                  </span>
                ) : (
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    Verificar Código
                  </span>
                )}
                Verificar Código
              </button>
            </div>
          )}
          {verificationSuccess && (
            <div className="flex items-center justify-center">
              <CheckCircle size={32} color="green" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
