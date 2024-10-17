import { useQuery } from '@tanstack/react-query';
import TreeComponent from './components/Tree';
import { fetchNodes } from './api';
import Spinner from './components/Spinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const {
    isLoading,
    data: nodes,
    error,
  } = useQuery<ImglyNode[]>({
    queryKey: ['nodes'],
    queryFn: fetchNodes,
  });

  return (
    <>
      {isLoading && <Spinner absolute />}
      {error && <ErrorMessage message={error.message} />}
      {nodes && <TreeComponent nodes={nodes} />}
    </>
  );
}

export default App;
