/**
 * Created by Sarunas Tamasauskas
 */

'use strict';

window.onload = function () {

  var tetris = new app.Tetris();
  document.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
      case 65: // A
        tetris.moveLeft();
        break;
      case 68: // D
        tetris.moveRight();
        break;
      case 32: // Space
        tetris.moveDown();
        break;
      case 83: // S
        tetris.rotateRight();
        break;
      case 87: // W
        tetris.rotateLeft();
        break;
    }
  });
};

/**
 * Creates deep copy of arrays
 *
 * @returns {*}
 */
Array.prototype.deepClone = function () {
  return JSON.parse(JSON.stringify(this));
};
