/**
 * Users can create posts, votes, and comments. Admins also have user accounts.
 *
 * Reference: https://developers.canny.io/api-reference#user_object
 */
export interface User {
  /**
   * A unique identifier for the user.
   */
  id: string;
  /**
   * Link to the user's avatar image.
   */
  avatarURL: string;
  /**
   * Time at which the user was created, in ISO 8601 format.
   */
  created: string;
  /**
   * Any custom fields associated with the user.
   */
  customFields: Record<string, unknown>;
  /**
   * The user's email. This field can be null, for example when you create a new user by voting on behalf of them.
   */
  email: string | null;
  /**
   * Whether or not the user is a Canny admin.
   */
  isAdmin: boolean;
  /**
   * Time at which the user interacted with your company for the last time, in ISO 8601 format.
   */
  lastActivity: string;
  /**
   * The user's name.
   */
  name: string;
  /**
   * The URL of the user's profile.
   */
  url: string;
  /**
   * The user's unique identifier in your application. This field can be null. We only have this data if the user was authenticated via single sign-on, or if it was added via API.
   */
  userID: string | null;
}
