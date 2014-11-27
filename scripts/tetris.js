/**
* Created by Sarunas Tamasauskas
*/

'use strict';

(function (window) {

  /**
   * Tetris Object
   *
   * @constructor
   */
  function Tetris() {
    this.grid = new app.Grid().generate();
    this.figure = new app.Figure();
    this.xOffset = 9;
    this.yOffset = 0;

    this.grid.render(this.figure.figure, this.yOffset, this.xOffset);
  }

  /**
   * Move figure down
   */
  Tetris.prototype.moveDown = function () {
    var Grid = this.grid;
    var figure = this.figure.figure;

    // Can I move figure down ?
    if (this.yOffset < Grid.x - figure.length) {
      ++this.yOffset;
      if (!Grid.render(figure, this.yOffset, this.xOffset)) {
        --this.yOffset;
        Grid.addFigure(figure, this.yOffset, this.xOffset);
        this.newFigure();
      }
    } else {
      Grid.addFigure(figure, this.yOffset, this.xOffset);
      this.newFigure();
    }
  };

  /**
   * Creates new figure
   */
  Tetris.prototype.newFigure = function () {
    this.figure = new app.Figure();
    this.yOffset = 0;
    this.xOffset = 9;

    // TODO game over ?
    this.grid.render(this.figure.figure, this.yOffset, this.xOffset);
  };


  /**
   * Move figure left
   */
  Tetris.prototype.moveLeft = function () {
    var Grid = this.grid;

    // Can figure move to left ?
    if (this.xOffset > 0) {
      --this.xOffset;
      if (Grid.render(this.figure.figure, this.yOffset, this.xOffset)) {
        this.moveDown();
      } else {
        ++this.xOffset;
      }
    }
  };

  /**
   * Move figure Right
   */
  Tetris.prototype.moveRight = function () {
    var Grid = this.grid;
    var figure = this.figure.figure;

    // Can figure move right ?
    if (this.xOffset < (Grid.y - figure[0].length)) {
      ++this.xOffset;
      if (Grid.render(figure, this.yOffset, this.xOffset)) {
        this.moveDown();
      } else {
        --this.xOffset;
      }
    }
  };

  /**
   * Rotate figure
    */
  Tetris.prototype.rotate = function (callback) {
    var Grid = this.grid;
    var figure = this.figure.figure;

    // Can we rotate figure ?
    if (((figure.length + this.xOffset) <= Grid.y) && ((figure[0].length + this.yOffset) <= Grid.x)) {
      var newFigure = callback();
      if (Grid.render(newFigure, this.yOffset, this.xOffset)) {
        this.figure.figure = newFigure;
        this.moveDown();
      }
    }
  };

  /**
   * Rotate figure Left
   */
  Tetris.prototype.rotateLeft = function() {
    var _this = this;
    this.rotate(function(){
      return _this.figure.rotateLeft();
    });
  };

  /**
   * Rotate figure Right
   */
  Tetris.prototype.rotateRight = function() {
    var _this = this;
    this.rotate(function(){
      return _this.figure.rotateRight();
    });
  };

  // Export to window
  window.app = window.app || {};
  window.app.Tetris = Tetris;
})(window);





