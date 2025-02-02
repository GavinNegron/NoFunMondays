import Socials from '../../base/socials'
import Search from '../../base/search'
import Link from 'next/link'
import './_navbar.sass'

function Navbar() {

return (
  <>
     <nav className="container-fluid navbar">
  <div className="navbar__logo">
      <Link href="/" className="navbar__logo-name">
        <img src="/image/NoFunMondays.svg" alt="Home" className="navbar__logo-img"/>
      </Link>
  </div>
  
  <div className="navbar__menu d-flex center">
      <div className="navbar__menu-left">
          <Link href="/" className="navbar__link">Home</Link>
          <Link href="/challenges/" className="navbar__link">Challenges</Link>
          <Link href="/fortnite/item-shop" className="navbar__link">Item Shop</Link>
          <Link href="/leaks" className="navbar__link">Leaks</Link>
          <Link href="/contact" className="navbar__link">Contact</Link>
      </div>
      <div className="navbar__menu-right d-flex">
          <Search />
          <Socials />
      </div>
  </div>
  <div className="navbar__hamburger">
    <img src="/image/hamburger-icon.png" className="navbar__hamburger-img" alt='menu-icon'/>
  </div>
  <div className="navbar__dropdown">
      <Link href="/" className="navbar__dropdown-link">Home</Link>
      <Link href="/blog" className="navbar__dropdown-link">Blog</Link>
      <Link href="/learn" className="navbar__dropdown-link">Games</Link>
      <Link href="/about" className="navbar__dropdown-link">Leaks</Link>
      <Link href="/contact-us" className="navbar__dropdown-link">Contact</Link>
  </div>
</nav>
  </>
)
}

export default Navbar
