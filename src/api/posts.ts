import { cannyRequest } from "../utils.js";
import type { Post, PostsSortType } from "../types/post.js";

/**
 * Options for the {@link retrievePost} API
 */
export type RetrievePostOptions =
  | {
      /**
       * The post's unique identifier.
       */
      id: string;
    }
  | {
      /**
       * The board that the post belongs to. Only required if fetching by urlName.
       */
      boardID: string;
      /**
       * The post's unique urlName.
       */
      urlName: string;
    };

/**
 * Retrieves the details of an existing post, specified by its id or urlName.
 *
 * Reference: https://developers.canny.io/api-reference#retrieve_post
 * @param options The request options
 * @returns a post object, if a valid id was supplied.
 */
export function retrievePost(options: RetrievePostOptions) {
  return cannyRequest<Post>("/posts/retrieve", options);
}

/**
 * Options for the {@link listPosts} API
 */
export type ListPostsOptions = {
  /**
   * The id of the board you'd like to fetch posts for.
   */
  boardID?: string;
  /**
   * If specified, will only fetch posts by the author with this id.
   */
  authorID?: string;
  /**
   * If specified, will only fetch posts created by users linked to the company with this custom identifier.
   */
  companyID?: string;
  /**
   * If specified, will only fetch posts tagged with at least one of the tags in the array.
   */
  tagIDs?: string[];
  /**
   * The number of posts you'd like to fetch. Defaults to 10 if not specified.
   */
  limit?: number;
  /**
   * If specified, will only fetch posts that match your search query.
   */
  search?: string;
  /**
   * The number of posts you'd like to skip before starting to fetch. Defaults to 0 if not specified.
   */
  skip?: number;
  /**
   * The order in which the posts should be fetched. Options include: "newest", "oldest", "relevance", "score", "statusChanged", "trending". Defaults to "newest" if not specified. The "relevance" sort can only be specified if a search value has been specified.
   */
  sort?: PostsSortType;
  /**
   * A comma separated list of statuses. Only posts with these statuses will be fetched. Defaults to "open,under review,planned,in progress" if not specified.
   */
  status?: string;
};

/**
 * Response for the {@link listPosts} API
 */
export interface ListPostsResponse {
  /**
   * A list of posts
   */
  posts: Post[];
  /**
   * Specifies whether this query returns more posts than the limit.
   */
  hasMore: boolean;
}

/**
 * Returns a list of posts. Include parameters to specify board, pagination, filtering, and sorting.
 *
 * Reference: https://developers.canny.io/api-reference#list_posts
 * @param options Ther request options
 * @returns A dictionary with a "posts" property that contains an array of post objects.
 */
export function listPosts(options: ListPostsOptions = {}) {
  return cannyRequest<ListPostsResponse>("/posts/list", options);
}

/**
 * Options for the {@link createPost} API
 */
export type CreatePostOptions = {
  /**
   * The unique identifier of the post's author.
   */
  authorID: string;
  /**
   * The unique identifier of the post's board.
   */
  boardID: string;
  /**
   * The identifier of the admin who creates the post on behalf of the author. This will be visible in the post.
   */
  byID?: string;
  /**
   * The unique identifier of the post's category or subcategory.
   */
  categoryID?: string;
  /**
   * Any custom fields associated with the post. Each field name (key) must be between 0 and 30 characters long. If field values are strings, they must be less than 200 characters long.
   */
  customFields?: Record<string, unknown>;
  /**
   * The post details.
   */
  details: string;
  /**
   * The estimated date of the post's completion. In the format of MM/YYYY, eg, 06/2022.
   */
  eta?: string;
  /**
   * If the ETA should be made visible to all users.
   */
  etaPublic?: string;
  /**
   * The post title.
   */
  title: string;
  /**
   * The ID of the user responsible for the completion of the work described in the post.
   */
  ownerID?: string;
  /**
   * An array of the URLs of post's images.
   */
  imageURLs?: string[];
};

/**
 * Response for the {@link createPost} API
 */
export interface CreatePostResponse {
  /**
   * The ID of the created post
   */
  id: string;
}

/**
 * Creates a new post.
 *
 * Reference: https://developers.canny.io/api-reference#create_post
 * @param options The request options
 * @returns an object with a single key: id.
 */
export function createPost(options: CreatePostOptions) {
  return cannyRequest<CreatePostResponse>("/posts/create", options);
}

/**
 * Options for the {@link changePostCategory} API
 */
export type ChangePostCategoryOptions = {
  /**
   * The post's unique identifier.
   */
  postID: string;
  /**
   * The category's unique identifier. Setting it to "null" removes the category of the post.
   */
  categoryID?: string | null;
};

/**
 * Changes a post's category specified by its id.
 *
 * Reference: https://developers.canny.io/api-reference#change_post_category
 * @param options The request options
 * @returns  the updated post if the post's category was successfully changed.
 */
export function changePostCategory(options: ChangePostCategoryOptions) {
  return cannyRequest<Post>("/posts/change_category", options);
}

/**
 * Options for the {@link changePostStatus} API
 */
export type ChangePostStatusOptions = {
  /**
   * The identifier of the admin to record as having changed the post's status. This will be visible in the post's activity section.
   */
  changerID: string;
  /**
   * The post's unique identifier.
   */
  postID: string;
  /**
   * Whether or not to notify non-admin voters of the status change.
   */
  showNotifyVoters: boolean;
  /**
   * The status to change the post to. Options include: "open", "under review", "planned", "in progress", "complete", "closed", or any other status your team has set on the settings page.
   */
  status: string;
  /**
   * The comment attached to this status change.
   */
  commentValue: string;
  /**
   * An array of the URLs of the images associated with this status change.
   */
  commentImageURLs: string[];
};

/**
 * Changes a post's status (eg. to 'planned'), specified by its id.
 *
 * Reference: https://developers.canny.io/api-reference#change_post_status
 * @param options The request options
 * @returns the updated post if the post's status was successfully changed.
 */
export function changePostStatus(options: ChangePostStatusOptions) {
  return cannyRequest<Post>("/posts/change_status", options);
}

/**
 * Options for the {@link addPostTag} API
 */
export type AddPostTagOptions = {
  /**
   * The post's unique identifier.
   */
  postID: string;
  /**
   * The tag's unique identifier.
   */
  tagID: string;
};

/**
 * Adds a tag to a post. Both post and tag are specified by their unique id.
 *
 * Reference: https://developers.canny.io/api-reference#add_tag
 * @param options The request options
 * @returns the updated post if the tag was successfully added.
 */
export function addPostTag(options: AddPostTagOptions) {
  return cannyRequest<Post>("/posts/add_tag", options);
}

/**
 * Options for the {@link removePostTag} API
 */
export type RemovePostTagOptions = {
  /**
   * The post's unique identifier.
   */
  postID: string;
  /**
   * The tag's unique identifier.
   */
  tagID: string;
};

/**
 * Removes a tag from a post. Both post and tag are specified by their unique id.
 *
 * Reference: https://developers.canny.io/api-reference#remove_tag
 * @param options The request options
 * @returns the updated post if the tag was successfully remove.
 */
export function removePostTag(options: RemovePostTagOptions) {
  return cannyRequest<Post>("/posts/remove_tag", options);
}

/**
 * Options for the {@link updatePost} API
 */
export type UpdatePostOptions = {
  /**
   * The unique identifier of the post.
   */
  postID: string;
  /**
   * Any custom fields associated with the post. Each field name (key) must be between 0 and 30 characters long. If field values are strings, they must be less than 200 characters long.
   */
  customFields?: Record<string, unknown>;
  /**
   * The post details.
   */
  details?: string;
  /**
   * The estimated date of the post's completion. In the format of MM/YYYY, eg, 06/2022.
   */
  eta?: string;
  /**
   * If the ETA should be made visible to all users.
   */
  etaPublic?: string;
  /**
   * The post title.
   */
  title?: string;
  /**
   * An array of the URLs of post's images.
   */
  imageURLs?: string[];
};

/**
 * Updates an existing post.
 *
 * Reference: https://developers.canny.io/api-reference#update_post
 * @param options The request options
 * @returns "success" if the post was updated successfully.
 */
export function updatePost(options: UpdatePostOptions) {
  return cannyRequest<void>("/posts/update", options);
}
