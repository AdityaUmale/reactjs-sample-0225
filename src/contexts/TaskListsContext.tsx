"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TaskList {
  _id: string;
  title: string;
  tasks: Task[];
}

interface Task {
  _id: string;
  title: string;
  details?: string;
  date?: string;
  completed: boolean;
}

interface TaskListsContextType {
  taskLists: TaskList[];
  addTaskList: (title: string) => Promise<void>;
  isListModalOpen: boolean;
  openListModal: () => void;
  closeListModal: () => void;
}

const TaskListsContext = createContext<TaskListsContextType | undefined>(undefined);

export function TaskListsProvider({ children }: { children: ReactNode }) {
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  useEffect(() => {
    fetchTaskLists();
  }, []);

  const fetchTaskLists = async () => {
    try {
      const response = await fetch('/api/tasklists');
      const data = await response.json();
      setTaskLists(data);
    } catch (error) {
      console.error('Error fetching task lists:', error);
    }
  };

  const addTaskList = async (title: string) => {
    try {
      const response = await fetch('/api/tasklists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      const newList = await response.json();
      setTaskLists([...taskLists, newList]);
    } catch (error) {
      console.error('Error adding task list:', error);
    }
  };

  const openListModal = () => setIsListModalOpen(true);
  const closeListModal = () => setIsListModalOpen(false);

  return (
    <TaskListsContext.Provider value={{ 
      taskLists, 
      addTaskList, 
      isListModalOpen,
      openListModal,
      closeListModal
    }}>
      {children}
    </TaskListsContext.Provider>
  );
}

export const useTaskLists = () => {
  const context = useContext(TaskListsContext);
  if (!context) throw new Error('useTaskLists must be used within TaskListsProvider');
  return context;
};