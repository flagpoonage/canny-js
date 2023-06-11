import { cannyRequest } from "../utils.js";
import type { Vote } from "../types/vote.js";

/**
 * Retrieves the details of an existing vote, specified by its id.
 *
 * Reference: https://developers.canny.io/api-reference#retrieve_vote
 * @param id The vote's unique identifier.
 * @returns a vote object, if a valid id was supplied.
 */
export function retrieveVote(id: string) {
  return cannyRequest<Vote>("/votes/retrieve", { id });
}

/**
 * Options for the {@link listVotes} API.
 */
export type ListVotesOptions = {
  /**
   * The id of the board you'd like to fetch votes for.
   */
  boardID?: string;
  /**
   * If specified, will only fetch posts created by users linked to the company with this custom identifier.
   */
  companyID?: string;
  /**
   * The number of votes you'd like to fetch. Defaults to 10 if not specified.
   */
  limit?: number;
  /**
   * Specify a postID to only fetch votes for a specific post.
   */
  postID?: string;
  /**
   * The number of votes you'd like to skip before starting to fetch. Defaults to 0 if not specified.
   */
  skip?: number;
  /**
   * Specify a userID to only fetch votes for a specific user.
   */
  userID?: string;
};

/**
 * Response for the {@link listVotes} API
 */
export interface ListVotesResponse {
  /**
   * A list of votes
   */
  votes: Vote[];
  /**
   * Specifies whether this query returns more votes than the limit.
   */
  hasMore: boolean;
}

/**
 * Returns a list of votes. Include parameters to specify post, board, and pagination. Sorted by newest.
 *
 * Reference: https://developers.canny.io/api-reference#list_votes
 * @param options The request options
 * @returns A dictionary with a "votes" property that contains an array of vote objects.
 */
export function listVotes(options: ListVotesOptions = {}) {
  return cannyRequest<ListVotesResponse>("/votes/list", options);
}

/**
 * Options for the {@link createVote} API
 */
export type CreateVoteOptions = {
  /**
   * The unique identifier of the user who cast the vote on behalf of the voter. Must be a Canny administrator.
   */
  byID?: string;
  /**
   * The unique identifier of the post to vote on.
   */
  postID: string;
  /**
   * The unique identifier of the voter.
   */
  voterID: string;
};

/**
 * Creates a new vote.
 *
 * Reference: https://developers.canny.io/api-reference#create_vote
 * @param options the request options
 * @returns "success" if the vote was successfully created or already exists.
 */
export function createVote(options: CreateVoteOptions) {
  return cannyRequest<void>("/votes/create", options);
}

/**
 * Options for the {@link deleteVote} API
 */
export type DeleteVoteOptions = {
  /**
   * The unique identifier of the post to vote on.
   */
  postID: string;
  /**
   * The unique identifier of the voter.
   */
  voterID: string;
};

/**
 * Deletes a vote.
 *
 * Reference: https://developers.canny.io/api-reference#delete_vote
 * @param options The request options
 * @returns  "success" if the vote was successfully deleted, or already doesn't exist.
 */
export function deleteVote(options: DeleteVoteOptions) {
  return cannyRequest<void>("/votes/delete", options);
}
