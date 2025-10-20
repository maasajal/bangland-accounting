// src/components/forms/form-sections/AddressInfo.tsx
"use client";
import { Control, FieldErrors } from "react-hook-form";
import { TextField, Typography, Box } from "@mui/material";
import { IClientForm } from "@/types/client";

interface AddressInfoProps {
  control: any;
  errors: FieldErrors<IClientForm>;
}

export default function AddressInfo({ control, errors }: AddressInfoProps) {
  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 3, color: "primary.main" }}
      >
        Address Information
      </Typography>

      <TextField
        {...control.register("address.full_address")}
        label="Full Address in Finland"
        fullWidth
        multiline
        rows={3}
        error={!!errors.address?.full_address}
        helperText={errors.address?.full_address?.message}
        placeholder="Example: Mannerheimintie 12 A 5, 00100 Helsinki, Finland"
      />

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1, fontStyle: "italic" }}
      >
        Please provide your complete residential address in Finland including
        street name, apartment number, postal code, and city.
      </Typography>
    </Box>
  );
}
