import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

interface RouterComponentProps {
  children: React.ReactNode;
}

const RouterComponent: React.FC<RouterComponentProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fixed: added missing dependencies in useEffect
  useEffect(() => {
    if (!isLoading) {
      navigate('/dashboard');
    }
  }, [isLoading, navigate]); // Added missing dependencies

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div>
      {isLoading ? <div>Loading...</div> : children}
    </div>
  );
};

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RouterComponent><div>Home</div></RouterComponent>} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;