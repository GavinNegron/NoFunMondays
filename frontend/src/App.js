import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Loading from './views/templates/base/loading';
import Landing from './views/landing';
import Dashboard from './views/dashboard';
import DPosts from './views/dashboard/posts';
import DUsers from './views/dashboard/users';
import DNotifications from './views/dashboard/notifications';
import DTasks from './views/dashboard/tasks';
import DSettings from './views/dashboard/settings';
import NotFound from './views/404';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <RoutesWrapper loading={loading} setLoading={setLoading} />
    </Router>
  );
}

function RoutesWrapper({ loading, setLoading }) {
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 1000);
    return () => clearTimeout(timer);
  }, [location, setLoading]); 

  if (loading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/posts" element={<DPosts />} />
      <Route path="/dashboard/users" element={<DUsers />} />
      <Route path="/dashboard/notifications" element={<DNotifications />} />
      <Route path="/dashboard/tasks" element={<DTasks />} />
      <Route path="/dashboard/settings" element={<DSettings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
