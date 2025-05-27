'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './request.module.css'; // CSS module

const servicePlans = {
  'Web Development': [
    { plan: 'Basic', price: '$299', details: 'Single-page site, responsive design' },
    { plan: 'Standard', price: '$599', details: '5 pages, contact form, SEO' },
    { plan: 'Premium', price: '$999', details: 'E-commerce, blog, dashboard' },
  ],
  'App Development': [
    { plan: 'Basic', price: '$499', details: 'Single platform, basic UI' },
    { plan: 'Standard', price: '$999', details: 'iOS & Android, REST API' },
    { plan: 'Premium', price: '$1499', details: 'Full-stack with backend & admin' },
  ],
  'SEO Optimization': [
    { plan: 'Basic', price: '$199', details: 'Keyword setup, meta tags' },
    { plan: 'Standard', price: '$399', details: 'On-page SEO, analytics setup' },
    { plan: 'Premium', price: '$699', details: 'Content strategy & backlinking' },
  ],
  'Logo Designing': [
    { plan: 'Basic', price: '$99', details: '1 concept, PNG file' },
    { plan: 'Standard', price: '$199', details: '3 concepts, vector files' },
    { plan: 'Premium', price: '$299', details: 'Unlimited revisions, brand guide' },
  ],
};

export default function RequestPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Web Development');
  const [selectedPlan, setSelectedPlan] = useState('Basic');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const currentPlans = servicePlans[service];
  const planDetails = currentPlans.find((p) => p.plan === selectedPlan);

  const handleSubmit = async (event) => {
  event.preventDefault(); // ⬅️ prevents the page reload

  if (!name || !email || !description || !selectedPlan) {
    alert('Please fill all fields');
    return;
  }

  try {
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        service,
        plan: selectedPlan,
        description,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || 'Failed to submit');
      return;
    }

    alert('Order submitted successfully!');
    setName('');
    setEmail('');
    setDescription('');
    setService('Web Development');
    setSelectedPlan('Basic');
  } catch (error) {
    alert('Error submitting order.');
    console.error(error);
  }
};


  return (
    <div className={styles.wrapper}>
      <Image src="/reqback.jpg" fill alt="Background" className={styles.backgroundImage} />
      <div className={styles.content}>
        <h1 className={styles.heading}>Request a Quote</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />

          <select
            value={service}
            onChange={(e) => {
              setService(e.target.value);
              setSelectedPlan('Basic');
            }}
            className={styles.select}
          >
            {Object.keys(servicePlans).map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </select>

          <h3 className={styles.sectionTitle}>Choose a Plan</h3>
          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className={styles.select}
          >
            {currentPlans.map((plan) => (
              <option key={plan.plan} value={plan.plan}>
                {plan.plan}
              </option>
            ))}
          </select>

          {planDetails && (
            <div className={styles.card}>
              <h4>{planDetails.plan} Plan</h4>
              <p className={styles.price}>{planDetails.price}</p>
              <p>{planDetails.details}</p>
            </div>
          )}

          <textarea
            placeholder="Describe your project"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />

          <button type="submit" className={styles.button}>
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
