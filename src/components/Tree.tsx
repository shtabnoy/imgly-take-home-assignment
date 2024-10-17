import { DndProvider } from 'react-dnd';

// MultiBackend is a backend to support both touch and pointer devices.
import {
  getBackendOptions,
  MultiBackend,
  NodeModel as ReactDndNode,
  Tree as ReactDndTree,
} from '@minoru/react-dnd-treeview';
import { useState } from 'react';

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

interface TreeComponentProps {
  nodes: ImglyNode[] | undefined;
}

function Tree({ nodes }: TreeComponentProps) {
  const initialData = transformToFlatStructure(nodes);

  const [treeData, setTreeData] = useState(initialData);
  const handleDrop = (newTreeData: ReactDndNode[]) => setTreeData(newTreeData);

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <ReactDndTree
        sort={false}
        initialOpen
        tree={treeData}
        rootId={'0'}
        onDrop={handleDrop}
        render={(node, { depth, isOpen, onToggle }) => (
          <div
            style={{ marginLeft: depth * 10 }}
            className="text-xl cursor-pointer hover:bg-gray-200"
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
