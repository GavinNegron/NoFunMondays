import Link from "next/link"

function Socials() {
return (
    <>   
    <div className="socials">
        <Link target="_blank" className="socials-item" href='/discord' data-color="#7289da"><i className="fa-brands fa-discord"></i></Link>
        <Link target="_blank" className="socials-item" href='https://www.youtube.com/@NoFunMondaysFN' data-color="#ff0000"><i className="fa-brands fa-youtube"></i></Link>
        <Link target="_blank" className="socials-item" href='https://x.com/NoFunMondays' data-color="#1da1f2"><i className="fa-brands fa-twitter"></i></Link>
        <Link target="_blank" className="socials-item" href='/contact' data-color="#333333"><i className="fa-regular fa-envelope"></i></Link>
    </div>
      </>
    )
}
    
export default Socials