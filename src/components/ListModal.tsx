"use client"
import { useState } from 'react';

interface ListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
}

export default function ListModal({ isOpen, onClose, onSave }: ListModalProps) {
  const [title, setTitle] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (title.trim()) {
      onSave(title);
      setTitle('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="New List"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-gray-600 text-lg focus:outline-none"
              autoFocus
            />
          </div>
          <button
            title="Add new list"
            onClick={handleSave}
            className="bg-[#2B4172] text-white rounded-full p-2 hover:bg-[#3a5491]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}