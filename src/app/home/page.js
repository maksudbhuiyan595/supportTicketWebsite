'use client';
import React, { useState } from 'react';
import { Send, MessageCircle, LogOut, User, Home, Ticket, MessageSquare } from 'lucide-react';

const mockTickets = [
  {
    id: 1,
    subject: 'Server Down',
    category: 'Technical',
    priority: 'High',
    description: 'The server is not responding.',
    status: 'Open',
    comments: ['Please check again.', 'It’s up now.']
  },
  {
    id: 2,
    subject: 'Login Issue',
    category: 'Authentication',
    priority: 'Medium',
    description: 'Cannot login using credentials.',
    status: 'Closed',
    comments: ['Reset your password.', 'Issue resolved.']
  },
  {
    id: 3,
    subject: 'Bug in form',
    category: 'UI',
    priority: 'Low',
    description: 'The submit button doesn’t work.',
    status: 'Open',
    comments: []
  },
  {
    id: 4,
    subject: 'Feature Request',
    category: 'General',
    priority: 'Low',
    description: 'Add dark mode option.',
    status: 'Open',
    comments: ['We’re considering it.']
  }
];

export default function FullPage() {
  const [activeTab, setActiveTab] = useState('home');
  const [openComments, setOpenComments] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { from: 'admin', text: 'Hello! How can I help?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { from: 'user', text: chatInput }]);
      setChatInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navigation */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Customer Support Ticket System</h1>
          <div className="flex space-x-6">
            <button onClick={() => setActiveTab('home')} className="hover:text-blue-600 flex items-center gap-1"><Home size={16} />Home</button>
            <button onClick={() => setActiveTab('tickets')} className="hover:text-blue-600 flex items-center gap-1"><Ticket size={16} />Tickets</button>
            <button onClick={() => setActiveTab('chat')} className="hover:text-blue-600 flex items-center gap-1"><MessageSquare size={16} />Chats</button>
            <button className="hover:text-blue-600 flex items-center gap-1"><User size={16} />Profile</button>
            <button className="hover:text-red-600 flex items-center gap-1"><LogOut size={16} />Logout</button>
          </div>
        </div>
      </nav>

      {/* Body */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Home */}
        {activeTab === 'home' && (
          <div className="text-center py-10">
            <h2 className="text-3xl font-bold mb-4">Welcome to the Support Center</h2>
            <p className="text-gray-600">Use the navigation to manage tickets or start a chat with support.</p>
          </div>
        )}

        {/* Tickets */}
        {activeTab === 'tickets' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Tickets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockTickets.map((ticket) => (
                <div key={ticket.id} className="bg-white rounded-xl shadow p-4 relative">
                  <h3 className="font-bold text-lg">{ticket.subject}</h3>
                  <p className="text-sm text-gray-500 mb-1">Category: {ticket.category}</p>
                  <p className="text-sm text-gray-500 mb-1">Priority: {ticket.priority}</p>
                  <p className="text-sm text-gray-500 mb-1">Status: <span className={`font-bold ${ticket.status === 'Open' ? 'text-green-600' : 'text-red-600'}`}>{ticket.status}</span></p>
                  <p className="text-sm text-gray-700 mt-2">{ticket.description}</p>
                  <button
                    onClick={() => setOpenComments(ticket)}
                    className="mt-4 inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
                  >
                    <MessageCircle size={14} /> Comments
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chat */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-xl shadow p-6 h-[75vh] flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Chat with Admin</h2>
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-xs px-4 py-2 rounded text-sm ${
                    msg.from === 'user' ? 'bg-blue-100 self-end text-right' : 'bg-gray-100 self-start'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border px-3 py-2 rounded"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Comments Modal */}
      {openComments && (
        <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow p-6 w-full max-w-md relative">
            <h3 className="text-lg font-bold mb-4">Comments for "{openComments.subject}"</h3>
            {openComments.comments.length === 0 ? (
              <p className="text-gray-500 text-sm mb-4">No comments yet.</p>
            ) : (
              <ul className="list-disc ml-5 text-sm text-gray-700 mb-4">
                {openComments.comments.map((comment, idx) => (
                  <li key={idx}>{comment}</li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setOpenComments(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
