import type { Comment } from "./comment.js";
import type { Post } from "./post.js";
import type { User } from "./user.js";
/**
 * Posts can be assigned a status: open, under review, planned, in progress, complete, or closed.
 *
 * Reference: https://developers.canny.io/api-reference#status_change_object
 */
export interface StatusChange {
  /**
   * A unique identifier for the status change.
   */
  id: string;
  /**
   * The comment attached to this status change. Only imageURLs and value fields are included.
   */
  changeComment: Pick<Comment, "imageURLs" | "value"> | null;
  /**
   * The user who changed the status.
   */
  changer: User;
  /**
   * Time at which the status was changed, in ISO 8601 format.
   */
  created: string;
  /**
   * The post that had its status changed.
   */
  post: Post;
  /**
   * The status the post was changed to.
   */
  status: string;
}
