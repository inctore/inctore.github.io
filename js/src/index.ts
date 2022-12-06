import { findMermaidNodes } from "./mermaid/utils";

function convertMermaidIfExists() {
  const codeNodes = findMermaidNodes();
  if (codeNodes.length === 0) {
    return;
  }

  import("./mermaid/convertMermaidTag").then((obj) => {
    const convertMermaidTag = obj.default;
    convertMermaidTag(codeNodes);
  });
}

async function main() {
  addEventListener("load", convertMermaidIfExists);
}

main();
