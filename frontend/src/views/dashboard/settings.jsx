import React from 'react'
import Navbar from '../layout/navbar'
import Footer from '../layout/footer'
import Sidebar from '../layout/sidebar'

const DSettings = () => {
  return (
    <div>
      <link rel="stylesheet" href="/css/dashboard.css"></link>
      <Navbar />
    <main className="main db">
        <Sidebar />
        <div className="dashboard">
          <div className="dashboard__header">
              <span>Dashboard</span>
          </div>
         <div className="dashboard__grid container-fluid d-flex">
          <div className="col-5">
      
          </div>
          <div className="col-7">
      
          </div>
         </div>
      </div>
    </main>
    <Footer />
    </div>
  )
}

export default DSettings
