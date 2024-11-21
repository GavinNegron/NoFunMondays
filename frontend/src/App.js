import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './views/templates/loading';
import Landing from './views/landing';
import Dashboard from './views/dashboard';
import NotFound from './views/404';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetching or initial loading
    const fetchData = async () => {
      try {
        // Fetch your data here if needed (e.g., posts or any initial setup)
        await new Promise(resolve => setTimeout(resolve, 3000)); // Simulated loading time
        setLoading(false);
      } catch (error) {
        console.error("Error during data fetching:", error);
        setLoading(false); // Handle errors gracefully
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
