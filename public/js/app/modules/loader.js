import { SetMainHeight } from "../../lib/functions/functions.js";
import navbar from '/js/app/modules/navbar.js';

const loader = (() => {
    const init = () => {
        // Check for the presence of a footer element
        const footerElement = document.querySelector('footer');
        if (footerElement) {
            // Set min-height of MAIN
            SetMainHeight();
            $(window).on('resize', function() {
                SetMainHeight();
            });
        }

        // Check for the presence of a navbar element
        const navbarElement = document.querySelector('.navbar');
        if (navbarElement) {
            // Load Navbar Functionality
            navbar.init();
        }

        // Hide the loading screen
        hideLoadingScreen();
    };

    const hideLoadingScreen = () => {
        // Find the loading screen element by its unique ID
        var loadingScreen = document.querySelector('.loading-screen');

        // Set a timeout to avoid hiding the loading screen too quickly
        setTimeout(function() {
            // Hide the loading screen by setting its display property to 'none'
            loadingScreen.style.display = 'none';
        }, 500);
    };

    return {
        init,
    };
})();

export default loader;
