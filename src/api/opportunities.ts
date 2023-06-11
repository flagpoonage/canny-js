import { cannyRequest } from "../utils.js";
import type { Opportunity } from "../types/opportunity.js";

export type ListOpportunitiesOptions = {
  limit?: number;
  skip?: number;
};

export interface ListOpportunitiesResponse {
  opportunities: Opportunity[];
  hasMore: boolean;
}

export function listOpportunities(options: ListOpportunitiesOptions = {}) {
  return cannyRequest<ListOpportunitiesResponse>(
    "/opportunities/list",
    options
  );
}
