// src/components/sections/InfoSection.tsx
"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

interface InfoSectionProps {
  onOpenTerms: () => void;
}

export default function InfoSection({ onOpenTerms }: InfoSectionProps) {
  const pricingPlans = [
    {
      plan: "Most wanted Light & Startup Entrepreneur",
      price: "€30/month",
      description: "Yearly subscription",
    },
    {
      plan: "Light & Startup Entrepreneur",
      price: "€39/month",
      description: "Monthly subscription",
    },
    {
      plan: "For Taxi driver",
      price: "€49/month",
      description: "Fixed monthly price",
    },
    {
      plan: "Pro Light Entrepreneur",
      price: "0.99% of gross salary",
      description: "Food delivery only",
    },
    {
      plan: "Light Entrepreneur Basic",
      price: "3.99% of gross salary",
      description: "6-month commitment",
    },
    {
      plan: "Limited Liability Company (Up to €100K Turnover)",
      price: "€49-99/month",
      description: "Depending on company status",
    },
    {
      plan: "Limited Liability Company (Over €100K Turnover)",
      price: "€99-199/month",
      description: "Depending on company status",
    },
  ];

  const contactInfo = [
    { method: "WhatsApp", details: "+358449415458" },
    {
      method: "Website",
      details: "form.quickaccount.fi",
      link: "https://form.quickaccount.fi",
    },
    { method: "Email", details: "finnmaa.sajal@gmail.com" },
    {
      method: "Facebook",
      details: "Bangland",
      link: "https://facebook.com",
    },
  ];

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
        >
          Welcome to Bangland!
        </Typography>

        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
          We are dedicated to simplifying the process of establishing and
          managing your business in Finland. By completing this form, you will
          provide us with the essential information needed to get started.
        </Typography>

        {/* Our Services Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", color: "secondary.main" }}
          >
            Our Services
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Register Your Business"
                secondary="We'll assist you in navigating the Finnish business registration process, ensuring compliance with all legal requirements."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Select Appropriate Accounting Services"
                secondary="Choose from our tailored accounting solutions designed to meet the unique needs of your business."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Choose a Pricing Plan"
                secondary="Select the pricing plan that best fits your business model and budget."
              />
            </ListItem>
          </List>
        </Box>

        {/* Pricing Plans Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", color: "secondary.main" }}
          >
            Pricing Plans
          </Typography>
          <Card variant="outlined" sx={{ mb: 2 }}>
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: "grid", gap: 2 }}>
                {pricingPlans.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
                      gap: 2,
                      borderBottom: index < pricingPlans.length - 1 ? 1 : 0,
                      borderColor: "divider",
                      pb: 2,
                      alignItems: "start",
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                      {item.plan}
                    </Typography>
                    <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
                      <Typography
                        variant="body1"
                        color="primary"
                        sx={{ fontWeight: "bold" }}
                      >
                        {item.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Typography
                variant="caption"
                sx={{ fontStyle: "italic", mt: 2, display: "block" }}
              >
                * All plans have extra deductible VAT of 25.50%
              </Typography>
            </Box>
          </Card>
        </Box>

        {/* Contact Information */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", color: "secondary.main" }}
          >
            Contact Information
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            {contactInfo.map((contact, index) => (
              <Box key={index}>
                <Typography variant="body1">
                  <strong>{contact.method}:</strong>{" "}
                  {contact.link ? (
                    <Link
                      href={contact.link}
                      target="_blank"
                      rel="noopener"
                      color="primary"
                    >
                      {contact.details}
                    </Link>
                  ) : (
                    contact.details
                  )}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
          <Button
            variant="text"
            onClick={onOpenTerms}
            sx={{ textDecoration: "underline" }}
          >
            Read Terms & Conditions
          </Button>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            textAlign: "center",
            mt: 4,
            p: 3,
            backgroundColor: "primary.50",
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" sx={{ fontStyle: "italic", mb: 1 }}>
            Best regards,
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "primary.main", mb: 1 }}
          >
            Bangland - Your trusted and friendly accountant 😊
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
