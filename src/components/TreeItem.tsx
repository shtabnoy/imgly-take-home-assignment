import { NodeModel as TreeViewNode } from '@minoru/react-dnd-treeview';

interface TreeItemProps {
  depth: number;
  node: TreeViewNode;
  highlightedNodes: string[];
  isOpen: boolean;
  handleClick(node: TreeViewNode): void;
  onToggle(): void;
}

function TreeItem({
  depth,
  node,
  highlightedNodes,
  isOpen,
  handleClick,
  onToggle,
}: TreeItemProps) {
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
