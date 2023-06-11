import * as env from "../env.js";
import * as boards from "./boards.js";
import * as categories from "./categories.js";
import * as changelogEntries from "./changelog-entries.js";
import * as comments from "./comments.js";
import * as companies from "./companies.js";
import * as opportunities from "./opportunities.js";
import * as posts from "./posts.js";
import * as statusChanges from "./status-changes.js";
import * as tags from "./tags.js";
import * as users from "./users.js";
import * as votes from "./votes.js";

export const canny = {
  ...env,
  ...boards,
  ...categories,
  ...changelogEntries,
  ...comments,
  ...companies,
  ...opportunities,
  ...posts,
  ...statusChanges,
  ...tags,
  ...users,
  ...votes,
};
