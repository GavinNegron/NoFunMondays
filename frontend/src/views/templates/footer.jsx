import React from 'react';
import Socials from './socials'

function Footer() {

  return (
    <>
    <footer class="footer">
    <div class="container-fluid">
        <div class="footer__top center">
            <div class="footer__logo">
                <p>NoFunMondays</p>
            </div>
            <div class="footer__socials">
                <Socials />
            </div>
        </div>
        <div class="footer__bottom center">
            <div class="footer__copyright">
                <span>&copy; 2024 Lorem, ipsum. All rights reserved.</span>
            </div>
        </div>
    </div>
    </footer>
    </>
  );
}

export default Footer;