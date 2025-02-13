import React from 'react'
import Navbar from '@/components/layout/navbar'
import Sidebar from '@/components/layout/sidebar'
import Head from 'next/head';
import '../../../../public/css/dashboard.css'


function Settings() {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <Navbar />
      <main className="main db">
        <Sidebar />
        <div className="dashboard">
          <div className="dashboard__header">
            <span>Settings</span>
          </div>
          <div className="dashboard__grid container-fluid d-flex"></div>
        </div>
      </main>
    </>
  )
}

export default Settings