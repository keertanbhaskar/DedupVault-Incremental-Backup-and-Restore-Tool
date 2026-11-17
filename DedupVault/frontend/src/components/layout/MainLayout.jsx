import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#F4F6FA] text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      {/* Application Sidebar */}
      <Sidebar />

      {/* Main Application Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top Navigation */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden bg-[#F4F6FA] p-5 transition-colors duration-200 dark:bg-slate-950 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
