import loader from '/js/app/modules/loader.js';
import { TextCarousel } from "/js/lib/functions.js";

loader.init();

let sentances = ["Circle of Fifths", "Intervals", "Scales", "Modes", "Chords", "Jazz Improvisation", "Transposition", "Time/Key Signatures"];
TextCarousel(sentances, "#text-carousel");