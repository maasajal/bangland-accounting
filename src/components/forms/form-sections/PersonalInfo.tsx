// src/components/forms/form-sections/PersonalInfo.tsx
"use client";
import { FieldErrors } from "react-hook-form";
import { Grid, TextField, Typography, Box } from "@mui/material";
import { IClientForm } from "@/types/client";

interface PersonalInfoProps {
  control: any;
  errors: FieldErrors<IClientForm>;
}

export default function PersonalInfo({ control, errors }: PersonalInfoProps) {
  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 3, color: "primary.main" }}
      >
        Personal Information
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            {...control.register("personal.first_name")}
            label="First Name"
            fullWidth
            required
            error={!!errors.personal?.first_name}
            helperText={errors.personal?.first_name?.message}
            placeholder="John"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            {...control.register("personal.last_name")}
            label="Last Name *"
            fullWidth
            error={!!errors.personal?.last_name}
            helperText={errors.personal?.last_name?.message}
            placeholder="Doe"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            {...control.register("personal.ssn")}
            label="Social Security Number (SSN)"
            fullWidth
            required
            error={!!errors.personal?.ssn}
            helperText={errors.personal?.ssn?.message}
            placeholder="010190-123A"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            {...control.register("personal.email")}
            label="Email Address"
            type="email"
            fullWidth
            required
            error={!!errors.personal?.email}
            helperText={errors.personal?.email?.message}
            placeholder="john.doe@example.com"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            {...control.register("personal.finn_ph_num")}
            label="Finnish Phone Number"
            fullWidth
            required
            error={!!errors.personal?.finn_ph_num}
            helperText={errors.personal?.finn_ph_num?.message}
            placeholder="+358401234567"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            {...control.register("personal.whatsapp_num")}
            label="WhatsApp Number"
            fullWidth
            error={!!errors.personal?.whatsapp_num}
            helperText={errors.personal?.whatsapp_num?.message}
            placeholder="+358401234567"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            {...control.register("personal.about_client")}
            label="About Client / Additional Information"
            fullWidth
            multiline
            rows={4}
            error={!!errors.personal?.about_client}
            helperText={errors.personal?.about_client?.message}
            placeholder="Tell us about your background, business experience, goals, or any special requirements you might have..."
          />
        </Grid>
      </Grid>
    </Box>
  );
}
