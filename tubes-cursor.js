// Licence CC BY-NC-SA 4.0
// Attribution — You must give appropriate credit.
// Non Commercial — You may not use the material for commercial purposes.
// Source: https://www.framer.com/@kevin-levron/ (Tubes Cursor)

import TubesCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";

const canvas = document.getElementById("canvas");

if (canvas) {
  const app = TubesCursor(canvas, {
    tubes: {
      colors: ["#4ab6ff", "#9eb0ce", "#c9ddff"],
      lights: {
        intensity: 140,
        colors: ["#4ab6ff", "#7accff", "#5cc2ff", "#9eb0ce"]
      }
    }
  });

  document.body.addEventListener("click", () => {
    const colors = randomColors(3);
    const lightsColors = randomColors(4);
    app.tubes.setColors(colors);
    app.tubes.setLightsColors(lightsColors);
  });
}

function randomColors(count) {
  return new Array(count)
    .fill(0)
    .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"));
}
