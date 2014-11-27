/**
 * Created by Sarunas Tamasauskas
 */

'use strict';

(function (window) {
  /**
   * Class for creating grid
   * Y
   * |      |
   * |      |
   * |      |
   * |-------X
   *
   * @param  [columns]
   * @param  [rows]
   * @constructor
   */
  function Grid(columns, rows) {
    this.xSize = columns || 20;
    this.ySize = rows || 20;
    this.grid = [];
  }

  /**
   * Generates the grid
   *
   * @returns {Grid}
   */
  Grid.prototype.generate = function () {
    for (var y = 0; y < this.ySize; y++) {
      this.grid[y] = [];
      for (var x = 0; x < this.xSize; x++) {
        this.grid[y][x] = 0;
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
   *
   * @param figureArr
   * @param yOffset
   * @param xOffset
   * @returns {boolean}
   */
  Grid.prototype.render = function (figureArr, yOffset, xOffset) {
    var grid = this.grid;
    var gridString = '';

    // Check if the optional arguments are passed if so check if there
    // are not collisions and then render the temporary generated grid
    if( arguments.length = 3){
      var tempGrid = this.isCollision(figureArr, yOffset, xOffset);
      if(tempGrid){
        grid = tempGrid;
      } else {
        return false;
      }
    }

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
    for (var i = 0; i < this.ySize + 2; i++) {
      gridString += '*';
    }

    // Send grid to html
    document.getElementById('tetris').innerHTML = gridString;

    return true;
  };


  /**
   * Checks if there is any problems with the new figure and then redraws
   *
   * @returns {boolean}
   */
  Grid.prototype.isCollision = function (figureArr, yOffset, xOffset) {
    var grid = this.grid.deepClone(); // create deep copy of a grid

    for (var y = 0; y < figureArr.length; y++) {
      for (var x = 0; x < figureArr[y].length; x++) {
        if (grid[y + yOffset][x + xOffset] === 1 && figureArr[y][x] === 1) {
          return false;
        } else if (!(grid[y + yOffset][x + xOffset] === 1)) {
          grid[y + yOffset][x + xOffset] = figureArr[y][x];
        }
      }
    }

    return grid;
  };

  /**
   * Ads figure to grid
   */
  Grid.prototype.addFigure = function (figureArr, yOffset, xOffset) {
    for (var y = 0; y < figureArr.length; y++) {
      for (var x = 0; x < figureArr[y].length; x++) {
        if (!(this.grid[y + yOffset][x + xOffset] === 1)) {
          this.grid[y + yOffset][x + xOffset] = figureArr[y][x];
        }
      }
    }
  };

  // Export to window
  window.app = window.app || {};
  window.app.Grid = Grid;
})(window);
