'use client';

import React from 'react';

const HeroSection = () => {
  return (
    <section
      className="
        relative w-full min-h-[400px] md:min-h-[500px]
        bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-400
        text-white flex items-center justify-center px-6 py-12 overflow-hidden
      "
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto gap-8">
        
        {/* Logo - Left Side */}
        <div className="flex-shrink-0">
          <img
            src="/logo.png"
            alt="ShivuMagic Logo"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white shadow-md"
          />
        </div>

        {/* Text - Right Side */}
        <div className="text-center md:text-left max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg">
            Welcome to <span className="text-cyan-300">ShivuMagic</span>
          </h1>
          <p className="mt-4 text-base md:text-xl font-light tracking-wide drop-shadow-md">
            Transforming Ideas into{' '}
            <span className="font-semibold text-cyan-200">Digital Magic</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
