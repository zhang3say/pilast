'use client';

import { useState } from 'react';
import { submitInquiry } from '@/lib/actions';

export default function ContactForm({ initialProduct = '', initialMessage = '' }: { initialProduct?: string, initialMessage?: string }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(formData: FormData) {
    setStatus('submitting');
    try {
      const data = {
        name: formData.get('name'),
        company: formData.get('company'),
        email: formData.get('email'),
        country: formData.get('country'),
        product_interested: formData.get('product_interested'),
        quantity: formData.get('quantity'),
        message: formData.get('message'),
      };
      await submitInquiry(data);
      setStatus('success');
      // Form resets automatically if we don't prevent default, but since we are handling it:
      (document.getElementById('inquiry-form') as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  }

  return (
    <form id="inquiry-form" action={handleSubmit} className="space-y-6">
      {status === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6">
          Thank you for your inquiry! We will get back to you within 24 hours.
        </div>
      )}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
          There was an error submitting your inquiry. Please try again or contact us directly.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500" />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input type="text" id="company" name="company" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500" />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country/Region</label>
          <input type="text" id="country" name="country" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="product_interested" className="block text-sm font-medium text-gray-700 mb-1">Product Interested In</label>
          <input type="text" id="product_interested" name="product_interested" defaultValue={initialProduct} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500" />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Order Quantity</label>
          <input type="text" id="quantity" name="quantity" placeholder="e.g., 1 sample, 10 sets" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Requirements/Message</label>
        <textarea id="message" name="message" rows={5} defaultValue={initialMessage} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"></textarea>
      </div>

      <div>
        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-md transition duration-300 disabled:opacity-50"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
        </button>
      </div>
    </form>
  );
}
