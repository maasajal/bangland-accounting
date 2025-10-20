import { Document } from "mongoose";

export type ClientStatus = "active" | "pending" | "mandate" | "inactive";
export type VATReturn = "monthly" | "quarterly" | "yearly";
export type ClientOf = "maas" | "maam";

export interface IClientForm extends Document {
  join_date: Date;
  status: ClientStatus;
  client_of: ClientOf;
  personal: {
    first_name: string;
    last_name: string;
    ssn: string;
    email: string;
    finn_ph_num: string;
    whatsapp_num: string;
    about_client: string;
  };
  business: {
    business_id: string;
    vat_id: string;
    company: string;
    business_desc: string;
    vat_return_activities: VATReturn;
    business_start_date: Date;
  };
  address: {
    full_address: string;
  };
  bank: {
    bank_name: string;
    bank_acccount_no: string;
    bic: string;
  };
  pricing_plan: string;
  work_contracts: string[];
  agree_with: {
    new_usinesses: string;
    pricing_plan_selection: string;
    service_start_date: string;
    comment: string;
    discount: string;
    terms_conditions: {
      i_agree: string;
      confirm: string;
    };
  };
  digital_sign: string;
  createdAt: Date;
  updatedAt: Date;
}
