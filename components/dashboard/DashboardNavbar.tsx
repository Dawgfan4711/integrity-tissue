import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "All Practices", href: "#" },
  // Add more links as needed
];

const DashboardNavbar: React.FC = () => (
  <nav className="w-full bg-[#18192B] px-4 py-3 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <Image src="/assets/logo.svg" alt="Integrity Tissue Solutions" width={48} height={48} />
      <span className="text-white font-bold text-lg tracking-wide">INTEGRITY<br />TISSUE <span className="font-normal text-xs">SOLUTIONS</span></span>
    </div>
    <div className="hidden md:flex gap-6 items-center">
      {navLinks.map((link) => (
        <a key={link.label} href={link.href} className="text-white hover:text-[#00C48C] font-medium transition-colors">
          {link.label}
        </a>
      ))}
      <Button className="bg-[#00C48C] hover:bg-[#00a06c] text-white font-semibold rounded-lg px-5 py-2 ml-4">New BV</Button>
    </div>
    {/* Mobile menu */}
    <div className="md:hidden flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {navLinks.map((link) => (
            <DropdownMenuItem key={link.label} asChild>
              <a href={link.href}>{link.label}</a>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem asChild>
            <Button className="w-full bg-[#00C48C] hover:bg-[#00a06c] text-white font-semibold rounded-lg">New BV</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </nav>
);

export default DashboardNavbar;
