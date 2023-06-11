import { cannyRequest } from "../utils.js";
import type { Company } from "../types/company.js";

export type ListCompaniesOptions = {
  search?: string;
  segment?: string;
  limit?: number;
  skip?: number;
};

export interface ListCompaniesResponse {
  companies: Company[];
  hasMore: boolean;
}

export function listCompanies(options: ListCompaniesOptions = {}) {
  return cannyRequest<ListCompaniesResponse>("/companies/list", options);
}

export type UpdateCompanyOptions = {
  id: string;
  created?: string;
  customFields?: Record<string, unknown>;
  monthlySpend?: number;
  name: string;
};

export interface UpdateCompanyResponse {
  id: string;
}

export function updateCompany(options: UpdateCompanyOptions) {
  return cannyRequest<UpdateCompanyResponse>("/companies/update", options);
}

export function deleteCompany(companyID: string) {
  return cannyRequest<void>("/companies/delete", { companyID });
}
