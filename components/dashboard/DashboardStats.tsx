import React from "react";

const stats = [
  { label: "Total BVs", value: 2 },
  { label: "Pending", value: 1 },
  { label: "Approved", value: 0 },
];

const DashboardStats: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
    {stats.map((stat) => (
      <div key={stat.label} className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
        <span className="text-sm text-gray-500 mb-1">{stat.label}</span>
        <span className="text-2xl font-bold text-[#18192B]">{stat.value}</span>
      </div>
    ))}
  </div>
);

export default DashboardStats;
