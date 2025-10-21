export interface PricingPlan {
  value: string;
  name: string;
  label: string;
  price: string;
  period: string;
  description: string;
  popular: boolean;
  features: string[];
  color: "primary" | "secondary";
  note?: string;
}

export interface PricingPlansData {
  pricingPlans: PricingPlan[];
}
