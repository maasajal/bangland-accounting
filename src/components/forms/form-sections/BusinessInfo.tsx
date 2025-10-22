// src/components/forms/form-sections/BusinessInfo.tsx
"use client";

import {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Radio,
  FormLabel,
  FormHelperText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Help, CheckCircle } from "@mui/icons-material";
import { IClientForm } from "@/types/client";

const workContracts = [
  "I have own Wolt/Foodora ID",
  "I am a substitute of Wolt/Foodora",
  "My Wolt/Foodora ID is temporary",
  "I am looking for a food delivery ID",
  "I have a Taxi business",
  "I am a Taxi driver",
  "Other",
];

interface BusinessInfoProps {
  control: Control<IClientForm>;
  errors: FieldErrors<IClientForm>;
  setValue?: UseFormSetValue<IClientForm>;
  watch?: UseFormWatch<IClientForm>;
}

export default function BusinessInfo({
  control,
  errors,
  setValue,
  watch,
}: BusinessInfoProps) {
  const [vatInfoOpen, setVatInfoOpen] = useState(false);
  const [hasBusinessId, setHasBusinessId] = useState<"yes" | "no">("no");
  const [businessIdValue, setBusinessIdValue] = useState("");
  const [vatIdValue, setVatIdValue] = useState("");
  const selectedWorkContracts = watch ? watch("work_contracts") || [] : [];
  const showOtherInput = selectedWorkContracts.includes("Other");

  const handleOpenVatInfo = () => setVatInfoOpen(true);
  const handleCloseVatInfo = () => setVatInfoOpen(false);

  const handleBusinessTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value as "yes" | "no";
    setHasBusinessId(value);
    if (setValue) {
      setValue("business.business_type", value);
    }
  };

  // Function to generate VAT ID from Business ID
  const generateVatId = (businessId: string): string => {
    if (!businessId) return "";

    const cleanBusinessId = businessId.replace(/\D/g, "");
    if (cleanBusinessId.length < 7) return "";

    const baseNumber = cleanBusinessId.slice(0, 7);
    const checksum =
      cleanBusinessId.length >= 8 ? cleanBusinessId.slice(7, 8) : "0";
    return `FI${baseNumber}${checksum}`;
  };

  // Handle Business ID input with formatting and VAT ID generation
  const handleBusinessIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    const digitsOnly = value.replace(/\D/g, "");

    // Format as 1234567-8 when we have enough digits
    if (digitsOnly.length >= 7) {
      value = `${digitsOnly.slice(0, 7)}-${digitsOnly.slice(7, 8)}`;
    } else {
      value = digitsOnly;
    }

    setBusinessIdValue(value);
    const vatId = generateVatId(value);
    setVatIdValue(vatId);

    if (setValue) {
      setValue("business.business_id", value);
      setValue("business.vat_id", vatId);
    }
  };

  // Handle Business ID blur for final formatting
  const handleBusinessIdBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const digitsOnly = value.replace(/\D/g, "");

    if (digitsOnly.length >= 7) {
      const formattedValue = `${digitsOnly.slice(0, 7)}-${digitsOnly.slice(
        7,
        8
      )}`;
      setBusinessIdValue(formattedValue);
      const vatId = generateVatId(formattedValue);
      setVatIdValue(vatId);

      if (setValue) {
        setValue("business.business_id", formattedValue);
        setValue("business.vat_id", vatId);
      }
    }
  };

  const handleCheckboxClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const vatGuides = [
    {
      frequency: "Monthly",
      description: "Submit VAT returns every month",
      bestFor: [
        "Businesses with high turnover (over €100,000/year)",
        "Companies that want regular cash flow",
        "Businesses that frequently claim VAT refunds",
      ],
      deadline: "By the 12th of the following month",
    },
    {
      frequency: "Quarterly",
      description: "Submit VAT returns every 3 months",
      bestFor: [
        "Most small and medium businesses",
        "Businesses with moderate turnover",
        "Light entrepreneurs and startups",
      ],
      deadline: "By the 12th of the month following each quarter",
    },
    {
      frequency: "Yearly",
      description: "Submit VAT returns once per year",
      bestFor: [
        "Very small businesses with low turnover",
        "Businesses under special VAT schemes",
        "Companies with simple financial activities",
      ],
      deadline: "By the 12th of February the following year",
    },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 3, color: "primary.main" }}
        >
          Business Information
        </Typography>

        {/* Business Type Selection */}
        <Box sx={{ mb: 4 }}>
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              sx={{ fontWeight: "bold", mb: 2, fontSize: "1.1rem" }}
            >
              Do you already have a Business ID? *
            </FormLabel>
            <RadioGroup
              value={hasBusinessId}
              onChange={handleBusinessTypeChange}
              sx={{ flexDirection: "row", gap: 3 }}
            >
              <FormControlLabel
                value="no"
                control={<Radio />}
                label="No, I need to register a new Business ID"
              />
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label="Yes, I already have a Business ID"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Show this section only if user has Business ID */}
        {hasBusinessId === "yes" && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
              },
              gap: 3,
              width: "100%",
              mt: 3,
            }}
          >
            {/* Business ID */}
            <Box>
              <TextField
                label="Business ID"
                fullWidth
                required
                variant="filled"
                value={businessIdValue}
                onChange={handleBusinessIdChange}
                onBlur={handleBusinessIdBlur}
                error={!!errors.business?.business_id}
                helperText={
                  errors.business?.business_id?.message ||
                  "Format: 1234567-8 (7 digits + dash + 1 digit)"
                }
                placeholder="1234567-8"
                inputProps={{
                  maxLength: 9,
                }}
              />
              <input
                type="hidden"
                {...control.register("business.business_id")}
                value={businessIdValue}
              />
            </Box>

            {/* Auto-generated VAT ID */}
            <Box>
              <TextField
                label="VAT ID (Auto-generated)"
                fullWidth
                variant="filled"
                value={vatIdValue}
                InputProps={{
                  readOnly: true,
                }}
                placeholder="FI12345678"
                helperText={
                  businessIdValue
                    ? "Automatically generated from your Business ID"
                    : "Enter Business ID to generate VAT ID"
                }
                sx={{
                  "& .MuiInputBase-input": {
                    backgroundColor: "action.hover",
                    cursor: "not-allowed",
                  },
                }}
              />
              <input
                type="hidden"
                {...control.register("business.vat_id")}
                value={vatIdValue}
              />
            </Box>

            {/* Company Name */}
            <Box>
              <TextField
                {...control.register("business.company")}
                label="Company Name"
                fullWidth
                required
                variant="filled"
                error={!!errors.business?.company}
                helperText={errors.business?.company?.message}
                placeholder="Last Name First Name | Your Company Oy"
              />
            </Box>

            {/* Business Start Date */}
            <Box>
              <FormControl fullWidth>
                <DatePicker
                  label="Business Start Date"
                  onChange={(date: Date | null) => {
                    if (date && setValue) {
                      setValue("business.business_start_date", date);
                    }
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      variant: "filled",
                      error: !!errors.business?.business_start_date,
                      helperText: errors.business?.business_start_date?.message,
                    },
                  }}
                />
                <input
                  type="hidden"
                  {...control.register("business.business_start_date")}
                />
              </FormControl>
            </Box>

            {/* Business Description - Full width */}
            <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }}>
              <TextField
                {...control.register("business.business_desc")}
                label="Business Description"
                fullWidth
                variant="filled"
                multiline
                rows={3}
                error={!!errors.business?.business_desc}
                helperText={errors.business?.business_desc?.message}
                placeholder="Describe your business activities, products, services, target market, and any other relevant information..."
              />
            </Box>
          </Box>
        )}

        {/* VAT Return Frequency Section */}
        <Box sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <FormLabel
              component="legend"
              sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
            >
              VAT Return Frequency *
            </FormLabel>
            <IconButton
              size="small"
              onClick={handleOpenVatInfo}
              sx={{ color: "primary.main" }}
            >
              <Help />
            </IconButton>
          </Box>

          <FormControl
            fullWidth
            required
            error={!!errors.business?.vat_return_activities}
          >
            <InputLabel>Select VAT Return Frequency</InputLabel>
            <Select
              {...control.register("business.vat_return_activities")}
              label="Select VAT Return Frequency"
              defaultValue="quarterly"
              variant="filled"
            >
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="quarterly">
                Quarterly (Recommended for most businesses)
              </MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
            {errors.business?.vat_return_activities && (
              <FormHelperText error>
                {errors.business.vat_return_activities.message}
              </FormHelperText>
            )}
          </FormControl>
        </Box>

        {/* Hidden field to store business_type in form data */}
        <input
          type="hidden"
          {...control.register("business.business_type")}
          value={hasBusinessId}
        />

        <Divider sx={{ my: 4 }} />

        {/* Work Contracts Status */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Work Contracts Status
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Select all that apply to your current situation
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
                      onClick={handleCheckboxClick}
                    />
                  }
                  label={contract}
                  sx={{
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
                required
                variant="filled"
                placeholder="Describe your work contract situation..."
                helperText="Tell us about your specific work contract or employment situation"
                error={!!errors.work_contracts_other}
              />
              {errors.work_contracts_other && (
                <FormHelperText error>
                  {errors.work_contracts_other.message}
                </FormHelperText>
              )}
            </Box>
          )}
        </Box>

        {/* VAT Information Modal */}
        <Dialog
          open={vatInfoOpen}
          onClose={handleCloseVatInfo}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "primary.main",
              color: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                sx={{ fontWeight: "bold" }}
              >
                VAT Return Frequency Guide
              </Typography>
              <Button
                onClick={handleCloseVatInfo}
                sx={{ color: "white", minWidth: "auto" }}
              >
                ✕
              </Button>
            </Box>
          </DialogTitle>

          <DialogContent sx={{ p: 4 }}>
            <Typography variant="body1" paragraph>
              Choose how often you will submit VAT returns to the Finnish Tax
              Administration. This affects your cash flow and administrative
              work.
            </Typography>

            {vatGuides.map((guide, index) => (
              <Box
                key={index}
                sx={{
                  mb: 4,
                  p: 3,
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" gutterBottom color="primary.main">
                  {guide.frequency} VAT Returns
                </Typography>
                <Typography variant="body2" paragraph>
                  {guide.description}
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Best for:
                </Typography>
                <List dense>
                  {guide.bestFor.map((item, itemIndex) => (
                    <ListItem key={itemIndex} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircle color="primary" sx={{ fontSize: 16 }} />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>

                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  <strong>Submission Deadline:</strong> {guide.deadline}
                </Typography>
              </Box>
            ))}

            <Box sx={{ p: 2, backgroundColor: "info.50", borderRadius: 1 }}>
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                💡 <strong>Recommendation:</strong> Most small businesses choose
                Quarterly VAT returns as it balances administrative work with
                cash flow management.
              </Typography>
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 3, borderTop: 1, borderColor: "divider" }}>
            <Button
              onClick={handleCloseVatInfo}
              variant="contained"
              color="primary"
            >
              I Understand
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
}
