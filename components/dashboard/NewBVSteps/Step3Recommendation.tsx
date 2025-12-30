"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";


import { ClinicalInfoForm } from "./Step1ClinicalInfo";
import { PatientDeliveryForm } from "./Step2PatientDelivery";

interface Step3RecommendationProps {
  onBack: () => void;
  onClose: () => void;
  formData: Partial<ClinicalInfoForm & PatientDeliveryForm>;
}

export function Step3Recommendation({ onBack, onClose, formData }: Step3RecommendationProps) {
  // Dummy product recommendation for demo
  const product = {
    name: "Biovance",
    code: "Q4154",
    brand: "TidesMedical",
    mue: "36 cm² per application",
  };
  return (
    <div className="p-8">
      <div className="flex justify-between mb-4">
        <span className="text-sm text-muted-foreground">Step 3 of 3</span>
      </div>
      <div className="mb-4 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600" style={{ width: "100%" }} />
      </div>
      <h2 className="text-2xl font-bold mb-4">Recommended Product</h2>
      <div className="border border-blue-300 bg-blue-50 rounded-lg p-4 mb-6 flex items-center justify-between">
        <div>
          <div className="font-bold text-lg">{product.name}</div>
          <div className="text-muted-foreground">{product.code} • {product.brand}</div>
          <div className="text-sm mt-1">MUE: {product.mue}</div>
        </div>
        <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2" fill="#e0edff" />
          <path stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9.5 12.5l2 2 3-4" />
        </svg>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <div className="font-bold text-blue-900 mb-2">Order Summary</div>
        <div className="text-sm">Patient: {formData.initials}</div>
        <div className="text-sm">Wound: Diabetic Foot Ulcer • {formData.woundSize || "12.5 cm²"}</div>
        <div className="text-sm">Location: {formData.woundLocation || "Right foot"}</div>
        <div className="text-sm">Application Date: {formData.applicationDate || "2026-01-01"}</div>
      </div>
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 text-green-800 text-sm">
        Clicking below will generate a Benefits Verification form to send to TidesMedical for insurance verification.
      </div>
      <div className="flex gap-4 mt-6">
        <Button type="button" variant="outline" className="flex-1" onClick={onBack}>Back</Button>
        <Button type="button" className="flex-1 bg-green-600 hover:bg-green-700 text-white">Generate BV Form</Button>
      </div>
    </div>
  );
}
