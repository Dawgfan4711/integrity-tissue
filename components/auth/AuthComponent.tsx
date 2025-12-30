"use client";

import React, { useState } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/store/auth";


const phoneSchema = z.object({
  phone: z
    .string()
    .min(12, "Phone number is required")
    .regex(/^\+1\d{10}$/, "Enter a valid US phone number"),
});

const codeSchema = z.object({
  code: z.string().length(6, "Enter the 6-digit code"),
});

export default function AuthComponent() {
  const [stage, setStage] = useState<"enterPhone" | "enterCode">("enterPhone");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setJwt = useAuthStore((s) => s.setJwt);

  // Phone form
  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
  });

  // Code form
  const codeForm = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: { code: "" },
  });

  // No longer need formatPhoneNumber, handled by PhoneInput

  const handleSendCode = async (values: z.infer<typeof phoneSchema>) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({ phone: values.phone });
      if (!error) {
        setStage("enterCode");
      } else {
        setError(error.message || "Failed to send code");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async (values: z.infer<typeof codeSchema>) => {
    setIsSubmitting(true);
    setError(null);
    const phone = phoneForm.getValues("phone");
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token: values.code,
        type: "sms",
      });
      if (!error && data.session) {
        setJwt(data.session.access_token);
        window.location.href = "/dashboard";
      } else {
        setError(error?.message || "Invalid or expired code");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-[#1a1a2e]"
    >
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
        {stage === "enterPhone" ? (
          <Form {...phoneForm}>
            <form onSubmit={phoneForm.handleSubmit(handleSendCode)} className="space-y-4">
              <FormField
                control={phoneForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        country={'us'}
                        onlyCountries={['us']}
                        value={field.value.replace(/^\+/, '')}
                        onChange={val => field.onChange(val ? `+${val}` : '')}
                        inputClass="!w-full !pl-12 !pr-3 !py-3 !bg-muted !border !border-border !rounded !text-foreground !text-base !outline-none"
                        buttonClass="!bg-muted"
                        disabled={isSubmitting}
                        inputProps={{ name: field.name, required: true, autoFocus: true }}
                        enableSearch={false}
                        disableDropdown={true}
                        countryCodeEditable={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-destructive text-xs mt-2 text-left">{error}</p>}
              <Button type="submit" disabled={isSubmitting} className="w-full mb-6">
                {isSubmitting ? "Sending..." : "Send Verification Code"}
              </Button>
            </form>
          </Form>
        ) : (
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
                        placeholder="123456"
                        maxLength={6}
                        className="w-full py-3 bg-muted border border-border rounded text-foreground text-base text-center tracking-widest outline-none"
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
              <Button type="submit" disabled={isSubmitting} className="w-full mb-3">
                {isSubmitting ? "Verifying..." : "Verify Code"}
              </Button>
              <button
                type="button"
                onClick={() => {
                  setStage("enterPhone");
                  codeForm.reset();
                  setError(null);
                }}
                className="text-muted-foreground text-xs underline bg-transparent border-none cursor-pointer"
              >
                Back to phone number
              </button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
