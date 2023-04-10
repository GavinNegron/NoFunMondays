import { SetMainHeight, HideLoadingScreen } from "../../lib/functions/functions.js";
import navbar from '/js/app/modules/navbar.js';

const loader = (() => {
    const init = () => {
        SetMainHeight();
        $(window).on('resize', () => {
            SetMainHeight();
        });

        const navbarElement = document.querySelector('.navbar');
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