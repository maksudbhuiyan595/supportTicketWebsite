import Navbar from '@/Components/Navbar/Navbar';
import Sidebar from '@/Components/Sidebar/Sidebar';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-4 overflow-auto bg-gray-100 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
