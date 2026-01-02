"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SignatureCanvas from "react-signature-canvas";
import AgreementPages from "./agreement/AgreementPages";
import SignupStepper from "./SignupStepper";

interface SignupStep3Props {
  onNext: (signatureData: SignatureData) => void;
  onBack: () => void;
}


const signatureSchema = z.object({
  coveredEntity: z.string().min(1, "Covered Entity is required"),
  coveredEntityName: z.string().min(1, "Name is required"),
  coveredEntitySignature: z.string().min(1, "Signature is required"),
  coveredEntityTitle: z.string().min(1, "Title is required"),
  coveredEntityDate: z.string().min(1, "Date is required"),
  integritySolutionsSignature: z.string().optional(),
  businessAssociateName: z.string().optional(),
  businessAssociateSignature: z.string().optional(),
  businessAssociateTitle: z.string().optional(),
  businessAssociateDate: z.string().optional(),
});

export type SignatureData = z.infer<typeof signatureSchema>;

export default function SignupStep3Agreement({ onNext, onBack }: SignupStep3Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [canvasWidth, setCanvasWidth] = useState(400);

  // Refs for signature pads (must be inside the component)
  const coveredEntitySigPad = useRef<SignatureCanvas>(null);
  const integritySolutionsSigPad = useRef<SignatureCanvas>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const form = useForm<SignatureData>({
    resolver: zodResolver(signatureSchema),
    defaultValues: {
      coveredEntity: "",
      coveredEntityName: "",
      coveredEntitySignature: "",
      coveredEntityTitle: "",
      coveredEntityDate: "",
      integritySolutionsSignature: "",
      businessAssociateName: "Integrity Tissue Solutions",
      businessAssociateSignature: "",
      businessAssociateTitle: "",
      businessAssociateDate: "",
    },
  });

  const coveredEntityValue = useWatch({ control: form.control, name: "coveredEntity" });

  // Resize canvas to match container width
  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasContainerRef.current) {
        const containerWidth = canvasContainerRef.current.offsetWidth - 8; // Account for padding
        setCanvasWidth(containerWidth > 0 ? containerWidth : 400);
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrollPercentage = (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
    
    // Update page based on scroll position
    if (scrollPercentage < 16) setCurrentPage(1);
    else if (scrollPercentage < 33) setCurrentPage(2);
    else if (scrollPercentage < 50) setCurrentPage(3);
    else if (scrollPercentage < 66) setCurrentPage(4);
    else if (scrollPercentage < 83) setCurrentPage(5);
    else setCurrentPage(6);
  };

  const handleAgreeAndContinue = (values: SignatureData) => {
    console.log("Signature Data:", values);
    onNext(values);
  };

  return (
     <div className="w-full px-8 py-4 bg-red-500">
      <div className="w-full h-full flex flex-col">

        {/* Agreement Document Card */}
        <div className="flex-1 bg-white rounded-lg flex flex-col overflow-hidden min-h-[700px]">
          {/* Logo Section (from AuthComponent) */}
          <div className="flex flex-col items-center pt-8 pb-2">
            <div className="w-12 h-12 border-2 border-gray-400 rounded-lg flex items-center justify-center mb-4 text-gray-700">
              <span className="text-2xl">+</span>
            </div>
            <div className="w-16 h-2 bg-gray-400 rounded mb-4" />
            <h1 className="text-2xl font-light tracking-widest text-gray-700 mb-1">INTEGRITY</h1>
            <h1 className="text-2xl font-light tracking-widest text-gray-700 mb-2">TISSUE</h1>
            <p className="text-gray-400 text-xs tracking-widest mb-2">— SOLUTIONS —</p>
          </div>
          <SignupStepper currentStep={3} />
          {/* Document Header */}
          <div className="bg-gray-100 px-6 py-4 border-b flex items-center justify-between">
            <h3 className="text-xl font-semibold text-black">Business Associate Agreement</h3>
            <span className="text-sm text-gray-600">Page {currentPage} of 6</span>
          </div>
          
          {/* Scrollable Content */}
          <div 
            className="flex-1 overflow-y-auto px-8 py-10" 
            style={{ minHeight: 500, maxHeight: 'calc(80vh - 120px)' }}
            onScroll={handleScroll}
          >
            <AgreementPages 
              coveredEntityValue={coveredEntityValue}
              onCoveredEntityChange={(value: string) => form.setValue("coveredEntity", value)}
              form={form}
              coveredEntitySigPad={coveredEntitySigPad}
              integritySolutionsSigPad={integritySolutionsSigPad}
              canvasContainerRef={canvasContainerRef}
              canvasWidth={canvasWidth}
              onBack={onBack}
              onSubmit={handleAgreeAndContinue}
            />
            {/* End of agreement pages */}
          </div>
        </div>
      </div>
    </div>
  );
}
