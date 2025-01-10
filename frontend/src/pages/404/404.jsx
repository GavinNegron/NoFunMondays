import React, { useState, useEffect } from 'react';
import loading from '../../utilities/loading'
import LoadingScreen from '../templates/base/loading'

function NotFound() {
  const [loadingState, setLoadingState] = useState(true)
  useEffect(() => {
    const handleLoading = async () => {
      await Promise.all([loading(['/css/404.css']), new Promise(resolve => setTimeout(resolve, 500))])
      setLoadingState(false)
    }
    handleLoading()
  }, [])

  if (loadingState) {
    return <LoadingScreen/>
  }

  return (
    <>
      <div className="error-404">
        <div className="error-404__header">
            <span>404</span>
        </div>
        <div className="error-404__description">
            <span>Page Not Found</span>
        </div>
        <div className="error-404__pun">
            <span>Looks like this page has gone AFK</span>
        </div>
        <div className="error-404__btn">
          <div className="fortnite-btn">
            <span><a href="/">Return To Lobby</a></span>
          </div>
        </div>
    </div>
    </>
  );
}

export default NotFound;