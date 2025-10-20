// src/components/modals/SuccessModal.tsx
"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { CheckCircle, Celebration, Email } from "@mui/icons-material";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SuccessModal({ open, onClose }: SuccessModalProps) {
  const nextSteps = [
    "We will review your application within 24 hours",
    "You will receive a welcome email with next steps",
    "Our team will contact you to schedule an onboarding call",
    "Prepare your identification documents for verification",
    "Have your business documents ready (if applicable)",
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <CheckCircle sx={{ fontSize: 60, color: "success.main" }} />
        </Box>
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: "bold", color: "success.main" }}
        >
          Application Submitted!
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ textAlign: "center" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Welcome to Bangland! 🎉
        </Typography>

        <Typography variant="body1" paragraph>
          Thank you for choosing Bangland as your accounting partner in Finland.
          Your application has been successfully submitted and is now being
          processed.
        </Typography>

        <Alert severity="info" sx={{ mb: 3, textAlign: "left" }}>
          <Typography variant="body2" fontWeight="bold">
            <Email sx={{ mr: 1, verticalAlign: "middle" }} />
            Check Your Email
          </Typography>
          <Typography variant="body2">
            We have sent a confirmation email with your application details and
            next steps.
          </Typography>
        </Alert>

        <Box sx={{ textAlign: "left", mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            What Happens Next:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            {nextSteps.map((step, index) => (
              <Typography
                component="li"
                key={index}
                variant="body2"
                paragraph
                sx={{ mb: 1 }}
              >
                {step}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box sx={{ p: 2, backgroundColor: "primary.50", borderRadius: 2 }}>
          <Typography variant="body2" sx={{ fontStyle: "italic" }}>
            Need immediate assistance?
            <br />
            Contact us: +358449869280 (WhatsApp/Calls) or be.quickac@gmail.com
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, justifyContent: "center" }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Celebration />}
          sx={{ minWidth: 200 }}
        >
          Got It!
        </Button>
      </DialogActions>
    </Dialog>
  );
}
