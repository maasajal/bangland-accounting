// src/components/modals/TermsModal.tsx
"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Close, CheckCircle } from "@mui/icons-material";

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TermsModal({ open, onClose }: TermsModalProps) {
  const detailedTerms = [
    {
      section: "1. Services Provided",
      items: [
        "Business registration with Finnish authorities (PRH, Tax Administration)",
        "Accounting services based on selected pricing plan",
        "VAT handling and reporting",
        "Payroll services (if applicable)",
        "Financial statement preparation",
      ],
    },
    {
      section: "2. Pricing and Payment",
      items: [
        "All prices are exclusive of VAT (25.50%)",
        "Monthly invoices will be issued in advance",
        "Payment terms: 14 days from invoice date",
        "Late payments may incur interest charges",
        "Price changes will be communicated 30 days in advance",
      ],
    },
    {
      section: "3. Client Responsibilities",
      items: [
        "Provide accurate and complete information",
        "Submit required documents promptly",
        "Inform about changes in business circumstances",
        "Maintain proper business records",
        "Cooperate with accounting requirements",
      ],
    },
    {
      section: "4. Service Commitment",
      items: [
        "Minimum commitment period may apply based on selected plan",
        "Early termination may incur cancellation fees",
        "Service fees apply even with no business activity",
        "30-day notice period for service cancellation",
      ],
    },
    {
      section: "5. Data Protection",
      items: [
        "Client data is handled confidentially",
        "Data is stored securely in compliance with GDPR",
        "Data is only used for providing accounting services",
        "Clients have right to access and correct their data",
      ],
    },
    {
      section: "6. Liability",
      items: [
        "Bangland is not liable for client's business decisions",
        "Liability limited to direct damages",
        "Maximum liability limited to annual service fees",
        "Not liable for delays caused by authorities or third parties",
      ],
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
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
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
            Terms & Conditions
          </Typography>
          <Button onClick={onClose} sx={{ color: "white", minWidth: "auto" }}>
            <Close />
          </Button>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Bangland Business Setup and Accounting Services Agreement
        </Typography>

        <Typography variant="body2" color="text.secondary" paragraph>
          Last updated: December 2024
        </Typography>

        <Typography variant="body1" paragraph>
          This Agreement governs the provision of business setup and accounting
          services by Bangland (Bangland Accounting Firm) to the Client. By
          using our services, you agree to these terms.
        </Typography>

        {detailedTerms.map((section, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "secondary.main", mt: 3 }}
            >
              {section.section}
            </Typography>
            <List dense>
              {section.items.map((item, itemIndex) => (
                <ListItem key={itemIndex}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <CheckCircle color="primary" sx={{ fontSize: 16 }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>
        ))}

        {/* Policy Updates */}
        {/* Policy Update Section */}
        <Box
          sx={{
            mb: 4,
            p: 3,
            backgroundColor: "warning.light",
            borderRadius: 2,
            border: 1,
            borderColor: "warning.main",
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            📢 Important Update: New Policy from 24.06.2025
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Financial Statements Are No Longer Free"
                secondary="Starting from 24th June 2025, all new clients will be charged for Financial Statements:"
              />
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary="• 150€ + VAT – for beginners (new entrepreneurs)" />
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary="• 200€ + VAT – for all other clients" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• We require up to 7 working days to deliver documents" />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="New Entrepreneur Policy:"
                secondary="If you are a new client and we help you open your Business ID:"
              />
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText
                primary="1. No Income in the First 2 Months?"
                secondary="If you have no income in first 2 months, you'll be charged a fixed service fee of €30 (VAT extra)"
              />
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText
                primary="2. Cancellation Policy"
                secondary="Even if you cancel our contact, you are still required to pay a one-time service fee of €30 (VAT extra) for setup and administrative support."
              />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mt: 4, p: 3, backgroundColor: "grey.50", borderRadius: 2 }}>
          <Typography variant="body2" sx={{ fontStyle: "italic" }}>
            For questions about these terms, please contact us at
            be.quickac@gmail.com or WhatsApp: +358449415458.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: 1, borderColor: "divider" }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          I Understand
        </Button>
      </DialogActions>
    </Dialog>
  );
}
