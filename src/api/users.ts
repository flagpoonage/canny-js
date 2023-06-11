import { cannyRequest } from "../utils.js";
import type { Company } from "../types/company.js";
import type { User } from "../types/user.js";

/**
 * Options for the {@link listUsers} API
 */
export type ListUsersOptions = {
  /**
   * The number of entries you'd like to fetch. Defaults to 10 if not specified. Maximum value allowed: 100.
   */
  limit?: number;
  /**
   * The number of entries you'd like to skip before starting to fetch. Defaults to 0 if not specified.
   */
  skip?: number;
};

/**
 * Lists a company's users.
 * @param options The request options
 * @returns A list of users
 */
export function listUsers(options: ListUsersOptions = {}) {
  return cannyRequest<User[]>("/users/list", options);
}

/**
 * Options for the {@link retrieveUser} API
 */
export type RetrieveUserOptions =
  | {
      /**
       * The user's email.
       */
      email: string;
    }
  | {
      /**
       * The user's unique identifier from Canny.
       */
      id: string;
    }
  | {
      /**
       * The user's unique identifier in your application.
       */
      userID: string;
    };

/**
 * Retrieves the details of an existing user. You must specify exactly one of: their Canny id, their id in your application, or their email. These fields are all unique per user.
 *
 * You can only retrieve them based on their id in your application if the user was authenticated via single sign-on or created via API.
 *
 * Reference: https://developers.canny.io/api-reference#retrieve_user
 * @param options The request options
 * @returns Returns a user object, if a valid identifier was supplied.
 */
export function retrieveUser(options: RetrieveUserOptions) {
  return cannyRequest<User>("/users/retrieve", options);
}

/**
 * Options for the {@link createOrUpdateUser} API
 */
export type CreateOrUpdateUserOptions = {
  /**
   * The URL pointing to the user's avatar image.
   */
  avatarURL?: string;
  /**
   * A list of companies the user is associated with.
   */
  companies?: Company[];
  /**
   * The date the user was created in your system.
   */
  created?: string;
  /**
   * Any custom fields associated with the user. Each field name (key) must be between 0 and 30 characters long. If field values are strings, they must be less than 200 characters long.
   */
  customFields?: Record<string, unknown>;
  /**
   * The user's email.
   */
  email?: string;
  /**
   * The user's name. Must be between 1 and 50 characters.
   */
  name: string;
  /**
   * The user's unique identifier in your application.
   */
  userID: string;
};

/**
 * Response from the {@link createOrUpdateUser} API
 */
export interface CreateOrUpdateUserResponse {
  /**
   * ID of the user
   */
  id: string;
}

/**
 * Finds the id for a user. If the user does not exist, one is created, and its id is returned. If the user does exist, they will be updated with the data supplied.
 *
 * Why is this endpoint useful? If you're going to use an object creation API endpoint (such as create post), you may have to create the author's account before creating the post.
 *
 * Reference: https://developers.canny.io/api-reference#create_or_update_user
 * @param options The request options
 * @returns an object with a single key: id.
 */
export function createOrUpdateUser(options: CreateOrUpdateUserOptions) {
  return cannyRequest<CreateOrUpdateUserResponse>(
    "/users/create_or_update",
    options
  );
}

/**
 * Deletes a user. Also deletes all of their comments and votes.
 *
 * If their posts have other comments/votes, then they'll be removed as an author. If there are no other comments/votes, the post will be removed.
 *
 * Reference: https://developers.canny.io/api-reference#delete_user
 * @param id The unique identifier of the user.
 * @returns "success" if the user was successfully deleted.
 */
export function deleteUser(id: string) {
  return cannyRequest<void>("/users/delete", { id });
}
