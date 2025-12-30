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
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6 text-[#18192B]">All Practices</h1>
        <DashboardStats />
        <DashboardFilters />
        <DashboardTable />
      </main>
    </div>
  );
};

export default Dashboard;
