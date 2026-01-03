"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ProviderLogoHeader from "./ProviderLogoHeader";
import SignupStepper from "./SignupStepper";

const codeSchema = z.object({
  code: z.string().length(6, "Enter the 6-digit code"),
});

interface SignupStep2Props {
  phone: string;
  onNext: () => void;
  onBack: () => void;
}

export default function SignupStep2Verification({
  phone,
  onNext,
  onBack,
}: SignupStep2Props) {
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
    <>
      <div className="w-full max-w-md p-8">
        {/* Use ProviderLogoHeader */}
        <ProviderLogoHeader />

        {/* Progress Steps */}
        <SignupStepper currentStep={2} />

        <p className="text-gray-400 text-sm mb-6 text-center">
          Provider Portal
        </p>

        <div className="bg-white rounded-xl p-8 mb-4">
          <div className="text-center text-gray-600 mb-2">Code sent to</div>
          <div className="text-center font-bold text-lg mb-6 text-black">
            {displayPhone}
          </div>
          <Form {...codeForm}>
            <form
              onSubmit={codeForm.handleSubmit(handleVerifyCode)}
              className="space-y-4"
            >
              <FormField
                control={codeForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">
                      Verification Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="000000"
                        maxLength={6}
                        className="w-full py-6 text-center tracking-widest text-3xl bg-gray-100 border border-gray-300 rounded-lg text-black outline-none"
                        disabled={isSubmitting}
                        {...field}
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value.replace(/\D/g, "").slice(0, 6)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <p className="text-red-500 text-xs mt-2 text-left">{error}</p>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-lg py-6 rounded-lg bg-gray-300 hover:bg-gray-400 hover:text-white text-gray-800 font-semibold"
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
    </>
  );
}
