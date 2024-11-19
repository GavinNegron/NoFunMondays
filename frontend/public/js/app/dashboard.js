import loader from '/js/app/modules/loader.js';
import { SetSidebarScreenWidth, ToggleSidebarState } from '../lib/functions.js';

loader.init();

// Sets the sidebar to be collapsed or open depending on screen width.
SetSidebarScreenWidth();
window.addEventListener('resize', SetSidebarScreenWidth);


$(".sidebar__top-arrow").on('click', () => {
    ToggleSidebarState();
})
