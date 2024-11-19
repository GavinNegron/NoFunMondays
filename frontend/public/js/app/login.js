import loader from '/js/app/modules/loader.js';
import { GoogleLogin, MicrosoftLogin, TogglePasswordVisibility } from "../lib/functions.js";

loader.init();
const init = () => {
  GoogleLogin();
  MicrosoftLogin();
  $(".password-toggle").on("click", () => {
    TogglePasswordVisibility(".password-field", ".password-toggle")
  });
}