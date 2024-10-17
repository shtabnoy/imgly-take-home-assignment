import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProvider from './contexts/ThemeProvider';
import { fetchNodes, fetchNodeInfo } from './api';
import App from './App';

import mockNodes from './mocks/nodes';
import mockNodeInfo from './mocks/nodeInfo';

jest.mock('./api', () => ({
  fetchNodes: jest.fn(),
  fetchNodeInfo: jest.fn(),
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

  it('fails to render Tree component when data fetched with an error', async () => {
    (fetchNodes as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch data')
    );

    const { queryByText } = renderWithProviders(<App />);

    expect(fetchNodes).toHaveBeenCalled();

    await screen.findByText('Failed to fetch data');

    expect(queryByText(new RegExp(mockNodes[0].label))).not.toBeInTheDocument();
    expect(queryByText(new RegExp(mockNodes[1].label))).not.toBeInTheDocument();
  });

  it('fetches data entry when clicked on a node leaf', async () => {
    (fetchNodes as jest.Mock).mockResolvedValue(mockNodes);
    (fetchNodeInfo as jest.Mock).mockResolvedValue(mockNodeInfo);

    const { findByTestId, getByText } = renderWithProviders(<App />);

    expect(fetchNodes).toHaveBeenCalled();

    const leafNode = await findByTestId(
      mockNodes[0].children[0].children[0].id!
    );

    await userEvent.click(leafNode);

    expect(fetchNodeInfo).toHaveBeenCalled();

    // Check that the data entry is rendered
    expect(getByText(mockNodeInfo.id)).toBeInTheDocument();
    expect(getByText(mockNodeInfo.createdAt)).toBeInTheDocument();
    expect(getByText(mockNodeInfo.createdBy)).toBeInTheDocument();
    expect(getByText(mockNodeInfo.lastModifiedAt)).toBeInTheDocument();
    expect(getByText(mockNodeInfo.lastModifiedBy)).toBeInTheDocument();
    expect(getByText(mockNodeInfo.description)).toBeInTheDocument();
  });

  it('fails to render data entry when data fetched with an error', async () => {
    (fetchNodes as jest.Mock).mockResolvedValue(mockNodes);
    (fetchNodeInfo as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch data entry')
    );

    const { findByTestId, queryByText } = renderWithProviders(<App />);

    expect(fetchNodes).toHaveBeenCalled();

    const leafNode = await findByTestId(
      mockNodes[0].children[0].children[0].id!
    );

    await userEvent.click(leafNode);

    expect(fetchNodeInfo).toHaveBeenCalled();

    // Check that the error message is rendered
    await screen.findByText('Failed to fetch data entry');

    // Check that the data entry is not rendered
    expect(queryByText(mockNodeInfo.id)).not.toBeInTheDocument();
  });

  it('toggles the theme when the theme toggle button is clicked', async () => {
    const { findByLabelText } = renderWithProviders(<App />);

    const themeToggle = await findByLabelText('Toggle theme');

    expect(document.documentElement).toHaveClass('light');

    userEvent.click(themeToggle);

    await waitFor(() => {
      expect(document.documentElement).toHaveClass('dark');
    });

    userEvent.click(themeToggle);

    await waitFor(() => {
      expect(document.documentElement).toHaveClass('light');
    });
  });
});
