import type { Board } from "./board.js";

/**
 * Posts can be assigned categories. Each category is for a specific board, not company-wide.
 *
 * Reference: https://developers.canny.io/api-reference#category_object
 */
export interface Category {
  /**
   * A unique identifier for the category.
   */
  id: string;
  /**
   * The board this category is associated with.
   */
  board: Board;
  /**
   * Time at which the category was created, in ISO 8601 format.
   */
  created: string;
  /**
   * The name of the category.
   */
  name: string;
  /**
   * The id of the parent category. If this category is not a sub category, this field will be null.
   */
  parentID: string;
  /**
   * The number of posts that have been assigned this category.
   */
  postCount: number;
  /**
   * The URL to the board, filtered to just posts that have been assigned this category.
   */
  url: string;
}
