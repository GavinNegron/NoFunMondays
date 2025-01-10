import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { EditorProvider } from './contexts/EditorContext' 
import { HelmetProvider } from 'react-helmet-async'  
import Landing from './pages/landing/landing'
import Dashboard from './pages/dashboard/dashboard/dashboard'
import DPosts from './pages/dashboard/posts/Posts'
import DUsers from './pages/dashboard/users/users'
import DNotifications from './pages/dashboard/notifications/notifications'
import DTasks from './pages/dashboard/tasks/tasks'
import DSettings from './pages/dashboard/settings/settings'
import NotFound from './pages/404/404'
import BlogPost from './pages/blog/blog-post'
import EditPost from './pages/dashboard/posts/edit-post/edit-post'

function App() {

  return (
    <HelmetProvider> 
      <Router>
        <EditorProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/posts" element={<DPosts />} />
            <Route path="/dashboard/users" element={<DUsers />} />
            <Route path="/dashboard/notifications" element={<DNotifications />} />
            <Route path="/dashboard/tasks" element={<DTasks />} />
            <Route path="/dashboard/settings" element={<DSettings />} />
            <Route path="/dashboard/posts/edit/:slug" element={<EditPost />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </EditorProvider>
      </Router>
    </HelmetProvider>
  )
}

export default App