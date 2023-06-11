import * as canny from "./lib/esm/index.js";

async function go() {
  const results = await canny.listAllBoards();

  console.log("Result", results);
}

go();
