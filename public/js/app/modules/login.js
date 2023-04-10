import { GoogleLogin, MicrosoftLogin } from "../../lib/functions/functions.js";

const login = (() => {
    const init = () => {
      GoogleLogin();
      MicrosoftLogin();
    };
    return {
      init,
    };
  })();
  
  export default login;