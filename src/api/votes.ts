import { cannyRequest } from "../utils.js";
import type { Vote } from "../types/vote.js";

export function retrieveVote(id: string) {
  return cannyRequest<Vote>("/votes/retrieve", { id });
}

export type ListVotesOptions = {
  boardID?: string;
  companyID?: string;
  limit?: number;
  postID?: string;
  skip?: number;
  userID?: string;
};

export interface ListVotesResponse {
  votes: Vote[];
  hasMore: boolean;
}

export function listVotes(options: ListVotesOptions = {}) {
  return cannyRequest<ListVotesResponse>("/votes/list", options);
}

export type CreateVoteOptions = {
  byID?: string;
  postID: string;
  voterID: string;
};

export function createVote(options: CreateVoteOptions) {
  return cannyRequest<void>("/votes/create", options);
}

export type DeleteVoteOptions = {
  postID: string;
  voterID: string;
};

export function deleteVote(options: DeleteVoteOptions) {
  return cannyRequest<void>("/votes/delete", options);
}
