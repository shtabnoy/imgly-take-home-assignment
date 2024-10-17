import { useQuery } from '@tanstack/react-query';
import TreeComponent from './components/Tree';
import { fetchNodes } from './api';

function App() {
  const {
    isLoading,
    data: nodes,
    error,
  } = useQuery<ImglyNode[]>({
    queryKey: ['nodes'],
    queryFn: fetchNodes,
  });

  if (isLoading) return <>Loading...</>;

  if (error) return <>Error: {error.message}</>;

  return <TreeComponent nodes={nodes} />;
}

export default App;
