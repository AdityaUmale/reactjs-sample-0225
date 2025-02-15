"use client"
import { useState, useEffect } from 'react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, details?: string, date?: string) => void;
  task?: { title: string; details?: string; date?: string };
}

export default function TaskModal({ isOpen, onClose, onSave, task }: TaskModalProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [details, setDetails] = useState(task?.details || '');
  const [date, setDate] = useState(task?.date || '');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Update state when task changes
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDetails(task.details || '');
      setDate(task.date || '');
    }
  }, [task]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(title, details, date);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <button className="text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </button>
          <button onClick={onClose} className="text-gray-500">×</button>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          <div>
            <button 
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="w-full text-left text-[#2B4172] py-2 flex items-center justify-between"
            >
              <span>Add date</span>
              {date && <span className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</span>}
            </button>
            {showDatePicker && (
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4172]"
              />
            )}
          </div>
          <button className="w-full text-left text-[#2B4172] py-2">Move to another list</button>
        </div>

        <button 
          onClick={handleSave}
          className="mt-4 w-full bg-[#2B4172] text-white py-2 rounded-lg hover:bg-[#3a5491]"
        >
          Save
        </button>
      </div>
    </div>
  );
}