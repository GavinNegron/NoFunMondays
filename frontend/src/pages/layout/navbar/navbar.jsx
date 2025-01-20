import Socials from '../../components/base/socials'
import Search from '../../components/base/search'
import Image from 'next/image'

function navbar() {

return (
  <>
     <nav className="container-fluid navbar">
  <div className="navbar__logo">
      <a href="/" className="navbar__logo-name">NoFunMondays</a>
      <Image src="/img/placeholder.png" alt="Home" className="navbar__logo-img"></Image>
  </div>
  
  <div className="navbar__menu d-flex center">
      <div className="navbar__menu-left">
          <a href="/about" className="navbar__link">Home</a>
          <a href="/about" className="navbar__link">Blog</a>
          <a href="/blog" className="navbar__link">Games</a>
          <a href="/login" className="navbar__link">Leaks</a>
          <a href="/login" className="navbar__link">Contact</a>
      </div>
      <div className="navbar__menu-right d-flex">
          <Search />
          <Socials />
      </div>
  </div>
  
  <div className="navbar__hamburger">
    <Image src="/img/hamburger-icon.png" className="navbar__hamburger-img" alt='menu-icon'></Image>
  </div>
  
  <div className="navbar__dropdown">
      <a href="/" className="navbar__dropdown-link">Home</a>
      <a href="/blog" className="navbar__dropdown-link">Blog</a>
      <a href="/learn" className="navbar__dropdown-link">Games</a>
      <a href="/about" className="navbar__dropdown-link">Leaks</a>
      <a href="/contact-us" className="navbar__dropdown-link">Contact</a>
  </div>
</nav>
  </>
)
}

export default navbar
