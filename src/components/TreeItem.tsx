import { NodeModel as TreeViewNode } from '@minoru/react-dnd-treeview';
import { useQuery } from '@tanstack/react-query';
import { fetchNodeInfo } from '../api';
import { useCallback } from 'react';

interface TreeItemProps {
  depth: number;
  node: TreeViewNode;
  highlightedNodes: string[];
  isOpen: boolean;
  onClick(node: TreeViewNode): void;
  onToggle(): void;
}

function TreeItem({
  depth,
  node,
  highlightedNodes,
  isOpen,
  onClick,
  onToggle,
}: TreeItemProps) {
  const { refetch, data } = useQuery({
    queryKey: ['nodeInfo', node.id],
    queryFn: () => fetchNodeInfo(node.id.toString()),
    enabled: false,
    retry: false,
  });

  const handleClick = useCallback(
    (node: TreeViewNode) => {
      onClick(node);

      if (!node.droppable && data === undefined) {
        refetch();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  return (
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
  );
}

export default TreeItem;
