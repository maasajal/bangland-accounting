// src/components/sections/AgreementSection.tsx
"use client";

import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import { FiberManualRecord, Description } from "@mui/icons-material";

interface AgreementSectionProps {
  onOpenTerms: () => void;
}

export default function AgreementSection({
  onOpenTerms,
}: AgreementSectionProps) {
  const terms = [
    "I understand that Bangland will assist me in registering my business with the Finnish authorities",
    "I agree to the selected pricing plan and understand that VAT (25.50%) will be added to all fees",
    "I acknowledge the new policy regarding Financial Statements fees effective from 24.06.2025",
    "I understand the service commitment requirements and cancellation policies",
    "I confirm that all provided information is accurate and complete",
    "I agree to provide necessary documentation for business registration",
    "I understand that additional services may incur extra charges",
    "I agree to the privacy policy and data handling practices",
  ];

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Service Agreement & Terms
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Terms & Conditions Summary
          </Typography>
          <List>
            {terms.map((term, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemIcon sx={{ minWidth: 30, mt: 0.5 }}>
                  <FiberManualRecord sx={{ fontSize: 12 }} />
                </ListItemIcon>
                <ListItemText primary={term} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ p: 3, backgroundColor: "grey.50", borderRadius: 2, mb: 3 }}>
          <Typography
            variant="body2"
            sx={{ fontStyle: "italic", textAlign: "center" }}
          >
            By submitting the enrollment form, you acknowledge that you have
            read, understood, and agree to all the terms and conditions outlined
            above and in the complete agreement document. You also confirm that
            all information provided is accurate to the best of your knowledge.
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            startIcon={<Description />}
            onClick={onOpenTerms}
            size="large"
          >
            Read Terms & Conditions
          </Button>
        </Box>

        <Box
          sx={{
            mt: 4,
            textAlign: "center",
            p: 2,
            backgroundColor: "primary.50",
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" sx={{ fontStyle: "italic" }}>
            Bangland
          </Typography>
          <Typography variant="caption" sx={{ display: "block" }}>
            Tampere, Finland | Business ID: 3224076-2 
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
