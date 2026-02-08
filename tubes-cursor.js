// Licence CC BY-NC-SA 4.0
// Attribution - You must give appropriate credit.
// Non Commercial - You may not use the material for commercial purposes.
// Source: https://www.framer.com/@kevin-levron/ (Tubes Cursor)

import TubesCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";

const canvas = document.getElementById("canvas");

const curatedPalettes = [
  ["#4ab6ff", "#7accff", "#9eb0ce"],
  ["#5cc2ff", "#c9ddff", "#7aa7ff"],
  ["#44d1c3", "#5cc2ff", "#9be7ff"],
  ["#52a7ff", "#9eb0ce", "#b7c7ff"],
  ["#6fd0ff", "#4ab6ff", "#7ed0ff"]
];

const curatedLightPalettes = [
  ["#1e6bff", "#2f83ff", "#6aa4ff"],
  ["#0f5ad1", "#1e6bff", "#3f8bff"],
  ["#0f6aa8", "#2a84ff", "#4ab6ff"]
];

const pickPalette = () => {
  const isLight = document.documentElement.classList.contains("theme-light");
  const palettes = isLight ? curatedLightPalettes : curatedPalettes;
  return palettes[Math.floor(Math.random() * palettes.length)];
};

if (canvas) {
  const startPalette = pickPalette();
  const app = TubesCursor(canvas, {
    tubes: {
      colors: startPalette,
      lights: {
        intensity: 70,
        colors: [...startPalette, "#9eb0ce"]
      }
    }
  });

  const applyPalette = () => {
    const colors = pickPalette();
    app.tubes.setColors(colors);
    app.tubes.setLightsColors([...colors, "#9eb0ce"]);
  };

  document.body.addEventListener("click", applyPalette);
  setInterval(applyPalette, 12000);
}

