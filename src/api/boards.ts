import { cannyRequest } from "../utils.js";
import type { Board } from "../types/board.js";
import { DW as d } from "dealwith";

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

const retrieveBoardValidator = d.object().schema({
  id: d.string(),
});

retrieveBoard.validator = (v: unknown) => retrieveBoardValidator("", v);

/**
 * Response for the {@link listAllBoards} API.
 */
export interface ListAllBoardsResponse {
  /**
   * A list of board objects
   */
  boards: Board[];
}

/**
 * Returns a list of all boards associated with your company, in no particular order.
 *
 * Reference: https://developers.canny.io/api-reference#list_all_boards
 * @returns A dictionary with a "boards" property that contains an array of board objects.
 */
export function listAllBoards() {
  return cannyRequest<ListAllBoardsResponse>("/boards/list");
}

listAllBoards.validator = () => d.undefined()("", undefined);
