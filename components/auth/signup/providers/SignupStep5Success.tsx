"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function SignupStep5Success() {
  const handleBackToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#1a1a2e]">
      <div className="w-full max-w-md p-8">
        <div className="flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-8">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-light text-white mb-4">Success!</h1>
          
          <div className="mb-12">
            <p className="text-xl text-white">Account pending approval</p>
          </div>

          {/* Back to Homepage Button */}
          <Button
            onClick={handleBackToHome}
            className="w-full max-w-xs bg-gray-300 hover:bg-gray-400 text-white text-lg py-6 rounded-full"
          >
            Back to homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
