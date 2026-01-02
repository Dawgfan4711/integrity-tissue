"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface SignupStep3Props {
  onNext: (signatureData: SignatureData) => void;
  onBack: () => void;
}

export interface SignatureData {
  coveredEntityName: string;
  coveredEntitySignature: string;
  coveredEntityTitle: string;
  coveredEntityDate: string;
  businessAssociateName: string;
  businessAssociateSignature: string;
  businessAssociateTitle: string;
  businessAssociateDate: string;
}

export default function SignupStep3Agreement({ onNext, onBack }: SignupStep3Props) {
  const [showAgreement, setShowAgreement] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [signatureData, setSignatureData] = useState<SignatureData>({
    coveredEntityName: "",
    coveredEntitySignature: "",
    coveredEntityTitle: "",
    coveredEntityDate: "",
    businessAssociateName: "Integrity Tissue Solutions",
    businessAssociateSignature: "",
    businessAssociateTitle: "",
    businessAssociateDate: "",
  });

  const handleContinue = () => {
    setShowAgreement(true);
  };

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

  const handleInputChange = (field: keyof SignatureData, value: string) => {
    setSignatureData(prev => ({ ...prev, [field]: value }));
  };

  const isFormComplete = () => {
    return (
      signatureData.coveredEntityName.trim() !== "" &&
      signatureData.coveredEntitySignature.trim() !== "" &&
      signatureData.coveredEntityTitle.trim() !== "" &&
      signatureData.coveredEntityDate.trim() !== "" &&
      signatureData.businessAssociateSignature.trim() !== "" &&
      signatureData.businessAssociateTitle.trim() !== "" &&
      signatureData.businessAssociateDate.trim() !== ""
    );
  };

  const handleAgreeAndContinue = () => {
    console.log("Signature Data:", signatureData);
    setShowAgreement(false);
    onNext(signatureData);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#1a1a2e]">
      <div className="w-full max-w-md p-8">
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
          <p className="text-sm">
            Please review and agree to the Business Associate Agreement to continue.
          </p>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={onBack}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-lg py-6 rounded-lg"
          >
            Back
          </Button>
          <Button
            onClick={handleContinue}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-white text-lg py-6 rounded-lg"
          >
            Continue
          </Button>
        </div>
      </div>

      {/* Agreement Modal */}
      <Dialog open={showAgreement} onOpenChange={setShowAgreement}>
        <DialogContent className="max-w-3xl h-[90vh] p-0 overflow-hidden flex flex-col">
          <div className="bg-gray-100 px-6 py-4 border-b flex items-center justify-between">
            <h3 className="text-xl font-semibold text-black">Business Associate Agreement</h3>
            <span className="text-sm text-gray-600">Page {currentPage} of 6</span>
          </div>
          
          <div 
            className="flex-1 overflow-y-auto px-8 py-6" 
            onScroll={handleScroll}
          >
            {/* eslint-disable react/no-unescaped-entities */}
            {/* Page 1 */}
            <div className="mb-8 min-h-[80vh]">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-black">Integrity Tissue Solutions</h2>
                <h3 className="text-lg font-semibold text-black">Business Associate Agreement</h3>
              </div>
              <div className="space-y-4 text-sm text-black">
                <p>
                  This Business Associate Agreement (the "Agreement"), is hereby made by and between
                  ____________ ("Covered Entity") and Integrity Tissue Solutions ("Business Associate"), 
                  each individually a "Party" and together the "Parties."
                </p>
                <div>
                  <p className="font-semibold mb-2">A. Purpose of Agreement</p>
                  <p>
                    The purpose of this Agreement is to comply with the business associate requirements of the 
                    Standards for Privacy of Individually Identifiable Health Information, 45 CFR Parts 160 and 164, 
                    Subparts A and E) and the Security Standards for Electronic Protected Health Information 
                    ("Security Regulations", 45 CFR Parts 160, 162, and 164, Subpart C) (collectively referred to 
                    as the "HIPAA Regulations"), contained in the Health Insurance Portability and Accountability 
                    Act of 1996 ("HIPAA") (45 C.F.R. parts 142 and 160-164), as amended by the Health Information 
                    Technology for Economic and Clinical Health Act ("HITECH Act") of 2009.
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2">B. Covered Entity and Business Associate</p>
                  <p>
                    Covered Entity and Business Associate have entered into this Agreement because Business 
                    Associate may receive and use Protected Health Information ("PHI") in the course of providing 
                    certain services (the "Services") for Covered Entity, such as consultation, eligibility determination, 
                    or other activities related to the medical devices, supplies, therapeutics, and other products 
                    carried by Business Associate. For clarity, the Services do not include conducting insurance checks, 
                    precertifications, appeals, or any other services on behalf of Covered Entity or patients.
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2">C. Privacy Regulations</p>
                  <p>
                    The Privacy Regulations require Covered Entity to obtain written assurances from Business 
                    Associate that Business Associate will appropriately safeguard the PHI.
                  </p>
                </div>
                <p>
                  Now, therefore, in consideration of the mutual promises set forth below and other good and 
                  valuable consideration, the sufficiency and receipt of which is hereby acknowledged, the Parties 
                  agree as follows:
                </p>
              </div>
            </div>

            {/* Page 2 */}
            <div className="mb-8 min-h-[80vh] border-t pt-6">
              <div className="text-right text-sm text-gray-600 mb-4">Page 2 of 6</div>
              <div className="space-y-4 text-sm text-black">
                <p className="font-semibold">
                  Definitions: Terms used, but not otherwise defined, in this Agreement shall have the same meanings 
                  as in the HIPAA Regulations.
                </p>
                
                <div>
                  <p className="font-semibold mb-2">General Permitted Uses and Disclosures, and Obligations of Business Associate</p>
                  <p className="mb-2">
                    2.1 Business Associate hereby acknowledges and agrees that it will comply with all requirements 
                    applicable to Business Associate under the HIPAA Regulations in the HITECH Act commencing on 
                    the applicable effective date of each such provision and that such requirements are incorporated 
                    by reference into this Agreement.
                  </p>
                  <p className="mb-2">
                    2.2 Business Associate will comply with all appropriate federal and state security and privacy 
                    laws which may be applicable to PHI provided to Business Associate by Covered Entity.
                  </p>
                  <p className="mb-2">
                    2.3 Business Associate may use or disclose PHI to perform functions, activities or services for, 
                    or on behalf of, Covered Entity as specified in the Privacy Regulations, this Business Associate 
                    Agreement, and any underlying Agreement between Covered Entity and Business Associate, but 
                    otherwise as required by law. Business Associate will not use or disclose PHI in a manner
                  </p>
                  <p className="ml-4 mb-2">
                    (i) inconsistent with Covered Entity's obligations under the Privacy Regulations or
                  </p>
                  <p className="ml-4 mb-2">
                    (ii) that would violate the Privacy Regulations if done by Covered Entity.
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-2">Requirements for the Protection of PHI</p>
                  <p className="mb-2">
                    3.1 Business Associate will implement and maintain commercially appropriate security safeguards 
                    to ensure that PHI is not used or disclosed by Business Associate, its employees, agents or 
                    subcontractors in violation of this Agreement.
                  </p>
                  <p className="mb-2">
                    3.2 Business Associate agrees to implement administrative, physical and technical safeguards 
                    that reasonably and appropriately protect the confidentiality, integrity, and availability of any 
                    electronic PHI that it creates, receives, maintains or transmits on behalf of Covered Entity as 
                    required under this Agreement.
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-2">Reporting and Mitigating the Effect of Unauthorized Uses and Disclosures</p>
                  <p className="mb-2">
                    4.1 Business Associate agrees to promptly report in writing to Covered Entity's Privacy Officer 
                    any use or disclosure of the PHI not provided for by this Agreement of which it becomes aware.
                  </p>
                  <p className="mb-2">
                    4.2 Business Associate agrees to mitigate, to the extent practicable, any harmful effect that is 
                    known to Business Associate of a use or disclosure of PHI by Business Associate in violation
                  </p>
                </div>
              </div>
            </div>

            {/* Page 3 */}
            <div className="mb-8 min-h-[80vh] border-t pt-6">
              <div className="text-right text-sm text-gray-600 mb-4">Page 3 of 6</div>
              <div className="space-y-4 text-sm text-black">
                <p>of the requirements of this Agreement.</p>
                
                <p className="mb-2">
                  4.3 If Business Associate becomes aware, maintains or transmits electronic PHI on Covered 
                  Entity's behalf, Business Associate will report to Covered Entity within forty-eight (48) hours 
                  any security incident of which it becomes aware. A "security incident" means the attempted or 
                  successful unauthorized access, use, disclosure, modification, or destruction of information or 
                  interference with system operations in an information system.
                </p>

                <p className="mb-2">
                  4.4 Business Associate agrees to notify Covered Entity of any disclosure of unsecured PHI as 
                  defined under 45 CFR §164.400 et seq., received from or maintained on behalf of Covered Entity 
                  without unreasonable delay and in no case later than thirty (30) days after discovery of the breach. 
                  Discovery of a breach occurs as of the first day on which such breach is known to Business Associate 
                  or, by exercising reasonable diligence, would have been known to Business Associate. Business 
                  Associate is required for Covered Entity to provide notifications required under 45 CFR §164.404.
                </p>

                <p className="mb-2">
                  4.5 At the option of Covered Entity, Business Associate shall make any notifications required 
                  under 45 CFR §164.404 on behalf of Covered Entity.
                </p>

                <div>
                  <p className="font-semibold mb-2">
                    Use by and Disclosure to Subcontractors, Agents, and Representatives.
                  </p>
                  <p className="mb-2">
                    5.1 Business Associate will require any subcontractor, agent, or other representative that it 
                    authorizes to use, create, receive, maintain, transmit or disclose PHI under this Agreement, in 
                    writing to adhere to the same restrictions and conditions on the use and/or disclosure of PHI that 
                    apply to Business Associate under this Subcontractor Agreement. Business Associate shall include 
                    in each Sub-contractor Agreement a clause that states that the Covered Entity is a third-party 
                    beneficiary of the Sub-contractor Agreement.
                  </p>
                  <p className="mb-2">
                    5.2 If applicable, Business Associate will require any subcontractor, agent, or other 
                    representative to whom Business Associate provides electronic PHI to implement reasonable and 
                    appropriate safeguards to protect the electronic PHI.
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-2">Individual Rights and Accounting of Disclosures.</p>
                  <p className="mb-2">
                    6.1 As directed by the Covered Entity, Business Associate shall:
                  </p>
                  <p className="ml-4 mb-2">
                    (i) make available PHI for amendments and incorporate any amendments to the PHI,
                  </p>
                  <p className="ml-4 mb-2">
                    (ii) incorporate into the PHI,
                  </p>
                  <p className="mb-2">
                    6.2 Business Associate agrees to document disclosures of PHI and any information related to such 
                    disclosures as would be required for Covered Entity to respond to a request by an individual for 
                    an accounting of disclosures of PHI in accordance with the Privacy
                  </p>
                </div>
              </div>
            </div>

            {/* Page 4 */}
            <div className="mb-8 min-h-[80vh] border-t pt-6">
              <div className="text-right text-sm text-gray-600 mb-4">Page 4 of 6</div>
              <div className="space-y-4 text-sm text-black">
                <p>Regulations.</p>

                <p className="mb-2">
                  6.3 Business Associate agrees to provide to Covered Entity in a time and manner designated by 
                  Covered Entity, information to permit Covered Entity to respond to a request by an individual for 
                  an accounting of disclosures of PHI in accordance with the Privacy Regulations.
                </p>

                <div>
                  <p className="font-semibold mb-2">
                    Audit, Inspection and Enforcement.
                  </p>
                  <p className="mb-2">
                    With reasonable notice, Business Associate agrees to make information, books and records relating 
                    to its use and disclosure of PHI received from Covered Entity, or created or received by Business 
                    Associate on behalf of Covered Entity, available to the Covered Entity and the Secretary of the 
                    Department of Health and Human Services to monitor compliance with the Privacy Regulations. 
                    Business Associate will promptly correct any violation of the Privacy Regulations or this Agreement 
                    (consistent with the Covered Entity's guidelines, and will certify in writing that the correction 
                    has been made.
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-2">
                    Obligations of Covered Entity to Inform Business Associate of Privacy Practices and Restrictions:
                  </p>
                  <p className="mb-2">
                    8.1 Covered Entity shall provide Business Associate with its Notice of Privacy Practices in 
                    accordance with the Privacy Regulations, as well as any changes to such Notice.
                  </p>
                  <p className="mb-2">
                    8.2 Covered Entity shall notify Business Associate of any changes in, or withdrawal of any, 
                    Authorizations by individuals to use or disclose PHI, if such changes affect Business Associate's 
                    permitted use and disclosure.
                  </p>
                  <p className="mb-2">
                    8.3 Covered Entity shall notify Business Associate of any restriction to the use or disclosure of 
                    PHI that Covered Entity has agreed to in accordance with the Privacy Regulations, if the restriction 
                    affects Business Associate's permitted or required uses and disclosures.
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-2">9. Term and Termination.</p>
                  <p className="mb-2">
                    9.1 Term. This Agreement shall terminate upon termination of Services by Business Associate to 
                    Covered Entity or as otherwise provided in this Agreement.
                  </p>
                  <p className="mb-2">
                    9.2 Termination for Cause. If either party is determined to have materially breached the HIPAA 
                    Regulations or this Agreement and has not cured such breach or ended the violation that gave rise 
                    to such breach within thirty (30) days, this Agreement may immediately be terminated by the 
                    non-breaching party upon written notice.
                  </p>
                  <p className="mb-2">
                    9.3 Effect of Termination. Upon termination of the Agreement, for any reason, Business Associate 
                    shall, within five (5) business days of the termination, return or destroy all PHI, as
                  </p>
                </div>
              </div>
            </div>

            {/* Page 5 */}
            <div className="mb-8 min-h-[80vh] border-t pt-6">
              <div className="text-right text-sm text-gray-600 mb-4">Page 5 of 6</div>
              <div className="space-y-4 text-sm text-black">
                <p>
                  directed by Covered Entity, created or received by Business Associate on behalf of Covered Entity; 
                  provided that, in situations where return or destruction of all PHI is not feasible, the terms and 
                  protections of Business Associate.
                </p>

                <p className="mb-2">
                  9.4 In the event that Business Associate cannot return or destroy the PHI, Business Associate shall 
                  provide to Covered Entity notification of the conditions that make return or destruction of the PHI 
                  impossible. Business Associate shall extend the protections of this Agreement to such PHI and limit 
                  further uses and disclosures of such PHI to those purposes that make return or destruction infeasible 
                  for so long as Business Associate maintains such Protected Health Information.
                </p>

                <div>
                  <p className="font-semibold mb-2">10. Miscellaneous.</p>
                  <p className="mb-2">
                    10.1 Regulatory References. A reference in this Agreement to the Privacy Regulations, Security 
                    Regulations or the HIPAA Regulations means the form of such Regulations are in effect or as 
                    amended.
                  </p>
                  <p className="mb-2">
                    10.2 Amendment. If any modifications to this Agreement are required by law, Covered Entity shall 
                    notify Business Associate in writing. Business Associate shall have thirty (30) days after receipt 
                    of such notification from Covered Entity to object in writing to such modifications; if Business 
                    Associate does not object within such time period, the modifications shall be deemed accepted by 
                    Business Associate and the agreement so amended if Business Associate does not within 30 days 
                    following receipt of such notice deliver to Covered Entity its written notice of disagreement with 
                    such modifications.
                  </p>
                  <p className="mb-2">
                    10.3 Waiver. Absent a written agreement signed by the Parties, a waiver of a breach of this 
                    Agreement shall not be deemed to be a waiver of a breach of any other provision of this Agreement, 
                    or of a failure of any subsequent breach of the same provision.
                  </p>
                  <p className="mb-2">
                    10.4 No Third Party Beneficiaries. Except with respect to Sub-contractor Agreements, as described 
                    above, nothing express or implied in this Agreement is intended to confer, nor shall anything 
                    herein confer, upon any person other than the Parties and the respective successors and permitted 
                    assigns of the Parties, any rights, remedies, obligations, or liabilities whatsoever. The Agreement 
                    shall not in any manner be assigned, or transferred by Business Associate, in whole or part, 
                    without prior written consent of Covered Entity.
                  </p>
                  <p className="mb-2">
                    10.5 Notices. Any notice to be given under this Agreement to a Party shall be made via Certified 
                    U.S. Mail, return receipt requested, commercial courier with receipt verification, or
                  </p>
                </div>
              </div>
            </div>

            {/* Page 6 - With Signature Fields */}
            <div className="mb-8 min-h-[80vh] border-t pt-6">
              <div className="text-right text-sm text-gray-600 mb-4">Page 6 of 6</div>
              <div className="space-y-4 text-sm text-black">
                <p>
                  by hand delivery to such Party at its address given below or to such other address as shall be 
                  specified by the applicable party in the future.
                </p>

                <div className="mb-4">
                  <p className="mb-2">to Business Associate:</p>
                  <p className="mb-1">Integrity Tissue Solutions, Attn: Privacy Officer</p>
                  <p className="mb-1">9 Hwy 96 STE 215 PMB#38 Bonaire, GA 31005</p>
                </div>

                <div className="mb-4">
                  <p className="mb-2">to Covered Entity: _______________________________________________</p>
                </div>

                <p className="mb-2">
                  10.6 Entire Agreement. This Agreement constitutes the entire understanding among the parties with 
                  respect to its subject matter.
                </p>
                <p className="mb-2">
                  10.7 Interpretation. Any ambiguity in this Agreement shall be resolved to permit Covered Entity to 
                  comply with the HIPAA Regulations.
                </p>
                <p className="mb-2">
                  10.8 Choice of Law and Venue. This Agreement shall be governed by the laws of the State of Georgia, 
                  without regard to any statute or case law on choice of laws. Venue for any legal action brought under 
                  this Agreement shall be brought exclusively in the United States District Court for the Middle 
                  District of Georgia.
                </p>

                <p className="font-semibold mt-6 mb-4">
                  WITNESS WHEREOF, each of the parties has caused this Agreement to be executed in its name and on 
                  its behalf:
                </p>

                {/* Signature Section */}
                <div className="grid grid-cols-2 gap-8 mt-8">
                  <div className="space-y-4">
                    <p className="font-semibold mb-4">Covered Entity:</p>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Name (Printed):</label>
                      <Input
                        value={signatureData.coveredEntityName}
                        onChange={(e) => handleInputChange("coveredEntityName", e.target.value)}
                        className="w-full bg-blue-50 border-blue-300"
                        placeholder="Enter name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Signature:</label>
                      <Input
                        value={signatureData.coveredEntitySignature}
                        onChange={(e) => handleInputChange("coveredEntitySignature", e.target.value)}
                        className="w-full bg-blue-50 border-blue-300"
                        placeholder="Enter signature"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Title:</label>
                      <Input
                        value={signatureData.coveredEntityTitle}
                        onChange={(e) => handleInputChange("coveredEntityTitle", e.target.value)}
                        className="w-full bg-blue-50 border-blue-300"
                        placeholder="Enter title"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Date:</label>
                      <Input
                        type="date"
                        value={signatureData.coveredEntityDate}
                        onChange={(e) => handleInputChange("coveredEntityDate", e.target.value)}
                        className="w-full bg-blue-50 border-blue-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="font-semibold mb-4">Integrity Tissue Solutions:</p>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">By:</label>
                      <Input
                        value={signatureData.businessAssociateName}
                        disabled
                        className="w-full bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Signature:</label>
                      <Input
                        value={signatureData.businessAssociateSignature}
                        onChange={(e) => handleInputChange("businessAssociateSignature", e.target.value)}
                        className="w-full bg-blue-50 border-blue-300"
                        placeholder="Enter signature"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Title:</label>
                      <Input
                        value={signatureData.businessAssociateTitle}
                        onChange={(e) => handleInputChange("businessAssociateTitle", e.target.value)}
                        className="w-full bg-blue-50 border-blue-300"
                        placeholder="Enter title"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Date:</label>
                      <Input
                        type="date"
                        value={signatureData.businessAssociateDate}
                        onChange={(e) => handleInputChange("businessAssociateDate", e.target.value)}
                        className="w-full bg-blue-50 border-blue-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={handleAgreeAndContinue}
                    disabled={!isFormComplete()}
                    className={`w-64 text-lg py-6 rounded-full ${
                      isFormComplete() 
                        ? "bg-gray-300 hover:bg-gray-400 text-white" 
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Agree and continue
                  </Button>
                </div>
              </div>
            </div>
            {/* eslint-enable react/no-unescaped-entities */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
