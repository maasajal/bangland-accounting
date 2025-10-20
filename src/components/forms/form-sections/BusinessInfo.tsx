// src/components/forms/form-sections/BusinessInfo.tsx
"use client";

import { Control, FieldErrors } from "react-hook-form";
import {
  Grid,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { IClientForm } from "@/types/client";

interface BusinessInfoProps {
  control: any;
  errors: FieldErrors<IClientForm>;
}

export default function BusinessInfo({ control, errors }: BusinessInfoProps) {
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

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...control.register("business.business_id")}
              label="Business ID (if available)"
              fullWidth
              error={!!errors.business?.business_id}
              helperText={errors.business?.business_id?.message}
              placeholder="1234567-8"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...control.register("business.vat_id")}
              label="VAT ID (if available)"
              fullWidth
              error={!!errors.business?.vat_id}
              helperText={errors.business?.vat_id?.message}
              placeholder="FI12345678"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...control.register("business.company")}
              label="Company Name"
              fullWidth
              error={!!errors.business?.company}
              helperText={errors.business?.company?.message}
              placeholder="Last Name First Name | Your Company Oy"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...control.register("business.business_desc")}
              label="Business Description"
              fullWidth
              multiline
              rows={4}
              error={!!errors.business?.business_desc}
              helperText={errors.business?.business_desc?.message}
              placeholder="Describe your business activities, products, services, target market, and any other relevant information..."
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              required
              error={!!errors.business?.vat_return_activities}
            >
              <InputLabel>VAT Return Frequency</InputLabel>
              <Select
                {...control.register("business.vat_return_activities")}
                label="VAT Return Frequency"
                defaultValue="quarterly"
              >
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="quarterly">Quarterly</MenuItem>
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
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <DatePicker
                label="Business Start Date"
                {...control.register("business.business_start_date")}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.business?.business_start_date,
                    helperText: errors.business?.business_start_date?.message,
                  },
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}
