import React from 'react'
import Navbar from '@/components/layout/navbar'
import Sidebar from '@/components/layout/sidebar'
import Head from 'next/head';
import { requireAuth } from '@/utilities/requireAuth'
import '../../../../public/css/dashboard.css'

function Logs() {
  return (
    <>
      <Head>
        <title>Logs</title>
      </Head>
      <Navbar />
      <main className="main db">
        <Sidebar />
        <div className="dashboard">
          <div className="dashboard__header no-select">
            <span>Logs</span>
          </div>
          <div className="dashboard__grid container-fluid d-flex"></div>
        </div>
      </main>
    </>
  )
}

export default Logs

export async function getServerSideProps(context) {
  return requireAuth(context)
}