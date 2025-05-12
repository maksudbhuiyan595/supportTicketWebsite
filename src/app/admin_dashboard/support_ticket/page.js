'use client';
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function TicketManager() {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      subject: 'Login Issue',
      description: 'Cannot log into the portal.',
      category: 'Technical',
      priority: 'High',
      status: 'Open',
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      subject: 'API Error',
      description: 'Error in fetching data from API.',
      category: 'Technical',
      priority: 'Medium',
      status: 'Resolved',
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      subject: 'Payment Failure',
      description: 'Issue with completing payment transactions.',
      category: 'Billing',
      priority: 'High',
      status: 'Open',
      created_at: new Date().toISOString(),
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    subject: '',
    description: '',
    category: 'General',
    priority: 'Low',
    status: 'Open',
  });

  const [ticketToDelete, setTicketToDelete] = useState(null);

  const openAddModal = () => {
    setIsEdit(false);
    setFormData({
      id: null,
      subject: '',
      description: '',
      category: 'General',
      priority: 'Low',
      status: 'Open',
    });
    setShowModal(true);
  };

  const openEditModal = (ticket) => {
    setIsEdit(true);
    setFormData(ticket);
    setShowModal(true);
  };

  const openDeleteModal = (ticket) => {
    setTicketToDelete(ticket);
    setShowDeleteModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setTickets((prev) =>
        prev.map((t) => (t.id === formData.id ? formData : t))
      );
    } else {
      setTickets((prev) => [
        ...prev,
        {
          ...formData,
          id: Date.now(),
          created_at: new Date().toISOString(),
        },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    if (ticketToDelete) {
      setTickets((prev) => prev.filter((t) => t.id !== ticketToDelete.id));
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-700">Support Tickets</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Ticket
        </button>
      </div>

      <table className="w-full table-auto border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">Subject</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">Description</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">Category</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">Priority</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">Status</th>
            <th className="p-3 text-center text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr key={t.id} className="border-t hover:bg-gray-50">
              <td className="p-3 text-sm text-gray-700">{t.subject}</td>
              <td className="p-3 text-sm text-gray-700">{t.description}</td>
              <td className="p-3 text-sm text-gray-700">{t.category}</td>
              <td className="p-3 text-sm text-gray-700">{t.priority}</td>
              <td className="p-3 text-sm text-gray-700">{t.status}</td>
              <td className="p-3 text-center">
                <button
                  onClick={() => openEditModal(t)}
                  className="text-yellow-600 hover:text-yellow-700 mr-3"
                >
                  <FaEdit className="inline-block text-xl" />
                </button>
                <button
                  onClick={() => openDeleteModal(t)}
                  className="text-red-600 hover:text-red-700"
                >
                  <FaTrash className="inline-block text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Ticket Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            <h2 className="text-xl font-semibold mb-4">
              {isEdit ? 'Edit Ticket' : 'Add Ticket'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Subject"
                className="w-full border px-4 py-2 rounded"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Description"
                className="w-full border px-4 py-2 rounded"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></textarea>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="border px-4 py-2 rounded"
                >
                  <option>General</option>
                  <option>Technical</option>
                  <option>Billing</option>
                </select>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  className="border px-4 py-2 rounded"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full border px-4 py-2 rounded"
              >
                <option>Open</option>
                <option>Closed</option>
              </select>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  {isEdit ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-black"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this ticket?</h3>
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
