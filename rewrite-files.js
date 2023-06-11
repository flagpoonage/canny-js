import { readdir, stat, rename } from "fs/promises";

async function getDirectoryListing(path) {
  const results = await readdir(path);

  const list = [];
  for (const item of results) {
    const p = `${path}/${item}`;
    const stats = await stat(p);
    list.push({
      path: p,
      stats,
    });
  }

  return list;
}

async function doRecursiveRename(dirPath) {
  console.log("Running", dirPath);
  const listing = await getDirectoryListing(dirPath);

  for (const item of listing) {
    if (item.stats.isDirectory()) {
      await doRecursiveRename(item.path);
    } else if (item.path.endsWith(".js")) {
      await rename(item.path, item.path.replace(/\.js$/, ".cjs"));
    } else if (item.path.endsWith(".d.ts")) {
      await rename(item.path, item.path.replace(/\.d\.ts$/, ".d.cts"));
    }
  }
}

doRecursiveRename("./lib/cjs");
