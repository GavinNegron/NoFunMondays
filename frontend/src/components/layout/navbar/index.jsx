import { useState, useRef, useEffect } from 'react'
import Socials from '../../base/socials'
import Link from 'next/link'
import './_navbar.sass'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const hamburgerRef = useRef(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenuOnClickOutside = (e) => {
    if (
      menuRef.current && !menuRef.current.contains(e.target) &&
      hamburgerRef.current && !hamburgerRef.current.contains(e.target)
    ) {
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => closeMenuOnClickOutside(e)
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

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
            <Link href="/fortnite/challenges/" className="navbar__link">Challenges</Link>
            <Link href="/fortnite/item-shop/" className="navbar__link">Item Shop</Link>
            <Link href="/fortnite/countdown/" className="navbar__link">Season Countdown</Link>
            <Link href="/contact/" className="navbar__link">Contact</Link>
          </div>
          <div className="navbar__menu-right d-flex">
            <Socials />
          </div>
        </div>

        <div
          className="navbar__hamburger"
          ref={hamburgerRef}
          onClick={toggleMenu}
        >
          <i className="fa-solid fa-bars"></i>
        </div>

        <div
          className={`navbar__dropdown ${isMenuOpen ? 'active' : ''}`}
          ref={menuRef}
        >
          <Link href="/" className="navbar__dropdown-link">Home</Link>
          <Link href="/fortnite/challenges/" className="navbar__dropdown-link">Challenges</Link>
          <Link href="/fortnite/item-shop/" className="navbar__dropdown-link">Item Shop</Link>
          <Link href="/fortnite/countdown/" className="navbar__dropdown-link">Season Countdown</Link>
          <Link href="/contact/" className="navbar__dropdown-link">Contact</Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar
