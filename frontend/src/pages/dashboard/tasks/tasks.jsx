import React, { useEffect, useState } from 'react'
import Navbar from '../../layout/navbar/navbar'
import Sidebar from '../../layout/sidebar/sidebar'
import { Helmet } from 'react-helmet-async'
import TasksToDo from './layout/tasksToDo'
import Search from '../../templates/base/search'
import preloadPageResources from '../../../utilities/loading'; 
import EditTask from './components/edit-task/edit-task'

const DTasks = () => {
    const [loadingState, setLoadingState] = useState(true); 
  
  useEffect(() => {
    const loadResources = async () => {
      const cssFiles = ['/css/tasks.module.css'];
      await preloadPageResources(cssFiles); 
      setLoadingState(false);
    };
    
    loadResources();
  },);
  return (
   <>
    <Helmet>
    <title>Tasks</title>
  </Helmet>
    <div>
      <Navbar />
    <main className="main db">
        <Sidebar />
        <div className="dashboard tasks">
          <div className="tasks__inner">
            <div className="dashboard__header">
              <span>Tasks</span>
            </div>
            <div className="tasks__search">
              <Search/>
            </div>
              <TasksToDo/>
          </div>
          <EditTask/>
      </div>
    </main>
    </div>
   </>
  )
}

export default DTasks
