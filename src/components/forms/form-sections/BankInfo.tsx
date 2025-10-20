// src/components/forms/form-sections/BankInfo.tsx
"use client";
import { Control, FieldErrors } from "react-hook-form";
import { Grid, TextField, Typography, Box } from "@mui/material";
import { IClientForm } from "@/types/client";

interface BankInfoProps {
  control: any;
  errors: FieldErrors<IClientForm>;
}

export default function BankInfo({ control, errors }: BankInfoProps) {
  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 3, color: "primary.main" }}
      >
        Bank Information
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            {...control.register("bank.bank_name")}
            label="Bank Name"
            fullWidth
            error={!!errors.bank?.bank_name}
            helperText={errors.bank?.bank_name?.message}
            placeholder="e.g., S-Pankki, Nordea, OP, Danske Bank"
          />
        </Grid>

        <Grid item xs={12} sm={8}>
          <TextField
            {...control.register("bank.bank_account_no")}
            label="Bank Account Number (IBAN)"
            fullWidth
            error={!!errors.bank?.bank_account_no}
            helperText={errors.bank?.bank_account_no?.message}
            placeholder="FI12 3456 7890 1234 56"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            {...control.register("bank.bic")}
            label="BIC/SWIFT Code"
            fullWidth
            error={!!errors.bank?.bic}
            helperText={errors.bank?.bic?.message}
            placeholder="NDEAFIHH"
          />
        </Grid>
      </Grid>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 2, p: 2, backgroundColor: "info.50", borderRadius: 1 }}
      >
        💡 This information is required for salary payments, invoicing, and
        other financial transactions. Your bank details are stored securely and
        used only for accounting purposes.
      </Typography>
    </Box>
  );
}
