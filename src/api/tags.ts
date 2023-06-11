import { cannyRequest } from "../utils.js";
import type { Tag } from "../types/tag.js";

/**
 * Retrieves the details of an existing tag, specified by its id.
 *
 * Reference: https://developers.canny.io/api-reference#retrieve_tag
 * @param id The tag's unique identifier.
 * @returns  a tag object, if a valid id was supplied.
 */
export function retrieveTag(id: string) {
  return cannyRequest<Tag>("/tags/retrieve", { id });
}

/**
 * Options for the {@link listTags} API
 */
export type ListTagsOptions = {
  /**
   * The id of the board you'd like to fetch tags for.
   */
  boardID?: string;
  /**
   * The number of tags you'd like to fetch. Defaults to 10 if not specified.
   */
  limit?: number;
  /**
   * The number of tags you'd like to skip before starting to fetch. Defaults to 0 if not specified.
   */
  skip?: number;
};

/**
 * Response for the {@link listTags} API
 */
export interface ListTagsResponse {
  /**
   * A list of tags
   */
  tags: Tag[];
  /**
   * Specifies whether this query returns more tags than the limit.
   */
  hasMore: boolean;
}

/**
 * Returns a list of tags. Include parameters to specify board and pagination. Sorted by newest.
 *
 * Reference: https://developers.canny.io/api-reference#list_tags
 * @param options The request options
 * @returns A dictionary with a "tags" property that contains an array of tag objects.
 */
export function listTags(options: ListTagsOptions = {}) {
  return cannyRequest<ListTagsResponse>("/tags/list", options);
}

/**
 * Options for the {@link createTag} API
 */
export type CreateTagOptions = {
  /**
   * The unique identifier of the board the tag should be created for.
   */
  boardID: string;
  /**
   * The name of the tag. Must be between 1 and 30 characters long.
   */
  name: string;
};

/**
 * Creates a new tag.
 *
 * Reference: https://developers.canny.io/api-reference#create_tag
 * @param options The request options
 * @returns the tag object, if it was successfully created or already exists.
 */
export function createTag(options: CreateTagOptions) {
  return cannyRequest<Tag>("/tags/create", options);
}
