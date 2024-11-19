import { HamburgerToggle } from "../../lib/functions.js";

const navbar = (() => {
    const init = () => {
        HamburgerToggle();
    };
  
    return {
      init,
    };
  })();
  
  export default navbar;