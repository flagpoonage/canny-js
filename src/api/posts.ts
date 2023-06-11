import { cannyRequest } from "../utils.js";
import type { Post } from "../types/post.js";

export type RetrievePostOptions =
  | {
      id: string;
    }
  | {
      boardID: string;
      urlName: string;
    };

export function retrievePost(options: RetrievePostOptions) {
  return cannyRequest<Post>("/posts/retrieve", options);
}

export type ListPostsOptions = {
  boardID?: string;
  authorID?: string;
  companyID?: string;
  tagIDs?: string[];
  limit?: number;
  search?: string;
  skip?: number;
  sort?:
    | "newest"
    | "oldest"
    | "relevance"
    | "score"
    | "statusChanged"
    | "trneding";
  status?: string;
};

export interface ListPostsResponse {
  posts: Post[];
  hasMore: boolean;
}

export function listPosts(options: ListPostsOptions = {}) {
  return cannyRequest<ListPostsResponse>("/posts/list", options);
}

export type CreatePostOptions = {
  authorID: string;
  boardID: string;
  byID?: string;
  categoryID?: string;
  customFields?: Record<string, unknown>;
  details: string;
  eta?: string;
  etaPublic?: string;
  title: string;
  ownerID?: string;
  imageURLs?: string[];
};

export interface CreatePostResponse {
  id: string;
}

export function createPost(options: CreatePostOptions) {
  return cannyRequest<CreatePostResponse>("/posts/create", options);
}

export type ChangePostCategoryOptions = {
  postID: string;
  categoryID?: string | null;
};

export function changePostCategory(options: ChangePostCategoryOptions) {
  return cannyRequest<Post>("/posts/change_category", options);
}

export type ChangePostStatusOptions = {
  changerID: string;
  postID: string;
  showNotifyVoters: boolean;
  status: string;
  commentValue: string;
  commentImageURLs: string[];
};

export function changePostStatus(options: ChangePostStatusOptions) {
  return cannyRequest<Post>("/posts/change_status", options);
}

export type AddPostTagOptions = {
  postID: string;
  tagID: string;
};

export function addPostTag(options: AddPostTagOptions) {
  return cannyRequest<Post>("/posts/add_tag", options);
}

export type RemovePostTagOptions = {
  postID: string;
  tagID: string;
};

export function removePostTag(options: RemovePostTagOptions) {
  return cannyRequest<Post>("/posts/remove_tag", options);
}

export type UpdatePostOptions = {
  postID: string;
  customFields?: Record<string, unknown>;
  details?: string;
  eta?: string;
  etaPublic?: string;
  title?: string;
  imageURLs?: string[];
};

export function updatePost(options: UpdatePostOptions) {
  return cannyRequest<void>("/posts/update", options);
}
