import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-8">Sidebar</h2>
      <nav>
        <ul className="space-y-5">
          <li>
            <Link href="/admin_dashboard">
              <span className="block hover:text-gray-300">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/admin_dashboard/support_ticket">
              <span className="block hover:text-gray-300">Support Ticket</span>
            </Link>
          </li>
          <li>
            <Link href="/admin_dashboard/chat">
              <span className="block hover:text-gray-300">Chat</span>
            </Link>
          </li>
          <li>
            <Link href="/logout">
              <span className="block hover:text-gray-300">Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
