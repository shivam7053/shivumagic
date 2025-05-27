'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OrderForm() {
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderId.trim()) {
      setError('');
      router.push(`/order/${orderId.trim()}`);
    } else {
      setError('Please enter a valid Order ID.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/70 dark:bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200 dark:border-gray-700 transition-all duration-300"
        aria-describedby="order-id-error"
        noValidate
      >
        <header className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white drop-shadow-sm">
            📦 Track Your Order
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
            Enter your unique order ID to check progress
          </p>
        </header>

        <label
          htmlFor="order-id"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
        >
          Order ID
        </label>
        <input
          id="order-id"
          name="order-id"
          type="text"
          placeholder="e.g. ORD12345"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          autoComplete="off"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "order-id-error" : undefined}
          className={`w-full px-4 py-3 rounded-lg 
            bg-white/80 dark:bg-gray-800 border 
            ${error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700'} 
            placeholder-gray-400 text-gray-900 dark:text-gray-100 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            transition-all duration-200`}
        />

        {error && (
          <p
            id="order-id-error"
            role="alert"
            className="text-red-600 dark:text-red-400 text-sm mt-2 select-none"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md
            transition-transform duration-200 ease-in-out 
            focus:outline-none focus:ring-4 focus:ring-blue-300
            active:scale-95"
        >
          🚀 Track Order
        </button>
      </form>
    </div>
  );
}
