import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

// Mock global for fetch
Object.defineProperty(global, 'fetch', {
  writable: true,
  value: jest.fn(),
});

describe('AnalyticsDashboard Component', () => {
  const mockOnDataLoad = jest.fn();

  beforeEach(() => {
    mockOnDataLoad.mockClear();
  });

  test('displays loading state initially', async () => {
    render(<AnalyticsDashboard userId="123" onDataLoad={mockOnDataLoad} />);
    
    // Fixed: Use Testing Library query instead of direct DOM access
    const loadingElement = screen.getByTestId('loading');
    expect(loadingElement).toBeInTheDocument(); // Use Testing Library queries
    
    // Fixed: Single assertion in waitFor
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
    
    // Move additional assertions outside waitFor
    expect(screen.getByTestId('analytics-dashboard')).toBeInTheDocument();
    expect(mockOnDataLoad).toHaveBeenCalled();
  });

  test('renders analytics data correctly', async () => {
    render(<AnalyticsDashboard userId="123" />);

    await waitFor(() => {
      expect(screen.getByTestId('analytics-dashboard')).toBeInTheDocument();
    });
    
    // Fixed: Use Testing Library queries instead of direct DOM access
    expect(screen.getByTestId('analytics-item-1')).toBeInTheDocument();
    expect(screen.getByText('Views: 100')).toBeInTheDocument();
  });

  test('handles error state', async () => {
    // Mock fetch to throw an error
    (global.fetch as jest.Mock) = jest.fn().mockRejectedValue(new Error('API Error'));
    
    render(<AnalyticsDashboard userId="123" />);
    
    // Fixed: Single assertion in waitFor, no side effects
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
    
    // Move additional assertions outside waitFor
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(screen.getByText('Failed to load data')).toBeInTheDocument();
  });

  test('handles user interaction', async () => {
    render(<AnalyticsDashboard userId="123" />);

    await waitFor(() => {
      expect(screen.getByTestId('analytics-dashboard')).toBeInTheDocument();
    });
    
    // Fixed: Use Testing Library queries instead of direct DOM access
    const analyticsItem1 = screen.getByTestId('analytics-item-1');
    const analyticsItem2 = screen.getByTestId('analytics-item-2');
    
    expect(analyticsItem1).toBeInTheDocument();
    expect(analyticsItem2).toBeInTheDocument();
  });
});