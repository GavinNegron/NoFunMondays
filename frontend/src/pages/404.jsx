import '../../public/css/404.css'
import Head from 'next/head'

const NotFound = () => {
  return (
   <>
      <Head>
      <title>404 - NotFound</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Sour+Gummy:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=ubuntu:wght@700;800&family=Libre+Franklin:wght@900&display=swap"></link>
      </Head>
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
  )
}

export default NotFound