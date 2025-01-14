import React, { useEffect, useState } from 'react'
import Navbar from '../../layout/navbar/navbar'
import Sidebar from '../../layout/sidebar/sidebar'
import { Helmet } from 'react-helmet-async'
import TasksToDo from './layout/tasksToDo'
import Search from '../../templates/base/search'
import loading from '../../../utilities/loading'; 
import EditTask from './components/edit-task/edit-task'
import LoadingScreen from '../../templates/base/loading'

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
