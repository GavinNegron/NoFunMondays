import Link from "next/link"
import './_socials.sass'

function Socials() {
return (
    <>   
    <div className="socials">
        <Link target="_blank" className="socials-item" href='https://www.youtube.com/@NoFunMondaysFN' id="youtube"><i className="fa-brands fa-youtube"></i></Link>
        <Link target="_blank" className="socials-item" href='https://bsky.app/profile/nofunmondays.com' id="bluesky"><i className="fa-brands fa-bluesky"></i></Link>
        <Link target="_blank" className="socials-item" href='https://www.pinterest.com/nofunmondaysblog/_created' id="pinterest"><i className="fa-brands fa-pinterest"></i></Link>
        <Link target="_blank" className="socials-item" href='/contact' id="email"><i className="fa-regular fa-envelope"></i></Link>
    </div>
      </>
    )
}
    
export default Socials