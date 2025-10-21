// src/components/forms/form-sections/BankInfo.tsx
"use client";
import {
  Control,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { useState } from "react";
import {
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { IClientForm } from "@/types/client";

interface BankInfoProps {
  control: Control<IClientForm>;
  errors: FieldErrors<IClientForm>;
  watch: UseFormWatch<IClientForm>;
  setValue: UseFormSetValue<IClientForm>;
}

// Common Finnish banks with their BIC codes
const finnishBanks = [
  { name: "S-Pankki", bic: "SBANFIHH" },
  { name: "Nordea", bic: "NDEAFIHH" },
  { name: "OP Financial Group", bic: "OKOYFIHH" },
  { name: "Danske Bank", bic: "DABAFIHH" },
  { name: "Aktia Bank", bic: "HELSFIHH" },
  { name: "Ålandsbanken", bic: "AABAFI22" },
  { name: "Handelsbanken", bic: "HANDFIHH" },
  { name: "POP Bank", bic: "POPFFI22" },
  { name: "Saastopankki", bic: "ITELFIHH" },
  { name: "Oma Säästöpankki", bic: "OMASFIHH" },
  { name: "Other Bank", bic: "" }, // Custom input option
];

export default function BankInfo({
  control,
  errors,
  watch,
  setValue,
}: BankInfoProps) {
  const [customBank, setCustomBank] = useState("");
  const [customBic, setCustomBic] = useState("");

  const selectedBank = watch("bank.bank_name");
  const selectedBic = watch("bank.bic");

  const handleBankChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const bankName = event.target.value as string;
    setValue("bank.bank_name", bankName);

    // Auto-fill BIC code for predefined banks
    if (bankName !== "Other Bank") {
      const bank = finnishBanks.find((b) => b.name === bankName);
      if (bank && bank.bic) {
        setValue("bank.bic", bank.bic);
      }
    } else {
      // Clear BIC for custom bank and reset custom fields
      setValue("bank.bic", "");
      setCustomBank("");
      setCustomBic("");
    }
  };

  const handleCustomBankChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCustomBank(value);
    setValue("bank.bank_name", value);
  };

  const handleCustomBicChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value.toUpperCase(); // Convert to uppercase for BIC
    setCustomBic(value);
    setValue("bank.bic", value);
  };

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 3, color: "primary.main" }}
      >
        Bank Information
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          width: "100%",
        }}
      >
        {/* Bank Selection */}
        <Box>
          <FormControl
            fullWidth
            error={!!errors.bank?.bank_name}
            variant="filled"
          >
            <InputLabel>Select Your Bank *</InputLabel>
            <Select
              {...control.register("bank.bank_name")}
              label="Select Your Bank"
              value={selectedBank || ""}
              onChange={handleBankChange}
            >
              <MenuItem value="">
                <em>Select your bank</em>
              </MenuItem>
              {finnishBanks.map((bank) => (
                <MenuItem key={bank.name} value={bank.name}>
                  {bank.name}
                </MenuItem>
              ))}
            </Select>
            {errors.bank?.bank_name && (
              <FormHelperText error>
                {errors.bank.bank_name.message}
              </FormHelperText>
            )}
          </FormControl>
        </Box>

        {/* Custom Bank Name Input - Only show when "Other Bank" is selected */}
        {selectedBank === "Other Bank" && (
          <>
            <Box>
              <TextField
                label="Bank Name *"
                fullWidth
                variant="filled"
                value={customBank}
                onChange={handleCustomBankChange}
                error={!!errors.bank?.bank_name && customBank === ""}
                helperText={
                  errors.bank?.bank_name?.message ||
                  "Enter the full name of your bank"
                }
                placeholder="e.g., Your Bank Name"
              />
            </Box>

            {/* Custom BIC Input for Other Bank */}
            <Box>
              <TextField
                label="BIC/SWIFT Code *"
                fullWidth
                variant="filled"
                value={customBic}
                onChange={handleCustomBicChange}
                error={!!errors.bank?.bic}
                helperText={
                  errors.bank?.bic?.message ||
                  "Enter your bank's BIC/SWIFT code (8 or 11 characters)"
                }
                placeholder="e.g., BANKFIHH"
                inputProps={{
                  maxLength: 11,
                  style: { textTransform: "uppercase" },
                }}
              />
            </Box>
          </>
        )}

        {/* Bank Account Number - Show for all cases */}
        <Box>
          <TextField
            {...control.register("bank.bank_account_no")}
            label="Bank Account Number (IBAN) *"
            fullWidth
            variant="filled"
            error={!!errors.bank?.bank_account_no}
            helperText={
              errors.bank?.bank_account_no?.message ||
              "Format: FI12 3456 7890 1234 56"
            }
            placeholder="FI12 3456 7890 1234 56"
            inputProps={{
              style: { textTransform: "uppercase" },
            }}
          />
        </Box>

        {/* BIC/SWIFT Code - Only show for predefined banks (not for "Other Bank") */}
        {selectedBank &&
          selectedBank !== "Other Bank" &&
          selectedBank !== "" && (
            <Box>
              <TextField
                {...control.register("bank.bic")}
                label="BIC/SWIFT Code *"
                fullWidth
                variant="filled"
                value={selectedBic || ""}
                error={!!errors.bank?.bic}
                helperText={
                  errors.bank?.bic?.message ||
                  "Automatically filled based on bank selection"
                }
                placeholder="e.g., NDEAFIHH"
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    backgroundColor: "action.hover",
                    cursor: "not-allowed",
                  },
                }}
              />
            </Box>
          )}
      </Box>

      {/* Bank Information Helper Text */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 3, p: 2, backgroundColor: "info.50", borderRadius: 1 }}
      >
        💡 <strong>Bank Information Guide:</strong>
        <br />• <strong>IBAN</strong>: Your international bank account number
        (starts with FI for Finland)
        <br />• <strong>BIC/SWIFT</strong>: Bank identifier code for
        international transfers
        <br />
        • This information is required for salary payments and financial
        transactions
        <br />• Your bank details are stored securely and used only for
        accounting purposes
      </Typography>

      {/* Selected Bank Info Display */}
      {selectedBank && selectedBank !== "Other Bank" && selectedBank !== "" && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: "success.50",
            borderRadius: 1,
            border: 1,
            borderColor: "success.light",
          }}
        >
          <Typography variant="body2" color="success.dark">
            ✅ Selected: <strong>{selectedBank}</strong>
            <br />
            BIC Code: <strong>{selectedBic}</strong>
          </Typography>
        </Box>
      )}

      {/* Custom Bank Info Display */}
      {selectedBank === "Other Bank" && customBank && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: "warning.50",
            borderRadius: 1,
            border: 1,
            borderColor: "warning.light",
          }}
        >
          <Typography variant="body2" color="warning.dark">
            📝 Custom Bank: <strong>{customBank}</strong>
            <br />
            Please ensure you enter the correct BIC/SWIFT code for your bank.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
