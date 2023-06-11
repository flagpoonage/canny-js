import { cannyRequest } from "../utils.js";
import type { Opportunity } from "../types/opportunity.js";

/**
 * Options for the {@link listOpportunities} API
 */
export type ListOpportunitiesOptions = {
  /**
   * The number of opportunities you'd like to fetch. Defaults to 10 if not specified.
   */
  limit?: number;
  /**
   * The number of opportunities you'd like to skip before starting to fetch. Defaults to 0 if not specified.
   */
  skip?: number;
};

/**
 * Response for the {@link listOpportunities} API
 */
export interface ListOpportunitiesResponse {
  /**
   * A list of opportunities
   */
  opportunities: Opportunity[];
  /**
   * Specifies whether this query returns more opportunities than the limit.
   */
  hasMore: boolean;
}

/**
 * Returns a list of opportunities linked to posts in Canny.
 *
 * Reference: https://developers.canny.io/api-reference#list_opportunities
 * @param options The request options
 * @returns A dictionary with an "opportunities" property that contains an array of opportunity objects.
 */
export function listOpportunities(options: ListOpportunitiesOptions = {}) {
  return cannyRequest<ListOpportunitiesResponse>(
    "/opportunities/list",
    options
  );
}
