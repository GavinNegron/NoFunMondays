import React from 'react'
import Navbar from '../../layout/navbar'
import Sidebar from '../../layout/sidebar'
import { Helmet } from 'react-helmet-async'
import TasksToDo from './layout/tasksToDo'
import Search from '../../templates/base/search'

const DTasks = () => {
  
  return (
   <>
    <Helmet>
    <title>Tasks</title>
    <link rel="stylesheet" href="/css/dashboard.css" />
  </Helmet>
    <div>
      <link rel="stylesheet" href="/css/dashboard.css"></link>
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
            <div className="tasks__grid container-fluid d-flex">
                <TasksToDo title='To-Do'/>
                <TasksToDo title='In Progress'/>
                <TasksToDo title='Completed'/>
            </div>
          </div>
      </div>
    </main>
    </div>
   </>
  )
}

export default DTasks
