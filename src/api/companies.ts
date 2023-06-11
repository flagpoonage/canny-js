import { cannyRequest } from "../utils.js";
import type { Company } from "../types/company.js";

/**
 * Options for the {@link listCompanies} API
 */
export type ListCompaniesOptions = {
  /**
   * A string to search by company name
   */
  search?: string;
  /**
   * the URL name of the segment you want to use to filter companies
   */
  segment?: string;
  /**
   * The number of companies you'd like to fetch. Defaults to 10 if not specified.
   */
  limit?: number;
  /**
   * The number of companies you'd like to skip before starting to fetch. Defaults to 0 if not specified.
   */
  skip?: number;
};

/**
 * Response for the {@link listCompanies} API
 */
export interface ListCompaniesResponse {
  /**
   * A list of companies
   */
  companies: Company[];
  /**
   * Specifies whether this query returns more companies than the limit.
   */
  hasMore: boolean;
}

/**
 * Returns a list of all companies associated with your company, ordered by created date.
 *
 * Reference: https://developers.canny.io/api-reference#list_companies
 * @param options The request options
 * @returns A dictionary with a "companies" property that contains an array of company objects.
 */
export function listCompanies(options: ListCompaniesOptions = {}) {
  return cannyRequest<ListCompaniesResponse>("/companies/list", options);
}

/**
 * Options for the {@link updateCompany} API
 */
export type UpdateCompanyOptions = {
  /**
   * The identifier for your company.
   */
  id: string;
  /**
   * The date the company was created in your system.
   */
  created?: string;
  /**
   * Any custom fields associated with the company. Each field name (key) must be between 0 and 30 characters long. If field values are strings, they must be less than 200 characters long.
   */
  customFields?: Record<string, unknown>;
  /**
   * The MRR for the company in dollars, rounded to two decimal places.
   */
  monthlySpend?: number;
  /**
   * The company's name. Must be between 0 and 100 characters long.
   */
  name: string;
};

export interface UpdateCompanyResponse {
  /**
   * The ID of the updated company
   */
  id: string;
}

/**
 * Given a company ID, this endpoint updates the company with the data supplied
 *
 * If you have company syncing integrations in place (e.g., Hubspot, Salesforce, SSO Tokens, Canny Identify, ...), the fields updated with this endpoint might be overwritten.
 *
 * Reference: https://developers.canny.io/api-reference#update_company
 * @param options The request options
 * @returns  an object with a single key: id.
 */
export function updateCompany(options: UpdateCompanyOptions) {
  return cannyRequest<UpdateCompanyResponse>("/companies/update", options);
}

/**
 * Deletes a company.
 * @param companyID The identifier you used when creating the company.
 * @returns "success" if the company was successfully deleted.
 */
export function deleteCompany(companyID: string) {
  return cannyRequest<void>("/companies/delete", { companyID });
}
