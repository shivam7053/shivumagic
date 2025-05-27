'use client';

import React from 'react';

const services = [
  {
    id: '1',
    title: 'Web Development',
    imageSrc: '/web.png',
    tech: 'HTML, CSS, JS, React, Node.js',
    pricing: {
      basic: '₹499',
      standard: '₹999',
      premium: '₹1499',
    },
  },
  {
    id: '2',
    title: 'App Development',
    imageSrc: '/app.png',
    tech: 'React Native, Flutter, Firebase',
    pricing: {
      basic: '₹699',
      standard: '₹1299',
      premium: '₹1799',
    },
  },
  {
    id: '3',
    title: 'SEO Optimization',
    imageSrc: '/seo.png',
    tech: 'Yoast, SEMrush, Google Analytics',
    pricing: {
      basic: '₹399',
      standard: '₹799',
      premium: '₹1199',
    },
  },
  {
    id: '4',
    title: 'Logo Designing',
    imageSrc: '/logo.png',
    tech: 'Figma, Photoshop, Illustrator',
    pricing: {
      basic: '₹299',
      standard: '₹599',
      premium: '₹999',
    },
  },
];

export default function ServiceCatalog() {
  return (
    <section className="mt-12 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
        Our Services
      </h2>

      <div
        className="flex overflow-x-auto space-x-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-300"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
      >
        {services.map(({ id, title, imageSrc, tech, pricing }) => (
          <div
            key={id}
            className="flex-shrink-0 snap-center bg-white rounded-xl shadow-md w-[280px] h-[380px] p-5 flex flex-col justify-between transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 bg-indigo-50 rounded-lg flex items-center justify-center shadow-sm">
                <img
                  src={imageSrc}
                  alt={title}
                  className="max-w-20 max-h-20 object-contain"
                  style={{ width: 80, height: 80 }}
                />
              </div>

              <h3 className="text-lg font-semibold text-indigo-700 text-center">{title}</h3>

              <p
                className="text-gray-500 text-sm text-center line-clamp-3"
                title={tech}
              >
                {tech}
              </p>
            </div>

            <div className="flex justify-around bg-indigo-50 rounded-lg p-3">
              {Object.entries(pricing).map(([plan, amount]) => (
                <div
                  key={plan}
                  className="flex flex-col items-center text-indigo-700"
                >
                  <span className="text-xs font-medium capitalize">{plan}</span>
                  <span className="font-semibold">{amount}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
