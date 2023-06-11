import { cannyRequest } from "../utils.js";
import type { Board } from "../types/board.js";

/**
 * Retrieves the details of an existing board, specified by its ID.
 *
 * Reference: https://developers.canny.io/api-reference#retrieve_board
 * @param id The board's unique identifier
 * @returns A board object, if a valid ID was supplied
 */
export function retrieveBoard(id: string) {
  return cannyRequest<Board>("/boards/retrieve", { id });
}

/**
 * Returns a list of all boards associated with your company, in no particular order.
 *
 * Reference: https://developers.canny.io/api-reference#list_all_boards
 * @returns A dictionary with a "boards" property that contains an array of board objects.
 */
export function listAllBoards() {
  return cannyRequest<Board[]>("/boards/list");
}
