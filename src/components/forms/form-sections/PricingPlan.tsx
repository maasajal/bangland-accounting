// src/components/forms/form-sections/PricingPlan.tsx
"use client";

import { FieldErrors, UseFormWatch } from "react-hook-form";
import {
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  Card,
  CardContent,
  Alert,
  FormGroup,
  Checkbox,
  FormHelperText,
  TextField,
} from "@mui/material";
import { IClientForm } from "@/types/client";
import AgreementSection from "@/components/sections/AgreementSection";

interface PricingPlanProps {
  control: any;
  errors: FieldErrors<IClientForm>;
  watch: UseFormWatch<IClientForm>;
}

const pricingPlans = [
  {
    value: "light_startup_yearly",
    label: "Most wanted Light & Startup Entrepreneur",
    price: "€30/month",
    description: "Yearly subscription (Best value)",
    popular: true,
  },
  {
    value: "light_startup_monthly",
    label: "Light & Startup Entrepreneur",
    price: "€39/month",
    description: "Monthly subscription",
  },
  {
    value: "taxi_driver",
    label: "For Taxi driver",
    price: "€49/month",
    description: "Fixed monthly price",
  },
  {
    value: "pro_light",
    label: "Pro Light Entrepreneur",
    price: "0.99% of gross salary",
    description: "Food delivery only",
  },
  {
    value: "light_basic",
    label: "Light Entrepreneur Basic",
    price: "3.99% of gross salary",
    description: "6-month commitment required",
  },
  {
    value: "llc_under_100k",
    label: "Limited Liability Company (Up to €100K Turnover)",
    price: "€49-99/month",
    description: "Depending on company status and sales turnover",
  },
  {
    value: "llc_over_100k",
    label: "Limited Liability Company (Over €100K Turnover)",
    price: "€99-199/month",
    description: "Depending on company status and sales turnover",
  },
];

export default function PricingPlan({
  control,
  errors,
  watch,
}: PricingPlanProps) {
  const watchTerms = watch("agree_with.terms_conditions");

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 3, color: "primary.main" }}
      >
        Select Your Pricing Plan & Agreement
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        💰 All plans include extra deductible VAT of 25.50%
      </Alert>

      {/* Pricing Plans */}
      <FormControl
        component="fieldset"
        error={!!errors.pricing_plan}
        fullWidth
        sx={{ mb: 4 }}
      >
        <FormLabel
          component="legend"
          sx={{ mb: 2, fontWeight: "bold", fontSize: "1.1rem" }}
        >
          Choose your preferred pricing plan
        </FormLabel>

        <RadioGroup
          {...control.register("pricing_plan")}
          aria-label="pricing-plan"
        >
          <Grid container spacing={2}>
            {pricingPlans.map((plan) => (
              <Grid item xs={12} key={plan.value}>
                <Card
                  variant="outlined"
                  sx={{
                    border: "2px solid",
                    borderColor: plan.popular ? "primary.main" : "divider",
                    backgroundColor: plan.popular
                      ? "primary.50"
                      : "background.paper",
                    transition: "all 0.2s",
                    "&:hover": {
                      borderColor: "primary.main",
                      backgroundColor: "primary.50",
                    },
                  }}
                >
                  <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    <FormControlLabel
                      value={plan.value}
                      control={<Radio />}
                      label={
                        <Box sx={{ ml: 1 }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {plan.label}
                            {plan.popular && (
                              <Typography
                                component="span"
                                variant="caption"
                                color="primary"
                                sx={{ ml: 1, fontWeight: "bold" }}
                              >
                                🏆 MOST POPULAR
                              </Typography>
                            )}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="primary"
                            fontWeight="medium"
                          >
                            {plan.price}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {plan.description}
                          </Typography>
                        </Box>
                      }
                      sx={{ width: "100%", m: 0 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </RadioGroup>

        {errors.pricing_plan && (
          <FormHelperText error>{errors.pricing_plan.message}</FormHelperText>
        )}
      </FormControl>

      {/* Terms and Conditions Agreement */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          Agreement & Consent
        </Typography>

        <Card variant="outlined" sx={{ p: 3 }}>
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
                  and Privacy Policy
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
        </Card>
      </Box>

      {/* Policy Update Notice */}
      <Alert severity="warning" sx={{ mb: 3 }}>
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          Important Update
        </Typography>
        <Typography variant="body2">
          Financial Statements are about to charge.
        </Typography>
        <Box component="ul" sx={{ pl: 2, mt: 1 }}>
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
          placeholder="Type your full name as digital signature"
          helperText="By typing your name, you digitally sign this application"
        />
      </Box>
    </Box>
  );
}
