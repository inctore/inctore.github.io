import mermaid from "mermaid";

function convertMermaidTag() {
  mermaid.initialize({ startOnLoad: false });
  console.log("convertMermaidTag");

  const codeNodes = document.querySelectorAll<HTMLElement>(
    "code.language-mermaid"
  );
  codeNodes.forEach((codeNode, index) => {
    const pre = codeNode.parentNode; // これがreplaceされるやつ
    const parent = pre.parentNode;

    const child = document.createElement("div");
    child.id = `hotokuMermaidDiv-${index}`;
    const graph = mermaid.mermaidAPI.render(child.id, codeNode.textContent);
    child.innerHTML = graph;
    parent.replaceChild(child, pre);
  });
}

export default convertMermaidTag;
