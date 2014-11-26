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
      case 32: // Sapce
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

    this.grid.isCollision(this.figure.figure, this.yOffset, this.xOffset);
  }


  /**
   * Move figure down
   */
  Tetris.prototype.moveDown = function () {
    var Grid = this.grid;
    var figure = this.figure.figure;

    // Can I move figure down ?
    if (this.yOffset < Grid.rows - figure.length) {
      ++this.yOffset;
      if (!Grid.isCollision(figure, this.yOffset, this.xOffset)) {
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
    this.grid.isCollision(this.figure.figure, this.yOffset, this.xOffset)
  };


  /**
   * Move figure left
   */
  Tetris.prototype.moveLeft = function () {
    var Grid = this.grid;

    // Can figure move to left ?
    if (this.xOffset > 0) {
      --this.xOffset;
      if (Grid.isCollision(this.figure.figure, this.yOffset, this.xOffset)) {
        this.moveDown();
      } else {
        ++this.xOffset
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
    if (this.xOffset < (Grid.columns - figure[0].length)) {
      ++this.xOffset;
      if (Grid.isCollision(figure, this.yOffset, this.xOffset)) {
        this.moveDown();
      } else {
        --this.xOffset
      }
    }
  };

  /**
   * Rotate figure
    */
  Tetris.prototype.rotate = function (callback) {
    var Grid = this.grid;
    var figure = this.figure.figure;

    // Can we rotate figure ro right ?
    if (((figure.length + this.xOffset) <= Grid.columns) && ((figure[0].length + this.yOffset) <= Grid.rows)) {
      var newFigure = callback();
      if (Grid.isCollision(newFigure, this.yOffset, this.xOffset)) {
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

//########################## GRID ############################

(function (window) {
  /**
   * Class for creating grid
   * @param  [columns]
   * @param  [rows]
   * @constructor
   */
  function Grid(columns, rows) {
    this.columns = columns || 20;
    this.rows = rows || 20;
    this.grid = []
  }

  /**
   * Generates the matrix
   *
   * @returns {Grid}
   */
  Grid.prototype.generate = function () {
    for (var r = 0; r < this.rows; r++) {
      this.grid[r] = [];
      for (var c = 0; c < this.columns; c++) {
        this.grid[r][c] = 0;
      }
    }

    return this;
  };

  /**
   * Creates deep copy of grid array
   *
   * @returns {*}
   */
  Grid.prototype.get = function () {
    return JSON.parse(JSON.stringify(this.grid));
  };

  /**
   * Renders the grid
   * @param grid
   */
  Grid.prototype.render = function (grid) {
    var grid = grid || this.grid;
    var gridString = '';

    grid.forEach(function (row) {
      gridString += '*';
      row.forEach(function (column) {
        if (column === 0) {
          gridString += ' ';
        } else {
          gridString += '@';
        }
      });
      gridString += '*\n';
    });

    // Bottom border
    for (var i = 0; i < this.rows + 2; i++) {
      gridString += '*';
    }

    // Send grid to html
    document.getElementById('tetris').innerHTML = gridString;
  };


  /**
   * Checks if there is any problems with the new figure and then redraws
   * @returns {boolean}
   */
  Grid.prototype.isCollision = function (figureArr, yOffset, xOffset) {
    var grid = this.grid.deepClone(); // create deep copy of a grid

    for (var rowIdx = 0; rowIdx < figureArr.length; rowIdx++) {
      for (var columnIdx = 0; columnIdx < figureArr[rowIdx].length; columnIdx++) {
        if (grid[rowIdx + yOffset][columnIdx + xOffset] == 1 && figureArr[rowIdx][columnIdx] == 1) {
          return false;
        } else if (!(grid[rowIdx + yOffset][columnIdx + xOffset] == 1)) {
          grid[rowIdx + yOffset][columnIdx + xOffset] = figureArr[rowIdx][columnIdx];
        }
      }
    }

    this.render(grid);
    return grid;
  };

  /**
   * Ads figure to grid
   */
  Grid.prototype.addFigure = function (figureArr, yOffset, xOffset) {
    for (var rowIdx = 0; rowIdx < figureArr.length; rowIdx++) {
      for (var columnIdx = 0; columnIdx < figureArr[rowIdx].length; columnIdx++) {
        if (!(this.grid[rowIdx + yOffset][columnIdx + xOffset] == 1)) {
          this.grid[rowIdx + yOffset][columnIdx + xOffset] = figureArr[rowIdx][columnIdx];
        }
      }
    }
  };

  // Export to window
  window.app = window.app || {};
  window.app.Grid = Grid;
})(window);

(function (window) {
  //########################## FIGURES ############################

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
   * @returns {*}
   */
  Figure.prototype.random = function () {
    this.figure = this.figures[Math.floor(Math.random() * this.figures.length)]
  };

  /**
   * Rotates figure to left
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
   * Rotates figure to right
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

/**
 * Creates deep copy of arrays
 *
 * @returns {*}
 */
Array.prototype.deepClone = function () {
  return JSON.parse(JSON.stringify(this));
};
