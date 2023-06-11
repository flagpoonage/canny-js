# canny-js-api

API wrapper library for [canny.io](https://canny.io/)

## CJS and ESM

This documentation is written assuming that you will use ESM modules. However, CommonJS modules are supported. The difference in syntax is

**ESM**

```javascript
import { setApiKey } from "canny-js-api";
```

**CJS**

```javascript
const { setApiKey } = require("canny-js-api");
```

## Getting Started

To get started with the API, set your canny API Key

```javascript
import { setApiKey } from "canny-js-api";

setApiKey("thisismykey");
```

## API Call return values

All API calls return an async result value, which contains a `success` boolean. If the value of `success` is `true`, then the result also contains a `value` property which contains the body of the response from Canny. If the `success` value is false, then the result also contains an `error` property which is an instance of `Error`.

This library uses [`got`](https://www.npmjs.com/package/got) (or more specifically [`got-cjs`](https://www.npmjs.com/package/got-cjs)) to make web requests. If there is an error returned from the API, this should be wrapped in the `HTTPError` type from the `got` package. Any other error during the process will be returned as a `FailedFetchError`.

## API Methods

For the full API documentation, refer to the [Canny.io API Reference](https://developers.canny.io/api-reference).

### Retrieve Board

Reference: https://developers.canny.io/api-reference#retrieve_board

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.retrieveBoard("some-board-id");

  if (!result.success) {
    throw result.error;
  }

  console.log("Board", result.value);
})();
```

### List All Boards

Reference: https://developers.canny.io/api-reference#list_all_boards

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.listAllBoards();

  if (!result.success) {
    throw result.error;
  }

  console.log("Boards", result.value.boards);
})();
```

### Retrieve Category

Reference: https://developers.canny.io/api-reference#retrieve_category

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.retrieveCategory("some-category-id");

  if (!result.success) {
    throw result.error;
  }

  console.log("Category", result.value);
})();
```

### List Categories

Reference: https://developers.canny.io/api-reference#list_categories

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.listCategories({
    // Optional
    boardID: "some-board-id",
    limit: 100,
    skip: 10,
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("List of categories", result.value.categories);
  console.log("Has more categories", result.value.hasMore);
})();
```

### Create Category

Reference: https://developers.canny.io/api-reference#create_category

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.createCategory({
    // Required
    boardID: "some-board-id",
    name: "My New Category",
    subscribeAdmins: true,

    // Optional
    parentID: "some-parent-id",
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("New Category ID", result.value.id);
})();
```

### Delete Category

Reference: https://developers.canny.io/api-reference#delete_category

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.deleteCategory("some-category-id");

  if (!result.success) {
    throw result.error;
  }

  console.log("Success");
})();
```

### Create Changelog Entry

Reference: https://developers.canny.io/api-reference#create_entry

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.createChangelogEntry({
    // Required
    title: "new changelog entry",
    details: "the details of this entry",

    // Optional
    type: "new",
    published: false,
    scheduledFor: "2023-12-12T00:00:00.000Z",
    labelIDs: ["label1", "label2"],
    postIDs: ["post-id-1", "post-id-2"],
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("New Changelog Entry ID", result.value.id);
})();
```

### List Changelog Entries

Reference: https://developers.canny.io/api-reference#list_entries

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.listChangelogEntries({
    // Optional
    labelIDs: ["label1", "label2"],
    limit: 100,
    skip: 10,
    sort: "nonPublishedFirst",
    type: "new",
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("Changelog Entries", result.value.entries);
  console.log("Has more entries", result.value.hasMore);
})();
```

### Retrieve Comment

Reference: https://developers.canny.io/api-reference#retrieve_comment

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.listChangelogEntries("some-comment-id");

  if (!result.success) {
    throw result.error;
  }

  console.log("Comment", result.value);
})();
```

### List Comments

Reference: https://developers.canny.io/api-reference#list_comments

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.listComments({
    // Optional
    authorID: "some-author-id",
    boardID: "some-board-id",
    companyID: "some-company-id",
    limit: 100,
    postID: "some-post-id",
    skip: 10,
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("Comments", result.value.comments);
  console.log("Has more comments", result.value.hasMore);
})();
```

### Create Comment

Reference: https://developers.canny.io/api-reference#create_comment

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.createComment({
    // Required
    authorID: "some-author-id",
    postID: "some-post-id",
    value: "this is the actual comment",

    // Optional
    imageURLs: ["https://img.example.com/1.png"],
    internal: true,
    parentID: "some-parent-id",
    shouldNotifyVoters: false,
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("New Comment ID", result.value.id);
})();
```

### Delete Comment

Reference: https://developers.canny.io/api-reference#delete_comment

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.deleteComment("some-comment-id");

  if (!result.success) {
    throw result.error;
  }

  console.log("Success");
})();
```

### List Companies

Reference: https://developers.canny.io/api-reference#list_companies

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.listCompanies({
    // Optional
    search: "search string",
    segment: "example.com",
    limit: 100,
    skip: 10,
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("Companies", result.value.companies);
  console.log("Has more companies", result.value.hasMore);
})();
```

### Update Company

Reference: https://developers.canny.io/api-reference#update_company

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.updateCompany({
    // Required
    id: "some-company-id",
    name: "Company Name",

    // Optional
    created: "2023-01-01T00:00:00.000Z",
    customFields: {
      number: 1,
      string: "2",
      boolean: false,
    },
    monthlySpend: 400.3,
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("Company ID", result.value.id);
})();
```

### Delete Company

Reference: https://developers.canny.io/api-reference#delete_company

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.deleteCompany("some-company-id");

  if (!result.success) {
    throw result.error;
  }

  console.log("Success");
})();
```

### List Opportunities

Reference: https://developers.canny.io/api-reference#list_opportunities

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.listOpportunities({
    // Optional
    limit: 100,
    skip: 10,
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("Opportunities", result.value.opportunities);
  console.log("Has more opportunities", result.value.hasMore);
})();
```

### Retrieve Post

Reference: https://developers.canny.io/api-reference#list_posts

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

// By ID
(async function () {
  const result = await canny.retrievePost({
    // Required
    id: "some-post-id",
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("Post", result.value);
})();

// By URL Name
(async function () {
  const result = await canny.retrievePost({
    // Required
    boardID: "some-board-id",
    urlName: "example.com",
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("Post", result.value);
})();
```

### List Posts

Reference: https://developers.canny.io/api-reference#list_posts

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.listPosts({
    // Optional
    boardID: 'some-board-id',
    authorID: 'some-author-id',
    companyID: 'some-company-id',
    tagIDs: ['tag-1-id', 'tag-2-id']
    limit: 100,
    search: 'some search string',
    skip: 10,
    sort: 'newest',
    status: 'open,under,review,planned,in progress'
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("Posts", result.value.posts);
  console.log("Has more posts", result.value.hasMore);
})();
```

### Create Post

Reference: https://developers.canny.io/api-reference#create_post

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.createPost({
    // Required
    authorID: "some-author-id",
    boardID: "some-board-id",
    details: "the details of the post",
    title: "the title of the post",

    // Optional
    byID: "some-admin-id",
    categoryID: "some-category-id",
    eta: "12/2023",
    etaPublic: true,
    ownerID: "some-owner-id",
    imageURLs: ["https://img.example.com/1.png"],
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("New Post ID", result.value.id);
})();
```

### Change Post Category

Reference: https://developers.canny.io/api-reference#change_post_category

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.changePostCategory({
    // Required
    postID: "some-post-id",

    // Optional
    categoryID: "some-category-id", // Can be null to remove category
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("Updated Post", result.value);
})();
```

### Change Post Status

Reference: https://developers.canny.io/api-reference#change_post_status

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.changePostStatus({
    // Required
    changerID: "some-admin-id",
    postID: "some-post-id",
    shouldNotifyVoters: true,
    status: "open",
    commentValue: "a comment about this status change",
    commentImageURLs: ["https://img.example.com/1.png"],
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("Updated Post", result.value);
})();
```

### Add Post Tag

Reference: https://developers.canny.io/api-reference#add_tag

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.addPostTag({
    // Required
    postID: "some-post-id",
    tagID: "some-tag-id",
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("Updated Post", result.value);
})();
```

### Remove Post Tag

Reference: https://developers.canny.io/api-reference#remove_tag

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.removePostTag({
    // Required
    postID: "some-post-id",
    tagID: "some-tag-id",
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("Updated Post", result.value);
})();
```

### Update Post

Reference: https://developers.canny.io/api-reference#update_post

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.updatePost({
    // Required
    postID: "some-post-id",

    // Optional
    customFields: {
      number: 1,
      string: "2",
      boolean: false,
    },
    details: "the details of the post",
    eta: "12/2023",
    etaPublic: true,
    title: "The title of the post",
    imageURLs: ["https://img.example.com/1.png"],
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("Success");
})();
```

### List Status Changes

Reference: https://developers.canny.io/api-reference#list_status_changes

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.listStatusChanges({
    // Optional
    boardID: "some-board-id",
    limit: 100,
    skip: 10,
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("Status changes", result.value.statusChanges);
  console.log("Has more status changes", result.value.hasMore);
})();
```

### Retrieve Tag

Reference: https://developers.canny.io/api-reference#retrieve_tag

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

// By ID
(async function () {
  const result = await canny.retrieveTag("some-tag-id");

  if (!result.success) {
    throw result.error;
  }

  console.log("Tag", result.value);
})();
```

### List Tags

Reference: https://developers.canny.io/api-reference#create_tag

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.listTags({
    // Optional
    boardID: "some-board-id",
    limit: 100,
    skip: 10,
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("Tags", result.value.tags);
  console.log("Has more tags", result.value.hasMore);
})();
```

### Create Tag

Reference: https://developers.canny.io/api-reference#create_tag

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.createTag({
    // Required
    boardID: "some-board-id",
    name: "A tag name",
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("New Tag", result.value);
})();
```

### List Users

Reference: https://developers.canny.io/api-reference#list_users

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.listUsers({
    // Optional
    limit: 100,
    skip: 10,
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("Users", result.value);
})();
```

### Retrieve User

Reference: https://developers.canny.io/api-reference#retrieve_user

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

// By Email
(async function () {
  const result = await canny.retrieveUser({
    // Required
    email: "test@example.com",
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("User", result.value);
})();

// By ID
(async function () {
  const result = await canny.retrieveUser({
    // Required
    id: "some-user-id",
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("User", result.value);
})();

// By user ID
(async function () {
  const result = await canny.retrieveUser({
    // Required
    userID: "some-external-user-id",
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("User", result.value);
})();
```

### Create or Update User

Reference: https://developers.canny.io/api-reference#create_or_update_user

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.createOrUpdateUser({
    // Required
    userID: "some-user-id",
    name: 'Test Example'

    // Optional
    avatarURL: "https://img.example.com/1.png",
    companies: [
      {
        created: "2020-01-23T04:56:07.890Z",
        customFields: {
          field1: "value1",
          field2: "value2"
        },
        id: "company123",
        monthlySpend: 500.00,
        name: "company name"
      }
    ],
    created: '2023-01-01T00:00:00.000Z',
    customFields: {
      number: 1,
      string: '2',
      boolean: false
    },
    email: 'test@example.com'
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("Updated user ID", result.value.id);
})();
```

### Delete User

Reference: https://developers.canny.io/api-reference#delete_user

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.deleteUser("some-user-id");

  if (!result.success) {
    throw result.error;
  }

  console.log("Success");
})();
```

### Retrieve Vote

Reference: https://developers.canny.io/api-reference#retrieve_vote

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.retrieveVote("some-vote-id");

  if (!result.success) {
    throw result.error;
  }

  console.log("Vote", result.value);
})();
```

### List Votes

Reference: https://developers.canny.io/api-reference#list_votes

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.listVotes({
    // Optional
    boardID: "some-board-id",
    companyID: "some-company-id",
    limit: 100,
    postID: "some-post-id",
    skip: 10,
    userID: "some-user-id",
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("Votes", result.value.votes);
  console.log("Has more votes", result.value.hasMore);
})();
```

### Create Vote

Reference: https://developers.canny.io/api-reference#create_vote

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.createVote({
    // Required
    postID: "some-post-id",
    voterID: "some-user-id",

    // Optional
    byId: "some-user-id",
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("Success");
})();
```

### Delete vote

Reference: https://developers.canny.io/api-reference#delete_vote

```javascript
import * as canny from "canny-js-api";

canny.setApiKey("{MY_API_KEY}");

(async function () {
  const result = await canny.deleteVote({
    // Required
    postID: "some-post-id",
    voterID: "some-user-id",
  });

  if (!result.success) {
    throw result.error;
  }

  console.log("Success");
})();
```
