import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'

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
          <FontAwesomeIcon 
            icon={faGamepad} 
            bounce 
            size="2x" 
            style={{ color: '#ffffff' }} 
          />
        </div>
      </div>
    </>
  );
}

export default Loading;