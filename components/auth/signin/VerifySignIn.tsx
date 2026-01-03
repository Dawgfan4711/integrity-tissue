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


interface VerifySignInProps {
  phone: string;
  isSubmitting?: boolean;
  error?: string | null;
  onBack?: () => void;
  onVerify?: (code: string) => void;
}

export default function VerifySignIn({ phone, isSubmitting, error, onBack, onVerify }: VerifySignInProps) {
  const codeForm = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: { code: "" },
  });

  // Format phone for display: (XXX) XXX-1234, fallback if missing
  let displayPhone = "No phone provided";
  if (phone) {
    const match = phone.match(/\+1(\d{3})(\d{3})(\d{4})/);
    if (match) {
      displayPhone = `(XXX) XXX-${match[3]}`;
    }
  }

  const handleVerifyCode = async (values: z.infer<typeof codeSchema>) => {
    if (onVerify) {
      onVerify(values.code);
    }
  };

  return (
    <Form {...codeForm}>
      <div className="bg-white rounded-xl p-8 mb-4">
        <div className="text-center text-muted-foreground mb-2">Code sent to</div>
        <div className="text-center font-bold text-lg text-black">{displayPhone}</div>
        <div className="text-center text-muted-foreground text-sm mb-6">sent the code</div>
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
          onClick={onBack ? onBack : () => window.location.href = '/'}
          className="block w-full text-center text-muted-foreground text-base underline bg-transparent border-none cursor-pointer mt-2"
        >
          &larr; Different number
        </button>
      </form>
    </div>
    </Form>
  );
}
