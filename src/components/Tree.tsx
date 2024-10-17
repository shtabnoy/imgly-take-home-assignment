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
import TreeItem from './TreeItem';

interface TreeComponentProps {
  nodes: ImglyNode[] | undefined;
}

function Tree({ nodes }: TreeComponentProps) {
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

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
        initialOpen
        sort={false}
        tree={treeData}
        rootId={'0'}
        classes={{
          root: 'p-10',
          dropTarget: 'bg-blue-400 dark:bg-green-800',
          draggingSource: 'opacity-30',
        }}
        onDrop={handleDrop}
        render={(node, { depth, isOpen, onToggle }) => (
          <TreeItem
            depth={depth}
            node={node}
            isOpen={isOpen}
            highlightedNodes={highlightedNodes}
            openAccordionId={openAccordionId}
            onClick={handleClick}
            onToggle={onToggle}
            setOpenAccordionId={setOpenAccordionId}
          />
        )}
      />
    </DndProvider>
  );
}

export default Tree;
