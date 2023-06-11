import { cannyRequest } from "../utils.js";
import type { StatusChange } from "../types/status-change.js";

/**
 * Options for the {@link listStatusChanges} API
 */
export type ListStatusChangesOptions = {
  /**
   * The id of the board you'd like to fetch status changes for.
   */
  boardID?: string;
  /**
   * The number of status changes you'd like to fetch. Defaults to 10 if not specified.
   */
  limit?: number;
  /**
   * The number of status changes you'd like to skip before starting to fetch. Defaults to 0 if not specified.
   */
  skip?: number;
};

/**
 * Response for the {@link listStatusChanges} API
 */
export interface ListStatusChangesResponse {
  /**
   * A list of status changes
   */
  statusChanges: StatusChange[];
  /**
   * Specifies whether this query returns more status changes than the limit.
   */
  hasMore: boolean;
}

/**
 * Returns a list of status changes. Include parameters to specify board and pagination. Sorted by newest.
 *
 * Reference: https://developers.canny.io/api-reference#list_status_changes
 * @param options The request options
 * @returns A dictionary with a "statusChanges" property that contains an array of status change objects
 */
export function listStatusChanges(options: ListStatusChangesOptions = {}) {
  return cannyRequest<ListStatusChangesResponse>(
    "/status_changes/list",
    options
  );
}
