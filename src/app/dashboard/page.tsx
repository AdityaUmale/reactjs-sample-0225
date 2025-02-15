import Navbar from '@/components/Navbar';
import TaskList from '@/components/TaskList';
import FloatingAddButton from '@/components/FloatingAddButton';

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-4">
      <Navbar />
      <div className="max-w-md p-6">
        <TaskList />
      </div>
      <FloatingAddButton />
    </main>
  );
}