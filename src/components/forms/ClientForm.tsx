// src/components/forms/ClientForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Alert,
} from "@mui/material";
import PersonalInfo from "./form-sections/PersonalInfo";
import BusinessInfo from "./form-sections/BusinessInfo";
import AddressInfo from "./form-sections/AddressInfo";
import BankInfo from "./form-sections/BankInfo";
import PricingPlan from "./form-sections/PricingPlan";
import { IClientForm } from "@/types/client";

interface ClientFormProps {
  onSuccess: () => void;
}

const steps = [
  "Personal Information",
  "Business Information",
  "Address Details",
  "Bank Information",
  "Pricing Plan",
];

const schema = yup.object().shape({
  personal: yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    ssn: yup.string().required("SSN is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    finn_ph_num: yup.string().required("Finnish phone number is required"),
    whatsapp_num: yup.string(),
    about_client: yup.string(),
  }),
  business: yup.object().shape({
    business_id: yup.string(),
    vat_id: yup.string(),
    company: yup.string().required("Company name is required"),
    business_desc: yup.string(),
    vat_return_activities: yup
      .string()
      .required("VAT return frequency is required"),
    business_start_date: yup.date().required("Business start date is required"),
  }),
  address: yup.object().shape({
    full_address: yup.string().required("Full address is required"),
  }),
  bank: yup.object().shape({
    bank_name: yup.string().required("Bank name is required"),
    bank_account_no: yup.string().required("Bank account number is required"),
    bic: yup.string().required("BIC/SWIFT code is required"),
  }),
  pricing_plan: yup.string().required("Please select a pricing plan"),
  agree_with: yup.object().shape({
    terms_conditions: yup.object().shape({
      i_agree: yup
        .boolean()
        .oneOf([true], "You must agree to the terms and conditions"),
      confirm: yup.boolean().oneOf([true], "You must confirm the agreement"),
    }),
  }),
});

export default function ClientForm({ onSuccess }: ClientFormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm<IClientForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      status: "pending",
      client_of: "maas",
      join_date: new Date(),
      personal: {
        first_name: "",
        last_name: "",
        ssn: "",
        email: "",
        finn_ph_num: "",
        whatsapp_num: "",
        about_client: "",
      },
      business: {
        business_id: "",
        vat_id: "",
        company: "",
        business_desc: "",
        vat_return_activities: "quarterly",
        business_start_date: new Date(),
      },
      address: {
        full_address: "",
      },
      bank: {
        bank_name: "",
        bank_account_no: "",
        bic: "",
      },
      pricing_plan: "",
      work_contracts: [],
      agree_with: {
        new_businesses: "",
        pricing_plan_selection: "",
        service_start_date: "",
        comment: "",
        discount: "",
        terms_conditions: {
          i_agree: false,
          confirm: false,
        },
      },
      digital_sign: "",
    },
  });

  const handleNext = async () => {
    let fields: string[] = [];

    switch (activeStep) {
      case 0:
        fields = [
          "personal.first_name",
          "personal.last_name",
          "personal.ssn",
          "personal.email",
          "personal.finn_ph_num",
        ];
        break;
      case 1:
        fields = [
          "business.company",
          "business.vat_return_activities",
          "business.business_start_date",
        ];
        break;
      case 2:
        fields = ["address.full_address"];
        break;
      case 3:
        fields = ["bank.bank_name", "bank.bank_account_no", "bank.bic"];
        break;
      case 4:
        fields = [
          "pricing_plan",
          "agree_with.terms_conditions.i_agree",
          "agree_with.terms_conditions.confirm",
        ];
        break;
    }

    const isValid = await trigger(fields as any);
    if (isValid) {
      setActiveStep((prev) => prev + 1);
      setSubmitError("");
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setSubmitError("");
  };

  const onSubmit = async (data: IClientForm) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Use your existing API endpoint
      const response = await fetch(
        "https://hisab-nikas.vercel.app/clientapi/maas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            // Ensure the data structure matches what your API expects
            join_date: new Date().toISOString(),
            status: "pending",
            client_of: "maas",
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        onSuccess();
      } else {
        setSubmitError(
          result.message ||
            result.error ||
            "Failed to submit form. Please try again."
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <PersonalInfo control={control} errors={errors} />;
      case 1:
        return <BusinessInfo control={control} errors={errors} />;
      case 2:
        return <AddressInfo control={control} errors={errors} />;
      case 3:
        return <BankInfo control={control} errors={errors} />;
      case 4:
        return <PricingPlan control={control} errors={errors} watch={watch} />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          Client Enrollment Form
        </Typography>

        <Box sx={{ mb: 4 }}>
          {/* Mobile Progress Indicator */}
          <Box sx={{ display: { xs: "block", md: "none" }, mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Step {activeStep + 1} of {steps.length}
              </Typography>
              <Typography
                variant="body2"
                fontWeight="medium"
                color="primary.main"
              >
                {steps[activeStep]}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: 6,
                backgroundColor: "grey.200",
                borderRadius: 3,
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  backgroundColor: "primary.main",
                  borderRadius: 3,
                  width: `${((activeStep + 1) / steps.length) * 100}%`,
                  transition: "width 0.3s ease-in-out",
                }}
              />
            </Box>
          </Box>

          {/* Desktop Stepper */}
          <Stepper
            activeStep={activeStep}
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontSize: "0.875rem",
                      fontWeight: 600,
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {submitError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {submitError}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {getStepContent(activeStep)}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              disabled={activeStep === 0 || isSubmitting}
              onClick={handleBack}
              variant="outlined"
              size="large"
            >
              Back
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            ) : (
              <Button onClick={handleNext} variant="contained" size="large">
                Next
              </Button>
            )}
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}
