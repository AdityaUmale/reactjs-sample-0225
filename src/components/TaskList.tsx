"use client"
import { useState, useEffect } from 'react';
import TaskModal from './TaskModal';

interface Task {
  _id: string;  // Change from 'id' to '_id' to match MongoDB
  title: string;
  details?: string;
  date?: string | Date;  // Update to handle both string and Date types
}

// Add title prop to interface
interface TaskListProps {
  title: string;
  id: string;
}

export default function TaskList({ title, id }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTaskTitle,
          listId: id
        })
      });
      
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = async (title: string, details?: string, date?: string) => {
    if (!editingTask) return;

    try {
      const response = await fetch('/api/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingTask._id,
          title,
          details,
          date
        })
      });

      const updatedTask = await response.json();
      setTasks(tasks.map(task => 
        task._id === editingTask._id ? updatedTask : task
      ));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`/api/tasks?listId=${id}`);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [id]);

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl text-[#2B4172] font-semibold">{title}</h2>
        <button className="text-gray-600" title="More options">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="New Task"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          className="text-gray-400 text-lg focus:outline-none flex-grow"
        />
        <button
          onClick={handleAddTask}
          className="bg-[#2B4172] text-white rounded-full p-2 hover:bg-[#3a5491]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task._id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="w-6 h-6 rounded-full border-2 border-gray-300"
              />
              <span className="text-lg text-gray-700">{task.title}</span>
            </div>
            <button 
              className="text-gray-400" 
              title="Edit task"
              onClick={() => openEditModal(task)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleEditTask}
        task={editingTask || undefined}
      />
    </div>
  );
}