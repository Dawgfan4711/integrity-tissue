"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const codeSchema = z.object({
  code: z.string().length(6, "Enter the 6-digit code"),
});

interface SignupStep2Props {
  phone: string;
  onNext: () => void;
  onBack: () => void;
}

export default function SignupStep2Verification({ phone, onNext, onBack }: SignupStep2Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const codeForm = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: { code: "" },
  });

  // Format phone for display: (XXX) XXX-XXXX
  const displayPhone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

  const handleVerifyCode = async () => {
    setIsSubmitting(true);
    setError(null);
    
    // TODO: Add your verify logic here
    setTimeout(() => {
      setIsSubmitting(false);
      onNext();
    }, 1000);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#1a1a2e]">
      <div className="w-full max-w-md p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 border-2 border-white rounded-lg flex items-center justify-center text-white">
              <span className="text-2xl">+</span>
            </div>
            <div>
              <h1 className="text-white text-sm font-light tracking-wide">INTEGRITY</h1>
              <h1 className="text-white text-sm font-light tracking-wide">TISSUE</h1>
              <p className="text-gray-400 text-xs tracking-wide">SOLUTIONS</p>
            </div>
          </div>
          <h2 className="text-white text-xl font-normal">Provider Account Creation</h2>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-white text-xs">Clinic Details</span>
          </div>
          <div className="w-24 h-1 bg-white mb-6" />
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-white text-xs">Verification</span>
          </div>
          <div className="w-24 h-1 bg-gray-600 mb-6" />
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center mb-2" />
            <span className="text-gray-400 text-xs">Agreement</span>
          </div>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 border-2 border-white rounded-lg flex items-center justify-center text-white">
              <span className="text-3xl">+</span>
            </div>
          </div>
          <h1 className="text-2xl font-light tracking-widest text-white mb-1">INTEGRITY</h1>
          <h1 className="text-2xl font-light tracking-widest text-white mb-2">TISSUE</h1>
          <p className="text-gray-400 text-xs tracking-widest">— SOLUTIONS —</p>
        </div>

        <p className="text-gray-400 text-sm mb-6 text-center">Provider Portal</p>

        <div className="bg-white rounded-xl p-8 shadow mb-4">
          <div className="text-center text-gray-600 mb-2">Code sent to</div>
          <div className="text-center font-bold text-lg mb-6 text-black">{displayPhone}</div>
          <Form {...codeForm}>
            <form onSubmit={codeForm.handleSubmit(handleVerifyCode)} className="space-y-4">
              <FormField
                control={codeForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Verification Code</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="000000"
                        maxLength={6}
                        className="w-full py-6 text-center tracking-widest text-3xl bg-gray-100 border border-gray-300 rounded-lg text-black outline-none"
                        disabled={isSubmitting}
                        {...field}
                        value={field.value}
                        onChange={e => field.onChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500 text-xs mt-2 text-left">{error}</p>}
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full text-lg py-6 rounded-lg bg-gray-400 hover:bg-gray-500 text-white font-semibold"
              >
                {isSubmitting ? "Verifying..." : "Verify & Continue"}
              </Button>
              <button
                type="button"
                onClick={onBack}
                className="block w-full text-center text-gray-600 text-base underline bg-transparent border-none cursor-pointer mt-2"
              >
                &larr; Different number
              </button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
