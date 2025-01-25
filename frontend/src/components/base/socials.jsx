import Link from "next/link"

function Socials() {
return (
    <>   
    <div className="socials">
        <Link className="socials-item" href='/discord' data-color="#7289da"><i className="fa-brands fa-discord"></i></Link>
        <Link className="socials-item" href='/youtube' data-color="#ff0000"><i className="fa-brands fa-youtube"></i></Link>
        <Link className="socials-item" href='/twitter' data-color="#1da1f2"><i className="fa-brands fa-twitter"></i></Link>
        <Link className="socials-item" href='/email' data-color="#333333"><i className="fa-regular fa-envelope"></i></Link>
    </div>
      </>
    )
}
    
export default Socials