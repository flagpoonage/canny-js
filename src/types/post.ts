import type { Board } from "./board.js";
import type { Category } from "./category.js";
import type { User } from "./user.js";

/**
 * A clickup task that is linked with a post
 *
 * Derived from the examples in https://developers.canny.io/api-reference#post_object
 */
export interface PostLinkedClickupTask {
  id: string;
  linkId: string;
  name: string;
  postID: string;
  status: string;
  url: string;
}

/**
 * A JIRA issue that is linked with a post
 *
 * Derived from the examples in https://developers.canny.io/api-reference#post_object
 */
export interface PostLinkedJiraIssue {
  id: string;
  key: string;
  url: string;
}

/**
 * A post is an object that represents an idea posted to a board. They are always associated with a user and a board. Users can vote on them.
 *
 * Reference: https://developers.canny.io/api-reference#post_object
 */
export interface Post {
  /**
   * A unique identifier for the post.
   */
  id: string;
  /**
   * The user who authored the post. If the author's account has been deleted, this field will be null.
   */
  author: User | null;
  /**
   * The board this post is associated with.
   */
  board: Board;
  /**
   * The user who created the post on behalf of the author.
   */
  by: User | null;
  /**
   * The category this post is assigned to, if any.
   */
  category: Category | null;
  /**
   * The number of non-deleted comments associated with this post.
   */
  commentCount: number;
  /**
   * Time at which the post was created, in ISO 8601 format.
   */
  created: string;
  /**
   * A list of Clickup tasks that are linked with this post
   */
  clickup: {
    /**
     * A list of Clickup tasks that are linked with this post
     */
    linkedTasks: PostLinkedClickupTask[];
  };
  /**
   * Any details the user included in the post. This is the longer text field (where the shorter one is "title").
   */
  details: string;
  /**
   * The month and year the post is estimated to be delivered.
   */
  eta: string;
  /**
   * An array of the URLs of the images associated with this post
   */
  imageURLs: string[];
  /**
   * A list of Jira issues that are linked with this post
   */
  jira: {
    /**
     * A list of Jira issues that are linked with this post
     */
    linkedIssues: PostLinkedJiraIssue[];
  };
  /**
   * The owner of the post
   */
  owner: User;
  /**
   * The number of votes that have been cast on this post.
   */
  score: number;
  /**
   * The post's status: "open", "under review", "planned", "in progress", "complete", "closed", or any other status your team has set on the settings page.
   */
  status: string;
  /**
   * Time at which the post's status was last changed
   */
  statusChangedAt: string;
  /**
   * The list of tag objects associated with this post.
   */
  tags: string[];
  /**
   * A brief title describing the post. This is the shorter text input (where the longer is details).
   */
  title: string;
  /**
   * The URL to the post's page.
   */
  url: string;
}
