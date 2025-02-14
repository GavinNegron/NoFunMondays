import '@/styles/components/base/_construction.sass'
import Typewriter from 'typewriter-effect';

function Search() {
    return (
        <>   
        <div className='construction'>
           <div className="construction__inner">
                <div className="construction__header">
                    <span>This page is under construction</span>
                </div>
                <div className="construction__description">
                <Typewriter
                    options={{
                        strings: [
                            'Please come back later...',
                            'Seriously, it’s not ready yet.',
                            'I SAID, COME BACK LATER.',
                            'WHY ARE YOU STILL HERE?!',
                            'LEAVE. NOW!!!'
                        ],
                        autoStart: true,
                        loop: true,
                        delay: 50,
                        deleteSpeed: 50,
                        pauseFor: 2000
                    }}
                />
                </div>
           </div>
        </div>
        </>
    )
}

export default Search;