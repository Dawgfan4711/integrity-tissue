"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ProviderLogoHeader from "./ProviderLogoHeader";

const clinicDetailsSchema = z.object({
  clinicName: z.string().min(1, "Clinic/Practice name is required"),
  clinicAddress: z.string().min(1, "Clinic address is required"),
  clinicPhone: z.string().min(10, "Valid phone number is required"),
  npiNumber: z.string().min(10, "Valid NPI number is required"),
  providerName: z.string().min(1, "Physician/Provider name is required"),
  providerSpecialty: z.string().min(1, "Physician specialty is required"),
  taxId: z.string().min(1, "Tax ID (EIN) is required"),
  email: z.string().email("Valid email address is required"),
});

export type ClinicDetailsForm = z.infer<typeof clinicDetailsSchema>;

export interface SignupStep1Props {
  onNext: (data: ClinicDetailsForm) => void;
  defaultValues?: Partial<ClinicDetailsForm>;
}
function SignupStep1ClinicDetails(props: SignupStep1Props) {
  const form = useForm<ClinicDetailsForm>({
    resolver: zodResolver(clinicDetailsSchema),
    defaultValues: props.defaultValues || {
      clinicName: "",
      clinicAddress: "",
      clinicPhone: "",
      npiNumber: "",
      providerName: "",
      providerSpecialty: "",
      taxId: "",
      email: "",
    },
  });

  const handleSubmit = (values: ClinicDetailsForm) => {
    props.onNext(values);
  };

  return (
    <div className="w-full max-w-md p-8">
      <div className="bg-white rounded-lg p-8">
        {/* Logo and Title */}
        <ProviderLogoHeader />
        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-gray-700 text-xs">Clinic Details</span>
          </div>
          <div className="w-24 h-1 bg-gray-300 mb-6" />
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mb-2" />
            <span className="text-gray-400 text-xs">Verification</span>
          </div>
          <div className="w-24 h-1 bg-gray-300 mb-6" />
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mb-2" />
            <span className="text-gray-400 text-xs">Agreement</span>
          </div>
        </div>
        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="clinicName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Clinic/Practice Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="(text input, required)"
                      className="bg-gray-100 border-gray-300 text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clinicAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Clinic Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="street, city, state, ZIP"
                      className="bg-gray-100 border-gray-300 text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clinicPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Clinic Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="(000) 000-0000"
                      className="bg-gray-100 border-gray-300 text-black"
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="npiNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">NPI NUMBER</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder=""
                      className="bg-gray-100 border-gray-300 text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="providerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Physician/Provider Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder=""
                      className="bg-gray-100 border-gray-300 text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="providerSpecialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Physician Specialty</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder=""
                      className="bg-gray-100 border-gray-300 text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taxId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Tax ID (EIN)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder=""
                      className="bg-gray-100 border-gray-300 text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder=""
                      className="bg-gray-100 border-gray-300 text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-gray-300 hover:bg-gray-400 text-white text-lg py-6 rounded-lg"
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>

      </div>
    </div>
  );
}

export default SignupStep1ClinicDetails;
