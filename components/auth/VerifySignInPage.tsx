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

export default function VerifySignInPage({ phone }: { phone: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const codeForm = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: { code: "" },
  });

  // Format phone for display: (XXX) XXX-XXXX
  const displayPhone = phone.replace(/\+1(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

  const handleVerifyCode = async (values: z.infer<typeof codeSchema>) => {
    setIsSubmitting(true);
    setError(null);
    // TODO: Add your verify logic here
    setTimeout(() => {
      setIsSubmitting(false);
      // Simulate error: setError("Invalid code");
    }, 1000);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#1a1a2e]">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-card">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 border-2 border-muted rounded-lg flex items-center justify-center mb-4 text-muted-foreground">
            <span className="text-2xl">+</span>
          </div>
          <div className="w-16 h-2 bg-primary rounded mb-6" />
          <h1 className="text-2xl font-light tracking-widest text-foreground mb-1">INTEGRITY</h1>
          <h1 className="text-2xl font-light tracking-widest text-foreground mb-2">TISSUE</h1>
          <p className="text-muted-foreground text-xs tracking-widest">— SOLUTIONS —</p>
        </div>
        <p className="text-muted-foreground text-sm mb-6 text-center">Provider Portal</p>
        <div className="bg-white rounded-xl p-8 shadow mb-4">
          <div className="text-center text-muted-foreground mb-2">Code sent to</div>
          <div className="text-center font-bold text-lg mb-6 text-black">{displayPhone}</div>
          <Form {...codeForm}>
            <form onSubmit={codeForm.handleSubmit(handleVerifyCode)} className="space-y-4">
              <FormField
                control={codeForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
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
              {error && <p className="text-destructive text-xs mt-2 text-left">{error}</p>}
              <Button type="submit" disabled={isSubmitting} className="w-full text-lg py-4 rounded-lg bg-gray-400 text-white font-semibold">
                {isSubmitting ? "Verifying..." : "Verify & Sign In"}
              </Button>
              <button
                type="button"
                onClick={() => window.location.href = '/'}
                className="block w-full text-center text-muted-foreground text-base underline bg-transparent border-none cursor-pointer mt-2"
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
