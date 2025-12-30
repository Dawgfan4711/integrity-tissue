"use client";
import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";


const DashboardNavbar: React.FC = () => (
  <nav className="w-full bg-[#18192B] px-4 py-3 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <Image src="/assets/logo.svg" alt="Integrity Tissue Solutions" width={48} height={48} />
      <span className="text-white font-bold text-lg tracking-wide">INTEGRITY<br />TISSUE <span className="font-normal text-xs">SOLUTIONS</span></span>
    </div>
    <div className="flex items-center">
      <Button
        variant="ghost"
        className="text-white hover:bg-[#232345] p-2"
        size="icon"
        aria-label="Logout"
        onClick={() => {/* handle logout */}}
      >
        <LogOut className="w-6 h-6" />
      </Button>
    </div>
  </nav>
);

export default DashboardNavbar;
