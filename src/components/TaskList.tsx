"use client"
import { useState } from 'react';

interface Task {
  id: string;
  title: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Campus build' }
  ]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl text-[#2B4172] font-semibold">My Tasks</h2>
        <button 
          type="button"
          title="More options"
          className="text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      <button className="flex items-center space-x-3 text-[#2B4172] mb-6">
        <div className="bg-[#2B4172] rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <span className="text-lg">Add a task</span>
      </button>

      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                title="Mark task as complete"
                placeholder="Toggle task completion"
                type="checkbox"
                className="w-6 h-6 rounded-full border-2 border-gray-300"
              />
              <span className="text-lg text-gray-700">{task.title}</span>
            </div>
            <button className="text-gray-400" title="Edit task">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}