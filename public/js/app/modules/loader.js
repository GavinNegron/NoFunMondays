import { SetMainHeight } from "../../lib/functions/functions.js";
import navbar from '/js/app/modules/navbar.js';

const loader = (() => {
    const init = () => {
        //Set min-height of MAIN
        SetMainHeight();
        $(window).on('resize', function() {
          SetMainHeight();
        });
        //Load Navbar Functionality
        navbar.init();
    };
  
    return {
      init,
    };
  })();
  
  export default loader;