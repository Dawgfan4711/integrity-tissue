import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import SignatureCanvas from "react-signature-canvas";
import type { UseFormReturn, SubmitHandler } from "react-hook-form";
import type { SignatureData } from "../SignupStep3Agreement";

interface AgreementPage6Props {
  coveredEntityValue: string;
  onCoveredEntityChange: (value: string) => void;
  form: UseFormReturn<SignatureData>;
  coveredEntitySigPad: React.RefObject<SignatureCanvas | null>;
  integritySolutionsSigPad: React.RefObject<SignatureCanvas | null>;
  canvasContainerRef: React.RefObject<HTMLDivElement | null>;
  canvasWidth: number;
  onBack: () => void;
  onSubmit: SubmitHandler<SignatureData>;
}

export default function AgreementPage6(props: AgreementPage6Props) {
  const {
    coveredEntityValue,
    onCoveredEntityChange,
    form,
    coveredEntitySigPad,
    integritySolutionsSigPad,
    canvasContainerRef,
    canvasWidth,
    onBack,
    onSubmit,
  } = props;
  return (
    <div className="mb-8 min-h-[80vh] border-t pt-6">
      <div className="text-right text-sm text-gray-600 mb-4">Page 6 of 6</div>
      <div className="space-y-4 text-sm text-black leading-relaxed">
        <p>
          by hand delivery to such Party at its address given below or to such
          other address as shall be specified by the applicable party in the
          future:
        </p>
        <p className="ml-6">
          <strong>to Business Associate:</strong>
          <br />
          Integrity Tissue Solutions, Attn: Privacy Officer
          <br />
          10 Hwy 98 STE 315 PMB#38 Bonaire, GA 31005
        </p>
        <p className="ml-6">
          <strong>to Covered Entity:</strong>
          <br />
          <Input
            value={coveredEntityValue}
            onChange={(e) => onCoveredEntityChange(e.target.value)}
            className="w-full max-w-md bg-blue-50 border-blue-300 mt-1"
            placeholder="Enter Covered Entity address"
          />
        </p>
        <p>
          <strong>10.6</strong> Entire Agreement. This Agreement constitutes the
          entire understanding among the parties with respect to this subject
          matter.
        </p>
        <p>
          <strong>10.7</strong> Interpretation. Any ambiguity in this Agreement
          shall be resolved to permit Covered Entity to comply with the HIPAA
          Regulations.
        </p>
        <p>
          <strong>10.8</strong> Choice of Law and Venue. This Agreement shall be
          governed by the laws of the State of Georgia, without regard to any
          statute or case law on choice of laws. Venue for any legal action
          brought under this Agreement shall be brought exclusively in the
          United States District Court for the Middle District of Georgia.
        </p>
        <p className="mt-6 font-semibold">
          WITNESS WHEREOF, each of the parties has caused this Agreement to be
          executed in its name and on its behalf:
        </p>

        {/* Signature Section - shadcn Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex flex-col md:grid md:grid-cols-2 gap-8">
              <div className="space-y-4 mb-8 md:mb-0 p-2 md:p-0 bg-white rounded-md">
                <p className="font-semibold mb-4">Covered Entity:</p>
                <FormField
                  control={form.control}
                  name="coveredEntity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization/Clinic Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-blue-50 border-blue-300"
                          placeholder="Enter covered entity name"
                        />
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
                        <Input
                          {...field}
                          className="w-full bg-blue-50 border-blue-300"
                          placeholder="Enter name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coveredEntitySignature"
                  render={() => (
                    <FormItem>
                      <FormLabel>Signature</FormLabel>
                      <FormControl>
                        <div className="w-full">
                          <div
                            ref={canvasContainerRef}
                            className="w-full h-25 bg-blue-50 border border-blue-300 rounded-md flex items-center justify-center mb-2 overflow-hidden"
                          >
                            <SignatureCanvas
                              ref={coveredEntitySigPad}
                              penColor="black"
                              canvasProps={{
                                width: canvasWidth,
                                height: 96,
                                className:
                                  "outline-none bg-transparent max-w-full",
                              }}
                              onEnd={() => {
                                const dataUrl =
                                  coveredEntitySigPad.current
                                    ?.getTrimmedCanvas()
                                    .toDataURL("image/png") || "";
                                form.setValue(
                                  "coveredEntitySignature",
                                  dataUrl,
                                  { shouldValidate: true }
                                );
                              }}
                            />
                          </div>
                          <button
                            type="button"
                            className="text-xs text-blue-600 underline mb-2"
                            onClick={() => {
                              coveredEntitySigPad.current?.clear();
                              form.setValue("coveredEntitySignature", "", {
                                shouldValidate: true,
                              });
                            }}
                          >
                            Clear
                          </button>
                        </div>
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
                        <Input
                          {...field}
                          className="w-full bg-blue-50 border-blue-300"
                          placeholder="Enter title"
                        />
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
                        <Input
                          type="date"
                          {...field}
                          className="w-full bg-blue-50 border-blue-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4 p-2 md:p-0 bg-white rounded-md">
                <p className="font-semibold mb-4">
                  Integrity Tissue Solutions:
                </p>
                <FormField
                  control={form.control}
                  name="businessAssociateName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>By</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled
                          className="w-full bg-gray-100"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessAssociateSignature"
                  render={() => (
                    <FormItem>
                      <FormLabel>Signature</FormLabel>
                      <FormControl>
                        <div className="w-full">
                          <div className="w-full h-25 bg-blue-50 border border-blue-300 rounded-md flex items-center justify-center mb-2 overflow-hidden">
                            <SignatureCanvas
                              ref={integritySolutionsSigPad}
                              penColor="black"
                              canvasProps={{
                                width: canvasWidth,
                                height: 96,
                                className:
                                  "outline-none bg-transparent max-w-full",
                              }}
                              onEnd={() => {
                                const dataUrl =
                                  integritySolutionsSigPad.current
                                    ?.getTrimmedCanvas()
                                    .toDataURL("image/png") || "";
                                form.setValue(
                                  "businessAssociateSignature",
                                  dataUrl,
                                  { shouldValidate: true }
                                );
                              }}
                            />
                          </div>
                          <button
                            type="button"
                            className="text-xs text-blue-600 underline mb-2"
                            onClick={() => {
                              integritySolutionsSigPad.current?.clear();
                              form.setValue("businessAssociateSignature", "", {
                                shouldValidate: true,
                              });
                            }}
                          >
                            Clear
                          </button>
                        </div>
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
                        <Input
                          {...field}
                          className="w-full bg-blue-50 border-blue-300"
                          placeholder="Enter title"
                        />
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
                        <Input
                          type="date"
                          {...field}
                          className="w-full bg-blue-50 border-blue-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-6 flex gap-4 col-span-2">
                <Button
                  type="button"
                  onClick={onBack}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-base py-3 rounded-lg"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gray-300 hover:bg-gray-400 hover:text-white text-gray-800 text-base py-3 rounded-lg"
                >
                  Agree and Continue
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
