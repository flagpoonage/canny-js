import type { Post } from "./post.js";
import type { Reactions } from "./reaction.js";

/**
 * A changelog is simply a list of entries.
 *
 * Reference: https://developers.canny.io/api-reference#entry_object
 */
export interface ChangelogEntry {
  /**
   * A changelog is simply a list of entries.
   */
  id: string;
  /**
   * Time at which the entry was first created, in ISO 8601 format.
   */
  created: string;
  /**
   * The list of labels that the entry is associated with.
   */
  labels: string[];
  /**
   * Time at which the entry was last updated, in ISO 8601 format.
   */
  lastSaved: string;
  /**
   * The markdown contents of the entry.
   */
  markdownDetails: string;
  /**
   * The plaintext contents of the entry, with images, videos, and links stripped.
   */
  plaintextDetails: string;
  /**
   * The list of posts this entry is linked to.
   */
  posts: Post[];
  /**
   * Time at which the entry was published, if it has been published.
   */
  publishedAt: string;
  /**
   * Time at which the entry is schedule to be published, if it is scheduled.
   */
  scheduledFor: string;
  /**
   * The number of reactions an entry has received.
   */
  reactions: Reactions;
  /**
   * The status of the entry, describing whether it has been published. Will be set to draft, scheduled, or published.
   */
  status: string;
  /**
   * The title of the entry.
   */
  title: string;
  /**
   * The list of types associated with the entry. Can include new, improved, or fixed.
   */
  types: string[];
  /**
   * The public URL to the entry page on Canny.
   */
  url: string;
}
