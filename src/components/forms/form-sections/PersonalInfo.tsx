// src/components/forms/form-sections/PersonalInfo.tsx
"use client";
import { Control, FieldErrors } from "react-hook-form";
import { TextField, Typography, Box } from "@mui/material";
import { IClientForm } from "@/types/client";

interface PersonalInfoProps {
  control: Control<IClientForm>;
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

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
          },
          gap: 3,
          width: "100%",
        }}
      >
        {/* First Name */}
        <Box>
          <TextField
            {...control.register("personal.first_name")}
            label="First Name"
            fullWidth
            required
            variant="filled"
            error={!!errors.personal?.first_name}
            helperText={errors.personal?.first_name?.message}
            placeholder="John"
          />
        </Box>

        {/* Last Name */}
        <Box>
          <TextField
            {...control.register("personal.last_name")}
            label="Last Name"
            fullWidth
            required
            variant="filled"
            error={!!errors.personal?.last_name}
            helperText={errors.personal?.last_name?.message}
            placeholder="Doe"
          />
        </Box>

        {/* SSN */}
        <Box>
          <TextField
            {...control.register("personal.ssn")}
            label="Social Security Number (SSN)"
            fullWidth
            required
            variant="filled"
            error={!!errors.personal?.ssn}
            helperText={errors.personal?.ssn?.message}
            placeholder="010190-123A"
          />
        </Box>

        {/* Email */}
        <Box>
          <TextField
            {...control.register("personal.email")}
            label="Email Address"
            type="email"
            fullWidth
            required
            variant="filled"
            error={!!errors.personal?.email}
            helperText={errors.personal?.email?.message}
            placeholder="john.doe@example.com"
          />
        </Box>

        {/* Finnish Phone */}
        <Box>
          <TextField
            {...control.register("personal.finn_ph_num")}
            label="Finnish Phone Number"
            fullWidth
            required
            variant="filled"
            error={!!errors.personal?.finn_ph_num}
            helperText={errors.personal?.finn_ph_num?.message}
            placeholder="+358401234567"
          />
        </Box>

        {/* WhatsApp */}
        <Box>
          <TextField
            {...control.register("personal.whatsapp_num")}
            label="WhatsApp Number"
            fullWidth
            variant="filled"
            error={!!errors.personal?.whatsapp_num}
            helperText={errors.personal?.whatsapp_num?.message}
            placeholder="+358401234567"
          />
        </Box>
        <Box>
          <TextField
            {...control.register("address.full_address")}
            label="Full Address in Finland"
            fullWidth
            multiline
            rows={2}
            error={!!errors.address?.full_address}
            helperText={errors.address?.full_address?.message}
            placeholder="Example: Mannerheimintie 12 A 5, 00100 Helsinki, Finland"
          />
        </Box>

        {/* About Client - Full width */}
        <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }}>
          <TextField
            {...control.register("personal.about_client")}
            label="About Yourself / Additional Information"
            fullWidth
            variant="filled"
            multiline
            rows={4}
            error={!!errors.personal?.about_client}
            helperText={errors.personal?.about_client?.message}
            placeholder="Tell us about your background, business experience, goals, or any special requirements you might have..."
          />
        </Box>
      </Box>
    </Box>
  );
}
