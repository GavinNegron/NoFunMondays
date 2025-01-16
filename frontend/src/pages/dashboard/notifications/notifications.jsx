import React from 'react'
import Navbar from '../../layout/navbar/navbar'
import Sidebar from '../../layout/sidebar/sidebar'
import { Helmet } from 'react-helmet-async'

const DNotifications = () => {
  
  return (
   <>
    <Helmet>
    <title>Notifications</title>
  </Helmet>
    <div>
      <Navbar />
    <main className="main db">
        <Sidebar />
        <div className="dashboard">
          <div className="dashboard__header">
              <span>Notifications</span>
          </div>
         <div className="dashboard__grid container-fluid d-flex">
          
         </div>
      </div>
    </main>
    </div>
   </>
  )
}

export default DNotifications
