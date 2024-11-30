import { Helmet } from 'react-helmet-async'

function Loading() {
  return (
    <>
    <Helmet>
      <link rel="stylesheet" href="/css/loading.css"></link>
    </Helmet>
    <div className="loading-screen">
      <div className="loading-screen__icon">
        <i 
          className="fa-solid fa-gamepad fa-bounce fa-2xl" 
          style={{ color: '#ffffff' }} 
        ></i>
      </div>
    </div>
    </>
  );
}

export default Loading;