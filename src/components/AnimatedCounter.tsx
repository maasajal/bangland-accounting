"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { Box, Typography } from "@mui/material";

// Animated Counter Component
export const AnimatedCounter = ({
  value,
  label,
}: {
  value: string;
  label: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      // Extract number from value string (e.g., "500+" -> 500, "24h" -> 24)
      const numericValue = parseInt(value.replace(/\D/g, "")) || 0;

      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = numericValue / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const displayValue = value.includes("+")
    ? `${count}+`
    : value.includes("h")
    ? `${count}h`
    : value.includes("%")
    ? `${count}%`
    : `${count}`;

  return (
    <Box ref={ref} sx={{ textAlign: "center" }}>
      <Typography
        variant="h2"
        fontWeight="bold"
        gutterBottom
        sx={{
          fontSize: { xs: "2.5rem", md: "3rem" },
          background: "linear-gradient(45deg, #fbbf24, #f59e0b)",
          backgroundClip: "text",
          textFillColor: "transparent",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {displayValue}
      </Typography>
      <Typography variant="h6" sx={{ opacity: 0.9 }}>
        {label}
      </Typography>
    </Box>
  );
};
