'use client';
import React, { useState } from 'react';

export default function Form() {
  // State for form fields
  const [form, setForm] = useState({
    name: '',
    email: '',
    dob: '',
    patientId: ''
  });
  // State for feedback message
  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous message
    try {
      const res = await fetch('https://vapiagent-production.up.railway.app/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setMessage('Form submitted successfully. You will receive a call from one of our team members in order to complete the onboarding process!');
      } else {
        // Try to get error message from server
        const data = await res.json().catch(() => null);
        setMessage(data?.detail || 'Submission failed. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="font-fira max-w-md w-full p-10 border rounded">
        <h2 className="text-center text-xl font-bold mb-4">Patient Registration</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={form.name}
            onChange={handleChange}
            required
            className='w-full p-2 border rounded'
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={form.email}
            onChange={handleChange}
            required
            className='w-full p-2 border rounded'
          />
          <input
            type='date'
            name='dob'
            placeholder='Date of Birth'
            value={form.dob}
            onChange={handleChange}
            required
            className='w-full p-2 border rounded'
          />
          <input
            type='text'
            name='patientId'
            placeholder='Patient ID'
            value={form.patientId}
            onChange={handleChange}
            required
            className='w-full p-2 border rounded'
          />
          <button
            type='submit'
            className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700'
          >
            Submit
          </button>
        </form>
        {message && (
          <div className={`mt-4 text-center font-semibold ${message.startsWith('Form submitted successfully') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}