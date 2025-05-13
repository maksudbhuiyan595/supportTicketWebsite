'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // For validation errors

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const form = new FormData(e.target);
    const email = form.get('email');
    const password = form.get('password');

    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || { general: data.message || 'Login failed' });
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.user.role === 'ADMIN') {
          router.push('/admin_dashboard');
        } else {
          router.push('/home');
        }
      }
    } catch (err) {
      console.error(err);
      setErrors({ general: 'Something went wrong during login.' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const form = new FormData(e.target);
    const name = form.get('name');
    const email = form.get('email');
    const password = form.get('password');
    const confirmPassword = form.get('password_confirmation');

    try {
      const res = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, password_confirmation: confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || { general: data.message || 'Registration failed' });
      } else {
        alert('Registration successful. Please login.');
        setShowRegister(false);
        setShowLogin(true);
      }
    } catch (err) {
      console.error(err);
      setErrors({ general: 'Something went wrong during registration.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/background_img.jpg')",
      }}
    >
      <main className="w-full px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to the Customer Support Ticket System
          </h1>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setShowRegister(true);
                setShowLogin(false);
                setErrors({});
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Register
            </button>
            <button
              onClick={() => {
                setShowLogin(true);
                setShowRegister(false);
                setErrors({});
              }}
              className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition"
            >
              Login
            </button>
          </div>
        </div>
      </main>

      {showLogin && (
        <Modal title="Login" onClose={() => setShowLogin(false)}>
          <form className="space-y-4" onSubmit={handleLogin}>
            <input name="email" type="email" placeholder="Email" className="w-full p-2 rounded border" required />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            <input name="password" type="password" placeholder="Password" className="w-full p-2 rounded border" required />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </Modal>
      )}

      {showRegister && (
        <Modal title="Register" onClose={() => setShowRegister(false)}>
          <form className="space-y-4" onSubmit={handleRegister}>
            <input name="name" type="text" placeholder="Name" className="w-full p-2 rounded border" required />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            <input name="email" type="email" placeholder="Email" className="w-full p-2 rounded border" required />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            <input name="password" type="password" placeholder="Password" className="w-full p-2 rounded border" required />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            <input name="password_confirmation" type="password" placeholder="Confirm Password" className="w-full p-2 rounded border" required />
            {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation}</p>}
            {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}
