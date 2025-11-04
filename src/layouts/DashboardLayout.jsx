import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar isPublic={false} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-grow">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} />

        {/* Main Content */}
        <main className={`flex-grow transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} p-6`}>
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;