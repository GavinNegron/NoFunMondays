// React
import React from 'react'

// Next.js
import Head from 'next/head'

// Layout
import Navbar from '../../../components/layout/navbar'
import Sidebar from '../../../components/layout/sidebar'

// Components
import TasksToDo from './components/tasksToDo/tasksToDo'
import EditTask from './components/edit-task/edit-task'

// Stylesheets
import '../../../../public/css/dashboard.css'
import '../../../../public/css/tasks.css'

const DTasks = () => {
  return (
   <>
    <Head>
      <title>Tasks</title>
      <meta name="description" content="Welcome to the landing page of our blog" />
    </Head>
    <div>
      <Navbar />
    <main className="main db">
        <Sidebar />
        <div className="dashboard tasks">
          <div className="dashboard__inner">
            <div className="dashboard__header">
              <span>Tasks</span>
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
