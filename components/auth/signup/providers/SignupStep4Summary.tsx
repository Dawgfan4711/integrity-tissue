"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { SignatureData } from "./SignupStep3Agreement";
import { ClinicDetailsForm } from "./SignupStep1ClinicDetails";

interface SignupStep4Props {
  clinicData: ClinicDetailsForm;
  signatureData: SignatureData;
  onNext: () => void;
  onBack: () => void;
}

export default function SignupStep4Summary({ clinicData, signatureData, onNext, onBack }: SignupStep4Props) {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#1a1a2e]">
      <div className="w-full max-w-2xl p-8">
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
          <div className="w-24 h-1 bg-white mb-6" />
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-white text-xs">Agreement</span>
          </div>
        </div>

        <div className="text-center text-white mb-8">
          <p className="text-base">
            In this page is where the provider will review summary of his/her entered information
          </p>
        </div>

        <div className="bg-white rounded-lg p-8 mb-6">
          <h3 className="text-xl font-semibold text-black mb-6">Review Your Information</h3>
          
          <div className="space-y-6">
            {/* Clinic Information */}
            <div>
              <h4 className="font-semibold text-black mb-3 border-b pb-2">Clinic Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Clinic/Practice Name:</p>
                  <p className="text-black font-medium">{clinicData.clinicName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Clinic Address:</p>
                  <p className="text-black font-medium">{clinicData.clinicAddress}</p>
                </div>
                <div>
                  <p className="text-gray-600">Clinic Phone Number:</p>
                  <p className="text-black font-medium">{clinicData.clinicPhone}</p>
                </div>
                <div>
                  <p className="text-gray-600">NPI Number:</p>
                  <p className="text-black font-medium">{clinicData.npiNumber}</p>
                </div>
              </div>
            </div>

            {/* Provider Information */}
            <div>
              <h4 className="font-semibold text-black mb-3 border-b pb-2">Provider Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Physician/Provider Name:</p>
                  <p className="text-black font-medium">{clinicData.providerName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Physician Specialty:</p>
                  <p className="text-black font-medium">{clinicData.providerSpecialty}</p>
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
              <h4 className="font-semibold text-black mb-3 border-b pb-2">Agreement Status</h4>
              <div className="text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-black font-medium">Business Associate Agreement - Signed</p>
                </div>
                <p className="text-gray-600 ml-7 mt-1">
                  Signed by {signatureData.coveredEntityName} on {signatureData.coveredEntityDate}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={onBack}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-lg py-6 rounded-lg"
          >
            Back
          </Button>
          <Button
            onClick={onNext}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-white text-lg py-6 rounded-lg"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
