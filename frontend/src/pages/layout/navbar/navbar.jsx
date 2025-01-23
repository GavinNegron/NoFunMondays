import Socials from '../../components/base/socials'
import Search from '../../components/base/search'
import Link from 'next/link'

function navbar() {

return (
  <>
     <nav className="container-fluid navbar">
  <div className="navbar__logo">
      <Link href="/" className="navbar__logo-name">NoFunMondays</Link>
      <img src="/img/placeholder.png" alt="Home" className="navbar__logo-img"/>
  </div>
  
  <div className="navbar__menu d-flex center">
      <div className="navbar__menu-left">
          <Link href="/about" className="navbar__link">Home</Link>
          <Link href="/about" className="navbar__link">Blog</Link>
          <Link href="/blog" className="navbar__link">Games</Link>
          <Link href="/login" className="navbar__link">Leaks</Link>
          <Link href="/login" className="navbar__link">Contact</Link>
      </div>
      <div className="navbar__menu-right d-flex">
          <Search />
          <Socials />
      </div>
  </div>
  
  <div className="navbar__hamburger">
    <img src="/img/hamburger-icon.png" className="navbar__hamburger-img" alt='menu-icon'/>
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

export default navbar
