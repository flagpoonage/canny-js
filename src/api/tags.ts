import { cannyRequest } from "../utils.js";
import type { Tag } from "../types/tag.js";

export function retrieveTag(id: string) {
  return cannyRequest<Tag>("/tags/retrieve", { id });
}

export type ListTagsOptions = {
  boardID?: string;
  limit?: number;
  skip?: number;
};

export interface ListTagsResponse {
  tags: Tag[];
  hasMore: boolean;
}

export function listTags(options: ListTagsOptions = {}) {
  return cannyRequest<ListTagsResponse>("/tags/list", options);
}

export type CreateTagOptions = {
  boardID: string;
  name: string;
};

export function createTag(options: CreateTagOptions) {
  return cannyRequest<Tag>("/tags/create", options);
}
