import React from 'react'
import Navbar from '@/components/layout/navbar'
import Sidebar from '@/components/layout/sidebar'
import Head from 'next/head';
import '../../../../public/css/dashboard.css'

function Notifications() {
  return (
    <>
      <Head>
        <title>Notifications</title>
      </Head>
      <Navbar />
      <main className="main db">
        <Sidebar />
        <div className="dashboard">
          <div className="dashboard__header">
            <span>Notifications</span>
          </div>
          <div className="dashboard__grid container-fluid d-flex"></div>
        </div>
      </main>
    </>
  )
}

export default Notifications