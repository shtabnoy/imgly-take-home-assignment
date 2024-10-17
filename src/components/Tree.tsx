import { DndProvider } from 'react-dnd';

// MultiBackend is a backend to support both touch and pointer devices.
import {
  getBackendOptions,
  MultiBackend,
  NodeModel as ReactDndNode,
  Tree as ReactDndTree,
} from '@minoru/react-dnd-treeview';
import { useCallback, useState } from 'react';
import {
  getDescendants,
  transformToFlatStructure,
  transformToRecursiveStructure,
} from '../utils';

interface TreeComponentProps {
  nodes: ImglyNode[] | undefined;
}

function Tree({ nodes }: TreeComponentProps) {
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);

  const initialData = transformToFlatStructure(nodes);
  const [treeData, setTreeData] = useState(initialData);

  const handleDrop = (newTreeData: ReactDndNode[]) => {
    console.log(transformToRecursiveStructure(newTreeData));
    setTreeData(newTreeData);
  };

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
