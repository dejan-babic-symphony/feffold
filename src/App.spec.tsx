import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('renders the Feffold text', () => {
    render(<App />);
    expect(screen.getByText('Feffold')).toBeInTheDocument();
  });
});
