import { SetMainHeight, HideLoadingScreen } from "../../lib/functions/functions.js";
import navbar from '/js/app/modules/navbar.js';

const loader = (() => {
    const init = () => {
        const footerElement = document.querySelector('footer');
        const navbarElement = document.querySelector('.navbar');
        if (navbarElement && footerElement) {
            SetMainHeight();
            $(window).on('resize', function() {
                SetMainHeight();
            });
        }

        if (navbarElement) {
            navbar.init();
        }
        HideLoadingScreen();
    };
    return {
        init,
    };
})();

export default loader;