import React, { useState, useEffect } from 'react';
import loading from '../../utilities/loading'
import LoadingScreen from '../components/base/loading'

function NotFound() {
  const [loadingState, setLoadingState] = useState(true)
  useEffect(() => {
    const handleLoading = async () => {
      await Promise.all([loading(['/css/404.module.css']), new Promise(resolve => setTimeout(resolve, 500))])
      setLoadingState(false)
    }
    handleLoading()
  }, [])

  if (loadingState) {
    return <LoadingScreen/>
  }

  return (
    <>
      <div className="NotFound">
        <div className="NotFound__header">
            <span>404</span>
        </div>
        <div className="NotFound__description">
            <span>Page Not Found</span>
        </div>
        <div className="NotFound__pun">
            <span>Looks like this page has gone AFK</span>
        </div>
        <div className="NotFound__btn">
          <div className="fortnite-btn">
            <span><a href="/">Return To Lobby</a></span>
          </div>
        </div>
    </div>
    </>
  );
}

export default NotFound;