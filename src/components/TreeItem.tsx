import { NodeModel as TreeViewNode } from '@minoru/react-dnd-treeview';
import { useQuery } from '@tanstack/react-query';
import { fetchNodeInfo } from '../api';
import { useCallback, useMemo } from 'react';
import Accordion from './Accordion';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

interface TreeItemProps {
  depth: number;
  node: TreeViewNode;
  highlightedNodes: string[];
  openAccordionId: string | null;
  onClick(node: TreeViewNode): void;
  setOpenAccordionId: (id: string | null) => void;
}

function TreeItem({
  depth,
  node,
  highlightedNodes,
  openAccordionId,
  onClick,
  setOpenAccordionId,
}: TreeItemProps) {
  const { refetch, data, isLoading, error } = useQuery({
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
      data-testid={node.id}
      style={{ marginLeft: depth * 30 }}
      className={`text-xl p-2 cursor-pointer hover:bg-blue-200 dark:hover:bg-green-600 ${
        highlightedNodes.includes(node.id.toString())
          ? 'bg-blue-300 dark:bg-green-700'
          : 'bg-transparent'
      }`}
      onClick={() => handleClick(node)}
    >
      <div className="flex items-center">
        &#8226; {node.text}
        {isLoading && <Spinner />}
      </div>
      {error && <ErrorMessage message={error.message} />}
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
