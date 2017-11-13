/**
 * Generate color based on index using colors from linear gradient from minColor to maxColor
 *
 * @param {String} minColor
 * @param {String} maxColor
 * @param {Number} index
 * @param {Number} length
 */
function generateColor(minColor, maxColor, index, length) {
  var startColor = {
    red: parseInt(minColor.substr(1, 2), 16),
    green: parseInt(minColor.substr(3, 2), 16),
    blue: parseInt(minColor.substr(5, 2), 16)
  }

  var endColor = {
    red: parseInt(maxColor.substr(1, 2), 16),
    green: parseInt(maxColor.substr(3, 2), 16),
    blue: parseInt(maxColor.substr(5, 2), 16)
  }

  var red = parseInt((endColor.red - startColor.red) * index / length + startColor.red);
  var green = parseInt((endColor.green - startColor.green) * index / length + startColor.green);
  var blue = parseInt((endColor.blue - startColor.blue) * index / length + startColor.blue);

  return '#' + red.toString(16) + green.toString(16) + blue.toString(16);
}

/**
 * Interpolate a value from min values to max
 *
 * @param {Number} val
 * @param {Number} minLow
 * @param {Number} minHigh
 * @param {NUmber} maxLow
 * @param {Number} maxHigh
 */
function interpolate(val, minLow, minHigh, maxLow, maxHigh) {
  return maxLow + (val - minLow)/(minHigh - minLow) * (maxHigh - maxLow);
};
