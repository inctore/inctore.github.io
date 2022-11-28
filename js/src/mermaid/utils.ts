export function findMermaidNodes(): NodeListOf<HTMLElement> {
  const codeNodes = document.querySelectorAll<HTMLElement>(
    "code.language-mermaid"
  );
  return codeNodes;
}
