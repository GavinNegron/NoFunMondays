import Socials from './socials'
import Search from './search'

function navbar() {

return (
  <>
     <nav class="container-fluid navbar">
  <div class="navbar__logo">
      <a href="/" class="navbar__logo-name">NoFunMondays</a>
      <img src="/img/placeholder.png" alt="Home" class="navbar__logo-img"></img>
  </div>
  
  <div class="navbar__menu d-flex center">
      <div class="navbar__menu-left">
          <a href="/about" class="navbar__link">Home</a>
          <a href="/about" class="navbar__link">Blog</a>
          <a href="/blog" class="navbar__link">Games</a>
          <a href="/login" class="navbar__link">Leaks</a>
          <a href="/login" class="navbar__link">Contact</a>
      </div>
      <div class="navbar__menu-right d-flex">
          <Search />
          <Socials />
      </div>
  </div>
  
  <div class="navbar__hamburger">
    <img src="/img/hamburger-icon.png" class="navbar__hamburger-img"></img>
  </div>
  
  <div class="navbar__dropdown">
      <a href="/" class="navbar__dropdown-link">Home</a>
      <a href="/blog" class="navbar__dropdown-link">Blog</a>
      <a href="/learn" class="navbar__dropdown-link">Games</a>
      <a href="/about" class="navbar__dropdown-link">Leaks</a>
      <a href="/contact-us" class="navbar__dropdown-link">Contact</a>
  </div>
</nav>
  </>
)
}

export default navbar
