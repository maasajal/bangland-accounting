// src/components/forms/form-sections/BusinessInfo.tsx
"use client";

import { Control, FieldErrors } from "react-hook-form";
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
  FormControlLabel,
  Radio,
  FormLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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

interface BusinessInfoProps {
  control: Control<IClientForm>;
  errors: FieldErrors<IClientForm>;
  setValue: unknown; // To set the VAT ID value programmatically
}

export default function BusinessInfo({
  control,
  errors,
  setValue,
}: BusinessInfoProps) {
  const [vatInfoOpen, setVatInfoOpen] = useState(false);
  const [hasBusinessId, setHasBusinessId] = useState<"yes" | "no">("no");
  const [businessIdValue, setBusinessIdValue] = useState("");
  const [displayVatId, setDisplayVatId] = useState("");

  const handleOpenVatInfo = () => setVatInfoOpen(true);
  const handleCloseVatInfo = () => setVatInfoOpen(false);

  const handleBusinessTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHasBusinessId(event.target.value as "yes" | "no");
  };

  // Function to generate VAT ID from Business ID
  const generateVatId = (businessId: string) => {
    if (!businessId) return "";

    // Remove all non-digit characters (dashes, spaces, etc.)
    const cleanBusinessId = businessId.replace(/\D/g, "");

    if (cleanBusinessId.length < 7) return "";

    // Format as FI + 8 digits (Finnish VAT ID format)
    return `FI${cleanBusinessId}`;
  };

  // Handle Business ID input change
  const handleBusinessIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setBusinessIdValue(value);

    // Auto-generate VAT ID
    const vatId = generateVatId(value);
    if (vatId) {
      setValue("business.vat_id", vatId);
    }
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
                {...control.register("business.business_id")}
                label="Business ID"
                fullWidth
                required
                variant="filled"
                error={!!errors.business?.business_id}
                helperText={errors.business?.business_id?.message}
                placeholder="1234567-8"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const value = event.target.value;
                  setBusinessIdValue(value);

                  // Auto-generate VAT ID in real-time
                  const cleanBusinessId = value.replace(/\D/g, "");
                  if (cleanBusinessId.length >= 7) {
                    const vatId = `FI${cleanBusinessId}`;
                    setValue("business.vat_id", vatId);
                    setDisplayVatId(vatId);
                  } else {
                    // Clear VAT ID if Business ID is too short
                    setValue("business.vat_id", "");
                    setDisplayVatId("");
                  }
                }}
                onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                  const value = event.target.value;
                  // Format Business ID with dash when user leaves the field
                  const cleanBusinessId = value.replace(/\D/g, "");
                  if (cleanBusinessId.length >= 7) {
                    const formattedBusinessId = `${cleanBusinessId.slice(
                      0,
                      7
                    )}-${cleanBusinessId.slice(7, 8)}`;
                    setValue("business.business_id", formattedBusinessId);
                    setBusinessIdValue(formattedBusinessId);

                    // Ensure VAT ID is set with the final formatted value
                    const vatId = `FI${cleanBusinessId}`;
                    setValue("business.vat_id", vatId);
                    setDisplayVatId(vatId);
                  }
                }}
                inputProps={{
                  maxLength: 9,
                  pattern: "[0-9]{7}-[0-9]{1}",
                  title: "Format: 1234567-8",
                }}
              />
            </Box>

            {/* Auto-generated VAT ID - Display only */}
            <Box>
              <TextField
                {...control.register("business.vat_id")}
                label="VAT ID (Auto-generated)"
                fullWidth
                variant="filled"
                value={displayVatId}
                InputProps={{
                  readOnly: true,
                }}
                placeholder="FI12345678"
                helperText={
                  displayVatId
                    ? "Automatically generated from your Business ID"
                    : "Enter Business ID to generate VAT ID"
                }
                sx={{
                  "& .MuiInputBase-input": {
                    backgroundColor: "grey.100",
                    color: "text.secondary",
                  },
                }}
              />
              <input
                type="hidden"
                {...control.register("business.vat_id")}
                value={displayVatId}
              />
            </Box>

            {/* Company Name - Full width */}
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
                  {...control.register("business.business_start_date")}
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

        {/* VAT Return Frequency Section - Show for both options */}
        <Box sx={{ mt: 4 }}>
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
          </FormControl>
          {errors.business?.vat_return_activities && (
            <Typography
              variant="caption"
              color="error"
              sx={{ display: "block", mt: 0.5 }}
            >
              {errors.business.vat_return_activities.message}
            </Typography>
          )}
        </Box>

        {/* Hidden field to store business_type in form data */}
        <input
          type="hidden"
          {...control.register("business.business_type")}
          value={hasBusinessId}
        />

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
