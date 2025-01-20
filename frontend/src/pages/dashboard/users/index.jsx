import React from 'react'
import Navbar from '../../layout/navbar/navbar'
import Sidebar from '../../layout/sidebar/sidebar'
import Head from 'next/head';
import '../../../../public/css/dashboard.css'

function Users() {
  return (
    <>
      <Head>
        <title>Users</title>
        <script defer src="https://code.jquery.com/jquery-3.7.1.min.js" type="module"></script>
        <script async src="https://kit.fontawesome.com/5ee52856b3.js" crossOrigin="anonymous"></script>
      </Head>
      <Navbar />
      <main className="main db">
        <Sidebar />
        <div className="dashboard">
          <div className="dashboard__header">
            <span>Users</span>
          </div>
          <div className="dashboard__grid container-fluid d-flex"></div>
        </div>
      </main>
    </>
  )
}

export default Users