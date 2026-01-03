"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { SignatureData } from "./SignupStep3Agreement";
import { ClinicDetailsForm } from "./SignupStep1ClinicDetails";
import ProviderLogoHeader from "./ProviderLogoHeader";
import SignupStepper from "./SignupStepper";

interface SignupStep4Props {
  clinicData: ClinicDetailsForm;
  signatureData: SignatureData;
  onNext: () => void;
  onBack: () => void;
}

export default function SignupStep4Summary({
  clinicData,
  signatureData,
  onNext,
  onBack,
}: SignupStep4Props) {
  return (
    <div className="w-full px-8 py-4">
      <div className="w-full h-full flex flex-col">
        {/* Summary Card */}
        <div className="flex-1 bg-white rounded-lg flex flex-col overflow-hidden min-h-[700px]">
          {/* Logo Section */}
          <ProviderLogoHeader />

          {/* Progress Steps */}
          <SignupStepper currentStep={3} />

          <h3 className="text-xl font-semibold text-black mb-4 text-center">
            Review Your Information
          </h3>

          <div className="space-y-6">
            {/* Clinic Information */}
            <div>
              <h4 className="font-semibold text-black mb-3 border-b pb-2">
                Clinic Information
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Clinic/Practice Name:</p>
                  <p className="text-black font-medium">
                    {clinicData.clinicName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Clinic Address:</p>
                  <p className="text-black font-medium">
                    {clinicData.clinicAddress}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Clinic Phone Number:</p>
                  <p className="text-black font-medium">
                    {clinicData.clinicPhone}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">NPI Number:</p>
                  <p className="text-black font-medium">
                    {clinicData.npiNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Provider Information */}
            <div>
              <h4 className="font-semibold text-black mb-3 border-b pb-2">
                Provider Information
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Physician/Provider Name:</p>
                  <p className="text-black font-medium">
                    {clinicData.providerName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Physician Specialty:</p>
                  <p className="text-black font-medium">
                    {clinicData.providerSpecialty}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Tax ID (EIN):</p>
                  <p className="text-black font-medium">{clinicData.taxId}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email Address:</p>
                  <p className="text-black font-medium">{clinicData.email}</p>
                </div>
              </div>
            </div>

            {/* Agreement Status */}
            <div>
              <h4 className="font-semibold text-black mb-3 border-b pb-2">
                Agreement Status
              </h4>
              <div className="text-sm">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-black font-medium">
                    Business Associate Agreement - Signed
                  </p>
                </div>
                <p className="text-gray-600 ml-7 mt-1">
                  Signed by {signatureData.coveredEntityName} on{" "}
                  {signatureData.coveredEntityDate}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <Button
            onClick={onBack}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-lg py-6 rounded-lg"
          >
            Back
          </Button>
          <Button
            onClick={onNext}
            className="flex-1 bg-gray-300 hover:bg-gray-400 hover:text-white text-gray-800 text-lg py-6 rounded-lg"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
