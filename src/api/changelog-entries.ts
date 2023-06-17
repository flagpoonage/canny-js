import { cannyRequest } from "../utils.js";
import {
  CHANGELOG_ENTRY_TYPES,
  ChangelogSortType,
  type ChangelogEntry,
  type ChangelogEntryType,
  CHANGELOG_SORT_TYPE,
} from "../types/changelog-entry.js";
import { ValidatorFunction, DW as d } from "dealwith";

/**
 * Options for the {@link createChangelogEntry} API
 */
export type CreateChangelogEntryOptions = {
  /**
   * The title of your changelog entry.
   */
  title: string;
  /**
   * The details of your changelog entry.
   */
  details: string;
  /**
   * The type of your changelog entry. Can be one of "fixed", "new", and "improved".
   */
  type?: ChangelogEntryType;
  /**
   * Whether you want to publish the changelog entry immediately or not. Default is false.
   */
  published?: boolean;
  /**
   * The date you want the changelog entry to be published, in ISO 8601 format.
   */
  scheduledFor?: string;
  /**
   * A list of labels to assign to your changelog entry. Each label must be between 1 and 30 characters long.
   */
  labelIDs?: string[];
  /**
   * A list of posts to link to your changelog entry.
   */
  postIDs?: string[];
};

/**
 * Response for the {@link createChangelogEntry} API.
 */
export interface CreateChangelogResponse {
  id: string;
}

/**
 * Creates and (optionally) publishes a new changelog entry.
 *
 * Reference: https://developers.canny.io/api-reference#create_entry
 * @param options the request options
 * @returns an object with a single key: id
 */
export function createChangelogEntry(options: CreateChangelogEntryOptions) {
  return cannyRequest<CreateChangelogResponse>("/entries/create", options);
}

const createChangelogEntryValidator = d
  .object()
  .schema<CreateChangelogEntryOptions>({
    postIDs: d.oneof(d.undefined(), d.array().items(d.string())),
    title: d.string(),
    details: d.string(),
    type: d.oneof(
      d.undefined(),
      d.string().allowed(...CHANGELOG_ENTRY_TYPES)
    ) as ValidatorFunction<ChangelogEntryType | undefined>,
    published: d.oneof(d.boolean(), d.undefined()),
    scheduledFor: d.oneof(d.string(), d.undefined()),
    labelIDs: d.oneof(d.undefined(), d.array().items(d.string())),
  });

createChangelogEntry.validator = (v: unknown) =>
  createChangelogEntryValidator("", v);

/**
 * Options for the {@link listChangelogEntries} API
 */
export type ListChangelogEntriesOptions = {
  /**
   * Fetch only entries with at least one of the labels in the array.
   */
  labelIDs?: string[];
  /**
   * The number of entries you'd like to fetch. Defaults to 10 if not specified.
   */
  limit?: number;
  /**
   * The number of entries you'd like to skip before starting to fetch. Defaults to 0 if not specified.
   */
  skip?: number;
  /**
   * The order in which the entries should be fetched. Defaults to `nonPublishedFirst` if not specified.
   */
  sort?: ChangelogSortType;
  /**
   * The type of entries to fetch.
   */
  type?: ChangelogEntryType;
};

/**
 * Response for the {@link listChangelogEntries} API
 */
export interface ListChangelogEntriesResponse {
  /**
   * List of changelog entries
   */
  entries: ChangelogEntry[];
  /**
   * Specifies whether this query returns more entries than the limit.
   */
  hasMore: boolean;
}

/**
 * Returns a list of changelog entries. Sorted by newest.
 *
 * Reference: https://developers.canny.io/api-reference#list_entries
 * @param options the request options
 * @returns A dictionary with a "entries" property that contains an array of entry objects.
 */
export function listChangelogEntries(
  options: ListChangelogEntriesOptions = {}
) {
  return cannyRequest<ListChangelogEntriesResponse>("/entries/list", options);
}

const listChangelogEntriesValidator = d
  .object()
  .schema<ListChangelogEntriesOptions>({
    limit: d.oneof(d.number(), d.undefined()),
    skip: d.oneof(d.number(), d.undefined()),
    type: d.oneof(
      d.undefined(),
      d.string().allowed(...CHANGELOG_ENTRY_TYPES)
    ) as ValidatorFunction<ChangelogEntryType | undefined>,
    sort: d.oneof(
      d.undefined(),
      d.string().allowed(...CHANGELOG_SORT_TYPE)
    ) as ValidatorFunction<ChangelogSortType | undefined>,
    labelIDs: d.oneof(d.undefined(), d.array().items(d.string())),
  });

listChangelogEntries.validator = (v: unknown) =>
  listChangelogEntriesValidator("", v);
