import React from 'react'
import Navbar from '../../layout/navbar/navbar'
import Sidebar from '../../layout/sidebar/sidebar'
import Head from 'next/head';
import '../../../../public/css/dashboard.css'


function Settings() {
  return (
    <>
      <Head>
        <title>Settings</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Sour+Gummy:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@600;700;800;900&family=Ubuntu:wght@700&display=swap" rel="stylesheet"></link>
        <script defer src="https://code.jquery.com/jquery-3.7.1.min.js" type="module"></script>
        <script async src="https://kit.fontawesome.com/5ee52856b3.js" crossOrigin="anonymous"></script>
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