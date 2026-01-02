"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  businessAssociateName: z.string().optional(),
  businessAssociateSignature: z.string().optional(),
  businessAssociateTitle: z.string().optional(),
  businessAssociateDate: z.string().optional(),
});

export type SignatureData = z.infer<typeof signatureSchema>;

export default function SignupStep3Agreement({ onNext, onBack }: SignupStep3Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const form = useForm<SignatureData>({
    resolver: zodResolver(signatureSchema),
    defaultValues: {
      coveredEntity: "",
      coveredEntityName: "",
      coveredEntitySignature: "",
      coveredEntityTitle: "",
      coveredEntityDate: "",
      businessAssociateName: "Integrity Tissue Solutions",
      businessAssociateSignature: "",
      businessAssociateTitle: "",
      businessAssociateDate: "",
    },
  });

  const coveredEntityValue = useWatch({ control: form.control, name: "coveredEntity" });

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
    <div className="w-screen h-screen flex items-center justify-center bg-[#1a1a2e] p-8">
      <div className="w-full max-w-4xl h-full flex flex-col">
        {/* Header with Logo and Progress */}
        <div className="flex items-center justify-between mb-6">
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
        <div className="mb-6 flex items-center justify-center gap-4">
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

        {/* Agreement Document Card */}
        <div className="flex-1 bg-white rounded-lg flex flex-col overflow-hidden">
          {/* Document Header */}
          <div className="bg-gray-100 px-6 py-4 border-b flex items-center justify-between">
            <h3 className="text-xl font-semibold text-black">Business Associate Agreement</h3>
            <span className="text-sm text-gray-600">Page {currentPage} of 6</span>
          </div>
          
          {/* Scrollable Content */}
          <div 
            className="flex-1 overflow-y-auto px-8 py-6" 
            onScroll={handleScroll}
          >
            {/* eslint-disable react/no-unescaped-entities */}
            {/* Page 1 */}
            <div className="mb-8 min-h-[80vh]">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-8 h-8 border border-black rounded flex items-center justify-center">
                    <span className="text-lg">+</span>
                  </div>
                  <span className="text-xs font-semibold">HOME</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">INTEGRITY TISSUE</h2>
                <p className="text-sm text-gray-600 mb-4">— SOLUTIONS —</p>
                <h3 className="text-lg font-semibold mb-2">Integrity Tissue Solutions</h3>
                <h4 className="text-base font-semibold">Business Associate Agreement</h4>
              </div>
              <div className="space-y-4 text-sm text-black leading-relaxed">
                <p>
                  This Business Associate Agreement (the "Agreement"), is hereby made by and between{" "}
                  <Input
                    value={coveredEntityValue}
                    onChange={(e) => form.setValue("coveredEntity", e.target.value)}
                    className="inline-block w-64 h-7 px-2 bg-blue-50 border-blue-300 align-baseline"
                    placeholder="Enter Covered Entity"
                  />
                  {" "}("Covered Entity") and Integrity Tissue Solutions ("Business Associate"), each individually a "Party" and together the "Parties."
                </p>
                <p>
                  <strong>A.</strong> The purpose of this Agreement is to comply with the business associate requirements of the Standards for Privacy of Individually Identifiable Health Information ("Privacy Regulations," 45 CFR Part 160, 162, and 164, Subparts A and E), the Standards for Security of Electronic Protected Health Information ("Security Regulations", 45 CFR Parts 160, 162, and 164, Subpart C) (collectively referred to as "HIPAA Regulations"), contained in the Health Insurance Portability and Accountability Act of 1996 ("HIPAA") (45 C.F.R. parts 160 and 164), as amended by the Health Information Technology for Economic and Clinical Health Act ("HITECH").
                </p>
                <p>
                  <strong>B.</strong> Covered Entity and Business Associate have entered into this Agreement because Business Associate may receive and/or create certain Protected Health Information ("PHI"), as that term is defined or certain services (the "Services") for Covered Entity, such as consultation, eligibility determination, or other activities related to the medical devices, supplies, therapeutics, and other products covered by Business Associate. For clarity, the Services do not include conducting insurance checks, precertifications, appeals, grievances, or any insurance-related activities on behalf of Covered Entity or patients.
                </p>
                <p>
                  <strong>C.</strong> The Privacy Regulations require Covered Entity to obtain written assurances from Business Associate that Business Associate will appropriately safeguard the PHI.
                </p>
                <p className="mt-6">
                  Now, therefore, in consideration of the mutual promises set forth below and other good and valuable consideration, the sufficiency and receipt of which is hereby acknowledged, the Parties agree as follows:
                </p>
              </div>
            </div>

            {/* Page 2 */}
            <div className="mb-8 min-h-[80vh] border-t pt-6">
              <div className="text-right text-sm text-gray-600 mb-4">Page 2 of 6</div>
              <div className="space-y-4 text-sm text-black leading-relaxed">
                <p>
                  <strong>Definitions.</strong> Terms used, but not otherwise defined, in this Agreement shall have the same meaning as in the HIPAA Regulations.
                </p>
                <p className="mt-4">
                  <strong>General Use and Disclosure, and Obligations of Business Associate.</strong>
                </p>
                <p>
                  <strong>2.1</strong> Business Associate hereby acknowledges and agrees that it will comply with the requirements applicable to Business Associate found in the HIPAA regulations and in the HITECH Act commencing on the applicable effective date of each such provision and that such requirements are incorporated by reference into this Agreement.
                </p>
                <p>
                  <strong>2.2</strong> Business Associate agrees to implement appropriate federal and state security and privacy laws which may be applicable to PHI provided to Business Associate by Covered Entity to the extent such laws are more protective of individual privacy than HIPAA.
                </p>
                <p>
                  <strong>2.3</strong> Business Associate may use or disclose PHI on Covered Entity's behalf or for, or on behalf of Covered Entity as specified in the Privacy Regulations, this Business Associate Agreement and any underlying Agreements between the parties or as otherwise required by Business Associate under the Privacy Regulations or applicable law, provided that Business Associate shall not make any use or disclosure of PHI that would violate the Privacy Regulations if disclosed or used in such a manner by Covered Entity.
                </p>
                <p>
                  <strong>2.4</strong> <span className="underline">Inconsistent with Covered Entity's obligations under the Privacy Regulations</span> or (ii) that would violate the Privacy Regulations if disclosed or used in such a manner by Covered Entity.
                </p>
                <p className="mt-6">
                  <strong>Safeguards for the Protection of PHI.</strong>
                </p>
                <p>
                  <strong>3.1</strong> Business Associate shall implement and maintain commercially appropriate security safeguards to ensure that PHI is not used or disclosed by Business Associate, its employees, agents, or subcontractors in violation of this Agreement.
                </p>
                <p>
                  <strong>3.2</strong> Business Associate agrees to implement appropriate physical and technical safeguards that reasonably and appropriately protect the confidentiality, integrity, and availability of any electronic PHI that is created, received, maintained or transmitted by Business Associate under this Agreement.
                </p>
                <p className="mt-6">
                  <strong>Reporting and Mitigating the Effect of Unauthorized Uses and Disclosures.</strong>
                </p>
                <p>
                  <strong>4.1</strong> Business Associate agrees to promptly report in writing to Covered Entity's Privacy Officer any use or disclosure of PHI not provided for by this Agreement of which it becomes aware.
                </p>
                <p>
                  <strong>4.2</strong> Business Associate agrees to mitigate, to the extent practicable, any harmful effect that is known to Business Associate of a use or disclosure of PHI by Business Associate in violation.
                </p>
              </div>
            </div>

            {/* Page 3 */}
            <div className="mb-8 min-h-[80vh] border-t pt-6">
              <div className="text-right text-sm text-gray-600 mb-4">Page 3 of 6</div>
              <div className="space-y-4 text-sm text-black leading-relaxed">
                <p>of the requirements of this Agreement.</p>
                <p>
                  <strong>4.3</strong> If Business Associate creates, receives, maintains or transmits electronic PHI on Covered Entity's behalf, Business Associate will report to Covered Entity within forty-eight (48) hours any security accident of which it becomes aware. A "security accident" means the attempted or successful unauthorized access, use, disclosure, modification, or destruction of information or interference with system operations in an information system.
                </p>
                <p>
                  <strong>4.4</strong> Business Associate agrees to notify Covered Entity of any breach of unsecured PHI as defined under 45 CFR §164.402 in an expedited manner and in no case later than thirty (30) days after discovery of the breach. Business Associate's notice to Covered Entity shall include all information required for Covered Entity to provide notification required under 45 CFR §164.404.
                </p>
                <p>
                  <strong>4.5</strong> At the option of Covered Entity, Business Associate shall make any notifications required under 45 CFR 164.404 in accordance with a process satisfactory to Covered Entity.
                </p>
                <p>
                  <strong>5.1</strong> Business Associate will require any subcontractor, agent, or other representative that is authorized to receive, use, or have access to PHI under this Agreement, to agree in writing to abide by the same restrictions and conditions on the use and/or disclosure of PHI and to return or destroy any PHI to Business Associate under this Agreement (the "Sub-contractor Agreements"). Business Associate shall include in each Sub-contractor Agreement an agreement that states that upon Covered Entity is a third-party beneficiary of the Sub-contractor Agreement.
                </p>
                <p>
                  <strong>5.2</strong> If applicable, Business Associate will require any subcontractor, agent, or other representative to whom Business Associate provides electronic PHI from or on behalf of Covered Entity to comply with the same restrictions and conditions that apply to Business Associate with respect to such information and appropriate safeguards to protect the electronic PHI.
                </p>
                <p className="mt-6">
                  <strong>Individual Rights and Accounting of Disclosures.</strong>
                </p>
                <p>
                  <strong>6.1</strong> Access by or to Covered Entity. Business Associate shall:
                </p>
                <p className="ml-6">(i) make available PHI to the individual in accordance with 45 C.F.R. Section 164.524 and</p>
                <p className="ml-6">(ii) incorporate any amendments to the PHI.</p>
                <p>
                  <strong>6.2</strong> Business Associate shall document all disclosures of PHI and any information related to such disclosures as would be required for Covered Entity to respond to a request by an individual for an accounting of disclosures of PHI in accordance with the Privacy.
                </p>
              </div>
            </div>

            {/* Page 4 */}
            <div className="mb-8 min-h-[80vh] border-t pt-6">
              <div className="text-right text-sm text-gray-600 mb-4">Page 4 of 6</div>
              <div className="space-y-4 text-sm text-black leading-relaxed">
                <p>Regulations.</p>
                <p>
                  <strong>6.3</strong> Business Associate agrees to provide to Covered Entity, in a time and manner designated by Covered Entity, information collected in accordance with Section 6.2, to permit Covered Entity to respond to a request by an individual for an accounting of disclosures of PHI in accordance with the Privacy Regulations.
                </p>
                <p className="mt-6">
                  <strong>7. Audit, Inspection and Enforcement.</strong> With reasonable notice, Business Associate agrees to make internal practices, books and records, including policies and procedures relating to the use and disclosure of PHI received from, or created or received by Business Associate on behalf of Covered Entity, available to the Covered Entity and the Secretary of the Department of Health and Human Services to monitor compliance with the Privacy Regulations. Business Associate must provide any information regarding Business Associate and promptly cooperate with inspections, reviews, or investigations of this Agreement found by Covered Entity, according to Covered Entity's guidelines; and will review any corrections that may be made.
                </p>
                <p className="mt-6">
                  <strong>Obligations of Covered Entity to Inform Business Associate of Privacy Practices and Restrictions.</strong>
                </p>
                <p>
                  <strong>8.1</strong> Covered Entity shall provide Business Associate with its Notice of Privacy Practices in accordance with the Privacy Regulations, as well as any changes to such Notice.
                </p>
                <p>
                  <strong>8.2</strong> Covered Entity shall notify Business Associate of any changes in, or revocation of, any authorization to use or disclose PHI, to the extent it may affect Business Associate's permitted or required uses and disclosures.
                </p>
                <p>
                  <strong>8.3</strong> Covered Entity shall notify Business Associate of any restrictions to the use or disclosure of PHI that Covered Entity has agreed to in accordance with the Privacy Regulations, if the restriction affects Business Associate's permitted or required uses and disclosures.
                </p>
                <p className="mt-6">
                  <strong>9. Term and Termination.</strong>
                </p>
                <p>
                  <strong>9.1</strong> Term. This Agreement shall terminate upon termination of Services by Business Associate to Covered Entity or as otherwise provided in this Agreement.
                </p>
                <p>
                  <strong>9.2</strong> Termination for Cause. If either Party is determined to have materially breached the HIPAA Regulations or this Agreement, the non-breaching party may terminate the Agreement immediately upon written notice.
                </p>
                <p>
                  <strong>9.3</strong> Effect of Termination. Upon termination of the Agreement, for any reason, Business Associate shall, within five (5) business days of the termination, return or destroy all PHI as.
                </p>
              </div>
            </div>

            {/* Page 5 */}
            <div className="mb-8 min-h-[80vh] border-t pt-6">
              <div className="text-right text-sm text-gray-600 mb-4">Page 5 of 6</div>
              <div className="space-y-4 text-sm text-black leading-relaxed">
                <p>directed by Covered Entity, created or received by Business Associate on behalf of Covered Entity. PHI retention shall only apply to the agents or subcontractors of Business Associate.</p>
                <p>
                  <strong>9.4</strong> In the event that Business Associate cannot return or destroy the PHI, Business Associate shall notify Covered Entity of the conditions that make such return or destruction impossible. Business Associate shall extend the protections of this Agreement to such PHI and limit further uses and disclosures of such PHI to those purposes that make the return or destruction infeasible for so long as Business Associate maintains such Protected Health Information.
                </p>
                <p className="mt-6">
                  <strong>10. Miscellaneous.</strong>
                </p>
                <p>
                  <strong>10.1</strong> Regulatory References. A reference in this Agreement to the Privacy Regulations, Security Regulations or HIPAA Regulations means the form of such regulations are in effect or as amended.
                </p>
                <p>
                  <strong>10.2</strong> Amendment. If any modifications to this Agreement are required by law, Covered Entity shall notify Business Associate of proposed modifications to the Agreement to comply with changes in law and give the parties a reasonable opportunity to deliver such amendments acceptable to Covered Entity. Such Notice shall include modifications to the business associate and the Agreement as amended if Business Associate does not within 30 days following the date of the notice, deliver to Covered Entity its written rejection of such modifications.
                </p>
                <p>
                  <strong>10.3</strong> Waiver. Absent a written agreement signed by the Parties, a waiver of a breach of this Agreement shall not be construed as a waiver of a breach of any other provision of this Agreement, or of a future waiver of any subsequent breach of the same provision.
                </p>
                <p>
                  <strong>10.4</strong> No Third Party Beneficiaries. Except as it relates to the Sub-contractor Agreements, above, nothing in this Agreement is intended to confer, upon any person other than the Parties and the respective successors and permitted assigns of the Parties, any rights, remedies, obligations, or liabilities whatsoever. The Agreement shall only be assigned or transferred by Business Associate, in whole or part, without prior written consent of Covered Entity.
                </p>
                <p>
                  <strong>10.5</strong> Notices. Any notice to be given under this Agreement to a Party shall be made via Certified U.S. Mail, return receipt requested, commercial courier with receipt verification, or.
                </p>
              </div>
            </div>

            {/* Page 6 with Signature Form */}
            <div className="mb-8 min-h-[80vh] border-t pt-6">
              <div className="text-right text-sm text-gray-600 mb-4">Page 6 of 6</div>
              <div className="space-y-4 text-sm text-black leading-relaxed">
                <p>by hand delivery to such Party at its address given below or to such other address as shall be specified by the applicable party in the future:</p>
                <p className="ml-6">
                  <strong>to Business Associate:</strong><br />
                  Integrity Tissue Solutions, Attn: Privacy Officer<br />
                  10 Hwy 98 STE 315 PMB#38 Bonaire, GA 31005
                </p>
                <p className="ml-6">
                  <strong>to Covered Entity:</strong><br />
                  <Input
                    value={coveredEntityValue}
                    onChange={(e) => form.setValue("coveredEntity", e.target.value)}
                    className="w-full max-w-md bg-blue-50 border-blue-300 mt-1"
                    placeholder="Enter Covered Entity address"
                  />
                </p>
                <p>
                  <strong>10.6</strong> Entire Agreement. This Agreement constitutes the entire understanding among the parties with respect to this subject matter.
                </p>
                <p>
                  <strong>10.7</strong> Interpretation. Any ambiguity in this Agreement shall be resolved to permit Covered Entity to comply with the HIPAA Regulations.
                </p>
                <p>
                  <strong>10.8</strong> Choice of Law and Venue. This Agreement shall be governed by the laws of the State of Georgia, without regard to any statute or case law on choice of laws. Venue for any legal action brought under this Agreement shall be brought exclusively in the United States District Court for the Middle District of Georgia.
                </p>
                <p className="mt-6 font-semibold">
                  WITNESS WHEREOF, each of the parties has caused this Agreement to be executed in its name and on its behalf:
                </p>

                {/* Signature Section - shadcn Form */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleAgreeAndContinue)} className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <p className="font-semibold mb-4">Covered Entity:</p>
                        <FormField
                          control={form.control}
                          name="coveredEntity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Organization/Clinic Name</FormLabel>
                              <FormControl>
                                <Input {...field} className="w-full bg-blue-50 border-blue-300" placeholder="Enter covered entity name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="coveredEntityName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name (Printed)</FormLabel>
                              <FormControl>
                                <Input {...field} className="w-full bg-blue-50 border-blue-300" placeholder="Enter name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="coveredEntitySignature"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Signature</FormLabel>
                              <FormControl>
                                <Input {...field} className="w-full bg-blue-50 border-blue-300" placeholder="Enter signature" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="coveredEntityTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input {...field} className="w-full bg-blue-50 border-blue-300" placeholder="Enter title" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="coveredEntityDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} className="w-full bg-blue-50 border-blue-300" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="space-y-4">
                        <p className="font-semibold mb-4">Integrity Tissue Solutions:</p>
                        <FormField
                          control={form.control}
                          name="businessAssociateName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>By</FormLabel>
                              <FormControl>
                                <Input {...field} disabled className="w-full bg-gray-100" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="businessAssociateSignature"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Signature</FormLabel>
                              <FormControl>
                                <Input {...field} className="w-full bg-blue-50 border-blue-300" placeholder="Enter signature" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="businessAssociateTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input {...field} className="w-full bg-blue-50 border-blue-300" placeholder="Enter title" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="businessAssociateDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} className="w-full bg-blue-50 border-blue-300" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="mt-6 flex gap-4">
                      <Button
                        type="button"
                        onClick={onBack}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-base py-3 rounded-lg"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-white text-base py-3 rounded-lg"
                      >
                        Agree and Continue
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
            {/* eslint-enable react/no-unescaped-entities */}
          </div>
        </div>
      </div>
    </div>
  );
}
