import { cannyRequest } from "../utils.js";
import type { StatusChange } from "../types/status-change.js";

export type ListStatusChangesOptions = {
  boardID?: string;
  limit?: number;
  skip?: number;
};

export interface ListStatusChangesResponse {
  statusChanges: StatusChange[];
  hasMore: boolean;
}

export function listStatusChanges(options: ListStatusChangesOptions = {}) {
  return cannyRequest<ListStatusChangesResponse>(
    "/status_changes/list",
    options
  );
}
