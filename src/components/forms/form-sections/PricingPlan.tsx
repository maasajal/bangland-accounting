// src/components/forms/form-sections/PricingPlan.tsx
"use client";

import {
  Control,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Typography,
  Box,
  Alert,
  FormGroup,
  Radio,
  Checkbox,
  FormHelperText,
  TextField,
  FormControlLabel,
  Button,
} from "@mui/material";
import { IClientForm } from "@/types/client";
import pricingPlansData from "@/data/pricingPlans.json";

interface PricingPlanProps {
  control: Control<IClientForm>;
  errors: FieldErrors<IClientForm>;
  watch: UseFormWatch<IClientForm>;
  setValue: UseFormSetValue<IClientForm>;
  onOpenTerms: () => void;
}

export default function PricingPlan({
  control,
  errors,
  watch,
  setValue,
  onOpenTerms,
}: PricingPlanProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const digitalSignatureRef = useRef<HTMLInputElement>(null);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // Handle plan selection
  const handlePlanSelect = (planValue: string) => {
    setSelectedPlan(planValue);

    // Find the selected plan to get the price + period
    const selectedPlanData = pricingPlansData.pricingPlans.find(
      (plan) => plan.value === planValue
    );
    if (selectedPlanData) {
      // Store price + period as the pricing plan value
      const pricingPlanValue = `${selectedPlanData.price}${selectedPlanData.period}`;
      setValue("pricing_plan", pricingPlanValue);
    }
  };

  // Handle checkbox change for terms
  const handleTermsCheckboxClick = () => {
    const currentValue = watch("agree_with.terms_conditions.i_agree");
    setValue("agree_with.terms_conditions.i_agree", !currentValue);
  };

  // Handle checkbox change for confirmation
  const handleConfirmCheckboxClick = () => {
    const currentValue = watch("agree_with.terms_conditions.confirm");
    setValue("agree_with.terms_conditions.confirm", !currentValue);
  };

  // Handle terms text click
  const handleTermsTextClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    handleTermsCheckboxClick();
  };

  // Handle confirm text click
  const handleConfirmTextClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    handleConfirmCheckboxClick();
  };

  // Handle terms button click
  const handleTermsButtonClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onOpenTerms();
  };

  // Prevent auto-focus issues
  useEffect(() => {
    if (isInitialRender && digitalSignatureRef.current) {
      digitalSignatureRef.current.blur();
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      setIsInitialRender(false);
    }
  }, [isInitialRender]);

  const handleContainerClick = (event: React.MouseEvent) => {
    if (
      (event.target as HTMLElement).tagName !== "INPUT" &&
      (event.target as HTMLElement).tagName !== "TEXTAREA" &&
      (event.target as HTMLElement).tagName !== "BUTTON" &&
      !(event.target as HTMLElement).closest("input, textarea, button")
    ) {
      event.preventDefault();
    }
  };

  return (
    <Box onClick={handleContainerClick}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 3, color: "primary.main" }}
      >
        Select Your Pricing Plan & Agreement
      </Typography>

      {/* Pricing Plans */}
      <Box sx={{ mb: 4 }}>
        <FormLabel
          component="legend"
          sx={{
            mb: 2,
            fontWeight: "bold",
            fontSize: "1.1rem",
            display: "block",
          }}
        >
          Choose your preferred pricing plan *
        </FormLabel>

        <Alert severity="info" sx={{ mb: 3 }}>
          💰 All plans include extra deductible VAT of 25.50%
        </Alert>

        <FormControl
          component="fieldset"
          error={!!errors.pricing_plan}
          fullWidth
          sx={{ mb: 3 }}
        >
          <FormLabel
            component="legend"
            sx={{ mb: 2, fontWeight: "bold", fontSize: "1rem" }}
          >
            Select Pricing Plan *
          </FormLabel>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 1.5,
            }}
          >
            {pricingPlansData.pricingPlans.map((plan) => (
              <Box
                key={plan.value}
                sx={{
                  p: 2,
                  border: "2px solid",
                  borderColor:
                    selectedPlan === plan.value ? "primary.main" : "grey.300",
                  borderRadius: 1.5,
                  backgroundColor:
                    selectedPlan === plan.value ? "primary.50" : "transparent",
                  transition: "all 0.15s ease",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor:
                      selectedPlan === plan.value ? "primary.100" : "grey.50",
                  },
                }}
                onClick={() => handlePlanSelect(plan.value)}
              >
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedPlan === plan.value}
                      onChange={() => handlePlanSelect(plan.value)}
                      onClick={(e) => e.stopPropagation()}
                      size="small"
                    />
                  }
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1,
                        width: "100%",
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="subtitle2"
                          fontWeight="600"
                          sx={{ lineHeight: 1.2 }}
                        >
                          {plan.name}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography
                          variant="body2"
                          color="primary"
                          fontWeight="bold"
                        >
                          {plan.price}
                        </Typography>
                      </Box>
                    </Box>
                  }
                  sx={{
                    width: "100%",
                    m: 0,
                    alignItems: "center",
                  }}
                />
              </Box>
            ))}
          </Box>

          {errors.pricing_plan && (
            <FormHelperText error sx={{ mt: 1 }}>
              {errors.pricing_plan.message}
            </FormHelperText>
          )}
        </FormControl>
      </Box>

      {/* Terms and Conditions Agreement */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          Agreement & Consent
        </Typography>

        <Box
          sx={{
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            backgroundColor: "background.default",
          }}
        >
          <FormGroup>
            {/* First Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  {...control.register("agree_with.terms_conditions.i_agree")}
                />
              }
              label={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    cursor: "pointer",
                  }}
                  onClick={handleTermsTextClick}
                >
                  <Typography variant="body1" sx={{ lineHeight: 1.4 }}>
                    I have read, understood, and agree to the{" "}
                  </Typography>
                  <Button
                    variant="text"
                    onClick={handleTermsButtonClick}
                    sx={{
                      p: 0,
                      minWidth: "auto",
                      fontSize: "inherit",
                      verticalAlign: "baseline",
                      "&:hover": {
                        backgroundColor: "transparent",
                        textDecoration: "none",
                      },
                    }}
                  >
                    Terms & Conditions and Privacy Policy
                  </Button>
                  <Typography variant="body1" sx={{ lineHeight: 1.4 }}>
                    {" "}
                    *
                  </Typography>
                </Box>
              }
              sx={{
                alignItems: "center",
                m: 0,
                mb: 2,
                width: "100%",
              }}
            />
            {errors.agree_with?.terms_conditions?.i_agree && (
              <FormHelperText error sx={{ mt: 0.5, ml: 0 }}>
                {errors.agree_with.terms_conditions.i_agree.message}
              </FormHelperText>
            )}

            {/* Second Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  {...control.register("agree_with.terms_conditions.confirm")}
                />
              }
              label={
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.4,
                    cursor: "pointer",
                  }}
                  onClick={handleConfirmTextClick}
                >
                  I confirm that all information provided is accurate and
                  complete to the best of my knowledge *
                </Typography>
              }
              sx={{
                alignItems: "center",
                m: 0,
              }}
            />
            {errors.agree_with?.terms_conditions?.confirm && (
              <FormHelperText error sx={{ mt: 0.5, ml: 0 }}>
                {errors.agree_with.terms_conditions.confirm.message}
              </FormHelperText>
            )}
          </FormGroup>
        </Box>
      </Box>

      {/* Policy Update Notice */}
      <Alert severity="warning" sx={{ mb: 3 }}>
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          Important Update: Financial Statements
        </Typography>
        <Typography variant="body2">
          Financial Statements have the following charges:
        </Typography>
        <Box component="ul" sx={{ pl: 2, mt: 1, mb: 0 }}>
          <Typography component="li" variant="body2">
            150€ + VAT – for beginners (new entrepreneurs)
          </Typography>
          <Typography component="li" variant="body2">
            200€ + VAT – for all other clients
          </Typography>
          <Typography component="li" variant="body2">
            Up to 7 working days required for document delivery
          </Typography>
        </Box>
      </Alert>

      {/* Digital Signature */}
      <Box sx={{ mt: 3 }}>
        <TextField
          {...control.register("digital_sign")}
          inputRef={digitalSignatureRef}
          label="Digital Signature"
          fullWidth
          required
          variant="filled"
          placeholder="Type your full name as digital signature"
          helperText="By typing your name, you digitally sign this application"
          error={!!errors.digital_sign}
          onFocus={(e) => {
            if (isInitialRender) {
              e.target.blur();
            }
          }}
          sx={{
            "& .MuiFilledInput-root": {
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              "&.Mui-focused": {
                backgroundColor: "transparent",
              },
            },
          }}
        />
        {errors.digital_sign && (
          <FormHelperText error>{errors.digital_sign.message}</FormHelperText>
        )}
      </Box>
    </Box>
  );
}
