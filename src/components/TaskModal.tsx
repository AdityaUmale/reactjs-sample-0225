"use client"

import { useState } from 'react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, details?: string, date?: string) => void;
}

export default function TaskModal({ isOpen, onClose, onSave }: Readonly<TaskModalProps>) {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <button className="text-gray-500" title="Copy task">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </button>
          <button onClick={onClose} className="text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Campus build"
          className="w-full text-xl text-[#2B4172] font-medium mb-4 focus:outline-none"
        />

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Add details"
            className="w-full bg-transparent text-gray-500 focus:outline-none resize-none"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <button className="w-full text-left text-[#2B4172] py-2">Add date</button>
          <button className="w-full text-left text-[#2B4172] py-2">Move to another list</button>
        </div>
      </div>
    </div>
  );
}