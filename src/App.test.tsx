import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from './App';
import ThemeProvider from './contexts/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchNodes } from './api';

import mockNodes from './mocks/nodes';

jest.mock('./api', () => ({
  fetchNodes: jest.fn(),
}));

export function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  const { rerender, ...result } = render(
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </ThemeProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={queryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  };
}

describe('App', () => {
  it('renders Tree component with the successfully fetched data', async () => {
    (fetchNodes as jest.Mock).mockResolvedValue(mockNodes);
    const { findAllByRole, getByText } = renderWithProviders(<App />);

    expect(fetchNodes).toHaveBeenCalled();

    // The tree component is rendered as bunch of lists
    await findAllByRole('list');

    // Check that parent nodes are rendered correctly
    // Use regex to match the text content (cause it starts with •)
    expect(getByText(new RegExp(mockNodes[0].label))).toBeInTheDocument();
    expect(getByText(new RegExp(mockNodes[1].label))).toBeInTheDocument();
  });
});
