import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  it('renders the App component', () => {
    const { getByText } = render(<App />);

    expect(getByText('Barebone home assignment')).toBeInTheDocument();
  });
});
