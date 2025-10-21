// src/components/forms/form-sections/PricingPlan.tsx
"use client";

import { Control, FieldErrors, UseFormWatch } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Typography,
  Box,
  Alert,
  FormGroup,
  Checkbox,
  FormHelperText,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { IClientForm } from "@/types/client";
import pricingData from "@/data/pricingPlans.json";

interface PricingPlanProps {
  control: Control<IClientForm>;
  errors: FieldErrors<IClientForm>;
  watch: UseFormWatch<IClientForm>;
}

const workContracts = [
  "I have own Wolt/Foodora ID",
  "I am a substitute of Wolt/Foodora",
  "My Wolt/Foodora ID is temporary",
  "I am looking for a food delivery ID",
  "I have a Taxi business",
  "I am a Taxi driver",
  "Other",
];

export default function PricingPlan({
  control,
  errors,
  watch,
}: PricingPlanProps) {
  const watchTerms = watch("agree_with.terms_conditions");
  const selectedWorkContracts = watch("work_contracts") || [];
  const showOtherInput = selectedWorkContracts.includes("Other");

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 3, color: "primary.main" }}
      >
        Select Your Pricing Plan & Agreement
      </Typography>

      {/* Work Contracts Status */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          What is your Work Contracts status right now?
        </Typography>

        <FormControl
          component="fieldset"
          error={!!errors.work_contracts}
          fullWidth
        >
          <FormGroup>
            {workContracts.map((contract) => (
              <FormControlLabel
                key={contract}
                control={
                  <Checkbox
                    {...control.register("work_contracts")}
                    value={contract}
                  />
                }
                label={contract}
                sx={{
                  mb: 1,
                  p: 1,
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              />
            ))}
          </FormGroup>
          {errors.work_contracts && (
            <FormHelperText error>
              {errors.work_contracts.message}
            </FormHelperText>
          )}
        </FormControl>

        {/* Other Work Contract Input */}
        {showOtherInput && (
          <Box sx={{ mt: 2 }}>
            <TextField
              {...control.register("work_contracts_other")}
              label="Please specify other work contract"
              fullWidth
              variant="filled"
              placeholder="Describe your work contract situation..."
              helperText="Tell us about your specific work contract or employment situation"
            />
          </Box>
        )}
      </Box>

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

          <RadioGroup
            {...control.register("pricing_plan")}
            aria-label="pricing-plan"
          >
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
              {pricingData.pricingPlans.map((plan) => (
                <Box
                  key={plan.value}
                  sx={{
                    p: 2,
                    border: "1.5px solid",
                    borderColor: plan.popular ? "primary.main" : "grey.200",
                    borderRadius: 1.5,
                    backgroundColor: plan.popular
                      ? "primary.50"
                      : "transparent",
                    transition: "all 0.15s ease",
                    "&:hover": {
                      borderColor: "primary.main",
                      backgroundColor: plan.popular ? "primary.100" : "grey.50",
                    },
                  }}
                >
                  <FormControlLabel
                    value={plan.value}
                    control={<Radio size="small" />}
                    label={
                      <Box
                        sx={{
                          ml: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          minHeight: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center", // Changed from flex-start to center
                            gap: 1,
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            fontWeight="600"
                            sx={{ lineHeight: 1.2 }}
                          >
                            {plan.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="primary"
                            fontWeight="bold"
                          >
                            {plan.price}
                          </Typography>
                        </Box>
                        {plan.popular && (
                          <Typography
                            variant="caption"
                            color="primary"
                            sx={{
                              fontWeight: "bold",
                              display: "inline-block",
                              mt: 0.5,
                            }}
                          >
                            ★ Popular
                          </Typography>
                        )}
                      </Box>
                    }
                    sx={{
                      width: "100%",
                      m: 0,
                      alignItems: "center", // This is key - changed from flex-start to center
                    }}
                  />
                </Box>
              ))}
            </Box>
          </RadioGroup>

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
            <FormControlLabel
              control={
                <Checkbox
                  {...control.register("agree_with.terms_conditions.i_agree")}
                />
              }
              label={
                <Typography variant="body1">
                  I have read, understood, and agree to the Terms & Conditions
                  and Privacy Policy *
                </Typography>
              }
            />
            {errors.agree_with?.terms_conditions?.i_agree && (
              <FormHelperText error>
                {errors.agree_with.terms_conditions.i_agree.message}
              </FormHelperText>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  {...control.register("agree_with.terms_conditions.confirm")}
                />
              }
              label={
                <Typography variant="body1">
                  I confirm that all information provided is accurate and
                  complete to the best of my knowledge *
                </Typography>
              }
              sx={{ mt: 1 }}
            />
            {errors.agree_with?.terms_conditions?.confirm && (
              <FormHelperText error>
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
          Starting soon, Financial Statements will have the following charges:
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
          label="Digital Signature"
          fullWidth
          required
          variant="filled"
          placeholder="Type your full name as digital signature"
          helperText="By typing your name, you digitally sign this application"
          error={!!errors.digital_sign}
        />
        {errors.digital_sign && (
          <FormHelperText error>{errors.digital_sign.message}</FormHelperText>
        )}
      </Box>
    </Box>
  );
}
