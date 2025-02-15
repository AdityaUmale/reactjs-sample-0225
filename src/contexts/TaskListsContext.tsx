"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

interface TaskList {
  id: string;
  title: string;
}

interface TaskListsContextType {
  taskLists: TaskList[];
  addTaskList: (title: string) => void;
  isListModalOpen: boolean;
  openListModal: () => void;
  closeListModal: () => void;
}

const TaskListsContext = createContext<TaskListsContextType | undefined>(undefined);

export function TaskListsProvider({ children }: { children: ReactNode }) {
  const [taskLists, setTaskLists] = useState<TaskList[]>([{ id: '1', title: 'My Tasks' }]);
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  const addTaskList = (title: string) => {
    const newList = {
      id: Date.now().toString(),
      title
    };
    setTaskLists([...taskLists, newList]);
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