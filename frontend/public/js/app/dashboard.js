import loader from '/js/app/modules/loader.js';
import { SetSidebarScreenWidth, ToggleSidebarState } from '../lib/functions.js';

loader.init();

window.SetSidebarScreenWidth = SetSidebarScreenWidth;
window.ToggleSidebarState = ToggleSidebarState;

SetSidebarScreenWidth();
window.addEventListener('resize', SetSidebarScreenWidth);


$(".sidebar__top-arrow").on('click', () => {
    ToggleSidebarState();
})