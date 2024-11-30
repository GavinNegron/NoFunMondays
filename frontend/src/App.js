import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'  // Import HelmetProvider
import Landing from './views/landing/landing'
import Dashboard from './views/dashboard/dashboard'
import DPosts from './views/dashboard/posts'
import DUsers from './views/dashboard/users'
import DNotifications from './views/dashboard/notifications'
import DTasks from './views/dashboard/tasks'
import DSettings from './views/dashboard/settings'
import NotFound from './views/404/404'
import BlogPost from './views/blog/blog-post'

function App() {
  return (
    <HelmetProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/posts" element={<DPosts />} />
          <Route path="/dashboard/users" element={<DUsers />} />
          <Route path="/dashboard/notifications" element={<DNotifications />} />
          <Route path="/dashboard/tasks" element={<DTasks />} />
          <Route path="/dashboard/settings" element={<DSettings />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </HelmetProvider>
  )
}

export default App
