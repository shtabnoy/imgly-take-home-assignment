import { NodeModel as TreeViewNode } from '@minoru/react-dnd-treeview';
import { useQuery } from '@tanstack/react-query';
import { fetchNodeInfo } from '../api';
import { useCallback, useMemo } from 'react';
import Accordion from './Accordion';

interface TreeItemProps {
  depth: number;
  node: TreeViewNode;
  highlightedNodes: string[];
  isOpen: boolean;
  openAccordionId: string | null;
  onClick(node: TreeViewNode): void;
  onToggle(): void;
  setOpenAccordionId: (id: string | null) => void;
}

function TreeItem({
  depth,
  node,
  highlightedNodes,
  isOpen,
  openAccordionId,
  onClick,
  onToggle,
  setOpenAccordionId,
}: TreeItemProps) {
  const { refetch, data } = useQuery({
    queryKey: ['nodeInfo', node.id],
    queryFn: () => fetchNodeInfo(node.id.toString()),
    enabled: false,
    retry: false,
  });

  const isAccordionOpen = useMemo(
    () => openAccordionId === node.id.toString(),
    [node.id, openAccordionId]
  );

  const handleClick = useCallback(
    (node: TreeViewNode) => {
      onClick(node);

      if (!node.droppable && data === undefined) {
        refetch();
      }

      setOpenAccordionId(isAccordionOpen ? null : node.id.toString());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, isAccordionOpen]
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
      <div className="flex items-center">
        {node.droppable && (
          <span onClick={onToggle}>{isOpen ? '[-]' : '[+]'}</span>
        )}
        &#8226; {node.text}
      </div>
      {data && isAccordionOpen && (
        <Accordion>
          <dl className="space-y-2">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="flex">
                <dt className="font-semibold">{key}:</dt>
                <dd className="ml-2">{String(value)}</dd>
              </div>
            ))}
          </dl>
        </Accordion>
      )}
    </div>
  );
}

export default TreeItem;
