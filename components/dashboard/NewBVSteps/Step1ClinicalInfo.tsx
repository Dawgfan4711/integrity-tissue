"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { orderingProviders } from "@/lib/mockOrderingProviders";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

export const clinicalInfoSchema = z.object({
  provider: z.string().min(1, "Provider is required"),
  placeOfService: z.string().min(1, "Place of Service is required"),
  insurance: z.string().min(1, "Insurance is required"),
  woundType: z.string().min(1, "Wound Type is required"),
  woundSize: z.string().min(1, "Wound Size is required"),
  woundLocation: z.string().optional(),
  icd10: z.string().optional(),
  conservativeTherapy: z.enum(["yes", "no"]),
  diabetic: z.enum(["yes", "no"]),
  tunneling: z.enum(["yes", "no"]),
  infected: z.enum(["yes", "no"]),
});


export type ClinicalInfoForm = z.infer<typeof clinicalInfoSchema>;

interface Step1ClinicalInfoProps {
  onNext: (data: ClinicalInfoForm) => void;
  onClose: () => void;
  defaultValues?: Partial<ClinicalInfoForm>;
}

export function Step1ClinicalInfo({ onNext, onClose, defaultValues }: Step1ClinicalInfoProps) {
  const form = useForm<ClinicalInfoForm>({
    resolver: zodResolver(clinicalInfoSchema),
    defaultValues: defaultValues || {},
  });

  function onSubmit(values: ClinicalInfoForm) {
    onNext(values);
  }

  return (
    <div className="p-8">
      <button className="mb-4 text-sm text-gray-600" onClick={onClose}>&larr; Back</button>
      <div className="mb-4 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-black" style={{ width: "33%" }} />
      </div>
      <h2 className="text-2xl font-bold mb-4">Clinical Info</h2>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
        <div className="font-bold">Practice:</div>
        <div><span className="font-bold">Rep:</span> Integrity Tissue Solutions - Will</div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField name="provider" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Ordering Provider *</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider..." />
                  </SelectTrigger>
                  <SelectContent>
                    {orderingProviders.map((provider, idx) => (
                      <SelectItem key={idx} value={provider.npiNumber}>
                        {provider.providerName} - {provider.clinicName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField name="placeOfService" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Place of Service *</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="hospital">Hospital</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="insurance" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Insurance *</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medicare">Medicare</SelectItem>
                      <SelectItem value="medicaid">Medicaid</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField name="woundType" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Wound Type *</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ulcer">Ulcer</SelectItem>
                      <SelectItem value="burn">Burn</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="woundSize" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Wound Size (cm²) *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField name="woundLocation" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Wound Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., Left foot plantar" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="icd10" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>ICD-10 Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., L97.421" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField name="conservativeTherapy" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>4+ weeks conservative therapy? *</FormLabel>
                <FormControl>
                  <div className="flex gap-4">
                    <label><input type="radio" value="yes" checked={field.value === "yes"} onChange={() => field.onChange("yes")}/> Yes</label>
                    <label><input type="radio" value="no" checked={field.value === "no"} onChange={() => field.onChange("no")}/> No</label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="diabetic" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Patient diabetic? *</FormLabel>
                <FormControl>
                  <div className="flex gap-4">
                    <label><input type="radio" value="yes" checked={field.value === "yes"} onChange={() => field.onChange("yes")}/> Yes</label>
                    <label><input type="radio" value="no" checked={field.value === "no"} onChange={() => field.onChange("no")}/> No</label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField name="tunneling" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Tunneling/undermining? *</FormLabel>
                <FormControl>
                  <div className="flex gap-4">
                    <label><input type="radio" value="yes" checked={field.value === "yes"} onChange={() => field.onChange("yes")}/> Yes</label>
                    <label><input type="radio" value="no" checked={field.value === "no"} onChange={() => field.onChange("no")}/> No</label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="infected" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Currently infected? *</FormLabel>
                <FormControl>
                  <div className="flex gap-4">
                    <label><input type="radio" value="yes" checked={field.value === "yes"} onChange={() => field.onChange("yes")}/> Yes</label>
                    <label><input type="radio" value="no" checked={field.value === "no"} onChange={() => field.onChange("no")}/> No</label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <Button type="submit" className="w-full bg-gray-700 hover:bg-gray-800 text-white mt-4">Continue</Button>
        </form>
      </Form>
    </div>
  );
}
