import navbar from '/js/app/modules/navbar.js';

const loader = (() => {
    const init = () => {
        const footerElement = document.querySelector('footer');
        const navbarElement = document.querySelector('.navbar');

        if (navbarElement) {
            navbar.init();
        }
    };
    return {
        init,
    };
})();

export default loader;