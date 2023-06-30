
function generateRGBColor() {
  var red = getRandomNumber(0, 255);
  var green = getRandomNumber(0, 255);
  var blue = getRandomNumber(0, 255);
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function generateUniqueRGBColors(count) {
  var colors = [];

  while (colors.length < count) {
    var rgb = generateRGBColor();
    if (!colors.includes(rgb)) {
      colors.push(rgb);
    }
  }

  return colors;
}
