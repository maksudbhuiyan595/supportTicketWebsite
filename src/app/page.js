'use client'; // for Next.js App Router (if you're using it)

import React, { useState } from 'react';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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
              onClick={() => setShowRegister(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Register
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition"
            >
              Login
            </button>
          </div>
        </div>
      </main>

      {/* Login Modal */}
      {showLogin && (
        <Modal title="Login" onClose={() => setShowLogin(false)}>
          <form className="space-y-4">
            <input type="email" placeholder="Email" className="w-full p-2 rounded border" />
            <input type="password" placeholder="Password" className="w-full p-2 rounded border" />
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
              Login
            </button>
          </form>
        </Modal>
      )}

      {/* Register Modal */}
      {showRegister && (
        <Modal title="Register" onClose={() => setShowRegister(false)}>
          <form className="space-y-4">
            <input type="text" placeholder="Name" className="w-full p-2 rounded border" />
            <input type="email" placeholder="Email" className="w-full p-2 rounded border" />
            <input type="password" placeholder="Password" className="w-full p-2 rounded border" />
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
              Register
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
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}
