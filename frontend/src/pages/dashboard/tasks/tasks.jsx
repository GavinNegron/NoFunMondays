// React
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

// Layout
import Navbar from '../../layout/navbar/navbar'
import Sidebar from '../../layout/sidebar/sidebar'

// Components
import TasksToDo from './components/tasksToDo/tasksToDo'
import Search from '../../components/base/search'
import EditTask from './components/edit-task/edit-task'
import LoadingScreen from '../../components/base/loading'

// Utilities
import loading from '../../../utilities/loading'; 

const DTasks = () => {
    const [loadingState, setLoadingState] = useState(true); 
  
    useEffect(() => {
      const handleLoading = async () => {
        await Promise.all([loading(['/css/tasks.module.css']), new Promise(resolve => setTimeout(resolve, 500))])
        setLoadingState(false);
      };
      
      handleLoading();
    });
  
    if (loadingState) {
      return <LoadingScreen />; 
    }

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
          <div className="dashboard__inner">
            <div className="dashboard__header">
              <span>Tasks</span>
            </div>
            <div className="dashboard__search">
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
