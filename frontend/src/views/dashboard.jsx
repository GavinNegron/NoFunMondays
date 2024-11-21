import React from 'react';
import Navbar from './templates/navbar'
import Footer from './templates/footer'
import Sidebar from './templates/sidebar'

function Dashboard() {

  return (
    <>
    <Navbar />
    <main class="main db">
        <Sidebar />
        <div class="dashboard">
          <div class="dashboard__header">
              <span>Dashboard</span>
          </div>
         <div class="dashboard__grid container-fluid d-flex">
          <div class="col-5">
      
          </div>
          <div class="col-7">
      
          </div>
         </div>
      </div>
    </main>
    <Footer />
    </>
  );
}

export default Dashboard;