import Sidebar from './components/Sidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-neutral-50 flex text-black">
      {/* Sidebar for Desktop */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col min-h-screen bg-neutral-50 overflow-x-hidden md:ml-64">
        <div className="p-4 md:p-10 flex-1 max-w-7xl w-full mx-auto mt-14 md:mt-0">
          {children}
        </div>
      </main>
    </div>
  );
}
