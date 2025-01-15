import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../../layout/navbar/navbar'
import Sidebar from '../../layout/sidebar/sidebar'
import loading from '../../../utilities/loading'
import LoadingScreen from '../../components/base/loading'

function Dashboard() {
  const [loadingState, setLoadingState] = useState(true)

  useEffect(() => {
    const handleLoading = async () => {
      const cssFiles = ['/css/dashboard.css']
      const minimumLoadingTime = new Promise(resolve => setTimeout(resolve, 500))

      await Promise.all([loading(cssFiles), minimumLoadingTime])

      setLoadingState(false)
    }

    handleLoading()
  }, [])

  if (loadingState) {
    return <LoadingScreen/>
  }

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Navbar />
      <main className="main db">
        <Sidebar />                                     
        <div className="dashboard">
          <div className="dashboard__header">
            <span>Overview</span>
          </div>
          <div className="dashboard__grid container-fluid d-flex"></div>
        </div>
      </main>
    </>
  )
}

export default Dashboard