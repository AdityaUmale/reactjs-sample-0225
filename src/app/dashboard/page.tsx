import Navbar from '@/components/Navbar';

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <div className="bg-white rounded-lg shadow p-6">
            {/* Dashboard content will go here */}
            <p>Welcome to your dashboard!</p>
          </div>
        </div>
      </main>
    </div>
  );
}