import mermaid from "mermaid";

function convertMermaidTag(codeNodes: NodeListOf<HTMLElement>) {
  mermaid.initialize({ startOnLoad: false });

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
