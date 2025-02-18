import React from 'react';
import Socials from '../../base/socials'
import Link from 'next/link';
import './_footer.sass'

function Footer() {
  return (
    <>
    <footer className="footer">
    <div className="container-fluid">
        <div className="footer__top center">
            <div className="footer__logo">
                <Link href="/"><img src="/images/NoFunMondays.svg" alt="logo" /></Link>
            </div>
            <div className="footer__socials">
                <Socials />
            </div>
        </div>
        <div className="footer__bottom center">
            <div className="footer__copyright">
                <span>&copy; 2025 NoFunMondays. All Rights Reserved.</span>
            </div>
        </div>
    </div>
    </footer>
    </>
  );
}

export default Footer;