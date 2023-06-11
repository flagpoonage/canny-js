/**
 * An opportunity represents a potential customer, synced in from Salesforce or Hubspot.
 *
 * Reference: https://developers.canny.io/api-reference#opportunity_object
 */
export interface Opportunity {
  /**
   * A unique identifier for the opportunity.
   */
  id: string;
  /**
   * Whether the opportunity is closed.
   */
  closed: boolean;
  /**
   * The name of the opportunity.
   */
  name: string;
  /**
   * The list of post ids this opportunity is linked to.
   */
  postIDs: string[];
  /**
   * The unique identifier for the opportunity in Salesforce.
   */
  salesforceOpportunityID: string;
  /**
   * The value of the opportunity.
   */
  value: number;
  /**
   * Whether the opportunity has been won.
   */
  won: boolean;
}
