import { TextCarousel } from "../../lib/functions/functions.js";

const navbar = (() => {
    const init = () => {
        let sentances = ["Circle of Fifths", "Intervals", "Scales", "Modes", "Chords", "Jazz Improvisation", "Transposition", "Time/Key Signatures"];
        TextCarousel(sentances, "#text-carousel");
    };
  
    return {
      init,
    };
  })();
  
  export default navbar;