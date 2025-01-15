function Loading() {
  return (
    <>
      <div 
        className="loading-screen"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#121212',
          zIndex: '99999',
          fontSize: '2.25rem',
          overflowX: 'hidden',  
          overflowY: 'hidden',  
        }}
      >
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
