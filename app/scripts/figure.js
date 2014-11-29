/**
 * Created by Sarunas Tamasauskas
 */

'use strict';

(function (window) {

  /**
   * Figures class
   *
   * @param [figures]
   * @constructor
   */
  function Figure(figures) {
    this.figures = figures ||
    [
      [
        [0, 1],
        [1, 1],
        [1, 0]
      ],
      [
        [1],
        [1],
        [1],
        [1]
      ],
      [
        [1, 0],
        [1, 0],
        [1, 1]
      ],
      [
        [0, 1],
        [0, 1],
        [1, 1]
      ],
      [
        [1, 1],
        [1, 1]
      ]
    ];

    this.random();
  }

  /**
   * Randomises the figure
   *
   * @returns {Array}
   */
  Figure.prototype.random = function () {
    this.figure = this.figures[Math.floor(Math.random() * this.figures.length)];
  };

  /**
   * Rotates figure to left
   *
   * @returns {Array}
   */
  Figure.prototype.rotateLeft = function () {
    var figure = this.figure;
    var newFigure = new Array(figure[0].length);

    for (var i = 0; i < figure[0].length; i++) {
      var temp = new Array(figure.length);
      for (var j = 0; j < figure.length; j++) {
        temp[j] = figure[j][figure[0].length - 1 - i];
      }
      newFigure[i] = temp;
    }

    return newFigure;
  };

  /**
   * Rotate figure to right
   *
   * @returns {Array}
   */
  Figure.prototype.rotateRight = function () {
    var figure = this.figure;
    var newFigure = new Array(figure[0].length);

    for (var i = 0; i < figure[0].length; i++) {
      var temp = new Array(figure.length);
      for (var j = 0; j < figure.length; j++) {
        temp[j] = figure[figure.length - 1 - j][i];
      }
      newFigure[i] = temp;
    }

    return newFigure;
  };

  // Export to window
  window.app = window.app || {};
  window.app.Figure = Figure;
})(window);
