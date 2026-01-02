"use client";

import React, { useState } from "react";
import SignupStep1ClinicDetails, { ClinicDetailsForm } from "./SignupStep1ClinicDetails";
import SignupStep2Verification from "./SignupStep2Verification";
import SignupStep3Agreement, { SignatureData } from "./SignupStep3Agreement";
import SignupStep4Summary from "./SignupStep4Summary";
import SignupStep5Success from "./SignupStep5Success";

type SignupStep = 1 | 2 | 3 | 4 | 5;

export default function ProviderSignupFlow() {
  const [currentStep, setCurrentStep] = useState<SignupStep>(1);
  const [clinicData, setClinicData] = useState<ClinicDetailsForm | null>(null);
  const [signatureData, setSignatureData] = useState<SignatureData | null>(null);

  const handleStep1Next = (data: ClinicDetailsForm) => {
    setClinicData(data);
    setCurrentStep(2);
  };

  const handleStep2Next = () => {
    setCurrentStep(3);
  };

  const handleStep2Back = () => {
    setCurrentStep(1);
  };

  const handleStep3Next = (data: SignatureData) => {
    setSignatureData(data);
    setCurrentStep(4);
  };

  const handleStep3Back = () => {
    setCurrentStep(2);
  };

  const handleStep4Next = () => {
    // Here you would typically submit all the data to your backend
    console.log("Submitting provider signup data:", {
      clinicData,
      signatureData,
    });
    setCurrentStep(5);
  };

  const handleStep4Back = () => {
    setCurrentStep(3);
  };

  return (
    <>
      {currentStep === 1 && (
        <SignupStep1ClinicDetails 
          onNext={handleStep1Next} 
          defaultValues={clinicData || undefined}
        />
      )}
      {currentStep === 2 && clinicData && (
        <SignupStep2Verification
          phone={clinicData.clinicPhone}
          onNext={handleStep2Next}
          onBack={handleStep2Back}
        />
      )}
      {currentStep === 3 && (
        <SignupStep3Agreement
          onNext={handleStep3Next}
          onBack={handleStep3Back}
        />
      )}
      {currentStep === 4 && clinicData && signatureData && (
        <SignupStep4Summary
          clinicData={clinicData}
          signatureData={signatureData}
          onNext={handleStep4Next}
          onBack={handleStep4Back}
        />
      )}
      {currentStep === 5 && (
        <SignupStep5Success />
      )}
    </>
  );
}
