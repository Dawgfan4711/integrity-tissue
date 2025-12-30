import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

const rows = [
  {
    date: "2025-01-13",
    practice: "Atlanta Wound Care Center",
    provider: "Dr. Sarah Johnson",
    product: { name: "Vitograft", code: "Q4317" },
    size: "12 cm²",
    status: { label: "pending", color: "bg-yellow-100 text-yellow-800" },
  },
  {
    date: "2025-01-12",
    practice: "Macon Podiatry Associates",
    provider: "Dr. Emily Brown",
    product: { name: "Biovance", code: "Q4154" },
    size: "8 cm²",
    status: { label: "downloaded", color: "bg-blue-100 text-blue-800" },
  },
];

const DashboardTable: React.FC = () => (
  <Table className="bg-white rounded-xl">
    <TableHeader>
      <TableRow className="bg-[#18192B] text-white text-left">
        <TableHead className="px-6 py-3 font-semibold text-white">Date</TableHead>
        <TableHead className="px-6 py-3 font-semibold text-white">Practice</TableHead>
        <TableHead className="px-6 py-3 font-semibold text-white">Provider</TableHead>
        <TableHead className="px-6 py-3 font-semibold text-white">Product</TableHead>
        <TableHead className="px-6 py-3 font-semibold text-white">Size</TableHead>
        <TableHead className="px-6 py-3 font-semibold text-white">Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows.map((row, i) => (
        <TableRow key={row.date + row.practice} className={i === 0 ? "border-b last:border-b-0" : undefined}>
          <TableCell className="px-6 py-4">{row.date}</TableCell>
          <TableCell className="px-6 py-4">{row.practice}</TableCell>
          <TableCell className="px-6 py-4">{row.provider}</TableCell>
          <TableCell className="px-6 py-4">
            <span className="font-semibold">{row.product.name}</span>
            <div className="text-xs text-gray-500">{row.product.code}</div>
          </TableCell>
          <TableCell className="px-6 py-4">{row.size}</TableCell>
          <TableCell className="px-6 py-4">
            <span className={`${row.status.color} text-xs font-medium px-3 py-1 rounded-full`}>{row.status.label}</span>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default DashboardTable;
