import React from 'react';
import Navbar from './templates/navbar'
import Footer from './templates/footer'
import Sidebar from './templates/sidebar'

function Dashboard() {

  return (
    <>
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
    </>
  );
}

export default Dashboard;