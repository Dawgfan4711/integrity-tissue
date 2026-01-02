import React from "react";

export default function ProviderLogoHeader() {
  return (
    <div className="flex flex-col items-center mb-8 mt-8">
      <div className="w-12 h-12 border-2 border-muted rounded-lg flex items-center justify-center mb-4 text-muted-foreground">
        <span className="text-2xl">+</span>
      </div>
      <div className="w-16 h-2 bg-primary rounded mb-6" />
      <h1 className="text-2xl font-light tracking-widest text-foreground mb-1">INTEGRITY</h1>
      <h1 className="text-2xl font-light tracking-widest text-foreground mb-2">TISSUE</h1>
      <p className="text-muted-foreground text-xs tracking-widest mb-4">— SOLUTIONS —</p>
      <h2 className="text-lg font-medium text-foreground mb-2">Provider Account Creation</h2>
    </div>
  );
}
