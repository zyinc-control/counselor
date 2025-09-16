import React, { useEffect, useState, useCallback } from 'react';

interface AnalyticsData {
  id: string;
  views: number;
  clicks: number;
}

interface AnalyticsDashboardProps {
  userId?: string;
  onDataLoad?: (data: AnalyticsData[]) => void;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ userId, onDataLoad }) => {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockData: AnalyticsData[] = [
        { id: '1', views: 100, clicks: 10 },
        { id: '2', views: 200, clicks: 20 },
      ];
      setData(mockData);
      if (onDataLoad) {
        onDataLoad(mockData);
      }
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [onDataLoad]); // Added missing dependency

  // Fixed: added missing dependencies
  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId, fetchData]); // Added missing dependencies

  if (loading) return <div data-testid="loading">Loading analytics...</div>;
  if (error) return <div data-testid="error">{error}</div>;

  return (
    <div data-testid="analytics-dashboard">
      <h2>Analytics Dashboard</h2>
      <div data-testid="analytics-list">
        {data.map(item => (
          <div key={item.id} data-testid={`analytics-item-${item.id}`}>
            <p>Views: {item.views}</p>
            <p>Clicks: {item.clicks}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;