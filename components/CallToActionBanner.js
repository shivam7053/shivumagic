'use client';

import { useRouter } from 'next/navigation';

export default function CallToActionBanner() {
  const router = useRouter();

  return (
    <section className="bg-indigo-900 px-8 py-12 rounded-lg text-center max-w-4xl mx-auto my-8">
      <p className="text-white text-xl mb-6">Have a project in mind?</p>
      <button
        onClick={() => router.push('/request')}
        className="bg-white text-indigo-900 font-bold py-3 px-6 rounded hover:bg-indigo-100 transition"
      >
        Request a Quote
      </button>
    </section>
  );
}
