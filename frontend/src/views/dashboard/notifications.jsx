import React from 'react'
import Navbar from '../layout/navbar'
import Footer from '../layout/footer'
import Sidebar from '../layout/sidebar'
import { Helmet } from 'react-helmet-async'

const DNotifications = () => {
  
  return (
   <>
    <Helmet>
    <title>Notifications</title>
    <link rel="stylesheet" href="/css/dashboard.css" />
  </Helmet>
    <div>
      <link rel="stylesheet" href="/css/dashboard.css"></link>
      <Navbar />
    <main className="main db">
        <Sidebar />
        <div className="dashboard">
          <div className="dashboard__header">
              <span>Notifications</span>
          </div>
         <div className="dashboard__grid container-fluid d-flex">
          <div className="col-5">
      
          </div>
          <div className="col-7">
      
          </div>
         </div>
      </div>
    </main>
    </div>
   </>
  )
}

export default DNotifications
