import '../../public/css/404.css'
import Head from 'next/head'
import Link from 'next/link'

const NotFound = () => {
  return (
   <>
      <Head>
      <title>404 - NotFound</title>
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
            <span><Link href="/">Return To Lobby</Link></span>
          </div>
        </div>
      </div>
   </>
  )
}

export default NotFound