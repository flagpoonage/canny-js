import type { Board } from "./board.js";

/**
 * Posts can be assigned multiple tags. Each tag is for a specific board, not company-wide.
 *
 * Reference: https://developers.canny.io/api-reference#tag_object
 */
export interface Tag {
  /**
   * A unique identifier for the tag.
   */
  id: string;
  /**
   * The board this tag is associated with.
   */
  board: Board;
  /**
   * Time at which the tag was created, in ISO 8601 format.
   */
  created: string;
  /**
   * The name of the tag.
   */
  name: string;
  /**
   * The number of posts that have been assigned this tag.
   */
  postCount: number;
  /**
   * The URL to the board, filtered to just posts that have been assigned this tag.
   */
  url: string;
}
