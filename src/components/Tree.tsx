import { DndProvider } from 'react-dnd';

// MultiBackend is a backend to support both touch and pointer devices.
import {
  getBackendOptions,
  MultiBackend,
  NodeModel as ReactDndNode,
  Tree as ReactDndTree,
} from '@minoru/react-dnd-treeview';
import { useCallback, useState } from 'react';

// Transform the endpoint recursive structure to the fat structure that the Tree component expects.
function transformToFlatStructure(nodes?: ImglyNode[]): ReactDndNode[] {
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

function getDescendants(tree: ReactDndNode[], nodeId: string): string[] {
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

interface TreeComponentProps {
  nodes: ImglyNode[] | undefined;
}

function Tree({ nodes }: TreeComponentProps) {
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);

  const initialData = transformToFlatStructure(nodes);
  const [treeData, setTreeData] = useState(initialData);

  const handleDrop = (newTreeData: ReactDndNode[]) => setTreeData(newTreeData);

  const handleClick = useCallback(
    (node: ReactDndNode) => {
      const nodeId = node.id.toString();

      if (highlightedNodes.includes(nodeId) && highlightedNodes[0] === nodeId) {
        setHighlightedNodes([]);
        return;
      }

      const descendants = getDescendants(treeData, nodeId);
      setHighlightedNodes([nodeId, ...descendants]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [treeData]
  );

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <ReactDndTree
        sort={false}
        initialOpen
        tree={treeData}
        rootId={'0'}
        onDrop={handleDrop}
        classes={{
          root: 'p-10',
          dropTarget: 'bg-yellow-400',
          draggingSource: 'opacity-30',
        }}
        render={(node, { depth, isOpen, onToggle }) => (
          <div
            style={{ marginLeft: depth * 30 }}
            className={`text-xl cursor-pointer hover:bg-gray-200 ${
              highlightedNodes.includes(node.id.toString())
                ? 'bg-yellow-200'
                : 'bg-transparent'
            }`}
            onClick={() => handleClick(node)}
          >
            {node.droppable && (
              <span onClick={onToggle}>{isOpen ? '[-]' : '[+]'}</span>
            )}
            &#8226; {node.text}
          </div>
        )}
      />
    </DndProvider>
  );
}

export default Tree;
