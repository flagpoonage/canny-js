/**
 * Companies are created by associating them to users using Canny's SDK, SSO tokens, or the API.
 *
 * Reference: Derived from examples in https://developers.canny.io/api-reference#companies
 */
export interface Company {
  /**
   * A unique identifier for the comapny
   */
  id: string;
  /**
   * Time at which the company was created, in ISO 8601 format.
   */
  created: string;
  /**
   * Any custom fields associated with the company
   */
  customFields: Record<string, unknown>;
  /**
   * The domain name for the company
   */
  domain: string;
  /**
   * The number of members belonging to the company
   */
  memberCount: number;
  /**
   * The monthly of the company in dollars.
   */
  monthlySpend: number;
  /**
   * The name of the company
   */
  name: string;
}
