import loader from '/js/app/modules/loader.js';
import { GoogleLogin, MicrosoftLogin } from "../lib/functions.js";

loader.init();

GoogleLogin();
MicrosoftLogin();
$(".password-toggle").on("click", () => {
  TogglePasswordVisibility(".password-field", ".password-toggle")
});