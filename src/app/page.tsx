// src/app/page.tsx
"use client";

import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Fab,
  Zoom,
  useScrollTrigger,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  alpha,
} from "@mui/material";
import {
  KeyboardArrowUp,
  RocketLaunch,
  Speed,
  Shield,
  TrendingUp,
  CheckCircle,
  ArrowForward,
  Star,
  Groups,
  Receipt,
  AccountBalance,
  Business,
} from "@mui/icons-material";
import ClientForm from "@/components/forms/ClientForm";
import TermsModal from "@/components/modals/TermsModal";
import SuccessModal from "@/components/modals/SuccessModal";

// Scroll to top component
function ScrollTop() {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 100 });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        onClick={handleClick}
        color="primary"
        size="medium"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <KeyboardArrowUp />
      </Fab>
    </Zoom>
  );
}

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const features = [
    {
      icon: <Speed />,
      title: "Fast Setup",
      description: "Get your business running in days, not weeks",
    },
    {
      icon: <Shield />,
      title: "Compliance Guarantee",
      description: "100% compliant with Finnish regulations",
    },
    {
      icon: <TrendingUp />,
      title: "Growth Focused",
      description: "Scalable solutions for growing businesses",
    },
    {
      icon: <Receipt />,
      title: "All-in-One",
      description: "From registration to monthly accounting",
    },
  ];

  const services = [
    {
      category: "Business Setup",
      icon: <RocketLaunch />,
      items: [
        "Company Registration",
        "Business ID & VAT Number",
        "Bank Account Assistance",
        "Legal Structure Advice",
      ],
    },
    {
      category: "Accounting",
      icon: <AccountBalance />,
      items: [
        "Monthly Bookkeeping",
        "VAT Returns",
        "Financial Statements",
        "Payroll Management",
      ],
    },
    {
      category: "Tax & Compliance",
      icon: <Shield />,
      items: [
        "Tax Planning",
        "Annual Reports",
        "Compliance Monitoring",
        "Audit Support",
      ],
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Apply Online",
      description: "Complete our simple form in 10 minutes",
    },
    {
      step: 2,
      title: "Mandate Approval",
      description: "We need your mandate approval to get started",
    },
    {
      step: 3,
      title: "Business Registration",
      description: "We handle all government registrations",
    },
    {
      step: 4,
      title: "Start Operating",
      description: "Begin your business activities immediately",
    },
  ];

  const pricingPlans = [
    {
      name: "Light Entrepreneur",
      price: "€39-49",
      period: "/month",
      popular: true,
      features: [
        "Monthly Accounting & VAT",
        "Salary Calculations",
        "Tax Support",
        "Digital Dashboard",
        "Email & Chat Support",
      ],
      color: "primary",
    },
    {
      name: "Limited Company",
      price: "€99-199",
      period: "/month",
      popular: false,
      features: [
        "Full Accounting Services",
        "Financial Statements",
        "Board Meeting Minutes",
        "Corporate Tax Filing",
        "Dedicated Account Manager",
      ],
      color: "secondary",
    },
  ];

  const stats = [
    { number: "500+", label: "Happy Clients" },
    { number: "24h", label: "Average Response Time" },
    { number: "99%", label: "Satisfaction Rate" },
    { number: "5+", label: "Years Experience" },
  ];

  const handleGetStarted = () => {
    setShowForm(true);
    setTimeout(() => {
      document
        .getElementById("enrollment-form")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSuccess = () => setSuccessOpen(true);

  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #a78bfa 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip
                label="🚀 Trusted by 500+ Entrepreneurs"
                sx={{
                  bgcolor: alpha("#ffffff", 0.2),
                  color: "white",
                  mb: 3,
                  fontWeight: 600,
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  mb: 3,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                }}
              >
                Start Your Business in Finland with{" "}
                <Box component="span" sx={{ color: "#fbbf24" }}>
                  Confidence
                </Box>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontWeight: 400,
                }}
              >
                All-in-one business setup and accounting services designed for
                entrepreneurs. Fast, affordable, and 100% compliant with Finnish
                regulations.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={handleGetStarted}
                  sx={{
                    bgcolor: "#f59e0b",
                    "&:hover": { bgcolor: "#d97706" },
                  }}
                >
                  Start Your Journey
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "white",
                    color: "white",
                    "&:hover": { borderColor: "#fbbf24", color: "#fbbf24" },
                  }}
                  onClick={() =>
                    document
                      .getElementById("services")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  background: alpha("#ffffff", 0.1),
                  borderRadius: 4,
                  p: 4,
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Star sx={{ color: "#fbbf24" }} />
                  Why Choose QuickAccount?
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 40, color: "#fbbf24" }}>
                      <CheckCircle />
                    </ListItemIcon>
                    <ListItemText primary="Finnish & English speaking experts" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 40, color: "#fbbf24" }}>
                      <CheckCircle />
                    </ListItemIcon>
                    <ListItemText primary="Fixed monthly pricing - no surprises" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 40, color: "#fbbf24" }}>
                      <CheckCircle />
                    </ListItemIcon>
                    <ListItemText primary="Digital dashboard for real-time updates" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 40, color: "#fbbf24" }}>
                      <CheckCircle />
                    </ListItemIcon>
                    <ListItemText primary="Fast 24-hour response time" />
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h2" gutterBottom>
            Everything You Need to Succeed
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            We handle the paperwork so you can focus on what you do best -
            growing your business
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ textAlign: "center", p: 3, height: "100%" }}>
                <Avatar
                  sx={{
                    bgcolor: alpha("#7c3aed", 0.1),
                    color: "primary.main",
                    width: 60,
                    height: 60,
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Services Section */}
      <Box id="services" sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="h2" gutterBottom>
              Comprehensive Business Services
            </Typography>
            <Typography variant="h6" color="text.secondary">
              From startup to scale-up, we've got you covered
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ p: 4, height: "100%" }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha("#f59e0b", 0.1),
                      color: "secondary.main",
                      width: 60,
                      height: 60,
                      mb: 3,
                    }}
                  >
                    {service.icon}
                  </Avatar>
                  <Typography variant="h5" gutterBottom>
                    {service.category}
                  </Typography>
                  <List dense>
                    {service.items.map((item, itemIndex) => (
                      <ListItem key={itemIndex} sx={{ px: 0 }}>
                        <ListItemIcon
                          sx={{ minWidth: 32, color: "secondary.main" }}
                        >
                          <CheckCircle fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Process Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h2" gutterBottom>
            Simple 4-Step Process
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Get your business up and running in no time
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {processSteps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ textAlign: "center", position: "relative" }}>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    width: 60,
                    height: 60,
                    mx: "auto",
                    mb: 2,
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {step.step}
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ bgcolor: "primary.main", color: "white", py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index} sx={{ textAlign: "center" }}>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                  {stat.number}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  {stat.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h2" gutterBottom>
            Transparent Pricing
          </Typography>
          <Typography variant="h6" color="text.secondary">
            No hidden fees, no surprises
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {pricingPlans.map((plan, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  p: 4,
                  border: plan.popular ? "2px solid" : "1px solid",
                  borderColor: plan.popular ? "primary.main" : "divider",
                  position: "relative",
                  transform: plan.popular ? "scale(1.05)" : "scale(1)",
                }}
              >
                {plan.popular && (
                  <Chip
                    label="Most Popular"
                    color="primary"
                    sx={{
                      position: "absolute",
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  />
                )}
                <Typography variant="h4" gutterBottom>
                  {plan.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "baseline", mb: 3 }}>
                  <Typography
                    variant="h3"
                    color="primary.main"
                    fontWeight="bold"
                  >
                    {plan.price}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    {plan.period}
                  </Typography>
                </Box>
                <List dense sx={{ mb: 3 }}>
                  {plan.features.map((feature, featureIndex) => (
                    <ListItem key={featureIndex} sx={{ px: 0 }}>
                      <ListItemIcon
                        sx={{ minWidth: 32, color: "primary.main" }}
                      >
                        <CheckCircle fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
                <Button
                  variant={plan.popular ? "contained" : "outlined"}
                  fullWidth
                  size="large"
                  onClick={handleGetStarted}
                >
                  Get Started
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h3" gutterBottom>
            Ready to Start Your Business Journey?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Join 500+ entrepreneurs who trust QuickAccount with their business
            success
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowForward />}
            onClick={handleGetStarted}
            sx={{ px: 6, py: 2 }}
          >
            Start Your Application
          </Button>
        </Container>
      </Box>

      {/* Enrollment Form Section */}
      {showForm && (
        <Box id="enrollment-form" sx={{ py: 8, bgcolor: "background.default" }}>
          <Container maxWidth="lg">
            <ClientForm onSuccess={handleSuccess} />
          </Container>
        </Box>
      )}

      {/* Footer */}
      <Box sx={{ bgcolor: "primary.main", color: "white", py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Business />
                QuickAccount
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                Your trusted partner for business setup and accounting services
                in Finland
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                📞 +358449869280 | 📧 be.quickac@gmail.com
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Connect With Us
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Follow us on social media for updates and business tips
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Modals */}
      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />

      <ScrollTop />
    </Box>
  );
}

// // src/app/page.tsx
// "use client";

// import React, { useState } from "react";
// import {
//   Container,
//   Box,
//   Typography,
//   Fab,
//   Zoom,
//   useScrollTrigger,
// } from "@mui/material";
// import { KeyboardArrowUp } from "@mui/icons-material";
// import InfoSection from "@/components/sections/InfoSection";
// import ClientForm from "@/components/forms/ClientForm";
// // import AgreementSection from "@/components/sections/AgreementSection";
// import TermsModal from "@/components/modals/TermsModal";
// import SuccessModal from "@/components/modals/SuccessModal";

// function ScrollTop() {
//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 100,
//   });

//   const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
//     const anchor = (
//       (event.target as HTMLDivElement).ownerDocument || document
//     ).querySelector("#back-to-top-anchor");

//     if (anchor) {
//       anchor.scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//       });
//     }
//   };

//   return (
//     <Zoom in={trigger}>
//       <Box
//         onClick={handleClick}
//         role="presentation"
//         sx={{
//           position: "fixed",
//           bottom: 16,
//           right: 16,
//           zIndex: 1000,
//         }}
//       >
//         <Fab color="primary" size="small" aria-label="scroll back to top">
//           <KeyboardArrowUp />
//         </Fab>
//       </Box>
//     </Zoom>
//   );
// }

// export default function HomePage() {
//   const [termsOpen, setTermsOpen] = useState(false);
//   const [successOpen, setSuccessOpen] = useState(false);

//   const handleOpenTerms = () => setTermsOpen(true);
//   const handleCloseTerms = () => setTermsOpen(false);

//   const handleSuccess = () => setSuccessOpen(true);
//   const handleCloseSuccess = () => setSuccessOpen(false);

//   return (
//     <>
//       <div id="back-to-top-anchor" />

//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         {/* Header Section */}
//         <Box sx={{ textAlign: "center", mb: 6 }}>
//           <Typography
//             variant="h3"
//             component="h1"
//             gutterBottom
//             sx={{
//               fontWeight: "bold",
//               color: "primary.main",
//               background: "linear-gradient(45deg, #1976d2, #42a5f5)",
//               backgroundClip: "text",
//               textFillColor: "transparent",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             Business Setup and Accounting Services Agreement!
//           </Typography>

//           <Typography
//             variant="h4"
//             component="h2"
//             gutterBottom
//             sx={{
//               color: "secondary.main",
//               fontWeight: 600,
//             }}
//           >
//             Join Now
//           </Typography>

//           <Typography
//             variant="h6"
//             color="text.secondary"
//             sx={{ maxWidth: 800, mx: "auto" }}
//           >
//             Complete your business enrollment in Finland with Bangland - Your
//             trusted accounting partner
//           </Typography>
//         </Box>

//         {/* Main Content */}
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
//           <InfoSection onOpenTerms={handleOpenTerms} />
//           <ClientForm onSuccess={handleSuccess} />
//           {/* <AgreementSection onOpenTerms={handleOpenTerms} /> */}
//         </Box>
//       </Container>

//       {/* Modals */}
//       <TermsModal open={termsOpen} onClose={handleCloseTerms} />
//       <SuccessModal open={successOpen} onClose={handleCloseSuccess} />

//       <ScrollTop />
//     </>
//   );
// }
