/**
 * Boards are the high-level objects where your users can post and vote on ideas for a specific topic, typically feature requests.
 *
 * Referennce: https://developers.canny.io/api-reference#board_object
 */
export interface Board {
  /**
   * A unique identifier for the board.
   */
  id: string;
  /**
   * Time at which the board was created, in ISO 8601 format.
   */
  created: string;
  /**
   * Whether or not the board is set as private in the administrative settings.
   */
  isPrivate: boolean;
  /**
   * The board's name.
   */
  name: string;
  /**
   * The number of non-deleted posts associated with the board. This number includes posts that are marked as closed or complete.
   */
  postCount: number;
  /**
   * Whether or not comments left on posts can be viewed by other end-users.
   */
  privateComments: boolean;
  /**
   * The URL to the board's page.
   */
  url: string;
}
