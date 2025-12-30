import React from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import DashboardTable from "@/components/dashboard/DashboardTable";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <DashboardNavbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Row with Title and New BV Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-[#18192B]">All Practices</h1>
          <button
            type="button"
            className="flex items-center gap-2 bg-[#00C48C] hover:bg-[#00a06c] text-white font-semibold rounded-lg px-6 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00C48C] focus:ring-offset-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" fill="#00C48C" />
              <path stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9.5 12.5l2 2 3-4" />
            </svg>
            New BV
          </button>
        </div>
        <DashboardStats />
        <DashboardFilters />
        <DashboardTable />
      </main>
    </div>
  );
};

export default Dashboard;
