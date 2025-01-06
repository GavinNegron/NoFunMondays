import React from 'react'
import Navbar from '../../layout/navbar'
import Sidebar from '../../layout/sidebar'
import { Helmet } from 'react-helmet-async'

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
            <div className="tasks__grid container-fluid d-flex">
                <div className="tasks__grid-new">
                  <a href="#">
                    <i class="fa-solid fa-plus"></i> 
                    <span>Add New Task</span>
                  </a>
                </div>
            </div>
          </div>
            <div className="tasks__edit">
              <div className="tasks__edit-title">
                <span>Task: </span>
              </div>
            </div>
      </div>
    </main>
    </div>
   </>
  )
}

export default DTasks
