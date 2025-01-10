import React from 'react';
import Socials from '../templates/base/socials'

function Footer() {
  return (
    <>
    <footer className="footer">
    <div className="container-fluid">
        <div className="footer__top center">
            <div className="footer__logo">
                <p>NoFunMondays</p>
            </div>
            <div className="footer__socials">
                <Socials />
            </div>
        </div>
        <div className="footer__bottom center">
            <div className="footer__copyright">
                <span>&copy; 2024 Lorem, ipsum. All rights reserved.</span>
            </div>
        </div>
    </div>
    </footer>
    </>
  );
}

export default Footer;