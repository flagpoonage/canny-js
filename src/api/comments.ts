import { cannyRequest } from "../utils.js";
import { Comment } from "../types/comment.js";

/**
 * Retrieves the details of an existing comment, specified by its id.
 *
 * Reference: https://developers.canny.io/api-reference#retrieve_comment
 * @param id The comment's unique identifier.
 * @returns a comment object, if a valid id was supplied.
 */
export function retrieveComment(id: string) {
  return cannyRequest<Comment>("/comments/retrieve", { id });
}

/**
 * Options for the {@link listComments} API
 */
export type ListCommentsOptions = {
  /**
   * The id of the author you'd like to fetch comments for.
   */
  authorID?: string;
  /**
   * The id of the board you'd like to fetch comments for.
   */
  boardID?: string;
  /**
   * If specified, will only fetch posts created by users linked to the company with this custom identifier.
   */
  companyID?: string;
  /**
   * The number of comments you'd like to fetch. Defaults to 10 if not specified.
   */
  limit?: number;
  /**
   * The id of the post you'd like to fetch comments for.
   */
  postID?: string;
  /**
   * The number of comments you'd like to skip before starting to fetch. Defaults to 0 if not specified.
   */
  skip?: number;
};

/**
 * Response for the {@link listComments} API
 */
export interface ListCommentsResponse {
  /**
   * A list of comments
   */
  comments: Comment[];
  /**
   * Specifies whether this query returns more comments than the limit.
   */
  hasMore: boolean;
}

/**
 * Returns a list of comments. Include parameters to specify post, board, and pagination. Sorted by newest.
 *
 * Reference: https://developers.canny.io/api-reference#list_comments
 * @param options the request options
 * @returns A dictionary with a "comments" property that contains an array of comment objects.
 */
export function listComments(options: ListCommentsOptions = {}) {
  return cannyRequest<ListCommentsResponse>("/comments/list", options);
}

/**
 * Options for the {@link createComment} API
 */
export type CreateCommentOptions = {
  /**
   * The unique identifier of the comment's author.
   */
  authorID: string;
  /**
   * The unique identifier of the comment's post.
   */
  postID: string;
  /**
   * The comment value.
   */
  value: string;
  /**
   * An array of the URLs of comment's images.
   */
  imageURLs?: string[];
  /**
   * Whether this comment is only available for internal usage. Default is false.
   */
  internal?: boolean;
  /**
   * The unique identifier of the comment's parent, if this comment is a reply.
   */
  parentID?: string;
  /**
   * Whether this comment should be allowed to trigger email notifications. Default is false.
   */
  shouldNotifyVoters?: boolean;
};

/**
 * Response for the {@link createComment} API
 */
export interface CreateCommentResponse {
  id: string;
}

/**
 * Creates a new comment.
 *
 * Reference: https://developers.canny.io/api-reference#create_comment
 * @param options the request options
 * @returns An object with a single key: id.
 */
export function createComment(options: CreateCommentOptions) {
  return cannyRequest<CreateCommentResponse>("/comments/create", options);
}

/**
 * Deletes a comment.
 *
 * Reference: https://developers.canny.io/api-reference#delete_comment
 * @param commentID The unique identifier of the comment.
 * @returns "success" if the comment was successfully deleted.
 */
export function deleteComment(commentID: string) {
  return cannyRequest<void>("/comments/delete", { commentID });
}
