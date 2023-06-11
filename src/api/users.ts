import { cannyRequest } from "../utils.js";
import type { Company } from "../types/company.js";
import type { User } from "../types/user.js";

export type ListUsersOptions = {
  limit?: number;
  skip?: number;
};

export function listUsers(options: ListUsersOptions = {}) {
  return cannyRequest<User[]>("/users/list", options);
}

export type RetrieveUserOptions = {
  email?: string;
  id?: string;
  userID?: string;
};

export function retrieveUser(options: RetrieveUserOptions) {
  return cannyRequest<User>("/users/retrieve", options);
}

export type CreateOrUpdateUserOptions = {
  avatarURL?: string;
  companies?: Company[];
  created?: string;
  customFields?: Record<string, unknown>;
  email?: string;
  name: string;
  userID: string;
};

export interface CreateOrUpdateUserResponse {
  id: string;
}

export function createOrUpdateUser(options: CreateOrUpdateUserOptions) {
  return cannyRequest<CreateOrUpdateUserResponse>(
    "/users/create_or_update",
    options
  );
}

export function deleteUser(id: string) {
  return cannyRequest<void>("/users/delete", { id });
}
