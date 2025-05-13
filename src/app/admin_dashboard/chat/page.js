'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send, User } from 'lucide-react';

const dummyChats = [
  { id: 1, name: 'Customer One', role: 'customer' },
  { id: 2, name: 'Admin One', role: 'admin' },
  { id: 3, name: 'Customer Two', role: 'customer' },
];

const dummyMessages = {
  1: [
    { sender: 'customer', message: 'Hi, I need help with my order.' },
    { sender: 'admin', message: 'Sure, what is your order ID?' },
  ],
  2: [
    { sender: 'admin', message: 'This is admin chat.' },
    { sender: 'customer', message: 'Thanks for the update.' },
  ],
  3: [],
};

export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [messages, setMessages] = useState(dummyMessages);
  const [inputMessage, setInputMessage] = useState('');
  const messageEndRef = useRef(null);

  const currentMessages = messages[selectedChatId] || [];

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    const newMessage = { sender: 'admin', message: inputMessage };
    setMessages({
      ...messages,
      [selectedChatId]: [...currentMessages, newMessage],
    });
    setInputMessage('');
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-md border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Conversations</h2>
        </div>
        <ul className="overflow-y-auto max-h-[calc(100vh-60px)]">
          {dummyChats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b hover:bg-gray-100 ${
                chat.id === selectedChatId ? 'bg-gray-200' : ''
              }`}
            >
              <div className="bg-blue-100 p-2 rounded-full">
                <User size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-700">{chat.name}</p>
                <p className="text-xs text-gray-500 capitalize">{chat.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b bg-white shadow-sm flex items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Chat with {dummyChats.find((c) => c.id === selectedChatId)?.name}
          </h3>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="flex flex-col space-y-3 max-w-3xl mx-auto">
            {currentMessages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[75%] px-4 py-2 rounded-lg text-sm shadow ${
                  msg.sender === 'admin'
                    ? 'bg-blue-600 text-white self-end ml-auto'
                    : 'bg-white text-gray-900 self-start'
                }`}
              >
                {msg.message}
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t">
          <div className="flex items-center max-w-3xl mx-auto gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
