import type { Board } from "./board";
import type { Post } from "./post";
import type { Reactions } from "./reaction";
import type { User } from "./user";

/**
 * Users and admins can leave comments on posts. Therefore, comment objects are always associated with a post.
 *
 * Reference: https://developers.canny.io/api-reference#comment_object
 */
export interface Comment {
  /**
   * A unique identifier for the comment.
   */
  id: string;
  /**
   * The user who created the comment.
   */
  author: User;
  /**
   * The board the comment is associated with.
   */
  board: Board;
  /**
   * Time at which the comment was created, in ISO 8601 format.
   */
  created: string;
  /**
   * An array of the URLs of the images associated with this comment.
   */
  imageURLs: string[];
  /**
   * Whether or not the comment is an internal comment.
   */
  internal: boolean;
  /**
   * The number of likes a comment has received.
   */
  likeCount: number;
  /**
   * An array of user objects who are mentioned in the comment.
   */
  mentions: User[];
  /**
   * The id of the comment that this comment is a reply to. If this comment is not a reply, this field will be null.
   */
  parentID: string | null;
  /**
   * The post the comment is associated with.
   */
  post: Post;
  /**
   * If the comment is private from other users, only applies if the "Allow end-users to see each others' comments" setting is disabled.
   */
  private: boolean;
  /**
   * The number of reactions a comment has received.
   */
  reactions: Reactions;
  /**
   * The text value of this comment.
   */
  value: string;
}
