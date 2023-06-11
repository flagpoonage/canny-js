import type { Board } from "./board.js";
import type { Post } from "./post.js";
import type { User } from "./user.js";

/**
 * Users can vote on posts. Admins can also vote on behalf of users. Vote objects are always associated with a post and a voter.
 *
 * Reference: https://developers.canny.io/api-reference#vote_object
 */
export interface Vote {
  /**
   * A unique identifier for the vote.
   */
  id: string;
  /**
   * The board this vote is associated with.
   */
  board: Board;
  /**
   * The admin who cast this vote on behalf of a user. If the user voted themselves, this field will be null.
   */
  by: User | null;
  /**
   * Time at which the vote was first cast, in ISO 8601 format.
   */
  created: string;
  /**
   * The post this vote is associated with.
   */
  post: Post;
  /**
   * The user this post is associated with.
   */
  voter: User;
}
