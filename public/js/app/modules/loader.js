import { SetMainHeight } from "../../lib/functions/functions.js";

const loader = (() => {
    const init = () => {
        //Set min-height of MAIN
        SetMainHeight();
        $(window).on('resize', function() {
          SetMainHeight();
        });
    };
  
    return {
      init,
    };
  })();
  
  export default loader;