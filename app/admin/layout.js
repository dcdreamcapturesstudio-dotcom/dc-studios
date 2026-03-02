import Sidebar from './components/Sidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-neutral-50 flex text-black">
      {/* Sidebar for Desktop */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col min-h-screen bg-neutral-50 overflow-x-hidden md:ml-64">
        {/* Mobile Header (Hidden on large screens) */}
        <header className="md:hidden bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
          <h1 className="text-xl font-serif text-black uppercase tracking-widest">
            DC Studio
          </h1>
          {/* Mobile menu button could go here if needed, but keeping it simple for now */}
        </header>

        <div className="p-6 md:p-10 flex-1 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
