import { cannyRequest } from "../utils.js";
import type { Category } from "../types/category.js";

/**
 * Retrieves the details of an existing category, specified by its id.
 *
 * Reference: https://developers.canny.io/api-reference#retrieve_category
 * @param id The category's unique identifier.
 * @returns a category object, if a valid id was supplied.
 */
export function retrieveCategory(id: string) {
  return cannyRequest<Category>("/categories/retrieve", { id });
}

/**
 * Options for the {@link listCategories} API.
 */
export interface ListCategoriesOptions {
  /**
   * The id of the board you'd like to fetch categories for.
   */
  boardID?: string;
  /**
   * The number of categories you'd like to fetch. Defaults to 10 if not specified. Max of 10000.
   */
  limit?: number;
  /**
   * The number of categories you'd like to skip before starting to fetch. Defaults to 0 if not specified.
   */
  skip?: number;
}

/**
 * Response for the {@link listCategories} API.
 */
export interface ListCategoriesResponse {
  /**
   * List of categories
   */
  categories: Category[];
  /**
   * Specifies whether this query returns more categories than the limit.
   */
  hasMore: boolean;
}

/**
 * Returns a list of categories. Include parameters to specify board and pagination. Sorted by newest.
 *
 * Reference: https://developers.canny.io/api-reference#list_categories
 * @param options The request options
 * @returns A dictionary with a "categories" property that contains an array of tag objects. There's also a "hasMore" property that specifies whether this query returns more categories than the limit.
 */
export function listCategories(options: ListCategoriesOptions = {}) {
  return cannyRequest<ListCategoriesResponse>("/categories/list", {
    ...options,
  });
}

/**
 * Options for the {@link createCategory} API.
 */
export type CreateCategoryOptions = {
  /**
   * The id of the board you'd like to create the category for.
   */
  boardID: string;
  /**
   * The name of the category. Must be between 1 and 30 characters long.
   */
  name: string;
  /**
   * The id of the parent category.
   */
  parentID?: string;
  /**
   * Whether or not the admins will be subscribed to the category.
   */
  subscribeAdmins: boolean;
};

/**
 * Response for the {@link createCategory} API.
 */
export interface CreateCategoryResponse {
  id: string;
}

/**
 * Creates a new category.
 *
 * Reference: https://developers.canny.io/api-reference#create_category
 * @param options the request options
 * @returns an object with a single key: id
 */
export function createCategory(options: CreateCategoryOptions) {
  return cannyRequest<CreateCategoryResponse>("/categories/create", options);
}

/**
 * Deletes a category If the category does not have sub categories.
 *
 * Reference: https://developers.canny.io/api-reference#delete_category
 * @param id
 * @returns "success" if the category was successfully deleted.
 */
export function deleteCategory(id: string) {
  return cannyRequest<void>("/categories/delete", { id });
}
