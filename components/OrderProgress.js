// components/OrderProgress.jsx
'use client';

import React from 'react';

const steps = ['Initiate', 'Working', 'Prototype', 'Complete'];

export default function OrderProgress({ currentStatus }) {
  const currentStep = steps.indexOf(currentStatus);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full max-w-2xl mt-8">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center w-1/4">
            <div
              className={`rounded-full w-10 h-10 flex items-center justify-center mb-2 text-white text-sm font-bold ${
                index <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              {index + 1}
            </div>
            <div className="text-center text-sm">{step}</div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 w-full mt-2 ${
                  index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
