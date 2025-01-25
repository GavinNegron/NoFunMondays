// React
import React from 'react'

// Next.js
import Head from 'next/head'

// Layout
import Navbar from '../../layout/navbar/navbar'
import Sidebar from '../../layout/sidebar'

// Components
import TasksToDo from './components/tasksToDo/tasksToDo'
import Search from '../../../components/base/search'
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
      <script async src="https://kit.fontawesome.com/5ee52856b3.js" crossOrigin="anonymous"></script>
      <script defer src="https://code.jquery.com/jquery-3.7.1.min.js" type="module"></script>
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
