import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './views/landing';
import Dashboard from './views/dashboard';
import NotFound from './views/404';

function App() {
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