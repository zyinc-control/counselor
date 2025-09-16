import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppRouter from '../components/Router';

// Mock navigate function
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Router Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders loading state initially', async () => {
    render(<AppRouter />);
    
    // Fixed: Use Testing Library query instead of direct DOM access
    const loadingElement = screen.getByText('Loading...');
    expect(loadingElement).toBeInTheDocument(); // Use Testing Library queries
    
    // Fixed: Single assertion in waitFor
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    // Move additional assertions outside waitFor
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  test('navigates to dashboard after loading', async () => {
    render(<AppRouter />);
    
    // Fixed: Single assertion in waitFor, no side effects
    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
    
    // Move side effects outside waitFor
    const homeElement = screen.getByText('Home');
    // Remove direct DOM access - not needed for this test
    expect(homeElement).toBeInTheDocument();
  });

  test('handles route changes correctly', async () => {
    render(<AppRouter />);
    
    // Fixed: Single assertion in waitFor
    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
    
    // Move side effects and additional assertions outside waitFor
    expect(mockNavigate).toHaveBeenCalled();
  });
});