import { NodeModel as ReactDndNode } from '@minoru/react-dnd-treeview';

// Transform the endpoint recursive structure to the fat structure that the Tree component expects.
export function transformToFlatStructure(nodes?: ImglyNode[]): ReactDndNode[] {
  if (!nodes) {
    return [];
  }

  const result: ReactDndNode[] = [];
  let idCounter = 1;

  function traverse(node: ImglyNode, parentId: number) {
    const currentId = idCounter++;
    const flatNode: ReactDndNode = {
      id: node.id ?? currentId.toString(),
      parent: parentId.toString(),
      text: node.label,
    };

    if (node.children && node.children.length > 0) {
      flatNode.droppable = true;
    }

    result.push(flatNode);

    if (node.children) {
      node.children.forEach((child) => traverse(child, currentId));
    }
  }

  nodes.forEach((node) => traverse(node, 0));
  return result;
}

// Transform back to the recursive structure to conform with the original data structure.
export function transformToRecursiveStructure(
  flatData: ReactDndNode[]
): ImglyNode[] {
  const idMap: { [key: string]: ImglyNode } = {};
  const rootNodes: ImglyNode[] = [];

  flatData.forEach((node) => {
    const dataEntry: ImglyNode = {
      id: node.id.toString(),
      label: node.text,
      children: [],
    };
    idMap[node.id] = dataEntry;
  });

  flatData.forEach((node) => {
    const dataEntry = idMap[node.id];
    if (node.parent === '0') {
      rootNodes.push(dataEntry);
    } else {
      const parent = idMap[node.parent];
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(dataEntry);
      }
    }
  });

  return rootNodes;
}

export function getDescendants(tree: ReactDndNode[], nodeId: string): string[] {
  const descendants: string[] = [];
  const stack: string[] = [nodeId];

  while (stack.length > 0) {
    const currentId = stack.pop()!;
    const children = tree.filter((node) => node.parent === currentId);

    children.forEach((child) => {
      descendants.push(child.id.toString());
      stack.push(child.id.toString());
    });
  }

  return descendants;
}
