"use client"
import Navbar from '@/components/Navbar';
import TaskList from '@/components/TaskList';
import FloatingAddButton from '@/components/FloatingAddButton';
import { TaskListsProvider, useTaskLists } from '@/contexts/TaskListsContext';
import ProtectedRoute from '@/components/ProtectedRoute';

function DashboardContent() {
  const { taskLists } = useTaskLists();

  return (
    <ProtectedRoute>
    <main className="min-h-screen p-4">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {taskLists.map(list => (
          <TaskList 
            key={list._id} 
            id={list._id}
            title={list.title} 
          />
      ))}
      </div>
      <FloatingAddButton />
    </main>
    </ProtectedRoute>
  );
}

export default function DashboardPage() {
  return (
    <TaskListsProvider>
      <DashboardContent />
    </TaskListsProvider>
  );
}